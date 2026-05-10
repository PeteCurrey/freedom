import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, Clock, Calendar, CheckCircle, Info, Hammer, Zap, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Campervan Conversion Timeline | How Long Does It Take? | Amplios",
  description: "A realistic timeline for a DIY or professional van conversion. From stripping the van to the maiden voyage. UK 2026 build sequence.",
  openGraph: {
    title: "Campervan Conversion Timeline | How Long Does It Take? | Amplios",
    description: "Manage your expectations. The honest conversion timeline.",
    url: "https://amplios.co.uk/guides/motorhome-conversion-timeline",
  },
  alternates: { canonical: "https://amplios.co.uk/guides/motorhome-conversion-timeline" },
};

export default function BuildTimelineGuide() {
  const STAGES = [
    { 
      week: "Week 1-2", 
      title: "Strip & Prep", 
      desc: "Removing ply lining, cleaning, treating rust, and installing windows/vents.",
      icon: Hammer 
    },
    { 
      week: "Week 3-4", 
      title: "First Fix", 
      desc: "Sound deadening, insulation, and the core wiring/plumbing runs.",
      icon: Zap 
    },
    { 
      week: "Week 5-8", 
      title: "Structural", 
      desc: "Floor installation, internal framing, and ceiling/wall lining.",
      icon: ShieldCheck 
    },
    { 
      week: "Week 9-14", 
      title: "Fit Out", 
      desc: "Cabinetry, bed frame, kitchen install, and final appliance hookups.",
      icon: Clock 
    },
    { 
      week: "Week 15-18", 
      title: "Final Fix & Test", 
      desc: "Gas certification, weighing, DVLA notification, and local testing.",
      icon: CheckCircle 
    }
  ];

  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[50vh] flex items-end pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/cat-windows.png" // Placeholder
            alt="Build Timeline"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian via-brand-obsidian/60 to-transparent" />
        </div>
        
        <div className="relative container mx-auto px-6 pb-16 z-10">
          <div className="max-w-4xl">
            <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em] mb-6 block leading-none">
              // THE MARATHON
            </span>
            <h1 className="font-display text-4xl lg:text-7xl uppercase tracking-tighter text-brand-white leading-[0.9] mb-6">
              TIMELINE:<br /><span className="text-brand-orange">THE REAL</span><br />SCHEDULE
            </h1>
            <p className="font-sans text-brand-grey text-lg max-w-2xl italic border-l-2 border-brand-orange pl-6">
              Instagram shows 30-second montages. We show the 600 hours of 
              labour. A realistic guide to scheduling your conversion.
            </p>
          </div>
        </div>
      </section>

      {/* TIMELINE VISUAL */}
      <section className="py-24 bg-brand-carbon border-y border-brand-border/20">
        <div className="container mx-auto px-6">
          <div className="space-y-4">
            {STAGES.map((stage, i) => (
              <div key={stage.title} className="flex flex-col md:flex-row gap-8 items-center md:items-stretch">
                <div className="w-full md:w-32 flex flex-col items-center justify-center bg-brand-obsidian border border-brand-border p-4 text-center">
                  <span className="font-mono text-[9px] text-brand-orange uppercase tracking-widest block mb-1">{stage.week}</span>
                  <stage.icon className="w-5 h-5 text-brand-grey" />
                </div>
                <div className="flex-1 bg-brand-obsidian border border-brand-border p-8 flex items-center justify-between group hover:border-brand-orange transition-colors">
                  <div>
                    <h3 className="font-display text-xl uppercase text-brand-white mb-2">{stage.title}</h3>
                    <p className="font-sans text-brand-grey text-sm max-w-xl">{stage.desc}</p>
                  </div>
                  <div className="hidden md:block opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="font-mono text-[10px] text-brand-orange uppercase tracking-widest">Detail →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTENT SECTIONS */}
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          
          <section className="mb-24">
            <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-8">The DIY Reality</h2>
            <div className="prose prose-invert max-w-none font-sans text-brand-grey text-base leading-relaxed space-y-6">
              <p>
                A professional conversion team (2-3 people) can finish a van 
                in 6-8 weeks. For a solo DIY builder working weekends and 
                evenings, **6 to 12 months** is the average timeline. 
              </p>
              <p>
                Life happens. Parts get delayed. Decisions change. We recommend 
                taking your estimated timeline and adding 25% for 'contingency'. 
                It prevents the burnout that claims so many unfinished projects 
                on eBay.
              </p>
            </div>
          </section>

          <section className="mb-24 p-12 bg-brand-obsidian border-2 border-brand-border text-center">
            <h3 className="font-display text-3xl uppercase tracking-tighter text-brand-white mb-6">Want to speed it up?</h3>
            <p className="font-sans text-brand-grey text-base mb-10 max-w-xl mx-auto">
              Our pre-specced 'Build Kits' eliminate the weeks of research and 
              ordering. Get every component for a system delivered in one batch.
            </p>
            <Link href="/store/complete-kits" className="inline-flex items-center gap-3 bg-brand-orange text-white px-10 py-5 font-display text-xs uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all">
              Shop System Kits <ArrowRight className="w-4 h-4" />
            </Link>
          </section>

          <section className="mb-24">
            <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-8">The "Maiden Voyage" Trap</h2>
            <div className="font-sans text-brand-grey text-base leading-relaxed space-y-4">
              <p>
                Don't book a ferry to France for the day after your predicted 
                finish date. Every self-build needs at least **3 local weekend 
                shakedown trips** to find the inevitable rattles, leaks, or 
                electrical tweaks needed. 
              </p>
              <p className="font-bold text-brand-white italic">
                A van is never 'finished'. It just reaches a state of operational 
                reliability.
              </p>
            </div>
          </section>

        </div>
      </div>

      <Footer />
    </main>
  );
}
