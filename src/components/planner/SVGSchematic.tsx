"use client";

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Settings, Zap, Droplets, Thermometer, Flame } from 'lucide-react';

export type SystemTier = 'basic' | 'mid' | 'pro' | 'none';

interface SchematicProps {
  system?: string; // specific system for single-step view
  tier?: SystemTier; // specific tier for single-step
  masterSelections?: Record<string, string>; // All systems for step 14
  vehicleWidth?: number;
  vehicleLength?: number;
  className?: string;
}

export const SVGSchematic: React.FC<SchematicProps> = ({ 
  system, 
  tier, 
  masterSelections, 
  vehicleWidth = 1800, 
  vehicleLength = 6000,
  className 
}) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  if (!masterSelections && tier === 'none') return null;

  // Van mapped to 600x200 SVG units
  const viewWidth = Math.max(100, (vehicleLength || 6000) / 10);
  const viewHeight = Math.max(50, (vehicleWidth || 1800) / 10);

  // If masterSelections is provided, we composite everything
  const renderAll = !!masterSelections;
  
  // Helper to determine if we should render a specific system
  const shouldRender = (sys: string) => {
    if (renderAll && masterSelections) {
      return masterSelections[sys] && masterSelections[sys] !== 'none';
    }
    return system === sys && tier !== 'none';
  };

  const getTier = (sys: string): SystemTier => {
    if (renderAll && masterSelections) return masterSelections[sys] as SystemTier || 'basic';
    return tier as SystemTier || 'basic';
  };

  return (
    <svg 
      viewBox={`0 0 ${viewWidth} ${viewHeight}`} 
      className={cn("w-full h-auto bg-brand-carbon/30 blueprint-border relative overflow-hidden", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="grid-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5"/>
        </pattern>
        {/* Glow Effects */}
        <filter id="glow-orange" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="glow-blue" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      {/* Background Grid */}
      <rect width="100%" height="100%" fill="url(#grid-pattern)" />
      
      {/* Structural Chassis Base Outline */}
      <g opacity={renderAll ? "0.3" : "1"}>
        {/* Wheels */}
        <rect x="80" y="-5" width="40" height="10" fill="#222" rx="2" />
        <rect x="80" y={viewHeight - 5} width="40" height="10" fill="#222" rx="2" />
        <rect x={viewWidth - 120} y="-5" width="40" height="10" fill="#222" rx="2" />
        <rect x={viewWidth - 120} y={viewHeight - 5} width="40" height="10" fill="#222" rx="2" />
        
        {/* Body */}
        <rect 
          x="10" y="5" 
          width={viewWidth - 20} height={viewHeight - 10} 
          fill="none" 
          stroke="rgba(255,255,255,0.4)" 
          strokeWidth="1.5" 
          rx="15" 
        />
        {/* Cab Separator */}
        <line x1="120" y1="5" x2="120" y2={viewHeight - 5} stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="5,5" />
      </g>

      {/* Dynamic Schematic Layers - Render with transition animations in CSS */}
      <g className="animate-in fade-in duration-1000">
        {shouldRender('electrical') && <ElectricalLayer tier={getTier('electrical')} viewWidth={viewWidth} viewHeight={viewHeight} isMaster={renderAll} />}
        {(shouldRender('plumbing') || shouldRender('water')) && <PlumbingLayer tier={getTier('water') || getTier('plumbing')} viewWidth={viewWidth} viewHeight={viewHeight} isMaster={renderAll} />}
        {shouldRender('heating') && <HeatingLayer tier={getTier('heating')} viewWidth={viewWidth} viewHeight={viewHeight} isMaster={renderAll} />}
        {shouldRender('gas') && <GasLayer tier={getTier('gas')} viewWidth={viewWidth} viewHeight={viewHeight} isMaster={renderAll} />}
      </g>

      {/* Annotations */}
      <text x="15" y="25" fill={renderAll ? "white" : "orange"} fontSize="7" fontWeight="bold" className="font-mono" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)"}}>
        {renderAll ? "MASTER ENGINEERING MANIFEST" : `${system?.toUpperCase()} SCHEMA`}
      </text>
      <text x="15" y="38" fill="rgba(255,255,255,0.5)" fontSize="5" className="font-mono">
        SCALE: 1:20 // ALL UNITS IN MM
      </text>

      {/* Crosshairs & Alignment Marks */}
      <path d="M 0 50 L 10 50 M 590 50 L 600 50" stroke="rgba(255,107,0,0.5)" strokeWidth="0.5" />
      <path d="M 300 0 L 300 10 M 300 190 L 300 200" stroke="rgba(255,107,0,0.5)" strokeWidth="0.5" />
    </svg>
  );
};

