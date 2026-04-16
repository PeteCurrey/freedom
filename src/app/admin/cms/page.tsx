"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Monitor, 
  Edit3, 
  Image as ImageIcon, 
  Type, 
  Save, 
  Eye,
  RefreshCw,
  Layout
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function CMSPage() {
  const [pages, setPages] = useState<any[]>([
    { id: 'home', name: 'Home Page', hero: 'Hero Section', slug: '/' },
    { id: 'vehicles', name: 'Vehicles Hub', hero: 'Catalog Overview', slug: '/vehicles' },
    { id: 'systems', name: 'Systems Hub', hero: 'Technical Overview', slug: '/systems' },
  ]);
  const [selectedPage, setSelectedPage] = useState<string>('home');
  const [config, setConfig] = useState<any>({
    hero_title: "ENGINEERING EXCELLENCE FOR THE ROAD AHEAD",
    hero_subtitle: "Definitive resources and premium gear for serious self-build motorhome and campervan conversions.",
    hero_image: "/images/hero-background.png"
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchConfig() {
      const { data } = await supabase
        .from('site_config')
        .select('*')
        .eq('key', `page_${selectedPage}`)
        .single();
      
      if (data) {
        setConfig(data.value);
      }
    }
    fetchConfig();
  }, [selectedPage]);

  const handleSave = async () => {
    setSaving(true);
    const { error } = await supabase
      .from('site_config')
      .upsert({ 
        key: `page_${selectedPage}`, 
        value: config,
        description: `CMS configuration for ${selectedPage} page`
      }, { onConflict: 'key' });
      
    if (!error) {
      setTimeout(() => setSaving(false), 800);
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-2 font-mono text-[10px] text-brand-orange uppercase tracking-[0.3em] mb-4">
          <Monitor size={12} /> Content Node: cms.main
        </div>
        <h1 className="font-display text-5xl uppercase tracking-tighter text-white">
          Content <span className="text-brand-orange">Management</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Page Selector Sidebar */}
        <div className="xl:col-span-1 space-y-4">
          <h3 className="font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-6">Select Page Identity</h3>
          {pages.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPage(p.id)}
              className={cn(
                "w-full p-6 text-left blueprint-border transition-all group",
                selectedPage === p.id ? "bg-brand-carbon border-brand-orange" : "bg-brand-obsidian border-brand-border hover:bg-brand-carbon"
              )}
            >
              <div className="flex justify-between items-center mb-2">
                <span className={cn(
                  "font-display text-lg uppercase",
                  selectedPage === p.id ? "text-white" : "text-brand-grey group-hover:text-white"
                )}>{p.name}</span>
                <Layout size={14} className={selectedPage === p.id ? "text-brand-orange" : "text-brand-grey"} />
              </div>
              <span className="font-mono text-[8px] text-brand-grey uppercase tracking-widest">{p.slug}</span>
            </button>
          ))}
        </div>

        {/* Editor Area */}
        <div className="xl:col-span-3 space-y-8">
           <div className="blueprint-border p-8 bg-brand-carbon overflow-hidden relative">
              <div className="blueprint-grid absolute inset-0 opacity-10 pointer-events-none" />
              
              <div className="relative z-10">
                <div className="flex justify-between items-center mb-12">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-brand-obsidian border border-brand-orange/30 flex items-center justify-center text-brand-orange">
                         <Edit3 size={20} />
                      </div>
                      <h2 className="font-display text-2xl uppercase tracking-tighter">Edit Hero Component</h2>
                   </div>
                   <div className="flex gap-4">
                      <button className="flex items-center gap-2 px-6 py-2 border border-brand-border font-mono text-[10px] uppercase tracking-widest text-brand-grey hover:border-white hover:text-white transition-all">
                         <Eye size={14} /> Preview
                      </button>
                      <button 
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 px-8 py-2 bg-brand-orange text-white font-mono text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all"
                      >
                         {saving ? <RefreshCw size={14} className="animate-spin" /> : <Save size={14} />} 
                         {saving ? "Deploying..." : "Sync Changes"}
                      </button>
                   </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                   {/* Visual Inputs */}
                   <div className="space-y-8">
                      <div className="space-y-3">
                         <label className="flex items-center gap-2 font-mono text-[10px] text-brand-grey uppercase tracking-widest">
                            <Type size={12} className="text-brand-orange" /> Main Headline
                         </label>
                         <textarea 
                           value={config.hero_title}
                           onChange={(e) => setConfig({ ...config, hero_title: e.target.value })}
                           className="w-full bg-brand-obsidian border border-brand-border p-4 font-display text-xl text-white focus:border-brand-orange outline-none min-h-[120px]"
                         />
                      </div>
                      <div className="space-y-3">
                         <label className="flex items-center gap-2 font-mono text-[10px] text-brand-grey uppercase tracking-widest">
                            <Type size={12} className="text-brand-orange" /> Sub-Header Content
                         </label>
                         <textarea 
                           value={config.hero_subtitle}
                           onChange={(e) => setConfig({ ...config, hero_subtitle: e.target.value })}
                           className="w-full bg-brand-obsidian border border-brand-border p-4 font-sans text-xs text-brand-grey focus:border-brand-orange outline-none min-h-[100px]"
                         />
                      </div>
                   </div>

                   {/* Image Selector */}
                   <div className="space-y-8">
                      <div className="space-y-3">
                         <label className="flex items-center gap-2 font-mono text-[10px] text-brand-grey uppercase tracking-widest">
                            <ImageIcon size={12} className="text-brand-orange" /> Background Cinematic Asset (Path)
                         </label>
                         <div className="relative group">
                            <div className="aspect-video bg-brand-obsidian border border-brand-border overflow-hidden mb-4 relative">
                               <img 
                                 src={config.hero_image} 
                                 className="w-full h-full object-cover grayscale opacity-50 group-hover:scale-110 transition-transform duration-700" 
                               />
                               <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian to-transparent" />
                               <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                  <button className="bg-brand-orange text-white px-6 py-2 font-mono text-[10px] uppercase tracking-widest">Change Asset</button>
                               </div>
                            </div>
                            <input 
                              type="text" 
                              value={config.hero_image}
                              onChange={(e) => setConfig({ ...config, hero_image: e.target.value })}
                              className="w-full bg-brand-obsidian border border-brand-border p-4 font-mono text-[10px] text-brand-grey outline-none focus:border-brand-orange"
                            />
                         </div>
                      </div>
                   </div>
                </div>
              </div>
           </div>

           <div className="p-12 border border-brand-border border-dashed text-center">
              <span className="font-mono text-[10px] text-brand-grey uppercase tracking-[0.3em]">Module slots available for secondary components.</span>
           </div>
        </div>
      </div>
    </div>
  );
}
