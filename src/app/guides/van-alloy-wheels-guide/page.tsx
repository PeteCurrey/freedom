import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, Disc, Zap, ShieldCheck, Info, CheckCircle, Gauge, Settings } from "lucide-react";

export const metadata: Metadata = {
  title: "Van Conversion Alloy Wheels UK | Load Ratings & Guide | Amplios",
  description: "Choosing alloy wheels for your campervan conversion. Why load ratings matter more than looks, and the best brands for Sprinter, Crafter, and Ducato.",
  openGraph: {
    title: "Van Conversion Alloy Wheels UK | Load Ratings & Guide",
    description: "Don't compromise on safety. The ultimate guide to van alloys.",
    url: "https://amplios.co.uk/guides/van-alloy-wheels-guide",
  },
  alternates: { canonical: "https://amplios.co.uk/guides/van-alloy-wheels-guide" },
};

export default function AlloyWheelsGuide() {
  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[50vh] flex items-end pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/bespoke-iveco.png" // Placeholder
            alt="Van Alloy Wheels"
            fill
            className="object-cover opacity-30 grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian via-brand-obsidian/60 to-transparent" />
        </div>
        
        <div className="relative container mx-auto px-6 pb-16 z-10">
          <div className="max-w-4xl">
            <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em] mb-4 block leading-none">
              // STRUCTURAL STYLE
            </span>
            <h1 className="font-display text-4xl lg:text-7xl uppercase tracking-tighter text-brand-white leading-[0.9] mb-6">
              ALLOY<br /><span className="text-brand-orange">WHEELS</span><br />LOGIC
            </h1>
            <p className="font-sans text-brand-grey text-lg max-w-2xl italic border-l-2 border-brand-orange pl-6">
              Alloy wheels are the fastest way to transform your van's look, 
              but for a 3.5 tonne conversion, safety must come before style.
            </p>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          
          <section className="mb-24">
            <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-8">The 1000kg Rule</h2>
            <div className="prose prose-invert max-w-none font-sans text-brand-grey text-base leading-relaxed space-y-6">
              <p>
                Standard car alloy wheels are rated for around 500-600kg per wheel. 
                For a Mercedes Sprinter or VW Crafter, you **must** use wheels 
                specifically rated for at least **1100kg to 1250kg** per wheel.
              </p>
              <div className="bg-brand-orange text-brand-obsidian p-8 border-l-8 border-brand-obsidian font-bold italic">
                "NEVER fit car-rated wheels to a van conversion. The constant 
                weight of your build will cause cheap, under-rated alloys to 
                crack or shatter under stress."
              </div>
            </div>
          </section>

          <section className="mb-24">
            <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-10 text-center lg:text-left">Trusted Van Brands</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { name: "3SDM", focus: "Modern Styling", desc: "UK-designed wheels with dedicated heavy-duty ratings for Sprinter and Transporter." },
                { name: "Black Rhino", focus: "Off-Road Heritage", desc: "The go-to brand for rugged, adventure-style wheels with massive load ratings (up to 1500kg)." },
                { name: "BBS", focus: "OEM Quality", desc: "High-end German engineering. Often the choice for premium, subtle 'OEM+' builds." },
                { name: "Method Race Wheels", focus: "Proven Tough", desc: "Rally-inspired wheels that are almost indestructible. Perfect for overland builds." },
              ].map((item) => (
                <div key={item.name} className="p-8 border border-brand-border bg-brand-carbon/50 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-display text-lg uppercase text-brand-white">{item.name}</h4>
                    <span className="font-mono text-[9px] text-brand-orange uppercase tracking-widest">{item.focus}</span>
                  </div>
                  <p className="font-sans text-brand-grey text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-24">
            <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-8">Offset & Poke</h2>
            <div className="prose prose-invert max-w-none font-sans text-brand-grey text-base leading-relaxed space-y-4">
              <p>
                When choosing alloys, pay attention to the **Offset (ET)**. 
                Most van alloys have a lower offset than factory steel wheels, 
                meaning they sit further out. This improves stability and 
                gives a more aggressive stance, but if it's too low, you 
                may need wheel arch extensions to remain legal in the UK 
                (tyre tread must be covered by the bodywork).
              </p>
            </div>
          </section>

          {/* AFFILIATE CTA */}
          <div className="p-10 bg-brand-obsidian border border-brand-border flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex-1">
              <h4 className="font-display text-xl uppercase text-brand-white mb-2">Shop Alloy Wheels</h4>
              <p className="font-sans text-brand-grey text-xs italic">We recommend Elite Wheels or 4x4Tyres for the best UK stock of load-rated van alloys.</p>
            </div>
            <Link href="https://www.4x4tyres.co.uk" className="bg-brand-orange text-white px-8 py-4 font-display text-xs uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all flex items-center gap-2">
              View Wheels <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}
