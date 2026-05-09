import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { VictronSidebar } from "@/components/editorial/VictronSidebar";
import { RelatedProducts } from "@/components/editorial/RelatedProducts";
import { ArrowRight, CheckCircle, XCircle, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Is Victron Energy Worth the Money? Honest Review | Amplios",
  description: "An honest answer to whether Victron is worth it vs cheaper alternatives. We sell Victron — and we'll tell you when it's not the right choice.",
  openGraph: {
    title: "Is Victron Energy Worth the Money? Honest Review | Amplios",
    description: "An honest breakdown of whether Victron Energy is worth 4x the price of cheaper alternatives.",
    url: "https://amplios.co.uk/guides/why-victron-energy",
  },
  alternates: { canonical: "https://amplios.co.uk/guides/why-victron-energy" },
};

const TOC = [
  { id: "intro", label: "The honest question" },
  { id: "ecosystem", label: "1. The Ecosystem Advantage" },
  { id: "firmware", label: "2. Firmware & Software" },
  { id: "warranty", label: "3. The 5-Year Warranty" },
  { id: "resale", label: "4. Resale Value" },
  { id: "when-not", label: "5. When Victron Isn't the Answer" },
  { id: "maths", label: "The 10-Year Argument" },
];

const MENTIONED_PRODUCTS = [
  { name: "MultiPlus-II 12/3000/120-32", brand: "Victron Energy", price: 124500, slug: "victron-multiplus-ii-12-3000-120-32" },
  { name: "SmartSolar MPPT 100/30", brand: "Victron Energy", price: 18500, slug: "victron-smartsolar-100-30" },
  { name: "SmartShunt 500A", brand: "Victron Energy", price: 11500, slug: "victron-smartshunt-500a" },
];

const REASONS = [
  {
    id: "ecosystem",
    num: "01",
    title: "The Ecosystem Advantage",
    body: `Victron components are designed to communicate with each other. When your SmartSolar MPPT, MultiPlus-II, SmartShunt, and Cerbo GX are all Victron, they share data across VE.Bus, VE.Direct, and VE.Can.

The MultiPlus knows the battery temperature from the BMS and adjusts charging accordingly. The MPPT responds to inverter load. The VRM portal shows you everything in one place.

With mixed brands, you lose this coordination — and with it, efficiency, lifespan, and reliability. The integration isn't a marketing feature; it's a genuine engineering advantage that plays out over years of use.`,
    verdict: "pro",
  },
  {
    id: "firmware",
    num: "02",
    title: "The Firmware and Software Reality",
    body: `Victron has been updating firmware on its products for decades. The VictronConnect app is regularly updated, new features are added, and known issues are resolved. Products from 2015 still receive firmware updates in 2026.

Many cheaper alternatives ship with firmware that is never updated again. For an electrical system in a van you'll live in for years, software support matters — especially as mobile phone operating systems change and new connectivity standards emerge.`,
    verdict: "pro",
  },
  {
    id: "warranty",
    num: "03",
    title: "The Five-Year Warranty",
    body: `Victron offers a 5-year warranty on power electronics (10-year on eligible products). The global repair network means if something fails, it gets fixed without argument.

Cheaper alternatives typically offer 12–18 months, and returns processes can be difficult. On a £4,000+ electrical system, warranty value alone shifts the economics considerably.

We've seen customers go back to cheaper brands expecting a like-for-like swap under warranty, only to find the model discontinued and no support offered.`,
    verdict: "pro",
  },
  {
    id: "resale",
    num: "04",
    title: "The Resale Value",
    body: `A van fitted with a Victron system holds its value. Buyers on VanLife communities and forums specifically seek out Victron-equipped builds. A van with a no-name inverter raises questions about what else was done on the cheap.

The premium you pay upfront is partially recoverable on resale. We've seen Victron-equipped vans command £500–£1,500 more than comparable builds with alternative electrical systems — based on real conversations with our customers who've resold.`,
    verdict: "pro",
  },
  {
    id: "when-not",
    num: "05",
    title: "When Victron Isn't the Answer",
    body: `For a basic weekend van — a roof rack light kit, a leisure battery for a 12V fridge, and a phone charger — Victron is overkill. A good 100Ah AGM battery, a simple MPPT controller, and a basic split charge relay does the job at a fraction of the cost.

Victron makes sense when you're investing in a system you'll live with, depend on, and potentially resell. It doesn't make sense for a £500 summer toy that you use four times a year.

We say this as people who profit from selling Victron.`,
    verdict: "con",
  },
];

