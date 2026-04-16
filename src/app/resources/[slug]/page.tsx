"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { 
  Clock, 
  BarChart, 
  BookOpen, 
  ArrowLeft, 
  ChevronRight,
  Info,
  ExternalLink,
  ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- ARTICLE 1: Conversion Cost Guide ---
const CostGuide = () => (
  <div className="space-y-16">
    <div className="prose prose-invert max-w-none">
      <p className="font-sans text-brand-grey text-lg leading-relaxed">
        Building a motorhome is theoretically as cheap or expensive as you want it to be. However, in 2026, UK material and component costs have stabilized at a higher baseline. If you want a safe, reliable, and engineering-led build that maintains its resale value, you need to budget realistically.
      </p>

      <h2 className="font-display text-3xl uppercase mt-24 mb-12">The Three Budget Tiers</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 not-prose mb-16">
        <div className="blueprint-border p-8 bg-brand-carbon">
          <h3 className="font-display text-xl mb-4 text-brand-orange uppercase italic">1. The Weekend Warrior</h3>
          <p className="font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-6 border-b border-brand-border pb-4">Budget: £3k - £7k</p>
          <ul className="space-y-3 font-sans text-xs text-brand-grey">
            <li>• Basic 12V (AGM) system</li>
            <li>• Chinese Diesel Heater</li>
            <li>• Ply/C16 timber framing</li>
            <li>• Hand-pumped water</li>
            <li>• Camper's choice windows</li>
          </ul>
        </div>
        <div className="blueprint-border p-8 bg-brand-obsidian border-brand-orange/40">
          <h3 className="font-display text-xl mb-4 text-brand-orange uppercase italic tracking-tighter">2. The Digital Nomad</h3>
          <p className="font-mono text-[10px] text-brand-orange uppercase tracking-widest mb-6 border-b border-brand-border pb-4">Budget: £12k - £20k</p>
          <ul className="space-y-3 font-sans text-xs text-brand-white">
            <li>• 200Ah Lithium + 400W Solar</li>
            <li>• Webasto/Propex Heating</li>
            <li>• Shurflo Pressure Water</li>
            <li>• Full Insulation Stack</li>
            <li>• Birch Ply Cabinetry</li>
          </ul>
        </div>
        <div className="blueprint-border p-8 bg-brand-carbon">
          <h3 className="font-display text-xl mb-4 text-brand-orange uppercase italic">3. The Off-Grid Legend</h3>
          <p className="font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-6 border-b border-brand-border pb-4">Budget: £35k - £60k+</p>
          <ul className="space-y-3 font-sans text-xs text-brand-grey">
             <li>• Full Victron (400Ah+) ecosystem</li>
             <li>• Truma Combi Hybrid Heat/Water</li>
             <li>• Full Wetroom & Shower</li>
             <li>• Precision CNC Cabinetry</li>
             <li>• Remapped & Styling (Exterior)</li>
          </ul>
        </div>
      </div>

      <h2 className="font-display text-3xl uppercase mt-24 mb-12">System Breakdown (Average Costs)</h2>
      <div className="blueprint-border overflow-hidden not-prose mb-16">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-brand-carbon border-b border-brand-border">
              <th className="p-6 font-mono text-[10px] uppercase text-brand-orange">Sub-System</th>
              <th className="p-6 font-mono text-[10px] uppercase text-brand-grey">Entry Level</th>
              <th className="p-6 font-mono text-[10px] uppercase text-brand-grey">Pro Level</th>
            </tr>
          </thead>
          <tbody className="font-sans text-sm text-brand-grey">
             <tr className="border-b border-brand-border hover:bg-brand-orange/5 transition-colors">
                <td className="p-6 text-brand-white font-bold">Electrical & Solar</td>
                <td className="p-6">£800 (AGM, Smart Relay)</td>
                <td className="p-6">£4,500+ (Lithium, Multiplus)</td>
             </tr>
             <tr className="border-b border-brand-border hover:bg-brand-orange/5 transition-colors">
                <td className="p-6 text-brand-white font-bold">Heating & Hot Water</td>
                <td className="p-6">£250 (Chinese Air Heater)</td>
                <td className="p-6">£2,200 (Truma Combi)</td>
             </tr>
             <tr className="border-b border-brand-border hover:bg-brand-orange/5 transition-colors">
                <td className="p-6 text-brand-white font-bold">Insulation & Vents</td>
                <td className="p-6">£400 (Recycled Poly + Flaps)</td>
                <td className="p-6">£1,200 (Thinsulate + MaxxFan)</td>
             </tr>
             <tr className="border-b border-brand-border hover:bg-brand-orange/5 transition-colors">
                <td className="p-6 text-brand-white font-bold">Cabinetry & Linings</td>
                <td className="p-6">£600 (Softwood + 9mm Ply)</td>
                <td className="p-6">£3,500 (Birch Ply + High-End)</td>
             </tr>
          </tbody>
        </table>
      </div>
      
      <div className="bg-brand-orange/10 p-10 border-l-4 border-l-brand-orange mb-16 not-prose italic">
         <p className="font-sans text-brand-white text-lg">
           <span className="font-display text-brand-orange block mb-2 uppercase tracking-widest text-xs font-bold">// EXPERT TIP</span>
           &quot;Build for the secondary market. A van with Victron, MaxxAir, and Thinsulate components will always retain 80%+ of its hardware value on resale. Cheap components are effectively a 100% loss.&quot;
         </p>
      </div>
    </div>
  </div>
);

