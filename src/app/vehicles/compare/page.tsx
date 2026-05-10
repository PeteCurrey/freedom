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
  Scale, 
  Zap, 
  ShieldCheck,
  TrendingUp,
  Map,
  Truck
} from "lucide-react";

export const metadata: Metadata = {
  title: "Which Van is Best for a Campervan Conversion UK? (2026 Guide)",
  description: "The definitive head-to-head comparison of Sprinter, Crafter, Transit, Ducato, and Daily. We compare height, payload, and reliability for UK builders.",
  openGraph: {
    title: "Best Van for Campervan Conversion UK | Amplios",
    description: "Eight base vehicles. One honest verdict. Find your perfect foundation.",
    url: "https://amplios.co.uk/vehicles/compare",
  },
  alternates: { canonical: "https://amplios.co.uk/vehicles/compare" },
};

const VERDICT_TABLE = [
  { van: "Mercedes Sprinter", bestFor: "Premium off-grid, 4×4", height: "1,860mm", payload: "1,400kg", price: "£14,000+", score: 9.5, slug: "mercedes-sprinter" },
  { van: "VW Crafter", bestFor: "High-spec touring, max volume", height: "1,961mm", payload: "1,000kg", price: "£16,000+", score: 9.0, slug: "vw-crafter" },
  { van: "MAN TGE", bestFor: "Budget Crafter, fleet support", height: "1,961mm", payload: "1,000kg", price: "£12,000+", score: 8.5, slug: "man-tge" },
  { van: "Fiat Ducato", bestFor: "Budget, transverse bed, width", height: "1,932mm", payload: "1,200kg", price: "£8,000+", score: 8.0, slug: "fiat-ducato" },
  { van: "Ford Transit", bestFor: "Budget-friendly, parts availability", height: "1,840mm", payload: "1,200kg", price: "£8,000+", score: 7.5, slug: "ford-transit" },
  { van: "Iveco Daily", bestFor: "Maximum payload, heavy builds", height: "2,100mm+", payload: "1,750kg", price: "£9,000+", score: 7.5, slug: "iveco-daily" },
  { van: "Renault Master", bestFor: "Budget, broad parts access", height: "1,700mm", payload: "1,000kg", price: "£7,000+", score: 6.5, slug: "renault-master" },
];

