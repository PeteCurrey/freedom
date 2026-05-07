"use client";

import { Activity, TrendingUp, Users, MousePointer2 } from "lucide-react";

export default function AffiliateClicksPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tighter flex items-center gap-3">
             <MousePointer2 className="text-brand-orange" /> Network Telemetry
          </h1>
          <p className="text-slate-500 text-sm mt-1">Live traffic analysis from your affiliate network</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {[
           { label: 'Total Network Clicks', value: '4,196', change: '+12% this week', icon: MousePointer2, color: 'text-blue-500' },
           { label: 'Unique Visitors', value: '3,842', change: '+8% this week', icon: Users, color: 'text-amber-500' },
           { label: 'Avg. Conversion Rate', value: '3.5%', change: '0.2% increase', icon: TrendingUp, color: 'text-emerald-500' },
         ].map((s, i) => (
           <div key={i} className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
             <div className="flex justify-between items-start mb-4">
                <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400">{s.label}</p>
                <s.icon size={14} className="text-slate-300" />
             </div>
             <div className="flex flex-col gap-1">
               <span className="text-2xl font-bold text-slate-900">{s.value}</span>
               <span className="text-[10px] font-bold uppercase tracking-tight text-emerald-600">{s.change}</span>
             </div>
           </div>
         ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 min-h-[400px] flex flex-col items-center justify-center">
         <Activity size={48} className="text-slate-200 mb-4" />
         <h3 className="text-lg font-display uppercase tracking-tight text-slate-900">Telemetry Feed Active</h3>
         <p className="text-sm text-slate-500 text-center max-w-md mt-2">
           Detailed clickstream charts will populate here once GA4 integration is fully synchronized with the Affiliate Market Links data.
         </p>
      </div>
    </div>
  );
}
