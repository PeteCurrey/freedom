'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AlpicoolSidebar } from '@/components/editorial/AlpicoolSidebar';
import { getDiagramBySlug, DIAGRAM_INDIVIDUAL_PRICE } from '@/lib/data/wiringDiagrams';
import {
  ArrowRight, Download, CheckCircle,
  ShieldAlert, Info, Snowflake, Hammer, ShieldCheck, Zap
} from 'lucide-react';

export default function AlpicoolFridgeInstallationGuide() {
  const diagram = getDiagramBySlug('alpicool-fridge-installation-schematic');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const TOC = [
    { id: "intro", label: "Installation Overview" },
    { id: "schematic", label: "Wiring & Ventilation" },
    { id: "cabling", label: "Solving Voltage Drop" },
    { id: "ventilation", label: "Cabinet Ventilation" },
    { id: "mounting", label: "Secure Mounting" },
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
            src="/images/cat-kitchen.png" // Placeholder
            alt="Alpicool fridge installation"
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
            Alpicool:<br />Technical Installation
          </h1>
          <p className="font-sans text-brand-grey text-lg max-w-2xl italic border-l-2 border-brand-orange pl-6">
            A technical guide to installing your Alpicool fridge, focusing on preventing voltage drop and ensuring adequate compressor ventilation.
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
                  While Alpicool fridges are often described as "plug and play," a 
                  permanent installation in a campervan cabinet requires careful 
                  consideration. The two most common causes of failure are **undersized 
                  wiring** (leading to low-voltage errors) and **inadequate 
                  airflow** (leading to compressor overheating).
                </p>
                <div className="bg-brand-carbon p-6 border-l-4 border-brand-orange mt-6">
                  <h4 className="font-display text-xs uppercase text-brand-white mb-2 flex items-center gap-2">
                    <ShieldAlert className="w-3 h-3 text-brand-orange" />
                    The 'F1' Error Code
                  </h4>
                  <p className="text-xs">
                    If your Alpicool displays an 'F1' error, it's almost always due 
                    to voltage drop. Even if your battery is full, thin wires will 
                    cause the voltage to sag when the compressor starts, triggering 
                     the safety cutout.
                  </p>
                </div>
              </div>
            </section>

            {/* SCHEMATIC - PAID */}
            <section id="schematic" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-brand-orange/10 p-2 border border-brand-border/20">
                  <Download className="w-4 h-4 text-brand-orange" />
                </div>
                <h2 className="font-display text-2xl uppercase tracking-tighter">12V Wiring & Ventilation Schematic</h2>
              </div>
              
              <div className="grid lg:grid-cols-5 gap-8 bg-brand-carbon border border-brand-border overflow-hidden">
                <div className="lg:col-span-3 relative aspect-[4/3] bg-brand-obsidian">
                  <Image
                    src="/images/cat-kitchen.png"
                    alt="Diagram Preview"
                    fill
                    className="object-cover opacity-20 grayscale"
                  />
                  <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
                    <div className="bg-brand-obsidian/90 border border-brand-orange/30 p-6 backdrop-blur-sm max-w-sm">
                      <span className="font-mono text-[10px] text-brand-orange uppercase tracking-widest block mb-2">Schematic Preview</span>
                      <p className="font-sans text-xs text-brand-grey leading-relaxed">
                        Download the technical PDF for Alpicool installation. 
                        Includes 12V cable sizing charts (4mm² vs 6mm²), 
                        fuse specs, and mandatory vent cutout dimensions.
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
                      <span className="text-xs text-brand-grey font-sans">Voltage Drop Prevention Map</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-brand-orange" />
                      <span className="text-xs text-brand-grey font-sans">Airflow Pathing Guide</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-brand-orange" />
                      <span className="text-xs text-brand-grey font-sans">Fused DC Socket Wiring</span>
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

            {/* CABLING */}
            <section id="cabling" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <Zap className="w-5 h-5 text-brand-orange" />
                <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white">
                  Solving Voltage Drop
                </h2>
              </div>
              <div className="prose prose-invert max-w-none font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  For a 12V fridge, we recommend using at least **4mm²** thin-wall 
                  automotive cable for runs up to 3 metres. For anything longer, 
                  upgrade to **6mm²**. This ensures the compressor gets the full 
                  voltage it needs to start reliably every time.
                </p>
              </div>
            </section>

            {/* VENTILATION */}
            <section id="ventilation" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <Info className="w-5 h-5 text-brand-orange" />
                <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white">
                  Cabinet Ventilation
                </h2>
              </div>
              <div className="font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  Refrigeration is simply the process of moving heat from inside 
                  the box to outside the box. If that heat has nowhere to go 
                  (because the fridge is in a sealed cupboard), the compressor 
                  will work harder and consume more power. Install at least two 
                  vents: one low down to bring in cool air, and one high up to 
                  allow warm air to escape.
                </p>
              </div>
            </section>

            {/* MOUNTING */}
            <section id="mounting" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <Hammer className="w-5 h-5 text-brand-orange" />
                <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white">
                  Secure Mounting
                </h2>
              </div>
              <div className="font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  Portable Alpicool fridges (like the C-series) should be secured 
                  using heavy-duty straps or a custom-built base frame. For permanent 
                  installs, ensure the fridge is level; compressor units can be 
                  damaged if run at an angle of more than 30° for extended periods.
                </p>
              </div>
            </section>

          </div>

          <AlpicoolSidebar items={TOC} currentPage="/guides/alpicool/fridge-installation" />
        </div>
      </div>

      <Footer />
    </main>
  );
}
