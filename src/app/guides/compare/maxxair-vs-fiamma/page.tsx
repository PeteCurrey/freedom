import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RelatedProducts } from "@/components/editorial/RelatedProducts";
import { MaxxairSidebar } from "@/components/editorial/MaxxairSidebar";
import { ArrowRight, CheckCircle, XCircle, Wind, Thermometer, Info } from "lucide-react";

export const metadata: Metadata = {
  title: "MaxxAir vs Fiamma | Best Campervan Roof Fans UK | Amplios",
  description: "MaxxFan Deluxe vs Fiamma Turbo Vent. Our head-to-head comparison of the two leading campervan ventilation systems for UK builds.",
  openGraph: {
    title: "MaxxAir vs Fiamma | Best Campervan Roof Fans UK",
    description: "Rain-proof vs Classic. Which roof fan should you choose?",
    url: "https://amplios.co.uk/guides/compare/maxxair-vs-fiamma",
  },
  alternates: { canonical: "https://amplios.co.uk/guides/compare/maxxair-vs-fiamma" },
};

const TOC = [
  { id: "intro", label: "The Ventilation Battle" },
  { id: "rain", label: "The Rain Factor" },
  { id: "performance", label: "Speeds & Airflow" },
  { id: "size", label: "Installation & Depth" },
  { id: "price", label: "Price vs Value" },
  { id: "verdict", label: "The Winner" },
];

const MENTIONED_PRODUCTS = [
  { name: "MaxxFan Deluxe", brand: "MaxxAir", price: 34500, slug: "maxxair-maxxfan-deluxe-roof-fan-tinted" },
  { name: "Fiamma Turbo Vent", brand: "Fiamma", price: 18500, slug: "fiamma-turbo-vent-40-premium-crystal" },
  { name: "Fiamma Vent 40", brand: "Fiamma", price: 6500, slug: "fiamma-vent-40-roof-light-white" },
];

