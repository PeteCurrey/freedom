"use client";

import React, { useState } from 'react';
import { 
  RotateCcw, 
  Maximize2, 
  Eye, 
  EyeOff, 
  Type, 
  Camera 
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function CameraControls3D() {
  const [showShell, setShowShell] = useState(true);
  const [showLabels, setShowLabels] = useState(true);

  return (
    <div className="absolute bottom-6 right-6 flex flex-col gap-2">
      <div className="flex flex-col gap-1 bg-white/80 backdrop-blur-sm border border-[#E8E6E1] p-1.5 rounded-2xl shadow-lg">
        <button 
          onClick={() => setShowShell(!showShell)}
          className={cn(
            "p-2.5 rounded-xl transition-all flex items-center gap-2",
            showShell ? "bg-blue-600 text-white" : "hover:bg-[#F4F3F0] text-[#6B6860]"
          )}
          title="Toggle Shell Visibility"
        >
          {showShell ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          <span className="text-[10px] font-bold uppercase tracking-widest px-1">Shell</span>
        </button>

        <button 
          onClick={() => setShowLabels(!showLabels)}
          className={cn(
            "p-2.5 rounded-xl transition-all flex items-center gap-2",
            showLabels ? "bg-blue-600 text-white" : "hover:bg-[#F4F3F0] text-[#6B6860]"
          )}
          title="Toggle Labels"
        >
          <Type className="w-4 h-4" />
          <span className="text-[10px] font-bold uppercase tracking-widest px-1">Labels</span>
        </button>

        <div className="h-px bg-[#E8E6E1] mx-2 my-1" />

        <button 
          className="p-2.5 rounded-xl hover:bg-[#F4F3F0] text-[#6B6860] transition-all flex items-center gap-2"
          title="Reset Camera"
        >
          <RotateCcw className="w-4 h-4" />
          <span className="text-[10px] font-bold uppercase tracking-widest px-1">Reset</span>
        </button>
      </div>

      <button className="flex items-center justify-center gap-2 bg-white/80 backdrop-blur-sm border border-[#E8E6E1] p-3 rounded-2xl shadow-lg hover:bg-white transition-all">
        <Camera className="w-4 h-4 text-blue-600" />
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#1A1917]">Capture Screenshot</span>
      </button>
    </div>
  );
}
