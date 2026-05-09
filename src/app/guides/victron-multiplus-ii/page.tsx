import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { VictronSidebar } from "@/components/editorial/VictronSidebar";
import { RelatedProducts } from "@/components/editorial/RelatedProducts";
import { ArrowRight, Zap, ShieldCheck, RefreshCw, ToggleRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Victron MultiPlus-II Guide UK | Inverter Charger Review | Amplios",
  description: "Complete guide to the Victron MultiPlus-II for UK campervan conversions. 12V vs 24V variants, PowerAssist, installation, and which model to choose.",
  openGraph: {
    title: "Victron MultiPlus-II Guide UK | Inverter Charger Review | Amplios",
    description: "Complete guide to the Victron MultiPlus-II for UK campervan conversions.",
    url: "https://amplios.co.uk/guides/victron-multiplus-ii",
  },
  alternates: { canonical: "https://amplios.co.uk/guides/victron-multiplus-ii" },
};

const TOC = [
  { id: "intro", label: "What is the MultiPlus-II?" },
  { id: "features", label: "Key Features" },
  { id: "variants", label: "Which Model?" },
  { id: "safety", label: "Protection & Safety" },
  { id: "installation", label: "Installation" },
  { id: "monitoring", label: "Monitoring" },
  { id: "shop", label: "Buy in the UK" },
];

const FEATURES = [
  {
    icon: Zap,
    title: "PowerAssist",
    body: "Shore power connection rated at 6A? The MultiPlus-II won't let that limit you. PowerAssist adds battery power on top of the available shore or generator supply, letting you run peak-demand appliances without overloading the supply. When demand drops, the charger replenishes the battery automatically.",
  },
  {
    icon: ShieldCheck,
    title: "PowerControl",
    body: "Prevents the shore power supply from being overloaded. You set the maximum input current (configurable via VictronConnect), and the MultiPlus-II automatically adjusts charger current to stay within it — protecting both your hookup connection and the site's supply.",
  },
  {
    icon: RefreshCw,
    title: "True Sine Wave Output",
    body: "Rock-solid 230V 50Hz output regardless of battery voltage. Safe for sensitive electronics — laptops, medical equipment, induction hobs. Modified sine wave inverters can damage some appliances; the MultiPlus-II never compromises.",
  },
  {
    icon: ToggleRight,
    title: "Automatic Transfer Switch",
    body: "When shore power connects, the MultiPlus-II switches to charge mode and passes shore power to your AC outlets. When shore power disconnects, it switches to inverter mode in under 20ms — most electronic equipment doesn't even notice.",
  },
];

const VARIANTS = [
  { model: "MultiPlus-II 12/1600/70-16", voltage: "12V", power: "1,600VA", charger: "70A", shore: "16A", best: "Compact builds / budget" },
  { model: "MultiPlus-II 12/3000/120-32", voltage: "12V", power: "3,000VA", charger: "120A", shore: "32A", best: "Most UK van conversions ★" },
  { model: "MultiPlus-II 24/3000/70-32", voltage: "24V", power: "3,000VA", charger: "70A", shore: "32A", best: "Large vans / long cable runs" },
  { model: "MultiPlus-II 48/3000/35-32", voltage: "48V", power: "3,000VA", charger: "35A", shore: "32A", best: "High-voltage systems" },
];

const PROTECTION = [
  "Thermal protection sensors with auto-shutdown and alarm",
  "Overload protection with configurable trip time",
  "Short circuit protection with auto-restart",
  "Battery voltage protection (low voltage disconnect)",
  "Temperature compensation for battery charging",
  "Shock and vibration resistant design (IEC 60068)",
];

const MENTIONED_PRODUCTS = [
  { name: "MultiPlus-II 12/3000/120-32", brand: "Victron Energy", price: 124500, slug: "victron-multiplus-ii-12-3000-120-32" },
  { name: "MultiPlus-II 12/1600/70-16", brand: "Victron Energy", price: 89500, slug: "victron-multiplus-ii-12-1600" },
  { name: "Cerbo GX", brand: "Victron Energy", price: 29500, slug: "victron-cerbo-gx" },
];

