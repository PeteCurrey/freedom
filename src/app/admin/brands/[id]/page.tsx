"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { 
  ArrowLeft, Save, Loader2, Globe, FileText, 
  Image as ImageIcon, Download, Link as LinkIcon, 
  Trash2, Plus, Layout, Search, ExternalLink 
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function BrandEditPage() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [brand, setBrand] = useState<any>(null);

  useEffect(() => {
    async function fetchBrand() {
      const { data, error } = await supabase
        .from('brands')
        .select('*')
        .eq('id', id)
        .single();

      if (data) setBrand(data);
      setLoading(false);
    }
    fetchBrand();
  }, [id]);

  const handleSave = async () => {
    setSaving(true);
    const { error } = await supabase
      .from('brands')
      .update(brand)
      .eq('id', id);

    if (error) {
      alert("Error saving brand: " + error.message);
    } else {
      router.push('/admin/brands');
    }
    setSaving(false);
  };

  const updateArrayField = (field: string, index: number, value: any) => {
    const newArray = [...brand[field]];
    newArray[index] = { ...newArray[index], ...value };
    setBrand({ ...brand, [field]: newArray });
  };

  const addArrayItem = (field: string, defaultValue: any) => {
    setBrand({ ...brand, [field]: [...(brand[field] || []), defaultValue] });
  };

  const removeArrayItem = (field: string, index: number) => {
    const newArray = brand[field].filter((_: any, i: number) => i !== index);
    setBrand({ ...brand, [field]: newArray });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-brand-orange" />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-12 pb-32">
      {/* Header */}
      <div className="flex items-center justify-between sticky top-0 bg-slate-50/80 backdrop-blur-md z-40 py-4 -mx-8 px-8 border-b border-slate-200">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.back()}
            className="p-2 hover:bg-white rounded-full transition-colors border border-transparent hover:border-slate-200"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="font-display text-2xl uppercase tracking-tighter text-slate-900">
              Manage <span className="text-brand-orange">{brand.name}</span> Hub
            </h1>
            <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mt-0.5">
              Ref: {brand.id.slice(0,8)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg">
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Published</span>
            <input 
              type="checkbox"
              checked={brand.published}
              onChange={e => setBrand({...brand, published: e.target.checked})}
              className="w-4 h-4 accent-brand-orange"
            />
          </div>
          <button 
            onClick={handleSave}
            disabled={saving}
            className="px-8 py-3 bg-slate-900 text-white font-display text-[10px] uppercase tracking-widest hover:bg-brand-orange transition-all font-bold shadow-lg flex items-center gap-2 disabled:opacity-50"
          >
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            Save Configuration
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Core Info & SEO */}
        <div className="lg:col-span-2 space-y-12">
          {/* Core Content */}
          <section className="space-y-6 bg-white p-8 border border-slate-200 rounded-2xl">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="text-brand-orange w-4 h-4" />
              <h3 className="font-display text-lg uppercase tracking-tight">Editorial Content</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block font-mono text-[10px] uppercase text-slate-400 mb-2">Hero Image URL</label>
                <input 
                  type="text" 
                  value={brand.hero_image || ""}
                  onChange={e => setBrand({...brand, hero_image: e.target.value})}
                  className="w-full border-2 border-slate-50 p-4 text-sm focus:border-brand-orange outline-none rounded-xl bg-slate-50/50"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="block font-mono text-[10px] uppercase text-slate-400 mb-2">Brand Biography (Markdown Supported)</label>
                <textarea 
                  value={brand.description || ""}
                  onChange={e => setBrand({...brand, description: e.target.value})}
                  rows={8}
                  className="w-full border-2 border-slate-50 p-4 text-sm focus:border-brand-orange outline-none rounded-xl bg-slate-50/50 resize-none"
                  placeholder="Describe the brand's history, engineering philosophy, and key product lines..."
                />
              </div>
            </div>
          </section>

          {/* Media Gallery */}
          <section className="space-y-6 bg-white p-8 border border-slate-200 rounded-2xl">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <ImageIcon className="text-brand-orange w-4 h-4" />
                <h3 className="font-display text-lg uppercase tracking-tight">Brand Assets / Media</h3>
              </div>
              <button 
                onClick={() => addArrayItem('gallery', '')}
                className="text-brand-orange font-mono text-[10px] uppercase tracking-widest flex items-center gap-1 hover:underline"
              >
                <Plus size={12} /> Add Image
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {(brand.gallery || []).map((url: string, idx: number) => (
                <div key={idx} className="relative group border-2 border-slate-50 rounded-xl overflow-hidden p-2 bg-slate-50/50">
                  <input 
                    type="text" 
                    value={url}
                    onChange={e => updateArrayField('gallery', idx, e.target.value)}
                    className="w-full border-none bg-transparent text-[10px] focus:ring-0"
                    placeholder="Image URL..."
                  />
                  <button 
                    onClick={() => removeArrayItem('gallery', idx)}
                    className="absolute top-2 right-2 p-1.5 bg-white text-slate-400 hover:text-red-500 rounded-md shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* SEO Performance */}
          <section className="space-y-6 bg-slate-900 text-white p-8 rounded-2xl">
            <div className="flex items-center gap-2 mb-2">
              <Search className="text-brand-orange w-4 h-4" />
              <h3 className="font-display text-lg uppercase tracking-tight text-white">SEO DOMINANCE</h3>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block font-mono text-[10px] uppercase text-slate-500 mb-2">Meta Title</label>
                <input 
                  type="text" 
                  value={brand.seo_title || ""}
                  onChange={e => setBrand({...brand, seo_title: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 p-4 text-sm focus:border-brand-orange outline-none rounded-xl"
                  placeholder="e.g. Victron Energy | Official UK Stockist | Amplios"
                />
              </div>
              <div>
                <label className="block font-mono text-[10px] uppercase text-slate-500 mb-2">Meta Description</label>
                <textarea 
                  value={brand.seo_description || ""}
                  onChange={e => setBrand({...brand, seo_description: e.target.value})}
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 p-4 text-sm focus:border-brand-orange outline-none rounded-xl resize-none"
                  placeholder="Brief summary for Google search results..."
                />
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Assets & Links */}
        <div className="space-y-8">
          {/* Downloads */}
          <section className="space-y-6 bg-white p-8 border border-slate-200 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Download className="text-brand-orange w-4 h-4" />
                <h3 className="font-display text-base uppercase tracking-tight">Technical PDF</h3>
              </div>
              <button 
                onClick={() => addArrayItem('downloads', { name: '', url: '', type: 'brochure' })}
                className="text-brand-orange font-mono text-[10px] uppercase tracking-widest flex items-center gap-1 hover:underline"
              >
                <Plus size={12} /> Add
              </button>
            </div>
            <div className="space-y-4">
              {(brand.downloads || []).map((item: any, idx: number) => (
                <div key={idx} className="p-4 border border-slate-100 bg-slate-50/30 rounded-xl space-y-2 relative group">
                  <input 
                    type="text" 
                    value={item.name}
                    onChange={e => updateArrayField('downloads', idx, { name: e.target.value })}
                    className="w-full bg-transparent font-bold text-xs outline-none"
                    placeholder="Brochure Name..."
                  />
                  <input 
                    type="text" 
                    value={item.url}
                    onChange={e => updateArrayField('downloads', idx, { url: e.target.value })}
                    className="w-full bg-transparent text-[10px] text-slate-400 outline-none"
                    placeholder="Download URL..."
                  />
                  <button 
                    onClick={() => removeArrayItem('downloads', idx)}
                    className="absolute top-2 right-2 text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Brand Links */}
          <section className="space-y-6 bg-white p-8 border border-slate-200 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <LinkIcon className="text-brand-orange w-4 h-4" />
                <h3 className="font-display text-base uppercase tracking-tight">External Links</h3>
              </div>
              <button 
                onClick={() => addArrayItem('links', { name: '', url: '' })}
                className="text-brand-orange font-mono text-[10px] uppercase tracking-widest flex items-center gap-1 hover:underline"
              >
                <Plus size={12} /> Add
              </button>
            </div>
            <div className="space-y-4">
              {(brand.links || []).map((item: any, idx: number) => (
                <div key={idx} className="p-4 border border-slate-100 bg-slate-50/30 rounded-xl space-y-2 relative group">
                  <input 
                    type="text" 
                    value={item.name}
                    onChange={e => updateArrayField('links', idx, { name: e.target.value })}
                    className="w-full bg-transparent font-bold text-xs outline-none"
                    placeholder="Link Title (e.g. Support)..."
                  />
                  <input 
                    type="text" 
                    value={item.url}
                    onChange={e => updateArrayField('links', idx, { url: e.target.value })}
                    className="w-full bg-transparent text-[10px] text-slate-400 outline-none"
                    placeholder="URL..."
                  />
                  <button 
                    onClick={() => removeArrayItem('links', idx)}
                    className="absolute top-2 right-2 text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
