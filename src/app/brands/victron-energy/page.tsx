import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RelatedProducts } from "@/components/editorial/RelatedProducts";
import { ArrowRight, Shield, Zap, Globe, TrendingUp, Cpu, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Victron Energy UK | Authorised Stockist | Amplios",
  description: "Amplios is an authorised UK stockist of the full Victron Energy range. Shop MultiPlus-II, SmartSolar MPPT, LiFePO4 batteries, Cerbo GX and more.",
  openGraph: {
    title: "Victron Energy UK | Authorised Stockist | Amplios",
    description: "Amplios is an authorised UK stockist of the full Victron Energy range.",
    url: "https://amplios.co.uk/brands/victron-energy",
  },
  alternates: { canonical: "https://amplios.co.uk/brands/victron-energy" },
};

const WHY_VICTRON = [
  {
    icon: Cpu,
    title: "It's not one thing that makes it work",
    body: "Modular, robust, connected. Victron systems are built from components that talk to each other — the SmartShunt reports to the Cerbo GX, the MPPT synchronises with the MultiPlus, and you monitor everything from your phone.",
  },
  {
    icon: Shield,
    title: "Reliability powers long service life cycles",
    body: "Victron components are spec'd to handle double their continuous rating as peak load. The 5-year warranty (10 years on eligible products) isn't a marketing claim — it's backed by Dutch engineering and a global repair network.",
  },
  {
    icon: TrendingUp,
    title: "Efficiency translates into cost-effectiveness",
    body: "The SmartSolar MPPT controllers achieve up to 99% conversion efficiency. Over a 5-year build life, that difference versus cheaper alternatives adds up to meaningful kWh recovered.",
  },
  {
    icon: Zap,
    title: "Intelligent monitoring means optimised systems",
    body: "The free VictronConnect app and VRM portal give you live battery state of charge, solar input, AC load, and remote alarm notifications from anywhere in the world.",
  },
  {
    icon: Globe,
    title: "A global support network is by your side",
    body: "Over 1,000 trained distributors, installers, and service partners worldwide. In the UK, Amplios and our authorised installer network provide direct access to Victron technical support.",
  },
];

const STATS = [
  { value: "45+", label: "Years of manufacturing" },
  { value: "1M+", label: "Users worldwide" },
  { value: "5yr", label: "Warranty standard" },
  { value: "UK", label: "Dealer & support network" },
];

const PRODUCT_RANGE = [
  {
    name: "Inverters & Chargers",
    desc: "MultiPlus-II range — the heart of any serious system",
    href: "/store/electrical-core?sub=inverters",
  },
  {
    name: "Solar Chargers (MPPT)",
    desc: "SmartSolar range — from 15A entry-level to 100A+",
    href: "/store/electrical-core?sub=solar-controllers",
  },
  {
    name: "LiFePO4 Batteries",
    desc: "Lithium Smart range with built-in BMS and Bluetooth",
    href: "/store/electrical-core?sub=batteries",
  },
  {
    name: "System Monitoring",
    desc: "Cerbo GX, GX Touch 70, and the free VRM portal",
    href: "/store/electrical-core?sub=monitoring",
  },
  {
    name: "DC-DC Chargers",
    desc: "Orion-Tr Smart — alternator to leisure battery charging",
    href: "/store/electrical-core?sub=dc-dc-chargers",
  },
  {
    name: "Distribution & Protection",
    desc: "Lynx Distributor, Smart BatteryProtect, SmartShunt",
    href: "/store/electrical-core?sub=distribution",
  },
];

const MENTIONED_PRODUCTS = [
  { name: "MultiPlus-II 12/3000/120-32", brand: "Victron Energy", price: 124500, slug: "victron-multiplus-ii-12-3000-120-32" },
  { name: "SmartSolar MPPT 100/50", brand: "Victron Energy", price: 28500, slug: "victron-smartsolar-100-50" },
  { name: "Cerbo GX", brand: "Victron Energy", price: 29500, slug: "victron-cerbo-gx" },
];

