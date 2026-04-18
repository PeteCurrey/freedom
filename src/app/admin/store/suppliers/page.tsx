"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { 
  Plus, 
  Trash2, 
  Edit,
  ArrowLeft,
  Truck,
  Globe,
  ExternalLink
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function SuppliersManagerPage() {
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  async function fetchSuppliers() {
    const { data } = await supabase
      .from('suppliers')
      .select('*')
      .order('name');
      
    if (!data || data.length === 0) {
      await autoSeed();
    } else {
      setSuppliers(data || []);
      setLoading(false);
    }
  }

  const autoSeed = async () => {
    setLoading(true);
    const presetSuppliers = [
      { name: 'Kiravans', website: 'https://www.kiravans.co.uk', trade_account: true, status: 'active_trade', categories: ['interiors', 'hardware', 'electrical'], brands_handled: ['RIB', 'Webasto', 'Dometic', 'Kiravans'], notes: 'Major UK supplier for seats, windows, and general conversion hardware.' },
      { name: 'Clearcut Conversions', website: 'https://www.clearcutconversions.com', trade_account: true, status: 'applied', categories: ['interiors', 'hardware', 'water'], brands_handled: ['Vohringer', 'Dometic', 'Thetford'], notes: 'Specialists in CNC furniture and rock and roll beds.' },
      { name: 'Rayne Automotive', website: 'https://www.rayneautomotive.co.uk', trade_account: true, status: 'active_trade', categories: ['electrical'], brands_handled: ['Victron', 'Rayne'], notes: 'High-quality loom manufacturers and electrical systems.' },
      { name: 'Victron Energy', website: 'https://www.victronenergy.com', trade_account: false, status: 'potential', categories: ['electrical'], brands_handled: ['Victron'], notes: 'Global leaders in off-grid power systems.' },
      { name: 'Dometic UK', website: 'https://www.dometic.com', trade_account: false, status: 'potential', categories: ['climate', 'water', 'interiors'], brands_handled: ['Dometic'], notes: 'Primary manufacturer for fridges, AC, and windows.' },
      { name: 'Truma UK', website: 'https://www.truma.com', trade_account: false, status: 'potential', categories: ['heating', 'water'], brands_handled: ['Truma'], notes: 'Specialists in combi heaters and gas systems.' },
      { name: 'Webasto', website: 'https://www.webasto.com', trade_account: false, status: 'potential', categories: ['heating', 'climate'], brands_handled: ['Webasto'], notes: 'Air and water heating specialists.' },
      { name: 'MaxxAir', website: 'https://www.airxcel.com', trade_account: false, status: 'potential', categories: ['ventilation'], brands_handled: ['MaxxAir'], notes: 'Ventilation and roof fan specialists.' },
      { name: 'Whale Pumps', website: 'https://www.whalepumps.com', trade_account: false, status: 'potential', categories: ['water', 'plumbing'], brands_handled: ['Whale'], notes: 'Water system and high-flow pump specialists.' },
      { name: 'Thetford Europe', website: 'https://www.thetford-europe.com', trade_account: false, status: 'potential', categories: ['plumbing', 'interiors'], brands_handled: ['Thetford'], notes: 'Sanitation and cooking appliance leaders.' },
      { name: 'Dodo Mat', website: 'https://www.dodomat.com', trade_account: true, status: 'active_trade', categories: ['insulation'], brands_handled: ['Dodo Mat'], notes: 'Sound deadening and thermal insulation specialists.' },
      { name: 'Gaslow', website: 'https://www.gaslowdirect.com', trade_account: true, status: 'active_trade', categories: ['gas'], brands_handled: ['Gaslow'], notes: 'Refillable LPG system specialists.' },
      { name: 'Jackson Leisure', website: 'https://www.jacksonsleisure.com', trade_account: true, status: 'applied', categories: ['general', 'appliance'], brands_handled: ['Dometic', 'Thetford', 'Fiamma'], notes: 'Major distributor for caravan and motorhome parts.' },
      { name: 'Rainbow Conversions', website: 'https://www.rainbow-conversions.co.uk', trade_account: true, status: 'potential', categories: ['general', 'furniture'], brands_handled: ['SCA', 'RIB'], notes: 'One of the UK largest conversion equipment suppliers.' },
      { name: 'Transporter HQ', website: 'https://www.transporterhq.co.uk', trade_account: true, status: 'active_trade', categories: ['exterior', 'hardware'], brands_handled: ['THQ', 'Bilstein'], notes: 'VW Transporter specialist hardware and styling.' },
      { name: 'Megavanmats', website: 'https://www.megavanmats.com', trade_account: true, status: 'active_trade', categories: ['interiors', 'insulation'], brands_handled: ['Megavanmats', 'Trimberry'], notes: 'Leading supplier for lining carpets and adhesives.' }
    ];

    for (let s of presetSuppliers) {
      const { data } = await supabase.from('suppliers').select('id').eq('name', s.name).single();
      if (!data) {
        await supabase.from('suppliers').insert([s]);
      }
    }
    
    // Fetch newly seeded data
    const { data: newData } = await supabase.from('suppliers').select('*').order('name');
    setSuppliers(newData || []);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this supplier? Products linked to this supplier will lose their mapping.")) return;
    await supabase.from('suppliers').delete().eq('id', id);
    fetchSuppliers();
  };

  const handleSeed = async () => {
    await autoSeed();
  };

  return (
    <div className="p-8 pb-32 min-h-screen bg-brand-obsidian text-brand-white">
      {/* Header */}
      <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <Link href="/admin/store" className="flex items-center gap-2 font-mono text-[10px] text-brand-orange uppercase tracking-[0.3em] mb-4 hover:text-brand-white transition-colors">
            <ArrowLeft size={12} /> Back to Store Manager
          </Link>
          <h1 className="font-display text-5xl uppercase tracking-tighter text-brand-white flex items-center gap-4">
            <Truck className="w-10 h-10 text-brand-orange" />
            Supplier <span className="text-brand-orange">Network</span>
          </h1>
          <p className="font-mono text-xs text-brand-grey uppercase tracking-widest mt-4 max-w-2xl">
            Manage your supply chain, wholesale trade accounts, and product distributions.
          </p>
        </div>
        
        <div className="flex gap-4">
          <button onClick={handleSeed} className="px-8 py-4 border border-brand-border text-brand-grey font-mono text-[10px] uppercase tracking-widest hover:border-brand-orange hover:text-brand-orange transition-all">
            Sync Registry Defaults
          </button>
          <Link href="/admin/store/suppliers/new" className="px-8 py-4 bg-brand-orange text-brand-white font-mono text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all flex items-center gap-2">
             <Plus size={14} /> Add Supplier
          </Link>
        </div>
      </div>

      <div className="blueprint-border bg-brand-carbon overflow-hidden">
         <table className="w-full text-left border-collapse">
            <thead>
               <tr className="bg-brand-obsidian/50 border-b border-brand-border/50 font-mono text-[10px] text-brand-grey uppercase tracking-widest">
                  <th className="p-6">Supplier & Identity</th>
                  <th className="p-6">Account Type</th>
                  <th className="p-6">Brand Portfolio</th>
                  <th className="p-6">System Focus</th>
                  <th className="p-6 text-right">Actions</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-brand-border/50">
                {loading ? (
                  <tr><td colSpan={5} className="p-12 text-center text-brand-grey font-mono text-[10px] uppercase tracking-widest">Loading network nodes...</td></tr>
                ) : suppliers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-12 text-center text-brand-grey font-mono text-[10px] uppercase tracking-widest">
                      No suppliers mapped. Run the registry sync migration and add suppliers.
                    </td>
                  </tr>
                ) : (
                  suppliers.map(s => (
                    <tr key={s.id} className="group hover:bg-brand-obsidian/50 transition-colors">
                      <td className="p-6">
                        <span className="block font-display text-xl uppercase tracking-wider group-hover:text-brand-orange transition-colors">{s.name}</span>
                        {s.website && (
                          <a href={s.website} target="_blank" rel="noreferrer" className="flex items-center gap-1 font-sans text-[10px] text-brand-grey hover:text-brand-orange mt-1 transition-colors">
                            <Globe size={10} /> {s.website.replace('https://', '').replace('http://', '').split('/')[0]} <ExternalLink size={10} />
                          </a>
                        )}
                      </td>
                      <td className="p-6 text-[10px] text-brand-grey">
                        <div className="flex flex-col gap-2">
                          <span className={cn(
                            "px-3 py-1 font-mono text-[9px] uppercase tracking-widest w-fit border",
                            s.status === 'active_trade' ? "bg-green-500/10 text-green-500 border-green-500/30" :
                            s.status === 'applied' ? "bg-brand-orange/10 text-brand-orange border-brand-orange/30" :
                            s.status === 'on_hold' ? "bg-red-500/10 text-red-500 border-red-500/30" :
                            "bg-brand-grey/10 text-brand-grey border-brand-grey/30"
                          )}>
                            {s.status === 'active_trade' ? 'Account Active' : 
                             s.status === 'applied' ? 'Pending Approval' :
                             s.status === 'on_hold' ? 'Account On Hold' : 'Open Sourcing'}
                          </span>
                        </div>
                      </td>
                      <td className="p-6">
                        <div className="flex flex-wrap gap-1 max-w-[250px]">
                          {(s.brands_handled || []).length === 0 ? (
                            <span className="font-mono text-[8px] text-brand-grey uppercase italic">No portfolio data</span>
                          ) : (
                            s.brands_handled.map((brand: string) => (
                              <span key={brand} className="font-mono text-[8px] text-brand-white/50 uppercase tracking-widest bg-brand-obsidian/40 px-2 py-0.5 border border-brand-border/20">
                                {brand}
                              </span>
                            ))
                          )}
                        </div>
                      </td>
                        <td className="p-6">
                           <div className="flex flex-wrap gap-2">
                              {(s.categories || []).map((cat: string) => (
                                 <span key={cat} className="font-mono text-[8px] text-brand-orange uppercase tracking-widest bg-brand-orange/5 px-2 py-1 border border-brand-orange/20">
                                    {cat}
                                 </span>
                              ))}
                           </div>
                        </td>
                        <td className="p-6 text-right">
                           <div className="flex justify-end gap-3 text-brand-grey">
                              <Link href={`/admin/store/suppliers/${s.id}`} className="hover:text-brand-orange transition-colors flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest">
                                Profile <Edit size={14} />
                              </Link>
                              <button onClick={() => handleDelete(s.id)} className="hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
                           </div>
                        </td>
                     </tr>
                  ))
                )}
            </tbody>
         </table>
      </div>
    </div>
  );
}
