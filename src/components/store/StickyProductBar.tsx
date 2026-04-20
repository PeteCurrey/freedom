"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Zap, CreditCard, Plus, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface StickyProductBarProps {
  product: {
    id: string;
    name: string;
    brand: string;
    price_gbp: number;
    image?: string;
    slug: string;
    is_affiliate?: boolean;
  };
}

export function StickyProductBar({ product }: StickyProductBarProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 800) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAddToCart = () => {
    if (product.is_affiliate) {
      window.open(`/api/affiliate/redirect?type=product&id=${product.id}`, '_blank');
      return;
    }

    const stored = localStorage.getItem("diym_cart");
    let cart = stored ? JSON.parse(stored) : [];
    
    const existing = cart.find((item: any) => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price_gbp,
        image: product.image,
        slug: product.slug,
        quantity: 1
      });
    }
    
    localStorage.setItem("diym_cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cart-updated"));
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          className="fixed bottom-0 inset-x-0 z-[60] bg-brand-obsidian/95 backdrop-blur-xl border-t border-brand-orange shadow-[0_-20px_50px_rgba(0,0,0,0.8)]"
        >
          <div className="container mx-auto px-6 py-4 flex items-center justify-between gap-8">
            <div className="flex items-center gap-6 min-w-0">
               <div className="w-12 h-12 bg-brand-carbon blueprint-border p-2 hidden sm:flex items-center justify-center shrink-0">
                  <img src={product.image || "/images/electrical-technical.png"} className="w-full h-full object-contain grayscale" alt={product.name} />
               </div>
               <div className="min-w-0">
                  <span className="font-mono text-[8px] text-brand-orange uppercase tracking-widest block mb-1">{product.brand}</span>
                  <h4 className="font-display text-sm lg:text-base uppercase text-white truncate">{product.name}</h4>
               </div>
            </div>

            <div className="flex items-center gap-8 shrink-0">
               <div className="text-right flex flex-col items-end">
                  <span className="font-mono text-[8px] text-brand-grey uppercase tracking-widest mb-1">Commission Rate</span>
                  <span className="font-display text-2xl text-white">£{(product.price_gbp / 100).toLocaleString()}</span>
               </div>
                <button
                  onClick={handleAddToCart}
                  className="bg-brand-orange text-white px-8 py-4 font-display text-[10px] uppercase tracking-[0.2em] hover:bg-white hover:text-brand-obsidian transition-all flex items-center gap-3 shadow-[0_0_30px_rgba(255,107,0,0.2)]"
                >
                  {product.is_affiliate ? (
                    <>
                      View Technical Link <ExternalLink size={12} />
                    </>
                  ) : (
                    <>
                      Register Component <Plus size={12} />
                    </>
                  )}
                </button>
            </div>
          </div>
          
          {/* Blueprint corner accent */}
          <div className="absolute top-0 right-0 w-4 h-full bg-brand-orange/10 pointer-events-none" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
