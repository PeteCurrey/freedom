'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FiammaSidebar } from '@/components/editorial/FiammaSidebar';
import { getDiagramBySlug, DIAGRAM_INDIVIDUAL_PRICE } from '@/lib/data/wiringDiagrams';
import {
  ArrowRight, Download, CheckCircle,
  ShieldAlert, Info, Sun, Hammer, ShieldCheck, Map
} from 'lucide-react';

export default function FiammaF80sInstallationGuide() {
  const diagram = getDiagramBySlug('fiamma-f80s-awning-installation-schematic');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const TOC = [
    { id: "intro", label: "Installation Overview" },
    { id: "schematic", label: "Mounting Schematic" },
    { id: "bonding", label: "Structural Bonding" },
    { id: "brackets", label: "Bracket Positioning" },
    { id: "testing", label: "First Deployment" },
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
            src="/images/cat-windows.png" // Placeholder
            alt="Fiamma F80s installation"
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
            Fiamma F80s:<br />Safe Roof Mounting
          </h1>
          <p className="font-sans text-brand-grey text-lg max-w-2xl italic border-l-2 border-brand-orange pl-6">
            A technical guide to mounting and bonding the Fiamma F80s roof awning using vehicle-specific brackets and structural adhesives.
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
                  Installing a 30kg awning to a van roof is a task that requires absolute 
                  precision. You are dealing with significant wind loads and structural 
                  integrity. The F80s installation relies on a combination of mechanical 
                  fixing (screws/bolts) and structural bonding (Sikaflex).
                </p>
                <div className="bg-brand-carbon p-6 border-l-4 border-brand-orange mt-6">
                  <h4 className="font-display text-xs uppercase text-brand-white mb-2 flex items-center gap-2">
                    <ShieldAlert className="w-3 h-3 text-brand-orange" />
                    Safety First
                  </h4>
                  <p className="text-xs">
                    Never rely on mechanical fixings alone. The bonding agent 
                    (Sikaflex 252) provides the majority of the structural strength 
                    and prevents water ingress. Skipping the primer stage will 
                    lead to bond failure.
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
                <h2 className="font-display text-2xl uppercase tracking-tighter">Mounting & Bonding Schematic</h2>
              </div>
              
              <div className="grid lg:grid-cols-5 gap-8 bg-brand-carbon border border-brand-border overflow-hidden">
                <div className="lg:col-span-3 relative aspect-[4/3] bg-brand-obsidian">
                  <Image
                    src="/images/cat-windows.png"
                    alt="Diagram Preview"
                    fill
                    className="object-cover opacity-20 grayscale"
                  />
                  <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
                    <div className="bg-brand-obsidian/90 border border-brand-orange/30 p-6 backdrop-blur-sm max-w-sm">
                      <span className="font-mono text-[10px] text-brand-orange uppercase tracking-widest block mb-2">Schematic Preview</span>
                      <p className="font-sans text-xs text-brand-grey leading-relaxed">
                        Download the high-resolution technical PDF for the Fiamma F80s. 
                        Includes bracket spacing for all major van lengths, 
                        Sikaflex application patterns, and torque specs.
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
                      <span className="text-xs text-brand-grey font-sans">Exact Bracket Spacing Guide</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-brand-orange" />
                      <span className="text-xs text-brand-grey font-sans">Sikaflex 252 Bonding Pattern</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-brand-orange" />
                      <span className="text-xs text-brand-grey font-sans">Sliding Door Clearance Check</span>
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

            {/* BONDING */}
            <section id="bonding" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <Hammer className="w-5 h-5 text-brand-orange" />
                <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white">
                  Structural Bonding
                </h2>
              </div>
              <div className="prose prose-invert max-w-none font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  Clean both the roof and the bracket with **Sika Aktivator 205**. 
                  Apply **Sika Primer 206 G+P** and wait for it to become touch-dry 
                  (approx 10-30 mins). Apply a continuous bead of **Sikaflex 252** 
                  to the bracket and press firmly onto the roof. Secure with the 
                  provided screws immediately while the adhesive is wet.
                </p>
              </div>
            </section>

            {/* BRACKETS */}
            <section id="brackets" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <Map className="w-5 h-5 text-brand-orange" />
                <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white">
                  Bracket Positioning
                </h2>
              </div>
              <div className="font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  Brackets must be placed over the internal structural ribs of the 
                  van. For a 3.2m awning, you will typically use three brackets. 
                  One at each end (approx 10cm from the winch mechanism) and one 
                  central bracket to prevent the lead bar from sagging.
                </p>
              </div>
            </section>

            {/* TESTING */}
            <section id="testing" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <Info className="w-5 h-5 text-brand-orange" />
                <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white">
                  First Deployment
                </h2>
              </div>
              <div className="font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  Do not open the awning for at least 24 hours to allow the Sikaflex 
                  to cure. When you first deploy, have a second person assist with 
                  the support legs. Check that the winch mechanism runs smoothly 
                  and that the lead bar locks securely when closed.
                </p>
              </div>
            </section>

          </div>

          <FiammaSidebar items={TOC} currentPage="/guides/fiamma/f80s-installation" />
        </div>
      </div>

      <Footer />
    </main>
  );
}
