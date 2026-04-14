import { createClient } from "@supabase/supabase-js";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { 
  Zap, Thermometer, Droplets, Shield, Layers, Layout,
  ChevronRight, AlertTriangle, CheckCircle2, ShoppingBag, ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

// Initialize admin client to fetch content
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder_key'
);

export default async function SystemSlugPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  // 1. Fetch system data from build_systems
  const { data: system, error } = await supabaseAdmin
    .from('build_systems')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !system) {
    return (
      <main className="bg-brand-obsidian min-h-screen flex flex-col items-center justify-center p-6">
          <h1 className="font-display text-4xl mb-4 uppercase">System Module Not Found</h1>
          <p className="font-mono text-brand-grey text-xs mb-8 uppercase tracking-widest">ERROR CODE: 404 {"//"} SYSTEM_IDENTIFIER_INVALID</p>
          <Link href="/systems" className="blueprint-border px-8 py-4 font-mono text-[10px] uppercase tracking-widest hover:bg-brand-orange transition-all">
            Return to Systems Hub
          </Link>
      </main>
    );
  }

  const tiers = system.tiers || {};
  const mistakes = system.common_mistakes || [];

  return (
    <main className="bg-brand-obsidian">
      <Navbar />
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-48 pb-32 overflow-hidden border-b border-brand-border/30">
        <div className="absolute inset-0 z-0">
          <img 
            src={system.hero_image || "/images/systems-showcase.png"} 
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
               {system.name}
             </h1>
             <p className="font-sans text-brand-grey text-xl lg:text-2xl leading-relaxed max-w-2xl">
               {system.description}
             </p>
          </div>
        </div>
      </section>

      {/* 2. SKILL TIERS / CONFIGURATIONS */}
      <section className="py-32 relative">
        <div className="blueprint-grid absolute inset-0 opacity-5 pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-24 gap-8">
            <div className="max-w-2xl">
              <h2 className="font-display text-4xl mb-6 uppercase">Mission-Specific Tiers</h2>
              <p className="font-sans text-brand-grey">
                Your build&apos;s technical depth is dictated by your mission profile. Choose the tier that matches your autonomy requirements.
              </p>
            </div>
            <div className="flex gap-4">
              {['Beginner', 'Intermediate', 'Advanced'].map(t => (
                <div key={t} className="px-6 py-2 border border-brand-border font-mono text-[10px] uppercase tracking-widest text-brand-grey">
                  {t}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             {Object.entries(tiers).map(([key, tier]: [string, any]) => (
               <div key={key} className={cn(
                 "blueprint-border p-10 flex flex-col bg-brand-carbon hover:border-brand-orange transition-all duration-500",
                 key === 'intermediate' && "border-white/20 shadow-2xl shadow-brand-orange/5"
               )}>
                 <div className="flex justify-between items-start mb-12">
                   <div className="w-12 h-12 bg-brand-obsidian flex items-center justify-center text-brand-orange">
                      {key === 'beginner' && <CheckCircle2 className="w-6 h-6" />}
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

      {/* 3. COMMON MISTAKES */}
      <section className="py-32 bg-brand-carbon relative overflow-hidden">
        <div className="container mx-auto px-6 flex flex-col lg:flex-row gap-24">
          <div className="lg:w-1/3">
             <div className="sticky top-32">
                <AlertTriangle className="w-16 h-16 text-brand-orange mb-8" />
                <h2 className="font-display text-4xl mb-6 uppercase">Critical Failure Points</h2>
                <p className="font-sans text-brand-grey leading-relaxed">
                  Decades of collective conversion experience summarized into the most common pitfalls builders face. Ignore these at your own peril.
                </p>
             </div>
          </div>
          <div className="flex-1 space-y-8">
            {mistakes.map((m: any, i: number) => (
              <div key={i} className="blueprint-border p-12 bg-brand-obsidian group hover:bg-brand-obsidian/50 transition-colors">
                <div className="flex gap-8">
                   <span className="font-display text-6xl text-brand-orange opacity-20 group-hover:opacity-100 transition-opacity">0{i+1}</span>
                   <div>
                     <h3 className="font-display text-2xl uppercase mb-4">{m.title}</h3>
                     <p className="font-sans text-brand-grey leading-relaxed">{m.desc}</p>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SHOP CTA */}
      <section className="py-32 relative">
         <div className="container mx-auto px-6 text-center">
            <h2 className="font-display text-5xl lg:text-7xl mb-8 uppercase tracking-tighter">Ready to Start Your <span className="text-brand-orange">Installation?</span></h2>
            <p className="font-sans text-brand-grey text-xl max-w-2xl mx-auto mb-16">
              Shop the exact same professional-grade components used in the blueprints. Tested, verified, and ready for your build.
            </p>
            <div className="flex flex-col md:flex-row gap-6 justify-center">
               <Link href="/store" className="bg-brand-orange px-12 py-5 font-display text-sm uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all">
                  Visit the Online Store
               </Link>
               <Link href="/planner" className="blueprint-border px-12 py-5 font-display text-sm uppercase tracking-widest hover:bg-brand-orange transition-all">
                  Spec Your {system.name}
               </Link>
            </div>
         </div>
      </section>

      <Footer />
    </main>
  );
}
