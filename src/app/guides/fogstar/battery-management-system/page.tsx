import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RelatedProducts } from "@/components/editorial/RelatedProducts";
import { FogstarSidebar } from "@/components/editorial/FogstarSidebar";
import { ArrowRight, Cpu, ShieldCheck, Zap, Info, Smartphone, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Lithium BMS Deep Dive | Understanding JBD & Fogstar | Amplios",
  description: "What is a BMS and why is it vital for your lithium battery? We explore the JBD system used by Fogstar and how it protects your off-grid investment.",
  openGraph: {
    title: "Lithium BMS Deep Dive | Understanding JBD & Fogstar",
    description: "The brains of the battery. How a BMS works to keep you safe.",
    url: "https://amplios.co.uk/guides/fogstar/battery-management-system",
  },
  alternates: { canonical: "https://amplios.co.uk/guides/fogstar/battery-management-system" },
};

const TOC = [
  { id: "intro", label: "What is a BMS?" },
  { id: "protection", label: "Core Protection" },
  { id: "balancing", label: "Cell Balancing" },
  { id: "monitoring", label: "Smart Monitoring" },
  { id: "verdict", label: "BMS Reliability" },
];

const MENTIONED_PRODUCTS = [
  { name: "Fogstar Drift 300Ah PRO", brand: "Fogstar", price: 109900, slug: "fogstar-drift-300ah-pro-lithium-lifepo4-leisure-battery" },
  { name: "Victron SmartShunt", brand: "Victron Energy", price: 12500, slug: "victron-smartshunt-500a" },
  { name: "Fogstar Drift 105Ah", brand: "Fogstar", price: 42900, slug: "fogstar-drift-105ah-lithium-lifepo4-leisure-battery" },
];

export default function FogstarBMSDeepDive() {
  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[50vh] flex items-end pt-24">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/tech-electrical.png" // Placeholder
            alt="Lithium BMS components"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian via-brand-obsidian/40 to-transparent" />
        </div>
        
        <div className="relative container mx-auto px-6 pb-16 z-10">
          <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em] mb-4 block">
            // TECHNICAL DEEP DIVE
          </span>
          <h1 className="font-display text-4xl lg:text-6xl uppercase tracking-tight text-brand-white leading-[1] mb-4">
            The Brains:<br />Lithium BMS
          </h1>
          <p className="font-sans text-brand-grey text-lg max-w-2xl italic border-l-2 border-brand-orange pl-6">
            Everything you need to know about Battery Management Systems and why the JBD unit in Fogstar batteries is so highly regarded.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16">
        <div className="flex gap-16">
          <div className="flex-1 min-w-0">
            
            {/* INTRO */}
            <section id="intro" className="mb-20 scroll-mt-28">
              <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white mb-6">
                What is a BMS?
              </h2>
              <div className="prose prose-invert max-w-none font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  A Battery Management System (BMS) is the electronic heart of any lithium battery. 
                  While lead-acid batteries are relatively "dumb," LiFePO4 cells are sensitive to 
                  voltage and temperature. Without a BMS, a lithium battery could easily be 
                  destroyed by a single over-charge or over-discharge event.
                </p>
                <p>
                  Fogstar uses high-end **JBD (Jiabaida)** BMS units, which are widely 
                  considered the most reliable and feature-rich controllers in the 
                  leisure lithium market.
                </p>
              </div>
            </section>

            {/* PROTECTION */}
            <section id="protection" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <ShieldCheck className="w-5 h-5 text-brand-orange" />
                <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white">
                  Core Protection Features
                </h2>
              </div>
              <div className="prose prose-invert max-w-none font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  The primary job of the BMS is to act as a safety gatekeeper. It monitors 
                  every single cell in the battery pack and will physically disconnect the 
                  battery if any of the following occur:
                </p>
                <ul className="text-xs space-y-2 list-disc pl-5">
                  <li>**Over-Voltage:** Prevents cells from being pushed above 3.65V.</li>
                  <li>**Under-Voltage:** Disconnects before cells drop into the "danger zone" (usually below 2.5V).</li>
                  <li>**Over-Current:** Protects the internal wiring and cells from excessive discharge loads.</li>
                  <li>**Short-Circuit:** Instantaneous cutoff to prevent fire or explosion.</li>
                </ul>
              </div>
            </section>

            {/* BALANCING */}
            <section id="balancing" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <Zap className="w-5 h-5 text-brand-orange" />
                <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white">
                  Active vs Passive Balancing
                </h2>
              </div>
              <div className="font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  As a battery is used, individual cells can drift in voltage. The BMS 
                  performs "balancing" to ensure all cells reach full charge at the 
                  same time. The Fogstar Drift range uses precision passive balancing 
                  to maintain cell health over thousands of cycles.
                </p>
              </div>
            </section>

            {/* MONITORING */}
            <section id="monitoring" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <Smartphone className="w-5 h-5 text-brand-orange" />
                <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white">
                  Smart Monitoring via App
                </h2>
              </div>
              <div className="prose prose-invert max-w-none font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  One of the biggest advantages of the JBD BMS is the **Fogstar Drift App**. 
                  Because the BMS is "smart," it can communicate its internal state via 
                  Bluetooth. This eliminates the need for an external battery monitor in 
                  simple builds, though we still recommend a Victron SmartShunt for 
                  total system accuracy.
                </p>
              </div>
            </section>

            {/* VERDICT */}
            <section id="verdict" className="mb-20 scroll-mt-28">
              <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white mb-6">
                BMS Reliability
              </h2>
              <div className="bg-brand-carbon p-8 border border-brand-border">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="w-5 h-5 text-brand-orange" />
                  <h4 className="font-display text-sm text-brand-white uppercase">The Failure Point</h4>
                </div>
                <p className="font-sans text-brand-grey text-sm leading-relaxed">
                  In 90% of lithium battery failures, the cells are fine—it's the BMS 
                  that has failed. By using JBD units with high-quality MOSFETs and 
                  dedicated UK support, Fogstar has virtually eliminated the common 
                  reliability issues found in generic "blue wrap" batteries.
                </p>
              </div>
            </section>

            {/* RELATED PRODUCTS */}
            <div className="mt-16 pt-10 border-t border-brand-border/40">
              <RelatedProducts products={MENTIONED_PRODUCTS} />
              
              <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest mb-6 mt-16 block">Related guides</span>
              <div className="flex flex-wrap gap-4">
                <Link href="/brands/fogstar" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">Fogstar Hub →</Link>
                <Link href="/guides/fogstar/drift-lithium-review" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">Drift Review →</Link>
              </div>
            </div>

          </div>

          <FogstarSidebar items={TOC} currentPage="/guides/fogstar/battery-management-system" />
        </div>
      </div>

      <Footer />
    </main>
  );
}
