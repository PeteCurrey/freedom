import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { VictronSidebar } from "@/components/editorial/VictronSidebar";
import { RelatedProducts } from "@/components/editorial/RelatedProducts";
import { ArrowRight, Zap, Battery, Sun, Monitor, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Victron System Guide UK | Which System Do You Need? | Amplios",
  description: "Five Victron off-grid electrical systems sized for every van build. Adapted for UK 230V 50Hz. From weekend starter kits to full off-grid expedition vehicles.",
  openGraph: {
    title: "Victron System Guide UK | Which System Do You Need? | Amplios",
    description: "Five Victron off-grid electrical systems adapted for UK 230V. Starter to expedition builds.",
    url: "https://amplios.co.uk/guides/victron-system-guide",
  },
  alternates: { canonical: "https://amplios.co.uk/guides/victron-system-guide" },
};

const TOC = [
  { id: "intro", label: "Introduction" },
  { id: "system-1", label: "System 1: The Starter" },
  { id: "system-2", label: "System 2: The Weekender" },
  { id: "system-3", label: "System 3: The Tourer" },
  { id: "system-4", label: "System 4: The Expedition" },
  { id: "system-5", label: "System 5: The Off-Grid Mansion" },
  { id: "comparison", label: "System Comparison" },
  { id: "decision", label: "Which System For You?" },
];

