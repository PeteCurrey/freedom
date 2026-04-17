import Link from "next/link";
import { ArrowLeft, Gavel } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-brand-obsidian pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-4xl">
        <Link href="/" className="inline-flex items-center gap-2 font-mono text-[10px] text-brand-orange uppercase tracking-[0.3em] mb-12 hover:text-white transition-colors">
          <ArrowLeft size={12} /> Return to base
        </Link>

        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-brand-carbon border border-brand-orange/30 flex items-center justify-center text-brand-orange">
            <Gavel size={24} />
          </div>
          <h1 className="font-display text-5xl uppercase tracking-tighter">Engagement <span className="text-brand-orange">Terms</span></h1>
        </div>

        <div className="blueprint-border p-12 bg-brand-carbon relative overflow-hidden mb-12">
          <div className="blueprint-grid absolute inset-0 opacity-10 pointer-events-none" />
          
          <div className="relative z-10 space-y-12 font-sans text-brand-grey leading-relaxed">
            <section className="space-y-4">
              <h2 className="font-display text-xl text-white uppercase tracking-tight">01. Technical Accuracy</h2>
              <p>
                While Amplios strives for absolute precision in our technical guides and calculators, the self-build motorhome conversion process involves inherent risks. All electrical diagrams and structural calculations must be verified by a certified professional before implementation on a road-vehicle.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-xl text-white uppercase tracking-tight">02. Marketplace Conduct</h2>
              <p>
                By purchasing hardware through the Amplios Monster Store, you agree to our fulfillment and return protocols. Orders are processed within 48 hours of credit verification.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-xl text-white uppercase tracking-tight">03. IP Protocol</h2>
              <p>
                 All schematic illustrations, technical articles, and proprietary calculators provided on Amplios are the intellectual property of Avorria. Reproduction without explicit tactical clearance is prohibited.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-xl text-white uppercase tracking-tight">04. Limitation of Liability</h2>
              <p>
                Amplios is not liable for structural failures or electrical disruptions resulting from the misuse of information provided on this platform. Build with discipline.
              </p>
            </section>
          </div>
        </div>
        
        <p className="font-mono text-[10px] text-brand-grey uppercase tracking-widest text-center">
          Last Revision: April 2026 // Terms v2.1.0
        </p>
      </div>
    </div>
  );
}
