import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RelatedProducts } from "@/components/editorial/RelatedProducts";
import { DodoSidebar } from "@/components/editorial/DodoSidebar";
import { ArrowRight, VolumeX, Thermometer, ShieldCheck, Zap, Info, ShieldAlert } from "lucide-react";

export const metadata: Metadata = {
  title: "Ultimate Van Insulation Guide | Sound & Heat | Amplios",
  description: "A professional guide to insulating your campervan. Learn how to use Dodo Mat sound deadening and thermal liners for a quiet, warm home on wheels.",
  openGraph: {
    title: "Ultimate Van Insulation Guide | Sound & Heat",
    description: "The complete system for a quiet and warm campervan build.",
    url: "https://amplios.co.uk/guides/dodo-mat/van-insulation-guide",
  },
  alternates: { canonical: "https://amplios.co.uk/guides/dodo-mat/van-insulation-guide" },
};

const TOC = [
  { id: "intro", label: "The Multi-Layer System" },
  { id: "stage-1", label: "Stage 1: Sound Deadening" },
  { id: "stage-2", label: "Stage 2: Thermal Barrier" },
  { id: "stage-3", label: "Stage 3: Vapor Control" },
  { id: "tips", label: "Expert Application Tips" },
];

const MENTIONED_PRODUCTS = [
  { name: "Dodo Deadening Liner", brand: "Dodo Mat", price: 4500, slug: "dodo-mat-deadening-liner-vibe-filter" },
  { name: "Dodo Thermo Liner V3", brand: "Dodo Mat", price: 6500, slug: "dodo-mat-thermo-liner-extreme-v3" },
  { name: "Dodo Fleece Insulation", brand: "Dodo Mat", price: 3200, slug: "dodo-mat-recycled-fleece-insulation" },
];

export default function DodoVanInsulationGuide() {
  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[50vh] flex items-end pt-24">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/cat-windows.png" // Placeholder
            alt="Van Insulation Guide"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian via-brand-obsidian/40 to-transparent" />
        </div>
        
        <div className="relative container mx-auto px-6 pb-16 z-10">
          <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em] mb-4 block">
            // MASTERCLASS
          </span>
          <h1 className="font-display text-4xl lg:text-6xl uppercase tracking-tight text-brand-white leading-[1] mb-4">
            The Ultimate<br />Insulation Strategy
          </h1>
          <p className="font-sans text-brand-grey text-lg max-w-2xl italic border-l-2 border-brand-orange pl-6">
            Silence the road and stop the cold. A technical deep-dive into the professional multi-layer insulation system.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16">
        <div className="flex gap-16">
          <div className="flex-1 min-w-0">
            
            {/* INTRO */}
            <section id="intro" className="mb-20 scroll-mt-28">
              <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white mb-6">
                The Multi-Layer System
              </h2>
              <div className="prose prose-invert max-w-none font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  Effective insulation isn't about just sticking one product to 
                  the wall. It's about a systematic approach that addresses 
                  vibration, heat conduction, and moisture management. 
                  Professional builders use a three-layer strategy to achieve 
                  optimum results.
                </p>
              </div>
            </section>

            {/* STAGE 1 */}
            <section id="stage-1" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <VolumeX className="w-5 h-5 text-brand-orange" />
                <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white">
                  Stage 1: Sound Deadening
                </h2>
              </div>
              <div className="prose prose-invert max-w-none font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  The first step is to apply **Dodo Deadening Liner** to the flat 
                  sections of the van panels. You don't need 100% coverage; 
                  covering approximately 60-70% of the panel surface is enough 
                  to effectively kill the vibration. This is the foundation of 
                  a quiet cabin.
                </p>
              </div>
            </section>

            {/* STAGE 2 */}
            <section id="stage-2" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <Thermometer className="w-5 h-5 text-brand-orange" />
                <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white">
                  Stage 2: Thermal Barrier
                </h2>
              </div>
              <div className="font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  Once deadened, apply **Dodo Thermo Liner** directly over the sound 
                  deadening. This closed-cell foam acts as a thermal break, 
                  preventing heat from transferring through the metal skin. 
                  It also provides secondary sound absorption for high-frequency 
                  wind noise.
                </p>
              </div>
            </section>

            {/* STAGE 3 */}
            <section id="stage-3" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <ShieldCheck className="w-5 h-5 text-brand-orange" />
                <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white">
                  Stage 3: Vapor Control
                </h2>
              </div>
              <div className="prose prose-invert max-w-none font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  The final layer is **Dodo Fleece** or additional liner used to fill 
                  the deep cavities and structural ribs. The most important rule: 
                  ensure there are no air gaps between your metal skin and your 
                  insulation. Any gap is a place for condensation to form.
                </p>
              </div>
            </section>

            {/* TIPS */}
            <section id="tips" className="mb-20 scroll-mt-28">
              <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white mb-6">
                Expert Application Tips
              </h2>
              <div className="p-8 bg-brand-carbon border border-brand-border space-y-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-brand-orange/10 flex items-center justify-center rounded-sm flex-shrink-0">
                    <Zap className="w-4 h-4 text-brand-orange" />
                  </div>
                  <div>
                    <h4 className="font-display text-sm uppercase text-brand-white mb-1">Use a Roller</h4>
                    <p className="text-xs text-brand-grey font-sans">Apply significant pressure when installing sound deadening to ensure the butyl is properly bonded to the metal.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-brand-orange/10 flex items-center justify-center rounded-sm flex-shrink-0">
                    <ShieldAlert className="w-4 h-4 text-brand-orange" />
                  </div>
                  <div>
                    <h4 className="font-display text-sm uppercase text-brand-white mb-1">Avoid Soft-Fibre in Doors</h4>
                    <p className="text-xs text-brand-grey font-sans">Never use wool or fleece in areas where water might enter (like doors). Use only closed-cell foam in these zones.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* RELATED PRODUCTS */}
            <div className="mt-16 pt-10 border-t border-brand-border/40">
              <RelatedProducts products={MENTIONED_PRODUCTS} />
              
              <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest mb-6 mt-16 block">Related guides</span>
              <div className="flex flex-wrap gap-4">
                <Link href="/brands/dodo-mat" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">Dodo Mat Hub →</Link>
                <Link href="/guides/dodo-mat/insulation-installation" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">Installation Guide →</Link>
              </div>
            </div>

          </div>

          <DodoSidebar items={TOC} currentPage="/guides/dodo-mat/van-insulation-guide" />
        </div>
      </div>

      <Footer />
    </main>
  );
}
