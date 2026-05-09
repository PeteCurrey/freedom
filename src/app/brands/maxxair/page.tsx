import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RelatedProducts } from "@/components/editorial/RelatedProducts";
import { ArrowRight, Shield, Zap, Wind, Droplets, CheckCircle, Thermometer, CloudRain } from "lucide-react";

export const metadata: Metadata = {
  title: "MaxxAir UK | Authorised Dealer | Van Ventilation & Roof Fans | Amplios",
  description: "MaxxAir is the industry standard for campervan ventilation. Explore the MaxxFan Deluxe range with rain shields, integrated thermostats, and remote control.",
  openGraph: {
    title: "MaxxAir UK | Authorised Dealer | Amplios",
    description: "Explore the MaxxFan Deluxe range. The only van fan that can stay open in the rain.",
    url: "https://amplios.co.uk/brands/maxxair",
  },
  alternates: { canonical: "https://amplios.co.uk/brands/maxxair" },
};

const STATS = [
  { value: "RAIN", label: "Shield Technology" },
  { value: "10 SPD", label: "Fan Control" },
  { value: "UK", label: "Authorised Stockist" },
  { value: "2 YEAR", label: "Limited Warranty" },
];

const WHY_MAXXAIR = [
  {
    icon: CloudRain,
    title: "Rain-Proof Design",
    body: "The MaxxFan Deluxe features a patented rain shield that allows the fan to remain open and operational even during heavy UK rainstorms.",
  },
  {
    icon: Wind,
    title: "900 CFM Airflow",
    body: "Powerful 10-speed motor moves up to 900 cubic feet of air per minute, providing rapid cooling and moisture removal.",
  },
  {
    icon: Thermometer,
    title: "Auto-Mode",
    body: "Built-in thermostat allows the fan to automatically adjust speed or open/close based on your desired cabin temperature.",
  },
  {
    icon: Zap,
    title: "Low Power Consumption",
    body: "Efficient brushless motor draws as little as 0.2A on low settings, making it perfect for overnight use on battery power.",
  },
  {
    icon: Droplets,
    title: "Moisture Control",
    body: "Essential for preventing condensation and mould. The MaxxFan is the first line of defence in any professional van build.",
  },
];

const PRODUCT_RANGE = [
  {
    name: "MaxxFan Deluxe (Smoke)",
    desc: "The premium choice. Tinted lid with full remote control and thermostat.",
    href: "/store/solar-roof?sub=fans",
  },
  {
    name: "MaxxFan Deluxe (White)",
    desc: "Clean aesthetic with the same industry-leading ventilation performance.",
    href: "/store/solar-roof?sub=fans",
  },
  {
    name: "MaxxFan Deluxe (Clear)",
    desc: "Maximize natural light while maintaining high-performance airflow.",
    href: "/store/solar-roof?sub=fans",
  },
  {
    name: "SkyLine Shades",
    desc: "Integrated LED lighting and blackout shades for the MaxxFan range.",
    href: "/store/solar-roof?sub=accessories",
  },
  {
    name: "Replacement Lids",
    desc: "Genuine MaxxAir replacement parts for maintenance and repairs.",
    href: "/store/solar-roof?sub=accessories",
  },
];

const MENTIONED_PRODUCTS = [
  { name: "MaxxFan Deluxe - Smoke Tint", brand: "MaxxAir", price: 34500, slug: "maxxfan-deluxe-smoke" },
  { name: "MaxxFan Deluxe - White", brand: "MaxxAir", price: 32500, slug: "maxxfan-deluxe-white" },
  { name: "MaxxAir SkyLine Shade with LED", brand: "MaxxAir", price: 8500, slug: "maxxair-skyline-shade" },
];

