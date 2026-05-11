"use client";

import { useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/store/ProductCard";
import { SubcategoryPills } from "@/components/store/SubcategoryPills";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  brand: string;
  description: string;
  price_gbp: number;
  compare_at_price?: number;
  images: string[];
  slug: string;
  spec_line?: string;
  badge?: string;
  system_tier?: string;
  subcategory?: string;
  is_editor_pick?: boolean;
}

interface CategoryContentProps {
  category: any;
  initialProducts: Product[];
  editorsPick?: Product;
}

export function CategoryContent({ category, initialProducts, editorsPick }: CategoryContentProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeSub = searchParams.get("sub") || "all";

  const subcategoriesWithCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    initialProducts.forEach(p => {
      if (p.subcategory) counts[p.subcategory] = (counts[p.subcategory] || 0) + 1;
    });

    const dbSubcats = Array.isArray(category.subcategories) ? category.subcategories : [];

    return [
      { slug: "all", name: "All", count: initialProducts.length },
      ...dbSubcats.map((sub: any) => ({
        slug: sub.slug,
        name: sub.name,
        count: counts[sub.slug] || 0
      }))
    ];
  }, [initialProducts, category.subcategories]);

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    return initialProducts.filter(p => {
      return activeSub === "all" || p.subcategory === activeSub;
    });
  }, [initialProducts, activeSub]);

  const handleSubSelect = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (slug === "all") params.delete("sub");
    else params.set("sub", slug);
    router.push(`?${params.toString()}`);
  };

  const headerImage = category.image || "/images/hero-background.png";

  return (
    <div className="bg-white min-h-screen pb-32">
      {/* 2px Orange Border Threshold */}
      <div className="w-full h-[2px] bg-brand-orange" />

      {/* 1. CATEGORY HEADER (200px tall) */}
      <section className="relative h-[200px] flex items-center overflow-hidden bg-[#F8F8F6]">
        {headerImage && (
          <div className="absolute inset-0 z-0">
            <img 
              src={headerImage} 
              alt={category.name} 
              className="w-full h-full object-cover grayscale opacity-30" 
            />
            <div className="absolute inset-0 bg-brand-obsidian/60" />
          </div>
        )}
        
        <div className="container mx-auto px-6 relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-4 font-mono text-[10px] text-brand-grey uppercase tracking-widest">
            <Link href="/store" className="hover:text-brand-orange transition-colors">Store</Link>
            <span className="text-brand-grey/50">/</span>
            <span className="text-white font-bold">{category.name}</span>
          </div>
          <div>
            <h1 className="font-display text-2xl lg:text-3xl uppercase tracking-tighter text-white">
              {category.name}
            </h1>
          </div>
        </div>
      </section>

      {/* 2. DYNAMIC TAXONOMY BAR */}
      <div className="sticky top-20 z-40 bg-white/95 backdrop-blur-xl border-b border-[#E5E5E5] py-4 mb-12 shadow-sm">
        <div className="container mx-auto px-6 flex flex-col lg:flex-row justify-between items-center gap-6">
          <SubcategoryPills 
            subcategories={subcategoriesWithCounts} 
            activeSub={activeSub}
            onSelect={handleSubSelect}
            className="w-full lg:w-auto"
          />
          <div className="font-mono text-[10px] text-brand-grey uppercase tracking-widest">
            Showing {filteredProducts.length} Results
          </div>
        </div>
      </div>

      {/* 3. MAIN PRODUCT GRID */}
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id}
              id={product.id}
              name={product.name}
              brand={product.brand}
              price={product.price_gbp}
              compareAtPrice={product.compare_at_price}
              image={product.images?.[0] || ""}
              slug={product.slug}
              specLine={product.spec_line}
              badge={product.badge}
              systemTier={product.system_tier}
              isAffiliate={product.is_editor_pick} // Re-using is_affiliate for something else?
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-24 text-center border border-dashed border-[#E5E5E5] bg-[#F8F8F6] rounded-xl">
            <h3 className="font-display text-2xl text-brand-white uppercase mb-2">No hardware found</h3>
            <p className="font-sans text-brand-grey">Try selecting a different subcategory or clearing filters.</p>
            <button 
              onClick={() => handleSubSelect('all')}
              className="mt-6 px-6 py-3 border border-brand-orange text-brand-orange font-mono text-[10px] uppercase tracking-widest hover:bg-brand-orange hover:text-white transition-all"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
