"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FilterSidebar } from "@/components/store/FilterSidebar";
import { ProductCard } from "@/components/store/ProductCard";
import { SubcategoryPills } from "@/components/store/SubcategoryPills";
import { EditorsPickStrip } from "@/components/store/EditorsPickStrip";
import { ShoppingBag, ChevronRight, LayoutGrid, List, Zap, Flame, Droplet, Shield, Wind, Sparkles, Search } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

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

  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedTiers, setSelectedTiers] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);

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

  // Derived filters
  const brands = useMemo(() => {
    const set = new Set(initialProducts.map(p => p.brand));
    return Array.from(set).map(b => ({ label: b, value: b }));
  }, [initialProducts]);

  const tiers = useMemo(() => {
    const set = new Set(initialProducts.map(p => p.system_tier).filter(Boolean));
    return Array.from(set).map(t => ({ label: t!.replace(/-/g, ' '), value: t! }));
  }, [initialProducts]);

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    return initialProducts.filter(p => {
      const matchSub = activeSub === "all" || p.subcategory === activeSub;
      const matchBrand = selectedBrands.length === 0 || selectedBrands.includes(p.brand);
      const matchTier = selectedTiers.length === 0 || (p.system_tier && selectedTiers.includes(p.system_tier));
      const matchPrice = (p.price_gbp / 100) <= priceRange[1];
      
      return matchSub && matchBrand && matchTier && matchPrice;
    });
  }, [initialProducts, activeSub, selectedBrands, selectedTiers, priceRange]);

  const handleSubSelect = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (slug === "all") params.delete("sub");
    else params.set("sub", slug);
    router.push(`?${params.toString()}`);
  };

  const toggleBrand = (groupId: string, value: string) => {
    if (groupId === 'brand') {
      setSelectedBrands(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
    } else if (groupId === 'tier') {
      setSelectedTiers(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
    }
  };

  // Cinematic Asset Map
  const assetMap: Record<string, { image: string; icon: any; advice: string }> = {
    "power-systems": { 
      image: "/images/electrical-system-technical.png", 
      icon: Zap,
      advice: "Prioritise lithium density if planning more than 3 days of winter induction cooking."
    },
    "climate-control": { 
      image: "/images/heating-system-technical.png", 
      icon: Flame,
      advice: "Combine diesel heating with high-altitude kits if aiming for alpine deployments."
    },
    "water-plumbing": { 
      image: "/images/water-plumbing-technical.png", 
      icon: Droplet,
      advice: "UV-C filtration is mandatory for reliable off-grid water safety from natural sources."
    },
    "insulation-build": { 
      image: "/images/insulation-technical.png", 
      icon: Shield,
      advice: "Vapour barrier integrity determines the lifespan of your structural chassis."
    },
    "gas-lpg": { 
      image: "/images/gas-lpg-technical.png", 
      icon: Sparkles,
      advice: "Use refillable LPG systems to scale your autonomy across international borders."
    },
    "lighting": { 
      image: "/images/step_lighting_cinematic_1776674939507.png", 
      icon: Zap,
      advice: "Layered lighting (Ambient + Task) is essential for small-space ergonomics."
    },
    "security-monitoring": { 
      image: "/images/step_security_cinematic_1776675013013.png", 
      icon: Shield,
      advice: "Physical deterrence is only effective when coupled with live telemetry tracking."
    }
  };

  const metadata = assetMap[category.slug] || { image: "/images/hero-background.png", icon: ShoppingBag, advice: "Consult our engineering team for complex deployment configurations." };
  const Icon = metadata.icon;

  return (
    <div className="bg-brand-obsidian pb-32">
      {/* 1. CINEMATIC SYSTEM HERO */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden border-b border-brand-border/30">
        <div className="absolute inset-0 z-0">
          <img 
            src={metadata.image} 
            alt={category.name} 
            className="w-full h-full object-cover grayscale opacity-20 scale-105 animate-slow-zoom" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-obsidian via-brand-obsidian/40 to-brand-obsidian" />
          <div className="blueprint-grid absolute inset-0 opacity-10 pointer-events-none" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="flex items-center justify-center gap-4 font-mono text-[10px] text-brand-grey uppercase mb-8 tracking-[0.4em]">
            <Link href="/store" className="hover:text-brand-orange transition-colors">Hub</Link>
            <div className="h-px w-6 bg-brand-border" />
            <span className="text-brand-orange">{category.name}</span>
          </div>
          
          <h1 className="font-display text-7xl lg:text-[10rem] mb-8 uppercase font-bold tracking-tighter leading-[0.8] drop-shadow-2xl">
            {category.name.split(' ').map((word: string, i: number) => (
               <span key={i} className={i === 1 ? "text-brand-orange block lg:inline" : "text-white"}>{word} </span>
            ))}
          </h1>

          <p className="font-sans text-brand-grey text-xl lg:text-2xl max-w-2xl mx-auto italic">
            {category.description || "Technical grade components curated for professional off-grid conversions."}
          </p>
        </div>
      </section>

      {/* 2. ADVISOR STRIP */}
      <div className="container mx-auto px-6 -mt-12 relative z-20">
         <div className="blueprint-border p-8 bg-brand-carbon flex flex-col md:flex-row items-center justify-between gap-8 backdrop-blur-xl bg-opacity-90 shadow-2xl">
            <div className="flex items-center gap-6">
               <div className="w-12 h-12 bg-brand-orange/10 border border-brand-orange/30 flex items-center justify-center text-brand-orange rounded-full">
                  <Icon className="w-6 h-6" />
               </div>
               <div>
                  <span className="font-mono text-[9px] text-brand-orange uppercase tracking-widest block mb-1 font-bold">Expert Registry Advice</span>
                  <p className="font-sans text-sm text-brand-grey italic">"{metadata.advice}"</p>
               </div>
            </div>
            <Link href="/planner" className="px-10 py-4 bg-brand-orange text-white font-display text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-obsidian transition-all shadow-xl shadow-brand-orange/20 whitespace-nowrap">
               Initialize Build Planner →
            </Link>
         </div>
      </div>

      {/* 3. DYNAMIC TAXONOMY BAR */}
      <div className="sticky top-24 z-40 bg-brand-obsidian/95 backdrop-blur-xl border-y border-brand-border py-4 mb-2 mt-24">
        <div className="container mx-auto px-6 flex flex-col lg:flex-row justify-between items-center gap-6">
          <SubcategoryPills 
            subcategories={subcategoriesWithCounts} 
            activeSub={activeSub}
            onSelect={handleSubSelect}
            className="w-full lg:w-auto"
          />
          
          <div className="flex items-center gap-8 self-end lg:self-auto">
            <div className="flex items-center gap-3">
               <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
               <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest">Network Active</span>
            </div>
            <span className="font-mono text-[10px] text-white uppercase tracking-widest border-l border-brand-border pl-8">{filteredProducts.length} Results Found</span>
          </div>
        </div>
      </div>

      {/* 4. CONTENT GRID */}
      <div className="container mx-auto px-6">
        {editorsPick && !searchParams.get("sub") && (
          <EditorsPickStrip product={editorsPick} />
        )}

        <div className={cn("flex flex-col lg:flex-row gap-16 pt-12", editorsPick && !searchParams.get("sub") ? "mt-0" : "mt-12")}>
          {/* Sidebar Filters */}
          <FilterSidebar 
            className="w-full lg:w-72 shrink-0"
            filters={[
              { id: 'brand', name: 'Authorized Brand', options: brands },
              { id: 'tier', name: 'System Deployment', options: tiers },
            ]}
            selectedFilters={{ brand: selectedBrands, tier: selectedTiers }}
            onFilterChange={toggleBrand}
            priceRange={priceRange}
            onPriceChange={setPriceRange}
            onClearAll={() => {
              setSelectedBrands([]);
              setSelectedTiers([]);
              setPriceRange([0, 10000]);
            }}
          />

          {/* Product Grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard 
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    brand={product.brand}
                    price={product.price_gbp}
                    compareAtPrice={product.compare_at_price}
                    image={product.images?.[0]}
                    slug={product.slug}
                    specLine={product.spec_line}
                    badge={product.is_editor_pick ? "Editor's Pick" : undefined}
                    systemTier={product.system_tier}
                  />
                ))}
              </div>
            ) : (
              <div className="py-40 text-center blueprint-border border-dashed bg-brand-carbon/30">
                <Search className="w-12 h-12 text-brand-grey mx-auto mb-6 opacity-30" />
                <p className="font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-4">No Hardware found in this deployment tier.</p>
                <button 
                  onClick={() => {
                    setSelectedBrands([]);
                    setSelectedTiers([]);
                    setPriceRange([0, 10000]);
                    handleSubSelect('all');
                  }}
                  className="text-brand-orange underline font-mono text-[10px] uppercase tracking-widest"
                >
                  Reset Active Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
