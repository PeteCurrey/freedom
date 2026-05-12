"use client";

import React, { useRef, useEffect } from 'react';
import { Group, Rect, Text, Ring } from 'react-konva';
import { usePlannerStore } from '../store/plannerStore';
import { COMPONENT_LIBRARY } from '../data/componentLibrary';
import { mmToPx, snapToGrid } from '../utils/canvasUtils';
import type { PlacedComponent as PlacedComponentType } from '../types';

interface PlacedComponentProps {
  component: PlacedComponentType;
  isSelected: boolean;
}

export function PlacedComponent({ component, isSelected }: PlacedComponentProps) {
  const { 
    selectComponent, 
    updateComponentPosition, 
    pulsingComponentIds,
    activeMode
  } = usePlannerStore();
  
  const def = COMPONENT_LIBRARY.find(d => d.id === component.componentId);
  const isPulsing = pulsingComponentIds.includes(component.instanceId);
  const ringRef = useRef<any>(null);

  // Category based colors (Premium Light Palette)
  const colors: Record<string, string> = {
    'Sleeping': '#DBEAFE', // Blue 100
    'Kitchen': '#FEE2E2',  // Red 100
    'Storage': '#FEF3C7',  // Amber 100
    'Electrical': '#E0F2FE', // Cyan 100
    'Plumbing': '#DCFCE7',  // Green 100
    'Heating': '#FFEDD5',  // Orange 100
    'Appliances': '#F3E8FF', // Purple 100
    'Safety': '#F1F5F9',   // Slate 100
    'Seating': '#FCE7F3',   // Pink 100
  };

  const borderColors: Record<string, string> = {
    'Sleeping': '#2563EB', 
    'Kitchen': '#DC2626',
    'Storage': '#D97706',
    'Electrical': '#0284C7',
    'Plumbing': '#16A34A',
    'Heating': '#EA580C',
    'Appliances': '#9333EA',
    'Safety': '#475569',
    'Seating': '#DB2777',
  };

  const category = def?.category || 'Safety';
  const color = colors[category] || '#F1F5F9';
  const borderColor = borderColors[category] || '#475569';

  // Pulse animation
  useEffect(() => {
    if (isPulsing && ringRef.current) {
      ringRef.current.to({
        innerRadius: 10,
        outerRadius: 60,
        opacity: 0,
        duration: 0.6,
        onFinish: () => {
          ringRef.current.setAttrs({ innerRadius: 0, outerRadius: 0, opacity: 0.6 });
        }
      });
    }
  }, [isPulsing]);

  // Mode based opacity
  let opacity = 1;
  if (activeMode === 'electrical' && def?.systemType !== 'electrical') opacity = 0.2;
  if (activeMode === 'plumbing' && def?.systemType !== 'plumbing') opacity = 0.2;
  if (activeMode === 'weight') {
    // Highlight heavy items
    if ((def?.weightKg || 0) < 10) opacity = 0.4;
  }

  const width = mmToPx(component.widthMm);
  const depth = mmToPx(component.depthMm);

  return (
    <Group
      x={mmToPx(component.x)}
      y={mmToPx(component.y)}
      draggable
      onClick={(e) => {
        e.cancelBubble = true;
        selectComponent(component.instanceId);
      }}
      onDragEnd={(e) => {
        const x = snapToGrid(e.target.x());
        const y = snapToGrid(e.target.y());
        updateComponentPosition(component.instanceId, x * 10, y * 10);
      }}
      opacity={opacity}
    >
      {/* Pulse Ring */}
      <Ring
        ref={ringRef}
        innerRadius={0}
        outerRadius={0}
        stroke="#2563EB"
        strokeWidth={2}
        opacity={0.6}
        x={width / 2}
        y={depth / 2}
      />

      {/* Main Box */}
      <Rect
        width={width}
        height={depth}
        fill={color}
        stroke={isSelected ? borderColor : '#E8E6E1'}
        strokeWidth={isSelected ? 2 : 1}
        cornerRadius={4}
        shadowColor="rgba(0,0,0,0.05)"
        shadowBlur={isSelected ? 10 : 0}
        shadowOffset={{ x: 2, y: 2 }}
        shadowOpacity={0.5}
      />

      {/* Label */}
      <Text
        text={def?.name || 'Component'}
        fontSize={8}
        fontFamily="JetBrains Mono, monospace"
        fill="#1A1917"
        fontStyle="bold"
        padding={6}
        width={width}
        align="center"
        verticalAlign="middle"
        height={depth}
        wrap="word"
        ellipsis={true}
      />

      {/* Selection Handles (Simplified visual for now) */}
      {isSelected && (
        <Group>
          <Rect x={-2} y={-2} width={4} height={4} fill="white" stroke={borderColor} strokeWidth={1} />
          <Rect x={width - 2} y={-2} width={4} height={4} fill="white" stroke={borderColor} strokeWidth={1} />
          <Rect x={-2} y={depth - 2} width={4} height={4} fill="white" stroke={borderColor} strokeWidth={1} />
          <Rect x={width - 2} y={depth - 2} width={4} height={4} fill="white" stroke={borderColor} strokeWidth={1} />
        </Group>
      )}
    </Group>
  );
}
