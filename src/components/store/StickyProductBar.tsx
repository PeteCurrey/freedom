"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, ChevronRight, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface StickyProductBarProps {
  product: {
    id: string;
    name: string;
    brand: string;
    price_gbp: number;
    image_url?: string;
    slug: string;
  };
}

export default function StickyProductBar({ product }: StickyProductBarProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when user scrolls past 600px (header/hero)
      if (window.scrollY > 600) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAddToCart = () => {
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
        image: product.image_url,
        slug: product.slug,
        quantity: 1
      });
    }
    
    localStorage.setItem("diym_cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cart-updated"));
    alert("Added to cart!");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          className="fixed bottom-0 inset-x-0 z-50 bg-brand-obsidian border-t border-brand-orange/30 p-4 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]"
        >
          <div className="container mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 truncate">
              <div className="w-12 h-12 blueprint-border bg-brand-carbon flex items-center justify-center shrink-0">
                 <Zap className="w-5 h-5 text-brand-orange" />
              </div>
              <div className="truncate">
                <p className="font-mono text-[8px] text-brand-grey uppercase tracking-widest">{product.brand}</p>
                <h4 className="font-display text-xs lg:text-sm uppercase text-brand-white truncate">{product.name}</h4>
              </div>
            </div>

            <div className="flex items-center gap-6 shrink-0">
               <div className="text-right hidden sm:block">
                  <p className="font-mono text-[8px] text-brand-grey uppercase">Final Engineering Cost</p>
                  <p className="font-display text-lg text-brand-orange">£{(product.price_gbp / 100).toLocaleString()}</p>
               </div>
               <button
                 onClick={handleAddToCart}
                 className="bg-brand-orange text-white px-6 py-4 font-display text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all flex items-center gap-2"
               >
                 Add to Cart <ShoppingBag className="w-4 h-4" />
               </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
