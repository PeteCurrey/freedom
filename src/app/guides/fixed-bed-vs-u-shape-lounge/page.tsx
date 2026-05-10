import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, Bed, Users, Zap, ShieldCheck, Info, CheckCircle, Heart, Coffee } from "lucide-react";

export const metadata: Metadata = {
  title: "Fixed Bed vs U-Shape Lounge | The Ultimate Van Debate | Amplios",
  description: "Should you have a fixed rear bed or a u-shape lounge in your van conversion? We compare storage, comfort, and daily reality for UK van life.",
  openGraph: {
    title: "Fixed Bed vs U-Shape Lounge | The Ultimate Van Debate",
    description: "The pros and cons of the two most popular van layouts.",
    url: "https://amplios.co.uk/guides/fixed-bed-vs-u-shape-lounge",
  },
  alternates: { canonical: "https://amplios.co.uk/guides/fixed-bed-vs-u-shape-lounge" },
};

export default function BedVsLoungeGuide() {
  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[60vh] flex items-end pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/cat-windows.png" // Placeholder
            alt="Fixed Bed vs Lounge"
            fill
            className="object-cover opacity-30 grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian via-brand-obsidian/40 to-transparent" />
        </div>
        
        <div className="relative container mx-auto px-6 pb-20 z-10">
          <div className="max-w-4xl">
            <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em] mb-6 block leading-none">
              // THE LAYOUT DILEMMA
            </span>
            <h1 className="font-display text-5xl lg:text-9xl uppercase tracking-tighter text-brand-white leading-[0.85] mb-8">
              REST<br />OR<br /><span className="text-brand-orange">ROOM?</span>
            </h1>
            <p className="font-sans text-brand-grey text-lg lg:text-2xl leading-relaxed max-w-2xl italic border-l-2 border-brand-orange pl-6">
              It is the biggest decision in any large van build. Do you want 
              the convenience of a fixed bed and a massive garage, or the 
              spacious feel of a rear lounge?
            </p>
          </div>
        </div>
      </section>

      {/* HEAD TO HEAD */}
      <section className="py-24 bg-brand-carbon">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* FIXED BED */}
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <Bed className="w-8 h-8 text-brand-orange" />
                <h2 className="font-display text-3xl uppercase text-brand-white">The Fixed Bed</h2>
              </div>
              <p className="font-sans text-brand-grey text-base leading-relaxed">
                The modern van life favorite. By building the bed high, you create 
                a massive 'garage' for bikes, water tanks, and batteries.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-brand-obsidian border-l-4 border-green-500">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-brand-white font-display uppercase tracking-tight">Zero daily setup</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-brand-obsidian border-l-4 border-green-500">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-brand-white font-display uppercase tracking-tight">Maximum storage volume</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-brand-obsidian border-l-4 border-red-500">
                  <Info className="w-4 h-4 text-red-500" />
                  <span className="text-sm text-brand-white font-display uppercase tracking-tight text-opacity-80">Interior can feel cramped</span>
                </div>
              </div>
            </div>

            {/* U-SHAPE LOUNGE */}
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <Coffee className="w-8 h-8 text-brand-orange" />
                <h2 className="font-display text-3xl uppercase text-brand-white">U-Shape Lounge</h2>
              </div>
              <p className="font-sans text-brand-grey text-base leading-relaxed">
                The classic coach-built favorite. Offers a huge area for 
                socializing, working, and dining during the day.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-brand-obsidian border-l-4 border-green-500">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-brand-white font-display uppercase tracking-tight">Spacious internal feel</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-brand-obsidian border-l-4 border-green-500">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-brand-white font-display uppercase tracking-tight">Seats 4-6 people easily</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-brand-obsidian border-l-4 border-red-500">
                  <Info className="w-4 h-4 text-red-500" />
                  <span className="text-sm text-brand-white font-display uppercase tracking-tight text-opacity-80">Daily bed conversion needed</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* THE TIE BREAKER */}
      <section className="py-32 bg-brand-obsidian">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <Heart className="w-12 h-12 text-brand-orange mx-auto mb-8" />
            <h2 className="font-display text-4xl uppercase tracking-tight text-brand-white mb-8">The Tie-Breaker Questions</h2>
            <div className="space-y-12 text-left">
              <div>
                <h4 className="font-display text-xl text-brand-orange mb-4">1. Do you have expensive outdoor gear?</h4>
                <p className="font-sans text-brand-grey leading-relaxed">If you have e-bikes, paddleboards, or a massive tool kit, a **Fixed Bed** is almost mandatory for the secure garage space.</p>
              </div>
              <div>
                <h4 className="font-display text-xl text-brand-orange mb-4">2. Do you intend to work full-time?</h4>
                <p className="font-sans text-brand-grey leading-relaxed">While you can work on a swivel seat, the **U-Shape Lounge** provides a much more comfortable 'office' environment with a proper table.</p>
              </div>
              <div>
                <h4 className="font-display text-xl text-brand-orange mb-4">3. Are you a 'neat freak'?</h4>
                <p className="font-sans text-brand-grey leading-relaxed">If seeing a messy bed during the day bothers you, the **U-Shape Lounge** forces you to tidy up every morning. If you just want to crawl into bed at 11pm, go **Fixed**.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-brand-orange text-brand-obsidian text-center">
        <h3 className="font-display text-3xl lg:text-5xl uppercase tracking-tighter mb-8 leading-none">Which one fits your lifestyle?</h3>
        <Link href="/planner" className="inline-flex items-center gap-3 bg-brand-obsidian text-white px-12 py-6 font-display text-sm uppercase tracking-widest hover:bg-white hover:text-brand-obsidian transition-all">
          Design Your Layout <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      <Footer />
    </main>
  );
}
