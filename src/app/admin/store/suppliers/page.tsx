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
    setSuppliers(data || []);
    setLoading(false);
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this supplier? Products linked to this supplier will lose their mapping.")) return;
    await supabase.from('suppliers').delete().eq('id', id);
    fetchSuppliers();
  };

  return (
    <div className="p-8 pb-32 min-h-screen bg-brand-obsidian text-white">
      {/* Header */}
      <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <Link href="/admin/store" className="flex items-center gap-2 font-mono text-[10px] text-brand-orange uppercase tracking-[0.3em] mb-4 hover:text-white transition-colors">
            <ArrowLeft size={12} /> Back to Store Manager
          </Link>
          <h1 className="font-display text-5xl uppercase tracking-tighter text-white flex items-center gap-4">
            <Truck className="w-10 h-10 text-brand-orange" />
            Supplier <span className="text-brand-orange">Network</span>
          </h1>
          <p className="font-mono text-xs text-brand-grey uppercase tracking-widest mt-4 max-w-2xl">
            Manage your supply chain, wholesale trade accounts, and product distributions.
          </p>
        </div>
        
        <div className="flex gap-4">
          <Link href="/admin/store/suppliers/new" className="px-8 py-4 bg-brand-orange text-white font-mono text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all flex items-center gap-2">
             <Plus size={14} /> Add Supplier
          </Link>
        </div>
      </div>

      <div className="blueprint-border bg-brand-carbon overflow-hidden">
         <table className="w-full text-left border-collapse">
            <thead>
               <tr className="bg-brand-obsidian/50 border-b border-brand-border/50 font-mono text-[10px] text-brand-grey uppercase tracking-widest">
                  <th className="p-6">Supplier Name</th>
                  <th className="p-6">Status / Type</th>
                  <th className="p-6">Categories</th>
                  <th className="p-6">Performance</th>
                  <th className="p-6 text-right">Actions</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-brand-border/50">
               {loading ? (
                  <tr><td colSpan={5} className="p-12 text-center text-brand-grey font-mono text-[10px] uppercase tracking-widest">Loading network nodes...</td></tr>
               ) : suppliers.length === 0 ? (
                  <tr>
                     <td colSpan={5} className="p-12 text-center text-brand-grey font-mono text-[10px] uppercase tracking-widest">
                        No suppliers mapped. Run the database migration and add suppliers.
                     </td>
                  </tr>
               ) : (
                  suppliers.map(s => (
                     <tr key={s.id} className="group hover:bg-brand-obsidian/50 transition-colors">
                        <td className="p-6">
                           <span className="block font-display text-xl uppercase tracking-wider">{s.name}</span>
                           {s.website && (
                             <a href={`/api/affiliate/redirect?type=supplier&id=${s.id}`} target="_blank" rel="noreferrer" className="flex items-center gap-1 font-sans text-xs text-brand-orange hover:underline mt-1">
                               <Globe size={10} /> {s.website} <ExternalLink size={10} />
                             </a>
                           )}
                        </td>
                        <td className="p-6">
                           <span className={`px-3 py-1 font-mono text-[9px] uppercase tracking-widest ${s.trade_account ? 'bg-green-500/10 text-green-500 border border-green-500/30' : 'bg-brand-grey/10 text-brand-grey border border-brand-grey/30'}`}>
                              {s.trade_account ? 'Trade Account Active' : 'Retail / standard'}
                           </span>
                        </td>
                        <td className="p-6">
                           <div className="flex flex-wrap gap-2">
                              {(s.categories || []).map((cat: string) => (
                                 <span key={cat} className="font-mono text-[8px] text-brand-grey uppercase tracking-widest bg-brand-obsidian px-2 py-1 border border-brand-border/30">
                                    {cat}
                                 </span>
                              ))}
                           </div>
                        </td>
                        <td className="p-6">
                           <div className="flex items-center gap-4">
                              <div className="text-left">
                                 <span className="block font-display text-lg text-brand-orange">{s.lead_count || 0}</span>
                                 <span className="block font-mono text-[8px] text-brand-grey uppercase tracking-widest">Supplier Leads</span>
                              </div>
                              {s.last_lead_at && (
                                 <span className="font-mono text-[8px] text-brand-grey uppercase ml-2 border-l border-brand-border/50 pl-4">
                                    Last: {new Date(s.last_lead_at).toLocaleDateString()}
                                 </span>
                              )}
                           </div>
                        </td>
                        <td className="p-6 text-right">
                           <div className="flex justify-end gap-3 text-brand-grey">
                              <Link href={`/admin/store/suppliers/${s.id}`} className="hover:text-brand-orange transition-colors"><Edit size={16} /></Link>
                              <button onClick={() => handleDelete(s.id)} className="hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
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
