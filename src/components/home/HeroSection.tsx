"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { MoveDown } from "lucide-react";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
}

export function HeroSection({ title, subtitle, backgroundImage = "/images/bespoke-sprinter.png" }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  const displayTitle = title || "BUILD YOUR WORLD";
  const displaySubtitle = subtitle || "The UK's premier resource for serious off-grid motorhome builds. Guides. Gear. Community. Engineering.";

  useEffect(() => {
    // 1. Text & UI Animations
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out", duration: 1.5 } });

      if (headingRef.current) {
        const text = headingRef.current.innerText;
        headingRef.current.innerHTML = text
          .split("")
          .map((char) => `<span class="inline-block translate-y-[100%] opacity-0">${char === " " ? "&nbsp;" : char}</span>`)
          .join("");

        tl.to(
          headingRef.current.querySelectorAll("span"),
          {
            y: 0,
            opacity: 1,
            stagger: 0.02,
          },
          0.5
        );
      }

      tl.fromTo(
        subRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1 },
        "-=1"
      );

      tl.fromTo(
        ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1 },
        "-=1.2"
      );

      // 2. Cinematic Background Zoom (Ken Burns)
      if (bgRef.current) {
        gsap.fromTo(bgRef.current, 
          { scale: 1 }, 
          { scale: 1.1, duration: 20, ease: "none", repeat: -1, yoyo: true }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [displayTitle]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-brand-obsidian"
    >
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <div
          ref={bgRef}
          className="absolute inset-0 will-change-transform grayscale-[0.2]"
          style={{ 
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-obsidian/40 via-transparent to-brand-obsidian z-10" />
        <div className="absolute inset-0 bg-brand-obsidian/20 z-10" />
        <div className="absolute inset-0 blueprint-grid opacity-10 z-10" />
      </div>

      {/* Content */}
      <div className="container relative z-20 px-6 text-center">
        <h1
          ref={headingRef}
          key={displayTitle}
          className="font-display text-[9vw] lg:text-[7vw] leading-[0.8] tracking-tighter text-brand-white mb-8 whitespace-nowrap"
        >
          {displayTitle}
        </h1>
        
        <p
          ref={subRef}
          className="font-sans text-brand-grey text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          {displaySubtitle}
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link
            href="/planner"
            className="group relative px-10 py-5 bg-brand-orange text-white overflow-hidden"
          >
            <div className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-expo-out" />
            <span className="relative font-display text-sm tracking-widest uppercase z-10">
              Start Your Build →
            </span>
          </Link>
          <Link
            href="/vehicles"
            className="px-10 py-5 border border-brand-white/20 hover:border-brand-orange text-brand-white hover:text-brand-orange transition-all font-display text-sm tracking-widest uppercase bg-white/5 backdrop-blur-sm"
          >
            Explore Vehicles
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 animate-bounce opacity-40 z-20">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-brand-grey rotate-90 origin-center mb-4">
          Scroll
        </span>
        <MoveDown className="w-5 h-5 text-brand-orange" />
      </div>
    </section>
  );
}


