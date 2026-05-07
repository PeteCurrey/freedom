"use client";

import { use } from "react";
import { GUIDES, GUIDE_HUBS } from "@/lib/data/guides";
import { PRODUCTS } from "@/lib/data/productRegistry";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { 
  CheckCircle2, AlertTriangle, ArrowRight, BookOpen, 
  Settings, Zap, ShieldCheck, Info, Package, Hammer
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const guide = GUIDES[resolvedParams.slug];

  if (!guide) {
    return (
      <div className="min-h-screen bg-brand-obsidian flex items-center justify-center">
        <h1 className="text-white font-display text-4xl">Guide Not Found</h1>
      </div>
    );
  }

  const hub = GUIDE_HUBS.find(h => h.id === guide.hub);

  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* ARTICLE HERO */}
      <section className="pt-48 pb-20 bg-brand-carbon relative overflow-hidden border-b border-brand-border">
         <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />
         <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl">
               <div className="flex items-center gap-3 mb-8">
                  <Link href="/guides" className="font-mono text-[9px] text-brand-grey uppercase tracking-widest hover:text-brand-orange transition-colors">Guides</Link>
                  <span className="text-brand-grey">/</span>
                  <span className="font-mono text-[9px] text-brand-orange uppercase tracking-widest">{hub?.name}</span>
               </div>
               <h1 className="font-display text-5xl lg:text-7xl uppercase tracking-tighter mb-8 leading-tight">{guide.title}</h1>
               <p className="font-sans text-brand-grey text-xl leading-relaxed max-w-3xl">
                  {guide.metaDescription}
               </p>
            </div>
         </div>
      </section>

      {/* ARTICLE CONTENT */}
      <section className="py-24">
         <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
               
               {/* MAIN CONTENT */}
               <div className="lg:col-span-8 space-y-16">
                  
                  {/* TECHNICAL PANEL (Sided) */}
                  {guide.technicalSpecs && (
                    <div className="bg-brand-carbon p-8 border border-brand-border flex flex-col md:flex-row gap-8">
                       <div className="shrink-0 bg-brand-orange/10 p-4 border border-brand-orange/20 h-fit">
                          <Settings className="w-6 h-6 text-brand-orange" />
                       </div>
                       <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 flex-1">
                          {guide.technicalSpecs.map((spec, i) => (
                            <div key={i} className="space-y-1">
                               <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest block">{spec.label}</span>
                               <span className="font-display text-sm text-white uppercase tracking-widest">{spec.value}</span>
                            </div>
                          ))}
                       </div>
                    </div>
                  )}

                  <article className="prose prose-invert prose-brand max-w-none 
                    prose-h2:font-display prose-h2:text-4xl prose-h2:uppercase prose-h2:tracking-tighter prose-h2:mb-8
                    prose-h3:font-display prose-h3:text-2xl prose-h3:uppercase prose-h3:tracking-tight prose-h3:mb-6
                    prose-p:font-sans prose-p:text-brand-grey prose-p:text-lg prose-p:leading-relaxed
                    prose-li:font-sans prose-li:text-brand-grey prose-li:text-lg
                  ">
                     <div dangerouslySetInnerHTML={{ __html: guide.content }} />
                  </article>

                  {/* COMMON MISTAKES CHECKLIST */}
                  <div className="bg-red-950/10 border border-red-500/20 p-12 relative overflow-hidden">
                     <div className="absolute top-0 right-0 p-8 opacity-5 text-red-500">
                        <AlertTriangle className="w-40 h-40" />
                     </div>
                     <h3 className="font-display text-2xl uppercase tracking-tight text-white mb-8 flex items-center gap-4">
                        <AlertTriangle className="w-6 h-6 text-red-500" />
                        Common Engineering Mistakes
                     </h3>
                     <div className="space-y-6 relative z-10">
                        {guide.commonMistakes.map((mistake, i) => (
                          <div key={i} className="flex gap-4">
                             <div className="shrink-0 mt-1.5"><div className="w-1.5 h-1.5 rounded-full bg-red-500" /></div>
                             <p className="font-sans text-brand-grey leading-relaxed">{mistake}</p>
                          </div>
                        ))}
                     </div>
                  </div>

                  {/* RECOMMENDED PRODUCTS CALLOUT */}
                  {guide.recommendedProducts.length > 0 && (
                    <div className="space-y-8 pt-16">
                       <h3 className="font-display text-3xl uppercase tracking-tighter">Recommended <span className="text-brand-orange">Hardware</span></h3>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-brand-border border border-brand-border">
                          {guide.recommendedProducts.map(id => {
                            const product = PRODUCTS.find(p => p.id === id);
                            if (!product) return null;
                            return (
                              <div key={id} className="bg-brand-carbon p-8 group hover:bg-brand-obsidian transition-all">
                                 <div className="flex justify-between items-start mb-6">
                                    <Package className="w-8 h-8 text-brand-orange/30 group-hover:text-brand-orange transition-colors" />
                                    <span className="font-display text-xl text-white">£{product.price.toLocaleString()}</span>
                                 </div>
                                 <h4 className="font-display text-lg uppercase tracking-tight mb-4 group-hover:text-brand-orange transition-colors">{product.name}</h4>
                                 <Link href={`/store/products/${product.slug}`} className="font-mono text-[9px] text-brand-grey uppercase tracking-widest flex items-center gap-2 hover:text-white transition-all">
                                    View Specifications <ArrowRight className="w-3 h-3" />
                                 </Link>
                              </div>
                            );
                          })}
                       </div>
                    </div>
                  )}
               </div>

               {/* SIDEBAR CONVERSION */}
               <aside className="lg:col-span-4 space-y-8">
                  <div className="sticky top-24 space-y-8">
                     <div className="bg-brand-orange p-10 border border-brand-orange relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                           <Zap className="w-32 h-32 text-brand-obsidian" />
                        </div>
                        <h4 className="font-display text-3xl uppercase tracking-tighter text-brand-obsidian mb-6 leading-none">Generate My Build Plan</h4>
                        <p className="font-sans text-brand-obsidian/80 text-sm mb-10 leading-relaxed">Let our AI engine spec your entire build based on these technical standards.</p>
                        <Link href="/planner" className="w-full bg-brand-obsidian text-white font-display text-[10px] uppercase tracking-widest py-4 block text-center hover:bg-white hover:text-brand-obsidian transition-all shadow-xl font-bold">
                           Start AI Planner →
                        </Link>
                     </div>

                     {guide.relatedCalculators && (
                        <div className="bg-brand-carbon p-8 border border-brand-border">
                           <h4 className="font-display text-xs uppercase tracking-widest mb-6 border-b border-brand-border pb-4 italic">// Tech Tools</h4>
                           <div className="space-y-4">
                              {guide.relatedCalculators.map((calc, i) => (
                                <Link key={i} href={calc.url} className="flex items-center justify-between group">
                                   <span className="font-mono text-[10px] text-brand-grey uppercase tracking-widest group-hover:text-white transition-colors">{calc.name}</span>
                                   <ArrowRight className="w-3 h-3 text-brand-orange" />
                                </Link>
                              ))}
                           </div>
                        </div>
                     )}

                     <div className="bg-brand-obsidian p-8 border border-brand-border">
                        <h4 className="font-display text-xs uppercase tracking-widest mb-6">Article FAQs</h4>
                        <div className="space-y-8">
                           {guide.faqs.map((faq, i) => (
                             <div key={i} className="space-y-2">
                                <span className="font-display text-[11px] uppercase tracking-widest text-white block">{faq.q}</span>
                                <p className="font-sans text-[11px] text-brand-grey leading-relaxed">{faq.a}</p>
                             </div>
                           ))}
                        </div>
                     </div>
                  </div>
               </aside>

            </div>
         </div>
      </section>

      <Footer />
    </main>
  );
}
