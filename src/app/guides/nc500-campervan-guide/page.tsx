import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, MapPin, Navigation, ShieldCheck, Info, CheckCircle, Map, Camera } from "lucide-react";

export const metadata: Metadata = {
  title: "NC500 Campervan Guide 2026 | Itinerary & Wild Camping | Amplios",
  description: "The ultimate North Coast 500 itinerary for campervans. We cover the best wild camping spots, single-track road etiquette, and must-see locations in Scotland.",
  openGraph: {
    title: "NC500 Campervan Guide 2026 | Itinerary & Wild Camping",
    description: "Conquer Scotland's iconic route in your van.",
    url: "https://amplios.co.uk/guides/nc500-campervan-guide",
  },
  alternates: { canonical: "https://amplios.co.uk/guides/nc500-campervan-guide" },
};

export default function NC500Guide() {
  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[60vh] flex items-end pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/cat-windows.png" // Placeholder
            alt="NC500 Campervan"
            fill
            className="object-cover opacity-30 grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian via-brand-obsidian/40 to-transparent" />
        </div>
        
        <div className="relative container mx-auto px-6 pb-20 z-10">
          <div className="max-w-4xl">
            <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em] mb-6 block leading-none">
              // THE SCOTTISH HIGHLANDS
            </span>
            <h1 className="font-display text-5xl lg:text-9xl uppercase tracking-tighter text-brand-white leading-[0.85] mb-8">
              THE<br />NORTH<br /><span className="text-brand-orange">COAST</span><br />500
            </h1>
            <p className="font-sans text-brand-grey text-lg lg:text-2xl leading-relaxed max-w-2xl italic border-l-2 border-brand-orange pl-6">
              516 miles of the most dramatic coastal scenery in Europe. 
              The NC500 is the ultimate UK road trip, but it requires respect, 
              preparation, and a capable van.
            </p>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          
          <section className="mb-24">
            <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-8">Single-Track Etiquette</h2>
            <div className="prose prose-invert max-w-none font-sans text-brand-grey text-base leading-relaxed space-y-6">
              <p>
                Much of the west coast (particularly around Applecross and Lochinver) 
                consists of single-track roads with passing places. If you are 
                driving a large LWB Sprinter or Crafter, you must understand the rules.
              </p>
              <div className="bg-brand-carbon p-8 border-l-4 border-brand-orange space-y-4">
                <h4 className="font-display text-sm uppercase text-brand-white">The Golden Rules</h4>
                <ul className="space-y-2 font-mono text-[10px] uppercase text-brand-grey">
                  <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-brand-orange" /> NEVER park in a passing place</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-brand-orange" /> If the passing place is on your left, pull into it</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-brand-orange" /> If it's on your right, wait opposite it</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-brand-orange" /> Always let faster locals overtake</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-24">
            <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-10 text-center lg:text-left">The Ultimate 7-Day Itinerary</h2>
            <div className="space-y-6">
              {[
                { day: "Day 1-2: The East Coast", route: "Inverness to John O'Groats", desc: "The fastest part of the route. Stop at Dunrobin Castle and the Whaligoe Steps. Enjoy the smooth tarmac while it lasts." },
                { day: "Day 3-4: The North Coast", route: "John O'Groats to Durness", desc: "Dramatic cliffs, white sand beaches (Smoo Cave, Balnakeil), and the stunning drive around Loch Eriboll." },
                { day: "Day 5-6: The Wild West", route: "Durness to Ullapool to Applecross", desc: "The hardest driving but the best scenery. Assynt's mountains, the Kylesku Bridge, and the notorious Bealach na Bà pass." },
                { day: "Day 7: The Return", route: "Applecross to Inverness", desc: "Crossing back through the mountains via the stunning Glen Carron." },
              ].map((item) => (
                <div key={item.day} className="p-8 border border-brand-border bg-brand-obsidian space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="font-display text-lg uppercase text-brand-white">{item.day}</h4>
                    <span className="font-mono text-[9px] text-brand-orange uppercase tracking-widest hidden md:block">{item.route}</span>
                  </div>
                  <p className="font-sans text-brand-grey text-[11px] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-24">
            <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-8">Wild Camping & Waste</h2>
            <div className="font-sans text-brand-grey text-base leading-relaxed space-y-6">
              <p>
                Scotland's outdoor access code allows for wild camping, but motorised 
                vehicles are subject to the Road Traffic Act. Many laybys now have 
                'No Overnight Parking' signs due to overcrowding.
              </p>
              <div className="flex gap-8 p-8 border border-brand-border bg-brand-carbon/50">
                <Info className="w-8 h-8 text-brand-orange flex-shrink-0" />
                <div>
                  <h4 className="font-display text-sm uppercase text-brand-white mb-2">The Chemical Toilet Crisis</h4>
                  <p className="text-sm text-brand-grey font-sans leading-relaxed">
                    The biggest issue on the NC500 is people dumping chemical toilet 
                    waste in nature or public bins. If you do not have a composting/separating 
                    toilet, you MUST book campsites every 2-3 days to empty your tank legally.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* INTERNAL LINKS */}
          <div className="p-10 bg-brand-obsidian border border-brand-border flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex-1">
              <h4 className="font-display text-xl uppercase text-brand-white mb-2">Off-Grid Toilet Guide</h4>
              <p className="font-sans text-brand-grey text-xs italic">Learn why a separating toilet is essential for wild camping the NC500.</p>
            </div>
            <Link href="/guides/best-campervan-toilet" className="bg-brand-orange text-white px-8 py-4 font-display text-xs uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all flex items-center gap-2">
              Read Toilet Guide <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}
