"use client";

import Link from "next/link";
import { ArrowRight, Box } from "lucide-react";

export function EditorialBridge() {
  return (
    <section className="py-24 bg-brand-obsidian">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* LEFT */}
          <div className="flex-1 bg-brand-carbon border border-brand-border p-12 lg:p-16 text-center flex flex-col items-center justify-center group hover:border-brand-grey transition-colors">
            <h3 className="font-display text-2xl lg:text-3xl uppercase tracking-tighter mb-4 text-brand-white">
              NOT SURE WHERE TO START?
            </h3>
            <p className="font-sans text-brand-grey max-w-md mx-auto mb-10">
              Our build system guides walk you through every component, tier by tier. No guesswork.
            </p>
            <Link 
              href="/systems" 
              className="px-8 py-4 border border-brand-border text-brand-white font-display text-[10px] uppercase tracking-widest hover:border-brand-grey transition-all font-bold"
            >
              Explore Build Systems →
            </Link>
          </div>

          {/* RIGHT */}
          <div className="flex-1 bg-[#1A1A1A] border border-brand-border p-12 lg:p-16 text-center flex flex-col items-center justify-center relative overflow-hidden group hover:border-brand-orange/50 transition-colors">
            <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />
            <h3 className="font-display text-2xl lg:text-3xl uppercase tracking-tighter mb-4 text-white relative z-10">
              PLAN YOUR ENTIRE BUILD
            </h3>
            <p className="font-sans text-brand-grey max-w-md mx-auto mb-10 relative z-10">
              Use the Build Planner to configure your full system, spec every component, and get a professional blueprint.
            </p>
            <Link 
              href="/planner" 
              className="px-8 py-4 bg-brand-orange text-white font-display text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all font-bold shadow-[0_0_20px_rgba(255,107,0,0.2)] relative z-10"
            >
              Launch Build Planner →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
