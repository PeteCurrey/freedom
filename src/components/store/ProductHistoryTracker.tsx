"use client";

import { useEffect } from "react";

interface Product {
  id: string;
  name: string;
  brand: string;
  price_gbp: number;
  images: string[];
  slug: string;
  spec_line?: string;
  badge?: string;
  system_tier?: string;
}

export function ProductHistoryTracker({ product }: { product: Product }) {
  useEffect(() => {
    const stored = localStorage.getItem("amplios_history");
    let history: Product[] = [];
    
    if (stored) {
      try {
        history = JSON.parse(stored);
      } catch (e) {
        history = [];
      }
    }

    // Remove if already exists (to move to front)
    history = history.filter(p => p.id !== product.id);
    
    // Add to front
    history.unshift(product);
    
    // Limit to 10
    history = history.slice(0, 10);
    
    localStorage.setItem("amplios_history", JSON.stringify(history));
  }, [product]);

  return null;
}
