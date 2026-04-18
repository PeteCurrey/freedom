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
  CheckCircle2,
  Trash2
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function MarketingHubPage() {
  const [activeTab, setActiveTab] = useState<"affiliates" | "promotions">("affiliates");
  const [links, setLinks] = useState<any[]>([]);
  const [promotions, setPromotions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      // Fetch Affiliates (Mock for now)
      setLinks([
        { id: 1, name: "Amazon Solar Panels", url: "https://amzn.to/3xyz", clicks: 1240, conv: "4.2%", revenue: 84.50, status: 'active' },
        { id: 2, name: "Victron Multiplus Blue", url: "https://kit.co/freedom/victron", clicks: 890, conv: "2.1%", revenue: 156.00, status: 'active' },
      ]);

      // Fetch Promotions
      const { data: promoData } = await supabase
        .from('site_promotions')
        .select('*')
        .order('priority', { ascending: false });
      
      setPromotions(promoData || []);
      setLoading(false);
    }
    fetchData();
  }, []);

  const togglePromotionStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    const { error } = await supabase
      .from('site_promotions')
      .update({ status: newStatus })
      .eq('id', id);
    
    if (!error) {
      setPromotions(promotions.map(p => p.id === id ? { ...p, status: newStatus } : p));
    }
  };

  if (loading) return null;

  return (
    <div className="p-8 pb-32">
      {/* Header */}
      <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <div className="flex items-center gap-2 font-mono text-[10px] text-brand-orange uppercase tracking-[.4em] mb-4">
            <TrendingUp size={12} /> Marketing Hub: marketing.delta
          </div>
          <h1 className="font-display text-5xl uppercase tracking-tighter text-brand-white">
            Demand <span className="text-brand-orange">Generation</span>
          </h1>
        </div>
        
        <div className="flex bg-brand-carbon border border-brand-border p-1">
           <button 
             onClick={() => setActiveTab("affiliates")}
             className={cn(
               "px-6 py-2 font-mono text-[10px] uppercase tracking-widest transition-all",
               activeTab === "affiliates" ? "bg-brand-orange text-brand-white" : "text-brand-grey hover:text-brand-white"
             )}
           >
             Affiliate Network
           </button>
           <button 
             onClick={() => setActiveTab("promotions")}
             className={cn(
               "px-6 py-2 font-mono text-[10px] uppercase tracking-widest transition-all",
               activeTab === "promotions" ? "bg-brand-orange text-brand-white" : "text-brand-grey hover:text-brand-white"
             )}
           >
             Global Promotions
           </button>
        </div>
      </div>

      {activeTab === "affiliates" ? (
         <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
               <div className="blueprint-border p-8 bg-brand-carbon">
                  <div className="flex justify-between items-start mb-6">
                     <div className="p-3 bg-brand-obsidian border border-brand-border text-brand-orange">
                        <BarChart3 size={20} />
                     </div>
                     <span className="font-mono text-[9px] text-green-500 uppercase">+12.4%</span>
                  </div>
                  <span className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-1">Affiliate Clicks</span>
                  <span className="block font-display text-3xl text-brand-white">2.6k</span>
               </div>
               <div className="blueprint-border p-8 bg-brand-carbon border-l-4 border-brand-orange">
                  <div className="flex justify-between items-start mb-6">
                     <div className="p-3 bg-brand-obsidian border border-brand-border text-brand-orange">
                        <CreditCard size={20} />
                     </div>
                  </div>
                  <span className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-1">Est. Revenue</span>
                  <span className="block font-display text-3xl text-brand-white">£450.50</span>
               </div>
            </div>

            <div className="blueprint-border bg-brand-carbon overflow-hidden">
               <div className="p-6 bg-brand-obsidian border-b border-brand-border flex justify-between items-center">
                  <h3 className="font-display text-sm uppercase tracking-widest text-brand-white">
                     Active <span className="text-brand-orange">Tracking Engines</span>
                  </h3>
               </div>
               <table className="w-full text-left">
                  <thead>
                     <tr className="bg-brand-obsidian border-b border-brand-border font-mono text-[10px] uppercase tracking-widest text-brand-grey">
                        <th className="p-6">Partner</th>
                        <th className="p-6">Clicks</th>
                        <th className="p-6">Revenue</th>
                        <th className="p-6 text-right">Actions</th>
                     </tr>
                  </thead>
                  <tbody className="font-sans text-xs">
                     {links.map((link) => (
                        <tr key={link.id} className="border-b border-brand-border/50 hover:bg-brand-obsidian transition-colors">
                           <td className="p-6">
                              <span className="block font-display text-sm uppercase text-brand-white">{link.name}</span>
                              <span className="block font-mono text-[8px] text-brand-grey uppercase truncate">{link.url}</span>
                           </td>
                           <td className="p-6 font-mono text-brand-white">{link.clicks}</td>
                           <td className="p-6 font-display text-lg text-brand-white">£{link.revenue.toFixed(2)}</td>
                           <td className="p-6 text-right">
                              <button className="p-2 border border-brand-border text-brand-grey hover:text-brand-orange"><Copy size={14} /></button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </>
      ) : (
         <div className="space-y-8">
            <div className="flex justify-between items-center bg-brand-carbon border border-brand-border p-8 blueprint-border relative">
               <div className="blueprint-grid absolute inset-0 opacity-10 pointer-events-none" />
               <div className="relative z-10">
                  <h3 className="font-display text-2xl uppercase tracking-tighter text-brand-white">
                     Banner <span className="text-brand-orange">Control Center</span>
                  </h3>
                  <p className="font-mono text-[10px] text-brand-grey uppercase tracking-widest">Deploy site-wide announcements and sales.</p>
               </div>
               <Link 
                 href="/admin/marketing/promotions/new"
                 className="relative z-10 px-8 py-4 bg-brand-orange text-brand-white font-mono text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all"
               >
                  Create New Promotion
               </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {promotions.map((promo) => (
                 <div key={promo.id} className={cn(
                   "blueprint-border p-8 bg-brand-carbon relative transition-all group",
                   promo.status === 'active' ? "border-brand-orange" : "opacity-60 grayscale"
                 )}>
                    <div className="flex justify-between items-start mb-6">
                       <span className="px-2 py-1 bg-brand-obsidian border border-brand-border font-mono text-[8px] uppercase tracking-[.2em] text-brand-grey italic">
                          Type: {promo.banner_type}
                       </span>
                       <button 
                         onClick={() => togglePromotionStatus(promo.id, promo.status)}
                         className={cn(
                           "w-12 h-6 rounded-full border border-brand-border relative transition-colors p-1",
                           promo.status === 'active' ? "bg-brand-orange border-brand-orange" : "bg-brand-obsidian"
                         )}
                       >
                          <div className={cn(
                            "w-4 h-4 bg-white rounded-full transition-transform",
                            promo.status === 'active' ? "translate-x-6" : "translate-x-0"
                          )} />
                       </button>
                    </div>
                    
                    <h4 className="font-display text-xl uppercase tracking-tight text-brand-white mb-2">
                       {promo.title.split(' ')[0]} <span className="text-brand-orange">{promo.title.split(' ').slice(1).join(' ')}</span>
                    </h4>
                    <p className="font-sans text-xs text-brand-grey mb-6 leading-relaxed line-clamp-2">{promo.content}</p>
                    
                    <div className="flex justify-between items-center pt-6 border-t border-brand-border/50">
                       <span className="font-mono text-[10px] text-brand-grey">Priority: {promo.priority}</span>
                       <div className="flex gap-4">
                          <button className="text-brand-grey hover:text-brand-white transition-colors"><CheckCircle2 size={16} /></button>
                          <button className="text-brand-grey hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                       </div>
                    </div>
                 </div>
               ))}
               {promotions.length === 0 && (
                 <div className="col-span-2 p-20 border border-dashed border-brand-border text-center">
                    <span className="font-mono text-[10px] text-brand-grey uppercase tracking-widest opacity-30">No active promotions deployed in this sector.</span>
                 </div>
               )}
            </div>
         </div>
      )}
    </div>
  );
}
