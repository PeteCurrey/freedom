import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import CableCalculator from "@/components/tools/CableCalculator";
import { ShieldCheck, Info, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cable Sizing Calculator | DIY Motorhomes",
  description: "Calculate required DC cable cross-sections and AWG sizes for your campervan electrical system to ensure safety and minimize voltage drop.",
};

export default function CableCalculatorPage() {
  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      <section className="pt-48 pb-24">
        <div className="container mx-auto px-6">
          <div className="mb-16">
            <Link href="/resources" className="inline-flex items-center gap-2 font-mono text-[10px] text-brand-grey uppercase tracking-widest hover:text-brand-orange transition-colors mb-8">
              <ArrowLeft className="w-3 h-3" /> Back to Resources
            </Link>
            <p className="font-mono text-[10px] text-brand-orange uppercase tracking-[.4em] mb-4">// ENGINEERING UTILITY</p>
            <h1 className="font-display text-5xl lg:text-7xl uppercase mb-6">
              DC CABLE <span className="text-brand-orange">SIZING</span>
            </h1>
            <p className="font-sans text-brand-grey text-xl max-w-2xl leading-relaxed">
              Don&apos;t guess your electrical safety. Use our engineering-grade calculator to determine the exact cable gauge required for your specific load and distance.
            </p>
          </div>

          <CableCalculator />

          {/* Educational Content */}
          <div className="mt-32 grid grid-cols-1 lg:grid-cols-3 gap-12">
             <div className="space-y-6">
                <div className="w-12 h-12 blueprint-border flex items-center justify-center text-brand-orange">
                   <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-display text-xl uppercase italic">The 3% Rule</h3>
                <p className="font-sans text-sm text-brand-grey leading-relaxed">
                   Standard van electrical practice allows for a 3% voltage drop. However, for critical systems like battery chargers (DC-DC) or high-wattage inverters, a 1% drop is recommended to prevent efficiency loss and heat buildup.
                </p>
             </div>
             <div className="space-y-6">
                <div className="w-12 h-12 blueprint-border flex items-center justify-center text-brand-orange">
                   <Info className="w-6 h-6" />
                </div>
                <h3 className="font-display text-xl uppercase italic">One-Way vs Round Trip</h3>
                <p className="font-sans text-sm text-brand-grey leading-relaxed">
                   When calculating distance, we measure the one-way run. Our tool automatically accounts for the return (negative) cable by doubling the length in the resistance equation.
                </p>
             </div>
             <div className="space-y-6">
                <div className="w-12 h-12 blueprint-border flex items-center justify-center text-brand-orange">
                   <Scale className="w-6 h-6" />
                </div>
                <h3 className="font-display text-xl uppercase italic">Metric vs AWG</h3>
                <p className="font-sans text-sm text-brand-grey leading-relaxed">
                   The UK and Europe use metric sizing (mm²), while many components from the US refer to AWG. Our tool provides both to ensure you source the correct engineering standard.
                </p>
             </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function Scale({ className }: { className?: string }) {
  return (
    <svg 
      className={className}
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>
    </svg>
  );
}
