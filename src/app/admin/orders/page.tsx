"use client";

import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Search, Filter, Download, Eye, Mail, 
  CreditCard, Globe, ShoppingBag, Truck,
  Clock, CheckCircle2, AlertCircle, TrendingUp,
  Receipt, User, MoreVertical
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Order {
  id: string;
  created_at: string;
  customer_name: string;
  customer_email: string;
  total_gbp: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  payment_status: 'paid' | 'unpaid' | 'refunded';
  payment_method: string;
  channel: 'store' | 'ebay' | 'amazon' | 'manual';
  items_count: number;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    async function fetchOrders() {
      setLoading(true);
      const { data } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (data) {
        setOrders(data as Order[]);
      }
      setLoading(false);
    }
    fetchOrders();
  }, []);

  const filteredOrders = useMemo(() => {
    return orders.filter(o => {
      const matchesSearch = o.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           o.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTab = activeTab === 'all' || o.status === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [orders, searchTerm, activeTab]);

  const stats = {
    total: orders.length,
    revenue: orders.filter(o => o.payment_status === 'paid').reduce((sum, o) => sum + o.total_gbp, 0),
    pending: orders.filter(o => o.status === 'pending').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered': return <span className="px-2 py-1 bg-emerald-100 text-emerald-600 rounded-full text-[9px] font-bold uppercase border border-emerald-200">DELIVERED</span>;
      case 'shipped': return <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-[9px] font-bold uppercase border border-blue-200">SHIPPED</span>;
      case 'processing': return <span className="px-2 py-1 bg-amber-100 text-amber-600 rounded-full text-[9px] font-bold uppercase border border-amber-200">PROCESSING</span>;
      case 'pending': return <span className="px-2 py-1 bg-slate-100 text-slate-400 rounded-full text-[9px] font-bold uppercase border border-slate-200">PENDING</span>;
      default: return <span className="px-2 py-1 bg-red-100 text-red-600 rounded-full text-[9px] font-bold uppercase border border-red-200">{status}</span>;
    }
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'ebay': return <div className="p-1.5 bg-blue-50 text-blue-600 rounded border border-blue-100"><ShoppingBag size={12} /></div>;
      case 'amazon': return <div className="p-1.5 bg-amber-50 text-amber-600 rounded border border-amber-100"><Globe size={12} /></div>;
      default: return <div className="p-1.5 bg-slate-50 text-slate-600 rounded border border-slate-100"><Globe size={12} /></div>;
    }
  };

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="font-display text-4xl uppercase tracking-tighter text-slate-900">Commerce Ledger</h1>
          <p className="text-slate-500 text-sm mt-1">
            Total Revenue: £{(stats.revenue / 100).toLocaleString()} · {stats.pending} orders awaiting fulfillment
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-3 border border-slate-200 text-slate-600 font-display text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all font-bold flex items-center gap-2">
            <Download size={14} /> Export CSV
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         {[
           { label: 'MTD Revenue', value: `£${(stats.revenue / 100).toLocaleString()}`, icon: TrendingUp, color: 'text-emerald-500' },
           { label: 'Orders (MTD)', value: stats.total, icon: Receipt, color: 'text-slate-900' },
           { label: 'Avg. Order', value: `£${(stats.revenue / 100 / (stats.total || 1)).toFixed(2)}`, icon: ShoppingBag, color: 'text-slate-900' },
           { label: 'Unfulfilled', value: stats.pending, icon: Clock, color: 'text-brand-orange' },
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

      {/* Tabs */}
      <div className="flex border-b border-slate-100 no-scrollbar gap-8 overflow-x-auto">
        {['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "pb-4 text-[10px] font-bold uppercase tracking-[0.2em] transition-all border-b-2 whitespace-nowrap",
              activeTab === tab 
                ? "border-brand-orange text-brand-orange" 
                : "border-transparent text-slate-400 hover:text-slate-600"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-mono uppercase tracking-widest text-slate-400">
                <th className="px-6 py-4">Order Details</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Channel</th>
                <th className="px-6 py-4">Method</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-20 text-center text-slate-400 font-mono text-[10px] uppercase tracking-widest">
                    Retrieving Ledger Transactions...
                  </td>
                </tr>
              ) : filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-20 text-center">
                    <Receipt size={48} className="mx-auto text-slate-200 mb-4" />
                    <p className="text-slate-500 font-display text-lg uppercase tracking-tight">No orders found</p>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((o) => (
                  <tr key={o.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-900 font-mono">#{o.id.substring(0, 8).toUpperCase()}</span>
                        <span className="text-[10px] text-slate-400 font-mono mt-0.5">{new Date(o.created_at).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-display text-[10px]">
                            {o.customer_name?.charAt(0) || <User size={14} />}
                         </div>
                         <div className="flex flex-col">
                           <span className="text-sm font-bold text-slate-900">{o.customer_name}</span>
                           <span className="text-[10px] text-slate-400 lowercase truncate max-w-[150px]">{o.customer_email}</span>
                         </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                       <div className="flex items-center gap-2">
                          {getChannelIcon(o.channel)}
                          <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{o.channel || 'Store'}</span>
                       </div>
                    </td>
                    <td className="px-6 py-4">
                       <div className="flex items-center gap-2 text-slate-500">
                          <CreditCard size={12} />
                          <span className="text-[10px] font-mono uppercase">{o.payment_method || 'STRIPE'}</span>
                       </div>
                    </td>
                    <td className="px-6 py-4">
                       {getStatusBadge(o.status)}
                    </td>
                    <td className="px-6 py-4">
                       <span className="text-base font-bold text-slate-900">£{(o.total_gbp / 100).toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link href={`/admin/orders/${o.id}`} className="p-2 text-slate-400 hover:text-brand-orange hover:bg-slate-100 rounded-lg transition-all">
                          <Eye size={16} />
                        </Link>
                        <button className="p-2 text-slate-400 hover:text-brand-orange hover:bg-slate-100 rounded-lg transition-all">
                          <Mail size={16} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all">
                          <MoreVertical size={16} />
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
