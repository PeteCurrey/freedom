"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  ShoppingCart, 
  Globe, 
  Search, 
  Calendar,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  PieChart as PieChartIcon,
  Layout,
  Lock,
  Zap,
  CreditCard,
  Target,
  MousePointer2,
  Activity,
  Package,
  ExternalLink,
  Info,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Eye
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Cell,
  Pie,
  AreaChart,
  Area
} from 'recharts';
import { cn } from "@/lib/utils";

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [dateRange, setDateRange] = useState('30D');
  const [integrations, setIntegrations] = useState({
    stripe: false,
    ga4: false,
    gsc: false,
    ebay: false
  });

  const tabs = ['Overview', 'Revenue', 'Traffic', 'SEO Performance', 'Customers', 'Channels', 'Products'];

  const MetricCard = ({ label, value, sub, trend, trendValue, icon: Icon, connected = true }: any) => (
    <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm relative overflow-hidden group">
      {!connected && (
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] z-10 flex items-center justify-center">
           <Link href="/admin/settings/integrations" className="text-[9px] font-bold bg-slate-900 text-white px-3 py-1.5 rounded uppercase tracking-widest shadow-xl hover:bg-brand-orange transition-all">Setup Required</Link>
        </div>
      )}
      <div className="flex justify-between items-start mb-4">
         <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400">{label}</p>
         <Icon size={14} className="text-slate-300 group-hover:text-brand-orange transition-colors" />
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-slate-900">{connected ? value : '—'}</span>
        {connected && trend && (
          <span className={cn(
            "text-[10px] font-bold flex items-center gap-0.5",
            trend === 'up' ? "text-emerald-600" : "text-red-500"
          )}>
            {trend === 'up' ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
            {trendValue}
          </span>
        )}
      </div>
      <p className="text-[10px] text-slate-400 mt-1">{sub}</p>
    </div>
  );

  const EmptyState = ({ platform, icon: Icon, title, description }: { platform: string, icon: any, title: string, description: string }) => (
    <div className="flex-1 flex flex-col items-center justify-center p-12 text-center bg-white border border-slate-100 rounded-xl min-h-[400px]">
       <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-200 mb-4">
          <Icon size={32} />
       </div>
       <h4 className="text-sm font-bold text-slate-900">{title}</h4>
       <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">{description}</p>
       <Link 
         href="/admin/settings/integrations" 
         className="mt-6 px-4 py-2 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-md hover:bg-brand-orange transition-all flex items-center gap-2 shadow-lg shadow-slate-200"
       >
         Connect {platform} <Zap size={12} />
       </Link>
    </div>
  );

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tighter flex items-center gap-3">
             <BarChart3 className="text-brand-orange" /> Business <span className="text-brand-orange underline decoration-brand-orange/20">Intelligence</span>
          </h1>
          <p className="text-slate-500 text-sm mt-1">Real-time platform analytics from integrated data sources</p>
        </div>
        
        <div className="flex items-center gap-2 bg-white border border-slate-200 p-1 rounded-lg self-start md:self-end">
           {['Today', '7D', '30D', '90D', '12M'].map(range => (
             <button 
               key={range}
               onClick={() => setDateRange(range)}
               className={cn(
                 "px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-md transition-all",
                 dateRange === range ? "bg-slate-900 text-white shadow-sm" : "text-slate-400 hover:text-slate-600"
               )}
             >
               {range}
             </button>
           ))}
        </div>
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

      <div className="space-y-8 animate-in slide-in-from-bottom-2 duration-300">
         {activeTab === 'Overview' && (
           <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 <MetricCard label="Revenue MTD" value="£0" sub="vs £0 last month" trend="up" trendValue="0%" icon={CreditCard} connected={integrations.stripe} />
                 <MetricCard label="Total Sessions" value="0" sub="Sessions today" trend="up" trendValue="0%" icon={Users} connected={integrations.ga4} />
                 <MetricCard label="Avg Position" value="—" sub="Keywords from GSC" icon={Target} connected={integrations.gsc} />
                 <MetricCard label="Conversion" value="0%" sub="Sessions to orders" icon={MousePointer2} connected={integrations.stripe && integrations.ga4} />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                 {!integrations.stripe ? (
                   <EmptyState 
                     platform="Stripe" 
                     icon={TrendingUp} 
                     title="Revenue analysis hidden" 
                     description="Connect your Stripe account to see real-time revenue performance, order trends, and average order value." 
                   />
                 ) : (
                   <div className="h-[400px] bg-white border border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center">
                      <p className="text-sm text-slate-400 italic">No revenue data available for this period.</p>
                   </div>
                 )}

                 {!integrations.ga4 ? (
                   <EmptyState 
                     platform="Google Analytics 4" 
                     icon={Globe} 
                     title="Traffic analysis hidden" 
                     description="Connect GA4 to track sessions, bounce rates, and traffic sources for your store and resource pages." 
                   />
                 ) : (
                   <div className="h-[400px] bg-white border border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center">
                      <p className="text-sm text-slate-400 italic">No traffic data available for this period.</p>
                   </div>
                 )}
              </div>
           </>
         )}

         {activeTab === 'Revenue' && (
            <>
               <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  <MetricCard label="Revenue Today" value="£0" sub="Real-time" icon={TrendingUp} connected={integrations.stripe} />
                  <MetricCard label="This Month" value="£0" sub="MTD Performance" icon={Calendar} connected={integrations.stripe} />
                  <MetricCard label="AOV" value="£0" sub="Average Order Value" icon={ShoppingCart} connected={integrations.stripe} />
                  <MetricCard label="Orders" value="0" sub="Total orders" icon={Package} connected={integrations.stripe} />
                  <MetricCard label="Refund Rate" value="0%" sub="Post-sale health" icon={Activity} connected={integrations.stripe} />
               </div>

               <div className="min-h-[500px] flex flex-col">
                  {!integrations.stripe ? (
                    <EmptyState 
                      platform="Stripe" 
                      icon={ShoppingCart} 
                      title="Revenue analytics requires Stripe" 
                      description="Once connected, you'll see a detailed breakdown of sales, refunds, and growth across all channels." 
                    />
                  ) : (
                    <div className="bg-white border border-slate-200 rounded-xl p-8 flex-1 flex items-center justify-center">
                       <p className="text-sm text-slate-400 italic">Connected to Stripe. Waiting for first transaction data...</p>
                    </div>
                  )}
               </div>
            </>
         )}

         {activeTab === 'Traffic' && (
            <>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <MetricCard label="Live Visitors" value="0" sub="Real-time (polling)" icon={Activity} connected={integrations.ga4} />
                  <MetricCard label="Sessions" value="0" sub="Total for period" icon={Users} connected={integrations.ga4} />
                  <MetricCard label="Bounce Rate" value="0%" sub="Interaction health" icon={MousePointer2} connected={integrations.ga4} />
                  <MetricCard label="Avg Duration" value="0s" sub="Engagement time" icon={Clock} connected={integrations.ga4} />
               </div>

               <div className="min-h-[500px] flex flex-col">
                  {!integrations.ga4 ? (
                    <EmptyState 
                      platform="Google Analytics 4" 
                      icon={Users} 
                      title="Traffic analytics requires GA4" 
                      description="Understand where your visitors are coming from and which pages are performing best." 
                    />
                  ) : (
                    <div className="bg-white border border-slate-200 rounded-xl p-8 flex-1 flex items-center justify-center">
                       <p className="text-sm text-slate-400 italic">Connected to GA4. Waiting for session data...</p>
                    </div>
                  )}
               </div>
            </>
         )}

         {activeTab === 'SEO Performance' && (
            <>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <MetricCard label="Impressions" value="0" sub="Search visibility" icon={Eye} connected={integrations.gsc} />
                  <MetricCard label="Clicks" value="0" sub="Traffic from search" icon={MousePointer2} connected={integrations.gsc} />
                  <MetricCard label="Avg CTR" value="0%" sub="Click-through rate" icon={TrendingUp} connected={integrations.gsc} />
                  <MetricCard label="Indexed Pages" value="0" sub="Google coverage" icon={CheckCircle2} connected={integrations.gsc} />
               </div>

               <div className="min-h-[500px] flex flex-col">
                  {!integrations.gsc ? (
                    <EmptyState 
                      platform="Google Search Console" 
                      icon={Search} 
                      title="SEO analytics requires Search Console" 
                      description="Connect to see your real keyword rankings, impressions, and CTR data directly in your dashboard." 
                    />
                  ) : (
                    <div className="bg-white border border-slate-200 rounded-xl p-8 flex-1 flex items-center justify-center">
                       <p className="text-sm text-slate-400 italic">Connected to GSC. Fetching indexing data...</p>
                    </div>
                  )}
               </div>
            </>
         )}

         {activeTab === 'Customers' && (
            <div className="min-h-[500px] flex flex-col">
               {!integrations.stripe ? (
                  <EmptyState 
                    platform="Stripe" 
                    icon={Users} 
                    title="Customer analytics requires sales data" 
                    description="Connect Stripe to see LTV, retention rates, and acquisition segments." 
                  />
               ) : (
                  <div className="bg-white border border-slate-200 rounded-xl p-8 flex-1 flex items-center justify-center">
                    <p className="text-sm text-slate-400 italic">Aggregating customer segments from Supabase and Stripe...</p>
                  </div>
               )}
            </div>
         )}

         {activeTab === 'Channels' && (
            <div className="min-h-[500px] flex flex-col">
               <div className="flex-1 flex flex-col items-center justify-center p-12 text-center bg-white border border-slate-100 rounded-xl">
                  <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-200 mb-4">
                     <ShoppingCart size={32} />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">Multi-Channel Profitability</h4>
                  <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">Compare sales and margins across eBay, Amazon, and OnBuy. Requires marketplace credentials.</p>
                  <Link 
                    href="/admin/channels" 
                    className="mt-6 px-4 py-2 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-md hover:bg-brand-orange transition-all"
                  >
                    Manage Channels
                  </Link>
               </div>
            </div>
         )}

         {activeTab === 'Products' && (
            <div className="min-h-[500px] flex flex-col">
               <div className="flex-1 flex flex-col items-center justify-center p-12 text-center bg-white border border-slate-100 rounded-xl">
                  <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-200 mb-4">
                     <Package size={32} />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">SKU Performance Leaderboard</h4>
                  <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">Identify high-margin winners and low-converting products. Connect Stripe and GA4 to populate.</p>
               </div>
            </div>
         )}
      </div>

      <div className="bg-slate-900 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 mt-12 border border-slate-800 relative overflow-hidden">
         <div className="absolute top-0 right-0 p-8 opacity-10">
            <ShieldCheck size={120} className="text-white" />
         </div>
         <div className="relative z-10 max-w-xl">
            <h3 className="text-xl font-bold text-white mb-2">Platform-Wide Data Sync</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Your analytics are updated every 60 minutes via background workers. 
              Real-time revenue reflects Stripe webhooks, while traffic and search data are polled from Google APIs.
            </p>
         </div>
         <div className="relative z-10 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest">System Operational</span>
         </div>
      </div>
    </div>
  );
}
