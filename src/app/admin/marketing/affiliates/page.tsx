"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { 
  Plus, 
  Trash2, 
  ArrowLeft, 
  Globe, 
  TrendingUp, 
  Activity,
  Layers
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function GlobalAffiliateHub() {
  const [affiliates, setAffiliates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newAffiliate, setNewAffiliate] = useState({
    name: "",
    network: "ebay",
    base_url: "",
    tracking_id: "",
    is_active: true
  });

  useEffect(() => {
    fetchAffiliates();
  }, []);

  async function fetchAffiliates() {
    setLoading(true);
    const { data } = await supabase
      .from('affiliate_management')
      .select('*')
      .order('name');
    
    setAffiliates(data || []);
    setLoading(false);
  }

  const handleAddPartner = async () => {
    if (!newAffiliate.name || !newAffiliate.base_url) return alert("Name and Base URL are required.");
    
    const { error } = await supabase.from('affiliate_management').insert([newAffiliate]);

    if (error) {
      alert("Error adding partner: " + error.message);
    } else {
      setNewAffiliate({ name: "", network: "ebay", base_url: "", tracking_id: "", is_active: true });
      fetchAffiliates();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this global affiliate partner? This will orphan any marketplaces or products linked to it.")) return;
    await supabase.from('affiliate_management').delete().eq('id', id);
    fetchAffiliates();
  };

  const toggleStatus = async (id: string, current: boolean) => {
    await supabase.from('affiliate_management').update({ is_active: !current }).eq('id', id);
    fetchAffiliates();
  };

  return (
    <div className="p-8 pb-32 min-h-screen bg-brand-obsidian text-brand-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link href="/admin/marketing" className="flex items-center gap-2 font-mono text-[10px] text-brand-orange uppercase tracking-[0.3em] mb-8 hover:text-brand-white transition-colors">
            <ArrowLeft size={12} /> Back to Marketing Hub
          </Link>
          
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <div>
              <h1 className="font-display text-5xl uppercase tracking-tighter text-brand-white flex items-center gap-4">
                <Globe className="w-10 h-10 text-brand-orange" />
                Global <span className="text-brand-orange">Affiliates</span>
              </h1>
              <p className="font-mono text-xs text-brand-grey uppercase tracking-widest mt-4 max-w-2xl">
                Centralized partner management for eBay, Awin, Sovrn, and direct brand relationships.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Add Partner Form */}
          <div className="lg:col-span-1">
             <div className="blueprint-border bg-brand-carbon p-8 sticky top-8">
                <h2 className="font-display text-lg uppercase text-brand-orange mb-6 flex items-center gap-3">
                   <Plus className="w-5 h-5" /> Enlist Partner
                </h2>
                <div className="space-y-6">
                   <div className="space-y-2">
                      <label className="font-mono text-[9px] uppercase tracking-widest text-brand-grey">Partner Name</label>
                      <input 
                        type="text" 
                        value={newAffiliate.name}
                        onChange={e => setNewAffiliate({...newAffiliate, name: e.target.value})}
                        placeholder="e.g. Awin - Victron Energy"
                        className="w-full bg-brand-obsidian p-4 font-sans text-sm outline-none border border-brand-border focus:border-brand-orange text-brand-white"
                      />
                   </div>
                   
                   <div className="space-y-2">
                      <label className="font-mono text-[9px] uppercase tracking-widest text-brand-grey">Network Layer</label>
                      <select 
                        value={newAffiliate.network}
                        onChange={e => setNewAffiliate({...newAffiliate, network: e.target.value})}
                        className="w-full bg-brand-obsidian p-4 font-sans text-sm outline-none border border-brand-border focus:border-brand-orange text-brand-white appearance-none"
                      >
                         <option value="ebay">eBay Partner Network</option>
                         <option value="awin">Awin / Affiliate Window</option>
                         <option value="sovrn">Sovrn // Commerce</option>
                         <option value="amazon">Amazon Associates</option>
                         <option value="direct">Direct Brand Relationship</option>
                         <option value="other">Other Protocol</option>
                      </select>
                   </div>

                   <div className="space-y-2">
                      <label className="font-mono text-[9px] uppercase tracking-widest text-brand-grey">Base Tracking URL</label>
                      <input 
                        type="text" 
                        value={newAffiliate.base_url}
                        onChange={e => setNewAffiliate({...newAffiliate, base_url: e.target.value})}
                        placeholder="https://t.awin.com/..."
                        className="w-full bg-brand-obsidian p-4 font-mono text-[10px] outline-none border border-brand-border focus:border-brand-orange text-brand-white"
                      />
                   </div>

                   <div className="space-y-2">
                      <label className="font-mono text-[9px] uppercase tracking-widest text-brand-grey">Universal tracking ID</label>
                      <input 
                        type="text" 
                        value={newAffiliate.tracking_id}
                        onChange={e => setNewAffiliate({...newAffiliate, tracking_id: e.target.value})}
                        placeholder="e.g. 5339..."
                        className="w-full bg-brand-obsidian p-4 font-mono text-[10px] outline-none border border-brand-border focus:border-brand-orange text-white"
                      />
                   </div>

                   <button 
                    onClick={handleAddPartner}
                    className="w-full py-5 bg-brand-orange text-brand-white font-mono text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all flex items-center justify-center gap-3"
                   >
                      <Layers size={14} /> Initialize Route
                   </button>
                </div>
             </div>
          </div>

          {/* Partners List */}
          <div className="lg:col-span-2 space-y-6">
             <div className="flex items-center justify-between mb-2">
                <h2 className="font-display text-[10px] uppercase tracking-[0.3em] text-brand-grey">Active Infrastructure Nodes</h2>
                <div className="flex items-center gap-4 font-mono text-[9px] text-brand-orange uppercase">
                   <Activity className="w-3 h-3 animate-pulse" /> Live Telemetry
                </div>
             </div>

             {loading ? (
                <div className="p-20 text-center border border-dashed border-brand-border text-brand-grey font-mono text-[10px] uppercase tracking-widest">
                   Synchronizing with registry...
                </div>
             ) : affiliates.length === 0 ? (
                <div className="p-20 text-center border border-dashed border-brand-border text-brand-grey font-mono text-[10px] uppercase tracking-widest">
                   No affiliate partners configured.
                </div>
             ) : (
                <div className="grid grid-cols-1 gap-6">
                   {affiliates.map((partner) => (
                      <div key={partner.id} className="group relative bg-brand-carbon border border-brand-border hover:border-brand-orange/50 transition-all p-8">
                         <div className="flex justify-between items-start">
                            <div className="space-y-4 flex-1">
                               <div className="flex items-center gap-4">
                                  <h3 className="font-display text-2xl uppercase tracking-wider group-hover:text-brand-orange transition-colors">
                                     {partner.name}
                                  </h3>
                                  <span className="px-3 py-1 bg-brand-obsidian border border-brand-border font-mono text-[8px] text-brand-grey uppercase tracking-widest">
                                     {partner.network}
                                  </span>
                               </div>
                               
                               <div className="flex flex-col md:flex-row gap-6">
                                  <div className="space-y-1">
                                     <span className="block font-mono text-[8px] text-brand-grey uppercase tracking-widest">Target Protocol</span>
                                     <span className="block font-mono text-[10px] text-brand-white truncate max-w-[250px]">{partner.base_url}</span>
                                  </div>
                                  <div className="space-y-1">
                                     <span className="block font-mono text-[8px] text-brand-grey uppercase tracking-widest">Tracking ID</span>
                                     <span className="block font-mono text-[10px] text-brand-white">{partner.tracking_id || 'Global Dynamic'}</span>
                                  </div>
                               </div>
                            </div>

                            <div className="flex flex-col items-end gap-6">
                               <div className="text-right">
                                  <span className="block font-display text-2xl text-brand-orange leading-none">
                                     {partner.last_click_at ? new Date(partner.last_click_at).toLocaleDateString() : 'NO DATA'}
                                  </span>
                                  <span className="block font-mono text-[7px] text-brand-grey uppercase tracking-widest mt-1">Last Transmission</span>
                               </div>
                               
                               <div className="flex items-center gap-4">
                                  <button 
                                    onClick={() => toggleStatus(partner.id, partner.is_active)}
                                    className={cn(
                                      "px-4 py-1.5 font-mono text-[8px] uppercase tracking-widest border transition-all",
                                      partner.is_active 
                                        ? "border-green-500/30 text-green-500 bg-green-500/5" 
                                        : "border-red-500/30 text-red-500 bg-red-500/5 hover:border-green-500/50"
                                    )}
                                  >
                                    {partner.is_active ? 'Online' : 'Offline'}
                                  </button>
                                  <button onClick={() => handleDelete(partner.id)} className="text-brand-grey hover:text-red-500 transition-colors">
                                     <Trash2 size={16} />
                                  </button>
                               </div>
                            </div>
                         </div>
                         
                         {/* Visual Data Bar */}
                         <div className="absolute bottom-0 left-0 h-[2px] bg-brand-orange/20 w-full overflow-hidden">
                            <div className="h-full bg-brand-orange w-1/3 animate-[shimmer_2s_infinite]" />
                         </div>
                      </div>
                   ))}
                </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}
