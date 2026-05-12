"use client";

import React, { useState } from 'react';
import { ChassisSelector } from './ChassisSelector';
import { ComponentLibrary } from './ComponentLibrary';
import { Truck, Box } from 'lucide-react';
import { cn } from '@/lib/utils';

export function BuildSetupPanel() {
  const [activeTab, setActiveTab] = useState<'vehicle' | 'library'>('vehicle');

  return (
    <div className="flex flex-col h-full">
      {/* Tabs */}
      <div className="flex border-b border-[#E8E6E1]">
        <button
          onClick={() => setActiveTab('vehicle')}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-4 text-[11px] font-bold uppercase tracking-widest transition-all",
            activeTab === 'vehicle' 
              ? "text-blue-600 border-b-2 border-blue-600" 
              : "text-[#6B6860] hover:text-[#1A1917] bg-[#F9F8F6]"
          )}
        >
          <Truck className="w-4 h-4" />
          Build Setup
        </button>
        <button
          onClick={() => setActiveTab('library')}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-4 text-[11px] font-bold uppercase tracking-widest transition-all",
            activeTab === 'library' 
              ? "text-blue-600 border-b-2 border-blue-600" 
              : "text-[#6B6860] hover:text-[#1A1917] bg-[#F9F8F6]"
          )}
        >
          <Box className="w-4 h-4" />
          Components
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
        {activeTab === 'vehicle' ? (
          <ChassisSelector />
        ) : (
          <ComponentLibrary />
        )}
      </div>

      {/* Footer Info */}
      <div className="p-4 border-t border-[#E8E6E1] bg-[#F9F8F6]">
        <p className="text-[10px] text-[#6B6860] italic leading-relaxed">
          * All chassis and component figures are provisional sample data for planning purposes only.
        </p>
      </div>
    </div>
  );
}
