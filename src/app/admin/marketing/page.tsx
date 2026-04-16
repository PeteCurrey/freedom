"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Link as LinkIcon, 
  ExternalLink, 
  TrendingUp, 
  Users, 
  Plus, 
  Search, 
  Copy,
  BarChart3,
  CreditCard,
  CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AffiliatesManagerPage() {
  const [links, setLinks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated fetch of affiliate links
    setLinks([
      { id: 1, name: "Amazon Solar Panels", url: "https://amzn.to/3xyz", clicks: 1240, conv: "4.2%", revenue: 84.50, status: 'active' },
      { id: 2, name: "Victron Multiplus Blue", url: "https://kit.co/freedom/victron", clicks: 890, conv: "2.1%", revenue: 156.00, status: 'active' },
      { id: 3, name: "Jackery Explorer 1000", url: "https://jackery.com/freedom", clicks: 450, conv: "1.8%", revenue: 210.00, status: 'active' },
    ]);
    setLoading(false);
  }, []);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <div className="flex items-center gap-2 font-mono text-[10px] text-brand-orange uppercase tracking-[.4em] mb-4">
            <LinkIcon size={12} /> Affiliate Node: marketing.delta
          </div>
          <h1 className="font-display text-5xl uppercase tracking-tighter text-white">
            Link <span className="text-brand-orange">Authority</span>
          </h1>
        </div>
        
        <button className="px-8 py-4 bg-brand-orange text-white font-mono text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all flex items-center gap-2">
           <Plus size={14} /> New Tracking ID
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
         <div className="blueprint-border p-8 bg-brand-carbon">
            <div className="flex justify-between items-start mb-6">
               <div className="p-3 bg-brand-obsidian border border-brand-border text-brand-orange">
                  <BarChart3 size={20} />
               </div>
               <span className="font-mono text-[9px] text-green-500 uppercase">+12.4% vs last mo</span>
            </div>
            <span className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-1">Total Affiliate Reach</span>
            <span className="block font-display text-3xl text-white">2.6k Clicks</span>
         </div>

         <div className="blueprint-border p-8 bg-brand-carbon border-l-4 border-brand-orange">
            <div className="flex justify-between items-start mb-6">
               <div className="p-3 bg-brand-obsidian border border-brand-border text-brand-orange">
                  <CreditCard size={20} />
               </div>
            </div>
            <span className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-1">Est. Commission (MTD)</span>
            <span className="block font-display text-3xl text-white">£450.50</span>
         </div>

         <div className="blueprint-border p-8 bg-brand-carbon">
            <div className="flex justify-between items-start mb-6">
               <div className="p-3 bg-brand-obsidian border border-brand-border text-brand-orange">
                  <TrendingUp size={20} />
               </div>
            </div>
            <span className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-1">Conversion Node</span>
            <span className="block font-display text-3xl text-white">2.8% AVG</span>
         </div>
      </div>

      <div className="blueprint-border bg-brand-carbon overflow-hidden">
        <div className="p-6 bg-brand-obsidian border-b border-brand-border flex justify-between items-center">
           <h3 className="font-display text-sm uppercase tracking-widest">Active Tracking Engines</h3>
           <div className="flex gap-4">
              <div className="relative">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-grey" size={14} />
                 <input 
                   type="text" 
                   placeholder="Filter links..."
                   className="bg-brand-carbon border border-brand-border pl-10 pr-4 py-2 font-mono text-[10px] uppercase text-white outline-none focus:border-brand-orange"
                 />
              </div>
           </div>
        </div>
        <table className="w-full text-left">
           <thead>
              <tr className="bg-brand-obsidian border-b border-brand-border font-mono text-[10px] uppercase tracking-widest text-brand-grey">
                 <th className="p-6">Partner / Campaign</th>
                 <th className="p-6">Clicks</th>
                 <th className="p-6">Conversion</th>
                 <th className="p-6">Revenue</th>
                 <th className="p-6 text-right">Actions</th>
              </tr>
           </thead>
           <tbody className="font-sans text-xs">
              {links.map((link) => (
                <tr key={link.id} className="border-b border-brand-border/50 hover:bg-brand-obsidian transition-colors group">
                   <td className="p-6">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 bg-brand-obsidian border border-brand-border flex items-center justify-center text-brand-grey group-hover:text-brand-orange transition-all">
                            <LinkIcon size={18} />
                         </div>
                         <div>
                            <span className="block font-display text-sm uppercase text-white">{link.name}</span>
                            <span className="block font-mono text-[8px] text-brand-grey uppercase tracking-widest truncate max-w-[200px]">{link.url}</span>
                         </div>
                      </div>
                   </td>
                   <td className="p-6">
                      <span className="font-mono text-xs text-white">{link.clicks.toLocaleString()}</span>
                   </td>
                   <td className="p-6">
                      <span className="font-mono text-xs text-green-500">{link.conv}</span>
                   </td>
                   <td className="p-6">
                      <span className="font-display text-lg text-white">£{link.revenue.toFixed(2)}</span>
                   </td>
                   <td className="p-6 text-right">
                      <div className="flex justify-end gap-3">
                         <button className="p-2 border border-brand-border hover:border-brand-orange text-brand-grey hover:text-brand-orange transition-all"><Copy size={14} /></button>
                         <button className="p-2 border border-brand-border hover:border-brand-orange text-brand-grey hover:text-brand-orange transition-all"><ExternalLink size={14} /></button>
                      </div>
                   </td>
                </tr>
              ))}
           </tbody>
        </table>
      </div>
    </div>
  );
}