export default function WhyVictronPage() {
  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-[50vh] bg-brand-carbon flex items-end pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-carbon via-brand-obsidian to-brand-obsidian" />
        {/* Grid texture */}
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "linear-gradient(to right, #ff6b00 1px, transparent 1px), linear-gradient(to bottom, #ff6b00 1px, transparent 1px)", backgroundSize: "48px 48px" }}
        />
        <div className="relative container mx-auto px-6 pb-16">
          <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em] mb-4 block">
            // HONEST ASSESSMENT
          </span>
          <h1 className="font-display text-4xl lg:text-6xl uppercase tracking-tight text-brand-white leading-[1] mb-4">
            Is Victron Energy<br />Worth the Money?
          </h1>
          <p className="font-sans text-brand-grey text-lg max-w-2xl italic">
            An honest answer from people who sell it.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16">
        <div className="flex gap-12">
          <div className="flex-1 min-w-0">

            {/* INTRO */}
            <section id="intro" className="mb-16 scroll-mt-28">
              <div className="bg-brand-carbon border border-brand-border p-8 max-w-3xl">
                <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white mb-6">
                  The honest question
                </h2>
                <div className="space-y-4 font-sans text-brand-grey text-base leading-relaxed">
                  <p>
                    Victron Energy products cost significantly more than the alternatives. A Victron MultiPlus-II
                    12/3000 costs around <strong className="text-brand-white">£1,250</strong>. A comparable
                    specification from a no-name brand costs <strong className="text-brand-white">£200–£300</strong>.
                  </p>
                  <p className="text-lg font-medium text-brand-white border-l-4 border-brand-orange pl-4">
                    So is Victron worth four times the price? Let's be direct about it.
                  </p>
                </div>
              </div>
            </section>

            {/* 5 REASONS */}
            {REASONS.map((reason) => (
              <section key={reason.id} id={reason.id} className="mb-12 scroll-mt-28">
                <div className={`border ${reason.verdict === "con" ? "border-red-500/30 bg-red-950/10" : "border-brand-border bg-brand-carbon"} p-8`}>
                  <div className="flex items-start gap-4 mb-4">
                    <span className="font-display text-4xl text-brand-orange/20 leading-none flex-shrink-0">{reason.num}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {reason.verdict === "pro" ? (
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                        )}
                        <h2 className="font-display text-xl uppercase tracking-tight text-brand-white">{reason.title}</h2>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3 font-sans text-brand-grey text-base leading-relaxed max-w-3xl">
                    {reason.body.split("\n\n").map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </div>
              </section>
            ))}

            {/* THE 10-YEAR ARGUMENT */}
            <section id="maths" className="mb-16 scroll-mt-28">
              <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white mb-6">
                The 10-Year Argument
              </h2>
              <div className="bg-brand-carbon border border-brand-border p-8 max-w-3xl">
                <p className="font-sans text-brand-grey text-base leading-relaxed mb-6">
                  A Victron MultiPlus-II 12/3000 costs ~£350 more than a comparable quality alternative.
                  Over 10 years of van life:
                </p>
                <div className="space-y-4">
                  {[
                    {
                      label: "Energy efficiency (2% better)",
                      value: "~£40/yr",
                      detail: "in solar harvest if generating 2kWh/day",
                    },
                    {
                      label: "Extended warranty (5yr vs 1yr)",
                      value: "£300–£400",
                      detail: "saved vs one replacement of a quality alternative",
                    },
                    {
                      label: "Resale premium",
                      value: "£500–£1,500",
                      detail: "builds with Victron command more at sale",
                    },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between gap-4 py-4 border-b border-brand-border/50 last:border-0">
                      <div>
                        <span className="font-sans text-sm text-brand-white block">{item.label}</span>
                        <span className="font-sans text-[11px] text-brand-grey">{item.detail}</span>
                      </div>
                      <span className="font-display text-lg text-brand-orange flex-shrink-0">{item.value}</span>
                    </div>
                  ))}
                </div>
                <p className="font-sans text-brand-grey text-sm leading-relaxed mt-6 italic border-l-4 border-brand-orange/50 pl-4">
                  The maths tends to work in Victron's favour for serious builders who plan to live with or resell their build.
                </p>
              </div>
            </section>

            {/* SHOP CTA */}
            <div className="p-8 bg-brand-carbon border border-brand-orange/40 mb-12">
              <h2 className="font-display text-xl uppercase tracking-tight text-brand-white mb-3">
                Browse the full Victron range at Amplios
              </h2>
              <p className="font-sans text-brand-grey text-sm mb-6">
                UK's authorised Victron Energy stockist — with expert technical support.
              </p>
              <Link href="/store/electrical-core" className="inline-flex items-center gap-2 bg-brand-orange text-white px-6 py-3 font-display text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all font-bold">
                Shop Victron Products <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* RELATED */}
            <div className="pt-12 border-t border-brand-border">
              <RelatedProducts products={MENTIONED_PRODUCTS} />
              
              <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest mb-4 mt-16 block">Related Guides</span>
              <div className="flex flex-wrap gap-4">
                <Link href="/brands/victron-energy" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">Victron Energy Hub →</Link>
                <Link href="/guides/victron-system-guide" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">System Selector Guide →</Link>
                <Link href="/guides/victron-multiplus-ii" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">MultiPlus-II Guide →</Link>
                <Link href="/guides/victron-monitoring" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">Monitoring Guide →</Link>
              </div>
            </div>
          </div>

          <VictronSidebar items={TOC} currentPage="/guides/why-victron-energy" />
        </div>
      </div>

      <Footer />
    </main>
  );
}
