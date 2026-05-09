import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RelatedProducts } from "@/components/editorial/RelatedProducts";
import { DodoSidebar } from "@/components/editorial/DodoSidebar";
import { ArrowRight, VolumeX, Thermometer, ShieldCheck, Zap, Info } from "lucide-react";

export const metadata: Metadata = {
  title: "Dodo Mat Van Insulation UK | Sound Deadening & Lining | Amplios",
  description: "Dodo Mat is the UK's leading van insulation brand. Explore sound deadening, thermal liners, and acoustic foam. The foundation of every build.",
  openGraph: {
    title: "Dodo Mat Van Insulation UK | Sound Deadening & Lining",
    description: "Quieter, warmer, better. The ultimate van insulation system.",
    url: "https://amplios.co.uk/brands/dodo-mat",
  },
  alternates: { canonical: "https://amplios.co.uk/brands/dodo-mat" },
};

const TOC = [
  { id: "intro", label: "The Build Foundation" },
  { id: "deadening", label: "Sound Deadening" },
  { id: "thermal", label: "Thermal Insulation" },
  { id: "vibe-filter", label: "Vibe Filter Tech" },
  { id: "why-dodo", label: "The Dodo Difference" },
  { id: "shop", label: "Shop Dodo Mat" },
];

const MENTIONED_PRODUCTS = [
  { name: "Dodo Deadening Liner", brand: "Dodo Mat", price: 4500, slug: "dodo-mat-deadening-liner-vibe-filter" },
  { name: "Dodo Thermo Liner V3", brand: "Dodo Mat", price: 6500, slug: "dodo-mat-thermo-liner-extreme-v3" },
  { name: "Dodo Super Liner", brand: "Dodo Mat", price: 3500, slug: "dodo-mat-super-liner-6mm" },
];

