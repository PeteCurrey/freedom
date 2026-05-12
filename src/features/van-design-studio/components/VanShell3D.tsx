"use client";

import React from 'react';
import { Box, Line, Text } from '@react-three/drei';
import type { Chassis } from '../types';

interface VanShell3DProps {
  chassis: Chassis;
}

export function VanShell3D({ chassis }: VanShell3DProps) {
  // Scale factor: 1000mm = 1 unit in 3D
  const w = chassis.internalWidthMm / 1000;
  const l = chassis.internalLengthMm / 1000;
  const h = chassis.internalHeightMm / 1000;

  const archW = 0.25;
  const archL = 0.9;
  const archH = 0.35;
  const archOffset = 1.1;

  return (
    <group>
      {/* Floor - solid-ish */}
      <Box args={[w, 0.05, l]} position={[0, -0.025, 0]} receiveShadow>
        <meshStandardMaterial color="#FFFFFF" opacity={0.8} transparent />
      </Box>

      {/* Walls - translucent */}
      <Box args={[0.05, h, l]} position={[-w / 2 - 0.025, h / 2, 0]}>
        <meshStandardMaterial color="#2563EB" opacity={0.1} transparent />
      </Box>
      <Box args={[0.05, h, l]} position={[w / 2 + 0.025, h / 2, 0]}>
        <meshStandardMaterial color="#2563EB" opacity={0.1} transparent />
      </Box>

      {/* Rear Wall / Doors */}
      <Box args={[w, h, 0.05]} position={[0, h / 2, l / 2 + 0.025]}>
        <meshStandardMaterial color="#2563EB" opacity={0.05} transparent />
      </Box>

      {/* Cab Separation */}
      <Box args={[w, h, 0.05]} position={[0, h / 2, -l / 2 - 0.025]}>
        <meshStandardMaterial color="#1A1917" opacity={0.2} transparent />
      </Box>

      {/* Internal Wireframe / Outline */}
      <Line 
        points={[
          [-w/2, 0, -l/2], [w/2, 0, -l/2], [w/2, 0, l/2], [-w/2, 0, l/2], [-w/2, 0, -l/2], // bottom
          [-w/2, h, -l/2], [w/2, h, -l/2], [w/2, h, l/2], [-w/2, h, l/2], [-w/2, h, -l/2], // top
        ]} 
        color="#1A1917" 
        lineWidth={1} 
        opacity={0.3}
        transparent
      />

      {/* Wheel Arches */}
      <Box args={[archW, archH, archL]} position={[-w/2 + archW/2, archH/2, l/2 - archOffset - archL/2]}>
        <meshStandardMaterial color="#E8E6E1" opacity={0.5} transparent />
      </Box>
      <Box args={[archW, archH, archL]} position={[w/2 - archW/2, archH/2, l/2 - archOffset - archL/2]}>
        <meshStandardMaterial color="#E8E6E1" opacity={0.5} transparent />
      </Box>

      {/* Markers */}
      <group position={[0, 0, -l/2 - 0.5]}>
        <Text fontSize={0.15} color="#6B6860" rotation={[-Math.PI / 2, 0, 0]}>CABIN AREA</Text>
      </group>
      <group position={[0, 0, l/2 + 0.5]}>
        <Text fontSize={0.15} color="#6B6860" rotation={[-Math.PI / 2, 0, 0]}>REAR EXIT</Text>
      </group>
    </group>
  );
}
