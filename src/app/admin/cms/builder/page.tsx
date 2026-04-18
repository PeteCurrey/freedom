"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Plus, 
  Sparkles, 
  Layout, 
  Globe, 
  FileText, 
  Search, 
  Save, 
  Loader2,
  CheckCircle2,
  ArrowRight,
  ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function LandingPageBuilder() {
  const [topic, setTopic] = useState("");
  const [location, setLocation] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [pages, setPages] = useState<any[]>([]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    // Simulate AI Generation of landing page variations
    setTimeout(() => {
      const slug = topic.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      const locSlug = location ? `-${location.toLowerCase().replace(/\s+/g, '-')}` : '';
      
      const newPage = {
        id: Math.random().toString(36).substr(2, 9),
        title: `${topic} ${location ? 'in ' + location : ''}`,
        slug: `${slug}${locSlug}`,
        status: 'draft',
        seo_score: 85
      };
      
      setPages([newPage, ...pages]);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-2 font-mono text-[10px] text-brand-orange uppercase tracking-[0.3em] mb-4">
          <Globe size={12} /> Search Engine Node: landing.builder
        </div>
        <h1 className="font-display text-5xl uppercase tracking-tighter text-brand-white">
          SEO Page <span className="text-brand-orange">Architect</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
        {/* Generator Controls */}
        <div className="xl:col-span-1 space-y-8">
          <div className="blueprint-border p-8 bg-brand-carbon">
             <h3 className="font-display text-xl uppercase mb-8">Deploy Page Strategy</h3>
             
             <div className="space-y-6">
                <div>
                   <label className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-2">Primary Keyword / Trend</label>
                   <input 
                     type="text" 
                     value={topic}
                     onChange={(e) => setTopic(e.target.value)}
                     placeholder="e.g. Winter Vanliving Guide"
                     className="w-full bg-brand-obsidian border border-brand-border p-4 font-mono text-xs text-brand-white focus:border-brand-orange outline-none"
                   />
                </div>

                <div>
                   <label className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-2">Location Target (Optional)</label>
                   <input 
                     type="text" 
                     value={location}
                     onChange={(e) => setLocation(e.target.value)}
                     placeholder="e.g. United Kingdom"
                     className="w-full bg-brand-obsidian border border-brand-border p-4 font-mono text-xs text-brand-white focus:border-brand-orange outline-none"
                   />
                </div>

                <div className="pt-4">
                  <button 
                    onClick={handleGenerate}
                    disabled={isGenerating || !topic}
                    className="w-full py-5 bg-brand-orange text-brand-white font-display text-sm uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Architecting Landing Pages...
                      </>
                    ) : (
                      <>
                        <Sparkles size={18} /> Deploy AI Landing Set
                      </>
                    )}
                  </button>
                </div>
             </div>
          </div>

          <div className="p-8 border border-brand-border border-dashed">
             <div className="flex items-center gap-3 mb-4">
               <Search className="text-brand-orange" size={16} />
               <h3 className="font-mono text-[10px] uppercase tracking-widest text-brand-orange">SEO Optimization Protocol</h3>
             </div>
             <p className="font-mono text-[9px] text-brand-grey leading-relaxed uppercase">
               The architect will automatically generate H1-H3 hierarchies, meta-descriptions, and content blocks optimized for search visibility and technical authority.
             </p>
          </div>
        </div>

        {/* Existing Pages / Queue */}
        <div className="xl:col-span-2 space-y-8">
           <div className="flex justify-between items-center">
              <h2 className="font-display text-xl uppercase tracking-tighter">SEO Sector Map</h2>
              <div className="flex gap-4">
                <span className="font-mono text-[10px] text-brand-grey uppercase tracking-widest">{pages.length} Pages Managed</span>
              </div>
           </div>

           <div className="space-y-4">
              {pages.map((p) => (
                <div key={p.id} className="blueprint-border p-6 bg-brand-carbon flex flex-col md:flex-row justify-between items-center gap-6 group hover:border-brand-orange transition-all">
                  <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 flex items-center justify-center bg-brand-obsidian border border-brand-border group-hover:bg-brand-orange group-hover:text-brand-white transition-all text-brand-orange">
                      <Layout size={24} />
                    </div>
                    <div>
                      <h3 className="font-display text-lg uppercase text-brand-white">
                        {p.title.split(' ')[0]} <span className="text-brand-orange">{p.title.split(' ').slice(1).join(' ')}</span>
                      </h3>
                      <div className="flex items-center gap-3">
                         <span className="font-mono text-[8px] text-brand-grey uppercase tracking-widest">Slug: /{p.slug}</span>
                         <span className="w-1 h-1 rounded-full bg-brand-orange" />
                         <span className="font-mono text-[8px] text-green-500 uppercase tracking-widest">SEO: {p.seo_score}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                     <button className="px-6 py-2 border border-brand-border font-mono text-[9px] uppercase tracking-widest hover:border-brand-orange transition-colors">Edit Content</button>
                     <button className="px-6 py-2 bg-brand-obsidian border border-brand-border font-mono text-[9px] uppercase tracking-widest text-brand-orange hover:border-brand-orange transition-colors">Publish</button>
                  </div>
                </div>
              ))}
              
              {pages.length === 0 && (
                <div className="blueprint-border p-20 text-center border-dashed opacity-50">
                   <Globe size={48} className="text-brand-grey mx-auto mb-6 opacity-30" />
                   <p className="font-mono text-[10px] text-brand-grey uppercase tracking-widest">
                     No landing pages deployed. Start a new generation set above.
                   </p>
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
}
