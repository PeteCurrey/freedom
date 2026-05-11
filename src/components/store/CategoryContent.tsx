"use client";

import { FilterSidebar } from "@/components/store/FilterSidebar";
import { Filter, SlidersHorizontal, ArrowUpDown, ChevronDown, X } from "lucide-react";
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
  
  // Filter States
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [sortOrder, setSortOrder] = useState("featured");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Derived Filter Groups
  const filterGroups = useMemo(() => {
    const brandsMap: Record<string, number> = {};
    const tiersMap: Record<string, number> = {};
    
    initialProducts.forEach(p => {
      // Brands
      brandsMap[p.brand] = (brandsMap[p.brand] || 0) + 1;
      // Tiers
      if (p.system_tier) {
        tiersMap[p.system_tier] = (tiersMap[p.system_tier] || 0) + 1;
      }
    });

    const groups = [
      {
        id: "brand",
        name: "Partner Brands",
        options: Object.entries(brandsMap).map(([name, count]) => ({
          label: name,
          value: name,
          count
        })).sort((a, b) => a.label.localeCompare(b.label))
      },
      {
        id: "tier",
        name: "System Tier",
        options: Object.entries(tiersMap).map(([val, count]) => {
          const names: Record<string, string> = {
            'full-autonomy': 'Full Autonomy',
            'intermediate': 'Grid Independent',
            'beginner': 'Weekend Warrior',
            'pro': 'Professional'
          };
          return {
            label: names[val] || val,
            value: val,
            count
          };
        })
      }
    ];

    return groups;
  }, [initialProducts]);

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
    let result = initialProducts.filter(p => {
      // Subcategory Filter
      const matchesSub = activeSub === "all" || p.subcategory === activeSub;
      
      // Brand Filter
      const selectedBrands = selectedFilters.brand || [];
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(p.brand);
      
      // Tier Filter
      const selectedTiers = selectedFilters.tier || [];
      const matchesTier = selectedTiers.length === 0 || (p.system_tier && selectedTiers.includes(p.system_tier));
      
      // Price Filter
      const price = p.price_gbp / 100;
      const matchesPrice = price >= priceRange[0] && price <= priceRange[1];
      
      return matchesSub && matchesBrand && matchesTier && matchesPrice;
    });

    // Sorting Logic
    if (sortOrder === "price-low") {
      result.sort((a, b) => a.price_gbp - b.price_gbp);
    } else if (sortOrder === "price-high") {
      result.sort((a, b) => b.price_gbp - a.price_gbp);
    } else if (sortOrder === "newest") {
      result.sort((a, b) => b.id.localeCompare(a.id)); // Fallback if no date
    }

    return result;
  }, [initialProducts, activeSub, selectedFilters, priceRange, sortOrder]);

  const handleFilterChange = (groupId: string, value: string) => {
    setSelectedFilters(prev => {
      const current = prev[groupId] || [];
      const updated = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];
      return { ...prev, [groupId]: updated };
    });
  };

  const handleClearAll = () => {
    setSelectedFilters({});
    setPriceRange([0, 10000]);
    handleSubSelect("all");
  };

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
      <div className="sticky top-20 z-40 bg-white/95 backdrop-blur-xl border-b border-[#E5E5E5] py-4 shadow-sm">
        <div className="container mx-auto px-6 flex flex-col lg:flex-row justify-between items-center gap-6">
          <SubcategoryPills 
            subcategories={subcategoriesWithCounts} 
            activeSub={activeSub}
            onSelect={handleSubSelect}
            className="w-full lg:w-auto"
          />
          <div className="flex items-center gap-6 w-full lg:w-auto justify-between lg:justify-end">
            <div className="font-mono text-[10px] text-brand-grey uppercase tracking-widest">
              {filteredProducts.length} Results Found
            </div>
            <div className="flex items-center gap-2">
               <button 
                 onClick={() => setIsMobileFilterOpen(true)}
                 className="lg:hidden flex items-center gap-2 px-4 py-2 bg-brand-obsidian text-white font-mono text-[9px] uppercase tracking-widest"
               >
                 <Filter size={12} /> Filters
               </button>
               <div className="relative group">
                 <button className="flex items-center gap-2 px-4 py-2 border border-[#E5E5E5] font-mono text-[9px] uppercase tracking-widest hover:border-brand-orange transition-colors">
                   <ArrowUpDown size={12} /> Sort: {sortOrder}
                 </button>
                 <div className="absolute right-0 top-full mt-1 bg-white border border-[#E5E5E5] shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 min-w-[160px]">
                    {[
                      { label: 'Featured', value: 'featured' },
                      { label: 'Newest', value: 'newest' },
                      { label: 'Price: Low to High', value: 'price-low' },
                      { label: 'Price: High to Low', value: 'price-high' },
                    ].map(opt => (
                      <button 
                        key={opt.value}
                        onClick={() => setSortOrder(opt.value)}
                        className={cn(
                          "w-full text-left px-4 py-3 font-mono text-[9px] uppercase tracking-widest hover:bg-[#F8F8F6] transition-colors",
                          sortOrder === opt.value ? "text-brand-orange bg-[#F8F8F6]" : "text-brand-grey"
                        )}
                      >
                        {opt.label}
                      </button>
                    ))}
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. MAIN SHOPPING INTERFACE */}
      <div className="container mx-auto px-6 pt-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar - Desktop */}
          <aside className="hidden lg:block w-64 shrink-0">
            <FilterSidebar 
              filters={filterGroups}
              selectedFilters={selectedFilters}
              onFilterChange={handleFilterChange}
              priceRange={priceRange}
              onPriceChange={setPriceRange}
              onClearAll={handleClearAll}
            />
            
            {/* Promotion / Help Card */}
            <div className="mt-12 p-6 bg-brand-obsidian rounded-xl border border-white/5 relative overflow-hidden group">
               <div className="relative z-10">
                 <h4 className="font-display text-xs text-white uppercase tracking-widest mb-2">Need Guidance?</h4>
                 <p className="font-sans text-[10px] text-brand-grey leading-relaxed mb-4">Our engineers can help size your system correctly for your build.</p>
                 <Link href="/quotes" className="inline-flex items-center gap-2 font-mono text-[9px] text-brand-orange uppercase tracking-widest hover:text-white transition-colors">
                   Get a Quote <SlidersHorizontal size={10} />
                 </Link>
               </div>
               <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:opacity-20 transition-opacity">
                 <Package size={80} className="text-white" />
               </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
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
                  isAffiliate={product.is_editor_pick}
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="py-32 text-center border border-dashed border-[#E5E5E5] bg-[#F8F8F6] rounded-xl">
                <div className="w-16 h-16 bg-white border border-[#E5E5E5] rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <Search size={24} className="text-brand-grey/30" />
                </div>
                <h3 className="font-display text-xl text-brand-obsidian uppercase mb-2">No matching hardware</h3>
                <p className="font-sans text-brand-grey text-sm max-w-xs mx-auto">Try adjusting your filters or search terms to find what you need.</p>
                <button 
                  onClick={handleClearAll}
                  className="mt-8 px-8 py-4 bg-brand-obsidian text-white font-mono text-[10px] uppercase tracking-widest hover:bg-brand-orange transition-all shadow-lg"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Slide-over */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
           <div className="absolute inset-0 bg-brand-obsidian/60 backdrop-blur-sm" onClick={() => setIsMobileFilterOpen(false)} />
           <div className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
              <div className="p-6 border-b border-[#E5E5E5] flex justify-between items-center bg-brand-obsidian text-white">
                 <h2 className="font-display text-sm uppercase tracking-widest">Filters</h2>
                 <button onClick={() => setIsMobileFilterOpen(false)} className="p-2 hover:bg-white/10 transition-colors">
                   <X size={20} />
                 </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6">
                <FilterSidebar 
                  filters={filterGroups}
                  selectedFilters={selectedFilters}
                  onFilterChange={handleFilterChange}
                  priceRange={priceRange}
                  onPriceChange={setPriceRange}
                  onClearAll={handleClearAll}
                />
              </div>
              <div className="p-6 border-t border-[#E5E5E5] bg-gray-50">
                <button 
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full py-4 bg-brand-orange text-white font-display text-[10px] uppercase tracking-widest font-bold shadow-lg shadow-brand-orange/20"
                >
                  Apply Filters ({filteredProducts.length})
                </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
