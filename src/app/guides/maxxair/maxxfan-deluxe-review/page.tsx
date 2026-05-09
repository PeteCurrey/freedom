import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MaxxairSidebar } from "@/components/editorial/MaxxairSidebar";
import { RelatedProducts } from "@/components/editorial/RelatedProducts";
import { ArrowRight, Wind, CloudRain, Zap, Thermometer, Info, CheckCircle, Smartphone } from "lucide-react";

export const metadata: Metadata = {
  title: "MaxxFan Deluxe Review | The Best Campervan Fan? | Amplios",
  description: "An honest, technical review of the MaxxFan Deluxe. We test the rain shield, noise levels, and power draw to see if it's worth the £300+ price tag.",
  openGraph: {
    title: "MaxxFan Deluxe Review | Amplios",
    description: "Technical review of the MaxxFan Deluxe. Rain tests and power draw data.",
    url: "https://amplios.co.uk/guides/maxxair/maxxfan-deluxe-review",
  },
};

const TOC = [
  { id: "intro", label: "Introduction" },
  { id: "rain", label: "The Rain Shield" },
  { id: "power", label: "Power Draw & Noise" },
  { id: "features", label: "Smart Features" },
  { id: "verdict", label: "The Verdict" },
];

const MENTIONED_PRODUCTS = [
  { name: "MaxxFan Deluxe - Smoke Tint", brand: "MaxxAir", price: 34500, slug: "maxxfan-deluxe-smoke" },
  { name: "MaxxFan Deluxe - White", brand: "MaxxAir", price: 32500, slug: "maxxfan-deluxe-white" },
];

