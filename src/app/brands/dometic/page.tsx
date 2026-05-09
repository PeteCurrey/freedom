import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RelatedProducts } from "@/components/editorial/RelatedProducts";
import { DometicSidebar } from "@/components/editorial/DometicSidebar";
import { ArrowRight, Wind, Snowflake, ShieldCheck, Zap, Layers, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Dometic Van Equipment UK | Fridge/Freezers, Windows & AC | Amplios",
  description: "Dometic is the global leader in mobile living. Explore Dometic CFX3 fridges, S4 windows, and FreshJet AC units for your UK van conversion.",
  openGraph: {
    title: "Dometic Van Equipment UK | CFX3, S4 & FreshJet",
    description: "Mobile living made easy. Explore the full Dometic range at Amplios.",
    url: "https://amplios.co.uk/brands/dometic",
  },
  alternates: { canonical: "https://amplios.co.uk/brands/dometic" },
};

const TOC = [
  { id: "intro", label: "Mobile Living Pioneers" },
  { id: "cooling", label: "CFX3 Cooling" },
  { id: "windows", label: "S4 Window Systems" },
  { id: "ac", label: "FreshJet Climate" },
  { id: "innovation", label: "Dometic Innovation" },
  { id: "shop", label: "Shop Dometic" },
];

const MENTIONED_PRODUCTS = [
  { name: "Dometic CFX3 55IM", brand: "Dometic", price: 104500, slug: "dometic-cfx3-55im-portable-fridge-freezer-ice-maker" },
  { name: "Dometic S4 Window", brand: "Dometic", price: 49500, slug: "dometic-s4-hinged-campervan-window-range" },
  { name: "Dometic FreshJet 2200", brand: "Dometic", price: 199500, slug: "dometic-freshjet-2200-roof-air-conditioner" },
];

