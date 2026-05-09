"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WebastoSidebar } from "@/components/editorial/WebastoSidebar";
import { RelatedProducts } from "@/components/editorial/RelatedProducts";
import { getDiagramBySlug, DIAGRAM_INDIVIDUAL_PRICE } from "@/lib/data/wiringDiagrams";
import { 
  ArrowRight, Download, ShieldAlert, Settings, 
  MapPin, CheckCircle, FileText, Lock, Info, Flame, Zap
} from "lucide-react";

export default function WebastoInstallationGuide() {
  const diagram = getDiagramBySlug('webasto-air-top-installation-schematic');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const TOC = [
    { id: "safety", label: "Safety & Compliance" },
    { id: "fuel", label: "Fuel System Integration" },
    { id: "exhaust", label: "Exhaust Routing" },
    { id: "electric", label: "Electrical Connections" },
    { id: "schematic", label: "Download Schematic" },
  ];

  const MENTIONED_PRODUCTS = [
    { name: "Webasto Air Top 2000 STC Kit", brand: "Webasto", price: 114500, slug: "webasto-air-top-2000-stc-diesel-heater-kit" },
    { name: "Webasto Fuel Standpipe", brand: "Webasto", price: 2850, slug: "webasto-fuel-standpipe" },
  ];

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
        body: JSON.stringify({ slug: diagram?.slug, email }),
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
      <section className="relative min-h-[50vh] flex items-end pt-24 border-b border-brand-border overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/cat-climate.png"
            alt="Webasto Air Top installation"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian to-transparent" />
        </div>
        <div className="relative container mx-auto px-6 pb-16 z-10">
          <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em] mb-4 block">
            // ENGINEERING WORKFLOW
          </span>
          <h1 className="font-display text-4xl lg:text-6xl uppercase tracking-tight text-brand-white leading-[1] mb-4">
            Webasto Air Top:<br />Installation Protocol
          </h1>
          <p className="font-sans text-brand-grey text-lg max-w-2xl leading-relaxed">
            Professional guidelines for diesel heater integration. 
            Fuel tank tapping, exhaust safety, and electrical wiring for UK builds.
          </p>
        </div>
      </section>

      {/* CONTENT + SIDEBAR */}
      <div className="container mx-auto px-6 py-16">
        <div className="flex flex-col xl:flex-row gap-12">
          <div className="flex-1 min-w-0">

            {/* SAFETY */}
            <section id="safety" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-8">
                <ShieldAlert className="w-6 h-6 text-brand-orange" />
                <h2 className="font-display text-3xl uppercase tracking-tight text-white">Safety & Compliance</h2>
              </div>
              <div className="space-y-6 font-sans text-brand-grey text-lg leading-relaxed">
                <p>
                  Installing a diesel heater involves cutting into your vehicle's fuel system and managing combustion exhaust. While there is no "Gas Safe" equivalent for diesel, your insurer will require that the installation follows the manufacturer's protocol to the letter.
                </p>
                <div className="bg-brand-carbon border border-brand-border p-6 border-l-4 border-brand-orange text-sm italic">
                  Note: In the UK, if your van is used for commercial purposes (hire or reward), the installation must be audited to comply with the relevant DVLA and DVSA standards for motor caravans.
                </div>
              </div>
            </section>

            {/* FUEL SYSTEM */}
            <section id="fuel" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-8">
                <Flame className="w-6 h-6 text-brand-orange" />
                <h2 className="font-display text-3xl uppercase tracking-tight text-white">Fuel System Integration</h2>
              </div>
              <div className="space-y-6 font-sans text-brand-grey text-lg leading-relaxed">
                <p>
                  The most critical part of a Webasto installation is tapping into the vehicle fuel tank. We recommend using a **fuel standpipe** rather than a "T-piece" in the existing fuel line, as modern Euro 6 fuel systems are pressurized and can cause the heater to malfunction.
                </p>
                <div className="p-6 bg-brand-carbon border border-brand-border">
                   <h4 className="font-display text-xs text-white uppercase mb-3">The 1/4 Tank Rule</h4>
                   <p className="text-sm">
                     When installing the standpipe, ensure it stops approximately 25mm from the bottom of the tank. This ensures the heater cannot drain your tank completely, leaving you enough fuel to drive to a station.
                   </p>
                </div>
              </div>
            </section>

            {/* EXHAUST */}
            <section id="exhaust" className="mb-20 scroll-mt-28">
              <h2 className="font-display text-3xl uppercase tracking-tight text-white mb-8 border-l-4 border-brand-orange pl-6">
                Exhaust Routing
              </h2>
              <div className="font-sans text-brand-grey text-lg leading-relaxed space-y-4">
                <p>
                  The exhaust pipe gets extremely hot (up to 400°C). It must be routed away from fuel lines, plastic components, and air intakes. Crucially, the exhaust silencer should be mounted outside the vehicle perimeter, pointed slightly downwards to allow condensation to drain.
                </p>
              </div>
            </section>

            {/* ELECTRICAL */}
            <section id="electric" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-8">
                <Zap className="w-6 h-6 text-brand-orange" />
                <h2 className="font-display text-3xl uppercase tracking-tight text-white">Electrical Connections</h2>
              </div>
              <div className="font-sans text-brand-grey text-lg leading-relaxed space-y-4">
                <p>
                  The Webasto Air Top draws significant current (up to 10A) during the startup "glow plug" phase. You must use the provided heavy-duty loom and connect directly to your leisure battery or a high-current distribution point like a Lynx Distributor.
                </p>
              </div>
            </section>

            {/* PAID SCHEMATIC CTA */}
            <section id="schematic" className="mb-20 scroll-mt-28">
               <div className="relative p-10 border border-brand-orange/40 bg-brand-orange/5 overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                     <FileText className="w-32 h-32 rotate-12" />
                  </div>
                  <div className="relative z-10 max-w-xl">
                     <span className="font-mono text-[9px] text-brand-orange uppercase tracking-[0.4em] mb-4 block">
                        // PREMIUM TECHNICAL ASSET
                     </span>
                     <h3 className="font-display text-3xl lg:text-4xl uppercase tracking-tighter text-white mb-6 leading-none">
                        Professional <span className="text-brand-orange">Webasto Air Top</span> Installation Schematic
                     </h3>
                     <p className="font-sans text-brand-grey text-lg mb-8 leading-relaxed">
                        Eliminate the guesswork. Download our verified installation schematic including fuel standpipe depth charts, dosing pump angles, and wiring pin-outs for UK builds.
                     </p>
                     
                     <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row gap-4">
                           <input
                              type="email"
                              placeholder="your@email.com"
                              value={email}
                              onChange={e => setEmail(e.target.value)}
                              className="flex-1 bg-brand-obsidian border border-brand-border px-6 py-4 font-sans text-sm text-white placeholder-brand-grey/50 focus:outline-none focus:border-brand-orange transition-colors"
                           />
                           <button
                              onClick={handleCheckout}
                              disabled={loading}
                              className="bg-brand-orange text-white px-8 py-4 font-display text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all font-bold flex items-center justify-center gap-3 disabled:opacity-60"
                           >
                              {loading ? "Processing..." : "Download PDF (£9.99)"} <Download className="w-4 h-4" />
                           </button>
                        </div>
                        {error && (
                           <p className="font-mono text-[9px] text-red-400 uppercase tracking-wide">{error}</p>
                        )}
                        <div className="flex items-center gap-2">
                           <Lock className="w-3 h-3 text-brand-grey" />
                           <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest">Instant Delivery via Resend</span>
                        </div>
                     </div>
                  </div>
               </div>
            </section>

            {/* FOOTER COMPONENTS */}
            <div className="pt-12 border-t border-brand-border">
              <RelatedProducts products={MENTIONED_PRODUCTS} />
              
              <div className="mt-20">
                <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest mb-6 block">Continue Research</span>
                <div className="flex flex-wrap gap-6">
                  <Link href="/brands/webasto" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">Webasto Brand Hub →</Link>
                  <Link href="/guides/webasto/air-top-evo-guide" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">Product Deep Dive →</Link>
                  <Link href="/guides/compare/truma-vs-webasto" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">Truma vs Webasto →</Link>
                </div>
              </div>
            </div>
          </div>

          <WebastoSidebar items={TOC} currentPage="/guides/webasto/air-top-installation" />
        </div>
      </div>

      <Footer />
    </main>
  );
}
