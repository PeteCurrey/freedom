"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { 
  Database, ShoppingBag, Users, BarChart3, 
  Plus, Edit, Trash2, Search, ExternalLink,
  CheckCircle, AlertCircle, TrendingUp, ArrowUpRight,
  MessageSquare, FileText, Monitor, Globe, Shield,
  Truck, Zap, Activity, Layers
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminDashboardPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [stats, setStats] = useState({ revenue: 0, orders: 0, products: 0, leads: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const [prodRes, orderRes, leadRes] = await Promise.all([
        supabase.from('products').select('*, product_categories(name)').order('created_at', { ascending: false }).limit(5),
        supabase.from('blueprint_purchases').select('*, build_plans(name)').order('created_at', { ascending: false }).limit(5),
        supabase.from('leads').select('*', { count: 'exact' })
      ]);

      setProducts(prodRes.data || []);
      setOrders(orderRes.data || []);
      
      const totalRev = (orderRes.data || []).reduce((acc, curr) => {
         const prices: Record<string, number> = { starter: 29, full: 79, master: 149 };
         return acc + (prices[curr.tier] || 0);
      }, 0);

      setStats({
        revenue: totalRev,
        orders: orderRes.data?.length || 0,
        products: prodRes.data?.length || 0,
        leads: leadRes.count || 0
      });
      setLoading(false);
    }

    fetchData();
  }, []);

  const operationHubs = [
    {
      title: "Commercial Hub",
      description: "Leads, Suppliers & Sales",
      links: [
        { name: "Lead Manager", href: "/admin/leads", icon: MessageSquare, color: "text-blue-500" },
        { name: "Supplier Network", href: "/admin/store/suppliers", icon: Truck, color: "text-brand-orange" },
        { name: "Blueprint Sales", href: "/admin/dashboard", icon: Activity, color: "text-green-500" },
      ]
    },
    {
      title: "Content & Build",
      description: "Editorial & Static Nodes",
      links: [
        { name: "Journal Library", href: "/admin/journal", icon: FileText, color: "text-brand-orange" },
        { name: "Modular CMS", href: "/admin/cms", icon: Monitor, color: "text-purple-500" },
        { name: "Product Archive", href: "/admin/store", icon: ShoppingBag, color: "text-brand-orange" },
      ]
    },
    {
      title: "Optimization",
      description: "SEO & Traffic Routing",
      links: [
        { name: "SEO Commander", href: "/admin/seo", icon: Search, color: "text-brand-orange" },
        { name: "Marketing Hub", href: "/admin/marketing", icon: Zap, color: "text-yellow-500" },
        { name: "Link Registry", href: "/admin/marketing/marketplaces", icon: Globe, color: "text-blue-400" },
      ]
    }
  ];

  return (
    <div className="p-8 pb-32">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-2 font-mono text-[10px] text-brand-orange uppercase tracking-[0.3em] mb-4">
          <Shield size={12} /> System Status: Online.Secure
        </div>
        <h1 className="font-display text-5xl uppercase tracking-tighter text-brand-white">
          Command <span className="text-brand-orange">Centre</span>
        </h1>
      </div>

      {/* Stats Summary Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {[
          { label: "Lifetime Revenue", value: `£${stats.revenue}`, icon: TrendingUp, color: "text-green-500" },
          { label: "Active SKUs", value: stats.products, icon: ShoppingBag, color: "text-brand-orange" },
          { label: "Total Leads", value: stats.leads, icon: Users, color: "text-blue-500" },
          { label: "Sales Nodes", value: stats.orders, icon: CheckCircle, color: "text-brand-orange" },
        ].map((stat, i) => (
          <div key={i} className="blueprint-border p-6 bg-brand-carbon/50 group hover:border-brand-orange transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className={cn("p-2 bg-brand-obsidian border border-brand-border group-hover:bg-brand-orange transition-all", stat.color, "group-hover:text-white")}>
                <stat.icon size={18} />
              </div>
            </div>
            <span className="block font-mono text-[9px] text-brand-grey uppercase tracking-widest mb-1">{stat.label}</span>
            <span className="block font-display text-3xl text-white">{stat.value}</span>
          </div>
        ))}
      </div>

      {/* Sectors: Modular Operations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
         {operationHubs.map((hub, idx) => (
           <div key={idx} className="space-y-6">
              <div className="border-l-2 border-brand-orange pl-4 py-1">
                 <h2 className="font-display text-xl uppercase tracking-widest text-white leading-none">{hub.title}</h2>
                 <p className="font-mono text-[9px] text-brand-grey uppercase mt-1">{hub.description}</p>
              </div>
              
              <div className="space-y-3">
                 {hub.links.map((link) => (
                    <Link 
                      key={link.name} 
                      href={link.href}
                      className="group flex justify-between items-center p-4 bg-brand-carbon border border-brand-border hover:border-brand-orange transition-all"
                    >
                       <div className="flex items-center gap-4">
                          <link.icon className={cn("w-5 h-5", link.color)} />
                          <span className="font-mono text-[10px] uppercase tracking-widest text-brand-grey group-hover:text-white transition-colors">{link.name}</span>
                       </div>
                       <ArrowUpRight size={14} className="text-brand-grey group-hover:text-brand-orange transition-colors" />
                    </Link>
                 ))}
              </div>
           </div>
         ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
        {/* Quick Actions / Store Import */}
        <div className="blueprint-border p-8 bg-brand-carbon relative overflow-hidden group">
           <div className="blueprint-grid absolute inset-0 opacity-10 pointer-events-none" />
           <div className="relative z-10">
              <h3 className="font-display text-2xl uppercase tracking-tighter text-brand-white mb-2">Mass Product Sync</h3>
              <p className="font-sans text-xs text-brand-grey mb-8 max-w-sm">Synchronize wholesale catalogs from suppliers like <span className="text-brand-orange">Energy Solutions</span> directly into your storefront.</p>
              <Link 
                href="/admin/store/import" 
                className="px-8 py-4 bg-brand-orange text-white font-mono text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all inline-flex items-center gap-2"
              >
                 <Layers size={14} /> Open Importer Hub
              </Link>
           </div>
           <Truck className="absolute -bottom-8 -right-8 w-48 h-48 text-brand-orange opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity" />
        </div>

        {/* Live Feed */}
        <div className="space-y-6">
           <div className="flex justify-between items-end border-b border-brand-border pb-4">
              <h2 className="font-display text-xl uppercase tracking-tighter text-brand-orange flex items-center gap-2">
                 <Activity size={20} /> Transmission Feed
              </h2>
              <span className="font-mono text-[8px] text-brand-grey uppercase tracking-widest">Live Activity Log</span>
           </div>
           <div className="space-y-3">
             {orders.map((o) => (
               <div key={o.id} className="p-4 bg-brand-carbon border border-brand-border flex justify-between items-center hover:bg-brand-obsidian transition-colors">
                 <div className="flex gap-4 items-center">
                   <div className="w-8 h-8 flex items-center justify-center bg-brand-obsidian border border-brand-border text-brand-orange">
                     <CheckCircle size={14} />
                   </div>
                   <div>
                     <span className="block font-mono text-[10px] uppercase tracking-widest text-white">{o.tier} Blueprint Node</span>
                     <span className="block font-mono text-[8px] text-brand-grey uppercase tracking-tight">Timestamp: {new Date(o.created_at).toLocaleString()}</span>
                   </div>
                 </div>
                 <ExternalLink size={14} className="text-brand-grey" />
               </div>
             ))}
             {orders.length === 0 && (
               <div className="py-20 border border-dashed border-brand-border text-center">
                  <span className="font-mono text-[10px] text-brand-grey uppercase tracking-widest opacity-30 italic">No recent transmissions intercepted.</span>
               </div>
             )}
           </div>
        </div>
      </div>
    </div>
  );
}
