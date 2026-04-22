"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import PayloadCalculator from "@/components/tools/PayloadCalculator";
import { ArrowLeft, LayoutPanelLeft } from "lucide-react";
import Link from "next/link";

export default function PayloadBalancerPage() {
  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-6 py-24 pt-32">
        <div className="mb-16">
          <Link 
            href="/planner" 
            className="flex items-center gap-2 font-mono text-[10px] text-brand-orange uppercase tracking-[0.3em] mb-4 hover:text-brand-white transition-colors"
          >
            <ArrowLeft size={12} /> Back to Build Planner
          </Link>
          
          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="max-w-2xl">
              <h1 className="font-display text-5xl lg:text-7xl uppercase tracking-tighter text-brand-white leading-none">
                PAYLOAD <span className="text-brand-orange">& BALANCE</span>
              </h1>
              <p className="font-mono text-xs text-brand-grey uppercase tracking-widest mt-6 leading-relaxed">
                Engineering-first weight distribution telemetry. Calculate axle loading 
                and stability margins for legal road compliance.
              </p>
            </div>
            
            <div className="hidden md:flex gap-12 border-l border-brand-border pl-12">
               <div>
                  <span className="font-mono text-[8px] text-brand-grey uppercase block mb-1">Standard Margin</span>
                  <span className="font-display text-xl text-white">10% Safety</span>
               </div>
               <div>
                  <span className="font-mono text-[8px] text-brand-grey uppercase block mb-1">Calculation Method</span>
                  <span className="font-display text-xl text-white">Longitudinal Moments</span>
               </div>
            </div>
          </div>
        </div>

        <PayloadCalculator />

        {/* Education Section */}
        <section className="mt-32 pt-32 border-t border-brand-border/30 grid grid-cols-1 md:grid-cols-3 gap-16">
           <div className="space-y-6">
              <h3 className="font-display text-xl uppercase text-white">What is GVM?</h3>
              <p className="font-sans text-sm text-brand-grey leading-relaxed">
                Gross Vehicle Mass (GVM) is the maximum legal weight of your vehicle including fuel, 
                passengers, and every single gram of your build. In the UK, exceeding 3,500kg on a 
                standard license leads to legal and insurance catastrophic failure.
              </p>
           </div>
           <div className="space-y-6">
              <h3 className="font-display text-xl uppercase text-white">Axle Loading</h3>
              <p className="font-sans text-sm text-brand-grey leading-relaxed">
                Even if you are under the 3.5t GVM limit, you can be illegal if your rear axle is overloaded. 
                Placing heavy water tanks behind the rear wheels acts as a lever, lifting the front and forcing 
                the rear axle over its technical limit.
              </p>
           </div>
           <div className="space-y-6">
              <h3 className="font-display text-xl uppercase text-white">CoG & Handling</h3>
              <p className="font-sans text-sm text-brand-grey leading-relaxed">
                Center of Gravity (CoG) impacts how your van corners and stops. A high or rear-biased CoG 
                increases body roll and reduces steering response. Always aim for a centralized, low mass.
              </p>
           </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
