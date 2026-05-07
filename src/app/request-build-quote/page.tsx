"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { 
  Magnet, CheckCircle2, Loader2, ArrowRight, 
  Info, ShieldCheck, Zap, Truck, Car, Target, Calendar,
  Wrench, Gauge
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function RequestQuotePage() {
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    vehicle: '',
    buildStage: 'Planning',
    budget: 'Under £5k',
    service: 'Full Build Kit',
    timeframe: 'Immediate',
    notes: ''
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Future integration: trackEvent('quote_request_started');
    try {
      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setSubmitSuccess(true);
        // Future integration: trackEvent('quote_request_submitted');
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

      <section className="pt-48 pb-20 bg-brand-carbon relative overflow-hidden border-b border-brand-border">
         <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />
         <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
            <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em] block mb-6">// Commercial Procurement Entry</span>
            <h1 className="font-display text-5xl lg:text-7xl uppercase tracking-tighter mb-8 leading-tight">Request Project <span className="text-brand-orange">Quote</span></h1>
            <p className="font-sans text-brand-grey text-lg leading-relaxed">
               Whether you need a full-vehicle kit bundle or specific technical consultation, our engineering team is ready to spec your build. 
            </p>
         </div>
      </section>

      <section className="py-24">
         <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
               
               {/* FORM SIDE */}
               <div className="lg:col-span-8">
                  <div className="bg-brand-carbon p-12 border border-brand-border shadow-2xl relative">
                     {submitSuccess ? (
                        <div className="py-20 text-center animate-in zoom-in duration-500">
                           <div className="w-24 h-24 bg-brand-orange/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-brand-orange/40">
                              <CheckCircle2 className="w-12 h-12 text-brand-orange" />
                           </div>
                           <h2 className="font-display text-4xl uppercase mb-6 text-white">Project Received</h2>
                           <p className="font-sans text-brand-grey text-lg max-w-md mx-auto mb-12">Your enquiry has been assigned to our engineering desk. We typically provide a full itemised quote within 48 business hours.</p>
                           <button onClick={() => setSubmitSuccess(false)} className="font-mono text-[10px] text-brand-orange uppercase tracking-widest border border-brand-orange/30 px-10 py-5 hover:bg-brand-orange hover:text-white transition-all">Submit Another Request</button>
                        </div>
                     ) : (
                        <form className="space-y-12" onSubmit={handleSubmit}>
                           
                           {/* CONTACT SECTION */}
                           <div className="space-y-8">
                              <h3 className="font-display text-xs uppercase tracking-[0.3em] border-b border-brand-border pb-4 italic">// Personal Details</h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                 <div className="space-y-2">
                                    <label className="font-mono text-[9px] text-brand-grey uppercase tracking-widest">First Name</label>
                                    <input required name="firstName" value={formData.firstName} onChange={handleInputChange} type="text" className="w-full bg-brand-obsidian border border-brand-border p-5 text-sm font-mono text-white focus:border-brand-orange outline-none transition-all" />
                                 </div>
                                 <div className="space-y-2">
                                    <label className="font-mono text-[9px] text-brand-grey uppercase tracking-widest">Last Name</label>
                                    <input required name="lastName" value={formData.lastName} onChange={handleInputChange} type="text" className="w-full bg-brand-obsidian border border-brand-border p-5 text-sm font-mono text-white focus:border-brand-orange outline-none transition-all" />
                                 </div>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                 <div className="space-y-2">
                                    <label className="font-mono text-[9px] text-brand-grey uppercase tracking-widest">Email Address</label>
                                    <input required name="email" value={formData.email} onChange={handleInputChange} type="email" className="w-full bg-brand-obsidian border border-brand-border p-5 text-sm font-mono text-white focus:border-brand-orange outline-none transition-all" />
                                 </div>
                                 <div className="space-y-2">
                                    <label className="font-mono text-[9px] text-brand-grey uppercase tracking-widest">Phone Number</label>
                                    <input name="phone" value={formData.phone} onChange={handleInputChange} type="tel" className="w-full bg-brand-obsidian border border-brand-border p-5 text-sm font-mono text-white focus:border-brand-orange outline-none transition-all" />
                                 </div>
                              </div>
                           </div>

                           {/* PROJECT SECTION */}
                           <div className="space-y-8">
                              <h3 className="font-display text-xs uppercase tracking-[0.3em] border-b border-brand-border pb-4 italic">// Project Scope</h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                 <div className="space-y-2">
                                    <label className="font-mono text-[9px] text-brand-grey uppercase tracking-widest">Vehicle Model & Wheelbase</label>
                                    <input required name="vehicle" value={formData.vehicle} onChange={handleInputChange} placeholder="e.g. Sprinter L3H2, VW Crafter MWB..." type="text" className="w-full bg-brand-obsidian border border-brand-border p-5 text-sm font-mono text-white focus:border-brand-orange outline-none transition-all" />
                                 </div>
                                 <div className="space-y-2">
                                    <label className="font-mono text-[9px] text-brand-grey uppercase tracking-widest">Service Required</label>
                                    <select name="service" value={formData.service} onChange={handleInputChange} className="w-full bg-brand-obsidian border border-brand-border p-5 text-sm font-mono text-white focus:border-brand-orange outline-none transition-all appearance-none">
                                       <option>Full Build Kit</option>
                                       <option>Electrical System Design</option>
                                       <option>Solar/Battery Upgrade</option>
                                       <option>Heating/Gas Install</option>
                                       <option>Plumbing & Water System</option>
                                       <option>Habitation Compliance Audit</option>
                                    </select>
                                 </div>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                 <div className="space-y-2">
                                    <label className="font-mono text-[9px] text-brand-grey uppercase tracking-widest">Current Build Stage</label>
                                    <select name="buildStage" value={formData.buildStage} onChange={handleInputChange} className="w-full bg-brand-obsidian border border-brand-border p-5 text-sm font-mono text-white focus:border-brand-orange outline-none transition-all appearance-none">
                                       <option>Planning</option>
                                       <option>Base Prep / Insulation</option>
                                       <option>First-Fix Electrical</option>
                                       <option>Interior Fit-out</option>
                                       <option>Finishing</option>
                                    </select>
                                 </div>
                                 <div className="space-y-2">
                                    <label className="font-mono text-[9px] text-brand-grey uppercase tracking-widest">Estimated Budget</label>
                                    <select name="budget" value={formData.budget} onChange={handleInputChange} className="w-full bg-brand-obsidian border border-brand-border p-5 text-sm font-mono text-white focus:border-brand-orange outline-none transition-all appearance-none">
                                       <option>Under £5,000</option>
                                       <option>£5,000 - £10,000</option>
                                       <option>£10,000 - £20,000</option>
                                       <option>£20,000+</option>
                                    </select>
                                 </div>
                                 <div className="space-y-2">
                                    <label className="font-mono text-[9px] text-brand-grey uppercase tracking-widest">Implementation Timeframe</label>
                                    <select name="timeframe" value={formData.timeframe} onChange={handleInputChange} className="w-full bg-brand-obsidian border border-brand-border p-5 text-sm font-mono text-white focus:border-brand-orange outline-none transition-all appearance-none">
                                       <option>Immediate</option>
                                       <option>Next 30 Days</option>
                                       <option>3-6 Months</option>
                                       <option>Planning Phase</option>
                                    </select>
                                 </div>
                              </div>
                              <div className="space-y-2">
                                 <label className="font-mono text-[9px] text-brand-grey uppercase tracking-widest">Project Notes / Specific Components</label>
                                 <textarea name="notes" value={formData.notes} onChange={handleInputChange} rows={6} className="w-full bg-brand-obsidian border border-brand-border p-5 text-sm font-mono text-white focus:border-brand-orange outline-none transition-all" placeholder="Detail any specific components already owned or specific layout requirements..." />
                              </div>
                           </div>

                           <button 
                             disabled={isSubmitting}
                             type="submit" 
                             className="w-full bg-brand-orange text-white font-display text-lg uppercase tracking-widest py-8 hover:bg-white hover:text-brand-orange transition-all flex items-center justify-center gap-4 shadow-2xl font-bold"
                           >
                             {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : <>Submit Project for Review <ArrowRight className="w-6 h-6" /></>}
                           </button>
                        </form>
                     )}
                  </div>
               </div>

               {/* INFO SIDE */}
               <div className="lg:col-span-4 space-y-8">
                  <div className="bg-brand-obsidian p-10 border border-brand-border">
                     <h4 className="font-display text-sm uppercase tracking-widest mb-8 flex items-center gap-3">
                        <Zap className="w-4 h-4 text-brand-orange" />
                        The Quoting Protocol
                     </h4>
                     <ul className="space-y-6">
                        <li className="flex gap-4">
                           <div className="shrink-0 mt-1"><CheckCircle2 className="w-4 h-4 text-brand-orange" /></div>
                           <div>
                              <span className="font-display text-[11px] uppercase tracking-widest text-white block mb-1">Technical Audit</span>
                              <p className="font-sans text-[11px] text-brand-grey leading-relaxed">Every quote request undergoes an engineering audit to ensure system compatibility.</p>
                           </div>
                        </li>
                        <li className="flex gap-4">
                           <div className="shrink-0 mt-1"><Truck className="w-4 h-4 text-brand-orange" /></div>
                           <div>
                              <span className="font-display text-[11px] uppercase tracking-widest text-white block mb-1">Stock Procurement</span>
                              <p className="font-sans text-[11px] text-brand-grey leading-relaxed">We source directly from manufacturers and specialized campervan parts suppliers.</p>
                           </div>
                        </li>
                        <li className="flex gap-4">
                           <div className="shrink-0 mt-1"><ShieldCheck className="w-4 h-4 text-brand-orange" /></div>
                           <div>
                              <span className="font-display text-[11px] uppercase tracking-widest text-white block mb-1">Compliance Ready</span>
                              <p className="font-sans text-[11px] text-brand-grey leading-relaxed">Components are selected to meet or exceed UK habitation and MOT requirements.</p>
                           </div>
                        </li>
                     </ul>
                  </div>

                  <div className="bg-brand-orange/5 border border-brand-orange/30 p-10">
                     <h4 className="font-display text-sm text-brand-orange uppercase tracking-widest mb-4">Bulk Build Discounts</h4>
                     <p className="font-sans text-xs text-brand-grey leading-relaxed mb-6">Planning a full L3H2 build? Projects exceeding £8,000 in hardware value are eligible for exclusive project pricing and free technical support.</p>
                     <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
                        <span className="font-mono text-[9px] text-white uppercase tracking-widest">Account Manager Priority</span>
                     </div>
                  </div>
               </div>

            </div>
         </div>
      </section>

      <Footer />
    </main>
  );
}
