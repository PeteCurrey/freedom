"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Database, ShoppingBag, Users, BarChart3, 
  Plus, Edit, Trash2, Search, ExternalLink,
  CheckCircle, AlertCircle, TrendingUp, ArrowUpRight
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

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-2 font-mono text-[10px] text-brand-orange uppercase tracking-[0.3em] mb-4">
          <Database size={12} /> System Node: dashboard.alpha
        </div>
        <h1 className="font-display text-5xl uppercase tracking-tighter text-white">
          Command <span className="text-brand-orange">Centre</span>
        </h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          { label: "Lifetime Revenue", value: `£${stats.revenue}`, icon: TrendingUp, color: "text-green-500" },
          { label: "Active SKUs", value: stats.products, icon: ShoppingBag, color: "text-brand-orange" },
          { label: "Total Leads", value: stats.leads, icon: Users, color: "text-blue-500" },
          { label: "Blueprint Sales", value: stats.orders, icon: CheckCircle, color: "text-brand-orange" },
        ].map((stat, i) => (
          <div key={i} className="blueprint-border p-6 bg-brand-carbon group hover:bg-brand-carbon/80 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className={cn("p-2 bg-brand-obsidian border border-brand-border group-hover:border-brand-orange transition-colors", stat.color)}>
                <stat.icon size={20} />
              </div>
              <ArrowUpRight size={14} className="text-brand-grey opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="block font-mono text-[9px] text-brand-grey uppercase tracking-widest mb-1">{stat.label}</span>
            <span className="block font-display text-3xl text-white">{stat.value}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
        {/* Recent Products */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="font-display text-xl uppercase tracking-tighter">Inventory Pulse</h2>
            <button className="font-mono text-[10px] text-brand-orange uppercase tracking-widest hover:underline">View All Catalog</button>
          </div>
          <div className="blueprint-border overflow-hidden bg-brand-carbon">
             <table className="w-full text-left">
                <thead>
                   <tr className="bg-brand-obsidian border-b border-brand-border font-mono text-[10px] uppercase tracking-widest text-brand-grey">
                      <th className="p-4">SKU / Brand</th>
                      <th className="p-4">Stock</th>
                      <th className="p-4 text-right">Price</th>
                   </tr>
                </thead>
                <tbody className="font-sans text-xs">
                   {products.map((p) => (
                     <tr key={p.id} className="border-b border-brand-border/50 hover:bg-brand-obsidian transition-colors">
                        <td className="p-4">
                           <span className="block font-display text-[11px] uppercase text-white">{p.name}</span>
                           <span className="block font-mono text-[8px] text-brand-grey uppercase">{p.brand}</span>
                        </td>
                        <td className="p-4">
                           <span className="font-mono text-[10px] text-brand-grey">{p.stock_quantity} UNITs</span>
                        </td>
                        <td className="p-4 text-right font-display text-white">£{(p.price_gbp / 100).toLocaleString()}</td>
                     </tr>
                   ))}
                </tbody>
             </table>
          </div>
        </div>

        {/* Recent Sales Activity */}
        <div className="space-y-6">
          <h2 className="font-display text-xl uppercase tracking-tighter text-brand-orange">Transmission Feed</h2>
          <div className="space-y-4">
            {orders.map((o) => (
              <div key={o.id} className="blueprint-border p-5 bg-brand-obsidian flex justify-between items-center group hover:border-brand-orange transition-all">
                <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 flex items-center justify-center bg-brand-carbon border border-brand-border group-hover:border-brand-orange text-brand-orange">
                    <CheckCircle size={18} />
                  </div>
                  <div>
                    <span className="block font-display text-sm uppercase text-white">{o.tier} Blueprint</span>
                    <span className="block font-mono text-[8px] text-brand-grey uppercase tracking-widest">Ordered {new Date(o.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
                <button className="text-brand-grey hover:text-white transition-colors">
                  <ExternalLink size={16} />
                </button>
              </div>
            ))}
            {orders.length === 0 && <p className="font-mono text-[10px] text-brand-grey uppercase text-center py-10 opacity-50">Log empty. No recent activity detected.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
