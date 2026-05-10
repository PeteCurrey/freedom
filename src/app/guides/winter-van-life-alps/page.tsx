import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, ThermometerSnowflake, ShieldCheck, Info, CheckCircle, Snowflake, Mountain } from "lucide-react";

export const metadata: Metadata = {
  title: "Winter Van Life in the Alps | Ski Season Campervan Guide | Amplios",
  description: "How to prepare your campervan for a ski season in the Alps. We cover winter tyres, snow chains, high-altitude heating, and preventing water pipes from freezing.",
  openGraph: {
    title: "Winter Van Life in the Alps | Ski Season Campervan Guide",
    description: "Surviving -15°C in a van. The ultimate ski season prep guide.",
    url: "https://amplios.co.uk/guides/winter-van-life-alps",
  },
  alternates: { canonical: "https://amplios.co.uk/guides/winter-van-life-alps" },
};

export default function WinterAlpsGuide() {
  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[50vh] flex items-end pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/sprinter.png" // Placeholder
            alt="Winter Van Life Alps"
            fill
            className="object-cover opacity-30 grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian via-brand-obsidian/60 to-transparent" />
        </div>
        
        <div className="relative container mx-auto px-6 pb-16 z-10">
          <div className="max-w-4xl">
            <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em] mb-4 block leading-none">
              // EXTREME COLD PREP
            </span>
            <h1 className="font-display text-4xl lg:text-7xl uppercase tracking-tighter text-brand-white leading-[0.9] mb-6">
              WINTER<br /><span className="text-brand-orange">IN THE</span><br />ALPS
            </h1>
            <p className="font-sans text-brand-grey text-lg max-w-2xl italic border-l-2 border-brand-orange pl-6">
              Living in a van during a ski season is the ultimate test of your 
              build quality. If you cut corners on insulation or heating, the 
              Alps will expose them immediately.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT SECTIONS */}
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          
          <section className="mb-24">
            <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-8">The Legal Requirements: Tyres & Chains</h2>
            <div className="prose prose-invert max-w-none font-sans text-brand-grey text-base leading-relaxed space-y-6">
              <p>
                In France (from Nov 1st to March 31st), and in parts of Italy, 
                Switzerland, and Austria, it is a legal requirement to have either 
                dedicated Winter Tyres (marked with 3PMSF) or carry snow chains 
                in mountainous regions.
              </p>
              <div className="bg-brand-carbon p-8 border border-brand-border space-y-4">
                <h4 className="font-display text-sm uppercase text-brand-orange mb-2 flex items-center gap-2">
                  <Snowflake className="w-4 h-4" /> 3PMSF vs M+S
                </h4>
                <p className="text-[11px] leading-relaxed">
                  "Mud and Snow" (M+S) marking is no longer legally sufficient in France. 
                  Your tyres must display the "Three Peak Mountain Snowflake" (3PMSF) 
                  symbol to be classed as a legal winter tyre. The popular BFGoodrich 
                  KO2 All-Terrain tyre has this rating.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-24">
            <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-10 text-center lg:text-left">The 3 Winter Killers</h2>
            <div className="space-y-8">
              
              {/* WATER */}
              <div className="p-8 border border-brand-border bg-brand-obsidian space-y-4">
                <h3 className="font-display text-2xl uppercase text-brand-white">1. Frozen Water Systems</h3>
                <p className="font-sans text-brand-grey text-sm leading-relaxed">
                  If your fresh water tank is underslung (outside the van), it will 
                  freeze solid at -10°C, destroying your water pump. 
                </p>
                <div className="p-4 bg-brand-carbon border-l-2 border-brand-orange mt-4">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-brand-orange block mb-2">The Solution</span>
                  <p className="font-sans text-xs text-brand-white">Fit 12V heater pads to your underslung tanks (activated via a thermostat), or build your water system entirely inside the insulated envelope of the van.</p>
                </div>
              </div>

              {/* HEATING */}
              <div className="p-8 border border-brand-border bg-brand-obsidian space-y-4">
                <h3 className="font-display text-2xl uppercase text-brand-white">2. High Altitude Diesel Heaters</h3>
                <p className="font-sans text-brand-grey text-sm leading-relaxed">
                  Standard diesel heaters (like cheap Chinese models) struggle above 1500m. 
                  The thinner air causes the fuel-to-air mixture to run 'rich', which 
                  soots up the combustion chamber and causes the heater to fail when you 
                  need it most.
                </p>
                <div className="p-4 bg-brand-carbon border-l-2 border-brand-orange mt-4">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-brand-orange block mb-2">The Solution</span>
                  <p className="font-sans text-xs text-brand-white">Buy a heater with an automatic high-altitude sensor (like the Truma Combi Diesel or Webasto Air Top 2000 STC with the altitude switch).</p>
                </div>
              </div>

              {/* CONDENSATION */}
              <div className="p-8 border border-brand-border bg-brand-obsidian space-y-4">
                <h3 className="font-display text-2xl uppercase text-brand-white">3. Condensation & Mold</h3>
                <p className="font-sans text-brand-grey text-sm leading-relaxed">
                  When it's -15°C outside and +20°C inside, every cold surface (windows, 
                  metal structural ribs) will drip with condensation from your breath. 
                  If left unchecked, this turns into black mold behind your cladding.
                </p>
                <div className="p-4 bg-brand-carbon border-l-2 border-brand-orange mt-4">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-brand-orange block mb-2">The Solution</span>
                  <p className="font-sans text-xs text-brand-white">You MUST crack your MaxxAir roof vent slightly and leave the heater running 24/7 on a low setting. Airflow is the only way to beat condensation.</p>
                </div>
              </div>

            </div>
          </section>

          {/* INTERNAL LINKS */}
          <div className="mt-20 pt-10 border-t border-brand-border/40">
            <h4 className="font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-8">Related Winter Guides</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/guides/how-to-insulate-a-van-uk" className="p-6 border border-brand-border hover:border-brand-orange transition-colors flex items-center justify-between group">
                <span className="font-display text-xs uppercase text-brand-white">Van Insulation Guide</span>
                <ArrowRight className="w-4 h-4 text-brand-orange group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/guides/campervan-heating-guide" className="p-6 border border-brand-border hover:border-brand-orange transition-colors flex items-center justify-between group">
                <span className="font-display text-xs uppercase text-brand-white">Campervan Heating Guide</span>
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
