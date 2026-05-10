import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, Battery, Zap, ShieldCheck, Info, CheckCircle, Gauge, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Best Portable Power Stations for Van Life UK 2026 | Amplios",
  description: "EcoFlow vs Jackery vs Bluetti. We compare the best portable power stations for campervan conversions and explain when they beat a hardwired system.",
  openGraph: {
    title: "Best Portable Power Stations for Van Life UK 2026",
    description: "Plug and play power. The ultimate buyer's guide to solar generators.",
    url: "https://amplios.co.uk/guides/best-portable-power-station",
  },
  alternates: { canonical: "https://amplios.co.uk/guides/best-portable-power-station" },
};

export default function PowerStationGuide() {
  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[50vh] flex items-end pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/cat-power.png" // Placeholder
            alt="Portable Power Stations"
            fill
            className="object-cover opacity-30 grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian via-brand-obsidian/60 to-transparent" />
        </div>
        
        <div className="relative container mx-auto px-6 pb-16 z-10">
          <div className="max-w-4xl">
            <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em] mb-4 block leading-none">
              // PLUG & PLAY OFF-GRID
            </span>
            <h1 className="font-display text-4xl lg:text-7xl uppercase tracking-tighter text-brand-white leading-[0.9] mb-6">
              PORTABLE<br /><span className="text-brand-orange">POWER</span><br />STATIONS
            </h1>
            <p className="font-sans text-brand-grey text-lg max-w-2xl italic border-l-2 border-brand-orange pl-6">
              Not everyone wants to wire a complex 12V system. Portable power 
              stations offer instant, safe, off-grid power for your laptop, 
              fridge, and lights.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT SECTIONS */}
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          
          <section className="mb-24">
            <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-8">Portable vs Hardwired (Victron)</h2>
            <div className="prose prose-invert max-w-none font-sans text-brand-grey text-base leading-relaxed space-y-6">
              <p>
                A hardwired Victron system is the gold standard for full-time van life, 
                but it requires significant time, skill, and money to install safely. 
                A portable power station (often called a 'solar generator') combines 
                the lithium battery, inverter, and solar controller into one box.
              </p>
              <div className="grid md:grid-cols-2 gap-4 not-prose mt-8">
                <div className="p-6 border border-brand-border bg-brand-carbon">
                  <h4 className="font-display text-sm uppercase text-brand-orange mb-2">The Portable Win</h4>
                  <ul className="space-y-2 font-mono text-[10px] uppercase text-brand-grey">
                    <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-500" /> Zero installation required</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-500" /> Can be used outside the van</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-500" /> Easily transferable to next van</li>
                  </ul>
                </div>
                <div className="p-6 border border-brand-border bg-brand-carbon">
                  <h4 className="font-display text-sm uppercase text-brand-white mb-2">The Hardwired Win</h4>
                  <ul className="space-y-2 font-mono text-[10px] uppercase text-brand-grey">
                    <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-brand-orange" /> Seamless integration (hidden)</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-brand-orange" /> Massive alternator charging</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-brand-orange" /> Ultimate capacity expansion</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-24">
            <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-10 text-center lg:text-left">The Big Three Ranked</h2>
            <div className="space-y-8">
              
              {/* ECOFLOW */}
              <div className="p-8 border border-brand-border bg-brand-obsidian space-y-4 relative overflow-hidden">
                <div className="absolute top-4 right-4 bg-brand-orange text-brand-obsidian font-display text-[10px] uppercase tracking-widest px-3 py-1">Editor's Pick</div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-display text-2xl uppercase text-brand-white">EcoFlow Delta 2 Max</h3>
                    <span className="font-mono text-[10px] text-brand-grey uppercase tracking-widest">2048Wh | LiFePO4</span>
                  </div>
                </div>
                <p className="font-sans text-brand-grey text-sm leading-relaxed">
                  The reigning champion for van life. With a massive 2kWh LiFePO4 battery, 
                  industry-leading fast charging (0-80% in 50 mins), and enough inverter 
                  output to run a microwave or induction hob.
                </p>
                <div className="pt-4 border-t border-brand-border flex justify-end">
                  <Link href="https://www.ecoflow.com/uk" className="text-brand-orange font-mono text-[10px] uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
                    View on EcoFlow <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>

              {/* JACKERY */}
              <div className="p-8 border border-brand-border bg-brand-obsidian space-y-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-display text-2xl uppercase text-brand-white">Jackery Explorer 1000 Plus</h3>
                    <span className="font-mono text-[10px] text-brand-grey uppercase tracking-widest">1264Wh | LiFePO4</span>
                  </div>
                </div>
                <p className="font-sans text-brand-grey text-sm leading-relaxed">
                  The most rugged option. Jackery recently updated their lineup to the 
                  safer LiFePO4 chemistry. It's incredibly reliable, user-friendly, and 
                  perfect for weekend warriors running a fridge and laptops.
                </p>
                <div className="pt-4 border-t border-brand-border flex justify-end">
                  <Link href="https://uk.jackery.com" className="text-brand-orange font-mono text-[10px] uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
                    View on Jackery <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>

              {/* BLUETTI */}
              <div className="p-8 border border-brand-border bg-brand-obsidian space-y-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-display text-2xl uppercase text-brand-white">Bluetti AC200MAX</h3>
                    <span className="font-mono text-[10px] text-brand-grey uppercase tracking-widest">2048Wh | LiFePO4</span>
                  </div>
                </div>
                <p className="font-sans text-brand-grey text-sm leading-relaxed">
                  The value king. Offers similar specs to the EcoFlow but often at a 
                  lower price point. Excellent expandable battery options, making it 
                  ideal for those who want to start small and grow their system later.
                </p>
                <div className="pt-4 border-t border-brand-border flex justify-end">
                  <Link href="https://bluettipower.co.uk" className="text-brand-orange font-mono text-[10px] uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
                    View on Bluetti <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>

            </div>
          </section>

          <section className="p-12 bg-brand-carbon border-l-4 border-brand-orange mb-24">
            <h3 className="font-display text-2xl uppercase tracking-tight text-brand-white mb-4">The LiFePO4 Warning</h3>
            <p className="font-sans text-brand-grey text-sm leading-relaxed">
              If you buy a portable power station second-hand (or an older model on clearance), 
              check the battery chemistry. Older models use Lithium-Ion (NMC) batteries, 
              which degrade after 500 charge cycles. You absolutely must buy a unit with 
              **LiFePO4** (Lithium Iron Phosphate) chemistry, which lasts for 3,000+ cycles.
            </p>
          </section>

        </div>
      </div>

      <Footer />
    </main>
  );
}
