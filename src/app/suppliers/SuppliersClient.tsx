"use client";

import { useState, useMemo, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { 
  Search, 
  Filter, 
  Globe, 
  Truck, 
  ChevronRight, 
  Layers, 
  Zap, 
  Flame, 
  Droplets, 
  Wind,
  Shield,
  Box
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { id: 'all', name: 'All Domains', icon: Box },
  { id: 'electrical', name: 'Electrical & Solar', icon: Zap },
  { id: 'heating', name: 'Climate Control', icon: Flame },
  { id: 'water', name: 'Water & Plumbing', icon: Droplets },
  { id: 'insulation', name: 'Insulation & Build', icon: Wind },
  { id: 'furniture', name: 'Interior & Hardware', icon: Layers },
  { id: 'externals', name: 'Chassis & Exterior', icon: Truck },
  { id: 'tech', name: 'Tech & Monitoring', icon: Shield },
];

export function SuppliersClient({ initialSuppliers }: { initialSuppliers: any[] }) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredSuppliers = useMemo(() => {
    return initialSuppliers.filter(s => {
      const matchSearch = (s.name || "").toLowerCase().includes(search.toLowerCase()) || 
                          (s.notes || "").toLowerCase().includes(search.toLowerCase()) ||
                          (s.brands_handled || []).some((b: string) => b.toLowerCase().includes(search.toLowerCase()));
      
      const matchCategory = activeCategory === "all" || (s.categories || []).includes(activeCategory);
      
      return matchSearch && matchCategory;
    });
  }, [search, activeCategory, initialSuppliers]);

  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!gridRef.current) return;
    
    const cards = gridRef.current.querySelectorAll(".supplier-card");
    
    gsap.set(cards, { opacity: 0, y: 30 });
    
    gsap.to(cards, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
      overwrite: true
    });
  }, [filteredSuppliers]);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Blueprint Grid Background */}
      <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Search & Filter Bar */}
        <div className="flex flex-col lg:flex-row gap-8 mb-20 items-end">
          <div className="flex-1 w-full">
            <div className="relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-grey group-focus-within:text-brand-orange transition-colors" size={20} />
              <input 
                type="text" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by supplier name, brand, or component type..."
                className="w-full bg-brand-carbon/50 backdrop-blur-md border border-brand-border p-6 pl-16 font-sans text-lg text-brand-white outline-none focus:border-brand-orange/50 transition-all"
              />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 w-full lg:w-auto">
             {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "flex items-center gap-3 px-6 py-4 border font-mono text-[10px] uppercase tracking-widest transition-all backdrop-blur-sm",
                    activeCategory === cat.id 
                      ? "bg-brand-orange/10 border-brand-orange text-brand-white" 
                      : "bg-brand-carbon/30 border-brand-border text-brand-grey hover:border-brand-orange/50 hover:text-brand-orange"
                  )}
                >
                  <cat.icon size={14} />
                  {cat.name}
                </button>
             ))}
          </div>
        </div>

        {/* Results Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {filteredSuppliers.map((s) => (
              <div 
                key={s.id} 
                className="supplier-card group bg-brand-carbon/30 backdrop-blur-sm border border-brand-border hover:border-brand-orange/40 transition-all flex flex-col relative overflow-hidden"
              >
                 {/* Corner Accent */}
                 <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 right-0 w-px h-full bg-brand-orange/20" />
                    <div className="absolute top-0 right-0 h-px w-full bg-brand-orange/20" />
                 </div>

                 <div className="p-10 flex-1">
                    <div className="flex justify-between items-start mb-8">
                       <span className="font-mono text-[8px] text-brand-orange uppercase tracking-[0.3em] bg-brand-orange/5 px-2 py-1 border border-brand-orange/20">
                          Registry ID // {s.id.split('-')[0]}
                       </span>
                       {s.trade_account && (
                          <div className="flex items-center gap-2 text-green-500 font-mono text-[8px] uppercase tracking-widest">
                             <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
                             Trade Registered
                          </div>
                       )}
                    </div>

                    <h3 className="font-display text-4xl uppercase mb-4 leading-tight group-hover:text-brand-orange transition-colors">
                       {s.name}
                    </h3>
                    
                    <p className="font-sans text-brand-grey text-sm leading-relaxed mb-8 line-clamp-3">
                       {s.notes || "Professional UK conversion supplier specializing in high-performance off-grid hardware."}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-10">
                       {(s.categories || []).map((cat: string) => (
                          <span key={cat} className="font-mono text-[8px] text-brand-grey/60 uppercase tracking-widest border border-brand-border px-2 py-0.5">
                             {cat}
                          </span>
                       ))}
                    </div>

                    <div className="space-y-3">
                       <div className="font-mono text-[9px] text-brand-orange uppercase tracking-widest mb-2 flex items-center gap-2">
                          <Layers size={10} /> Brand Portfolio
                       </div>
                       <div className="flex flex-wrap gap-x-4 gap-y-2">
                          {s.brands_handled && s.brands_handled.length > 0 ? (
                            s.brands_handled.map((brand: string) => (
                              <span key={brand} className="font-display text-[10px] uppercase text-brand-white">
                                 {brand}
                              </span>
                            ))
                          ) : (
                            <span className="font-sans text-[10px] italic text-brand-grey/50">Consult technical documentation</span>
                          )}
                       </div>
                    </div>
                 </div>

                 <div className="border-t border-brand-border p-6 flex items-center justify-between group-hover:bg-brand-orange transition-colors group-hover:text-white duration-500">
                    <a 
                      href={`/api/affiliate/redirect?type=supplier&id=${s.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest"
                    >
                       <Globe size={14} /> Official Site
                    </a>
                    <Link 
                      href={`/suppliers/${s.slug || s.id}`}
                      className="text-brand-orange group-hover:text-white transition-colors"
                    >
                       <ChevronRight size={18} />
                    </Link>
                 </div>
              </div>
           ))}
        </div>

        {filteredSuppliers.length === 0 && (
           <div className="py-32 text-center">
              <div className="w-16 h-16 border border-dashed border-brand-border rounded-full flex items-center justify-center mx-auto mb-8">
                 <Filter className="text-brand-grey" />
              </div>
              <h4 className="font-display text-2xl uppercase mb-2">No Nodes Found</h4>
              <p className="font-sans text-brand-grey">Adjust your parameters or search query.</p>
           </div>
        )}
      </div>
    </section>
  );
}
