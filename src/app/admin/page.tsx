"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { supabase } from "@/lib/supabase";
import { 
  Database, ShoppingBag, Users, BarChart3, 
  Plus, Edit, Trash2, Search, ExternalLink,
  CheckCircle, AlertCircle
} from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function AdminDashboard() {
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [stats, setStats] = useState({ revenue: 0, orders: 0, products: 0 });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      // Basic security check (In real world, use RLS or dedicated admin role)
      if (!user) {
        router.push("/account/login");
        return;
      }

      const [prodRes, orderRes] = await Promise.all([
        supabase.from('products').select('*, product_categories(name)').order('created_at', { ascending: false }),
        supabase.from('blueprint_purchases').select('*, build_plans(*)').order('created_at', { ascending: false })
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
        products: prodRes.data?.length || 0
      });
      setLoading(false);
    };

    fetchData();
  }, [router]);

  if (loading) return <div className="bg-brand-obsidian min-h-screen flex items-center justify-center font-mono text-xs uppercase text-brand-grey tracking-widest">Accessing Admin Control Node...</div>;

  return (
    <main className="bg-brand-obsidian min-h-screen flex flex-col">
       <Navbar />
       
       <section className="pt-48 pb-32">
          <div className="container mx-auto px-6">
             
             {/* Admin Header */}
             <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
                <div>
                   <div className="flex items-center gap-3 font-mono text-[10px] text-brand-orange uppercase mb-4 tracking-widest">
                      <Database className="w-3 h-3" /> System Administrator Mode
                   </div>
                   <h1 className="font-display text-6xl uppercase tracking-tighter">Command <span className="text-brand-orange">Centre</span></h1>
                </div>
                <div className="grid grid-cols-3 gap-8">
                   <div className="text-right">
                      <span className="block font-mono text-[8px] text-brand-grey uppercase tracking-widest mb-1">Lifetime Revenue</span>
                      <span className="block font-display text-2xl">£{stats.revenue}</span>
                   </div>
                   <div className="text-right">
                      <span className="block font-mono text-[8px] text-brand-grey uppercase tracking-widest mb-1">Total Orders</span>
                      <span className="block font-display text-2xl">{stats.orders}</span>
                   </div>
                   <div className="text-right">
                      <span className="block font-mono text-[8px] text-brand-grey uppercase tracking-widest mb-1">Active SKUs</span>
                      <span className="block font-display text-2xl">{stats.products}</span>
                   </div>
                </div>
             </div>

             <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
                
                {/* Product Manager */}
                <div className="xl:col-span-2 space-y-8">
                   <div className="flex justify-between items-center">
                      <h2 className="font-display text-2xl uppercase">Product Catalogue</h2>
                      <button className="flex items-center gap-2 bg-brand-orange text-white px-6 py-2 font-mono text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all">
                         <Plus className="w-4 h-4" /> Add Product
                      </button>
                   </div>
                   
                   <div className="blueprint-border bg-brand-carbon overflow-hidden">
                      <table className="w-full text-left">
                         <thead>
                            <tr className="bg-brand-obsidian border-b border-brand-border font-mono text-[10px] uppercase tracking-widest text-brand-grey">
                               <th className="p-6">Product / Brand</th>
                               <th className="p-6">Category</th>
                               <th className="p-6">Price</th>
                               <th className="p-6">Stock</th>
                               <th className="p-6 text-right">Actions</th>
                            </tr>
                         </thead>
                         <tbody className="font-sans text-xs">
                            {products.map((p) => (
                              <tr key={p.id} className="border-b border-brand-border hover:bg-brand-obsidian transition-colors">
                                 <td className="p-6">
                                    <span className="block font-display text-sm uppercase text-white">{p.name}</span>
                                    <span className="block font-mono text-[8px] text-brand-grey uppercase">{p.brand}</span>
                                 </td>
                                 <td className="p-6">
                                    <span className="font-mono text-[9px] uppercase border border-brand-border px-2 py-1 text-brand-grey">{p.product_categories?.name}</span>
                                 </td>
                                 <td className="p-6 font-display text-white text-sm">£{(p.price_gbp / 100).toLocaleString()}</td>
                                 <td className="p-6">
                                    <div className="flex items-center gap-2">
                                       <div className={cn("w-2 h-2 rounded-full", p.stock_quantity > 5 ? "bg-green-500" : "bg-red-500")} />
                                       <span className="font-mono text-[10px] text-brand-grey">{p.stock_quantity} UNITs</span>
                                    </div>
                                 </td>
                                 <td className="p-6 text-right">
                                    <div className="flex justify-end gap-3 text-brand-grey">
                                       <button className="hover:text-brand-orange transition-colors"><Edit className="w-4 h-4" /></button>
                                       <button className="hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                                    </div>
                                 </td>
                              </tr>
                            ))}
                         </tbody>
                      </table>
                   </div>
                </div>

                {/* Recent Activity / Orders */}
                <div className="space-y-8">
                   <h2 className="font-display text-2xl uppercase">Recent Orders</h2>
                   <div className="space-y-4">
                      {orders.map((o) => (
                        <div key={o.id} className="blueprint-border p-6 bg-brand-obsidian flex flex-col gap-4">
                           <div className="flex justify-between items-start">
                              <div>
                                 <span className="block font-mono text-[8px] text-brand-grey uppercase tracking-widest mb-1">Blueprint Purchase</span>
                                 <span className="block font-display text-lg uppercase text-brand-orange">{o.tier} Package</span>
                              </div>
                              <CheckCircle className="w-5 h-5 text-green-500" />
                           </div>
                           <div className="flex justify-between items-end pt-4 border-t border-brand-border/30">
                              <div>
                                 <p className="font-mono text-[8px] text-brand-grey uppercase">Build: {o.build_plans?.name || 'Manual Spec'}</p>
                                 <p className="font-sans text-[10px] text-white/50">{o.created_at.split('T')[0]}</p>
                              </div>
                              <button className="text-brand-grey hover:text-white"><ExternalLink className="w-4 h-4" /></button>
                           </div>
                        </div>
                      ))}
                      {orders.length === 0 && <p className="font-mono text-[10px] text-brand-grey uppercase text-center py-12 border border-dashed border-brand-border">No recent orders detected.</p>}
                   </div>
                </div>

             </div>

          </div>
       </section>

       <Footer />
    </main>
  );
}
