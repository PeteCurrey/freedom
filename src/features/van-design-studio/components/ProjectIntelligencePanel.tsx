"use client";

import React from 'react';
import { VehicleSummary } from './VehicleSummary';
import { PayloadTracker } from './PayloadTracker';
import { CostEstimate } from './CostEstimate';
import { ComponentInspector } from './ComponentInspector';
import { WarningsPanel } from './WarningsPanel';
import { usePlannerStore } from '../store/plannerStore';
import { Activity, AlertCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ProjectIntelligencePanel() {
  const selectedComponentId = usePlannerStore((state) => state.selectedPlacedComponentId);
  const warnings = usePlannerStore((state) => state.warnings);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-6 py-4 border-b border-[#E8E6E1] bg-[#F9F8F6]">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-blue-600" />
          <h3 className="text-[11px] font-bold uppercase tracking-widest text-[#1A1917]">Project Intelligence</h3>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-px bg-[#E8E6E1]">
        {/* Component Inspector or Global Stats */}
        {selectedComponentId ? (
          <div className="bg-white p-6">
            <ComponentInspector />
          </div>
        ) : (
          <>
            <div className="bg-white p-6">
              <VehicleSummary />
            </div>
            <div className="bg-white p-6">
              <PayloadTracker />
            </div>
            <div className="bg-white p-6">
              <CostEstimate />
            </div>
          </>
        )}

        {/* Warnings Section - Always Visible if not in component view or always at bottom */}
        <div className={cn("bg-white p-6", selectedComponentId && "border-t border-[#E8E6E1]")}>
          <WarningsPanel />
        </div>
      </div>

      {/* Footer / Tip */}
      {!selectedComponentId && (
        <div className="p-4 border-t border-[#E8E6E1] bg-[#F9F8F6] flex gap-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Info className="w-3.5 h-3.5 text-blue-600" />
          </div>
          <p className="text-[10px] text-[#6B6860] leading-relaxed">
            <span className="font-bold text-[#1A1917]">Design Tip:</span> Heavier items like batteries and water tanks should be placed low and towards the center for better stability.
          </p>
        </div>
      )}
    </div>
  );
}
