'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { WIRING_DIAGRAMS, DIAGRAM_BUNDLE_PRICE, DIAGRAM_INDIVIDUAL_PRICE } from '@/lib/data/wiringDiagrams';
import { Package, CheckCircle, Download, ArrowLeft, Zap } from 'lucide-react';

const TIER_LABELS: Record<string, string> = {
  'starter': 'Starter', 'weekender': 'Weekender', 'full-autonomy': 'Full Autonomy',
  '24v': '24V Expedition', 'solar-only': 'Solar Only', 'dc-dc': 'Alternator Charging',
};

export default function CompleteBundlePage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const savings = (DIAGRAM_INDIVIDUAL_PRICE * 6 - DIAGRAM_BUNDLE_PRICE) / 100;

  const handleCheckout = async () => {
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address to receive your download links.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/diagrams/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bundle: true, email }),
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

  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="pt-44 pb-20 bg-brand-carbon border-b border-brand-border relative overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <Link href="/guides/wiring-diagrams" className="inline-flex items-center gap-2 font-mono text-[10px] text-brand-grey uppercase tracking-widest hover:text-brand-orange transition-colors mb-8">
            <ArrowLeft className="w-3 h-3" /> All Wiring Diagrams
          </Link>
          <div className="max-w-3xl">
            <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em] block mb-4">// Best Value Bundle</span>
            <h1 className="font-display text-5xl lg:text-7xl uppercase tracking-tighter mb-6 leading-none">
              Complete<br /><span className="text-brand-orange">Diagram Pack</span>
            </h1>
            <p className="font-sans text-brand-grey text-lg leading-relaxed">
              Every Victron wiring diagram we publish — all 6 system configurations — in one download. Save £{savings.toFixed(2)} versus buying individually.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* WHAT'S INCLUDED */}
          <div className="lg:col-span-3 space-y-10">
            <div>
              <h2 className="font-display text-3xl uppercase tracking-tighter mb-8">What's Included</h2>
              <div className="space-y-4">
                {WIRING_DIAGRAMS.map((diagram, i) => (
                  <Link
                    key={diagram.slug}
                    href={`/guides/wiring-diagrams/${diagram.slug}`}
                    className="flex items-start gap-5 border border-brand-border bg-brand-carbon hover:border-brand-orange/30 transition-colors p-6 group"
                  >
                    <div className="bg-brand-orange text-brand-obsidian font-display text-sm font-black w-8 h-8 flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-mono text-[9px] text-brand-orange uppercase tracking-widest mb-1">
                            {TIER_LABELS[diagram.systemTier]}
                          </p>
                          <h3 className="font-display text-base uppercase tracking-tight group-hover:text-brand-orange transition-colors">
                            {diagram.h1.split(':')[0]}
                          </h3>
                        </div>
                        <span className="font-mono text-[10px] text-brand-grey shrink-0">
                          (worth £{(DIAGRAM_INDIVIDUAL_PRICE / 100).toFixed(2)})
                        </span>
                      </div>
                      <p className="font-sans text-xs text-brand-grey mt-2">{diagram.educationalFocus}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="border border-brand-border bg-brand-carbon p-8">
              <h2 className="font-display text-2xl uppercase tracking-tighter mb-6">Every Diagram Includes</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  'System schematic (A3 PDF)',
                  'Numbered component callouts',
                  'UK cable sizing table',
                  'BS 7671 / RCD notes',
                  'What the system powers',
                  'Upgrade path guidance',
                  'DVLA reclassification notes',
                  'Store links for every component',
                ].map(f => (
                  <div key={f} className="flex items-center gap-3">
                    <CheckCircle className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                    <span className="font-sans text-sm text-brand-grey">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-brand-border bg-brand-carbon p-6">
              <div className="flex items-center gap-3 mb-3">
                <Zap className="w-4 h-4 text-brand-orange" />
                <span className="font-display text-base uppercase tracking-tight">Want a personalised spec?</span>
              </div>
              <p className="font-sans text-sm text-brand-grey leading-relaxed mb-4">
                These diagrams show standard Victron configurations. For a spec tailored to your exact vehicle, payload, and usage profile, use the AI Build Planner.
              </p>
              <Link href="/planner" className="font-mono text-[10px] text-brand-orange uppercase tracking-widest hover:text-white transition-colors">
                Start AI Build Planner →
              </Link>
            </div>
          </div>

          {/* PURCHASE SIDEBAR */}
          <div className="lg:col-span-2">
            <div className="sticky top-28">
              <div className="border border-brand-orange/50 bg-brand-carbon p-8 shadow-2xl shadow-brand-orange/10">
                <span className="font-mono text-[9px] text-brand-orange uppercase tracking-widest block mb-2">// Complete Bundle</span>

                <div className="flex items-end gap-3 mb-2">
                  <span className="font-display text-5xl text-brand-orange">
                    £{(DIAGRAM_BUNDLE_PRICE / 100).toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center gap-3 mb-6 pb-6 border-b border-brand-border">
                  <span className="font-mono text-xs text-brand-grey line-through">
                    £{((DIAGRAM_INDIVIDUAL_PRICE * 6) / 100).toFixed(2)}
                  </span>
                  <span className="bg-brand-orange/15 text-brand-orange font-mono text-[9px] uppercase tracking-wider px-2 py-1 border border-brand-orange/30">
                    Save £{savings.toFixed(2)}
                  </span>
                </div>

                <div className="space-y-2 mb-6">
                  {['All 6 wiring diagrams', 'Instant email delivery', 'Lifetime re-download access', 'UK-specific annotation'].map(f => (
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
                  {error && <p className="font-mono text-[9px] text-red-400 uppercase tracking-wide">{error}</p>}
                  <button
                    onClick={handleCheckout}
                    disabled={loading}
                    className="w-full bg-brand-orange text-brand-obsidian py-4 font-display text-sm uppercase tracking-widest hover:bg-white transition-colors font-bold flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {loading ? <span className="animate-pulse">Processing…</span> : <><Package className="w-4 h-4" /> Get Complete Pack</>}
                  </button>
                </div>
                <p className="font-mono text-[8px] text-brand-grey uppercase tracking-wider text-center mt-4">
                  Secure payment via Stripe · VAT included
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
