"use client";

import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Zap, Thermometer, Droplets, Shield, Layers, Layout, ChevronRight } from "lucide-react";

const systems = [
  { index: 1, name: "ELECTRICAL & SOLAR", slug: "electrical-solar", icon: Zap, description: "From basic 12V lighting to full 230V induction systems with Victron Multiplus and Lithium banks.", tagline: "Power Your Independence" },
  { index: 2, name: "HEATING & HOT WATER", slug: "heating-hot-water", icon: Thermometer, description: "Year-round comfort with diesel, gas, and electric heating solutions from Truma and Webasto.", tagline: "Climate Control for Any Mission" },
  { index: 3, name: "WATER & PLUMBING", slug: "water-plumbing", icon: Droplets, description: "Fresh and grey water management, luxury showers, and filtered drinking water systems.", tagline: "Flowing Without Constraints" },
  { index: 4, name: "INSULATION & VENT", slug: "insulation-ventilation", icon: Layers, description: "Sound deadening, moisture control, and thermal efficiency for every season.", tagline: "The Foundation of Comfort" },
  { index: 5, name: "GAS & LPG", slug: "gas-lpg", icon: Shield, description: "Safe and efficient LPG systems for cooking and heating, including underslung tank configurations.", tagline: "Fueling the Adventure" },
  { index: 6, name: "INTERIOR & FURNITURE", slug: "interior-furniture", icon: Layout, description: "Lightweight cabinetry, precision CNC furniture, and premium conversion finishing.", tagline: "Design the Core" },
];

export default function SystemsPage() {
  return (
    <main className="bg-brand-obsidian">
      <Navbar />
      <section className="pt-48 pb-32">
        <div className="container mx-auto px-6">
          <h1 className="font-display text-6xl lg:text-8xl mb-12">ENGINEER YOUR <span className="text-brand-orange">FREEDOM</span></h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {systems.map((s) => (
              <Link key={s.slug} href={`/systems/${s.slug}`} className="group blueprint-border p-12 bg-brand-carbon hover:bg-brand-graphite transition-all">
                <div className="flex justify-between items-start mb-16">
                  <div className="w-16 h-16 bg-brand-obsidian border border-brand-border flex items-center justify-center text-brand-orange group-hover:scale-110 transition-transform">
                    <s.icon className="w-8 h-8" />
                  </div>
                  <span className="font-mono text-[10px] text-brand-grey">0{s.index} {"//"} TECHNICAL MODULE</span>
                </div>
                <h3 className="font-display text-3xl mb-4 group-hover:text-brand-orange transition-colors">{s.name}</h3>
                <p className="font-mono text-[10px] text-brand-orange uppercase tracking-widest mb-6 opacity-60">{s.tagline}</p>
                <p className="font-sans text-brand-grey text-sm leading-relaxed mb-12">{s.description}</p>
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-brand-white">
                  Enter System Deep-Dive <ChevronRight className="w-4 h-4 text-brand-orange" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
