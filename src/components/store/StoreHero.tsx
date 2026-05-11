"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Truck, Headphones } from "lucide-react";

interface StoreHeroProps {
  image?: string;
}

export function StoreHero({ image = "/images/hero-background.png" }: StoreHeroProps) {
  return (
    <section className="bg-brand-carbon border-t-2 border-brand-orange pt-20 lg:pt-32">
      <div className="container mx-auto px-6 h-full">
        <div className="flex flex-col lg:flex-row lg:min-h-[calc(100vh-160px)] items-stretch gap-8 lg:gap-0">
          {/* LEFT: Editorial Content */}
          <div className="lg:w-[60%] py-12 pr-12 flex flex-col justify-center">
            <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em] mb-4 block">
              // GEAR FOR SERIOUS BUILDS
            </span>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl uppercase leading-[1.1] tracking-tight mb-6 text-brand-white">
              Professional-grade components for <br className="hidden lg:block" /> serious off-grid builds.
            </h1>
            <p className="font-sans text-brand-grey text-base lg:text-lg mb-10 max-w-xl">
              Every product in this registry is cross-referenced for system compatibility and engineered for high-performance living.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-12">
              <Link href="#categories" className="bg-brand-orange text-white px-8 py-4 font-display text-[10px] uppercase tracking-widest hover:bg-brand-white hover:text-brand-orange transition-all font-bold">
                Browse by System
              </Link>
              <Link href="/store/kits" className="bg-transparent border border-brand-border text-brand-white px-8 py-4 font-display text-[10px] uppercase tracking-widest hover:border-brand-orange transition-all font-bold">
                View Build Kits
              </Link>
            </div>

            {/* Trust Signals */}
            <div className="flex flex-wrap gap-8 items-center pt-8 border-t border-brand-border/30">
              <div className="flex items-center gap-3 py-2">
                <Truck className="w-4 h-4 text-brand-orange" />
                <span className="font-sans text-[13px] text-brand-grey">Free UK delivery over £150</span>
              </div>
              <div className="flex items-center gap-3 py-2">
                <Headphones className="w-4 h-4 text-brand-orange" />
                <span className="font-sans text-[13px] text-brand-grey">Expert technical support</span>
              </div>
              <div className="flex items-center gap-3 py-2">
                <ShieldCheck className="w-4 h-4 text-brand-orange" />
                <span className="font-sans text-[13px] text-brand-grey">Trade account pricing</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Image */}
          <div className="lg:w-[40%] relative min-h-[300px] lg:min-h-auto h-full min-h-[50vh]">
            <Image 
              src={image}
              alt="Professional Build Environment"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
