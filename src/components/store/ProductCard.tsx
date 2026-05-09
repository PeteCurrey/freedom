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
    
    const stored = localStorage.getItem("amplios-cart");
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
    
    localStorage.setItem("amplios-cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cart-updated"));
  };

  return (
    <div
      className={cn(
        "group relative bg-brand-obsidian border border-brand-border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl rounded-sm overflow-hidden flex flex-col",
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
            "bg-brand-carbon text-brand-grey border border-brand-border"
          )}>
            {badge}
          </span>
        </div>
      )}

      {/* Image Container */}
      <Link href={`/store/product/${slug}`} className="block relative aspect-square overflow-hidden bg-brand-carbon p-8 flex-shrink-0">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            className="object-contain p-4 transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#F0F0F0] dark:bg-brand-carbon">
            <span className="font-display text-4xl text-brand-grey/50 uppercase tracking-tighter">
              {brand?.slice(0, 1) || "?"}
            </span>
            <span className="font-mono text-[8px] text-brand-grey/60 uppercase tracking-widest mt-2">Image coming soon</span>
          </div>
        )}
        
        {/* Tier Tag Overlay (Bottom Left) */}
        {systemTier && (
          <div className="absolute bottom-4 left-4 z-10">
            <span className="font-mono text-[8px] text-brand-white bg-brand-obsidian px-2 py-1 uppercase tracking-tighter border border-brand-border">
              {systemTier.replace(/-/g, ' ')}
            </span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-5 border-t border-brand-border flex-1 flex flex-col justify-between bg-brand-obsidian">
        <div>
          <div className="mb-1">
            <span className="font-mono text-[9px] text-brand-orange uppercase tracking-widest">
              {brand}
            </span>
          </div>
          
          <h3 className="font-display text-sm uppercase leading-tight mb-2 text-brand-white group-hover:text-brand-orange transition-colors line-clamp-2">
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
        </div>

        <div className="flex justify-between items-end mt-4">
          <div className="flex flex-col">
            {formattedComparePrice && (
              <span className="font-mono text-[10px] text-brand-grey line-through mb-1">
                {formattedComparePrice}
              </span>
            )}
            <span className="font-sans font-bold text-lg leading-none text-brand-white tracking-tight">
              {formattedPrice}
            </span>
          </div>
          
          <button 
            onClick={handleAction}
            className={cn(
              "px-4 py-2 font-display text-[9px] uppercase tracking-widest transition-all group/btn",
              isAffiliate 
                ? "border border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white" 
                : "bg-brand-orange text-white hover:bg-opacity-90 shadow-sm"
            )}
          >
            {isAffiliate ? (
              <span className="flex items-center gap-2">View <ExternalLink className="w-3 h-3" /></span>
            ) : (
              "Add to Cart"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
