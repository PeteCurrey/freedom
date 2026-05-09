'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { DometicSidebar } from '@/components/editorial/DometicSidebar';
import { getDiagramBySlug, DIAGRAM_INDIVIDUAL_PRICE } from '@/lib/data/wiringDiagrams';
import {
  ArrowRight, Download, CheckCircle,
  ShieldAlert, Info, Layers, Hammer, PenTool, ShieldCheck
} from 'lucide-react';

export default function DometicS4InstallationGuide() {
  const diagram = getDiagramBySlug('dometic-s4-window-installation-schematic');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const TOC = [
    { id: "intro", label: "Installation Overview" },
    { id: "schematic", label: "Timber Frame Schematic" },
    { id: "tools", label: "Required Tools" },
    { id: "subframe", label: "Building the Subframe" },
    { id: "sealant", label: "Sealant & Assembly" },
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
            src="/images/exterior-equipment-technical.png" // Placeholder
            alt="Dometic S4 window installation"
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
            Dometic S4 Windows:<br />Structural Fitting Guide
          </h1>
          <p className="font-sans text-brand-grey text-lg max-w-2xl italic border-l-2 border-brand-orange pl-6">
            A step-by-step technical guide to cutting, framing, and sealing the industry's most popular window system.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16">
        <div className="flex gap-16">
          <div className="flex-1 min-w-0">
            
            {/* OVERVIEW */}
            <section id="intro" className="mb-20 scroll-mt-28">
              <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white mb-6">
                Structural Installation Overview
              </h2>
              <div className="prose prose-invert max-w-none font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  Fitting a Dometic S4 window is one of the most nerve-wracking parts of a van build. 
                  Unlike bonded glass windows, the S4 is a "clamping" window. This means the 
                  vehicle skin is sandwiched between the outer window frame and an internal 
                  timber subframe.
                </p>
                <div className="bg-brand-carbon p-6 border-l-4 border-brand-orange mt-6">
                  <h4 className="font-display text-xs uppercase text-brand-white mb-2 flex items-center gap-2">
                    <ShieldAlert className="w-3 h-3 text-brand-orange" />
                    Critical Success Factor
                  </h4>
                  <p className="text-xs">
                    The secret to a 100% leak-proof installation is the **timber subframe**. 
                    If the subframe isn't the correct thickness, the window won't clamp 
                    evenly, leading to gaps in the sealant bead and eventual water ingress.
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
                <h2 className="font-display text-2xl uppercase tracking-tighter">Timber Frame Schematic</h2>
              </div>
              
              <div className="grid lg:grid-cols-5 gap-8 bg-brand-carbon border border-brand-border overflow-hidden">
                <div className="lg:col-span-3 relative aspect-[4/3] bg-brand-obsidian">
                  <Image
                    src="/images/exterior-equipment-technical.png"
                    alt="Diagram Preview"
                    fill
                    className="object-cover opacity-20 grayscale"
                  />
                  <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
                    <div className="bg-brand-obsidian/90 border border-brand-orange/30 p-6 backdrop-blur-sm max-w-sm">
                      <span className="font-mono text-[10px] text-brand-orange uppercase tracking-widest block mb-2">Schematic Preview</span>
                      <p className="font-sans text-xs text-brand-grey leading-relaxed">
                        Download the high-resolution A3 PDF containing precision dimensions for the 
                        internal timber subframe, screw length calculations, and sealant bead paths.
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
                      <span className="text-xs text-brand-grey font-sans">Precision Timber Frame Dimensions</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-brand-orange" />
                      <span className="text-xs text-brand-grey font-sans">Sealant Application Guide</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-brand-orange" />
                      <span className="text-xs text-brand-grey font-sans">Screw Torque & Layout</span>
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

            {/* TOOLS */}
            <section id="tools" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <Hammer className="w-5 h-5 text-brand-orange" />
                <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white">
                  Required Tools
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4 mb-8 text-sm text-brand-grey">
                <ul className="space-y-2 list-disc pl-5">
                  <li>Jigsaw with fine-tooth metal blades</li>
                  <li>Electric drill & high-speed bits</li>
                  <li>Caulking gun (heavy duty)</li>
                </ul>
                <ul className="space-y-2 list-disc pl-5">
                  <li>Masking tape (low tack)</li>
                  <li>Zinc-rich primer (for cut edges)</li>
                  <li>Spirit level and square</li>
                </ul>
              </div>
            </section>

            {/* SUBFRAME */}
            <section id="subframe" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <Layers className="w-5 h-5 text-brand-orange" />
                <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white">
                  Building the Subframe
                </h2>
              </div>
              <div className="prose prose-invert max-w-none font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  The subframe should be built using high-quality planed timber (e.g., 25mm x 38mm batten). 
                  It must be constructed to the **exact internal dimensions** of the window frame. 
                  We recommend pocket-hole screws or simple butt joints with wood glue to ensure the 
                  frame stays perfectly square during installation.
                </p>
                <div className="bg-brand-carbon p-6 border border-brand-border">
                  <h4 className="font-display text-xs text-brand-white uppercase mb-2 flex items-center gap-2">
                    <Info className="w-3 h-3 text-brand-orange" />
                    Bespoke Tip
                  </h4>
                  <p className="text-xs">Seal the timber with a water-resistant varnish or primer. If you ever have a minor sealant failure, the treated wood won't rot and compromise the structural integrity of the window.</p>
                </div>
              </div>
            </section>

            {/* SEALANT */}
            <section id="sealant" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <ShieldCheck className="w-5 h-5 text-brand-orange" />
                <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white">
                  Sealant & Assembly
                </h2>
              </div>
              <div className="font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  Use a non-setting butyl sealant (like SikaLastomer 710) for the main external seal. 
                  Apply a continuous bead around the inner flange of the window. Do not leave any 
                  gaps. Once the window is pressed against the van skin, the internal frame is 
                  screwed to the outer frame, drawing the two together and compressing the sealant 
                  to form a watertight gasket.
                </p>
              </div>
            </section>

          </div>

          <DometicSidebar items={TOC} currentPage="/guides/dometic/s4-window-installation" />
        </div>
      </div>

      <Footer />
    </main>
  );
}
