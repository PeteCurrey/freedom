"use client";

import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

interface HorizontalScrollProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
}

export function HorizontalScroll({ children, title, subtitle, className }: HorizontalScrollProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      const pin = gsap.fromTo(
        sectionRef.current,
        { x: 0 },
        {
          x: () => -(sectionRef.current!.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: triggerRef.current,
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => `+=${sectionRef.current!.scrollWidth - window.innerWidth}`,
            invalidateOnRefresh: true,
          },
        }
      );

      // Force a refresh after the pin is set
      ScrollTrigger.refresh();

      return () => pin.kill();
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={triggerRef} className="relative overflow-hidden bg-brand-obsidian">
      {/* Header Info (Optional) */}
      {(title || subtitle) && (
        <div className="container mx-auto px-6 pt-24 pb-12 relative z-10">
          <div className="max-w-4xl">
            {title && (
              <h2 className="font-display text-4xl lg:text-7xl mb-6 leading-tight">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="font-sans text-brand-grey text-lg lg:text-xl uppercase tracking-widest max-w-xl">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Horizontal Container */}
      <div ref={sectionRef} className={cn("flex items-start gap-12 px-6 pb-24 h-full min-w-max", className)}>
        {children}
      </div>

      {/* Blueprint Grid Overlay */}
      <div className="absolute inset-0 blueprint-grid pointer-events-none opacity-5 group-hover:opacity-10 transition-opacity duration-1000" />
    </div>
  );
}
