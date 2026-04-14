"use client";

import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight } from "lucide-react";

const vehicles = [
  { 
    name: "MERCEDES-BENZ SPRINTER", 
    slug: "mercedes-sprinter", 
    tagline: "The Gold Standard for High-End Conversions",
    image: "/images/sprinter.png",
    specs: { L: "Up to 4.7m", W: "1.78m", H: "2.24m" },
    payload: "Up to 1500kg",
    rating: 9,
    bestFor: "Premium off-grid / 4×4 overlanding"
  },
  { 
    name: "VW CRAFTER", 
    slug: "vw-crafter", 
    tagline: "Refined Engineering Meets Workhorse Reliability",
    image: "/images/hero-background.png",
    specs: { L: "Up to 4.8m", W: "1.83m", H: "2.19m" },
    payload: "Up to 1450kg",
    rating: 8,
    bestFor: "High-spec touring / FWD + AWD flexibility"
  },
  { 
    name: "MAN TGE", 
    slug: "man-tge", 
    tagline: "The Heavy-Duty Alternative with Premium Support",
    image: "/images/interior-showcase.png",
    specs: { L: "Up to 4.8m", W: "1.83m", H: "2.19m" },
    payload: "Up to 1450kg",
    rating: 8,
    bestFor: "Heavy-duty builds / Fleet service network"
  },
  { 
    name: "FORD TRANSIT", 
    slug: "ford-transit", 
    tagline: "The Most Versatile Chassis for Any Budget",
    image: "/images/transit.png",
    specs: { L: "Up to 4.3m", W: "1.78m", H: "2.12m" },
    payload: "Up to 1350kg",
    rating: 7,
    bestFor: "Budget-conscious builds / Parts availability"
  },
  { 
    name: "FIAT DUCATO", 
    slug: "fiat-ducato", 
    tagline: "Wider Internal Dimensions for Transverse Beds",
    image: "/images/community-showcase.png",
    specs: { L: "Up to 4.0m", W: "1.87m", H: "2.17m" },
    payload: "Up to 1400kg",
    rating: 8,
    bestFor: "Transverse bed layouts / Maximum width"
  },
  { 
    name: "IVECO DAILY", 
    slug: "iveco-daily", 
    tagline: "The Truck-Based Beast for Heavy Builds",
    image: "/images/systems-showcase.png",
    specs: { L: "Up to 5.1m", W: "1.80m", H: "2.10m" },
    payload: "Up to 4500kg",
    rating: 7,
    bestFor: "Heavy conversion / High payload capacity"
  },
  { 
    name: "RENAULT MASTER", 
    slug: "renault-master", 
    tagline: "The Efficient Front-Runner with Modern Tech",
    image: "/images/hero-background.png",
    specs: { L: "Up to 4.4m", W: "1.76m", H: "2.15m" },
    payload: "Up to 1400kg",
    rating: 7,
    bestFor: "Deliveries & Efficiency / FWD Ease"
  },
];

export default function VehiclesPage() {
  return (
    <main className="bg-brand-obsidian">
      <Navbar />
      
      {/* Hero */}
      <section className="relative pt-48 pb-32 overflow-hidden">
        <div className="blueprint-grid absolute inset-0 opacity-10" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <h1 className="font-display text-6xl lg:text-8xl mb-8 leading-tight">
              CHOOSE YOUR <span className="text-brand-orange">FOUNDATION</span>
            </h1>
            <p className="font-sans text-brand-grey text-xl lg:text-2xl max-w-2xl leading-relaxed">
              Every great build starts with the right chassis. From the legendary Sprinter to the 
              cavernous Iveco Daily, we&apos;ve done the heavy lifting on the technical specs.
            </p>
          </div>
        </div>
      </section>

      {/* Vehicle Grid */}
      <section className="pb-32">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vehicles.map((vehicle) => (
              <div key={vehicle.slug} className="group blueprint-border bg-brand-carbon hover:bg-brand-graphite transition-all duration-500 flex flex-col">
                <div className="relative aspect-video overflow-hidden">
                  <Image 
                    src={vehicle.image} 
                    alt={vehicle.name} 
                    fill 
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
                  />
                  <div className="absolute inset-0 bg-brand-obsidian/20" />
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="font-display text-2xl group-hover:text-brand-orange transition-colors">
                      {vehicle.name}
                    </h2>
                    <span className="font-mono text-xs text-brand-orange border border-brand-orange/30 px-2 py-1">
                      {vehicle.rating}/10
                    </span>
                  </div>
                  <p className="font-sans text-brand-grey text-sm mb-8 leading-relaxed">
                    {vehicle.tagline}
                  </p>
                  
                  <div className="grid grid-cols-3 gap-4 mb-8 py-6 border-y border-brand-border">
                    <div className="flex flex-col">
                      <span className="font-mono text-[8px] text-brand-grey uppercase tracking-widest mb-1">Length</span>
                      <span className="font-mono text-xs text-brand-white">{vehicle.specs.L}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-mono text-[8px] text-brand-grey uppercase tracking-widest mb-1">Width</span>
                      <span className="font-mono text-xs text-brand-white">{vehicle.specs.W}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-mono text-[8px] text-brand-grey uppercase tracking-widest mb-1">Height</span>
                      <span className="font-mono text-xs text-brand-white">{vehicle.specs.H}</span>
                    </div>
                  </div>

                  <Link 
                    href={`/vehicles/${vehicle.slug}`}
                    className="mt-auto group flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-brand-white p-4 bg-brand-obsidian border border-brand-border hover:border-brand-orange transition-all"
                  >
                    View Full Profile <ChevronRight className="w-4 h-4 text-brand-orange" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table Teaser */}
      <section className="py-32 bg-brand-carbon relative">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mb-16">
            <h2 className="font-display text-4xl mb-6 uppercase">Side-by-Side Comparison</h2>
            <p className="font-sans text-brand-grey text-lg">
              Analyze internal load lengths, heights between ribs, and real-world payload capacity.
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="border-b border-brand-border">
                  <th className="py-6 font-display text-[10px] uppercase tracking-widest text-brand-grey">Chassis</th>
                  <th className="py-6 font-display text-[10px] uppercase tracking-widest text-brand-grey">Max Cargo L</th>
                  <th className="py-6 font-display text-[10px] uppercase tracking-widest text-brand-grey">Max Cargo W</th>
                  <th className="py-6 font-display text-[10px] uppercase tracking-widest text-brand-grey">Standing H</th>
                  <th className="py-6 font-display text-[10px] uppercase tracking-widest text-brand-grey">Max Payload</th>
                  <th className="py-6 font-display text-[10px] uppercase tracking-widest text-brand-grey">Best For</th>
                </tr>
              </thead>
              <tbody className="font-mono text-xs text-brand-white">
                {vehicles.map((v) => (
                  <tr key={v.slug} className="border-b border-brand-border hover:bg-brand-obsidian transition-colors">
                    <td className="py-6 font-display text-sm">{v.name}</td>
                    <td className="py-6">{v.specs.L}</td>
                    <td className="py-6">{v.specs.W}</td>
                    <td className="py-6">{v.specs.H}</td>
                    <td className="py-6">{v.payload}</td>
                    <td className="py-6 text-brand-grey">Luxury builds / Reliability</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
