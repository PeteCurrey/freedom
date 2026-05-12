"use client";

import React from 'react';
import { Group, Rect, Text, Line } from 'react-konva';
import { mmToPx } from '../utils/canvasUtils';
import type { Chassis } from '../types';

interface VanOutlineProps {
  chassis: Chassis;
}

export function VanOutline({ chassis }: VanOutlineProps) {
  const width = mmToPx(chassis.internalWidthMm);
  const length = mmToPx(chassis.internalLengthMm);
  
  const archWidth = mmToPx(250); // Approx wheel arch width
  const archLength = mmToPx(900); // Approx wheel arch length
  const archOffset = mmToPx(1100); // Offset from rear

  return (
    <Group>
      {/* Internal Cargo Area */}
      <Rect
        width={width}
        height={length}
        stroke="#1A1917"
        strokeWidth={2}
        fill="white"
        cornerRadius={8}
      />

      {/* Front Cab Direction Marker */}
      <Group y={-25} x={width / 2 - 40}>
        <Rect width={80} height={20} fill="#F4F3F0" stroke="#E8E6E1" strokeWidth={1} cornerRadius={4} />
        <Text
          text="FRONT / CAB"
          fontSize={7}
          fontFamily="JetBrains Mono, monospace"
          fontStyle="bold"
          fill="#6B6860"
          width={80}
          align="center"
          y={6}
        />
        <Line points={[40, 20, 40, 25]} stroke="#E8E6E1" strokeWidth={1} dash={[2, 2]} />
      </Group>

      {/* Rear Door Marker */}
      <Group y={length + 5} x={width / 2 - 40}>
        <Line points={[40, -5, 40, 0]} stroke="#E8E6E1" strokeWidth={1} dash={[2, 2]} />
        <Rect width={80} height={20} fill="#F4F3F0" stroke="#E8E6E1" strokeWidth={1} cornerRadius={4} />
        <Text
          text="REAR DOORS"
          fontSize={7}
          fontFamily="JetBrains Mono, monospace"
          fontStyle="bold"
          fill="#6B6860"
          width={80}
          align="center"
          y={6}
        />
      </Group>

      {/* Wheel Arches */}
      <Group>
        {/* Rear Left */}
        <Rect
          x={0}
          y={length - archOffset - archLength}
          width={archWidth}
          height={archLength}
          fill="#F4F3F0"
          stroke="#E8E6E1"
          strokeWidth={1}
          cornerRadius={4}
          opacity={0.6}
        />
        {/* Rear Right */}
        <Rect
          x={width - archWidth}
          y={length - archOffset - archLength}
          width={archWidth}
          height={archLength}
          fill="#F4F3F0"
          stroke="#E8E6E1"
          strokeWidth={1}
          cornerRadius={4}
          opacity={0.6}
        />
      </Group>

      {/* Internal Dims Labels */}
      <Text
        text={`${chassis.internalWidthMm}mm (WIDTH)`}
        x={0}
        y={length / 2 - 50}
        fontSize={8}
        fontFamily="JetBrains Mono, monospace"
        fill="#6B6860"
        rotation={-90}
      />
      <Text
        text={`${chassis.internalLengthMm}mm (LENGTH)`}
        x={width / 2 - 50}
        y={-15}
        fontSize={8}
        fontFamily="JetBrains Mono, monospace"
        fill="#6B6860"
      />
    </Group>
  );
}
