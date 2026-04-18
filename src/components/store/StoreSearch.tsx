"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, Package, Layout, FileText, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";

interface SearchResult {
  id: string;
  name: string;
  slug: string;
  type: 'product' | 'category' | 'guide';
  image?: string;
  price?: number;
}

export function StoreSearch({ className }: { className?: string }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const searchData = async () => {
      // Products
      const { data: products } = await supabase
        .from('products')
        .select('id, name, brand, slug, price_gbp, images')
        .or(`name.ilike.%${query}%,brand.ilike.%${query}%,subcategory.ilike.%${query}%`)
        .limit(5);

      // Categories
      const { data: categories } = await supabase
        .from('product_categories')
        .select('id, name, slug')
        .ilike('name', `%${query}%`)
        .limit(2);

      const formatted: SearchResult[] = [
        ...(products?.map(p => ({
          id: p.id,
          name: `${p.brand} ${p.name}`,
          slug: `/store/product/${p.slug}`,
          type: 'product' as const,
          image: p.images?.[0],
          price: p.price_gbp
        })) || []),
        ...(categories?.map(c => ({
          id: c.id,
          name: c.name,
          slug: `/store/${c.slug}`,
          type: 'category' as const
        })) || [])
      ];

      setResults(formatted);
    };

    const timer = setTimeout(searchData, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/store/all?q=${encodeURIComponent(query)}`);
      setIsFocused(false);
    }
  };

  return (
    <div ref={searchRef} className={cn("relative w-full max-w-[500px] mx-auto", className)}>
      <form onSubmit={handleSearchSubmit}>
        <div className={cn(
          "relative transition-all duration-300",
          isFocused ? "blueprint-border ring-4 ring-brand-orange/10 transform -translate-y-1" : "border border-brand-border"
        )}>
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-grey w-5 h-5" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            placeholder="Search products... e.g. MultiPlus, MaxxFan, LiFePO4"
            className="w-full bg-brand-carbon h-16 pl-16 pr-6 font-mono text-xs text-white placeholder:text-brand-grey/50 focus:outline-none"
          />
        </div>
      </form>

      {isFocused && (query.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-brand-obsidian border border-brand-border shadow-2xl z-[100] overflow-hidden">
          <div className="max-h-[450px] overflow-y-auto no-scrollbar">
            {results.length > 0 ? (
              <div className="p-2 space-y-1">
                {results.map((res) => (
                  <Link
                    key={`${res.type}-${res.id}`}
                    href={res.slug}
                    onClick={() => setIsFocused(false)}
                    className="flex items-center gap-4 p-3 hover:bg-brand-carbon transition-all group border border-transparent hover:border-brand-border"
                  >
                    <div className="w-10 h-10 bg-brand-graphite blueprint-border flex-shrink-0 flex items-center justify-center p-2">
                      {res.type === 'product' ? (
                        res.image ? <img src={res.image} alt={res.name} className="w-full h-full object-contain grayscale group-hover:grayscale-0" /> : <Package className="text-brand-grey" />
                      ) : (
                        <Layout className="text-brand-orange" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[8px] text-brand-orange uppercase tracking-widest">{res.type} //</span>
                        <h4 className="font-display text-[11px] uppercase truncate group-hover:text-brand-orange">{res.name}</h4>
                      </div>
                      {res.price && (
                        <span className="font-mono text-[9px] text-brand-grey">£{(res.price / 100).toLocaleString()}</span>
                      )}
                    </div>
                    <ArrowUpRight className="w-3 h-3 text-brand-grey opacity-0 group-hover:opacity-100 transition-all font-bold" />
                  </Link>
                ))}
              </div>
            ) : query.length > 1 ? (
              <div className="p-8 text-center bg-brand-carbon/30">
                <p className="font-mono text-[10px] text-brand-grey uppercase tracking-widest">Scanning Registry... No matching nodes found.</p>
              </div>
            ) : null}
            
            <div className="p-4 bg-brand-carbon border-t border-brand-border flex justify-between items-center text-[9px] font-mono uppercase tracking-widest">
              <span className="text-brand-grey italic">Press ENTER to View All</span>
              <Link href={`/store/all?q=${query}`} className="text-brand-orange hover:text-white transition-colors" onClick={() => setIsFocused(false)}>
                View results catalog →
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
