"use client";

import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Plus, Search, Edit2, Trash2, ExternalLink, 
  TrendingUp, MousePointerClick, DollarSign,
  Package, Info, Tag
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface AffiliateProduct {
  id: string;
  name: string;
  brand: string;
  programme: string;
  commission_type: 'percentage' | 'fixed';
  commission_value: number;
  destination_url: string;
  image_url?: string;
  clicks_30d: number;
  est_earnings_30d: number;
  featured_pages_count: number;
  status: 'active' | 'paused';
}

export default function AdminAffiliateProductsPage() {
  const [products, setProducts] = useState<AffiliateProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchAffiliateProducts() {
      setLoading(true);
      // In a real app, we'd query the affiliate_products table
      const { data } = await supabase
        .from('affiliate_products')
        .select('*')
        .order('created_at', { ascending: false });

      if (data) {
        setProducts(data as AffiliateProduct[]);
      } else {
        // Mocking some data for the UI demonstration as requested if table is empty
        // In a real scenario, we'd wait for actual data
      }
      setLoading(false);
    }
    fetchAffiliateProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="font-display text-4xl uppercase tracking-tighter text-slate-900">Affiliate Products</h1>
          <p className="text-slate-500 text-sm mt-1">
            {products.length} active | Estimated £{products.reduce((sum, p) => sum + (p.est_earnings_30d || 0), 0).toLocaleString()} earned this month
          </p>
        </div>
        <Link href="/admin/affiliate/products/new" className="px-8 py-3 bg-brand-orange text-white font-display text-[10px] uppercase tracking-widest hover:bg-slate-900 transition-all font-bold shadow-lg shadow-brand-orange/20 flex items-center gap-2">
          <Plus size={16} /> Add Affiliate Product
        </Link>
      </div>

      {/* Toolbar */}
      <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 group">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-orange transition-colors" />
          <input 
            type="text" 
            placeholder="Search by name or brand..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/20 transition-all"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-mono uppercase tracking-widest text-slate-400">
                <th className="px-6 py-4">Product Details</th>
                <th className="px-6 py-4">Brand / Programme</th>
                <th className="px-6 py-4">Commission</th>
                <th className="px-6 py-4">Destination</th>
                <th className="px-6 py-4">Performance (30D)</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-20 text-center text-slate-400 font-mono text-[10px] uppercase tracking-widest">
                    Synchronizing Affiliate Network...
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-20 text-center">
                    <TrendingUp size={48} className="mx-auto text-slate-200 mb-4" />
                    <p className="text-slate-500 font-display text-lg uppercase tracking-tight">No affiliate products found</p>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-100 border border-slate-200 rounded-lg overflow-hidden flex items-center justify-center shrink-0">
                           {p.image_url ? (
                             <img src={p.image_url} alt={p.name} className="w-full h-full object-cover" />
                           ) : (
                             <ExternalLink size={20} className="text-slate-300" />
                           )}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900 leading-tight">{p.name}</p>
                          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-tight">Linked on {p.featured_pages_count} pages</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                         <span className="text-xs font-bold text-slate-900 uppercase tracking-tight">{p.brand}</span>
                         <span className="text-[10px] text-slate-400 font-mono mt-0.5">{p.programme}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                       <span className="text-sm font-bold text-slate-900">
                         {p.commission_type === 'percentage' ? `${p.commission_value}%` : `£${p.commission_value}/sale`}
                       </span>
                    </td>
                    <td className="px-6 py-4">
                       <div className="flex items-center gap-2 text-brand-orange">
                          <ExternalLink size={12} />
                          <span className="text-[10px] font-mono truncate max-w-[150px]">{p.destination_url}</span>
                       </div>
                    </td>
                    <td className="px-6 py-4">
                       <div className="flex items-center gap-6">
                          <div className="flex flex-col">
                             <span className="text-xs font-bold text-slate-900">{p.clicks_30d || 0} CLICKS</span>
                             <span className="text-[9px] font-mono text-slate-400 uppercase">30D Traffic</span>
                          </div>
                          <div className="flex flex-col">
                             <span className="text-xs font-bold text-emerald-600">£{p.est_earnings_30d?.toLocaleString() || '0'}</span>
                             <span className="text-[9px] font-mono text-emerald-500 uppercase tracking-widest">Est. Earned</span>
                          </div>
                       </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={cn(
                        "inline-flex items-center gap-1.5 px-2 py-1 rounded-full border text-[9px] font-bold uppercase tracking-widest",
                        p.status === 'active' ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500" : "bg-slate-100 border-slate-200 text-slate-400"
                      )}>
                        <div className={cn("w-1 h-1 rounded-full", p.status === 'active' ? "bg-emerald-500" : "bg-slate-400")} />
                        {p.status}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link href={`/admin/affiliate/products/${p.id}`} className="p-2 text-slate-400 hover:text-brand-orange hover:bg-slate-100 rounded-lg transition-all">
                          <Edit2 size={14} />
                        </Link>
                        <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-slate-100 rounded-lg transition-all">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
