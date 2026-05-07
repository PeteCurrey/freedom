"use client";

import { use } from "react";
import { VEHICLE_KITS } from "@/lib/data/vehicleKits";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { 
  CheckCircle2, AlertTriangle, ShieldCheck, Zap, 
  ArrowRight, Info, Package, Hammer, Gauge, Scale
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function VehicleKitPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const kit = VEHICLE_KITS[resolvedParams.slug];

  if (!kit) {
    return (
      <div className="min-h-screen bg-brand-obsidian flex items-center justify-center">
        <h1 className="text-white font-display text-4xl">Kit Not Found</h1>
      </div>
    );
  }

  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <section className="pt-40 pb-32 bg-brand-carbon relative overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-10" />
        <div className="container mx-auto px-6 relative z-10 text-center max-w-5xl">
           <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em] block mb-6">// {kit.name} Conversion Ecosystem</span>
           <h1 className="font-display text-6xl lg:text-8xl uppercase tracking-tighter mb-12 leading-tight">
              {kit.headline.split(' ').map((word, i) => (
                <span key={i} className={cn(i === kit.headline.split(' ').length - 1 ? "text-brand-orange" : "")}>{word} </span>
              ))}
           </h1>
           <p className="font-sans text-brand-grey text-xl leading-relaxed max-w-3xl mx-auto mb-16">
              {kit.shortPositioning}
           </p>
           <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link href="/planner" className="bg-brand-orange text-white px-10 py-5 font-display text-xs uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all shadow-2xl">Build My {kit.name} Plan</Link>
              <Link href="#tiers" className="bg-brand-carbon border border-brand-border text-white px-10 py-5 font-display text-xs uppercase tracking-widest hover:border-brand-orange transition-all">View Kit Tiers</Link>
           </div>
        </div>
      </section>

      {/* SUITABILITY SUMMARY */}
      <section className="py-24 border-y border-brand-border bg-brand-obsidian/50">
         <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
               <div className="space-y-12">
                  <h2 className="font-display text-4xl uppercase tracking-tighter italic">// Suitability Summary</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div>
                        <span className="font-mono text-[9px] text-brand-orange uppercase tracking-widest block mb-4">Payload Capacity</span>
                        <p className="font-sans text-xs text-brand-grey leading-relaxed">{kit.suitability.payload}</p>
                     </div>
                     <div>
                        <span className="font-mono text-[9px] text-brand-orange uppercase tracking-widest block mb-4">Off-Grid Potential</span>
                        <p className="font-sans text-xs text-brand-grey leading-relaxed">{kit.suitability.offGrid}</p>
                     </div>
                     <div>
                        <span className="font-mono text-[9px] text-brand-orange uppercase tracking-widest block mb-4">Ease of Conversion</span>
                        <p className="font-sans text-xs text-brand-grey leading-relaxed">{kit.suitability.easeOfConversion}</p>
                     </div>
                     <div>
                        <span className="font-mono text-[9px] text-brand-orange uppercase tracking-widest block mb-4">Common Limitations</span>
                        <p className="font-sans text-xs text-brand-grey leading-relaxed">{kit.suitability.limitations}</p>
                     </div>
                  </div>
               </div>
               <div className="bg-brand-carbon p-12 border border-brand-border relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-5">
                     <Gauge className="w-40 h-40" />
                  </div>
                  <h3 className="font-display text-2xl uppercase tracking-tight mb-8">Primary Use Cases</h3>
                  <div className="space-y-4">
                     {kit.suitability.useCases.map((use, i) => (
                       <div key={i} className="flex items-center gap-4 py-4 border-b border-brand-border/30 last:border-0">
                          <CheckCircle2 className="w-4 h-4 text-brand-orange" />
                          <span className="font-display text-sm uppercase tracking-widest text-white">{use}</span>
                       </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* KIT TIERS */}
      <section id="tiers" className="py-32">
         <div className="container mx-auto px-6 text-center mb-20">
            <h2 className="font-display text-5xl uppercase tracking-tighter mb-6">Engineered <span className="text-brand-orange">Kit Tiers</span></h2>
            <p className="font-mono text-[10px] text-brand-grey uppercase tracking-[0.2em]">Select your performance baseline</p>
         </div>
         <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               {Object.entries(kit.tiers).map(([key, tier]) => (
                 <div key={key} className={cn(
                   "bg-brand-carbon border p-12 flex flex-col group transition-all",
                   key === 'offGrid' ? "border-brand-orange shadow-2xl shadow-brand-orange/10 scale-105 z-10" : "border-brand-border hover:border-brand-orange/50"
                 )}>
                    {key === 'offGrid' && (
                      <div className="bg-brand-orange text-white font-mono text-[8px] uppercase tracking-widest px-3 py-1 self-start mb-6 rounded-full">Most Popular</div>
                    )}
                    <h3 className="font-display text-2xl uppercase tracking-tight mb-4">{tier.name}</h3>
                    <p className="font-sans text-xs text-brand-grey leading-relaxed mb-8 h-10 overflow-hidden">{tier.description}</p>
                    <div className="text-3xl font-display mb-12">{tier.priceEstimate}</div>
                    
                    <div className="flex-1 space-y-6 mb-12">
                       {Object.entries(tier.specs).map(([spec, val]) => (
                         <div key={spec} className="flex justify-between items-center border-b border-brand-border/30 pb-3">
                            <span className="font-mono text-[8px] text-brand-grey uppercase tracking-widest">{spec}</span>
                            <span className="font-sans text-[10px] text-white font-bold text-right max-w-[140px] truncate">{val}</span>
                         </div>
                       ))}
                    </div>

                    <Link href={`/planner?vehicle=${kit.slug}`} className={cn(
                      "w-full py-5 font-display text-[10px] uppercase tracking-widest text-center transition-all",
                      key === 'offGrid' ? "bg-brand-orange text-white" : "bg-brand-white text-brand-obsidian hover:bg-brand-orange hover:text-white"
                    )}>
                       Configure this Kit
                    </Link>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* COMPLIANCE & RISK */}
      <section className="py-24 bg-red-950/10 border-y border-red-500/20">
         <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center gap-12 bg-brand-carbon border border-red-500/20 p-12 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-12 opacity-5 text-red-500">
                  <AlertTriangle className="w-40 h-40" />
               </div>
               <div className="shrink-0 bg-red-500/10 p-6 border border-red-500/20">
                  <ShieldCheck className="w-12 h-12 text-red-500" />
               </div>
               <div className="flex-1">
                  <h3 className="font-display text-2xl uppercase tracking-tight text-white mb-4">UK Compliance & Safety Protocols</h3>
                  <p className="font-sans text-sm text-brand-grey leading-relaxed max-w-4xl">
                     Converting a {kit.name} requires adherence to strict UK safety standards. Our kits are designed with payload distribution, ventilation, and electrical isolation in mind. 
                     <strong> Warning:</strong> Every build approaching 3.5t gross weight requires a formal weight bridge certificate to remain road-legal.
                  </p>
               </div>
               <Link href="/guides/campervan-compliance-uk" className="font-mono text-[10px] text-red-500 uppercase tracking-widest border border-red-500/30 px-8 py-4 hover:bg-red-500 hover:text-white transition-all whitespace-nowrap">
                  Read Compliance Guide
               </Link>
            </div>
         </div>
      </section>

      <Footer />
    </main>
  );
}
