import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, CheckCircle, Info, Map, Home, Tent, Ruler, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Which Van Size is Right for You? | Small vs Large Van Guide | Amplios",
  description: "Choosing the right van size is the biggest decision in any build. Explore our lifestyle profiles for Weekend Warriors, Tourers, and Full-Timers.",
  openGraph: {
    title: "Which Van Size is Right for You? | Small vs Large Van Guide",
    description: "The honest truth about van sizes. Which one fits your life?",
    url: "https://amplios.co.uk/guides/van-size-guide",
  },
  alternates: { canonical: "https://amplios.co.uk/guides/van-size-guide" },
};

export default function VanSizeGuide() {
  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[70vh] flex items-end pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/cat-windows.png" // Placeholder
            alt="Van Size Comparison"
            fill
            className="object-cover opacity-30 grayscale-[0.2]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian via-brand-obsidian/40 to-transparent" />
        </div>
        
        <div className="relative container mx-auto px-6 pb-20 z-10 text-center lg:text-left">
          <div className="max-w-4xl">
            <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em] mb-6 block leading-none">
              // THE BIGGEST DECISION
            </span>
            <h1 className="font-display text-5xl lg:text-9xl uppercase tracking-tighter text-brand-white leading-[0.85] mb-8">
              SIZE<br />MATTERS:<br /><span className="text-brand-orange">LIFESTYLE</span><br />FIRST
            </h1>
            <p className="font-sans text-brand-grey text-lg lg:text-2xl leading-relaxed max-w-2xl italic border-l-2 border-brand-orange pl-6 mx-auto lg:mx-0">
              Choosing your van isn't just about dimensions. It's about how you 
              intend to live, travel, and park. Start with your lifestyle, 
              not the brochure.
            </p>
          </div>
        </div>
      </section>

      {/* THREE PROFILES SECTION */}
      <section className="py-32 bg-brand-carbon relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="font-display text-4xl uppercase tracking-tight text-brand-white mb-6">The Three Lifestyle Profiles</h2>
            <div className="w-20 h-1 bg-brand-orange mx-auto" />
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            
            {/* PROFILE 1: WEEKEND WARRIOR */}
            <div className="flex flex-col">
              <div className="relative aspect-[4/5] bg-brand-obsidian border border-brand-border mb-8 group overflow-hidden">
                <Image
                  src="/images/cat-windows.png"
                  alt="Weekend Warrior Van"
                  fill
                  className="object-cover opacity-50 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-brand-obsidian to-transparent">
                  <span className="font-mono text-[10px] text-brand-orange uppercase tracking-widest mb-2 block">Profile 01</span>
                  <h3 className="font-display text-3xl uppercase text-brand-white leading-none">Weekend<br />Warrior</h3>
                </div>
              </div>
              <div className="flex-1 space-y-6">
                <p className="font-sans text-brand-grey text-sm leading-relaxed">
                  The couple who camp, but don't live on the road. You prioritize 
                  easy parking, daily driver capability, and spontaneity.
                </p>
                <div className="bg-brand-obsidian p-6 border border-brand-border space-y-4">
                  <div className="flex items-center gap-3">
                    <Tent className="w-4 h-4 text-brand-orange" />
                    <span className="font-mono text-[10px] text-brand-white uppercase">Vans: Custom, Vivaro, Transporter</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      <span className="text-[11px] text-brand-grey">Fits in standard car parking spots</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      <span className="text-[11px] text-brand-grey">Cheaper fuel and maintenance</span>
                    </div>
                    <div className="flex items-center gap-2 text-red-400">
                      <Info className="w-3 h-3" />
                      <span className="text-[11px]">Limited standing room & storage</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* PROFILE 2: THE TOURER */}
            <div className="flex flex-col">
              <div className="relative aspect-[4/5] bg-brand-obsidian border border-brand-border mb-8 group overflow-hidden">
                <Image
                  src="/images/sprinter.png"
                  alt="The Tourer Van"
                  fill
                  className="object-cover opacity-50 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-brand-obsidian to-transparent">
                  <span className="font-mono text-[10px] text-brand-orange uppercase tracking-widest mb-2 block">Profile 02</span>
                  <h3 className="font-display text-3xl uppercase text-brand-white leading-none">The<br />Tourer</h3>
                </div>
              </div>
              <div className="flex-1 space-y-6">
                <p className="font-sans text-brand-grey text-sm leading-relaxed">
                  The sweet spot for UK builders. Enough room for a fixed bed and 
                  wet room, but still manageable on narrow coastal roads.
                </p>
                <div className="bg-brand-obsidian p-6 border border-brand-border space-y-4">
                  <div className="flex items-center gap-3">
                    <Map className="w-4 h-4 text-brand-orange" />
                    <span className="font-mono text-[10px] text-brand-white uppercase">Vans: Sprinter 144, Crafter MWB, Ducato L2</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      <span className="text-[11px] text-brand-grey">Full standing height for most adults</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      <span className="text-[11px] text-brand-grey">Dedicated toilet/shower space possible</span>
                    </div>
                    <div className="flex items-center gap-2 text-brand-orange">
                      <Info className="w-3 h-3" />
                      <span className="text-[11px]">Can be harder to park in tight towns</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* PROFILE 3: FULL TIMER */}
            <div className="flex flex-col">
              <div className="relative aspect-[4/5] bg-brand-obsidian border border-brand-border mb-8 group overflow-hidden">
                <Image
                  src="/images/cat-power.png"
                  alt="Full Timer Van"
                  fill
                  className="object-cover opacity-50 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-brand-obsidian to-transparent">
                  <span className="font-mono text-[10px] text-brand-orange uppercase tracking-widest mb-2 block">Profile 03</span>
                  <h3 className="font-display text-3xl uppercase text-brand-white leading-none">Full<br />Timer</h3>
                </div>
              </div>
              <div className="flex-1 space-y-6">
                <p className="font-sans text-brand-grey text-sm leading-relaxed">
                  If you're leaving the house behind, go large. Maximum storage, 
                  maximum systems, and zero compromises on comfort.
                </p>
                <div className="bg-brand-obsidian p-6 border border-brand-border space-y-4">
                  <div className="flex items-center gap-3">
                    <Home className="w-4 h-4 text-brand-orange" />
                    <span className="font-mono text-[10px] text-brand-white uppercase">Vans: Sprinter 170, Crafter LWB, Iveco Daily</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      <span className="text-[11px] text-brand-grey">Huge 'garage' for bikes and gear</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      <span className="text-[11px] text-brand-grey">Space for massive lithium banks</span>
                    </div>
                    <div className="flex items-center gap-2 text-red-500">
                      <Info className="w-3 h-3" />
                      <span className="text-[11px]">Restrictive parking and higher fuel costs</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* COMPARISON CHART */}
      <section className="py-32 bg-brand-obsidian border-y border-brand-border/20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-4xl uppercase tracking-tight text-brand-white mb-12">The Dimensional Trade-off</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-brand-border">
                    <th className="py-4 font-mono text-[10px] uppercase text-brand-grey">Van Class</th>
                    <th className="py-4 font-mono text-[10px] uppercase text-brand-grey">Typical Length</th>
                    <th className="py-4 font-mono text-[10px] uppercase text-brand-grey">Sleeps</th>
                    <th className="py-4 font-mono text-[10px] uppercase text-brand-grey">Parking Rank</th>
                  </tr>
                </thead>
                <tbody className="font-sans text-sm text-brand-grey">
                  <tr className="border-b border-brand-border/50 hover:bg-brand-carbon/30 transition-colors">
                    <td className="py-6 text-brand-white font-medium">Small (SWB/LWB)</td>
                    <td className="py-6">4.8m - 5.3m</td>
                    <td className="py-6">2-4 (with pop-top)</td>
                    <td className="py-6 text-green-500 font-mono text-[10px]">GOLD</td>
                  </tr>
                  <tr className="border-b border-brand-border/50 hover:bg-brand-carbon/30 transition-colors">
                    <td className="py-6 text-brand-white font-medium">Medium (MWB)</td>
                    <td className="py-6">5.4m - 6.0m</td>
                    <td className="py-6">2-3</td>
                    <td className="py-6 text-brand-orange font-mono text-[10px]">SILVER</td>
                  </tr>
                  <tr className="border-b border-brand-border/50 hover:bg-brand-carbon/30 transition-colors">
                    <td className="py-6 text-brand-white font-medium">Large (LWB/XLWB)</td>
                    <td className="py-6">6.4m - 7.3m</td>
                    <td className="py-6">2-4</td>
                    <td className="py-6 text-red-500 font-mono text-[10px]">BRONZE</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="mt-12 p-8 bg-brand-carbon border-l-4 border-brand-orange">
              <p className="font-sans text-brand-grey italic">
                "The biggest mistake I see? People buy the van they think they 
                need for a two-week trip, rather than the one they need for 
                their actual weekly lifestyle. If it's your only vehicle, 
                err on the side of smaller." — <span className="text-brand-orange font-mono text-[10px]">PETE, AMPLIOS FOUNDER</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-32 bg-brand-orange">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-display text-4xl lg:text-6xl uppercase tracking-tighter text-brand-obsidian mb-8">
            READY TO PLAN YOUR BUILD?
          </h2>
          <p className="font-sans text-brand-obsidian/80 text-lg mb-12 max-w-2xl mx-auto">
            Use our interactive Build Planner to see exactly how your chosen 
            size affects your system costs and payload.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/planner" className="bg-brand-obsidian text-white px-10 py-5 font-display text-sm uppercase tracking-widest hover:bg-white hover:text-brand-obsidian transition-all">
              Start Build Planner
            </Link>
            <Link href="/vehicles" className="bg-transparent border-2 border-brand-obsidian text-brand-obsidian px-10 py-5 font-display text-sm uppercase tracking-widest hover:bg-brand-obsidian hover:text-white transition-all">
              Compare Vehicles
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
