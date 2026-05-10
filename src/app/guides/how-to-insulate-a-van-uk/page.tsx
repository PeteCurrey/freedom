import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, Snowflake, Thermometer, ShieldCheck, Zap, Info, CheckCircle, VolumeX } from "lucide-react";

export const metadata: Metadata = {
  title: "How to Insulate a Van UK | The Definitive Guide | Amplios",
  description: "Stop the cold and silence the road. Our guide to the perfect multi-layer van insulation system using Dodo Mat and thermal barriers. UK 2026.",
  openGraph: {
    title: "How to Insulate a Van UK | The Definitive Guide",
    description: "The three-layer system for a quiet, warm, and condensation-free van.",
    url: "https://amplios.co.uk/guides/how-to-insulate-a-van-uk",
  },
  alternates: { canonical: "https://amplios.co.uk/guides/how-to-insulate-a-van-uk" },
};

export default function InsulationGuide() {
  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[60vh] flex items-end pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/cat-windows.png" // Placeholder
            alt="Van Insulation"
            fill
            className="object-cover opacity-30 grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian via-brand-obsidian/40 to-transparent" />
        </div>
        
        <div className="relative container mx-auto px-6 pb-20 z-10">
          <div className="max-w-4xl">
            <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em] mb-6 block leading-none">
              // ACOUSTIC & THERMAL
            </span>
            <h1 className="font-display text-5xl lg:text-9xl uppercase tracking-tighter text-brand-white leading-[0.85] mb-8">
              SILENCE<br />THE<br /><span className="text-brand-orange">COLD</span>
            </h1>
            <p className="font-sans text-brand-grey text-lg lg:text-2xl leading-relaxed max-w-2xl italic border-l-2 border-brand-orange pl-6">
              Insulation is the foundation of comfort. From killing panel 
              vibration to stopping internal condensation, here is how 
              to build a four-season van.
            </p>
          </div>
        </div>
      </section>

      {/* THE THREE LAYERS */}
      <section className="py-24 bg-brand-carbon">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-4">The Professional Three-Layer System</h2>
            <div className="w-16 h-1 bg-brand-orange mx-auto" />
          </div>
          
          <div className="grid lg:grid-cols-3 gap-12">
            {[
              { icon: VolumeX, title: "Layer 1: Deadening", desc: "Butyl-based sheets applied to the center of flat metal panels to stop vibration and 'tinny' road noise." },
              { icon: Thermometer, title: "Layer 2: Thermal", desc: "Closed-cell foam (Thermo Liner) applied over the deadening to provide a continuous thermal break." },
              { icon: ShieldCheck, title: "Layer 3: Cavity", desc: "Recycled fleece or wool used to fill the deep structural cavities where foam cannot reach." },
            ].map((layer) => (
              <div key={layer.title} className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-brand-obsidian border border-brand-border flex items-center justify-center rounded-sm">
                  <layer.icon className="w-6 h-6 text-brand-orange" />
                </div>
                <h3 className="font-display text-xl uppercase text-brand-white">{layer.title}</h3>
                <p className="font-sans text-brand-grey text-sm leading-relaxed">{layer.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="container mx-auto px-6 py-32">
        <div className="max-w-4xl mx-auto">
          
          <section className="mb-24">
            <h2 className="font-display text-4xl uppercase tracking-tight text-brand-white mb-8 text-center lg:text-left">The Vapor Barrier Myth</h2>
            <div className="prose prose-invert max-w-none font-sans text-brand-grey text-lg leading-relaxed space-y-6">
              <p>
                In the UK, condensation is your biggest enemy. Warm, moist breath 
                from sleeping occupants hits the cold metal van skin and turns 
                into water. Without a proper system, this leads to rust and 
                mould behind your walls.
              </p>
              <div className="bg-brand-orange text-brand-obsidian p-8 border-l-8 border-brand-obsidian font-bold">
                PRO TIP: Do not use household 'glass wool' or rockwool. These 
                absorb moisture and will trap water against your van skin. Use 
                only hydrophobic materials like Dodo Fleece or polyester.
              </div>
            </div>
          </section>

          <section className="mb-24">
            <h2 className="font-display text-4xl uppercase tracking-tight text-brand-white mb-8">Thermal Breaks: The Rib Strategy</h2>
            <div className="font-sans text-brand-grey text-base leading-relaxed space-y-6">
              <p>
                The structural ribs of your van are giant heat sinks. Even if 
                you have 50mm of insulation in the panels, heat will leak out 
                through the metal ribs.
              </p>
              <div className="p-8 border border-brand-border bg-brand-carbon/30 flex items-start gap-6">
                <Info className="w-6 h-6 text-brand-orange flex-shrink-0 mt-1" />
                <p className="text-sm">
                  Apply a thin layer of **Dodo Thermo Liner** or **closed-cell tape** 
                  across the face of every structural rib before you install 
                  your ply lining. This creates a thermal break that significantly 
                  improves winter warmth.
                </p>
              </div>
            </div>
          </section>

          {/* INTERNAL LINKS */}
          <div className="mt-20 pt-10 border-t border-brand-border/40">
            <h4 className="font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-8">Shop Insulation Systems</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/brands/dodo-mat" className="p-6 border border-brand-border hover:border-brand-orange transition-colors flex items-center justify-between group">
                <span className="font-display text-xs uppercase text-brand-white">Dodo Mat Brand Hub</span>
                <ArrowRight className="w-4 h-4 text-brand-orange group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/guides/dodo-mat/insulation-installation" className="p-6 border border-brand-border hover:border-brand-orange transition-colors flex items-center justify-between group">
                <span className="font-display text-xs uppercase text-brand-white">Installation Schematic</span>
                <ArrowRight className="w-4 h-4 text-brand-orange group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}
