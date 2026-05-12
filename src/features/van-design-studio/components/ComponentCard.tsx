"use client";

import React from 'react';
import type { ComponentDefinition } from '../types';
import { usePlannerStore } from '../store/plannerStore';
import { Plus, Ruler, Weight, Tag } from 'lucide-react';

interface ComponentCardProps {
  component: ComponentDefinition;
}

export function ComponentCard({ component }: ComponentCardProps) {
  const addComponent = usePlannerStore((state) => state.addComponent);

  return (
    <div className="group bg-white border border-[#E8E6E1] hover:border-blue-600 rounded-xl p-4 transition-all duration-300 shadow-sm hover:shadow-md relative overflow-hidden">
      <div className="flex justify-between items-start mb-2">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-blue-600 mb-0.5">
            {component.category}
          </span>
          <h4 className="text-sm font-bold text-[#1A1917] group-hover:text-blue-600 transition-colors">
            {component.name}
          </h4>
        </div>
        <button
          onClick={() => addComponent(component.id)}
          className="p-2 bg-[#F4F3F0] hover:bg-blue-600 hover:text-white text-[#1A1917] rounded-lg transition-all"
          title="Add to plan"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <p className="text-[11px] text-[#6B6860] line-clamp-2 leading-relaxed mb-4">
        {component.description}
      </p>

      <div className="flex items-center gap-4 border-t border-[#F4F3F0] pt-3">
        <div className="flex items-center gap-1.5">
          <Ruler className="w-3 h-3 text-[#6B6860]" />
          <span className="text-[10px] font-mono text-[#1A1917]">{component.widthMm}x{component.depthMm}mm</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Weight className="w-3 h-3 text-[#6B6860]" />
          <span className="text-[10px] font-mono text-[#1A1917]">{component.weightKg}kg</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Tag className="w-3 h-3 text-[#6B6860]" />
          <span className="text-[10px] font-mono text-[#1A1917]">£{component.estimatedCost}</span>
        </div>
      </div>
      
      {/* Visual Accent */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 -mr-12 -mt-12 rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </div>
  );
}
