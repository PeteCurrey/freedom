"use client";

import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface EditorsPickStripProps {
  product: {
    id: string;
    name: string;
    brand: string;
    description: string;
    price_gbp: number;
    images: string[];
    slug: string;
  };
}

export function EditorsPickStrip({ product }: EditorsPickStripProps) {
  if (!product) return null;

  return (
    <section className="mb-12 blueprint-border bg-brand-carbon/30 group relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-brand-orange" />
      <div className="blueprint-grid absolute inset-0 opacity-5" />
      
      <div className="relative z-10 p-8 lg:p-12 flex flex-col lg:flex-row items-center gap-12">
        {/* Image Hub */}
        <div className="w-48 h-48 bg-brand-obsidian p-6 blueprint-border shrink-0">
          <img 
            src={product.images?.[0] || "/images/hero-background.png"} 
            alt={product.name} 
            className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
          />
        </div>

        {/* Editorial Content */}
        <div className="flex-1 text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
            <Sparkles className="w-4 h-4 text-brand-orange" />
            <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.3em]">Editor's Pick</span>
          </div>
          
          <h2 className="font-display text-3xl lg:text-4xl uppercase mb-4 tracking-tighter group-hover:text-brand-orange transition-colors">
            {product.name}
          </h2>
          
          <p className="font-sans text-brand-grey text-sm lg:text-base leading-relaxed max-w-2xl mb-8 line-clamp-3 italic">
            {product.description || "The definitive hardware selection for this technical system tier."}
          </p>

          <Link 
            href={`/store/product/${product.slug}`}
            className="inline-flex items-center gap-3 font-mono text-[10px] text-white uppercase tracking-widest border-b border-brand-orange pb-2 hover:text-brand-orange transition-colors"
          >
            View Technical Node <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Pricing & CTA */}
        <div className="lg:border-l border-brand-border lg:pl-12 flex flex-col items-center lg:items-end gap-2">
          <span className="font-mono text-[10px] text-brand-grey uppercase tracking-widest opacity-50">Registry Rate</span>
          <span className="font-display text-5xl text-white">
            £{(product.price_gbp / 100).toLocaleString()}
          </span>
          <span className="font-mono text-[8px] text-brand-grey uppercase">Final pricing calculated at checkout</span>
        </div>
      </div>
    </section>
  );
}
