"use client";

import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Plus, Search, Edit2, Trash2, Layout, 
  Clock, Download, Eye, Layers, Settings, ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface BuildPlan {
  id: string;
  name: string;
  system_tier: string;
  estimated_cost: number;
  duration_weeks: number;
  status: 'active' | 'draft' | 'archived';
  description?: string;
  created_at: string;
}

export default function AdminBuildPlansPage() {
  const [plans, setPlans] = useState<BuildPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchPlans() {
      setLoading(true);
      // In a real app, query build_plans table
      const { data } = await supabase
        .from('build_plans')
        .select('*')
        .order('created_at', { ascending: false });

      if (data) {
        setPlans(data as BuildPlan[]);
      } else {
        // Mock data for UI demonstration if table is missing or empty
        setPlans([
          { id: 'bp-1', name: 'Expedition Pro Series', system_tier: 'T3 - Full Autonomy', estimated_cost: 1250000, duration_weeks: 6, status: 'active', created_at: new Date().toISOString() },
          { id: 'bp-2', name: 'Weekend Warrior Base', system_tier: 'T1 - Weekend Core', estimated_cost: 450000, duration_weeks: 2, status: 'active', created_at: new Date().toISOString() },
          { id: 'bp-3', name: 'Digital Nomad Hub', system_tier: 'T2 - Extended Stay', estimated_cost: 820000, duration_weeks: 4, status: 'draft', created_at: new Date().toISOString() }
        ]);
      }
      setLoading(false);
    }
    fetchPlans();
  }, []);

  const filteredPlans = useMemo(() => {
    return plans.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.system_tier?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [plans, searchTerm]);

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="font-display text-4xl uppercase tracking-tighter text-slate-900">Build Plans</h1>
          <p className="text-slate-500 text-sm mt-1">
            {plans.length} engineering blueprints available for client generation
          </p>
        </div>
        <Link href="/admin/build-plans/new" className="px-8 py-3 bg-brand-orange text-white font-display text-[10px] uppercase tracking-widest hover:bg-slate-900 transition-all font-bold shadow-lg shadow-brand-orange/20 flex items-center gap-2">
          <Plus size={16} /> Create Plan
        </Link>
      </div>

      {/* Toolbar */}
      <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 group">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-orange transition-colors" />
          <input 
            type="text" 
            placeholder="Search blueprints by name or tier..."
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
                <th className="px-6 py-4">Blueprint Identity</th>
                <th className="px-6 py-4">System Tier</th>
                <th className="px-6 py-4">Est. Hardware Cost</th>
                <th className="px-6 py-4">Duration</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-20 text-center text-slate-400 font-mono text-[10px] uppercase tracking-widest">
                    Loading Engineering Blueprints...
                  </td>
                </tr>
              ) : filteredPlans.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-20 text-center">
                    <Layout size={48} className="mx-auto text-slate-200 mb-4" />
                    <p className="text-slate-500 font-display text-lg uppercase tracking-tight">No blueprints found</p>
                  </td>
                </tr>
              ) : (
                filteredPlans.map((plan) => (
                  <tr key={plan.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-slate-100 border border-slate-200 rounded-lg flex items-center justify-center shrink-0 text-slate-400">
                           <Layout size={18} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900 leading-tight">{plan.name}</p>
                          <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">ID: {plan.id.split('-')[1] || plan.id.substring(0,6)}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                       <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest bg-slate-100 px-2 py-1 rounded">
                         {plan.system_tier || 'Custom'}
                       </span>
                    </td>
                    <td className="px-6 py-4">
                       <span className="text-sm font-bold text-slate-900">£{(plan.estimated_cost / 100).toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4">
                       <div className="flex items-center gap-2 text-slate-500">
                          <Clock size={12} />
                          <span className="text-xs font-bold">{plan.duration_weeks} Weeks</span>
                       </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={cn(
                        "inline-flex items-center gap-1.5 px-2 py-1 rounded-full border text-[9px] font-bold uppercase tracking-widest",
                        plan.status === 'active' ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500" :
                        plan.status === 'draft' ? "bg-amber-500/10 border-amber-500/20 text-amber-500" :
                        "bg-slate-100 border-slate-200 text-slate-400"
                      )}>
                        <div className={cn("w-1 h-1 rounded-full", 
                          plan.status === 'active' ? "bg-emerald-500" : 
                          plan.status === 'draft' ? "bg-amber-500" : "bg-slate-400"
                        )} />
                        {plan.status}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link href={`/admin/build-plans/${plan.id}`} className="p-2 text-slate-400 hover:text-brand-orange hover:bg-slate-100 rounded-lg transition-all">
                          <Edit2 size={14} />
                        </Link>
                        <button className="p-2 text-slate-400 hover:text-brand-orange hover:bg-slate-100 rounded-lg transition-all">
                          <Download size={14} />
                        </button>
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