export default function MaxxfanDeluxeReview() {
  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-[50vh] bg-brand-carbon flex items-end pt-24 border-b border-brand-border overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian to-transparent" />
        <div className="relative container mx-auto px-6 pb-16">
          <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em] mb-4 block">
            // EDITORIAL REVIEW
          </span>
          <h1 className="font-display text-4xl lg:text-6xl uppercase tracking-tight text-brand-white leading-[1] mb-4">
            MaxxFan Deluxe:<br />The Industry Standard
          </h1>
          <p className="font-sans text-brand-grey text-lg max-w-2xl leading-relaxed">
            Is the MaxxFan Deluxe actually worth £350? We test the only roof fan 
            that claims to work in heavy rain without a separate cowl.
          </p>
        </div>
      </section>

      {/* CONTENT + SIDEBAR */}
      <div className="container mx-auto px-6 py-16">
        <div className="flex flex-col xl:flex-row gap-12">
          <div className="flex-1 min-w-0">

            {/* INTRO */}
            <section id="intro" className="mb-20 scroll-mt-28">
              <h2 className="font-display text-3xl uppercase tracking-tight text-white mb-8 border-l-4 border-brand-orange pl-6">
                Introduction
              </h2>
              <div className="space-y-6 font-sans text-brand-grey text-lg leading-relaxed">
                <p>
                  For years, the standard approach to van ventilation was a basic 400x400 roof vent and a separate, noisy portable fan. The MaxxFan Deluxe changed everything by integrating a high-powered, multi-speed reversible fan with a patented rain-shield lid.
                </p>
                <p>
                  In a van conversion, humidity is the enemy. Cooking a single pasta meal can release up to 1.5 litres of water into the air. Without a dedicated extractor fan, that moisture ends up in your insulation.
                </p>
              </div>
            </section>

            {/* RAIN SHIELD */}
            <section id="rain" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-8">
                <CloudRain className="w-6 h-6 text-brand-orange" />
                <h2 className="font-display text-3xl uppercase tracking-tight text-white">The Rain Shield</h2>
              </div>
              <div className="bg-brand-carbon border border-brand-border p-8 border-l-4 border-brand-orange mb-8">
                <p className="font-sans text-brand-grey text-lg leading-relaxed mb-4">
                  The primary reason people buy the Deluxe over the competition (like the Fiamma Turbo-Vent) is the lid design.
                </p>
                <p className="font-sans text-brand-grey text-base leading-relaxed">
                  Most roof fans must be closed when it rains, otherwise water drops directly onto your bed or floor. The MaxxFan's lid has an internal baffle and drainage system that allows it to stay open even in torrential downpours. In the UK, this isn't just a luxury — it's a necessity.
                </p>
              </div>
            </section>

            {/* POWER DRAW */}
            <section id="power" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-8">
                <Zap className="w-6 h-6 text-brand-orange" />
                <h2 className="font-display text-3xl uppercase tracking-tight text-white">Power Draw & Noise</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-px bg-brand-border border border-brand-border mb-8">
                <div className="bg-brand-carbon p-6">
                  <span className="font-mono text-[10px] text-brand-grey uppercase tracking-widest block mb-1">Speed 1 (Night)</span>
                  <span className="font-display text-2xl text-white">0.15A / 2.0W</span>
                </div>
                <div className="bg-brand-carbon p-6">
                  <span className="font-mono text-[10px] text-brand-grey uppercase tracking-widest block mb-1">Speed 5 (Normal)</span>
                  <span className="font-display text-2xl text-white">0.85A / 10.2W</span>
                </div>
                <div className="bg-brand-carbon p-6">
                  <span className="font-mono text-[10px] text-brand-grey uppercase tracking-widest block mb-1">Speed 10 (Turbo)</span>
                  <span className="font-display text-2xl text-white">2.60A / 31.2W</span>
                </div>
                <div className="bg-brand-carbon p-6 flex items-center justify-center italic text-xs text-brand-grey">
                  *Tested at 12.8V (Lithium)
                </div>
              </div>
              <p className="font-sans text-brand-grey text-base leading-relaxed">
                At lower speeds (1-3), the fan is virtually silent, making it perfect for overnight use without disturbing your sleep.
              </p>
            </section>

            {/* FEATURES */}
            <section id="features" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-8">
                <Thermometer className="w-6 h-6 text-brand-orange" />
                <h2 className="font-display text-3xl uppercase tracking-tight text-white">Smart Features</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-4">
                  <ul className="space-y-3">
                    {[
                      "Intake & Exhaust modes (Reversible)",
                      "Remote control (Smoke models)",
                      "Built-in thermostat auto-mode",
                      "Manual ceiling knob for power failures",
                      "Easy-to-clean internal bug screen",
                    ].map(item => (
                      <li key={item} className="flex items-center gap-3 font-sans text-sm text-brand-grey">
                        <CheckCircle className="w-4 h-4 text-brand-orange" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="aspect-video bg-brand-carbon border border-brand-border flex items-center justify-center p-10 relative">
                   <div className="text-center">
                      <Wind className="w-12 h-12 text-brand-orange mx-auto mb-4" />
                      <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest block">Airflow Control</span>
                   </div>
                </div>
              </div>
            </section>

            {/* VERDICT */}
            <section id="verdict" className="mb-20 scroll-mt-28 pt-12 border-t border-brand-border">
              <h2 className="font-display text-3xl uppercase tracking-tight text-white mb-6">
                The Verdict
              </h2>
              <p className="font-sans text-brand-grey text-lg leading-relaxed mb-8 italic">
                "The MaxxFan Deluxe is the single best investment you can make for your van's longevity and your own comfort. While the price is high, the ability to leave it open in the rain and the whisper-quiet operation at night make it unbeatable."
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/store/product/maxxfan-deluxe-smoke" className="bg-brand-orange text-white px-8 py-4 font-display text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all font-bold">
                  Shop MaxxFan Range
                </Link>
                <Link href="/guides/maxxair/maxxfan-installation" className="border border-brand-border text-white px-8 py-4 font-display text-[10px] uppercase tracking-widest hover:bg-brand-carbon transition-all font-bold">
                  Installation Guide
                </Link>
              </div>
            </section>

            {/* FOOTER COMPONENTS */}
            <div className="pt-12 border-t border-brand-border">
              <RelatedProducts products={MENTIONED_PRODUCTS} />
              
              <div className="mt-20">
                <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest mb-6 block">Continue Research</span>
                <div className="flex flex-wrap gap-6">
                  <Link href="/brands/maxxair" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">MaxxAir Hub →</Link>
                  <Link href="/guides/maxxair/maxxfan-installation" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">Installation Guide →</Link>
                </div>
              </div>
            </div>
          </div>

          <MaxxairSidebar items={TOC} currentPage="/guides/maxxair/maxxfan-deluxe-review" />
        </div>
      </div>

      <Footer />
    </main>
  );
}
