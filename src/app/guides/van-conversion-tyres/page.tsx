import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, Disc, Zap, ShieldCheck, Info, CheckCircle, Gauge, Mountain } from "lucide-react";

export const metadata: Metadata = {
  title: "Best Tyres for Van Conversion UK 2026 | All-Terrain vs Highway | Amplios",
  description: "Choosing the right rubber for your campervan. We compare all-terrain tyres, load ratings, and why standard commercial tyres aren't always best for live-aboard use.",
  openGraph: {
    title: "Best Tyres for Van Conversion UK 2026 | All-Terrain vs Highway",
    description: "The ultimate guide to van conversion tyres. Grip, load, and longevity.",
    url: "https://amplios.co.uk/guides/van-conversion-tyres",
  },
  alternates: { canonical: "https://amplios.co.uk/guides/van-conversion-tyres" },
};

export default function TyreGuide() {
  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[60vh] flex items-end pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/bespoke-iveco.png" // Placeholder
            alt="Van Tyres"
            fill
            className="object-cover opacity-30 grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian via-brand-obsidian/40 to-transparent" />
        </div>
        
        <div className="relative container mx-auto px-6 pb-20 z-10">
          <div className="max-w-4xl">
            <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em] mb-6 block leading-none">
              // WHERE RUBBER MEETS THE ROAD
            </span>
            <h1 className="font-display text-5xl lg:text-9xl uppercase tracking-tighter text-brand-white leading-[0.85] mb-8">
              GRIP<br />THE<br /><span className="text-brand-orange">EARTH</span>
            </h1>
            <p className="font-sans text-brand-grey text-lg lg:text-2xl leading-relaxed max-w-2xl italic border-l-2 border-brand-orange pl-6">
              A van conversion isn't a standard delivery van. It's heavier, 
              carries a shifting load, and often goes where couriers won't. 
              Here is how to choose the right tyres for your build.
            </p>
          </div>
        </div>
      </section>

      {/* THREE TYPES SECTION */}
      <section className="py-24 bg-brand-carbon">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            
            {/* HIGHWAY */}
            <div className="p-10 border border-brand-border bg-brand-obsidian space-y-6">
              <div className="flex items-center gap-3">
                <Gauge className="w-6 h-6 text-brand-orange" />
                <h3 className="font-display text-2xl uppercase text-brand-white">Highway (HT)</h3>
              </div>
              <p className="font-sans text-brand-grey text-sm leading-relaxed">
                Optimized for tarmac, fuel economy, and silence. The standard 
                choice for those who stick to campsites and motorways.
              </p>
              <ul className="space-y-2 font-mono text-[10px] uppercase text-brand-grey">
                <li className="flex items-center gap-2 text-green-500"><CheckCircle className="w-3 h-3" /> Best fuel economy</li>
                <li className="flex items-center gap-2 text-green-500"><CheckCircle className="w-3 h-3" /> Quietest ride</li>
                <li className="flex items-center gap-2 text-red-500"><Info className="w-3 h-3" /> Useless on wet grass</li>
              </ul>
            </div>

            {/* ALL-TERRAIN */}
            <div className="p-10 border border-brand-border bg-brand-obsidian space-y-6">
              <div className="flex items-center gap-3">
                <Mountain className="w-6 h-6 text-brand-orange" />
                <h3 className="font-display text-2xl uppercase text-brand-white">All-Terrain (AT)</h3>
              </div>
              <p className="font-sans text-brand-grey text-sm leading-relaxed">
                The enthusiast's choice. Aggressive looks and actual 
                capability on mud, sand, and snow. Essential for off-grid builds.
              </p>
              <ul className="space-y-2 font-mono text-[10px] uppercase text-brand-grey">
                <li className="flex items-center gap-2 text-green-500"><CheckCircle className="w-3 h-3" /> Off-grid capability</li>
                <li className="flex items-center gap-2 text-green-500"><CheckCircle className="w-3 h-3" /> Rugged sidewalls</li>
                <li className="flex items-center gap-2 text-red-500"><Info className="w-3 h-3" /> Increased road noise</li>
              </ul>
            </div>

            {/* WINTER */}
            <div className="p-10 border border-brand-border bg-brand-obsidian space-y-6">
              <div className="flex items-center gap-3">
                <Snowflake className="w-6 h-6 text-brand-orange" />
                <h3 className="font-display text-2xl uppercase text-brand-white">Winter / 3PMSF</h3>
              </div>
              <p className="font-sans text-brand-grey text-sm leading-relaxed">
                Tyres with the 'Three Peak Mountain Snowflake' symbol. 
                Legally required in many European countries during winter.
              </p>
              <ul className="space-y-2 font-mono text-[10px] uppercase text-brand-grey">
                <li className="flex items-center gap-2 text-green-500"><CheckCircle className="w-3 h-3" /> Legal EU compliance</li>
                <li className="flex items-center gap-2 text-green-500"><CheckCircle className="w-3 h-3" /> Superior cold grip</li>
                <li className="flex items-center gap-2 text-red-500"><Info className="w-3 h-3" /> Faster wear in summer</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="container mx-auto px-6 py-32">
        <div className="max-w-4xl mx-auto">
          
          <section className="mb-24">
            <h2 className="font-display text-4xl uppercase tracking-tight text-brand-white mb-8">The Load Rating Trap</h2>
            <div className="prose prose-invert max-w-none font-sans text-brand-grey text-lg leading-relaxed space-y-6">
              <p>
                When choosing a tyre for a van conversion, the **Load Index** is 
                more important than the brand. A fully laden Sprinter or Crafter 
                can weigh 3.5 tonnes. You must ensure your tyres are rated 
                (typically 115/112 or higher) to handle the constant weight 
                of a conversion.
              </p>
              <div className="bg-brand-carbon p-8 border-l-4 border-brand-orange italic">
                "Warning: Fitting tyres with an insufficient load rating is not 
                only dangerous—it will void your insurance and fail an MOT."
              </div>
            </div>
          </section>

          {/* INTERNAL LINKS */}
          <div className="mt-20 pt-10 border-t border-brand-border/40">
            <h4 className="font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-8">Vehicle-specific tyre guides</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/guides/all-terrain-tyres-sprinter" className="p-6 border border-brand-border hover:border-brand-orange transition-colors flex items-center justify-between group">
                <span className="font-display text-xs uppercase text-brand-white">Sprinter AT Guide</span>
                <ArrowRight className="w-4 h-4 text-brand-orange group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/guides/bfgoodrich-ko2-sprinter" className="p-6 border border-brand-border hover:border-brand-orange transition-colors flex items-center justify-between group">
                <span className="font-display text-xs uppercase text-brand-white">BFGoodrich KO2 Review</span>
                <ArrowRight className="w-4 h-4 text-brand-orange group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}

function Snowflake(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="2" y1="12" x2="22" y2="12" />
      <line x1="12" y1="2" x2="12" y2="22" />
      <path d="m20 16-4-4 4-4" />
      <path d="m4 8 4 4-4 4" />
      <path d="m16 4-4 4-4-4" />
      <path d="m8 20 4-4 4 4" />
    </svg>
  );
}
