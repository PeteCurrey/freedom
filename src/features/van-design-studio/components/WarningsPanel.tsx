"use client";

import React from 'react';
import { usePlannerStore } from '../store/plannerStore';
import { WarningItem } from './WarningItem';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

export function WarningsPanel() {
  const warnings = usePlannerStore((state) => state.warnings);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-3.5 h-3.5 text-[#6B6860]" />
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#1A1917]">Validation & Warnings</h4>
        </div>
        <span className="text-[10px] font-bold text-[#6B6860]">{warnings.length} Issues</span>
      </div>

      <div className="space-y-2">
        {warnings.length > 0 ? (
          warnings.map((warning) => (
            <WarningItem key={warning.id} warning={warning} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-8 bg-[#F9F8F6] rounded-xl border border-dashed border-[#E8E6E1] space-y-3">
            <CheckCircle2 className="w-6 h-6 text-green-500 opacity-30" />
            <p className="text-[11px] text-[#6B6860] font-medium tracking-tight">No critical design warnings found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
