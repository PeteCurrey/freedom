"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HorizontalScroll } from "@/components/ui/HorizontalScroll";
import { SpecCard } from "@/components/ui/SpecCard";
import { ProductCard } from "@/components/store/ProductCard";
import { Check, X, Ruler, ShieldCheck } from "lucide-react";

// Mock Data
const vehicleData = {
  "mercedes-sprinter": {
    name: "MERCEDES-BENZ SPRINTER",
    tagline: "Where Engineering Meets Capability.",
    description: "The Mercedes-Benz Sprinter is the undisputed gold standard for off-grid campervan conversions. Its combination of structural integrity, 4x4 availability, and extensive aftermarket support makes it the premier choice for serious builders who refuse to compromise on quality or capability.",
    heroImage: "/images/sprinter.png",
    specs: [
      { label: "Engine Options", value: "2.0L 4-Cyl CDI" },
      { label: "Power Output", value: "114 - 190", unit: "HP" },
      { label: "Drivetrain", value: "RWD / AWD" },
      { label: "Transmission", value: "9G-TRONIC" },
      { label: "GVWR", value: "3500 - 5000", unit: "KG" },
    ],
    configurations: [
      { label: "144\" WB Standard", length: "5932mm", internalL: "3272mm", height: "High Roof", volume: "10.5m³" },
      { label: "144\" WB High Roof", length: "5932mm", internalL: "3272mm", height: "High Roof", volume: "11.5m³" },
      { label: "170\" WB High Roof", length: "6967mm", internalL: "4307mm", height: "High Roof", volume: "14.5m³" },
      { label: "170\" EXT High Roof", length: "7367mm", internalL: "4707mm", height: "High Roof", volume: "15.5m³" },
    ],
    pros: ["Best-in-class reliability", "Superior 4x4 capability", "Massive aftermarket ecosystem", "High resale value"],
    cons: ["Higher purchase price", "Expensive maintenance", "Narrower than Sevel vans", "Rust issues on older models"],
    bestFor: "Off-grid adventurers with bigger budgets and taller individuals who want 4×4 capability.",
    watchOutFor: "Internal width of ~178cm means you'll need flares for a transverse bed if you're over 5'10\".",
    manufacturerUrl: "https://www.mercedes-benz.co.uk/vans/en/sprinter"
  },
  "vw-crafter": {
    name: "VW CRAFTER",
    tagline: "The Refined Precision Touring Foundation.",
    description: "The second-generation VW Crafter is often cited as the most 'car-like' large van to drive. Its refined suspension and advanced driver assistance systems make it the preferred choice for those planning long-distance European tours where driver comfort is paramount.",
    heroImage: "/images/vw-crafter.png",
    specs: [
      { label: "Engine Options", value: "2.0L TDI Eco" },
      { label: "Power Output", value: "102 - 177", unit: "HP" },
      { label: "Drivetrain", value: "FWD / RWD / 4MOTION" },
      { label: "Transmission", value: "8-Speed Auto" },
      { label: "GVWR", value: "3000 - 5500", unit: "KG" },
    ],
    configurations: [
      { label: "Medium Wheelbase", length: "5986mm", internalL: "3450mm", height: "High Roof", volume: "9.9m³" },
      { label: "Long Wheelbase", length: "6836mm", internalL: "4300mm", height: "High Roof", volume: "14.4m³" },
      { label: "LWB Maxi", length: "7391mm", internalL: "4855mm", height: "Super High", volume: "16.1m³" },
    ],
    pros: ["Exceptional driving ergonomics", "Great 8-speed automatic gearbox", "Square load box for easier building", "Modern tech stack"],
    cons: ["Complex electronics", "Fewer conversion parts than Sprinter", "DPF sensitivities", "RWD variants eat into payload"],
    bestFor: "Long-range adventure touring and owners who prioristise car-like handling and modern interiors.",
    watchOutFor: "AdBlue consumption and the LWB Maxi's significant rear overhang which can scrape on ferries.",
    manufacturerUrl: "https://www.volkswagen-vans.co.uk/en/new-vehicles/crafter-panel-van.html"
  },
  "ford-transit": {
    name: "FORD TRANSIT",
    tagline: "The Versatile Workhorse for Every Builder.",
    description: "The Ford Transit remains the most popular van in the UK for a reason. Its vast availability, relatively low maintenance costs, and the capable factory AWD option make it a fantastic middle-ground for builders who want capability without the 'sprinter tax'.",
    heroImage: "/images/transit.png",
    specs: [
      { label: "Engine Options", value: "2.0L EcoBlue" },
      { label: "Power Output", value: "105 - 185", unit: "HP" },
      { label: "Drivetrain", value: "FWD / RWD / AWD" },
      { label: "Transmission", value: "6-Speed / 10-Speed" },
      { label: "GVWR", value: "2900 - 4700", unit: "KG" },
    ],
    configurations: [
      { label: "L2 (Medium)", length: "5531mm", internalL: "3044mm", height: "H2 Medium", volume: "9.5m³" },
      { label: "L3 (Long)", length: "5981mm", internalL: "3494mm", height: "H3 High", volume: "11.5m³" },
      { label: "L4 (Jumbo)", length: "6704mm", internalL: "4217mm", height: "H3 High", volume: "15.1m³" },
    ],
    pros: ["Maintenance parts are available everywhere", "Huge cargo volume in 'Jumbo' L4H3", "Excellent FordPass connectivity", "Reliable AWD system"],
    cons: ["Highest theft risk in its class", "Lower resale than VW/Merc", "Cab interior feels more 'workmanlike'", "Complexity of the 10-speed auto"],
    bestFor: "Practical builders, those on a mid-range budget, and users who need the ultimate load volume of the L4 configuration.",
    watchOutFor: "Security is the #1 priority for Transit owners. Deadlocks and alarms are essential from day one.",
    manufacturerUrl: "https://www.ford.co.uk/vans-and-pickups/transit"
  },
  "man-tge": {
    name: "MAN TGE",
    tagline: "The Commercial-Grade Van with Premium Support.",
    description: "Built on the same chassis as the VW Crafter, the MAN TGE distinguishes itself through its commercial-focused service network. If you're building a full-time tiny home, MAN's 24/7 truck-focused service centres are a game changer for maintenance and recovery.",
    heroImage: "/images/man-tge.png",
    specs: [
      { label: "Engine Options", value: "2.0L Diesel" },
      { label: "Power Output", value: "102 - 177", unit: "HP" },
      { label: "Drivetrain", value: "FWD / RWD / AWD" },
      { label: "Transmission", value: "8-Speed Auto / 6-Speed" },
      { label: "GVWR", value: "3000 - 5500", unit: "KG" },
    ],
    configurations: [
      { label: "Standard Wheelbase", length: "5986mm", internalL: "3450mm", height: "High Roof", volume: "9.9m³" },
      { label: "Long Wheelbase", length: "6836mm", internalL: "4300mm", height: "High Roof", volume: "14.4m³" },
    ],
    pros: ["Truck-level service network (24/7)", "Superior mechanical warranty", "Identical to Crafter for parts", "Great build quality"],
    cons: ["Fewer retail dealers than VW", "Slightly more industrial brand image", "Expensive options list", "Complex ADAS systems"],
    bestFor: "Full-time vanlifers who cannot afford downtime and want the backing of a global truck network.",
    watchOutFor: "The ADAS (safety) systems can be sensitive to exterior modifications like bull bars.",
    manufacturerUrl: "https://www.van.man/gb/en/man-tge.html"
  },
  "fiat-ducato": {
    name: "FIAT DUCATO",
    tagline: "The Space-Maximiser for Creative Layouts.",
    description: "The Ducato (and its siblings Boxer/Relay) is the widest van in its class. Because the body doesn't taper as much towards the roof, it is the only van where a bed can be fitted transversely (across the van) without structural flares, saving thousands of pounds in the build.",
    heroImage: "/images/fiat-ducato.png",
    specs: [
      { label: "Engine Options", value: "2.2L MultiJet3" },
      { label: "Power Output", value: "120 - 180", unit: "HP" },
      { label: "Drivetrain", value: "FWD Only" },
      { label: "Transmission", value: "9-Speed Auto / 6-Speed" },
      { label: "GVWR", value: "3000 - 4250", unit: "KG" },
    ],
    configurations: [
      { label: "L2H2 (MWB)", length: "5413mm", internalL: "3120mm", height: "H2 High", volume: "11.5m³" },
      { label: "L3H2 (LWB)", length: "5998mm", internalL: "3705mm", height: "H2 High", volume: "13.0m³" },
      { label: "L4H3 (XLWB)", length: "6363mm", internalL: "4070mm", height: "H3 Super", volume: "17.0m³" },
    ],
    pros: ["Widest internal loadspace (1.87m)", "Transverse bed layouts are easy", "Lightest chassis = highest payload", "Very economical engines"],
    cons: ["Front-wheel drive only (no 4x4)", "Noisier to drive than Crafter/Merc", "Rust on paint (typical Fiat)", "Lower cab build quality"],
    bestFor: "Maximum storage, transverse beds, and budget-conscious builders who need every gram of payload.",
    watchOutFor: "The Fiat 9-speed 'Torque Converter' auto is brilliant, the older 'Comfort-Matic' is best avoided.",
    manufacturerUrl: "https://www.fiatprofessional.com/uk/ducato/ducato-goods-transport"
  },
  "iveco-daily": {
    name: "IVECO DAILY",
    tagline: "The 7-Tonne Truck in an LCV Body.",
    description: "The Iveco Daily is unique in having a C-section truck-style ladder frame instead of a unibody. This makes it the ultimate choice for heavy-duty builds reaching up to 7.2 tonnes, or for those who plan to tow heavy equipment behind their motorhome.",
    heroImage: "/images/iveco-daily.png",
    specs: [
      { label: "Engine Options", value: "3.0L F1C Diesel" },
      { label: "Power Output", value: "136 - 210", unit: "HP" },
      { label: "Drivetrain", value: "RWD / Real 4X4" },
      { label: "Transmission", value: "8-Speed Hi-Matic" },
      { label: "GVWR", value: "3300 - 7200", unit: "KG" },
    ],
    configurations: [
      { label: "V-Series (High)", length: "6100mm", internalL: "3540mm", height: "High Roof", volume: "12.0m³" },
      { label: "XL-Series", length: "7270mm", internalL: "4680mm", height: "High Roof", volume: "17.2m³" },
      { label: "Super XL", length: "7630mm", internalL: "5130mm", height: "Super High", volume: "19.6m³" },
    ],
    pros: ["Unmatched payload capacity", "Legendary 3.0L engine durability", "Best 4x4 system in the market", "Industrial-grade chassis"],
    cons: ["Very hard ride when empty", "Highest fuel consumption", "Requires C1 licence over 3.5t", "Significant internal floor height"],
    bestFor: "Ultimate overlanding, heavy luxury builds, and towing requirements that exceed 3 tonnes.",
    watchOutFor: "Most Iveco Dailys are over 3.5t GVWR - check your driver's licence requirements before buying.",
    manufacturerUrl: "https://www.iveco.com/uk/products/pages/new-daily-van.aspx"
  },
};

