import { 
  ChevronRight, 
  AlertTriangle, 
  ArrowRight, 
  Layers,
  Shield,
  Sun,
  Zap,
  Lock,
  Wifi,
  Eye
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Image from "next/image";

export default function SecurityTrackingPage() {
  const system = {
    name: "Security & Tracking",
    description: "Protect your investment. Your conversion isn't just a vehicle — it's a home, a workshop, and a life on wheels. We integrate physical, electronic, and connected layers of defence.",
    hero_image: "/images/hero-background.png"
  };

  const tiers = {
    beginner: {
      name: "Deterrent",
      price_range: "£100 - £300",
      features: [
        "Steering Wheel Lock (Disklok)",
        "Slam Lock Sliding Door Upgrade",
        "L4V External Deadlocks",
        "Window Security Film"
      ],
      impact: "Opportunist Guard"
    },
    intermediate: {
      name: "Protected",
      price_range: "£300 - £600",
      features: [
        "Everything in Deterrent",
        "Thatcham Cat S7 GPS Tracker",
        "24/7 Monitored Recovery",
        "OBD Port Security Lock"
      ],
      impact: "Professional Tracking"
    },
    advanced: {
      name: "Fortress",
      price_range: "£800 - £1,500+",
      features: [
        "Everything in Protected",
        "Thatcham S5+ with ADR Tags",
        "Ghost 2 Immobiliser System",
        "Internal Motion CCTV",
        "Remote Engine Kill"
      ],
      impact: "Total Immobilisation"
    }
  };

  const mistakes = [
    {
      title: "Factory Lock Reliance",
      desc: "Standard manufacturer locks are easily defeated by common bypass tools. Without external deadlocks, a professional can enter your van in under 15 seconds."
    },
    {
      title: "Poor OBD Security",
      desc: "Thieves often use the OBD (On-Board Diagnostics) port to program new keys and drive away. An OBD lock or relocation is an essential electronic barrier."
    },
    {
      title: "Key Signal Relay",
      desc: "Modern keyless entry signals can be amplified from inside your house. Always use Faraday pouches for your keys, even when staying in the van."
    }
  ];

  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-48 pb-32 overflow-hidden border-b border-brand-border/30">
        <div className="absolute inset-0 z-0">
          <Image 
            src={system.hero_image} 
            alt={system.name} 
            fill
            className="object-cover opacity-30 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-obsidian via-transparent to-brand-obsidian" />
          <div className="blueprint-grid absolute inset-0 opacity-10 pointer-events-none" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col max-w-4xl">
             <div className="flex items-center gap-4 font-mono text-[10px] text-brand-orange uppercase mb-8 tracking-[0.3em]">
               <span className="opacity-50">Technical Modules</span>
               <ChevronRight className="w-3 h-3" />
               <span className="opacity-100">{system.name}</span>
             </div>
             <h1 className="font-display text-7xl lg:text-9xl mb-8 uppercase font-bold tracking-tighter leading-none">
               SECURITY <br/><span className="text-brand-orange">& TRACKING</span>
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
          <h2 className="font-display text-4xl mb-16 uppercase">Defence Architecture</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             {Object.entries(tiers).map(([key, tier]) => (
               <div key={key} className="blueprint-border p-10 flex flex-col bg-brand-carbon hover:border-brand-orange transition-all duration-500">
                 <div className="flex justify-between items-start mb-12">
                   <div className="w-12 h-12 bg-brand-obsidian flex items-center justify-center text-brand-orange">
                      {key === 'beginner' && <Lock className="w-6 h-6" />}
                      {key === 'intermediate' && <Wifi className="w-6 h-6" />}
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
                       <span className="text-brand-grey">Protection Class</span>
                       <span className="text-brand-orange">{tier.impact}</span>
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

      {/* 3. TRAVIO INTEGRATION */}
      <section className="py-24 bg-brand-obsidian border-y border-brand-border overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="blueprint-border p-12 lg:p-20 bg-brand-carbon relative">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
              <Wifi className="w-64 h-64" />
            </div>
            <div className="max-w-3xl relative z-10">
              <div className="flex items-center gap-4 mb-8">
                 <div className="h-px w-12 bg-brand-orange" />
                 <span className="font-mono text-xs text-brand-orange uppercase tracking-widest">Sister Brand Integration</span>
              </div>
              <h2 className="font-display text-5xl uppercase mb-8">Tracking powered by <span className="text-brand-orange">Travio</span></h2>
              <p className="font-sans text-brand-grey text-xl leading-relaxed mb-12">
                For our intermediate and advanced security tiers, we partner with Travio to provide professional-grade GPS monitoring and theft recovery services. Fully integrated with the Thatcham standard.
              </p>
              <a 
                href="https://travio.io" 
                target="_blank" 
                className="inline-flex items-center gap-4 bg-brand-orange text-white px-10 py-5 font-display text-xs uppercase tracking-widest hover:bg-white hover:text-brand-obsidian transition-all"
              >
                Visit Travio GPS <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. MISTAKES */}
      <section className="py-32 bg-brand-carbon">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-24">
            <div className="lg:w-1/3">
               <AlertTriangle className="w-16 h-16 text-brand-orange mb-8" />
               <h2 className="font-display text-4xl mb-6 uppercase">Vulnerable Nodes</h2>
               <p className="font-sans text-brand-grey leading-relaxed">
                 Security is only as strong as your weakest module. One missed deadlock or unshielded key signal is all it takes.
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

      {/* 5. INSURANCE SECTION */}
      <section className="py-32 border-t border-brand-border">
        <div className="container mx-auto px-6 text-center">
           <h2 className="font-display text-4xl uppercase mb-8">Insurance & Certifications</h2>
           <p className="font-sans text-brand-grey max-w-2xl mx-auto mb-12">
             Fitting Thatcham-certified security systems can reduce your annual insurance premiums by up to 25%. We provide full certification metadata with every advanced build blueprint.
           </p>
           <div className="flex flex-wrap justify-center gap-12 grayscale opacity-50">
              <div className="font-display text-2xl border border-brand-border px-6 py-2 uppercase tracking-tighter">Thatcham S5+</div>
              <div className="font-display text-2xl border border-brand-border px-6 py-2 uppercase tracking-tighter">Thatcham S7</div>
              <div className="font-display text-2xl border border-brand-border px-6 py-2 uppercase tracking-tighter">L4V Accredited</div>
           </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
