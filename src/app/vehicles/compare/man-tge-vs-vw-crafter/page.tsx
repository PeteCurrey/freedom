import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { 
  CheckCircle, 
  ArrowRight, 
  Scale, 
  Banknote,
  Wrench,
  BadgePercent,
  HelpCircle
} from "lucide-react";

export const metadata: Metadata = {
  title: "MAN TGE vs VW Crafter: An Honest Comparison for Conversion Builders",
  description: "They are built in the same factory with the same engines. So why is the MAN TGE cheaper? We compare price, dealer networks, and resale value for UK builders.",
  openGraph: {
    title: "MAN TGE vs VW Crafter | The Ultimate Showdown | Amplios",
    description: "Identical engineering, different badges. Which one wins for your campervan build?",
    url: "https://amplios.co.uk/vehicles/compare/man-tge-vs-vw-crafter",
  },
};

const COMPARISON_MATRIX = [
  { metric: "Base Engineering", crafter: "VW Group Foundation", tge: "Identical to Crafter", diff: false },
  { metric: "Engine Range", crafter: "2.0 TDI (102-177hp)", tge: "2.0 TDI (102-177hp)", diff: false },
  { metric: "Body Dimensions", crafter: "L1/L2/L3 H1/H2/H3", tge: "Identical Dimensions", diff: false },
  { metric: "Starting Price (Used)", crafter: "£16,000+", tge: "£12,000+", diff: true },
  { metric: "Service Network", crafter: "VW Van Centres", tge: "MAN Truck Workshops", diff: true },
  { metric: "Resale Value", crafter: "Higher (Badge Appeal)", tge: "Lower (Brand Recognition)", diff: true },
];