// --- Component Layers ---

const ElectricalLayer = ({ tier, viewWidth, viewHeight, isMaster }: { tier: SystemTier, viewWidth: number, viewHeight: number, isMaster: boolean }) => {
  const yOffset = isMaster ? 30 : 0; // shift lines in master view to prevent overlap
  return (
    <g>
      {/* Battery Bank */}
      <rect x="140" y={viewHeight - 45 - yOffset} width="40" height="25" fill="rgba(255,107,0,0.2)" stroke="#FF6B00" strokeWidth="1.5" />
      <text x="145" y={viewHeight - 27 - yOffset} fill="white" fontSize="6" className="font-mono font-bold">LIP04</text>

      {/* Inverter/Charger (Mid/Pro) */}
      {(tier === 'mid' || tier === 'pro') && (
        <g>
          <rect x="190" y={viewHeight - 45 - yOffset} width="35" height="25" fill="rgba(255,107,0,0.1)" stroke="#FF6B00" strokeWidth="1" />
          <text x="195" y={viewHeight - 27 - yOffset} fill="#FF6B00" fontSize="5" className="font-mono pt-1">INV</text>
          {/* Main bus wiring */}
          <path d={`M 180 ${viewHeight - 32 - yOffset} L 190 ${viewHeight - 32 - yOffset}`} stroke="#FF6B00" strokeWidth="2" />
        </g>
      )}

      {/* Solar (Pro) */}
      {tier === 'pro' && (
        <g>
          <rect x="250" y="20" width="120" height="35" fill="none" stroke="#FF6B00" strokeWidth="0.5" strokeDasharray="4,2" />
          <text x="280" y="40" fill="#FF6B00" fontSize="5" className="font-mono">SOLAR ARRAY (600W)</text>
          {/* Cable drop */}
          <path d={`M 310 55 L 310 ${viewHeight - 32 - yOffset} L 225 ${viewHeight - 32 - yOffset}`} stroke="#FF6B00" strokeWidth="1" fill="none" />
        </g>
      )}

      {/* Distribution */}
      <circle cx={viewWidth - 100} cy={viewHeight / 2} r="8" fill="none" stroke="#FF6B00" strokeWidth="1.5" />
      <circle cx={viewWidth - 100} cy={viewHeight / 2} r="3" fill="#FF6B00" filter="url(#glow-orange)" />
      {/* 12V Run */}
      <path d={`M 225 ${viewHeight - 40 - yOffset} L 225 ${viewHeight / 2 + 5} L ${viewWidth - 108} ${viewHeight / 2 + 5}`} stroke="#FF6B00" strokeWidth="0.5" strokeDasharray="2,2" fill="none"/>
    </g>
  );
};

