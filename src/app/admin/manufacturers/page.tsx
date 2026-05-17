"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Edit2, Trash2, Search, Link as LinkIcon, Box, Image as ImageIcon } from "lucide-react";

export default function ManufacturersPage() {
  const [manufacturers, setManufacturers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [description, setDescription] = useState("");
  const [logoUrl, setLogoUrl] = useState("");

  useEffect(() => {
    fetchManufacturers();
  }, []);

  const fetchManufacturers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('manufacturers')
      .select('*, products(count)')
      .order('name');
    
    if (error) {
      console.error("Error fetching manufacturers:", error);
    } else {
      setManufacturers(data || []);
    }
    setLoading(false);
  };

  const openModal = (m?: any) => {
    if (m) {
      setEditingId(m.id);
      setName(m.name);
      setWebsiteUrl(m.website_url || "");
      setDescription(m.description || "");
      setLogoUrl(m.logo_url || "");
    } else {
      setEditingId(null);
      setName("");
      setWebsiteUrl("");
      setDescription("");
      setLogoUrl("");
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name,
      website_url: websiteUrl,
      description,
      logo_url: logoUrl
    };

    if (editingId) {
      await supabase.from('manufacturers').update(payload).eq('id', editingId);
    } else {
      await supabase.from('manufacturers').insert(payload);
    }
    
    setIsModalOpen(false);
    fetchManufacturers();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this manufacturer?")) {
      await supabase.from('manufacturers').delete().eq('id', id);
      fetchManufacturers();
    }
  };

  const filtered = manufacturers.filter(m => m.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold font-display uppercase text-white mb-2">Manufacturers Hub</h1>
          <p className="text-brand-grey font-sans text-sm">Manage brand profiles, technical references, and product intelligence links.</p>
        </div>
        <button 
          onClick={() => openModal()}
          className="bg-brand-orange text-white px-6 py-3 font-mono text-xs uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Manufacturer
        </button>
      </div>

      <div className="bg-brand-obsidian border border-brand-border/40 rounded-sm mb-8 flex items-center p-4">
        <Search className="w-5 h-5 text-brand-grey mr-4" />
        <input 
          type="text" 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search manufacturers by name..."
          className="bg-transparent border-none text-white focus:outline-none flex-1 font-mono text-sm"
        />
      </div>

      {loading ? (
        <div className="text-center p-12 text-brand-grey font-mono animate-pulse">Loading intelligence databanks...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(m => (
            <div key={m.id} className="bg-brand-obsidian/50 border border-brand-border/30 p-6 flex flex-col relative group hover:border-brand-orange/50 transition-colors">
              <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                 <button onClick={() => openModal(m)} className="p-2 bg-brand-carbon hover:bg-brand-orange text-brand-grey hover:text-white transition-colors">
                    <Edit2 className="w-3 h-3" />
                 </button>
                 <button onClick={() => handleDelete(m.id)} className="p-2 bg-brand-carbon hover:bg-red-500 text-brand-grey hover:text-white transition-colors">
                    <Trash2 className="w-3 h-3" />
                 </button>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  {m.logo_url ? (
                     <img src={m.logo_url} alt={m.name} className="w-full h-full object-contain p-2" />
                  ) : (
                     <ImageIcon className="w-5 h-5 text-brand-grey" />
                  )}
                </div>
                <div>
                  <h3 className="font-display text-xl uppercase tracking-tight text-white">{m.name}</h3>
                  {m.website_url && (
                    <a href={m.website_url} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-brand-orange hover:text-white font-mono text-[9px] uppercase tracking-widest mt-1">
                      <LinkIcon className="w-3 h-3" /> Official Site
                    </a>
                  )}
                </div>
              </div>

              <p className="font-sans text-xs text-brand-grey line-clamp-3 mb-6 flex-1">
                {m.description || "No intelligence brief available for this manufacturer."}
              </p>

              <div className="pt-4 border-t border-brand-border/20 flex items-center justify-between mt-auto">
                 <div className="flex items-center gap-2 font-mono text-[10px] text-brand-grey uppercase tracking-widest">
                    <Box className="w-3.5 h-3.5" />
                    <span>{m.products?.[0]?.count || 0} Products Mapped</span>
                 </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-brand-obsidian border border-brand-border w-full max-w-2xl p-8 shadow-2xl relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-brand-grey hover:text-white">
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-display uppercase mb-6">{editingId ? "Update Intelligence" : "Add Manufacturer"}</h2>
            
            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block font-mono text-[9px] uppercase tracking-widest text-brand-grey mb-2">Manufacturer Name</label>
                  <input required type="text" value={name} onChange={e => setName(e.target.value)} className="w-full bg-brand-carbon border border-brand-border p-3 text-white font-mono text-xs focus:border-brand-orange" />
                </div>
                <div>
                  <label className="block font-mono text-[9px] uppercase tracking-widest text-brand-grey mb-2">Website URL</label>
                  <input type="url" value={websiteUrl} onChange={e => setWebsiteUrl(e.target.value)} className="w-full bg-brand-carbon border border-brand-border p-3 text-white font-mono text-xs focus:border-brand-orange" placeholder="https://" />
                </div>
              </div>
              
              <div>
                <label className="block font-mono text-[9px] uppercase tracking-widest text-brand-grey mb-2">Logo URL</label>
                <input type="text" value={logoUrl} onChange={e => setLogoUrl(e.target.value)} className="w-full bg-brand-carbon border border-brand-border p-3 text-white font-mono text-xs focus:border-brand-orange" />
              </div>

              <div>
                <label className="block font-mono text-[9px] uppercase tracking-widest text-brand-grey mb-2">Intelligence Brief (Description)</label>
                <textarea rows={4} value={description} onChange={e => setDescription(e.target.value)} className="w-full bg-brand-carbon border border-brand-border p-3 text-white font-sans text-sm focus:border-brand-orange resize-none" />
              </div>

              <div className="flex justify-end pt-6 border-t border-brand-border/40">
                <button type="submit" className="bg-brand-orange text-white px-8 py-3 font-mono text-xs uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-colors">
                  Save Manufacturer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Need to import X, forgot to add it to lucide-react imports above
import { X } from "lucide-react";
