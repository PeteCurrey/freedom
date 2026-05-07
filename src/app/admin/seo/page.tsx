"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Search, BarChart3, TrendingUp, Globe, 
  FileText, Plus, ArrowUpRight, AlertCircle,
  Zap, Globe2, CheckCircle2, XCircle,
  Activity, Sparkles, MousePointer2, ExternalLink,
  Link as LinkIcon, RefreshCcw, Save, Clock
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function SEOCommanderPage() {
  const [activeTab, setActiveTab] = useState('Audit & Meta');
  const [redirects, setRedirects] = useState([
    { id: '1', from: '/old-store', to: '/store', status: 301, active: true },
    { id: '2', from: '/products/victron-old', to: '/store/victron', status: 301, active: true },
  ]);

  const tabs = ['Audit & Meta', 'Auto-Generation', 'Redirects (301)'];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tighter flex items-center gap-3">
             <Search className="text-brand-orange" /> SEO Commander
          </h1>
          <p className="text-slate-500 text-sm mt-1">Search visibility and metadata orchestration</p>
        </div>
        <div className="flex items-center gap-3">
           <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 hover:text-slate-900 transition-all rounded-lg text-xs font-bold uppercase tracking-widest">
              <Activity size={14} /> Full Audit
           </button>
           <button className="flex items-center gap-2 px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-brand-orange transition-all text-xs font-bold uppercase tracking-widest shadow-lg shadow-slate-900/10">
              <Sparkles size={14} /> Fix Meta Issues
           </button>
        </div>
      </div>

      {/* Stats Summary Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'SEO Health Score', value: '84/100', change: '↑4 pts', color: 'text-emerald-600', icon: CheckCircle2 },
          { label: 'Missing Meta Tags', value: '18', change: 'Action Required', color: 'text-amber-500', icon: AlertCircle },
          { label: 'Auto-Gen Queue', value: '42', change: 'Processing', color: 'text-blue-500', icon: RefreshCcw },
          { label: 'Active Redirects', value: '14', change: '0 Loops', color: 'text-emerald-600', icon: LinkIcon },
        ].map((s, i) => (
          <div key={i} className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm hover:border-brand-orange/30 transition-all group">
            <div className="flex justify-between items-start mb-4">
               <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400">{s.label}</p>
               <s.icon size={14} className="text-slate-300 group-hover:text-brand-orange transition-colors" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-2xl font-bold text-slate-900">{s.value}</span>
              <span className={cn("text-[10px] font-bold uppercase tracking-tight", s.color)}>{s.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto border-b border-slate-200 no-scrollbar">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] whitespace-nowrap transition-all border-b-2",
              activeTab === tab 
                ? "border-brand-orange text-brand-orange" 
                : "border-transparent text-slate-400 hover:text-slate-600"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-8">
         {/* AUDIT & META TAB */}
         {activeTab === 'Audit & Meta' && (
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                 <div className="p-6 flex items-center justify-between border-b border-slate-100">
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Metadata Issues</h3>
                    <span className="text-[10px] font-bold text-amber-500 uppercase flex items-center gap-1"><AlertCircle size={12} /> 18 Pages Flagged</span>
                 </div>
                 <div className="overflow-x-auto">
                    <table className="w-full text-left">
                       <thead>
                          <tr className="bg-slate-50 border-b border-slate-100">
                             <th className="px-6 py-4 text-[9px] font-mono uppercase tracking-widest text-slate-400">Page / Route</th>
                             <th className="px-6 py-4 text-[9px] font-mono uppercase tracking-widest text-slate-400">Missing Elements</th>
                             <th className="px-6 py-4 text-[9px] font-mono uppercase tracking-widest text-slate-400">Impact</th>
                             <th className="px-6 py-4 text-[9px] font-mono uppercase tracking-widest text-slate-400 text-right">Actions</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-100">
                          {[
                            { route: '/store/products/victron-orion-xs', missing: 'Meta Description, OG Image', impact: 'High' },
                            { route: '/store/kits/weekend-warrior', missing: 'Title Tag too short', impact: 'Medium' },
                            { route: '/guides/winter-insulation', missing: 'Meta Description', impact: 'Medium' },
                            { route: '/about-us', missing: 'Canonical Tag', impact: 'Low' },
                          ].map((k, i) => (
                             <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-4 text-xs font-mono text-slate-600">{k.route}</td>
                                <td className="px-6 py-4">
                                   <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded">{k.missing}</span>
                                </td>
                                <td className="px-6 py-4">
                                   <span className={cn(
                                     "text-[10px] font-bold uppercase",
                                     k.impact === 'High' ? "text-red-500" : "text-amber-500"
                                   )}>{k.impact}</span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                   <button className="text-[10px] font-bold uppercase text-brand-orange hover:underline">Fix Now</button>
                                </td>
                             </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
              </div>
              <div className="space-y-6">
                 <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-6">Technical SEO Health</h3>
                    <div className="relative w-32 h-32 flex items-center justify-center mx-auto">
                       <svg className="w-full h-full transform -rotate-90">
                          <circle cx="64" cy="64" r="58" stroke="#f1f5f9" strokeWidth="8" fill="transparent" />
                          <circle 
                             cx="64" cy="64" r="58" 
                             stroke="#f97316" strokeWidth="8" 
                             fill="transparent" 
                             strokeDasharray={364.4}
                             strokeDashoffset={364.4 * (1 - 0.84)}
                             strokeLinecap="round"
                          />
                       </svg>
                       <div className="absolute flex flex-col items-center">
                          <span className="text-3xl font-bold text-slate-900">84</span>
                          <span className="text-[9px] font-bold text-slate-400 uppercase">Excellent</span>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
         )}

         {/* AUTO-GENERATION TAB */}
         {activeTab === 'Auto-Generation' && (
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                 <div className="p-6 flex items-center justify-between border-b border-slate-100">
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">AI Generation Queue</h3>
                    <button className="text-[10px] font-bold text-brand-orange uppercase flex items-center gap-1"><Sparkles size={12} /> Run Batch</button>
                 </div>
                 <div className="p-6">
                    <div className="space-y-4">
                       {[
                         { title: 'Victron MultiPlus-II', task: 'Generate Meta Description', status: 'Processing...', icon: RefreshCcw, color: 'text-blue-500' },
                         { title: 'Roamer 400Ah Seatbase', task: 'Generate Title Tag & Meta', status: 'Completed', icon: CheckCircle2, color: 'text-emerald-500' },
                         { title: 'Truma Combi 4E', task: 'Extract Technical Specs for SEO', status: 'Queued', icon: Clock, color: 'text-slate-400' },
                       ].map((item, i) => (
                         <div key={i} className="flex items-center justify-between p-4 border border-slate-100 rounded-lg">
                            <div>
                               <p className="text-sm font-bold text-slate-900">{item.title}</p>
                               <p className="text-[10px] text-slate-500 uppercase tracking-widest">{item.task}</p>
                            </div>
                            <div className={cn("flex items-center gap-2 text-[10px] font-bold uppercase", item.color)}>
                               <item.icon size={14} className={item.status === 'Processing...' ? 'animate-spin' : ''} />
                               {item.status}
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
           </div>
         )}

         {/* REDIRECTS TAB */}
         {activeTab === 'Redirects (301)' && (
           <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 flex items-center justify-between border-b border-slate-100">
                 <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">URL Redirect Manager</h3>
                 <button className="text-[10px] font-bold text-brand-orange uppercase flex items-center gap-1 bg-brand-orange/10 px-3 py-1.5 rounded-lg">
                   <Plus size={12} /> Add Redirect
                 </button>
              </div>
              <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead>
                       <tr className="bg-slate-50 border-b border-slate-100">
                          <th className="px-6 py-4 text-[9px] font-mono uppercase tracking-widest text-slate-400">Old Path (From)</th>
                          <th className="px-6 py-4 text-[9px] font-mono uppercase tracking-widest text-slate-400">New Path (To)</th>
                          <th className="px-6 py-4 text-[9px] font-mono uppercase tracking-widest text-slate-400">Type</th>
                          <th className="px-6 py-4 text-[9px] font-mono uppercase tracking-widest text-slate-400">Status</th>
                          <th className="px-6 py-4 text-[9px] font-mono uppercase tracking-widest text-slate-400 text-right">Actions</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                       {redirects.map((r, i) => (
                          <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                             <td className="px-6 py-4 text-xs font-mono text-slate-600">{r.from}</td>
                             <td className="px-6 py-4 text-xs font-mono text-slate-900 font-bold">{r.to}</td>
                             <td className="px-6 py-4">
                                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-100 px-2 py-1 rounded">{r.status} Permanent</span>
                             </td>
                             <td className="px-6 py-4">
                                <span className={cn(
                                  "text-[10px] font-bold uppercase",
                                  r.active ? "text-emerald-500" : "text-slate-400"
                                )}>{r.active ? 'Active' : 'Disabled'}</span>
                             </td>
                             <td className="px-6 py-4 text-right">
                                <button className="p-2 text-slate-400 hover:text-red-500 transition-colors"><XCircle size={14} /></button>
                             </td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </div>
         )}
      </div>
    </div>
  );
}
