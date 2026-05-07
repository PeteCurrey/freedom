"use client";

import { use } from "react";
import { CATEGORIES, PRODUCTS, getProductsByCategory, getProductCTA } from "@/lib/data/productRegistry";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { 
  Package, Filter, ChevronRight, Info, CheckCircle2, 
  ArrowRight, ShieldCheck, Zap, Truck
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = use(params);
  const categoryId = resolvedParams.category;
  const category = CATEGORIES.find(c => c.id === categoryId);
  const products = getProductsByCategory(categoryId);

  if (!category) {
    return (
      <div className="min-h-screen bg-brand-obsidian flex items-center justify-center">
        <h1 className="text-white font-display text-4xl">Category Not Found</h1>
      </div>
    );
  }

  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <section className="pt-40 pb-20 bg-brand-carbon relative overflow-hidden border-b border-brand-border">
        <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
           <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12">
              <div className="max-w-3xl">
                 <div className="flex items-center gap-3 mb-6">
                    <Link href="/store" className="font-mono text-[9px] text-brand-grey uppercase tracking-widest hover:text-brand-orange transition-colors">Store</Link>
                    <ChevronRight className="w-3 h-3 text-brand-grey" />
                    <span className="font-mono text-[9px] text-brand-orange uppercase tracking-widest">{category.name}</span>
                 </div>
                 <h1 className="font-display text-5xl lg:text-7xl uppercase tracking-tighter mb-8 leading-tight">{category.name} <span className="text-brand-orange">HUB</span></h1>
                 <p className="font-sans text-brand-grey text-xl leading-relaxed max-w-2xl">
                    {category.description} Technical components engineered for high-performance DIY builds and professional conversions.
                 </p>
              </div>
              
              <div className="bg-brand-obsidian p-6 border border-brand-border flex items-center gap-6 group cursor-pointer hover:border-brand-orange transition-all">
                 <div className="bg-brand-orange/10 p-3 border border-brand-orange/20">
                    <Zap className="w-5 h-5 text-brand-orange" />
                 </div>
                 <div>
                    <span className="font-mono text-[9px] text-brand-orange uppercase tracking-widest block mb-1">System Logic</span>
                    <span className="font-display text-sm text-white uppercase tracking-widest">Plan your {category.name} →</span>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* FILTER & GRID SECTION */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* SIDEBAR FILTERS (Compact) */}
            <aside className="w-full lg:w-64 shrink-0 space-y-12">
               <div>
                  <h3 className="font-display text-xs uppercase tracking-[0.3em] mb-8 border-b border-brand-border pb-4 italic">// Tech Filters</h3>
                  <div className="space-y-8">
                     <div>
                        <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest block mb-4">Installation Stage</span>
                        <div className="space-y-2">
                           {['Stage 1-3', 'Stage 4-5', 'Stage 6-7'].map(s => (
                             <label key={s} className="flex items-center gap-3 cursor-pointer group">
                                <div className="w-3 h-3 border border-brand-border group-hover:border-brand-orange transition-colors" />
                                <span className="font-mono text-[10px] text-brand-grey uppercase tracking-widest group-hover:text-white transition-colors">{s}</span>
                             </label>
                           ))}
                        </div>
                     </div>
                     <div>
                        <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest block mb-4">Vehicle Platform</span>
                        <div className="space-y-2">
                           {['Sprinter/Crafter', 'Transit/MAN', 'Transporter/ID'].map(v => (
                             <label key={v} className="flex items-center gap-3 cursor-pointer group">
                                <div className="w-3 h-3 border border-brand-border group-hover:border-brand-orange transition-colors" />
                                <span className="font-mono text-[10px] text-brand-grey uppercase tracking-widest group-hover:text-white transition-colors">{v}</span>
                             </label>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>

               <div className="bg-brand-carbon/40 p-6 border border-brand-border/40">
                  <h4 className="font-display text-xs uppercase tracking-widest mb-4">Expert Buying Guide</h4>
                  <p className="font-sans text-[11px] text-brand-grey leading-relaxed mb-4">Unsure which {category.name} component fits your specific build goals?</p>
                  <Link href="/guides" className="font-mono text-[9px] text-brand-orange uppercase tracking-widest flex items-center gap-2 hover:text-white transition-colors">
                     Read Technical Guide <ArrowRight className="w-3 h-3" />
                  </Link>
               </div>
            </aside>

            {/* PRODUCT GRID */}
            <div className="flex-1">
               <div className="flex justify-between items-center mb-10">
                  <span className="font-mono text-[10px] text-brand-grey uppercase tracking-widest">Showing {products.length} Professional Grade Products</span>
                  <div className="flex items-center gap-4">
                     <span className="font-mono text-[10px] text-brand-grey uppercase">Sort By:</span>
                     <select className="bg-transparent border-none font-mono text-[10px] text-white uppercase tracking-widest outline-none cursor-pointer">
                        <option>Technical Relevance</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                     </select>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-px bg-brand-border border border-brand-border shadow-2xl">
                  {products.map((p) => (
                    <div key={p.id} className="bg-brand-obsidian p-8 flex flex-col group hover:bg-brand-carbon/30 transition-all">
                       <div className="aspect-square bg-brand-carbon border border-brand-border/40 mb-8 relative overflow-hidden flex items-center justify-center p-8">
                          <div className="absolute inset-0 blueprint-grid opacity-5" />
                          <Package className="w-16 h-16 text-brand-orange/10 group-hover:scale-110 transition-transform duration-700" />
                          <div className="absolute top-4 left-4">
                             <span className="font-mono text-[8px] bg-brand-obsidian border border-brand-border px-2 py-1 text-brand-grey uppercase tracking-widest">{p.brand}</span>
                          </div>
                          {p.stockStatus === 'low-stock' && (
                             <div className="absolute bottom-4 right-4">
                                <span className="font-mono text-[8px] text-yellow-500 uppercase tracking-widest animate-pulse">Low Stock</span>
                             </div>
                          )}
                       </div>
                       
                       <div className="flex-1 space-y-4">
                          <div className="flex justify-between items-start gap-4">
                             <h3 className="font-display text-xl uppercase tracking-tight group-hover:text-brand-orange transition-colors h-14 overflow-hidden">{p.name}</h3>
                             <div className="text-right shrink-0">
                                <span className="font-display text-2xl block">£{p.price.toLocaleString()}</span>
                                <span className="font-mono text-[8px] text-brand-grey uppercase tracking-widest">{p.priceType}</span>
                             </div>
                          </div>
                          
                          <p className="font-sans text-xs text-brand-grey leading-relaxed line-clamp-2">{p.shortDescription}</p>
                          
                          <div className="flex flex-wrap gap-2 pt-4">
                             <span className="font-mono text-[8px] border border-brand-border px-2 py-1 text-brand-grey uppercase tracking-widest">{p.installDifficulty}</span>
                             <span className="font-mono text-[8px] border border-brand-border px-2 py-1 text-brand-grey uppercase tracking-widest">{p.payloadWeightKg}kg</span>
                          </div>
                       </div>

                       <div className="mt-10 space-y-3">
                          <button className="w-full bg-brand-white text-brand-obsidian font-display text-[10px] uppercase tracking-[0.2em] py-4 hover:bg-brand-orange hover:text-white transition-all shadow-xl font-bold">
                             {getProductCTA(p)}
                          </button>
                          <button className="w-full border border-brand-border text-brand-grey font-mono text-[8px] uppercase tracking-widest py-3 hover:border-brand-orange hover:text-white transition-all">
                             Add to Build Plan
                          </button>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ / BUYING GUIDE SECTION */}
      <section className="py-32 bg-brand-carbon border-t border-brand-border relative">
         <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="font-display text-4xl uppercase tracking-tighter mb-16 text-center">Technical Buying <span className="text-brand-orange">Protocol</span></h2>
            <div className="space-y-12">
               {[
                 { q: `What is the most critical factor when selecting ${category.name} components?`, a: "Safety and system compatibility. Every component in our registry is cross-referenced for thermal stability and electrical parity to ensure your build remains compliant and safe." },
                 { q: "Can I install these products myself?", a: "Many of these components are designed for high-end DIY builds. However, we always recommend professional sign-off for gas and 230V electrical systems to maintain insurance validity." },
                 { q: "Do these parts work with the AI Build Planner?", a: "Yes. Every product in this category is mapped directly to our AI engine. If you use the planner, these exact parts will be recommended based on your specific vehicle and build goal." }
               ].map((faq, i) => (
                 <div key={i} className="space-y-4 border-b border-brand-border/40 pb-8">
                    <h3 className="font-display text-xl uppercase tracking-tight text-white">{faq.q}</h3>
                    <p className="font-sans text-brand-grey leading-relaxed">{faq.a}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      <Footer />
    </main>
  );
}
