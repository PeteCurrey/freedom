import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, Banknote, Zap, ShieldCheck, Info, Gauge, Wallet, Briefcase } from "lucide-react";

export const metadata: Metadata = {
  title: "Campervan Conversion Cost UK 2026 | The Full Breakdown | Amplios",
  description: "How much does a van conversion really cost? We break down base vehicle prices, component costs, and professional vs DIY labour budgets.",
  openGraph: {
    title: "Campervan Conversion Cost UK 2026 | The Full Breakdown",
    description: "The honest truth about campervan budgets. No hidden costs.",
    url: "https://amplios.co.uk/guides/van-conversion-cost-guide",
  },
  alternates: { canonical: "https://amplios.co.uk/guides/van-conversion-cost-guide" },
};

export default function VanConversionCostGuide() {
  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[60vh] flex items-end pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/cat-power.png" // Placeholder
            alt="Van Conversion Costs"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian via-brand-obsidian/40 to-transparent" />
        </div>
        
        <div className="relative container mx-auto px-6 pb-20 z-10">
          <div className="max-w-4xl">
            <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em] mb-6 block leading-none">
              // THE REALITY CHECK
            </span>
            <h1 className="font-display text-5xl lg:text-9xl uppercase tracking-tighter text-brand-white leading-[0.85] mb-8">
              THE COST<br />OF<br /><span className="text-brand-orange">FREEDOM</span>
            </h1>
            <p className="font-sans text-brand-grey text-lg lg:text-2xl leading-relaxed max-w-2xl italic border-l-2 border-brand-orange pl-6">
              What does it actually cost to convert a van in the UK in 2026? 
              From the base vehicle to the last rivet, we reveal the numbers 
              the influencers don't talk about.
            </p>
          </div>
        </div>
      </section>

      {/* SUMMARY GRID */}
      <section className="py-20 bg-brand-carbon">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-4 gap-8">
            {[
              { label: "The 'Budget' Build", range: "£5k - £12k", desc: "Basic electricals, manual water, portable fridge." },
              { label: "The 'Spec' Build", range: "£15k - £30k", desc: "Full Victron, heating, wet room, professional furniture." },
              { label: "The 'High-End'", range: "£40k - £70k+", desc: "Off-grid lithium, Starlink, AC, custom leather, 4x4 mods." },
              { label: "Pro Conversion", range: "+ £25k - £50k", desc: "Estimated labour cost on top of component budget." },
            ].map((tier) => (
              <div key={tier.label} className="p-8 border border-brand-border bg-brand-obsidian flex flex-col justify-between">
                <div>
                  <span className="font-mono text-[9px] text-brand-orange uppercase tracking-widest mb-2 block">{tier.label}</span>
                  <h3 className="font-display text-2xl text-brand-white mb-4">{tier.range}</h3>
                </div>
                <p className="font-sans text-brand-grey text-xs leading-relaxed italic">{tier.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            
            <section className="mb-24">
              <h2 className="font-display text-4xl uppercase tracking-tight text-brand-white mb-8">Base Vehicle Costs</h2>
              <div className="prose prose-invert max-w-none font-sans text-brand-grey text-lg leading-relaxed space-y-6">
                <p>
                  Before you even buy a component, you have the base vehicle. In 2026, 
                  the UK used van market remains competitive. A clean, 5-year-old 
                  Sprinter or Crafter with reasonable mileage will set you back 
                  **£18,000 - £24,000 + VAT**.
                </p>
                <p>
                  Older vehicles can be found for under £10k, but beware of 
                  mechanical debt. Spending an extra £5k on a better base vehicle 
                  often saves £10k in maintenance over the first three years 
                  of van life.
                </p>
              </div>
            </section>

            <section className="mb-24">
              <h2 className="font-display text-4xl uppercase tracking-tight text-brand-white mb-8">System Breakdown</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {[
                  { icon: Zap, title: "Electrical & Solar", cost: "£2,500 - £8,000", detail: "Victron systems, Lithium batteries, and high-wattage solar arrays." },
                  { icon: Briefcase, title: "Heating & Climate", cost: "£1,200 - £4,500", detail: "Diesel or Gas air heating, hot water systems, and MaxxAir vents." },
                  { icon: Wallet, title: "Insulation & Lining", cost: "£800 - £1,800", detail: "Dodo Mat deadening, thermal liners, and ply/carpet lining kits." },
                  { icon: Briefcase, title: "Kitchen & Water", cost: "£1,500 - £4,000", detail: "Compressor fridges, tanks, pumps, and custom cabinetry." },
                ].map((item) => (
                  <div key={item.title} className="p-8 border border-brand-border bg-brand-carbon">
                    <div className="flex items-center gap-4 mb-4">
                      <item.icon className="w-6 h-6 text-brand-orange" />
                      <h4 className="font-display text-lg uppercase text-brand-white">{item.title}</h4>
                    </div>
                    <div className="text-brand-orange font-mono text-xl mb-3">{item.cost}</div>
                    <p className="font-sans text-brand-grey text-xs leading-relaxed">{item.detail}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-24 p-12 bg-brand-orange text-brand-obsidian">
              <h3 className="font-display text-3xl uppercase tracking-tighter mb-6">The Hidden Costs</h3>
              <ul className="grid md:grid-cols-2 gap-6 font-mono text-[11px] uppercase tracking-wider">
                <li className="flex items-center gap-3"><Info className="w-4 h-4" /> Tools (Roller, Drill, Jigsaw): £500+</li>
                <li className="flex items-center gap-3"><Info className="w-4 h-4" /> Insurance during build: £400+</li>
                <li className="flex items-center gap-3"><Info className="w-4 h-4" /> Gas Safe Certification: £150+</li>
                <li className="flex items-center gap-3"><Info className="w-4 h-4" /> Weighbridge Fees: £25</li>
              </ul>
            </section>

          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-32 bg-brand-carbon border-t border-brand-border">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-display text-4xl lg:text-7xl uppercase tracking-tighter text-brand-white mb-8 leading-none">
            GET YOUR<br /><span className="text-brand-orange">EXACT</span> BUDGET
          </h2>
          <p className="font-sans text-brand-grey text-lg mb-12 max-w-2xl mx-auto italic">
            Don't guess. Use the Amplios Build Planner to generate a 
            fully itemized component list and total budget based on 
            live store pricing.
          </p>
          <Link href="/planner" className="inline-flex items-center gap-4 bg-brand-orange text-white px-12 py-6 font-display text-sm uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all">
            Start Your Budget <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
