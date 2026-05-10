import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, MapPin, Moon, ShieldCheck, Info, CheckCircle, Navigation, TreePine } from "lucide-react";

export const metadata: Metadata = {
  title: "Wild Camping in a Campervan UK | Rules & Apps | Amplios",
  description: "Is wild camping legal in a campervan in the UK? We explain the laws in England, Wales, and Scotland, plus the best apps for finding free overnight spots.",
  openGraph: {
    title: "Wild Camping in a Campervan UK | Rules & Apps",
    description: "The reality of off-grid van life in the UK. Where to park for free.",
    url: "https://amplios.co.uk/guides/wild-camping-uk-campervan",
  },
  alternates: { canonical: "https://amplios.co.uk/guides/wild-camping-uk-campervan" },
};

export default function WildCampingGuide() {
  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[50vh] flex items-end pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/bespoke-iveco.png" // Placeholder
            alt="Wild Camping UK"
            fill
            className="object-cover opacity-30 grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian via-brand-obsidian/60 to-transparent" />
        </div>
        
        <div className="relative container mx-auto px-6 pb-16 z-10">
          <div className="max-w-4xl">
            <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em] mb-4 block leading-none">
              // FREE OVERNIGHT PARKING
            </span>
            <h1 className="font-display text-4xl lg:text-7xl uppercase tracking-tighter text-brand-white leading-[0.9] mb-6">
              WILD<br /><span className="text-brand-orange">CAMPING</span><br />REALITY
            </h1>
            <p className="font-sans text-brand-grey text-lg max-w-2xl italic border-l-2 border-brand-orange pl-6">
              Sleeping in your van for free is the dream. But unlike Scandinavia 
              or France, the UK's laws make it a grey area. Here is how to do 
              it legally and respectfully.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT SECTIONS */}
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          
          <section className="mb-24">
            <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-8">The Legal Position</h2>
            <div className="space-y-8">
              
              <div className="p-8 border-l-4 border-red-500 bg-brand-carbon">
                <h4 className="font-display text-xl uppercase text-brand-white mb-2">England & Wales</h4>
                <p className="font-sans text-brand-grey text-sm leading-relaxed">
                  Wild camping in a motorised vehicle is generally **illegal** without the 
                  permission of the landowner. All land in England and Wales is owned by 
                  someone. However, in practice, if you park safely in a remote layby, 
                  stay for one night only, and leave no trace, you are rarely moved on. 
                  (Exceptions: National Parks and beaches are heavily patrolled).
                </p>
              </div>

              <div className="p-8 border-l-4 border-green-500 bg-brand-carbon">
                <h4 className="font-display text-xl uppercase text-brand-white mb-2">Scotland</h4>
                <p className="font-sans text-brand-grey text-sm leading-relaxed">
                  Scotland's 'Right to Roam' applies to non-motorised recreation (tents). 
                  It **does not** apply to campervans. However, the culture is much more 
                  accepting. Forestry and Land Scotland run a 'Stay the Night' scheme 
                  allowing vans in many forest car parks for free or a small fee.
                </p>
              </div>

            </div>
          </section>

          <section className="mb-24">
            <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-10 text-center lg:text-left">The 'Leave No Trace' Manifesto</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: "No External Gear", desc: "Do not put out chairs, awnings, or BBQs. You are parking, not setting up a campsite." },
                { title: "Arrive Late, Leave Early", desc: "Park up after dinner, and leave shortly after breakfast." },
                { title: "Grey Water Control", desc: "Never open your grey water drain over grass or in nature. Use proper disposal points." },
                { title: "Park Responsibly", desc: "Do not block passing places or farm gates. If it's full, move on." },
              ].map((item) => (
                <div key={item.title} className="p-8 border border-brand-border bg-brand-obsidian space-y-2">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-brand-orange" />
                    <h4 className="font-display text-base uppercase text-brand-white">{item.title}</h4>
                  </div>
                  <p className="font-sans text-brand-grey text-[11px] leading-relaxed italic pl-6">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="p-12 bg-brand-carbon border-2 border-brand-border mb-24 text-center">
            <Navigation className="w-10 h-10 text-brand-orange mx-auto mb-6" />
            <h3 className="font-display text-2xl uppercase tracking-tight text-brand-white mb-4">The Essential Apps</h3>
            <p className="font-sans text-brand-grey text-sm leading-relaxed mb-8 max-w-xl mx-auto">
              You don't need to guess where to park. Use the community-driven apps 
              to find safe spots, fresh water taps, and chemical disposal points.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <div className="px-6 py-3 border border-brand-orange text-brand-white font-mono text-xs uppercase tracking-widest">Park4Night (Global)</div>
              <div className="px-6 py-3 border border-brand-orange text-brand-white font-mono text-xs uppercase tracking-widest">Searchforsites (UK Focus)</div>
            </div>
          </section>

        </div>
      </div>

      <Footer />
    </main>
  );
}
