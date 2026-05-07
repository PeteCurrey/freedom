"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { 
  Plus, 
  Trash2, 
  Edit,
  ArrowLeft,
  Link as LinkIcon,
  Activity,
  DollarSign
} from "lucide-react";

export default function AffiliatesManagerPage() {
  const [affiliates, setAffiliates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAffiliates();
  }, []);

  async function fetchAffiliates() {
    const { data } = await supabase
      .from('affiliate_management')
      .select('*')
      .order('name');
    setAffiliates(data || []);
    setLoading(false);
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this affiliate integration?")) return;
    await supabase.from('affiliate_management').delete().eq('id', id);
    fetchAffiliates();
  }

  return (
    <div className="p-8 pb-32 min-h-screen bg-brand-obsidian text-brand-white">
      {/* Header */}
      <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <Link href="/admin/dashboard" className="flex items-center gap-2 font-mono text-[10px] text-brand-orange uppercase tracking-[0.3em] mb-4 hover:text-brand-white transition-colors">
            <ArrowLeft size={12} /> Back to Hub
          </Link>
          <h1 className="font-display text-5xl uppercase tracking-tighter text-brand-white flex items-center gap-4">
            <LinkIcon className="w-10 h-10 text-brand-orange" />
            Affiliate <span className="text-brand-orange">Network</span>
          </h1>
          <p className="font-mono text-xs text-brand-grey uppercase tracking-widest mt-4 max-w-2xl">
            Manage your external partnerships, tracking codes, and commission flows.
          </p>
        </div>
        
        <div className="flex gap-4">
          <button className="px-8 py-4 bg-brand-orange text-brand-white font-mono text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all flex items-center gap-2">
             <Plus size={14} /> Add Partner
          </button>
        </div>
      </div>

      <div className="blueprint-border bg-brand-carbon overflow-hidden">
         <table className="w-full text-left border-collapse">
            <thead>
               <tr className="bg-brand-obsidian/50 border-b border-brand-border/50 font-mono text-[10px] text-brand-grey uppercase tracking-widest">
                  <th className="p-6">Partner Name</th>
                  <th className="p-6">Network / Tracking ID</th>
                  <th className="p-6">Base URL</th>
                  <th className="p-6">Commission</th>
                  <th className="p-6">Performance</th>
                  <th className="p-6 text-right">Actions</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-brand-border/50">
               {loading ? (
                  <tr><td colSpan={6} className="p-12 text-center text-brand-grey font-mono text-[10px] uppercase tracking-widest">Scanning network nodes...</td></tr>
               ) : affiliates.length === 0 ? (
                  <tr>
                     <td colSpan={6} className="p-12 text-center text-brand-grey font-mono text-[10px] uppercase tracking-widest">
                        No affiliate programs registered.
                     </td>
                  </tr>
               ) : (
                  affiliates.map(a => (
                     <tr key={a.id} className="group hover:bg-brand-obsidian/50 transition-colors">
                        <td className="p-6">
                           <span className="block font-display text-xl uppercase tracking-wider">{a.name}</span>
                           <span className={`inline-block mt-1 px-2 py-0.5 font-mono text-[8px] uppercase tracking-widest ${a.is_active ? 'bg-green-500/10 text-green-500 border border-green-500/30' : 'bg-red-500/10 text-red-500 border border-red-500/30'}`}>
                              {a.is_active ? 'Active Routing' : 'Offline'}
                           </span>
                        </td>
                        <td className="p-6">
                           <span className="block font-mono text-xs uppercase text-brand-white">{a.network}</span>
                           <span className="block font-mono text-[9px] text-brand-grey mt-1">ID: {a.tracking_id || 'N/A'}</span>
                        </td>
                        <td className="p-6 font-sans text-xs text-brand-grey max-w-xs truncate">
                           <LinkIcon className="inline w-3 h-3 mr-2 text-brand-orange" />
                           {a.base_url}
                        </td>
                        <td className="p-6">
                           <span className="font-display flex items-center gap-2 text-xl text-brand-white">
                              <DollarSign className="w-4 h-4 text-brand-orange" />
                              {a.commission_rate || 'Var'}
                           </span>
                        </td>
                        <td className="p-6">
                           <div className="flex items-center gap-4">
                              <div className="text-left">
                                 <span className="block font-display text-lg text-brand-orange">{a.click_count || 0}</span>
                                 <span className="block font-mono text-[8px] text-brand-grey uppercase tracking-widest">Outbound Clicks</span>
                              </div>
                              {a.last_click_at && (
                                 <div className="h-8 w-px bg-brand-border/50 mx-2" />
                              )}
                              {a.last_click_at && (
                                 <span className="font-mono text-[8px] text-brand-grey uppercase">
                                    Last: {new Date(a.last_click_at).toLocaleDateString()}
                                 </span>
                              )}
                           </div>
                        </td>
                        <td className="p-6 text-right">
                           <div className="flex justify-end gap-3 text-brand-grey">
                              <button className="hover:text-brand-orange transition-colors"><Edit size={16} /></button>
                              <button onClick={() => handleDelete(a.id)} className="hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
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
