import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, Leaf, ShieldCheck, Info, CheckCircle, Droplet, TestTube } from "lucide-react";

export const metadata: Metadata = {
  title: "Best Campervan Toilets UK 2026 | Composting vs Chemical | Amplios",
  description: "The honest truth about van life toilets. We compare chemical Porta Pottis, composting toilets (Simploo/Nature's Head), and separating toilets.",
  openGraph: {
    title: "Best Campervan Toilets UK 2026 | Composting vs Chemical",
    description: "The least glamorous but most important decision in your build.",
    url: "https://amplios.co.uk/guides/best-campervan-toilet",
  },
  alternates: { canonical: "https://amplios.co.uk/guides/best-campervan-toilet" },
};

export default function ToiletGuide() {
  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[50vh] flex items-end pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/cat-plumbing.png" // Placeholder
            alt="Campervan Toilets"
            fill
            className="object-cover opacity-30 grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian via-brand-obsidian/60 to-transparent" />
        </div>
        
        <div className="relative container mx-auto px-6 pb-16 z-10">
          <div className="max-w-4xl">
            <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em] mb-4 block leading-none">
              // OFF-GRID SANITATION
            </span>
            <h1 className="font-display text-4xl lg:text-7xl uppercase tracking-tighter text-brand-white leading-[0.9] mb-6">
              THE<br /><span className="text-brand-orange">BATHROOM</span><br />DEBATE
            </h1>
            <p className="font-sans text-brand-grey text-lg max-w-2xl italic border-l-2 border-brand-orange pl-6">
              It's the least glamorous part of a build, but the most important 
              for off-grid longevity. Chemical or Composting? Let's look at 
              the reality.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT SECTIONS */}
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          
          <section className="mb-24">
            <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-8">The Core Problem: Smell</h2>
            <div className="prose prose-invert max-w-none font-sans text-brand-grey text-base leading-relaxed space-y-6">
              <p>
                Human waste smells worst when liquids and solids are mixed together. 
                Traditional **Chemical Toilets** (like the classic Porta Potti) mix 
                everything in one holding tank, requiring harsh blue chemicals to 
                break it down and mask the odor. 
              </p>
              <p>
                **Separating Toilets** (often called Composting Toilets) solve this 
                by physically separating the liquids from the solids. The solids are 
                covered in a drying medium (like coco coir), which eliminates the 
                smell naturally without chemicals.
              </p>
            </div>
          </section>

          <section className="mb-24">
            <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-10 text-center lg:text-left">The Three Categories</h2>
            <div className="space-y-8">
              
              {/* CHEMICAL */}
              <div className="p-8 border border-brand-border bg-brand-obsidian space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <TestTube className="w-6 h-6 text-brand-orange" />
                  <h3 className="font-display text-2xl uppercase text-brand-white">Chemical (Porta Potti)</h3>
                </div>
                <p className="font-sans text-brand-grey text-sm leading-relaxed">
                  The budget option (£50 - £150). Very compact and easy to hide in a drawer. 
                  However, you MUST empty it at a designated chemical disposal point (Elsan), 
                  which means paying for campsites. You cannot legally empty blue chemicals 
                  into a public toilet or nature.
                </p>
                <div className="flex items-center gap-2 text-red-500 font-mono text-[10px] uppercase tracking-widest mt-4">
                  <Info className="w-3 h-3" /> Ties you to campsites
                </div>
              </div>

              {/* SEPARATING */}
              <div className="p-8 border border-brand-border bg-brand-obsidian space-y-4 relative overflow-hidden">
                <div className="absolute top-4 right-4 bg-brand-orange text-brand-obsidian font-display text-[10px] uppercase tracking-widest px-3 py-1">Editor's Pick</div>
                <div className="flex items-center gap-3 mb-4">
                  <Droplet className="w-6 h-6 text-brand-orange" />
                  <h3 className="font-display text-2xl uppercase text-brand-white">Urine Separating (Trelino, Cuddy)</h3>
                </div>
                <p className="font-sans text-brand-grey text-sm leading-relaxed">
                  The modern van life standard (£300 - £600). The liquids bottle can be 
                  emptied in any public toilet. The solids bin (lined with a compostable bag) 
                  can be legally disposed of in regular household waste if double-bagged. 
                  Offers true off-grid freedom for weeks at a time.
                </p>
              </div>

              {/* TRUE COMPOSTING */}
              <div className="p-8 border border-brand-border bg-brand-obsidian space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <Leaf className="w-6 h-6 text-brand-orange" />
                  <h3 className="font-display text-2xl uppercase text-brand-white">True Composting (Nature's Head, Simploo)</h3>
                </div>
                <p className="font-sans text-brand-grey text-sm leading-relaxed">
                  The premium option (£600 - £1000). These feature an agitator handle to 
                  mix the solids with the coco coir, actively starting the composting process. 
                  They require a 12V ventilation fan to be plumbed to the exterior to exhaust 
                  moisture. Excellent for full-time living.
                </p>
              </div>

            </div>
          </section>

          <section className="p-12 bg-brand-carbon border-l-4 border-brand-orange mb-24">
            <h3 className="font-display text-2xl uppercase tracking-tight text-brand-white mb-4">The Extractor Fan Rule</h3>
            <p className="font-sans text-brand-grey text-sm leading-relaxed">
              If you install a separating or composting toilet, we highly recommend 
              wiring a small 12V PC fan (like a Noctua) to draw air out of the solids 
              bin and vent it under the van floor. This creates negative pressure 
              in the toilet, ensuring 100% zero smell in the living space.
            </p>
          </section>

        </div>
      </div>

      <Footer />
    </main>
  );
}
