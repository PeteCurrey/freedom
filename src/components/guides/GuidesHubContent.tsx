"use client";

import { GUIDE_HUBS, GUIDES } from "@/lib/data/guides";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { 
  Zap, Thermometer, Droplet, Wind, Bath, Shield, 
  ArrowRight
} from "lucide-react";
import Link from "next/link";

const iconMap: Record<string, any> = {
  zap: Zap,
  thermometer: Thermometer,
  droplet: Droplet,
  wind: Wind,
  bath: Bath,
  shield: Shield
};

export default function GuidesHubContent() {
  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <section className="pt-48 pb-20 bg-brand-carbon relative overflow-hidden border-b border-brand-border">
         <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />
         <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
            <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em] block mb-6">// Knowledge Base & Authority Hub</span>
            <h1 className="font-display text-6xl lg:text-8xl uppercase tracking-tighter mb-8 leading-tight">Engineering <span className="text-brand-orange">Library</span></h1>
            <p className="font-sans text-brand-grey text-xl leading-relaxed">
               Expert technical guides for high-performance DIY campervan conversions. No fluff, just engineered standards for off-grid living.
            </p>
         </div>
      </section>

      {/* HUB CLUSTERS */}
      <section className="py-32">
         <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {GUIDE_HUBS.map((hub) => {
                 const Icon = iconMap[hub.icon];
                 const hubGuides = Object.values(GUIDES).filter(g => g.hub === hub.id);
                 
                 return (
                   <div key={hub.id} className="bg-brand-carbon border border-brand-border p-12 hover:border-brand-orange/50 transition-all group flex flex-col h-full shadow-2xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                         <Icon className="w-40 h-40" />
                      </div>
                      
                      <div className="bg-brand-orange/10 p-4 border border-brand-orange/20 w-fit mb-8">
                         <Icon className="w-6 h-6 text-brand-orange" />
                      </div>
                      
                      <h2 className="font-display text-3xl uppercase tracking-tighter mb-6">{hub.name}</h2>
                      
                      <div className="space-y-4 flex-1 mb-12 relative z-10">
                         {hubGuides.map(guide => (
                           <Link key={guide.slug} href={`/guides/${guide.slug}`} className="flex items-center justify-between group/link">
                              <span className="font-sans text-sm text-brand-grey group-hover/link:text-white transition-colors">{guide.title}</span>
                              <ArrowRight className="w-3 h-3 text-brand-orange opacity-0 group-hover/link:opacity-100 -translate-x-2 group-hover/link:translate-x-0 transition-all" />
                           </Link>
                         ))}
                         {hubGuides.length === 0 && (
                           <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest italic">Articles Loading...</span>
                         )}
                      </div>

                      <Link href={`/store?hub=${hub.id}`} className="font-mono text-[10px] text-brand-orange uppercase tracking-widest flex items-center gap-2 hover:text-white transition-colors mt-auto pt-6 border-t border-brand-border/30">
                         View {hub.name} Products <ArrowRight className="w-3 h-3" />
                      </Link>
                   </div>
                 );
               })}
            </div>
         </div>
      </section>

      {/* PLANNER CALLOUT */}
      <section className="py-32 bg-brand-orange relative overflow-hidden">
         <div className="absolute inset-0 blueprint-grid opacity-10" />
         <div className="container mx-auto px-6 relative z-10 text-center text-brand-obsidian">
            <h2 className="font-display text-5xl lg:text-7xl uppercase tracking-tighter mb-8 leading-none">Ready to <span className="italic">Spec</span> Your Build?</h2>
            <p className="font-sans text-xl font-medium mb-12 max-w-2xl mx-auto opacity-90">
               Instead of reading every guide, let our AI Build Planner engineer your entire system stack in less than 5 minutes.
            </p>
            <Link href="/planner" className="bg-brand-obsidian text-white px-12 py-6 font-display text-base uppercase tracking-widest hover:bg-white hover:text-brand-obsidian transition-all shadow-2xl inline-block font-bold">
               Start AI Build Planner →
            </Link>
         </div>
      </section>

      <Footer />
    </main>
  );
}
