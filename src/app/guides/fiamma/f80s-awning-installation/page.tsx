"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FiammaSidebar } from "@/components/editorial/FiammaSidebar";
import { RelatedProducts } from "@/components/editorial/RelatedProducts";
import { getDiagramBySlug, DIAGRAM_INDIVIDUAL_PRICE } from "@/lib/data/wiringDiagrams";
import { 
  ArrowRight, Download, ShieldAlert, Settings, 
  MapPin, CheckCircle, FileText, Lock, Info, Umbrella, Zap
} from "lucide-react";

export default function FiammaF80sInstallationGuide() {
  const diagram = getDiagramBySlug('fiamma-f80s-awning-installation-schematic');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const TOC = [
    { id: "prep", label: "Preparation & Brackets" },
    { id: "bonding", label: "Bonding Protocol" },
    { id: "mounting", label: "Mounting the Awning" },
    { id: "adjusting", label: "Tensioning & Adjustment" },
    { id: "schematic", label: "Download Schematic" },
  ];

  const MENTIONED_PRODUCTS = [
    { name: "Fiamma F80s Awning - 320 Black", brand: "Fiamma", price: 84500, slug: "fiamma-f80s-roof-awning-320-deep-black" },
    { name: "Sikaflex 252 Adhesive", brand: "Sika", price: 1850, slug: "sikaflex-252-white-300ml" },
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
            src="/images/man-tge-hero.png" // Placeholder
            alt="Fiamma F80s installation"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian to-transparent" />
        </div>
        <div className="relative container mx-auto px-6 pb-16 z-10">
          <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em] mb-4 block">
            // EXTERIOR ENGINEERING
          </span>
          <h1 className="font-display text-4xl lg:text-6xl uppercase tracking-tight text-brand-white leading-[1] mb-4">
            Fiamma F80s:<br />Installation Protocol
          </h1>
          <p className="font-sans text-brand-grey text-lg max-w-2xl leading-relaxed">
            Professional guidelines for roof-mounting the world's most popular awning. 
            Bracket positioning, structural bonding, and safety considerations.
          </p>
        </div>
      </section>

      {/* CONTENT + SIDEBAR */}
      <div className="container mx-auto px-6 py-16">
        <div className="flex flex-col xl:flex-row gap-12">
          <div className="flex-1 min-w-0">

            {/* PREP */}
            <section id="prep" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-8">
                <Settings className="w-6 h-6 text-brand-orange" />
                <h2 className="font-display text-3xl uppercase tracking-tight text-white">Preparation & Brackets</h2>
              </div>
              <div className="space-y-6 font-sans text-brand-grey text-lg leading-relaxed">
                <p>
                  The Fiamma F80s is a roof-mounted awning. Unlike wall-mounted versions, it requires vehicle-specific brackets that match the curvature of your van's roof line. 
                </p>
                <div className="bg-brand-carbon border border-brand-border p-6 border-l-4 border-brand-orange text-sm italic">
                  Critical: Ensure you have the correct bracket kit for your vehicle (e.g., Ducato/Relay vs Sprinter/Crafter). Using the wrong brackets will compromise the bond and void your warranty.
                </div>
              </div>
            </section>

            {/* BONDING */}
            <section id="bonding" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-8">
                <ShieldAlert className="w-6 h-6 text-brand-orange" />
                <h2 className="font-display text-3xl uppercase tracking-tight text-white">The Bonding Protocol</h2>
              </div>
              <div className="space-y-6 font-sans text-brand-grey text-lg leading-relaxed">
                <p>
                  Awnings are heavy (30kg+) and subject to massive wind loads. The brackets must be physically bonded to the roof using a structural adhesive like **Sikaflex 252**.
                </p>
                <div className="p-6 bg-brand-carbon border border-brand-border">
                   <h4 className="font-display text-xs text-white uppercase mb-3">Sika 3-Step Process</h4>
                   <ol className="text-sm space-y-2 list-decimal pl-5">
                      <li>**Aktivator:** Clean the roof and bracket surfaces to remove oils and contaminants.</li>
                      <li>**Primer 206 G+P:** Apply a thin layer of primer to both surfaces and allow to dry (approx 10 mins).</li>
                      <li>**Sikaflex 252:** Apply a generous bead and clamp the brackets into place.</li>
                   </ol>
                </div>
              </div>
            </section>

            {/* MOUNTING */}
            <section id="mounting" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-8">
                <Umbrella className="w-6 h-6 text-brand-orange" />
                <h2 className="font-display text-3xl uppercase tracking-tight text-white">Mounting the Awning</h2>
              </div>
              <div className="font-sans text-brand-grey text-lg leading-relaxed space-y-4">
                <p>
                  Once the brackets are set (we recommend waiting 24 hours), the awning body can be lifted onto the roof. This is a two-person job. The F80s "hooks" onto the brackets and is secured with mounting bolts from underneath.
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
                        Fiamma F80s <span className="text-brand-orange">Installation Schematic</span> & Bracket Guide
                     </h3>
                     <p className="font-sans text-brand-grey text-lg mb-8 leading-relaxed">
                        Secure your awning with confidence. Download our verified installation schematic including bracket positioning for all major van models and Sikaflex bonding temperatures.
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
                  <Link href="/brands/fiamma" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">Fiamma Brand Hub →</Link>
                  <Link href="/store/exterior-equipment?sub=awnings" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">Shop Awnings →</Link>
                </div>
              </div>
            </div>
          </div>

          <FiammaSidebar items={TOC} currentPage="/guides/fiamma/f80s-awning-installation" />
        </div>
      </div>

      <Footer />
    </main>
  );
}
