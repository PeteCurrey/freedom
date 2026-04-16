"use client";

import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { 
  ShieldCheck, 
  ExternalLink, 
  AlertTriangle, 
  Search, 
  History, 
  Gauge, 
  Zap, 
  ChevronRight 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { vehicleData } from "@/lib/data/vehicles";

// Add these Lucide icons to fix imports since I'm moving them to a components-friendly file
const CheckCircle2 = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
);

// Price Bracket Type
interface PriceBracket {
  years: string;
  mileage: string;
  price: string;
}

const getPriceBrackets = (slug: string): PriceBracket[] => {
  switch (slug) {
    case "mercedes-sprinter":
      return [
        { years: "2015-2017", mileage: "80k - 120k", price: "£12,000 - £18,000" },
        { years: "2018-2020", mileage: "40k - 80k", price: "£20,000 - £28,000" },
        { years: "2021+", mileage: "Under 40k", price: "£28,000 - £40,000" },
      ];
    case "vw-crafter":
    case "man-tge":
      return [
        { years: "2017-2019", mileage: "70k - 110k", price: "£14,000 - £20,000" },
        { years: "2020-2022", mileage: "30k - 70k", price: "£22,000 - £32,000" },
        { years: "2023+", mileage: "Under 30k", price: "£32,000 - £45,000" },
      ];
    case "ford-transit":
      return [
        { years: "2016-2018", mileage: "80k - 120k", price: "£10,000 - £15,000" },
        { years: "2019-2021", mileage: "40k - 80k", price: "£16,000 - £24,000" },
        { years: "2022+", mileage: "Under 40k", price: "£25,000 - £35,000" },
      ];
    case "fiat-ducato":
      return [
        { years: "2015-2018", mileage: "70k - 100k", price: "£8,000 - £14,000" },
        { years: "2019-2021", mileage: "30k - 70k", price: "£15,000 - £22,000" },
        { years: "2022+", mileage: "Under 30k", price: "£23,000 - £32,000" },
      ];
    case "iveco-daily":
      return [
        { years: "2014-2017", mileage: "100k - 150k", price: "£7,000 - £12,000" },
        { years: "2018-2020", mileage: "60k - 100k", price: "£13,000 - £20,000" },
        { years: "2021+", mileage: "Under 60k", price: "£22,000 - £35,000" },
      ];
    default:
      return [];
  }
};

const getVehicleSpecificChecks = (slug: string) => {
  switch (slug) {
    case "mercedes-sprinter":
      return [
        { title: "Injector Seals (Black Death)", desc: "Check for carbon buildup around injectors. Expensive if left too long." },
        { title: "Rear Wheel Arches", desc: "Common rust spot, especially on pre-2018 models." },
        { title: "Turbo Resonator", desc: "Known to split under pressure, causing limp mode." },
      ];
    case "vw-crafter":
    case "man-tge":
      return [
        { title: "AdBlue System", desc: "Post-2017 models can have sensor issues. Check for dashboard warnings." },
        { title: "Timing Belt", desc: "Ensure service history shows change every 4-5 years or 100k miles." },
        { title: "Front Subframe", desc: "Check for surface corrosion on older UK-based vans." },
      ];
    case "ford-transit":
      return [
        { title: "Security / Theft Risk", desc: "High theft risk. Check for deadlock installations or alarm upgrades." },
        { title: "Turbo Whistle", desc: "Listen for excessive whistling under load which may indicate imminent failure." },
        { title: "Injector Health", desc: "Especially on 2.2 TDCi models; listen for uneven idling." },
      ];
    case "fiat-ducato":
      return [
        { title: "3rd/4th Gear Crunch", desc: "Common on older manuals. Ensure smooth shifts during test drive." },
        { title: "Timing Belt & Water Pump", desc: "Must be done together. Check service stamps." },
        { title: "Sill Rust", desc: "Check rear crossmember and sill ends for rot." },
      ];
    case "iveco-daily":
      return [
        { title: "Dual-Mass Flywheel", desc: "Listen for clattering at idle. Expensive to replace." },
        { title: "EGR Valve", desc: "Prone to clogging if used for short trips. Check power delivery." },
        { title: "Brake Caliper Seizure", desc: "Rear calipers are prone to sticking on infrequently used vans." },
      ];
    default:
      return [];
  }
};

