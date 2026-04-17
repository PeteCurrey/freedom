"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { X, ArrowRight, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function PromotionBanner() {
  const [promo, setPromo] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    async function fetchActivePromo() {
      // Check if user dismissed a banner recently
      const dismissed = localStorage.getItem("amplios_promo_dismissed");
      if (dismissed) return;

      const { data } = await supabase
        .from('site_promotions')
        .select('*')
        .eq('status', 'active')
        .eq('banner_type', 'header')
        .order('priority', { ascending: false })
        .limit(1)
        .single();
      
      if (data) {
        setPromo(data);
        setIsVisible(true);
      }
    }
    fetchActivePromo();
  }, []);

  const dismissBanner = () => {
    setIsVisible(false);
    localStorage.setItem("amplios_promo_dismissed", "true");
  };

  if (!isVisible || !promo) return null;

  return (
    <div className="bg-brand-orange text-white relative overflow-hidden group">
      {/* Blueprint Grid Overlay */}
      <div className="blueprint-grid absolute inset-0 opacity-10 pointer-events-none" />
      
      <div className="container mx-auto px-6 py-3 relative z-10 flex items-center justify-between gap-8">
        <div className="flex items-center gap-4 flex-1 overflow-hidden">
           <Zap size={14} className="shrink-0 animate-pulse" />
           <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-4 truncate">
              <span className="font-display text-[11px] uppercase tracking-widest font-bold whitespace-nowrap">
                 Tactical Alert: {promo.title}
              </span>
              <span className="hidden lg:inline-block w-px h-3 bg-white/30" />
              <p className="font-sans text-[10px] text-white/90 truncate">
                 {promo.content}
              </p>
           </div>
        </div>

        <div className="flex items-center gap-6">
           {promo.link_url && (
             <Link 
               href={promo.link_url} 
               className="font-mono text-[9px] uppercase tracking-widest font-bold flex items-center gap-2 hover:gap-4 transition-all whitespace-nowrap"
             >
                Extract Tech <ArrowRight size={12} />
             </Link>
           )}
           <button 
             onClick={dismissBanner}
             className="p-1 hover:bg-white/20 transition-colors"
           >
              <X size={14} />
           </button>
        </div>
      </div>
    </div>
  );
}
