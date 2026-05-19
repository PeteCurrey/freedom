"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { Upload, Copy, Trash2, Search, Image as ImageIcon, Loader2, CheckCircle2, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface MediaFile {
  name: string;
  id: string;
  updated_at?: string | null;
  metadata: { size: number; mimetype: string };
  publicUrl: string;
  pageKey?: string;
}

export default function ContentMediaAdmin() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPage, setFilterPage] = useState("all");
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadFiles = useCallback(async () => {
    setLoading(true);
    // Ensure page-media bucket exists
    const { data: buckets } = await supabase.storage.listBuckets();
    const exists = buckets?.find(b => b.name === 'page-media');
    if (!exists) {
      await supabase.storage.createBucket('page-media', {
        public: true,
        fileSizeLimit: 10485760,
        allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif']
      });
    }

    const { data } = await supabase.storage.from('page-media').list('', {
      limit: 200, sortBy: { column: 'updated_at', order: 'desc' }
    });

    if (!data) { setLoading(false); return; }

    const enriched: MediaFile[] = [];
    for (const file of data) {
      if (file.name === '.emptyFolderPlaceholder') continue;
      const { data: urlData } = supabase.storage.from('page-media').getPublicUrl(file.name);
      const pathParts = file.name.split('/');
      enriched.push({
        ...file,
        id: file.id ?? '',
        publicUrl: urlData.publicUrl,
        metadata: (file as any).metadata || { size: 0, mimetype: 'image/jpeg' },
        pageKey: pathParts.length > 1 ? pathParts[0] : undefined,
      });
    }

    // Also scan subdirectories (page-keyed folders)
    const pageKeys = ["home","planner","van-design-studio","store","blog","about",
      "systems/electrical-solar","systems/heating","systems/water","systems/insulation",
      "vehicles/mercedes-sprinter","vehicles/ford-transit","vehicles/vw-crafter",
      "vehicles/fiat-ducato","vehicles/iveco-daily","vehicles/man-tge"];

    for (const pk of pageKeys) {
      const { data: folderFiles } = await supabase.storage.from('page-media').list(pk, {
        limit: 50, sortBy: { column: 'updated_at', order: 'desc' }
      });
      if (!folderFiles) continue;
      for (const file of folderFiles) {
        if (file.name === '.emptyFolderPlaceholder') continue;
        const fullPath = `${pk}/${file.name}`;
        const { data: urlData } = supabase.storage.from('page-media').getPublicUrl(fullPath);
        enriched.push({
          ...file,
          id: file.id ?? '',
          name: fullPath,
          publicUrl: urlData.publicUrl,
          metadata: (file as any).metadata || { size: 0, mimetype: 'image/jpeg' },
          pageKey: pk,
        });
      }
    }

    setFiles(enriched);
    setLoading(false);
  }, []);

  useEffect(() => { loadFiles(); }, [loadFiles]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (!selectedFiles.length) return;
    setUploading(true);
    for (const file of selectedFiles) {
      const path = `uploads/${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
      await supabase.storage.from('page-media').upload(path, file, { upsert: true });
    }
    await loadFiles();
    setUploading(false);
  };

  const handleCopy = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (filePath: string, fileId: string) => {
    if (!confirm(`Delete "${filePath}"? This cannot be undone.`)) return;
    setDeletingId(fileId);
    await supabase.storage.from('page-media').remove([filePath]);
    // Clear any page_content rows using this URL
    await supabase.from('page_content').update({ value: '' })
      .eq('field_type', 'image')
      .like('value', `%${filePath}%`);
    await loadFiles();
    setDeletingId(null);
  };

  const formatBytes = (bytes: number) => {
    if (!bytes) return '—';
    if (bytes < 1024) return `${bytes}B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(0)}KB`;
    return `${(bytes / 1048576).toFixed(1)}MB`;
  };

  const allPageKeys = Array.from(new Set(files.map(f => f.pageKey).filter(Boolean)));

  const filtered = files.filter(f => {
    const matchSearch = !searchQuery || f.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchPage = filterPage === 'all' || f.pageKey === filterPage;
    return matchSearch && matchPage;
  });

  return (
    <div className="p-8 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl uppercase tracking-tight text-slate-900 flex items-center gap-3">
            <ImageIcon className="w-6 h-6 text-brand-orange" /> Media Library
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-mono">{files.length} files in page-media bucket</p>
        </div>
        <label className={cn("flex items-center gap-2 px-5 py-3 font-mono text-xs uppercase tracking-widest cursor-pointer transition-all",
          uploading ? "bg-slate-200 text-slate-400" : "bg-brand-orange text-white hover:bg-slate-900")}>
          {uploading ? <><Loader2 size={14} className="animate-spin" /> Uploading...</> : <><Upload size={14} /> Upload Media</>}
          <input type="file" multiple accept="image/jpeg,image/png,image/webp,image/avif" className="hidden" onChange={handleUpload} disabled={uploading} />
        </label>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-8">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" placeholder="Search by filename..." value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 text-sm focus:border-brand-orange outline-none rounded-lg bg-white" />
        </div>
        <select value={filterPage} onChange={e => setFilterPage(e.target.value)}
          className="border border-slate-200 px-4 py-2.5 text-sm focus:border-brand-orange outline-none rounded-lg bg-white text-slate-700">
          <option value="all">All Pages</option>
          {allPageKeys.map(pk => <option key={pk} value={pk}>{pk}</option>)}
        </select>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex justify-center py-24"><Loader2 className="w-8 h-8 animate-spin text-brand-orange" /></div>
      ) : filtered.length === 0 ? (
        <div className="py-24 text-center border-2 border-dashed border-slate-200 rounded-xl">
          <ImageIcon className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <p className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">{files.length === 0 ? 'No media uploaded yet. Upload your first image above.' : 'No files match your search.'}</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map(file => (
            <div key={file.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden group shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-square bg-slate-100 overflow-hidden relative">
                <img src={file.publicUrl} alt={file.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={e => { (e.target as HTMLImageElement).src = '/images/placeholder.png'; }} />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button onClick={() => handleCopy(file.publicUrl, file.id)}
                    className="p-2 bg-white text-slate-700 rounded-lg hover:bg-brand-orange hover:text-white transition-colors" title="Copy URL">
                    {copiedId === file.id ? <CheckCircle2 size={16} className="text-emerald-500" /> : <Copy size={16} />}
                  </button>
                  <button onClick={() => handleDelete(file.name, file.id)} disabled={deletingId === file.id}
                    className="p-2 bg-white text-slate-700 rounded-lg hover:bg-red-500 hover:text-white transition-colors" title="Delete">
                    {deletingId === file.id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                  </button>
                </div>
              </div>
              <div className="p-3">
                <p className="text-xs font-medium text-slate-700 truncate" title={file.name}>{file.name.split('/').pop()}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[10px] text-slate-400 font-mono">{formatBytes(file.metadata?.size)}</span>
                  {file.pageKey && <span className="text-[9px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-mono">{file.pageKey.split('/').pop()}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
