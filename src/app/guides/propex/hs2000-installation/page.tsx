import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PropexSidebar } from "@/components/editorial/PropexSidebar";
import { RelatedProducts } from "@/components/editorial/RelatedProducts";
import { ArrowRight, Settings, ShieldAlert, CheckCircle, Info, Flame, Zap, Scissors, Wind } from "lucide-react";

export const metadata: Metadata = {
  title: "Propex HS2000 Installation Guide | Gas Safety & Fitting | Amplios",
  description: "Step-by-step guide to installing a Propex HS2000 gas heater. Gas line compression, combustion intake/exhaust, and 12V wiring for a professional finish.",
  openGraph: {
    title: "Propex HS2000 Installation Guide | Amplios",
    description: "Professional installation walkthrough for the Propex HS2000 gas heater.",
    url: "https://amplios.co.uk/guides/propex/hs2000-installation",
  },
};

const TOC = [
  { id: "prep", label: "Mounting & Position" },
  { id: "gas", label: "Gas Line Integration" },
  { id: "combustion", label: "Combustion Pipes" },
  { id: "wiring", label: "Electrical Connections" },
  { id: "safety", label: "Testing & Certification" },
];

const MENTIONED_PRODUCTS = [
  { name: "Propex HS2000 Heatsource Kit", brand: "Propex", price: 54500, slug: "propex-hs2000-gas-heater-kit" },
  { name: "Propex Digital Thermostat", brand: "Propex", price: 8500, slug: "propex-digital-thermostat" },
];

