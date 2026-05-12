"use client";

import React from 'react';
import { usePlannerStore } from '../store/plannerStore';
import { MATTRESS_PRESETS, getChassisFitStatus } from '../data/mattressPresets';
import { SMART_BED_IDEAS } from '../data/smartBedIdeas';
import { 
  Bed, 
  Maximize2, 
  Lightbulb, 
  CheckCircle2, 
  AlertTriangle,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface BedConfiguratorProps {
  instanceId: string;
}

export function BedConfigurator({ instanceId }: BedConfiguratorProps) {
  const { 
    placedComponents, 
    updateBedConfig, 
    selectedSmartIdeas, 
    toggleSmartIdea 
  } = usePlannerStore();
  
  const component = placedComponents.find(c => c.instanceId === instanceId);
  if (!component || !component.customConfig) return null;

  const config = component.customConfig;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="flex items-center gap-2 mb-2">
        <Bed className="w-4 h-4 text-blue-600" />
        <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#1A1917]">Bed Configurator</h4>
      </div>

      {/* Mattress Sizes */}
      <div className="space-y-3">
        <label className="text-[10px] font-bold uppercase tracking-wider text-[#6B6860]">Mattress Size Preset</label>
        <div className="grid grid-cols-1 gap-2">
          {MATTRESS_PRESETS.map((preset) => {
            const isSelected = config.mattressSize === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => updateBedConfig(instanceId, { mattressSize: preset.id })}
                className={cn(
                  "flex items-center justify-between p-3 rounded-xl border transition-all text-left",
                  isSelected 
                    ? "bg-blue-50 border-blue-200" 
                    : "bg-white border-[#E8E6E1] hover:border-[#D1CFCA]"
                )}
              >
                <div className="flex flex-col">
                  <span className={cn("text-xs font-bold", isSelected ? "text-blue-900" : "text-[#1A1917]")}>
                    {preset.label}
                  </span>
                  <span className="text-[9px] text-[#6B6860] mt-0.5">
                    {preset.widthMm} x {preset.lengthMm}mm
                  </span>
                </div>
                {isSelected && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Fit Status Badge */}
      <div className={cn(
        "p-3 rounded-xl border flex gap-3",
        config.chassisFitStatus === 'comfortable' ? "bg-green-50 border-green-100" :
        config.chassisFitStatus === 'close' ? "bg-amber-50 border-amber-100" :
        "bg-red-50 border-red-100"
      )}>
        <div className="mt-0.5">
          {config.chassisFitStatus === 'comfortable' ? <CheckCircle2 className="w-3.5 h-3.5 text-green-600" /> : <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />}
        </div>
        <div className="space-y-1">
          <span className={cn(
            "text-[9px] font-bold uppercase tracking-widest",
            config.chassisFitStatus === 'comfortable' ? "text-green-700" : "text-amber-700"
          )}>
            Chassis Fit Hint
          </span>
          <p className="text-[10px] text-[#6B6860] leading-relaxed">
            {config.chassisFitStatus === 'comfortable' && "Fits comfortably across this chassis width."}
            {config.chassisFitStatus === 'close' && "This mattress size is close to the available internal width."}
            {config.chassisFitStatus === 'tight' && "This option may require custom trimming or a lengthways layout."}
            {config.chassisFitStatus === 'requires-custom' && "May block central walkway clearance."}
          </p>
        </div>
      </div>

      {/* Pull-out Toggle */}
      <div className="space-y-3">
        <button
          onClick={() => updateBedConfig(instanceId, { pullOutEnabled: !config.pullOutEnabled })}
          className={cn(
            "w-full flex items-center justify-between p-4 rounded-xl border transition-all",
            config.pullOutEnabled 
              ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-100" 
              : "bg-white border-[#E8E6E1] text-[#1A1917] hover:border-[#D1CFCA]"
          )}
        >
          <div className="flex items-center gap-3">
            <Maximize2 className={cn("w-4 h-4", config.pullOutEnabled ? "text-white" : "text-blue-600")} />
            <div className="flex flex-col items-start">
              <span className="text-xs font-bold">Pull-out Extension</span>
              <span className={cn("text-[9px]", config.pullOutEnabled ? "text-blue-100" : "text-[#6B6860]")}>
                +350mm sliding length
              </span>
            </div>
          </div>
          <div className={cn(
            "w-8 h-4 rounded-full relative transition-colors",
            config.pullOutEnabled ? "bg-white/30" : "bg-[#F4F3F0]"
          )}>
            <div className={cn(
              "absolute top-0.5 w-3 h-3 rounded-full transition-all",
              config.pullOutEnabled ? "right-0.5 bg-white" : "left-0.5 bg-[#6B6860]"
            )} />
          </div>
        </button>
      </div>

      {/* Smart Space Saving Ideas */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-3.5 h-3.5 text-blue-600" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#1A1917]">Space Saving Ideas</span>
        </div>
        
        <div className="grid grid-cols-1 gap-2">
          {SMART_BED_IDEAS.map((idea) => {
            const isSelected = selectedSmartIdeas.includes(idea.id);
            return (
              <button
                key={idea.id}
                onClick={() => toggleSmartIdea(idea.id)}
                className={cn(
                  "flex items-center justify-between p-3 rounded-xl border transition-all text-left group",
                  isSelected 
                    ? "bg-blue-50 border-blue-200" 
                    : "bg-white border-[#E8E6E1] hover:border-[#D1CFCA]"
                )}
              >
                <div className="flex-1 pr-4">
                  <span className={cn("text-xs font-bold block", isSelected ? "text-blue-900" : "text-[#1A1917]")}>
                    {idea.name}
                  </span>
                  <span className="text-[9px] text-[#6B6860] line-clamp-1 mt-0.5 group-hover:line-clamp-none transition-all">
                    {idea.description}
                  </span>
                </div>
                <div className={cn(
                  "w-4 h-4 rounded border flex items-center justify-center transition-all",
                  isSelected ? "bg-blue-600 border-blue-600 text-white" : "bg-white border-[#E8E6E1]"
                )}>
                  {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
