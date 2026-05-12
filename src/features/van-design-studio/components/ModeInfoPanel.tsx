"use client";

import React from 'react';
import { usePlannerStore } from '../store/plannerStore';
import { Zap, Droplets, Weight, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ModeInfoPanel() {
  const activeMode = usePlannerStore((state) => state.activeMode);

  if (activeMode === 'layout' || activeMode === 'bom' || activeMode === '3d') return null;

  const modeContent = {
    electrical: {
      icon: <Zap className="w-5 h-5 text-blue-600" />,
      title: 'Electrical Planning Mode',
      description: 'Highlighting power components. Fade other items to focus on battery placement, cable routing, and fuse board logic.',
      tips: [
        'Place heavy batteries over the rear axle where possible.',
        'Keep cable runs between battery and inverter as short as possible.',
        'Ensure fuse board is accessible but protected.'
      ]
    },
    plumbing: {
      icon: <Droplets className="w-5 h-5 text-blue-600" />,
      title: 'Plumbing Planning Mode',
      description: 'Focusing on water systems. Visualize tank placement, pump location, and pipe routes.',
      tips: [
        'Locate fresh water tanks centrally to maintain vehicle balance.',
        'Ensure waste tanks are lower than drain points.',
        'Keep pump accessible for winterisation and maintenance.'
      ]
    },
    weight: {
      icon: <Weight className="w-5 h-5 text-blue-600" />,
      title: 'Weight Distribution Mode',
      description: 'Visualizing payload intensity. Heavier components are highlighted to help you balance the load.',
      tips: [
        'Aim for even distribution between left and right sides.',
        'Keep heavy loads between the axles for better handling.',
        'Monitor the live payload tracker in the right panel.'
      ]
    }
  };

  const current = modeContent[activeMode as keyof typeof modeContent];
  if (!current) return null;

  return (
    <div className="absolute top-6 left-6 w-80 bg-white/90 backdrop-blur-md border border-[#E8E6E1] p-6 rounded-2xl shadow-xl z-30 animate-in fade-in slide-in-from-left-4 duration-500">
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 bg-blue-50 rounded-xl">
          {current.icon}
        </div>
        <h4 className="text-sm font-bold text-[#1A1917] uppercase tracking-tight">{current.title}</h4>
      </div>
      
      <p className="text-[11px] text-[#6B6860] leading-relaxed mb-6">
        {current.description}
      </p>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Info className="w-3.5 h-3.5 text-blue-600" />
          <span className="text-[9px] font-bold uppercase tracking-widest text-[#1A1917]">Expert Tips</span>
        </div>
        <ul className="space-y-2">
          {current.tips.map((tip, i) => (
            <li key={i} className="flex gap-2 text-[10px] text-[#6B6860] leading-snug">
              <span className="text-blue-600">•</span>
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
