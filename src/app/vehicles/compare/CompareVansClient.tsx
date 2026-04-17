"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { vehicleData } from "@/lib/data/vehicles";
import { 
  Check, 
  X, 
  Ruler, 
  Scale, 
  Zap, 
  Plus, 
  Minus,
  ChevronRight,
  ExternalLink
} from "lucide-react";
import { cn } from "@/lib/utils";

const ALL_VEHICLES = Object.entries(vehicleData);

export default function CompareVansClient() {
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>(["mercedes-sprinter", "fiat-ducato"]);

  const toggleVehicle = (slug: string) => {
    if (selectedSlugs.includes(slug)) {
      if (selectedSlugs.length > 2) {
        setSelectedSlugs(selectedSlugs.filter(s => s !== slug));
      }
    } else {
      if (selectedSlugs.length < 3) {
        setSelectedSlugs([...selectedSlugs, slug]);
      }
    }
  };

  const selectedData = useMemo(() => {
    return selectedSlugs.map(slug => ({
      slug,
      ...vehicleData[slug]
    }));
  }, [selectedSlugs]);

  return (
    <main className="bg-brand-obsidian min-h-screen text-brand-white">
      <Navbar />

      {/* Header */}
      <section className="pt-48 pb-24 border-b border-brand-border/30 relative overflow-hidden">
        <div className="blueprint-grid absolute inset-0 opacity-10 pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="font-display text-5xl lg:text-8xl mb-6 uppercase tracking-tighter">
            VAN <span className="text-brand-orange">COMPARISON</span> TOOL
          </h1>
          <p className="font-sans text-brand-grey text-lg max-w-2xl mx-auto italic">
            Select 2-3 vehicles to compare technical specifications, dimensions, and conversion potential side-by-side.
          </p>
        </div>
      </section>

      {/* Selector Grid */}
      <section className="py-12 bg-brand-carbon/30 border-b border-brand-border/30">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4">
            {ALL_VEHICLES.map(([slug, data]) => {
              const isSelected = selectedSlugs.includes(slug);
              return (
                <button
                  key={slug}
                  onClick={() => toggleVehicle(slug)}
                  className={cn(
                    "px-6 py-3 border font-mono text-[10px] uppercase tracking-widest transition-all italic",
                    isSelected 
                      ? "bg-brand-orange border-brand-orange text-white" 
                      : "border-brand-border text-brand-grey hover:border-brand-grey"
                  )}
                >
                  <span className="flex items-center gap-2">
                    {isSelected ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3 text-brand-orange" />}
                    {data.name.split(" ")[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div 
            className="grid border-t border-brand-border overflow-x-auto"
            style={{ 
              gridTemplateColumns: `150px repeat(${selectedSlugs.length}, minmax(300px, 1fr))` 
            }}
          >
            {/* Header Row: Images & Names */}
            <div className="p-8 border-b border-r border-brand-border bg-brand-carbon/20 flex items-end">
              <span className="font-mono text-[10px] text-brand-grey uppercase tracking-widest italic">Matrix</span>
            </div>
            {selectedData.map((v) => (
              <div key={v.slug} className="p-8 border-b border-brand-border text-center bg-brand-carbon/10 min-w-[250px]">
                <div className="relative aspect-video mb-8 overflow-hidden grayscale hover:grayscale-0 transition-all border border-brand-border/30">
                  <Image src={v.heroImage} alt={v.name} fill className="object-cover" />
                </div>
                <h2 className="font-display text-2xl uppercase mb-2">{v.name}</h2>
                <Link 
                  href={`/vehicles/${v.slug}`}
                  className="font-mono text-[9px] text-brand-orange uppercase tracking-widest hover:underline"
                >
                  Full Profile →
                </Link>
              </div>
            ))}

            {/* Internal Width */}
            <div className="p-8 border-b border-r border-brand-border flex items-center bg-brand-carbon/20">
              <span className="font-display text-[10px] uppercase text-brand-orange italic">Internal Width</span>
            </div>
            {selectedData.map((v) => (
              <div key={v.slug} className="p-8 border-b border-brand-border text-center">
                <span className="font-sans text-xl">
                  {v.internalWidth}
                </span>
                <p className="font-mono text-[9px] text-brand-grey mt-2 uppercase">
                  {parseFloat(v.internalWidth) >= 1.85 ? "Transverse Bed Ready" : "Requires Flares"}
                </p>
              </div>
            ))}

            {/* GVWR */}
            <div className="p-8 border-b border-r border-brand-border flex items-center bg-brand-carbon/20">
              <span className="font-display text-[10px] uppercase text-brand-orange italic">GVWR Range</span>
            </div>
            {selectedData.map((v) => (
              <div key={v.slug} className="p-8 border-b border-brand-border text-center">
                <span className="font-sans text-xl">
                  {v.specs.find(s => s.label === "GVWR")?.value}kg
                </span>
                <p className="font-mono text-[9px] text-brand-grey mt-2 uppercase tracking-tighter">
                   Capacity Limit
                </p>
              </div>
            ))}

            {/* Top Advantage */}
            <div className="p-8 border-b border-r border-brand-border flex items-center bg-brand-carbon/20 italic">
               <span className="font-display text-[10px] uppercase text-brand-orange">Top Advantage</span>
            </div>
            {selectedData.map((v) => (
              <div key={v.slug} className="p-8 border-b border-brand-border text-center bg-brand-orange/5">
                <Check className="w-5 h-5 text-brand-orange mx-auto mb-4" />
                <p className="font-sans text-sm italic">{v.pros[0]}</p>
              </div>
            ))}

            {/* Key Limitation */}
            <div className="p-8 border-b border-r border-brand-border flex items-center bg-brand-carbon/20 italic">
               <span className="font-display text-[10px] uppercase text-red-500/80">Key Limitation</span>
            </div>
            {selectedData.map((v) => (
              <div key={v.slug} className="p-8 border-b border-brand-border text-center bg-red-500/5">
                <X className="w-5 h-5 text-red-500/80 mx-auto mb-4" />
                <p className="font-sans text-sm italic">{v.cons[0]}</p>
              </div>
            ))}

            {/* CTAs */}
            <div className="p-8 border-r border-brand-border bg-brand-carbon/20 flex items-center">
               <span className="font-mono text-[8px] text-brand-grey uppercase tracking-widest">Next Steps</span>
            </div>
            {selectedData.map((v) => (
              <div key={v.slug} className="p-8 text-center space-y-4">
                <Link 
                  href={`/vehicles/${v.slug}/buying-guide`}
                  className="block w-full py-4 bg-brand-orange text-white font-display text-[10px] uppercase tracking-widest hover:scale-105 transition-transform"
                >
                  Buying Guide →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
