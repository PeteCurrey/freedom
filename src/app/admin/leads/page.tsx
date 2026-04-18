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
import { LeadActivityLogger } from "@/components/admin/leads/LeadActivityLogger";

export default function LeadsPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [view, setView] = useState<"list" | "pipeline">("list");
  const [activeLead, setActiveLead] = useState<any>(null);

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

  const updatePipelineStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase
      .from('leads')
      .update({ pipeline_status: newStatus })
      .eq('id', id);
    
    if (!error) {
      setLeads(leads.map(l => l.id === id ? { ...l, pipeline_status: newStatus } : l));
    }
  };

  const pipelineStages = [
    { id: 'new', name: 'New Capture', color: 'bg-blue-500' },
    { id: 'review', name: 'Expert Review', color: 'bg-brand-orange' },
    { id: 'qualified', name: 'Qualified', color: 'bg-purple-500' },
    { id: 'closed', name: 'Closed', color: 'bg-green-500' },
  ];

  if (loading) return null;

  return (
    <div className="p-8 pb-32">
      {/* Header */}
      <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <div className="flex items-center gap-2 font-mono text-[10px] text-brand-orange uppercase tracking-[0.3em] mb-4">
            <MessageSquare size={12} /> Intelligence Node: leads.crm
          </div>
          <h1 className="font-display text-5xl uppercase tracking-tighter text-brand-white">
            Lead <span className="text-brand-orange">Pipeline</span>
          </h1>
        </div>
        
        <div className="flex bg-brand-carbon border border-brand-border p-1">
           <button 
             onClick={() => setView("list")}
             className={cn(
               "px-6 py-2 font-mono text-[10px] uppercase tracking-widest transition-all",
               view === "list" ? "bg-brand-orange text-brand-white" : "text-brand-grey hover:text-brand-white"
             )}
           >
             Table View
           </button>
           <button 
             onClick={() => setView("pipeline")}
             className={cn(
               "px-6 py-2 font-mono text-[10px] uppercase tracking-widest transition-all",
               view === "pipeline" ? "bg-brand-orange text-brand-white" : "text-brand-grey hover:text-brand-white"
             )}
           >
             CRM Pipeline
           </button>
        </div>
      </div>

      {/* Primary Filters */}
      <div className="flex gap-4 mb-8">
          {["all", "advisor", "contact", "newsletter"].map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={cn(
                "px-4 py-2 font-mono text-[10px] uppercase tracking-widest border transition-all",
                filter === t ? "border-brand-orange text-brand-orange" : "border-brand-border text-brand-grey hover:border-brand-grey"
              )}
            >
              {t}
            </button>
          ))}
      </div>

      {view === "list" ? (
        <div className="blueprint-border bg-brand-carbon overflow-hidden text-brand-white">
          <table className="w-full text-left">
            <thead>
                <tr className="bg-brand-obsidian border-b border-brand-border font-mono text-[10px] uppercase tracking-widest text-brand-grey">
                  <th className="p-6">Origin / Date</th>
                  <th className="p-6">Contact Intel</th>
                  <th className="p-6">Project Metadata</th>
                  <th className="p-6">Pipeline Status</th>
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
                          <span className="font-display text-[11px] uppercase text-brand-white">{lead.type} Capture</span>
                        </div>
                        <span className="font-mono text-[8px] text-brand-grey uppercase tracking-widest">{new Date(lead.created_at).toLocaleString()}</span>
                    </td>
                    <td className="p-6">
                        <div className="flex items-center gap-2 text-brand-white mb-1">
                          <Mail size={12} className="text-brand-orange" />
                          <span className="font-medium">{lead.email}</span>
                        </div>
                        {lead.user_id && <span className="font-mono text-[8px] text-brand-grey uppercase italic">Registered Node</span>}
                    </td>
                    <td className="p-6">
                        <div className="max-w-xs overflow-hidden text-ellipsis whitespace-nowrap text-brand-grey font-mono text-[10px]">
                          {typeof lead.content === 'object' ? JSON.stringify(lead.content).substring(0, 50) + "..." : lead.content}
                        </div>
                    </td>
                    <td className="p-6">
                        <select 
                          value={lead.pipeline_status || 'new'}
                          onChange={(e) => updatePipelineStatus(lead.id, e.target.value)}
                          className="bg-brand-obsidian border border-brand-border p-2 font-mono text-[8px] uppercase tracking-widest text-brand-grey outline-none focus:border-brand-orange"
                        >
                          {pipelineStages.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                        </select>
                    </td>
                    <td className="p-6 text-right">
                        <div className="flex justify-end gap-3 text-brand-grey opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => setActiveLead(lead)} className="hover:text-brand-orange transition-colors"><MessageSquare size={16} /></button>
                          <button className="hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                        </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
           {pipelineStages.map((stage) => (
             <div key={stage.id} className="space-y-6">
                <div className="flex items-center justify-between border-b border-brand-border pb-4">
                   <h3 className="font-display text-sm uppercase tracking-widest text-brand-white">{stage.name}</h3>
                   <span className="font-mono text-[10px] text-brand-grey">{leads.filter(l => (l.pipeline_status || 'new') === stage.id).length}</span>
                </div>
                
                <div className="space-y-4">
                   {leads.filter(l => (l.pipeline_status || 'new') === stage.id).map((lead) => (
                     <div 
                       key={lead.id} 
                       draggable
                       onClick={() => setActiveLead(lead)}
                       className="blueprint-border p-5 bg-brand-carbon hover:border-brand-orange transition-all cursor-pointer group"
                     >
                        <div className="flex justify-between items-start mb-4">
                           <span className={cn("w-1 h-3", stage.color)} />
                           <span className="font-mono text-[8px] text-brand-grey uppercase">{new Date(lead.created_at).toLocaleDateString()}</span>
                        </div>
                        <p className="font-display text-xs text-brand-white mb-2 uppercase break-all">{lead.email.split('@')[0]}</p>
                        <div className="flex items-center gap-2 text-brand-grey mb-4">
                           <Mail size={10} />
                           <span className="font-mono text-[8px] truncate">{lead.email}</span>
                        </div>
                        <div className="flex gap-2">
                           <span className="px-1.5 py-0.5 border border-brand-border font-mono text-[7px] text-brand-grey uppercase">
                              {lead.type}
                           </span>
                        </div>
                     </div>
                   ))}
                   {leads.filter(l => (l.pipeline_status || 'new') === stage.id).length === 0 && (
                     <div className="p-8 border border-dashed border-brand-border text-center">
                        <span className="font-mono text-[8px] text-brand-grey uppercase tracking-widest">Sector Empty</span>
                     </div>
                   )}
                </div>
             </div>
           ))}
        </div>
      )}

      {/* Lead Detail / Activity Modal Placeholder */}
      {activeLead && (
        <div className="fixed inset-y-0 right-0 w-full max-w-xl bg-brand-carbon border-l border-brand-border z-[100] p-12 shadow-2xl overflow-y-auto">
           <button 
             onClick={() => setActiveLead(null)}
             className="absolute top-8 right-8 text-brand-grey hover:text-brand-white"
           >
             Close Protocol
           </button>
           
           <div className="mb-12">
              <span className="font-mono text-[10px] text-brand-orange uppercase tracking-widest mb-2 block">Tactical Dossier</span>
              <h2 className="font-display text-4xl uppercase text-brand-white break-all mb-2">{activeLead.email}</h2>
              <span className="font-mono text-[10px] text-brand-grey uppercase tracking-[0.3em]">ID: {activeLead.id.substring(0, 12)}</span>
           </div>

           <div className="space-y-12">
              <section className="space-y-4">
                 <h4 className="font-mono text-[10px] text-brand-grey uppercase tracking-widest border-b border-brand-border pb-2">Captured Intelligence</h4>
                 <div className="blueprint-border p-6 bg-brand-obsidian font-mono text-[10px] text-brand-grey overflow-x-auto">
                    <pre>{typeof activeLead.content === 'object' ? JSON.stringify(activeLead.content, null, 2) : activeLead.content}</pre>
                 </div>
              </section>

              <section className="space-y-6">
                 <h4 className="font-mono text-[10px] text-brand-grey uppercase tracking-widest border-b border-brand-border pb-2">Activity Log</h4>
                 <LeadActivityLogger leadId={activeLead.id} />
              </section>
           </div>
        </div>
      )}
    </div>
  );
}
