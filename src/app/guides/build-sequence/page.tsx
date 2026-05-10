import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, ListChecks, Hammer, Zap, Droplets, ShieldCheck, Info, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Campervan Conversion Build Sequence | Step-by-Step Order | Amplios",
  description: "The definitive order of work for a van conversion. Don't waste time undoing mistakes. Our 10-stage sequence ensures a smooth build.",
  openGraph: {
    title: "Campervan Conversion Build Sequence | Step-by-Step Order | Amplios",
    description: "The right order to do everything. Your build roadmap.",
    url: "https://amplios.co.uk/guides/build-sequence",
  },
  alternates: { canonical: "https://amplios.co.uk/guides/build-sequence" },
};

export default function BuildSequenceGuide() {
  const STAGES = [
    { num: "01", title: "Prep & Windows", tasks: ["Strip interior", "Rust treatment", "Cut window holes", "Install roof vents"] },
    { num: "02", title: "Technical First Fix", tasks: ["Run electrical looms", "Gas pipe runs", "Water pipe runs", "Solar cable entry"] },
    { num: "03", title: "Insulation", tasks: ["Sound deadening", "Thermo liner", "Cavity filling", "Vapor barrier sealing"] },
    { num: "04", title: "Structural Framing", tasks: ["Floor battens", "Wall framing", "Ceiling ribs", "Bed platform structure"] },
    { num: "05", title: "Flooring & Lining", tasks: ["Insulated floor", "Wall panels", "Carpet lining", "Ceiling cladding"] },
    { num: "06", title: "Furniture Build", tasks: ["Kitchen carcass", "Seating boxes", "Overhead lockers", "Wardrobes"] },
    { num: "07", title: "Second Fix Systems", tasks: ["Appliance install", "Tap & sink hookup", "Battery bank wiring", "Heater connection"] },
    { num: "08", title: "Finish & Trim", tasks: ["Door handles", "Lighting fixtures", "Soft furnishings", "Edge trimming"] },
  ];

  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[50vh] flex items-end pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/cat-windows.png" // Placeholder
            alt="Build Sequence"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian via-brand-obsidian/60 to-transparent" />
        </div>
        
        <div className="relative container mx-auto px-6 pb-16 z-10">
          <div className="max-w-4xl">
            <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em] mb-6 block leading-none">
              // THE ROADMAP
            </span>
            <h1 className="font-display text-4xl lg:text-7xl uppercase tracking-tighter text-brand-white leading-[0.9] mb-6">
              THE<br /><span className="text-brand-orange">RIGHT</span><br />ORDER
            </h1>
            <p className="font-sans text-brand-grey text-lg max-w-2xl italic border-l-2 border-brand-orange pl-6">
              The biggest cause of build delays is undoing work you've already 
              finished. Follow our proven 10-stage sequence to build faster 
              and smarter.
            </p>
          </div>
        </div>
      </section>

      {/* TIMELINE VISUAL */}
      <section className="py-24 bg-brand-carbon">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {STAGES.map((stage) => (
              <div key={stage.num} className="p-8 border border-brand-border bg-brand-obsidian space-y-6">
                <div className="flex justify-between items-start">
                  <span className="font-display text-4xl text-brand-orange/20 leading-none">{stage.num}</span>
                  <CheckCircle className="w-4 h-4 text-brand-orange" />
                </div>
                <h3 className="font-display text-lg uppercase text-brand-white">{stage.title}</h3>
                <ul className="space-y-2">
                  {stage.tasks.map(task => (
                    <li key={task} className="font-mono text-[10px] text-brand-grey uppercase flex items-center gap-2">
                      <div className="w-1 h-1 bg-brand-orange" /> {task}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="container mx-auto px-6 py-32">
        <div className="max-w-4xl mx-auto">
          
          <section className="mb-24">
            <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-8">The Golden Rule: Looms First</h2>
            <div className="prose prose-invert max-w-none font-sans text-brand-grey text-lg leading-relaxed space-y-6">
              <p>
                The single biggest mistake builders make is insulating and 
                cladding before running their electrical looms. You must have 
                every wire for every light, socket, and appliance in place 
                before the insulation goes in.
              </p>
              <div className="bg-brand-orange text-brand-obsidian p-8 border-l-8 border-brand-obsidian font-bold">
                PRO TIP: Always run 'pull strings' or spare conduits in your 
                walls. If you decide to add a camera or a new light later, 
                you'll thank yourself.
              </div>
            </div>
          </section>

          {/* CTA SECTION */}
          <div className="p-12 border-2 border-dashed border-brand-orange bg-brand-carbon/50 text-center">
            <h3 className="font-display text-2xl uppercase tracking-tight text-brand-white mb-4">Don't Plan Alone</h3>
            <p className="font-sans text-brand-grey text-sm mb-8">
              Our Build Planner automatically organizes your component delivery 
              to match this build sequence.
            </p>
            <Link href="/planner" className="inline-flex items-center gap-2 bg-brand-orange text-white px-8 py-4 font-display text-xs uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all">
              Start Your Plan <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}
