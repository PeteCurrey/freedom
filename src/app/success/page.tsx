import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CheckCircle2, Package, ArrowRight, Activity, Download } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Order Confirmed | DIY Motorhomes",
  description: "Your build components and engineering plans have been successfully secured.",
};

export default function SuccessPage({ searchParams }: { searchParams: { session_id?: string } }) {
  return (
    <main className="bg-brand-obsidian min-h-screen flex flex-col">
      <Navbar />

      <section className="flex-1 pt-48 pb-32">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="blueprint-border bg-brand-carbon p-12 lg:p-20 text-center relative overflow-hidden">
            <div className="blueprint-grid absolute inset-0 opacity-10 pointer-events-none" />
            
            <div className="relative z-10">
              <div className="w-20 h-20 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center text-green-500 mx-auto mb-10">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <p className="font-mono text-[10px] text-brand-orange uppercase tracking-[.4em] mb-4">// TRANSACTION VERIFIED</p>
              <h1 className="font-display text-5xl lg:text-7xl uppercase mb-8">
                COMMAND <span className="text-brand-orange">SECURED</span>
              </h1>
              
              <p className="font-sans text-brand-grey text-lg mb-12 max-w-2xl mx-auto italic">
                Your engineering foundations have been successfully processed. Check your email for detailed build schematics and shipping tracking information.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 max-w-2xl mx-auto">
                 <div className="blueprint-border p-6 bg-brand-obsidian text-left">
                    <Activity className="w-5 h-5 text-brand-orange mb-4" />
                    <h4 className="font-display text-sm uppercase mb-2">Build Lab</h4>
                    <p className="font-sans text-[10px] text-brand-grey leading-relaxed">Access your saved plans and premium downloads in your dashboard.</p>
                    <Link href="/account" className="mt-4 flex items-center gap-2 font-mono text-[9px] text-brand-orange uppercase tracking-widest hover:text-white transition-colors">
                       Enter Lab <ArrowRight className="w-3 h-3" />
                    </Link>
                 </div>
                 <div className="blueprint-border p-6 bg-brand-obsidian text-left">
                    <Package className="w-5 h-5 text-brand-orange mb-4" />
                    <h4 className="font-display text-sm uppercase mb-2">Order Tracking</h4>
                    <p className="font-sans text-[10px] text-brand-grey leading-relaxed">Monitor your component shipments and delivery logs in real-time.</p>
                    <Link href="/account" className="mt-4 flex items-center gap-2 font-mono text-[9px] text-brand-orange uppercase tracking-widest hover:text-white transition-colors">
                       Track Order <ArrowRight className="w-3 h-3" />
                    </Link>
                 </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4 justify-center">
                 <Link href="/store" className="bg-brand-orange text-white px-10 py-5 font-display text-xs uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all">
                    Return to Store
                 </Link>
                 <Link href="/" className="border border-brand-border text-brand-grey px-10 py-5 font-display text-xs uppercase tracking-widest hover:border-brand-orange transition-all">
                    Back to Homepage
                 </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
