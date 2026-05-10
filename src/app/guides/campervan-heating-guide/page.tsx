import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, Flame, Zap, Wind, Gauge, Info, CheckCircle, Thermometer, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Campervan Heating Guide UK | Gas vs Diesel vs Electric | Amplios",
  description: "What is the best way to heat a motorhome? We compare Truma gas heaters, Webasto diesel heaters, and the reality of electric heating for UK builds.",
  openGraph: {
    title: "Campervan Heating Guide UK | Gas vs Diesel vs Electric",
    description: "Stay warm all year round. The ultimate heating comparison.",
    url: "https://amplios.co.uk/guides/campervan-heating-guide",
  },
  alternates: { canonical: "https://amplios.co.uk/guides/campervan-heating-guide" },
};

export default function HeatingGuide() {
  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[60vh] flex items-end pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/cat-climate.png" // Placeholder
            alt="Van Heating"
            fill
            className="object-cover opacity-30 grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian via-brand-obsidian/40 to-transparent" />
        </div>
        
        <div className="relative container mx-auto px-6 pb-20 z-10">
          <div className="max-w-4xl">
            <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em] mb-6 block leading-none">
              // CLIMATE CONTROL
            </span>
            <h1 className="font-display text-5xl lg:text-9xl uppercase tracking-tighter text-brand-white leading-[0.85] mb-8">
              BEAT<br />THE<br /><span className="text-brand-orange">FROST</span>
            </h1>
            <p className="font-sans text-brand-grey text-lg lg:text-2xl leading-relaxed max-w-2xl italic border-l-2 border-brand-orange pl-6">
              A cold van is a miserable van. From reliable diesel forced air 
              to silent gas hydronic systems, we compare every heating option 
              for UK year-round travel.
            </p>
          </div>
        </div>
      </section>

      {/* COMPARISON GRID */}
      <section className="py-24 bg-brand-carbon">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            
            {/* DIESEL */}
            <div className="p-10 border border-brand-border bg-brand-obsidian space-y-6">
              <div className="flex items-center gap-3">
                <Wind className="w-6 h-6 text-brand-orange" />
                <h3 className="font-display text-2xl uppercase text-brand-white">Diesel</h3>
              </div>
              <p className="font-sans text-brand-grey text-sm leading-relaxed">
                Taps directly into your vehicle fuel tank. High heat output, 
                excellent for winter, and fuel is available everywhere.
              </p>
              <ul className="space-y-2 font-mono text-[10px] uppercase text-brand-grey">
                <li className="flex items-center gap-2 text-green-500"><CheckCircle className="w-3 h-3" /> No gas bottles needed</li>
                <li className="flex items-center gap-2 text-green-500"><CheckCircle className="w-3 h-3" /> Massive heat output</li>
                <li className="flex items-center gap-2 text-red-500"><Info className="w-3 h-3" /> Noisy fuel pumps</li>
              </ul>
            </div>

            {/* GAS */}
            <div className="p-10 border border-brand-border bg-brand-obsidian space-y-6">
              <div className="flex items-center gap-3">
                <Flame className="w-6 h-6 text-brand-orange" />
                <h3 className="font-display text-2xl uppercase text-brand-white">Gas (LPG)</h3>
              </div>
              <p className="font-sans text-brand-grey text-sm leading-relaxed">
                Silent operation and very clean burning. Ideal for those with 
                existing LPG systems for cooking.
              </p>
              <ul className="space-y-2 font-mono text-[10px] uppercase text-brand-grey">
                <li className="flex items-center gap-2 text-green-500"><CheckCircle className="w-3 h-3" /> Near silent running</li>
                <li className="flex items-center gap-2 text-green-500"><CheckCircle className="w-3 h-3" /> Very reliable</li>
                <li className="flex items-center gap-2 text-red-500"><Info className="w-3 h-3" /> Refilling abroad can be tricky</li>
              </ul>
            </div>

            {/* ELECTRIC */}
            <div className="p-10 border border-brand-border bg-brand-obsidian space-y-6">
              <div className="flex items-center gap-3">
                <Zap className="w-6 h-6 text-brand-orange" />
                <h3 className="font-display text-2xl uppercase text-brand-white">Electric</h3>
              </div>
              <p className="font-sans text-brand-grey text-sm leading-relaxed">
                Only viable when on 230V mains hookup. Silent and efficient, 
                but drains batteries in minutes if off-grid.
              </p>
              <ul className="space-y-2 font-mono text-[10px] uppercase text-brand-grey">
                <li className="flex items-center gap-2 text-green-500"><CheckCircle className="w-3 h-3" /> Cheap to run on hookup</li>
                <li className="flex items-center gap-2 text-green-500"><CheckCircle className="w-3 h-3" /> Instant heat</li>
                <li className="flex items-center gap-2 text-red-500"><Info className="w-3 h-3" /> Not for off-grid use</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="container mx-auto px-6 py-32">
        <div className="max-w-4xl mx-auto">
          
          <section className="mb-24">
            <h2 className="font-display text-4xl uppercase tracking-tight text-brand-white mb-8">The "Chinese Diesel Heater" Reality</h2>
            <div className="prose prose-invert max-w-none font-sans text-brand-grey text-lg leading-relaxed space-y-6">
              <p>
                Many builders are tempted by the £100 heaters from eBay. While they 
                can work, they lack the safety certifications, UK support, and 
                component quality of **Webasto** or **Eberspächer**.
              </p>
              <div className="bg-brand-carbon p-8 border-l-4 border-brand-orange">
                <h4 className="font-display text-sm uppercase text-brand-white mb-2 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-brand-orange" />
                  Safety First
                </h4>
                <p className="text-xs leading-relaxed">
                  A premium heater includes safety cut-offs for overheating, 
                  flame-out, and voltage drop. When you're sleeping in a small 
                  enclosed space, these safety features aren't 'nice to haves'—they 
                  are essential.
                </p>
              </div>
            </div>
          </section>

          {/* INTERNAL LINKS */}
          <div className="mt-20 pt-10 border-t border-brand-border/40">
            <h4 className="font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-8">System specialist hubs</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/brands/webasto" className="p-6 border border-brand-border hover:border-brand-orange transition-colors flex items-center justify-between group">
                <span className="font-display text-xs uppercase text-brand-white">Webasto Diesel Hub</span>
                <ArrowRight className="w-4 h-4 text-brand-orange group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/brands/truma" className="p-6 border border-brand-border hover:border-brand-orange transition-colors flex items-center justify-between group">
                <span className="font-display text-xs uppercase text-brand-white">Truma Gas Hub</span>
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
