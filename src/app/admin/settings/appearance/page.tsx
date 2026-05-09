"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Save, Loader2, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { CATEGORIES } from "@/lib/data/productRegistry";

interface StoreConfig {
  key: string;
  value: string;
}

export default function StoreAppearanceAdmin() {
  const [configs, setConfigs] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchConfigs();
  }, []);

  const fetchConfigs = async () => {
    try {
      const { data, error } = await supabase.from('store_config').select('*');
      if (error) throw error;
      
      const configMap: Record<string, string> = {};
      data?.forEach((c: StoreConfig) => {
        configMap[c.key] = c.value;
      });
      setConfigs(configMap);
    } catch (err) {
      console.error("Failed to load store configs", err);
      toast.error("Failed to load appearance settings.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const updates = Object.entries(configs).map(([key, value]) => ({
        key,
        value,
        updated_at: new Date().toISOString(),
      }));

      const { error } = await supabase.from('store_config').upsert(updates);
      if (error) throw error;
      
      toast.success("Appearance settings saved successfully.");
    } catch (err) {
      console.error("Failed to save store configs", err);
      toast.error("Failed to save settings.");
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (key: string, value: string) => {
    setConfigs(prev => ({ ...prev, [key]: value }));
  };

  if (loading) {
    return <div className="p-8 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-brand-orange" /></div>;
  }

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-display text-3xl uppercase tracking-tight text-brand-obsidian">Store Appearance</h1>
          <p className="font-sans text-brand-grey mt-2">Manage dynamic imagery for the light-themed storefront.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="bg-brand-orange text-white px-6 py-3 font-display text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-[#E05A00] transition-colors disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save Changes
        </button>
      </div>

      <div className="space-y-12">
        {/* Store Hub Hero */}
        <section className="bg-white border border-brand-border p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-brand-border">
             <ImageIcon className="w-5 h-5 text-brand-orange" />
             <h2 className="font-display text-xl uppercase tracking-tighter text-brand-obsidian">Store Hub Hero</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-2">Main Hero Background (URL)</label>
              <input 
                type="text" 
                value={configs['store_hero_image'] || ''} 
                onChange={(e) => handleChange('store_hero_image', e.target.value)}
                placeholder="/images/hero-background.png"
                className="w-full bg-[#F8F8F6] border border-[#E5E5E5] px-4 py-3 text-sm focus:outline-none focus:border-brand-orange transition-colors"
              />
            </div>
          </div>
        </section>

        {/* Category Banners */}
        <section className="bg-white border border-brand-border p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-brand-border">
             <ImageIcon className="w-5 h-5 text-brand-orange" />
             <h2 className="font-display text-xl uppercase tracking-tighter text-brand-obsidian">Category Headers</h2>
          </div>
          <p className="font-sans text-sm text-brand-grey mb-6">These images appear at the top of individual category pages and on the store hub grid.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CATEGORIES.map(cat => (
              <div key={cat.id}>
                <label className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-2">{cat.name}</label>
                <input 
                  type="text" 
                  value={configs[`category_image_${cat.id}`] || ''} 
                  onChange={(e) => handleChange(`category_image_${cat.id}`, e.target.value)}
                  placeholder={`/images/categories/${cat.id}.jpg`}
                  className="w-full bg-[#F8F8F6] border border-[#E5E5E5] px-4 py-3 text-sm focus:outline-none focus:border-brand-orange transition-colors"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Lifestyle Band */}
        <section className="bg-white border border-brand-border p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-brand-border">
             <ImageIcon className="w-5 h-5 text-brand-orange" />
             <h2 className="font-display text-xl uppercase tracking-tighter text-brand-obsidian">Lifestyle Image Band</h2>
          </div>
          <p className="font-sans text-sm text-brand-grey mb-6">4 images shown at the bottom of the store hub.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map(num => (
              <div key={num}>
                <label className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-2">Image {num}</label>
                <input 
                  type="text" 
                  value={configs[`lifestyle_image_${num}`] || ''} 
                  onChange={(e) => handleChange(`lifestyle_image_${num}`, e.target.value)}
                  placeholder={`/images/lifestyle-${num}.jpg`}
                  className="w-full bg-[#F8F8F6] border border-[#E5E5E5] px-4 py-3 text-sm focus:outline-none focus:border-brand-orange transition-colors"
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
