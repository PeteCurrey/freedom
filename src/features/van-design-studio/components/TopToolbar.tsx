"use client";

import React from 'react';
import { 
  Save, 
  Download, 
  RotateCcw, 
  Undo2, 
  Redo2, 
  Layout, 
  Zap, 
  Droplets, 
  Weight, 
  ListOrdered, 
  Box,
  FileText,
  Sparkles
} from 'lucide-react';
import { usePlannerStore } from '../store/plannerStore';
import { cn } from '@/lib/utils';
import type { PlannerMode } from '../types';

import { ResetProjectDialog } from './ResetProjectDialog';

export function TopToolbar() {
  const { 
    projectName, 
    setProjectName, 
    activeMode, 
    setMode 
  } = usePlannerStore();

  const [isResetOpen, setIsResetOpen] = React.useState(false);

  const modes: { id: PlannerMode; label: string; icon: any }[] = [
    { id: 'layout', label: 'Layout', icon: Layout },
    { id: 'electrical', label: 'Electrical', icon: Zap },
    { id: 'plumbing', label: 'Plumbing', icon: Droplets },
    { id: 'weight', label: 'Weight', icon: Weight },
    { id: 'bom', label: 'BOM', icon: ListOrdered },
    { id: '3d', label: '3D Preview', icon: Box },
  ];

  return (
    <header className="h-14 border-b border-[#E8E6E1] bg-white flex items-center justify-between px-6 z-30">
      <ResetProjectDialog isOpen={isResetOpen} onClose={() => setIsResetOpen(false)} />
      
      {/* Brand & Project Name */}
      <div className="flex items-center gap-6">
        <div className="flex flex-col">
          <span className="font-bold text-[11px] uppercase tracking-[0.2em] text-[#1A1917]">
            Amplios <span className="text-blue-600">Design Studio</span>
          </span>
        </div>
        
        <div className="h-8 w-px bg-[#E8E6E1]" />
        
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="bg-transparent border-none focus:ring-0 font-medium text-sm text-[#1A1917] p-0 w-48"
          placeholder="Untitled Project"
        />
      </div>

      {/* Mode Selector */}
      <nav className="flex items-center bg-[#F4F3F0] rounded-full p-1 border border-[#E8E6E1]">
        {modes.map((mode) => {
          const Icon = mode.icon;
          const isActive = activeMode === mode.id;
          return (
            <button
              key={mode.id}
              onClick={() => setMode(mode.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-1.5 rounded-full transition-all duration-200",
                isActive 
                  ? "bg-white text-[#1A1917] shadow-sm border border-[#E8E6E1]" 
                  : "text-[#6B6860] hover:text-[#1A1917]"
              )}
            >
              <Icon className={cn("w-3.5 h-3.5", isActive ? "text-blue-600" : "text-[#6B6860]")} />
              <span className="text-[11px] font-semibold uppercase tracking-wider">{mode.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 mr-4">
          <button className="p-2 text-[#6B6860] hover:bg-[#F4F3F0] rounded-lg transition-colors opacity-40 cursor-not-allowed">
            <Undo2 className="w-4 h-4" />
          </button>
          <button className="p-2 text-[#6B6860] hover:bg-[#F4F3F0] rounded-lg transition-colors opacity-40 cursor-not-allowed">
            <Redo2 className="w-4 h-4" />
          </button>
        </div>

        <button 
          onClick={() => setIsResetOpen(true)}
          className="flex items-center gap-2 px-3 py-2 text-[#6B6860] hover:text-red-600 hover:bg-red-50 rounded-lg transition-all text-[11px] font-semibold uppercase tracking-wider"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </button>

        <button className="flex items-center gap-2 px-3 py-2 bg-white border border-[#E8E6E1] text-[#1A1917] hover:bg-[#F4F3F0] rounded-lg transition-all text-[11px] font-semibold uppercase tracking-wider shadow-sm">
          <Save className="w-3.5 h-3.5" />
          Save
        </button>

        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-all text-[11px] font-bold uppercase tracking-widest shadow-lg shadow-blue-200">
          <Sparkles className="w-3.5 h-3.5" />
          Generate Build Plan
        </button>
      </div>
    </header>
  );
}
