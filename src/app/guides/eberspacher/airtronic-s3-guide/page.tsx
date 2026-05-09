import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RelatedProducts } from "@/components/editorial/RelatedProducts";
import { EberspacherSidebar } from "@/components/editorial/EberspacherSidebar";
import { ArrowRight, Flame, Zap, ShieldCheck, Info, Gauge, Wind } from "lucide-react";

export const metadata: Metadata = {
  title: "Eberspacher Airtronic S3 Guide | Precision Diesel Heat | Amplios",
  description: "Everything you need to know about the Eberspächer Airtronic S3 D2L and D4L. Stepless regulation, silent pumps, and professional installation tips.",
  openGraph: {
    title: "Eberspacher Airtronic S3 Guide | Precision Diesel Heat",
    description: "The most refined diesel heater on the market. Explore the S3 range.",
    url: "https://amplios.co.uk/guides/eberspacher/airtronic-s3-guide",
  },
  alternates: { canonical: "https://amplios.co.uk/guides/eberspacher/airtronic-s3-guide" },
};

const TOC = [
  { id: "intro", label: "The S3 Difference" },
  { id: "stepless", label: "Stepless Regulation" },
  { id: "silent", label: "Silent Fuel Pump" },
  { id: "maintenance", label: "Maintenance Tips" },
  { id: "verdict", label: "Is it the best heater?" },
];

const MENTIONED_PRODUCTS = [
  { name: "Eberspächer Airtronic S3", brand: "Eberspächer", price: 124500, slug: "eberspacher-airtronic-s3-d2l-diesel-heater-kit" },
  { name: "EasyStart Pro Controller", brand: "Eberspächer", price: 11500, slug: "eberspacher-easystart-pro-timer" },
  { name: "Webasto Air Top 2000 STC", brand: "Webasto", price: 114500, slug: "webasto-air-top-2000-stc-diesel-heater-kit" },
];

export default function EberspacherAirtronicGuide() {
  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[50vh] flex items-end pt-24">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/cat-climate.png" // Placeholder
            alt="Eberspacher Airtronic S3"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian via-brand-obsidian/40 to-transparent" />
        </div>
        
        <div className="relative container mx-auto px-6 pb-16 z-10">
          <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em] mb-4 block">
            // PRODUCT GUIDE
          </span>
          <h1 className="font-display text-4xl lg:text-6xl uppercase tracking-tight text-brand-white leading-[1] mb-4">
            Airtronic S3:<br />Precision Heat
          </h1>
          <p className="font-sans text-brand-grey text-lg max-w-2xl italic border-l-2 border-brand-orange pl-6">
            The world's most refined diesel air heater. Discover why professionals choose Eberspächer for premium van builds.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16">
        <div className="flex gap-16">
          <div className="flex-1 min-w-0">
            
            {/* INTRO */}
            <section id="intro" className="mb-20 scroll-mt-28">
              <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white mb-6">
                The S3 Difference
              </h2>
              <div className="prose prose-invert max-w-none font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  The Airtronic S3 represents the third generation of Eberspächer's air 
                  heating technology. While it looks similar to the previous models, 
                  under the hood it is a complete redesign focused on two goals: 
                  **Noise Reduction** and **Temperature Stability**.
                </p>
              </div>
            </section>

            {/* STEPLESS */}
            <section id="stepless" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <Gauge className="w-5 h-5 text-brand-orange" />
                <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white">
                  Stepless Regulation
                </h2>
              </div>
              <div className="prose prose-invert max-w-none font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  Most heaters have 4 or 5 set power levels. When your van reaches the target 
                  temperature, they drop down to Level 1. If it gets too cold, they jump back 
                  to Level 2. This results in a fluctuating cabin temperature.
                </p>
                <p>
                  The S3 features **stepless control**. The burner and fan can adjust their 
                  output in tiny increments, allowing the heater to stay on a very low 
                  'simmer' that perfectly matches the heat loss of your van.
                </p>
              </div>
            </section>

            {/* SILENT */}
            <section id="silent" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <Wind className="w-5 h-5 text-brand-orange" />
                <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white">
                  The Silent Fuel Pump
                </h2>
              </div>
              <div className="font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  For years, the "ticking" fuel pump was the hallmark of a diesel heater. 
                  With the S3, Eberspächer has introduced a new internal damping 
                  architecture for the pump. When mounted correctly, it is virtually 
                  inaudible from inside or outside the vehicle.
                </p>
              </div>
            </section>

            {/* MAINTENANCE */}
            <section id="maintenance" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <ShieldCheck className="w-5 h-5 text-brand-orange" />
                <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white">
                  Maintenance Tips
                </h2>
              </div>
              <div className="prose prose-invert max-w-none font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  To keep your Airtronic S3 running cleanly for its 5,000-hour service life:
                </p>
                <ul className="text-xs space-y-2 list-disc pl-5">
                  <li>**Run Monthly:** Even in summer, run the heater for 20 minutes to prevent fuel gelling.</li>
                  <li>**High Power Burn:** Once a month, run it on full heat for 30 minutes to burn off any soot.</li>
                  <li>**Fuel Quality:** Use only fresh UK diesel. Avoid biodiesel blends where possible.</li>
                </ul>
              </div>
            </section>

            {/* VERDICT */}
            <section id="verdict" className="mb-20 scroll-mt-28">
              <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white mb-6">
                The Verdict
              </h2>
              <div className="p-8 bg-brand-carbon border border-brand-border">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-brand-orange text-brand-obsidian font-display text-2xl font-black w-12 h-12 flex items-center justify-center rounded-sm">
                    9.5
                  </div>
                  <div>
                    <h4 className="font-display text-lg uppercase text-brand-white">The Luxury Choice</h4>
                    <p className="font-mono text-[10px] text-brand-grey uppercase">Precision Engineering</p>
                  </div>
                </div>
                <p className="font-sans text-brand-grey text-base leading-relaxed">
                  If you value silence and temperature stability above all else, the 
                  Eberspächer Airtronic S3 is the best heater on the market. It is 
                  marginally more expensive than Webasto, but the refinement of the 
                  stepless control makes it feel like a true domestic heating system.
                </p>
              </div>
            </section>

            {/* RELATED PRODUCTS */}
            <div className="mt-16 pt-10 border-t border-brand-border/40">
              <RelatedProducts products={MENTIONED_PRODUCTS} />
              
              <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest mb-6 mt-16 block">Related guides</span>
              <div className="flex flex-wrap gap-4">
                <Link href="/brands/eberspacher" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">Eberspächer Hub →</Link>
                <Link href="/guides/eberspacher/airtronic-installation" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">Installation Guide →</Link>
              </div>
            </div>

          </div>

          <EberspacherSidebar items={TOC} currentPage="/guides/eberspacher/airtronic-s3-guide" />
        </div>
      </div>

      <Footer />
    </main>
  );
}
