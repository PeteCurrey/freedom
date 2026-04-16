import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { XCircle, ArrowLeft, ShoppingBag, HelpCircle } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Order Cancelled | Amplios",
  description: "Your transaction was cancelled. No charges were made to your account.",
};

export default function CancelPage() {
  return (
    <main className="bg-brand-obsidian min-h-screen flex flex-col">
      <Navbar />

      <section className="flex-1 pt-48 pb-32">
        <div className="container mx-auto px-6 max-w-2xl">
          <div className="blueprint-border bg-brand-carbon p-12 text-center relative overflow-hidden">
            <div className="blueprint-grid absolute inset-0 opacity-10 pointer-events-none" />
            
            <div className="relative z-10">
              <div className="w-20 h-20 bg-brand-orange/10 border border-brand-orange/30 rounded-full flex items-center justify-center text-brand-orange mx-auto mb-10">
                <XCircle className="w-10 h-10" />
              </div>

              <p className="font-mono text-[10px] text-brand-grey uppercase tracking-[.4em] mb-4">// TRANSACTION TERMINATED</p>
              <h1 className="font-display text-5xl uppercase mb-8">
                ORDER <span className="text-brand-orange">CANCELLED</span>
              </h1>
              
              <p className="font-sans text-brand-grey text-lg mb-12 italic">
                The secure checkout session was closed and no funds were transferred. Your build components are still waiting in your cart.
              </p>

              <div className="flex flex-col gap-4">
                 <Link href="/cart" className="bg-brand-orange text-white px-10 py-5 font-display text-xs uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all flex items-center justify-center gap-3">
                    <ShoppingBag className="w-4 h-4" /> Return to Cart
                 </Link>
                 <Link href="/resources" className="border border-brand-border text-brand-grey px-10 py-5 font-display text-xs uppercase tracking-widest hover:border-brand-orange transition-all flex items-center justify-center gap-3">
                    <HelpCircle className="w-4 h-4" /> Need Technical Help?
                 </Link>
                 <Link href="/" className="font-mono text-[9px] text-brand-grey/50 uppercase tracking-widest hover:text-white transition-colors mt-8">
                    Exit to Command Centre
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
