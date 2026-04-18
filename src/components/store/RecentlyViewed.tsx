"use client";

import { useState, useEffect } from "react";
import { ProductCard } from "./ProductCard";
import { History, X } from "lucide-react";

interface Product {
  id: string;
  name: string;
  brand: string;
  price_gbp: number;
  images: string[];
  slug: string;
  spec_line?: string;
  badge?: string;
  system_tier?: string;
}

export function RecentlyViewed() {
  const [history, setHistory] = useState<Product[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("amplios_history");
    if (stored) {
      try {
        setHistory(JSON.parse(stored).slice(0, 4));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  const clearHistory = () => {
    localStorage.removeItem("amplios_history");
    setHistory([]);
  };

  if (history.length === 0) return null;

  return (
    <section className="py-24 border-t border-brand-border">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-12">
           <div className="flex items-center gap-4">
              <History className="text-brand-orange w-5 h-5" />
              <h2 className="font-display text-2xl uppercase tracking-tighter text-white">Recently Analyzed</h2>
           </div>
           <button 
             onClick={clearHistory}
             className="font-mono text-[9px] text-brand-grey hover:text-white transition-colors uppercase tracking-widest"
           >
             Clear Persistence [×]
           </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {history.map((product) => (
            <ProductCard 
              key={product.id}
              id={product.id}
              name={product.name}
              brand={product.brand}
              price={product.price_gbp}
              image={product.images?.[0]}
              slug={product.slug}
              specLine={product.spec_line}
              badge={product.badge}
              systemTier={product.system_tier}
              className="opacity-70 hover:opacity-100 transition-opacity"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
