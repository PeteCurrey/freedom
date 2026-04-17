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
    { id: 'home', name: 'Home Page', slug: '/' },
    { id: 'about', name: 'About Page', slug: '/about' },
    { id: 'vehicles', name: 'Vehicles Hub', slug: '/vehicles' },
  ]);
  const [selectedPage, setSelectedPage] = useState<string>('home');
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [config, setConfig] = useState<any>({
    hero: {
       title: "ENGINEERING EXCELLENCE FOR THE ROAD AHEAD",
       subtitle: "Definitive resources and premium gear for serious self-build motorhome and campervan conversions.",
       image: "/images/hero-background.png"
    },
    why: {
       eyebrow: "THIS ISN'T VANLIFE",
       title_part: "THIS ISN'T",
       title_orange: "VANLIFE",
       p1: "Forget the Instagram filter. We're here for the builds that run induction hobs off lithium...",
       p2: "This is engineering. This is craft. This is freedom — done properly."
    }
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchConfig() {
      const { data } = await supabase
        .from('site_config')
        .select('*')
        .eq('key', `page_${selectedPage}`)
        .single();
      
      if (data && data.value) {
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
       setSaving(false);
    }
  };

  const sections = [
    { id: 'hero', name: 'Hero Banner', icon: Layout },
    { id: 'why', name: 'Purpose Section', icon: Monitor },
    { id: 'cta', name: 'Global CTA', icon: Edit3 },
  ];

  return (
    <div className="p-8 pb-32">
      {/* Header */}
      <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <div className="flex items-center gap-2 font-mono text-[10px] text-brand-orange uppercase tracking-[.4em] mb-4">
            <Monitor size={12} /> Content Node: cms.main
          </div>
          <h1 className="font-display text-5xl uppercase tracking-tighter text-white">
            Content <span className="text-brand-orange">Management</span>
          </h1>
        </div>
        
        <button 
          onClick={handleSave}
          disabled={saving}
          className="px-12 py-4 bg-brand-orange text-white font-mono text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all flex items-center gap-2"
        >
          {saving ? <RefreshCw size={14} className="animate-spin" /> : <Save size={14} />} 
          {saving ? "Deploying..." : "Sync Page Strategy"}
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Navigation Column */}
        <div className="xl:col-span-1 space-y-8">
           <div className="space-y-4">
              <h3 className="font-mono text-[10px] text-brand-grey uppercase tracking-widest px-2">Page Selection</h3>
              <div className="space-y-2">
                 {pages.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPage(p.id)}
                      className={cn(
                        "w-full p-4 text-left border transition-all",
                        selectedPage === p.id ? "bg-brand-carbon border-brand-orange text-white" : "bg-brand-obsidian border-brand-border text-brand-grey hover:border-brand-grey"
                      )}
                    >
                       <span className="font-display text-sm uppercase tracking-tight">{p.name}</span>
                    </button>
                 ))}
              </div>
           </div>

           <div className="space-y-4">
              <h3 className="font-mono text-[10px] text-brand-grey uppercase tracking-widest px-2">Component Slots</h3>
              <div className="space-y-2">
                 {sections.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setActiveSection(s.id)}
                      className={cn(
                        "w-full p-4 flex items-center gap-4 border transition-all",
                        activeSection === s.id ? "bg-brand-orange text-white border-brand-orange shadow-lg shadow-brand-orange/20" : "bg-brand-obsidian border-brand-border text-brand-grey hover:text-white"
                      )}
                    >
                       <s.icon size={16} />
                       <span className="font-mono text-[10px] uppercase tracking-widest">{s.name}</span>
                    </button>
                 ))}
              </div>
           </div>
        </div>

        {/* Dynamic Editor Panel */}
        <div className="xl:col-span-3">
           <div className="blueprint-border p-12 bg-brand-carbon relative overflow-hidden min-h-[600px]">
              <div className="blueprint-grid absolute inset-0 opacity-10 pointer-events-none" />
              
              <div className="relative z-10 w-full">
                 {activeSection === 'hero' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
                       <h2 className="font-display text-2xl uppercase tracking-tighter text-white border-b border-brand-border pb-6 mb-8">
                          Hero Banner <span className="text-brand-orange">Protocol</span>
                       </h2>
                       
                       <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                          <div className="space-y-8">
                             <div className="space-y-3">
                                <label className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest">Master Headline</label>
                                <textarea 
                                  value={config.hero?.title}
                                  onChange={(e) => setConfig({ ...config, hero: { ...config.hero, title: e.target.value }})}
                                  className="w-full bg-brand-obsidian border border-brand-border p-4 font-display text-xl text-white outline-none focus:border-brand-orange h-32"
                                />
                             </div>
                             <div className="space-y-3">
                                <label className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest">Support Tagline</label>
                                <textarea 
                                  value={config.hero?.subtitle}
                                  onChange={(e) => setConfig({ ...config, hero: { ...config.hero, subtitle: e.target.value }})}
                                  className="w-full bg-brand-obsidian border border-brand-border p-4 font-sans text-xs text-brand-grey outline-none focus:border-brand-orange h-24"
                                />
                             </div>
                          </div>
                          <div className="space-y-6">
                             <label className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest">Cinematic Asset Path</label>
                             <div className="aspect-video bg-brand-obsidian border border-brand-border overflow-hidden relative group mb-4">
                                <img src={config.hero?.image} className="w-full h-full object-cover grayscale opacity-50 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-80" />
                             </div>
                             <input 
                               type="text" 
                               value={config.hero?.image}
                               onChange={(e) => setConfig({ ...config, hero: { ...config.hero, image: e.target.value }})}
                               className="w-full bg-brand-obsidian border border-brand-border p-4 font-mono text-[10px] text-brand-grey outline-none focus:border-brand-orange"
                             />
                          </div>
                       </div>
                    </div>
                 )}

                 {activeSection === 'why' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
                       <h2 className="font-display text-2xl uppercase tracking-tighter text-white border-b border-brand-border pb-6 mb-8">
                          Why We <span className="text-brand-orange">Exist</span> Section
                       </h2>
                       
                       <div className="space-y-8 max-w-2xl">
                          <div className="grid grid-cols-2 gap-6">
                             <div className="space-y-3">
                                <label className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest">Headline Part 1</label>
                                <input 
                                  type="text" 
                                  value={config.why?.title_part}
                                  onChange={(e) => setConfig({ ...config, why: { ...config.why, title_part: e.target.value }})}
                                  className="w-full bg-brand-obsidian border border-brand-border p-4 font-display text-sm text-white outline-none focus:border-brand-orange"
                                />
                             </div>
                             <div className="space-y-3">
                                <label className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest">Accent Text (Orange)</label>
                                <input 
                                  type="text" 
                                  value={config.why?.title_orange}
                                  onChange={(e) => setConfig({ ...config, why: { ...config.why, title_orange: e.target.value }})}
                                  className="w-full bg-brand-obsidian border border-brand-border p-4 font-display text-sm text-brand-orange outline-none focus:border-brand-orange"
                                />
                             </div>
                          </div>

                          <div className="space-y-3">
                             <label className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest">Primary Narrative Block</label>
                             <textarea 
                               value={config.why?.p1}
                               onChange={(e) => setConfig({ ...config, why: { ...config.why, p1: e.target.value }})}
                               className="w-full bg-brand-obsidian border border-brand-border p-4 font-sans text-xs text-brand-grey outline-none focus:border-brand-orange h-32"
                             />
                          </div>

                          <div className="space-y-3">
                             <label className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest">Secondary Reinforcement</label>
                             <textarea 
                               value={config.why?.p2}
                               onChange={(e) => setConfig({ ...config, why: { ...config.why, p2: e.target.value }})}
                               className="w-full bg-brand-obsidian border border-brand-border p-4 font-sans text-xs text-brand-grey outline-none focus:border-brand-orange h-24"
                             />
                          </div>
                       </div>
                    </div>
                 )}

                 {activeSection === 'cta' && (
                    <div className="flex flex-col items-center justify-center h-96 text-center space-y-6">
                       <RefreshCw size={48} className="text-brand-orange/20 animate-spin-slow" />
                       <span className="font-mono text-[10px] text-brand-grey uppercase tracking-[.4em]">Slot Synchronisation in Progress</span>
                       <p className="font-sans text-xs text-brand-grey max-w-xs">Global CTA registry is currently inherited from primary brand guidelines.</p>
                    </div>
                 )}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
