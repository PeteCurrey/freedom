"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingCart } from "lucide-react";

interface EditorsPickProps {
  product: {
    id: string;
    name: string;
    brand: string;
    description: string;
    price_gbp: number;
    image_url: string;
    slug: string;
    spec_line?: string;
  };
}

export function EditorsPick({ product }: EditorsPickProps) {
  if (!product) return null;

  const formattedPrice = (product.price_gbp / 100).toLocaleString("en-GB", {
    style: "currency",
    currency: "GBP",
  });

  return (
    <section className="py-20 bg-brand-obsidian">
      <div className="container mx-auto px-6">
        <div className="bg-brand-carbon border border-brand-border flex flex-col lg:flex-row items-center overflow-hidden">
          {/* Product Image Left */}
          <div className="w-full lg:w-[350px] aspect-square relative bg-brand-obsidian p-12">
            <Image 
              src={product.image_url}
              alt={product.name}
              fill
              className="object-contain"
            />
          </div>

          {/* Content Centre */}
          <div className="flex-1 p-10 lg:p-16 border-t lg:border-t-0 lg:border-x border-brand-border">
            <span className="font-mono text-[9px] text-brand-orange uppercase tracking-[0.3em] mb-4 block">
              EDITOR'S PICK
            </span>
            <span className="font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-1 block">
              {product.brand}
            </span>
            <h2 className="font-display text-3xl lg:text-4xl uppercase mb-6 leading-tight text-brand-white">
              {product.name}
            </h2>
            <p className="font-sans text-brand-grey text-base leading-relaxed mb-8 max-w-xl">
              {product.description}
            </p>
            
            {product.spec_line && (
              <div className="flex gap-6 pt-6 border-t border-brand-border/30">
                <span className="font-mono text-[10px] text-brand-grey uppercase tracking-widest italic">
                  {product.spec_line}
                </span>
              </div>
            )}
          </div>

          {/* Price/CTA Right */}
          <div className="w-full lg:w-[300px] p-10 lg:p-16 flex flex-col items-center justify-center text-center gap-6">
            <div className="space-y-1">
              <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest block">Investment</span>
              <span className="font-display text-4xl text-brand-white">{formattedPrice}</span>
            </div>
            
            <div className="w-full space-y-3">
              <Link href={`/store/product/${product.slug}`} className="flex items-center justify-center gap-2 w-full py-4 bg-brand-orange text-white font-display text-[10px] uppercase tracking-widest hover:bg-brand-white hover:text-brand-orange transition-all font-bold">
                View Product <ArrowRight className="w-4 h-4" />
              </Link>
              <button className="flex items-center justify-center gap-2 w-full py-4 border border-brand-border text-brand-white font-display text-[10px] uppercase tracking-widest hover:border-brand-orange transition-all font-bold">
                <ShoppingCart className="w-4 h-4" /> Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