export default function VehicleProfile() {
  const { slug } = useParams();
  const vehicle = vehicleData[slug as keyof typeof vehicleData] || vehicleData["mercedes-sprinter"];

  return (
    <main className="bg-brand-obsidian">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[80vh] w-full flex items-end">
        <div className="absolute inset-0">
          <Image 
            src={vehicle.heroImage} 
            alt={vehicle.name} 
            fill 
            className="object-cover grayscale opacity-60" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian via-brand-obsidian/40 to-transparent" />
        </div>
        
        <div className="container mx-auto px-6 pb-24 relative z-10">
          <div className="max-w-4xl">
            <h1 className="font-display text-6xl lg:text-9xl mb-4 leading-none">{vehicle.name}</h1>
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <p className="font-mono text-sm lg:text-lg text-brand-orange uppercase tracking-[0.3em]">
                {"//"} {vehicle.tagline}
              </p>
              <div className="flex items-center gap-4">
                <a 
                  href={vehicle.manufacturerUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-[10px] text-brand-grey uppercase tracking-widest hover:text-brand-white transition-colors border-b border-brand-grey/20 pb-1"
                >
                  Manufacturer <ExternalLink className="w-3 h-3" />
                </a>
                <Link 
                  href={`/vehicles/${slug}/listings`}
                  className="inline-flex items-center gap-2 font-mono text-[10px] text-brand-orange uppercase tracking-widest hover:text-brand-white transition-colors border-b border-brand-orange/20 pb-1"
                >
                  Marketplace <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Specs & Intro */}
      <section className="py-24 border-b border-brand-border">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              <h2 className="font-display text-xs tracking-[0.3em] text-brand-grey uppercase mb-8">Foundation Analysis</h2>
              <p className="font-sans text-brand-white text-xl lg:text-3xl leading-relaxed">
                {vehicle.description}
              </p>
              <div className="mt-12 flex items-center gap-6">
                <Link
                  href={`/vehicles/${slug}/listings`}
                  className="px-8 py-4 border border-brand-orange text-brand-orange font-display text-[10px] uppercase tracking-widest hover:bg-brand-orange hover:text-white transition-all"
                >
                  Search Used {vehicle.name}s →
                </Link>
              </div>
            </div>
            <div>
              <SpecCard title="Vehicle Specs" specs={vehicle.specs} />
            </div>
          </div>
        </div>
      </section>

      {/* Configurations — Horizontal Scroll */}
      <HorizontalScroll title="DIMENSIONS & LOADSPACE" subtitle="All available wheelbase and roof combinations.">
        {vehicle.configurations.map((config, i) => (
          <div key={i} className="w-[400px] blueprint-border p-10 bg-brand-carbon flex flex-col justify-between h-[500px]">
            <div>
              <h3 className="font-display text-2xl mb-8 group-hover:text-brand-orange transition-colors">
                {config.label}
              </h3>
              <div className="space-y-6">
                <div className="flex justify-between items-baseline">
                  <span className="font-mono text-[10px] text-brand-grey uppercase tracking-widest">Internal Length</span>
                  <span className="font-mono text-sm text-brand-white">{config.internalL}</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="font-mono text-[10px] text-brand-grey uppercase tracking-widest">External Length</span>
                  <span className="font-mono text-sm text-brand-white">{config.length}</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="font-mono text-[10px] text-brand-grey uppercase tracking-widest">Roof Height</span>
                  <span className="font-mono text-sm text-brand-white">{config.height}</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="font-mono text-[10px] text-brand-grey uppercase tracking-widest">Volume</span>
                  <span className="font-mono text-sm text-brand-white">{config.volume}</span>
                </div>
              </div>
            </div>
            <div className="mt-auto pt-8 border-t border-brand-border flex items-center justify-between">
              <span className="font-mono text-[8px] text-brand-grey uppercase tracking-widest">Conf: SPR-M3-{i+1}</span>
              <Ruler className="w-5 h-5 text-brand-orange opacity-40" />
            </div>
          </div>
        ))}
      </HorizontalScroll>

      {/* Conversion Analysis (Pros/Cons) */}
      <section className="py-32 bg-brand-carbon relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            <div>
              <h2 className="font-display text-4xl mb-12">THE VERDICT</h2>
              <div className="space-y-4 mb-16">
                <div className="blueprint-border p-8 bg-brand-obsidian/50 border-l-4 border-l-brand-orange">
                  <p className="font-sans text-brand-grey text-xs uppercase tracking-widest mb-2 font-bold">Best For</p>
                  <p className="font-sans text-brand-white leading-relaxed">{vehicle.bestFor}</p>
                </div>
                <div className="blueprint-border p-8 bg-brand-obsidian/50 border-l-4 border-l-red-500/50">
                  <p className="font-sans text-brand-grey text-xs uppercase tracking-widest mb-2 font-bold">Watch Out For</p>
                  <p className="font-sans text-brand-white leading-relaxed">{vehicle.watchOutFor}</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="font-display text-lg text-brand-orange flex items-center gap-2">
                  <Check className="w-5 h-5" /> PROS
                </h3>
                <ul className="space-y-4">
                  {vehicle.pros.map((p, i) => (
                    <li key={i} className="font-sans text-brand-grey text-sm border-l border-brand-orange/30 pl-4">{p}</li>
                  ))}
                </ul>
              </div>
              <div className="space-y-6">
                <h3 className="font-display text-lg text-red-500/80 flex items-center gap-2">
                  <X className="w-5 h-5" /> CONS
                </h3>
                <ul className="space-y-4">
                  {vehicle.cons.map((c, i) => (
                    <li key={i} className="font-sans text-brand-grey text-sm border-l border-red-500/20 pl-4">{c}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compatible Products */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-16">
            <h2 className="font-display text-4xl">COMPATIBLE GEAR</h2>
            <Link href="/store" className="font-mono text-xs uppercase tracking-widest text-brand-orange">{/* // Shop All Parts */}Shop All Parts</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((p) => (
              <ProductCard key={p.id} {...p} />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Sticky Sidebar feel / CTA */}
      <section className="py-24 border-t border-brand-border">
        <div className="container mx-auto px-6">
          <div className="blueprint-border p-12 bg-brand-carbon flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-8">
              <div className="hidden md:flex flex-col items-center gap-2 font-mono text-brand-grey">
                <ShieldCheck className="w-10 h-10 text-brand-orange" />
                <span className="text-[8px] uppercase tracking-widest">Verified</span>
              </div>
              <div>
                <h3 className="font-display text-2xl mb-2 italic">READY TO START YOUR {vehicle.name} BUILD?</h3>
                <p className="font-sans text-brand-grey text-sm">Download our free {vehicle.name} dimension guide PDF.</p>
              </div>
            </div>
            <button className="px-10 py-5 bg-brand-orange text-white font-display text-xs uppercase tracking-[0.2em] hover:scale-105 transition-transform">
              Download Build Pack →
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

const featuredProducts = [
  { id: "1", name: "Sprinter-Specific MaxxAir Vent Kit", brand: "MAXXAIR", price: 34500, image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1000", category: "Ventilation" },
  { id: "2", name: "Victron Sprinter Electrical Bundle", brand: "VICTRON", price: 425000, image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1000", category: "Electrical" },
  { id: "3", name: "Custom Sprinter Floor Plate", brand: "DIYM", price: 125000, image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=1000", category: "Interior" },
  { id: "4", name: "Dometic S4 Window - Sprinter L3", brand: "DOMETIC", price: 45900, image: "https://images.unsplash.com/photo-1544621443-42468301beaf?q=80&w=1000", category: "Windows" },
];
