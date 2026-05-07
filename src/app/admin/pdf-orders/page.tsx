"use client";

import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Search, Filter, Eye, Download, Mail, 
  FileText, CheckCircle2, AlertCircle, TrendingUp,
  MoreVertical, Clock, CreditCard
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface PdfOrder {
  id: string;
  created_at: string;
  customer_name: string;
  customer_email: string;
  plan_id: string;
  plan_name: string;
  amount_gbp: number;
  payment_status: 'paid' | 'pending' | 'failed' | 'refunded';
  delivery_status: 'delivered' | 'pending' | 'failed';
}

export default function AdminPdfOrdersPage() {
  const [orders, setOrders] = useState<PdfOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    async function fetchPdfOrders() {
      setLoading(true);
      const { data } = await supabase
        .from('pdf_orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (data) {
        setOrders(data as PdfOrder[]);
      } else {
        // Mock data
        setOrders([
          { id: 'po-592', created_at: new Date().toISOString(), customer_name: 'Sarah Jenkins', customer_email: 'sarah.j@example.com', plan_id: 'bp-1', plan_name: 'Expedition Pro Series', amount_gbp: 4900, payment_status: 'paid', delivery_status: 'delivered' },
          { id: 'po-591', created_at: new Date(Date.now() - 3600000).toISOString(), customer_name: 'Mark Taylor', customer_email: 'mtaylor88@gmail.com', plan_id: 'bp-2', plan_name: 'Weekend Warrior Base', amount_gbp: 2900, payment_status: 'paid', delivery_status: 'delivered' },
          { id: 'po-590', created_at: new Date(Date.now() - 86400000).toISOString(), customer_name: 'Oliver Brown', customer_email: 'oliver.b@outlook.com', plan_id: 'bp-1', plan_name: 'Expedition Pro Series', amount_gbp: 4900, payment_status: 'failed', delivery_status: 'pending' },
        ]);
      }
      setLoading(false);
    }
    fetchPdfOrders();
  }, []);

  const filteredOrders = useMemo(() => {
    return orders.filter(o => {
      const matchesSearch = o.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           o.customer_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           o.plan_name?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTab = activeTab === 'all' || o.payment_status === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [orders, searchTerm, activeTab]);

  const stats = {
    total: orders.length,
    revenue: orders.filter(o => o.payment_status === 'paid').reduce((sum, o) => sum + o.amount_gbp, 0),
    delivered: orders.filter(o => o.delivery_status === 'delivered').length,
    failed: orders.filter(o => o.payment_status === 'failed' || o.delivery_status === 'failed').length,
  };

  const getStatusBadge = (status: string, type: 'payment' | 'delivery') => {
    if (type === 'payment') {
      switch (status) {
        case 'paid': return <span className="px-2 py-1 bg-emerald-100 text-emerald-600 rounded-full text-[9px] font-bold uppercase border border-emerald-200">PAID</span>;
        case 'pending': return <span className="px-2 py-1 bg-amber-100 text-amber-600 rounded-full text-[9px] font-bold uppercase border border-amber-200">PENDING</span>;
        case 'failed': return <span className="px-2 py-1 bg-red-100 text-red-600 rounded-full text-[9px] font-bold uppercase border border-red-200">FAILED</span>;
        default: return <span className="px-2 py-1 bg-slate-100 text-slate-400 rounded-full text-[9px] font-bold uppercase border border-slate-200">{status}</span>;
      }
    } else {
      switch (status) {
        case 'delivered': return <span className="text-emerald-500 flex items-center gap-1 text-[10px] font-bold uppercase"><CheckCircle2 size={12} /> SENT</span>;
        case 'pending': return <span className="text-amber-500 flex items-center gap-1 text-[10px] font-bold uppercase"><Clock size={12} /> QUEUED</span>;
        case 'failed': return <span className="text-red-500 flex items-center gap-1 text-[10px] font-bold uppercase"><AlertCircle size={12} /> ERROR</span>;
        default: return <span className="text-slate-400 text-[10px] font-bold uppercase">{status}</span>;
      }
    }
  };

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="font-display text-4xl uppercase tracking-tighter text-slate-900">Digital Deliveries</h1>
          <p className="text-slate-500 text-sm mt-1">
            Automated PDF blueprint sales and distribution
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         {[
           { label: 'Total Digital Sales', value: stats.total, icon: FileText, color: 'text-slate-900' },
           { label: 'Net Revenue', value: `£${(stats.revenue / 100).toLocaleString()}`, icon: TrendingUp, color: 'text-emerald-500' },
           { label: 'Successful Deliveries', value: stats.delivered, icon: CheckCircle2, color: 'text-emerald-500' },
           { label: 'Delivery Errors', value: stats.failed, icon: AlertCircle, color: stats.failed > 0 ? 'text-red-500' : 'text-slate-300' },
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
          {['all', 'paid', 'pending', 'failed', 'refunded'].map(tab => (
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
            placeholder="Search orders..."
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
                <th className="px-6 py-4">Transaction Info</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Blueprint Ordered</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Payment</th>
                <th className="px-6 py-4">Delivery</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-20 text-center text-slate-400 font-mono text-[10px] uppercase tracking-widest">
                    Retrieving Digital Sales...
                  </td>
                </tr>
              ) : filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-20 text-center">
                    <FileText size={48} className="mx-auto text-slate-200 mb-4" />
                    <p className="text-slate-500 font-display text-lg uppercase tracking-tight">No digital orders found</p>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-900 font-mono">#{order.id.split('-')[1] || order.id}</span>
                        <span className="text-[10px] text-slate-400 font-mono mt-0.5">{new Date(order.created_at).toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                         <span className="text-sm font-bold text-slate-900">{order.customer_name}</span>
                         <span className="text-[10px] text-slate-400 lowercase">{order.customer_email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                       <div className="flex items-center gap-2">
                          <FileText size={12} className="text-brand-orange" />
                          <span className="text-xs font-bold text-slate-700">{order.plan_name}</span>
                       </div>
                    </td>
                    <td className="px-6 py-4">
                       <span className="text-sm font-bold text-slate-900">£{(order.amount_gbp / 100).toFixed(2)}</span>
                    </td>
                    <td className="px-6 py-4">
                       {getStatusBadge(order.payment_status, 'payment')}
                    </td>
                    <td className="px-6 py-4">
                       {getStatusBadge(order.delivery_status, 'delivery')}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-slate-400 hover:text-brand-orange hover:bg-slate-100 rounded-lg transition-all" title="Resend Email">
                          <Mail size={16} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all" title="View Transaction">
                          <CreditCard size={16} />
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
    </div>
  );
}
