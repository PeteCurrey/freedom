import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { WIRING_DIAGRAMS, DIAGRAM_INDIVIDUAL_PRICE, DIAGRAM_BUNDLE_PRICE } from '@/lib/data/wiringDiagrams';
import { Zap, Download, Package, ArrowRight, CheckCircle } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Victron Wiring Diagrams for UK Van Conversions — Amplios',
  description: 'Professional Victron Energy system wiring diagrams adapted for UK campervan conversions. Includes cable sizing, UK regulatory notes, and component breakdowns. Individual £9.99 or complete bundle £29.99.',
  keywords: ['victron wiring diagram uk', 'campervan electrical diagram', 'victron multiplus wiring', 'van conversion wiring diagram uk'],
};

const TIER_COLOURS: Record<string, string> = {
  'starter': 'text-blue-400 border-blue-400/30 bg-blue-400/5',
  'weekender': 'text-emerald-400 border-emerald-400/30 bg-emerald-400/5',
  'full-autonomy': 'text-brand-orange border-brand-orange/30 bg-brand-orange/5',
  '24v': 'text-purple-400 border-purple-400/30 bg-purple-400/5',
  'solar-only': 'text-yellow-400 border-yellow-400/30 bg-yellow-400/5',
  'dc-dc': 'text-cyan-400 border-cyan-400/30 bg-cyan-400/5',
};

const TIER_LABELS: Record<string, string> = {
  'starter': 'Starter',
  'weekender': 'Weekender',
  'full-autonomy': 'Full Autonomy',
  '24v': '24V Expedition',
  'solar-only': 'Solar Only',
  'dc-dc': 'Alternator Charging',
};

export default function WiringDiagramsHubPage() {
  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="pt-48 pb-24 bg-brand-carbon border-b border-brand-border relative overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-orange/50 to-transparent" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="h-px flex-1 bg-brand-border max-w-16" />
              <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em]">// Technical Library</span>
              <div className="h-px flex-1 bg-brand-border max-w-16" />
            </div>
            <h1 className="font-display text-5xl lg:text-7xl uppercase tracking-tighter mb-6 leading-none">
              Victron Wiring<br /><span className="text-brand-orange">Diagrams</span>
            </h1>
            <p className="font-sans text-brand-grey text-lg leading-relaxed max-w-2xl mx-auto mb-10">
              Six professional system diagrams for UK van conversions. Every diagram includes component callouts, UK cable sizing tables, regulatory notes, and direct links to purchase components.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/guides/wiring-diagrams/complete-pack"
                className="bg-brand-orange text-brand-obsidian px-8 py-4 font-display text-sm uppercase tracking-widest hover:bg-white transition-colors inline-flex items-center gap-2 font-bold shadow-lg shadow-brand-orange/20"
              >
                <Package className="w-4 h-4" />
                Complete Pack — £{(DIAGRAM_BUNDLE_PRICE / 100).toFixed(2)}
              </Link>
              <span className="font-mono text-[10px] text-brand-grey uppercase tracking-widest">
                or £{(DIAGRAM_INDIVIDUAL_PRICE / 100).toFixed(2)} per diagram
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="py-16 border-b border-brand-border">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Zap, title: 'System Schematics', desc: 'Full Victron system drawings adapted for UK van conversions' },
              { icon: CheckCircle, title: 'Cable Sizing Tables', desc: 'mm² specifications for every cable run in the system' },
              { icon: CheckCircle, title: 'UK Regulatory Notes', desc: 'BS 7671, RCD requirements, and DVLA reclassification notes' },
              { icon: Download, title: 'PDF Download', desc: 'High-res A3 PDF delivered instantly by email' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-4 items-start">
                <div className="bg-brand-orange/10 p-2.5 border border-brand-orange/20 shrink-0 mt-0.5">
                  <Icon className="w-4 h-4 text-brand-orange" />
                </div>
                <div>
                  <p className="font-display text-sm uppercase tracking-wider mb-1">{title}</p>
                  <p className="font-sans text-xs text-brand-grey leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIAGRAM GRID */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="mb-12">
            <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.3em] block mb-3">// Six System Configurations</span>
            <h2 className="font-display text-4xl uppercase tracking-tighter">All Diagrams</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WIRING_DIAGRAMS.map((diagram) => {
              const tierColour = TIER_COLOURS[diagram.systemTier] || TIER_COLOURS['starter'];
              return (
                <Link
                  key={diagram.slug}
                  href={`/guides/wiring-diagrams/${diagram.slug}`}
                  className="group bg-brand-carbon border border-brand-border hover:border-brand-orange/50 transition-all p-8 flex flex-col shadow-xl relative overflow-hidden"
                >
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-brand-orange/3 rounded-full translate-x-8 translate-y-8 group-hover:bg-brand-orange/8 transition-colors" />

                  <div className="flex items-center justify-between mb-6">
                    <span className={`font-mono text-[9px] uppercase tracking-widest border px-2 py-1 ${tierColour}`}>
                      {TIER_LABELS[diagram.systemTier]}
                    </span>
                    <span className="font-mono text-xs text-brand-grey">
                      ~{diagram.monthlySearches.toLocaleString()}/mo
                    </span>
                  </div>

                  <h3 className="font-display text-xl uppercase tracking-tight mb-3 leading-tight group-hover:text-brand-orange transition-colors">
                    {diagram.h1.split(':')[0]}
                  </h3>
                  <p className="font-sans text-xs text-brand-grey leading-relaxed mb-6 flex-1">
                    {diagram.educationalFocus}
                  </p>

                  <div className="border-t border-brand-border/50 pt-6">
                    <div className="flex items-center justify-between">
                      <span className="font-display text-lg text-brand-orange">
                        £{(diagram.price / 100).toFixed(2)}
                      </span>
                      <span className="font-mono text-[10px] text-brand-orange uppercase tracking-widest flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                        View Diagram <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* BUNDLE CTA */}
      <section className="py-24 bg-brand-carbon border-t border-b border-brand-border">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="border border-brand-orange/30 p-12 relative overflow-hidden">
              <div className="absolute inset-0 blueprint-grid opacity-5" />
              <div className="relative z-10">
                <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.3em] block mb-4">// Best Value</span>
                <h2 className="font-display text-4xl lg:text-5xl uppercase tracking-tighter mb-4">
                  Complete Diagram Pack
                </h2>
                <p className="font-sans text-brand-grey mb-8">
                  All 6 wiring diagrams in one download. Save £{((DIAGRAM_INDIVIDUAL_PRICE * 6 - DIAGRAM_BUNDLE_PRICE) / 100).toFixed(2)} vs buying individually.
                </p>
                <div className="grid grid-cols-2 gap-2 mb-10">
                  {WIRING_DIAGRAMS.map(d => (
                    <div key={d.slug} className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-brand-orange shrink-0" />
                      <span className="font-mono text-[10px] text-brand-grey uppercase tracking-wide">{TIER_LABELS[d.systemTier]}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-6">
                  <div>
                    <span className="font-display text-4xl text-brand-orange">£{(DIAGRAM_BUNDLE_PRICE / 100).toFixed(2)}</span>
                    <span className="font-mono text-xs text-brand-grey ml-3 line-through">£{((DIAGRAM_INDIVIDUAL_PRICE * 6) / 100).toFixed(2)}</span>
                  </div>
                  <Link
                    href="/guides/wiring-diagrams/complete-pack"
                    className="bg-brand-orange text-brand-obsidian px-8 py-4 font-display text-sm uppercase tracking-widest hover:bg-white transition-colors font-bold inline-flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Get the Bundle
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