export default function PropexInstallationGuide() {
  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-[50vh] flex items-end pt-24 border-b border-brand-border overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/cat-climate.png" // Placeholder
            alt="Propex HS2000 installation"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian to-transparent" />
        </div>
        <div className="relative container mx-auto px-6 pb-16 z-10">
          <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em] mb-4 block">
            // FITTING PROTOCOL
          </span>
          <h1 className="font-display text-4xl lg:text-6xl uppercase tracking-tight text-brand-white leading-[1] mb-4">
            Propex HS2000:<br />Installation Guide
          </h1>
          <p className="font-sans text-brand-grey text-lg max-w-2xl leading-relaxed">
            Professional guidelines for gas heater integration. 
            Copper pipe compression, combustion safety, and UK gas compliance.
          </p>
        </div>
      </section>

      {/* CONTENT + SIDEBAR */}
      <div className="container mx-auto px-6 py-16">
        <div className="flex flex-col xl:flex-row gap-12">
          <div className="flex-1 min-w-0">

            {/* PREP */}
            <section id="prep" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-8">
                <Settings className="w-6 h-6 text-brand-orange" />
                <h2 className="font-display text-3xl uppercase tracking-tight text-white">Mounting & Position</h2>
              </div>
              <div className="space-y-6 font-sans text-brand-grey text-lg leading-relaxed">
                <p>
                  The HS2000 can be mounted internally (under a seat or in a cupboard) or externally (using a mounting box). If mounting internally, ensure the unit is on a flat surface and that the intake/exhaust ports can pass through the floor without hitting structural chassis members.
                </p>
                <div className="bg-brand-carbon border border-brand-border p-6 italic text-sm">
                   "Avoid mounting the heater in a location where it can be crushed by heavy luggage. The casing is robust, but the electrical connectors are sensitive."
                </div>
              </div>
            </section>

            {/* GAS */}
            <section id="gas" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-8">
                <Flame className="w-6 h-6 text-brand-orange" />
                <h2 className="font-display text-3xl uppercase tracking-tight text-white">Gas Line Integration</h2>
              </div>
              <div className="space-y-4 font-sans text-brand-grey text-base leading-relaxed">
                <p>
                  The Propex uses an **8mm copper gas line**. We strongly recommend using a dedicated isolation valve for the heater.
                </p>
                <ul className="space-y-3">
                   <li className="flex items-center gap-3 text-sm">
                      <CheckCircle className="w-4 h-4 text-brand-orange" />
                      Use high-quality brass compression fittings (do not use solder).
                   </li>
                   <li className="flex items-center gap-3 text-sm">
                      <CheckCircle className="w-4 h-4 text-brand-orange" />
                      Ensure the pipe is supported every 500mm with rubber-lined P-clips.
                   </li>
                   <li className="flex items-center gap-3 text-sm">
                      <CheckCircle className="w-4 h-4 text-brand-orange" />
                      Keep gas lines clear of electrical looms and hot exhaust pipes.
                   </li>
                </ul>
              </div>
            </section>

            {/* COMBUSTION */}
            <section id="combustion" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-8">
                <Wind className="w-6 h-6 text-brand-orange" />
                <h2 className="font-display text-3xl uppercase tracking-tight text-white">Combustion Pipes</h2>
              </div>
              <div className="space-y-6 font-sans text-brand-grey text-lg leading-relaxed">
                <p>
                  The Propex is a balanced flue system. It draws air for combustion from outside and exhausts gases back outside. 
                </p>
                <div className="p-6 bg-brand-carbon border border-brand-border">
                   <h4 className="font-display text-xs text-white uppercase mb-3">Separation Rule</h4>
                   <p className="text-sm">
                     The intake and exhaust pipes must be separated by at least 500mm at their exit points to prevent "short-circuiting," where the heater draws in its own exhaust gases, leading to poor combustion.
                   </p>
                </div>
              </div>
            </section>

            {/* WIRING */}
            <section id="wiring" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-8">
                <Zap className="w-6 h-6 text-brand-orange" />
                <h2 className="font-display text-3xl uppercase tracking-tight text-white">Electrical Connections</h2>
              </div>
              <div className="font-sans text-brand-grey text-lg leading-relaxed space-y-4">
                <p>
                  The HS2000 draws 5.9A momentarily during startup to ignite the gas. You must use the provided 12V loom and connect it to a fused circuit (10A fuse recommended).
                </p>
                <p>
                  The thermostat should be mounted at chest height, away from direct sunlight or the heater's own warm air vents, to ensure accurate temperature sensing.
                </p>
              </div>
            </section>

            {/* SAFETY */}
            <section id="safety" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-8">
                <ShieldAlert className="w-6 h-6 text-brand-orange" />
                <h2 className="font-display text-3xl uppercase tracking-tight text-white">Testing & Certification</h2>
              </div>
              <div className="space-y-4 font-sans text-brand-grey text-base leading-relaxed">
                <p>
                  Once installed, you **must** perform a gas leak test using leak detection spray on all joints.
                </p>
                <div className="bg-brand-carbon border border-brand-border p-6 mb-12">
                   <p className="text-sm font-bold text-white mb-2 uppercase">UK Gas Safety Notice</p>
                   <p className="text-sm">
                     In the UK, while you can physically install the unit yourself, the final connection and commissioning for a "for hire or reward" vehicle must be signed off by a Gas Safe registered engineer qualified in LPG and Caravans.
                   </p>
                </div>

                {/* PAID SCHEMATIC CTA */}
                <div className="relative p-10 border border-brand-orange/40 bg-brand-orange/5 overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Flame className="w-32 h-32 rotate-12" />
                  </div>
                  <div className="relative z-10 max-w-xl">
                    <span className="font-mono text-[9px] text-brand-orange uppercase tracking-[0.4em] mb-4 block">
                      // PREMIUM TECHNICAL ASSET
                    </span>
                    <h3 className="font-display text-3xl lg:text-4xl uppercase tracking-tighter text-white mb-6 leading-none">
                      Propex HS2000 <span className="text-brand-orange">Gas Installation</span> Schematic
                    </h3>
                    <p className="font-sans text-brand-grey text-lg mb-8 leading-relaxed">
                      Download our verified installation schematic. Includes 8mm copper pipe routing, compression fitting torque specs, and combustion flue safety geometry.
                    </p>
                    <Link href="/guides/wiring-diagrams/propex-hs2000-installation-schematic" className="inline-flex items-center gap-3 bg-brand-orange text-white px-8 py-4 font-display text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all font-bold">
                      View Diagram Details <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* FOOTER COMPONENTS */}
            <div className="pt-12 border-t border-brand-border">
              <RelatedProducts products={MENTIONED_PRODUCTS} />
              
              <div className="mt-20">
                <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest mb-6 block">Continue Research</span>
                <div className="flex flex-wrap gap-6">
                  <Link href="/brands/propex" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">Propex Brand Hub →</Link>
                  <Link href="/guides/propex/hs2000-gas-heating-guide" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">Product Guide →</Link>
                </div>
              </div>
            </div>
          </div>

          <PropexSidebar items={TOC} currentPage="/guides/propex/hs2000-installation" />
        </div>
      </div>

      <Footer />
    </main>
  );
}
