"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { 
  Search, 
  Filter, 
  ChevronDown, 
  Download, 
  Eye, 
  Clock, 
  CheckCircle2, 
  Truck, 
  AlertCircle, 
  MoreHorizontal,
  ArrowUpRight,
  Receipt,
  Mail,
  User,
  ShoppingBag
} from "lucide-react";
import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  'Pending': 'bg-slate-100 text-slate-600 border-slate-200',
  'Paid': 'bg-emerald-50 text-emerald-600 border-emerald-100',
  'Processing': 'bg-blue-50 text-blue-600 border-blue-100',
  'Shipped': 'bg-amber-50 text-amber-600 border-amber-100',
  'Delivered': 'bg-emerald-50 text-emerald-600 border-emerald-100',
  'Cancelled': 'bg-red-50 text-red-600 border-red-100',
  'Refunded': 'bg-slate-50 text-slate-400 border-slate-200',
};

const mockOrders = [
  { id: 'ORD-1284', date: '2024-05-07', customer: 'James Wilson', email: 'james@example.com', items: 3, total: '£4,250', status: 'Processing' },
  { id: 'ORD-1283', date: '2024-05-06', customer: 'Sarah Hughes', email: 'sarah.h@gmail.com', items: 1, total: '£185', status: 'Shipped' },
  { id: 'ORD-1282', date: '2024-05-06', customer: 'Mike Thompson', email: 'mike.t@outlook.com', items: 5, total: '£850', status: 'Paid' },
  { id: 'ORD-1281', date: '2024-05-05', customer: 'David Lloyd', email: 'david@lloyd.com', items: 2, total: '£2,100', status: 'Paid' },
  { id: 'ORD-1280', date: '2024-05-04', customer: 'Emma Reed', email: 'em@reed.me', items: 1, total: '£79', status: 'Delivered' },
];

export default function OrdersPage() {
  const [activeStatus, setActiveStatus] = useState('All');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const statuses = ['All', 'Pending', 'Paid', 'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Refunded'];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tighter">Orders</h1>
          <p className="text-slate-500 text-sm mt-1">Lifecycle management for e-commerce transactions</p>
        </div>
        <div className="flex items-center gap-3">
           <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 hover:text-slate-900 transition-all rounded-lg text-xs font-bold uppercase tracking-widest">
              <Download size={14} /> Export CSV
           </button>
        </div>
      </div>

      {/* Tabs / Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
         <div className="flex overflow-x-auto border-b border-slate-100 no-scrollbar gap-8">
            {statuses.map(status => (
              <button
                key={status}
                onClick={() => setActiveStatus(status)}
                className={cn(
                  "pb-4 text-[10px] font-bold uppercase tracking-[0.2em] transition-all border-b-2 whitespace-nowrap",
                  activeStatus === status 
                    ? "border-brand-orange text-brand-orange" 
                    : "border-transparent text-slate-400 hover:text-slate-600"
                )}
              >
                {status}
              </button>
            ))}
         </div>

         <div className="relative group w-full md:w-64">
           <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-orange transition-colors" />
           <input 
             type="text"
             value={search}
             onChange={e => setSearch(e.target.value)}
             placeholder="Search Order #, Name..."
             className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-brand-orange/20 transition-all"
           />
         </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
         {[
           { label: 'Total Orders (MTD)', value: '184', icon: Receipt },
           { label: 'Pending Fulfillment', value: '12', icon: Clock },
           { label: 'Average Order Value', value: '£232.82', icon: ShoppingBag },
           { label: 'Total Revenue (MTD)', value: '£42,840', icon: TrendingUp },
         ].map((s, i) => (
           <div key={i} className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
              <div className="flex justify-between items-start mb-2">
                 <p className="text-[9px] font-mono uppercase tracking-widest text-slate-400">{s.label}</p>
                 <s.icon size={12} className="text-slate-300" />
              </div>
              <p className="text-xl font-bold text-slate-900">{s.value}</p>
           </div>
         ))}
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-[10px] font-mono uppercase tracking-widest text-slate-400">Order #</th>
                <th className="px-6 py-4 text-[10px] font-mono uppercase tracking-widest text-slate-400">Date</th>
                <th className="px-6 py-4 text-[10px] font-mono uppercase tracking-widest text-slate-400">Customer</th>
                <th className="px-6 py-4 text-[10px] font-mono uppercase tracking-widest text-slate-400">Items</th>
                <th className="px-6 py-4 text-[10px] font-mono uppercase tracking-widest text-slate-400">Total</th>
                <th className="px-6 py-4 text-[10px] font-mono uppercase tracking-widest text-slate-400">Status</th>
                <th className="px-6 py-4 text-[10px] font-mono uppercase tracking-widest text-slate-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockOrders.map(order => (
                <tr key={order.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                     <span className="text-sm font-bold text-slate-900 font-mono">{order.id}</span>
                  </td>
                  <td className="px-6 py-4">
                     <span className="text-[11px] text-slate-500 font-mono uppercase tracking-tight">{order.date}</span>
                  </td>
                  <td className="px-6 py-4">
                     <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-900">{order.customer}</span>
                        <span className="text-[10px] text-slate-400 lowercase truncate max-w-[120px]">{order.email}</span>
                     </div>
                  </td>
                  <td className="px-6 py-4">
                     <span className="text-[11px] font-bold text-slate-600">{order.items} items</span>
                  </td>
                  <td className="px-6 py-4">
                     <span className="text-sm font-bold text-slate-900">{order.total}</span>
                  </td>
                  <td className="px-6 py-4">
                     <div className={cn(
                       "inline-flex items-center gap-1.5 px-2 py-1 rounded-full border text-[9px] font-bold uppercase tracking-widest",
                       statusStyles[order.status]
                     )}>
                        <div className={cn("w-1 h-1 rounded-full", order.status === 'Processing' ? 'bg-blue-600' : 'bg-emerald-600')} />
                        {order.status}
                     </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                     <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link href={`/admin/orders/${order.id}`} className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all">
                           <Eye size={14} />
                        </Link>
                        <button className="p-2 text-slate-400 hover:text-brand-orange hover:bg-slate-100 rounded-lg transition-all">
                           <Mail size={14} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all">
                           <MoreHorizontal size={14} />
                        </button>
                     </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Abandoned Cart Mini Widget */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
         <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white border border-slate-200 rounded-full flex items-center justify-center text-brand-orange shadow-sm">
               <ShoppingBag size={20} />
            </div>
            <div>
               <h3 className="text-sm font-bold text-slate-900">Abandoned Carts (24h)</h3>
               <p className="text-xs text-slate-500">12 builders left items in their cart in the last 24 hours.</p>
            </div>
         </div>
         <div className="flex items-center gap-6">
            <div className="text-right">
               <p className="text-[9px] font-mono uppercase tracking-widest text-slate-400">Potential Revenue</p>
               <p className="text-xl font-bold text-slate-900">£1,842.00</p>
            </div>
            <Link href="/admin/orders/abandoned" className="px-6 py-3 bg-slate-900 text-white rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-brand-orange transition-all shadow-lg shadow-slate-900/10">
               Recovery Center
            </Link>
         </div>
      </div>
    </div>
  );
}

import { TrendingUp } from "lucide-react";
