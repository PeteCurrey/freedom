'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { getDiagramBySlug, WIRING_DIAGRAMS, DIAGRAM_INDIVIDUAL_PRICE } from '@/lib/data/wiringDiagrams';
import {
  Zap, ArrowRight, ArrowLeft, Download, CheckCircle,
  AlertCircle, Table2, ExternalLink, Shield, ChevronRight
} from 'lucide-react';

interface PageProps {
  params: { slug: string };
}

export default function WiringDiagramPage({ params }: PageProps) {
  const diagram = getDiagramBySlug(params.slug);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  if (!diagram) {
    return (
      <main className="bg-brand-obsidian min-h-screen">
        <Navbar />
        <section className="pt-48 pb-24 text-center">
          <h1 className="font-display text-4xl uppercase tracking-tighter text-brand-orange mb-4">Diagram Not Found</h1>
          <Link href="/guides/wiring-diagrams" className="text-brand-grey underline">← Back to all diagrams</Link>
        </section>
        <Footer />
      </main>
    );
  }

  const handleCheckout = async () => {
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address to receive your download link.');
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
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const upgradeTarget = diagram.upgradePathSlug
    ? WIRING_DIAGRAMS.find(d => d.slug === diagram.upgradePathSlug)
    : null;

  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="pt-44 pb-16 bg-brand-carbon border-b border-brand-border relative overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <Link
            href="/guides/wiring-diagrams"
            className="inline-flex items-center gap-2 font-mono text-[10px] text-brand-grey uppercase tracking-widest hover:text-brand-orange transition-colors mb-8"
          >
            <ArrowLeft className="w-3 h-3" /> All Wiring Diagrams
          </Link>
          <div className="max-w-4xl">
            <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em] block mb-4">
              // Victron Energy System Schematic
            </span>
            <h1 className="font-display text-4xl lg:text-6xl uppercase tracking-tighter mb-6 leading-none">
              {diagram.h1}
            </h1>
            <p className="font-sans text-brand-grey text-lg leading-relaxed max-w-2xl">
              {diagram.metaDescription.split('.')[0]}.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* MAIN CONTENT */}
          <div className="lg:col-span-2 space-y-16">

            {/* DIAGRAM IMAGE */}
            <section>
              <div className="relative bg-brand-carbon border border-brand-border overflow-hidden aspect-[4/3] flex items-center justify-center group">
                <Image
                  src={diagram.imagePlaceholder}
                  alt={`${diagram.title} — system wiring schematic`}
                  fill
                  className="object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                  priority
                />
                {/* Watermark overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center">
                    <div className="border border-brand-orange/30 bg-brand-obsidian/80 px-6 py-3 backdrop-blur-sm">
                      <span className="font-mono text-[10px] text-brand-orange uppercase tracking-widest block">Preview</span>
                      <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest">Purchase to download full-res PDF</span>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 font-mono text-[9px] text-brand-orange/40 uppercase tracking-widest">
                  amplios.co.uk / victron-authorised-dealer
                </div>
              </div>
              <p className="font-mono text-[9px] text-brand-grey uppercase tracking-wider mt-3">
                {diagram.h1} — Download includes A3 high-resolution PDF with all callouts
              </p>
            </section>

            {/* COMPONENT BREAKDOWN */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-brand-orange/10 p-2 border border-brand-orange/20">
                  <Zap className="w-4 h-4 text-brand-orange" />
                </div>
                <h2 className="font-display text-2xl uppercase tracking-tighter">Component Breakdown</h2>
              </div>
              <div className="space-y-4">
                {diagram.components.map((comp) => (
                  <div key={comp.number} className="border border-brand-border bg-brand-carbon p-6 hover:border-brand-orange/30 transition-colors group">
                    <div className="flex items-start gap-4">
                      <div className="bg-brand-orange text-brand-obsidian font-display text-sm font-black w-8 h-8 flex items-center justify-center shrink-0">
                        {comp.number}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4">
                          <h3 className="font-display text-base uppercase tracking-tight mb-2">{comp.name}</h3>
                          {comp.storeSlug && (
                            <Link
                              href={`/store/product/${comp.storeSlug}`}
                              className="font-mono text-[9px] text-brand-orange uppercase tracking-widest flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity hover:text-white"
                            >
                              View in Store <ExternalLink className="w-2.5 h-2.5" />
                            </Link>
                          )}
                        </div>
                        <p className="font-sans text-sm text-brand-grey leading-relaxed">{comp.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* CABLE SIZING TABLE */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-brand-orange/10 p-2 border border-brand-orange/20">
                  <Table2 className="w-4 h-4 text-brand-orange" />
                </div>
                <h2 className="font-display text-2xl uppercase tracking-tighter">Cable Sizing Table</h2>
              </div>
              <div className="border border-brand-border overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-brand-carbon border-b border-brand-border">
                      <th className="font-mono text-[9px] uppercase tracking-widest text-brand-grey text-left px-6 py-4">Cable Run</th>
                      <th className="font-mono text-[9px] uppercase tracking-widest text-brand-grey text-left px-6 py-4">Min. Size</th>
                      <th className="font-mono text-[9px] uppercase tracking-widest text-brand-grey text-left px-6 py-4">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {diagram.cableRuns.map((run, i) => (
                      <tr key={run.run} className={`border-b border-brand-border/50 hover:bg-brand-carbon/50 transition-colors ${i % 2 === 0 ? 'bg-transparent' : 'bg-brand-carbon/20'}`}>
                        <td className="font-sans text-white px-6 py-4 font-medium">{run.run}</td>
                        <td className="font-mono text-brand-orange px-6 py-4 font-bold text-sm">{run.size}</td>
                        <td className="font-sans text-brand-grey px-6 py-4 text-xs">{run.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="font-mono text-[9px] text-brand-grey uppercase tracking-wider mt-3">
                All cable sizes based on IEC 60228 Class 5 flexible stranded copper conductor
              </p>
            </section>

            {/* UK NOTES */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-brand-orange/10 p-2 border border-brand-orange/20">
                  <Shield className="w-4 h-4 text-brand-orange" />
                </div>
                <h2 className="font-display text-2xl uppercase tracking-tighter">UK Regulatory Notes</h2>
              </div>
              <div className="border border-brand-orange/20 bg-brand-orange/5 p-6 space-y-3">
                {diagram.ukNotes.map((note, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <AlertCircle className="w-3.5 h-3.5 text-brand-orange shrink-0 mt-0.5" />
                    <p className="font-sans text-sm text-brand-grey leading-relaxed">{note}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* WHAT IT POWERS */}
            <section>
              <h2 className="font-display text-2xl uppercase tracking-tighter mb-6">What This System Powers</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {diagram.whatItPowers.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                    <span className="font-sans text-sm text-brand-grey">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* UPGRADE PATH */}
            {upgradeTarget && (
              <section className="border border-brand-border bg-brand-carbon p-8">
                <span className="font-mono text-[10px] text-brand-orange uppercase tracking-widest block mb-3">// Next Step Up</span>
                <p className="font-sans text-brand-grey mb-6 leading-relaxed">{diagram.upgradePathText}</p>
                <Link
                  href={`/guides/wiring-diagrams/${diagram.upgradePathSlug}`}
                  className="font-mono text-[11px] text-brand-orange uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all hover:text-white"
                >
                  {diagram.upgradePathLabel} <ChevronRight className="w-3 h-3" />
                </Link>
              </section>
            )}
          </div>

          {/* SIDEBAR — PURCHASE */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              {/* PURCHASE CARD */}
              <div className="border border-brand-orange/40 bg-brand-carbon p-8 shadow-2xl shadow-brand-orange/5">
                <span className="font-mono text-[9px] text-brand-orange uppercase tracking-widest block mb-4">// Download PDF</span>
                <div className="mb-6">
                  <span className="font-display text-4xl text-brand-orange">
                    £{(DIAGRAM_INDIVIDUAL_PRICE / 100).toFixed(2)}
                  </span>
                  <span className="font-mono text-xs text-brand-grey ml-2">inc. VAT</span>
                </div>
                <div className="space-y-2 mb-6">
                  {['A3 high-res PDF', 'UK cable sizing table', 'Regulatory notes', 'Instant email delivery'].map(f => (
                    <div key={f} className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-brand-orange shrink-0" />
                      <span className="font-sans text-xs text-brand-grey">{f}</span>
                    </div>
                  ))}
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
                    className="w-full bg-brand-orange text-brand-obsidian py-4 font-display text-sm uppercase tracking-widest hover:bg-white transition-colors font-bold flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span className="animate-pulse">Processing…</span>
                    ) : (
                      <><Download className="w-4 h-4" /> Download Now</>
                    )}
                  </button>
                </div>
                <p className="font-mono text-[8px] text-brand-grey uppercase tracking-wider text-center mt-4">
                  Secure payment via Stripe
                </p>
              </div>

              {/* BUNDLE UPSELL */}
              <Link
                href="/guides/wiring-diagrams/complete-pack"
                className="block border border-brand-border hover:border-brand-orange/40 bg-brand-carbon p-6 transition-colors group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[9px] text-brand-orange uppercase tracking-widest">All 6 Diagrams</span>
                  <ArrowRight className="w-3 h-3 text-brand-orange group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="font-display text-xl uppercase tracking-tight mb-2">Complete Bundle</p>
                <p className="font-sans text-xs text-brand-grey">Save £{(((DIAGRAM_INDIVIDUAL_PRICE * 6) - 2999) / 100).toFixed(2)} — all diagrams for £29.99</p>
              </Link>

              {/* PLANNER CTA */}
              <div className="border border-brand-border bg-brand-carbon p-6">
                <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest block mb-3">// Want a Full Spec?</span>
                <p className="font-sans text-xs text-brand-grey leading-relaxed mb-4">Our AI Build Planner generates a complete system spec, BOM, and wiring diagram for your exact vehicle and usage profile.</p>
                <Link
                  href="/planner"
                  className="font-mono text-[10px] text-brand-orange uppercase tracking-widest flex items-center gap-1.5 hover:gap-2.5 transition-all hover:text-white"
                >
                  Start Build Planner <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
