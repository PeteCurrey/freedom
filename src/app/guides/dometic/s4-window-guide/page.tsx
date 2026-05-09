import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RelatedProducts } from "@/components/editorial/RelatedProducts";
import { DometicSidebar } from "@/components/editorial/DometicSidebar";
import { ArrowRight, Layers, ShieldCheck, Sun, Info, Maximize2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Dometic S4 Window Guide | The Industry Standard | Amplios",
  description: "Everything you need to know about Dometic S4 windows. Sizing, insulation benefits, and integrated blind systems for UK campervans.",
  openGraph: {
    title: "Dometic S4 Window Guide | The Industry Standard",
    description: "The definitive guide to the world's most popular campervan windows.",
    url: "https://amplios.co.uk/guides/dometic/s4-window-guide",
  },
  alternates: { canonical: "https://amplios.co.uk/guides/dometic/s4-window-guide" },
};

const TOC = [
  { id: "intro", label: "What is the S4?" },
  { id: "insulation", label: "Insulation & Safety" },
  { id: "blinds", label: "Integrated Blinds" },
  { id: "sizing", label: "Sizing Guide" },
  { id: "installation", label: "Installation Overview" },
];

const MENTIONED_PRODUCTS = [
  { name: "Dometic S4 Window", brand: "Dometic", price: 49500, slug: "dometic-s4-hinged-campervan-window-range" },
  { name: "SikaFlex 221", brand: "Sika", price: 1200, slug: "sikaflex-221-adhesive-sealant" },
  { name: "Dometic FreshJet 2200", brand: "Dometic", price: 199500, slug: "dometic-freshjet-2200-roof-air-conditioner" },
];

export default function DometicS4WindowGuide() {
  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[50vh] flex items-end pt-24">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/tech-interior.png" // Placeholder
            alt="Dometic S4 Window installed"
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
            Dometic S4:<br />The Perfect View
          </h1>
          <p className="font-sans text-brand-grey text-lg max-w-2xl italic border-l-2 border-brand-orange pl-6">
            Why the S4 window system remains the first choice for professional coachbuilders and DIY converters alike.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16">
        <div className="flex gap-16">
          <div className="flex-1 min-w-0">
            
            {/* INTRO */}
            <section id="intro" className="mb-20 scroll-mt-28">
              <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white mb-6">
                The Industry Standard
              </h2>
              <div className="prose prose-invert max-w-none font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  The Dometic S4 window is a complete system. Unlike automotive glass that 
                  requires separate blinds and flyscreens, the S4 integrates everything 
                  into a single, pre-assembled frame.
                </p>
                <p>
                  It features a double-glazed acrylic pane and a polyurethane frame, 
                  making it exceptionally lightweight and much better at retaining heat 
                  than standard single-pane glass windows.
                </p>
              </div>
            </section>

            {/* INSULATION */}
            <section id="insulation" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <ShieldCheck className="w-5 h-5 text-brand-orange" />
                <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white">
                  Thermal Performance & Safety
                </h2>
              </div>
              <div className="prose prose-invert max-w-none font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  Because the S4 uses double-glazed acrylic, it creates a thermal break that 
                  virtually eliminates condensation—a major issue in UK van builds during 
                  winter.
                </p>
                <p>
                  Safety-wise, the windows feature multiple locking points and a safety 
                  catch that prevents the window from being opened from the outside. 
                  The acrylic is also impact-resistant, making it safer for off-road 
                  adventures than tempered glass.
                </p>
              </div>
            </section>

            {/* BLINDS */}
            <section id="blinds" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <Sun className="w-5 h-5 text-brand-orange" />
                <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white">
                  Integrated Blind System
                </h2>
              </div>
              <div className="font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  The "magic" of the S4 is the built-in blind and flyscreen. 
                  The blackout blind features a honeycomb structure that adds an 
                  extra layer of insulation, while the flyscreen allows for 
                  ventilation without letting insects in.
                </p>
                <p>
                  Both can be clipped together and moved simultaneously, 
                  giving you total control over light and privacy with one hand.
                </p>
              </div>
            </section>

            {/* SIZING */}
            <section id="sizing" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <Maximize2 className="w-5 h-5 text-brand-orange" />
                <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white">
                  Sizing Guide
                </h2>
              </div>
              <div className="prose prose-invert max-w-none font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  Dometic S4 windows are available in over 50 different sizes. 
                  When choosing a size, remember that the measurement refers to 
                  the **aperture size** (the hole you cut in the van), not the overall 
                  external dimensions.
                </p>
                <div className="bg-brand-carbon p-6 border border-brand-border mt-6">
                  <h4 className="font-display text-xs text-brand-white uppercase mb-2">Popular Van Sizes</h4>
                  <ul className="text-xs space-y-2">
                    <li>• 900 x 450mm: Ideal for kitchen areas and lounge sides.</li>
                    <li>• 500 x 450mm: Perfect for bedroom areas in Sprinters/Crafters.</li>
                    <li>• 700 x 300mm: Great for bathroom or high-level ventilation.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* INSTALLATION */}
            <section id="installation" className="mb-20 scroll-mt-28">
              <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white mb-6">
                Installation Overview
              </h2>
              <div className="font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  Installing an S4 window is a high-stakes task that involves cutting a 
                  large hole in your vehicle's bodywork. It requires a timber internal 
                  frame to "sandwich" the van skin between the inner and outer window 
                  frames.
                </p>
                <Link href="/guides/dometic/s4-window-installation" className="inline-flex items-center gap-2 text-brand-orange font-mono text-[10px] uppercase tracking-widest hover:gap-3 transition-all">
                  Read the Installation Guide <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </section>

            {/* RELATED PRODUCTS */}
            <div className="mt-16 pt-10 border-t border-brand-border/40">
              <RelatedProducts products={MENTIONED_PRODUCTS} />
              
              <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest mb-6 mt-16 block">Related guides</span>
              <div className="flex flex-wrap gap-4">
                <Link href="/brands/dometic" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">Dometic Hub →</Link>
                <Link href="/guides/dometic/s4-window-installation" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">Installation Guide →</Link>
              </div>
            </div>

          </div>

          <DometicSidebar items={TOC} currentPage="/guides/dometic/s4-window-guide" />
        </div>
      </div>

      <Footer />
    </main>
  );
}
