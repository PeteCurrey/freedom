import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RelatedProducts } from "@/components/editorial/RelatedProducts";
import { FiammaSidebar } from "@/components/editorial/FiammaSidebar";
import { ArrowRight, Sun, Zap, ShieldCheck, Info, Map, Wind } from "lucide-react";

export const metadata: Metadata = {
  title: "Fiamma F80s Awning Guide | Aerodynamic Roof Shading | Amplios",
  description: "Everything you need to know about the Fiamma F80s roof awning. Triple guide, dual shock absorbers, and UK mounting advice.",
  openGraph: {
    title: "Fiamma F80s Awning Guide | Aerodynamic Roof Shading",
    description: "The modern standard for roof-mounted awnings. Explore the F80s range.",
    url: "https://amplios.co.uk/guides/fiamma/f80s-awning-guide",
  },
  alternates: { canonical: "https://amplios.co.uk/guides/fiamma/f80s-awning-guide" },
};

const TOC = [
  { id: "intro", label: "Aerodynamic Evolution" },
  { id: "features", label: "Core Features" },
  { id: "sizing", label: "Sizing Your Van" },
  { id: "brackets", label: "Bracket Selection" },
  { id: "verdict", label: "The Awning Choice" },
];

const MENTIONED_PRODUCTS = [
  { name: "Fiamma F80s Awning (3.2m)", brand: "Fiamma", price: 84500, slug: "fiamma-f80s-roof-awning-320-deep-black" },
  { name: "F80s LED Lighting Kit", brand: "Fiamma", price: 12500, slug: "fiamma-f80s-led-strip-kit" },
  { name: "Sikaflex 252 Bonding", brand: "Sika", price: 1850, slug: "sikaflex-252-white-300ml" },
];

export default function FiammaF80sGuide() {
  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[50vh] flex items-end pt-24">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/cat-windows.png" // Placeholder
            alt="Fiamma F80s Awning"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian via-brand-obsidian/40 to-transparent" />
        </div>
        
        <div className="relative container mx-auto px-6 pb-16 z-10">
          <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em] mb-4 block">
            // PRODUCT GUIDE
          </span>
          <h1 className="font-display text-4xl lg:text-6xl uppercase tracking-tight text-brand-white leading-[1] mb-4">
            Fiamma F80s:<br />Roof Evolution
          </h1>
          <p className="font-sans text-brand-grey text-lg max-w-2xl italic border-l-2 border-brand-orange pl-6">
            The modern standard for roof-mounted awnings. Designed for the aerodynamic lines of today's commercial vans.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16">
        <div className="flex gap-16">
          <div className="flex-1 min-w-0">
            
            {/* INTRO */}
            <section id="intro" className="mb-20 scroll-mt-28">
              <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white mb-6">
                Aerodynamic Evolution
              </h2>
              <div className="prose prose-invert max-w-none font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  The F80s replaced the long-standing F65 range as Fiamma's flagship roof-mounted 
                  awning. It is specifically designed to sit more compactly against the 
                  roofline, reducing wind noise and improving the overall aesthetic 
                  of your conversion.
                </p>
              </div>
            </section>

            {/* FEATURES */}
            <section id="features" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <ShieldCheck className="w-5 h-5 text-brand-orange" />
                <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white">
                  Core Features
                </h2>
              </div>
              <div className="prose prose-invert max-w-none font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  The F80s isn't just about looks. It includes several mechanical 
                  upgrades that make it more reliable in the field:
                </p>
                <ul className="text-xs space-y-2 list-disc pl-5">
                  <li>**Triple Guide:** Allows for the simultaneous mounting of a front panel, side room, and LED lighting.</li>
                  <li>**Dual Shock Absorber:** Absorbs wind stress on the arms and vehicle body.</li>
                  <li>**Secure Lock:** The lead bar remains locked even if not perfectly level during closure.</li>
                </ul>
              </div>
            </section>

            {/* SIZING */}
            <section id="sizing" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <Map className="w-5 h-5 text-brand-orange" />
                <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white">
                  Sizing Your Van
                </h2>
              </div>
              <div className="font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  Choosing the right length is critical. For most MWB vans (like the T6 or Transit Custom), 
                  a **2.6m or 3.2m** awning is standard. For LWB vans (Sprinter/Crafter), 
                  **3.7m or 4.0m** units are preferred. Always ensure the awning 
                  does not block access to your fuel filler or sliding door path.
                </p>
              </div>
            </section>

            {/* BRACKETS */}
            <section id="brackets" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <Info className="w-5 h-5 text-brand-orange" />
                <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white">
                  Bracket Selection
                </h2>
              </div>
              <div className="prose prose-invert max-w-none font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  The F80s requires specific brackets for your vehicle model. 
                  Unlike side-mounted awnings, roof awnings rely on the structural 
                  ribs of the van. Never attempt to "make do" with generic brackets; 
                  use only the official Fiamma kit for your specific van year and model.
                </p>
              </div>
            </section>

            {/* VERDICT */}
            <section id="verdict" className="mb-20 scroll-mt-28">
              <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white mb-6">
                The Verdict
              </h2>
              <div className="p-8 bg-brand-carbon border border-brand-border">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-brand-orange text-brand-obsidian font-display text-2xl font-black w-12 h-12 flex items-center justify-center rounded-sm">
                    9.2
                  </div>
                  <div>
                    <h4 className="font-display text-lg uppercase text-brand-white">The Roof Standard</h4>
                    <p className="font-mono text-[10px] text-brand-grey uppercase">Aerodynamic Excellence</p>
                  </div>
                </div>
                <p className="font-sans text-brand-grey text-base leading-relaxed">
                  If you are building a modern van and want a roof-mounted awning, 
                  the Fiamma F80s is the only serious choice. It is well-engineered, 
                  aesthetic, and has a massive ecosystem of spare parts and 
                  accessories available in the UK.
                </p>
              </div>
            </section>

            {/* RELATED PRODUCTS */}
            <div className="mt-16 pt-10 border-t border-brand-border/40">
              <RelatedProducts products={MENTIONED_PRODUCTS} />
              
              <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest mb-6 mt-16 block">Related guides</span>
              <div className="flex flex-wrap gap-4">
                <Link href="/brands/fiamma" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">Fiamma Hub →</Link>
                <Link href="/guides/fiamma/f80s-installation" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">Installation Guide →</Link>
              </div>
            </div>

          </div>

          <FiammaSidebar items={TOC} currentPage="/guides/fiamma/f80s-awning-guide" />
        </div>
      </div>

      <Footer />
    </main>
  );
}