export default function DodoBrandHub() {
  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[60vh] flex items-end pt-24">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/cat-windows.png" // Placeholder
            alt="Dodo Mat Insulation"
            fill
            className="object-cover opacity-40 grayscale-[0.4]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian via-brand-obsidian/40 to-transparent" />
        </div>
        
        <div className="relative container mx-auto px-6 pb-20 z-10">
          <div className="max-w-3xl">
            <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em] mb-6 block leading-none">
              // THE FOUNDATION OF EVERY BUILD
            </span>
            <h1 className="font-display text-5xl lg:text-8xl uppercase tracking-tighter text-brand-white leading-[0.9] mb-8">
              DODO MAT:<br /><span className="text-brand-orange">SILENCE</span><br />& HEAT
            </h1>
            <p className="font-sans text-brand-grey text-lg lg:text-xl leading-relaxed max-w-2xl italic border-l-2 border-brand-orange pl-6">
              Transform your van from a hollow metal box into a quiet, thermally 
              stable home. UK-manufactured insulation solutions for professional 
              builders and DIYers.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-20">
        <div className="flex gap-16">
          <div className="flex-1 min-w-0">
            
            {/* INTRO */}
            <section id="intro" className="mb-24 scroll-mt-28">
              <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-8">
                The Build Foundation
              </h2>
              <div className="prose prose-invert max-w-none font-sans text-brand-grey text-lg leading-relaxed space-y-6">
                <p>
                  Insulation is the single most important stage of a van conversion. 
                  Once your walls are up, you can't go back and fix it. **Dodo Mat** 
                  has become the industry standard in the UK by offering a multi-stage 
                  system that addresses both **vibration (sound)** and **heat transfer (thermal)**.
                </p>
                <p>
                  By using a combination of butyl-based sound deadening and 
                  closed-cell foam liners, Dodo Mat products ensure your van 
                  stays warm in the winter, cool in the summer, and quiet on 
                  the motorway.
                </p>
              </div>
            </section>

            {/* DEADENING */}
            <section id="deadening" className="mb-24 scroll-mt-28">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-brand-orange/10 flex items-center justify-center rounded-sm">
                  <VolumeX className="w-6 h-6 text-brand-orange" />
                </div>
                <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white">
                  Sound Deadening
                </h2>
              </div>
              <div className="bg-brand-carbon border border-brand-border p-10 flex flex-col lg:flex-row gap-10 items-center">
                <div className="flex-1 text-center lg:text-left">
                  <h3 className="font-display text-2xl uppercase text-brand-white mb-4">Kill the 'Clang'</h3>
                  <p className="font-sans text-brand-grey text-base leading-relaxed mb-8">
                    Dodo Deadening Liner is a high-density butyl sheet that adds mass 
                    to your van's metal panels. This stops them from vibrating like 
                    a drum, dramatically reducing road noise and the hollow sound 
                    typical of an empty van.
                  </p>
                  <Link href="/guides/dodo-mat/van-insulation-guide" className="inline-flex items-center gap-2 bg-brand-orange text-white px-8 py-3 font-display text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all">
                    Insulation Guide <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="w-full lg:w-1/3 aspect-square bg-brand-obsidian border border-brand-border flex items-center justify-center">
                  <span className="font-mono text-[10px] text-brand-grey uppercase tracking-widest">Deadening Visual</span>
                </div>
              </div>
            </section>

            {/* THERMAL */}
            <section id="thermal" className="mb-24 scroll-mt-28">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-brand-orange/10 flex items-center justify-center rounded-sm">
                  <Thermometer className="w-6 h-6 text-brand-orange" />
                </div>
                <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white">
                  Thermal Insulation
                </h2>
              </div>
              <div className="prose prose-invert max-w-none font-sans text-brand-grey text-lg leading-relaxed space-y-6">
                <p>
                  Once the vibration is handled, the next stage is thermal management. 
                  **Dodo Thermo Liner** is a professional-grade closed-cell foam 
                  that provides a significant thermal barrier. Unlike traditional 
                  fibrous insulation, it does not absorb moisture, preventing 
                  condensation and rust behind your panels.
                </p>
              </div>
            </section>

            {/* VIBE FILTER */}
            <section id="vibe-filter" className="mb-24 scroll-mt-28">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-brand-orange/10 flex items-center justify-center rounded-sm">
                  <Zap className="w-6 h-6 text-brand-orange" />
                </div>
                <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white">
                  Vibe Filter Technology
                </h2>
              </div>
              <div className="space-y-6 font-sans text-brand-grey text-lg leading-relaxed max-w-3xl">
                <p>
                  Dodo Mat's proprietary "Vibe Filter" composition is designed to 
                  remain flexible even in freezing temperatures, ensuring consistent 
                  performance year-round. It is easy to cut with a standard utility 
                  knife and features an ultra-strong adhesive backing that won't 
                  peel off in summer heat.
                </p>
              </div>
            </section>

            {/* WHY DODO */}
            <section id="why-dodo" className="mb-24 scroll-mt-28">
              <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-10">
                The Dodo Difference
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { title: "Closed Cell", desc: "Will not absorb water, preventing mould and rust behind your interior lining." },
                  { title: "Self Adhesive", desc: "No need for messy spray glues; simply peel and stick for a permanent bond." },
                  { title: "Fire Resistant", desc: "Meets automotive fire safety standards for peace of mind." },
                  { title: "Lightweight", desc: "High performance without adding significant weight to your vehicle payload." },
                ].map((item) => (
                  <div key={item.title} className="p-6 border border-brand-border bg-brand-carbon/50">
                    <div className="flex items-center gap-3 mb-3">
                      <ShieldCheck className="w-5 h-5 text-brand-orange" />
                      <h3 className="font-display text-sm uppercase tracking-widest text-brand-white">{item.title}</h3>
                    </div>
                    <p className="font-sans text-brand-grey text-xs leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* RELATED PRODUCTS */}
            <div className="mt-16 pt-10 border-t border-brand-border/40">
              <RelatedProducts products={MENTIONED_PRODUCTS} />
              
              <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest mb-6 mt-16 block">Related guides</span>
              <div className="flex flex-wrap gap-4">
                <Link href="/guides/dodo-mat/van-insulation-guide" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">Insulation Guide →</Link>
                <Link href="/guides/dodo-mat/insulation-installation" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">Installation Guide →</Link>
              </div>
            </div>

          </div>

          <DodoSidebar items={TOC} currentPage="/brands/dodo-mat" />
        </div>
      </div>

      <Footer />
    </main>
  );
}
