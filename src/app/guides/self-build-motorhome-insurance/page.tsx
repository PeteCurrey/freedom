import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, ShieldCheck, Zap, Info, ShieldAlert, FileSearch, HeartHandshake } from "lucide-react";

export const metadata: Metadata = {
  title: "Self-Build Motorhome Insurance UK 2026 | The Guide | Amplios",
  description: "How to insure a van conversion in the UK. From 'in-progress' cover to full motorhome policies. The best insurers for self-builds.",
  openGraph: {
    title: "Self-Build Motorhome Insurance UK 2026 | The Guide",
    description: "Protect your investment. The definitive guide to van conversion insurance.",
    url: "https://amplios.co.uk/guides/self-build-motorhome-insurance",
  },
  alternates: { canonical: "https://amplios.co.uk/guides/self-build-motorhome-insurance" },
};

export default function SelfBuildInsuranceGuide() {
  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[50vh] flex items-end pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/cat-power.png" // Placeholder
            alt="Van Insurance"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian via-brand-obsidian/60 to-transparent" />
        </div>
        
        <div className="relative container mx-auto px-6 pb-16 z-10">
          <div className="max-w-4xl">
            <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em] mb-6 block leading-none">
              // PROTECT YOUR BUILD
            </span>
            <h1 className="font-display text-4xl lg:text-7xl uppercase tracking-tighter text-brand-white leading-[0.9] mb-6">
              INSURANCE:<br /><span className="text-brand-orange">SECURE</span><br />JOURNEYS
            </h1>
            <p className="font-sans text-brand-grey text-lg max-w-2xl italic border-l-2 border-brand-orange pl-6">
              Insuring a self-build is different from a standard van or factory 
              motorhome. From agreed value to cover-in-progress, here is how 
              to protect your investment.
            </p>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          
          <section className="mb-24">
            <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-8">The Two-Stage Strategy</h2>
            <div className="prose prose-invert max-w-none font-sans text-brand-grey text-base leading-relaxed space-y-6">
              <p>
                You don't just need insurance when the van is finished. You need it 
                from the day you pick it up. Most builders require two distinct 
                types of cover:
              </p>
              <div className="grid md:grid-cols-2 gap-8 not-prose">
                <div className="p-8 border border-brand-border bg-brand-carbon">
                  <h4 className="font-display text-sm uppercase text-brand-white mb-4">1. Conversion In Progress</h4>
                  <p className="text-[12px] text-brand-grey leading-relaxed">
                    A 90-day to 120-day policy that covers you while you're actually 
                    building. It protects the base vehicle and any components 
                    not yet permanently fixed.
                  </p>
                </div>
                <div className="p-8 border border-brand-border bg-brand-carbon">
                  <h4 className="font-display text-sm uppercase text-brand-white mb-4">2. Full Motorhome Cover</h4>
                  <p className="text-[12px] text-brand-grey leading-relaxed">
                    Once the build is complete (and ideally reclassified), you move 
                    to a specialist policy that covers personal effects, gas 
                    liability, and European travel.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-24">
            <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-8 flex items-center gap-4">
              <FileSearch className="w-6 h-6 text-brand-orange" />
              Agreed Value is Critical
            </h2>
            <div className="font-sans text-brand-grey text-base leading-relaxed space-y-6">
              <p>
                Standard van insurance only covers the "market value" of the base 
                vehicle. If you spend £20,000 on a Victron electrical system and 
                high-end cabinets, you need an **Agreed Value** policy. 
              </p>
              <p>
                This ensures that in the event of a total loss, the insurer pays 
                out the total value of the vehicle PLUS the conversion costs, 
                rather than just the price of a standard panel van.
              </p>
            </div>
          </section>

          <section className="mb-24">
            <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-8">Best UK Insurers for Self-Builds</h2>
            <div className="space-y-4">
              {[
                { name: "Caravan Guard", features: "Agreed value, conversion-in-progress cover, excellent UK claims reputation." },
                { name: "Adrian Flux", features: "The specialists in modified vehicles. Often the best choice for unique or 4x4 builds." },
                { name: "AIB Insurance", features: "Great for high-value conversions and full-time van life residents." },
                { name: "Brentacre", features: "Mod-friendly specialists who understand the difference between a DIY build and a pro conversion." },
              ].map((item) => (
                <div key={item.name} className="flex flex-col md:flex-row justify-between items-center p-6 bg-brand-carbon border border-brand-border gap-6">
                  <div className="flex-1">
                    <h4 className="font-display text-lg text-brand-white mb-1">{item.name}</h4>
                    <p className="font-sans text-brand-grey text-xs">{item.features}</p>
                  </div>
                  <Link href="https://www.caravanguard.co.uk" className="font-mono text-[10px] text-brand-orange uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
                    Get Quote <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              ))}
            </div>
          </section>

          <section className="p-12 bg-brand-carbon border-l-4 border-brand-orange">
            <div className="flex items-center gap-4 mb-6">
              <HeartHandshake className="w-8 h-8 text-brand-orange" />
              <h3 className="font-display text-2xl uppercase tracking-tight text-brand-white leading-none">Amplios Recommendation</h3>
            </div>
            <p className="font-sans text-brand-grey text-base leading-relaxed italic">
              "Don't just go with the cheapest quote on a comparison site. 
              Speak to a human at Caravan Guard or Adrian Flux. Tell them 
              you're building a 'motor caravan' and be honest about the cost 
              of your components. It's the only way to be 100% sure you're covered."
            </p>
          </section>

        </div>
      </div>

      <Footer />
    </main>
  );
}