// --- ARTICLE 2: First Steps (The 8-Step Build Sequence) ---
const BuildSteps = () => (
  <div className="space-y-16">
    <div className="prose prose-invert max-w-none">
       <p className="font-sans text-brand-grey text-lg leading-relaxed">
         The sequence of your build determines how many times you have to take things apart to fix a mistake you made three weeks ago. Follow this order. It was written in blood (and sawdust).
       </p>
       
       <div className="grid grid-cols-1 gap-4 not-prose mt-16">
          {[
            { step: 1, title: "STRIKE & CLEAN", desc: "Strip the van to bare metal. Remove all ply lining, flooring, and bulkhead. Scrub with sugar soap and treat every tiny speck of surface rust with a converter." },
            { step: 2, title: "CUTTING & CHASSIS", desc: "Cut your holes for windows and roof vents BEFORE you insulate. It's messy and generates metal shards. Clean carefully." },
            { step: 3, title: "SOUND DEADENING", desc: "Apply sound deadening (e.g., Silent Coat) to 30-50% of the flat metal panels. Any more is just adding weight for zero acoustic gain." },
            { step: 4, title: "CABLE RUNS", desc: "Run your conduit and main wire lines. Even if you haven't bought your battery yet, pull the lines through now. Leave 20% more space than you think you need." },
            { step: 5, title: "INSULATION & VAPOUR", desc: "The big job. 25mm-50mm of closed cell foam, Thinsulate for voids, then a 100% air-tight vapour barrier. No gaps." },
            { step: 6, title: "FLOOR & BATTENING", desc: "Insulate the floor, lay 12mm-18mm ply, and bolt your furniture battens through the floor into the chassis ribs where possible." },
            { step: 7, title: "SUB-SYSTEM INSTALL", desc: "Install your diesel heater, water tanks, and battery bank. Get the infrastructure working before you build cabinets around them." },
            { step: 8, title: "CABINETRY & FINISH", desc: "The fun part. Build your units, fit doors, and wire up the aesthetic lighting. Now it feels like home." },
          ].map((s) => (
            <div key={s.step} className="blueprint-border p-8 bg-brand-carbon flex gap-8 items-start hover:border-brand-orange transition-all group">
               <span className="font-display text-6xl text-brand-orange/20 group-hover:text-brand-orange transition-colors shrink-0">{s.step}</span>
               <div>
                  <h3 className="font-display text-xl mb-2 uppercase">{s.title}</h3>
                  <p className="font-sans text-brand-grey text-sm italic">{s.desc}</p>
               </div>
            </div>
          ))}
       </div>
    </div>
  </div>
);

