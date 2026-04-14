import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { 
  Thermometer, Wind, Zap, Flame, 
  ChevronRight, AlertTriangle, CheckCircle2,
  TrendingUp, Scale, Info
} from "lucide-react";
import Link from "next/link";

export default function HeatingGuide() {
  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />
      
      {/* Editorial Hero */}
      <section className="relative pt-48 pb-32 border-b border-brand-border/30 overflow-hidden">
         <div className="absolute inset-0 z-0 opacity-10 grayscale">
            <img src="/images/interior-showcase.png" alt="Heating Background" className="w-full h-full object-cover" />
         </div>
         <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl">
               <div className="flex items-center gap-4 font-mono text-[10px] text-brand-orange uppercase mb-8 tracking-[0.3em]">
                  <Link href="/resources" className="hover:text-brand-white transition-colors">Resources</Link>
                  <span className="text-brand-grey">/</span>
                  <span>Climate Control Hub</span>
               </div>
               <h1 className="font-display text-6xl lg:text-9xl mb-8 uppercase leading-tighter tracking-tighter shadow-brand-orange/5">
                  TRUMA <span className="text-brand-orange">VS</span> WEBASTO
               </h1>
               <p className="font-sans text-brand-grey text-xl lg:text-2xl leading-relaxed max-w-2xl">
                  Air heating vs Hydronic systems. We break down the two industry giants to find the perfect climate solution for your mission profile.
               </p>
            </div>
         </div>
      </section>

      {/* Comparison Article Body */}
      <section className="py-24 relative">
         <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-24 font-sans text-brand-grey">
               
               {/* Content */}
               <article className="flex-1 max-w-3xl space-y-24">
                  
                  {/* Section 1: Philosophy */}
                  <section id="philosophy">
                     <h2 className="font-display text-4xl text-white uppercase mb-8">The Engineering Philosophy</h2>
                     <p className="text-lg leading-relaxed mb-8">
                        The choice between Truma and Webasto isn&apos;t just about brands; it&apos;s about a fundamental engineering philosophy. Do you want a system that heats the air directly (Air Heating) or one that heats a liquid medium (Diesel/Electric Boiler)?
                     </p>
                     
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
                        <div className="blueprint-border p-10 bg-brand-carbon">
                           <h3 className="font-display text-xl text-brand-orange uppercase mb-4">Webasto: The Air King</h3>
                           <p className="text-sm leading-relaxed">
                              Focuses on rapid, high-intensity air heating. Fuel is drawn directly from your vehicle&apos;s main tank. Ideal for smaller vans or quick deployments.
                           </p>
                        </div>
                        <div className="blueprint-border p-10 bg-brand-carbon">
                           <h3 className="font-display text-xl text-brand-orange uppercase mb-4">Truma: The Full Boiler</h3>
                           <p className="text-sm leading-relaxed">
                              A dual-purpose system that heats 10L of water while circulating air. It is significantly larger but offers &apos;Home Comfort&apos; levels of amenity.
                           </p>
                        </div>
                     </div>
                  </section>

                  {/* Section 2: Technical Specs Table */}
                  <section id="specs">
                     <h2 className="font-display text-4xl text-white uppercase mb-12">The Comparison Table</h2>
                     <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                           <thead>
                              <tr className="border-b border-brand-border/30 font-mono text-[10px] uppercase tracking-widest">
                                 <th className="py-6">Feature</th>
                                 <th className="py-6">Webasto Air Top</th>
                                 <th className="py-6">Truma Combi 4E</th>
                              </tr>
                           </thead>
                           <tbody className="font-sans text-[11px] uppercase tracking-wider text-brand-grey">
                              <tr className="border-b border-brand-border/10">
                                 <td className="py-6 font-display text-xs text-white">Fuel Source</td>
                                 <td className="py-6">Diesel</td>
                                 <td className="py-6">Diesel + Electric (230V)</td>
                              </tr>
                              <tr className="border-b border-brand-border/10">
                                 <td className="py-6 font-display text-xs text-white">Hot Water?</td>
                                 <td className="py-6">No (Additional unit req)</td>
                                 <td className="py-6">Yes (Integrated 10L)</td>
                              </tr>
                              <tr className="border-b border-brand-border/10">
                                 <td className="py-6 font-display text-xs text-white">Weight</td>
                                 <td className="py-6">2.6kg</td>
                                 <td className="py-6">15.5kg (Empty)</td>
                              </tr>
                              <tr className="border-b border-brand-border/10">
                                 <td className="py-6 font-display text-xs text-white">Power Draw</td>
                                 <td className="py-6 text-brand-orange">1.5A - 3A</td>
                                 <td className="py-6">1.2A - 5.6A</td>
                              </tr>
                           </tbody>
                        </table>
                     </div>
                  </section>

                  {/* Section 3: The Verdict */}
                  <section id="verdict" className="bg-brand-carbon blueprint-border p-12">
                     <h2 className="font-display text-3xl text-white uppercase mb-8 flex items-center gap-4">
                        <Scale className="w-8 h-8 text-brand-orange" /> The Verdict
                     </h2>
                     <div className="space-y-8">
                        <div className="flex items-start gap-6">
                           <div className="w-10 h-10 border border-brand-border flex items-center justify-center shrink-0">
                              <CheckCircle2 className="w-5 h-5 text-brand-orange" />
                           </div>
                           <p className="text-sm leading-relaxed">
                              Choose <strong className="text-white">Webasto</strong> if you have a MWB/LWB van and want to maximize internal storage. It&apos;s a set-and-forget heat source that is incredibly efficient on fuel.
                           </p>
                        </div>
                        <div className="flex items-start gap-6">
                           <div className="w-10 h-10 border border-brand-border flex items-center justify-center shrink-0">
                              <CheckCircle2 className="w-5 h-5 text-brand-orange" />
                           </div>
                           <p className="text-sm leading-relaxed">
                              Choose <strong className="text-white">Truma</strong> if you are building a full-time tiny home on wheels. Having hot water on demand and the ability to run on 230V hook-up is life-changing in winter.
                           </p>
                        </div>
                     </div>
                  </section>

               </article>

               {/* Sidebar CTAs */}
               <aside className="lg:w-80 shrink-0 space-y-8">
                  <div className="blueprint-border p-10 bg-brand-obsidian border-l-4 border-brand-orange text-left">
                     <TrendingUp className="w-8 h-8 text-brand-orange mb-6" />
                     <h4 className="font-display text-lg text-white uppercase mb-4">Heating Efficiency</h4>
                     <p className="text-xs text-brand-grey leading-relaxed mb-8">
                        Learn how to calculate your thermal loss and size your heater correctly in our tech-brief.
                     </p>
                     <button className="w-full font-mono text-[10px] uppercase tracking-widest text-white border border-brand-border py-4 hover:border-brand-orange transition-all">
                        Technical Brief (.PDF)
                     </button>
                  </div>
                  
                  <div className="blueprint-border p-10 bg-brand-obsidian">
                     <Flame className="w-8 h-8 text-brand-orange mb-6" />
                     <h4 className="font-display text-lg text-white uppercase mb-4">Shop the Range</h4>
                     <p className="text-xs text-brand-grey leading-relaxed mb-8">
                        We stock both official Truma and Webasto kits, pre-configured for Sprinter and Transit chassis.
                     </p>
                     <Link href="/store/climate" className="block w-full text-center font-mono text-[10px] uppercase tracking-widest bg-brand-orange text-white py-4 hover:bg-white hover:text-brand-orange transition-all">
                        Go to Store
                     </Link>
                  </div>
               </aside>

            </div>
         </div>
      </section>

      <Footer />
    </main>
  );
}
