"use client";

import React, { useMemo } from 'react';
import { Box, Text } from '@react-three/drei';
import { COMPONENT_LIBRARY } from '../data/componentLibrary';
import type { PlacedComponent, Chassis } from '../types';

interface ComponentBox3DProps {
  component: PlacedComponent;
  isSelected: boolean;
  onSelect: () => void;
  chassis: Chassis;
}

export function ComponentBox3D({ component, isSelected, onSelect, chassis }: ComponentBox3DProps) {
  const def = COMPONENT_LIBRARY.find(d => d.id === component.componentId);
  if (!def) return null;

  // Conversion: 1000mm = 1 unit
  // Canvas (x,y) corresponds to 3D (x,z)
  // Canvas (0,0) is top-left, 3D (0,0,0) is center
  
  const w = component.widthMm / 1000;
  const d = component.depthMm / 1000;
  const h = component.heightMm / 1000;
  
  // Offset from center
  const posX = (component.x + component.widthMm / 2 - chassis.internalWidthMm / 2) / 1000;
  const posZ = (component.y + component.depthMm / 2 - chassis.internalLengthMm / 2) / 1000;
  const posY = (def.defaultHeightMm / 1000) + h / 2;

  // Category based colors
  const colors: Record<string, string> = {
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

  const color = colors[def.category] || '#475569';

  return (
    <group position={[posX, posY, posZ]}>
      <Box 
        args={[w, h, d]} 
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
        castShadow
      >
        <meshStandardMaterial 
          color={color} 
          opacity={isSelected ? 0.9 : 0.6} 
          transparent 
          emissive={isSelected ? color : 'black'}
          emissiveIntensity={isSelected ? 0.5 : 0}
        />
      </Box>

      {/* Wireframe for definition */}
      <Box args={[w, h, d]}>
        <meshStandardMaterial color="white" wireframe opacity={0.1} transparent />
      </Box>

      {/* Label above item */}
      {isSelected && (
        <group position={[0, h / 2 + 0.2, 0]}>
          <Text 
            fontSize={0.08} 
            color="#1A1917" 
            anchorX="center" 
            anchorY="middle" 
          >
            {def.name.toUpperCase()}
          </Text>
        </group>
      )}
    </group>
  );
}
