'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { DodoSidebar } from '@/components/editorial/DodoSidebar';
import { getDiagramBySlug, DIAGRAM_INDIVIDUAL_PRICE } from '@/lib/data/wiringDiagrams';
import {
  ArrowRight, Download, CheckCircle,
  ShieldAlert, Info, VolumeX, Hammer, ShieldCheck, Zap
} from 'lucide-react';

export default function DodoInsulationInstallationGuide() {
  const diagram = getDiagramBySlug('dodo-mat-insulation-layout-schematic');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const TOC = [
    { id: "intro", label: "Installation Overview" },
    { id: "schematic", label: "Insulation Layout" },
    { id: "preparation", label: "Surface Prep" },
    { id: "application", label: "Application Method" },
    { id: "seams", label: "Sealing the Vapor Barrier" },
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
            alt="Dodo Mat installation"
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
            Dodo Mat:<br />Professional Lining
          </h1>
          <p className="font-sans text-brand-grey text-lg max-w-2xl italic border-l-2 border-brand-orange pl-6">
            A technical guide to applying sound deadening and thermal liners for a factory-standard finish.
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
                  Lining a van with Dodo Mat is a time-consuming but incredibly 
                  rewarding process. It requires patience and attention to detail, 
                  particularly around complex curves and structural ribs. 
                  The goal is to create a continuous thermal and acoustic shield.
                </p>
                <div className="bg-brand-carbon p-6 border-l-4 border-brand-orange mt-6">
                  <h4 className="font-display text-xs uppercase text-brand-white mb-2 flex items-center gap-2">
                    <ShieldAlert className="w-3 h-3 text-brand-orange" />
                    Cleanliness is Key
                  </h4>
                  <p className="text-xs">
                    The adhesive backing on Dodo Mat is incredibly strong, but it 
                    will fail if applied to a dusty or oily surface. You must 
                    meticulously clean the van interior before you begin.
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
                <h2 className="font-display text-2xl uppercase tracking-tighter">Technical Insulation Layout</h2>
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
                        Download the full-vehicle insulation map. Includes specific 
                        deadening placement for Sprinter/Crafter/Transit and 
                        cavity filling strategies to avoid cold spots.
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
                      <span className="text-xs text-brand-grey font-sans">Full Acoustic Mapping</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-brand-orange" />
                      <span className="text-xs text-brand-grey font-sans">Thermal Break Locations</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-brand-orange" />
                      <span className="text-xs text-brand-grey font-sans">Vapor Barrier Seam Guide</span>
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

            {/* PREPARATION */}
            <section id="preparation" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <Hammer className="w-5 h-5 text-brand-orange" />
                <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white">
                  Surface Preparation
                </h2>
              </div>
              <div className="prose prose-invert max-w-none font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  Remove all internal ply lining and plastic trims. Vacuum the 
                  entire van, including the deep cavities. Use **Isopropyl Alcohol 
                  (IPA)** or a dedicated panel wipe to clean the metal panels. 
                  This removes the wax and oils left over from the manufacturing 
                  process and ensures your deadening will never peel off.
                </p>
              </div>
            </section>

            {/* APPLICATION */}
            <section id="application" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <Zap className="w-5 h-5 text-brand-orange" />
                <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white">
                  Application Method
                </h2>
              </div>
              <div className="font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  When applying sound deadening, start from the center of the panel 
                  and work outwards. Use a **heavy-duty roller** to press the 
                  butyl into the metal. You should be able to see the texture 
                  of the foil backing change as the air is squeezed out. Any air 
                  pocket is a potential condensation trap.
                </p>
              </div>
            </section>

            {/* SEAMS */}
            <section id="seams" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <ShieldCheck className="w-5 h-5 text-brand-orange" />
                <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white">
                  Sealing the Vapor Barrier
                </h2>
              </div>
              <div className="font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  When you've finished applying your Thermo Liner, use **Aluminum 
                  Foil Tape** to seal every seam. This creates a continuous, 
                  watertight vapor barrier. This prevents the moisture from 
                  your breath and cooking from reaching the cold metal van skin, 
                  eliminating the primary cause of internal rust.
                </p>
              </div>
            </section>

          </div>

          <DodoSidebar items={TOC} currentPage="/guides/dodo-mat/insulation-installation" />
        </div>
      </div>

      <Footer />
    </main>
  );
}