export default function BuyingGuideClient({ slug }: { slug: string }) {
  const vehicle = vehicleData[slug] || vehicleData["mercedes-sprinter"];
  const prices = getPriceBrackets(slug);
  const specificChecks = getVehicleSpecificChecks(slug);

  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-48 pb-24 overflow-hidden">
        <div className="blueprint-grid absolute inset-0 opacity-10 pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <p className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.3em] mb-4">
              // BUYER INTELLIGENCE
            </p>
            <h1 className="font-display text-6xl lg:text-9xl mb-8 uppercase leading-none tracking-tighter text-white">
              {vehicle.name.split(" ")[0]} <span className="text-brand-orange">BUYING GUIDE</span>
            </h1>
            <p className="font-sans text-brand-grey text-xl lg:text-2xl leading-relaxed max-w-2xl">
              What to look for, what to avoid, and where to find the best base vehicles for your conversion.
            </p>
          </div>
        </div>
      </section>

      {/* Recommended Specs */}
      <section className="py-24 border-y border-brand-border/30">
        <div className="container mx-auto px-6">
          <h2 className="font-display text-4xl mb-16 uppercase text-white">Ideal <span className="text-brand-orange">Specifications</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="blueprint-border p-10 bg-brand-carbon">
              <History className="w-8 h-8 text-brand-orange mb-6" />
              <h3 className="font-display text-xl mb-4 uppercase text-white">Year Range</h3>
              <p className="font-sans text-brand-grey text-sm leading-relaxed mb-6">
                Aim for {prices[1]?.years} models. These offer the best balance of modern safety (Euro 6) and value.
              </p>
              <div className="pt-6 border-t border-brand-border/30">
                <span className="font-mono text-[10px] text-brand-white uppercase underline">Recommended: 2018+</span>
              </div>
            </div>
            <div className="blueprint-border p-10 bg-brand-carbon font-bold">
              <Gauge className="w-8 h-8 text-brand-orange mb-6" />
              <h3 className="font-display text-xl mb-4 uppercase text-brand-orange">Mileage Sweet Spot</h3>
              <p className="font-sans text-brand-grey text-sm leading-relaxed mb-6">
                80,000 — 120,000 miles. Professionally maintained fleet vans often hitting 100k are significantly cheaper while having full history.
              </p>
              <div className="pt-6 border-t border-brand-border/30">
                 <span className="font-mono text-[10px] text-brand-white uppercase underline">Avoid 200k+ without proof</span>
              </div>
            </div>
            <div className="blueprint-border p-10 bg-brand-carbon">
              <Zap className="w-8 h-8 text-brand-orange mb-6" />
              <h3 className="font-display text-xl mb-4 uppercase text-white">Must-Have Options</h3>
              <ul className="space-y-3 font-sans text-brand-grey text-xs">
                 <li className="flex items-center gap-2 italic"><CheckCircle2 className="w-3 h-3 text-brand-orange" /> High Roof (H2/H3)</li>
                 <li className="flex items-center gap-2 italic"><CheckCircle2 className="w-3 h-3 text-brand-orange" /> LWB (Long Wheelbase)</li>
                 <li className="flex items-center gap-2 italic"><CheckCircle2 className="w-3 h-3 text-brand-orange" /> Air Conditioning (Resale Gold)</li>
                 <li className="flex items-center gap-2 italic"><CheckCircle2 className="w-3 h-3 text-brand-orange" /> Single Passenger Seat (Swivel Ready)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Price Guide */}
      <section className="py-32 bg-brand-carbon/30">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <h2 className="font-display text-4xl mb-6 uppercase text-white">UK MARKET <span className="text-brand-orange">PRICING 2026</span></h2>
            <p className="font-sans text-brand-grey">Estimated retail prices for clean, high-roof panel vans. 2026 inflation-adjusted figures.</p>
          </div>
          <div className="blueprint-border overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead className="bg-brand-carbon border-b border-brand-border">
                <tr>
                  <th className="p-6 font-mono text-[10px] uppercase text-brand-orange tracking-widest">Age Range</th>
                  <th className="p-6 font-mono text-[10px] uppercase text-brand-grey tracking-widest">Typical Mileage</th>
                  <th className="p-6 font-mono text-[10px] uppercase text-brand-grey tracking-widest">Target Price (inc. VAT)</th>
                </tr>
              </thead>
              <tbody>
                {prices.map((bracket, i) => (
                  <tr key={i} className="border-b border-brand-border last:border-none hover:bg-brand-orange/5 transition-colors">
                    <td className="p-6 font-display text-xl text-brand-white">{bracket.years}</td>
                    <td className="p-6 font-mono text-xs text-brand-grey">{bracket.mileage}</td>
                    <td className="p-6 font-mono text-sm text-brand-orange font-bold font-italic">{bracket.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-8 font-mono text-[9px] text-brand-grey uppercase italic">*Prices may vary significantly based on condition and service history.</p>
        </div>
      </section>

      {/* Inspection Checklist */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            <div>
              <h2 className="font-display text-4xl mb-8 uppercase text-white">Inspection <span className="text-brand-orange">Checklist</span></h2>
              <p className="font-sans text-brand-grey text-lg leading-relaxed mb-12 italic">
                Don&apos;t let excitement blind you to mechanical reality. Use this vehicle-specific list when viewing your potential {vehicle.name.split(" ")[0]}.
              </p>
              <div className="space-y-12">
                {specificChecks.map((check, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="w-12 h-12 flex items-center justify-center bg-brand-orange text-white shrink-0 group-hover:scale-110 transition-transform">
                      <AlertTriangle className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl mb-2 uppercase text-white">{check.title}</h3>
                      <p className="font-sans text-brand-grey text-sm">{check.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="blueprint-border p-12 bg-brand-carbon relative">
               <div className="blueprint-grid absolute inset-0 opacity-10" />
               <h3 className="font-display text-2xl mb-8 uppercase text-brand-orange">Standard Checks</h3>
               <ul className="space-y-6">
                  {[
                    "HPI Clear: No Outstanding Finance or Cat writes",
                    "MOT History: Check for consistent suspension and brake failures",
                    "Service Log: Proof of oil changes every 12-18 months",
                    "Rust: Check wheel arches, door sills, and subframe",
                    "Cab Condition: High wear on seats/wheel = hard life",
                    "Engine: Listen for turbo whistle or injector ticking",
                  ].map((text, i) => (
                    <li key={i} className="flex items-center gap-4 font-mono text-xs text-brand-white">
                      <CheckCircle2 className="w-4 h-4 text-brand-orange" /> {text}
                    </li>
                  ))}
               </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Marketplace Sourcing */}
      <section className="py-24 bg-brand-carbon border-y border-brand-border/30">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <h2 className="font-display text-4xl uppercase mb-4 text-white">
              WHERE TO <span className="text-brand-orange">FIND ONE</span>
            </h2>
            <p className="font-sans text-brand-grey">
              The UK marketplace is flooded with delivery vans. Filter for &quot;Private&quot; or &quot;Owner-Driver&quot; for the best kept examples.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <a href={vehicle.ebaySearch} target="_blank" className="blueprint-border p-10 bg-brand-obsidian group hover:border-brand-orange transition-all h-full flex flex-col justify-between italic relative">
                <Search className="w-8 h-8 text-brand-orange mb-8" />
                <div>
                   <h3 className="font-display text-xl mb-2 text-brand-white uppercase underline">eBay Motors</h3>
                   <p className="font-sans text-brand-grey text-xs">UK wide panel van listings.</p>
                </div>
                <ExternalLink className="absolute top-6 right-6 w-4 h-4 text-brand-grey group-hover:text-brand-orange" />
             </a>
             <a href={vehicle.autotraderSearch} target="_blank" className="blueprint-border p-10 bg-brand-obsidian group hover:border-brand-orange transition-all h-full flex flex-col justify-between italic relative">
                <Search className="w-8 h-8 text-brand-orange mb-8" />
                <div>
                   <h3 className="font-display text-xl mb-2 text-brand-white uppercase underline">AutoTrader Van</h3>
                   <p className="font-sans text-brand-grey text-xs">Main dealer & trade stock.</p>
                </div>
                <ExternalLink className="absolute top-6 right-6 w-4 h-4 text-brand-grey group-hover:text-brand-orange" />
             </a>
             <a href="https://www.facebook.com/marketplace/category/vehicles" target="_blank" className="blueprint-border p-10 bg-brand-obsidian group hover:border-brand-orange transition-all h-full flex flex-col justify-between italic relative">
                <Search className="w-8 h-8 text-brand-orange mb-8" />
                <div>
                   <h3 className="font-display text-xl mb-2 text-brand-white uppercase underline">FB Marketplace</h3>
                   <p className="font-sans text-brand-grey text-xs">Private bargains & local sales.</p>
                </div>
                <ExternalLink className="absolute top-6 right-6 w-4 h-4 text-brand-grey group-hover:text-brand-orange" />
             </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32">
         <div className="container mx-auto px-6 text-center">
            <h2 className="font-display text-5xl lg:text-7xl mb-12 uppercase italic underline whitespace-nowrap overflow-hidden text-ellipsis text-white">FOUND YOUR VAN? <span className="text-brand-orange">START PLANNING</span></h2>
            <Link 
              href="/planner" 
              className="inline-flex items-center gap-4 bg-brand-orange text-white px-12 py-6 font-display text-xs uppercase tracking-[0.3em] hover:scale-105 transition-transform"
            >
              Enter Build Planner <ChevronRight className="w-4 h-4" />
            </Link>
         </div>
      </section>

      <Footer />
    </main>
  );
}
