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
    image_url?: string;
    images?: string[];
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

  const stripMarkdown = (text: string) => {
    if (!text) return '';
    // Strip markdown formatting symbols
    const clean = text.replace(/[#*`_~>\[\]\(\)\-]/g, '').replace(/\s+/g, ' ').trim();
    return clean.length > 150 ? clean.substring(0, 150) + '...' : clean;
  };

  const imageSrc = product.images?.[0] ?? product.image_url ?? null;

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-6">
        <div className="bg-white border border-[#E5E5E5] flex flex-col lg:flex-row items-center overflow-hidden shadow-sm rounded-sm p-8 gap-8">
          {/* Product Image Left */}
          <div className="w-[200px] h-[200px] relative bg-[#F8F8F6] rounded-[8px] flex-shrink-0 flex items-center justify-center p-4">
            {imageSrc ? (
              <img 
                src={imageSrc}
                alt={product.name}
                className="w-full h-full object-contain mix-blend-multiply"
              />
            ) : (
              <div className="flex flex-col items-center justify-center">
                <span className="font-display text-4xl text-brand-grey/40 uppercase tracking-tighter">
                  {product.brand?.slice(0, 1) || "A"}
                </span>
              </div>
            )}
          </div>

          {/* Content Centre */}
          <div className="flex-1 lg:px-8 pt-8 lg:pt-0 border-t lg:border-t-0 lg:border-r border-[#E5E5E5]">
            <span className="font-mono text-[9px] text-brand-orange uppercase tracking-[0.3em] mb-4 block">
              EDITOR'S PICK
            </span>
            <span className="font-mono text-[10px] text-[#666666] uppercase tracking-widest mb-1 block">
              {product.brand}
            </span>
            <h2 className="font-display text-2xl lg:text-4xl uppercase mb-4 leading-tight text-[#111111]">
              {product.name}
            </h2>
            <p className="font-sans text-[#666666] text-sm lg:text-base leading-relaxed mb-6 max-w-xl">
              {stripMarkdown(product.description)}
            </p>
            
            {product.spec_line && (
              <div className="flex gap-6 pt-6 border-t border-[#E5E5E5]">
                <span className="font-mono text-[10px] text-[#999999] uppercase tracking-widest italic">
                  {product.spec_line}
                </span>
              </div>
            )}
          </div>

          {/* Price/CTA Right */}
          <div className="w-full lg:w-[250px] p-8 flex flex-col items-center justify-center text-center gap-6">
            <div className="space-y-1">
              <span className="font-mono text-[9px] text-[#666666] uppercase tracking-widest block">Investment</span>
              <span className="font-display text-4xl text-[#111111]">{formattedPrice}</span>
            </div>
            
            <div className="w-full space-y-3">
              <Link href={`/store/product/${product.slug}`} className="flex items-center justify-center gap-2 w-full py-4 bg-brand-orange text-white font-display text-[10px] uppercase tracking-widest hover:bg-[#E05A00] transition-all font-bold rounded-sm shadow-sm">
                View Product <ArrowRight className="w-4 h-4" />
              </Link>
              <button className="flex items-center justify-center gap-2 w-full py-4 border border-[#E5E5E5] text-[#111111] font-display text-[10px] uppercase tracking-widest hover:border-brand-orange hover:text-brand-orange transition-all font-bold rounded-sm">
                <ShoppingCart className="w-4 h-4" /> Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
