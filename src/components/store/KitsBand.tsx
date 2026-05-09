"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function KitsBand() {
  const kits = [
    { 
      name: "Full Autonomy Electrical", 
      price: "£3,450", 
      save: "SAVE 20%",
      desc: "Victron 3kVA / 460Ah Lithium",
      image: "/images/electrical-technical.png"
    },
    { 
      name: "Off-Grid Solar Upgrade", 
      price: "£850", 
      save: "SAVE 15%",
      desc: "350W Array / MPPT / Monitoring",
      image: "/images/systems-showcase.png"
    },
    { 
      name: "Four Season Climate", 
      price: "£2,100", 
      save: "SAVE 25%",
      desc: "Diesel Heating & Insulated Water",
      image: "/images/heating-system-technical.png"
    },
  ];

  return (
    <section className="py-24 bg-[#111111] relative overflow-hidden">
      <div className="absolute inset-0 blueprint-grid opacity-5 pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-16">
          <h2 className="font-display text-4xl lg:text-5xl uppercase tracking-tighter text-white italic">
            // ENGINEERED KITS
          </h2>
          <p className="font-sans text-brand-grey text-lg mt-4 max-w-2xl">
            Save 15-25% on pre-configured system bundles. Every component guaranteed compatible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {kits.map((kit, i) => (
            <div key={i} className="bg-[#1A1A1A] border border-white/5 group hover:border-brand-orange/50 transition-all overflow-hidden flex flex-col">
              <div className="relative h-48">
                <Image src={kit.image} alt={kit.name} fill className="object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-4 right-4 bg-brand-orange text-white text-[9px] font-bold px-3 py-1 uppercase tracking-widest">
                  {kit.save}
                </div>
              </div>
              <div className="p-10 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-2xl text-white uppercase mb-2 group-hover:text-brand-orange transition-colors">{kit.name}</h3>
                  <p className="font-mono text-[9px] text-brand-grey uppercase tracking-[0.2em] mb-8">{kit.desc}</p>
                </div>
                <div className="flex justify-between items-end pt-6 border-t border-white/5">
                  <div className="space-y-1">
                    <span className="font-mono text-[8px] text-brand-grey uppercase tracking-widest block">Kit Investment</span>
                    <span className="font-display text-3xl text-white">{kit.price}</span>
                  </div>
                  <Link href="/store/kits" className="w-12 h-12 border border-brand-orange text-brand-orange flex items-center justify-center hover:bg-brand-orange hover:text-white transition-all">
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
