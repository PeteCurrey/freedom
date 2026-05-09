"use client";

import Image from "next/image";
import Link from "next/link";

export function BrandShowcase() {
  const brands = [
    { name: "Victron Energy", logo: "/images/brands/victron.svg" },
    { name: "Dometic", logo: "/images/brands/dometic.svg" },
    { name: "Truma", logo: "/images/brands/truma.svg" },
    { name: "Webasto", logo: "/images/brands/webasto.svg" },
    { name: "MaxxAir", logo: "/images/brands/maxxair.svg" },
    { name: "Fiamma", logo: "/images/brands/fiamma.svg" },
    { name: "Whale", logo: "/images/brands/whale.svg" },
  ];

  return (
    <section className="py-24 bg-brand-obsidian border-y border-brand-border">
      <div className="container mx-auto px-6">
        <h2 className="font-display text-sm uppercase tracking-[0.3em] mb-12 text-brand-grey text-center">
          // AUTHORISED UK STOCKIST
        </h2>
        
        <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-20">
          {brands.map((brand) => (
            <div key={brand.name} className="grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer">
              {/* Using text for now as logos might not exist yet */}
              <span className="font-display text-xl lg:text-2xl font-bold uppercase text-brand-white">
                {brand.name}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="font-sans text-[11px] text-brand-grey uppercase tracking-widest max-w-2xl mx-auto">
            Authorised UK trade accounts with all major brands. Professional pricing. Technical support. Fast despatch.
          </p>
        </div>
      </div>
    </section>
  );
}
