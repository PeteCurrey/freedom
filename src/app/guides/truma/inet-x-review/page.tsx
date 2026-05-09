import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RelatedProducts } from "@/components/editorial/RelatedProducts";
import { TrumaSidebar } from "@/components/editorial/TrumaSidebar";
import { ArrowRight, Smartphone, Monitor, Wifi, ShieldCheck, Info } from "lucide-react";

export const metadata: Metadata = {
  title: "Truma iNet X Review | The Future of Van Control | Amplios",
  description: "Our in-depth review of the Truma iNet X system. Control your van's heating, water, and AC from a central touchscreen or smartphone app.",
  openGraph: {
    title: "Truma iNet X Review | The Future of Van Control",
    description: "The ultimate smart control panel for Truma systems. App connectivity, remote monitoring, and more.",
    url: "https://amplios.co.uk/guides/truma/inet-x-review",
    images: [{ url: "/images/truma/inet-x-hero.png" }],
  },
  alternates: { canonical: "https://amplios.co.uk/guides/truma/inet-x-review" },
};

const TOC = [
  { id: "intro", label: "What is iNet X?" },
  { id: "interface", label: "Interface & Experience" },
  { id: "app", label: "The Truma App" },
  { id: "compatibility", label: "Compatibility" },
  { id: "verdict", label: "Is it worth the upgrade?" },
];

const MENTIONED_PRODUCTS = [
  { name: "Truma iNet X Panel", brand: "Truma", price: 24500, slug: "truma-inet-x-central-control-panel" },
  { name: "Truma Combi 4E Kit", brand: "Truma", price: 184500, slug: "truma-combi-4e-lpg-electric-air-water-heater" },
  { name: "Cerbo GX", brand: "Victron Energy", price: 29500, slug: "victron-cerbo-gx" },
];

