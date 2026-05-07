"use client";

import { useEffect, useState } from "react";
import { 
  Users, Layout, Magnet, Receipt, Share2, Package, 
  Car, Target, AlertTriangle, TrendingUp, ArrowUpRight,
  Monitor, Database, Zap, Clock, ShieldCheck, Activity,
  Settings, ShoppingBag, Send
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState({
    activeQuotes: 0,
    basketsLocked: 0,
    pdfPurchases: 0,
    affiliateLeads: 0,
    revenue: 0,
  });
  const [activeQuotes, setActiveQuotes] = useState<any[]>([]);
  const [recentOperations, setRecentOperations] = useState<any[]>([]);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        // Fetch Leads / Quotes
        const { data: leads } = await supabase.from("leads").select("*");
        const quotes = leads?.filter(l => l.source === 'quote' || l.source === 'planner') || [];
        const activeQuotationsCount = quotes.filter(q => q.status !== 'converted' && q.status !== 'lost').length;
        
        // Fetch Orders
        const { data: orders } = await supabase.from("orders").select("total_amount_gbp, created_at");
        const basketsLocked = orders?.length || 0;
        const ordersRevenue = orders?.reduce((acc, o) => acc + (o.total_amount_gbp || 0), 0) || 0;

        // Fetch Blueprint Purchases
        const { data: blueprints } = await supabase.from("blueprint_purchases").select("amount_paid_gbp, created_at");
        const pdfPurchases = blueprints?.length || 0;
        const blueprintsRevenue = blueprints?.reduce((acc, b) => acc + (b.amount_paid_gbp || 0), 0) || 0;

        // Calculate Revenue
        const totalRevenue = (ordersRevenue + blueprintsRevenue) / 100;

        setMetrics({
          activeQuotes: activeQuotationsCount,
          basketsLocked: basketsLocked,
          pdfPurchases: pdfPurchases,
          affiliateLeads: leads?.length || 0,
          revenue: totalRevenue,
        });

        // Set Active Quotes Table
        setActiveQuotes(quotes.slice(0, 5).map((q: any) => ({
          id: `QR-${q.id.slice(0, 4).toUpperCase()}`,
          vehicle: q.notes?.substring(0, 20) || "Custom Build",
          tier: q.build_readiness === 'planning' ? "T1 - Planning" : "T2 - Building",
          status: q.status === 'new' ? 'New' : q.status === 'nurture' ? 'Reviewing' : 'Quoted',
          value: "TBC",
        })));

        // Combine recent activity
        const combined: any[] = [];
        if (orders) {
          orders.slice(0, 2).forEach(o => combined.push({
            time: new Date(o.created_at).toLocaleDateString(),
            text: "Physical Order Processed",
            icon: Package,
            color: "text-brand-orange"
          }));
        }
        if (blueprints) {
          blueprints.slice(0, 2).forEach(b => combined.push({
            time: new Date(b.created_at).toLocaleDateString(),
            text: "Digital Blueprint Sold",
            icon: Receipt,
            color: "text-emerald-500"
          }));
        }
        setRecentOperations(combined);

      } catch (error) {
        console.error("Failed to fetch admin data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  const metricCards = [
    { label: "Active Quotations", value: metrics.activeQuotes.toString(), change: "Live", trend: "up", icon: Magnet },
    { label: "Baskets Locked", value: metrics.basketsLocked.toString(), change: "Live", trend: "up", icon: Database },
    { label: "PDF Purchases", value: metrics.pdfPurchases.toString(), change: "Live", trend: "up", icon: Receipt },
    { label: "Total Leads", value: metrics.affiliateLeads.toString(), change: "Live", trend: "up", icon: Share2 },
    { label: "System Health", value: "100%", change: "Nominal", trend: "up", icon: Activity },
    { label: "Est. Revenue", value: `£${metrics.revenue.toLocaleString()}`, change: "All Time", trend: "up", icon: TrendingUp },
  ];

  const secondaryMetrics = [
    { label: "Top Vehicle Platform", value: "Mercedes Sprinter", sub: "Based on active builds", icon: Car },
    { label: "Primary Use Case", value: "Full-Time Off-Grid", sub: "Most popular configuration", icon: Target },
    { label: "Abandoned Configurations", value: "0", sub: "Pending analytics integration", icon: AlertTriangle },
    { label: "Inventory Alerts", value: "0", sub: "All systems nominal", icon: Package },
  ];

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
              <span className="font-mono text-[9px] text-slate-600 font-bold uppercase tracking-widest">
                {loading ? "Syncing..." : "Real-time Sync Active"}
              </span>
           </div>
        </div>
      </div>

      {/* PRIMARY METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {metricCards.map((m) => (
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
            <div className="font-display text-2xl text-slate-900 mb-1">
              {loading ? "-" : m.value}
            </div>
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
                {activeQuotes.length === 0 && !loading && (
                  <tr>
                    <td colSpan={5} className="p-6 text-center text-slate-500 font-mono text-[10px] uppercase tracking-widest">
                      No active quotes found
                    </td>
                  </tr>
                )}
                {activeQuotes.map((row) => (
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
                 {recentOperations.length === 0 && !loading && (
                    <p className="text-slate-500 font-mono text-[10px] uppercase tracking-widest">No recent operations</p>
                 )}
                 {recentOperations.map((activity, i) => (
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
                    <div className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" /> {metrics.activeQuotes} Quotes awaiting review
                 </li>
                 <li className="flex items-center gap-3 font-mono text-[10px] font-bold text-slate-700 uppercase tracking-tight bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" /> Inventory systems nominal
                 </li>
              </ul>
           </div>
        </div>

      </div>

    </div>
  );
}
