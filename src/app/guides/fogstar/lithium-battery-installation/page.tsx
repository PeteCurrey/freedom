'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FogstarSidebar } from '@/components/editorial/FogstarSidebar';
import { getDiagramBySlug, DIAGRAM_INDIVIDUAL_PRICE } from '@/lib/data/wiringDiagrams';
import {
  ArrowRight, Download, CheckCircle,
  ShieldAlert, Info, Zap, Hammer, ShieldCheck
} from 'lucide-react';

export default function FogstarLithiumInstallationGuide() {
  const diagram = getDiagramBySlug('fogstar-drift-victron-multiplus-schematic');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const TOC = [
    { id: "intro", label: "Installation Overview" },
    { id: "schematic", label: "High-Power Schematic" },
    { id: "fusing", label: "Fusing & Protection" },
    { id: "cabling", label: "Cable Selection" },
    { id: "configuration", label: "BMS Configuration" },
  ];

  if (!diagram) return null;

  const handleCheckout = async () => {
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/diagrams/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: diagram.slug, email }),
      });
      const data = await res.json();
      if (data.url) {
        router.push(data.url);
      } else {
        setError(data.error || 'Checkout failed.');
      }
    } catch {
      setError('Network error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-[50vh] flex items-end pt-24">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/tech-electrical.png" // Placeholder
            alt="Fogstar lithium installation"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian via-brand-obsidian/60 to-transparent" />
        </div>
        
        <div className="relative container mx-auto px-6 pb-16 z-10">
          <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em] mb-4 block">
            // INSTALLATION GUIDE
          </span>
          <h1 className="font-display text-4xl lg:text-6xl uppercase tracking-tight text-brand-white leading-[1] mb-4">
            Fogstar Drift:<br />High-Power Installation
          </h1>
          <p className="font-sans text-brand-grey text-lg max-w-2xl italic border-l-2 border-brand-orange pl-6">
            A technical guide to installing Fogstar Drift batteries with Victron MultiPlus-II inverters for high-demand UK van builds.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16">
        <div className="flex gap-16">
          <div className="flex-1 min-w-0">
            
            {/* OVERVIEW */}
            <section id="intro" className="mb-20 scroll-mt-28">
              <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white mb-6">
                Installation Overview
              </h2>
              <div className="prose prose-invert max-w-none font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  Installing a 280Ah or 300Ah Fogstar Drift battery is more than just swapping a 
                  leisure battery. These units can deliver huge amounts of current (up to 200A 
                  continuous on the PRO models), which requires a complete rethink of your DC 
                  distribution and fusing strategy.
                </p>
                <div className="bg-brand-carbon p-6 border-l-4 border-brand-orange mt-6">
                  <h4 className="font-display text-xs uppercase text-brand-white mb-2 flex items-center gap-2">
                    <ShieldAlert className="w-3 h-3 text-brand-orange" />
                    High Current Warning
                  </h4>
                  <p className="text-xs">
                    At 200A, even a small amount of resistance in a loose connection can 
                    generate enough heat to melt cable insulation or start a fire. Every 
                    high-power connection must be crimped with hydraulic tools and 
                    torqued to manufacturer specifications.
                  </p>
                </div>
              </div>
            </section>

            {/* SCHEMATIC - PAID */}
            <section id="schematic" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-brand-orange/10 p-2 border border-brand-orange/20">
                  <Download className="w-4 h-4 text-brand-orange" />
                </div>
                <h2 className="font-display text-2xl uppercase tracking-tighter">Fogstar + Victron Schematic</h2>
              </div>
              
              <div className="grid lg:grid-cols-5 gap-8 bg-brand-carbon border border-brand-border overflow-hidden">
                <div className="lg:col-span-3 relative aspect-[4/3] bg-brand-obsidian">
                  <Image
                    src="/images/tech-electrical.png"
                    alt="Diagram Preview"
                    fill
                    className="object-cover opacity-20 grayscale"
                  />
                  <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
                    <div className="bg-brand-obsidian/90 border border-brand-orange/30 p-6 backdrop-blur-sm max-w-sm">
                      <span className="font-mono text-[10px] text-brand-orange uppercase tracking-widest block mb-2">Schematic Preview</span>
                      <p className="font-sans text-xs text-brand-grey leading-relaxed">
                        Download the high-resolution technical PDF for the Fogstar + Victron 
                        MultiPlus ecosystem. Includes the Lynx Distributor layout, Mega-fusing, 
                        and 70mm² cable runs.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="lg:col-span-2 p-8 flex flex-col justify-center">
                  <div className="mb-6">
                    <span className="font-display text-3xl text-brand-white">£{(DIAGRAM_INDIVIDUAL_PRICE / 100).toFixed(2)}</span>
                    <span className="font-mono text-[10px] text-brand-grey ml-2 uppercase">Instant PDF</span>
                  </div>
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-brand-orange" />
                      <span className="text-xs text-brand-grey font-sans">MultiPlus-II DC & AC Paths</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-brand-orange" />
                      <span className="text-xs text-brand-grey font-sans">70mm² - 95mm² Cable Sizing</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-brand-orange" />
                      <span className="text-xs text-brand-grey font-sans">Lynx Distributor Fusing</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full bg-brand-obsidian border border-brand-border px-4 py-3 font-sans text-sm text-white placeholder-brand-grey/50 focus:outline-none focus:border-brand-orange transition-colors"
                    />
                    {error && (
                      <p className="font-mono text-[9px] text-red-400 uppercase tracking-wide">{error}</p>
                    )}
                    <button
                      onClick={handleCheckout}
                      disabled={loading}
                      className="w-full bg-brand-orange text-brand-obsidian py-4 font-display text-sm uppercase tracking-widest hover:bg-white transition-colors font-bold flex items-center justify-center gap-2 disabled:opacity-60"
                    >
                      {loading ? "Processing..." : "Download Schematic"}
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* FUSING */}
            <section id="fusing" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <ShieldCheck className="w-5 h-5 text-brand-orange" />
                <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white">
                  Fusing & Protection
                </h2>
              </div>
              <div className="prose prose-invert max-w-none font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  We recommend the **Victron Lynx Distributor** for all Fogstar installations. 
                  It provides a central, fused busbar for the high-power DC lines. 
                  For a 3000VA inverter, a **400A Mega Fuse** is required on the positive 
                  line to handle the massive surge currents during startup.
                </p>
              </div>
            </section>

            {/* CABLING */}
            <section id="cabling" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <Zap className="w-5 h-5 text-brand-orange" />
                <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white">
                  Cable Selection (UK Standards)
                </h2>
              </div>
              <div className="font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  Do not use standard automotive cable for these runs. Use **BS 6231 (Tri-Rated)** 
                  flexible panel wire. For a MultiPlus 3000, **70mm²** is the minimum cable 
                  size for short runs, but **95mm²** is preferred if the battery is more 
                  than 1.5m from the inverter.
                </p>
              </div>
            </section>

            {/* CONFIGURATION */}
            <section id="configuration" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <Info className="w-5 h-5 text-brand-orange" />
                <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white">
                  BMS Configuration
                </h2>
              </div>
              <div className="prose prose-invert max-w-none font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  Before connecting your battery to the system, download the Fogstar Drift App. 
                  Ensure the BMS is updated to the latest firmware and check that the 
                  heating function is enabled. This is crucial for UK winter touring.
                </p>
              </div>
            </section>

          </div>

          <FogstarSidebar items={TOC} currentPage="/guides/fogstar/lithium-battery-installation" />
        </div>
      </div>

      <Footer />
    </main>
  );
}
