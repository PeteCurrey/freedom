import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RelatedProducts } from "@/components/editorial/RelatedProducts";
import { EberspacherSidebar } from "@/components/editorial/EberspacherSidebar";
import { ArrowRight, Flame, Droplets, Zap, ShieldCheck, Settings } from "lucide-react";

export const metadata: Metadata = {
  title: "Eberspächer Diesel Heating UK | Airtronic & Hydronic | Amplios",
  description: "Eberspächer is the precision choice for mobile heating. Explore the Airtronic S3 and Hydronic S3 ranges. Stepless heating and silent fuel pumps.",
  openGraph: {
    title: "Eberspächer Diesel Heating UK | Airtronic & Hydronic",
    description: "German-engineered precision for all-season van life. The silent heating standard.",
    url: "https://amplios.co.uk/brands/eberspacher",
  },
  alternates: { canonical: "https://amplios.co.uk/brands/eberspacher" },
};

const TOC = [
  { id: "intro", label: "Precision Heating" },
  { id: "airtronic", label: "Airtronic S3 Range" },
  { id: "hydronic", label: "Hydronic Water" },
  { id: "controls", label: "EasyStart Controls" },
  { id: "why-eberspacher", label: "The Silent Advantage" },
  { id: "shop", label: "Shop Eberspächer" },
];

const MENTIONED_PRODUCTS = [
  { name: "Eberspächer Airtronic S3", brand: "Eberspächer", price: 124500, slug: "eberspacher-airtronic-s3-d2l-diesel-heater-kit" },
  { name: "Eberspächer Hydronic S3", brand: "Eberspächer", price: 149500, slug: "eberspacher-hydronic-s3-economy-water-heater" },
  { name: "EasyStart Pro Controller", brand: "Eberspächer", price: 11500, slug: "eberspacher-easystart-pro-timer" },
];

