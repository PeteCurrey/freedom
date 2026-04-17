"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Globe, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Zap,
  Eye
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function SEOMetadataManagerPage() {
  const [metadata, setMetadata] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState<any>(null);

  useEffect(() => {
    async function fetchMetadata() {
      const { data } = await supabase
        .from('site_metadata')
        .select('*')
        .order('route_path', { ascending: true });
      
      setMetadata(data || []);
      setLoading(false);
    }
    fetchMetadata();
  }, []);

  const saveMetadata = async (item: any) => {
    const { error } = await supabase
      .from('site_metadata')
      .upsert(item)
      .eq('id', item.id);
    
    if (!error) {
       setMetadata(metadata.map(m => m.id === item.id ? item : m));
       setIsEditing(null);
    }
  };

  if (loading) return null;

  return (
    <div className="p-8 pb-32">
      {/* Header */}
      <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <div className="flex items-center gap-2 font-mono text-[10px] text-brand-orange uppercase tracking-[0.3em] mb-4">
            <Globe size={12} /> Search Node: seo.omega
          </div>
          <h1 className="font-display text-5xl uppercase tracking-tighter text-white">
            Metadata <span className="text-brand-orange">Authority</span>
          </h1>
        </div>
        
        <button 
          onClick={() => setIsEditing({ 
            route_path: "/", 
            title: "", 
            description: "", 
            no_index: false 
          })}
          className="px-8 py-4 bg-brand-orange text-white font-mono text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all flex items-center gap-2"
        >
           <Plus size={14} /> New Route Override
        </button>
      </div>

      {/* SEO Health Quick Look */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
         {[
           { label: "Indexing Status", value: "Optimal", icon: ShieldCheck, color: "text-green-500" },
           { label: "Route Overrides", value: metadata.length, icon: Globe, color: "text-brand-orange" },
           { label: "Search Velocity", value: "2.4s Avg", icon: Zap, color: "text-brand-amber" },
         ].map((stat, i) => (
           <div key={i} className="blueprint-border p-8 bg-brand-carbon flex items-center justify-between">
              <div>
                 <span className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-1">{stat.label}</span>
                 <span className="block font-display text-3xl text-white">{stat.value}</span>
              </div>
              <stat.icon className={cn("w-8 h-8 opacity-20", stat.color)} />
           </div>
         ))}
      </div>

      <div className="blueprint-border bg-brand-carbon overflow-hidden">
        <div className="p-6 bg-brand-obsidian border-b border-brand-border flex justify-between items-center">
           <h3 className="font-display text-sm uppercase tracking-widest text-white">Route Specific Overrides</h3>
        </div>
        <table className="w-full text-left">
           <thead>
              <tr className="bg-brand-obsidian border-b border-brand-border font-mono text-[10px] uppercase tracking-widest text-brand-grey">
                 <th className="p-6">Route Path</th>
                 <th className="p-6">SEO Metadata Payload</th>
                 <th className="p-6">Index</th>
                 <th className="p-6 text-right">Actions</th>
              </tr>
           </thead>
           <tbody className="font-sans text-xs">
              {metadata.map((item) => (
                <tr key={item.id} className="border-b border-brand-border/50 hover:bg-brand-obsidian transition-colors group">
                   <td className="p-6">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 bg-brand-obsidian border border-brand-border flex items-center justify-center text-brand-grey">
                            <ChevronRight size={14} />
                         </div>
                         <span className="font-mono text-[10px] text-brand-orange uppercase tracking-widest">{item.route_path}</span>
                      </div>
                   </td>
                   <td className="p-6">
                      <div className="max-w-md space-y-1">
                         <span className="block font-display text-xs text-white uppercase truncate">{item.title}</span>
                         <span className="block font-sans text-[10px] text-brand-grey line-clamp-1">{item.description}</span>
                      </div>
                   </td>
                   <td className="p-6">
                      <span className={cn(
                        "px-2 py-0.5 border font-mono text-[8px] uppercase tracking-widest",
                        item.no_index ? "text-red-500 border-red-500/30" : "text-green-500 border-green-500/30"
                      )}>
                        {item.no_index ? 'NoIndex' : 'Index'}
                      </span>
                   </td>
                   <td className="p-6 text-right">
                      <div className="flex justify-end gap-3 text-brand-grey opacity-0 group-hover:opacity-100 transition-opacity">
                         <button onClick={() => setIsEditing(item)} className="hover:text-white transition-colors"><Edit3 size={16} /></button>
                         <Link href={item.route_path} target="_blank" className="hover:text-brand-orange transition-colors"><ExternalLink size={16} /></Link>
                         <button className="hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                      </div>
                   </td>
                </tr>
              ))}
              {metadata.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-12 text-center font-mono text-[10px] text-brand-grey uppercase">No custom route nodes detected.</td>
                </tr>
              )}
           </tbody>
        </table>
      </div>

      {/* Edit Modal Placeholder */}
      {isEditing && (
        <div className="fixed inset-0 bg-brand-obsidian/80 backdrop-blur-sm z-[200] flex items-center justify-center p-6">
           <div className="blueprint-border bg-brand-carbon w-full max-w-2xl p-12 relative overflow-hidden">
              <div className="blueprint-grid absolute inset-0 opacity-10 pointer-events-none" />
              
              <div className="relative z-10 space-y-8">
                 <div className="flex justify-between items-start mb-4">
                    <h2 className="font-display text-3xl uppercase tracking-tighter text-white">Deploy Route <span className="text-brand-orange">Override</span></h2>
                    <button onClick={() => setIsEditing(null)} className="text-brand-grey hover:text-white">Abort Sync</button>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                       <label className="font-mono text-[10px] text-brand-grey uppercase tracking-widest">Target Path</label>
                       <input 
                         type="text" 
                         value={isEditing.route_path}
                         onChange={(e) => setIsEditing({ ...isEditing, route_path: e.target.value })}
                         className="w-full bg-brand-obsidian border border-brand-border p-4 font-mono text-[10px] text-white outline-none focus:border-brand-orange"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="font-mono text-[10px] text-brand-grey uppercase tracking-widest">Index Visibility</label>
                       <select 
                         value={isEditing.no_index ? 'true' : 'false'}
                         onChange={(e) => setIsEditing({ ...isEditing, no_index: e.target.value === 'true' })}
                         className="w-full bg-brand-obsidian border border-brand-border p-4 font-mono text-[10px] text-white outline-none focus:border-brand-orange"
                       >
                          <option value="false">ACTIVE INDEX</option>
                          <option value="true">NO_INDEX PROTOCOL</option>
                       </select>
                    </div>
                 </div>

                 <div className="space-y-2">
                    <label className="font-mono text-[10px] text-brand-grey uppercase tracking-widest">Optimized Title (70 chars max)</label>
                    <input 
                      type="text" 
                      value={isEditing.title}
                      onChange={(e) => setIsEditing({ ...isEditing, title: e.target.value })}
                      className="w-full bg-brand-obsidian border border-brand-border p-4 font-sans text-xs text-white outline-none focus:border-brand-orange font-bold uppercase"
                      placeholder="Amplios // Engineering Excellence"
                    />
                 </div>

                 <div className="space-y-2">
                    <label className="font-mono text-[10px] text-brand-grey uppercase tracking-widest">Strategic Description (160 chars max)</label>
                    <textarea 
                      value={isEditing.description}
                      onChange={(e) => setIsEditing({ ...isEditing, description: e.target.value })}
                      className="w-full bg-brand-obsidian border border-brand-border p-4 font-sans text-xs text-brand-grey outline-none focus:border-brand-orange h-32"
                    />
                 </div>

                 <button 
                   onClick={() => saveMetadata(isEditing)}
                   className="w-full py-4 bg-brand-orange text-white font-mono text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all"
                 >
                    Push Strategy to Live Route
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
