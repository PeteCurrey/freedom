import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, Box, Zap, ShieldCheck, Info, CheckCircle, Gauge, Layout } from "lucide-react";

export const metadata: Metadata = {
  title: "LWB VW Crafter Conversion Layouts | UK Design Guide | Amplios",
  description: "The best floor plans for the LWB VW Crafter and MAN TGE. Why the extra width makes the Crafter the king of fixed-bed layouts.",
  openGraph: {
    title: "LWB VW Crafter Conversion Layouts | UK Design Guide",
    description: "Design your dream Crafter. Width-ways beds and full wet rooms.",
    url: "https://amplios.co.uk/guides/lwb-crafter-conversion-layout",
  },
  alternates: { canonical: "https://amplios.co.uk/guides/lwb-crafter-conversion-layout" },
};

export default function CrafterLayoutGuide() {
  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[50vh] flex items-end pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/cat-windows.png" // Placeholder
            alt="LWB Crafter Layouts"
            fill
            className="object-cover opacity-30 grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian via-brand-obsidian/60 to-transparent" />
        </div>
        
        <div className="relative container mx-auto px-6 pb-16 z-10">
          <div className="max-w-4xl">
            <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em] mb-4 block leading-none">
              // VW CRAFTER & MAN TGE
            </span>
            <h1 className="font-display text-4xl lg:text-7xl uppercase tracking-tighter text-brand-white leading-[0.9] mb-6">
              CRAFTER:<br /><span className="text-brand-orange">THE WIDTH</span><br />ADVANTAGE
            </h1>
            <p className="font-sans text-brand-grey text-lg max-w-2xl italic border-l-2 border-brand-orange pl-6">
              The VW Crafter (and its twin, the MAN TGE) is slightly wider 
              than the Sprinter. For a campervan, those extra centimeters are 
              game-changing.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT SECTIONS */}
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          
          <section className="mb-24">
            <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-8">The Width-Ways Bed</h2>
            <div className="prose prose-invert max-w-none font-sans text-brand-grey text-base leading-relaxed space-y-6">
              <p>
                In a Sprinter, you typically need 'flares' to sleep sideways. In 
                a VW Crafter, many people can sleep width-ways across the metal 
                without modifications. This frees up nearly **80cm of extra 
                length** in the central kitchen/living area.
              </p>
              <div className="bg-brand-carbon p-8 border border-brand-border space-y-4">
                <div className="flex items-center gap-2 text-brand-orange">
                  <CheckCircle className="w-4 h-4" />
                  <span className="font-display text-xs uppercase tracking-tight">Width: ~176cm (at bed height)</span>
                </div>
                <p className="text-[11px] leading-relaxed italic">
                  By using 50mm of insulation and thin ply, you can achieve a 
                  finished internal width of roughly 172cm. If you are under 
                  5'8", this is a comfortable sideways sleep.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-24">
            <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-10 text-center lg:text-left">Popular LWB Designs</h2>
            <div className="space-y-6">
              {[
                { title: "The Family 4-Berth", desc: "A fixed rear double with a 'pop-top' roof or internal bunks. Possible in a Crafter LWB while still maintaining a seating area." },
                { title: "The Professional Office", desc: "A front swivel-seat lounge and a dedicated rear workspace/garage. Ideal for digital nomads." },
                { title: "The Luxury Wet-Room", desc: "Using the extra width to install a full-size internal shower and composting toilet without blocking the gangway." },
              ].map((item) => (
                <div key={item.title} className="p-8 border border-brand-border bg-brand-carbon/50 space-y-2">
                  <h4 className="font-display text-lg uppercase text-brand-white">{item.title}</h4>
                  <p className="font-sans text-brand-grey text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* INTERNAL LINKS */}
          <div className="p-10 bg-brand-obsidian border border-brand-border flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex-1">
              <h4 className="font-display text-xl uppercase text-brand-white mb-2">Build Your Plan</h4>
              <p className="font-sans text-brand-grey text-xs italic">Spec your Crafter's electrical and plumbing systems based on your layout.</p>
            </div>
            <Link href="/planner" className="bg-brand-orange text-white px-8 py-4 font-display text-xs uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all flex items-center gap-2">
              Start Planner <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}
