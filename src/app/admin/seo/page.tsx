"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Search, 
  BarChart3, 
  TrendingUp, 
  Globe, 
  FileText,
  Plus,
  ArrowUpRight,
  AlertCircle,
  Zap,
  Globe2,
  LineChart,
  ArrowDownRight,
  CheckCircle2,
  XCircle,
  Activity,
  Layers,
  Sparkles,
  MousePointer2,
  ExternalLink,
  ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { 
  LineChart as ReLineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const rankingData = [
  { name: 'Mon', visibility: 42, rank: 12 },
  { name: 'Tue', visibility: 43, rank: 11 },
  { name: 'Wed', visibility: 45, rank: 10 },
  { name: 'Thu', visibility: 44, rank: 11 },
  { name: 'Fri', visibility: 48, rank: 8 },
  { name: 'Sat', visibility: 52, rank: 6 },
  { name: 'Sun', visibility: 54, rank: 5 },
];

export default function SEOCommanderPage() {
  const [activeTab, setActiveTab] = useState('Rankings');
  const [loading, setLoading] = useState(false);

  const tabs = ['Rankings', 'Content Gaps', 'Site Audit', 'Backlinks'];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tighter flex items-center gap-3">
             <Search className="text-brand-orange" /> SEO Commander
          </h1>
          <p className="text-slate-500 text-sm mt-1">Search visibility and keyword intelligence engine</p>
        </div>
        
        <div className="flex items-center gap-3">
           <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 hover:text-slate-900 transition-all rounded-lg text-xs font-bold uppercase tracking-widest">
              <Activity size={14} /> Full Audit
           </button>
           <button className="flex items-center gap-2 px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-brand-orange transition-all text-xs font-bold uppercase tracking-widest shadow-lg shadow-slate-900/10">
              <Sparkles size={14} /> AI Content Plan
           </button>
        </div>
      </div>

      {/* Stats Summary Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'SEO Health Score', value: '84/100', change: '↑4 pts', color: 'text-emerald-600', icon: CheckCircle2 },
          { label: 'Organic Traffic (MTD)', value: '12,482', change: '+12.4%', color: 'text-emerald-600', icon: TrendingUp },
          { label: 'Top 3 Keywords', value: '14', change: '+2 this week', color: 'text-brand-orange', icon: BarChart3 },
          { label: 'Est. Traffic Value', value: '£4,250', change: '+8.2%', color: 'text-emerald-600', icon: MousePointer2 },
        ].map((s, i) => (
          <div key={i} className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm hover:border-brand-orange/30 transition-all group">
            <div className="flex justify-between items-start mb-4">
               <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400">{s.label}</p>
               <s.icon size={14} className="text-slate-300 group-hover:text-brand-orange transition-colors" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900">{s.value}</span>
              <span className={cn("text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100", s.color)}>{s.change}</span>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Main Intelligence View (Left 2/3) */}
         <div className="lg:col-span-2 space-y-8">
            {/* Visibility Chart */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
               <div className="flex justify-between items-end mb-8">
                  <div>
                     <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Search Visibility %</h3>
                     <p className="text-[10px] text-slate-400 uppercase tracking-tight mt-1">Aggregated ranking performance across tracked keywords</p>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-600">
                     <ArrowUpRight size={12} /> +4.2% Growth
                  </div>
               </div>
               <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                     <AreaChart data={rankingData}>
                        <defs>
                           <linearGradient id="colorVis" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#f97316" stopOpacity={0.1}/>
                              <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                           </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} hide />
                        <Tooltip />
                        <Area type="monotone" dataKey="visibility" stroke="#f97316" fillOpacity={1} fill="url(#colorVis)" strokeWidth={3} />
                     </AreaChart>
                  </ResponsiveContainer>
               </div>
            </div>

            {/* Keyword Rankings Table */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
               <div className="p-6 flex items-center justify-between border-b border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Keyword Intel</h3>
                  <button className="text-[10px] font-bold text-brand-orange uppercase flex items-center gap-1">Add Keywords <Plus size={12} /></button>
               </div>
               <div className="overflow-x-auto">
                  <table className="w-full text-left">
                     <thead>
                        <tr className="bg-slate-50 border-b border-slate-100">
                           <th className="px-6 py-4 text-[9px] font-mono uppercase tracking-widest text-slate-400">Keyword</th>
                           <th className="px-6 py-4 text-[9px] font-mono uppercase tracking-widest text-slate-400">Pos</th>
                           <th className="px-6 py-4 text-[9px] font-mono uppercase tracking-widest text-slate-400">Diff</th>
                           <th className="px-6 py-4 text-[9px] font-mono uppercase tracking-widest text-slate-400">Vol</th>
                           <th className="px-6 py-4 text-[9px] font-mono uppercase tracking-widest text-slate-400">CPC</th>
                           <th className="px-6 py-4 text-[9px] font-mono uppercase tracking-widest text-slate-400 text-right">URL</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-100">
                        {[
                          { kw: 'victron multiplus install guide', pos: 1, diff: '↑', vol: '1.2k', cpc: '£2.45', url: '/resources/victron-guide' },
                          { kw: 'campervan electrical kit', pos: 3, diff: '↓2', vol: '4.8k', cpc: '£4.12', url: '/store/kits' },
                          { kw: 'best lithium battery for van', pos: 2, diff: '↑5', vol: '8.4k', cpc: '£3.85', url: '/store/electrical' },
                          { kw: 'sprinter van insulation', pos: 8, diff: '↑12', vol: '2.1k', cpc: '£1.95', url: '/store/insulation' },
                          { kw: 'diy camper conversion uk', pos: 12, diff: '↑', vol: '15k', cpc: '£2.10', url: '/' },
                        ].map((k, i) => (
                           <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                              <td className="px-6 py-4 text-sm font-bold text-slate-900">{k.kw}</td>
                              <td className="px-6 py-4">
                                 <span className={cn(
                                   "font-mono font-bold px-2 py-1 rounded text-xs",
                                   k.pos <= 3 ? "bg-emerald-50 text-emerald-600" : "bg-slate-50 text-slate-600"
                                 )}>#{k.pos}</span>
                              </td>
                              <td className="px-6 py-4">
                                 <span className={cn(
                                   "text-[10px] font-bold",
                                   k.diff.startsWith('↑') ? "text-emerald-600" : "text-red-500"
                                 )}>{k.diff}</span>
                              </td>
                              <td className="px-6 py-4 text-sm text-slate-600 font-mono">{k.vol}</td>
                              <td className="px-6 py-4 text-sm text-slate-600 font-mono">{k.cpc}</td>
                              <td className="px-6 py-4 text-right">
                                 <Link href={k.url} target="_blank" className="text-slate-400 hover:text-brand-orange transition-colors">
                                    <ExternalLink size={14} />
                                 </Link>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>

         {/* Sidebar Tools (Right 1/3) */}
         <div className="space-y-8">
            {/* SEO Health Circle */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col items-center text-center">
               <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-6">Technical SEO Health</h3>
               <div className="relative w-32 h-32 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                     <circle cx="64" cy="64" r="58" stroke="#f1f5f9" strokeWidth="8" fill="transparent" />
                     <circle 
                        cx="64" cy="64" r="58" 
                        stroke="#f97316" strokeWidth="8" 
                        fill="transparent" 
                        strokeDasharray={364.4}
                        strokeDashoffset={364.4 * (1 - 0.84)}
                        strokeLinecap="round"
                        className="transition-all duration-1000"
                     />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                     <span className="text-3xl font-bold text-slate-900">84</span>
                     <span className="text-[9px] font-bold text-slate-400 uppercase">Excellent</span>
                  </div>
               </div>
               <div className="grid grid-cols-2 gap-4 w-full mt-8 border-t border-slate-100 pt-6">
                  <div>
                     <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Crawled</p>
                     <p className="text-sm font-bold text-slate-900">1,248</p>
                  </div>
                  <div>
                     <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Errors</p>
                     <p className="text-sm font-bold text-red-500">12</p>
                  </div>
               </div>
            </div>

            {/* Content Gaps */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
               <div className="flex justify-between items-end mb-6">
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Content Gaps</h3>
                  <Zap size={14} className="text-brand-orange animate-pulse" />
               </div>
               <div className="space-y-4">
                  {[
                    { topic: 'Victron Multiplus-II 48V Guide', difficulty: 'Easy', opp: 'High' },
                    { topic: 'Van Life Winter Heating Costs', difficulty: 'Medium', opp: 'Extreme' },
                    { topic: 'DIY Camper Plumbing Schematic', difficulty: 'Hard', opp: 'Critical' },
                  ].map((gap, i) => (
                    <div key={i} className="p-4 border border-slate-100 rounded-xl hover:border-brand-orange transition-all cursor-pointer group">
                       <p className="text-[11px] font-bold text-slate-900 group-hover:text-brand-orange transition-colors">{gap.topic}</p>
                       <div className="flex justify-between items-center mt-3">
                          <span className="text-[9px] font-bold text-slate-400 uppercase">{gap.difficulty} difficulty</span>
                          <span className="px-1.5 py-0.5 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded text-[8px] font-bold uppercase tracking-widest">{gap.opp} Opportunity</span>
                       </div>
                    </div>
                  ))}
                  <button className="w-full py-3 mt-2 border border-dashed border-slate-200 text-slate-400 hover:text-slate-600 hover:border-slate-300 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all">
                     Run Gap Scan
                  </button>
               </div>
            </div>

            {/* Technical Issues */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
               <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-6">Critical Audit Issues</h3>
               <div className="space-y-4">
                  {[
                    { issue: '12 pages missing H1 tags', type: 'error', icon: XCircle },
                    { issue: '8 product images missing ALT text', type: 'warn', icon: AlertCircle },
                    { issue: '3 pages have duplicate titles', type: 'warn', icon: AlertCircle },
                  ].map((issue, i) => (
                    <div key={i} className="flex gap-3">
                       <issue.icon size={14} className={cn("mt-0.5", issue.type === 'error' ? "text-red-500" : "text-amber-500")} />
                       <span className="text-[11px] text-slate-700 font-medium">{issue.issue}</span>
                    </div>
                  ))}
               </div>
               <button className="w-full py-3 mt-8 bg-slate-900 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-brand-orange transition-all">
                  Fix Technical SEO
               </button>
            </div>
         </div>
      </div>
    </div>
  );
}
