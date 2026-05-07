"use client";

import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Search, Filter, Eye, Trash2, Mail, 
  Calendar, CheckCircle2, Truck, AlertCircle,
  MoreVertical, FileText, X, Phone,
  TrendingUp, Clock, User as UserIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface QuoteRequest {
  id: string;
  created_at: string;
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  vehicle_details: string;
  preferred_tier: string;
  target_date?: string;
  status: 'new' | 'reviewing' | 'quoted' | 'accepted' | 'declined';
  budget?: string;
  notes?: string;
}

export default function AdminQuotesPage() {
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedQuote, setSelectedQuote] = useState<QuoteRequest | null>(null);

  useEffect(() => {
    async function fetchQuotes() {
      setLoading(true);
      const { data } = await supabase
        .from('quote_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (data) {
        setQuotes(data as QuoteRequest[]);
      } else {
        // Mock data
        setQuotes([
          { id: 'qr-1042', created_at: new Date().toISOString(), customer_name: 'David Roberts', customer_email: 'david@example.com', vehicle_details: '2022 Sprinter 144" 4x4', preferred_tier: 'T3 - Full Autonomy', status: 'new', target_date: '2026-08-01', budget: '£45,000+' },
          { id: 'qr-1041', created_at: new Date(Date.now() - 86400000).toISOString(), customer_name: 'Emma Hughes', customer_email: 'emma.h@gmail.com', vehicle_details: '2019 Crafter MWB', preferred_tier: 'T2 - Extended Stay', status: 'reviewing', target_date: '2026-07-15', budget: '£25k - £35k' },
          { id: 'qr-1040', created_at: new Date(Date.now() - 172800000).toISOString(), customer_name: 'James Wilson', customer_email: 'james.wilson@outlook.com', vehicle_details: '2024 Transit L3H2', preferred_tier: 'T3 - Full Autonomy', status: 'quoted', target_date: '2026-09-01', budget: '£50,000+' },
        ]);
      }
      setLoading(false);
    }
    fetchQuotes();
  }, []);

  const filteredQuotes = useMemo(() => {
    return quotes.filter(q => {
      const matchesSearch = q.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           q.customer_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           q.vehicle_details?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTab = activeTab === 'all' || q.status === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [quotes, searchTerm, activeTab]);

  const stats = {
    total: quotes.length,
    new: quotes.filter(q => q.status === 'new').length,
    reviewing: quotes.filter(q => q.status === 'reviewing').length,
    converted: quotes.filter(q => q.status === 'accepted').length,
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'accepted': return <span className="px-2 py-1 bg-emerald-100 text-emerald-600 rounded-full text-[9px] font-bold uppercase border border-emerald-200">ACCEPTED</span>;
      case 'quoted': return <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-[9px] font-bold uppercase border border-blue-200">QUOTED</span>;
      case 'reviewing': return <span className="px-2 py-1 bg-amber-100 text-amber-600 rounded-full text-[9px] font-bold uppercase border border-amber-200">REVIEWING</span>;
      case 'new': return <span className="px-2 py-1 bg-slate-900 text-white rounded-full text-[9px] font-bold uppercase border border-slate-700">NEW REQUEST</span>;
      default: return <span className="px-2 py-1 bg-red-100 text-red-600 rounded-full text-[9px] font-bold uppercase border border-red-200">{status}</span>;
    }
  };

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="font-display text-4xl uppercase tracking-tighter text-slate-900">Build Quotes</h1>
          <p className="text-slate-500 text-sm mt-1">
            {stats.new} new requests pending review
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         {[
           { label: 'Total Requests', value: stats.total, icon: FileText, color: 'text-slate-900' },
           { label: 'New Unread', value: stats.new, icon: AlertCircle, color: 'text-brand-orange' },
           { label: 'In Review', value: stats.reviewing, icon: Clock, color: 'text-amber-500' },
           { label: 'Converted', value: stats.converted, icon: CheckCircle2, color: 'text-emerald-500' },
         ].map((s, i) => (
           <div key={i} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex items-center justify-between">
              <div>
                 <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-slate-400 mb-1">{s.label}</p>
                 <p className={cn("text-2xl font-display uppercase tracking-tight", s.color)}>{s.value}</p>
              </div>
              <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-slate-300">
                 <s.icon size={18} />
              </div>
           </div>
         ))}
      </div>

      {/* Toolbar & Tabs */}
      <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex border-b border-slate-100 no-scrollbar gap-8 overflow-x-auto w-full md:w-auto">
          {['all', 'new', 'reviewing', 'quoted', 'accepted', 'declined'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "pb-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-all border-b-2 whitespace-nowrap",
                activeTab === tab 
                  ? "border-brand-orange text-brand-orange" 
                  : "border-transparent text-slate-400 hover:text-slate-600"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-64 group">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-orange transition-colors" />
          <input 
            type="text" 
            placeholder="Search quotes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-brand-orange/20 transition-all"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-mono uppercase tracking-widest text-slate-400">
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Vehicle Specs</th>
                <th className="px-6 py-4">Preferred Tier</th>
                <th className="px-6 py-4">Target Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-20 text-center text-slate-400 font-mono text-[10px] uppercase tracking-widest">
                    Retrieving Quote Requests...
                  </td>
                </tr>
              ) : filteredQuotes.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-20 text-center">
                    <FileText size={48} className="mx-auto text-slate-200 mb-4" />
                    <p className="text-slate-500 font-display text-lg uppercase tracking-tight">No quotes found</p>
                  </td>
                </tr>
              ) : (
                filteredQuotes.map((quote) => (
                  <tr key={quote.id} className="hover:bg-slate-50/50 transition-colors group cursor-pointer" onClick={() => setSelectedQuote(quote)}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-display text-[10px]">
                            {quote.customer_name?.charAt(0) || <UserIcon size={14} />}
                         </div>
                         <div className="flex flex-col">
                           <span className="text-sm font-bold text-slate-900">{quote.customer_name}</span>
                           <span className="text-[10px] text-slate-400 lowercase">{quote.customer_email}</span>
                         </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                       <div className="flex items-center gap-2">
                          <Truck size={12} className="text-slate-400" />
                          <span className="text-xs font-bold text-slate-700">{quote.vehicle_details}</span>
                       </div>
                    </td>
                    <td className="px-6 py-4">
                       <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600 bg-slate-100 px-2 py-1 rounded">
                          {quote.preferred_tier}
                       </span>
                    </td>
                    <td className="px-6 py-4">
                       <div className="flex items-center gap-2 text-slate-500">
                          <Calendar size={12} />
                          <span className="text-[11px] font-mono">{quote.target_date ? new Date(quote.target_date).toLocaleDateString() : 'TBD'}</span>
                       </div>
                    </td>
                    <td className="px-6 py-4">
                       {getStatusBadge(quote.status)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-slate-400 hover:text-brand-orange hover:bg-slate-100 rounded-lg transition-all" onClick={(e) => { e.stopPropagation(); setSelectedQuote(quote); }}>
                          <Eye size={16} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-slate-100 rounded-lg transition-all">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Slide-over */}
      {selectedQuote && (
        <>
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[200] animate-in fade-in duration-300" onClick={() => setSelectedQuote(null)} />
          <div className="fixed inset-y-0 right-0 w-full max-w-xl bg-white shadow-2xl z-[210] p-10 animate-in slide-in-from-right duration-300 overflow-y-auto">
             <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-900 font-display text-xl">
                      {selectedQuote.customer_name?.charAt(0)}
                   </div>
                   <div>
                      <h2 className="text-2xl font-bold text-slate-900 tracking-tight leading-none mb-1">{selectedQuote.customer_name}</h2>
                      <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">ID: {selectedQuote.id}</p>
                   </div>
                </div>
                <button onClick={() => setSelectedQuote(null)} className="p-2 hover:bg-slate-100 rounded-full transition-all text-slate-400"><X /></button>
             </div>

             <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                   <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Status</p>
                   {getStatusBadge(selectedQuote.status)}
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                   <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Submitted</p>
                   <p className="text-sm font-bold text-slate-900">{new Date(selectedQuote.created_at).toLocaleDateString()}</p>
                </div>
             </div>

             <div className="space-y-8 pb-20">
                {/* Contact Info */}
                <section>
                   <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Contact Information</h4>
                   <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
                      <div className="flex items-center gap-3 text-sm">
                         <Mail size={16} className="text-slate-400" />
                         <span className="font-bold text-slate-900">{selectedQuote.customer_email}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                         <Phone size={16} className="text-slate-400" />
                         <span className="font-bold text-slate-900">{selectedQuote.customer_phone || 'Not provided'}</span>
                      </div>
                   </div>
                </section>

                {/* Build Requirements */}
                <section>
                   <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Build Requirements</h4>
                   <div className="bg-slate-900 text-white rounded-xl p-6 shadow-lg shadow-slate-900/10">
                      <div className="grid grid-cols-2 gap-6 mb-6">
                         <div>
                            <p className="text-[9px] font-mono text-slate-400 uppercase tracking-widest mb-1">Vehicle Details</p>
                            <p className="font-bold">{selectedQuote.vehicle_details}</p>
                         </div>
                         <div>
                            <p className="text-[9px] font-mono text-slate-400 uppercase tracking-widest mb-1">Target Start</p>
                            <p className="font-bold text-brand-orange">{selectedQuote.target_date ? new Date(selectedQuote.target_date).toLocaleDateString() : 'TBD'}</p>
                         </div>
                      </div>
                      <div className="grid grid-cols-2 gap-6 pb-6 border-b border-white/10 mb-6">
                         <div>
                            <p className="text-[9px] font-mono text-slate-400 uppercase tracking-widest mb-1">System Tier</p>
                            <p className="font-bold">{selectedQuote.preferred_tier}</p>
                         </div>
                         <div>
                            <p className="text-[9px] font-mono text-slate-400 uppercase tracking-widest mb-1">Stated Budget</p>
                            <p className="font-bold text-emerald-400">{selectedQuote.budget || 'Not specified'}</p>
                         </div>
                      </div>
                      <div>
                         <p className="text-[9px] font-mono text-slate-400 uppercase tracking-widest mb-2">Additional Notes</p>
                         <p className="text-sm text-slate-300 leading-relaxed bg-white/5 p-4 rounded-lg">
                           {selectedQuote.notes || "Looking for a robust off-grid electrical system capable of running induction cooking and air conditioning for multi-week trips."}
                         </p>
                      </div>
                   </div>
                </section>

                {/* Actions */}
                <div className="flex gap-4 pt-4">
                   <button className="flex-1 py-4 bg-slate-900 text-white rounded-xl font-display text-xs uppercase tracking-widest hover:bg-brand-orange transition-all font-bold shadow-xl shadow-slate-200">
                     Generate Quote PDF
                   </button>
                   <button className="p-4 border border-slate-200 rounded-xl text-slate-400 hover:text-slate-900 hover:border-slate-400 transition-all">
                     <Mail size={18} />
                   </button>
                </div>
             </div>
          </div>
        </>
      )}
    </div>
  );
}