// --- ARTICLE 3: DVLA Reclassification (The UK Legal Guide) ---
const DVLARules = () => (
  <div className="space-y-16">
    <div className="prose prose-invert max-w-none">
       <p className="font-sans text-brand-grey text-lg leading-relaxed">
         DVLA reclassification changed significantly in 2019. Most self-builds will no longer be changed to &quot;Motor Caravan&quot; on the V5C. This guide explains what you actually need to do to stay legal.
       </p>

       <h2 className="font-display text-3xl uppercase mt-24 mb-12">The Van/Motor Caravan Distinction</h2>
       
       <div className="bg-brand-carbon p-10 border border-brand-border mb-16 not-prose">
          <p className="font-sans text-brand-white text-md leading-relaxed">
            The DVLA will currently only reclassify a vehicle if it looks &quot;permanently like a motor caravan&quot; from the OUTSIDE. This usually requires large graphics, windows on both sides, and a high roof.
          </p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="p-4 bg-green-500/10 border border-green-500/20 text-green-500 font-mono text-xs uppercase">✓ Professional Paint/Graphics</div>
             <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 font-mono text-xs uppercase">✗ Plain White Panel Van</div>
          </div>
       </div>

       <h2 className="font-display text-3xl uppercase mt-24 mb-12">Mandatory Internal Features</h2>
       <p className="font-sans text-brand-grey">Even if you aren&apos;t reclassifying, you still want to build to these standards for safety and insurance purposes.</p>
       
       <ul className="not-prose space-y-6 mt-12 bg-brand-obsidian p-8 border border-brand-orange/20">
          {[
            { t: "Seating & Table", d: "A permanent seating area with a table that can be stowed. The seat must be fixed." },
            { t: "Sleeping Accommodation", d: "A permanent bed or one made up from seating that is at least 6ft long." },
            { t: "Cooking Facilities", d: "A fixed 2-burner hob or oven. Portable gas stoves on a magnet don't count." },
            { t: "Storage Facilities", d: "Cupboards or similar fixed storage units." },
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-4">
               <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0 mt-1" />
               <div>
                  <span className="font-display text-sm uppercase block text-brand-white">{item.t}</span>
                  <span className="font-sans text-xs text-brand-grey italic">{item.d}</span>
               </div>
            </li>
          ))}
       </ul>

       <div className="bg-brand-carbon p-10 mt-16 not-prose border-t-2 border-brand-orange">
          <h3 className="font-display text-xl mb-4 uppercase">The Insurance Loophole</h3>
          <p className="font-sans text-brand-grey text-sm leading-relaxed mb-6">
            If the DVLA refuses to change your V5C, don&apos;t panic. Many specialists (Brentacre, Adrian Flux, Safeguard) will insure a &quot;Van with Side Windows&quot; as a motorhome based on value and photos — even if the V5C still says &quot;N1 Panel Van&quot;.
          </p>
          <Link href="/resources/motorhome-insurance-guide" className="font-mono text-[10px] text-brand-orange uppercase underline">Read our Specialist Insurance Guide →</Link>
       </div>
    </div>
  </div>
);

// --- ARTICLE REGISTRY ---
const ARTICLES = {
  "conversion-cost-guide": {
    title: "The Ultimate Guide to Van Conversion Costs",
    subtitle: "Realistic UK 2026 pricing for parts, materials, and chassis.",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1000",
    category: "Planning",
    time: "20 min",
    difficulty: "Beginner",
    component: <CostGuide />
  },
  "first-steps": {
     title: "Phase 1: Your First 8 Steps to a Mobile Home",
     subtitle: "The engineering-led build sequence that avoids rookie mistakes.",
     image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1000",
     category: "Engineering",
     time: "15 min",
     difficulty: "Beginner",
     component: <BuildSteps />
  },
  "dvla-reclassification": {
     title: "DVLA Rules & Reclassification Guide",
     subtitle: "The legal landscape of campervan conversions in the UK.",
     image: "https://images.unsplash.com/photo-1544621443-42468301beaf?q=80&w=1000",
     category: "Legal",
     time: "25 min",
     difficulty: "Intermediate",
     component: <DVLARules />
  }
};

