"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function ThemeHandler() {
  const pathname = usePathname();
  
  useEffect(() => {
    const isStore = pathname?.startsWith('/store') || 
                    pathname?.startsWith('/cart') || 
                    pathname?.startsWith('/checkout');
                    
    if (isStore) {
      document.body.classList.add('store-light');
    } else {
      document.body.classList.remove('store-light');
    }
    
    // Cleanup
    return () => {
      document.body.classList.remove('store-light');
    };
  }, [pathname]);

  return null;
}
