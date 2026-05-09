"use client";

import { useRef } from "react";
import { ProductCard } from "./ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface FeaturedProductsProps {
  products: any[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  if (!products || products.length === 0) return null;

  return (
    <section className="py-24 bg-brand-obsidian border-y border-brand-border overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="font-display text-3xl uppercase tracking-tighter text-brand-white">
              MOST POPULAR THIS MONTH
            </h2>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => scroll('left')}
              className="w-10 h-10 flex items-center justify-center border border-brand-border text-brand-grey hover:border-brand-orange hover:text-brand-orange transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-10 h-10 flex items-center justify-center border border-brand-border text-brand-grey hover:border-brand-orange hover:text-brand-orange transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product) => (
            <div key={product.id} className="min-w-[280px] lg:min-w-[320px] snap-start">
              <ProductCard
                id={product.id}
                name={product.name}
                brand={product.brand}
                price={product.price_gbp}
                compareAtPrice={product.compare_at_price_gbp}
                image={product.images?.[0] ?? product.image_url ?? ""}
                slug={product.slug}
                specLine={product.spec_line}
                badge={product.is_featured ? "Bestseller" : undefined}
                isAffiliate={product.is_affiliate}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