export default function ArticleTemplate() {
  const { slug } = useParams();
  const article = ARTICLES[slug as keyof typeof ARTICLES] || ARTICLES["conversion-cost-guide"];

  return (
    <main className="bg-brand-obsidian min-h-screen text-brand-white">
      <Navbar />

      {/* Article Hero */}
      <section className="relative pt-48 pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src={article.image} alt={article.title} fill className="object-cover grayscale opacity-20 blur-sm" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian via-brand-obsidian/80 to-transparent" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
           <Link href="/resources" className="inline-flex items-center gap-2 font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-12 hover:text-brand-orange transition-colors italic">
              <ArrowLeft className="w-3 h-3" /> All Resources
           </Link>
           <div className="max-w-4xl">
              <div className="flex gap-6 mb-8 font-mono text-[10px] uppercase tracking-[0.3em]">
                 <span className="text-brand-orange">// {article.category}</span>
                 <span className="text-brand-grey">Reading Time: {article.time}</span>
                 <span className="text-brand-grey">Level: {article.difficulty}</span>
              </div>
              <h1 className="font-display text-5xl lg:text-7xl mb-8 uppercase leading-none">{article.title}</h1>
              <p className="font-sans text-brand-grey text-xl lg:text-2xl leading-relaxed max-w-2xl italic">
                 {article.subtitle}
              </p>
           </div>
        </div>
      </section>

      {/* Article Content Area */}
      <section className="pb-48">
        <div className="container mx-auto px-6">
           <div className="flex flex-col lg:flex-row gap-24">
              {/* Sidebar TOC / Metadata */}
              <aside className="lg:w-80 shrink-0">
                 <div className="sticky top-32 space-y-12">
                     <div className="blueprint-border p-8 bg-brand-carbon">
                        <h4 className="font-display text-xs text-brand-orange uppercase mb-4 tracking-widest underline decoration-brand-orange/30 underline-offset-4">Technical Advisor</h4>
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 bg-brand-orange/20 flex items-center justify-center font-display text-brand-orange border border-brand-orange/30">
                              AV
                           </div>
                           <div>
                              <p className="font-display text-sm">Avorria Eng.</p>
                              <p className="font-mono text-[8px] text-brand-grey uppercase italic">Certified Specialist</p>
                           </div>
                        </div>
                     </div>
                     <div className="space-y-4">
                        <h4 className="font-display text-xs text-brand-grey uppercase mb-6 tracking-widest italic font-bold">In This Guide</h4>
                        <ul className="space-y-3 font-mono text-[9px] uppercase tracking-widest text-brand-grey italic">
                           <li className="flex items-center gap-2 italic hover:text-brand-orange cursor-pointer transition-colors"><ChevronRight className="w-2 h-2" /> Realistic Budgets</li>
                           <li className="flex items-center gap-2 italic hover:text-brand-orange cursor-pointer transition-colors"><ChevronRight className="w-2 h-2" /> Component Costs</li>
                           <li className="flex items-center gap-2 italic hover:text-brand-orange cursor-pointer transition-colors"><ChevronRight className="w-2 h-2" /> Resale Strategies</li>
                        </ul>
                     </div>
                 </div>
              </aside>

              {/* Main Article Body */}
              <div className="flex-1 max-w-3xl">
                 {article.component}
              </div>
           </div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="py-24 bg-brand-carbon border-t border-brand-border/30">
        <div className="container mx-auto px-6">
           <h2 className="font-display text-3xl mb-12 uppercase italic underline decoration-brand-orange/30">Related Intelligence</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Link href="/resources/lithium-battery-guide" className="blueprint-border p-8 hover:bg-brand-orange/5 transition-all flex items-center justify-between group h-full">
                 <div>
                    <span className="font-mono text-[8px] text-brand-orange uppercase block mb-4 italic">Next up</span>
                    <h3 className="font-display text-xl uppercase group-hover:text-brand-orange transition-colors underline underline-offset-4 decoration-brand-orange/20">The Lithium Battery Bible →</h3>
                 </div>
                 <BookOpen className="w-12 h-12 text-brand-grey/20 group-hover:text-brand-orange/20" />
              </Link>
              <Link href="/vehicles/mercedes-sprinter/buying-guide" className="blueprint-border p-8 hover:bg-brand-orange/5 transition-all flex items-center justify-between group h-full">
                 <div>
                    <span className="font-mono text-[8px] text-brand-orange uppercase block mb-4 italic">Sourcing Data</span>
                    <h3 className="font-display text-xl uppercase group-hover:text-brand-orange transition-colors underline underline-offset-4 decoration-brand-orange/20">Sprinter Buying Checklist →</h3>
                 </div>
                 <ChevronRight className="w-12 h-12 text-brand-grey/20 group-hover:text-brand-orange/20" />
              </Link>
           </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

// Add these Lucide icons to fix imports
const CheckCircle2 = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
);
