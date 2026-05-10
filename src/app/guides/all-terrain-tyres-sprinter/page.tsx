import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, Mountain, ShieldCheck, Zap, Info, CheckCircle, Gauge, Settings } from "lucide-react";

export const metadata: Metadata = {
  title: "All-Terrain Tyres for Mercedes Sprinter | UK Fitment Guide | Amplios",
  description: "What are the best all-terrain tyres for a Mercedes Sprinter campervan? We look at BFG KO2, Falken Wildpeak, and fitment sizes for W906/W907 models.",
  openGraph: {
    title: "All-Terrain Tyres for Mercedes Sprinter | UK Fitment Guide",
    description: "Upgrade your Sprinter's capability. Sizes, brands, and reality.",
    url: "https://amplios.co.uk/guides/all-terrain-tyres-sprinter",
  },
  alternates: { canonical: "https://amplios.co.uk/guides/all-terrain-tyres-sprinter" },
};

export default function SprinterATGuide() {
  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[50vh] flex items-end pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/sprinter.png" // Placeholder
            alt="Sprinter AT Tyres"
            fill
            className="object-cover opacity-30 grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian via-brand-obsidian/60 to-transparent" />
        </div>
        
        <div className="relative container mx-auto px-6 pb-16 z-10">
          <div className="max-w-4xl">
            <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em] mb-6 block leading-none">
              // SPRINTER MODIFICATION
            </span>
            <h1 className="font-display text-4xl lg:text-7xl uppercase tracking-tighter text-brand-white leading-[0.9] mb-6">
              SPRINTER:<br /><span className="text-brand-orange">OFF-ROAD</span><br />CAPABILITY
            </h1>
            <p className="font-sans text-brand-grey text-lg max-w-2xl italic border-l-2 border-brand-orange pl-6">
              The Mercedes Sprinter is a capable platform, but its factory tyres 
              are designed for the autobahn, not the Highlands. Here is how 
              to upgrade your rubber.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT SECTIONS */}
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          
          <section className="mb-24">
            <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-8">The Recommended Size</h2>
            <div className="prose prose-invert max-w-none font-sans text-brand-grey text-base leading-relaxed space-y-6">
              <p>
                For the standard W906 (2006-2018) and W907 (2018+) Mercedes 
                Sprinter, the sweet spot for all-terrain tyres without needing 
                a suspension lift is **245/75 R16**.
              </p>
              <div className="bg-brand-carbon p-8 border border-brand-border flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1">
                  <h4 className="font-display text-xs uppercase text-brand-white mb-2">Why 245/75 R16?</h4>
                  <p className="text-[11px] leading-relaxed italic">
                    It's slightly taller and wider than the factory 235/65 R16, 
                    filling the wheel arch better and providing more ground 
                    clearance, without causing significant rubbing on the front 
                    liners.
                  </p>
                </div>
                <div className="w-full md:w-32 aspect-square bg-brand-obsidian flex items-center justify-center border border-brand-border">
                  <Settings className="w-8 h-8 text-brand-grey" />
                </div>
              </div>
            </div>
          </section>

          <section className="mb-24">
            <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-10 text-center lg:text-left">The Top 3 Choices</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: "BFGoodrich KO2", focus: "Iconic Look", desc: "The gold standard for durability and off-road aesthetics. Toughest sidewalls in the business." },
                { name: "Falken Wildpeak", focus: "Wet Grip", desc: "Superb on-road performance in UK rain, while still being very capable on mud and grass." },
                { name: "Toyo Open Country", focus: "Value Choice", desc: "A lighter tyre that maintains fuel economy better than the BFG, while offering 3PMSF rating." },
              ].map((item) => (
                <div key={item.name} className="p-8 border border-brand-border bg-brand-carbon/50">
                  <span className="font-mono text-[9px] text-brand-orange uppercase tracking-widest mb-2 block">{item.focus}</span>
                  <h4 className="font-display text-lg uppercase text-brand-white mb-4">{item.name}</h4>
                  <p className="font-sans text-brand-grey text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="p-12 bg-brand-carbon border-l-4 border-brand-orange mb-24">
            <h3 className="font-display text-2xl uppercase tracking-tight text-brand-white mb-4">Speedo Calibration</h3>
            <p className="font-sans text-brand-grey text-sm leading-relaxed mb-6">
              Moving to a 245/75 tyre will make your speedometer more accurate. 
              Factory Sprinters typically over-read by 4-5mph. With the larger 
              tyres, your speedo will likely be within 1-2mph of your true GPS 
              speed.
            </p>
            <div className="flex items-center gap-2 text-brand-orange font-mono text-[10px] uppercase tracking-widest">
              <Info className="w-3 h-3" /> No coding required for 245/75 R16
            </div>
          </section>

          {/* AFFILIATE CTA */}
          <div className="p-10 bg-brand-obsidian border border-brand-border flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex-1">
              <h4 className="font-display text-xl uppercase text-brand-white mb-2">Buy Sprinter AT Tyres</h4>
              <p className="font-sans text-brand-grey text-xs italic">We recommend 4x4Tyres.co.uk for the best UK stock and Sprinter-specific advice.</p>
            </div>
            <Link href="https://www.4x4tyres.co.uk" className="bg-brand-orange text-white px-8 py-4 font-display text-xs uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all flex items-center gap-2">
              View AT Tyres <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}
