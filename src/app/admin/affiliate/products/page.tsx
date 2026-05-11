"use client";

import { useState, useEffect } from "react";
import { Search, Percent, Package, Star, TrendingUp, AlertCircle, CheckCircle2, Loader2, ChevronRight, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AffiliateProductsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [showAll]);

  async function fetchProducts() {
    setLoading(true);
    let query = supabase
      .from("products")
      .select("*")
      .order("name");
    
    if (!showAll) {
      query = query.eq("is_affiliate", true);
    }

    const { data } = await query;
    setProducts(data || []);
    setLoading(false);
  }

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.sku?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tighter flex items-center gap-3">
             <Package className="text-brand-orange" /> Commissionable Products
          </h1>
          <p className="text-slate-500 text-sm mt-1">Manage affiliate rates and visibility for your technical catalogue</p>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
          <button 
            onClick={() => setShowAll(false)}
            className={cn(
              "px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-md transition-all",
              !showAll ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-600"
            )}
          >
            Affiliate Only
          </button>
          <button 
            onClick={() => setShowAll(true)}
            className={cn(
              "px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-md transition-all",
              showAll ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-600"
            )}
          >
            Show All Catalog
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search registry by name or SKU..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-mono uppercase tracking-widest text-slate-400">
              <th className="px-6 py-4">Product Asset</th>
              <th className="px-6 py-4 text-center">Retail Price</th>
              <th className="px-6 py-4 text-center">Commission Rate</th>
              <th className="px-6 py-4 text-center">Status</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-20 text-center">
                  <Loader2 className="w-8 h-8 text-brand-orange animate-spin mx-auto mb-4" />
                  <p className="font-mono text-[10px] uppercase text-slate-400 tracking-widest">Accessing Registry...</p>
                </td>
              </tr>
            ) : filteredProducts.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-20 text-center">
                  <p className="text-slate-400 text-sm">No products found matching your criteria.</p>
                </td>
              </tr>
            ) : filteredProducts.map(p => (
              <tr 
                key={p.id} 
                onClick={() => router.push(`/admin/products/${p.id}`)}
                className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-100 rounded border border-slate-200 overflow-hidden shrink-0">
                      <img src={p.image_url || '/images/placeholder-product.png'} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 group-hover:text-brand-orange transition-colors">{p.name}</p>
                      <p className="text-[10px] text-slate-400 font-mono">{p.sku || 'NO-SKU'}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-center text-sm font-bold text-slate-600">£{(p.price_gbp / 100).toFixed(2)}</td>
                <td className="px-6 py-4 text-center">
                  <div className="flex flex-col items-center">
                    <span className="text-sm font-bold text-emerald-600">{p.commission_rate || '0%'}</span>
                    {p.commission_rate?.includes('%') && (
                      <span className="text-[9px] text-slate-400 font-mono">
                        (£{((p.price_gbp / 100) * parseFloat(p.commission_rate) / 100).toFixed(2)})
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={cn(
                    "text-[8px] font-bold uppercase px-2 py-1 rounded border tracking-widest",
                    p.is_affiliate ? "text-emerald-600 bg-emerald-50 border-emerald-200" : "text-slate-400 bg-slate-50 border-slate-200"
                  )}>
                    {p.is_affiliate ? 'Affiliate Live' : 'Standard Catalog'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 text-slate-300 group-hover:text-brand-orange transition-colors">
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">Edit Asset</span>
                    <ChevronRight size={14} />
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
