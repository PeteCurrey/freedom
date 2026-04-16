"use client";

import React from 'react';

export type SystemTier = 'basic' | 'mid' | 'pro' | 'none';

interface SchematicProps {
  system: string;
  tier: SystemTier;
  vehicleWidth?: number;
  vehicleLength?: number;
}

export const SVGSchematic: React.FC<SchematicProps> = ({ system, tier, vehicleWidth = 1800, vehicleLength = 6000 }) => {
  if (tier === 'none') return null;

  // Basic Viewbox for a 1:20 scale representation
  // Van is roughly 6m x 2m -> mapped to 600x200 SVG units
  const viewWidth = Math.max(100, (vehicleLength || 6000) / 10);
  const viewHeight = Math.max(50, (vehicleWidth || 1800) / 10);

  return (
    <svg 
      viewBox={`0 0 ${viewWidth} ${viewHeight}`} 
      className="w-full h-auto bg-brand-carbon/30 blueprint-border"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,107,0,0.1)" strokeWidth="0.5"/>
        </pattern>
      </defs>
      
      <rect width="100%" height="100%" fill="url(#grid)" />
      
      {/* Vehicle Outline */}
      <rect 
        x="5" y="5" 
        width={viewWidth - 10} height={viewHeight - 10} 
        fill="none" 
        stroke="rgba(255,255,255,0.2)" 
        strokeWidth="1" 
        rx="10" 
      />

      {/* Dynamic Schematic Layer */}
      {system === 'electrical' && <ElectricalLayer tier={tier} viewWidth={viewWidth} viewHeight={viewHeight} />}
      {(system === 'plumbing' || system === 'water') && <PlumbingLayer tier={tier} viewWidth={viewWidth} viewHeight={viewHeight} />}
      {system === 'heating' && <HeatingLayer tier={tier} viewWidth={viewWidth} viewHeight={viewHeight} />}

      {/* Annotations */}
      <text x="10" y="20" fill="orange" fontSize="6" fontWeight="bold" className="font-mono">
        {system.toUpperCase()} SCHEMA // TIER: {tier.toUpperCase()}
      </text>
    </svg>
  );
};

const ElectricalLayer = ({ tier, viewWidth, viewHeight }: { tier: SystemTier, viewWidth: number, viewHeight: number }) => {
  return (
    <g>
      {/* Component Symbols (Simplified) */}
      {/* Battery Bank */}
      <rect x="20" y={viewHeight - 40} width="30" height="20" fill="rgba(255,107,0,0.2)" stroke="#FF6B00" strokeWidth="1" />
      <text x="22" y={viewHeight - 25} fill="white" fontSize="4" className="font-mono">BATT</text>

      {/* Inverter/Charger (Mid/Pro) */}
      {(tier === 'mid' || tier === 'pro') && (
        <g>
          <rect x="60" y={viewHeight - 40} width="25" height="20" fill="rgba(0,120,255,0.1)" stroke="#0078FF" strokeWidth="1" />
          <text x="62" y={viewHeight - 25} fill="white" fontSize="4" className="font-mono">INV/CHG</text>
          <path d={`M 50 ${viewHeight - 30} L 60 ${viewHeight - 30}`} stroke="#FF6B00" strokeWidth="1" strokeDasharray="2,2" />
        </g>
      )}

      {/* Solar (Pro) */}
      {tier === 'pro' && (
        <g>
          <rect x="100" y="20" width="80" height="30" fill="rgba(80,255,80,0.1)" stroke="#50FF50" strokeWidth="0.5" strokeDasharray="4,2" />
          <text x="110" y="38" fill="white" fontSize="4" className="font-mono">SOLAR ARRAY (400W+)</text>
          <path d={`M 140 50 L 140 ${viewHeight - 30} L 85 ${viewHeight - 30}`} stroke="#50FF50" strokeWidth="0.5" fill="none" />
        </g>
      )}

      {/* Distribution */}
      <circle cx={viewWidth - 30} cy={viewHeight / 2} r="5" fill="#FF6B00" />
      <text x={viewWidth - 55} y={viewHeight / 2 + 2} fill="rgba(255,255,255,0.5)" fontSize="4" className="font-mono">DC HUB</text>
    </g>
  );
};

const PlumbingLayer: React.FC<{ tier: SystemTier, viewWidth: number, viewHeight: number }> = () => {
  return (
    <g>
      {/* Fresh Tank */}
      <rect x="40" y="20" width="50" height="30" fill="rgba(0,180,255,0.1)" stroke="#00B4FF" strokeWidth="1" />
      <text x="45" y="38" fill="white" fontSize="4" className="font-mono">FRESH WATER (80L+)</text>
      
      {/* Grey Tank (External) */}
      <rect x="40" y="185" width="40" height="10" fill="rgba(100,100,100,0.1)" stroke="#646464" strokeWidth="1" strokeDasharray="2,2" />
      <text x="42" y="192" fill="white" fontSize="3" className="font-mono">GREY TANK (EXT)</text>
    </g>
  );
};

const HeatingLayer: React.FC<{ tier: SystemTier, viewWidth: number, viewHeight: number }> = ({ viewWidth, viewHeight }) => {
  return (
    <g>
      {/* Heater Unit */}
      <rect x={viewWidth / 2} y={viewHeight - 50} width="20" height="15" fill="rgba(255,50,50,0.1)" stroke="#FF3232" strokeWidth="1" />
      <text x={viewWidth / 2 + 2} y={viewHeight - 40} fill="white" fontSize="4" className="font-mono">HVAC UNIT</text>
      
      {/* Ducting */}
      <path d={`M ${viewWidth / 2 + 10} ${viewHeight - 35} L ${viewWidth / 2 + 10} ${viewHeight - 10}`} stroke="#FF3232" strokeWidth="2" strokeDasharray="1,2" />
    </g>
  );
};
