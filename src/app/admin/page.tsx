"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  Activity, 
  ArrowUpRight, 
  Plus, 
  FileText, 
  Mail, 
  Search, 
  Database,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Eye,
  Shield,
  Receipt,
  Magnet,
  Percent,
  Sparkles
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";

// Mock Data for Charts
const revenueData = [
  { name: '01 May', total: 1200, avg: 900 },
  { name: '02 May', total: 2100, avg: 1100 },
  { name: '03 May', total: 1800, avg: 1200 },
  { name: '04 May', total: 2400, avg: 1400 },
  { name: '05 May', total: 3200, avg: 1600 },
  { name: '06 May', total: 2800, avg: 1800 },
  { name: '07 May', total: 3500, avg: 2000 },
];

export default function AdminPage() {
  const [stats, setStats] = useState({
    revenueToday: '£3,450',
    revenueMonth: '£42,800',
    activeOrders: '24',
    visitors: '1,248',
    productsLive: '342',
    subscribers: '1,428',
    blueprintsMTD: '18',
    leads: '54',
    seoScore: '84/100'
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, we would fetch actual stats from Supabase here
    // For now we use the requested structure with placeholder data
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-t-2 border-brand-orange animate-spin rounded-full" />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <div className="flex items-center gap-2 font-mono text-[9px] text-brand-orange uppercase tracking-[0.3em] mb-2">
            <Shield size={10} /> Node: Command.Centre.Root
          </div>
          <h1 className="text-4xl font-bold text-slate-900 tracking-tighter">Command <span className="text-brand-orange underline decoration-brand-orange/20">Centre</span></h1>
          <p className="text-slate-500 text-sm mt-1">Real-time operational dashboard for Amplios.co.uk</p>
        </div>
        <div className="text-right hidden md:block">
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400">System Time</p>
          <p className="text-sm font-mono text-slate-700">{new Date().toLocaleTimeString()}</p>
        </div>
      </div>

      {/* TOP ROW — KEY METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Revenue Today', value: stats.revenueToday, change: '+12%', color: 'text-emerald-600', icon: TrendingUp },
          { label: 'Revenue This Month', value: stats.revenueMonth, change: '+8%', color: 'text-emerald-600', icon: Receipt },
          { label: 'Active Orders', value: stats.activeOrders, change: '5 pending', color: 'text-blue-600', icon: ShoppingBag },
          { label: 'Store Visitors Today', value: stats.visitors, change: '3.2% conv', color: 'text-slate-600', icon: Eye },
        ].map((m, i) => (
          <div key={i} className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm hover:border-brand-orange/30 transition-all group">
            <div className="flex justify-between items-start mb-4">
               <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400">{m.label}</p>
               <m.icon size={14} className="text-slate-300 group-hover:text-brand-orange transition-colors" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-900">{m.value}</span>
              <span className={cn("text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100", m.color)}>{m.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* SECOND ROW — QUICK STATS */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: 'Products Live', value: stats.productsLive, sub: '28 drafts' },
          { label: 'Subscribers', value: stats.subscribers, sub: '+42 this week' },
          { label: 'Blueprints (MTD)', value: stats.blueprintsMTD, sub: '£1,422 rev' },
          { label: 'Leads Captured', value: stats.leads, sub: 'this week' },
          { label: 'SEO Health Score', value: stats.seoScore, sub: '↑4 pts' },
        ].map((s, i) => (
          <div key={i} className="bg-white/50 border border-slate-200 p-4 rounded-lg">
            <p className="text-[9px] font-mono uppercase tracking-widest text-slate-400 mb-1">{s.label}</p>
            <p className="text-xl font-bold text-slate-900 leading-none">{s.value}</p>
            <p className="text-[10px] text-slate-400 mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
        {/* LEFT COLUMN (2/3) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Revenue Chart */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-50">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Revenue Performance</h3>
                <p className="text-xs text-slate-500">Daily revenue bars + 7-day rolling average line</p>
              </div>
              <div className="flex bg-slate-100 p-1 rounded-md self-start">
                {['7d', '30d', '90d', '12m'].map(p => (
                  <button key={p} className={cn("px-3 py-1 text-[10px] uppercase font-bold rounded transition-all", p === '30d' ? "bg-white shadow-sm text-slate-900" : "text-slate-500 hover:text-slate-700")}>
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <div className="p-6">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 10, fill: '#94a3b8' }} 
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 10, fill: '#94a3b8' }}
                      tickFormatter={(value) => `£${value}`}
                    />
                    <Tooltip 
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '12px' }}
                      labelStyle={{ fontWeight: 'bold', marginBottom: '4px' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="total" 
                      stroke="#f97316" 
                      strokeWidth={3} 
                      dot={{ r: 4, fill: '#f97316', strokeWidth: 2, stroke: '#fff' }} 
                      activeDot={{ r: 6 }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="avg" 
                      stroke="#cbd5e1" 
                      strokeWidth={2} 
                      strokeDasharray="5 5" 
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 flex items-center justify-between border-b border-slate-50">
              <h3 className="text-lg font-bold text-slate-900">Recent Orders</h3>
              <Link href="/admin/orders" className="text-[10px] font-bold uppercase tracking-widest text-brand-orange hover:underline flex items-center gap-1">
                View All Orders <ArrowUpRight size={12} />
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-3 text-[10px] font-mono uppercase tracking-widest text-slate-400">Order</th>
                    <th className="px-6 py-3 text-[10px] font-mono uppercase tracking-widest text-slate-400">Customer</th>
                    <th className="px-6 py-3 text-[10px] font-mono uppercase tracking-widest text-slate-400">Items</th>
                    <th className="px-6 py-3 text-[10px] font-mono uppercase tracking-widest text-slate-400">Total</th>
                    <th className="px-6 py-3 text-[10px] font-mono uppercase tracking-widest text-slate-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { id: '#1284', customer: 'James Wilson', items: 3, total: '£4,250', status: 'Processing' },
                    { id: '#1283', customer: 'Sarah Hughes', items: 1, total: '£185', status: 'Shipped' },
                    { id: '#1282', customer: 'Mike Thompson', items: 5, total: '£850', status: 'Paid' },
                    { id: '#1281', customer: 'David Lloyd', items: 2, total: '£2,100', status: 'Paid' },
                    { id: '#1280', customer: 'Emma Reed', items: 1, total: '£79', status: 'Delivered' },
                  ].map((o) => (
                    <tr key={o.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-mono font-bold text-slate-900">{o.id}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{o.customer}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{o.items}</td>
                      <td className="px-6 py-4 text-sm font-bold text-slate-900">{o.total}</td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider",
                          o.status === 'Delivered' ? "bg-emerald-100 text-emerald-700" :
                          o.status === 'Processing' ? "bg-blue-100 text-blue-700" :
                          o.status === 'Shipped' ? "bg-amber-100 text-amber-700" :
                          "bg-slate-100 text-slate-700"
                        )}>
                          {o.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 flex items-center justify-between border-b border-slate-50">
              <h3 className="text-lg font-bold text-slate-900">Top Products This Month</h3>
              <Link href="/admin/analytics" className="text-[10px] font-bold uppercase tracking-widest text-brand-orange hover:underline">
                Full Report
              </Link>
            </div>
            <div className="divide-y divide-slate-100">
               {[
                 { rank: 1, name: 'Victron MultiPlus-II 3000', sold: 12, revenue: '£14,400' },
                 { rank: 2, name: 'Fogstar 400Ah Lithium', sold: 8, revenue: '£12,000' },
                 { rank: 3, name: 'Full Autonomy Electrical Kit', sold: 4, revenue: '£13,800' },
                 { rank: 4, name: 'MaxxFan Deluxe (Smoke)', sold: 24, revenue: '£8,400' },
               ].map((p) => (
                 <div key={p.rank} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                   <div className="flex items-center gap-4">
                     <span className="w-6 h-6 flex items-center justify-center bg-slate-100 rounded text-[10px] font-mono font-bold text-slate-500">
                       {p.rank}
                     </span>
                     <span className="text-sm font-bold text-slate-900">{p.name}</span>
                   </div>
                   <div className="text-right">
                     <p className="text-sm font-bold text-slate-900">{p.revenue}</p>
                     <p className="text-[10px] text-slate-400 uppercase tracking-tight">{p.sold} units sold</p>
                   </div>
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (1/3) */}
        <div className="space-y-8">
          {/* Quick Actions */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400 mb-6">Quick Actions</h3>
            <div className="grid grid-cols-1 gap-3">
              {[
                { label: 'Add Product', icon: Plus, href: '/admin/products' },
                { label: 'Write Resource with AI', icon: Sparkles, href: '/admin/ai-studio' },
                { label: 'Send Newsletter', icon: Mail, href: '/admin/newsletter' },
                { label: 'View SEO Issues', icon: Search, href: '/admin/seo' },
                { label: 'Generate Blueprint', icon: Database, href: '/admin/blueprints' },
              ].map((a, i) => (
                <Link 
                  key={i} 
                  href={a.href}
                  className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 hover:border-brand-orange hover:bg-orange-50/30 transition-all group"
                >
                  <div className="w-8 h-8 rounded bg-slate-50 flex items-center justify-center group-hover:bg-brand-orange group-hover:text-white transition-colors">
                    <a.icon size={16} />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-slate-700 group-hover:text-slate-900">{a.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Alerts & Notifications */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
             <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400 mb-6">Alerts & Notifications</h3>
             <div className="space-y-4">
                {[
                  { type: 'error', message: '3 products have no images', icon: XCircle, time: '2 hours ago' },
                  { type: 'warn', message: '5 products low stock (<5 units)', icon: AlertCircle, time: '4 hours ago' },
                  { type: 'warn', message: 'SEO: 12 pages missing meta descriptions', icon: AlertCircle, time: '1 day ago' },
                  { type: 'info', message: 'Newsletter sent to 1,247 subscribers', icon: CheckCircle2, time: '2 days ago' },
                ].map((a, i) => (
                  <div key={i} className="flex gap-4 group cursor-pointer">
                    <div className={cn(
                      "mt-0.5",
                      a.type === 'error' ? "text-red-500" : a.type === 'warn' ? "text-amber-500" : "text-emerald-500"
                    )}>
                      <a.icon size={16} />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-slate-800 group-hover:text-brand-orange transition-colors">{a.message}</p>
                      <p className="text-[9px] text-slate-400 uppercase tracking-tight mt-0.5">{a.time}</p>
                    </div>
                  </div>
                ))}
             </div>
          </div>

          {/* Leads Widget */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
             <div className="flex justify-between items-end mb-6">
                <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400">Recent Leads</h3>
                <Link href="/admin/leads" className="text-[10px] font-bold text-brand-orange">View All</Link>
             </div>
             <div className="space-y-4">
                {[
                  { name: 'Marcus Aurelius', source: 'Blueprint Planner', date: '10 mins ago' },
                  { name: 'Sarah Connor', source: 'Newsletter', date: '45 mins ago' },
                  { name: 'John Doe', source: 'Guide Download', date: '2 hours ago' },
                ].map((l, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
                    <div>
                      <p className="text-sm font-bold text-slate-900">{l.name}</p>
                      <p className="text-[10px] text-slate-400 uppercase tracking-tight">{l.source}</p>
                    </div>
                    <p className="text-[10px] font-mono text-slate-400 uppercase">{l.date}</p>
                  </div>
                ))}
             </div>
          </div>

          {/* Live Visitor Count */}
          <div className="bg-slate-900 rounded-xl p-6 shadow-lg border border-slate-800 relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Eye size={48} className="text-white" />
             </div>
             <div className="relative z-10">
                <div className="flex items-center gap-2 mb-1">
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                   <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400">Live Visitors</h3>
                </div>
                <p className="text-4xl font-bold text-white tracking-tighter">142</p>
                <div className="mt-6 space-y-2">
                   <p className="text-[9px] font-mono uppercase tracking-widest text-slate-500">Top Pages Right Now</p>
                   <div className="space-y-1">
                      <div className="flex justify-between text-[10px]">
                         <span className="text-slate-300 truncate w-40">/store/electrical</span>
                         <span className="text-brand-orange font-bold font-mono">42</span>
                      </div>
                      <div className="flex justify-between text-[10px]">
                         <span className="text-slate-300 truncate w-40">/planner</span>
                         <span className="text-brand-orange font-bold font-mono">28</span>
                      </div>
                      <div className="flex justify-between text-[10px]">
                         <span className="text-slate-300 truncate w-40">/resources/insulation-guide</span>
                         <span className="text-brand-orange font-bold font-mono">12</span>
                      </div>
                   </div>
                </div>
                <p className="text-[8px] font-mono text-slate-600 uppercase tracking-widest mt-6">Updates every 60s</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