export default function EberspacherBrandHub() {
  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[60vh] flex items-end pt-24">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/cat-climate.png" // Placeholder
            alt="Eberspächer Diesel Heating"
            fill
            className="object-cover opacity-40 grayscale-[0.2]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian via-brand-obsidian/40 to-transparent" />
        </div>
        
        <div className="relative container mx-auto px-6 pb-20 z-10">
          <div className="max-w-3xl">
            <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em] mb-6 block leading-none">
              // PRECISION MOBILE HEATING
            </span>
            <h1 className="font-display text-5xl lg:text-8xl uppercase tracking-tighter text-brand-white leading-[0.9] mb-8">
              EBERSPÄCHER:<br /><span className="text-brand-orange">SILENT</span><br />POWER
            </h1>
            <p className="font-sans text-brand-grey text-lg lg:text-xl leading-relaxed max-w-2xl italic border-l-2 border-brand-orange pl-6">
              The choice of professional coachbuilders. Unrivalled comfort through stepless 
              heating control and the industry's quietest fuel dosing technology.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-20">
        <div className="flex gap-16">
          <div className="flex-1 min-w-0">
            
            {/* INTRO */}
            <section id="intro" className="mb-24 scroll-mt-28">
              <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-8">
                The Precision Engineering Choice
              </h2>
              <div className="prose prose-invert max-w-none font-sans text-brand-grey text-lg leading-relaxed space-y-6">
                <p>
                  Eberspächer (often referred to as 'Eberspacher' or simply 'Ebby' in the UK) 
                  competes head-to-head with Webasto for the title of the world's best diesel 
                  heating system. While both are German-engineered, Eberspächer is often 
                  favoured for its **stepless heating control**, which avoids the 
                  noticeable "cycling" between power levels found in some other heaters.
                </p>
                <p>
                  With the launch of the **Airtronic S3** range, they have introduced 
                  CAN-bus architecture and a new "silent" fuel pump that virtually 
                  eliminates the ticking noise common to diesel heaters.
                </p>
              </div>
            </section>

            {/* AIRTRONIC */}
            <section id="airtronic" className="mb-24 scroll-mt-28">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-brand-orange/10 flex items-center justify-center rounded-sm">
                  <Flame className="w-6 h-6 text-brand-orange" />
                </div>
                <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white">
                  Airtronic S3 Range
                </h2>
              </div>
              <div className="grid lg:grid-cols-2 gap-8 mb-12">
                <div className="bg-brand-carbon border border-brand-border p-8">
                  <h3 className="font-display text-xl uppercase text-brand-white mb-4">Airtronic D2L</h3>
                  <p className="font-sans text-brand-grey text-sm mb-6 leading-relaxed">
                    The compact 2.2kW workhorse. Featuring a brushless motor for long life 
                    and a stepless output that maintains a perfectly consistent temperature.
                  </p>
                  <Link href="/guides/eberspacher/airtronic-s3-guide" className="inline-flex items-center gap-2 text-brand-orange font-mono text-[10px] uppercase tracking-widest hover:gap-3 transition-all">
                    View Guide <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
                <div className="bg-brand-carbon border border-brand-border p-8">
                  <h3 className="font-display text-xl uppercase text-brand-white mb-4">Airtronic D4L</h3>
                  <p className="font-sans text-brand-grey text-sm mb-6 leading-relaxed">
                    High-output 4kW heating for large LWB motorhomes and expedition trucks. 
                    Maintains the same silent pump technology and CAN-bus control.
                  </p>
                  <Link href="/guides/eberspacher/airtronic-s3-guide" className="inline-flex items-center gap-2 text-brand-orange font-mono text-[10px] uppercase tracking-widest hover:gap-3 transition-all">
                    View Guide <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </section>

            {/* HYDRONIC */}
            <section id="hydronic" className="mb-24 scroll-mt-28">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-brand-orange/10 flex items-center justify-center rounded-sm">
                  <Droplets className="w-6 h-6 text-brand-orange" />
                </div>
                <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white">
                  Hydronic S3 Water Heaters
                </h2>
              </div>
              <div className="bg-brand-carbon border border-brand-border p-10 flex flex-col lg:flex-row gap-10 items-center">
                <div className="flex-1 text-center lg:text-left">
                  <h3 className="font-display text-2xl uppercase text-brand-white mb-4">Efficiency in Water</h3>
                  <p className="font-sans text-brand-grey text-base leading-relaxed mb-8">
                    The Hydronic S3 Economy is the newest generation of water heaters. 
                    It's smaller, more efficient, and easier to service than previous models, 
                    making it the perfect choice for high-end shower systems.
                  </p>
                  <Link href="/guides/eberspacher/airtronic-installation" className="inline-flex items-center gap-2 bg-brand-orange text-white px-8 py-3 font-display text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all">
                    Installation Advice <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="w-full lg:w-1/3 aspect-square bg-brand-obsidian border border-brand-border flex items-center justify-center">
                  <span className="font-mono text-[10px] text-brand-grey uppercase tracking-widest">Hydronic Visual</span>
                </div>
              </div>
            </section>

            {/* CONTROLS */}
            <section id="controls" className="mb-24 scroll-mt-28">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-brand-orange/10 flex items-center justify-center rounded-sm">
                  <Settings className="w-6 h-6 text-brand-orange" />
                </div>
                <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white">
                  EasyStart Controls
                </h2>
              </div>
              <div className="space-y-6 font-sans text-brand-grey text-lg leading-relaxed max-w-3xl">
                <p>
                  Eberspächer's EasyStart Pro is widely considered the best wired controller 
                  on the market. Its intuitive knob design and integrated temperature sensor 
                  allow for precise adjustments even in the middle of the night.
                </p>
              </div>
            </section>

            {/* WHY EBERSPACHER */}
            <section id="why-eberspacher" className="mb-24 scroll-mt-28">
              <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-10">
                The Eberspächer Advantage
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { title: "Stepless Regulation", desc: "Maintains a constant cabin temperature without cycling power up and down." },
                  { title: "Brushless Motors", desc: "Extended service intervals (up to 5,000 hours) and lower electrical draw." },
                  { title: "Silent Fuel Pump", desc: "New internal damping design eliminates the 'ticking' noise entirely." },
                  { title: "CAN-bus Ready", desc: "Advanced diagnostics and integration with modern vehicle control systems." },
                ].map((item) => (
                  <div key={item.title} className="p-6 border border-brand-border bg-brand-carbon/50">
                    <div className="flex items-center gap-3 mb-3">
                      <ShieldCheck className="w-5 h-5 text-brand-orange" />
                      <h3 className="font-display text-sm uppercase tracking-widest text-brand-white">{item.title}</h3>
                    </div>
                    <p className="font-sans text-brand-grey text-xs leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* RELATED PRODUCTS */}
            <div className="mt-16 pt-10 border-t border-brand-border/40">
              <RelatedProducts products={MENTIONED_PRODUCTS} />
              
              <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest mb-6 mt-16 block">Related guides</span>
              <div className="flex flex-wrap gap-4">
                <Link href="/guides/eberspacher/airtronic-s3-guide" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">Airtronic S3 Guide →</Link>
                <Link href="/guides/eberspacher/airtronic-installation" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">Installation Guide →</Link>
              </div>
            </div>

          </div>

          <EberspacherSidebar items={TOC} currentPage="/brands/eberspacher" />
        </div>
      </div>

      <Footer />
    </main>
  );
}
