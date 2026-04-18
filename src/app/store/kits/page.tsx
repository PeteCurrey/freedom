import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { createClient } from "@supabase/supabase-js";
import { ProductCard } from "@/components/store/ProductCard";
import { Sparkles, ArrowRight, Shield, Zap } from "lucide-react";
import Link from "next/link";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder_key'
);

export default async function BuildKitsPage() {
  const { data: kits } = await supabaseAdmin
    .from('products')
    .select('*')
    .eq('type', 'kit')
    .eq('is_active', true);

  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      <section className="pt-48 pb-24 relative overflow-hidden">
        <div className="blueprint-grid absolute inset-0 opacity-10 pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <h1 className="font-display text-7xl lg:text-9xl mb-8 uppercase leading-none tracking-tighter">
              BUNDLE <span className="text-brand-orange">REGISTRY</span>
            </h1>
            <p className="font-sans text-brand-grey text-xl lg:text-2xl leading-relaxed max-w-2xl mb-12">
              Curated hardware sets, verified for system compatibility and performance. Save up to 20% when purchasing essential systems as a single kit.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-32">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-brand-border border border-brand-border">
            {kits && kits.length > 0 ? kits.map((kit) => (
              <div key={kit.id} className="bg-brand-carbon group flex flex-col xl:flex-row min-h-[500px]">
                <div className="xl:w-[45%] relative overflow-hidden bg-brand-obsidian p-12 border-r border-brand-border flex items-center justify-center">
                  <div className="blueprint-grid absolute inset-0 opacity-5" />
                   <img src={kit.images?.[0] || "/images/electrical-technical.png"} className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-700 p-8" />
                   <div className="absolute top-8 left-8">
                     <span className="font-mono text-[10px] bg-brand-orange text-white px-3 py-1 uppercase tracking-widest">{kit.badge || 'Kit Saving'}</span>
                   </div>
                </div>
                
                <div className="flex-1 p-12 flex flex-col justify-between">
                   <div>
                      <div className="flex items-center gap-4 mb-4">
                        <span className="font-mono text-[9px] text-brand-orange uppercase tracking-widest italic">{kit.system_tier?.replace(/-/g, ' ')} architecture //</span>
                      </div>
                      <h3 className="font-display text-4xl uppercase mb-6 leading-none group-hover:text-brand-orange transition-colors">{kit.name}</h3>
                      <p className="font-sans text-brand-grey text-base leading-relaxed mb-8">
                        {kit.short_description || "Pre-configured system bundle featuring professional-grade components."}
                      </p>
                      
                      <div className="space-y-3 mb-12">
                         <span className="font-mono text-[10px] text-white uppercase block mb-4 border-b border-brand-border pb-2 opacity-50">Included Hardware:</span>
                         {kit.spec_line?.split('·').map((item: string) => (
                           <div key={item} className="flex items-center gap-3 font-mono text-[10px] text-brand-grey uppercase tracking-widest">
                             <div className="w-1.5 h-1.5 bg-brand-orange/30" /> {item.trim()}
                           </div>
                         ))}
                      </div>
                   </div>

                   <div className="mt-auto flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="font-mono text-[10px] text-brand-grey line-through">£{((kit.price_gbp * 1.15) / 100).toLocaleString()}</span>
                        <span className="font-display text-4xl">£{(kit.price_gbp / 100).toLocaleString()}</span>
                      </div>
                      <Link href={`/store/product/${kit.slug}`} className="bg-brand-orange text-white px-8 py-4 font-display text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-obsidian transition-all">
                        View Kit Registry →
                      </Link>
                   </div>
                </div>
              </div>
            )) : (
              <div className="col-span-2 py-48 text-center bg-brand-carbon/30 border border-dashed border-brand-border">
                <span className="font-mono text-xs text-brand-grey uppercase tracking-widest">No bundles currently verified.</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-24 border-y border-brand-border bg-brand-carbon">
        <div className="container mx-auto px-6 text-center">
           <h2 className="font-display text-xs uppercase text-brand-grey tracking-[0.4em] mb-16 italic">// Why Use Curated Kits?</h2>
           <div className="grid md:grid-cols-3 gap-16">
              <div className="flex flex-col items-center">
                 <Shield className="w-10 h-10 text-brand-orange mb-6" />
                 <h4 className="font-display text-sm uppercase mb-4 tracking-widest">Verified Specs</h4>
                 <p className="font-sans text-xs text-brand-grey max-w-[200px]">Every component is matched for voltage, flow-rate, and thermal consistency.</p>
              </div>
              <div className="flex flex-col items-center">
                 <Zap className="w-10 h-10 text-brand-orange mb-6" />
                 <h4 className="font-display text-sm uppercase mb-4 tracking-widest">Bulk Savings</h4>
                 <p className="font-sans text-xs text-brand-grey max-w-[200px]">Enjoy up to 20% off RRP when purchasing full systems through the registry.</p>
              </div>
              <div className="flex flex-col items-center">
                 <Sparkles className="w-10 h-10 text-brand-orange mb-6" />
                 <h4 className="font-display text-sm uppercase mb-4 tracking-widest">One-Box Install</h4>
                 <p className="font-sans text-xs text-brand-grey max-w-[200px]">Kits arrive with essential mounting hardware and primary wiring looms.</p>
              </div>
           </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
