import { 
  ChevronRight, 
  AlertTriangle, 
  ArrowRight, 
  Layers,
  Shield,
  Disc,
  LifeBuoy
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function WheelsTyresPage() {
  const system = {
    name: "Wheels & Tyres",
    description: "The primary intersection of your build and the earth. Load ratings, offsets, and tread patterns are the silent guardians of your stability and safety on the road and trail.",
    hero_image: "/Users/petercurrey/.gemini/antigravity/brain/94afb30f-4c38-44c4-a71a-42efc2c7c8f5/wheels_tyres_technical_1776372604319.png"
  };

  const tiers = {
    beginner: {
      name: "OEM+ Upgrade",
      price_range: "£400 - £800",
      features: ["All-Season Performance Tyres", "Factory Steel Wheels", "Standard Load Rating", "Quiet Highway Running"],
      weight: "Standard"
    },
    intermediate: {
      name: "Adventure Series",
      price_range: "£1,200 - £2,000",
      features: ["3 Peak Mountain Snowflake Rated", "Matte Black Alloys", "Heavy Load Index (121/118)", "Gravel Track Capability"],
      weight: "+15kg per corner"
    },
    advanced: {
      name: "Expedition Tech",
      price_range: "£3,500+",
      features: ["Forged Beadlock Wheels", "Mud Terrain Compounds", "Reinforced Sidewalls", "Full Floating Spare System"],
      weight: "+25kg per corner"
    }
  };

  const mistakes = [
    {
      title: "Under-Rated Load Capacity",
      desc: "A fully built camper can weigh over 3 tonnes. Using standard passenger car wheels or lower-rated tyres will lead to catastrophic sidewall failure and blowout."
    },
    {
      title: "Incorrect Wheel Offset",
      desc: "Getting the 'stance' wrong isn&apos;t just about looks. Incorrect offsets cause tyres to rub on wheel arches and lead to premature bearing wear."
    },
    {
      title: "Unbalanced Rolling Mass",
      desc: "Massive off-road tyres are incredibly heavy. If not balanced with precision, they will vibrate through the entire chassis and destroy your suspension bushings."
    }
  ];

  return (
    <main className="bg-brand-obsidian">
      <Navbar />
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-48 pb-32 overflow-hidden border-b border-brand-border/30">
        <div className="absolute inset-0 z-0">
          <img 
            src={system.hero_image} 
            alt={system.name} 
            className="w-full h-full object-cover opacity-30 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-obsidian via-transparent to-brand-obsidian" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col max-w-4xl">
             <div className="flex items-center gap-4 font-mono text-[10px] text-brand-orange uppercase mb-8 tracking-[0.3em]">
               <span className="opacity-50">Technical Modules</span>
               <ChevronRight className="w-3 h-3" />
               <span className="opacity-100">{system.name}</span>
             </div>
             <h1 className="font-display text-7xl lg:text-9xl mb-8 uppercase font-bold tracking-tighter leading-none">
               WHEELS <br/><span className="text-brand-orange">& TYRES</span>
             </h1>
             <p className="font-sans text-brand-grey text-xl lg:text-2xl leading-relaxed max-w-2xl">
               {system.description}
             </p>
          </div>
        </div>
      </section>

      {/* 2. TIERS */}
      <section className="py-32 relative">
        <div className="blueprint-grid absolute inset-0 opacity-5 pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="font-display text-4xl mb-16 uppercase">Foundation Engineering</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             {Object.entries(tiers).map(([key, tier]) => (
               <div key={key} className="blueprint-border p-10 flex flex-col bg-brand-carbon hover:border-brand-orange transition-all duration-500">
                 <div className="flex justify-between items-start mb-12">
                   <div className="w-12 h-12 bg-brand-obsidian flex items-center justify-center text-brand-orange">
                      {key === 'beginner' && <Disc className="w-6 h-6" />}
                      {key === 'intermediate' && <Layers className="w-6 h-6" />}
                      {key === 'advanced' && <Shield className="w-6 h-6" />}
                   </div>
                   <span className="font-mono text-[8px] text-brand-grey uppercase tracking-widest">{key} LEVEL</span>
                 </div>
                 
                 <h3 className="font-display text-2xl uppercase mb-2">{tier.name}</h3>
                 <div className="font-display text-4xl mb-8 text-brand-white">{tier.price_range}</div>
                 
                 <div className="space-y-4 mb-12 flex-1">
                   {tier.features?.map((f: string) => (
                     <div key={f} className="flex items-start gap-3">
                       <div className="w-4 h-4 rounded-full border border-brand-orange/30 flex items-center justify-center shrink-0 mt-0.5">
                          <div className="w-1 h-1 bg-brand-orange rounded-full" />
                       </div>
                       <span className="font-mono text-[9px] text-brand-grey uppercase tracking-wider">{f}</span>
                     </div>
                   ))}
                 </div>

                 <div className="pt-8 border-t border-brand-border space-y-4">
                    <div className="flex justify-between font-mono text-[10px] uppercase tracking-widest">
                       <span className="text-brand-grey">Mechanical Stress</span>
                       <span className="text-brand-orange">{tier.weight}</span>
                    </div>
                    <Link 
                      href="/planner" 
                      className="w-full py-4 flex items-center justify-center gap-2 bg-brand-obsidian border border-brand-border font-mono text-[10px] uppercase tracking-widest hover:border-brand-orange transition-all"
                    >
                      Configure in Planner <ArrowRight className="w-3 h-3 text-brand-orange" />
                    </Link>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* 3. MISTAKES */}
      <section className="py-32 bg-brand-carbon">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-24">
            <div className="lg:w-1/3">
               <LifeBuoy className="w-16 h-16 text-brand-orange mb-8" />
               <h2 className="font-display text-4xl mb-6 uppercase">Safety Protocols</h2>
               <p className="font-sans text-brand-grey leading-relaxed">
                 When you&apos;re 100 miles from the nearest town, your tyres are your only connection to stability. Don&apos;t compromise on the specs.
               </p>
            </div>
            <div className="flex-1 space-y-8">
              {mistakes.map((m, i) => (
                <div key={i} className="blueprint-border p-12 bg-brand-obsidian">
                  <h3 className="font-display text-2xl uppercase mb-4 text-brand-orange">0{i+1} // {m.title}</h3>
                  <p className="font-sans text-brand-grey leading-relaxed">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
