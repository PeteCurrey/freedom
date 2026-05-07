"use client";

import { 
  Users, Layout, Magnet, Receipt, Share2, Package, 
  Car, Target, AlertTriangle, TrendingUp, ArrowUpRight,
  Monitor, Database, Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

const metrics = [
  { label: "Planner Completions", value: "1,284", change: "+12%", trend: "up", icon: Users },
  { label: "Baskets Generated", value: "856", change: "+8%", trend: "up", icon: Layout },
  { label: "Baskets Locked", value: "142", change: "+15%", trend: "up", icon: Database },
  { label: "Quote Requests", value: "48", change: "+24%", trend: "up", icon: Magnet },
  { label: "PDF Purchases", value: "62", change: "+5%", trend: "up", icon: Receipt },
  { label: "Affiliate Clicks", value: "2,405", change: "+18%", trend: "up", icon: Share2 },
];

const secondaryMetrics = [
  { label: "Top Vehicle", value: "Mercedes Sprinter", sub: "42% of builds", icon: Car },
  { label: "Top Goal", value: "Full-Time Off-Grid", sub: "56% of builds", icon: Target },
  { label: "Abandoned Planners", value: "312", sub: "Stage 4 average", icon: AlertTriangle },
  { label: "Est. Revenue Pipeline", value: "£42,850", sub: "Open quotes", icon: TrendingUp },
];

export default function AdminDashboard() {
  return (
    <div className="p-8 space-y-12 max-w-7xl mx-auto">
      
      {/* HEADER */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="font-display text-4xl uppercase tracking-tighter mb-2">Command <span className="text-brand-orange">Centre</span></h1>
          <p className="font-mono text-[10px] text-brand-grey uppercase tracking-[0.2em]">Operational Status: All Systems Nominal</p>
        </div>
        <div className="flex gap-4">
           <div className="bg-brand-carbon border border-brand-border px-4 py-2 flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="font-mono text-[9px] text-white uppercase tracking-widest">Real-time Stream Active</span>
           </div>
        </div>
      </div>

      {/* PRIMARY METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {metrics.map((m) => (
          <div key={m.label} className="bg-brand-carbon border border-brand-border p-6 hover:border-brand-orange/50 transition-all group">
            <div className="flex justify-between items-start mb-4">
               <m.icon className="w-4 h-4 text-brand-grey group-hover:text-brand-orange transition-colors" />
               <span className={cn(
                 "font-mono text-[9px] uppercase tracking-widest",
                 m.trend === 'up' ? "text-green-500" : "text-red-500"
               )}>{m.change}</span>
            </div>
            <div className="font-display text-3xl mb-1">{m.value}</div>
            <div className="font-mono text-[8px] text-brand-grey uppercase tracking-widest">{m.label}</div>
          </div>
        ))}
      </div>

      {/* SECONDARY INSIGHTS */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {secondaryMetrics.map((m) => (
          <div key={m.label} className="bg-brand-obsidian border border-brand-border p-6 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-5">
                <m.icon className="w-16 h-16" />
             </div>
             <div className="relative z-10">
                <span className="font-mono text-[8px] text-brand-grey uppercase tracking-widest block mb-4">{m.label}</span>
                <div className="font-display text-xl uppercase mb-2">{m.value}</div>
                <div className="font-sans text-[10px] text-brand-orange uppercase tracking-widest">{m.sub}</div>
             </div>
          </div>
        ))}
      </div>

      {/* MAIN DATA PANELS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* RECENT QUOTE REQUESTS */}
        <div className="lg:col-span-8 bg-brand-carbon border border-brand-border">
          <div className="p-6 border-b border-brand-border flex justify-between items-center bg-brand-obsidian/50">
             <h2 className="font-display text-lg uppercase tracking-widest flex items-center gap-3">
                <Magnet className="w-4 h-4 text-brand-orange" />
                Recent Quote Requests
             </h2>
             <button className="font-mono text-[9px] text-brand-grey uppercase tracking-widest hover:text-white transition-colors">View All Requests</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-brand-border font-mono text-[9px] text-brand-grey uppercase tracking-widest">
                  <th className="p-6 font-normal">Reference</th>
                  <th className="p-6 font-normal">Vehicle</th>
                  <th className="p-6 font-normal">Budget</th>
                  <th className="p-6 font-normal">Status</th>
                  <th className="p-6 font-normal text-right">Value</th>
                </tr>
              </thead>
              <tbody className="font-mono text-[10px]">
                {[
                  { id: "QR-8472", vehicle: "Sprinter L3H2", budget: "£15k-20k", status: "New", value: "£4,200" },
                  { id: "QR-8473", vehicle: "Crafter MWB", budget: "£8k-12k", status: "Contacted", value: "£1,850" },
                  { id: "QR-8474", vehicle: "Transit L2H2", budget: "£5k-8k", status: "Quoted", value: "£2,100" },
                  { id: "QR-8475", vehicle: "Sprinter L2H1", budget: "£20k+", status: "New", value: "£6,800" },
                ].map((row) => (
                  <tr key={row.id} className="border-b border-brand-border/50 hover:bg-brand-obsidian/30 transition-colors group">
                    <td className="p-6 text-white font-bold">{row.id}</td>
                    <td className="p-6 text-brand-grey">{row.vehicle}</td>
                    <td className="p-6 text-brand-grey">{row.budget}</td>
                    <td className="p-6">
                       <span className={cn(
                         "px-2 py-1 border text-[8px] uppercase tracking-widest",
                         row.status === 'New' ? "border-brand-orange text-brand-orange bg-brand-orange/5" : "border-brand-border text-brand-grey"
                       )}>{row.status}</span>
                    </td>
                    <td className="p-6 text-right text-white font-bold">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SYSTEM HEALTH / ACTIVITY */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-brand-obsidian border border-brand-border p-8">
              <h3 className="font-display text-sm uppercase tracking-widest mb-8 flex items-center gap-3">
                 <Zap className="w-4 h-4 text-brand-orange" />
                 Live Activity Stream
              </h3>
              <div className="space-y-6">
                 {[
                   { time: "2m ago", text: "New Build Basket locked for VW Crafter", icon: Layout },
                   { time: "14m ago", text: "PDF Purchase: Detailed Build Pack (£79)", icon: Receipt },
                   { time: "28m ago", text: "Affiliate Click: Victron MultiPlus (Roamer)", icon: Share2 },
                   { time: "1h ago", text: "Planner Started: Ford Transit L3H3", icon: Users },
                 ].map((activity, i) => (
                   <div key={i} className="flex gap-4">
                      <div className="shrink-0 mt-1">
                         <activity.icon className="w-3 h-3 text-brand-grey" />
                      </div>
                      <div>
                         <p className="font-sans text-[11px] text-white leading-snug">{activity.text}</p>
                         <span className="font-mono text-[8px] text-brand-grey uppercase tracking-widest mt-1 block">{activity.time}</span>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="bg-brand-orange/5 border border-brand-orange/30 p-8">
              <h3 className="font-display text-sm text-brand-orange uppercase tracking-widest mb-4">Urgent Actions</h3>
              <ul className="space-y-3">
                 <li className="flex items-center gap-3 font-mono text-[10px] text-brand-grey uppercase tracking-widest">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-orange" /> 4 New Quote Requests
                 </li>
                 <li className="flex items-center gap-3 font-mono text-[10px] text-brand-grey uppercase tracking-widest">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-orange" /> 2 Stock Warnings (Victron)
                 </li>
              </ul>
           </div>
        </div>

      </div>

    </div>
  );
}
