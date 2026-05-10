import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Search, 
  Banknote, 
  ShieldCheck,
  ArrowRight,
  Download,
  Info
} from "lucide-react";

export const metadata: Metadata = {
  title: "Buying a Mercedes Sprinter for Conversion: The 2026 UK Checklist",
  description: "Don't buy a Sprinter without this checklist. We cover the 'Black Death' injector issues, AdBlue faults, and rust points specific to UK vans.",
  openGraph: {
    title: "The Ultimate Sprinter Buying Guide | Amplios",
    description: "Vetted search links and technical inspection points for UK Sprinter buyers.",
    url: "https://amplios.co.uk/vehicles/mercedes-sprinter/buying-guide",
  },
};

export default function SprinterBuyingGuide() {
  return (
    <main className="bg-brand-obsidian min-h-screen text-brand-white">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[60vh] flex items-end pt-24 overflow-hidden border-b border-brand-border">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/sprinter-schematic.png"
            alt="Sprinter Buying Guide"
            fill
            className="object-cover opacity-20 grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian via-brand-obsidian/40 to-transparent" />
        </div>
        
        <div className="relative container mx-auto px-6 pb-20 z-10">
          <div className="max-w-4xl">
            <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em] mb-6 block leading-none">
              // BUYER'S INTEL
            </span>
            <h1 className="font-display text-5xl lg:text-9xl uppercase tracking-tighter leading-[0.85] mb-8">
              BUYING THE<br /><span className="text-brand-orange">SPRINTER</span>
            </h1>
            <p className="font-sans text-brand-grey text-lg lg:text-2xl leading-relaxed max-w-2xl italic border-l-2 border-brand-orange pl-6">
              The 2026 UK Inspection Checklist. Don't hand over your money 
              until you've checked these technical nodes.
            </p>
          </div>
        </div>
      </section>

      {/* SEARCH CONDUITS */}
      <section className="py-24 bg-brand-carbon">
         <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-12 border-b border-brand-border pb-12">
               <div>
                  <h2 className="font-display text-2xl uppercase text-white mb-2 italic tracking-tighter">Vetted Search Conduits</h2>
                  <p className="font-sans text-brand-grey text-sm italic">Direct technical pathways to active UK inventory.</p>
               </div>
               <div className="font-mono text-[9px] text-brand-orange uppercase tracking-[0.3em]">
                  Registry Filter: 2018+ // L3H3 // 317 CDI
               </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
               <a 
                 href="https://www.ebay.co.uk/sch/i.html?_nkw=mercedes+sprinter+l3h3+panel+van" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="blueprint-border p-10 bg-brand-obsidian group hover:border-brand-orange transition-all flex flex-col justify-between h-64"
               >
                  <div className="flex justify-between items-start">
                     <span className="font-display text-2xl text-white">eBay UK</span>
                     <Search className="w-5 h-5 text-brand-grey group-hover:text-brand-orange" />
                  </div>
                  <div className="py-6 border-y border-brand-border/30">
                     <p className="font-mono text-[9px] text-brand-grey uppercase mb-2">Panel Van Filter</p>
                     <p className="font-sans text-sm text-brand-grey italic">High-turnover trade and private listings. Ideal for bargain hunting.</p>
                  </div>
                  <span className="font-mono text-[10px] text-brand-orange uppercase font-bold tracking-widest group-hover:translate-x-2 transition-transform">Initialize Search →</span>
               </a>

               <a 
                 href="https://www.autotrader.co.uk/van-search?make=Mercedes-Benz&model=Sprinter" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="blueprint-border p-10 bg-brand-obsidian group hover:border-brand-orange transition-all flex flex-col justify-between h-64"
               >
                  <div className="flex justify-between items-start">
                     <span className="font-display text-2xl text-white">AutoTrader Vans</span>
                     <Search className="w-5 h-5 text-brand-grey group-hover:text-brand-orange" />
                  </div>
                  <div className="py-6 border-y border-brand-border/30">
                     <p className="font-mono text-[9px] text-brand-grey uppercase mb-2">Verified Dealerships</p>
                     <p className="font-sans text-sm text-brand-grey italic">Premium dealer inventory. Better consumer protection and FSH units.</p>
                  </div>
                  <span className="font-mono text-[10px] text-brand-orange uppercase font-bold tracking-widest group-hover:translate-x-2 transition-transform">Initialize Search →</span>
               </a>
            </div>
         </div>
      </section>

      {/* INSPECTION CHECKLIST */}
      <section className="py-32 bg-brand-obsidian">
         <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
               <div className="text-center mb-20">
                  <h2 className="font-display text-4xl lg:text-6xl uppercase tracking-tighter mb-4 italic">The <span className="text-brand-orange">Inspection</span> Nodes</h2>
                  <p className="font-sans text-brand-grey text-lg italic">Don't buy without checking these 5 critical systems.</p>
               </div>

               <div className="space-y-12">
                  
                  {/* NODE 1: BLACK DEATH */}
                  <div className="blueprint-border p-10 bg-brand-carbon border-l-4 border-l-red-500">
                     <div className="flex items-center gap-3 mb-6">
                        <AlertTriangle className="w-6 h-6 text-red-500" />
                        <h3 className="font-display text-2xl uppercase text-white tracking-tight">Node 1: "The Black Death"</h3>
                     </div>
                     <p className="font-sans text-brand-grey text-sm leading-relaxed mb-6">
                       Specific to older OM651 engines (pre-2018). Check for a hard, 
                       black, crystalline substance around the fuel injectors. This is 
                       leaked combustion gas that has hardened. It's incredibly expensive 
                       to clean if left too long.
                     </p>
                     <div className="flex items-center gap-2 font-mono text-[10px] text-red-400 uppercase tracking-widest bg-red-500/10 p-3">
                        <XCircle className="w-4 h-4" /> WALK AWAY IF PRESENT
                     </div>
                  </div>

                  {/* NODE 2: ADBLUE */}
                  <div className="blueprint-border p-10 bg-brand-carbon border-l-4 border-l-brand-orange">
                     <div className="flex items-center gap-3 mb-6">
                        <Info className="w-6 h-6 text-brand-orange" />
                        <h3 className="font-display text-2xl uppercase text-white tracking-tight">Node 2: AdBlue System (2018+)</h3>
                     </div>
                     <p className="font-sans text-brand-grey text-sm leading-relaxed mb-6">
                       Euro 6 Sprinters are notorious for AdBlue sensor and pump failures. 
                       Start the van and check for any "No Start in XXX miles" warnings. 
                       If the system has failed, it can cost £1,000+ to replace the sensors and tank.
                     </p>
                     <div className="flex items-center gap-2 font-mono text-[10px] text-brand-orange uppercase tracking-widest bg-brand-orange/10 p-3">
                        <AlertTriangle className="w-4 h-4" /> CHECK SERVICE HISTORY FOR SENSOR REPLACEMENT
                     </div>
                  </div>

                  {/* NODE 3: RUST */}
                  <div className="blueprint-border p-10 bg-brand-carbon border-l-4 border-l-brand-grey">
                     <div className="flex items-center gap-3 mb-6">
                        <ShieldCheck className="w-6 h-6 text-brand-grey" />
                        <h3 className="font-display text-2xl uppercase text-white tracking-tight">Node 3: Chassis & Rail Rust</h3>
                     </div>
                     <p className="font-sans text-brand-grey text-sm leading-relaxed mb-6">
                       Check the lower sliding door rail and the rear wheel arches. Sprinters 
                       are better than they used to be, but UK road salt still eats the lower 
                       bodywork. Look specifically for bubbling under the white paint.
                     </p>
                  </div>

               </div>

               {/* PDF DOWNLOAD */}
               <div className="mt-32 p-12 bg-brand-orange text-brand-obsidian flex flex-col md:flex-row items-center justify-between gap-8 group cursor-pointer hover:scale-[1.02] transition-transform">
                  <div>
                     <h3 className="font-display text-3xl uppercase tracking-tighter leading-none mb-2">Download Build Pack</h3>
                     <p className="font-sans font-bold text-sm uppercase tracking-widest opacity-80 italic">Full 12-Page Sprinter Buying PDF</p>
                  </div>
                  <Download className="w-12 h-12 animate-bounce" />
               </div>

            </div>
         </div>
      </section>

      {/* RECOMMENDED SPEC */}
      <section className="py-24 bg-brand-carbon border-y border-brand-border/30">
         <div className="container mx-auto px-6 text-center">
            <h2 className="font-display text-2xl uppercase text-white mb-10 tracking-widest">Our Recommended Spec</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto font-mono text-[10px] text-brand-grey uppercase">
               <div className="p-6 border border-brand-border italic">
                  <span className="block text-brand-orange mb-2 italic font-bold text-lg">2018+</span>
                  Year Range
               </div>
               <div className="p-6 border border-brand-border italic">
                  <span className="block text-brand-orange mb-2 italic font-bold text-lg">L3H3</span>
                  Chassis Code
               </div>
               <div className="p-6 border border-brand-border italic">
                  <span className="block text-brand-orange mb-2 italic font-bold text-lg">317 CDI</span>
                  Engine Node
               </div>
               <div className="p-6 border border-brand-border italic">
                  <span className="block text-brand-orange mb-2 italic font-bold text-lg">80k-150k</span>
                  Mileage Window
               </div>
            </div>
         </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-32 text-center">
         <div className="container mx-auto px-6">
            <h2 className="font-display text-4xl lg:text-6xl uppercase tracking-tighter mb-12 italic text-brand-white">FOUND YOUR VAN?<br /><span className="text-brand-orange">PLAN THE BUILD.</span></h2>
            <Link href="/planner?vehicle=mercedes-sprinter" className="inline-flex items-center gap-4 bg-brand-orange text-white px-12 py-6 font-display text-sm uppercase tracking-widest hover:scale-105 transition-transform italic font-bold">
               Enter Build Planner <ArrowRight className="w-5 h-5" />
            </Link>
         </div>
      </section>

      <Footer />
    </main>
  );
}
