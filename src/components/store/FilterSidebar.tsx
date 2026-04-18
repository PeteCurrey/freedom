"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterGroup {
  id: string;
  name: string;
  options: { label: string; value: string; count?: number }[];
}

interface FilterSidebarProps {
  filters: FilterGroup[];
  selectedFilters: Record<string, string[]>;
  onFilterChange: (groupId: string, value: string) => void;
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
  className?: string;
  onClearAll: () => void;
}

export function FilterSidebar({
  filters,
  selectedFilters,
  onFilterChange,
  priceRange,
  onPriceChange,
  className,
  onClearAll,
}: FilterSidebarProps) {
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    brand: true,
    tier: true,
    vehicle: true,
    price: true,
  });

  const toggleGroup = (id: string) => {
    setExpandedGroups(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <aside className={cn("space-y-8 h-fit", className)}>
      <div className="flex items-center justify-between border-b border-brand-border pb-4">
        <h2 className="font-display text-xs uppercase tracking-[0.2em]">Filters</h2>
        <button 
          onClick={onClearAll}
          className="font-mono text-[9px] text-brand-orange hover:text-white transition-colors uppercase tracking-widest"
        >
          Reset All [×]
        </button>
      </div>

      {/* Price Range Filter */}
      <div className="border-b border-brand-border pb-6">
        <button 
          onClick={() => toggleGroup('price')}
          className="flex items-center justify-between w-full mb-4"
        >
          <span className="font-display text-[10px] uppercase tracking-widest">Price Range</span>
          {expandedGroups['price'] ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        </button>
        {expandedGroups['price'] && (
          <div className="space-y-4">
            <div className="flex justify-between font-mono text-[10px] text-brand-grey">
              <span>£{priceRange[0]}</span>
              <span>£{priceRange[1]}</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="10000" 
              step="100"
              value={priceRange[1]}
              onChange={(e) => onPriceChange([priceRange[0], parseInt(e.target.value)])}
              className="w-full accent-brand-orange bg-brand-obsidian h-1 appearance-none cursor-pointer"
            />
          </div>
        )}
      </div>

      {/* Dynamic Filter Groups */}
      {filters.map((group) => (
        <div key={group.id} className="border-b border-brand-border pb-6">
          <button 
            onClick={() => toggleGroup(group.id)}
            className="flex items-center justify-between w-full mb-4"
          >
            <span className="font-display text-[10px] uppercase tracking-widest">{group.name}</span>
            {expandedGroups[group.id] ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          </button>
          
          {expandedGroups[group.id] && (
            <div className="space-y-2">
              {group.options.map((opt) => {
                const isSelected = selectedFilters[group.id]?.includes(opt.value);
                return (
                  <button
                    key={opt.value}
                    onClick={() => onFilterChange(group.id, opt.value)}
                    className="flex items-center justify-between w-full group/item"
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-3 h-3 border transition-all",
                        isSelected ? "bg-brand-orange border-brand-orange" : "border-brand-border group-hover/item:border-brand-orange"
                      )} />
                      <span className={cn(
                        "font-mono text-[10px] uppercase tracking-widest transition-colors",
                        isSelected ? "text-white" : "text-brand-grey group-hover/item:text-white"
                      )}>
                        {opt.label}
                      </span>
                    </div>
                    {opt.count !== undefined && (
                      <span className="font-mono text-[9px] text-brand-border">({opt.count})</span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </aside>
  );
}
