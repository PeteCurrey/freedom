"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  trend?: 'up' | 'down' | 'neutral';
  color?: 'blue' | 'red' | 'green' | 'amber';
}

export function StatCard({ label, value, subValue, color = 'blue' }: StatCardProps) {
  const colorClasses = {
    blue: 'text-blue-600',
    red: 'text-red-600',
    green: 'text-green-600',
    amber: 'text-amber-600',
  };

  return (
    <div className="space-y-1.5">
      <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#6B6860]">{label}</span>
      <div className="flex items-baseline gap-2">
        <span className={cn("text-xl font-bold font-mono tracking-tight text-[#1A1917]")}>
          {value}
        </span>
        {subValue && (
          <span className="text-[10px] font-medium text-[#6B6860] uppercase tracking-wider">{subValue}</span>
        )}
      </div>
    </div>
  );
}
