"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { generateBuildBasket } from "@/lib/data/plannerRecommendations";
import { PDF_TIERS, COMPLIANCE_WARNINGS } from "@/lib/data/pdfCompliance";
import { getProductCTA, InstallStage, BasketItem } from "@/lib/data/productRegistry";
import { useBuild } from "@/hooks/useBuild";
import Link from "next/link";
import { 
  CheckCircle2, AlertTriangle, ShieldAlert, FileText, 
  Settings, ArrowRight, Check, Package, Zap, ExternalLink,
  Loader2, Info, Scale, Gauge, ShieldCheck, Download,
  Lock, Save, ShoppingCart, User
} from "lucide-react";
import { cn } from "@/lib/utils";

const ALL_STAGES: InstallStage[] = [
  'Stage 1: Planning & safety',
  'Stage 2: Vehicle preparation',
  'Stage 3: Insulation & sound deadening',
  'Stage 4: First fix electrical',
  'Stage 5: Solar & charging',
  'Stage 6: Heating & ventilation',
  'Stage 7: Water & plumbing',
  'Stage 8: Gas/cooking',
  'Stage 9: Interior fit-out',
  'Stage 10: Security & finishing',
  'Stage 11: Compliance review',
  'Stage 12: Final upgrades'
];

export default function PlannerResultsPage() {
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const { saveBuild } = useBuild();

  useEffect(() => {
    setMounted(true);
  }, []);

  const basket = generateBuildBasket({ vehicleType: "Mercedes Sprinter L3H2" });

  const handleSaveBuild = () => {
    const planId = crypto.randomUUID();
    const plan = {
      id: planId,
      userId: 'user_123', // Mock
      buildName: `My ${basket.summary.vehicleType} Build`,
      vehicle: basket.summary.vehicleType,
      usageType: 'Off-Grid / Full-Time',
      buildGoal: 'High-End Engineering',
      offGridLevel: 'Maximum',
      budgetRange: '£15k - £25k',
      experienceLevel: 'Intermediate',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'planning' as const,
      progressPercentage: 5,
      currentStage: 'Stage 1: Planning & safety' as InstallStage,
      estimatedTotalCost: basket.summary.estimatedCost,
      purchasedValue: 0,
      remainingValue: basket.summary.estimatedCost,
      payloadEstimateKg: basket.summary.estimatedPayloadImpactKg,
      complianceFlags: basket.complianceFlags.map(f => f.title)
    };

    const items: BasketItem[] = [];
    Object.entries(basket.basket).forEach(([stage, stageItems]) => {
      stageItems.forEach((item: any) => {
        items.push({
          id: crypto.randomUUID(),
          productId: item.product.id,
          buildPlanId: planId,
          stage: stage as InstallStage,
          stageOrder: 0,
          requiredStatus: 'required',
          purchaseStatus: 'not_purchased',
          quantity: item.quantity,
          unitPrice: item.product.price,
          totalPrice: item.product.price * item.quantity,
          supplierType: item.product.supplierType,
          reasonRecommended: item.whyRecommended
        });
      });
    });

    saveBuild(plan, items);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  if (!mounted) return null;

  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />
      
      {/* 1. BUILD SUMMARY HEADER */}
      <section className="pt-48 pb-24 bg-brand-carbon relative overflow-hidden border-b border-brand-border">
        <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                 <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.2em] animate-pulse">// Technical Specification Generated</span>
                 <div className="h-px w-12 bg-brand-orange/30" />
                 <span className="font-mono text-[10px] text-brand-grey uppercase tracking-[0.2em]">Revision 1.0.4</span>
              </div>
              <h1 className="font-display text-5xl lg:text-8xl uppercase tracking-tighter mb-8 leading-none">Build <span className="text-brand-orange">Architecture</span></h1>
              <p className="font-sans text-brand-grey text-xl max-w-2xl leading-relaxed">
                Your build operating system is ready. This specification represents a fully optimized <span className="text-white font-bold">{basket.summary.vehicleType}</span> environment, engineered for maximum off-grid performance and long-term compliance.
              </p>
            </div>
            
            <div className="bg-[#0a0a0a] border border-brand-border p-8 shadow-2xl shrink-0 w-full lg:w-96 relative group">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <Settings className="w-24 h-24 rotate-12 group-hover:rotate-45 transition-transform duration-1000" />
              </div>
              <div className="grid grid-cols-1 gap-8 relative z-10">
                <div className="flex justify-between items-end">
                   <div className="space-y-1">
                      <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest block">Est. Parts Subtotal</span>
                      <span className="font-display text-4xl text-white">£{basket.summary.estimatedCost.toLocaleString()}</span>
                   </div>
                   <div className="text-right">
                      <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest block">Payload Impact</span>
                      <span className="font-display text-2xl text-brand-orange">{basket.summary.estimatedPayloadImpactKg}kg</span>
                   </div>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-brand-border/30 flex justify-between items-center">
                 <div className="space-y-1">
                    <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest block">Difficulty Rating</span>
                    <span className="font-display text-sm text-white uppercase tracking-widest">{basket.summary.estimatedDifficulty}</span>
                 </div>
                 <div className="flex gap-1">
                    {[1,2,3,4,5].map(i => <div key={i} className={`w-1.5 h-6 ${i <= 4 ? 'bg-brand-orange' : 'bg-brand-carbon'}`} />)}
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST MESSAGING & FLEXIBILITY */}
      <section className="py-12 bg-brand-orange/5 border-b border-brand-orange/20">
         <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
               <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-full bg-brand-orange/10 flex items-center justify-center border border-brand-orange/20">
                     <Lock className="text-brand-orange w-5 h-5" />
                  </div>
                  <div>
                     <h4 className="font-display text-lg uppercase tracking-tight text-white">Locked Technical Specification</h4>
                     <p className="font-sans text-brand-grey text-sm">Every component below is cross-referenced for electrical parity and structural fitment.</p>
                  </div>
               </div>
               <div className="flex gap-4">
                  <button 
                    onClick={handleSaveBuild}
                    className="px-8 py-3 bg-brand-orange text-white font-mono text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all shadow-xl font-bold flex items-center gap-2"
                  >
                    {saveSuccess ? <Check className="w-3 h-3" /> : <Save className="w-3 h-3" />}
                    {saveSuccess ? "Build Saved" : "Save Build to Portal"}
                  </button>
                  <Link 
                    href="/client-portal"
                    className="px-8 py-3 border border-brand-border text-white font-mono text-[10px] uppercase tracking-widest hover:bg-brand-carbon transition-all font-bold flex items-center gap-2"
                  >
                    <User className="w-3 h-3" />
                    Open Client Portal
                  </Link>
               </div>
            </div>
         </div>
      </section>

      {/* 3. SYSTEM STACK SUMMARY */}
      <section className="py-20 border-b border-brand-border/40 bg-[#080808]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-px bg-brand-border border border-brand-border">
            {Object.entries(basket.stack).map(([key, value]) => (
              <div key={key} className="bg-brand-obsidian p-8 hover:bg-brand-carbon/50 transition-all group">
                <span className="font-mono text-[9px] text-brand-orange uppercase tracking-[0.2em] block mb-4 group-hover:translate-x-1 transition-transform">{key}</span>
                <span className="font-display text-lg text-white leading-tight uppercase">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. THE STAGED BUILD ROADMAP */}
      <section className="py-32 bg-brand-obsidian">
         <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row justify-between items-end mb-24 gap-8">
               <div className="max-w-2xl">
                  <h2 className="font-display text-5xl lg:text-7xl uppercase tracking-tighter mb-6">Build <span className="text-brand-orange">Stages</span></h2>
                  <p className="font-sans text-brand-grey text-lg leading-relaxed">
                     A professional campervan build is a marathon, not a sprint. We have broken your build into 12 engineering phases. Buy what you need now, save the rest for later.
                  </p>
               </div>
               <div className="flex flex-col items-end gap-4">
                  <div className="flex items-center gap-4 bg-brand-carbon border border-brand-border px-6 py-4">
                     <Download className="w-4 h-4 text-brand-orange" />
                     <span className="font-mono text-[10px] text-white uppercase tracking-widest">Full Specification (.PDF)</span>
                  </div>
                  <p className="font-mono text-[9px] text-brand-grey uppercase tracking-widest">Revision: May 2026</p>
               </div>
            </div>

            <div className="space-y-40">
               {ALL_STAGES.map((stage) => {
                 const items = basket.basket[stage] || [];
                 const hasItems = items.length > 0;
                 const stageTotal = items.reduce((sum, i: any) => sum + (i.product.price * i.quantity), 0);

                 return (
                   <div key={stage} className={cn("relative", !hasItems && "opacity-40 grayscale")}>
                      <div className="sticky top-24 z-20 bg-brand-obsidian/90 backdrop-blur-md py-6 border-b border-brand-border flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
                         <div className="flex items-center gap-6">
                            <div className={cn("w-3 h-10", hasItems ? "bg-brand-orange" : "bg-brand-grey")} />
                            <div>
                               <h3 className="font-display text-3xl uppercase tracking-widest">{stage}</h3>
                               {!hasItems && <span className="font-mono text-[8px] text-brand-orange uppercase tracking-widest mt-1 block">No products currently required for this phase</span>}
                            </div>
                         </div>
                         {hasItems && (
                            <div className="flex flex-col items-end">
                               <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest mb-1">Stage Hardware Total</span>
                               <span className="font-display text-2xl text-white">£{stageTotal.toLocaleString()}</span>
                            </div>
                         )}
                      </div>

                      {hasItems ? (
                        <div className="grid grid-cols-1 gap-px bg-brand-border border border-brand-border shadow-2xl">
                           {items.map((item: any) => (
                             <div key={item.product.id} className="bg-brand-carbon/30 p-10 flex flex-col lg:flex-row gap-12 group hover:bg-brand-carbon transition-all">
                                <div className="w-full lg:w-56 aspect-square bg-brand-obsidian border border-brand-border p-8 flex items-center justify-center relative overflow-hidden">
                                   <div className="absolute inset-0 blueprint-grid opacity-5" />
                                   <Package className="w-16 h-16 text-brand-orange/10 group-hover:scale-110 transition-transform duration-700" />
                                   <div className="absolute top-4 left-4">
                                      <span className="font-mono text-[8px] text-brand-orange/50 uppercase tracking-[0.2em]">{item.product.brand}</span>
                                   </div>
                                </div>

                                <div className="flex-1 space-y-6">
                                   <div className="flex items-center gap-4">
                                      <span className="font-mono text-[9px] bg-brand-orange text-white px-3 py-1 uppercase tracking-widest font-bold">Recommended hardware</span>
                                      <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest italic">// engineering justification</span>
                                   </div>
                                   <h4 className="font-display text-4xl uppercase tracking-tighter text-white">{item.product.name}</h4>
                                   <p className="font-sans text-base text-brand-grey leading-relaxed max-w-3xl border-l-2 border-brand-orange/30 pl-8 italic">
                                      "{item.whyRecommended}"
                                   </p>
                                   <div className="flex flex-wrap gap-3">
                                      <span className="font-mono text-[8px] border border-brand-border px-3 py-1.5 text-brand-grey uppercase tracking-widest">{item.product.payloadWeightKg}kg Payload</span>
                                      <span className="font-mono text-[8px] border border-brand-border px-3 py-1.5 text-brand-grey uppercase tracking-widest">{item.product.installDifficulty} Install</span>
                                      <span className="font-mono text-[8px] border border-brand-border px-3 py-1.5 text-brand-grey uppercase tracking-widest">Qty: {item.quantity}</span>
                                   </div>
                                </div>

                                <div className="lg:w-72 text-right flex flex-col justify-between items-end">
                                   <div className="text-right">
                                      <span className="font-display text-4xl block text-white">£{item.product.price.toLocaleString()}</span>
                                      <span className="font-mono text-[10px] text-brand-grey uppercase tracking-widest mt-1 block">Unit Price</span>
                                   </div>
                                   <div className="w-full space-y-3 mt-8">
                                      <button className="w-full bg-brand-white text-brand-obsidian font-display text-[10px] uppercase tracking-widest py-4 hover:bg-brand-orange hover:text-white transition-all font-bold">
                                         {getProductCTA(item.product)}
                                      </button>
                                      <div className="flex gap-2">
                                         <button className="flex-1 border border-brand-border py-2 font-mono text-[8px] uppercase tracking-widest text-brand-grey hover:text-white transition-colors">
                                            Mark as owned
                                         </button>
                                         <button className="flex-1 border border-brand-border py-2 font-mono text-[8px] uppercase tracking-widest text-brand-grey hover:text-white transition-colors">
                                            Alternative
                                         </button>
                                      </div>
                                   </div>
                                </div>
                             </div>
                           ))}
                        </div>
                      ) : (
                        <div className="bg-brand-carbon/20 border border-dashed border-brand-border p-20 text-center">
                           <Info className="w-8 h-8 text-brand-grey/30 mx-auto mb-4" />
                           <p className="font-mono text-[10px] text-brand-grey uppercase tracking-[0.2em]">Detailed specification for this phase pending build complexity review.</p>
                        </div>
                      )}
                   </div>
                 );
               })}
            </div>

            {/* TECHNICAL SCHEMATICS INTEGRATION */}
            <section className="mt-40 pt-40 border-t border-brand-border">
               <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
                  <div className="max-w-2xl">
                     <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em] block mb-4">// Engineering Documentation</span>
                     <h2 className="font-display text-4xl lg:text-6xl uppercase tracking-tighter mb-8 leading-none">
                        System <span className="text-brand-orange">Schematics</span>
                     </h2>
                     <p className="font-sans text-brand-grey text-lg leading-relaxed mb-8">
                        Based on your <span className="text-white font-bold">{basket.stack["Electrical"]}</span> selection, we have mapped the following Victron Energy wiring schematic to your build. This diagram is included automatically in your paid Blueprint PDF.
                     </p>

                     <div className="space-y-6">
                        {[
                           { title: 'Standardized Termination', desc: 'Every cable run is specified for UK BS 7671 electrical standards.' },
                           { title: 'Component Logic', desc: 'Logical signal flow between MPPT, Inverter, and BMS units.' },
                           { title: 'Safety Infrastructure', desc: 'Correct fuse ratings and isolation points for off-grid safety.' },
                        ].map(item => (
                           <div key={item.title} className="flex gap-4">
                              <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0" />
                              <div>
                                 <h4 className="font-display text-sm uppercase tracking-wider text-white mb-1">{item.title}</h4>
                                 <p className="font-sans text-xs text-brand-grey">{item.desc}</p>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>

                  <div className="flex-1 w-full">
                     <div className="bg-brand-carbon border border-brand-border p-2 relative group overflow-hidden">
                        <div className="aspect-video relative bg-brand-obsidian flex items-center justify-center">
                           <div className="absolute inset-0 blueprint-grid opacity-10" />
                           <Zap className="w-16 h-16 text-brand-orange/20" />
                           <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-center bg-brand-obsidian/80 backdrop-blur-sm border border-brand-border p-6 max-w-xs">
                                 <span className="font-mono text-[10px] text-brand-orange uppercase tracking-widest block mb-2">Technical Preview</span>
                                 <p className="font-sans text-[11px] text-brand-grey leading-relaxed">
                                    Full-resolution A3 wiring diagram with component callouts is included in your professional engineering pack.
                                 </p>
                              </div>
                           </div>
                        </div>
                        <div className="p-6 border-t border-brand-border flex justify-between items-center bg-brand-obsidian/50">
                           <div>
                              <p className="font-mono text-[9px] text-brand-grey uppercase tracking-widest mb-1">Assigned Diagram</p>
                              <p className="font-display text-base uppercase tracking-tight text-white">
                                 {basket.stack["Electrical"].includes("3kVA") ? "Victron MultiPlus-II 12/3000 System" : "Victron 12V Starter System"}
                              </p>
                           </div>
                           <Link 
                              href="/guides/wiring-diagrams"
                              className="font-mono text-[9px] text-brand-orange uppercase tracking-widest flex items-center gap-2 hover:text-white transition-colors"
                           >
                              View Guide <ExternalLink className="w-3 h-3" />
                           </Link>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
         </div>
      </section>

      {/* 5. COMMERCIAL REASSURANCE */}
      <section className="py-24 bg-brand-orange">
         <div className="container mx-auto px-6 text-center">
            <h3 className="font-display text-4xl lg:text-6xl uppercase tracking-tighter text-brand-obsidian mb-8">Build at your <span className="italic">own pace.</span></h3>
            <p className="font-sans text-brand-obsidian text-xl max-w-3xl mx-auto mb-12 font-medium">
               "We specify your entire build on day one, so you don't make mistakes on day fifty. Buy the stages when you're ready, we'll keep your plan locked and secure."
            </p>
            <div className="flex flex-wrap justify-center gap-8">
               <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-obsidian" />
                  <span className="font-mono text-[10px] uppercase tracking-widest font-bold text-brand-obsidian">No pressure checkout</span>
               </div>
               <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-obsidian" />
                  <span className="font-mono text-[10px] uppercase tracking-widest font-bold text-brand-obsidian">Stage-by-stage purchasing</span>
               </div>
               <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-obsidian" />
                  <span className="font-mono text-[10px] uppercase tracking-widest font-bold text-brand-obsidian">Price-lock guarantee (30 days)</span>
               </div>
            </div>
         </div>
      </section>

      {/* 6. QUOTE REQUEST */}
      <section className="py-40 bg-[#0a0a0a]">
         <div className="container mx-auto px-6 max-w-4xl">
            <div className="bg-brand-obsidian p-16 border border-brand-border relative shadow-2xl">
               <div className="absolute top-0 left-0 w-full h-1 bg-brand-orange" />
               <div className="text-center mb-16">
                  <h3 className="font-display text-4xl uppercase tracking-tighter mb-4">Request Staged Quote</h3>
                  <p className="font-sans text-brand-grey leading-relaxed">
                     Need a professional to review your full technical stack? Submit your specification for a human audit. We will verify stock, check compatibility, and provide a formal project quote.
                  </p>
               </div>
               
               <form className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="font-mono text-[9px] text-brand-grey uppercase tracking-widest">First Name</label>
                      <input required type="text" className="w-full bg-brand-carbon border border-brand-border p-5 text-sm font-mono text-white focus:border-brand-orange outline-none transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="font-mono text-[9px] text-brand-grey uppercase tracking-widest">Last Name</label>
                      <input required type="text" className="w-full bg-brand-carbon border border-brand-border p-5 text-sm font-mono text-white focus:border-brand-orange outline-none transition-all" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="font-mono text-[9px] text-brand-grey uppercase tracking-widest">Email Address</label>
                    <input required type="email" className="w-full bg-brand-carbon border border-brand-border p-5 text-sm font-mono text-white focus:border-brand-orange outline-none transition-all" />
                  </div>
                  <button 
                    type="submit" 
                    className="w-full bg-brand-orange text-white font-display text-base uppercase tracking-widest py-6 hover:bg-white hover:text-brand-orange transition-all flex items-center justify-center gap-4 shadow-2xl font-bold"
                  >
                    Generate Formal Quote <ArrowRight className="w-5 h-5" />
                  </button>
               </form>
            </div>
         </div>
      </section>

      {/* STICKY FOOTER ACTION */}
      <div className="fixed bottom-0 left-0 w-full bg-brand-obsidian/95 backdrop-blur-xl border-t border-brand-border/40 py-6 px-10 z-50 flex flex-col md:flex-row justify-between items-center gap-6 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
         <div className="flex items-center gap-6">
            <div className="flex flex-col">
               <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest">Reference Signature</span>
               <span className="font-mono text-[11px] text-white font-bold uppercase tracking-widest">AMPLIOS-XP-8472-BKT</span>
            </div>
            <div className="h-8 w-px bg-brand-border/40 hidden lg:block" />
            <div className="flex flex-col">
               <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest">Total Build Value</span>
               <span className="font-display text-2xl text-brand-orange leading-none">£{basket.summary.estimatedCost.toLocaleString()}</span>
            </div>
         </div>
         
         <div className="flex gap-4 w-full md:w-auto">
            <button 
               onClick={handleSaveBuild}
               className="flex-1 md:flex-none px-12 py-4 border border-brand-border text-brand-white font-mono text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-obsidian transition-all font-bold flex items-center gap-2 justify-center"
            >
               {saveSuccess ? <Check className="w-3 h-3" /> : <Save className="w-3 h-3" />}
               {saveSuccess ? "Saved" : "Save Build"}
            </button>
            <button className="flex-1 md:flex-none px-12 py-4 bg-brand-orange text-brand-white font-mono text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all text-center font-bold flex items-center gap-2 justify-center shadow-lg shadow-brand-orange/20">
               <ShoppingCart className="w-3 h-3" />
               Checkout Stage 1
            </button>
         </div>
      </div>

      <div className="h-24" />
      <Footer />
    </main>
  );
}
