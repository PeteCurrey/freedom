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
  Download,
  Trash2,
  CheckCircle2,
  ChevronRight
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
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showLog, setShowLog] = useState(false);

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
      
      // Log the adjustment (in a real app, this would be a separate table)
      console.log(`Log: Adjusted ${product.name} by ${adjustment}`);

      setProducts(prev => prev.map(p => 
        p.id === id ? { ...p, stock_quantity: Math.max(0, newQty) } : p
      ));
      setEditingId(null);
      setAdjustment(0);
    } catch (error) {
      console.error("Error adjusting stock:", error);
    }
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredProducts.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredProducts.map(p => p.id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleBulkStatus = async (status: string) => {
    if (selectedIds.length === 0) return;
    const { error } = await supabase
      .from("products")
      .update({ status })
      .in("id", selectedIds);
    
    if (!error) {
      setProducts(prev => prev.map(p => 
        selectedIds.includes(p.id) ? { ...p, status } : p
      ));
      setSelectedIds([]);
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
    <div className="min-h-screen bg-gray-50 text-gray-900 pb-32">
      <div className="max-w-[1400px] mx-auto px-8 py-12">
        {/* Header */}
        <div className="mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
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
             <button 
               onClick={() => setShowLog(true)}
               className="flex items-center gap-2 px-6 py-4 border border-gray-200 font-mono text-[10px] uppercase tracking-widest text-gray-500 hover:text-brand-orange hover:border-brand-orange transition-all"
             >
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

        {/* Toolbar & Bulk Actions */}
        <div className="space-y-4 mb-6">
          <div className="bg-white border border-gray-200 p-4 flex justify-between items-center shadow-sm">
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

          {/* Bulk Action Bar */}
          {selectedIds.length > 0 && (
            <div className="bg-slate-900 p-4 flex items-center justify-between animate-in slide-in-from-top-4 duration-300">
               <div className="flex items-center gap-4">
                  <span className="font-mono text-[10px] text-white uppercase tracking-widest">
                    {selectedIds.length} Products Selected
                  </span>
                  <div className="h-4 w-px bg-slate-700 mx-2" />
                  <button onClick={() => handleBulkStatus('active')} className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest hover:text-white transition-colors">Mark Active</button>
                  <button onClick={() => handleBulkStatus('draft')} className="text-[10px] font-bold text-amber-400 uppercase tracking-widest hover:text-white transition-colors">Mark Draft</button>
               </div>
               <button onClick={() => setSelectedIds([])} className="text-slate-400 hover:text-white transition-colors">
                 <X size={16} />
               </button>
            </div>
          )}
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 font-mono text-[10px] uppercase tracking-widest text-gray-400">
                <th className="p-6 w-12">
                   <input 
                     type="checkbox" 
                     checked={selectedIds.length === filteredProducts.length && filteredProducts.length > 0}
                     onChange={toggleSelectAll}
                     className="w-4 h-4 rounded border-gray-300 text-brand-orange focus:ring-brand-orange" 
                   />
                </th>
                <th className="p-6">Product Item</th>
                <th className="p-6">SKU / Brand</th>
                <th className="p-6">Status</th>
                <th className="p-6 text-center">Stock Level</th>
                <th className="p-6 text-center">Threshold</th>
                <th className="p-6 text-right">Quick Adjust</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {loading ? (
                <tr><td colSpan={7} className="p-20 text-center"><Loader2 className="animate-spin mx-auto text-brand-orange" /></td></tr>
              ) : filteredProducts.map(p => (
                <tr key={p.id} className={cn(
                  "border-b border-gray-50 hover:bg-gray-50/50 transition-colors group",
                  selectedIds.includes(p.id) && "bg-brand-orange/5"
                )}>
                  <td className="p-6">
                    <input 
                      type="checkbox" 
                      checked={selectedIds.includes(p.id)}
                      onChange={() => toggleSelect(p.id)}
                      className="w-4 h-4 rounded border-gray-300 text-brand-orange focus:ring-brand-orange" 
                    />
                  </td>
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
                  <td className="p-6 text-center">
                    <div className="flex items-center justify-center gap-3">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        (p.stock_quantity || 0) === 0 ? "bg-red-500" : (p.stock_quantity || 0) <= (p.low_stock_threshold || 5) ? "bg-orange-500" : "bg-green-500"
                      )} />
                      <span className={cn(
                        "font-mono text-xs font-bold",
                        (p.stock_quantity || 0) === 0 ? "text-red-600" : (p.stock_quantity || 0) <= (p.low_stock_threshold || 5) ? "text-orange-600" : "text-gray-900"
                      )}>
                        {p.stock_quantity || 0}
                      </span>
                    </div>
                  </td>
                  <td className="p-6 text-center font-mono text-xs text-gray-400">
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

      {/* Adjustment Log Sidebar */}
      {showLog && (
        <div className="fixed inset-0 z-50 flex justify-end">
           <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowLog(false)} />
           <div className="relative w-full max-w-md bg-white h-full shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
              <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-slate-900 text-white">
                 <div>
                    <h2 className="font-display text-xl uppercase tracking-widest">Adjustment Log</h2>
                    <p className="font-mono text-[9px] text-slate-400 uppercase tracking-widest mt-1">Telemetry: Stock Delta Stream</p>
                 </div>
                 <button onClick={() => setShowLog(false)} className="hover:text-brand-orange transition-colors">
                    <X size={20} />
                 </button>
              </div>
              <div className="flex-1 overflow-y-auto p-8 space-y-6">
                 {[
                    { item: 'Victron MultiPlus-II', date: 'Just Now', user: 'PMB', delta: '+5', reason: 'Stock Delivery' },
                    { item: 'Roamer 400Ah Battery', date: '2h ago', user: 'PMB', delta: '-1', reason: 'Manual Override' },
                    { item: 'MaxxFan Deluxe', date: 'Yesterday', user: 'SYSTEM', delta: '-2', reason: 'Order #8241' },
                 ].map((log, i) => (
                    <div key={i} className="flex gap-4 border-l-2 border-slate-100 pl-4 py-1">
                       <div className="flex-1">
                          <p className="text-sm font-bold text-gray-900">{log.item}</p>
                          <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest mt-1">
                             {log.date} · {log.user} · <span className={log.delta.startsWith('+') ? 'text-emerald-600' : 'text-red-600'}>{log.delta} Units</span>
                          </p>
                          <p className="text-[10px] text-slate-400 mt-2 italic">"{log.reason}"</p>
                       </div>
                       <ChevronRight size={14} className="text-slate-200 self-center" />
                    </div>
                 ))}
              </div>
              <div className="p-8 border-t border-gray-100 bg-gray-50">
                 <button className="w-full py-4 border border-slate-200 text-slate-500 font-mono text-[10px] uppercase tracking-widest hover:bg-white transition-all">
                    View Full History
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
