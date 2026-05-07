"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { 
  Search, Plus, Upload, Download, Filter, ChevronDown,
  CheckSquare, Square, MoreHorizontal, Edit, Copy, Archive,
  AlertCircle, CheckCircle2, Image as ImageIcon, FileText,
  Package, Loader2, X, ChevronUp, Sparkles, Eye, Trash2
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  brand: string;
  slug: string;
  sku?: string;
  supplier_sku?: string;
  price_gbp: number;
  cost_price?: number;
  stock_quantity?: number;
  status?: string;
  is_active?: boolean;
  image_url?: string;
  description?: string;
  full_description?: string;
  specs?: any;
  category_id?: string;
  weight_kg?: number;
  product_categories?: { name: string; slug: string };
  updated_at?: string;
}

function calculateCompleteness(p: Product): number {
  let score = 0;
  if (p.image_url) score += 20;
  if ((p.full_description || p.description || "").length > 100) score += 20;
  if (p.price_gbp > 0) score += 15;
  if (p.category_id) score += 15;
  if (p.specs && Object.keys(p.specs).length > 0) score += 10;
  if (p.supplier_sku) score += 10;
  if (p.weight_kg && p.weight_kg > 0) score += 10;
  return score;
}

function CompletenessBadge({ score }: { score: number }) {
  const color = score >= 80 ? "text-emerald-600 bg-emerald-50 border-emerald-100" : score >= 40 ? "text-amber-600 bg-amber-50 border-amber-100" : "text-red-600 bg-red-50 border-red-100";
  return (
    <div className={cn("flex items-center gap-2 px-2 py-1 rounded border text-[10px] font-bold font-mono", color)}>
      {score}%
    </div>
  );
}

