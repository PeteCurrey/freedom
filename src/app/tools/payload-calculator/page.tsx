import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import PayloadCalculator from "@/components/tools/PayloadCalculator";
import { ShieldCheck, Info, ArrowLeft, Terminal } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Payload & GVM Calculator | Amplios",
  description: "Calculate vehicle mass and payload distribution to ensure your campervan build stays within legal and safety GVM limits.",
};

export default function PayloadCalculatorPage() {
  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      <section className="pt-48 pb-24">
        <div className="container mx-auto px-6">
          <div className="mb-20">
            <Link href="/tools" className="inline-flex items-center gap-2 font-mono text-[10px] text-brand-grey uppercase tracking-widest hover:text-brand-orange transition-colors mb-8">
              <ArrowLeft className="w-3 h-3" /> Back to Tools Hub
            </Link>
            <div className="flex items-center gap-3 mb-6">
               <Terminal className="text-brand-orange w-4 h-4" />
               <p className="font-mono text-[10px] text-brand-orange uppercase tracking-[.4em] italic">// MODULE: PAYLOAD_DYNAMICS_01</p>
            </div>
            <h1 className="font-display text-5xl lg:text-7xl uppercase mb-8 leading-none tracking-tighter">
              PAYLOAD & <span className="text-brand-orange">GVM</span> CALCULATOR
            </h1>
            <p className="font-sans text-brand-grey text-xl max-w-3xl leading-relaxed">
              Maintain vehicle safety and legal compliance. Quantify the mass of every component, fluid, and furniture node to ensure your build remains within Gross Vehicle Mass (GVM) limits.
            </p>
          </div>

          <PayloadCalculator />

          {/* Standards & Compliance info */}
          <div className="mt-48 grid grid-cols-1 lg:grid-cols-2 gap-24 border-t border-brand-border pt-24">
             <div className="space-y-8">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 blueprint-border flex items-center justify-center text-brand-orange">
                      <ShieldCheck className="w-6 h-6" />
                   </div>
                   <h3 className="font-display text-3xl uppercase italic leading-none">The 3.5t Threshold</h3>
                </div>
                <p className="font-sans text-brand-grey text-lg leading-relaxed">
                   Most UK van conversions are built on 3,500kg (3.5t) chassis. This limit is critical: exceeding it is not only illegal but invalidates your insurance and significantly increases braking distances.
                </p>
             </div>
             <div className="space-y-8">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 blueprint-border flex items-center justify-center text-brand-orange">
                      <Info className="w-6 h-6" />
                   </div>
                   <h3 className="font-display text-3xl uppercase italic leading-none">Dynamic Distribution</h3>
                </div>
                <p className="font-sans text-brand-grey text-lg leading-relaxed">
                   Mass is not just about total weight; it&apos;s about distribution. Unbalanced loads (e.g., placing all water tanks and batteries on one side) can lead to uneven suspension wear and poor handling.
                </p>
             </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
