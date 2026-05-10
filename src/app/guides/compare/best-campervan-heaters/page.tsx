import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RelatedProducts } from "@/components/editorial/RelatedProducts";
import { ArrowRight, Flame, Zap, ShieldCheck, Banknote, Info, Thermometer, Gauge, Wind } from "lucide-react";

export const metadata: Metadata = {
  title: "Best Campervan Heaters 2024 | Webasto vs Eberspacher vs Propex | Amplios",
  description: "What is the best diesel or gas heater for your van conversion? We compare Webasto, Eberspächer, Propex, and Whale. Noise, power draw, and altitude testing.",
  openGraph: {
    title: "Best Campervan Heaters 2024 | Diesel vs Gas Comparison",
    description: "The definitive guide to off-grid heating. Which brand wins in 2024?",
    url: "https://amplios.co.uk/guides/compare/best-campervan-heaters",
  },
};

const COMPARISON_DATA = [
  {
    brand: "Webasto",
    model: "Air Top 2000 STC",
    fuel: "Diesel",
    pros: ["Altitude Sensing", "UK Support", "Compact"],
    cons: ["Slightly louder pump", "Higher price"],
    price: "£1,145",
    link: "/guides/webasto/air-top-evo-guide"
  },
  {
    brand: "Eberspächer",
    model: "Airtronic S3",
    fuel: "Diesel",
    pros: ["Stepless Control", "Silent Pump", "CAN-bus"],
    cons: ["Complex wiring", "Premium price"],
    price: "£1,245",
    link: "/guides/eberspacher/airtronic-s3-guide"
  },
  {
    brand: "Propex",
    model: "HS2000",
    fuel: "LPG Gas",
    pros: ["Clean Burn", "Low Maintenance", "Silent"],
    cons: ["Gas only", "Manual altitude"],
    price: "£545",
    link: "/guides/propex/hs2000-gas-heating-guide"
  },
  {
    brand: "Whale",
    model: "Heat Air",
    fuel: "LPG / 230V",
    pros: ["Underslung", "Saves Internal Space", "Dual Fuel"],
    cons: ["Chassis mounting", "Gas only burner"],
    price: "£945",
    link: "/guides/whale/heat-air-guide"
  }
];

const MENTIONED_PRODUCTS = [
  { name: "Webasto Air Top 2000 STC", brand: "Webasto", price: 114500, slug: "webasto-air-top-2000-stc-diesel-heater-kit" },
  { name: "Eberspächer Airtronic S3", brand: "Eberspächer", price: 124500, slug: "eberspacher-airtronic-s3-d2l-diesel-heater-kit" },
  { name: "Propex HS2000 Kit", brand: "Propex", price: 54500, slug: "propex-hs2000-gas-heater-kit" },
];

