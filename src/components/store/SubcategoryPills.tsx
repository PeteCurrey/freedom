"use client";

import { cn } from "@/lib/utils";

interface Subcategory {
  slug: string;
  name: string;
}

interface SubcategoryPillsProps {
  subcategories: Subcategory[];
  activeSub: string;
  onSelect: (slug: string) => void;
  className?: string;
}

export function SubcategoryPills({
  subcategories,
  activeSub,
  onSelect,
  className,
}: SubcategoryPillsProps) {
  // Ensure "All" is always first
  const items = [{ slug: "all", name: "All" }, ...subcategories];

  return (
    <div className={cn("flex items-center gap-2 overflow-x-auto no-scrollbar py-2", className)}>
      {items.map((sub) => {
        const isActive = activeSub === sub.slug;
        return (
          <button
            key={sub.slug}
            onClick={() => onSelect(sub.slug)}
            className={cn(
              "px-6 py-2 rounded-full border font-mono text-[10px] uppercase tracking-widest transition-all whitespace-nowrap",
              isActive 
                ? "bg-brand-orange border-brand-orange text-white" 
                : "border-brand-border text-brand-grey hover:border-brand-orange hover:text-white"
            )}
          >
            {sub.name}
          </button>
        );
      })}
    </div>
  );
}
