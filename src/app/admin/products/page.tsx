"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { 
  Search, Plus, Upload, Download, Filter, ChevronDown,
  CheckSquare, Square, MoreHorizontal, Edit, Copy, Archive,
  AlertCircle, CheckCircle2, Image as ImageIcon, FileText,
  Package, Loader2, X, ChevronUp
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  brand: string;
  slug: string;
  sku?: string;
  internal_sku?: string;
  price_gbp: number;
  cost_price?: number;
  stock_quantity?: number;
  status?: string;
  is_active?: boolean;
  is_featured?: boolean;
  is_editor_pick?: boolean;
  images?: string[];
  description?: string;
  spec_line?: string;
  specs?: any;
  category_id?: string;
  supplier_id?: string;
  system_tier?: string;
  low_stock_threshold?: number;
  product_categories?: { name: string; slug: string };
  updated_at?: string;
}

function completenessScore(p: Product): number {
  let score = 0;
  if (p.name) score += 15;
  if (p.price_gbp) score += 15;
  if (p.description && p.description.length > 100) score += 20;
  if (p.images && p.images.length > 0) score += 20;
  if (p.category_id) score += 10;
  if (p.specs && Object.keys(p.specs).length > 0) score += 10;
  if (p.sku || p.internal_sku) score += 10;
  return score;
}

function CompletenessBar({ score }: { score: number }) {
  const color = score >= 80 ? "bg-green-500" : score >= 40 ? "bg-amber-500" : "bg-red-500";
  const textColor = score >= 80 ? "text-green-400" : score >= 40 ? "text-amber-400" : "text-red-400";
  return (
    <div className="flex items-center gap-2">
      <div className="w-16 h-1.5 bg-[#2a2a2a] rounded-full overflow-hidden">
        <div className={cn("h-full rounded-full transition-all", color)} style={{ width: `${score}%` }} />
      </div>
      <span className={cn("font-mono text-[9px]", textColor)}>{score}%</span>
    </div>
  );
}

function StatusBadge({ status, isActive }: { status?: string; isActive?: boolean }) {
  const s = status || (isActive ? "active" : "draft");
  const styles: Record<string, string> = {
    active: "bg-green-900/40 text-green-400 border border-green-800",
    draft: "bg-amber-900/40 text-amber-400 border border-amber-800",
    archived: "bg-[#2a2a2a] text-[#555] border border-[#333]",
  };
  return (
    <span className={cn("font-mono text-[8px] uppercase tracking-widest px-2 py-0.5", styles[s] || styles.draft)}>
      {s}
    </span>
  );
}

type SortKey = "name" | "price_gbp" | "stock_quantity" | "updated_at";

