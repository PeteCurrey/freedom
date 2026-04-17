import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-brand-obsidian pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-4xl">
        <Link href="/" className="inline-flex items-center gap-2 font-mono text-[10px] text-brand-orange uppercase tracking-[0.3em] mb-12 hover:text-white transition-colors">
          <ArrowLeft size={12} /> Return to base
        </Link>

        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-brand-carbon border border-brand-orange/30 flex items-center justify-center text-brand-orange">
            <ShieldCheck size={24} />
          </div>
          <h1 className="font-display text-5xl uppercase tracking-tighter">Privacy <span className="text-brand-orange">Protocol</span></h1>
        </div>

        <div className="blueprint-border p-12 bg-brand-carbon relative overflow-hidden mb-12">
          <div className="blueprint-grid absolute inset-0 opacity-10 pointer-events-none" />
          
          <div className="relative z-10 space-y-12 font-sans text-brand-grey leading-relaxed">
            <section className="space-y-4">
              <h2 className="font-display text-xl text-white uppercase tracking-tight">01. Data Collection Node</h2>
              <p>
                We prioritize engineering precision not only in our builds but in our data management. We collect information you provide directly to us through conversion advisor sessions, newsletter signups, and store transactions. This includes your name, email, and specific vehicle preferences.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-xl text-white uppercase tracking-tight">02. Intelligence Utilization</h2>
              <p>
                The data captured is used strictly to enhance your build experience. This includes personalizing technical recommendations, facilitating store orders, and sending you the "Join the Build" journal updates. WE DO NOT SELL DATA to secondary chassis or parts brokers.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-xl text-white uppercase tracking-tight">03. Marketplace Security</h2>
              <p>
                 Our store transactions are processed through Stripe’s encrypted infrastructure. We do not store sensitive payment hardware details on our local servers.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-xl text-white uppercase tracking-tight">04. Communications Opt-out</h2>
              <p>
                You may terminate your position in our communication network at any time via the unsubscribe link in the footer of our "Journal" emails.
              </p>
            </section>
          </div>
        </div>
        
        <p className="font-mono text-[10px] text-brand-grey uppercase tracking-widest text-center">
          Last Revision: April 2026 // Protocol v1.4.2
        </p>
      </div>
    </div>
  );
}
