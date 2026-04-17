"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Search, ExternalLink, ShieldCheck, MapPin, Gauge, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

import { supabase } from "@/lib/supabase";

const vehicles = [
  { id: "mercedes-sprinter", name: "Mercedes Sprinter", image: "/images/sprinter.png" },
  { id: "vw-crafter", name: "VW Crafter", image: "/images/hero-background.png" },
  { id: "ford-transit", name: "Ford Transit", image: "/images/transit.png" },
  { id: "fiat-ducato", name: "Fiat Ducato", image: "/images/community-showcase.png" },
  { id: "man-tge", name: "MAN TGE", image: "/images/interior-showcase.png" },
  { id: "iveco-daily", name: "Iveco Daily", image: "/images/systems-showcase.png" },
];

export default function FindAVan() {
  const [selectedVehicle, setSelectedVehicle] = useState(vehicles[0]);
  const [marketplaceLinks, setMarketplaceLinks] = useState<any[]>([]);

  useEffect(() => {
    async function fetchLinks() {
      const { data } = await supabase
        .from('vehicle_marketplaces')
        .select('*')
        .eq('vehicle_id', selectedVehicle.id)
        .eq('is_active', true)
        .order('created_at', { ascending: true });
      
      setMarketplaceLinks(data || []);
    }
    fetchLinks();
  }, [selectedVehicle.id]);

  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-48 pb-24 overflow-hidden border-b border-brand-border/30">
        <div className="blueprint-grid absolute inset-0 opacity-10 pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <h1 className="font-display text-7xl lg:text-8xl mb-8 uppercase leading-none tracking-tighter">
              SOURCE YOUR <span className="text-brand-orange">FOUNDATION</span>
            </h1>
            <p className="font-sans text-brand-grey text-xl lg:text-2xl leading-relaxed max-w-2xl mb-12">
              Don&apos;t spend months searching. We&apos;ve pre-filtered the UK&apos;s best marketplaces to find 
              conversion-ready panel vans and commercial chassis.
            </p>
          </div>
        </div>
      </section>

      {/* Marketplace Switcher */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Sidebar Selectors */}
            <div className="lg:col-span-4 space-y-4">
              <h2 className="font-display text-[10px] uppercase text-brand-grey mb-8 tracking-[0.3em]">Select Your Chassis</h2>
              <div className="grid grid-cols-1 gap-2">
                {vehicles.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVehicle(v)}
                    className={cn(
                      "w-full p-6 blueprint-border flex items-center justify-between group transition-all",
                      selectedVehicle.id === v.id ? "bg-brand-orange/10 border-brand-orange" : "bg-brand-carbon hover:bg-brand-graphite"
                    )}
                  >
                    <span className="font-display text-sm uppercase tracking-widest">{v.name}</span>
                    <Search className={cn("w-4 h-4 transition-colors", selectedVehicle.id === v.id ? "text-brand-orange" : "text-brand-grey")} />
                  </button>
                ))}
              </div>
              
              <div className="pt-12">
                <div className="blueprint-border p-8 bg-brand-carbon border-l-4 border-brand-orange">
                  <h3 className="font-display text-lg mb-4 italic">BUILDER TIP</h3>
                  <p className="font-sans text-brand-grey text-sm leading-relaxed">
                    Always check the payload rating before purchasing. A 3.5t van with a heavy internal build can easily exceed its GVWR.
                  </p>
                </div>
              </div>
            </div>

            {/* Marketplace Grid */}
            <div className="lg:col-span-8">
              <div className="blueprint-border bg-brand-carbon p-12 relative overflow-hidden h-full">
                <div className="blueprint-grid absolute inset-0 opacity-20 pointer-events-none" />
                
                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row gap-8 items-center mb-16">
                     <div className="relative w-full md:w-64 aspect-video blueprint-border overflow-hidden">
                        <Image src={selectedVehicle.image} alt={selectedVehicle.name} fill className="object-cover grayscale" />
                     </div>
                     <div>
                        <h2 className="font-display text-4xl mb-4">{selectedVehicle.name.toUpperCase()}</h2>
                        <p className="font-mono text-[10px] text-brand-grey uppercase tracking-widest">Pre-filtered Marketplace Channels</p>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     {marketplaceLinks.length > 0 ? (
                       marketplaceLinks.map((link) => (
                         <a 
                          key={link.id}
                          href={link.affiliate_url}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="group p-8 blueprint-border bg-brand-obsidian hover:bg-brand-orange/5 transition-all flex flex-col justify-between min-h-[220px]"
                         >
                            <div className="flex justify-between items-start">
                               <div className="h-12 bg-brand-carbon flex items-center justify-center px-4 py-2 border border-brand-border">
                                  {link.icon_type === 'ebay' && <span className="font-display text-xs text-white">eBAY UK</span>}
                                  {link.icon_type === 'autotrader' && <span className="font-display text-xs text-white">AUTOTRADER</span>}
                                  {link.icon_type === 'vantrader' && <span className="font-display text-xs text-white">VAN TRADER</span>}
                                  {link.icon_type === 'external' && <ExternalLink className="w-4 h-4 text-brand-orange" />}
                               </div>
                               <ExternalLink className="w-5 h-5 text-brand-grey group-hover:text-brand-orange transition-colors" />
                            </div>
                            <div className="mt-8">
                               <h3 className="font-display text-2xl mb-2">{link.marketplace_name}</h3>
                               <p className="font-sans text-brand-grey text-[10px] uppercase tracking-widest">Verified Supplier Network</p>
                            </div>
                            <div className="mt-auto pt-6 border-t border-brand-border/30 flex justify-between items-center">
                               <span className="font-mono text-[8px] text-brand-grey/50 uppercase tracking-widest">Tracking Active</span>
                               <span className="font-mono text-[9px] text-brand-orange uppercase tracking-widest font-bold group-hover:translate-x-1 transition-transform">Search Inventory →</span>
                            </div>
                         </a>
                       ))
                     ) : (
                       <div className="col-span-full p-12 text-center bg-brand-obsidian border border-brand-border/50">
                         <Search className="w-8 h-8 text-brand-grey mx-auto mb-4" />
                         <p className="font-mono text-xs uppercase tracking-widest text-brand-grey">No approved marketplace conduits configured for this chassis.</p>
                       </div>
                     )}
                  </div>

                  <div className="mt-12 bg-brand-obsidian/30 p-8 border border-brand-border/30">
                    <h3 className="font-display text-lg mb-6 flex items-center gap-3">
                      <ShieldCheck className="w-5 h-5 text-brand-orange" /> BUYER INSPECTION CHECKLIST
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                       <div className="space-y-2">
                          <p className="font-mono text-[8px] text-brand-grey uppercase">Structural</p>
                          <ul className="text-[10px] space-y-1 font-sans text-brand-white">
                             <li>• Sills & Chassis Rust</li>
                             <li>• Bulkhead Condition</li>
                             <li>• Door Alignment</li>
                          </ul>
                       </div>
                       <div className="space-y-2">
                          <p className="font-mono text-[8px] text-brand-grey uppercase">Mechanical</p>
                          <ul className="text-[10px] space-y-1 font-sans text-brand-white">
                             <li>• Turbo Whine Check</li>
                             <li>• DPF Regeneration History</li>
                             <li>• Clutch Biting Point</li>
                          </ul>
                       </div>
                       <div className="space-y-2">
                          <p className="font-mono text-[8px] text-brand-grey uppercase">Legacy</p>
                          <ul className="text-[10px] space-y-1 font-sans text-brand-white">
                             <li>• Ex-Lease Service Log</li>
                             <li>• HPI Clear Check</li>
                             <li>• MOT Failure Record</li>
                          </ul>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Van Buying Checklist */}
      <section className="py-32 bg-brand-carbon border-t border-brand-border/30">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mb-16">
            <p className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.3em] mb-4">// Pre-Purchase Intelligence</p>
            <h2 className="font-display text-5xl uppercase mb-6">Van Buying <span className="text-brand-orange">Checklist</span></h2>
            <p className="font-sans text-brand-grey text-lg">
              What to check, what to avoid, and what kills the deal. Written by builders, not bloggers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Service History",
                items: [
                  "Full stamped service book or digital record minimum",
                  "At least 3 recent services documented within the last 30,000 miles",
                  "Key intervals: timing belt/chain, brake fluid, coolant",
                  "Any dealer stamps vs independent = both are fine if the work is noted",
                  "AdBlue fluid top-ups should be noted on post-2017 Sprinters and Crafters",
                ]
              },
              {
                title: "Mileage Sweet Spot",
                items: [
                  "Sprinter / Crafter: 80,000–150,000 miles is the best value bracket",
                  "Transit / Ducato: 70,000–130,000 miles for best reliability-to-price ratio",
                  "Iveco Daily 3.0L: can go to 200,000+ miles with proper maintenance",
                  "Ex-fleet vans with full dealer history are often better than low-mileage trade-ins",
                  "High mileage + full history > low mileage + no history every time",
                ]
              },
              {
                title: "Rust Inspection Points",
                items: [
                  "Rear wheel arches — lift the plastic liner and look at the steel",
                  "Underside of sliding door rail and sill behind the step",
                  "Rear bumper mounting points and crossmember",
                  "Door hinges (especially upper driver\u2019s door hinge on Sprinters)",
                  "Floor behind cab seats (common water ingress point on older vans)",
                ]
              },
              {
                title: "Ex-Fleet vs Ex-Trade",
                items: [
                  "Ex-delivery fleet = high miles but consistent motorway driving, often serviced",
                  "Ex-builder\u2019s van = harder life, more chance of low-speed damage to body",
                  "Ex-lease = often well maintained with service records, returned on schedule",
                  "Avoid ex-refrigeration without checking the floor (refrigerant spillage)",
                  "Avoid ex-ambulance — heavy modifications, cut floor, complex electrical",
                ]
              },
              {
                title: "Chassis-Specific Warning Signs",
                items: [
                  "Sprinter post-2006: check for injector seal leaks (\u2018Black Death\u2019 around injectors)",
                  "Crafter/TGE post-2017: check AdBlue system — faults are expensive",
                  "Transit 2.2 TDCi: injector issues common, check for smoke under load",
                  "Ducato: 3rd/4th gear synchro crunch on older gearboxes",
                  "Iveco Daily: dual-mass flywheel wear, check for judder at low revs",
                ]
              },
              {
                title: "Test Drive Checks",
                items: [
                  "Listen for turbo whine at 2,500+ RPM — normal hiss is fine, whistle is not",
                  "Check 4x4 engagement if applicable (listen for clicks, vibration)",
                  "Gearbox: check for hesitation in auto boxes at low speed (2nd/3rd gear shift)",
                  "Check all electrics: windows, mirrors, central locking, dashboard warnings",
                  "At 60mph: any shimmy in steering indicates wheel balancing or tracking issue",
                ]
              },
            ].map((section) => (
              <div key={section.title} className="blueprint-border bg-brand-obsidian p-8">
                <h3 className="font-display text-xl uppercase mb-6 text-brand-orange">{section.title}</h3>
                <ul className="space-y-3">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex gap-3 text-[11px] font-sans text-brand-grey leading-relaxed">
                      <span className="text-brand-orange mt-0.5 shrink-0">—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
