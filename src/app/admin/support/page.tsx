"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { 
  ShieldCheck, 
  Search, 
  Filter, 
  MessageSquare, 
  User, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  MoreVertical,
  X,
  Send,
  Phone,
  Mail,
  Loader2,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function SupportPortal() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedTicket, setSelectedTicket] = useState<any>(null);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    setLoading(true);
    // Combine leads and simulated queries
    const { data: leads } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    const formattedLeads = (leads || []).map(l => ({
       id: l.id,
       name: l.email.split('@')[0],
       email: l.email,
       subject: `Service Request: ${l.type}`,
       content: l.content?.message || "No message provided.",
       status: l.status || 'new',
       priority: 'medium',
       created_at: l.created_at,
       type: 'lead'
    }));

    setTickets(formattedLeads);
    setLoading(false);
  };

  const filteredTickets = tickets.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         t.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         t.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || t.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'new': return 'text-brand-orange bg-brand-orange/10 border-brand-orange/20';
      case 'open': return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
      case 'closed': return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
      default: return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
    }
  };

  return (
    <div className="p-8 pb-32 bg-brand-obsidian min-h-screen text-brand-white">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] text-brand-orange uppercase tracking-[.4em] mb-4">
              <ShieldCheck size={12} /> Service Hub: support.omega
            </div>
            <h1 className="font-display text-5xl uppercase tracking-tighter text-brand-white">
              Customer <span className="text-brand-orange">Support</span>
            </h1>
          </div>
          
          <div className="flex gap-4">
             <div className="bg-brand-carbon border border-brand-border p-6 flex items-center gap-4">
                <div className="text-right">
                   <p className="font-mono text-[9px] text-brand-grey uppercase tracking-widest">Avg Response</p>
                   <p className="font-display text-2xl">4.2h</p>
                </div>
                <div className="w-px h-8 bg-brand-border" />
                <div className="text-right">
                   <p className="font-mono text-[9px] text-brand-grey uppercase tracking-widest">Resolution</p>
                   <p className="font-display text-2xl text-emerald-500">92%</p>
                </div>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-[800px]">
           {/* Sidebar Ticket List */}
           <div className="lg:col-span-1 blueprint-border bg-brand-carbon flex flex-col overflow-hidden">
              <div className="p-4 border-b border-brand-border space-y-4">
                 <div className="relative">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-grey" />
                    <input 
                      type="text" 
                      placeholder="Search tickets..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 bg-brand-obsidian border border-brand-border text-[10px] font-mono uppercase text-brand-white outline-none focus:border-brand-orange"
                    />
                 </div>
                 <div className="flex gap-2">
                    {['all', 'new', 'closed'].map(tab => (
                       <button 
                         key={tab}
                         onClick={() => setActiveTab(tab)}
                         className={cn(
                           "flex-1 py-1 text-[8px] font-bold uppercase tracking-widest border transition-all",
                           activeTab === tab ? "bg-brand-orange border-brand-orange text-white" : "border-brand-border text-brand-grey hover:border-brand-grey"
                         )}
                       >
                          {tab}
                       </button>
                    ))}
                 </div>
              </div>
              <div className="flex-1 overflow-y-auto no-scrollbar">
                 {loading ? (
                    <div className="p-12 text-center"><Loader2 className="animate-spin mx-auto text-brand-orange" /></div>
                 ) : filteredTickets.map(ticket => (
                    <button 
                      key={ticket.id}
                      onClick={() => setSelectedTicket(ticket)}
                      className={cn(
                        "w-full p-6 text-left border-b border-brand-border transition-all hover:bg-brand-obsidian group",
                        selectedTicket?.id === ticket.id && "bg-brand-obsidian border-l-4 border-l-brand-orange"
                      )}
                    >
                       <div className="flex justify-between items-start mb-2">
                          <span className={cn("px-2 py-0.5 rounded-full text-[8px] font-bold uppercase border", getStatusColor(ticket.status))}>
                             {ticket.status}
                          </span>
                          <span className="font-mono text-[8px] text-brand-grey">{new Date(ticket.created_at).toLocaleDateString()}</span>
                       </div>
                       <p className="font-display text-sm uppercase text-brand-white group-hover:text-brand-orange transition-colors line-clamp-1">{ticket.subject}</p>
                       <p className="font-mono text-[9px] text-brand-grey uppercase tracking-widest mt-1">{ticket.name}</p>
                    </button>
                 ))}
              </div>
           </div>

           {/* Main Ticket View */}
           <div className="lg:col-span-3 blueprint-border bg-brand-carbon relative overflow-hidden flex flex-col">
              <div className="blueprint-grid absolute inset-0 opacity-10 pointer-events-none" />
              
              {selectedTicket ? (
                 <>
                    {/* Ticket Header */}
                    <div className="relative z-10 p-8 border-b border-brand-border flex justify-between items-start bg-brand-obsidian/50 backdrop-blur-sm">
                       <div>
                          <div className="flex items-center gap-3 mb-2">
                             <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white">{selectedTicket.subject}</h2>
                             <span className={cn("px-3 py-1 rounded-full text-[10px] font-bold uppercase border", getStatusColor(selectedTicket.status))}>
                                {selectedTicket.status}
                             </span>
                          </div>
                          <div className="flex items-center gap-6">
                             <div className="flex items-center gap-2">
                                <User size={14} className="text-brand-orange" />
                                <span className="font-mono text-[10px] uppercase text-brand-grey">{selectedTicket.name} ({selectedTicket.email})</span>
                             </div>
                             <div className="flex items-center gap-2">
                                <Clock size={14} className="text-brand-grey" />
                                <span className="font-mono text-[10px] uppercase text-brand-grey">{new Date(selectedTicket.created_at).toLocaleString()}</span>
                             </div>
                          </div>
                       </div>
                       <div className="flex gap-2">
                          <button className="p-3 bg-brand-obsidian border border-brand-border text-brand-grey hover:text-brand-orange transition-all"><CheckCircle2 size={18} /></button>
                          <button className="p-3 bg-brand-obsidian border border-brand-border text-brand-grey hover:text-red-500 transition-all"><X size={18} /></button>
                       </div>
                    </div>

                    {/* Ticket Body / Chat */}
                    <div className="relative z-10 flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar">
                       <div className="flex gap-4">
                          <div className="w-10 h-10 rounded-full bg-brand-obsidian border border-brand-border flex items-center justify-center text-brand-orange shrink-0">
                             <User size={20} />
                          </div>
                          <div className="max-w-2xl bg-brand-obsidian border border-brand-border p-6 rounded-2xl rounded-tl-none">
                             <p className="text-sm text-brand-white leading-relaxed">{selectedTicket.content}</p>
                          </div>
                       </div>

                       {/* Simulated Admin Response */}
                       <div className="flex gap-4 flex-row-reverse">
                          <div className="w-10 h-10 rounded-full bg-brand-orange flex items-center justify-center text-white shrink-0">
                             <ShieldCheck size={20} />
                          </div>
                          <div className="max-w-2xl bg-brand-orange/10 border border-brand-orange/20 p-6 rounded-2xl rounded-tr-none">
                             <p className="text-sm text-brand-white leading-relaxed italic">Admin response pending. Drafting protocol initiated...</p>
                          </div>
                       </div>
                    </div>

                    {/* Ticket Footer / Input */}
                    <div className="relative z-10 p-6 bg-brand-obsidian border-t border-brand-border">
                       <div className="flex gap-4">
                          <textarea 
                            placeholder="Type internal note or customer response..." 
                            className="flex-1 bg-brand-carbon border border-brand-border p-4 font-sans text-sm text-brand-white outline-none focus:border-brand-orange h-24"
                          />
                          <div className="flex flex-col gap-2">
                             <button className="px-6 py-3 bg-brand-orange text-white font-mono text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all flex items-center gap-2">
                                <Send size={14} /> Send
                             </button>
                             <button className="px-6 py-3 border border-brand-border text-brand-grey font-mono text-[10px] uppercase tracking-widest hover:border-brand-white hover:text-brand-white transition-all">
                                Save Note
                             </button>
                          </div>
                       </div>
                    </div>
                 </>
              ) : (
                 <div className="h-full flex flex-col items-center justify-center text-center p-12">
                    <div className="w-24 h-24 rounded-full bg-brand-obsidian border border-brand-border flex items-center justify-center text-brand-grey/20 mb-6">
                       <MessageSquare size={48} />
                    </div>
                    <h3 className="font-display text-2xl uppercase tracking-tighter text-brand-white mb-2">No Ticket Selected</h3>
                    <p className="font-mono text-[10px] text-brand-grey uppercase tracking-widest max-w-xs">Select a node from the auxiliary list to begin tactical support operations.</p>
                 </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
}