export default function ProductListPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [sortKey, setSortKey] = useState<SortKey>("updated_at");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const [perPage] = useState(50);
  const [total, setTotal] = useState(0);
  const [bulkAction, setBulkAction] = useState("");
  const [bulkLoading, setBulkLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [categoryFilter, setCategoryFilter] = useState("all");

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    let query = supabase
      .from("products")
      .select("*, product_categories(name, slug)", { count: "exact" });

    if (search) {
      query = query.or(`name.ilike.%${search}%,sku.ilike.%${search}%,internal_sku.ilike.%${search}%,brand.ilike.%${search}%`);
    }
    if (statusFilter === "active") query = query.eq("is_active", true);
    else if (statusFilter === "draft") query = query.eq("is_active", false);
    else if (statusFilter === "archived") query = query.eq("status", "archived");

    if (categoryFilter !== "all") query = query.eq("category_id", categoryFilter);

    const from = (page - 1) * perPage;
    query = query.range(from, from + perPage - 1).order(sortKey, { ascending: sortDir === "asc" });

    const { data, count, error } = await query;
    if (!error && data) {
      setProducts(data as Product[]);
      setTotal(count || 0);
    }
    setLoading(false);
  }, [search, statusFilter, categoryFilter, page, sortKey, sortDir, perPage]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    supabase.from("product_categories").select("id, name").order("name").then(({ data }) => {
      if (data) setCategories(data);
    });
  }, []);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("asc"); }
  };

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
      await supabase.from("products").update({ is_active: true, status: "active" }).in("id", ids);
    } else if (bulkAction === "draft") {
      await supabase.from("products").update({ is_active: false, status: "draft" }).in("id", ids);
    } else if (bulkAction === "archive") {
      await supabase.from("products").update({ is_active: false, status: "archived" }).in("id", ids);
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

  const exportCSV = () => {
    const rows = products.filter(p => selectedIds.size === 0 || selectedIds.has(p.id));
    const headers = ["name", "brand", "sku", "price_gbp", "stock_quantity", "status"];
    const csv = [headers.join(","), ...rows.map(r => headers.map(h => JSON.stringify((r as any)[h] || "")).join(","))].join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = document.createElement("a"); a.href = url; a.download = "products.csv"; a.click();
  };

  const SortIcon = ({ k }: { k: SortKey }) => {
    if (sortKey !== k) return null;
    return sortDir === "asc" ? <ChevronUp size={10} /> : <ChevronDown size={10} />;
  };

  const totalPages = Math.ceil(total / perPage);

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      {/* Page Header */}
      <div className="sticky top-0 z-20 bg-[#0f0f0f] border-b border-[#1e1e1e] px-6 py-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="font-display text-2xl uppercase tracking-tight">Products</h1>
            <p className="font-mono text-[10px] text-[#555] uppercase tracking-widest mt-0.5">{total} total products</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={exportCSV} className="flex items-center gap-2 px-4 py-2 border border-[#2a2a2a] text-[#888] hover:text-white hover:border-[#444] transition-colors font-mono text-[10px] uppercase tracking-widest">
              <Download size={13} /> Export
            </button>
            <Link href="/admin/products/import" className="flex items-center gap-2 px-4 py-2 border border-[#2a2a2a] text-[#888] hover:text-white hover:border-[#444] transition-colors font-mono text-[10px] uppercase tracking-widest">
              <Upload size={13} /> Import CSV
            </Link>
            <Link href="/admin/products/new" className="flex items-center gap-2 px-4 py-2 bg-brand-orange text-white hover:bg-white hover:text-brand-obsidian transition-colors font-mono text-[10px] uppercase tracking-widest">
              <Plus size={13} /> Add Product
            </Link>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-3 mt-4 flex-wrap">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px] max-w-xs">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555]" />
            <input
              type="text"
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search products, SKU, brand..."
              className="w-full pl-9 pr-4 py-2 bg-[#1a1a1a] border border-[#2a2a2a] text-white text-xs font-mono placeholder-[#444] focus:border-brand-orange focus:outline-none"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={e => { setStatusFilter(e.target.value); setPage(1); }}
            className="px-3 py-2 bg-[#1a1a1a] border border-[#2a2a2a] text-[#888] text-xs font-mono focus:border-brand-orange focus:outline-none"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={e => { setCategoryFilter(e.target.value); setPage(1); }}
            className="px-3 py-2 bg-[#1a1a1a] border border-[#2a2a2a] text-[#888] text-xs font-mono focus:border-brand-orange focus:outline-none"
          >
            <option value="all">All Categories</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>

          {/* Bulk Actions */}
          {selectedIds.size > 0 && (
            <div className="flex items-center gap-2 border border-brand-orange/30 bg-brand-orange/5 px-3 py-1.5">
              <span className="font-mono text-[9px] text-brand-orange uppercase tracking-widest">{selectedIds.size} selected</span>
              <select
                value={bulkAction}
                onChange={e => setBulkAction(e.target.value)}
                className="bg-transparent text-[#888] text-xs font-mono border-l border-brand-orange/20 pl-2 ml-1 focus:outline-none"
              >
                <option value="">Bulk action...</option>
                <option value="activate">Set Active</option>
                <option value="draft">Set Draft</option>
                <option value="archive">Archive</option>
                <option value="delete">Delete</option>
              </select>
              <button onClick={handleBulkAction} disabled={!bulkAction || bulkLoading} className="px-3 py-1 bg-brand-orange text-white font-mono text-[9px] uppercase tracking-widest hover:bg-white hover:text-brand-obsidian transition-colors disabled:opacity-40">
                {bulkLoading ? <Loader2 size={12} className="animate-spin" /> : "Apply"}
              </button>
              <button onClick={() => setSelectedIds(new Set())} className="text-[#555] hover:text-white transition-colors">
                <X size={13} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="px-6 pb-12">
        {loading ? (
          <div className="flex items-center justify-center py-32">
            <Loader2 size={24} className="animate-spin text-brand-orange" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-32">
            <Package size={40} className="mx-auto text-[#333] mb-4" />
            <p className="font-mono text-[11px] text-[#555] uppercase tracking-widest">No products found</p>
            <Link href="/admin/products/new" className="inline-block mt-6 px-6 py-2 bg-brand-orange text-white font-mono text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-obsidian transition-colors">
              Add First Product
            </Link>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#1e1e1e]">
                <th className="py-3 px-2 w-8">
                  <button onClick={toggleAll} className="text-[#555] hover:text-white transition-colors">
                    {selectedIds.size === products.length ? <CheckSquare size={14} className="text-brand-orange" /> : <Square size={14} />}
                  </button>
                </th>
                <th className="py-3 px-2 w-10">{/* img */}</th>
                <th className="py-3 px-2 cursor-pointer select-none" onClick={() => toggleSort("name")}>
                  <span className="flex items-center gap-1 font-mono text-[9px] uppercase tracking-widest text-[#555] hover:text-white transition-colors">
                    Product <SortIcon k="name" />
                  </span>
                </th>
                <th className="py-3 px-2 hidden md:table-cell">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#555]">Category</span>
                </th>
                <th className="py-3 px-2 cursor-pointer select-none" onClick={() => toggleSort("price_gbp")}>
                  <span className="flex items-center gap-1 font-mono text-[9px] uppercase tracking-widest text-[#555] hover:text-white transition-colors">
                    Price <SortIcon k="price_gbp" />
                  </span>
                </th>
                <th className="py-3 px-2 hidden lg:table-cell cursor-pointer select-none" onClick={() => toggleSort("stock_quantity")}>
                  <span className="flex items-center gap-1 font-mono text-[9px] uppercase tracking-widest text-[#555] hover:text-white transition-colors">
                    Stock <SortIcon k="stock_quantity" />
                  </span>
                </th>
                <th className="py-3 px-2">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#555]">Status</span>
                </th>
                <th className="py-3 px-2 hidden xl:table-cell">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#555]">Complete</span>
                </th>
                <th className="py-3 px-2 w-20">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#555]">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => {
                const score = completenessScore(product);
                const selected = selectedIds.has(product.id);
                const stockQty = product.stock_quantity ?? 0;
                const threshold = product.low_stock_threshold ?? 5;
                const stockColor = stockQty === 0 ? "text-red-400" : stockQty <= threshold ? "text-amber-400" : "text-[#888]";

                return (
                  <tr
                    key={product.id}
                    className={cn(
                      "border-b border-[#1a1a1a] hover:bg-[#141414] transition-colors group",
                      selected && "bg-brand-orange/5 border-brand-orange/10"
                    )}
                  >
                    <td className="py-3 px-2">
                      <button onClick={() => toggleOne(product.id)} className="text-[#555] hover:text-white transition-colors">
                        {selected ? <CheckSquare size={14} className="text-brand-orange" /> : <Square size={14} />}
                      </button>
                    </td>
                    <td className="py-3 px-2">
                      <div className="w-9 h-9 bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center overflow-hidden">
                        {product.images?.[0] ? (
                          <img src={product.images[0]} alt={product.name} className="w-full h-full object-contain" />
                        ) : (
                          <ImageIcon size={12} className="text-[#333]" />
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-2 max-w-[200px]">
                      <Link href={`/admin/products/${product.id}`} className="block group/name">
                        <span className="font-sans text-sm text-white group-hover/name:text-brand-orange transition-colors line-clamp-1">
                          {product.name}
                        </span>
                        <span className="font-mono text-[9px] text-[#444] block mt-0.5">
                          {product.brand}
                          {product.sku && <> · {product.sku}</>}
                        </span>
                      </Link>
                    </td>
                    <td className="py-3 px-2 hidden md:table-cell">
                      <span className="font-mono text-[9px] text-[#666]">
                        {(product as any).product_categories?.name || "—"}
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      <div>
                        <span className="font-mono text-xs text-white">£{(product.price_gbp / 100).toFixed(2)}</span>
                        {product.cost_price ? (
                          <span className="font-mono text-[9px] text-[#444] block">cost £{(product.cost_price / 100).toFixed(2)}</span>
                        ) : null}
                      </div>
                    </td>
                    <td className="py-3 px-2 hidden lg:table-cell">
                      <span className={cn("font-mono text-xs", stockColor)}>
                        {stockQty}
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      <StatusBadge status={product.status} isActive={product.is_active} />
                    </td>
                    <td className="py-3 px-2 hidden xl:table-cell">
                      <CompletenessBar score={score} />
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link href={`/admin/products/${product.id}`} className="p-1.5 text-[#555] hover:text-white hover:bg-[#2a2a2a] transition-colors" title="Edit">
                          <Edit size={13} />
                        </Link>
                        <Link href={`/store/product/${product.slug}`} target="_blank" className="p-1.5 text-[#555] hover:text-brand-orange hover:bg-[#2a2a2a] transition-colors" title="View in store">
                          <FileText size={13} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <span className="font-mono text-[10px] text-[#555]">
              Showing {((page - 1) * perPage) + 1}–{Math.min(page * perPage, total)} of {total}
            </span>
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                const p = i + 1;
                return (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={cn(
                      "w-8 h-8 font-mono text-[10px] transition-colors",
                      p === page ? "bg-brand-orange text-white" : "text-[#555] hover:text-white hover:bg-[#1a1a1a]"
                    )}
                  >
                    {p}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
