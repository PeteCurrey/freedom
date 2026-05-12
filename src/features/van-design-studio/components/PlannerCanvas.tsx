"use client";

import React, { useRef, useEffect, useState } from 'react';
import { Stage, Layer, Rect, Text, Group, Line } from 'react-konva';
import { usePlannerStore } from '../store/plannerStore';
import { CHASSIS_DATA } from '../data/chassisData';
import { PlacedComponent } from './PlacedComponent';
import { VanOutline } from './VanOutline';
import { EmptyState } from './EmptyState';
import { mmToPx } from '../utils/canvasUtils';

/**
 * Main 2D Planner Canvas using Konva.
 */
export function PlannerCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const { 
    selectedChassisId, 
    placedComponents, 
    selectedPlacedComponentId,
    selectComponent,
    updateComponentPosition
  } = usePlannerStore();

  const chassis = CHASSIS_DATA.find(c => c.id === selectedChassisId);
  
  // Responsive resize handler
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        });
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  if (!chassis) return null;

  const vanWidthPx = mmToPx(chassis.internalWidthMm);
  const vanLengthPx = mmToPx(chassis.internalLengthMm);

  // Center van in canvas
  const padding = 60;
  const stageScale = Math.min(
    (dimensions.width - padding * 2) / vanWidthPx,
    (dimensions.height - padding * 2) / vanLengthPx,
    1 // Max scale 1:1 (10mm = 1px)
  );

  const stageX = (dimensions.width - vanWidthPx * stageScale) / 2;
  const stageY = (dimensions.height - vanLengthPx * stageScale) / 2;

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full cursor-grab active:cursor-grabbing outline-none"
      onClick={() => selectComponent(null)}
    >
      {placedComponents.length === 0 && <EmptyState />}
      
      <Stage 
        width={dimensions.width} 
        height={dimensions.height}
      >
        <Layer 
          x={stageX} 
          y={stageY} 
          scaleX={stageScale} 
          scaleY={stageScale}
        >
          {/* Background Grid - technical feeling */}
          <TechnicalGrid width={vanWidthPx} height={vanLengthPx} />

          {/* Van Outline & Markers */}
          <VanOutline chassis={chassis} />

          {/* Placed Components */}
          {placedComponents.map((pc) => (
            <PlacedComponent 
              key={pc.instanceId} 
              component={pc} 
              isSelected={selectedPlacedComponentId === pc.instanceId}
            />
          ))}
        </Layer>
      </Stage>

      {/* Scale Indicator */}
      <div className="absolute bottom-6 left-6 flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-[#E8E6E1] px-4 py-2 rounded-full shadow-sm">
        <div className="w-10 h-px bg-[#1A1917] relative">
          <div className="absolute -left-px -top-1 w-px h-2 bg-[#1A1917]" />
          <div className="absolute -right-px -top-1 w-px h-2 bg-[#1A1917]" />
        </div>
        <span className="text-[10px] font-bold font-mono text-[#1A1917] uppercase tracking-tighter">1 Metre</span>
      </div>
    </div>
  );
}

function TechnicalGrid({ width, height }: { width: number, height: number }) {
  const gridSize = 10; // 100mm in our 0.1 scale
  const lines = [];
  
  // Vertical lines
  for (let i = 0; i <= width; i += gridSize) {
    lines.push(<Line key={`v-${i}`} points={[i, 0, i, height]} stroke="#E8E6E1" strokeWidth={0.5} opacity={0.4} />);
  }
  
  // Horizontal lines
  for (let i = 0; i <= height; i += gridSize) {
    lines.push(<Line key={`h-${i}`} points={[0, i, width, i]} stroke="#E8E6E1" strokeWidth={0.5} opacity={0.4} />);
  }

  return <Group>{lines}</Group>;
}
