import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight, Maximize2, MapPin, Gauge } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const projects = [
  {
    id: 1,
    name: "The Alpine Overlander",
    chassis: "Mercedes Sprinter L3H2",
    location: "Swiss Alps",
    systemTier: "Advanced Electrical",
    cost: "£35k Build",
    image: "/images/hero-background.png",
    description: "Designed for sub-zero temperatures and 14-day off-grid autonomy."
  },
  {
    id: 2,
    name: "The Coastal Studio",
    chassis: "Ford Transit L2H2",
    location: "Cornwall, UK",
    systemTier: "Intermediate Electrical",
    cost: "£18k Build",
    image: "/images/interior-showcase.png",
    description: "A digital nomad hub with high-speed satellite connectivity and ergonomic workspace."
  },
  {
    id: 3,
    name: "The Stealth City-Hacker",
    chassis: "VW Crafter L3H3",
    location: "London, UK",
    systemTier: "Advanced Heating",
    cost: "£22k Build",
    image: "/images/community-showcase.png",
    description: "Maximum utility in a zero-branding shell for urban living and weekend escapes."
  },
  {
    id: 4,
    name: "The Expedition Beast",
    chassis: "Iveco Daily 4x4",
    location: "Highlands, Scotland",
    systemTier: "Ultimate Autonomy",
    cost: "£55k Build",
    image: "/images/systems-showcase.png",
    description: "The peak of off-grid engineering. 4x4 capability with full residential amenities."
  }
];

export default function ShowcasePage() {
  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />
      
      {/* Cinematic Hero */}
      <section className="relative pt-64 pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/community-showcase.png" 
            alt="Showcase Hero" 
            className="w-full h-full object-cover opacity-20 grayscale scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-obsidian via-transparent to-brand-obsidian" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="font-display text-7xl lg:text-[12vw] mb-8 uppercase tracking-tighter leading-none font-bold">
            INSPIRATION <span className="text-brand-orange">LIVES</span> HERE
          </h1>
          <p className="font-sans text-brand-grey text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed">
            Real builds, engineered with real blueprints. Explore the global community of DIY Motorhomes builders.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24 relative">
         <div className="blueprint-grid absolute inset-0 opacity-5 pointer-events-none" />
         <div className="container mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
               {projects.map((p) => (
                 <div key={p.id} className="group relative flex flex-col">
                    <div className="relative aspect-[16/10] overflow-hidden blueprint-border bg-brand-carbon">
                       <img 
                          src={p.image} 
                          alt={p.name} 
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                       />
                       
                       {/* Overlay HUD */}
                       <div className="absolute inset-x-0 bottom-0 p-8 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-brand-obsidian to-transparent">
                          <div className="flex justify-between items-end">
                             <div className="space-y-4">
                                <div className="flex gap-6 font-mono text-[9px] uppercase tracking-[0.2em] text-white">
                                   <span className="flex items-center gap-2"><MapPin className="w-3 h-3 text-brand-orange" /> {p.location}</span>
                                   <span className="flex items-center gap-2"><Gauge className="w-3 h-3 text-brand-orange" /> {p.cost}</span>
                                </div>
                                <h3 className="font-display text-4xl text-white uppercase">{p.name}</h3>
                             </div>
                             <button className="w-14 h-14 bg-brand-orange flex items-center justify-center text-white hover:bg-white hover:text-brand-orange transition-all">
                                <Maximize2 className="w-6 h-6" />
                             </button>
                          </div>
                       </div>
                    </div>

                    <div className="mt-8 flex justify-between items-start">
                       <div className="max-w-md">
                          <p className="font-mono text-[10px] text-brand-orange uppercase tracking-widest mb-2">{p.chassis} {"//"} {p.systemTier}</p>
                          <p className="font-sans text-brand-grey text-sm leading-relaxed">{p.description}</p>
                       </div>
                       <Link 
                          href={`/showcase/${p.id}`}
                          className="font-mono text-[10px] uppercase tracking-widest text-brand-white border-b border-brand-orange/30 hover:border-brand-orange transition-all pb-1 flex items-center gap-2 shrink-0"
                       >
                          View Build BOM <ArrowRight className="w-3 h-3" />
                       </Link>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Submit Your Build CTA */}
      <section className="py-32 bg-brand-carbon border-y border-brand-border/30">
         <div className="container mx-auto px-6 text-center">
            <h2 className="font-display text-5xl uppercase mb-8">Have a Finished Build?</h2>
            <p className="font-sans text-brand-grey text-xl max-w-2xl mx-auto mb-16">
               Help the community by sharing your BOM and build photos. We&apos;ll feature the best conversions on the hub.
            </p>
            <button className="bg-brand-orange px-12 py-5 font-display text-xs uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all">
               Submit Your Project
            </button>
         </div>
      </section>

      <Footer />
    </main>
  );
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
