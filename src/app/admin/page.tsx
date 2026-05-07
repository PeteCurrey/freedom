"use client";

import { 
  Users, Layout, Magnet, Receipt, Share2, Package, 
  Car, Target, AlertTriangle, TrendingUp, ArrowUpRight,
  Monitor, Database, Zap, Clock, ShieldCheck, Activity,
  Settings, ShoppingBag, Send
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const metrics = [
  { label: "Active Quotations", value: "48", change: "+24%", trend: "up", icon: Magnet },
  { label: "Baskets Locked", value: "142", change: "+15%", trend: "up", icon: Database },
  { label: "PDF Purchases", value: "62", change: "+5%", trend: "up", icon: Receipt },
  { label: "Affiliate Leads", value: "2,405", change: "+18%", trend: "up", icon: Share2 },
  { label: "System Health", value: "100%", change: "Nominal", trend: "up", icon: Activity },
  { label: "Est. Revenue", value: "£42,850", change: "MTD", trend: "up", icon: TrendingUp },
];

const secondaryMetrics = [
  { label: "Top Vehicle Platform", value: "Mercedes Sprinter", sub: "42% of active builds", icon: Car },
  { label: "Primary Use Case", value: "Full-Time Off-Grid", sub: "56% of active builds", icon: Target },
  { label: "Abandoned Configurations", value: "312", sub: "Stage 4 dropout average", icon: AlertTriangle },
  { label: "Inventory Alerts", value: "14", sub: "Low stock across 3 suppliers", icon: Package },
];

export default function AdminDashboard() {
  return (
    <div className="p-8 space-y-12 max-w-7xl mx-auto animate-in fade-in duration-500">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="font-display text-4xl uppercase tracking-tighter text-slate-900 mb-1">Command <span className="text-brand-orange">Centre</span></h1>
          <p className="font-mono text-[10px] text-slate-500 uppercase tracking-[0.2em]">Platform Intelligence & Automated Operations</p>
        </div>
        <div className="flex gap-4">
           <div className="bg-white border border-slate-200 rounded-lg px-4 py-2 flex items-center gap-3 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" />
              <span className="font-mono text-[9px] text-slate-600 font-bold uppercase tracking-widest">Real-time Sync Active</span>
           </div>
        </div>
      </div>

      {/* PRIMARY METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {metrics.map((m) => (
          <div key={m.label} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-brand-orange/30 transition-all group">
            <div className="flex justify-between items-start mb-4">
               <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center">
                  <m.icon className="w-4 h-4 text-slate-400 group-hover:text-brand-orange transition-colors" />
               </div>
               <span className={cn(
                 "font-mono text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded",
                 m.trend === 'up' ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
               )}>{m.change}</span>
            </div>
            <div className="font-display text-2xl text-slate-900 mb-1">{m.value}</div>
            <div className="font-mono text-[9px] font-bold text-slate-400 uppercase tracking-widest">{m.label}</div>
          </div>
        ))}
      </div>

      {/* SECONDARY INSIGHTS */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {secondaryMetrics.map((m) => (
          <div key={m.label} className="bg-slate-900 rounded-2xl p-8 relative overflow-hidden group">
             <div className="absolute -top-4 -right-4 p-4 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
                <m.icon className="w-32 h-32 text-white" />
             </div>
             <div className="relative z-10">
                <span className="font-mono text-[9px] font-bold text-brand-orange uppercase tracking-widest block mb-4">{m.label}</span>
                <div className="font-display text-2xl text-white uppercase mb-2 leading-tight">{m.value}</div>
                <div className="font-mono text-[10px] text-slate-400 uppercase tracking-tight">{m.sub}</div>
             </div>
          </div>
        ))}
      </div>

      {/* MAIN DATA PANELS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* RECENT QUOTE REQUESTS */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
             <h2 className="font-display text-lg text-slate-900 uppercase tracking-widest flex items-center gap-3">
                <Magnet className="w-5 h-5 text-brand-orange" />
                Active Engineering Quotes
             </h2>
             <Link href="/admin/quotes" className="font-mono text-[9px] font-bold text-brand-orange uppercase tracking-widest hover:underline transition-colors flex items-center gap-1">
                View Ledger <ArrowUpRight size={12} />
             </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 font-mono text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                  <th className="p-6">Reference</th>
                  <th className="p-6">Target Vehicle</th>
                  <th className="p-6">System Tier</th>
                  <th className="p-6">Status</th>
                  <th className="p-6 text-right">Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[
                  { id: "QR-8472", vehicle: "Sprinter L3H2 4x4", tier: "T3 - Full Autonomy", status: "New", value: "£14,200" },
                  { id: "QR-8473", vehicle: "Crafter MWB", tier: "T1 - Weekend Core", status: "Reviewing", value: "£3,850" },
                  { id: "QR-8474", vehicle: "Transit L2H2", tier: "T2 - Extended Stay", status: "Quoted", value: "£8,100" },
                  { id: "QR-8475", vehicle: "Sprinter L2H1", tier: "T3 - Full Autonomy", status: "New", value: "£16,800" },
                ].map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="p-6 text-slate-900 font-bold font-mono">{row.id}</td>
                    <td className="p-6 text-slate-600 font-bold text-sm">{row.vehicle}</td>
                    <td className="p-6">
                       <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-[9px] font-bold uppercase tracking-widest">{row.tier}</span>
                    </td>
                    <td className="p-6">
                       <span className={cn(
                         "px-2 py-1 border rounded-full text-[9px] font-bold uppercase tracking-widest",
                         row.status === 'New' ? "border-brand-orange/30 text-brand-orange bg-brand-orange/5" : 
                         row.status === 'Reviewing' ? "border-amber-200 text-amber-600 bg-amber-50" :
                         "border-blue-200 text-blue-600 bg-blue-50"
                       )}>{row.status}</span>
                    </td>
                    <td className="p-6 text-right text-slate-900 font-bold">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SYSTEM HEALTH / ACTIVITY */}
        <div className="lg:col-span-4 space-y-6">
           {/* Live Stream */}
           <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
              <h3 className="font-display text-sm text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-3">
                 <Activity className="w-4 h-4 text-brand-orange" />
                 Live Operations Stream
              </h3>
              <div className="space-y-6">
                 {[
                   { time: "2m ago", text: "New Configuration locked for VW Crafter", icon: Layout, color: 'text-blue-500' },
                   { time: "14m ago", text: "Digital Sale: Expedition Blueprint (£49)", icon: Receipt, color: 'text-emerald-500' },
                   { time: "28m ago", text: "Affiliate Click: Victron MultiPlus (Roamer)", icon: Share2, color: 'text-amber-500' },
                   { time: "1h ago", text: "Client Portal: Message from James W.", icon: Send, color: 'text-brand-orange' },
                 ].map((activity, i) => (
                   <div key={i} className="flex gap-4 group">
                      <div className="shrink-0 mt-0.5 w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
                         <activity.icon className={cn("w-3.5 h-3.5", activity.color)} />
                      </div>
                      <div>
                         <p className="font-bold text-xs text-slate-700 leading-snug group-hover:text-slate-900 transition-colors">{activity.text}</p>
                         <div className="flex items-center gap-1 mt-1">
                            <Clock size={10} className="text-slate-400" />
                            <span className="font-mono text-[9px] text-slate-400 uppercase tracking-widest">{activity.time}</span>
                         </div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           {/* Alerts */}
           <div className="bg-brand-orange/5 border border-brand-orange/20 rounded-2xl p-6">
              <h3 className="font-display text-sm text-brand-orange uppercase tracking-widest mb-4 flex items-center gap-2">
                 <AlertTriangle size={16} /> Urgent Actions
              </h3>
              <ul className="space-y-3">
                 <li className="flex items-center gap-3 font-mono text-[10px] font-bold text-slate-700 uppercase tracking-tight bg-white p-3 rounded-lg border border-brand-orange/20 shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" /> 4 Quotes awaiting engineering review
                 </li>
                 <li className="flex items-center gap-3 font-mono text-[10px] font-bold text-slate-700 uppercase tracking-tight bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-red-500" /> 2 Inventory stock warnings
                 </li>
              </ul>
           </div>
        </div>

      </div>

    </div>
  );
}