export default function BestHeatersComparison() {
  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-[60vh] flex items-end pt-24 border-b border-brand-border overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/cat-climate.png" // Placeholder
            alt="Best campervan heaters comparison"
            fill
            className="object-cover opacity-20 grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian via-brand-obsidian/40 to-transparent" />
        </div>
        <div className="relative container mx-auto px-6 pb-20 z-10">
          <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em] mb-4 block">
            // BUYING GUIDE 2024
          </span>
          <h1 className="font-display text-5xl lg:text-8xl uppercase tracking-tighter text-brand-white leading-[0.9] mb-8">
            The Heating<br /><span className="text-brand-orange italic">Showdown.</span>
          </h1>
          <p className="font-sans text-brand-grey text-xl max-w-2xl leading-relaxed italic border-l-2 border-brand-orange pl-6">
            Diesel or Gas? Webasto or Eberspächer? We break down the technical data 
            to help you choose the right heat source for your off-grid build.
          </p>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="py-20 border-b border-brand-border">
        <div className="container mx-auto px-6">
          <div className="mb-12 text-center lg:text-left">
            <h2 className="font-display text-3xl uppercase tracking-tight text-white mb-4">Quick Comparison</h2>
            <p className="font-sans text-brand-grey text-sm">Key specs for the top 4 heaters in the UK market.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-brand-border">
                  <th className="text-left py-4 px-6 font-mono text-[10px] text-brand-grey uppercase tracking-widest">Brand / Model</th>
                  <th className="text-left py-4 px-6 font-mono text-[10px] text-brand-grey uppercase tracking-widest">Fuel Source</th>
                  <th className="text-left py-4 px-6 font-mono text-[10px] text-brand-grey uppercase tracking-widest">Key Pros</th>
                  <th className="text-left py-4 px-6 font-mono text-[10px] text-brand-grey uppercase tracking-widest">Est. Price</th>
                  <th className="text-right py-4 px-6"></th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_DATA.map((row) => (
                  <tr key={row.brand} className="border-b border-brand-border hover:bg-brand-carbon/30 transition-colors">
                    <td className="py-6 px-6">
                      <span className="font-display text-white text-lg block">{row.brand}</span>
                      <span className="font-mono text-[10px] text-brand-grey uppercase tracking-widest">{row.model}</span>
                    </td>
                    <td className="py-6 px-6 font-sans text-brand-grey">{row.fuel}</td>
                    <td className="py-6 px-6">
                      <div className="flex flex-wrap gap-2">
                        {row.pros.map(pro => (
                          <span key={pro} className="bg-brand-orange/10 text-brand-orange text-[9px] font-mono px-2 py-1 uppercase tracking-widest rounded-sm border border-brand-orange/20">
                            {pro}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-6 px-6 font-display text-white">{row.price}</td>
                    <td className="py-6 px-6 text-right">
                      <Link href={row.link} className="inline-flex items-center gap-2 text-brand-orange font-mono text-[10px] uppercase tracking-widest hover:gap-3 transition-all">
                        Technical Guide <ArrowRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* THE DEBATE */}
      <section className="py-20 bg-brand-carbon border-b border-brand-border">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Flame className="w-6 h-6 text-brand-orange" />
                <h2 className="font-display text-3xl uppercase tracking-tight text-white">Diesel vs Gas</h2>
              </div>
              <div className="prose prose-invert font-sans text-brand-grey text-lg leading-relaxed space-y-6">
                <p>
                  The first decision is fuel. **Diesel heaters** (Webasto/Eberspächer) 
                  are the favorite for high-mileage travelers because fuel is 
                  available at every gas station and they can tap directly into 
                  the vehicle's main tank.
                </p>
                <p>
                  **Gas heaters** (Propex/Whale) burn cleaner, requiring significantly 
                  less maintenance. They are also quieter and use less electrical 
                  power on startup. If you already have an LPG tank for your kitchen, 
                  gas heating is often the logical choice.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="bg-brand-obsidian p-8 border border-brand-border">
                  <Thermometer className="w-6 h-6 text-brand-orange mb-4" />
                  <h3 className="font-display text-sm uppercase text-white mb-2">Altitude</h3>
                  <p className="font-sans text-xs text-brand-grey leading-relaxed">
                    If you're planning to cross the Alps, choose Webasto. Its automatic 
                    pressure sensing prevents carbon buildup above 1,500m.
                  </p>
               </div>
               <div className="bg-brand-obsidian p-8 border border-brand-border">
                  <Wind className="w-6 h-6 text-brand-orange mb-4" />
                  <h3 className="font-display text-sm uppercase text-white mb-2">Space</h3>
                  <p className="font-sans text-xs text-brand-grey leading-relaxed">
                    For small vans, Whale is unbeatable. Mounting the heater under 
                    the chassis saves an entire cupboard of internal space.
                  </p>
               </div>
               <div className="bg-brand-obsidian p-8 border border-brand-border">
                  <Zap className="w-6 h-6 text-brand-orange mb-4" />
                  <h3 className="font-display text-sm uppercase text-white mb-2">Refinement</h3>
                  <p className="font-sans text-xs text-brand-grey leading-relaxed">
                    Eberspächer's Airtronic S3 is the quietest heater on the market 
                    thanks to its stepless motor and damped fuel pump.
                  </p>
               </div>
               <div className="bg-brand-obsidian p-8 border border-brand-border">
                  <Banknote className="w-6 h-6 text-brand-orange mb-4" />
                  <h3 className="font-display text-sm uppercase text-white mb-2">Value</h3>
                  <p className="font-sans text-xs text-brand-grey leading-relaxed">
                    The Propex HS2000 is the most affordable premium option. Simple, 
                    British-made, and incredibly reliable for weekenders.
                  </p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-brand-obsidian text-center">
        <div className="container mx-auto px-6">
          <h2 className="font-display text-4xl lg:text-6xl uppercase tracking-tighter text-white mb-8">
            Ready to <span className="text-brand-orange">Heat</span> Your Build?
          </h2>
          <p className="font-sans text-brand-grey text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            From professional diesel integration to space-saving underslung gas systems, 
            we stock the entire range of European-made heating solutions.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/store/heating-climate" className="bg-brand-orange text-white px-10 py-5 font-display text-[12px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all font-bold">
              Shop All Heaters
            </Link>
            <Link href="/planner" className="border border-brand-border text-white px-10 py-5 font-display text-[12px] uppercase tracking-widest hover:bg-brand-carbon transition-all font-bold">
              AI Build Planner
            </Link>
          </div>

          <div className="mt-24">
            <RelatedProducts products={MENTIONED_PRODUCTS} />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
