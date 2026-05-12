"use client";

import React from 'react';
import { MousePointer2, Plus } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
      <div className="max-w-xs text-center space-y-6">
        <div className="w-16 h-16 bg-white border border-[#E8E6E1] rounded-2xl shadow-sm flex items-center justify-center mx-auto">
          <MousePointer2 className="w-6 h-6 text-blue-600 animate-bounce" />
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-[#1A1917] uppercase tracking-widest">Start Your Layout</h3>
          <p className="text-[11px] text-[#6B6860] leading-relaxed">
            Choose components from the left library and drag them onto the canvas to begin planning your build.
          </p>
        </div>
        <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-blue-600 uppercase tracking-tighter">
          <Plus className="w-3 h-3" />
          Click a component to add it
        </div>
      </div>
    </div>
  );
}
