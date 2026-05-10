import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, HelpCircle, Heart, Brain, Wallet, Wrench, CheckCircle, Info } from "lucide-react";

export const metadata: Metadata = {
  title: "Should I Build My Own Motorhome? | The Honest UK Guide | Amplios",
  description: "Is a DIY van conversion right for you? We explore costs, time, skills, and the genuine pros/cons of building vs buying a factory motorhome.",
  openGraph: {
    title: "Should I Build My Own Motorhome? | The Honest UK Guide | Amplios",
    description: "The honest truth before you buy a van. Is DIY right for you?",
    url: "https://amplios.co.uk/guides/should-i-convert-a-van",
  },
  alternates: { canonical: "https://amplios.co.uk/guides/should-i-convert-a-van" },
};

export default function ShouldIConvertGuide() {
  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[60vh] flex items-end pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/cat-windows.png" // Placeholder
            alt="Should I convert a van?"
            fill
            className="object-cover opacity-20 grayscale-[0.5]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian via-brand-obsidian/40 to-transparent" />
        </div>
        
        <div className="relative container mx-auto px-6 pb-20 z-10">
          <div className="max-w-4xl">
            <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em] mb-6 block leading-none">
              // THE HONEST ANSWER
            </span>
            <h1 className="font-display text-5xl lg:text-9xl uppercase tracking-tighter text-brand-white leading-[0.85] mb-8">
              THE<br />QUESTION:<br /><span className="text-brand-orange">BUILD</span><br />OR BUY?
            </h1>
            <p className="font-sans text-brand-grey text-lg lg:text-2xl leading-relaxed max-w-2xl italic border-l-2 border-brand-orange pl-6">
              A DIY conversion is one of the most rewarding projects you'll ever 
              undertake. It's also one of the hardest. Before you buy the van, 
              ask yourself these four questions.
            </p>
          </div>
        </div>
      </section>

      {/* THE FOUR QUESTIONS */}
      <section className="py-32 bg-brand-carbon">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {[
              { icon: Wallet, title: "Can you afford it?", desc: "A DIY build is rarely 'cheaper' than an equivalent used factory motorhome. The value is in the bespoke quality, not the bottom line." },
              { icon: Heart, title: "Do you have the patience?", desc: "You will be working in a cold metal box on dark winter nights. If you enjoy the process as much as the destination, you'll succeed." },
              { icon: Wrench, title: "What are your skills?", desc: "You don't need to be a master joiner, but you need to be willing to learn electrics, plumbing, and gas safety from scratch." },
              { icon: Brain, title: "What is your lifestyle?", desc: "Do you need a weekend getaway or a full-time office on wheels? A self-build allows you to prioritize what matters to YOU." },
            ].map((q) => (
              <div key={q.title} className="p-10 border border-brand-border bg-brand-obsidian hover:border-brand-orange transition-colors group">
                <q.icon className="w-8 h-8 text-brand-grey group-hover:text-brand-orange transition-colors mb-6" />
                <h3 className="font-display text-2xl uppercase text-brand-white mb-4">{q.title}</h3>
                <p className="font-sans text-brand-grey text-sm leading-relaxed">{q.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="py-32 bg-brand-obsidian">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-24">
            <h2 className="font-display text-4xl uppercase tracking-tight text-brand-white mb-6">Build vs Buy</h2>
            <div className="w-20 h-1 bg-brand-orange mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h3 className="font-display text-xl uppercase text-brand-orange mb-8">The Self-Build Case</h3>
              <ul className="space-y-6">
                {[
                  "Complete control over system quality (Victron vs cheap components)",
                  "Layout designed around your specific gear (bikes, boards, pets)",
                  "Higher spec insulation and winter capability",
                  "Deep satisfaction of 'I built this' when you're off-grid",
                ].map(item => (
                  <li key={item} className="flex gap-4 items-start">
                    <CheckCircle className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                    <span className="font-sans text-brand-grey text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-display text-xl uppercase text-brand-white mb-8">The Factory Case</h3>
              <ul className="space-y-6">
                {[
                  "Easier to finance and often better resale value",
                  "Ready to use immediately — no lost summers building",
                  "Standardized parts and easier for many garages to service",
                  "Lightweight construction (often higher payload than DIY)",
                ].map(item => (
                  <li key={item} className="flex gap-4 items-start">
                    <Info className="w-5 h-5 text-brand-grey flex-shrink-0 mt-0.5" />
                    <span className="font-sans text-brand-grey text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-32 bg-brand-carbon border-t border-brand-border">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-display text-4xl lg:text-7xl uppercase tracking-tighter text-brand-white mb-8 leading-none">
            READY TO<br /><span className="text-brand-orange">START</span> PLANNING?
          </h2>
          <p className="font-sans text-brand-grey text-lg mb-12 max-w-2xl mx-auto italic">
            If you've decided to build, the next step is choosing your van. 
            Explore our vehicle comparison guide to find your perfect platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/guides/van-size-guide" className="bg-brand-orange text-white px-10 py-5 font-display text-sm uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all">
              Van Size Guide
            </Link>
            <Link href="/planner" className="bg-transparent border-2 border-brand-white text-brand-white px-10 py-5 font-display text-sm uppercase tracking-widest hover:bg-white hover:text-brand-obsidian transition-all">
              Build Planner
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
