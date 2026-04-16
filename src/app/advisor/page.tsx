import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import BuildMatchQuiz from "@/components/advisor/BuildMatchQuiz";
import InteractiveCostEstimator from "@/components/advisor/InteractiveCostEstimator";
import ConsultancyLeadBox from "@/components/advisor/ConsultancyLeadBox";
import { BrainCircuit, Cpu, ShieldCheck, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "AI Build Advisor | DIY Motorhomes",
  description: "Use our engineering-led Match Engine and Cost Estimator to plan the perfect motorhome conversion foundations.",
};

export default function AIAdvisorPage() {
  return (
    <main className="bg-brand-obsidian min-h-screen text-brand-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-48 pb-24 overflow-hidden">
        <div className="blueprint-grid absolute inset-0 opacity-10 pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-8">
               <div className="p-3 bg-brand-orange/10 border border-brand-orange/30">
                  <BrainCircuit className="w-8 h-8 text-brand-orange" />
               </div>
               <p className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.3em]">
                 // ADVISOR ENGINE v4.2L
               </p>
            </div>
            <h1 className="font-display text-6xl lg:text-9xl mb-8 uppercase leading-none tracking-tighter">
              AI BUILD <span className="text-brand-orange">ADVISOR</span>
            </h1>
            <p className="font-sans text-brand-grey text-xl lg:text-2xl leading-relaxed max-w-2xl italic">
              Our engineering-first Match Engine eliminates the guesswork. Connect your goals to the right mechanical foundations and budget reality.
            </p>
          </div>
        </div>
      </section>

      {/* Match Engine Section */}
      <section className="py-24 border-y border-brand-border/30 relative">
        <div className="container mx-auto px-6">
          <div className="mb-16">
            <h2 className="font-display text-4xl uppercase mb-4 italic">
              01. <span className="text-brand-orange">THE BUILD MATCH</span> ENGINE
            </h2>
            <p className="font-sans text-brand-grey text-sm">Input your build requirements to identify the optimal chassis DNA.</p>
          </div>
          <BuildMatchQuiz />
        </div>
      </section>

      {/* Cost Estimator Section */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="mb-24 text-center">
            <ShieldCheck className="w-12 h-12 text-brand-orange mx-auto mb-8 opacity-50" />
            <h2 className="font-display text-5xl lg:text-7xl uppercase mb-6 tracking-tight italic text-brand-orange underline underline-offset-8">REAL-TIME COST ESTIMATOR</h2>
            <p className="font-sans text-brand-grey text-lg max-w-2xl mx-auto italic">
              Adjust your build parameters to visualize financial trade-offs. These estimates are based on 2026 UK conversion costs for major engineering systems.
            </p>
          </div>
          <InteractiveCostEstimator />
        </div>
      </section>

      {/* Lead Capture Section */}
      <section className="py-24 bg-brand-obsidian border-t border-brand-border/30">
         <div className="container mx-auto px-6">
            <ConsultancyLeadBox />
         </div>
      </section>

      {/* Technical Footnote */}
      <section className="py-24 bg-brand-carbon/30 border-t border-brand-border/30">
         <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto blueprint-border p-12 bg-brand-carbon flex gap-8 items-start italic">
               <Sparkles className="w-8 h-8 text-brand-orange shrink-0" />
               <div>
                  <h4 className="font-display text-lg uppercase mb-2">How it Works</h4>
                  <p className="font-sans text-xs text-brand-grey leading-relaxed">
                    The Advisor Engine uses a deterministic weighted-graph logic based on several hundred build configurations. While the term &quot;AI&quot; is used for user accessibility, the logic is strictly engineering-first, mapping your physical requirements (height, payload, usage) to the known mechanical properties of the 6 core commercial chassis sold in the UK.
                  </p>
               </div>
            </div>
         </div>
      </section>

      <Footer />
    </main>
  );
}