export default function MaxxairVsFiammaCompare() {
  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[45vh] flex items-end pt-24 bg-brand-carbon border-b border-brand-border overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />
        <div className="relative container mx-auto px-6 pb-16 z-10">
          <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em] mb-4 block">
            // HEAD-TO-HEAD COMPARISON
          </span>
          <h1 className="font-display text-4xl lg:text-7xl uppercase tracking-tighter text-brand-white leading-[1] mb-4">
            MaxxAir vs Fiamma
          </h1>
          <p className="font-sans text-brand-grey text-lg max-w-2xl italic border-l-2 border-brand-orange pl-6">
            MaxxFan Deluxe or Fiamma Turbo Vent? The two heavyweights of van ventilation go head-to-head.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16">
        <div className="flex gap-16">
          <div className="flex-1 min-w-0">
            
            {/* INTRO */}
            <section id="intro" className="mb-20 scroll-mt-28">
              <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white mb-6">
                Why Ventilation Matters
              </h2>
              <div className="prose prose-invert max-w-none font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  A roof fan isn't just about staying cool in summer. In a UK campervan, its primary job is 
                  **moisture management**. Without active airflow, cooking, breathing, and drying wet gear 
                  will lead to condensation, mould, and eventually rust.
                </p>
                <p>
                  The two choices that dominate the market are the **MaxxFan Deluxe** and the **Fiamma Turbo Vent**. 
                  One is an all-weather powerhouse, the other is a value-driven classic.
                </p>
              </div>
            </section>

            {/* RAIN */}
            <section id="rain" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle className="w-5 h-5 text-brand-orange" />
                <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white">
                  The Rain Factor
                </h2>
              </div>
              <div className="bg-brand-carbon border border-brand-border p-8 mb-8">
                <h3 className="font-display text-sm text-brand-white uppercase mb-4 leading-relaxed">
                  Can you use it while it's raining?
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-display text-xs text-brand-orange uppercase mb-2">MaxxAir (Yes)</h4>
                    <p className="text-xs text-brand-grey leading-relaxed">
                      The patented 'Deluxe' lid creates a sheltered air vent that allows the fan to run 
                      wide open even in a UK downpour. No rain sensors required — it's physically impossible 
                      for water to enter.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-display text-xs text-brand-grey uppercase mb-2">Fiamma (No)</h4>
                    <p className="text-xs text-brand-grey leading-relaxed">
                      The Turbo Vent is a traditional dome fan. If it's raining, you must close the lid. 
                      While Fiamma offers a rain sensor that closes the lid automatically, you're still left 
                      without ventilation when you need it most (while cooking inside on a rainy day).
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* PERFORMANCE */}
            <section id="performance" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <Wind className="w-5 h-5 text-brand-orange" />
                <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white">
                  Speeds & Airflow
                </h2>
              </div>
              <div className="space-y-6 font-sans text-brand-grey text-base leading-relaxed">
                <p>
                  The **MaxxFan Deluxe** features a 10-speed motor. At lower settings (1-3), it is 
                  practically silent, making it ideal for sleeping. It can also be reversed to act 
                  as either an intake or exhaust fan.
                </p>
                <p>
                  The **Fiamma Turbo Vent** uses a simpler control system. While effective at moving 
                  large volumes of air, it tends to be louder at comparable airflow rates and offers 
                  less granularity in speed control.
                </p>
              </div>
            </section>

            {/* SIZE */}
            <section id="size" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <Thermometer className="w-5 h-5 text-brand-orange" />
                <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white">
                  Installation & Depth
                </h2>
              </div>
              <div className="prose prose-invert max-w-none font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  Both fans fit a standard **400mm x 400mm** roof opening. However, the MaxxFan's 
                  internal garnish ring is quite deep and may require trimming for thin roofs.
                </p>
                <p>
                  On the exterior, the MaxxFan has a much larger footprint on your roof. If you are 
                  squeezing a lot of solar panels onto a short wheelbase van, the Fiamma's compact 
                  dimensions might be the deciding factor.
                </p>
              </div>
            </section>

            {/* PRICE */}
            <section id="price" className="mb-20 scroll-mt-28">
              <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white mb-6">
                Price vs Value
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-6 border border-brand-border bg-brand-carbon/30">
                  <h4 className="font-display text-sm text-brand-white uppercase mb-2">MaxxFan (~£345)</h4>
                  <p className="text-xs text-brand-grey leading-relaxed">
                    Double the price, but arguably double the utility. The "buy once, cry once" 
                    choice for serious full-time builds.
                  </p>
                </div>
                <div className="p-6 border border-brand-border bg-brand-carbon/30">
                  <h4 className="font-display text-sm text-brand-white uppercase mb-2">Fiamma (~£185)</h4>
                  <p className="text-xs text-brand-grey leading-relaxed">
                    A reliable workhorse for weekenders. If you mostly travel in fair weather, 
                    the Fiamma saves you £150 for other gear.
                  </p>
                </div>
              </div>
            </section>

            {/* VERDICT */}
            <section id="verdict" className="mb-20 scroll-mt-28">
              <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white mb-6">
                The Verdict
              </h2>
              <div className="p-10 bg-brand-orange/5 border border-brand-orange/20 relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="font-display text-3xl uppercase text-brand-white mb-6">Our Recommendation</h3>
                  <p className="font-sans text-brand-grey text-lg leading-relaxed mb-8">
                    If your budget allows, **choose the MaxxFan Deluxe**. The ability to ventilate 
                    while it's raining is a game-changer for UK van life. However, for 
                    budget-conscious builds or vans with limited roof space, the **Fiamma Turbo Vent** 
                    remains a solid, high-performance choice.
                  </p>
                  <div className="flex gap-4">
                    <Link href="/brands/maxxair" className="bg-brand-orange text-white px-6 py-3 font-display text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all">
                      Shop MaxxAir
                    </Link>
                    <Link href="/brands/fiamma" className="border border-brand-border text-brand-white px-6 py-3 font-display text-[10px] uppercase tracking-widest hover:bg-brand-orange hover:border-brand-orange transition-all">
                      Shop Fiamma
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* RELATED PRODUCTS */}
            <div className="mt-16 pt-10 border-t border-brand-border/40">
              <RelatedProducts products={MENTIONED_PRODUCTS} />
              
              <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest mb-6 mt-16 block">Related guides</span>
              <div className="flex flex-wrap gap-4">
                <Link href="/brands/maxxair" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">MaxxAir Brand Hub →</Link>
                <Link href="/brands/fiamma" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">Fiamma Brand Hub →</Link>
                <Link href="/guides/campervan-heating-guide" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">Heating Guide →</Link>
              </div>
            </div>

          </div>

          <MaxxairSidebar items={TOC} currentPage="/guides/compare/maxxair-vs-fiamma" />
        </div>
      </div>

      <Footer />
    </main>
  );
}
