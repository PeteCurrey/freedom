import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PropexSidebar } from "@/components/editorial/PropexSidebar";
import { RelatedProducts } from "@/components/editorial/RelatedProducts";
import { ArrowRight, Flame, Zap, ShieldCheck, Info, Gauge, Wind } from "lucide-react";

export const metadata: Metadata = {
  title: "Propex HS2000 Guide | Technical Specs & Review | Amplios",
  description: "The definitive guide to the Propex HS2000 LPG gas heater. Fuel consumption, power draw, and why British-made gas heating is better for some builds.",
  openGraph: {
    title: "Propex HS2000 Guide | Amplios",
    description: "Technical specifications and performance data for the Propex HS2000 range.",
    url: "https://amplios.co.uk/guides/propex/hs2000-gas-heating-guide",
  },
};

const TOC = [
  { id: "intro", label: "Introduction" },
  { id: "specs", label: "Technical Specifications" },
  { id: "gas", label: "Gas Consumption" },
  { id: "maintenance", label: "Reliability & Care" },
  { id: "verdict", label: "Final Assessment" },
];

const SPECS = [
  { label: "Heat Output", value: "2.0 kW" },
  { label: "Fuel Type", value: "Butane or Propane (LPG)" },
  { label: "Gas Consumption", value: "142 g/h" },
  { label: "Voltage", value: "12 V" },
  { label: "Current Draw (Running)", value: "1.4 Amps" },
  { label: "Current Draw (Start-up)", value: "5.9 Amps" },
  { label: "Weight", value: "5.9 kg" },
  { label: "Dimensions (LxWxH)", value: "320 x 172 x 100 mm" },
];

const MENTIONED_PRODUCTS = [
  { name: "Propex HS2000 Heatsource Kit", brand: "Propex", price: 54500, slug: "propex-hs2000-gas-heater-kit" },
  { name: "Propex Digital Thermostat", brand: "Propex", price: 8500, slug: "propex-digital-thermostat" },
];

export default function PropexHS2000Guide() {
  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-[50vh] bg-brand-carbon flex items-end pt-24 border-b border-brand-border overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian to-transparent" />
        <div className="relative container mx-auto px-6 pb-16">
          <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em] mb-4 block">
            // PRODUCT DEEP DIVE
          </span>
          <h1 className="font-display text-4xl lg:text-6xl uppercase tracking-tight text-brand-white leading-[1] mb-4">
            Propex HS2000:<br />The Gas Workhorse
          </h1>
          <p className="font-sans text-brand-grey text-lg max-w-2xl leading-relaxed">
            Technical audit of the UK's favourite LPG heater. 
            Clean combustion, low power draw, and "install-and-forget" reliability.
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
                  The Propex HS2000 is an automatic, thermostatically controlled blown air heater fuelled by Propane or Butane gas (LPG). It is the most popular gas heater for campervans and motorhomes in the UK, prized for its simple design and high reliability.
                </p>
                <p>
                  While diesel heaters have dominated the market recently, the Propex remains the choice for those who already have a gas installation for cooking and want a cleaner, lower-maintenance heating solution.
                </p>
              </div>
            </section>

            {/* SPECS TABLE */}
            <section id="specs" className="mb-20 scroll-mt-28">
              <h2 className="font-display text-3xl uppercase tracking-tight text-white mb-8 border-l-4 border-brand-orange pl-6">
                Technical Specifications
              </h2>
              <div className="grid md:grid-cols-2 gap-px bg-brand-border border border-brand-border">
                {SPECS.map((spec) => (
                  <div key={spec.label} className="bg-brand-carbon p-6 flex justify-between items-center group hover:bg-brand-obsidian transition-colors">
                    <span className="font-mono text-[10px] text-brand-grey uppercase tracking-widest">{spec.label}</span>
                    <span className="font-display text-base text-white">{spec.value}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* GAS CONSUMPTION */}
            <section id="gas" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-8">
                <Flame className="w-6 h-6 text-brand-orange" />
                <h2 className="font-display text-3xl uppercase tracking-tight text-white">Fuel Efficiency</h2>
              </div>
              <div className="bg-brand-carbon border border-brand-border p-8 border-l-4 border-brand-orange mb-8">
                <p className="font-sans text-brand-grey text-lg leading-relaxed mb-6">
                  "How long will my gas bottle last?"
                </p>
                <p className="font-sans text-brand-grey text-base leading-relaxed">
                  The HS2000 consumes approximately **142 grams of gas per hour** of continuous running. In a real-world scenario where the thermostat cycles the heater on and off, a standard 6kg Calor Propane bottle can provide between 40 and 60 hours of heating. For a weekend trip, this is more than sufficient.
                </p>
              </div>
            </section>

            {/* MAINTENANCE */}
            <section id="maintenance" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-8">
                <ShieldCheck className="w-6 h-6 text-brand-orange" />
                <h2 className="font-display text-3xl uppercase tracking-tight text-white">Reliability & Care</h2>
              </div>
              <div className="space-y-4 font-sans text-brand-grey text-lg leading-relaxed">
                <p>
                  One of the biggest advantages of the Propex over diesel heaters is the lack of "sooting." Because gas burns so cleanly, there is no carbon buildup on the glow plug or in the combustion chamber.
                </p>
                <p>
                  As a result, a Propex HS2000 requires almost zero maintenance beyond an occasional check of the intake and exhaust pipes for obstructions (like spider webs or mud).
                </p>
              </div>
            </section>

            {/* VERDICT */}
            <section id="verdict" className="mb-20 scroll-mt-28 pt-12 border-t border-brand-border">
              <h2 className="font-display text-3xl uppercase tracking-tight text-white mb-6">
                Final Assessment
              </h2>
              <p className="font-sans text-brand-grey text-lg leading-relaxed mb-8 italic">
                "For the DIY builder who wants a simple, quiet, and British-made heating solution, the Propex HS2000 is unbeatable. It is the 'honest' heater — it doesn't have the fancy digital screens of a Webasto, but it starts every time and provides a dry, comfortable heat."
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/store/product/propex-hs2000-gas-heater-kit" className="bg-brand-orange text-white px-8 py-4 font-display text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all font-bold">
                  Buy Propex HS2000
                </Link>
                <Link href="/guides/compare/truma-vs-chinese-diesel" className="border border-brand-border text-white px-8 py-4 font-display text-[10px] uppercase tracking-widest hover:bg-brand-carbon transition-all font-bold">
                  Gas vs Diesel Debate
                </Link>
              </div>
            </section>

            {/* FOOTER COMPONENTS */}
            <div className="pt-12 border-t border-brand-border">
              <RelatedProducts products={MENTIONED_PRODUCTS} />
              
              <div className="mt-20">
                <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest mb-6 block">Continue Research</span>
                <div className="flex flex-wrap gap-6">
                  <Link href="/brands/propex" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">Propex Brand Hub →</Link>
                  <Link href="/guides/propex/hs2000-installation" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">Installation Guide →</Link>
                </div>
              </div>
            </div>
          </div>

          <PropexSidebar items={TOC} currentPage="/guides/propex/hs2000-gas-heating-guide" />
        </div>
      </div>

      <Footer />
    </main>
  );
}