const SYSTEMS = [
  {
    id: "system-1",
    badge: "SYSTEM 1",
    name: "The Starter",
    voltage: "12V / 1.2kVA",
    bestFor: "First-time builders, weekend use, smaller vans (Transit Custom, etc.)",
    cost: "£1,200–£1,600",
    weight: "~20kg",
    components: [
      "Victron Phoenix 12/1200 230V inverter (1.2kVA pure sine wave)",
      "SmartSolar MPPT 75/15 (up to 220W panels)",
      "Lithium SuperPack 12.8V/100Ah (1,280Wh)",
      "BMV-712 Smart battery monitor",
      "Blue Smart IP22 12V/15A shore power charger",
      "Smart BatteryProtect 12/24V-65A",
    ],
    powers: "LED lights, 12V compressor fridge, phone & laptop charging, 12V accessories. No 230V induction cooking.",
    note: "Start simple. The SmartSolar MPPT means adding more panels later is easy. The battery can be paralleled with a second unit when you're ready to expand.",
    accent: "border-l-4 border-blue-500",
  },
  {
    id: "system-2",
    badge: "SYSTEM 2",
    name: "The Weekender",
    voltage: "12V / 2kVA",
    bestFor: "Regular weekenders, 3-season van life, VW Transporter/Crafter",
    cost: "£2,200–£2,800",
    weight: "~40kg inc. batteries",
    components: [
      "MultiPlus 12/2000/80-50 230V (2kVA, 80A charger)",
      "SmartSolar MPPT 100/30 (up to 440W panels)",
      "2× Lithium SuperPack 12.8V/100Ah (2,560Wh)",
      "SmartShunt 500A battery monitor",
      "GlobalLink 520 (5 years free 4G remote monitoring)",
      "Smart BatteryProtect 12/24V-100A",
    ],
    powers: "All of System 1 + small appliances (hair dryer, microwave), e-bike charging, extended off-grid periods.",
    note: "The MultiPlus replaces separate inverter and charger. PowerAssist and PowerControl mean you won't trip the hookup breaker.",
    accent: "border-l-4 border-green-500",
  },
  {
    id: "system-3",
    badge: "SYSTEM 3 — MOST POPULAR",
    name: "The Tourer",
    voltage: "12V / 3kVA",
    bestFor: "Sprinter/Crafter full-time builds, serious 4-season touring",
    cost: "£5,500–£7,500",
    weight: "~85kg inc. batteries",
    highlight: true,
    components: [
      "MultiPlus-II 12/3000/120-32 230V — the UK/EU variant (3kVA, 120A charger)",
      "SmartSolar MPPT 100/50 (up to 700W panels)",
      "2× LiFePO4 Smart 12.8V/200Ah (5,120Wh total)",
      "Orion XS 12/12-50A DC-DC charger (alternator charging)",
      "Cerbo GX + GX Touch 50 touchscreen monitor",
      "SmartShunt 500A + VE.Bus BMS V2 + Lynx Distributor",
      "Blue Smart IP65 12V/5A topping charger",
    ],
    powers: "Induction hob, air conditioning, large flatscreen, microwave, coffee machine — full household comfort. 200Ah ×2 lithium bank provides 3–4 days of modest use without solar or alternator.",
    note: "This is the system we specify in our Full Autonomy tier. The MultiPlus-II integrates inverter, charger, and transfer switch in one unit. Cerbo GX + GX Touch 50 provides a full touchscreen dashboard of your entire system.",
    cta: { label: "Explore Full Autonomy Kit →", href: "/store/kits" },
    accent: "border-l-4 border-brand-orange",
  },
  {
    id: "system-4",
    badge: "SYSTEM 4",
    name: "The Expedition",
    voltage: "24V / 3kVA",
    bestFor: "High-power builds, large Sprinter/Iveco Daily, extended off-grid expeditions",
    cost: "£6,500–£9,000",
    weight: "~100kg inc. batteries",
    components: [
      "MultiPlus-II 24/3000/70-32 230V inverter/charger",
      "SmartSolar MPPT 150/60-Tr (up to 1,720W panels)",
      "2× LiFePO4 Smart 25.6V/200Ah",
      "2× Orion-Tr Smart 12/24V-15A DC-DC chargers",
      "Orion-Tr 24/12-30A converter (powers 12V loads from 24V bank)",
      "Cerbo GX + GX Touch 50",
    ],
    powers: "All of System 3 at higher efficiency over longer cable runs. A 24V system handles the same power with half the current — thinner cables, less voltage drop.",
    note: "Why 24V? A 24V system handles the same power load as 12V but with half the current, meaning thinner cables, less voltage drop, and better efficiency over longer cable runs.",
    accent: "border-l-4 border-purple-500",
  },
  {
    id: "system-5",
    badge: "SYSTEM 5",
    name: "The Off-Grid Mansion",
    voltage: "24V / 10kVA",
    bestFor: "Large motorhome conversions, expedition vehicles, air conditioning, induction cooking, washing machines",
    cost: "£15,000–£20,000",
    weight: "~200kg inc. batteries",
    components: [
      "2× Quattro 24/5000/120-100/100 230V (10kVA combined)",
      "SmartSolar MPPT 150/100-Tr VE.Can (up to 2,900W panels)",
      "4× LiFePO4 Smart 25.6V/200Ah (20,480Wh total)",
      "Lynx Smart BMS 1000 + 3× Lynx Distributor",
      "Cerbo GX + GX Touch 70 (7 inch touchscreen)",
    ],
    powers: "Multiple air conditioning units simultaneously, full kitchen appliances, washing machine, all from battery + solar. The Quattro has two AC inputs — grid AND generator — automatically selecting the best.",
    note: "The Quattro differs from the MultiPlus in one key way: two AC inputs (grid AND generator), automatically selecting the best available source. Two in parallel deliver 10kVA.",
    accent: "border-l-4 border-red-500",
  },
];

const MENTIONED_PRODUCTS = [
  { name: "MultiPlus-II 12/3000/120-32", brand: "Victron Energy", price: 124500, slug: "victron-multiplus-ii-12-3000-120-32" },
  { name: "SmartSolar MPPT 100/50", brand: "Victron Energy", price: 28500, slug: "victron-smartsolar-100-50" },
  { name: "Orion-Tr Smart DC-DC 12/12-30", brand: "Victron Energy", price: 19500, slug: "victron-orion-tr-smart-30" },
  { name: "Cerbo GX", brand: "Victron Energy", price: 29500, slug: "victron-cerbo-gx" },
];

