import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RelatedProducts } from "@/components/editorial/RelatedProducts";
import { ArrowRight, Shield, Zap, Battery, Cpu, CheckCircle, Smartphone, Flame } from "lucide-react";

export const metadata: Metadata = {
  title: "Fogstar Drift UK | Authorised Dealer | Lithium LiFePO4 Batteries | Amplios",
  description: "Fogstar Drift is the UK's value leader in lithium power. Grade A EVE cells, integrated heating, and JBD BMS as standard. Explore the Drift range for your van build.",
  openGraph: {
    title: "Fogstar Drift UK | Authorised Dealer | Amplios",
    description: "Explore the Fogstar Drift lithium range. Integrated heating and smart BMS as standard.",
    url: "https://amplios.co.uk/brands/fogstar",
  },
  alternates: { canonical: "https://amplios.co.uk/brands/fogstar" },
};

const STATS = [
  { value: "UK", label: "Designed & Supported" },
  { value: "10 YEAR", label: "Full Warranty" },
  { value: "GRADE A", label: "EVE Prismatics" },
  { value: "JBD", label: "Premium BMS" },
];

const WHY_FOGSTAR = [
  {
    icon: Flame,
    title: "Integrated Heating",
    body: "Every Drift battery features internal heating elements that allow for safe charging in sub-zero UK winters, unlike standard lithium batteries.",
  },
  {
    icon: Smartphone,
    title: "Smart Monitoring",
    body: "The Fogstar Drift app provides real-time data on State of Charge (SoC), voltage, current, and temperature via Bluetooth.",
  },
  {
    icon: Shield,
    title: "10-Year Warranty",
    body: "Backed by a decade-long warranty and UK-based technical support, Fogstar offers peace of mind that budget imports cannot match.",
  },
  {
    icon: Cpu,
    title: "JBD BMS",
    body: "Equipped with the industry-standard JBD Battery Management System, protecting your cells from over-voltage, under-voltage, and short circuits.",
  },
  {
    icon: Battery,
    title: "Grade A Cells",
    body: "Fogstar uses only Grade A EVE prismatic cells, ensuring maximum cycle life (3,500+ cycles) and consistent performance.",
  },
];

const PRODUCT_RANGE = [
  {
    name: "Drift 105Ah",
    desc: "The standard weekend warrior choice. Fits under most driver seats.",
    href: "/store/electrical-core?sub=batteries",
  },
  {
    name: "Drift 280Ah",
    desc: "High capacity in a compact metal case. The off-grid champion.",
    href: "/store/electrical-core?sub=batteries",
  },
  {
    name: "Drift 300Ah PRO",
    desc: "200A continuous discharge. Designed for induction hobs and large inverters.",
    href: "/store/electrical-core?sub=batteries",
  },
  {
    name: "24V / 48V Range",
    desc: "High-voltage solutions for expedition trucks and off-grid properties.",
    href: "/store/electrical-core?sub=batteries",
  },
  {
    name: "Active Balancers",
    desc: "Ensure your cells remain perfectly matched for maximum longevity.",
    href: "/store/electrical-core?sub=accessories",
  },
];

const MENTIONED_PRODUCTS = [
  { name: "Fogstar Drift 105Ah Lithium", brand: "Fogstar", price: 42900, slug: "fogstar-drift-105ah-lithium-lifepo4-leisure-battery" },
  { name: "Fogstar Drift 280Ah Lithium", brand: "Fogstar", price: 79900, slug: "fogstar-drift-280ah-lithium-lifepo4-leisure-battery" },
  { name: "Fogstar Drift 300Ah PRO", brand: "Fogstar", price: 109900, slug: "fogstar-drift-300ah-pro-lithium-lifepo4-leisure-battery" },
];

