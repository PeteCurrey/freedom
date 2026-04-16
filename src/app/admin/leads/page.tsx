"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { 
  MessageSquare, 
  Search, 
  Trash2, 
  ExternalLink,
  Mail,
  Calendar,
  Filter,
  User as UserIcon
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function LeadsPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    async function fetchLeads() {
      let query = supabase.from('leads').select('*').order('created_at', { ascending: false });
      
      if (filter !== "all") {
        query = query.eq('type', filter);
      }

      const { data } = await query;
      setLeads(data || []);
      setLoading(false);
    }

    fetchLeads();
  }, [filter]);

  if (loading) return null;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <div className="flex items-center gap-2 font-mono text-[10px] text-brand-orange uppercase tracking-[0.3em] mb-4">
            <MessageSquare size={12} /> Communication Node: leads.beta
          </div>
          <h1 className="font-display text-5xl uppercase tracking-tighter text-white">
            Lead <span className="text-brand-orange">Management</span>
          </h1>
        </div>
        
        <div className="flex gap-4">
           {["all", "advisor", "contact", "newsletter"].map((t) => (
             <button
               key={t}
               onClick={() => setFilter(t)}
               className={cn(
                 "px-4 py-2 font-mono text-[10px] uppercase tracking-widest border transition-all",
                 filter === t ? "bg-brand-orange border-brand-orange text-white" : "border-brand-border text-brand-grey hover:border-brand-grey"
               )}
             >
               {t}
             </button>
           ))}
        </div>
      </div>

      <div className="blueprint-border bg-brand-carbon overflow-hidden">
        <table className="w-full text-left">
           <thead>
              <tr className="bg-brand-obsidian border-b border-brand-border font-mono text-[10px] uppercase tracking-widest text-brand-grey">
                 <th className="p-6">Origin / Date</th>
                 <th className="p-6">Contact Intel</th>
                 <th className="p-6">Project Metadata</th>
                 <th className="p-6">Status</th>
                 <th className="p-6 text-right">Actions</th>
              </tr>
           </thead>
           <tbody className="font-sans text-xs">
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b border-brand-border/50 hover:bg-brand-obsidian transition-colors group">
                   <td className="p-6">
                      <div className="flex items-center gap-3 mb-1">
                        <span className={cn(
                          "w-2 h-2 rounded-full",
                          lead.type === 'advisor' ? "bg-blue-500" : "bg-brand-orange"
                        )} />
                        <span className="font-display text-[11px] uppercase text-white">{lead.type} Capture</span>
                      </div>
                      <span className="font-mono text-[8px] text-brand-grey uppercase tracking-widest">{new Date(lead.created_at).toLocaleString()}</span>
                   </td>
                   <td className="p-6">
                      <div className="flex items-center gap-2 text-white mb-1">
                        <Mail size={12} className="text-brand-orange" />
                        <span className="font-medium">{lead.email}</span>
                      </div>
                      {lead.user_id && <span className="font-mono text-[8px] text-brand-grey uppercase">Registered User</span>}
                   </td>
                   <td className="p-6">
                      <div className="max-w-xs overflow-hidden text-ellipsis whitespace-nowrap text-brand-grey font-mono text-[10px]">
                        {typeof lead.content === 'object' ? JSON.stringify(lead.content).substring(0, 50) + "..." : lead.content}
                      </div>
                   </td>
                   <td className="p-6">
                      <span className="px-2 py-1 bg-brand-obsidian border border-brand-border font-mono text-[8px] uppercase tracking-widest text-green-500">
                        {lead.status}
                      </span>
                   </td>
                   <td className="p-6 text-right">
                      <div className="flex justify-end gap-3 text-brand-grey opacity-0 group-hover:opacity-100 transition-opacity">
                         <button className="hover:text-brand-orange transition-colors"><MessageSquare size={16} /></button>
                         <button className="hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                      </div>
                   </td>
                </tr>
              ))}
              {leads.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-12 text-center font-mono text-[10px] text-brand-grey uppercase">No leads captured in this sector.</td>
                </tr>
              )}
           </tbody>
        </table>
      </div>
    </div>
  );
}
