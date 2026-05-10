import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, Box, Zap, ShieldCheck, Info, CheckCircle, Gauge, Layout } from "lucide-react";

export const metadata: Metadata = {
  title: "LWB Fiat Ducato Conversion Layouts | Boxer & Relay Guide | Amplios",
  description: "Why the Fiat Ducato is the king of width-ways sleeping. The best layouts for L2, L3, and L4 models in the UK.",
  openGraph: {
    title: "LWB Fiat Ducato Conversion Layouts | Boxer & Relay Guide",
    description: "The widest van on the market. Perfect for sideways beds and spacious kitchens.",
    url: "https://amplios.co.uk/guides/lwb-ducato-conversion-layout",
  },
  alternates: { canonical: "https://amplios.co.uk/guides/lwb-ducato-conversion-layout" },
};

export default function DucatoLayoutGuide() {
  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[50vh] flex items-end pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/cat-windows.png" // Placeholder
            alt="LWB Ducato Layouts"
            fill
            className="object-cover opacity-30 grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian via-brand-obsidian/60 to-transparent" />
        </div>
        
        <div className="relative container mx-auto px-6 pb-16 z-10">
          <div className="max-w-4xl">
            <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em] mb-4 block leading-none">
              // FIAT DUCATO, PEUGEOT BOXER, CITROEN RELAY
            </span>
            <h1 className="font-display text-4xl lg:text-7xl uppercase tracking-tighter text-brand-white leading-[0.9] mb-6">
              DUCATO:<br /><span className="text-brand-orange">SQUARE</span><br />EFFICIENCY
            </h1>
            <p className="font-sans text-brand-grey text-lg max-w-2xl italic border-l-2 border-brand-orange pl-6">
              The 'Sevel' platform (Ducato/Boxer/Relay) is the widest van you 
              can buy in the UK. Its square body makes it the easiest van 
              to convert and the most efficient for spatial design.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT SECTIONS */}
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          
          <section className="mb-24">
            <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-8">The 6ft Sideways Sleep</h2>
            <div className="prose prose-invert max-w-none font-sans text-brand-grey text-base leading-relaxed space-y-6">
              <p>
                Unlike the Sprinter or Crafter, the Ducato is wide enough for 
                almost anyone under 6ft 1" to sleep sideways without needing 
                flares. With a width of nearly **190cm**, it is the only 
                panel van that allows a standard domestic-length bed to be 
                fitted width-ways.
              </p>
              <div className="bg-brand-carbon p-8 border border-brand-border flex items-center gap-6">
                <CheckCircle className="w-8 h-8 text-brand-orange" />
                <p className="text-xs leading-relaxed italic">
                  This width-ways bed configuration saves so much floor space 
                  that an L3 (6.0m) Ducato feels more spacious inside than 
                  an LWB (6.9m) Sprinter.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-24">
            <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-10 text-center lg:text-left">Key Layouts</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { title: "L3 H2: The Classic", desc: "Fixed rear transverse bed, kitchen on the sliding door, and a full internal wet room opposite." },
                { title: "L4 H3: The Giant", desc: "The extra-long, extra-high model allows for a 'high-bed' with a gargantuan garage for motorcycles or e-bikes." },
                { title: "L2 H2: The Weekend", desc: "A shorter platform that still fits a width-ways bed, making it the ultimate stealthy, easy-to-park tourer." },
                { title: "Twin Rear Lounge", desc: "Two separate benches at the rear that convert into a massive 6ft+ bed. Perfect for long rainy days inside." },
              ].map((item) => (
                <div key={item.title} className="p-8 border border-brand-border bg-brand-carbon/50 space-y-2">
                  <h4 className="font-display text-lg uppercase text-brand-white">{item.title}</h4>
                  <p className="font-sans text-brand-grey text-[11px] leading-relaxed italic">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* INTERNAL LINKS */}
          <div className="p-10 bg-brand-obsidian border border-brand-border flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex-1">
              <h4 className="font-display text-xl uppercase text-brand-white mb-2">Ducato Specific Kits</h4>
              <p className="font-sans text-brand-grey text-xs italic">Explore our underslung water tanks and system kits designed specifically for the Ducato chassis.</p>
            </div>
            <Link href="/store/complete-kits" className="bg-brand-orange text-white px-8 py-4 font-display text-xs uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all flex items-center gap-2">
              Shop Kits <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}