export default function VictronMultiPlusGuide() {
  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-[50vh] bg-brand-carbon flex items-end pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-carbon to-brand-obsidian" />
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "repeating-linear-gradient(0deg, #ff6b00 0, #ff6b00 1px, transparent 0, transparent 50%)", backgroundSize: "40px 40px" }}
        />
        <div className="relative container mx-auto px-6 pb-16">
          <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em] mb-4 block">
            // VICTRON PRODUCT GUIDE
          </span>
          <h1 className="font-display text-4xl lg:text-6xl uppercase tracking-tight text-brand-white leading-[1] mb-4">
            Victron MultiPlus-II:<br />The Complete Guide
          </h1>
          <p className="font-sans text-brand-grey text-lg max-w-2xl">
            Why it's in almost every serious UK van conversion — and whether you need the 12V or 24V variant.
          </p>
        </div>
      </section>

      {/* CONTENT + SIDEBAR */}
      <div className="container mx-auto px-6 py-16">
        <div className="flex gap-12">
          <div className="flex-1 min-w-0">

            {/* INTRO */}
            <section id="intro" className="mb-16 scroll-mt-28">
              <span className="font-mono text-[9px] text-brand-orange uppercase tracking-[0.3em] mb-4 block">// WHAT IS IT?</span>
              <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white mb-6">
                Not simply an inverter
              </h2>
              <div className="space-y-4 font-sans text-brand-grey text-base leading-relaxed max-w-3xl">
                <p>
                  The MultiPlus-II is not simply an inverter. It combines four functions in a single unit: a
                  <strong className="text-brand-white"> pure sine wave inverter</strong> (converts 12V/24V DC battery
                  power to 230V AC), an <strong className="text-brand-white">adaptive battery charger</strong> (when
                  connected to shore power or generator), an <strong className="text-brand-white">automatic transfer
                  switch</strong> (switches between shore power and inverter with zero interruption), and{" "}
                  <strong className="text-brand-white">PowerAssist</strong> (boosts available shore power with battery
                  power during peak demand).
                </p>
                <p>
                  This last feature is why you don't trip the hookup breaker when running the kettle — the
                  MultiPlus bridges the gap between what the site provides and what you want to run.
                </p>
              </div>
            </section>

            {/* FEATURES */}
            <section id="features" className="mb-16 scroll-mt-28">
              <span className="font-mono text-[9px] text-brand-orange uppercase tracking-[0.3em] mb-4 block">// KEY FEATURES</span>
              <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white mb-8">
                Four functions, one unit
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {FEATURES.map((f) => (
                  <div key={f.title} className="bg-brand-carbon border border-brand-border p-6">
                    <f.icon className="w-6 h-6 text-brand-orange mb-4" />
                    <h3 className="font-display text-sm uppercase tracking-tight text-brand-white mb-3">{f.title}</h3>
                    <p className="font-sans text-brand-grey text-sm leading-relaxed">{f.body}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* VARIANTS */}
            <section id="variants" className="mb-16 scroll-mt-28">
              <span className="font-mono text-[9px] text-brand-orange uppercase tracking-[0.3em] mb-4 block">// MODEL SELECTOR</span>
              <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white mb-6">
                Which MultiPlus-II?
              </h2>
              <div className="overflow-x-auto mb-8">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-brand-carbon border-b border-brand-border">
                      {["Model", "Battery", "Power", "Charger", "Shore In", "Best For"].map((h) => (
                        <th key={h} className="px-4 py-3 text-left font-mono text-[9px] text-brand-orange uppercase tracking-widest whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-border">
                    {VARIANTS.map((v, i) => (
                      <tr key={i} className={`${v.best.includes("★") ? "bg-brand-orange/5" : "bg-brand-obsidian"} hover:bg-brand-carbon transition-colors`}>
                        <td className="px-4 py-3 font-sans text-[12px] text-brand-white font-medium whitespace-nowrap">{v.model}</td>
                        <td className="px-4 py-3 font-sans text-[12px] text-brand-grey">{v.voltage}</td>
                        <td className="px-4 py-3 font-sans text-[12px] text-brand-grey">{v.power}</td>
                        <td className="px-4 py-3 font-sans text-[12px] text-brand-grey">{v.charger}</td>
                        <td className="px-4 py-3 font-sans text-[12px] text-brand-grey">{v.shore}</td>
                        <td className="px-4 py-3 font-sans text-[12px] text-brand-grey">{v.best}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-6 bg-brand-carbon border border-brand-orange/30">
                <p className="font-sans text-brand-grey text-sm leading-relaxed">
                  <strong className="text-brand-white">For most UK van conversions, the 12/3000/120-32 is the right choice.</strong>{" "}
                  The 3kVA rating handles induction hobs (1,500–2,000W), and the 120A charger fully charges a 200Ah LiFePO4
                  bank in under 2 hours on 32A hookup. The 12/1600/70-16 suits smaller builds or tighter budgets.
                  24V becomes worthwhile for large Sprinter builds with long cable runs.
                </p>
              </div>
            </section>

            {/* PROTECTION */}
            <section id="safety" className="mb-16 scroll-mt-28">
              <span className="font-mono text-[9px] text-brand-orange uppercase tracking-[0.3em] mb-4 block">// SAFETY</span>
              <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white mb-6">
                Protection & safety features
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {PROTECTION.map((p) => (
                  <div key={p} className="flex items-start gap-3 p-4 bg-brand-carbon border border-brand-border">
                    <ShieldCheck className="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" />
                    <span className="font-sans text-sm text-brand-grey">{p}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* INSTALLATION */}
            <section id="installation" className="mb-16 scroll-mt-28">
              <span className="font-mono text-[9px] text-brand-orange uppercase tracking-[0.3em] mb-4 block">// INSTALLATION</span>
              <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white mb-6">
                DIY-friendly with professional documentation
              </h2>
              <div className="space-y-4 font-sans text-brand-grey text-base leading-relaxed max-w-3xl">
                <p>
                  The MultiPlus-II is designed for DIY installation by competent builders. Victron's documentation
                  is exceptional — system schematic drawings, wiring guides, and commissioning checklists are available
                  at victronenergy.com.
                </p>
                <p>
                  The unit requires a secure mounting surface, cable runs to the battery bank (using appropriate mm²
                  cable for the current — minimum 70mm² for the 3000VA model), and a VE.Bus cable to any Cerbo GX or
                  GX Touch. For initial configuration, the free VictronConnect app connects via Bluetooth directly to
                  the unit — no laptop required.
                </p>
              </div>
            </section>

            {/* MONITORING */}
            <section id="monitoring" className="mb-12 scroll-mt-28">
              <span className="font-mono text-[9px] text-brand-orange uppercase tracking-[0.3em] mb-4 block">// MONITORING</span>
              <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white mb-4">
                Complete monitoring via Cerbo GX
              </h2>
              <p className="font-sans text-brand-grey text-base leading-relaxed max-w-3xl mb-6">
                Pair the MultiPlus-II with a Cerbo GX to unlock full system-level monitoring — battery state of charge,
                AC input and output, solar yield, and remote access via the VRM portal. Read our full monitoring guide for details.
              </p>
              <Link href="/guides/victron-monitoring" className="inline-flex items-center gap-2 text-brand-orange font-mono text-[10px] uppercase tracking-widest hover:gap-3 transition-all">
                Read the Victron Monitoring Guide <ArrowRight className="w-3 h-3" />
              </Link>
            </section>

            {/* SHOP CTA */}
            <section id="shop" className="mb-12 scroll-mt-28 p-8 bg-brand-carbon border border-brand-orange/40">
              <span className="font-mono text-[9px] text-brand-orange uppercase tracking-[0.3em] mb-2 block">// BUY IN THE UK</span>
              <h2 className="font-display text-xl uppercase tracking-tight text-brand-white mb-3">
                Available from Amplios — UK authorised Victron stockist
              </h2>
              <p className="font-sans text-brand-grey text-sm mb-6">
                The Victron MultiPlus-II 12/3000/120-32 is available with UK plug-in support and next-day delivery.
              </p>
              <Link href="/store/electrical-core" className="inline-flex items-center gap-2 bg-brand-orange text-white px-6 py-3 font-display text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all font-bold">
                View MultiPlus-II in Store <ArrowRight className="w-4 h-4" />
              </Link>
            </section>

            {/* RELATED GUIDES */}
            <div className="pt-12 border-t border-brand-border">
              <RelatedProducts products={MENTIONED_PRODUCTS} />
              
              <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest mb-4 mt-16 block">Related Guides</span>
              <div className="flex flex-wrap gap-4">
                <Link href="/brands/victron-energy" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">Victron Energy Hub →</Link>
                <Link href="/guides/victron-system-guide" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">System Selector Guide →</Link>
                <Link href="/guides/victron-monitoring" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">Monitoring Guide →</Link>
                <Link href="/guides/why-victron-energy" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">Is Victron Worth It? →</Link>
              </div>
            </div>
          </div>

          <VictronSidebar items={TOC} currentPage="/guides/victron-multiplus-ii" />
        </div>
      </div>

      <Footer />
    </main>
  );
}
