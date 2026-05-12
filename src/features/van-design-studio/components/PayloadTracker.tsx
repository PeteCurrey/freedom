"use client";

import React from 'react';
import { usePlannerStore } from '../store/plannerStore';
import { Weight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function PayloadTracker() {
  const totals = usePlannerStore((state) => state.projectTotals);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-500';
      case 'caution': return 'bg-amber-500';
      case 'exceeded': return 'bg-red-500';
      default: return 'bg-blue-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'healthy': return 'Healthy Payload';
      case 'caution': return 'Payload Caution';
      case 'exceeded': return 'Payload Exceeded';
      default: return 'Status Normal';
    }
  };

  const getStatusTextColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600';
      case 'caution': return 'text-amber-600';
      case 'exceeded': return 'text-red-600';
      default: return 'text-blue-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Weight className="w-3.5 h-3.5 text-[#6B6860]" />
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#1A1917]">Payload Tracker</h4>
        </div>
        <span className={cn(
          "text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded",
          totals.payloadStatus === 'healthy' ? "bg-green-50 text-green-700" :
          totals.payloadStatus === 'caution' ? "bg-amber-50 text-amber-700" :
          "bg-red-50 text-red-700"
        )}>
          {getStatusText(totals.payloadStatus)}
        </span>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-end">
          <div className="flex flex-col">
            <span className="text-[20px] font-bold text-[#1A1917] font-mono leading-none tracking-tighter">
              {totals.totalWeightKg}<span className="text-[10px] ml-1 text-[#6B6860]">KG</span>
            </span>
            <span className="text-[9px] font-bold uppercase tracking-wider text-[#6B6860] mt-1">Total Build Weight</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[14px] font-bold text-[#1A1917] font-mono leading-none tracking-tighter">
              {totals.remainingPayloadKg}<span className="text-[10px] ml-1 text-[#6B6860]">KG</span>
            </span>
            <span className="text-[9px] font-bold uppercase tracking-wider text-[#6B6860] mt-1">Remaining</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-2 w-full bg-[#F4F3F0] rounded-full overflow-hidden">
          <div 
            className={cn("h-full transition-all duration-500", getStatusColor(totals.payloadStatus))}
            style={{ width: `${Math.min(totals.payloadPercentageUsed, 100)}%` }}
          />
        </div>

        <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-tighter">
          <span className="text-[#6B6860]">Utilization</span>
          <span className={getStatusTextColor(totals.payloadStatus)}>
            {totals.payloadPercentageUsed.toFixed(1)}%
          </span>
        </div>
      </div>
    </div>
  );
}
