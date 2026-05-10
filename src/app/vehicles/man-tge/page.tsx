import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { 
  CheckCircle, 
  Info, 
  AlertTriangle, 
  ArrowRight, 
  Ruler, 
  Truck, 
  ShieldCheck,
  TrendingUp,
  Settings
} from "lucide-react";

export const metadata: Metadata = {
  title: "MAN TGE Campervan Conversion: The Complete UK Guide 2026",
  description: "The MAN TGE is the same van as the VW Crafter, but often thousands cheaper. We explain the connection, parts, and why it's the ultimate bargain for UK builders.",
  openGraph: {
    title: "MAN TGE Conversion Guide | The Hidden Bargain | Amplios",
    description: "Built in the same factory, same engines, better price. Is the TGE the best base for your build?",
    url: "https://amplios.co.uk/vehicles/man-tge",
  },
};

export default function ManTgeProfile() {
  return (
    <main className="bg-brand-obsidian min-h-screen text-brand-white">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[70vh] flex items-end pt-24 overflow-hidden border-b border-brand-border">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/man-tge.png"
            alt="MAN TGE Campervan"
            fill
            className="object-cover opacity-20 grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian via-brand-obsidian/60 to-transparent" />
        </div>
        
        <div className="relative container mx-auto px-6 pb-20 z-10">
          <div className="max-w-4xl">
            <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em] mb-6 block leading-none">
              // THE HIDDEN BARGAIN
            </span>
            <h1 className="font-display text-5xl lg:text-9xl uppercase tracking-tighter leading-[0.85] mb-8">
              THE MAN<br /><span className="text-brand-orange italic">TGE</span> HUB
            </h1>
            <p className="font-sans text-brand-grey text-lg lg:text-2xl leading-relaxed max-w-2xl italic border-l-2 border-brand-orange pl-6">
              Identical to the VW Crafter. Same factory. Same engines. 
              Consistently thousands of pounds cheaper on the used market.
            </p>
          </div>
        </div>
      </section>

      {/* THE ELEPHANT IN THE ROOM */}
      <section className="py-24 bg-brand-carbon">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="blueprint-border p-12 bg-brand-obsidian relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 rounded-full -translate-y-1/2 translate-x-1/2" />
               <h2 className="font-display text-3xl uppercase text-white mb-8">The Elephant in the Room</h2>
               <div className="prose prose-invert max-w-none font-sans text-brand-grey text-lg leading-relaxed space-y-6">
                  <p>
                    The MAN TGE is <span className="text-brand-white font-bold">literally a VW Crafter</span>. 
                    Built in the same factory in Poland. Same 2.0 TDI engine range. Same dimensions. 
                    MAN is owned by Volkswagen Group — they acquired a controlling stake in 2012.
                  </p>
                  <p>
                    The TGE badge gets less attention on the forecourt so it's priced more aggressively. 
                    On the used market, a 3-year-old TGE will typically be <span className="text-brand-orange font-bold">£3,000–£6,000 cheaper</span> than 
                    an equivalent Crafter.
                  </p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT'S IDENTICAL VS DIFFERENT */}
      <section className="py-24 border-b border-brand-border">
        <div className="container mx-auto px-6">
           <div className="grid lg:grid-cols-2 gap-20">
              <div>
                 <h2 className="font-display text-2xl uppercase text-white mb-10 flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-brand-orange" />
                    What's Identical
                 </h2>
                 <ul className="space-y-6">
                    {[
                      { t: "Engines", d: "Same 2.0 TDI (102/115/150/177hp) units." },
                      { t: "Dimensions", d: "Internal cargo length and height are millimetre-perfect matches." },
                      { t: "Drivetrain", d: "FWD standard, 4×4 available (identicial to 4Motion)." },
                      { t: "Parts", d: "Windows, vents, and accessories designed for Crafter all work on TGE." }
                    ].map(item => (
                      <li key={item.t} className="border-l border-brand-border pl-6">
                         <span className="block font-mono text-[10px] text-brand-orange uppercase mb-1">{item.t}</span>
                         <span className="font-sans text-brand-grey text-sm">{item.d}</span>
                      </li>
                    ))}
                 </ul>
              </div>
              <div>
                 <h2 className="font-display text-2xl uppercase text-white mb-10 flex items-center gap-3">
                    <Settings className="w-6 h-6 text-brand-grey" />
                    What's Actually Different
                 </h2>
                 <ul className="space-y-6">
                    {[
                      { t: "The Grille", d: "Industrial, aggressive front-end styling with the MAN lion." },
                      { t: "The Badge", d: "VW roundel replaced by the MAN Truck & Bus logo." },
                      { t: "Dealer Network", d: "Truck-focused service network with 24/7 or late opening hours." },
                      { t: "Price Point", d: "Consistently lower entry price for identical engineering." }
                    ].map(item => (
                      <li key={item.t} className="border-l border-brand-border pl-6">
                         <span className="block font-mono text-[10px] text-brand-grey uppercase mb-1">{item.t}</span>
                         <span className="font-sans text-brand-grey text-sm">{item.d}</span>
                      </li>
                    ))}
                 </ul>
              </div>
           </div>
        </div>
      </section>

      {/* SERVICE NETWORK ADVANTAGE */}
      <section className="py-24 bg-brand-carbon">
        <div className="container mx-auto px-6">
           <div className="max-w-4xl mx-auto text-center">
              <ShieldCheck className="w-12 h-12 text-brand-orange mx-auto mb-8" />
              <h2 className="font-display text-4xl uppercase mb-8 italic text-brand-white tracking-tighter">The Truck Network Advantage</h2>
              <p className="font-sans text-brand-grey text-lg leading-relaxed mb-12 italic border-l-4 border-brand-orange pl-8 text-left">
                "MAN's business is trucks. Their workshops are designed for professionals who can't 
                afford downtime. For a full-time vanlifer, having a service network open until 8pm 
                (or 24 hours in some cities) is a massive practical benefit."
              </p>
           </div>
        </div>
      </section>

      {/* COMPATIBLE PRODUCTS */}
      <section className="py-24">
        <div className="container mx-auto px-6">
           <div className="mb-16">
              <h2 className="font-display text-2xl uppercase text-brand-white">Crafter & TGE Gear</h2>
              <p className="font-sans text-brand-grey text-sm italic mt-2">All products below are verified to fit the TGE perfectly.</p>
           </div>
           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { n: "Dometic S4 Windows", b: "Dometic", s: "Side Cutout Optimized" },
                { n: "MaxxFan Deluxe", b: "MaxxAir", s: "400x400mm Standard Fit" },
                { n: "Victron MultiPlus-II", b: "Victron", s: "System Foundation" },
                { n: "Truma Combi 4E", b: "Truma", s: "Underslung Ready" }
              ].map(p => (
                <div key={p.n} className="blueprint-border p-8 bg-brand-carbon group hover:border-brand-orange transition-all">
                   <h4 className="font-display text-lg text-brand-white group-hover:text-brand-orange transition-colors">{p.n}</h4>
                   <span className="block font-mono text-[8px] text-brand-grey uppercase mt-2">{p.b}</span>
                   <p className="font-sans text-xs text-brand-grey mt-4">{p.s}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-brand-obsidian border-t border-brand-border">
         <div className="container mx-auto px-6 text-center">
            <h2 className="font-display text-4xl uppercase mb-12 italic text-brand-white tracking-tighter">Ready to Build Your <span className="text-brand-orange">Hidden Bargain?</span></h2>
            <div className="flex flex-wrap justify-center gap-6">
               <Link href="/planner?vehicle=man-tge" className="px-10 py-5 bg-brand-orange text-white font-display text-xs uppercase tracking-widest hover:scale-105 transition-transform italic font-bold">
                  Start TGE Build Plan →
               </Link>
               <Link href="/vehicles/compare/man-tge-vs-vw-crafter" className="px-10 py-5 border border-brand-border text-white font-display text-xs uppercase tracking-widest hover:bg-brand-carbon transition-all italic font-bold">
                  View Crafter Showdown →
               </Link>
            </div>
         </div>
      </section>

      <Footer />
    </main>
  );
}
