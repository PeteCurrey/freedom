import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, Zap, ShieldCheck, Battery, Sun, Info, CheckCircle, Gauge, Cable } from "lucide-react";

export const metadata: Metadata = {
  title: "Complete Campervan Electrical Guide UK | 12V & 240V | Amplios",
  description: "The definitive guide to campervan electrical systems. Learn about Victron power, lithium batteries, solar charging, and safe 230V UK hookups.",
  openGraph: {
    title: "Complete Campervan Electrical Guide UK | 12V & 240V",
    description: "Master your van's power system with our technical deep-dive.",
    url: "https://amplios.co.uk/guides/campervan-electrical-guide",
  },
  alternates: { canonical: "https://amplios.co.uk/guides/campervan-electrical-guide" },
};

export default function ElectricalGuide() {
  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[60vh] flex items-end pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/cat-power.png" // Placeholder
            alt="Van Electrical System"
            fill
            className="object-cover opacity-30 grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian via-brand-obsidian/40 to-transparent" />
        </div>
        
        <div className="relative container mx-auto px-6 pb-20 z-10">
          <div className="max-w-4xl">
            <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em] mb-6 block leading-none">
              // THE POWER HUB
            </span>
            <h1 className="font-display text-5xl lg:text-9xl uppercase tracking-tighter text-brand-white leading-[0.85] mb-8">
              POWER<br />THE<br /><span className="text-brand-orange">DREAM</span>
            </h1>
            <p className="font-sans text-brand-grey text-lg lg:text-2xl leading-relaxed max-w-2xl italic border-l-2 border-brand-orange pl-6">
              A campervan's electrical system is its heart. From 12V DC circuits 
              to 230V AC mains, we break down the logic of safe, reliable, 
              off-grid power.
            </p>
          </div>
        </div>
      </section>

      {/* THREE PILLARS SECTION */}
      <section className="py-24 bg-brand-carbon">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {[
              { icon: Battery, title: "Storage", desc: "Choosing between Lead-Acid, AGM, and Lithium. Why LiFePO4 is the only choice for modern builds." },
              { icon: Sun, title: "Generation", desc: "Solar, Alternator (DC-DC), and Hookup. Managing your energy harvest for true off-grid freedom." },
              { icon: Zap, title: "Distribution", desc: "Inverters, fuse boxes, and the essential safety math behind cable sizing and protection." },
            ].map((pillar) => (
              <div key={pillar.title} className="p-10 border border-brand-border bg-brand-obsidian space-y-6">
                <pillar.icon className="w-8 h-8 text-brand-orange" />
                <h3 className="font-display text-2xl uppercase text-brand-white">{pillar.title}</h3>
                <p className="font-sans text-brand-grey text-sm leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECHNICAL CONTENT */}
      <div className="container mx-auto px-6 py-32">
        <div className="max-w-4xl mx-auto">
          
          <section className="mb-24">
            <h2 className="font-display text-4xl uppercase tracking-tight text-brand-white mb-8">The 12V vs 230V Debate</h2>
            <div className="prose prose-invert max-w-none font-sans text-brand-grey text-lg leading-relaxed space-y-6">
              <p>
                In a UK campervan, you are managing two distinct systems. The **12V DC** 
                system runs your lights, fridge, and pumps directly from your leisure 
                batteries. The **230V AC** system provides domestic-style power 
                sockets, either from an external hookup or via an **Inverter**.
              </p>
              <div className="bg-brand-carbon p-8 border-l-4 border-brand-orange italic">
                "Rule of Thumb: If it generates heat (kettles, hair dryers, heaters), 
                it is probably too hungry for your 12V battery. Use gas for heating 
                and cooking where possible."
              </div>
            </div>
          </section>

          <section className="mb-24">
            <h2 className="font-display text-4xl uppercase tracking-tight text-brand-white mb-8">Solar: The Harvest</h2>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="space-y-4">
                <h4 className="font-display text-sm uppercase text-brand-orange">MPPT vs PWM</h4>
                <p className="font-sans text-brand-grey text-sm leading-relaxed">
                  Always choose an **MPPT controller** (like the Victron SmartSolar 
                  range). They are up to 30% more efficient than PWM, particularly 
                  in the overcast conditions common in the UK.
                </p>
              </div>
              <div className="space-y-4">
                <h4 className="font-display text-sm uppercase text-brand-orange">Sizing Your Array</h4>
                <p className="font-sans text-brand-grey text-sm leading-relaxed">
                  For a year-round UK van, we recommend at least **200W - 300W** 
                   of solar to keep your fridge running during the shorter 
                  winter days.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-24">
            <h2 className="font-display text-4xl uppercase tracking-tight text-brand-white mb-8">Safety & Protection</h2>
            <div className="space-y-6">
              <div className="flex gap-6 p-8 border border-brand-border bg-brand-carbon/50">
                <ShieldCheck className="w-6 h-6 text-brand-orange flex-shrink-0" />
                <div>
                  <h4 className="font-display text-sm uppercase text-brand-white mb-2">Fuses are for Wires, Not Devices</h4>
                  <p className="text-xs text-brand-grey font-sans">A fuse protects the cable from overheating and starting a fire. Always fuse as close to the battery as possible.</p>
                </div>
              </div>
              <div className="flex gap-6 p-8 border border-brand-border bg-brand-carbon/50">
                <Cable className="w-6 h-6 text-brand-orange flex-shrink-0" />
                <div>
                  <h4 className="font-display text-sm uppercase text-brand-white mb-2">The Voltage Drop Trap</h4>
                  <p className="text-xs text-brand-grey font-sans">Thin 12V wires cause voltage to drop over distance. Always size up your cables using a technical calculator.</p>
                </div>
              </div>
            </div>
          </section>

          {/* INTERNAL LINKS */}
          <div className="mt-20 pt-10 border-t border-brand-border/40">
            <h4 className="font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-8">Deep dive resources</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/brands/victron-energy" className="p-6 border border-brand-border hover:border-brand-orange transition-colors flex items-center justify-between group">
                <span className="font-display text-xs uppercase text-brand-white">Victron Energy Hub</span>
                <ArrowRight className="w-4 h-4 text-brand-orange group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/tools/cable-calculator" className="p-6 border border-brand-border hover:border-brand-orange transition-colors flex items-center justify-between group">
                <span className="font-display text-xs uppercase text-brand-white">Cable Sizing Tool</span>
                <ArrowRight className="w-4 h-4 text-brand-orange group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* CTA SECTION */}
      <section className="py-32 bg-brand-orange">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-display text-4xl lg:text-7xl uppercase tracking-tighter text-brand-obsidian mb-8 leading-none">
            SPEC YOUR<br />SYSTEM NOW
          </h2>
          <p className="font-sans text-brand-obsidian/80 text-lg mb-12 max-w-2xl mx-auto italic">
            Use our AI Build Planner to generate a complete electrical 
            schematic and component list for your specific van.
          </p>
          <Link href="/planner" className="bg-brand-obsidian text-white px-12 py-6 font-display text-sm uppercase tracking-widest hover:bg-white hover:text-brand-obsidian transition-all">
            Start Build Planner
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
