"use client";

import React from 'react';
import { usePlannerStore } from '../store/plannerStore';
import { COMPONENT_LIBRARY, FIXED_BED_ID } from '../data/componentLibrary';
import { 
  RotateCw, 
  Copy, 
  Trash2, 
  ArrowLeft, 
  Ruler, 
  Weight, 
  Tag, 
  Box,
  FileEdit
} from 'lucide-react';
import { BedConfigurator } from './BedConfigurator';

export function ComponentInspector() {
  const selectedId = usePlannerStore((state) => state.selectedPlacedComponentId);
  const selectComponent = usePlannerStore((state) => state.selectComponent);
  const rotateComponent = usePlannerStore((state) => state.rotateComponent);
  const duplicateComponent = usePlannerStore((state) => state.duplicateComponent);
  const deleteComponent = usePlannerStore((state) => state.deleteComponent);
  const components = usePlannerStore((state) => state.placedComponents);
  
  const component = components.find(c => c.instanceId === selectedId);
  const def = component ? COMPONENT_LIBRARY.find(d => d.id === component.componentId) : null;

  if (!component || !def) return null;

  const isFixedBed = component.componentId === FIXED_BED_ID;

  return (
    <div className="space-y-8">
      {/* Back to Project Summary */}
      <button 
        onClick={() => selectComponent(null)}
        className="flex items-center gap-2 text-[#6B6860] hover:text-[#1A1917] transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span className="text-[10px] font-bold uppercase tracking-widest">Back to Project</span>
      </button>

      {/* Header */}
      <div className="space-y-2">
        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-blue-600">{def.category}</span>
        <h3 className="text-lg font-bold text-[#1A1917] tracking-tight">{def.name}</h3>
        <p className="text-[11px] text-[#6B6860] leading-relaxed italic">{def.description}</p>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-3 gap-2">
        <button 
          onClick={() => rotateComponent(component.instanceId)}
          className="flex flex-col items-center justify-center gap-2 p-3 bg-[#F4F3F0] hover:bg-[#E8E6E1] rounded-xl transition-all group"
        >
          <RotateCw className="w-4 h-4 text-[#1A1917] group-hover:rotate-90 transition-transform duration-300" />
          <span className="text-[9px] font-bold uppercase tracking-tighter text-[#6B6860]">Rotate</span>
        </button>
        <button 
          onClick={() => duplicateComponent(component.instanceId)}
          className="flex flex-col items-center justify-center gap-2 p-3 bg-[#F4F3F0] hover:bg-[#E8E6E1] rounded-xl transition-all"
        >
          <Copy className="w-4 h-4 text-[#1A1917]" />
          <span className="text-[9px] font-bold uppercase tracking-tighter text-[#6B6860]">Clone</span>
        </button>
        <button 
          onClick={() => deleteComponent(component.instanceId)}
          className="flex flex-col items-center justify-center gap-2 p-3 bg-red-50 hover:bg-red-100 rounded-xl transition-all group"
        >
          <Trash2 className="w-4 h-4 text-red-600 group-hover:scale-110 transition-transform" />
          <span className="text-[9px] font-bold uppercase tracking-tighter text-red-600">Remove</span>
        </button>
      </div>

      {/* Stats */}
      <div className="bg-[#F9F8F6] rounded-xl p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Ruler className="w-3.5 h-3.5 text-[#6B6860]" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B6860]">Footprint</span>
          </div>
          <span className="text-[11px] font-mono font-bold text-[#1A1917]">{component.widthMm} x {component.depthMm}mm</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Weight className="w-3.5 h-3.5 text-[#6B6860]" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B6860]">Weight</span>
          </div>
          <span className="text-[11px] font-mono font-bold text-[#1A1917]">{def.weightKg}kg</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Tag className="w-3.5 h-3.5 text-[#6B6860]" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B6860]">Est. Cost</span>
          </div>
          <span className="text-[11px] font-mono font-bold text-[#1A1917]">£{def.estimatedCost}</span>
        </div>
      </div>

      {/* Component Specific Config (e.g. Bed Configurator) */}
      {isFixedBed && (
        <div className="pt-6 border-t border-[#E8E6E1]">
          <BedConfigurator instanceId={component.instanceId} />
        </div>
      )}

      {/* Note Placeholder */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <FileEdit className="w-3.5 h-3.5 text-[#6B6860]" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#1A1917]">Build Notes</span>
        </div>
        <textarea 
          placeholder="Add specific build instructions or notes..."
          className="w-full bg-[#F4F3F0] border border-[#E8E6E1] rounded-xl p-3 text-[11px] text-[#1A1917] h-24 focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all placeholder:text-[#6B6860]/50"
        />
      </div>
    </div>
  );
}
