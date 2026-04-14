"use client";

import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Zap, Thermometer, Droplets, Shield, Layers, Layout, ChevronRight } from "lucide-react";

const systems = [
  { 
    index: 1, 
    name: "ELECTRICAL & SOLAR", 
    slug: "electrical-solar", 
    icon: Zap, 
    image: "/images/systems-showcase.png",
    description: "From basic 12V lighting to full 230V induction systems with Victron Multiplus and Lithium banks.", 
    tagline: "Power Your Independence" 
  },
  { 
    index: 2, 
    name: "HEATING & HOT WATER", 
    slug: "heating-hot-water", 
    icon: Thermometer, 
    image: "/images/interior-showcase.png",
    description: "Year-round comfort with diesel, gas, and electric heating solutions from Truma and Webasto.", 
    tagline: "Climate Control for Any Mission" 
  },
  { 
    index: 3, 
    name: "WATER & PLUMBING", 
    slug: "water-plumbing", 
    icon: Droplets, 
    image: "/images/hero-background.png",
    description: "Fresh and grey water management, luxury showers, and filtered drinking water systems.", 
    tagline: "Flowing Without Constraints" 
  },
  { 
    index: 4, 
    name: "INSULATION & VENT", 
    slug: "insulation-ventilation", 
    icon: Layers, 
    image: "/images/sprinter.png",
    description: "Sound deadening, moisture control, and thermal efficiency for every season.", 
    tagline: "The Foundation of Comfort" 
  },
  { 
    index: 5, 
    name: "GAS & LPG", 
    slug: "gas-lpg", 
    icon: Shield, 
    image: "/images/transit.png",
    description: "Safe and efficient LPG systems for cooking and heating, including underslung tank configurations.", 
    tagline: "Fueling the Adventure" 
  },
  { 
    index: 6, 
    name: "INTERIOR & FURNITURE", 
    slug: "interior-furniture", 
    icon: Layout, 
    image: "/images/interior-showcase.png",
    description: "Lightweight cabinetry, precision CNC furniture, and premium conversion finishing.", 
    tagline: "Design the Core" 
  },
];

export default function SystemsPage() {
  return (
    <main className="bg-brand-obsidian">
      <Navbar />
      <section className="pt-48 pb-32 relative overflow-hidden">
        <div className="absolute inset-0 z-0 text-brand-orange/5 font-display text-[20vw] opacity-10 leading-none overflow-hidden select-none pointer-events-none">
          SYSTEMS
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <h1 className="font-display text-6xl lg:text-8xl mb-12 uppercase">ENGINEER YOUR <span className="text-brand-orange">FREEDOM</span></h1>
          <p className="font-sans text-brand-grey text-xl max-w-2xl mb-16 leading-relaxed">
            From lithium power banks to diesel heating, explore the components that make serious off-grid travel possible.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {systems.map((s) => (
              <Link 
                key={s.slug} 
                href={`/systems/${s.slug}`} 
                className="group relative blueprint-border p-12 bg-brand-carbon transition-all overflow-hidden"
              >
                {/* Image Reveal Backdrop */}
                <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 bg-brand-obsidian">
                  <img 
                    src={s.image} 
                    alt={s.name} 
                    className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000 grayscale"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian via-brand-obsidian/40 to-transparent" />
                </div>

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-16">
                    <div className="w-16 h-16 bg-brand-obsidian border border-brand-border flex items-center justify-center text-brand-orange group-hover:scale-110 group-hover:border-brand-orange transition-all duration-500">
                      <s.icon className="w-8 h-8" />
                    </div>
                    <span className="font-mono text-[10px] text-brand-grey">0{s.index} {"//"} TECHNICAL MODULE</span>
                  </div>
                  <h3 className="font-display text-3xl mb-4 group-hover:text-brand-orange transition-colors">{s.name}</h3>
                  <p className="font-mono text-[10px] text-brand-orange uppercase tracking-widest mb-6 opacity-60">{s.tagline}</p>
                  <p className="font-sans text-brand-grey text-sm leading-relaxed mb-12">{s.description}</p>
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-brand-white">
                    Enter System Deep-Dive <ChevronRight className="w-4 h-4 text-brand-orange group-hover:translate-x-1 transition-transform" />
                  </div>
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
