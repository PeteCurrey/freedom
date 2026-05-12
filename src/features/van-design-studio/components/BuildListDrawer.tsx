"use client";

import React from 'react';
import { usePlannerStore } from '../store/plannerStore';
import { COMPONENT_LIBRARY } from '../data/componentLibrary';
import { SMART_BED_IDEAS } from '../data/smartBedIdeas';
import { 
  ChevronUp, 
  ChevronDown, 
  FileJson, 
  ExternalLink, 
  FileText,
  ShoppingBag,
  ListTodo
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function BuildListDrawer() {
  const { 
    isBomDrawerOpen, 
    toggleBomDrawer, 
    placedComponents, 
    selectedSmartIdeas,
    projectTotals 
  } = usePlannerStore();

  const smartIdeas = SMART_BED_IDEAS.filter(i => selectedSmartIdeas.includes(i.id));

  return (
    <div className={cn(
      "absolute bottom-0 left-0 right-0 bg-white border-t border-[#E8E6E1] transition-all duration-500 ease-in-out z-40 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]",
      isBomDrawerOpen ? "h-[450px]" : "h-12"
    )}>
      {/* Header / Toggle */}
      <button 
        onClick={toggleBomDrawer}
        className="w-full h-12 px-6 flex items-center justify-between hover:bg-[#F9F8F6] transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <ListTodo className="w-4 h-4 text-blue-600" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#1A1917]">Build List / BOM</span>
          </div>
          <div className="h-4 w-px bg-[#E8E6E1]" />
          <div className="flex items-center gap-4 text-[10px] font-bold text-[#6B6860] uppercase tracking-tighter">
            <span>{placedComponents.length + smartIdeas.length} Items</span>
            <span>£{projectTotals.totalCost.toLocaleString()} Estimated Cost</span>
          </div>
        </div>
        {isBomDrawerOpen ? <ChevronDown className="w-4 h-4 text-[#6B6860]" /> : <ChevronUp className="w-4 h-4 text-[#6B6860]" />}
      </button>

      {/* Content */}
      <div className="p-6 h-[calc(450px-48px)] overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto mb-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E8E6E1]">
                <th className="py-3 text-[10px] font-bold uppercase tracking-wider text-[#6B6860]">Component</th>
                <th className="py-3 text-[10px] font-bold uppercase tracking-wider text-[#6B6860]">Category</th>
                <th className="py-3 text-[10px] font-bold uppercase tracking-wider text-[#6B6860]">Weight</th>
                <th className="py-3 text-[10px] font-bold uppercase tracking-wider text-[#6B6860]">Est. Cost</th>
                <th className="py-3 text-right text-[10px] font-bold uppercase tracking-wider text-[#6B6860]">Store</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F4F3F0]">
              {placedComponents.map((pc) => {
                const def = COMPONENT_LIBRARY.find(d => d.id === pc.componentId);
                if (!def) return null;
                return (
                  <tr key={pc.instanceId} className="hover:bg-[#F9F8F6] transition-colors group">
                    <td className="py-3">
                      <div className="flex flex-col">
                        <span className="text-[11px] font-bold text-[#1A1917]">{def.name}</span>
                        <span className="text-[9px] text-[#6B6860] font-mono">{pc.instanceId.slice(0, 8)}</span>
                      </div>
                    </td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 bg-[#F4F3F0] rounded text-[9px] font-bold text-[#6B6860] uppercase tracking-wider">
                        {def.category}
                      </span>
                    </td>
                    <td className="py-3 text-[11px] font-mono text-[#1A1917]">{def.weightKg}kg</td>
                    <td className="py-3 text-[11px] font-mono text-[#1A1917]">£{def.estimatedCost}</td>
                    <td className="py-3 text-right">
                      <button className="p-1.5 text-[#6B6860] hover:text-blue-600 hover:bg-blue-50 rounded transition-all opacity-0 group-hover:opacity-100">
                        <ShoppingBag className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
              {smartIdeas.map((idea) => (
                <tr key={idea.id} className="hover:bg-blue-50/30 transition-colors group">
                  <td className="py-3">
                    <div className="flex flex-col">
                      <span className="text-[11px] font-bold text-blue-600">{idea.name}</span>
                      <span className="text-[9px] text-blue-400 font-mono tracking-widest uppercase">Smart Feature</span>
                    </div>
                  </td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 bg-blue-100 rounded text-[9px] font-bold text-blue-700 uppercase tracking-wider">
                      Upgrade
                    </span>
                  </td>
                  <td className="py-3 text-[11px] font-mono text-[#1A1917]">{idea.weightKg}kg</td>
                  <td className="py-3 text-[11px] font-mono text-[#1A1917]">£{(idea.estimatedCostMin + idea.estimatedCostMax) / 2}</td>
                  <td className="py-3 text-right">
                    <button className="p-1.5 text-[#6B6860] hover:text-blue-600 hover:bg-blue-50 rounded transition-all opacity-0 group-hover:opacity-100">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-6 border-t border-[#E8E6E1]">
          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-[#F4F3F0] hover:bg-[#E8E6E1] text-[#1A1917] rounded-lg transition-all text-[10px] font-bold uppercase tracking-widest">
              <FileJson className="w-3.5 h-3.5" />
              Export JSON
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#F4F3F0] hover:bg-[#E8E6E1] text-[#1A1917] rounded-lg transition-all text-[10px] font-bold uppercase tracking-widest opacity-40 cursor-not-allowed">
              <FileText className="w-3.5 h-3.5" />
              Export PDF
            </button>
          </div>
          <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-all text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-blue-100">
            <ShoppingBag className="w-3.5 h-3.5" />
            Buy Parts List (Affiliate Link)
          </button>
        </div>
      </div>
    </div>
  );
}