export default function TgeVsCrafter() {
  return (
    <main className="bg-brand-obsidian min-h-screen text-brand-white">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[60vh] flex items-end pt-24 overflow-hidden border-b border-brand-border">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/man-tge.png"
            alt="TGE vs Crafter"
            fill
            className="object-cover opacity-20 grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian via-brand-obsidian/40 to-transparent" />
        </div>
        
        <div className="relative container mx-auto px-6 pb-20 z-10 text-center">
          <div className="max-w-4xl mx-auto">
            <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em] mb-6 block leading-none">
              // THE SHOWDOWN
            </span>
            <h1 className="font-display text-5xl lg:text-8xl uppercase tracking-tighter leading-[0.85] mb-8">
              MAN TGE <span className="text-brand-orange">VS</span><br />VW CRAFTER
            </h1>
            <p className="font-sans text-brand-grey text-lg lg:text-xl leading-relaxed italic border-l-2 border-brand-orange pl-6 text-left mx-auto max-w-2xl">
              They are built in the same factory with the same engines. 
              The comparison isn't about engineering — it's about price, 
              network, and perception.
            </p>
          </div>
        </div>
      </section>

      {/* THE SHORT VERSION */}
      <section className="py-24 bg-brand-carbon">
         <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
               <div className="p-8 border-l-4 border-brand-orange bg-brand-obsidian">
                  <h3 className="font-display text-lg text-white mb-4 uppercase italic tracking-tighter">The Short Version</h3>
                  <p className="font-sans text-brand-grey text-sm leading-relaxed italic">
                    "Buy the MAN TGE if you want a high-spec Crafter at a £5,000 discount. 
                    Buy the Crafter if you want the security of the VW badge for future 
                    resale and a broader network of retail-focused dealers."
                  </p>
               </div>
               <div className="flex items-center">
                  <p className="font-mono text-[10px] text-brand-grey uppercase leading-relaxed italic">
                    Engineering Match: 100% <br />
                    Parts Compatibility: 100% <br />
                    Price Variance: 15-20%
                  </p>
               </div>
            </div>
         </div>
      </section>

      {/* SIDE-BY-SIDE MATRIX */}
      <section className="py-24 border-b border-brand-border">
         <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto overflow-x-auto">
               <table className="w-full border-collapse">
                  <thead>
                     <tr className="border-b border-brand-border">
                        <th className="text-left py-6 font-mono text-[10px] text-brand-grey uppercase tracking-widest">Metric</th>
                        <th className="text-left py-6 font-mono text-[10px] text-brand-white uppercase tracking-widest italic">VW Crafter</th>
                        <th className="text-left py-6 font-mono text-[10px] text-brand-orange uppercase tracking-widest italic">MAN TGE</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-border/30">
                     {COMPARISON_MATRIX.map(row => (
                        <tr key={row.metric} className={row.diff ? "bg-brand-orange/5" : ""}>
                           <td className="py-8 font-display text-xs text-brand-white uppercase tracking-tight">{row.metric}</td>
                           <td className="py-8 font-sans text-brand-grey text-sm">{row.crafter}</td>
                           <td className="py-8 font-sans text-brand-grey text-sm font-bold">{row.tge}</td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      </section>

      {/* DETAILED BREAKDOWN */}
      <section className="py-32">
         <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto space-y-24">
               
               {/* PRICE */}
               <div>
                  <div className="flex items-center gap-4 mb-8">
                     <Banknote className="w-8 h-8 text-brand-orange" />
                     <h2 className="font-display text-3xl uppercase tracking-tighter text-white">Price & Value</h2>
                  </div>
                  <div className="prose prose-invert max-w-none font-sans text-brand-grey text-lg leading-relaxed">
                     <p>
                        This is where the TGE wins. Because fewer private buyers search for 
                        "MAN" on AutoTrader, the prices remain closer to trade-level. You 
                        can often pick up a high-mileage TGE for the price of a basic 
                        high-mileage Transit.
                     </p>
                  </div>
               </div>

               {/* SERVICE */}
               <div>
                  <div className="flex items-center gap-4 mb-8">
                     <Wrench className="w-8 h-8 text-brand-orange" />
                     <h2 className="font-display text-3xl uppercase tracking-tighter text-white">Service Network</h2>
                  </div>
                  <div className="prose prose-invert max-w-none font-sans text-brand-grey text-lg leading-relaxed">
                     <p>
                        VW Van Centres are great for retail customers. MAN Truck Workshops 
                        are designed for logistics fleets. MAN service hours are longer, 
                        and they are generally better equipped to handle heavy-duty motorhome 
                        chassis than a small VW retail centre.
                     </p>
                  </div>
               </div>

               {/* RESALE */}
               <div>
                  <div className="flex items-center gap-4 mb-8">
                     <BadgePercent className="w-8 h-8 text-brand-orange" />
                     <h2 className="font-display text-3xl uppercase tracking-tighter text-white">Resale Perception</h2>
                  </div>
                  <div className="prose prose-invert max-w-none font-sans text-brand-grey text-lg leading-relaxed italic border-l-4 border-brand-orange pl-8">
                     <p>
                        "The only real downside to the TGE is that when you come to sell your 
                        conversion, some buyers will be looking specifically for a 'VW'. You 
                        save the money upfront, but you may have a smaller pool of buyers later. 
                        However, as the TGE becomes better known in the community, this gap 
                        is closing fast."
                     </p>
                  </div>
               </div>

            </div>
         </div>
      </section>

      {/* VERDICT */}
      <section className="py-32 bg-brand-carbon">
         <div className="container mx-auto px-6 text-center">
            <HelpCircle className="w-12 h-12 text-brand-orange mx-auto mb-8" />
            <h2 className="font-display text-5xl uppercase mb-8 italic text-brand-white tracking-tighter">The Verdict</h2>
            <div className="max-w-2xl mx-auto font-sans text-brand-grey text-xl leading-relaxed italic border-y border-brand-border/30 py-12">
               "For DIY conversion purposes, buy whichever you find first 
               at the better price. The build inside will be identical either way. 
               The engineering is a mirror image — your decision should be 
               purely financial."
            </div>
            <div className="mt-16 flex flex-wrap justify-center gap-6">
               <Link href="/vehicles/man-tge" className="px-10 py-5 bg-brand-orange text-white font-display text-xs uppercase tracking-widest hover:scale-105 transition-transform italic font-bold">
                  Explore MAN TGE →
               </Link>
               <Link href="/vehicles/vw-crafter" className="px-10 py-5 border border-brand-border text-white font-display text-xs uppercase tracking-widest hover:bg-brand-carbon transition-all italic font-bold">
                  Explore VW Crafter →
               </Link>
            </div>
         </div>
      </section>

      <Footer />
    </main>
  );
}
