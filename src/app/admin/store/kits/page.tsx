"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { 
  Briefcase, Plus, Edit, Trash2, Search, Zap, CheckCircle 
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function BuildKitsManagerPage() {
  const [kits, setKits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchKits() {
      const { data } = await supabase
        .from('build_kits')
        .select('*, build_systems(name)')
        .order('sort_order', { ascending: true });
      
      setKits(data || []);
      setLoading(false);
    }
    fetchKits();
  }, []);

  return (
    <div className="p-8">
      <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <div className="flex items-center gap-2 font-mono text-[10px] text-brand-orange uppercase tracking-[0.3em] mb-4">
            <Briefcase size={12} /> Commercial Node: kits.gamma
          </div>
          <h1 className="font-display text-5xl uppercase tracking-tighter text-brand-white">
            Build <span className="text-brand-orange">Kits & Bundles</span>
          </h1>
        </div>
        
        <div className="flex gap-4">
          <button className="px-8 py-4 bg-brand-orange text-brand-white font-mono text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all flex items-center gap-2">
             <Plus size={14} /> Create New Kit
          </button>
        </div>
      </div>

      <div className="blueprint-border bg-brand-carbon overflow-hidden">
        <div className="p-4 bg-brand-obsidian border-b border-brand-border flex justify-between items-center">
           <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-grey" size={14} />
              <input 
                type="text" 
                placeholder="Search kits by name..."
                className="w-full bg-brand-carbon border border-brand-border pl-12 pr-4 py-3 font-mono text-[10px] uppercase text-brand-white outline-none focus:border-brand-orange"
              />
           </div>
        </div>
        <table className="w-full text-left">
           <thead>
              <tr className="bg-brand-obsidian border-b border-brand-border font-mono text-[10px] uppercase tracking-widest text-brand-grey">
                 <th className="p-6">Kit Identity</th>
                 <th className="p-6">System</th>
                 <th className="p-6">Price & Savings</th>
                 <th className="p-4">Status</th>
                 <th className="p-6 text-right">Actions</th>
              </tr>
           </thead>
           <tbody className="font-sans text-xs">
              {kits.length > 0 ? kits.map((k) => (
                <tr key={k.id} className="border-b border-brand-border/50 hover:bg-brand-obsidian transition-colors group">
                   <td className="p-6">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 bg-brand-obsidian border border-brand-border flex items-center justify-center overflow-hidden grayscale group-hover:grayscale-0 transition-all text-brand-grey">
                            {k.image ? <img src={k.image} className="w-full h-full object-cover" /> : <Briefcase size={20} />}
                         </div>
                         <div>
                            <span className="block font-display text-sm uppercase text-brand-white">{k.name}</span>
                            <span className="block font-mono text-[8px] text-brand-grey uppercase tracking-widest">{k.slug} // {k.kit_type || 'physical'}</span>
                         </div>
                      </div>
                   </td>
                   <td className="p-6">
                      <span className="px-2 py-1 bg-brand-obsidian border border-brand-border font-mono text-[8px] uppercase tracking-widest text-brand-grey">
                        {k.build_systems?.name || 'Unassigned'}
                      </span>
                   </td>
                   <td className="p-6">
                      <span className="font-display text-lg text-brand-white">£{(k.kit_price_gbp / 100).toLocaleString()}</span>
                      {k.savings_percentage > 0 && (
                        <span className="block font-mono text-[9px] text-green-500 uppercase mt-1 tracking-widest">
                          Save {k.savings_percentage}%
                        </span>
                      )}
                   </td>
                   <td className="p-6">
                      <div className="flex items-center gap-2">
                        {k.is_active ? <CheckCircle size={14} className="text-green-500" /> : <Zap size={14} className="text-brand-grey" />}
                        <span className="font-mono text-[10px] text-brand-grey uppercase tracking-widest">
                          {k.is_active ? 'Active' : 'Draft'}
                        </span>
                      </div>
                   </td>
                   <td className="p-6 text-right">
                      <div className="flex justify-end gap-3 text-brand-grey">
                         <button className="hover:text-brand-orange transition-colors"><Edit size={16} /></button>
                         <button className="hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                      </div>
                   </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="p-12 text-center border-b border-brand-border/50">
                    <p className="font-mono text-[10px] text-brand-grey uppercase tracking-widest">No kits found. Create one above.</p>
                  </td>
                </tr>
              )}
           </tbody>
        </table>
      </div>
    </div>
  );
}
