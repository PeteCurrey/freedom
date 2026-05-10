import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, Mountain, ShieldCheck, Zap, Info, CheckCircle, Star, Gauge } from "lucide-react";

export const metadata: Metadata = {
  title: "BFGoodrich KO2 Sprinter Review | Worth the Hype? | Amplios",
  description: "Our in-depth review of the BFG KO2 on a Mercedes Sprinter campervan. We test noise, fuel economy, and off-road grip for UK van life.",
  openGraph: {
    title: "BFGoodrich KO2 Sprinter Review | Worth the Hype? | Amplios",
    description: "The most iconic AT tyre. Is it right for your Sprinter build?",
    url: "https://amplios.co.uk/guides/bfgoodrich-ko2-sprinter",
  },
  alternates: { canonical: "https://amplios.co.uk/guides/bfgoodrich-ko2-sprinter" },
};

export default function KO2SprinterReview() {
  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[50vh] flex items-end pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/bespoke-iveco.png" // Placeholder
            alt="BFG KO2 Sprinter"
            fill
            className="object-cover opacity-30 grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian via-brand-obsidian/60 to-transparent" />
        </div>
        
        <div className="relative container mx-auto px-6 pb-16 z-10">
          <div className="max-w-4xl">
            <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em] mb-4 block leading-none">
              // PRODUCT REVIEW
            </span>
            <h1 className="font-display text-4xl lg:text-7xl uppercase tracking-tighter text-brand-white leading-[0.9] mb-6">
              THE<br /><span className="text-brand-orange">KO2</span><br />VERDICT
            </h1>
            <p className="font-sans text-brand-grey text-lg max-w-2xl italic border-l-2 border-brand-orange pl-6">
              Is the BFGoodrich All-Terrain KO2 really the best tyre for a 
              Sprinter conversion, or are you just paying for the looks?
            </p>
          </div>
        </div>
      </section>

      {/* RATING SECTION */}
      <section className="py-20 bg-brand-carbon border-y border-brand-border/20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { label: "Off-Road Grip", score: 5 },
              { label: "Durability", score: 5 },
              { label: "Road Noise", score: 3 },
              { label: "Fuel Economy", score: 2 },
            ].map((r) => (
              <div key={r.label} className="p-8 border border-brand-border bg-brand-obsidian text-center">
                <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest block mb-4">{r.label}</span>
                <div className="flex justify-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < r.score ? "text-brand-orange fill-brand-orange" : "text-brand-border"}`} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <div className="container mx-auto px-6 py-24">
        <div className="max-w-4xl mx-auto">
          
          <section className="mb-24">
            <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-8">The Icon of Van Life</h2>
            <div className="prose prose-invert max-w-none font-sans text-brand-grey text-lg leading-relaxed space-y-6">
              <p>
                The **BFGoodrich All-Terrain T/A KO2** is the tyre you see on 
                90% of adventure vans. Its aggressive white-lettered sidewall 
                and 'CoreGard' technology make it the toughest all-terrain 
                tyre on the market.
              </p>
              <p>
                But for the UK van builder, there are compromises. The KO2 is a 
                heavy tyre. Fitting a set of four in 245/75 R16 will add 
                approximately **15kg of unsprung weight** compared to a 
                highway tyre, which noticeably impacts fuel economy by 1-2 mpg.
              </p>
            </div>
          </section>

          <section className="mb-24">
            <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-8">Road Noise & Comfort</h2>
            <div className="font-sans text-brand-grey text-base leading-relaxed space-y-6">
              <p>
                Between 0-40mph, you won't notice much difference. At motorway 
                speeds (60-70mph), there is a distinct 'hum' that wasn't there 
                with standard tyres. It's not intrusive if you have a well-insulated 
                van (using Dodo Mat), but it's there.
              </p>
              <div className="bg-brand-carbon p-8 border border-brand-border flex items-start gap-6">
                <Info className="w-6 h-6 text-brand-orange flex-shrink-0 mt-1" />
                <p className="text-sm">
                  Pressure management is key. For a fully converted Sprinter 
                  314/316, we recommend running **48-52 PSI** in the front and 
                  **58-62 PSI** in the rear for the best balance of comfort 
                  and load handling.
                </p>
              </div>
            </div>
          </section>

          {/* VERDICT BOX */}
          <div className="p-12 border-2 border-brand-orange bg-brand-carbon/50">
            <h3 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-6">Final Verdict</h3>
            <p className="font-sans text-brand-grey text-lg leading-relaxed italic mb-10">
              "If your build is about rugged adventure, wild camping in Scotland, 
              or driving to the Alps, the KO2 is the only tyre you should buy. 
              The confidence it gives you on wet grass and mud is worth the 
              slight noise and fuel penalty. Just make sure you get the 
              Load Index 120 rating."
            </p>
            <Link href="https://www.4x4tyres.co.uk" className="inline-flex items-center gap-3 bg-brand-orange text-white px-10 py-5 font-display text-xs uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all">
              Buy BFG KO2 UK <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}