export default function VictronSystemGuide() {
  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-[60vh] bg-brand-carbon flex items-end pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/40 via-brand-obsidian to-brand-carbon" />
        <div className="absolute inset-0">
          <div className="absolute bottom-0 left-0 w-1/2 h-[2px] bg-brand-orange" />
        </div>
        <div className="relative container mx-auto px-6 pb-16">
          <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em] mb-4 block">
            // VICTRON SYSTEM GUIDE
          </span>
          <h1 className="font-display text-4xl lg:text-6xl uppercase tracking-tight text-brand-white leading-[1] mb-4">
            Which Victron System<br />Do You Need?
          </h1>
          <p className="font-sans text-brand-grey text-lg max-w-2xl">
            Five pre-configured off-grid systems, sized from weekend explorers to full-time autonomous living.
            All adapted for UK 230V 50Hz.
          </p>
        </div>
      </section>

      {/* CONTENT + SIDEBAR */}
      <div className="container mx-auto px-6 py-16">
        <div className="flex gap-12">
          <div className="flex-1 min-w-0">

            {/* INTRO */}
            <section id="intro" className="mb-16 scroll-mt-28">
              <p className="font-sans text-brand-grey text-base leading-relaxed max-w-3xl">
                Victron Energy designs its off-grid systems as modular building blocks. Rather than specifying
                components individually — which leads to compatibility errors and performance compromises —
                they publish five reference system configurations covering the most common use cases.
                We've adapted these for UK 230V installation and added our own van conversion context.
              </p>
            </section>

            {/* SYSTEMS */}
            {SYSTEMS.map((system) => (
              <section key={system.id} id={system.id} className="mb-16 scroll-mt-28">
                <div className={`bg-brand-carbon ${system.accent} p-8 ${system.highlight ? "border border-brand-orange/30" : "border border-brand-border"}`}>
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                    <div>
                      <span className={`font-mono text-[9px] uppercase tracking-[0.3em] mb-2 block ${system.highlight ? "text-brand-orange" : "text-brand-grey"}`}>
                        {system.badge}
                      </span>
                      <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white">
                        {system.name}
                      </h2>
                      <p className="font-mono text-lg text-brand-orange mt-1">{system.voltage}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-[10px] text-brand-grey uppercase tracking-widest block mb-1">Estimated cost</span>
                      <span className="font-display text-2xl text-brand-white">{system.cost}</span>
                      <span className="font-mono text-[10px] text-brand-grey block mt-1">{system.weight}</span>
                    </div>
                  </div>

                  <div className="mb-6 p-4 bg-brand-obsidian/60 rounded-sm">
                    <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest mb-2 block">Best for</span>
                    <p className="font-sans text-brand-grey text-sm">{system.bestFor}</p>
                  </div>

                  <div className="mb-6">
                    <span className="font-mono text-[9px] text-brand-orange uppercase tracking-widest mb-3 block">Key components</span>
                    <ul className="space-y-2">
                      {system.components.map((c) => (
                        <li key={c} className="flex items-start gap-2 font-sans text-sm text-brand-grey">
                          <CheckCircle className="w-4 h-4 text-brand-orange/60 flex-shrink-0 mt-0.5" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-4 p-4 bg-brand-obsidian/60 rounded-sm">
                    <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest mb-2 block">What this powers</span>
                    <p className="font-sans text-sm text-brand-grey leading-relaxed">{system.powers}</p>
                  </div>

                  <p className="font-sans text-sm text-brand-grey/80 italic leading-relaxed mb-4">{system.note}</p>

                  {system.cta && (
                    <Link href={system.cta.href} className="inline-flex items-center gap-2 text-brand-orange font-mono text-[10px] uppercase tracking-widest hover:gap-3 transition-all">
                      {system.cta.label} <ArrowRight className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              </section>
            ))}

            {/* COMPARISON TABLE */}
            <section id="comparison" className="mb-16 scroll-mt-28">
              <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white mb-8">System Comparison</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-brand-carbon border-b border-brand-border">
                      {["System", "Power", "Storage", "Shore Power", "Solar Max", "Monitoring", "Best For"].map((h) => (
                        <th key={h} className="px-4 py-3 text-left font-mono text-[9px] text-brand-orange uppercase tracking-widest whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-border">
                    {[
                      ["1 — Starter", "1.2kVA", "1,280Wh", "16A", "220W", "BMV-712", "Weekend/small"],
                      ["2 — Weekender", "2kVA", "2,560Wh", "16A", "440W", "GlobalLink 520", "Regular touring"],
                      ["3 — Tourer ★", "3kVA", "5,120Wh", "32A", "700W", "Cerbo GX + GX50", "Full-time 12V"],
                      ["4 — Expedition", "3kVA", "~8kWh", "32A", "1,720W", "Cerbo GX + GX50", "Large vans 24V"],
                      ["5 — Off-Grid Mansion", "10kVA", "20,480Wh", "2×32A", "2,900W", "Cerbo GX + GX70", "Motorhome/AC"],
                    ].map((row, i) => (
                      <tr key={i} className={`${row[0].includes("★") ? "bg-brand-orange/5" : "bg-brand-obsidian"} hover:bg-brand-carbon transition-colors`}>
                        {row.map((cell, j) => (
                          <td key={j} className={`px-4 py-3 font-sans text-[12px] whitespace-nowrap ${j === 0 ? "text-brand-white font-medium" : "text-brand-grey"}`}>
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* DECISION GUIDE */}
            <section id="decision" className="mb-16 scroll-mt-28">
              <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white mb-6">Which System Should I Choose?</h2>
              <div className="space-y-3">
                {[
                  { condition: "Weekend use only", answer: "System 1 or 2" },
                  { condition: "Regular touring, no induction cooking", answer: "System 2 or 3" },
                  { condition: "Full-time with induction cooking", answer: "System 3 (The Tourer)" },
                  { condition: "Very large van or extended off-grid", answer: "System 4" },
                  { condition: "Full motorhome / serious AC use", answer: "System 5" },
                ].map((item) => (
                  <div key={item.condition} className="flex items-center gap-4 p-4 bg-brand-carbon border border-brand-border">
                    <span className="font-sans text-sm text-brand-grey flex-1">{item.condition}</span>
                    <span className="font-display text-sm uppercase text-brand-orange tracking-tight flex-shrink-0">→ {item.answer}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10 p-8 bg-brand-carbon border border-brand-border/50 text-center">
                <p className="font-sans text-brand-grey mb-6">Not sure which system is right for your build?</p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link href="/planner" className="inline-flex items-center gap-2 bg-brand-orange text-white px-6 py-3 font-display text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all font-bold">
                    Open the Build Planner <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link href="/planner" className="inline-flex items-center gap-2 border border-brand-border text-brand-white px-6 py-3 font-display text-[10px] uppercase tracking-widest hover:border-brand-orange transition-all font-bold">
                    Ask the AI Build Advisor
                  </Link>
                </div>
              </div>
            </section>

            {/* RELATED GUIDES */}
            <div className="pt-12 border-t border-brand-border">
              <RelatedProducts products={MENTIONED_PRODUCTS} />
              
              <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest mb-4 mt-16 block">Related Guides</span>
              <div className="flex flex-wrap gap-4">
                <Link href="/brands/victron-energy" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">Victron Energy Hub →</Link>
                <Link href="/guides/victron-multiplus-ii" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">MultiPlus-II Guide →</Link>
                <Link href="/guides/victron-monitoring" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">Monitoring Guide →</Link>
                <Link href="/guides/why-victron-energy" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">Is Victron Worth It? →</Link>
              </div>
            </div>
          </div>

          <VictronSidebar items={TOC} currentPage="/guides/victron-system-guide" />
        </div>
      </div>

      <Footer />
    </main>
  );
}
