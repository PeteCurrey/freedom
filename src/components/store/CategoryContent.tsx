"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FilterSidebar } from "@/components/store/FilterSidebar";
import { ProductCard } from "@/components/store/ProductCard";
import { SubcategoryPills } from "@/components/store/SubcategoryPills";
import { EditorsPickStrip } from "@/components/store/EditorsPickStrip";
import { ShoppingBag, ChevronRight, LayoutGrid, List, Zap, Flame, Droplet, Shield, Wind, Sparkles } from "lucide-react";
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
}

interface CategoryContentProps {
  category: any;
  initialProducts: Product[];
  editorsPick?: Product;
}

export function CategoryContent({ category, initialProducts, editorsPick }: CategoryContentProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // State from URL
  const activeSub = searchParams.get("sub") || "all";
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedTiers, setSelectedTiers] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);

  // Subcategory Taxonomy Mapping (Job 1)
  const subcategoryTaxonomy: Record<string, { slug: string; name: string }[]> = {
    "power-systems": [
      { slug: "inverters", name: "Inverters & chargers" },
      { slug: "solar", name: "Solar panels" },
      { slug: "mppt-controllers", name: "MPPT controllers" },
      { slug: "dc-dc-chargers", name: "DC-DC chargers" },
      { slug: "batteries", name: "Batteries" },
      { slug: "monitoring", name: "Monitoring" },
      { slug: "shore-power", name: "Shore power" },
      { slug: "cables-fuses", name: "Cables & fuses" },
    ],
    "climate-control": [
      { slug: "diesel-heaters", name: "Diesel heaters" },
      { slug: "lpg-heaters", name: "LPG heaters" },
      { slug: "combi-systems", name: "Combi systems" },
      { slug: "air-conditioning", name: "Air conditioning" },
      { slug: "water-heaters", name: "Water heaters" },
      { slug: "ducting", name: "Ducting & vents" },
      { slug: "controllers", name: "Controllers" },
    ],
    "water-plumbing": [
      { slug: "fresh-tanks", name: "Fresh water tanks" },
      { slug: "grey-tanks", name: "Grey water tanks" },
      { slug: "pumps", name: "Pumps" },
      { slug: "taps", name: "Taps & mixers" },
      { slug: "shower", name: "Shower systems" },
      { slug: "filtration", name: "Filtration" },
      { slug: "pipe-fittings", name: "Pipe & fittings" },
    ],
    "insulation-build": [
      { slug: "sound-deadening", name: "Sound deadening" },
      { slug: "thermal-insulation", name: "Thermal insulation" },
      { slug: "vapour", name: "Vapour barriers" },
      { slug: "ply", name: "Lightweight ply" },
      { slug: "cladding", name: "Cladding" },
      { slug: "floors", name: "Floor materials" },
      { slug: "adhesives", name: "Adhesives & sealants" },
    ],
    "gas-lpg": [
      { slug: "hobs", name: "Hobs & cookers" },
      { slug: "ovens", name: "Ovens & grills" },
      { slug: "regulators", name: "Regulators" },
      { slug: "lockers", name: "Gas lockers" },
      { slug: "piping", name: "Piping & fittings" },
      { slug: "safety", name: "Safety (alarms & vents)" },
    ],
    "windows-ventilation": [
      { slug: "roof-fans", name: "Roof vent fans" },
      { slug: "fixed-windows", name: "Fixed windows" },
      { slug: "sliding-windows", name: "Sliding windows" },
      { slug: "mushroom-vents", name: "Mushroom vents" },
      { slug: "rooflights", name: "Rooflights" },
      { slug: "blinds", name: "Blinds & covers" },
    ]
  };

  // Derived subcategories with counts
  const categorySubcats = subcategoryTaxonomy[category.slug] || [];
  const subcategoriesWithCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    initialProducts.forEach(p => {
      if (p.subcategory) counts[p.subcategory] = (counts[p.subcategory] || 0) + 1;
    });

    return [
      { slug: "all", name: "All", count: initialProducts.length },
      ...categorySubcats.map(sub => ({
        ...sub,
        count: counts[sub.slug] || 0
      }))
    ];
  }, [initialProducts, categorySubcats]);

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

  // Contextual Guide Mapping (Job 2)
  const guideMap: Record<string, { name: string; href: string; icon: any }> = {
    "power-systems": { name: "Electrical & Solar", href: "/systems/electrical-solar", icon: Zap },
    "climate-control": { name: "Heating & Hot Water", href: "/systems/heating-hot-water", icon: Flame },
    "water-plumbing": { name: "Water & Plumbing", href: "/systems/water-plumbing", icon: Droplet },
    "insulation-build": { name: "Insulation & Ventilation", href: "/systems/insulation-ventilation", icon: Shield },
    "windows-ventilation": { name: "Insulation & Ventilation", href: "/systems/insulation-ventilation", icon: Wind },
    "gas-lpg": { name: "Gas & LPG", href: "/systems/gas-lpg", icon: Sparkles },
    "exterior-accessories": { name: "Exterior Equipment", href: "/systems/exterior-equipment", icon: LayoutGrid },
  };

  const guide = guideMap[category.slug];
  const Icon = guide?.icon || ShoppingBag;

  return (
    <div className="container mx-auto px-6">
      {/* Category Header Area */}
      <section className="pt-48 pb-12 relative">
        <div className="blueprint-grid absolute inset-0 opacity-10 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-4 font-mono text-[10px] text-brand-grey uppercase mb-8 tracking-[0.3em]">
            <Link href="/store" className="hover:text-brand-orange">Store</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">{category.name}</span>
            {activeSub !== "all" && (
              <>
                <ChevronRight className="w-3 h-3" />
                <span className="text-brand-orange">{activeSub.replace(/-/g, ' ')}</span>
              </>
            )}
          </div>
          <h1 className="font-display text-7xl lg:text-9xl mb-8 uppercase leading-none tracking-tighter">
            {category.name}
          </h1>
          
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
            <p className="font-sans text-brand-grey text-xl leading-relaxed max-w-2xl">
              {category.description || "Technical grade components curated for professional off-grid conversions."}
            </p>
            
            {/* Job 2: Contextual Guide CTA */}
            {guide && (
              <div className="group blueprint-border p-6 bg-brand-carbon/30 flex items-center gap-6 max-w-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-brand-orange/30 group-hover:bg-brand-orange transition-colors" />
                <div className="w-12 h-12 bg-brand-orange/10 border border-brand-orange/30 flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6 text-brand-orange" />
                </div>
                <div>
                  <span className="font-mono text-[9px] text-brand-orange uppercase tracking-widest block mb-2">Not sure what you need?</span>
                  <div className="font-sans text-xs text-brand-grey leading-relaxed">
                    Read our <Link href={guide.href} className="text-white hover:text-brand-orange underline underline-offset-4 transition-colors">{guide.name} Guide</Link> or use the <Link href="/planner" className="text-white hover:text-brand-orange underline underline-offset-4 transition-colors">Build Planner</Link> to spec your exact setup.
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Job 1 & Job 5 Bar: Filter Bar / Pills */}
      <div className="sticky top-24 z-40 bg-brand-obsidian/95 backdrop-blur-xl border-y border-brand-border py-4 mb-2">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
          <SubcategoryPills 
            subcategories={subcategoriesWithCounts} 
            activeSub={activeSub}
            onSelect={handleSubSelect}
            className="w-full lg:w-auto"
          />
          
          <div className="flex items-center gap-6 self-end lg:self-auto">
            <span className="font-mono text-[10px] text-brand-grey uppercase">Showing {filteredProducts.length} Results</span>
            <div className="flex border border-brand-border h-10">
              <button className="px-3 border-r border-brand-border bg-brand-carbon text-white"><LayoutGrid size={14} /></button>
              <button className="px-3 text-brand-grey hover:text-white transition-colors"><List size={14} /></button>
            </div>
          </div>
        </div>
      </div>

      {/* Job 3: Editor's Pick Horizontal Strip */}
      {editorsPick && !searchParams.get("sub") && (
        <EditorsPickStrip product={editorsPick} />
      )}

      {/* Main Grid Layout */}
      <div className={cn("flex flex-col lg:flex-row gap-12 pb-32", editorsPick && !searchParams.get("sub") ? "pt-0" : "pt-12")}>
        {/* Sidebar */}
        <FilterSidebar 
          className="w-full lg:w-64 shrink-0"
          filters={[
            { id: 'brand', name: 'Brand', options: brands },
            { id: 'tier', name: 'System Tier', options: tiers },
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

        {/* Grid */}
        <div className="flex-1">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
                  badge={product.is_editor_pick ? "Editor's Pick" : undefined}
                  systemTier={product.system_tier}
                />
              ))}
            </div>
          ) : (
            <div className="py-32 text-center bg-brand-carbon/30 border border-dashed border-brand-border rounded-lg">
              <p className="font-mono text-xs text-brand-grey uppercase tracking-widest mb-4">No matching gear found.</p>
              <button 
                onClick={() => {
                  setSelectedBrands([]);
                  setSelectedTiers([]);
                  setPriceRange([0, 10000]);
                  handleSubSelect('all');
                }}
                className="text-brand-orange underline font-mono text-xs uppercase tracking-widest"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
