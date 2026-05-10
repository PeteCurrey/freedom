import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, Wifi, Zap, ShieldCheck, Info, CheckCircle, Satellite, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "Starlink for Campervans UK | 12V Conversion & Roam Guide | Amplios",
  description: "How to install Starlink in a campervan. We explain the ROAM subscription, flat-mounting the dish, and converting the router to run on 12V DC power.",
  openGraph: {
    title: "Starlink for Campervans UK | 12V Conversion & Roam Guide",
    description: "Work from anywhere. The ultimate guide to van life internet.",
    url: "https://amplios.co.uk/guides/starlink-campervan-installation",
  },
  alternates: { canonical: "https://amplios.co.uk/guides/starlink-campervan-installation" },
};

export default function StarlinkGuide() {
  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[50vh] flex items-end pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/cat-windows.png" // Placeholder
            alt="Starlink on Campervan"
            fill
            className="object-cover opacity-30 grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian via-brand-obsidian/60 to-transparent" />
        </div>
        
        <div className="relative container mx-auto px-6 pb-16 z-10">
          <div className="max-w-4xl">
            <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em] mb-4 block leading-none">
              // DIGITAL NOMAD INFRASTRUCTURE
            </span>
            <h1 className="font-display text-4xl lg:text-7xl uppercase tracking-tighter text-brand-white leading-[0.9] mb-6">
              STARLINK:<br /><span className="text-brand-orange">OFF-GRID</span><br />FIBRE
            </h1>
            <p className="font-sans text-brand-grey text-lg max-w-2xl italic border-l-2 border-brand-orange pl-6">
              4G routers are great, but Starlink has changed the game for digital 
              nomads. Here is how to install, power, and subscribe to Starlink 
              for van life in the UK and Europe.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT SECTIONS */}
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          
          <section className="mb-24">
            <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-8">The ROAM Subscription</h2>
            <div className="prose prose-invert max-w-none font-sans text-brand-grey text-base leading-relaxed space-y-6">
              <p>
                To use Starlink in a van, you need the **Starlink Roam** (formerly RV) 
                subscription. Unlike residential plans which are tied to one address, 
                Roam allows you to connect anywhere in the continent you purchased it in. 
              </p>
              <div className="bg-brand-carbon p-8 border border-brand-border flex items-center gap-6">
                <Globe className="w-8 h-8 text-brand-orange" />
                <p className="text-xs leading-relaxed">
                  **Pause & Unpause**: The best feature of Roam is that you can pause 
                  billing month-by-month. If your van is parked up for the winter, you 
                  don't pay for internet.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-24">
            <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-8">The Power Problem: Converting to 12V</h2>
            <div className="prose prose-invert max-w-none font-sans text-brand-grey text-base leading-relaxed space-y-6">
              <p>
                Out of the box, the Starlink router requires 230V AC mains power. 
                Running your campervan's inverter 24/7 just to power Starlink will 
                drain an extra 15-20% of your battery purely through inverter inefficiency.
              </p>
              
              <div className="p-8 border-l-4 border-brand-orange bg-brand-carbon space-y-4">
                <h4 className="font-display text-lg uppercase text-brand-white flex items-center gap-2">
                  <Zap className="w-4 h-4 text-brand-orange" /> The 12V DC Conversion
                </h4>
                <p className="font-sans text-sm">
                  To run Starlink efficiently off-grid, you bypass the factory router 
                  completely. You need three components:
                </p>
                <ul className="space-y-2 font-mono text-[10px] uppercase text-brand-grey list-disc pl-4">
                  <li>A 12V to 48V Step-Up Converter (to power the dish)</li>
                  <li>A PoE (Power over Ethernet) Injector</li>
                  <li>A standard 12V Travel Router (like a GL.iNet Beryl)</li>
                </ul>
                <p className="font-sans text-xs italic mt-4 text-brand-orange">
                  Note: This requires cutting the proprietary Starlink cable to wire an RJ45 connector. 
                  It will void your warranty, but it cuts the power draw from ~60W down to ~35W.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-24">
            <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-10 text-center lg:text-left">Mounting the Dish</h2>
            <div className="grid md:grid-cols-2 gap-8">
              
              {/* THE TRIPOD */}
              <div className="p-8 border border-brand-border bg-brand-obsidian space-y-4">
                <h4 className="font-display text-lg uppercase text-brand-white">1. Portable (The Tripod)</h4>
                <p className="font-sans text-brand-grey text-[11px] leading-relaxed">
                  Keeping the dish loose and deploying it on the ground when you park.
                </p>
                <ul className="space-y-2 font-mono text-[10px] uppercase text-brand-grey">
                  <li className="flex items-center gap-2 text-green-500"><CheckCircle className="w-3 h-3" /> Can move it to find clear sky</li>
                  <li className="flex items-center gap-2 text-red-500"><Info className="w-3 h-3" /> Risk of theft / takes setup time</li>
                </ul>
              </div>

              {/* FLAT MOUNT */}
              <div className="p-8 border border-brand-border bg-brand-obsidian space-y-4">
                <h4 className="font-display text-lg uppercase text-brand-white">2. Flat Mount (The Pro Way)</h4>
                <p className="font-sans text-brand-grey text-[11px] leading-relaxed">
                  Disassembling the dish to remove the motors, and mounting it completely 
                  flat to the van roof using a custom 3D-printed or metal bracket.
                </p>
                <ul className="space-y-2 font-mono text-[10px] uppercase text-brand-grey">
                  <li className="flex items-center gap-2 text-green-500"><CheckCircle className="w-3 h-3" /> Works while driving</li>
                  <li className="flex items-center gap-2 text-green-500"><CheckCircle className="w-3 h-3" /> Completely stealthy</li>
                  <li className="flex items-center gap-2 text-red-500"><Info className="w-3 h-3" /> Complex installation</li>
                </ul>
              </div>

            </div>
          </section>

          {/* AFFILIATE CTA */}
          <div className="p-10 bg-brand-obsidian border border-brand-border flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex-1">
              <h4 className="font-display text-xl uppercase text-brand-white mb-2">Buy the Standard Kit</h4>
              <p className="font-sans text-brand-grey text-xs italic">Start by purchasing the Standard Actuated Kit directly from Starlink.</p>
            </div>
            <Link href="https://www.starlink.com/roam" className="bg-brand-orange text-white px-8 py-4 font-display text-xs uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all flex items-center gap-2">
              View Starlink Roam <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}
