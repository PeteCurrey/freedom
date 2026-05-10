import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, Box, Zap, ShieldCheck, Info, CheckCircle, Gauge, Layout } from "lucide-react";

export const metadata: Metadata = {
  title: "Best Mercedes Sprinter Conversion Layouts | LWB & MWB Guide | Amplios",
  description: "Explore the most popular Mercedes Sprinter conversion layouts. From fixed rear beds to u-shape lounges and family 4-berth designs.",
  openGraph: {
    title: "Best Mercedes Sprinter Conversion Layouts | LWB & MWB Guide",
    description: "Find your perfect Sprinter floor plan. 3D renders and CAD ideas.",
    url: "https://amplios.co.uk/guides/sprinter-van-conversion-layout",
  },
  alternates: { canonical: "https://amplios.co.uk/guides/sprinter-van-conversion-layout" },
};

export default function SprinterLayoutGuide() {
  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[60vh] flex items-end pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/cat-windows.png" // Placeholder
            alt="Sprinter Layouts"
            fill
            className="object-cover opacity-30 grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian via-brand-obsidian/40 to-transparent" />
        </div>
        
        <div className="relative container mx-auto px-6 pb-20 z-10">
          <div className="max-w-4xl">
            <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em] mb-6 block leading-none">
              // SPATIAL DESIGN
            </span>
            <h1 className="font-display text-5xl lg:text-9xl uppercase tracking-tighter text-brand-white leading-[0.85] mb-8">
              THE<br />PERFECT<br /><span className="text-brand-orange">FLOOR</span><br />PLAN
            </h1>
            <p className="font-sans text-brand-grey text-lg lg:text-2xl leading-relaxed max-w-2xl italic border-l-2 border-brand-orange pl-6">
              The Mercedes Sprinter is the world's most popular conversion 
              platform. But how do you fit a kitchen, bed, and shower into 
              6 square meters? Here are the winning layouts.
            </p>
          </div>
        </div>
      </section>

      {/* THREE LAYOUTS SECTION */}
      <section className="py-24 bg-brand-carbon">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            
            {/* THE ADVENTURER */}
            <div className="p-10 border border-brand-border bg-brand-obsidian space-y-6 flex flex-col">
              <div className="flex items-center gap-3">
                <Box className="w-6 h-6 text-brand-orange" />
                <h3 className="font-display text-2xl uppercase text-brand-white">The Adventurer</h3>
              </div>
              <p className="font-sans text-brand-grey text-sm leading-relaxed flex-1">
                A fixed high rear bed with a massive 'garage' underneath for 
                bikes or surfboards. Ideal for LWB models.
              </p>
              <ul className="space-y-2 font-mono text-[10px] uppercase text-brand-grey">
                <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-brand-orange" /> Max Storage</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-brand-orange" /> No bed making needed</li>
              </ul>
            </div>

            {/* THE SOCIAL */}
            <div className="p-10 border border-brand-border bg-brand-obsidian space-y-6 flex flex-col">
              <div className="flex items-center gap-3">
                <Layout className="w-6 h-6 text-brand-orange" />
                <h3 className="font-display text-2xl uppercase text-brand-white">The Social</h3>
              </div>
              <p className="font-sans text-brand-grey text-sm leading-relaxed flex-1">
                A U-shape rear lounge that converts into a king-size bed. 
                Offers a huge internal living space for hosting.
              </p>
              <ul className="space-y-2 font-mono text-[10px] uppercase text-brand-grey">
                <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-brand-orange" /> Open feel</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-brand-orange" /> Flexible seating</li>
              </ul>
            </div>

            {/* THE NOMAD */}
            <div className="p-10 border border-brand-border bg-brand-obsidian space-y-6 flex flex-col">
              <div className="flex items-center gap-3">
                <Zap className="w-6 h-6 text-brand-orange" />
                <h3 className="font-display text-2xl uppercase text-brand-white">The Nomad</h3>
              </div>
              <p className="font-sans text-brand-grey text-sm leading-relaxed flex-1">
                Side-facing flares to allow a width-ways bed, maximizing 
                the central living space for a full shower/toilet.
              </p>
              <ul className="space-y-2 font-mono text-[10px] uppercase text-brand-grey">
                <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-brand-orange" /> Space efficient</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-brand-orange" /> Full wet-room possible</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="container mx-auto px-6 py-32">
        <div className="max-w-4xl mx-auto">
          
          <section className="mb-24">
            <h2 className="font-display text-4xl uppercase tracking-tight text-brand-white mb-8">LWB vs MWB: The Space Game</h2>
            <div className="prose prose-invert max-w-none font-sans text-brand-grey text-lg leading-relaxed space-y-6">
              <p>
                In a **Medium Wheelbase (MWB)** Sprinter, every millimeter counts. 
                You are typically choosing between a shower or a large fixed 
                kitchen. In the **Long Wheelbase (LWB)**, you have enough 
                room for a full 'off-grid' spec with a fixed bed, shower, 
                and full-size fridge.
              </p>
              <div className="bg-brand-carbon p-8 border-l-4 border-brand-orange italic">
                "Tip: If you are over 6ft tall, look at installing fiberglass 
                flares on the rear panels. This allows you to sleep sideways, 
                reclaiming nearly 1 meter of length in your van."
              </div>
            </div>
          </section>

          {/* INTERNAL LINKS */}
          <div className="mt-20 pt-10 border-t border-brand-border/40">
            <h4 className="font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-8">Related layout guides</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/guides/lwb-crafter-conversion-layout" className="p-6 border border-brand-border hover:border-brand-orange transition-colors flex items-center justify-between group">
                <span className="font-display text-xs uppercase text-brand-white">LWB Crafter Layouts</span>
                <ArrowRight className="w-4 h-4 text-brand-orange group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/guides/fixed-bed-vs-u-shape-lounge" className="p-6 border border-brand-border hover:border-brand-orange transition-colors flex items-center justify-between group">
                <span className="font-display text-xs uppercase text-brand-white">Bed vs Lounge Debate</span>
                <ArrowRight className="w-4 h-4 text-brand-orange group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* CTA SECTION */}
      <section className="py-32 bg-brand-orange">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-display text-4xl lg:text-7xl uppercase tracking-tighter text-brand-obsidian mb-8 leading-none">
            PLAN YOUR<br />LAYOUT IN 3D
          </h2>
          <p className="font-sans text-brand-obsidian/80 text-lg mb-12 max-w-2xl mx-auto italic">
            Don't guess. Use the Amplios Build Planner to see exactly how 
            your chosen layout affects your component placement.
          </p>
          <Link href="/planner" className="bg-brand-obsidian text-white px-12 py-6 font-display text-sm uppercase tracking-widest hover:bg-white hover:text-brand-obsidian transition-all">
            Start Build Planner
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
