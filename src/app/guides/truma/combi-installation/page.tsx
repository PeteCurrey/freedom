'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { TrumaSidebar } from '@/components/editorial/TrumaSidebar';
import { getDiagramBySlug, DIAGRAM_INDIVIDUAL_PRICE } from '@/lib/data/wiringDiagrams';
import {
  Zap, ArrowRight, Download, CheckCircle,
  AlertCircle, Table2, ExternalLink, Shield, Flame, Droplets, Info
} from 'lucide-react';

export default function TrumaInstallationGuide() {
  const diagram = getDiagramBySlug('truma-combi-4e-installation-schematic');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const TOC = [
    { id: "intro", label: "Installation Overview" },
    { id: "schematic", label: "Official Schematic" },
    { id: "gas", label: "LPG Gas Safety" },
    { id: "electric", label: "230V AC Wiring" },
    { id: "flue", label: "Flue & Cowl Positioning" },
    { id: "plumbing", label: "Plumbing & FrostControl" },
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
            src="/images/truma/install-hero.png"
            alt="Truma Combi installation schematic"
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
            Truma Combi 4E/6E:<br />Installation & Wiring
          </h1>
          <p className="font-sans text-brand-grey text-lg max-w-2xl italic border-l-2 border-brand-orange pl-6">
            A step-by-step technical guide to installing the Combi system to UK Gas Safe and electrical standards.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16">
        <div className="flex gap-16">
          <div className="flex-1 min-w-0">
            
            {/* OVERVIEW */}
            <section id="intro" className="mb-20 scroll-mt-28">
              <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white mb-6">
                Professional Installation Overview
              </h2>
              <div className="prose prose-invert max-w-none font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  Installing a Truma Combi is a significant undertaking that involves gas, 12V DC, 230V AC, and 
                  plumbing systems. While a competent DIY builder can handle the physical mounting and ducting, 
                  the final gas and 230V connections should always be verified by a qualified professional in the UK.
                </p>
                <div className="bg-brand-carbon p-6 border-l-4 border-brand-orange mt-6">
                  <h4 className="font-display text-xs uppercase text-brand-white mb-2 flex items-center gap-2">
                    <Shield className="w-3 h-3 text-brand-orange" />
                    UK Compliance Alert
                  </h4>
                  <p className="text-xs">
                    In the UK, any gas installation in a vehicle used for hire or reward (and increasingly for private 
                    insurance purposes) must be signed off by a Gas Safe registered engineer with the LPG/Motorcaravan 
                    qualification.
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
                <h2 className="font-display text-2xl uppercase tracking-tighter">Official Installation Schematic</h2>
              </div>
              
              <div className="grid lg:grid-cols-5 gap-8 bg-brand-carbon border border-brand-border overflow-hidden">
                <div className="lg:col-span-3 relative aspect-[4/3] bg-brand-obsidian">
                  <Image
                    src="/images/truma/install-hero.png"
                    alt="Diagram Preview"
                    fill
                    className="object-cover opacity-20 grayscale"
                  />
                  <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
                    <div className="bg-brand-obsidian/90 border border-brand-orange/30 p-6 backdrop-blur-sm max-w-sm">
                      <span className="font-mono text-[10px] text-brand-orange uppercase tracking-widest block mb-2">Schematic Preview</span>
                      <p className="font-sans text-xs text-brand-grey leading-relaxed">
                        Download the high-resolution A3 PDF containing all official Truma installation callouts, 
                        cable sizing, and UK-specific safety notes.
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
                      <span className="text-xs text-brand-grey font-sans">Official Truma Technical Drawing</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-brand-orange" />
                      <span className="text-xs text-brand-grey font-sans">UK 230V Wiring Specs</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-brand-orange" />
                      <span className="text-xs text-brand-grey font-sans">Gas Connection Details</span>
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

            {/* GAS SAFETY */}
            <section id="gas" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <Flame className="w-5 h-5 text-brand-orange" />
                <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white">
                  LPG Gas Safety
                </h2>
              </div>
              <div className="prose prose-invert max-w-none font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  The Truma Combi requires a 30mbar gas supply. The connection on the unit is an 8mm olive 
                  compression fitting. It is vital that the gas pipework is properly secured and that a gas 
                  isolation valve is fitted in an accessible location dedicated to the heater.
                </p>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>Use 8mm copper pipe (plastic is not permitted for gas in UK vans).</li>
                  <li>Ensure the gas locker is sealed and vented through the floor.</li>
                  <li>Perform a leak-down test after installation.</li>
                </ul>
              </div>
            </section>

            {/* ELECTRIC */}
            <section id="electric" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <Zap className="w-5 h-5 text-brand-orange" />
                <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white">
                  230V AC Wiring
                </h2>
              </div>
              <div className="prose prose-invert max-w-none font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  For the "E" variants, the 230V connection powers the internal 900W/1800W heating elements. 
                  This should be wired via a 13A fused spur from your RCD-protected consumer unit.
                </p>
                <div className="bg-brand-carbon p-6 border border-brand-border">
                  <h4 className="font-display text-xs text-brand-white uppercase mb-2">Cable Specification</h4>
                  <p className="text-xs">Use 1.5mm² or 2.5mm² 3-core flexible cable (Arctic Blue or similar). Avoid using solid-core domestic twin and earth, as it can fracture due to vehicle vibration.</p>
                </div>
              </div>
            </section>

            {/* FLUE */}
            <section id="flue" className="mb-20 scroll-mt-28">
              <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white mb-6">
                Flue & Cowl Positioning
              </h2>
              <div className="font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  The balanced flue cowl must be mounted on a flat vertical surface on the side of the van. 
                  Crucially, it must not be placed directly under an opening window, as exhaust gases could 
                  enter the vehicle. If a window is nearby, a window switch must be fitted to the Truma 
                  to disable the heater when the window is open.
                </p>
              </div>
            </section>

            {/* PLUMBING */}
            <section id="plumbing" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <Droplets className="w-5 h-5 text-brand-orange" />
                <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white">
                  Plumbing & FrostControl
                </h2>
              </div>
              <div className="font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  The hot and cold water connections use 10mm or 12mm semi-rigid pipe (e.g., John Guest Speedfit). 
                  The **FrostControl valve** must be installed in the cold water feed before it enters the heater. 
                  Ensure the discharge pipe from the FrostControl valve goes through a hole in the van floor 
                  to allow for safe drainage.
                </p>
              </div>
            </section>

          </div>

          <TrumaSidebar items={TOC} currentPage="/guides/truma/combi-installation" />
        </div>
      </div>

      <Footer />
    </main>
  );
}
