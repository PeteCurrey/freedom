import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MaxxairSidebar } from "@/components/editorial/MaxxairSidebar";
import { RelatedProducts } from "@/components/editorial/RelatedProducts";
import { ArrowRight, Settings, ShieldAlert, CheckCircle, Info, Wind, Scissors, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "MaxxFan Deluxe Installation Guide | Professional Fitting | Amplios",
  description: "Step-by-step guide to installing a MaxxFan Deluxe. Positioning, cutting, sealing, and electrical wiring for a professional, leak-free finish.",
  openGraph: {
    title: "MaxxFan Deluxe Installation Guide | Amplios",
    description: "Professional installation walkthrough for the MaxxFan Deluxe roof fan.",
    url: "https://amplios.co.uk/guides/maxxair/maxxfan-installation",
  },
};

const TOC = [
  { id: "prep", label: "Preparation & Layout" },
  { id: "cutting", label: "Cutting the Roof" },
  { id: "sealing", label: "Sealing & Bonding" },
  { id: "wiring", label: "Electrical Wiring" },
  { id: "finishing", label: "Internal Trim" },
];

const MENTIONED_PRODUCTS = [
  { name: "MaxxFan Deluxe - Smoke Tint", brand: "MaxxAir", price: 34500, slug: "maxxfan-deluxe-smoke" },
  { name: "SikaLastomer 710 Sealant", brand: "Sika", price: 1250, slug: "sikalastomer-710" },
];

export default function MaxxfanInstallationGuide() {
  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-[50vh] flex items-end pt-24 border-b border-brand-border overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/man-tge-hero.png" // Placeholder
            alt="MaxxFan installation"
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
            MaxxFan Deluxe:<br />Installation Guide
          </h1>
          <p className="font-sans text-brand-grey text-lg max-w-2xl leading-relaxed">
            Professional guidelines for a perfect 400x400 roof cut. 
            Positioning, structural reinforcement, and leak-prevention tactics.
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
                <h2 className="font-display text-3xl uppercase tracking-tight text-white">Preparation & Layout</h2>
              </div>
              <div className="space-y-6 font-sans text-brand-grey text-lg leading-relaxed">
                <p>
                  The MaxxFan Deluxe requires a standard **400mm x 400mm** hole. However, the footprint of the lid is larger. You must ensure you have at least 200mm of flat roof space behind the hole to allow the lid to retract.
                </p>
                <div className="bg-brand-carbon border border-brand-border p-6 italic text-sm">
                   "We recommend positioning the fan directly above the cooking area or the bed to maximize moisture removal and cooling airflow where it matters most."
                </div>
              </div>
            </section>

            {/* CUTTING */}
            <section id="cutting" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-8">
                <Scissors className="w-6 h-6 text-brand-orange" />
                <h2 className="font-display text-3xl uppercase tracking-tight text-white">Cutting the Roof</h2>
              </div>
              <div className="space-y-4 font-sans text-brand-grey text-base leading-relaxed">
                <p>
                  1. Mark your 400x400 square from the inside first to check for structural ribs.
                </p>
                <p>
                  2. Drill 10mm pilot holes in each corner.
                </p>
                <p>
                  3. Use a jigsaw with a high-quality metal blade. Tape the roof extensively to prevent the jigsaw baseplate from scratching your paint.
                </p>
                <div className="flex items-start gap-4 p-6 bg-brand-carbon border border-brand-border mt-6">
                   <ShieldAlert className="w-6 h-6 text-brand-orange shrink-0 mt-1" />
                   <p className="text-sm">
                     **Crucial:** Apply anti-rust primer to the raw metal edges immediately after cutting and filing. Rust starts within hours on bare steel.
                   </p>
                </div>
              </div>
            </section>

            {/* SEALING */}
            <section id="sealing" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-8">
                <ShieldCheck className="w-6 h-6 text-brand-orange" />
                <h2 className="font-display text-3xl uppercase tracking-tight text-white">Sealing & Bonding</h2>
              </div>
              <div className="space-y-6 font-sans text-brand-grey text-lg leading-relaxed">
                <p>
                  Do not use standard silicone. Use a high-quality butyl sealant like **SikaLastomer 710**. Butyl remains flexible forever, allowing for the natural expansion and contraction of the van roof.
                </p>
                <p>
                  Apply a continuous bead to the underside of the fan flange, drop it into place, and secure using the provided screws. Wipe away any excess and finish with a bead of **Sikaflex 522** around the external edge for a secondary waterproof barrier.
                </p>
              </div>
            </section>

            {/* WIRING */}
            <section id="wiring" className="mb-20 scroll-mt-28">
              <h2 className="font-display text-3xl uppercase tracking-tight text-white mb-8 border-l-4 border-brand-orange pl-6">
                Electrical Wiring
              </h2>
              <div className="space-y-4 font-sans text-brand-grey text-lg leading-relaxed">
                <p>
                  The MaxxFan Deluxe is a 12V DC appliance. It should be wired to your leisure battery via a **5A or 10A fuse**. 
                </p>
                <p>
                  Use 1.5mm² or 2.5mm² cable. If your run is longer than 5 metres, use 2.5mm² to minimize voltage drop, which can cause the fan's control board to act erratically.
                </p>
              </div>
            </section>

            {/* FOOTER COMPONENTS */}
            <div className="pt-12 border-t border-brand-border">
              <RelatedProducts products={MENTIONED_PRODUCTS} />
              
              <div className="mt-20">
                <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest mb-6 block">Continue Research</span>
                <div className="flex flex-wrap gap-6">
                  <Link href="/brands/maxxair" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">MaxxAir Hub →</Link>
                  <Link href="/guides/maxxair/maxxfan-deluxe-review" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">Product Review →</Link>
                </div>
              </div>
            </div>
          </div>

          <MaxxairSidebar items={TOC} currentPage="/guides/maxxair/maxxfan-installation" />
        </div>
      </div>

      <Footer />
    </main>
  );
}
