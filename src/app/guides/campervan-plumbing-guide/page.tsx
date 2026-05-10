import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, Droplets, Zap, ShieldCheck, Info, CheckCircle, Gauge, Filter } from "lucide-react";

export const metadata: Metadata = {
  title: "Complete Campervan Plumbing Guide UK | Fresh & Grey Water | Amplios",
  description: "How to design and install a campervan plumbing system. From Whale pumps to underslung tanks and winterization. The definitive UK guide.",
  openGraph: {
    title: "Complete Campervan Plumbing Guide UK | Fresh & Grey Water",
    description: "Off-grid water systems made simple. Pumps, tanks, and filtration.",
    url: "https://amplios.co.uk/guides/campervan-plumbing-guide",
  },
  alternates: { canonical: "https://amplios.co.uk/guides/campervan-plumbing-guide" },
};

export default function PlumbingGuide() {
  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[60vh] flex items-end pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/cat-plumbing.png" // Placeholder
            alt="Van Plumbing System"
            fill
            className="object-cover opacity-30 grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian via-brand-obsidian/40 to-transparent" />
        </div>
        
        <div className="relative container mx-auto px-6 pb-20 z-10">
          <div className="max-w-4xl">
            <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em] mb-6 block leading-none">
              // WATER MANAGEMENT
            </span>
            <h1 className="font-display text-5xl lg:text-9xl uppercase tracking-tighter text-brand-white leading-[0.85] mb-8">
              FLOW<br />STATE:<br /><span className="text-brand-orange">WATER</span>
            </h1>
            <p className="font-sans text-brand-grey text-lg lg:text-2xl leading-relaxed max-w-2xl italic border-l-2 border-brand-orange pl-6">
              Plumbing is the most underrated part of a build. From pressurized 
              showers to simple gravity systems, we reveal the logic of 
              leak-free van life.
            </p>
          </div>
        </div>
      </section>

      {/* SYSTEM TYPES SECTION */}
      <section className="py-24 bg-brand-carbon">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* SUBMERSIBLE */}
            <div className="p-10 border border-brand-border bg-brand-obsidian space-y-6">
              <h3 className="font-display text-2xl uppercase text-brand-white">Submersible Pumps</h3>
              <p className="font-sans text-brand-grey text-sm leading-relaxed">
                The simple choice. The pump sits inside the tank and is triggered 
                by a microswitch in the tap. Perfect for small vans and 
                budget builds.
              </p>
              <ul className="space-y-2 font-mono text-[10px] uppercase text-brand-grey">
                <li className="flex items-center gap-2 text-green-500"><CheckCircle className="w-3 h-3" /> Cheap & Silent</li>
                <li className="flex items-center gap-2 text-red-500"><Info className="w-3 h-3" /> Lower pressure</li>
              </ul>
            </div>

            {/* DIAPHRAGM */}
            <div className="p-10 border border-brand-border bg-brand-obsidian space-y-6">
              <h3 className="font-display text-2xl uppercase text-brand-white">Diaphragm Pumps</h3>
              <p className="font-sans text-brand-grey text-sm leading-relaxed">
                The professional choice. Self-priming pumps (like Whale or Shurflo) 
                maintain a constant pressure in the lines. Ideal for showers 
                and hot water systems.
              </p>
              <ul className="space-y-2 font-mono text-[10px] uppercase text-brand-grey">
                <li className="flex items-center gap-2 text-green-500"><CheckCircle className="w-3 h-3" /> High pressure</li>
                <li className="flex items-center gap-2 text-red-500"><Info className="w-3 h-3" /> Needs an accumulator</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="container mx-auto px-6 py-32">
        <div className="max-w-4xl mx-auto">
          
          <section className="mb-24">
            <h2 className="font-display text-4xl uppercase tracking-tight text-brand-white mb-8">Tank Strategy: In vs Out</h2>
            <div className="prose prose-invert max-w-none font-sans text-brand-grey text-lg leading-relaxed space-y-6">
              <p>
                Should your water tanks be inside the van or underslung beneath the 
                chassis? In the UK, this is a decision about space vs winter 
                capability.
              </p>
              <div className="grid md:grid-cols-2 gap-4 not-prose">
                <div className="p-6 border border-brand-border bg-brand-carbon">
                  <h4 className="font-display text-xs uppercase text-brand-white mb-2">Internal Tanks</h4>
                  <p className="text-[11px] text-brand-grey leading-relaxed">
                    Freeze-proof and easier to install. However, they take up 
                    valuable internal living space.
                  </p>
                </div>
                <div className="p-6 border border-brand-border bg-brand-carbon">
                  <h4 className="font-display text-xs uppercase text-brand-white mb-2">Underslung Tanks</h4>
                  <p className="text-[11px] text-brand-grey leading-relaxed">
                    Maximizes internal space. Requires tank heaters for 
                    winter use to prevent freezing.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-24">
            <h2 className="font-display text-4xl uppercase tracking-tight text-brand-white mb-8">Filtration: Drink Safe</h2>
            <div className="flex gap-8 p-8 border border-brand-border bg-brand-carbon/50">
              <Filter className="w-10 h-10 text-brand-orange flex-shrink-0" />
              <div>
                <h4 className="font-display text-lg uppercase text-brand-white mb-2">UV vs Carbon</h4>
                <p className="text-sm text-brand-grey font-sans leading-relaxed">
                  Don't rely on tank water alone for drinking. We recommend a 
                  two-stage filtration system: a 5-micron carbon filter for 
                  taste and a UV-C LED sterilizer for bacteria removal.
                </p>
              </div>
            </div>
          </section>

          {/* INTERNAL LINKS */}
          <div className="mt-20 pt-10 border-t border-brand-border/40">
            <h4 className="font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-8">Technical Plumbing Hubs</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/brands/whale" className="p-6 border border-brand-border hover:border-brand-orange transition-colors flex items-center justify-between group">
                <span className="font-display text-xs uppercase text-brand-white">Whale Pump Hub</span>
                <ArrowRight className="w-4 h-4 text-brand-orange group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/guides/whale/expanse-water-heater-guide" className="p-6 border border-brand-border hover:border-brand-orange transition-colors flex items-center justify-between group">
                <span className="font-display text-xs uppercase text-brand-white">Water Heating Guide</span>
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
