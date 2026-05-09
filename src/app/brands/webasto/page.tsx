import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RelatedProducts } from "@/components/editorial/RelatedProducts";
import { ArrowRight, Shield, Zap, Flame, Droplets, CheckCircle, Gauge, Thermometer } from "lucide-react";

export const metadata: Metadata = {
  title: "Webasto UK | Authorised Dealer | Diesel Heating & Climate | Amplios",
  description: "Webasto is the global leader in diesel heating solutions. Explore the Air Top and Thermo Top ranges for reliable, all-season van life comfort. UK authorised stockist.",
  openGraph: {
    title: "Webasto UK | Authorised Dealer | Amplios",
    description: "Explore Webasto Air Top and Thermo Top diesel heating. UK authorised stockist.",
    url: "https://amplios.co.uk/brands/webasto",
  },
  alternates: { canonical: "https://amplios.co.uk/brands/webasto" },
};

const STATS = [
  { value: "1901", label: "Founded in Germany" },
  { value: "1.5M+", label: "Heaters Produced Yearly" },
  { value: "PREMIUM", label: "OEM Standard" },
  { value: "UK", label: "Nationwide Service" },
];

const WHY_WEBASTO = [
  {
    icon: Flame,
    title: "Precision Heating",
    body: "Webasto's Air Top range uses stepless modulation to maintain precise internal temperatures with minimum fuel consumption.",
  },
  {
    icon: Shield,
    title: "All-Season Reliability",
    body: "Tested in the most extreme Arctic environments. Webasto is the trusted choice for expedition vehicles and full-time dwellers.",
  },
  {
    icon: Zap,
    title: "Low Power Draw",
    body: "Optimized internal components ensure that your heating system doesn't deplete your leisure battery during long winter nights.",
  },
  {
    icon: Gauge,
    title: "Altitude Adjustment",
    body: "Integrated sensors automatically adjust the fuel/air mix for high-altitude operation (up to 2,200m), preventing carbon buildup.",
  },
  {
    icon: Thermometer,
    title: "Smart Control",
    body: "The MultiControl and SmartControl panels offer digital timing, scheduling, and remote app connectivity via ThermoConnect.",
  },
];

const PRODUCT_RANGE = [
  {
    name: "Air Top 2000 STC",
    desc: "The compact standard for small to medium vans. Quiet, efficient, and reliable.",
    href: "/store/heating-climate?sub=diesel-heaters",
  },
  {
    name: "Air Top Evo 40/55",
    desc: "Higher output for large coach-built motorhomes and expedition trucks.",
    href: "/store/heating-climate?sub=diesel-heaters",
  },
  {
    name: "Thermo Top Evo",
    desc: "Diesel-powered water heating and engine pre-heating in one compact unit.",
    href: "/store/water-plumbing?sub=water-heaters",
  },
  {
    name: "MultiControl Digital",
    desc: "Programmable timer with 7-day scheduling and diagnostic support.",
    href: "/store/heating-climate?sub=accessories",
  },
  {
    name: "ThermoConnect",
    desc: "App-based remote control for your heating system from anywhere in the world.",
    href: "/store/heating-climate?sub=accessories",
  },
];

const MENTIONED_PRODUCTS = [
  { name: "Webasto Air Top 2000 STC Kit", brand: "Webasto", price: 114500, slug: "webasto-air-top-2000-stc-diesel-heater-kit" },
  { name: "Webasto Thermo Top Evo", brand: "Webasto", price: 139500, slug: "webasto-thermo-top-evo-diesel-water-heater" },
  { name: "Webasto SmartControl Panel", brand: "Webasto", price: 14500, slug: "webasto-smartcontrol-digital-timer" },
];

