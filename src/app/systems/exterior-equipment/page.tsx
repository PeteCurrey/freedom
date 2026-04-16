import { 
  ChevronRight, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Layers,
  Shield,
  Box,
  Truck
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function ExteriorEquipmentPage() {
  const system = {
    name: "Exterior Equipment",
    description: "Engineering the outer shell for maximum utility. From high-capacity roof racks to modular lashing systems, we spec the gear that turns a van into a basecamp.",
    hero_image: "/Users/petercurrey/.gemini/antigravity/brain/94afb30f-4c38-44c4-a71a-42efc2c7c8f5/exterior_equipment_technical_1776372589339.png"
  };

  const tiers = {
    beginner: {
      name: "Weekend Warrior",
      price_range: "£800 - £1,500",
      features: ["Standard Roof Rails", "Rear Door Ladder", "Fixed Fiamma Awning", "Basic Lashing Points"],
      weight: "45kg"
    },
    intermediate: {
      name: "Overlander Spec",
      price_range: "£2,500 - £4,000",
      features: ["Full Aluminum Flat-Rack", "Floating Ladder", "Electric Side Awning", "Exterior Molle Panels"],
      weight: "85kg"
    },
    advanced: {
      name: "Expedition Series",
      price_range: "£6,000+",
      features: ["Heavy Duty Platform Rack", "Walking Deck", "Swing-away Tire Carrier", "Integrated Safari Snorkel"],
      weight: "140kg"
    }
  };

  const mistakes = [
    {
      title: "Gross Vehicle Weight (GVW) Overload",
      desc: "Exterior gear is heavy. Adding 150kg of steel to the roof raises the center of gravity and rapidly eats into your remaining payload."
    },
    {
      title: "Wind Noise & Aero Drag",
      desc: "Poorly positioned ladders and racks can cause severe whistling at high speeds and reduce your fuel economy by up to 15%."
    },
    {
      title: "Corrosion Pathing",
      desc: "Drilling through your van's skin without industrial-grade rust prevention and sikaflex sealing is a recipe for internal structural rot."
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
               EXTERIOR <br/><span className="text-brand-orange">GEAR</span>
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
          <h2 className="font-display text-4xl mb-16 uppercase">Mission-Specific Hardware</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             {Object.entries(tiers).map(([key, tier]) => (
               <div key={key} className="blueprint-border p-10 flex flex-col bg-brand-carbon hover:border-brand-orange transition-all duration-500">
                 <div className="flex justify-between items-start mb-12">
                   <div className="w-12 h-12 bg-brand-obsidian flex items-center justify-center text-brand-orange">
                      {key === 'beginner' && <Box className="w-6 h-6" />}
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
                       <span className="text-brand-grey">Payload Impact</span>
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
               <AlertTriangle className="w-16 h-16 text-brand-orange mb-8" />
               <h2 className="font-display text-4xl mb-6 uppercase">Engineering Pitfalls</h2>
               <p className="font-sans text-brand-grey leading-relaxed">
                 Mounting 100kg of gear to a moving vehicle requires precision. Don&apos;t let your roof rack become a safety hazard.
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
