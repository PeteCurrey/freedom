"use client";

import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Plus, Search, Filter, MoreVertical, Edit2, 
  Trash2, Download, Upload, AlertCircle, CheckCircle2,
  Package, ExternalLink, Archive, ChevronRight, X, Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface AdminProduct {
  id: string;
  name: string;
  sku: string;
  supplier_sku?: string;
  brand: string;
  category: string;
  price_gbp: number; // Updated from price to price_gbp to match DB
  cost_price?: number;
  stock_quantity: number;
  stock_status: 'in-stock' | 'low-stock' | 'out-of-stock';
  status: 'active' | 'draft' | 'archived';
  image?: string;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setProducts(data || []);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    if (!Array.isArray(products)) return [];
    return products.filter(p => {
      if (!p) return false;
      const name = p.name?.toLowerCase() || "";
      const sku = p.sku?.toLowerCase() || "";
      const brand = p.brand?.toLowerCase() || "";
      const search = searchTerm.toLowerCase();
      
      const matchesSearch = name.includes(search) || sku.includes(search) || brand.includes(search);
      const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [products, searchTerm, statusFilter]);

  const stats = useMemo(() => {
    const list = Array.isArray(products) ? products : [];
    return {
      total: list.length,
      active: list.filter(p => p?.status === 'active').length,
      draft: list.filter(p => p?.status === 'draft').length,
      oos: list.filter(p => p?.stock_status === 'out-of-stock').length,
    };
  }, [products]);

  const calculateMargin = (price: number, cost: number | undefined) => {
    if (!cost || !price) return null;
    const priceExVat = (price / 100) / 1.2;
    const costInPounds = cost / 100;
    if (priceExVat <= 0) return null;
    return ((priceExVat - costInPounds) / priceExVat) * 100;
  };

  const getMarginColor = (margin: number | null) => {
    if (margin === null) return "text-slate-400";
    if (margin < 20) return "text-red-500";
    if (margin < 40) return "text-amber-500";
    return "text-emerald-500";
  };

  const getStockBadge = (status: string | undefined, qty: number | undefined) => {
    const stockQty = qty || 0;
    switch (status) {
      case 'in-stock': return <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-full text-[9px] font-bold uppercase">{stockQty} IN STOCK</span>;
      case 'low-stock': return <span className="px-2 py-0.5 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-full text-[9px] font-bold uppercase">{stockQty} LOW</span>;
      default: return <span className="px-2 py-0.5 bg-red-500/10 text-red-500 border border-red-500/20 rounded-full text-[9px] font-bold uppercase">OUT OF STOCK</span>;
    }
  };

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="font-display text-4xl uppercase tracking-tighter text-slate-900">Products</h1>
          <p className="text-slate-500 text-sm mt-1">
            {stats.total} products · {stats.active} active · {stats.draft} draft · {stats.oos} out of stock
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-3 border border-slate-200 text-slate-600 font-display text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all font-bold flex items-center gap-2">
            <Download size={14} /> Export
          </button>
          <button className="px-6 py-3 border border-slate-200 text-slate-600 font-display text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all font-bold flex items-center gap-2">
            <Upload size={14} /> Import CSV
          </button>
          <Link href="/admin/products/new" className="px-8 py-3 bg-brand-orange text-white font-display text-[10px] uppercase tracking-widest hover:bg-slate-900 transition-all font-bold shadow-lg shadow-brand-orange/20 flex items-center gap-2">
            <Plus size={16} /> Add Product
          </Link>
        </div>
      </div>

      {/* Quick Filters */}
      <div className="flex gap-4">
        {[
          { label: 'All Products', count: stats.total, filter: 'all', color: 'bg-slate-900' },
          { label: 'Active', count: stats.active, filter: 'active', color: 'bg-emerald-500' },
          { label: 'Drafts', count: stats.draft, filter: 'draft', color: 'bg-amber-500' },
          { label: 'Low Stock', count: (Array.isArray(products) ? products : []).filter(p => p?.stock_status === 'low-stock').length, filter: 'low', color: 'bg-orange-500' },
          { label: 'No Image', count: (Array.isArray(products) ? products : []).filter(p => !p?.image).length, filter: 'no-image', color: 'bg-red-500' },
        ].map((q) => (
          <button 
            key={q.filter}
            onClick={() => setStatusFilter(q.filter)}
            className={cn(
              "flex items-center gap-3 px-4 py-2 bg-white border rounded-xl shadow-sm hover:border-brand-orange transition-all group",
              statusFilter === q.filter ? "border-brand-orange ring-1 ring-brand-orange/20" : "border-slate-200"
            )}
          >
            <div className={cn("w-2 h-2 rounded-full", q.color)} />
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600">{q.label}</span>
            <span className="text-[10px] font-mono text-slate-400 group-hover:text-brand-orange">{q.count}</span>
          </button>
        ))}
      </div>

      {/* Toolbar */}
      <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 group">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-orange transition-colors" />
          <input 
            type="text" 
            placeholder="Search by name, SKU, or brand..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/20 transition-all"
          />
        </div>
        <button className="px-6 py-3 border border-slate-200 text-slate-600 font-display text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all font-bold flex items-center gap-2">
          <Filter size={14} /> Filters
        </button>
      </div>

      {/* Product Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-mono uppercase tracking-widest text-slate-400">
                <th className="px-6 py-4 w-12">
                  <input 
                    type="checkbox" 
                    className="rounded border-slate-300 text-brand-orange focus:ring-brand-orange"
                    checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                    onChange={(e) => setSelectedProducts(e.target.checked ? filteredProducts.map(p => p.id) : [])}
                  />
                </th>
                <th className="px-6 py-4">Product Details</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Pricing</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Health</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={8} className="py-20 text-center">
                    <div className="w-10 h-10 border-t-2 border-brand-orange animate-spin rounded-full mx-auto mb-4" />
                    <p className="font-mono text-[10px] uppercase tracking-widest text-slate-400">Loading Technical Registry...</p>
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-20 text-center">
                    <Package size={48} className="mx-auto text-slate-200 mb-4" />
                    <p className="text-slate-500 font-display text-lg uppercase tracking-tight">No products found</p>
                    <Link href="/admin/products/new" className="text-brand-orange font-mono text-[10px] uppercase tracking-widest mt-2 block hover:underline">Create your first product →</Link>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => {
                  const margin = calculateMargin(product.price_gbp, product.cost_price);
                  return (
                    <tr key={product.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <input 
                          type="checkbox" 
                          className="rounded border-slate-300 text-brand-orange focus:ring-brand-orange"
                          checked={selectedProducts.includes(product.id)}
                          onChange={() => setSelectedProducts(prev => 
                            prev.includes(product.id) ? prev.filter(id => id !== product.id) : [...prev, product.id]
                          )}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-slate-100 border border-slate-200 rounded-lg overflow-hidden flex items-center justify-center shrink-0">
                            {product.image ? (
                              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                            ) : (
                              <Package size={20} className="text-slate-300" />
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900 leading-tight">{product.name}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[10px] font-mono text-slate-400 uppercase">{product.brand}</span>
                              <span className="text-slate-200">•</span>
                              <span className="text-[10px] font-mono text-slate-400">{product.sku || 'NO SKU'}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest bg-slate-100 px-2 py-1 rounded">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-900">£{(product.price_gbp / 100 || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                          <span className="text-[9px] text-slate-400 font-mono">COST: £{((product.cost_price || 0) / 100).toLocaleString(undefined, { minimumFractionDigits: 2 }) || '—'}</span>
                          {margin !== null && (
                            <span className={cn("text-[9px] font-bold mt-1", getMarginColor(margin))}>
                              {margin.toFixed(1)}% MARGIN
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {getStockBadge(product.stock_status, product.stock_quantity)}
                      </td>
                      <td className="px-6 py-4">
                        <div className={cn(
                          "inline-flex items-center gap-1.5 px-2 py-1 rounded-full border text-[9px] font-bold uppercase tracking-widest",
                          product.status === 'active' ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500" :
                          product.status === 'draft' ? "bg-amber-500/10 border-amber-500/20 text-amber-500" :
                          "bg-slate-100 border-slate-200 text-slate-400"
                        )}>
                          <div className={cn("w-1 h-1 rounded-full", 
                            product.status === 'active' ? "bg-emerald-500" : 
                            product.status === 'draft' ? "bg-amber-500" : "bg-slate-400"
                          )} />
                          {product.status}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-brand-orange w-3/4" /> {/* Mock health score */}
                        </div>
                        <span className="text-[9px] font-mono text-slate-400 mt-1 block uppercase">75% Complete</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Link href={`/admin/products/${product.id}`} className="p-2 text-slate-400 hover:text-brand-orange hover:bg-slate-100 rounded-lg transition-all">
                            <Edit2 size={14} />
                          </Link>
                          <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-slate-100 rounded-lg transition-all">
                            <Trash2 size={14} />
                          </button>
                          <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all">
                            <MoreVertical size={14} />
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

      {/* Bulk Actions Bar */}
      {selectedProducts.length > 0 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-8 py-4 rounded-2xl shadow-2xl z-[100] flex items-center gap-8 animate-in slide-in-from-bottom-8 duration-300">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-brand-orange font-bold">
            {selectedProducts.length} Selected
          </span>
          <div className="h-4 w-px bg-slate-700" />
          <div className="flex gap-4">
            <button className="text-[10px] font-bold uppercase tracking-widest hover:text-brand-orange transition-colors">Set Status</button>
            <button className="text-[10px] font-bold uppercase tracking-widest hover:text-brand-orange transition-colors">Set Category</button>
            <button className="text-[10px] font-bold uppercase tracking-widest hover:text-brand-orange transition-colors flex items-center gap-2">
              <Sparkles size={12} className="text-brand-orange" /> AI Enrich
            </button>
            <button className="text-[10px] font-bold uppercase tracking-widest text-red-500 hover:text-red-400 transition-colors">Delete</button>
          </div>
          <button onClick={() => setSelectedProducts([])} className="p-1 hover:bg-slate-800 rounded-full transition-colors">
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