export default function DometicBrandHub() {
  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[60vh] flex items-end pt-24">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/cat-climate.png" // Placeholder
            alt="Premium Dometic equipment"
            fill
            className="object-cover opacity-40 grayscale-[0.5]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian via-brand-obsidian/40 to-transparent" />
        </div>
        
        <div className="relative container mx-auto px-6 pb-20 z-10">
          <div className="max-w-3xl">
            <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em] mb-6 block leading-none">
              // MOBILE LIVING EXPERTS
            </span>
            <h1 className="font-display text-5xl lg:text-8xl uppercase tracking-tighter text-brand-white leading-[0.9] mb-8">
              DOMETIC:<br /><span className="text-brand-orange">MOBILE</span><br />LIVING
            </h1>
            <p className="font-sans text-brand-grey text-lg lg:text-xl leading-relaxed max-w-2xl italic border-l-2 border-brand-orange pl-6">
              From the first portable cooling solutions to the world's most advanced campervan window systems. 
              Dometic defines the mobile lifestyle.
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
                Pioneering the Mobile World
              </h2>
              <div className="prose prose-invert max-w-none font-sans text-brand-grey text-lg leading-relaxed space-y-6">
                <p>
                  Dometic is a Swedish company with a simple mission: to make mobile living easy. 
                  With a heritage stretching back to the invention of absorption cooling, they have 
                  become the most recognized brand in the leisure vehicle industry worldwide.
                </p>
                <p>
                  Whether it's the CFX3 portable fridge that revolutionized off-grid cooling or the 
                  S4 window range that became the blueprint for van builders everywhere, Dometic 
                  products are synonymous with quality and innovation.
                </p>
              </div>
            </section>

            {/* COOLING */}
            <section id="cooling" className="mb-24 scroll-mt-28">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-brand-orange/10 flex items-center justify-center rounded-sm">
                  <Snowflake className="w-6 h-6 text-brand-orange" />
                </div>
                <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white">
                  CFX3 Cooling Technology
                </h2>
              </div>
              <div className="grid lg:grid-cols-2 gap-8 mb-12">
                <div className="bg-brand-carbon border border-brand-border p-8">
                  <h3 className="font-display text-xl uppercase text-brand-white mb-4">CFX3 55IM</h3>
                  <p className="font-sans text-brand-grey text-sm mb-6 leading-relaxed">
                    The first portable fridge with an integrated ice maker. Powered by the VMSO3 compressor, 
                    it offers deep freezing and cooling while drawing minimal power from your leisure battery.
                  </p>
                  <Link href="/guides/dometic/cfx3-review" className="inline-flex items-center gap-2 text-brand-orange font-mono text-[10px] uppercase tracking-widest hover:gap-3 transition-all">
                    Read CFX3 Review <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
                <div className="bg-brand-carbon border border-brand-border p-8">
                  <h3 className="font-display text-xl uppercase text-brand-white mb-4">Drawer Fridges</h3>
                  <p className="font-sans text-brand-grey text-sm mb-6 leading-relaxed">
                    Space-saving solutions like the CD30 and CRX range provide permanent refrigeration 
                    integrated directly into your van's cabinetry.
                  </p>
                  <Link href="/guides/compare/dometic-cfx3-vs-alternatives" className="inline-flex items-center gap-2 text-brand-orange font-mono text-[10px] uppercase tracking-widest hover:gap-3 transition-all">
                    Compare Options <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </section>

            {/* WINDOWS */}
            <section id="windows" className="mb-24 scroll-mt-28">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-brand-orange/10 flex items-center justify-center rounded-sm">
                  <Layers className="w-6 h-6 text-brand-orange" />
                </div>
                <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white">
                  S4 Window Systems
                </h2>
              </div>
              <div className="bg-brand-carbon border border-brand-border p-10 flex flex-col lg:flex-row gap-10 items-center">
                <div className="flex-1 text-center lg:text-left">
                  <h3 className="font-display text-2xl uppercase text-brand-white mb-4">The Builder's Choice</h3>
                  <p className="font-sans text-brand-grey text-base leading-relaxed mb-8">
                    Dometic S4 windows are the industry benchmark. Featuring a double-glazed acrylic pane, 
                    integrated blackout blind, and flyscreen, they provide superior insulation and security.
                  </p>
                  <Link href="/guides/dometic/s4-window-guide" className="inline-flex items-center gap-2 bg-brand-orange text-white px-8 py-3 font-display text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all">
                    Window Guide <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="w-full lg:w-1/3 aspect-square bg-brand-obsidian border border-brand-border flex items-center justify-center">
                  <span className="font-mono text-[10px] text-brand-grey uppercase tracking-widest">S4 System Visual</span>
                </div>
              </div>
            </section>

            {/* FRESHJET */}
            <section id="ac" className="mb-24 scroll-mt-28">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-brand-orange/10 flex items-center justify-center rounded-sm">
                  <Wind className="w-6 h-6 text-brand-orange" />
                </div>
                <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white">
                  FreshJet Climate Control
                </h2>
              </div>
              <div className="space-y-6 font-sans text-brand-grey text-lg leading-relaxed max-w-3xl">
                <p>
                  Stay cool in the hottest European summers. The FreshJet range of roof air conditioners 
                  offers powerful cooling, dehumidification, and heating in a compact footprint that 
                  leaves plenty of room for your solar panels.
                </p>
                <Link href="/guides/dometic/freshjet-ac-guide" className="inline-flex items-center gap-2 text-brand-orange font-mono text-[10px] uppercase tracking-widest hover:gap-3 transition-all">
                  FreshJet Guide <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </section>

            {/* INNOVATION */}
            <section id="innovation" className="mb-24 scroll-mt-28">
              <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-10">
                The Dometic Difference
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { title: "Global Warranty", desc: "One of the only leisure brands with a truly global service network." },
                  { title: "Energy Efficient", desc: "Class-leading power consumption on all compressor cooling units." },
                  { title: "Rigorous Testing", desc: "Products are tested in extreme Australian outback conditions." },
                  { title: "Integration", desc: "Designed to work seamlessly with modern vehicle electrical systems." },
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
                <Link href="/guides/dometic/s4-window-installation" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">Window Installation →</Link>
                <Link href="/guides/compare/dometic-cfx3-vs-alternatives" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">Fridge Comparison →</Link>
              </div>
            </div>

          </div>

          <DometicSidebar items={TOC} currentPage="/brands/dometic" />
        </div>
      </div>

      <Footer />
    </main>
  );
}
