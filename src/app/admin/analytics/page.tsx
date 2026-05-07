"use client";

import { useState } from "react";
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
  Layout
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

const COLORS = ['#f97316', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

const trafficData = [
  { name: 'Organic', value: 45 },
  { name: 'Direct', value: 25 },
  { name: 'Referral', value: 15 },
  { name: 'Social', value: 10 },
  { name: 'Email', value: 5 },
];

const revenueTrend = [
  { name: 'Mon', revenue: 4200, orders: 12 },
  { name: 'Tue', revenue: 3800, orders: 10 },
  { name: 'Wed', revenue: 5100, orders: 15 },
  { name: 'Thu', revenue: 4600, orders: 14 },
  { name: 'Fri', revenue: 6200, orders: 18 },
  { name: 'Sat', revenue: 7500, orders: 22 },
  { name: 'Sun', revenue: 6800, orders: 19 },
];

const topProductsData = [
  { name: 'MultiPlus-II', value: 14400 },
  { name: 'Fogstar 400Ah', value: 12000 },
  { name: 'Climate Kit', value: 8500 },
  { name: 'MaxxFan', value: 6400 },
  { name: 'Solar 400W', value: 5200 },
];

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [dateRange, setDateRange] = useState('30D');

  const tabs = ['Overview', 'Revenue', 'Traffic', 'Products', 'Customers', 'SEO Performance'];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tighter flex items-center gap-3">
             <BarChart3 className="text-brand-orange" /> Business Intelligence
          </h1>
          <p className="text-slate-500 text-sm mt-1">Full platform analytics and growth metrics</p>
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
           <div className="h-4 w-px bg-slate-200 mx-1" />
           <button className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <Calendar size={12} /> Custom
           </button>
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

      {activeTab === 'Overview' && (
        <div className="space-y-8 animate-in slide-in-from-bottom-2 duration-300">
           {/* METRICS ROW */}
           <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
              {[
                { label: 'Revenue', value: '£42,840', change: '+12.5%', trend: 'up' },
                { label: 'Orders', value: '184', change: '+4.2%', trend: 'up' },
                { label: 'AOV', value: '£232.82', change: '-1.2%', trend: 'down' },
                { label: 'Conv. Rate', value: '3.24%', change: '+0.4%', trend: 'up' },
                { label: 'New Customers', value: '42', change: '+18%', trend: 'up' },
                { label: 'Returning', value: '28%', change: '+2%', trend: 'up' },
              ].map((m, i) => (
                <div key={i} className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
                   <p className="text-[9px] font-mono uppercase tracking-widest text-slate-400 mb-1">{m.label}</p>
                   <p className="text-xl font-bold text-slate-900">{m.value}</p>
                   <div className={cn(
                     "flex items-center gap-1 text-[10px] font-bold mt-1",
                     m.trend === 'up' ? "text-emerald-600" : "text-red-500"
                   )}>
                      {m.trend === 'up' ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                      {m.change}
                   </div>
                </div>
              ))}
           </div>

           {/* CHARTS ROW 1 */}
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Revenue Over Time */}
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                 <div className="flex justify-between items-end mb-8">
                    <div>
                       <h3 className="text-sm font-bold text-slate-900">Revenue Over Time</h3>
                       <p className="text-[10px] text-slate-400 uppercase tracking-tight">Daily sales vs order count</p>
                    </div>
                    <div className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-widest">
                       <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-brand-orange" /> Revenue</div>
                       <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500" /> Orders</div>
                    </div>
                 </div>
                 <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                       <AreaChart data={revenueTrend}>
                          <defs>
                             <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#f97316" stopOpacity={0.1}/>
                                <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                             </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                          <Tooltip />
                          <Area type="monotone" dataKey="revenue" stroke="#f97316" fillOpacity={1} fill="url(#colorRev)" strokeWidth={3} />
                       </AreaChart>
                    </ResponsiveContainer>
                 </div>
              </div>

              {/* Traffic Sources */}
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                 <div className="flex justify-between items-end mb-8">
                    <div>
                       <h3 className="text-sm font-bold text-slate-900">Traffic Distribution</h3>
                       <p className="text-[10px] text-slate-400 uppercase tracking-tight">Acquisition channels performance</p>
                    </div>
                    <PieChartIcon className="text-slate-200" size={24} />
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
                    <div className="h-[250px]">
                       <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                             <Pie
                                data={trafficData}
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                             >
                                {trafficData.map((entry, index) => (
                                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                             </Pie>
                             <Tooltip />
                          </PieChart>
                       </ResponsiveContainer>
                    </div>
                    <div className="space-y-4">
                       {trafficData.map((t, i) => (
                          <div key={i} className="flex items-center justify-between">
                             <div className="flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                                <span className="text-[11px] font-bold text-slate-600 uppercase tracking-widest">{t.name}</span>
                             </div>
                             <span className="text-sm font-bold text-slate-900">{t.value}%</span>
                          </div>
                       ))}
                    </div>
                 </div>
              </div>
           </div>

           {/* CHARTS ROW 2 */}
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Top 10 Products */}
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                 <div className="flex justify-between items-end mb-8">
                    <div>
                       <h3 className="text-sm font-bold text-slate-900">Top Products by Revenue</h3>
                       <p className="text-[10px] text-slate-400 uppercase tracking-tight">Performance of leading SKUs</p>
                    </div>
                    <Link href="/admin/products" className="text-[10px] font-bold text-brand-orange uppercase">Manage Catalog</Link>
                 </div>
                 <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                       <BarChart layout="vertical" data={topProductsData}>
                          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                          <XAxis type="number" hide />
                          <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontStyle: 'bold', fill: '#475569' }} width={100} />
                          <Tooltip cursor={{ fill: '#f8fafc' }} />
                          <Bar dataKey="value" fill="#f97316" radius={[0, 4, 4, 0]} barSize={20} />
                       </BarChart>
                    </ResponsiveContainer>
                 </div>
              </div>

              {/* Conversion Funnel */}
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm overflow-hidden">
                 <div className="mb-8">
                    <h3 className="text-sm font-bold text-slate-900">Conversion Funnel</h3>
                    <p className="text-[10px] text-slate-400 uppercase tracking-tight">User journey from visitor to buyer</p>
                 </div>
                 <div className="space-y-6">
                    {[
                      { step: 'Visitors', value: '42,400', pct: 100 },
                      { step: 'Product Views', value: '18,200', pct: 43 },
                      { step: 'Add to Cart', value: '2,450', pct: 6 },
                      { step: 'Checkout', value: '1,820', pct: 4 },
                      { step: 'Purchase', value: '1,372', pct: 3.2 },
                    ].map((step, i) => (
                      <div key={i} className="relative">
                         <div className="flex justify-between items-end mb-2">
                            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">{step.step}</span>
                            <span className="text-sm font-bold text-slate-900">{step.value} <span className="text-[10px] text-slate-400 font-normal">({step.pct}%)</span></span>
                         </div>
                         <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-brand-orange transition-all duration-1000" 
                              style={{ width: `${step.pct}%`, opacity: 1 - (i * 0.15) }}
                            />
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* Placeholder for other tabs */}
      {activeTab !== 'Overview' && (
        <div className="py-20 text-center bg-white border border-slate-200 rounded-xl">
           <Layout className="mx-auto text-slate-200 mb-4" size={48} />
           <h3 className="text-lg font-bold text-slate-900">{activeTab} Analytics</h3>
           <p className="text-sm text-slate-500 mt-2 max-w-sm mx-auto">This intelligence node is currently gathering data. Detailed {activeTab.toLowerCase()} metrics will be available in the next sync.</p>
           <button 
             onClick={() => setActiveTab('Overview')}
             className="mt-8 px-6 py-3 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-brand-orange transition-all"
           >
             Return to Overview
           </button>
        </div>
      )}
    </div>
  );
}