export default function VictronEnergyBrandHub() {
  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-[70vh] flex items-end">
        <div className="absolute inset-0 bg-brand-carbon">
          <Image
            src="/images/victron/brand-hero.jpg"
            alt="Victron Energy full product range"
            fill
            className="object-cover opacity-60"
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
            VICTRON ENERGY
          </h1>
          <p className="font-display text-xl lg:text-2xl text-brand-grey italic mb-2">
            Blue Power. Built to Perform. Engineered to Last.
          </p>
          <p className="font-sans text-brand-grey/80 text-base mb-8 max-w-xl">
            Amplios is an authorised UK stockist of the full Victron Energy range.
          </p>
          <Link
            href="/store/electrical-core"
            className="inline-flex items-center gap-3 bg-brand-orange text-white px-8 py-4 font-display text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all font-bold"
          >
            Shop Victron Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* INTRO 2-COL */}
      <section className="py-20 border-t border-brand-border">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <span className="font-mono text-[9px] text-brand-orange uppercase tracking-[0.3em] mb-4 block">
                // BRAND STORY
              </span>
              <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-6">
                Built on one principle
              </h2>
              <div className="space-y-4 font-sans text-brand-grey text-base leading-relaxed">
                <p>
                  Since 1975, Victron Energy has built its reputation on one principle: systems that work,
                  everywhere, every time. Founded in the Netherlands and now trusted by over one million users
                  worldwide, Victron's off-grid power products are the first choice for serious van conversions,
                  boats, remote cabins, and mobile installations where reliability is non-negotiable.
                </p>
                <p>
                  Every component in the Victron range is designed to integrate with every other. From a basic
                  SmartSolar MPPT controller to a full MultiPlus-II inverter/charger with Cerbo GX monitoring
                  — the system grows with your needs without ever having to start again.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {STATS.map((stat) => (
                <div key={stat.label} className="bg-brand-carbon border border-brand-border p-6 flex flex-col items-center justify-center text-center">
                  <span className="font-display text-4xl text-brand-orange mb-2">{stat.value}</span>
                  <span className="font-mono text-[10px] text-brand-grey uppercase tracking-widest">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY VICTRON */}
      <section className="py-20 bg-brand-carbon border-y border-brand-border">
        <div className="container mx-auto px-6">
          <div className="mb-12">
            <span className="font-mono text-[9px] text-brand-orange uppercase tracking-[0.3em] mb-2 block">
              // WHY VICTRON?
            </span>
            <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white">
              Five reasons the serious builders choose Victron
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_VICTRON.map((item) => (
              <div key={item.title} className="bg-brand-obsidian border border-brand-border p-6">
                <item.icon className="w-6 h-6 text-brand-orange mb-4" />
                <h3 className="font-display text-sm uppercase tracking-tight text-brand-white mb-3">
                  {item.title}
                </h3>
                <p className="font-sans text-brand-grey text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
            {/* 6th cell: cross-link */}
            <div className="bg-brand-obsidian border border-brand-orange/40 p-6 flex flex-col justify-between">
              <div>
                <span className="font-mono text-[9px] text-brand-orange uppercase tracking-widest mb-2 block">More detail</span>
                <h3 className="font-display text-sm uppercase tracking-tight text-brand-white mb-3">
                  Is Victron worth the money?
                </h3>
                <p className="font-sans text-brand-grey text-sm leading-relaxed">
                  We do an honest, independent breakdown of the cost argument — including when Victron is NOT the answer.
                </p>
              </div>
              <Link href="/guides/why-victron-energy" className="inline-flex items-center gap-2 mt-4 text-brand-orange font-mono text-[10px] uppercase tracking-widest hover:gap-3 transition-all">
                Read the assessment <ArrowRight className="w-3 h-3" />
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
              Shop by Victron category
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

      {/* LIFESTYLE STRIP */}
      <section className="py-20 bg-brand-carbon border-b border-brand-border">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-3 gap-4 h-[280px]">
            {[
              { label: "Serious builds, anywhere", bg: "bg-[#1a1f2e]" },
              { label: "Off-grid. On your terms.", bg: "bg-[#111827]" },
              { label: "Power that travels with you.", bg: "bg-[#0f172a]" },
            ].map((item, i) => (
              <div key={i} className={`${item.bg} border border-brand-border relative overflow-hidden flex items-end p-6`}>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-transparent" />
                <span className="relative font-display text-lg uppercase tracking-tight text-brand-white/70 italic">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-20 bg-[#111] border-b border-brand-border">
        <div className="container mx-auto px-6 text-center">
          <div className="w-12 h-[2px] bg-brand-orange mx-auto mb-8" />
          <h2 className="font-display text-3xl lg:text-4xl uppercase tracking-tight text-brand-white mb-4">
            Browse the full Victron Energy range
          </h2>
          <p className="font-sans text-brand-grey text-lg mb-10 max-w-2xl mx-auto">
            Amplios is the UK's specialist motorhome conversion store — and an authorised Victron Energy stockist.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/store/electrical-core" className="inline-flex items-center gap-3 bg-brand-orange text-white px-8 py-4 font-display text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all font-bold">
              Shop All Victron <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/planner" className="inline-flex items-center gap-3 border border-brand-border text-brand-white px-8 py-4 font-display text-[10px] uppercase tracking-widest hover:border-brand-orange transition-all font-bold">
              Get a System Quote
            </Link>
          </div>

          <div className="mt-16 pt-10 border-t border-brand-border/40">
            <RelatedProducts products={MENTIONED_PRODUCTS} />
            
            <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest mb-6 mt-16 block">Related guides</span>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/guides/victron-system-guide" className="font-sans text-sm text-brand-grey hover:text-brand-orange transition-colors">System Selector Guide →</Link>
              <Link href="/guides/victron-multiplus-ii" className="font-sans text-sm text-brand-grey hover:text-brand-orange transition-colors">MultiPlus-II Guide →</Link>
              <Link href="/guides/victron-monitoring" className="font-sans text-sm text-brand-grey hover:text-brand-orange transition-colors">Monitoring Guide →</Link>
              <Link href="/guides/why-victron-energy" className="font-sans text-sm text-brand-grey hover:text-brand-orange transition-colors">Is Victron Worth It? →</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