export default function MasterComparison() {
  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[70vh] flex items-end pt-24 overflow-hidden border-b border-brand-border">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/sprinter-schematic.png"
            alt="UK Van Comparison"
            fill
            className="object-cover opacity-20 grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian via-brand-obsidian/40 to-transparent" />
          <div className="absolute inset-0 blueprint-grid opacity-10" />
        </div>
        
        <div className="relative container mx-auto px-6 pb-20 z-10">
          <div className="max-w-5xl">
            <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em] mb-6 block leading-none">
              // THE FOUNDATION MATRIX
            </span>
            <h1 className="font-display text-5xl lg:text-9xl uppercase tracking-tighter text-brand-white leading-[0.85] mb-8">
              THE UK VAN<br /><span className="text-brand-orange">COMPARISON</span><br />GUIDE
            </h1>
            <p className="font-sans text-brand-grey text-lg lg:text-2xl leading-relaxed max-w-2xl italic border-l-2 border-brand-orange pl-6">
              Eight base vehicles. One honest verdict. For builders who want to 
              get this decision right before spending a penny on conversion.
            </p>
          </div>
        </div>
      </section>

      {/* QUICK VERDICT TABLE */}
      <section className="py-24 bg-brand-carbon relative">
        <div className="container mx-auto px-6">
          <div className="mb-16">
            <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-4">The Quick Verdict</h2>
            <p className="font-sans text-brand-grey text-sm italic">Direct metrics for LWB High Roof configurations.</p>
          </div>

          <div className="overflow-x-auto -mx-6 px-6">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-brand-border">
                  <th className="text-left py-6 font-mono text-[10px] text-brand-grey uppercase tracking-widest">Base Vehicle</th>
                  <th className="text-left py-6 font-mono text-[10px] text-brand-grey uppercase tracking-widest">Best For</th>
                  <th className="text-left py-6 font-mono text-[10px] text-brand-grey uppercase tracking-widest">Int. Height</th>
                  <th className="text-left py-6 font-mono text-[10px] text-brand-grey uppercase tracking-widest">Payload</th>
                  <th className="text-left py-6 font-mono text-[10px] text-brand-grey uppercase tracking-widest">Used Price</th>
                  <th className="text-right py-6 font-mono text-[10px] text-brand-grey uppercase tracking-widest">Score /10</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/30">
                {VERDICT_TABLE.map((row) => (
                  <tr key={row.van} className="group hover:bg-brand-obsidian/50 transition-colors">
                    <td className="py-6">
                      <Link href={`/vehicles/${row.slug}`} className="font-display text-lg text-brand-white group-hover:text-brand-orange transition-colors">
                        {row.van}
                      </Link>
                    </td>
                    <td className="py-6 font-sans text-brand-grey text-sm">{row.bestFor}</td>
                    <td className="py-6 font-mono text-sm text-brand-white">{row.height}</td>
                    <td className="py-6 font-mono text-sm text-brand-white">{row.payload}</td>
                    <td className="py-6 font-mono text-sm text-brand-white">{row.price}</td>
                    <td className="py-6 text-right">
                      <span className="font-display text-xl text-brand-orange">{row.score.toFixed(1)}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* WHO SHOULD BUY WHAT */}
      <section className="py-32 bg-brand-obsidian">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-4xl uppercase tracking-tight text-brand-white mb-20 text-center italic">Who Should <span className="text-brand-orange">Buy What?</span></h2>
            
            <div className="space-y-16">
              {/* SPRINTER */}
              <div className="blueprint-border p-10 bg-brand-carbon">
                <h3 className="font-display text-2xl uppercase text-brand-white mb-6 flex items-center gap-3">
                  <ShieldCheck className="w-6 h-6 text-brand-orange" />
                  Mercedes Sprinter
                </h3>
                <p className="font-sans text-brand-grey text-lg leading-relaxed">
                  <span className="text-brand-white font-bold">BUY IF:</span> You're building a serious, long-term off-grid setup 
                  and want the best combination of space, payload, parts availability, 
                  reliability, and resale value. The 4×4 variant is the only production 
                  van with genuine off-road capability. Premium builds, full wet rooms, 
                  heavy lithium systems, and serious overlanding all point to the Sprinter.
                </p>
              </div>

              {/* CRAFTER */}
              <div className="blueprint-border p-10 bg-brand-carbon">
                <h3 className="font-display text-2xl uppercase text-brand-white mb-6 flex items-center gap-3">
                  <Truck className="w-6 h-6 text-brand-orange" />
                  VW Crafter
                </h3>
                <p className="font-sans text-brand-grey text-lg leading-relaxed">
                  <span className="text-brand-white font-bold">BUY IF:</span> You want Sprinter-level quality with FWD (which 
                  gives you a lower floor, more interior height, and more cargo volume than 
                  the rear-wheel-drive Sprinter). The L3H3 LWB Super High gives you 
                  16.1m³ — the most volume of any production panel van. If you're a couple 
                  building a full home-on-wheels with no weight constraints, this is the pick.
                </p>
              </div>

              {/* TGE */}
              <div className="blueprint-border p-10 bg-brand-carbon">
                <h3 className="font-display text-2xl uppercase text-brand-white mb-6 flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-brand-orange" />
                  MAN TGE
                </h3>
                <p className="font-sans text-brand-grey text-lg leading-relaxed">
                  <span className="text-brand-white font-bold">BUY IF:</span> You want the VW Crafter but at £5,000-£8,000 less. 
                  It <span className="italic">IS</span> the VW Crafter. Same factory in Poland, same 2.0 TDI engines, same 
                  dimensions. The TGE badge gets less attention on the forecourt so it's 
                  priced more aggressively. MAN's truck service network has longer opening 
                  hours than VW dealers — useful if you drive it hard.
                </p>
              </div>

              {/* DUCATO */}
              <div className="blueprint-border p-10 bg-brand-carbon">
                <h3 className="font-display text-2xl uppercase text-brand-white mb-6 flex items-center gap-3">
                  <Ruler className="w-6 h-6 text-brand-orange" />
                  Fiat Ducato / Peugeot Boxer
                </h3>
                <p className="font-sans text-brand-grey text-lg leading-relaxed">
                  <span className="text-brand-white font-bold">BUY IF:</span> Width is your priority. The Sevel vans are 218cm 
                  wide internally — 3-4cm wider than a Sprinter. That's enough for a 
                  transverse double bed without needing wheel arch extenders. Hugely 
                  popular platform, massive parts availability, cheaper to buy and 
                  insure, and the engines (2.2 Multijet) are simpler to maintain.
                </p>
              </div>

              {/* TRANSIT */}
              <div className="blueprint-border p-10 bg-brand-carbon">
                <h3 className="font-display text-2xl uppercase text-brand-white mb-6 flex items-center gap-3">
                  <Map className="w-6 h-6 text-brand-orange" />
                  Ford Transit
                </h3>
                <p className="font-sans text-brand-grey text-lg leading-relaxed">
                  <span className="text-brand-white font-bold">BUY IF:</span> Budget is tight and you want to get building. 
                  The Transit is the most common van on UK roads — parts are everywhere, 
                  mechanics know them, and you'll find a clean example for £7,000-£10,000. 
                  Not as refined as the German vans, height is more limited, but for a 
                  budget first build it's a solid choice.
                </p>
              </div>

              {/* DAILY */}
              <div className="blueprint-border p-10 bg-brand-carbon">
                <h3 className="font-display text-2xl uppercase text-brand-white mb-6 flex items-center gap-3">
                  <Scale className="w-6 h-6 text-brand-orange" />
                  Iveco Daily
                </h3>
                <p className="font-sans text-brand-grey text-lg leading-relaxed">
                  <span className="text-brand-white font-bold">BUY IF:</span> You're building something heavy. The Daily offers 
                  up to 1,750kg payload — almost double the Crafter. If your build plan 
                  involves substantial water tanks, a heavy generator, a full bathroom, 
                  and extensive cabinetry, the Daily is the only van that gives you the 
                  payload budget to do it properly.
                </p>
              </div>
            </div>

            {/* AVOID SECTION */}
            <div className="mt-20 p-10 border border-red-500/20 bg-red-500/5">
              <h3 className="font-display text-xl uppercase text-red-500 mb-4 flex items-center gap-3">
                <AlertTriangle className="w-6 h-6" />
                Special Mention: Renault Master
              </h3>
              <p className="font-sans text-brand-grey text-sm leading-relaxed">
                <span className="text-brand-white font-bold uppercase">Avoid if:</span> Not a bad van, but narrower than the Ducato, 
                less refined than the German options, and harder to find in good condition 
                at the right price for conversion. Only consider if you find an excellent 
                example at a standout price.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DETAILED COMPARISON SECTIONS */}
      <section className="py-32 bg-brand-carbon border-y border-brand-border/30">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-32">
            
            {/* DIMENSIONS */}
            <div>
              <div className="flex items-center gap-4 mb-10">
                <Ruler className="w-8 h-8 text-brand-orange" />
                <h2 className="font-display text-4xl uppercase tracking-tighter text-brand-white">Internal Dimensions</h2>
              </div>
              <div className="prose prose-invert max-w-none font-sans text-brand-grey text-lg leading-relaxed mb-12">
                <p>
                  For DIY builders, the floor shape matters as much as the length. A flat floor 
                  (found in FWD vans like the Crafter) is significantly easier to build on 
                  than a floor with a driveshaft tunnel (RWD Sprinters).
                </p>
              </div>
              <div className="bg-brand-obsidian p-8 border border-brand-border">
                 <h4 className="font-mono text-[10px] text-brand-orange uppercase tracking-widest mb-6">LWB High Roof Metric Matrix</h4>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div>
                       <span className="block font-mono text-[9px] text-brand-grey uppercase mb-2">Sprinter L3H3</span>
                       <span className="font-display text-xl text-brand-white">4,307mm L</span>
                    </div>
                    <div>
                       <span className="block font-mono text-[9px] text-brand-grey uppercase mb-2">Crafter L3H3</span>
                       <span className="font-display text-xl text-brand-white">4,300mm L</span>
                    </div>
                    <div>
                       <span className="block font-mono text-[9px] text-brand-grey uppercase mb-2">Ducato L3H2</span>
                       <span className="font-display text-xl text-brand-white">3,705mm L</span>
                    </div>
                    <div>
                       <span className="block font-mono text-[9px] text-brand-grey uppercase mb-2">Daily LWB</span>
                       <span className="font-display text-xl text-brand-white">3,540mm L</span>
                    </div>
                 </div>
              </div>
            </div>

            {/* PAYLOAD */}
            <div>
              <div className="flex items-center gap-4 mb-10">
                <Scale className="w-8 h-8 text-brand-orange" />
                <h2 className="font-display text-4xl uppercase tracking-tighter text-brand-white">Payload Reality</h2>
              </div>
              <div className="prose prose-invert max-w-none font-sans text-brand-grey text-lg leading-relaxed">
                <p>
                  Lithium batteries, water tanks, and solid oak cabinetry add up. A 
                  "Heavy" off-grid build can easily consume 800kg of payload.
                </p>
                <div className="grid md:grid-cols-2 gap-8 not-prose mt-12">
                   <div className="p-8 border border-brand-border bg-brand-obsidian">
                      <h4 className="font-display text-sm text-brand-white mb-4">Typical Conversion Weights</h4>
                      <ul className="space-y-4 font-mono text-[10px] text-brand-grey uppercase">
                         <li className="flex justify-between border-b border-brand-border/30 pb-2">
                            <span>Lightweight Weekender</span>
                            <span className="text-brand-orange">200-350kg</span>
                         </li>
                         <li className="flex justify-between border-b border-brand-border/30 pb-2">
                            <span>3-Season Tourer</span>
                            <span className="text-brand-orange">350-550kg</span>
                         </li>
                         <li className="flex justify-between">
                            <span>Full Off-Grid Live-Aboard</span>
                            <span className="text-brand-orange">550-800kg+</span>
                         </li>
                      </ul>
                   </div>
                   <div className="flex flex-col justify-center">
                      <p className="text-sm italic text-brand-grey leading-relaxed">
                        "If your build involves a full wet room and a 400Ah+ battery bank, 
                        you should prioritize a Sprinter or Daily. The Crafter's payload 
                        is tighter once the conversion is complete."
                      </p>
                   </div>
                </div>
              </div>
            </div>

            {/* RELIABILITY */}
            <div>
              <div className="flex items-center gap-4 mb-10">
                <ShieldCheck className="w-8 h-8 text-brand-orange" />
                <h2 className="font-display text-4xl uppercase tracking-tighter text-brand-white">Engine & Reliability</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-12 font-sans text-brand-grey text-sm leading-relaxed">
                 <div className="space-y-4">
                    <h4 className="font-display text-xs text-brand-white uppercase">Mercedes OM654 (2018+)</h4>
                    <p>The gold standard. 300,000+ miles is achievable with basic oil changes. Watch for AdBlue sensor failures on Euro 6 models.</p>
                 </div>
                 <div className="space-y-4">
                    <h4 className="font-display text-xs text-brand-white uppercase">VW 2.0 TDI</h4>
                    <p>Refined and efficient. Cam belt (not chain) needs changing every 4-5 years or 60k miles. Very few major flaws.</p>
                 </div>
                 <div className="space-y-4">
                    <h4 className="font-display text-xs text-brand-white uppercase">Fiat 2.2 Multijet</h4>
                    <p>Simple and proven. Easy for any UK mechanic to work on. Parts are incredibly cheap compared to German rivals.</p>
                 </div>
                 <div className="space-y-4">
                    <h4 className="font-display text-xs text-brand-white uppercase">Ford EcoBlue</h4>
                    <p>Excellent power, but injectors can be sensitive to fuel quality. Regular fuel filter changes are non-negotiable.</p>
                 </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-32 text-center bg-brand-obsidian">
        <div className="container mx-auto px-6">
           <h2 className="font-display text-4xl lg:text-7xl uppercase tracking-tighter text-brand-white mb-12">
              CHOOSE YOUR VAN,<br />START YOUR <span className="text-brand-orange">PLAN.</span>
           </h2>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {VERDICT_TABLE.map((v) => (
                <Link 
                  key={v.slug}
                  href={`/planner?vehicle=${v.slug}`}
                  className="p-6 border border-brand-border bg-brand-carbon hover:border-brand-orange transition-all group"
                >
                  <span className="block font-display text-[10px] text-brand-white uppercase tracking-widest mb-2 group-hover:text-brand-orange">{v.van.split(" ")[1] || v.van}</span>
                  <span className="font-mono text-[8px] text-brand-grey uppercase">Build Planner →</span>
                </Link>
              ))}
           </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
