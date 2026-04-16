import { 
  ChevronRight, 
  AlertTriangle, 
  ArrowRight, 
  Layers,
  Shield,
  Sun,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function LightingPage() {
  const system = {
    name: "Lighting Systems",
    description: "Atmosphere inside, absolute visibility outside. Our lighting modules cover everything from high-CRI internal ambient zones to high-output external recovery and scene lights.",
    hero_image: "/images/hero-background.png"
  };

  const tiers = {
    beginner: {
      name: "Stealth Series",
      price_range: "£200 - £500",
      features: ["Warm White LED Strips", "Dimmable Bedside Lamps", "Touch-Sensitive Controls", "Basic Entry Lighting"],
      weight: "Negligible"
    },
    intermediate: {
      name: "Scene Ready",
      price_range: "£800 - £1,500",
      features: ["Multi-Zone RGBW Lighting", "Flush Exterior Scene Lights", "Low-Draw Kitchen Task Lights", "Bluetooth Zone Control"],
      weight: "2kg"
    },
    advanced: {
      name: "High-Output Luxe",
      price_range: "£2,500+",
      features: ["50-inch LED Light Bar", "Automotive Grade DRLs", "Dynamic Interior Mood Presets", "Full Automation (Switch-Pro)"],
      weight: "12kg"
    }
  };

  const mistakes = [
    {
      title: "Poor Color Rendering (CRI)",
      desc: "Low-quality LEDs make everything look clinical and cold. For the interior, we recommend high-CRI (90+) warm white (3000K) strips to ensure your space feels like a home, not an office."
    },
    {
      title: "Current Overloading",
      desc: "High-output off-road light bars can draw significant amperage. Using under-sized wires or no relays will lead to voltage drop and melted connectors."
    },
    {
      title: "Insufficient Scene Coverage",
      desc: "Many builders only light the front. When you&apos;re reversing or cooking at night outside, 360-degree scene lighting is a technical necessity for safety."
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
               LIGHTING <br/><span className="text-brand-orange">SYSTEMS</span>
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
          <h2 className="font-display text-4xl mb-16 uppercase">Luminous Engineering</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             {Object.entries(tiers).map(([key, tier]) => (
               <div key={key} className="blueprint-border p-10 flex flex-col bg-brand-carbon hover:border-brand-orange transition-all duration-500">
                 <div className="flex justify-between items-start mb-12">
                   <div className="w-12 h-12 bg-brand-obsidian flex items-center justify-center text-brand-orange">
                      {key === 'beginner' && <Sun className="w-6 h-6" />}
                      {key === 'intermediate' && <Layers className="w-6 h-6" />}
                      {key === 'advanced' && <Zap className="w-6 h-6" />}
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
                       <span className="text-brand-grey">Current Draw</span>
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
               <Zap className="w-16 h-16 text-brand-orange mb-8 outline-none" />
               <h2 className="font-display text-4xl mb-6 uppercase">Technical Pitfalls</h2>
               <p className="font-sans text-brand-grey leading-relaxed">
                 Effective lighting is a balance of aesthetic warmth and sheer technical power. Don&apos;t build a clinical environment.
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