const PlumbingLayer = ({ tier, viewWidth, viewHeight, isMaster }: { tier: SystemTier, viewWidth: number, viewHeight: number, isMaster: boolean }) => {
  return (
    <g>
      {/* Fresh Tank */}
      <rect x="380" y="15" width="80" height="40" fill="rgba(0,180,255,0.15)" stroke="#00B4FF" strokeWidth="1.5" />
      <text x="390" y="32" fill="#00B4FF" fontSize="6" className="font-mono font-bold">FRESH</text>
      <text x="390" y="42" fill="rgba(255,255,255,0.7)" fontSize="4" className="font-mono">{tier === 'pro' ? '120L' : tier === 'mid' ? '80L' : '40L'}</text>
      
      {/* Water Lines */}
      {(tier === 'mid' || tier === 'pro') && (
        <path d={`M 420 55 L 420 100 L 250 100`} stroke="#00B4FF" strokeWidth="1.5" fill="none" filter="url(#glow-blue)" />
      )}

      {/* Multi-Fixtures (Pro) */}
      {tier === 'pro' && (
         <g>
           <rect x="200" y="70" width="50" height="50" fill="rgba(0,180,255,0.05)" stroke="#00B4FF" strokeDasharray="1,2" />
           <text x="210" y="95" fill="white" fontSize="4" className="font-mono">WET ROOM</text>
         </g>
      )}

      {/* Grey Tank (External Mounted) */}
      <rect x="380" y={viewHeight - 15} width="60" height="10" fill="rgba(100,100,100,0.3)" stroke="#646464" strokeWidth="1" />
      <text x="390" y={viewHeight - 8} fill="white" fontSize="4" className="font-mono">GREY MT (EXT)</text>
      {/* Drain Line */}
      <path d={`M 250 110 L 250 160 L 380 160 L 380 185`} stroke="#646464" strokeWidth="1" fill="none" strokeDasharray="2,2"/>
    </g>
  );
};

const HeatingLayer = ({ tier, viewWidth, viewHeight, isMaster }: { tier: SystemTier, viewWidth: number, viewHeight: number, isMaster: boolean }) => {
  return (
    <g>
      {/* Heater Unit */}
      <rect x={280} y={viewHeight - 60} width="35" height="25" fill="rgba(255,50,50,0.15)" stroke="#FF3232" strokeWidth="1.5" />
      <text x={285} y={viewHeight - 45} fill="#FF3232" fontSize="6" className="font-mono font-bold">HVAC</text>
      
      {/* Ducting Network */}
      <path d={`M 315 ${viewHeight - 45} L 450 ${viewHeight - 45}`} stroke="#FF3232" strokeWidth="3" strokeDasharray="3,1" fill="none" opacity="0.8" />
      <circle cx={450} cy={viewHeight - 45} r="4" fill="#FF3232" />
      
      {/* Pro Tier (Dual Fuel/Water Heating) */}
      {tier === 'pro' && (
         <g>
            <path d={`M 285 ${viewHeight - 60} L 285 25 L 380 25`} stroke="#FF3232" strokeWidth="1" strokeDasharray="2,2" fill="none" />
            <text x={285} y={20} fill="#FF3232" fontSize="4" className="font-mono">GLYCOL RADIATOR LOOP</text>
         </g>
      )}
    </g>
  );
};

const GasLayer = ({ tier, viewWidth, viewHeight, isMaster }: { tier: SystemTier, viewWidth: number, viewHeight: number, isMaster: boolean }) => {
  if (tier === 'none') return null;
  return (
    <g>
      <circle cx="500" cy="150" r="15" fill="rgba(0,255,0,0.1)" stroke="#00FF00" strokeWidth="1" />
      {tier === 'pro' && <circle cx="480" cy="150" r="15" fill="rgba(0,255,0,0.1)" stroke="#00FF00" strokeWidth="1" />}
      <text x={tier === 'pro' ? "465" : "485"} y="170" fill="#00FF00" fontSize="5" className="font-mono font-bold">LPG LOCKER</text>
      {/* Hard pipe to appliances */}
      <path d="M 500 135 L 500 60 L 450 60" stroke="#00FF00" strokeWidth="1.5" fill="none" />
    </g>
  );
};
