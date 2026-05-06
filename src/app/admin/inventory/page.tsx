"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Archive, 
  Search, 
  Filter, 
  ArrowUpDown, 
  Plus, 
  Minus, 
  Loader2, 
  Check, 
  X,
  AlertTriangle,
  History,
  Download
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function InventoryPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all"); // all, low, out
  const [editingId, setEditingId] = useState<string | null>(null);
  const [adjustment, setAdjustment] = useState<number>(0);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("products")
      .select("id, name, sku, brand, stock_quantity, low_stock_threshold, status")
      .order("stock_quantity", { ascending: true });
    
    setProducts(data || []);
    setLoading(false);
  };

  const handleAdjust = async (id: string) => {
    const product = products.find(p => p.id === id);
    if (!product) return;

    const newQty = (product.stock_quantity || 0) + adjustment;
    
    try {
      const { error } = await supabase
        .from("products")
        .update({ stock_quantity: Math.max(0, newQty) })
        .eq("id", id);
      
      if (error) throw error;
      
      setProducts(prev => prev.map(p => 
        p.id === id ? { ...p, stock_quantity: Math.max(0, newQty) } : p
      ));
      setEditingId(null);
      setAdjustment(0);
    } catch (error) {
      console.error("Error adjusting stock:", error);
    }
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.sku?.toLowerCase().includes(searchTerm.toLowerCase());
    const isOut = (p.stock_quantity || 0) === 0;
    const isLow = (p.stock_quantity || 0) <= (p.low_stock_threshold || 5);
    
    if (filter === "out") return matchesSearch && isOut;
    if (filter === "low") return matchesSearch && isLow;
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-[1400px] mx-auto px-8 py-12">
        {/* Header */}
        <div className="mb-12 flex justify-between items-end">
          <div>
            <h1 className="font-display text-5xl uppercase tracking-tighter text-gray-900">
              Inventory <span className="text-brand-orange">Management</span>
            </h1>
            <p className="font-sans text-gray-500 mt-2">Track real-time stock levels, manage thresholds, and process adjustments.</p>
          </div>
          <div className="flex gap-4">
             <button className="flex items-center gap-2 px-6 py-4 border border-gray-200 font-mono text-[10px] uppercase tracking-widest text-gray-500 hover:text-brand-orange hover:border-brand-orange transition-all">
                <Download size={14} /> Export Report
             </button>
             <button className="flex items-center gap-2 px-6 py-4 border border-gray-200 font-mono text-[10px] uppercase tracking-widest text-gray-500 hover:text-brand-orange hover:border-brand-orange transition-all">
                <History size={14} /> Adjustment Log
             </button>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Total SKUs", value: products.length, color: "text-gray-900" },
            { label: "Out of Stock", value: products.filter(p => (p.stock_quantity || 0) === 0).length, color: "text-red-600" },
            { label: "Low Stock Items", value: products.filter(p => (p.stock_quantity || 0) > 0 && (p.stock_quantity || 0) <= (p.low_stock_threshold || 5)).length, color: "text-orange-600" },
            { label: "Total Units", value: products.reduce((acc, p) => acc + (p.stock_quantity || 0), 0), color: "text-brand-orange" }
          ].map((stat, i) => (
            <div key={i} className="bg-white border border-gray-200 p-6 shadow-sm">
              <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-gray-400 mb-2">{stat.label}</span>
              <span className={cn("font-display text-3xl", stat.color)}>{stat.value}</span>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="bg-white border border-gray-200 p-4 mb-6 flex justify-between items-center shadow-sm">
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
            <input 
              type="text" 
              placeholder="Search by SKU, name or brand..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-100 font-mono text-[11px] uppercase outline-none focus:border-brand-orange bg-gray-50/50"
            />
          </div>
          <div className="flex gap-4">
            <div className="flex bg-gray-50 border border-gray-100 p-1">
              {["all", "low", "out"].map(f => (
                <button 
                  key={f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "px-4 py-2 font-mono text-[9px] uppercase tracking-widest transition-all",
                    filter === f ? "bg-white text-brand-orange shadow-sm border border-gray-100" : "text-gray-400 hover:text-gray-600"
                  )}
                >
                  {f === 'all' ? 'Show All' : f === 'low' ? 'Low Stock' : 'Out of Stock'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 font-mono text-[10px] uppercase tracking-widest text-gray-400">
                <th className="p-6">Product Item</th>
                <th className="p-6">SKU / Brand</th>
                <th className="p-6">Status</th>
                <th className="p-6">Stock Level</th>
                <th className="p-6">Threshold</th>
                <th className="p-6 text-right">Quick Adjust</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {loading ? (
                <tr><td colSpan={6} className="p-20 text-center"><Loader2 className="animate-spin mx-auto text-brand-orange" /></td></tr>
              ) : filteredProducts.map(p => (
                <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors group">
                  <td className="p-6">
                    <Link href={`/admin/products/${p.id}`} className="font-display text-sm uppercase text-gray-900 hover:text-brand-orange transition-colors">
                      {p.name}
                    </Link>
                  </td>
                  <td className="p-6 font-mono text-[10px] text-gray-400 uppercase tracking-widest">
                    {p.sku || "N/A"} <span className="mx-2 text-gray-200">//</span> {p.brand}
                  </td>
                  <td className="p-6">
                    <span className={cn(
                      "px-2 py-1 font-mono text-[8px] uppercase tracking-widest border",
                      p.status === 'active' ? "bg-green-50 text-green-600 border-green-100" : "bg-gray-50 text-gray-400 border-gray-100"
                    )}>
                      {p.status || 'Draft'}
                    </span>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        (p.stock_quantity || 0) === 0 ? "bg-red-500" : (p.stock_quantity || 0) <= (p.low_stock_threshold || 5) ? "bg-orange-500" : "bg-green-500"
                      )} />
                      <span className={cn(
                        "font-mono text-xs font-bold",
                        (p.stock_quantity || 0) === 0 ? "text-red-600" : (p.stock_quantity || 0) <= (p.low_stock_threshold || 5) ? "text-orange-600" : "text-gray-900"
                      )}>
                        {p.stock_quantity || 0} UNITS
                      </span>
                    </div>
                  </td>
                  <td className="p-6 font-mono text-xs text-gray-400">
                    {p.low_stock_threshold || 5}
                  </td>
                  <td className="p-6 text-right">
                    {editingId === p.id ? (
                      <div className="flex items-center justify-end gap-2 animate-in fade-in zoom-in-95 duration-200">
                        <input 
                          type="number" 
                          autoFocus
                          value={adjustment}
                          onChange={(e) => setAdjustment(parseInt(e.target.value) || 0)}
                          className="w-16 border border-brand-orange p-1 text-xs text-center outline-none"
                        />
                        <button onClick={() => handleAdjust(p.id)} className="p-1 bg-brand-orange text-white hover:bg-orange-600 transition-colors">
                          <Check size={14} />
                        </button>
                        <button onClick={() => { setEditingId(null); setAdjustment(0); }} className="p-1 bg-gray-100 text-gray-400 hover:text-red-500 transition-colors">
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => { setEditingId(p.id); setAdjustment(1); }}
                          className="flex items-center gap-1 px-3 py-1 bg-gray-50 border border-gray-100 font-mono text-[9px] uppercase tracking-widest text-gray-500 hover:text-brand-orange hover:border-brand-orange transition-all"
                        >
                          <Plus size={10} /> Add
                        </button>
                        <button 
                          onClick={() => { setEditingId(p.id); setAdjustment(-1); }}
                          className="flex items-center gap-1 px-3 py-1 bg-gray-50 border border-gray-100 font-mono text-[9px] uppercase tracking-widest text-gray-500 hover:text-red-500 hover:border-red-200 transition-all"
                        >
                          <Minus size={10} /> Deduct
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
