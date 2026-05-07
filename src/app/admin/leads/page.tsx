"use client";

import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import { 
  MessageSquare, 
  Search, 
  Trash2, 
  ExternalLink,
  Mail,
  Calendar,
  Filter,
  User as UserIcon,
  Zap,
  BarChart3, 
  Users, 
  ArrowUpRight, 
  TrendingUp,
  PieChart,
  ChevronRight,
  Layout,
  List,
  Clock,
  MoreVertical,
  X,
  Send,
  Phone,
  Tag
} from "lucide-react";
import { cn } from "@/lib/utils";
import { LeadActivityLogger } from "@/components/admin/leads/LeadActivityLogger";

const pipelineStages = [
  { id: 'new', name: 'New Inquiries', color: 'bg-blue-500', border: 'border-blue-100' },
  { id: 'contacted', name: 'Contacted', color: 'bg-amber-500', border: 'border-amber-100' },
  { id: 'qualified', name: 'Qualified', color: 'bg-purple-500', border: 'border-purple-100' },
  { id: 'converted', name: 'Converted', color: 'bg-emerald-500', border: 'border-emerald-100' },
];

export default function LeadsPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [view, setView] = useState<"list" | "pipeline">("list");
  const [activeLead, setActiveLead] = useState<any>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchLeads() {
      setLoading(true);
      let query = supabase.from('leads').select('*').order('created_at', { ascending: false });
      
      const { data } = await query;
      setLeads(data || []);
      setLoading(false);
    }

    fetchLeads();
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase
      .from('leads')
      .update({ pipeline_status: newStatus })
      .eq('id', id);
    
    if (!error) {
      setLeads(leads.map(l => l.id === id ? { ...l, pipeline_status: newStatus } : l));
    }
  };

  const deleteLead = async (id: string) => {
    if (!confirm("Delete this lead? This action is permanent.")) return;
    const { error } = await supabase.from('leads').delete().eq('id', id);
    if (!error) {
      setLeads(leads.filter(l => l.id !== id));
      if (activeLead?.id === id) setActiveLead(null);
    }
  };

  const filteredLeads = useMemo(() => {
    return leads.filter(l => {
      const matchesSearch = l.email.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = filter === 'all' || l.pipeline_status === filter;
      return matchesSearch && matchesStatus;
    });
  }, [leads, search, filter]);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tighter flex items-center gap-3">
             <Users className="text-brand-orange" /> Lead Management
          </h1>
          <p className="text-slate-500 text-sm mt-1">Acquisition pipeline and customer inquiries</p>
        </div>
        
        <div className="flex items-center gap-3">
           <div className="flex bg-white border border-slate-200 p-1 rounded-lg">
              <button 
                onClick={() => setView("list")}
                className={cn(
                  "p-2 rounded-md transition-all",
                  view === "list" ? "bg-slate-900 text-white shadow-sm" : "text-slate-400 hover:text-slate-600"
                )}
              >
                <List size={16} />
              </button>
              <button 
                onClick={() => setView("pipeline")}
                className={cn(
                  "p-2 rounded-md transition-all",
                  view === "pipeline" ? "bg-slate-900 text-white shadow-sm" : "text-slate-400 hover:text-slate-600"
                )}
              >
                <Layout size={16} />
              </button>
           </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
         {[
           { label: 'Total Leads', value: leads.length, change: '+12%', icon: Users },
           { label: 'Qualified (MTD)', value: leads.filter(l => l.pipeline_status === 'qualified').length, change: '15% conv', icon: Zap },
           { label: 'Uncontacted', value: leads.filter(l => !l.pipeline_status || l.pipeline_status === 'new').length, change: 'urgent', icon: Clock },
           { label: 'Converted', value: leads.filter(l => l.pipeline_status === 'converted').length, change: '+5 today', icon: TrendingUp },
         ].map((s, i) => (
           <div key={i} className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
              <div className="flex justify-between items-start mb-2">
                 <p className="text-[9px] font-mono uppercase tracking-widest text-slate-400">{s.label}</p>
                 <s.icon size={12} className="text-slate-300" />
              </div>
              <div className="flex items-baseline gap-2">
                 <p className="text-xl font-bold text-slate-900">{s.value}</p>
                 <span className="text-[10px] font-bold text-emerald-600">{s.change}</span>
              </div>
           </div>
         ))}
      </div>

      {/* Toolbar */}
      <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm flex flex-col md:flex-row items-center gap-4">
         <div className="relative flex-1 group">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-orange transition-colors" />
            <input 
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search leads by email..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-brand-orange/20 transition-all"
            />
         </div>
         <div className="flex gap-2">
            {['all', 'new', 'contacted', 'qualified', 'converted'].map(s => (
               <button 
                 key={s}
                 onClick={() => setFilter(s)}
                 className={cn(
                   "px-3 py-1.5 rounded-lg border text-[10px] font-bold uppercase tracking-widest transition-all",
                   filter === s ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-400 border-slate-200 hover:border-slate-400"
                 )}
               >
                  {s}
               </button>
            ))}
         </div>
      </div>

      {/* Main View */}
      {view === 'list' ? (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
           <table className="w-full text-left">
              <thead>
                 <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="px-6 py-4 text-[10px] font-mono uppercase tracking-widest text-slate-400">Lead</th>
                    <th className="px-6 py-4 text-[10px] font-mono uppercase tracking-widest text-slate-400">Captured</th>
                    <th className="px-6 py-4 text-[10px] font-mono uppercase tracking-widest text-slate-400">Type</th>
                    <th className="px-6 py-4 text-[10px] font-mono uppercase tracking-widest text-slate-400">Status</th>
                    <th className="px-6 py-4 text-[10px] font-mono uppercase tracking-widest text-slate-400 text-right">Actions</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                 {loading ? (
                   <tr><td colSpan={5} className="py-20 text-center"><Loader2 className="animate-spin mx-auto text-brand-orange" /></td></tr>
                 ) : filteredLeads.length === 0 ? (
                   <tr><td colSpan={5} className="py-20 text-center text-slate-400 italic">No leads found</td></tr>
                 ) : (
                   filteredLeads.map(lead => (
                     <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors group cursor-pointer" onClick={() => setActiveLead(lead)}>
                        <td className="px-6 py-4">
                           <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                                 <UserIcon size={14} />
                              </div>
                              <div className="flex flex-col">
                                 <span className="text-sm font-bold text-slate-900 truncate max-w-[200px]">{lead.email}</span>
                                 <span className="text-[10px] text-slate-400 uppercase font-mono tracking-tight">{lead.id.substring(0, 8)}</span>
                              </div>
                           </div>
                        </td>
                        <td className="px-6 py-4">
                           <div className="flex items-center gap-2 text-slate-500">
                              <Clock size={12} />
                              <span className="text-[11px] font-mono">{new Date(lead.created_at).toLocaleDateString()}</span>
                           </div>
                        </td>
                        <td className="px-6 py-4">
                           <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600 bg-slate-100 px-2 py-1 rounded">
                              {lead.type || 'Inquiry'}
                           </span>
                        </td>
                        <td className="px-6 py-4">
                           <div className={cn(
                             "inline-flex items-center gap-1.5 px-2 py-1 rounded-full border text-[9px] font-bold uppercase tracking-widest",
                             pipelineStages.find(s => s.id === (lead.pipeline_status || 'new'))?.border,
                             pipelineStages.find(s => s.id === (lead.pipeline_status || 'new'))?.color.replace('bg-', 'text-')
                           )}>
                              <div className={cn("w-1 h-1 rounded-full", pipelineStages.find(s => s.id === (lead.pipeline_status || 'new'))?.color)} />
                              {lead.pipeline_status || 'new'}
                           </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                           <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button className="p-2 text-slate-400 hover:text-brand-orange hover:bg-slate-100 rounded-lg transition-all">
                                 <Send size={14} />
                              </button>
                              <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-slate-100 rounded-lg transition-all" onClick={(e) => { e.stopPropagation(); deleteLead(lead.id); }}>
                                 <Trash2 size={14} />
                              </button>
                              <ChevronRight size={14} className="text-slate-300 ml-2" />
                           </div>
                        </td>
                     </tr>
                   ))
                 )}
              </tbody>
           </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
           {pipelineStages.map(stage => (
             <div key={stage.id} className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                   <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-900">{stage.name}</h3>
                   <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {leads.filter(l => (l.pipeline_status || 'new') === stage.id).length}
                   </span>
                </div>
                <div className="space-y-3 min-h-[400px]">
                   {leads.filter(l => (l.pipeline_status || 'new') === stage.id).map(lead => (
                     <div 
                       key={lead.id} 
                       onClick={() => setActiveLead(lead)}
                       className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm hover:border-brand-orange transition-all cursor-pointer group"
                     >
                        <div className="flex justify-between items-start mb-3">
                           <span className={cn("w-1 h-3 rounded-full", stage.color)} />
                           <span className="text-[9px] font-mono text-slate-400 uppercase">{new Date(lead.created_at).toLocaleDateString()}</span>
                        </div>
                        <p className="text-sm font-bold text-slate-900 truncate mb-1">{lead.email.split('@')[0]}</p>
                        <p className="text-[10px] text-slate-400 lowercase truncate mb-4">{lead.email}</p>
                        <div className="flex justify-between items-center">
                           <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest bg-slate-50 px-1.5 py-0.5 rounded">{lead.type}</span>
                           <MoreVertical size={12} className="text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                     </div>
                   ))}
                   {leads.filter(l => (l.pipeline_status || 'new') === stage.id).length === 0 && (
                     <div className="py-12 border-2 border-dashed border-slate-100 rounded-xl flex items-center justify-center">
                        <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">No Leads</span>
                     </div>
                   )}
                </div>
             </div>
           ))}
        </div>
      )}

      {/* Side Detail Panel */}
      {activeLead && (
        <>
          <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[100] animate-in fade-in duration-300" onClick={() => setActiveLead(null)} />
          <div className="fixed inset-y-0 right-0 w-full max-w-xl bg-white shadow-2xl z-[110] p-8 animate-in slide-in-from-right duration-300 overflow-y-auto">
             <div className="flex justify-between items-center mb-12">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white">
                      <UserIcon size={20} />
                   </div>
                   <div>
                      <h2 className="text-xl font-bold text-slate-900 truncate max-w-[300px]">{activeLead.email}</h2>
                      <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Captured Lead Dossier</p>
                   </div>
                </div>
                <button onClick={() => setActiveLead(null)} className="p-2 hover:bg-slate-100 rounded-full transition-all text-slate-400">
                   <X size={20} />
                </button>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                   <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Status</p>
                   <select 
                     value={activeLead.pipeline_status || 'new'}
                     onChange={(e) => updateStatus(activeLead.id, e.target.value)}
                     className="w-full bg-transparent text-sm font-bold text-slate-900 border-none p-0 focus:ring-0 cursor-pointer"
                   >
                     {pipelineStages.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                   </select>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                   <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Source</p>
                   <p className="text-sm font-bold text-slate-900 uppercase">{activeLead.type || 'Inquiry'}</p>
                </div>
             </div>

             <div className="space-y-12 pb-20">
                <section>
                   <div className="flex items-center gap-2 mb-4">
                      <Tag size={14} className="text-brand-orange" />
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-900">Lead Intel</h4>
                   </div>
                   <div className="bg-slate-900 rounded-xl p-6 text-slate-300 font-mono text-xs overflow-x-auto border border-slate-800 shadow-inner">
                      <pre className="whitespace-pre-wrap">{typeof activeLead.content === 'object' ? JSON.stringify(activeLead.content, null, 2) : activeLead.content}</pre>
                   </div>
                </section>

                <section>
                   <div className="flex items-center gap-2 mb-4">
                      <MessageSquare size={14} className="text-brand-orange" />
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-900">Activity & Notes</h4>
                   </div>
                   <LeadActivityLogger leadId={activeLead.id} />
                </section>

                <div className="flex gap-4">
                   <button className="flex-1 py-4 bg-slate-900 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-brand-orange transition-all flex items-center justify-center gap-2">
                      <Mail size={14} /> Send Inquiry Response
                   </button>
                   <button className="p-4 border border-slate-200 rounded-xl text-slate-400 hover:text-slate-900 hover:border-slate-400 transition-all">
                      <Phone size={14} />
                   </button>
                </div>
             </div>
          </div>
        </>
      )}
    </div>
  );
}

import { Loader2 } from "lucide-react";
import { XCircle } from "lucide-react";
