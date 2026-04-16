"use client";

import { useState, useEffect } from "react";
import { ShoppingCart, Check } from "lucide-react";

interface AddToCartButtonProps {
  product: {
    id: string;
    name: string;
    brand: string;
    price_gbp: number;
    image_url?: string;
    slug: string;
  };
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    const stored = localStorage.getItem("diym_cart");
    const cart = stored ? JSON.parse(stored) : [];

    const existing = cart.find((item: any) => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price_gbp,
        quantity: 1,
        image: product.image_url,
        slug: product.slug,
      });
    }

    localStorage.setItem("diym_cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cart-updated"));

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      onClick={handleAdd}
      className={`w-full py-6 font-display text-xs uppercase tracking-widest transition-all shadow-2xl flex items-center justify-center gap-3 ${
        added
          ? "bg-green-600 text-white"
          : "bg-brand-orange text-white hover:scale-[1.02] shadow-brand-orange/20"
      }`}
    >
      {added ? (
        <>
          <Check className="w-4 h-4" /> Added to Cart
        </>
      ) : (
        <>
          <ShoppingCart className="w-4 h-4" /> Add to Cart
        </>
      )}
    </button>
  );
}