export default function MaxxairBrandHub() {
  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-[70vh] flex items-end">
        <div className="absolute inset-0 bg-brand-carbon">
          <Image
            src="/images/hero-background.png" // Placeholder
            alt="MaxxAir van ventilation"
            fill
            className="object-cover opacity-40 grayscale hover:grayscale-0 transition-all duration-1000"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-obsidian via-brand-obsidian/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian/80 to-transparent" />
        </div>

        <div className="relative container mx-auto px-6 pb-20 pt-40">
          <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em] mb-4 block">
            // AUTHORISED UK STOCKIST
          </span>
          <h1 className="font-display text-5xl lg:text-7xl uppercase tracking-tight text-brand-white leading-[1] mb-4">
            MAXXAIR <span className="text-brand-orange">VENTILATION</span>
          </h1>
          <p className="font-display text-xl lg:text-2xl text-brand-grey italic mb-2">
            The Only Fan You'll Ever Need. Rain or Shine.
          </p>
          <p className="font-sans text-brand-grey/80 text-base mb-8 max-w-xl">
            From the legendary MaxxFan Deluxe to professional-grade roof vents, MaxxAir is the gold standard for campervan climate control.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/store/solar-roof?sub=fans"
              className="inline-flex items-center gap-3 bg-brand-orange text-white px-8 py-4 font-display text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all font-bold"
            >
              Shop MaxxAir Range <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/guides/maxxair/maxxfan-deluxe-review"
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
                // CLIMATE CONTROL
              </span>
              <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-6">
                Fresh air, even in the rain
              </h2>
              <div className="space-y-4 font-sans text-brand-grey text-base leading-relaxed">
                <p>
                  Proper ventilation is the most overlooked part of a van build. Without it, condensation from cooking and sleeping quickly leads to mould and structural damage.
                </p>
                <p>
                  The MaxxFan Deluxe solved the industry's biggest problem: how to keep the fan open when it's raining. Its built-in rain shield means you never have to choose between a dry interior and a fresh breeze. Whether you're stealth camping in a city or parked on a stormy coast, MaxxAir keeps you comfortable.
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

      {/* WHY MAXXAIR GRID */}
      <section className="py-20 bg-brand-carbon border-y border-brand-border">
        <div className="container mx-auto px-6">
          <div className="mb-12">
            <span className="font-mono text-[9px] text-brand-orange uppercase tracking-[0.3em] mb-2 block">
              // ENGINEERING ADVANTAGE
            </span>
            <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white">
              Why Professionals Choose MaxxAir
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_MAXXAIR.map((item) => (
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
                  MaxxFan Installation
                </h3>
                <p className="font-sans text-brand-grey text-sm leading-relaxed">
                  Cutting your roof is permanent. Our guide covers positioning, sealing, and the structural reinforcement needed for a leak-free fit.
                </p>
              </div>
              <Link href="/guides/maxxair/maxxfan-installation" className="inline-flex items-center gap-2 mt-4 text-brand-orange font-mono text-[10px] uppercase tracking-widest hover:gap-3 transition-all">
                Read the guide <ArrowRight className="w-3 h-3" />
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
              // THE COMPLETE RANGE
            </span>
            <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white">
              Shop by MaxxAir category
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
            Breathe <span className="text-brand-orange italic">Easier.</span>
          </h2>
          <p className="font-sans text-brand-grey text-xl max-w-2xl mx-auto mb-12">
            Invest in the only fan that works as hard as you do. Designed for life on the road.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/store/solar-roof?sub=fans" className="bg-brand-orange text-white px-10 py-5 font-display text-[12px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all font-bold shadow-2xl">
              Browse All MaxxAir
            </Link>
            <Link href="/planner" className="border border-brand-border text-white px-10 py-5 font-display text-[12px] uppercase tracking-widest hover:bg-brand-carbon transition-all font-bold">
              AI Build Planner
            </Link>
          </div>

          <div className="mt-24">
            <RelatedProducts products={MENTIONED_PRODUCTS} />
            
            <div className="mt-20 flex flex-wrap justify-center gap-8">
              <Link href="/guides/maxxair/maxxfan-deluxe-review" className="font-mono text-[10px] text-brand-grey hover:text-brand-orange uppercase tracking-widest transition-colors flex items-center gap-2">
                MaxxFan Deluxe Review <ArrowRight className="w-3 h-3" />
              </Link>
              <Link href="/guides/maxxair/maxxfan-installation" className="font-mono text-[10px] text-brand-grey hover:text-brand-orange uppercase tracking-widest transition-colors flex items-center gap-2">
                Installation Guide <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
