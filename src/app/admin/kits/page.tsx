"use client";

import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Plus, Search, Edit2, Trash2, CheckCircle2, 
  Package, Info, Tag, Layers, ArrowUpRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface BuildKit {
  id: string;
  name: string;
  slug: string;
  kit_price_gbp: number;
  savings_gbp?: number;
  savings_percentage?: number;
  status: 'active' | 'draft';
  image?: string;
  items_count: number;
  retail_total_gbp: number;
}

export default function AdminKitsPage() {
  const [kits, setKits] = useState<BuildKit[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchKits() {
      setLoading(true);
      // In a real app, we'd query build_kits and join with items to get counts/totals
      // For now, we'll fetch what we have or mock the calculated fields
      const { data } = await supabase
        .from('build_kits')
        .select('*')
        .order('created_at', { ascending: false });

      if (data) {
        // Mocking some missing fields for the UI demonstration
        const enhancedKits = data.map(k => ({
          ...k,
          items_count: k.items_count || 5, // Mock
          retail_total_gbp: k.retail_total_gbp || k.kit_price_gbp * 1.15, // Mock
          status: k.status || (k.is_active ? 'active' : 'draft')
        }));
        setKits(enhancedKits as BuildKit[]);
      }
      setLoading(false);
    }
    fetchKits();
  }, []);

  const filteredKits = useMemo(() => {
    return kits.filter(k => 
      k.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [kits, searchTerm]);

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="font-display text-4xl uppercase tracking-tighter text-slate-900">Build Kits</h1>
          <p className="text-slate-500 text-sm mt-1">
            {kits.length} kits active · Curated bundles of internal products
          </p>
        </div>
        <Link href="/admin/kits/new" className="px-8 py-3 bg-brand-orange text-white font-display text-[10px] uppercase tracking-widest hover:bg-slate-900 transition-all font-bold shadow-lg shadow-brand-orange/20 flex items-center gap-2">
          <Plus size={16} /> Create Kit
        </Link>
      </div>

      {/* Toolbar */}
      <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 group">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-orange transition-colors" />
          <input 
            type="text" 
            placeholder="Search kits by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/20 transition-all"
          />
        </div>
      </div>

      {/* Kit Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-mono uppercase tracking-widest text-slate-400">
                <th className="px-6 py-4">Kit Identity</th>
                <th className="px-6 py-4">Components</th>
                <th className="px-6 py-4">Individual Total</th>
                <th className="px-6 py-4">Kit Price</th>
                <th className="px-6 py-4">Savings</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-20 text-center text-slate-400 font-mono text-[10px] uppercase tracking-widest">
                    Loading Kit Registry...
                  </td>
                </tr>
              ) : filteredKits.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-20 text-center">
                    <Layers size={48} className="mx-auto text-slate-200 mb-4" />
                    <p className="text-slate-500 font-display text-lg uppercase tracking-tight">No kits found</p>
                  </td>
                </tr>
              ) : (
                filteredKits.map((kit) => {
                  const savingsGbp = (kit.retail_total_gbp - kit.kit_price_gbp) / 100;
                  const savingsPercent = ((kit.retail_total_gbp - kit.kit_price_gbp) / kit.retail_total_gbp) * 100;
                  
                  return (
                    <tr key={kit.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-slate-100 border border-slate-200 rounded-lg overflow-hidden flex items-center justify-center shrink-0 relative">
                             {kit.image ? (
                               <img src={kit.image} alt={kit.name} className="w-full h-full object-cover" />
                             ) : (
                               <Layers size={20} className="text-slate-300" />
                             )}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900 leading-tight">{kit.name}</p>
                            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-tight">{kit.slug}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Package size={14} className="text-slate-400" />
                          <span className="text-xs font-bold text-slate-600">{kit.items_count} products</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                         <span className="text-sm text-slate-400 line-through font-mono">£{(kit.retail_total_gbp / 100).toLocaleString()}</span>
                      </td>
                      <td className="px-6 py-4">
                         <span className="text-base font-bold text-slate-900">£{(kit.kit_price_gbp / 100).toLocaleString()}</span>
                      </td>
                      <td className="px-6 py-4">
                         <div className="flex flex-col">
                            <span className="text-xs font-bold text-emerald-600">Save £{savingsGbp.toLocaleString()}</span>
                            <span className="text-[9px] font-mono text-emerald-500 uppercase tracking-widest">{savingsPercent.toFixed(1)}% OFF</span>
                         </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className={cn(
                          "inline-flex items-center gap-1.5 px-2 py-1 rounded-full border text-[9px] font-bold uppercase tracking-widest",
                          kit.status === 'active' ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500" : "bg-amber-500/10 border-amber-500/20 text-amber-500"
                        )}>
                          <div className={cn("w-1 h-1 rounded-full", kit.status === 'active' ? "bg-emerald-500" : "bg-amber-500")} />
                          {kit.status}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Link href={`/admin/kits/${kit.id}`} className="p-2 text-slate-400 hover:text-brand-orange hover:bg-slate-100 rounded-lg transition-all">
                            <Edit2 size={14} />
                          </Link>
                          <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-slate-100 rounded-lg transition-all">
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
