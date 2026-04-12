"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroSection } from "@/components/home/HeroSection";
import { HorizontalScroll } from "@/components/ui/HorizontalScroll";
import { SpecCard } from "@/components/ui/SpecCard";
import { ProductCard } from "@/components/store/ProductCard";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Zap, Thermometer, Droplets, Shield, Layers, Layout } from "lucide-react";

export default function Home() {
  const whyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Why We Exist animations
      gsap.from(".why-text-item", {
        scrollTrigger: {
          trigger: whyRef.current,
          start: "top 80%",
          scrub: 1,
        },
        y: 60,
        opacity: 0,
        stagger: 0.2,
      });

      // Stats counters
      gsap.from(".stat-number", {
        scrollTrigger: {
          trigger: ".stats-container",
          start: "top 85%",
        },
        innerText: 0,
        duration: 2,
        snap: { innerText: 1 },
        stagger: 0.1,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="bg-brand-obsidian">
      <Navbar />
      <HeroSection />

      {/* Section 2 — Why We Exist */}
      <section ref={whyRef} className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12">
              <h2 className="why-text-item font-display text-5xl lg:text-7xl leading-none">
                THIS ISN&apos;T <span className="text-brand-orange">VANLIFE</span>
              </h2>
              <div className="why-text-item space-y-6">
                <p className="font-sans text-brand-grey text-lg lg:text-xl leading-relaxed">
                  Forget the Instagram filter. We&apos;re here for the builds that run induction hobs
                  off lithium, heat through Alpine winters, and carry you 100,000 miles without
                  breaking a sweat.
                </p>
                <p className="font-sans text-brand-white text-lg lg:text-xl leading-relaxed">
                  This is engineering. This is craft. This is freedom — done properly.
                </p>
              </div>
              <div className="why-text-item stats-container grid grid-cols-2 gap-12 pt-12 border-t border-brand-border">
                <div>
                  <div className="font-display text-4xl text-brand-orange mb-2">
                    <span className="stat-number">6</span>
                  </div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-brand-grey">
                    Base Vehicles Compared
                  </p>
                </div>
                <div>
                  <div className="font-display text-4xl text-brand-orange mb-2">
                    <span className="stat-number">200</span>+
                  </div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-brand-grey">
                    Technical Guides
                  </p>
                </div>
              </div>
            </div>
            <div className="why-text-item relative aspect-square blueprint-border">
              <div className="blueprint-grid absolute inset-0 opacity-20" />
              <Image
                src="https://images.unsplash.com/photo-1523995462485-3d171b5c8fb9?q=80&w=2000&auto=format&fit=crop"
                alt="Engineering focus"
                fill
                className="object-cover grayscale opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-orange/20 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 — Base Vehicles Preview (Horizontal Scroll) */}
      <HorizontalScroll 
        title="CHOOSE YOUR FOUNDATION"
        subtitle="6 Pro-grade chassis compared for your next build."
      >
        {vehicles.map((vehicle, i) => (
          <VehicleCard key={vehicle.name} vehicle={vehicle} index={i} />
        ))}
      </HorizontalScroll>

      {/* Section 4 — Build Systems Grid */}
      <section className="py-32 bg-brand-carbon relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-xl">
              <h2 className="font-display text-5xl mb-6">ENGINEERED SYSTEMS</h2>
              <p className="font-sans text-brand-grey text-lg">
                High-performance modules designed to work together seamlessly in 
                the most demanding off-grid environments.
              </p>
            </div>
            <Link 
              href="/systems" 
              className="font-mono text-xs uppercase tracking-[0.2em] text-brand-orange border-b border-brand-orange/30 pb-2 hover:border-brand-orange transition-all"
            >
              // Explore All Systems
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {systems.map((system) => (
              <SystemCard key={system.name} system={system} />
            ))}
          </div>
        </div>
      </section>

      {/* Section 5 — Featured Products */}
      <HorizontalScroll title="GEAR THAT GOES THE DISTANCE">
        {featuredProducts.map((product) => (
          <div key={product.id} className="w-[350px]">
            <ProductCard {...product} />
          </div>
        ))}
        <div className="w-[400px] h-full flex items-center justify-center p-12">
          <Link 
            href="/store"
            className="group font-display text-4xl text-right hover:text-brand-orange transition-colors"
          >
            BROWSE FULL <br /> STORE <span className="text-brand-orange">→</span>
          </Link>
        </div>
      </HorizontalScroll>

      {/* Section 6 — Build Planner CTA */}
      <section className="py-32 relative overflow-hidden">
        <div className="blueprint-grid absolute inset-0 opacity-10" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center blueprint-border p-16 bg-brand-carbon/80 backdrop-blur-xl">
            <h2 className="font-display text-5xl lg:text-7xl mb-8 leading-tight">
              PLAN YOUR <span className="text-brand-orange">BUILD</span>
            </h2>
            <p className="font-sans text-brand-grey text-xl mb-12 max-w-2xl mx-auto">
              Select your base vehicle. Configure your systems. Get a complete parts list and 
              budget estimate in real-time.
            </p>
            <Link
              href="/planner"
              className="inline-block px-12 py-6 bg-brand-orange text-white font-display text-lg uppercase tracking-widest hover:scale-105 transition-transform"
            >
              Launch Build Planner →
            </Link>
          </div>
        </div>
      </section>

      {/* Section 7 — Community Showcase */}
      <section className="py-32 bg-brand-carbon">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center mb-16">
            <h2 className="font-display text-4xl">BUILT BY THE COMMUNITY</h2>
            <Link href="/showcase" className="btn-secondary">View All Builds</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {showcaseBuilds.map((build, i) => (
              <div 
                key={i} 
                className={cn(
                  "relative aspect-[4/5] overflow-hidden group",
                  i === 0 && "md:col-span-2 md:row-span-2"
                )}
              >
                <Image
                  src={build.image}
                  alt={build.title}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-0 left-0 p-6">
                  <p className="font-mono text-[10px] text-brand-orange uppercase mb-2">{build.vehicle}</p>
                  <h3 className="font-display text-lg uppercase">{build.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

// Sub-components & Mock Data

function VehicleCard({ vehicle, index }: { vehicle: any; index: number }) {
  return (
    <div className="w-[450px] group blueprint-border bg-brand-graphite/30 overflow-hidden">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={vehicle.image}
          alt={vehicle.name}
          fill
          className="object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-brand-obsidian/20" />
      </div>
      <div className="p-8">
        <h3 className="font-display text-2xl mb-4 group-hover:text-brand-orange transition-colors">
          {vehicle.name}
        </h3>
        <p className="font-mono text-xs text-brand-grey uppercase tracking-widest mb-8">
          {vehicle.specs}
        </p>
        <Link 
          href={`/vehicles/${vehicle.slug}`}
          className="font-mono text-[10px] text-brand-white uppercase tracking-[0.2em] border-b border-brand-white/20 pb-2 hover:border-brand-orange hover:text-brand-orange transition-all"
        >
          // View Full Profile
        </Link>
      </div>
    </div>
  );
}

function SystemCard({ system }: { system: any }) {
  const Icon = system.icon;
  return (
    <Link href={`/systems/${system.slug}`} className="group blueprint-border p-10 bg-brand-surface hover:bg-brand-graphite transition-all duration-500 hover:-translate-y-2">
      <div className="flex items-center justify-between mb-12">
        <div className="w-16 h-16 bg-brand-obsidian border border-brand-border flex items-center justify-center text-brand-orange group-hover:scale-110 transition-transform">
          <Icon className="w-8 h-8" />
        </div>
        <div className="font-mono text-[10px] text-brand-grey">
          0{system.index} /
        </div>
      </div>
      <h3 className="font-display text-2xl mb-4">{system.name}</h3>
      <p className="font-sans text-brand-grey text-sm leading-relaxed mb-6">
        {system.description}
      </p>
      <div className="flex items-center text-brand-orange font-mono text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
        Explore Deep-Dive →
      </div>
    </Link>
  );
}

const vehicles = [
  { name: "MERCEDES SPRINTER", slug: "mercedes-sprinter", specs: "L3H3 — 170\" WB — High Roof", image: "https://images.unsplash.com/photo-1551522435-a13afa10f103?q=80&w=2000" },
  { name: "VW CRAFTER", slug: "vw-crafter", specs: "LWB — High Roof — 4Motion", image: "https://images.unsplash.com/photo-1542362567-b052d8cc960f?q=80&w=2000" },
  { name: "MAN TGE", slug: "man-tge", specs: "LWB — Lion's Cap Cab", image: "https://images.unsplash.com/photo-1621259182978-f09e5e2ca1ec?q=80&w=2000" },
  { name: "FORD TRANSIT", slug: "ford-transit", specs: "L4H3 — AWD — Jumbo", image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2000" },
  { name: "FIAT DUCATO", slug: "fiat-ducato", specs: "L4H3 — Maxi — 180 MultiJet", image: "https://images.unsplash.com/photo-1544621443-42468301beaf?q=80&w=2000" },
  { name: "IVECO DAILY", slug: "iveco-daily", specs: "7-Tonne — 4100L — Hi-Matic", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2000" },
];

const systems = [
  { index: 1, name: "ELECTRICAL & SOLAR", slug: "electrical-solar", icon: Zap, description: "Victron-powered off-grid power systems including Lithium monitoring and solar arrays." },
  { index: 2, name: "HEATING & HOT WATER", slug: "heating-hot-water", icon: Thermometer, description: "Truma, Webasto and Eberspächer air and water heating solutions for all climates." },
  { index: 3, name: "WATER & PLUMBING", slug: "water-plumbing", icon: Droplets, description: "Fresh and waste water management, pressurized systems and luxury wet-room design." },
  { index: 4, name: "INSULATION & VENT", slug: "insulation-ventilation", icon: Layers, description: "Advanced insulation materials, sound deadening and MaxxAir ventilation systems." },
  { index: 5, name: "GAS & LPG", slug: "gas-lpg", icon: Shield, description: "EIL certified gas lockers, underslung tanks and manifold distribution systems." },
  { index: 6, name: "INTERIOR & FURNITURE", slug: "interior-furniture", icon: Layout, description: "Precision CNC cabinetry, lightweight birch ply and premium finishing materials." },
];

const featuredProducts = [
  { 
    id: "1", 
    name: "Victron MultiPlus 12/3000/120-16", 
    brand: "VICTRON ENERGY", 
    price: 124500, 
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1000", 
    category: "Electrical", 
    specs: { "Voltage": "12V", "Inverter": "3000VA", "Charger": "120A" } as Record<string, string> 
  },
  { 
    id: "2", 
    name: "Dometic CFX3 55IM Fridge", 
    brand: "DOMETIC", 
    price: 89900, 
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1000", 
    category: "Appliances", 
    specs: { "Capacity": "55L", "Power": "12/24V", "Weight": "21kg" } as Record<string, string>
  },
  { 
    id: "3", 
    name: "Truma Combi 4E Kit", 
    brand: "TRUMA", 
    price: 185000, 
    image: "https://images.unsplash.com/photo-1590487988256-9ed24133863e?q=80&w=1000", 
    category: "Heating", 
    specs: { "Output": "4kW", "Input": "Gas/230V", "Vessel": "10L" } as Record<string, string>
  },
];

const showcaseBuilds = [
  { title: "THE SUMMIT OVERLANDER", vehicle: "MERCEDES SPRINTER 170 4X4", image: "https://images.unsplash.com/photo-1523983388277-336a66bf9bcd?q=80&w=1000" },
  { title: "ALPHINE NOMAD", vehicle: "VW CRAFTER LWB", image: "https://images.unsplash.com/photo-1469002064111-c3da21400531?q=80&w=1000" },
  { title: "DESERT WARRIOR", vehicle: "IVECO DAILY 4X4", image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1000" },
  { title: "ARCTIC EXPLORER", vehicle: "FORD TRANSIT AWD", image: "https://images.unsplash.com/photo-1445991842772-097fea258e7b?q=80&w=1000" },
];
