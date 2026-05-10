import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, Globe, ShieldCheck, Info, CheckCircle, Navigation, Euro, Flame } from "lucide-react";

export const metadata: Metadata = {
  title: "Van Life Europe Guide for UK Builders 2026 | Rules & Prep | Amplios",
  description: "Taking your campervan to Europe after Brexit. We cover the 90/180 day Schengen rule, Aires networks, tolls, and LPG gas adapters.",
  openGraph: {
    title: "Van Life Europe Guide for UK Builders 2026 | Rules & Prep",
    description: "The continent awaits. What you need to know before taking the ferry.",
    url: "https://amplios.co.uk/guides/van-life-europe-guide",
  },
  alternates: { canonical: "https://amplios.co.uk/guides/van-life-europe-guide" },
};

export default function EuropeGuide() {
  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[50vh] flex items-end pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/cat-windows.png" // Placeholder
            alt="Van Life Europe"
            fill
            className="object-cover opacity-30 grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian via-brand-obsidian/60 to-transparent" />
        </div>
        
        <div className="relative container mx-auto px-6 pb-16 z-10">
          <div className="max-w-4xl">
            <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em] mb-4 block leading-none">
              // CROSSING THE CHANNEL
            </span>
            <h1 className="font-display text-4xl lg:text-7xl uppercase tracking-tighter text-brand-white leading-[0.9] mb-6">
              EUROPE:<br /><span className="text-brand-orange">BEYOND</span><br />BREXIT
            </h1>
            <p className="font-sans text-brand-grey text-lg max-w-2xl italic border-l-2 border-brand-orange pl-6">
              Europe is a campervan paradise, but the rules have changed for UK 
              citizens. Here is how to prepare your van and your itinerary for 
              the continent.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT SECTIONS */}
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          
          <section className="mb-24">
            <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-8">The 90 / 180 Day Rule</h2>
            <div className="prose prose-invert max-w-none font-sans text-brand-grey text-base leading-relaxed space-y-6">
              <p>
                As a UK passport holder, you can now only spend **90 days in any 180-day period** 
                within the Schengen Area. This means the classic "6-month summer tour of Europe" 
                is no longer possible without securing a specific long-stay visa from a single country.
              </p>
              <div className="bg-brand-carbon p-8 border border-brand-border space-y-4">
                <h4 className="font-display text-sm uppercase text-brand-orange mb-2">The Workaround</h4>
                <p className="text-sm">
                  If you want to travel longer, you must spend time in non-Schengen countries to 
                  "reset" your clock. Popular non-Schengen destinations for van-lifers include:
                </p>
                <ul className="grid grid-cols-2 gap-2 text-[11px] font-mono uppercase tracking-widest text-brand-grey">
                  <li>- Montenegro</li>
                  <li>- Albania</li>
                  <li>- Turkey</li>
                  <li>- Morocco (Ferry from Spain)</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-24">
            <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-10 text-center lg:text-left">Van Preparation</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Flame, title: "LPG Gas Adapters", desc: "If you have an underslung LPG tank, you need European fill adapters. The UK uses 'Bayonet', but you will need 'Acme', 'Dish', and 'Euro' adapters to fill up across the continent." },
                { icon: ShieldCheck, title: "Headlight Deflectors", desc: "Your UK headlights dip to the left. You MUST fit beam deflectors to avoid dazzling oncoming traffic, or you risk heavy on-the-spot fines." },
                { icon: Euro, title: "Toll Tags (Bip&Go)", desc: "Avoid the hassle of reaching out the wrong side of the van to pay tolls. A tag mounted on your windscreen automatically opens barriers in France, Spain, and Italy." },
              ].map((item) => (
                <div key={item.title} className="p-8 border border-brand-border bg-brand-obsidian space-y-4">
                  <item.icon className="w-6 h-6 text-brand-orange" />
                  <h4 className="font-display text-lg uppercase text-brand-white">{item.title}</h4>
                  <p className="font-sans text-brand-grey text-[11px] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="p-12 bg-brand-carbon border-l-4 border-green-500 mb-24">
            <h3 className="font-display text-2xl uppercase tracking-tight text-brand-white mb-4">The 'Aires' Network</h3>
            <p className="font-sans text-brand-grey text-sm leading-relaxed mb-4">
              France and Germany are the most motorhome-friendly countries in the world. 
              They operate networks of municipal parking areas specifically for motorhomes 
              (called 'Aires' in France and 'Stellplatz' in Germany).
            </p>
            <p className="font-sans text-brand-grey text-sm leading-relaxed">
              These are often free or very cheap (€5-€10) and usually provide fresh water 
              and chemical disposal facilities. It makes European van life significantly 
              easier than in the UK.
            </p>
          </section>

          {/* INTERNAL LINKS */}
          <div className="mt-20 pt-10 border-t border-brand-border/40">
            <h4 className="font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-8">Related European Guides</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/guides/winter-van-life-alps" className="p-6 border border-brand-border hover:border-brand-orange transition-colors flex items-center justify-between group">
                <span className="font-display text-xs uppercase text-brand-white">Winter in the Alps Guide</span>
                <ArrowRight className="w-4 h-4 text-brand-orange group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/guides/campervan-heating-guide" className="p-6 border border-brand-border hover:border-brand-orange transition-colors flex items-center justify-between group">
                <span className="font-display text-xs uppercase text-brand-white">Diesel Heating Guide</span>
                <ArrowRight className="w-4 h-4 text-brand-orange group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}
