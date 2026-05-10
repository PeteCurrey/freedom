import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, Box, Zap, ShieldCheck, Info, CheckCircle, Gauge, Layout } from "lucide-react";

export const metadata: Metadata = {
  title: "MWB Mercedes Sprinter Layouts | Medium Wheelbase Guide | Amplios",
  description: "The best conversion layouts for the MWB Mercedes Sprinter (5.9m). How to fit a bed, kitchen, and shower without feeling cramped.",
  openGraph: {
    title: "MWB Mercedes Sprinter Layouts | Medium Wheelbase Guide",
    description: "Mastering the space in a 5.9m Sprinter conversion.",
    url: "https://amplios.co.uk/guides/mwb-sprinter-layout",
  },
  alternates: { canonical: "https://amplios.co.uk/guides/mwb-sprinter-layout" },
};

export default function MWBSprinterLayoutGuide() {
  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[50vh] flex items-end pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/cat-windows.png" // Placeholder
            alt="MWB Sprinter Layouts"
            fill
            className="object-cover opacity-30 grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian via-brand-obsidian/60 to-transparent" />
        </div>
        
        <div className="relative container mx-auto px-6 pb-16 z-10">
          <div className="max-w-4xl">
            <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em] mb-4 block leading-none">
              // MEDIUM WHEELBASE
            </span>
            <h1 className="font-display text-4xl lg:text-7xl uppercase tracking-tighter text-brand-white leading-[0.9] mb-6">
              MWB:<br /><span className="text-brand-orange">THE 6 METRE</span><br />CHALLENGE
            </h1>
            <p className="font-sans text-brand-grey text-lg max-w-2xl italic border-l-2 border-brand-orange pl-6">
              The MWB Sprinter is the ultimate compromise: small enough to park 
              in a standard supermarket space, but just big enough to live in. 
              Here is how to optimize every inch.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT SECTIONS */}
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          
          <section className="mb-24">
            <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-8">The Golden Rule: You Can't Have It All</h2>
            <div className="prose prose-invert max-w-none font-sans text-brand-grey text-base leading-relaxed space-y-6">
              <p>
                In a Long Wheelbase (LWB) Sprinter, you can have a fixed bed, 
                a large kitchen, a seating area, and a full shower. In a 
                Medium Wheelbase (MWB), you must choose your priority. 
              </p>
              <div className="bg-brand-carbon p-8 border-l-4 border-brand-orange italic">
                "If you want a fixed bed in an MWB, you probably won't have room 
                for a permanent shower cubicle. If you want a shower, you'll 
                need a convertible bed/lounge to save space."
              </div>
            </div>
          </section>

          <section className="mb-24">
            <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-10 text-center lg:text-left">The Top 3 MWB Layouts</h2>
            <div className="space-y-6">
              {[
                { title: "The Flare Sleeper", desc: "Using fiberglass side-flares to sleep width-ways across the rear. This frees up 1 meter of length, allowing room for a small kitchen and a hidden Porta-Potti." },
                { title: "The U-Shape Rear Lounge", desc: "No fixed bed. A large U-shape seating area that converts into a massive bed at night. The most spacious feeling MWB layout." },
                { title: "The Front Swivel", desc: "Using the driver and passenger swivel seats as the primary living area, allowing a fixed rear bed and a decent kitchen block in the middle." },
              ].map((item) => (
                <div key={item.title} className="p-8 border border-brand-border bg-brand-carbon/50 space-y-2">
                  <h4 className="font-display text-lg uppercase text-brand-white">{item.title}</h4>
                  <p className="font-sans text-brand-grey text-[11px] leading-relaxed italic">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="p-12 border-2 border-brand-orange bg-brand-carbon/50 mb-24">
            <h3 className="font-display text-2xl uppercase tracking-tight text-brand-white mb-4">The Shower Problem</h3>
            <p className="font-sans text-brand-grey text-sm leading-relaxed mb-6">
              A fixed shower cubicle takes up roughly 70cm x 70cm of floor space. 
              In an MWB, this is a massive sacrifice. Consider alternatives:
            </p>
            <ul className="space-y-4 font-mono text-[10px] uppercase text-brand-grey tracking-widest">
              <li className="flex items-center gap-3"><CheckCircle className="w-4 h-4 text-brand-orange" /> Outdoor shower out the back doors</li>
              <li className="flex items-center gap-3"><CheckCircle className="w-4 h-4 text-brand-orange" /> Hidden shower tray under the floor</li>
              <li className="flex items-center gap-3"><CheckCircle className="w-4 h-4 text-brand-orange" /> Gym memberships & campsite facilities</li>
            </ul>
          </section>

          {/* INTERNAL LINKS */}
          <div className="mt-20 pt-10 border-t border-brand-border/40">
            <h4 className="font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-8">Compare Layouts</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/guides/sprinter-van-conversion-layout" className="p-6 border border-brand-border hover:border-brand-orange transition-colors flex items-center justify-between group">
                <span className="font-display text-xs uppercase text-brand-white">LWB Sprinter Layouts</span>
                <ArrowRight className="w-4 h-4 text-brand-orange group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/guides/fixed-bed-vs-u-shape-lounge" className="p-6 border border-brand-border hover:border-brand-orange transition-colors flex items-center justify-between group">
                <span className="font-display text-xs uppercase text-brand-white">Bed vs Lounge Debate</span>
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
