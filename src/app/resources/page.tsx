"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import Image from "next/image";
import { Search, BookOpen, Clock, BarChart } from "lucide-react";

const guides = [
  { slug: "conversion-cost-guide", title: "The Ultimate Guide to Van Conversion Costs", category: "Planning", time: "20 min", difficulty: "Beginner", image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1000" },
  { slug: "first-steps", title: "Phase 1: Your First 8 Steps to a Mobile Home", category: "Engineering", time: "15 min", difficulty: "Beginner", image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1000" },
  { slug: "dvla-reclassification", title: "DVLA Rules & Reclassification Guide", category: "Legal", time: "25 min", difficulty: "Intermediate", image: "https://images.unsplash.com/photo-1544621443-42468301beaf?q=80&w=1000" },
  { slug: "lithium-battery-guide", title: "Complete Guide to LiFePO4 Lithium Batteries", category: "Electrical", time: "15 min", difficulty: "Intermediate", image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1000" },
  { slug: "truma-combi-install", title: "Installing a Truma Combi: Step-by-Step", category: "Heating", time: "25 min", difficulty: "Advanced", image: "https://images.unsplash.com/photo-1590487988256-9ed24133863e?q=80&w=1000" },
  { slug: "sound-deadening-basics", title: "Sound Deadening vs Insulation: What You Need", category: "Insulation", time: "10 min", difficulty: "Beginner", image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1000" },
];

export default function ResourcesPage() {
  return (
    <main className="bg-brand-obsidian text-white">
      <Navbar />
      <section className="pt-48 pb-32">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-12 mb-16">
            <div className="max-w-2xl">
              <h1 className="font-display text-6xl lg:text-8xl mb-8">BUILD <span className="text-brand-orange">SMARTER</span></h1>
              <p className="font-sans text-brand-grey text-lg">Engineering-first guides and technical references for the serious self-builder.</p>
            </div>
            <div className="w-full lg:w-96">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-grey" />
                <input type="text" placeholder="Search guides..." className="w-full bg-brand-carbon border border-brand-border py-4 pl-12 pr-4 font-mono text-[10px] uppercase focus:border-brand-orange outline-none" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guides.map((g) => (
              <Link key={g.slug} href={`/resources/${g.slug}`} className="group blueprint-border bg-brand-carbon overflow-hidden">
                <div className="relative aspect-video overflow-hidden">
                  <Image src={g.image} alt={g.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                </div>
                <div className="p-8">
                  <div className="flex gap-4 mb-4 font-mono text-[8px] uppercase tracking-widest text-brand-grey">
                    <span className="flex items-center gap-1 text-brand-orange"><BookOpen className="w-3 h-3" /> {g.category}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {g.time}</span>
                    <span className="flex items-center gap-1"><BarChart className="w-3 h-3" /> {g.difficulty}</span>
                  </div>
                  <h3 className="font-display text-xl mb-4 group-hover:text-brand-orange transition-colors">{g.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
