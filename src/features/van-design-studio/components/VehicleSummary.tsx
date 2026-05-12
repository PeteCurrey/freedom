"use client";

import React from 'react';
import { usePlannerStore } from '../store/plannerStore';
import { CHASSIS_DATA } from '../data/chassisData';
import { StatCard } from './StatCard';
import { Truck } from 'lucide-react';

export function VehicleSummary() {
  const selectedChassisId = usePlannerStore((state) => state.selectedChassisId);
  const chassis = CHASSIS_DATA.find(c => c.id === selectedChassisId);

  if (!chassis) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Truck className="w-3.5 h-3.5 text-[#6B6860]" />
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#1A1917]">Vehicle Summary</h4>
        </div>
        <span className="px-2 py-0.5 bg-[#F4F3F0] rounded text-[9px] font-bold text-[#6B6860] uppercase tracking-wider">
          {chassis.wheelbase} {chassis.roofHeight}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-y-6">
        <StatCard label="Int. Length" value={chassis.internalLengthMm} subValue="mm" />
        <StatCard label="Int. Width" value={chassis.internalWidthMm} subValue="mm" />
        <StatCard label="GVW Limit" value={chassis.grossVehicleWeightKg} subValue="kg" />
        <StatCard label="Base Kerb" value={chassis.kerbWeightKg} subValue="kg" />
      </div>

      <div className="pt-4 border-t border-[#F4F3F0]">
        <div className="flex justify-between items-center">
          <span className="text-[9px] font-bold uppercase tracking-wider text-[#6B6860]">Selected Model</span>
          <span className="text-[11px] font-bold text-[#1A1917]">{chassis.manufacturer} {chassis.model}</span>
        </div>
      </div>
    </div>
  );
}
