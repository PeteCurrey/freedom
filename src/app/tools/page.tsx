import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Zap, Weight, PoundSterling, ClipboardCheck, ArrowRight, ShieldCheck, Terminal } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const tools = [
  {
    name: "DC Cable Sizing",
    slug: "cable-calculator",
    description: "Determine exact cross-sections for DC circuits based on wattage, voltage drop (3% vs 1%), and run length.",
    icon: Zap,
    status: "active",
    image: "/images/tech-electrical.png",
    tagline: "Safety Standard // BS EN 1648-2"
  },
  {
    name: "Payload & GVM Calc",
    slug: "payload-calculator",
    description: "Real-time mass estimation for water, fuel, batteries, and furniture to ensure compliance with vehicle GVM.",
    icon: Weight,
    status: "planned",
    image: "/images/tech-water.png",
    tagline: "Weight Registry // GVM Limits"
  },
  {
    name: "System Cost Analysis",
    slug: "cost-estimator",
    description: "Deep-dive budget forecasting based on component selection tiers from the official Amplios hardware registry.",
    icon: PoundSterling,
    status: "planned",
    image: "/images/tech-interior.png",
    tagline: "Financial Hub // Project Budget"
  },
  {
    name: "Compliance Audit",
    slug: "compliance-checker",
    description: "Step-by-step verification of gas, electrical, and structural standards for DVLA reclassification.",
    icon: ClipboardCheck,
    status: "planned",
    image: "/images/store-hero.png",
    tagline: "Legal Node // RCD / UKCA"
  }
];

export default function EngineeringHub() {
  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-48 pb-32 overflow-hidden">
        <div className="blueprint-grid absolute inset-0 opacity-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-orange/5 via-transparent to-brand-obsidian" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-brand-orange/10 border border-brand-orange/30 backdrop-blur-md mb-12">
              <Terminal className="w-1.5 h-1.5 text-brand-orange" />
              <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[.4em]">Decision Support Registry // Node 04</span>
            </div>
            
            <h1 className="font-display text-7xl lg:text-9xl uppercase mb-8 leading-[0.8] tracking-tighter">
              ENGINEERING <br />
              <span className="text-brand-orange">HUB</span>
            </h1>
            
            <p className="font-sans text-brand-grey text-xl lg:text-2xl leading-relaxed max-w-2xl mb-12">
              Definitive calculations for professional-grade self-builds. Eliminate guesswork with our proprietary engineering modules.
            </p>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="pb-48">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-brand-border/30">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <div 
                  key={tool.slug}
                  className="group relative bg-brand-carbon/50 backdrop-blur-sm overflow-hidden flex flex-col"
                >
                  {/* Background Image Layer */}
                  <div className="absolute inset-0 z-0 opacity-20 grayscale group-hover:scale-110 transition-transform duration-700 pointer-events-none">
                    <Image 
                      src={tool.image}
                      alt={tool.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-brand-obsidian/80" />
                  </div>

                  <div className="p-12 relative z-10 flex flex-col h-full border border-brand-border/20">
                    <div className="flex justify-between items-start mb-24">
                       <div className="w-16 h-16 blueprint-border flex items-center justify-center text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-all duration-500">
                          <Icon className="w-8 h-8" />
                       </div>
                       {tool.status === 'active' ? (
                         <span className="font-mono text-[8px] text-brand-orange tracking-widest uppercase border border-brand-orange/30 px-3 py-1">Operational</span>
                       ) : (
                         <span className="font-mono text-[8px] text-brand-grey tracking-widest uppercase border border-brand-border/30 px-3 py-1">In Development</span>
                       )}
                    </div>

                    <div className="mt-auto">
                      <span className="font-mono text-[10px] text-brand-orange uppercase tracking-widest block mb-4 italic">{tool.tagline}</span>
                      <h3 className="font-display text-4xl uppercase mb-6 group-hover:text-brand-orange transition-colors">{tool.name}</h3>
                      <p className="font-sans text-brand-grey text-lg leading-relaxed mb-12 max-w-sm">
                        {tool.description}
                      </p>

                      {tool.status === 'active' ? (
                        <Link 
                          href={`/tools/${tool.slug}`}
                          className="inline-flex items-center gap-4 bg-brand-orange text-white px-10 py-5 font-display text-xs uppercase tracking-widest hover:bg-white hover:text-brand-obsidian transition-all"
                        >
                          Initialize Module <ArrowRight className="w-4 h-4" />
                        </Link>
                      ) : (
                        <div className="inline-flex items-center gap-4 border border-brand-border text-brand-grey/50 px-10 py-5 font-display text-xs uppercase tracking-widest cursor-not-allowed">
                          Module Locked
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Standards Banner */}
          <div className="mt-32 blueprint-border p-12 lg:p-24 relative overflow-hidden group">
             <div className="blueprint-grid absolute inset-0 opacity-10" />
             <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                <div className="max-w-2xl">
                   <div className="flex items-center gap-4 mb-8">
                      <ShieldCheck className="w-10 h-10 text-brand-orange" />
                      <span className="font-mono text-xs text-brand-grey uppercase tracking-widest">Compliance Registry</span>
                   </div>
                   <h2 className="font-display text-5xl uppercase mb-8 leading-none">
                      Technical <span className="text-brand-orange">Standards</span> Library
                   </h2>
                   <p className="font-sans text-brand-grey text-xl leading-relaxed">
                      All calculations are aligned with current UK and European regulations for habitation vehicles, including BS EN 1648, BS EN 1949, and RCD guidelines.
                   </p>
                </div>
                <Link 
                  href="/resources"
                  className="bg-white text-brand-obsidian px-12 py-6 font-display text-xs uppercase tracking-widest hover:bg-brand-orange hover:text-white transition-all whitespace-nowrap"
                >
                  View Standards Library
                </Link>
             </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
