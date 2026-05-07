"use client";

import { useState } from "react";
import { 
  Mail, 
  Users, 
  Send, 
  Plus, 
  BarChart3, 
  Eye, 
  MousePointer2, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  MoreVertical,
  ArrowUpRight,
  Sparkles,
  Trash2,
  Edit3,
  Search,
  Filter,
  Layers,
  Layout
} from "lucide-react";
import { cn } from "@/lib/utils";

const campaigns = [
  { id: 1, name: 'May Bank Holiday Sale', status: 'Draft', recipients: 1248, openRate: '-', clickRate: '-', date: 'Not scheduled' },
  { id: 2, name: 'New Victron Multiplus Guide', status: 'Sent', recipients: 1192, openRate: '42.4%', clickRate: '12.8%', date: '2 days ago' },
  { id: 3, name: 'Weekly Build Inspiration #24', status: 'Sent', recipients: 1150, openRate: '38.2%', clickRate: '8.4%', date: '9 days ago' },
  { id: 4, name: 'Welcome Series: Part 1', status: 'Automated', recipients: 'Ongoing', openRate: '64.2%', clickRate: '22.1%', date: 'Active' },
];

export default function NewsletterPage() {
  const [activeTab, setActiveTab] = useState('Campaigns');

  const tabs = ['Campaigns', 'Audience', 'Automations', 'Templates'];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tighter flex items-center gap-3">
             <Mail className="text-brand-orange" /> Newsletter Engine
          </h1>
          <p className="text-slate-500 text-sm mt-1">Email marketing automation and audience growth</p>
        </div>
        
        <div className="flex items-center gap-3">
           <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 hover:text-slate-900 transition-all rounded-lg text-xs font-bold uppercase tracking-widest">
              <Users size={14} /> Import Contacts
           </button>
           <button className="flex items-center gap-2 px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-brand-orange transition-all text-xs font-bold uppercase tracking-widest shadow-lg shadow-slate-900/10">
              <Plus size={14} /> New Campaign
           </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
         {[
           { label: 'Total Subscribers', value: '1,428', change: '+42 this week', icon: Users },
           { label: 'Avg. Open Rate', value: '41.2%', change: '↑2.4%', icon: Eye },
           { label: 'Avg. Click Rate', value: '14.8%', change: '↑0.8%', icon: MousePointer2 },
           { label: 'Revenue from Email', value: '£4,280', change: '12% of total', icon: BarChart3 },
         ].map((s, i) => (
           <div key={i} className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
              <div className="flex justify-between items-start mb-2">
                 <p className="text-[9px] font-mono uppercase tracking-widest text-slate-400">{s.label}</p>
                 <s.icon size={12} className="text-slate-300" />
              </div>
              <div className="flex items-baseline gap-2">
                 <p className="text-xl font-bold text-slate-900">{s.value}</p>
                 <span className="text-[10px] font-bold text-emerald-600">{s.change}</span>
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

      {activeTab === 'Campaigns' && (
        <div className="space-y-6">
           {/* Campaign Filters */}
           <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative group w-full md:w-64">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-orange transition-colors" />
                <input 
                  type="text"
                  placeholder="Search campaigns..."
                  className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-brand-orange/20 transition-all"
                />
              </div>
              <div className="flex gap-2">
                 {['All', 'Sent', 'Scheduled', 'Drafts', 'Automated'].map(s => (
                    <button key={s} className="px-3 py-1.5 rounded-lg border border-slate-200 text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:border-slate-400 transition-all">
                       {s}
                    </button>
                 ))}
              </div>
           </div>

           {/* Campaign Table */}
           <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              <table className="w-full text-left">
                 <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-100">
                       <th className="px-6 py-4 text-[10px] font-mono uppercase tracking-widest text-slate-400">Campaign Name</th>
                       <th className="px-6 py-4 text-[10px] font-mono uppercase tracking-widest text-slate-400">Status</th>
                       <th className="px-6 py-4 text-[10px] font-mono uppercase tracking-widest text-slate-400">Audience</th>
                       <th className="px-6 py-4 text-[10px] font-mono uppercase tracking-widest text-slate-400">Open %</th>
                       <th className="px-6 py-4 text-[10px] font-mono uppercase tracking-widest text-slate-400">Click %</th>
                       <th className="px-6 py-4 text-[10px] font-mono uppercase tracking-widest text-slate-400">Date</th>
                       <th className="px-6 py-4 text-[10px] font-mono uppercase tracking-widest text-slate-400 text-right">Actions</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                    {campaigns.map(camp => (
                       <tr key={camp.id} className="hover:bg-slate-50/50 transition-colors group">
                          <td className="px-6 py-4">
                             <div className="flex flex-col">
                                <span className="text-sm font-bold text-slate-900">{camp.name}</span>
                                <span className="text-[10px] text-slate-400 font-mono tracking-tight uppercase">CAMP-{camp.id}042</span>
                             </div>
                          </td>
                          <td className="px-6 py-4">
                             <span className={cn(
                               "text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-full border",
                               camp.status === 'Sent' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                               camp.status === 'Draft' ? "bg-slate-50 text-slate-400 border-slate-200" :
                               camp.status === 'Scheduled' ? "bg-blue-50 text-blue-600 border-blue-100" :
                               "bg-purple-50 text-purple-600 border-purple-100"
                             )}>
                                {camp.status}
                             </span>
                          </td>
                          <td className="px-6 py-4">
                             <span className="text-xs font-bold text-slate-600">{camp.recipients}</span>
                          </td>
                          <td className="px-6 py-4">
                             <span className="text-xs font-bold text-slate-900">{camp.openRate}</span>
                          </td>
                          <td className="px-6 py-4">
                             <span className="text-xs font-bold text-slate-900">{camp.clickRate}</span>
                          </td>
                          <td className="px-6 py-4">
                             <span className="text-[10px] text-slate-400 font-mono uppercase tracking-tight">{camp.date}</span>
                          </td>
                          <td className="px-6 py-4 text-right">
                             <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all">
                                   <Edit3 size={14} />
                                </button>
                                <button className="p-2 text-slate-400 hover:text-brand-orange hover:bg-slate-100 rounded-lg transition-all">
                                   <Sparkles size={14} />
                                </button>
                                <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all">
                                   <MoreVertical size={14} />
                                </button>
                             </div>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>
      )}

      {/* AI Inspiration Section */}
      <div className="bg-slate-900 rounded-2xl p-8 relative overflow-hidden group shadow-2xl">
         <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-all scale-150 rotate-12">
            <Sparkles size={120} className="text-white" />
         </div>
         <div className="relative z-10 max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
               <div className="px-3 py-1 bg-brand-orange text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-full">
                  AI Suggestion
               </div>
               <span className="text-slate-400 text-[10px] font-mono uppercase tracking-widest">Growth Opportunity Detected</span>
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tighter mb-4">
               "5 Beginner Mistakes in Campervan Electrical Systems"
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
               Our intelligence engine detected high search volume for this topic in your region. Sending this newsletter to your "Interested in Electrical" segment (428 users) could yield an estimated £2,400 in kit revenue.
            </p>
            <div className="flex items-center gap-4">
               <button className="px-8 py-4 bg-brand-orange text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all shadow-xl shadow-brand-orange/20">
                  Generate Draft
               </button>
               <button className="px-8 py-4 border border-slate-700 text-slate-400 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:text-white hover:border-slate-500 transition-all">
                  Analyze Segment
               </button>
            </div>
         </div>
      </div>
    </div>
  );
}
