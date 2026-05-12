"use client";

import React, { useState } from 'react';
import { COMPONENT_LIBRARY, COMPONENT_CATEGORIES } from '../data/componentLibrary';
import { ComponentCard } from './ComponentCard';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ComponentLibrary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredComponents = COMPONENT_LIBRARY.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         c.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Search & Filter */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6860]" />
          <input
            type="text"
            placeholder="Search components..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#F4F3F0] border border-[#E8E6E1] rounded-lg pl-10 pr-4 py-2 text-sm text-[#1A1917] focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all"
          />
        </div>

        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setSelectedCategory('All')}
            className={cn(
              "px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider border transition-all",
              selectedCategory === 'All'
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-[#6B6860] border-[#E8E6E1] hover:border-[#D1CFCA]"
            )}
          >
            All
          </button>
          {COMPONENT_CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider border transition-all",
                selectedCategory === cat
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-[#6B6860] border-[#E8E6E1] hover:border-[#D1CFCA]"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="space-y-3">
        {filteredComponents.length > 0 ? (
          filteredComponents.map(component => (
            <ComponentCard key={component.id} component={component} />
          ))
        ) : (
          <div className="py-12 text-center">
            <p className="text-xs text-[#6B6860]">No components found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
