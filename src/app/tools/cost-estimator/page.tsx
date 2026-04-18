import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import CostEstimator from "@/components/tools/CostEstimator";
import { PoundSterling, Info, ArrowLeft, Terminal, ShieldCheck } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "System Cost Estimator | Amplios",
  description: "Forecast your campervan build budget across various hardware tiers, from essential components to professional-grade off-grid systems.",
};

export default function CostEstimatorPage() {
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
               <p className="font-mono text-[10px] text-brand-orange uppercase tracking-[.4em] italic">// MODULE: BUDGET_FORECAST_03</p>
            </div>
            <h1 className="font-display text-5xl lg:text-7xl uppercase mb-8 leading-none tracking-tighter">
              SYSTEM <span className="text-brand-orange">COST</span> ANALYSIS
            </h1>
            <p className="font-sans text-brand-grey text-xl max-w-3xl leading-relaxed">
              Eliminate financial uncertainty. High-fidelity budget forecasting across four technical tiers of hardware, based on the official Amplios hardware registry and current UK trade rates.
            </p>
          </div>

          <CostEstimator />

          {/* Pricing Disclaimer & Context */}
          <div className="mt-48 grid grid-cols-1 lg:grid-cols-2 gap-24 border-t border-brand-border pt-24">
             <div className="space-y-8">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 blueprint-border flex items-center justify-center text-brand-orange">
                      <PoundSterling className="w-6 h-6" />
                   </div>
                   <h3 className="font-display text-3xl uppercase italic leading-none">Market Volatility</h3>
                </div>
                <p className="font-sans text-brand-grey text-lg leading-relaxed">
                   Hardware pricing, particularly for lithium cell chemistry and copper cabling, is subject to global exchange fluctuations. Our registry rates are updated quarterly to ensure accurate node-estimations.
                </p>
             </div>
             <div className="space-y-8">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 blueprint-border flex items-center justify-center text-brand-orange">
                      <ShieldCheck className="w-6 h-6" />
                   </div>
                   <h3 className="font-display text-3xl uppercase italic leading-none">VAT Considerations</h3>
                </div>
                <p className="font-sans text-brand-grey text-lg leading-relaxed">
                   Calculations provided in this ledger are inclusive of UK VAT (20%). If you are building through a VAT-registered business, actual hardware costs will be 16.6% lower than the registry standard.
                </p>
             </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
