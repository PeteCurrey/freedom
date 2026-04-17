"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { 
  ShoppingBag, 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  ChevronDown,
  Briefcase
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function StoreManagerPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      const { data } = await supabase
        .from('products')
        .select('*, product_categories(name)')
        .order('created_at', { ascending: false });
      setProducts(data || []);
      setLoading(false);
    }
    fetchProducts();
  }, []);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <div className="flex items-center gap-2 font-mono text-[10px] text-brand-orange uppercase tracking-[0.3em] mb-4">
            <ShoppingBag size={12} /> Commercial Node: store.gamma
          </div>
          <h1 className="font-display text-5xl uppercase tracking-tighter text-white">
            Product <span className="text-brand-orange">Catalogue</span>
          </h1>
        </div>
        
        <div className="flex gap-4">
          <Link href="/admin/store/import" className="px-6 py-4 bg-brand-carbon text-brand-orange border border-brand-orange/30 font-mono text-[10px] uppercase tracking-widest hover:border-brand-orange transition-all flex items-center gap-2">
             Mass CSV Import
          </Link>
          <Link href="/admin/store/categories" className="px-8 py-4 border border-brand-orange text-brand-orange font-mono text-[10px] uppercase tracking-widest hover:bg-brand-orange hover:text-white transition-all flex items-center gap-2">
             Manage Categories
          </Link>
          <Link href="/admin/store/products/new" className="px-8 py-4 bg-brand-orange text-white font-mono text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all flex items-center gap-2">
             <Plus size={14} /> Add New SKU
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
         {[
           { label: "Total SKUs", value: products.length, icon: ShoppingBag },
           { label: "Out of Stock", value: 0, icon: TrendingDown, color: "text-red-500" },
           { label: "Featured Items", value: 5, icon: Briefcase, color: "text-brand-orange" },
           { label: "Avg. Margin", value: "32%", icon: TrendingUp, color: "text-green-500" },
         ].map((stat, i) => (
           <div key={i} className="blueprint-border p-6 bg-brand-carbon">
              <div className="flex justify-between items-start mb-4">
                 <div className={cn("p-2 bg-brand-obsidian border border-brand-border", stat.color)}>
                    <stat.icon size={18} />
                 </div>
              </div>
              <span className="block font-mono text-[8px] text-brand-grey uppercase tracking-widest mb-1">{stat.label}</span>
              <span className="block font-display text-2xl text-white">{stat.value}</span>
           </div>
         ))}
      </div>

      <div className="blueprint-border bg-brand-carbon overflow-hidden">
        <div className="p-4 bg-brand-obsidian border-b border-brand-border flex justify-between items-center">
           <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-grey" size={14} />
              <input 
                type="text" 
                placeholder="Search catalog by name, SKU, or category..."
                className="w-full bg-brand-carbon border border-brand-border pl-12 pr-4 py-3 font-mono text-[10px] uppercase text-white outline-none focus:border-brand-orange"
              />
           </div>
           <div className="flex gap-4">
              <button className="flex items-center gap-2 px-4 py-2 border border-brand-border font-mono text-[10px] uppercase tracking-widest text-brand-grey hover:text-white">
                 Export CSV <ChevronDown size={14} />
              </button>
           </div>
        </div>
        <table className="w-full text-left">
           <thead>
              <tr className="bg-brand-obsidian border-b border-brand-border font-mono text-[10px] uppercase tracking-widest text-brand-grey">
                 <th className="p-6">Product Identity</th>
                 <th className="p-6">Category</th>
                 <th className="p-6">Financials</th>
                 <th className="p-4">Inventory</th>
                 <th className="p-6 text-right">Actions</th>
              </tr>
           </thead>
           <tbody className="font-sans text-xs">
              {products.map((p) => (
                <tr key={p.id} className="border-b border-brand-border/50 hover:bg-brand-obsidian transition-colors group">
                   <td className="p-6">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 bg-brand-obsidian border border-brand-border flex items-center justify-center overflow-hidden grayscale group-hover:grayscale-0 transition-all">
                            <img src={p.image_url || "/images/systems-showcase.png"} className="w-full h-full object-cover" />
                         </div>
                         <div>
                            <span className="block font-display text-sm uppercase text-white">{p.name}</span>
                            <span className="block font-mono text-[8px] text-brand-grey uppercase tracking-widest">{p.brand} // {p.slug}</span>
                         </div>
                      </div>
                   </td>
                   <td className="p-6">
                      <span className="px-2 py-1 bg-brand-obsidian border border-brand-border font-mono text-[8px] uppercase tracking-widest text-brand-grey">
                        {p.product_categories?.name}
                      </span>
                   </td>
                   <td className="p-6">
                      <span className="font-display text-lg text-white">£{(p.price_gbp / 100).toLocaleString()}</span>
                   </td>
                   <td className="p-6">
                      <div className="flex items-center gap-2">
                        <div className={cn("w-2 h-2 rounded-full", p.stock_quantity > 10 ? "bg-green-500" : "bg-red-500")} />
                        <span className="font-mono text-xs text-brand-grey">{p.stock_quantity} UNITs</span>
                      </div>
                   </td>
                   <td className="p-6 text-right">
                      <div className="flex justify-end gap-3 text-brand-grey">
                         <Link href={`/admin/store/products/${p.slug}`} className="hover:text-brand-orange transition-colors"><Edit size={16} /></Link>
                         <button className="hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                      </div>
                   </td>
                </tr>
              ))}
           </tbody>
        </table>
      </div>
    </div>
  );
}