export default function FogstarBrandHub() {
  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-[70vh] flex items-end">
        <div className="absolute inset-0 bg-brand-carbon">
          <Image
            src="/images/cat-power.png"
            alt="Fogstar Drift lithium batteries"
            fill
            className="object-cover opacity-40 grayscale hover:grayscale-0 transition-all duration-1000"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-obsidian via-brand-obsidian/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian/80 to-transparent" />
        </div>

        <div className="relative container mx-auto px-6 pb-20 pt-40">
          <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em] mb-4 block">
            // UK VALUE LEADER
          </span>
          <h1 className="font-display text-5xl lg:text-7xl uppercase tracking-tight text-brand-white leading-[1] mb-4">
            FOGSTAR <span className="text-brand-orange">DRIFT</span>
          </h1>
          <p className="font-display text-xl lg:text-2xl text-brand-grey italic mb-2">
            Premium Lithium. Accessible Pricing. UK Supported.
          </p>
          <p className="font-sans text-brand-grey/80 text-base mb-8 max-w-xl">
            The Drift range has redefined the UK market by offering Grade A prismatic cells and integrated heating at a price point that makes AGM obsolete.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/store/electrical-core?sub=batteries"
              className="inline-flex items-center gap-3 bg-brand-orange text-white px-8 py-4 font-display text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all font-bold"
            >
              Shop Fogstar Range <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/guides/fogstar/drift-lithium-review"
              className="inline-flex items-center gap-3 border border-brand-border text-white px-8 py-4 font-display text-[10px] uppercase tracking-widest hover:border-brand-orange transition-all font-bold"
            >
              Technical Guides
            </Link>
          </div>
        </div>
      </section>

      {/* INTRO 2-COL */}
      <section className="py-20 border-t border-brand-border">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <span className="font-mono text-[9px] text-brand-orange uppercase tracking-[0.3em] mb-4 block">
                // THE DRIFT ADVANTAGE
              </span>
              <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-6">
                Why Fogstar dominates the UK market
              </h2>
              <div className="space-y-4 font-sans text-brand-grey text-base leading-relaxed">
                <p>
                  Before Fogstar launched the Drift range, UK van builders had to choose between ultra-premium brands costing £1,200+ or risky unbranded imports with no local warranty.
                </p>
                <p>
                  Fogstar bridged that gap. By sourcing Grade A EVE cells directly and integrating a high-quality JBD BMS with internal heating, they created a battery that survives the UK climate and the rigours of van life—all while remaining accessible to the DIY builder.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {STATS.map((stat) => (
                <div key={stat.label} className="bg-brand-carbon border border-brand-border p-6 flex flex-col items-center justify-center text-center group hover:border-brand-orange transition-colors">
                  <span className="font-display text-4xl text-brand-orange mb-2 group-hover:scale-110 transition-transform">{stat.value}</span>
                  <span className="font-mono text-[10px] text-brand-grey uppercase tracking-widest">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY FOGSTAR GRID */}
      <section className="py-20 bg-brand-carbon border-y border-brand-border">
        <div className="container mx-auto px-6">
          <div className="mb-12">
            <span className="font-mono text-[9px] text-brand-orange uppercase tracking-[0.3em] mb-2 block">
              // ENGINEERING STANDARDS
            </span>
            <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white">
              Built for the UK climate
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_FOGSTAR.map((item) => (
              <div key={item.title} className="bg-brand-obsidian border border-brand-border p-6 hover:border-brand-orange/40 transition-colors">
                <item.icon className="w-6 h-6 text-brand-orange mb-4" />
                <h3 className="font-display text-sm uppercase tracking-tight text-brand-white mb-3">
                  {item.title}
                </h3>
                <p className="font-sans text-brand-grey text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
            {/* Guide Cross-link */}
            <div className="bg-brand-obsidian border border-brand-orange/40 p-6 flex flex-col justify-between">
              <div>
                <span className="font-mono text-[9px] text-brand-orange uppercase tracking-widest mb-2 block">Decision Support</span>
                <h3 className="font-display text-sm uppercase tracking-tight text-brand-white mb-3">
                  Fogstar vs Victron
                </h3>
                <p className="font-sans text-brand-grey text-sm leading-relaxed">
                  Is it worth paying double for a Victron battery? We compare cell quality, BMS integration, and warranty terms.
                </p>
              </div>
              <Link href="/guides/compare/fogstar-vs-victron-lithium" className="inline-flex items-center gap-2 mt-4 text-brand-orange font-mono text-[10px] uppercase tracking-widest hover:gap-3 transition-all">
                Read the comparison <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT RANGE GRID */}
      <section className="py-20 border-b border-brand-border">
        <div className="container mx-auto px-6">
          <div className="mb-12">
            <span className="font-mono text-[9px] text-brand-orange uppercase tracking-[0.3em] mb-2 block">
              // THE DRIFT RANGE
            </span>
            <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white">
              Shop by Fogstar capacity
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PRODUCT_RANGE.map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                className="group flex items-start gap-4 p-5 bg-brand-carbon border border-brand-border hover:border-brand-orange transition-all"
              >
                <CheckCircle className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-display text-sm uppercase tracking-tight text-brand-white group-hover:text-brand-orange transition-colors mb-1">
                    {cat.name}
                  </h3>
                  <p className="font-sans text-brand-grey text-[12px] leading-relaxed">{cat.desc}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-brand-grey/30 group-hover:text-brand-orange ml-auto flex-shrink-0 mt-0.5 transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-32 bg-[#050505] relative overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="font-display text-4xl lg:text-6xl uppercase tracking-tighter text-white mb-8">
            Off-Grid Power <span className="text-brand-orange italic">Simplified.</span>
          </h2>
          <p className="font-sans text-brand-grey text-xl max-w-2xl mx-auto mb-12">
            Switch to lithium with the UK's most trusted value brand. 10-year warranty as standard.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/store/electrical-core?sub=batteries" className="bg-brand-orange text-white px-10 py-5 font-display text-[12px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all font-bold shadow-2xl">
              Browse All Fogstar
            </Link>
            <Link href="/planner" className="border border-brand-border text-white px-10 py-5 font-display text-[12px] uppercase tracking-widest hover:bg-brand-carbon transition-all font-bold">
              AI Build Planner
            </Link>
          </div>

          <div className="mt-24">
            <RelatedProducts products={MENTIONED_PRODUCTS} />
            
            <div className="mt-20 flex flex-wrap justify-center gap-8">
              <Link href="/guides/compare/fogstar-vs-victron-lithium" className="font-mono text-[10px] text-brand-grey hover:text-brand-orange uppercase tracking-widest transition-colors flex items-center gap-2">
                Fogstar vs Victron <ArrowRight className="w-3 h-3" />
              </Link>
              <Link href="/guides/fogstar/battery-management-system" className="font-mono text-[10px] text-brand-grey hover:text-brand-orange uppercase tracking-widest transition-colors flex items-center gap-2">
                BMS Deep Dive <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
