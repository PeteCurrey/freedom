"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CategoryGridProps {
  categories: any[];
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <section id="categories" className="py-24 bg-brand-obsidian">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <h2 className="font-display text-4xl uppercase tracking-tighter mb-2 text-brand-white italic">
            // SHOP BY SYSTEM
          </h2>
          <p className="font-sans text-brand-grey text-base">
            12 specialist build categories engineered for technical parity.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link 
              key={cat.id}
              href={`/store/${cat.slug}`}
              className="group bg-brand-carbon border border-brand-border rounded-xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/5"
            >
              {/* Image Section */}
              <div className="relative h-[120px] overflow-hidden">
                <Image 
                  src={cat.image || "/images/hero-background.png"}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-carbon to-transparent opacity-60" />
              </div>

              {/* Content Section */}
              <div className="p-4 flex items-center justify-between">
                <h3 className="font-display text-sm font-bold text-brand-white uppercase truncate pr-2">
                  {cat.name}
                </h3>
                <span className="font-mono text-[10px] text-brand-orange uppercase tracking-widest font-bold flex-shrink-0">
                  Explore →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
