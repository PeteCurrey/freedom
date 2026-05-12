"use client";

import React from 'react';
import { usePlannerStore } from '../store/plannerStore';
import { Tag, TrendingUp, Briefcase } from 'lucide-react';
import { StatCard } from './StatCard';

export function CostEstimate() {
  const totals = usePlannerStore((state) => state.projectTotals);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Tag className="w-3.5 h-3.5 text-[#6B6860]" />
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#1A1917]">Cost Estimate</h4>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-y-6">
        <StatCard 
          label="Total Parts" 
          value={`£${totals.totalCost.toLocaleString()}`} 
          subValue="GBP"
        />
        <StatCard 
          label="Item Count" 
          value={totals.componentCount} 
          subValue="Units"
        />
        <StatCard 
          label="Avg / Item" 
          value={`£${Math.round(totals.averageCostPerComponent)}`} 
        />
        <div className="space-y-1.5 opacity-40">
          <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#6B6860]">Labour Est.</span>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold font-mono tracking-tight text-[#1A1917]">£0</span>
            <span className="text-[10px] font-medium text-[#6B6860] uppercase tracking-wider">TBD</span>
          </div>
        </div>
      </div>

      {/* Commercial Placeholder Link */}
      <div className="pt-4 border-t border-[#F4F3F0]">
        <button className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#F4F3F0] hover:bg-[#E8E6E1] text-[#1A1917] rounded-lg transition-all text-[10px] font-bold uppercase tracking-widest">
          <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
          View Full Pricing Breakdown
        </button>
      </div>
    </div>
  );
}