export default function WebastoBrandHub() {
  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-[70vh] flex items-end">
        <div className="absolute inset-0 bg-brand-carbon">
          <Image
            src="/images/cat-climate.png"
            alt="Webasto diesel heating solutions"
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
            WEBASTO <span className="text-brand-orange">UK</span>
          </h1>
          <p className="font-display text-xl lg:text-2xl text-brand-grey italic mb-2">
            Feel the Drive. Feel the Warmth. Engineered in Germany.
          </p>
          <p className="font-sans text-brand-grey/80 text-base mb-8 max-w-xl">
            The global benchmark for diesel-powered heating. From the compact Air Top 2000 to the expedition-ready Thermo Top Evo range.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/store/heating-climate"
              className="inline-flex items-center gap-3 bg-brand-orange text-white px-8 py-4 font-display text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all font-bold"
            >
              Shop Webasto Range <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/guides/webasto/air-top-installation"
              className="inline-flex items-center gap-3 border border-brand-border text-white px-8 py-4 font-display text-[10px] uppercase tracking-widest hover:border-brand-orange transition-all font-bold"
            >
              Installation Guides
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
                // GERMAN ENGINEERING
              </span>
              <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-6">
                The standard for all-season comfort
              </h2>
              <div className="space-y-4 font-sans text-brand-grey text-base leading-relaxed">
                <p>
                  Webasto has been a pioneer in the automotive industry for over a century. Their diesel heating systems are original equipment on almost every major commercial vehicle and luxury motorhome brand in Europe.
                </p>
                <p>
                  For the van builder, Webasto represents the pinnacle of "install and forget" reliability. By tapping directly into your vehicle's fuel tank, you eliminate the need for extra gas lockers, creating a single-fuel vehicle that is easier to maintain and simpler to refuel across borders.
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

      {/* WHY WEBASTO GRID */}
      <section className="py-20 bg-brand-carbon border-y border-brand-border">
        <div className="container mx-auto px-6">
          <div className="mb-12">
            <span className="font-mono text-[9px] text-brand-orange uppercase tracking-[0.3em] mb-2 block">
              // TECHNICAL SUPERIORITY
            </span>
            <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white">
              Why Professionals Choose Webasto
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_WEBASTO.map((item) => (
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
                  Truma vs Webasto
                </h3>
                <p className="font-sans text-brand-grey text-sm leading-relaxed">
                  LPG or Diesel? We break down the real-world trade-offs in noise, fuel availability, and installation complexity.
                </p>
              </div>
              <Link href="/guides/compare/truma-vs-webasto" className="inline-flex items-center gap-2 mt-4 text-brand-orange font-mono text-[10px] uppercase tracking-widest hover:gap-3 transition-all">
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
              // THE HEATING ECOSYSTEM
            </span>
            <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white">
              Shop by Webasto category
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
            All-Season <span className="text-brand-orange italic">Freedom.</span>
          </h2>
          <p className="font-sans text-brand-grey text-xl max-w-2xl mx-auto mb-12">
            Don't let the winter end your journey. Webasto delivers the heat you need, wherever you park.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/store/heating-climate" className="bg-brand-orange text-white px-10 py-5 font-display text-[12px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all font-bold shadow-2xl">
              Browse All Webasto
            </Link>
            <Link href="/planner" className="border border-brand-border text-white px-10 py-5 font-display text-[12px] uppercase tracking-widest hover:bg-brand-carbon transition-all font-bold">
              AI Build Planner
            </Link>
          </div>

          <div className="mt-24">
            <RelatedProducts products={MENTIONED_PRODUCTS} />
            
            <div className="mt-20 flex flex-wrap justify-center gap-8">
              <Link href="/guides/compare/truma-vs-webasto" className="font-mono text-[10px] text-brand-grey hover:text-brand-orange uppercase tracking-widest transition-colors flex items-center gap-2">
                Truma vs Webasto <ArrowRight className="w-3 h-3" />
              </Link>
              <Link href="/guides/webasto/air-top-installation" className="font-mono text-[10px] text-brand-grey hover:text-brand-orange uppercase tracking-widest transition-colors flex items-center gap-2">
                Air Top Installation <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
