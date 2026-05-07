"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { generateBuildBasket } from "@/lib/data/plannerRecommendations";
import { PDF_TIERS, COMPLIANCE_WARNINGS } from "@/lib/data/pdfCompliance";
import { getProductCTA } from "@/lib/data/productRegistry";
import Link from "next/link";
import { 
  CheckCircle2, AlertTriangle, ShieldAlert, FileText, 
  Settings, ArrowRight, Check, Package, Zap, ExternalLink,
  Loader2, Info, Scale, Gauge, ShieldCheck, Download
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function PlannerResultsPage() {
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    notes: ''
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Mock plan state - in production this would be fetched from DB or state management
  const basket = generateBuildBasket({ vehicleType: "Mercedes Sprinter L3H2" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, basket: basket.summary })
      });
      const data = await response.json();
      if (data.success) {
        setSubmitSuccess(true);
      }
    } catch (err) {
      alert("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
              <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.2em] mb-4 block animate-pulse">// Technical Specification Generated</span>
              <h1 className="font-display text-5xl lg:text-8xl uppercase tracking-tighter mb-8 leading-none">Build <span className="text-brand-orange">Architecture</span></h1>
              <p className="font-sans text-brand-grey text-xl max-w-2xl leading-relaxed">
                Personalized project pack for your <span className="text-white font-bold">{basket.summary.vehicleType}</span>. Every component has been selected for electrical parity and physical fitment.
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

      {/* 2. SYSTEM STACK SUMMARY */}
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

      {/* 3. THE BUILD BOM (Grouped by Stage) */}
      <section className="py-32 bg-brand-obsidian">
         <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row justify-between items-end mb-24 gap-8">
               <div className="max-w-2xl">
                  <h2 className="font-display text-5xl lg:text-7xl uppercase tracking-tighter mb-6">The Build <span className="text-brand-orange">BOM</span></h2>
                  <p className="font-sans text-brand-grey text-lg italic">"Every component below is cross-referenced for thermal stability and electrical parity within your specific vehicle platform."</p>
               </div>
               <div className="flex items-center gap-4 bg-brand-carbon border border-brand-border px-6 py-4">
                  <Download className="w-4 h-4 text-brand-orange" />
                  <span className="font-mono text-[10px] text-white uppercase tracking-widest">Export Bill of Materials (.CSV)</span>
               </div>
            </div>

            <div className="space-y-32">
               {Object.entries(basket.basket).map(([stage, items]) => (
                 <div key={stage} className="relative">
                    <div className="sticky top-24 z-20 bg-brand-obsidian py-6 border-b border-brand-border flex justify-between items-end mb-12">
                       <div className="flex items-center gap-6">
                          <div className="w-3 h-10 bg-brand-orange" />
                          <h3 className="font-display text-3xl uppercase tracking-widest">{stage}</h3>
                       </div>
                       <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest">Calculated Node Subtotal: <span className="text-white text-lg ml-2 font-bold">£{items.reduce((sum, i) => sum + (i.product.price * i.quantity), 0).toLocaleString()}</span></span>
                    </div>

                    <div className="grid grid-cols-1 gap-px bg-brand-border border border-brand-border shadow-2xl">
                       {items.map((item) => (
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
                                  <span className="font-mono text-[9px] bg-brand-orange text-white px-3 py-1 uppercase tracking-widest font-bold">Required System Hardware</span>
                                  <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest italic">// engineering justification</span>
                               </div>
                               <h4 className="font-display text-4xl uppercase tracking-tighter text-white">{item.product.name}</h4>
                               <p className="font-sans text-base text-brand-grey leading-relaxed max-w-3xl border-l-2 border-brand-orange/30 pl-8 italic">
                                  "{item.whyRecommended}"
                               </p>
                               <div className="flex flex-wrap gap-3">
                                  <span className="font-mono text-[8px] border border-brand-border px-3 py-1.5 text-brand-grey uppercase tracking-widest">{item.product.payloadWeightKg}kg Payload</span>
                                  <span className="font-mono text-[8px] border border-brand-border px-3 py-1.5 text-brand-grey uppercase tracking-widest">{item.product.installDifficulty} Install</span>
                               </div>
                            </div>

                            <div className="lg:w-72 text-right flex flex-col justify-between items-end">
                               <div className="text-right">
                                  <span className="font-display text-4xl block text-white">£{item.product.price.toLocaleString()}</span>
                                  <span className="font-mono text-[10px] text-brand-grey uppercase tracking-widest mt-1 block">Quantity: {item.quantity}</span>
                               </div>
                               <div className="w-full space-y-3 mt-8">
                                  <button className="w-full bg-brand-white text-brand-obsidian font-display text-[10px] uppercase tracking-widest py-4 hover:bg-brand-orange hover:text-white transition-all font-bold">
                                     {getProductCTA(item.product)}
                                  </button>
                                  {item.product.supplierType === 'affiliate' && (
                                    <span className="font-mono text-[8px] text-brand-grey uppercase tracking-widest text-center block">Sold via {item.product.brand} Partner</span>
                                  )}
                               </div>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* 4. DIGITAL PRODUCT TIERS (PDF Compliance Packs) */}
      <section className="py-40 bg-[#050505] border-y border-brand-border">
         <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-24">
               <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em] mb-6 block animate-pulse">// Engineering Documentation</span>
               <h2 className="font-display text-5xl lg:text-7xl uppercase tracking-tighter mb-8">Build <span className="text-brand-orange">Packs</span></h2>
               <p className="font-sans text-brand-grey text-lg leading-relaxed">
                  Convert your AI results into professional build dossiers. Eliminate installation guesswork and ensure long-term habitation compliance.
               </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
               {PDF_TIERS.map((tier) => (
                 <div key={tier.id} className={cn(
                   "bg-brand-carbon border p-12 flex flex-col group transition-all",
                   tier.id === 'detailed' ? "border-brand-orange shadow-2xl shadow-brand-orange/10 scale-105 z-10" : "border-brand-border hover:border-brand-orange/40"
                 )}>
                    {tier.id === 'detailed' && (
                       <span className="bg-brand-orange text-white font-mono text-[8px] uppercase tracking-widest px-3 py-1 self-start mb-8 rounded-full">Recommended</span>
                    )}
                    <h3 className="font-display text-2xl uppercase tracking-tight mb-4">{tier.name}</h3>
                    <p className="font-sans text-xs text-brand-grey leading-relaxed mb-8 h-12">{tier.description}</p>
                    <div className="flex items-baseline gap-2 mb-12">
                       <span className="font-display text-5xl text-white">£{tier.price}</span>
                       <span className="font-mono text-[10px] text-brand-grey uppercase tracking-widest">One-time purchase</span>
                    </div>
                    
                    <div className="flex-1 space-y-4 mb-16">
                       {tier.features.map((f, i) => (
                         <div key={i} className="flex gap-4 border-b border-brand-border/30 pb-4">
                            <CheckCircle2 className={cn("w-4 h-4 shrink-0 mt-1", tier.id === 'detailed' ? "text-brand-orange" : "text-brand-grey")} />
                            <span className="font-mono text-[9px] text-white uppercase tracking-widest leading-normal">{f}</span>
                         </div>
                       ))}
                    </div>

                    <button className={cn(
                      "w-full py-5 font-display text-[10px] uppercase tracking-widest transition-all shadow-xl font-bold",
                      tier.id === 'detailed' ? "bg-brand-orange text-white" : "bg-brand-white text-brand-obsidian hover:bg-brand-orange hover:text-white"
                    )}>
                       Download Build Pack
                    </button>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* 5. COMPLIANCE & RISK (Realistic UK Warnings) */}
      <section className="py-24 bg-brand-obsidian">
         <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-brand-carbon border border-brand-border p-12 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-12 opacity-5 text-brand-orange">
                  <ShieldAlert className="w-48 h-48" />
               </div>
               <div className="space-y-12">
                  <h3 className="font-display text-3xl uppercase tracking-tighter italic text-brand-orange">// Compliance Protocol</h3>
                  <div className="space-y-8">
                     {COMPLIANCE_WARNINGS.map((warn, i) => (
                       <div key={i} className="space-y-2 border-l-2 border-brand-orange/30 pl-6">
                          <h4 className="font-display text-sm uppercase tracking-widest text-white">{warn.title}</h4>
                          <p className="font-sans text-[11px] text-brand-grey leading-relaxed">{warn.content}</p>
                       </div>
                     ))}
                  </div>
               </div>
               <div className="bg-brand-obsidian p-12 border border-brand-border flex flex-col justify-center items-center text-center">
                  <div className="bg-brand-orange/10 p-6 border border-brand-orange/20 mb-8">
                     <Info className="w-12 h-12 text-brand-orange" />
                  </div>
                  <h4 className="font-display text-2xl uppercase tracking-tight mb-4">Engineering Support</h4>
                  <p className="font-sans text-brand-grey text-sm mb-12">Every build plan includes a 30-day technical support window for installation queries and product compatibility sign-off.</p>
                  <button className="font-mono text-[10px] text-brand-orange uppercase tracking-widest border border-brand-orange/30 px-10 py-5 hover:bg-brand-orange hover:text-white transition-all">
                     Contact Engineering Desk
                  </button>
               </div>
            </div>
         </div>
      </section>

      {/* 6. QUOTE REQUEST (Captured for Lead Gen) */}
      <section className="py-40 bg-[#0a0a0a]">
         <div className="container mx-auto px-6 max-w-4xl">
            <div className="bg-brand-obsidian p-16 border border-brand-border relative shadow-2xl">
               <div className="absolute top-0 left-0 w-full h-1 bg-brand-orange" />
               <div className="text-center mb-16">
                  <h3 className="font-display text-4xl uppercase tracking-tighter mb-4">Formal Project Quote</h3>
                  <p className="font-sans text-brand-grey leading-relaxed">
                     Submit your full build basket to our specialized tech team. We will review your schematic, verify stock availability, and apply bulk project discounts.
                  </p>
               </div>
               
               {submitSuccess ? (
                  <div className="py-12 text-center animate-in zoom-in duration-500">
                     <CheckCircle2 className="w-16 h-16 text-brand-orange mx-auto mb-6" />
                     <h4 className="font-display text-2xl uppercase mb-4 text-white">Transmission Successful</h4>
                     <p className="font-sans text-brand-grey">Your build reference has been sent to our engineering team. Expect a response within 48 hours.</p>
                  </div>
               ) : (
                  <form className="space-y-8" onSubmit={handleQuoteSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="font-mono text-[9px] text-brand-grey uppercase tracking-widest">First Name</label>
                        <input required name="firstName" value={formData.firstName} onChange={handleInputChange} type="text" className="w-full bg-brand-carbon border border-brand-border p-5 text-sm font-mono text-white focus:border-brand-orange outline-none transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label className="font-mono text-[9px] text-brand-grey uppercase tracking-widest">Last Name</label>
                        <input required name="lastName" value={formData.lastName} onChange={handleInputChange} type="text" className="w-full bg-brand-carbon border border-brand-border p-5 text-sm font-mono text-white focus:border-brand-orange outline-none transition-all" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="font-mono text-[9px] text-brand-grey uppercase tracking-widest">Email Address</label>
                      <input required name="email" value={formData.email} onChange={handleInputChange} type="email" className="w-full bg-brand-carbon border border-brand-border p-5 text-sm font-mono text-white focus:border-brand-orange outline-none transition-all" />
                    </div>
                    <button 
                      disabled={isSubmitting}
                      type="submit" 
                      className="w-full bg-brand-orange text-white font-display text-base uppercase tracking-widest py-6 hover:bg-white hover:text-brand-orange transition-all flex items-center justify-center gap-4 shadow-2xl font-bold"
                    >
                      {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : <>Generate Formal Quote <ArrowRight className="w-5 h-5" /></>}
                    </button>
                  </form>
               )}
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
               <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest">Calculated Hardware Value</span>
               <span className="font-display text-2xl text-brand-orange leading-none">£{basket.summary.estimatedCost.toLocaleString()}</span>
            </div>
         </div>
         
         <div className="flex gap-4 w-full md:w-auto">
            <button className="flex-1 md:flex-none px-12 py-4 border border-brand-border text-brand-white font-mono text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-obsidian transition-all font-bold">
               Save Build State
            </button>
            <Link href="/planner" className="flex-1 md:flex-none px-12 py-4 bg-brand-carbon text-brand-white font-mono text-[10px] uppercase tracking-widest hover:bg-brand-border transition-all text-center font-bold">
               Edit Parameters
            </Link>
         </div>
      </div>

      <div className="h-24" />
      <Footer />
    </main>
  );
}
