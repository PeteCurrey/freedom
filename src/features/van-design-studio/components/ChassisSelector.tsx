"use client";

import React from 'react';
import { CHASSIS_DATA, getManufacturers, getChassisByManufacturer } from '../data/chassisData';
import { usePlannerStore } from '../store/plannerStore';
import { Info } from 'lucide-react';

export function ChassisSelector() {
  const selectedChassisId = usePlannerStore((state) => state.selectedChassisId);
  const selectChassis = usePlannerStore((state) => state.selectChassis);
  
  const selectedChassis = CHASSIS_DATA.find(c => c.id === selectedChassisId);
  const manufacturers = getManufacturers();

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest text-[#1A1917] mb-1">Base Vehicle</h3>
        <p className="text-[11px] text-[#6B6860] mb-6">Select your chassis to update layout dimensions and payload limits.</p>
        
        <div className="space-y-4">
          {/* Manufacturer */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#6B6860]">Manufacturer</label>
            <select
              value={selectedChassis?.manufacturer || ''}
              onChange={(e) => {
                const firstOfBrand = getChassisByManufacturer(e.target.value)[0];
                if (firstOfBrand) selectChassis(firstOfBrand.id);
              }}
              className="w-full bg-[#F4F3F0] border border-[#E8E6E1] rounded-lg px-3 py-2 text-sm text-[#1A1917] focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all"
            >
              {manufacturers.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>

          {/* Model / Variant */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#6B6860]">Model & Wheelbase</label>
            <select
              value={selectedChassisId}
              onChange={(e) => selectChassis(e.target.value)}
              className="w-full bg-[#F4F3F0] border border-[#E8E6E1] rounded-lg px-3 py-2 text-sm text-[#1A1917] focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all"
            >
              {getChassisByManufacturer(selectedChassis?.manufacturer || '').map(c => (
                <option key={c.id} value={c.id}>{c.model} {c.variant} ({c.wheelbase})</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Selected Chassis Badge */}
      {selectedChassis && (
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-3.5 h-3.5 text-blue-600" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-700">Provisional Specs</span>
          </div>
          <div className="grid grid-cols-2 gap-y-3 gap-x-4">
            <div className="flex flex-col">
              <span className="text-[9px] uppercase tracking-wider text-blue-600 opacity-70">Internal Length</span>
              <span className="text-sm font-bold text-blue-900 font-mono">{(selectedChassis.internalLengthMm / 1000).toFixed(2)}m</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] uppercase tracking-wider text-blue-600 opacity-70">Internal Width</span>
              <span className="text-sm font-bold text-blue-900 font-mono">{(selectedChassis.internalWidthMm / 1000).toFixed(2)}m</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] uppercase tracking-wider text-blue-600 opacity-70">Payload Limit</span>
              <span className="text-sm font-bold text-blue-900 font-mono">{selectedChassis.payloadKg}kg</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] uppercase tracking-wider text-blue-600 opacity-70">Roof Height</span>
              <span className="text-sm font-bold text-blue-900 uppercase">{selectedChassis.roofHeight}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
