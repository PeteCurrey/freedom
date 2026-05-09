'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CheckCircle, Mail, ArrowRight, Download } from 'lucide-react';
import { Suspense } from 'react';

function ThankYouContent() {
  const params = useSearchParams();
  const isDev = params.get('dev') === 'true';
  const email = params.get('email') || '';
  const type = params.get('type') || '';
  const sessionId = params.get('session_id') || '';

  const isBundle = type === 'bundle' || sessionId.includes('bundle');
  const title = isBundle ? 'Complete Wiring Diagram Pack' : 'Wiring Diagram';

  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      <section className="pt-44 pb-24">
        <div className="container mx-auto px-6 max-w-2xl text-center">
          <div className="bg-brand-orange/10 border border-brand-orange/30 w-20 h-20 flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="w-10 h-10 text-brand-orange" />
          </div>

          <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em] block mb-4">
            // Payment Confirmed
          </span>
          <h1 className="font-display text-4xl lg:text-5xl uppercase tracking-tighter mb-6 leading-none">
            Your {title} Is<br /><span className="text-brand-orange">On Its Way</span>
          </h1>

          <div className="bg-brand-carbon border border-brand-border p-8 mb-8 text-left space-y-4">
            <div className="flex items-start gap-4">
              <div className="bg-brand-orange/10 p-2 border border-brand-orange/20 shrink-0">
                <Mail className="w-4 h-4 text-brand-orange" />
              </div>
              <div>
                <p className="font-display text-sm uppercase tracking-wider mb-1">Check Your Email</p>
                <p className="font-sans text-sm text-brand-grey leading-relaxed">
                  Your download link{isBundle ? 's have' : ' has'} been sent to{' '}
                  {email ? <strong className="text-white">{email}</strong> : 'your email address'}.
                  {' '}Links are valid for 30 days.
                </p>
              </div>
            </div>

            {isDev && (
              <div className="border border-yellow-500/30 bg-yellow-500/5 p-4 mt-2">
                <p className="font-mono text-[9px] text-yellow-400 uppercase tracking-widest">
                  DEV MODE — No Stripe key configured. In production, a real payment would be processed and download links sent via Resend.
                </p>
              </div>
            )}
          </div>

          <div className="space-y-4 mb-12">
            <p className="font-sans text-brand-grey text-sm">
              Didn't receive the email? Check your spam folder, or{' '}
              <Link href="/contact" className="text-brand-orange hover:text-white transition-colors underline">
                contact us
              </Link>
              .
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/guides/wiring-diagrams"
              className="border border-brand-border bg-brand-carbon px-6 py-4 font-display text-sm uppercase tracking-widest hover:border-brand-orange/40 transition-colors flex items-center justify-center gap-2"
            >
              More Diagrams <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/planner"
              className="bg-brand-orange text-brand-obsidian px-6 py-4 font-display text-sm uppercase tracking-widest hover:bg-white transition-colors flex items-center justify-center gap-2 font-bold"
            >
              <Download className="w-3.5 h-3.5" /> Start Build Planner
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={
      <main className="bg-brand-obsidian min-h-screen flex items-center justify-center">
        <span className="font-mono text-brand-grey text-sm animate-pulse">Loading…</span>
      </main>
    }>
      <ThankYouContent />
    </Suspense>
  );
}
