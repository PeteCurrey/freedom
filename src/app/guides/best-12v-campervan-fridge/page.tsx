import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, ThermometerSnowflake, Zap, ShieldCheck, Info, CheckCircle, Wallet, Battery } from "lucide-react";

export const metadata: Metadata = {
  title: "Best 12V Campervan Fridges UK 2026 | Compressor vs 3-Way | Amplios",
  description: "Dometic vs Alpicool vs Vitrifrigo. We review the best 12V compressor fridges for van conversions, comparing power draw, noise, and value for money.",
  openGraph: {
    title: "Best 12V Campervan Fridges UK 2026 | Compressor vs 3-Way",
    description: "Keep your food cold off-grid. The ultimate 12V fridge guide.",
    url: "https://amplios.co.uk/guides/best-12v-campervan-fridge",
  },
  alternates: { canonical: "https://amplios.co.uk/guides/best-12v-campervan-fridge" },
};

export default function FridgeGuide() {
  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[50vh] flex items-end pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/cat-kitchen.png" // Placeholder
            alt="12V Campervan Fridges"
            fill
            className="object-cover opacity-30 grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian via-brand-obsidian/60 to-transparent" />
        </div>
        
        <div className="relative container mx-auto px-6 pb-16 z-10">
          <div className="max-w-4xl">
            <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em] mb-4 block leading-none">
              // OFF-GRID COOLING
            </span>
            <h1 className="font-display text-4xl lg:text-7xl uppercase tracking-tighter text-brand-white leading-[0.9] mb-6">
              THE<br /><span className="text-brand-orange">12V FRIDGE</span><br />VERDICT
            </h1>
            <p className="font-sans text-brand-grey text-lg max-w-2xl italic border-l-2 border-brand-orange pl-6">
              Your fridge is the only appliance that runs 24/7. It defines your 
              battery capacity and solar requirements. Here is how to choose 
              the right one for your budget.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT SECTIONS */}
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          
          <section className="mb-24">
            <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-8">Compressor vs 3-Way (Absorption)</h2>
            <div className="prose prose-invert max-w-none font-sans text-brand-grey text-base leading-relaxed space-y-6">
              <p>
                Historically, campervans used '3-Way' fridges that ran on gas when 
                parked, 12V when driving, and 230V on hookup. Today, with the 
                drop in price of lithium batteries and solar, **12V Compressor 
                Fridges** are the undisputed king of modern van conversions.
              </p>
              <div className="grid md:grid-cols-2 gap-4 not-prose mt-8">
                <div className="p-6 border border-brand-border bg-brand-carbon">
                  <h4 className="font-display text-sm uppercase text-brand-orange mb-2 flex items-center gap-2">
                    <Zap className="w-4 h-4" /> Why 12V Compressor?
                  </h4>
                  <ul className="space-y-2 font-mono text-[10px] uppercase text-brand-grey">
                    <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-500" /> Gets cold much faster</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-500" /> Works on steep hills</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-500" /> No gas flues required</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-24">
            <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-10 text-center lg:text-left">The Best 12V Fridges of 2026</h2>
            <div className="space-y-8">
              
              {/* DOMETIC CRX */}
              <div className="p-8 border border-brand-border bg-brand-obsidian space-y-4 relative overflow-hidden">
                <div className="absolute top-4 right-4 bg-brand-orange text-brand-obsidian font-display text-[10px] uppercase tracking-widest px-3 py-1">The Premium Standard</div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-display text-2xl uppercase text-brand-white">Dometic CRX50</h3>
                    <span className="font-mono text-[10px] text-brand-grey uppercase tracking-widest">Front-Loading | 45 Litres</span>
                  </div>
                </div>
                <p className="font-sans text-brand-grey text-sm leading-relaxed">
                  The industry standard for professional builders. Incredibly quiet, 
                  highly efficient, and features a removable freezer compartment. 
                  It's expensive, but it's the benchmark for a reason.
                </p>
                <div className="pt-4 border-t border-brand-border flex justify-end">
                  <Link href="/store/kitchen/fridges" className="text-brand-orange font-mono text-[10px] uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
                    View in Store <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>

              {/* ALPICOOL */}
              <div className="p-8 border border-brand-border bg-brand-obsidian space-y-4 relative overflow-hidden">
                <div className="absolute top-4 right-4 bg-brand-carbon text-brand-white font-display text-[10px] uppercase tracking-widest border border-brand-border px-3 py-1">The Value King</div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-display text-2xl uppercase text-brand-white">Alpicool C20 / CR50</h3>
                    <span className="font-mono text-[10px] text-brand-grey uppercase tracking-widest">Top-Loading / Front-Loading</span>
                  </div>
                </div>
                <p className="font-sans text-brand-grey text-sm leading-relaxed">
                  The disruptor. Alpicool offers compressor fridges at less than half 
                  the price of Dometic. They are slightly louder and draw marginally 
                  more power, but for DIY builders on a budget, they are unbeatable.
                </p>
                <div className="pt-4 border-t border-brand-border flex justify-end">
                  <Link href="/brands/alpicool" className="text-brand-orange font-mono text-[10px] uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
                    Alpicool Hub <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>

              {/* VITRIFRIGO */}
              <div className="p-8 border border-brand-border bg-brand-obsidian space-y-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-display text-2xl uppercase text-brand-white">Vitrifrigo C51i</h3>
                    <span className="font-mono text-[10px] text-brand-grey uppercase tracking-widest">Front-Loading | 51 Litres</span>
                  </div>
                </div>
                <p className="font-sans text-brand-grey text-sm leading-relaxed">
                  The Italian rival to Dometic. Uses the identical high-end Secop 
                  compressor. Often slightly cheaper than Dometic and features a very 
                  secure positive-lock door catch mechanism.
                </p>
              </div>

            </div>
          </section>

          <section className="p-12 bg-brand-carbon border-l-4 border-brand-orange mb-24">
            <h3 className="font-display text-2xl uppercase tracking-tight text-brand-white mb-4 flex items-center gap-3">
              <Battery className="w-6 h-6 text-brand-orange" />
              Power Draw Reality
            </h3>
            <p className="font-sans text-brand-grey text-sm leading-relaxed">
              A modern 50L compressor fridge will draw roughly **35 to 45 Amp-hours (Ah) per day** 
              in a UK summer. To run this off-grid indefinitely without driving, you need 
              a minimum of a 100Ah Lithium battery and 200W of solar on the roof.
            </p>
          </section>

          {/* INTERNAL LINKS */}
          <div className="mt-20 pt-10 border-t border-brand-border/40">
            <h4 className="font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-8">Related resources</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/guides/campervan-electrical-guide" className="p-6 border border-brand-border hover:border-brand-orange transition-colors flex items-center justify-between group">
                <span className="font-display text-xs uppercase text-brand-white">Electrical Guide</span>
                <ArrowRight className="w-4 h-4 text-brand-orange group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/brands/alpicool" className="p-6 border border-brand-border hover:border-brand-orange transition-colors flex items-center justify-between group">
                <span className="font-display text-xs uppercase text-brand-white">Alpicool Reviews</span>
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
