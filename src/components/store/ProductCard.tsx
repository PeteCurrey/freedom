"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  category: string;
  specs?: Record<string, string | number | undefined>;
  className?: string;
}

export function ProductCard({
  id,
  name,
  brand,
  price,
  image,
  specs,
  className,
}: ProductCardProps) {
  const formattedPrice = (price / 100).toLocaleString("en-GB", {
    style: "currency",
    currency: "GBP",
  });

  return (
    <div
      className={cn(
        "group relative bg-brand-surface border border-brand-border overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-orange/10",
        className
      )}
    >
      {/* Blueprint Grid Overlay */}
      <div className="absolute inset-0 blueprint-grid opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" />

      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-brand-obsidian">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-brand-obsidian/0 group-hover:bg-brand-obsidian/40 transition-colors duration-500" />
        
        {/* Quick View Specs */}
        {specs && (
          <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-brand-obsidian/80 backdrop-blur-md border-t border-brand-border">
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(specs).slice(0, 4).map(([key, value]) => (
                <div key={key} className="flex flex-col">
                  <span className="font-mono text-[8px] text-brand-grey uppercase tracking-widest">
                    {key}
                  </span>
                  <span className="font-mono text-[10px] text-brand-white uppercase truncate">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.2em]">
            {brand}
          </span>
          <span className="font-mono text-xs text-brand-white font-bold">{formattedPrice}</span>
        </div>
        
        <h3 className="font-display text-sm uppercase leading-snug mb-4 h-10 line-clamp-2">
          <Link href={`/store/product/${id}`} className="hover:text-brand-orange transition-colors">
            {name}
          </Link>
        </h3>

        <div className="flex items-center gap-3">
          <button className="flex-1 bg-brand-obsidian border border-brand-border hover:border-brand-orange hover:bg-brand-orange text-brand-white text-[10px] font-display uppercase tracking-widest py-3 transition-all duration-300 flex items-center justify-center gap-2">
            <Plus className="w-3 h-3" /> Add to Cart
          </button>
          <button className="w-12 h-11 bg-brand-graphite border border-brand-border flex items-center justify-center text-brand-white hover:text-brand-orange hover:border-brand-orange transition-all">
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Blueprint corners on hover */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-brand-orange opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-brand-orange opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
}
