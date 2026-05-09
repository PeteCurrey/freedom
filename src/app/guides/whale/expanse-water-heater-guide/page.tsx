import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RelatedProducts } from "@/components/editorial/RelatedProducts";
import { WhaleSidebar } from "@/components/editorial/WhaleSidebar";
import { ArrowRight, Droplets, Zap, ShieldCheck, Info, Thermometer } from "lucide-react";

export const metadata: Metadata = {
  title: "Whale Expanse Guide | Underslung Water Heating | Amplios",
  description: "Our technical guide to the Whale Expanse water heater. Why an underslung 8L tank is the perfect space-saving solution for small vans.",
  openGraph: {
    title: "Whale Expanse Guide | Underslung Water Heating",
    description: "Gas and electric water heating from beneath your van. Explore the Expanse.",
    url: "https://amplios.co.uk/guides/whale/expanse-water-heater-guide",
  },
  alternates: { canonical: "https://amplios.co.uk/guides/whale/expanse-water-heater-guide" },
};

const TOC = [
  { id: "intro", label: "The Underslung Solution" },
  { id: "power", label: "Gas & Electric Modes" },
  { id: "capacity", label: "Recovery Times" },
  { id: "frost", label: "Winter Protection" },
  { id: "verdict", label: "The Verdict" },
];

const MENTIONED_PRODUCTS = [
  { name: "Whale Expanse Water Heater", brand: "Whale", price: 89500, slug: "whale-expanse-underslung-gas-electric-water-heater" },
  { name: "Whale Control Panel", brand: "Whale", price: 12500, slug: "whale-ivory-control-panel-set" },
  { name: "Fogstar Drift 105Ah", brand: "Fogstar", price: 42900, slug: "fogstar-drift-105ah-lithium-lifepo4-leisure-battery" },
];

export default function WhaleExpanseGuide() {
  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[50vh] flex items-end pt-24">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/cat-plumbing.png" // Placeholder
            alt="Whale Expanse Water Heater"
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
            Expanse:<br />Water Heating Redefined
          </h1>
          <p className="font-sans text-brand-grey text-lg max-w-2xl italic border-l-2 border-brand-orange pl-6">
            The only high-performance water heater that mounts outside your van. Clear your cupboards and keep your water hot.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16">
        <div className="flex gap-16">
          <div className="flex-1 min-w-0">
            
            {/* INTRO */}
            <section id="intro" className="mb-20 scroll-mt-28">
              <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white mb-6">
                The Underslung Solution
              </h2>
              <div className="prose prose-invert max-w-none font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  Most water heaters, like the Truma Ultrastore, require a large 
                  cutout in a kitchen or bed cabinet. The Whale Expanse is different. 
                  By mounting it beneath the vehicle, you reclaim nearly 0.1m³ of 
                  internal storage—a significant amount in a SWB camper.
                </p>
              </div>
            </section>

            {/* POWER */}
            <section id="power" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <Zap className="w-5 h-5 text-brand-orange" />
                <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white">
                  Gas & Electric Versatility
                </h2>
              </div>
              <div className="prose prose-invert max-w-none font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  The Expanse offers three power modes:
                </p>
                <ul className="text-xs space-y-2 list-disc pl-5">
                  <li>**Gas Only:** For off-grid wild camping. Rapid 1.35kW burner.</li>
                  <li>**Electric Only:** Uses 750W or 1500W (selectable) when on 230V hookup.</li>
                  <li>**Combined:** Use both gas and electric for the fastest possible heat-up time.</li>
                </ul>
              </div>
            </section>

            {/* CAPACITY */}
            <section id="capacity" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <Droplets className="w-5 h-5 text-brand-orange" />
                <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white">
                  Recovery Times
                </h2>
              </div>
              <div className="font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  With an 8-litre capacity, the Expanse is perfect for washing up 
                  and quick showers. In combined mode, it can heat water from 
                  15°C to 70°C in just **12 minutes**. Once the tank is depleted, 
                  the recovery time is among the fastest in the industry.
                </p>
              </div>
            </section>

            {/* FROST */}
            <section id="frost" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <Thermometer className="w-5 h-5 text-brand-orange" />
                <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white">
                  Intelligent Frost Protection
                </h2>
              </div>
              <div className="prose prose-invert max-w-none font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  Because it is mounted outside, frost protection is vital. The Expanse 
                  features a built-in sensor that automatically triggers a low-power 
                  heating cycle if the water temperature drops near freezing, 
                  protecting the tank and your plumbing from damage.
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
                    9.4
                  </div>
                  <div>
                    <h4 className="font-display text-lg uppercase text-brand-white">The Space-Saver</h4>
                    <p className="font-mono text-[10px] text-brand-grey uppercase">Precision Engineering</p>
                  </div>
                </div>
                <p className="font-sans text-brand-grey text-base leading-relaxed">
                  If your van layout is tight and you need hot water, the Whale Expanse 
                  is a game-changer. It is well-built, reliable, and the ability 
                  to mount it underslung is a huge competitive advantage over 
                  traditional internal heaters.
                </p>
              </div>
            </section>

            {/* RELATED PRODUCTS */}
            <div className="mt-16 pt-10 border-t border-brand-border/40">
              <RelatedProducts products={MENTIONED_PRODUCTS} />
              
              <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest mb-6 mt-16 block">Related guides</span>
              <div className="flex flex-wrap gap-4">
                <Link href="/brands/whale" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">Whale Hub →</Link>
                <Link href="/guides/whale/expanse-installation" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">Installation Guide →</Link>
              </div>
            </div>

          </div>

          <WhaleSidebar items={TOC} currentPage="/guides/whale/expanse-water-heater-guide" />
        </div>
      </div>

      <Footer />
    </main>
  );
}
