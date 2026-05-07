"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ShoppingBag, 
  ExternalLink, 
  RefreshCcw, 
  AlertCircle, 
  CheckCircle2, 
  Clock,
  LayoutGrid,
  List,
  Filter,
  Search,
  ChevronRight,
  ArrowUpRight
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function ChannelsPage() {
  const [view, setView] = useState<'grid' | 'list'>('list');

  const channels = [
    { id: 'ebay', name: 'eBay UK', status: 'healthy', listings: 12, sales: '£1,420', lastSync: '10 mins ago', logo: 'E' },
    { id: 'amazon', name: 'Amazon UK', status: 'warning', listings: 8, sales: '£850', lastSync: '1 hour ago', logo: 'A' },
    { id: 'onbuy', name: 'OnBuy', status: 'healthy', listings: 15, sales: '£2,100', lastSync: '5 mins ago', logo: 'O' },
    { id: 'google', name: 'Google Merchant', status: 'healthy', listings: 142, sales: 'Organic', lastSync: '2 hours ago', logo: 'G' },
    { id: 'meta', name: 'Meta Catalog', status: 'healthy', listings: 142, sales: 'Organic', lastSync: '2 hours ago', logo: 'M' },
  ];

  const activities = [
    { id: 1, channel: 'eBay UK', product: 'Victron MultiPlus-II', type: 'Listing Synced', time: '5 mins ago' },
    { id: 2, channel: 'Amazon UK', product: 'Fogstar Drift 200Ah', type: 'Stock Update Failed', time: '12 mins ago', error: 'Invalid ASIN' },
    { id: 3, channel: 'OnBuy', product: 'MaxxFan Deluxe', type: 'Price Updated', time: '45 mins ago' },
    { id: 4, channel: 'Google', product: 'Feed Refresh', type: 'Success', time: '2 hours ago' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tighter flex items-center gap-3">
             <ShoppingBag className="text-brand-orange" /> Multi-Channel <span className="text-brand-orange underline decoration-brand-orange/20">Sales</span>
          </h1>
          <p className="text-slate-500 text-sm mt-1">Monitor and manage your product listings across all marketplaces.</p>
        </div>

        <div className="flex items-center gap-2">
           <button className="px-4 py-2 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-brand-orange transition-all flex items-center gap-2">
              <RefreshCcw size={12} /> Sync All Channels
           </button>
        </div>
      </div>

      {/* Channel Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
         {channels.map(ch => (
           <div key={ch.id} className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm hover:border-brand-orange/30 transition-all group">
              <div className="flex justify-between items-start mb-4">
                 <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center font-bold text-slate-400 group-hover:bg-brand-orange group-hover:text-white transition-all">
                    {ch.logo}
                 </div>
                 <div className={cn(
                   "w-2 h-2 rounded-full",
                   ch.status === 'healthy' ? "bg-emerald-500" : "bg-amber-500"
                 )} />
              </div>
              <h3 className="text-sm font-bold text-slate-900">{ch.name}</h3>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">{ch.listings} Active Listings</p>
              
              <div className="mt-4 pt-4 border-t border-slate-50 flex justify-between items-end">
                 <div>
                    <p className="text-[9px] font-mono uppercase text-slate-400">Total Sales</p>
                    <p className="text-sm font-bold text-slate-900">{ch.sales}</p>
                 </div>
                 <Link href={`/admin/channels/${ch.id}`} className="text-slate-300 hover:text-brand-orange transition-colors">
                    <ChevronRight size={18} />
                 </Link>
              </div>
           </div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Main Activity List */}
         <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
               <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900">Recent Sync Activity</h3>
                  <div className="flex items-center gap-4">
                     <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                        <input 
                          type="text" 
                          placeholder="Filter products..." 
                          className="pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
                        />
                     </div>
                  </div>
               </div>
               <div className="divide-y divide-slate-100">
                  {activities.map(act => (
                    <div key={act.id} className="p-4 hover:bg-slate-50/50 transition-colors flex items-center justify-between">
                       <div className="flex items-center gap-4">
                          <div className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center",
                            act.error ? "bg-red-50 text-red-500" : "bg-emerald-50 text-emerald-500"
                          )}>
                             {act.error ? <AlertCircle size={14} /> : <CheckCircle2 size={14} />}
                          </div>
                          <div>
                             <p className="text-sm font-bold text-slate-900">{act.product}</p>
                             <p className="text-[10px] text-slate-500">
                                <span className="font-bold text-slate-700">{act.channel}</span> • {act.type}
                             </p>
                          </div>
                       </div>
                       <div className="text-right">
                          <p className="text-[10px] font-mono text-slate-400 uppercase">{act.time}</p>
                          {act.error && (
                            <p className="text-[10px] font-bold text-red-500 uppercase tracking-tighter mt-0.5">{act.error}</p>
                          )}
                       </div>
                    </div>
                  ))}
               </div>
               <div className="p-4 bg-slate-50 text-center border-t border-slate-100">
                  <button className="text-[10px] font-bold text-slate-500 uppercase tracking-widest hover:text-slate-900">Load More Activity</button>
               </div>
            </div>
         </div>

         {/* Right Sidebar: Health Check */}
         <div className="space-y-6">
            <div className="bg-slate-900 rounded-xl p-6 shadow-lg border border-slate-800">
               <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400 mb-6">Channel Health Score</h3>
               <div className="flex items-end gap-4 mb-8">
                  <span className="text-5xl font-bold text-white tracking-tighter">94</span>
                  <div className="mb-1">
                     <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-1">
                        <ArrowUpRight size={12} /> Excellent
                     </p>
                     <p className="text-[10px] text-slate-500 font-mono uppercase">System Optimal</p>
                  </div>
               </div>
               
               <div className="space-y-4">
                  {[
                    { label: 'eBay Sync', score: 100 },
                    { label: 'Amazon API', score: 65, warning: true },
                    { label: 'Feed Health', score: 98 },
                    { label: 'Stock Buffer', score: 100 },
                  ].map((s, i) => (
                    <div key={i} className="space-y-1.5">
                       <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest">
                          <span className="text-slate-400">{s.label}</span>
                          <span className={s.warning ? "text-amber-500" : "text-slate-200"}>{s.score}%</span>
                       </div>
                       <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className={cn(
                              "h-full transition-all duration-1000",
                              s.warning ? "bg-amber-500" : "bg-brand-orange"
                            )} 
                            style={{ width: `${s.score}%` }} 
                          />
                       </div>
                    </div>
                  ))}
               </div>

               <Link 
                 href="/admin/settings/integrations" 
                 className="mt-8 w-full py-3 bg-white/10 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-white/20 transition-all flex items-center justify-center gap-2 border border-white/5"
               >
                 Review API Credentials <ChevronRight size={14} />
               </Link>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
               <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400 mb-6">Cross-Channel Setup</h3>
               <div className="space-y-4">
                  <div className="p-4 bg-orange-50/50 rounded-lg border border-orange-100">
                     <h4 className="text-[11px] font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
                        <AlertCircle size={14} className="text-brand-orange" /> Fix required
                     </h4>
                     <p className="text-[10px] text-slate-600 mt-2 leading-relaxed">
                        8 products on Amazon UK are missing valid GTINs (EANs). These products are currently hidden from search.
                     </p>
                     <Link href="/admin/products?filter=missing_gtin" className="inline-block mt-3 text-[10px] font-bold text-brand-orange uppercase hover:underline">Fix Now →</Link>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
