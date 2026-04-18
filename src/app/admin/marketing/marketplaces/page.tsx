"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { Plus, Trash2, ArrowLeft, Link as LinkIcon } from "lucide-react";

const SUPPORTED_VEHICLES = [
  { id: "mercedes-sprinter", name: "Mercedes Sprinter" },
  { id: "vw-crafter", name: "VW Crafter" },
  { id: "ford-transit", name: "Ford Transit" },
  { id: "fiat-ducato", name: "Fiat Ducato" },
  { id: "man-tge", name: "MAN TGE" },
  { id: "iveco-daily", name: "Iveco Daily" },
];

export default function MarketplaceLinksManager() {
  const [links, setLinks] = useState<any[]>([]);
  const [affiliates, setAffiliates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVehicle, setSelectedVehicle] = useState(SUPPORTED_VEHICLES[0].id);
  const [newMarketplace, setNewMarketplace] = useState({ 
    name: "", 
    url: "", 
    icon: "external",
    affiliate_id: "",
    listing_label: ""
  });

  useEffect(() => {
    fetchData();
  }, [selectedVehicle]);

  async function fetchData() {
    setLoading(true);
    
    // Fetch Marketplace Links
    const { data: linkData } = await supabase
      .from('vehicle_marketplaces')
      .select('*, affiliate_management(name)')
      .eq('vehicle_id', selectedVehicle)
      .order('created_at', { ascending: true });
    
    setLinks(linkData || []);

    // Fetch Global Affiliates
    const { data: affiliateData } = await supabase
      .from('affiliate_management')
      .select('id, name')
      .order('name');
    
    setAffiliates(affiliateData || []);
    setLoading(false);
  }

  const handleAddLink = async () => {
    if (!newMarketplace.name || !newMarketplace.url) return alert("Name and URL are required.");
    
    // Auto format url
    let formattedUrl = newMarketplace.url;
    if (!formattedUrl.startsWith('http') && !newMarketplace.affiliate_id) {
      formattedUrl = `https://${formattedUrl}`;
    }

    const { error } = await supabase.from('vehicle_marketplaces').insert([{
      vehicle_id: selectedVehicle,
      marketplace_name: newMarketplace.name,
      affiliate_url: formattedUrl,
      icon_type: newMarketplace.icon,
      affiliate_id: newMarketplace.affiliate_id || null,
      listing_label: newMarketplace.listing_label || null,
      is_active: true
    }]);

    if (error) {
      alert("Error adding link: " + error.message);
    } else {
      setNewMarketplace({ name: "", url: "", icon: "external", affiliate_id: "", listing_label: "" });
      fetchData();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this marketplace link?")) return;
    await supabase.from('vehicle_marketplaces').delete().eq('id', id);
    fetchLinks();
  };

  return (
    <div className="p-8 pb-32 min-h-screen bg-brand-obsidian text-white">
      <div className="max-w-5xl mx-auto">
        <Link href="/admin/dashboard" className="flex items-center gap-2 font-mono text-[10px] text-brand-orange uppercase tracking-[0.3em] mb-8 hover:text-white transition-colors">
          <ArrowLeft size={12} /> Back to Hub
        </Link>
        
        <h1 className="font-display text-5xl uppercase tracking-tighter mb-4 flex items-center gap-4">
          <LinkIcon className="text-brand-orange w-10 h-10" /> Used Van <span className="text-brand-orange">Marketplaces</span>
        </h1>
        <p className="font-sans text-brand-grey max-w-2xl text-lg mb-12">
          Manage dynamic affiliate redirects dynamically injected into the public `/find-a-van` directory.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           {/* Sidebar Selectors */}
           <div className="lg:col-span-1 space-y-4">
             <h2 className="font-display text-[10px] uppercase text-brand-grey tracking-[0.3em] mb-4">Select Chassis</h2>
             {SUPPORTED_VEHICLES.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVehicle(v.id)}
                  className={`w-full p-4 border text-left font-display text-sm uppercase tracking-widest transition-all ${
                    selectedVehicle === v.id 
                      ? "bg-brand-orange/10 border-brand-orange text-white" 
                      : "bg-brand-carbon border-brand-border text-brand-grey hover:border-brand-orange/50"
                  }`}
                >
                  {v.name}
                </button>
             ))}
           </div>

           {/* Main View */}
           <div className="lg:col-span-2 space-y-8">
               {/* Add New Panel */}
               <div className="bg-brand-carbon border border-brand-border p-6">
                  <h2 className="font-mono text-[10px] text-brand-orange uppercase tracking-widest mb-4">Register New Route</h2>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                     <div className="space-y-4">
                        <input 
                          type="text" 
                          value={newMarketplace.name}
                          onChange={e => setNewMarketplace({...newMarketplace, name: e.target.value})}
                          placeholder="e.g. eBay Motors UK"
                          className="w-full bg-brand-obsidian p-3 font-sans text-sm outline-none focus:border-brand-orange border border-brand-border text-white"
                        />
                        <select 
                          value={newMarketplace.icon}
                          onChange={e => setNewMarketplace({...newMarketplace, icon: e.target.value})}
                          className="w-full bg-brand-obsidian p-3 font-sans text-sm outline-none focus:border-brand-orange border border-brand-border text-brand-grey appearance-none"
                        >
                           <option value="external">Standard Link Icon</option>
                           <option value="ebay">eBay Motors Icon</option>
                           <option value="autotrader">AutoTrader Icon</option>
                           <option value="vantrader">Van Trader Icon</option>
                        </select>
                     </div>
                     <div className="space-y-4">
                        <select 
                          value={newMarketplace.affiliate_id}
                          onChange={e => setNewMarketplace({...newMarketplace, affiliate_id: e.target.value})}
                          className="w-full bg-brand-obsidian p-3 font-sans text-sm outline-none focus:border-brand-orange border border-brand-border text-white appearance-none"
                        >
                           <option value="">No Global Partner Link</option>
                           {affiliates.map(a => (
                             <option key={a.id} value={a.id}>{a.name}</option>
                           ))}
                        </select>
                        <input 
                          type="text" 
                          value={newMarketplace.listing_label}
                          onChange={e => setNewMarketplace({...newMarketplace, listing_label: e.target.value})}
                          placeholder="Button Label: VIEW ON EBAY"
                          className="w-full bg-brand-obsidian p-3 font-sans text-sm outline-none focus:border-brand-orange border border-brand-border text-white"
                        />
                     </div>
                  </div>
                  <input 
                    type="text" 
                    value={newMarketplace.url}
                    onChange={e => setNewMarketplace({...newMarketplace, url: e.target.value})}
                    placeholder="Affiliate URL or Listing ID (if linked to partner)"
                    className="w-full bg-brand-obsidian p-3 font-mono text-xs outline-none focus:border-brand-orange border border-brand-border text-white mb-4"
                  />
                  <button 
                   onClick={handleAddLink}
                   className="w-full py-4 bg-brand-orange text-white font-mono text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-orange flex items-center justify-center gap-2 transition-all"
                  >
                     <Plus size={14} /> Inject Routing Node
                  </button>
               </div>

              {/* Active Links Table */}
              <div className="bg-brand-carbon border border-brand-border overflow-hidden">
                 <div className="p-4 bg-brand-obsidian border-b border-brand-border">
                    <h2 className="font-mono text-[10px] text-brand-grey uppercase tracking-widest">Active Routes for {SUPPORTED_VEHICLES.find(v => v.id === selectedVehicle)?.name}</h2>
                 </div>
                 <div className="divide-y divide-brand-border/50">
                     {loading ? (
                        <div className="p-8 text-center text-brand-grey font-mono text-xs">Scanning registry...</div>
                     ) : links.length === 0 ? (
                        <div className="p-8 text-center text-brand-grey font-mono text-[10px] uppercase tracking-widest">No affiliate routes registered for this chassis.</div>
                     ) : (
                        links.map(link => (
                           <div key={link.id} className="p-6 flex items-center justify-between hover:bg-brand-obsidian transition-colors">
                              <div className="flex-1">
                                 <div className="flex items-center gap-3 mb-1">
                                    <span className="block font-display text-xl uppercase tracking-wider">{link.marketplace_name}</span>
                                    {link.affiliate_management && (
                                       <span className="px-2 py-0.5 bg-brand-orange/10 border border-brand-orange/30 font-mono text-[7px] text-brand-orange uppercase tracking-wider">
                                          Partner: {link.affiliate_management.name}
                                       </span>
                                    )}
                                 </div>
                                 <div className="flex items-center gap-2">
                                    <LinkIcon className="w-3 h-3 text-brand-grey" />
                                    <a href={link.affiliate_url} target="_blank" rel="noreferrer" className="block font-mono text-[10px] text-brand-grey hover:text-brand-orange transition-colors truncate max-w-[400px]">
                                       {link.affiliate_url}
                                    </a>
                                 </div>
                              </div>
                              <div className="flex items-center gap-6">
                                 <div className="text-right">
                                    <span className="block font-display text-xl text-brand-orange leading-none">{link.click_count || 0}</span>
                                    <span className="block font-mono text-[7px] text-brand-grey uppercase tracking-widest mt-1">Clicks</span>
                                 </div>
                                 <span className={`px-3 py-1 border font-mono text-[8px] uppercase tracking-widest ${link.is_active ? 'border-green-500/30 text-green-500 bg-green-500/5' : 'border-red-500/30 text-red-500 bg-red-500/5'}`}>
                                    {link.is_active ? 'Active Node' : 'Registry offline'}
                                 </span>
                                 <button onClick={() => handleDelete(link.id)} className="text-brand-grey hover:text-red-500 transition-colors p-2"><Trash2 size={18}/></button>
                              </div>
                           </div>
                        ))
                     )}
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
