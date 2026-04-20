"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Plus, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  id: string;
  name: string;
  brand: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  slug: string;
  specLine?: string;
  badge?: string;
  systemTier?: string;
  isAffiliate?: boolean;
  className?: string;
}

export function ProductCard({
  id,
  name,
  brand,
  price,
  compareAtPrice,
  image,
  slug,
  specLine,
  badge,
  systemTier,
  isAffiliate,
  className,
}: ProductCardProps) {
  const formattedPrice = (price / 100).toLocaleString("en-GB", {
    style: "currency",
    currency: "GBP",
  });

  const formattedComparePrice = compareAtPrice 
    ? (compareAtPrice / 100).toLocaleString("en-GB", {
        style: "currency",
        currency: "GBP",
      })
    : null;

  const handleAction = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isAffiliate) {
      window.open(`/api/affiliate/redirect?type=product&id=${id}`, '_blank');
      return;
    }
    
    const stored = localStorage.getItem("diym_cart");
    let cart = stored ? JSON.parse(stored) : [];
    
    const existingIndex = cart.findIndex((item: any) => item.id === id);
    if (existingIndex !== -1) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({
        id,
        name,
        brand,
        price,
        image,
        slug,
        quantity: 1
      });
    }
    
    localStorage.setItem("diym_cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cart-updated"));
  };

  return (
    <div
      className={cn(
        "group relative bg-brand-carbon blueprint-border transition-all duration-300 hover:bg-brand-graphite",
        className
      )}
    >
      {/* Badge Overlay */}
      {badge && (
        <div className="absolute top-4 left-4 z-20">
          <span className={cn(
            "font-mono text-[8px] uppercase tracking-widest px-2 py-1",
            badge === "Bestseller" || badge === "Most Popular" || badge === "Editor's Pick" ? "bg-brand-orange text-white" :
            badge === "New" ? "bg-green-600 text-white" :
            badge === "Kit" ? "bg-blue-600 text-white" :
            "bg-brand-obsidian text-brand-grey border border-brand-border"
          )}>
            {badge}
          </span>
        </div>
      )}

      {/* Image Container */}
      <Link href={`/store/product/${slug}`} className="block relative aspect-square overflow-hidden bg-brand-obsidian p-8">
        <Image
          src={image || "/images/hero-background.png"}
          alt={name}
          fill
          className="object-contain transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
        />
        
        {/* Tier Tag Overlay (Bottom Left) */}
        {systemTier && (
          <div className="absolute bottom-4 left-4 z-10">
            <span className="font-mono text-[8px] text-brand-grey bg-brand-obsidian/80 px-2 py-1 uppercase tracking-tighter border border-brand-border/30">
              {systemTier.replace(/-/g, ' ')}
            </span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-5 border-t border-brand-border">
        <div className="mb-1">
          <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest">
            {brand}
          </span>
        </div>
        
        <h3 className="font-display text-sm uppercase leading-tight mb-2 group-hover:text-brand-orange transition-colors line-clamp-2 min-h-10">
          <Link href={`/store/product/${slug}`}>
            {name}
          </Link>
        </h3>

        {/* Technical Spec Line (JetBrains Mono) */}
        {specLine && (
          <p className="font-mono text-[10px] text-brand-grey mb-4 truncate italic">
            {specLine}
          </p>
        )}

        <div className="flex justify-between items-end">
          <div className="flex flex-col">
            {formattedComparePrice && (
              <span className="font-mono text-[10px] text-brand-grey line-through">
                {formattedComparePrice}
              </span>
            )}
            <span className="font-display font-medium text-lg leading-none">
              {formattedPrice}
            </span>
          </div>
          
          <button 
            onClick={handleAction}
            className={cn(
              "p-2 transition-all group/btn",
              isAffiliate ? "bg-brand-orange/20 hover:bg-brand-orange text-brand-orange hover:text-white" : "bg-brand-orange hover:bg-white text-white hover:text-brand-obsidian"
            )}
          >
            {isAffiliate ? (
              <ExternalLink className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
            ) : (
              <Plus className="w-4 h-4 transition-transform group-hover/btn:rotate-90" />
            )}
          </button>
        </div>
      </div>

      {/* Hover corner accents */}
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-brand-orange/0 group-hover:border-brand-orange/100 transition-all duration-300" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-brand-orange/0 group-hover:border-brand-orange/100 transition-all duration-300" />
    </div>
  );
}
