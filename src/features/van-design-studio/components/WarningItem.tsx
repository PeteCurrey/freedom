"use client";

import React from 'react';
import type { Warning } from '../types';
import { usePlannerStore } from '../store/plannerStore';
import { 
  AlertCircle, 
  AlertTriangle, 
  Info, 
  LocateFixed,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface WarningItemProps {
  warning: Warning;
}

export function WarningItem({ warning }: WarningItemProps) {
  const { pulseComponent, selectComponent } = usePlannerStore();

  const handleLocate = () => {
    if (warning.relatedComponentIds.length > 0) {
      const id = warning.relatedComponentIds[0];
      selectComponent(id);
      pulseComponent(id);
    }
  };

  const severityIcons = {
    critical: <AlertCircle className="w-3.5 h-3.5 text-red-600" />,
    caution: <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />,
    info: <Info className="w-3.5 h-3.5 text-blue-600" />,
  };

  const severityColors = {
    critical: "bg-red-50 border-red-100",
    caution: "bg-amber-50 border-amber-100",
    info: "bg-blue-50 border-blue-100",
  };

  return (
    <div className={cn(
      "p-3 rounded-xl border transition-all duration-300 group hover:shadow-sm",
      severityColors[warning.severity]
    )}>
      <div className="flex gap-3">
        <div className="mt-0.5">{severityIcons[warning.severity]}</div>
        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <h5 className="text-[11px] font-bold text-[#1A1917] tracking-tight">{warning.title}</h5>
            {warning.canLocateOnPlan && (
              <button 
                onClick={handleLocate}
                className="flex items-center gap-1.5 px-2 py-0.5 bg-white border border-[#E8E6E1] text-[#1A1917] rounded hover:bg-[#F4F3F0] transition-all"
              >
                <LocateFixed className="w-2.5 h-2.5 text-blue-600" />
                <span className="text-[9px] font-bold uppercase tracking-tighter">Locate</span>
              </button>
            )}
          </div>
          <p className="text-[10px] text-[#6B6860] leading-relaxed">
            {warning.message}
          </p>
        </div>
      </div>
    </div>
  );
}
