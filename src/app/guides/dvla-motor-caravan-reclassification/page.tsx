import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, FileText, CheckCircle, ShieldAlert, Info, Map, Camera, ClipboardCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "DVLA Motor Caravan Reclassification Guide 2026 | Amplios",
  description: "The definitive UK guide to reclassifying your van with the DVLA. Internal requirements, external identification, and the truth about V5C changes.",
  openGraph: {
    title: "DVLA Motor Caravan Reclassification Guide 2026 | Amplios",
    description: "Navigate the complex DVLA rules for motorhome conversion in 2026.",
    url: "https://amplios.co.uk/guides/dvla-motor-caravan-reclassification",
  },
  alternates: { canonical: "https://amplios.co.uk/guides/dvla-motor-caravan-reclassification" },
};

export default function DVLAReclassificationGuide() {
  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[50vh] flex items-end pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/sprinter.png" // Placeholder
            alt="DVLA Reclassification"
            fill
            className="object-cover opacity-20 grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian via-brand-obsidian/60 to-transparent" />
        </div>
        
        <div className="relative container mx-auto px-6 pb-16 z-10">
          <div className="max-w-4xl">
            <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em] mb-6 block leading-none">
              // THE LEGAL MAZE
            </span>
            <h1 className="font-display text-4xl lg:text-7xl uppercase tracking-tighter text-brand-white leading-[0.9] mb-6">
              DVLA:<br /><span className="text-brand-orange">LEGAL</span><br />STATUS
            </h1>
            <p className="font-sans text-brand-grey text-lg max-w-2xl italic border-l-2 border-brand-orange pl-6">
              In 2026, getting "Motor Caravan" on your V5C is harder than ever. 
              We break down the mandatory requirements and the reality of 
              internal vs external identification.
            </p>
          </div>
        </div>
      </section>

      {/* WARNING BOX */}
      <section className="py-12 bg-brand-orange">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-8">
          <ShieldAlert className="w-12 h-12 text-brand-obsidian flex-shrink-0" />
          <div className="text-brand-obsidian font-sans text-sm leading-relaxed font-bold">
            CRITICAL 2026 UPDATE: The DVLA rarely changes the "Body Type" on 
            the V5C to "Motor Caravan" anymore unless the vehicle has 
            permanent external graphics, windows on both sides, and a high roof. 
            However, your insurance requires you to notify the DVLA of 
            changes regardless.
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          
          <section className="mb-24">
            <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-8">Internal Requirements</h2>
            <div className="prose prose-invert max-w-none font-sans text-brand-grey text-base leading-relaxed space-y-6">
              <p>
                To be considered a motor caravan for internal purposes, your 
                vehicle must have the following permanent features:
              </p>
              <div className="grid md:grid-cols-2 gap-4 not-prose">
                {[
                  { title: "Fixed Bed", desc: "Must be at least 1.8m long and permanently fixed to the vehicle body." },
                  { title: "Storage", desc: "A fixed wardrobe, cupboard, or locker system must be present." },
                  { title: "Fixed Cooking", desc: "A fixed gas or electric hob. Portable hobs do not count." },
                  { title: "Seating & Table", desc: "A fixed table (can be removable) and seating for at least two people." },
                ].map((item) => (
                  <div key={item.title} className="p-6 border border-brand-border bg-brand-carbon">
                    <h4 className="font-display text-xs uppercase text-brand-white mb-2">{item.title}</h4>
                    <p className="text-[11px] text-brand-grey leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mb-24">
            <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-8 flex items-center gap-4">
              <Camera className="w-6 h-6 text-brand-orange" />
              The Photographic Evidence
            </h2>
            <div className="font-sans text-brand-grey text-base leading-relaxed space-y-6">
              <p>
                The DVLA requires specific photographs to process your 
                notification. Failure to provide these exactly as requested will 
                result in immediate rejection.
              </p>
              <div className="bg-brand-carbon p-8 space-y-4 border border-brand-border">
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-brand-orange text-brand-obsidian flex items-center justify-center font-bold text-xs flex-shrink-0 mt-1">1</div>
                  <p className="text-sm italic">Front, back, and both side views of the exterior showing the registration plate.</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-brand-orange text-brand-obsidian flex items-center justify-center font-bold text-xs flex-shrink-0 mt-1">2</div>
                  <p className="text-sm italic">Detailed shots of the bed, cooker, sink, and seating area in their fixed positions.</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-brand-orange text-brand-obsidian flex items-center justify-center font-bold text-xs flex-shrink-0 mt-1">3</div>
                  <p className="text-sm italic">A shot of the internal layout taken from the rear of the vehicle looking forward.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-24">
            <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-8">What if they reject the Body Type change?</h2>
            <div className="prose prose-invert max-w-none font-sans text-brand-grey text-base leading-relaxed space-y-4">
              <p>
                If the DVLA refuses to change the body type to "Motor Caravan" 
                but accepts the changes, they will usually update the vehicle 
                description to "Van with Windows" or "Panel Van" with a note 
                about the internal conversion.
              </p>
              <p className="font-bold text-brand-white">
                This is normal. Most insurers accept this note as proof of 
                conversion, allowing you to access specialist motorhome 
                insurance policies.
              </p>
            </div>
          </section>

          {/* CHECKLIST BOX */}
          <div className="p-12 border-2 border-dashed border-brand-orange bg-brand-carbon/50">
            <div className="flex items-center gap-4 mb-8">
              <ClipboardCheck className="w-8 h-8 text-brand-orange" />
              <h3 className="font-display text-2xl uppercase tracking-tight text-brand-white leading-none">The Submission Checklist</h3>
            </div>
            <ul className="space-y-4 font-mono text-[10px] uppercase tracking-widest text-brand-grey">
              <li className="flex items-center gap-3"><CheckCircle className="w-4 h-4 text-brand-orange" /> V5C Document (Sections to complete)</li>
              <li className="flex items-center gap-3"><CheckCircle className="w-4 h-4 text-brand-orange" /> Covering letter explaining changes</li>
              <li className="flex items-center gap-3"><CheckCircle className="w-4 h-4 text-brand-orange" /> At least 10 high-quality photographs</li>
              <li className="flex items-center gap-3"><CheckCircle className="w-4 h-4 text-brand-orange" /> Weighbridge certificate (Unladen weight)</li>
              <li className="flex items-center gap-3"><CheckCircle className="w-4 h-4 text-brand-orange" /> Return address clearly marked</li>
            </ul>
          </div>

        </div>
      </div>

      {/* RELATED CTA */}
      <section className="py-20 bg-brand-carbon border-t border-brand-border">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h4 className="font-display text-xl uppercase text-brand-white mb-2">Need Insurance?</h4>
            <p className="font-sans text-brand-grey text-sm">Explore our self-build insurance guide for 2026.</p>
          </div>
          <Link href="/guides/self-build-motorhome-insurance" className="bg-brand-orange text-white px-8 py-4 font-display text-xs uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all flex items-center gap-2">
            Insurance Guide <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
