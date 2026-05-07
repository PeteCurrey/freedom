"use client";

import { CATEGORIES, PRODUCTS, getProductCTA } from "@/lib/data/productRegistry";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { 
  ArrowRight, BookOpen, Settings, Package, Sparkles, 
  Zap, Truck, ShieldCheck, Gauge, Search, Filter, CheckCircle2
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function StoreHub() {
  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />
      
      {/* 1. TECHNICAL HERO */}
      <section className="relative pt-48 pb-32 flex flex-col items-center justify-center overflow-hidden border-b border-brand-border">
        <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em] mb-6 block animate-pulse">// Official Parts Registry</span>
            <h1 className="font-display text-5xl md:text-7xl lg:text-[7.5rem] mb-8 uppercase leading-[0.85] tracking-tighter text-white drop-shadow-2xl">
              GEAR FOR<br />
              SERIOUS <span className="text-brand-orange">BUILDS</span>
            </h1>
            <p className="font-sans text-brand-grey text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-16 italic">
              "Professional-grade components engineered for high-performance off-grid living. Every product in this registry is cross-referenced for system compatibility."
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link href="/planner" className="bg-brand-orange text-white px-10 py-5 font-display text-xs uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all shadow-2xl font-bold">Launch AI Build Planner</Link>
              <Link href="#categories" className="bg-brand-carbon border border-brand-border text-white px-10 py-5 font-display text-xs uppercase tracking-widest hover:border-brand-orange transition-all">Browse System Hubs</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SYSTEM CATEGORY GRID */}
      <section id="categories" className="py-32">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-16">
             <div className="max-w-xl">
                <h2 className="font-display text-4xl lg:text-5xl uppercase tracking-tighter mb-4 italic">// System Hubs</h2>
                <p className="font-sans text-brand-grey text-base">Select a system category to view technical specifications and compatible hardware bundles.</p>
             </div>
             <div className="hidden lg:flex items-center gap-4">
                <span className="font-mono text-[10px] text-brand-grey uppercase tracking-widest">Total Registry Depth: 12 Hubs / 400+ SKUs</span>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-brand-border border border-brand-border shadow-2xl">
            {CATEGORIES.map((cat) => (
              <Link 
                key={cat.id} 
                href={`/store/${cat.id}`}
                className="bg-brand-obsidian p-10 group hover:bg-brand-carbon/40 transition-all flex flex-col h-[320px] relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                   <Package className="w-32 h-32 text-brand-orange" />
                </div>
                
                <div className="bg-brand-carbon border border-brand-border w-12 h-12 flex items-center justify-center mb-8 group-hover:border-brand-orange transition-colors">
                   <Zap className="w-5 h-5 text-brand-orange" />
                </div>
                
                <h3 className="font-display text-2xl uppercase tracking-tight mb-4 text-white group-hover:text-brand-orange transition-colors">{cat.name}</h3>
                <p className="font-sans text-xs text-brand-grey leading-relaxed flex-1 mb-8">
                  {cat.description}
                </p>
                
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-brand-border/30">
                   <span className="font-mono text-[9px] text-brand-orange uppercase tracking-widest">Explore Hub</span>
                   <ArrowRight className="w-4 h-4 text-brand-orange group-hover:translate-x-2 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED BUILD KITS */}
      <section className="py-32 bg-[#080808] border-y border-brand-border relative overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-5 pointer-events-none" />
        <div className="container mx-auto px-6">
          <div className="text-center mb-24 max-w-2xl mx-auto">
             <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.2em] mb-4 block animate-pulse">// Engineered Bundles</span>
             <h2 className="font-display text-5xl lg:text-7xl uppercase tracking-tighter">Project <span className="text-brand-orange">Kits</span></h2>
             <p className="font-sans text-brand-grey text-lg leading-relaxed mt-6 italic">"Save 15-25% on component costs and 20+ hours on specification with our pre-configured system bundles."</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             {[
               { name: "Full Autonomy Electrical", price: "£3,450", sub: "Victron 3kVA / 460Ah Lithium", icon: Zap },
               { name: "Off-Grid Solar Upgrade", price: "£850", sub: "350W Array / MPPT / Monitoring", icon: Sparkles },
               { name: "Four Season Climate", price: "£2,100", sub: "Diesel Heating & Insulated Water", icon: Settings },
             ].map((kit, i) => (
               <div key={i} className="bg-brand-carbon border border-brand-border p-12 group hover:border-brand-orange transition-all shadow-2xl relative">
                  <div className="flex justify-between items-start mb-12">
                     <div className="bg-brand-obsidian p-4 border border-brand-border">
                        <kit.icon className="w-6 h-6 text-brand-orange" />
                     </div>
                     <span className="font-mono text-[9px] bg-brand-orange text-white px-3 py-1 uppercase tracking-widest font-bold animate-pulse">Save 20%</span>
                  </div>
                  <h3 className="font-display text-3xl uppercase tracking-tight mb-4 group-hover:text-brand-orange transition-colors">{kit.name}</h3>
                  <p className="font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-12">{kit.sub}</p>
                  <div className="flex justify-between items-end border-t border-brand-border/40 pt-8">
                     <div className="space-y-1">
                        <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest block">Project Price</span>
                        <span className="font-display text-4xl text-white">{kit.price}</span>
                     </div>
                     <Link href="/store/kits" className="bg-brand-orange text-white p-4 hover:bg-white hover:text-brand-obsidian transition-all">
                        <ArrowRight className="w-5 h-5" />
                     </Link>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* 4. PLANNER BRIDGE */}
      <section className="py-32 bg-brand-obsidian">
         <div className="container mx-auto px-6">
            <div className="bg-brand-carbon border border-brand-border p-12 lg:p-20 flex flex-col lg:flex-row items-center gap-16 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-12 opacity-5 text-brand-orange">
                  <Gauge className="w-64 h-64" />
               </div>
               <div className="flex-1 space-y-8 relative z-10">
                  <h2 className="font-display text-5xl lg:text-7xl uppercase tracking-tighter leading-tight">Can't Find the <span className="text-brand-orange">Right Part?</span></h2>
                  <p className="font-sans text-brand-grey text-xl leading-relaxed max-w-2xl">
                     Don't guess your specs. Use our AI Build Planner to engineer your entire system stack. We'll generate a locked project basket with every part you need, guaranteed to work together.
                  </p>
                  <Link href="/planner" className="inline-block bg-brand-white text-brand-obsidian px-12 py-6 font-display text-base uppercase tracking-widest hover:bg-brand-orange hover:text-white transition-all shadow-2xl font-bold">
                     Launch AI Planner →
                  </Link>
               </div>
               <div className="w-full lg:w-96 space-y-6">
                  <div className="bg-brand-obsidian p-8 border border-brand-border">
                     <h4 className="font-display text-xs uppercase tracking-widest mb-6 border-b border-brand-border pb-4 italic text-brand-orange">// System Benefits</h4>
                     <ul className="space-y-4">
                        {['Guaranteed Parity', 'UK Safety Compliance', 'Weight & Payload Audit', 'Bulk Bundle Savings'].map(b => (
                          <li key={b} className="flex items-center gap-3">
                             <CheckCircle2 className="w-4 h-4 text-brand-orange" />
                             <span className="font-mono text-[10px] text-brand-grey uppercase tracking-widest">{b}</span>
                          </li>
                        ))}
                     </ul>
                  </div>
               </div>
            </div>
         </div>
      </section>

      <Footer />
    </main>
  );
}