export default function TrumaINetXReview() {
  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[50vh] flex items-end pt-24">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/truma/inet-x-hero.png"
            alt="Truma iNet X control panel"
            fill
            className="object-cover opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian via-brand-obsidian/40 to-transparent" />
        </div>
        
        <div className="relative container mx-auto px-6 pb-16 z-10">
          <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em] mb-4 block">
            // EXPERT REVIEW
          </span>
          <h1 className="font-display text-4xl lg:text-6xl uppercase tracking-tight text-brand-white leading-[1] mb-4">
            Truma iNet X:<br />The Smart Van Hub
          </h1>
          <p className="font-sans text-brand-grey text-lg max-w-2xl italic border-l-2 border-brand-orange pl-6">
            Moving beyond simple dials into a fully connected ecosystem. Is the iNet X the brain your van build needs?
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16">
        <div className="flex gap-16">
          <div className="flex-1 min-w-0">
            
            {/* INTRO */}
            <section id="intro" className="mb-20 scroll-mt-28">
              <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white mb-6">
                What is the iNet X System?
              </h2>
              <div className="prose prose-invert max-w-none font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  For years, the **Truma CP Plus** was the industry standard. It did the job, but it felt 
                  dated. The **iNet X** is Truma's response to the growing demand for smart, integrated 
                  control in campervans and motorhomes.
                </p>
                <p>
                  It's more than just a thermostat; it's an open system designed to act as a central 
                  operating system for your entire vehicle. It currently controls Truma heating and 
                  air conditioning, but it's built to eventually integrate with 3rd party components 
                  like lighting and battery monitors.
                </p>
              </div>
            </section>

            {/* INTERFACE */}
            <section id="interface" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <Monitor className="w-5 h-5 text-brand-orange" />
                <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white">
                  Interface & User Experience
                </h2>
              </div>
              <div className="prose prose-invert max-w-none font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  The hardware features a high-resolution colour touchscreen that remains readable even 
                  in direct sunlight. The menu structure is flat and intuitive—no more digging through 
                  cryptic sub-menus to find the 'Boost' function.
                </p>
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div className="p-6 border border-brand-border bg-brand-carbon">
                    <h4 className="font-display text-xs text-brand-white uppercase mb-2 text-brand-orange">Pros</h4>
                    <ul className="text-xs space-y-2">
                      <li>• Fluid touchscreen response</li>
                      <li>• Plain English error descriptions (no more 'E 517 H' codes)</li>
                      <li>• Modern, sleek aesthetic</li>
                    </ul>
                  </div>
                  <div className="p-6 border border-brand-border bg-brand-carbon">
                    <h4 className="font-display text-xs text-brand-white uppercase mb-2 text-brand-orange">Cons</h4>
                    <ul className="text-xs space-y-2">
                      <li>• Slightly larger footprint than CP Plus</li>
                      <li>• Requires a 12V supply (won't run on data cable alone)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* APP */}
            <section id="app" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <Smartphone className="w-5 h-5 text-brand-orange" />
                <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white">
                  The Truma App
                </h2>
              </div>
              <div className="font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  The iNet X comes with Bluetooth connectivity as standard. By pairing it with the **Truma iNet X App**, 
                  you can control your heating from bed or adjust the hot water while you're sitting outside 
                  the van.
                </p>
                <p>
                  Crucially, the app allows for **remote updates**. Truma can push new features and 
                  compatibility patches directly to your panel over-the-air, meaning the system 
                  gets better over time without needing a hardware swap.
                </p>
              </div>
            </section>

            {/* COMPATIBILITY */}
            <section id="compatibility" className="mb-20 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <Wifi className="w-5 h-5 text-brand-orange" />
                <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white">
                  Compatibility & Installation
                </h2>
              </div>
              <div className="font-sans text-brand-grey text-base leading-relaxed space-y-4">
                <p>
                  The iNet X is designed to be **retrofit-compatible** with almost all modern Truma Combi 
                  and VarioHeat units. If your heater has a grey cowl, it's almost certainly compatible. 
                  Older units (black cowl) may require a PCB upgrade.
                </p>
                <div className="bg-brand-carbon p-6 border border-brand-border">
                  <h4 className="font-display text-xs uppercase text-brand-white mb-2 flex items-center gap-2">
                    <Info className="w-3 h-3 text-brand-orange" />
                    Bespoke Integration
                  </h4>
                  <p className="text-xs">While it works perfectly with Truma products, it doesn't yet replace a full power management system like the Victron Cerbo GX. For now, we recommend using both for a truly top-tier build.</p>
                </div>
              </div>
            </section>

            {/* VERDICT */}
            <section id="verdict" className="mb-20 scroll-mt-28">
              <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white mb-6">
                The Verdict: Is it worth it?
              </h2>
              <div className="p-8 bg-brand-carbon border border-brand-border">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-brand-orange text-brand-obsidian font-display text-2xl font-black w-12 h-12 flex items-center justify-center rounded-sm">
                    9.0
                  </div>
                  <div>
                    <h4 className="font-display text-lg uppercase text-brand-white">Highly Recommended</h4>
                    <p className="font-mono text-[10px] text-brand-grey uppercase">Best-in-class control</p>
                  </div>
                </div>
                <p className="font-sans text-brand-grey text-base leading-relaxed">
                  If you are building a premium van, the iNet X is a no-brainer. The improved interface 
                  and error diagnostics alone are worth the small price premium over the CP Plus. 
                  The fact that it's future-proofed for more integrations makes it the definitive choice 
                  for modern builders.
                </p>
              </div>
            </section>

            {/* RELATED PRODUCTS */}
            <div className="mt-16 pt-10 border-t border-brand-border/40">
              <RelatedProducts products={MENTIONED_PRODUCTS} />
              
              <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest mb-6 mt-16 block">Related guides</span>
              <div className="flex flex-wrap gap-4">
                <Link href="/brands/truma" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">Truma Brand Hub →</Link>
                <Link href="/guides/truma/combi-4e-guide" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">Combi 4E Guide →</Link>
                <Link href="/guides/truma/combi-installation" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">Installation Guide →</Link>
              </div>
            </div>

          </div>

          <TrumaSidebar items={TOC} currentPage="/guides/truma/inet-x-review" />
        </div>
      </div>

      <Footer />
    </main>
  );
}