export default function ProductListPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [bulkAction, setBulkAction] = useState("");
  const [bulkLoading, setBulkLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [quickFilter, setQuickFilter] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    let query = supabase
      .from("products")
      .select("*, product_categories(name, slug)", { count: "exact" });

    if (search) {
      query = query.or(`name.ilike.%${search}%,slug.ilike.%${search}%,brand.ilike.%${search}%`);
    }

    if (quickFilter === 'no-image') query = query.is('image_url', null);
    if (quickFilter === 'no-desc') query = query.or('description.is.null,description.eq.""');
    if (quickFilter === 'low-stock') query = query.lte('stock_quantity', 5);
    if (quickFilter === 'active') query = query.eq('is_active', true);
    if (quickFilter === 'draft') query = query.eq('is_active', false);

    if (categoryFilter !== "all") query = query.eq("category_id", categoryFilter);

    query = query.order('updated_at', { ascending: false });

    const { data, error } = await query;
    if (!error && data) {
      setProducts(data as Product[]);
    }
    setLoading(false);
  }, [search, categoryFilter, quickFilter]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    supabase.from("product_categories").select("id, name").order("name").then(({ data }) => {
      if (data) setCategories(data);
    });
  }, []);

  const toggleAll = () => {
    if (selectedIds.size === products.length) setSelectedIds(new Set());
    else setSelectedIds(new Set(products.map(p => p.id)));
  };

  const toggleOne = (id: string) => {
    setSelectedIds(prev => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  const handleBulkAction = async () => {
    if (!bulkAction || selectedIds.size === 0) return;
    setBulkLoading(true);
    const ids = Array.from(selectedIds);

    if (bulkAction === "activate") {
      await supabase.from("products").update({ is_active: true }).in("id", ids);
    } else if (bulkAction === "draft") {
      await supabase.from("products").update({ is_active: false }).in("id", ids);
    } else if (bulkAction === "delete") {
      if (confirm(`Delete ${ids.length} products? This cannot be undone.`)) {
        await supabase.from("products").delete().in("id", ids);
      }
    }

    setBulkLoading(false);
    setBulkAction("");
    setSelectedIds(new Set());
    fetchProducts();
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tighter">Products</h1>
          <p className="text-slate-500 text-sm mt-1">Manage your storefront catalog and inventory</p>
        </div>
        <div className="flex items-center gap-3">
           <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 hover:text-slate-900 transition-all rounded-lg text-xs font-bold uppercase tracking-widest">
              <Download size={14} /> Export
           </button>
           <Link href="/admin/products/new" className="flex items-center gap-2 px-6 py-2 bg-brand-orange text-white rounded-lg hover:bg-slate-900 transition-all text-xs font-bold uppercase tracking-widest shadow-lg shadow-brand-orange/20">
              <Plus size={14} /> Add Product
           </Link>
        </div>
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap items-center gap-2">
         {[
           { id: 'no-image', label: 'No Image', color: 'text-red-600 bg-red-50 border-red-100', icon: XCircle },
           { id: 'no-desc', label: 'No Description', color: 'text-amber-600 bg-amber-50 border-amber-100', icon: AlertCircle },
           { id: 'low-stock', label: 'Low Stock', color: 'text-amber-600 bg-amber-50 border-amber-100', icon: Package },
           { id: 'active', label: 'Active', color: 'text-emerald-600 bg-emerald-50 border-emerald-100', icon: CheckCircle2 },
           { id: 'draft', label: 'Drafts', color: 'text-slate-600 bg-slate-50 border-slate-200', icon: Edit },
         ].map(f => (
           <button 
             key={f.id}
             onClick={() => setQuickFilter(quickFilter === f.id ? null : f.id)}
             className={cn(
               "flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-widest transition-all",
               quickFilter === f.id ? "ring-2 ring-brand-orange ring-offset-2" : "opacity-70 hover:opacity-100",
               f.color
             )}
           >
              {f.label}
           </button>
         ))}
         {quickFilter && (
           <button onClick={() => setQuickFilter(null)} className="text-slate-400 hover:text-slate-600 p-1">
             <X size={14} />
           </button>
         )}
      </div>

      {/* Toolbar */}
      <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-4">
           {/* Search */}
           <div className="relative flex-1 group">
             <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-orange transition-colors" />
             <input 
               type="text"
               value={search}
               onChange={e => setSearch(e.target.value)}
               placeholder="Search name, slug, brand..."
               className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all"
             />
           </div>

           {/* Category Filter */}
           <div className="relative">
              <select 
                value={categoryFilter}
                onChange={e => setCategoryFilter(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-orange/20 transition-all cursor-pointer"
              >
                <option value="all">All Categories</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
           </div>

           {/* Bulk Actions */}
           {selectedIds.size > 0 && (
             <div className="flex items-center gap-2 pl-4 border-l border-slate-200 animate-in slide-in-from-left-2 duration-300">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{selectedIds.size} Selected</span>
                <select 
                  value={bulkAction}
                  onChange={e => setBulkAction(e.target.value)}
                  className="px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 focus:outline-none"
                >
                  <option value="">Actions...</option>
                  <option value="activate">Set Active</option>
                  <option value="draft">Set Draft</option>
                  <option value="enrich">AI Enrich</option>
                  <option value="delete">Delete</option>
                </select>
                <button 
                  onClick={handleBulkAction}
                  disabled={!bulkAction || bulkLoading}
                  className="p-2 bg-slate-900 text-white rounded-lg hover:bg-brand-orange transition-all disabled:opacity-30"
                >
                  {bulkLoading ? <Loader2 size={16} className="animate-spin" /> : <ChevronUp size={16} className="rotate-90" />}
                </button>
             </div>
           )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 w-12">
                   <button onClick={toggleAll} className="text-slate-300 hover:text-slate-600 transition-colors">
                      {selectedIds.size === products.length ? <CheckSquare size={18} className="text-brand-orange" /> : <Square size={18} />}
                   </button>
                </th>
                <th className="px-4 py-4 w-16"></th>
                <th className="px-4 py-4 text-[10px] font-mono uppercase tracking-widest text-slate-400">Product</th>
                <th className="px-4 py-4 text-[10px] font-mono uppercase tracking-widest text-slate-400">Category</th>
                <th className="px-4 py-4 text-[10px] font-mono uppercase tracking-widest text-slate-400">Price</th>
                <th className="px-4 py-4 text-[10px] font-mono uppercase tracking-widest text-slate-400 text-center">Stock</th>
                <th className="px-4 py-4 text-[10px] font-mono uppercase tracking-widest text-slate-400 text-center">Completeness</th>
                <th className="px-6 py-4 text-[10px] font-mono uppercase tracking-widest text-slate-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={8} className="py-20 text-center">
                    <Loader2 size={24} className="animate-spin text-brand-orange mx-auto" />
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-20 text-center">
                    <Package size={40} className="mx-auto text-slate-200 mb-4" />
                    <p className="text-slate-500 text-sm italic">No products found matching your criteria</p>
                  </td>
                </tr>
              ) : (
                products.map(p => {
                  const score = calculateCompleteness(p);
                  const selected = selectedIds.has(p.id);
                  return (
                    <tr key={p.id} className={cn(
                      "hover:bg-slate-50/50 transition-colors group",
                      selected && "bg-brand-orange/5"
                    )}>
                      <td className="px-6 py-4">
                        <button onClick={() => toggleOne(p.id)} className="text-slate-300 hover:text-slate-600 transition-colors">
                          {selected ? <CheckSquare size={18} className="text-brand-orange" /> : <Square size={18} />}
                        </button>
                      </td>
                      <td className="px-4 py-4">
                        <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center overflow-hidden">
                          {p.image_url ? (
                            <img src={p.image_url} alt={p.name} className="w-full h-full object-contain" />
                          ) : (
                            <ImageIcon size={14} className="text-slate-300" />
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4 max-w-[240px]">
                        <Link href={`/admin/products/${p.id}`} className="block group/name">
                           <span className="block text-sm font-bold text-slate-900 group-hover/name:text-brand-orange transition-colors truncate">{p.name}</span>
                           <span className="block text-[10px] text-slate-400 uppercase tracking-tight font-mono mt-0.5">{p.brand} · {p.sku || p.slug}</span>
                        </Link>
                      </td>
                      <td className="px-4 py-4">
                         <span className="text-[11px] font-bold text-slate-600 uppercase tracking-widest">{p.product_categories?.name || "Uncategorized"}</span>
                      </td>
                      <td className="px-4 py-4">
                         <span className="text-sm font-bold text-slate-900">£{(p.price_gbp / 100).toFixed(2)}</span>
                      </td>
                      <td className="px-4 py-4 text-center">
                         <span className={cn(
                           "text-[11px] font-bold font-mono px-2 py-1 rounded",
                           (p.stock_quantity ?? 0) <= 5 ? "bg-red-50 text-red-600" : "bg-slate-50 text-slate-600"
                         )}>
                            {p.stock_quantity ?? 0}
                         </span>
                      </td>
                      <td className="px-4 py-4">
                         <div className="flex justify-center">
                           <CompletenessBadge score={score} />
                         </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                         <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Link href={`/admin/products/${p.id}`} className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all">
                               <Edit size={14} />
                            </Link>
                            <Link href={`/store/product/${p.slug}`} target="_blank" className="p-2 text-slate-400 hover:text-brand-orange hover:bg-slate-100 rounded-lg transition-all">
                               <Eye size={14} />
                            </Link>
                            <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                               <Trash2 size={14} />
                            </button>
                         </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

import { XCircle } from "lucide-react";
