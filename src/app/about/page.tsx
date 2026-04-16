import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { ExternalLink, Mail, MapPin } from "lucide-react";

export const metadata = {
  title: "Our Story | DIY Motorhomes",
  description: "DIY Motorhomes is the UK's definitive resource for serious self-build motorhome and campervan conversions. Engineering-first guides, no compromise.",
};

export default function AboutPage() {
  return (
    <main className="bg-brand-obsidian">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-48 pb-32 overflow-hidden">
        <div className="blueprint-grid absolute inset-0 opacity-10 pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <p className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.3em] mb-8">
              // WHO WE ARE
            </p>
            <h1 className="font-display text-7xl lg:text-9xl mb-8 uppercase leading-none tracking-tighter">
              OUR <span className="text-brand-orange">STORY</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-32 border-t border-brand-border/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-7">
              <p className="font-sans text-brand-white text-2xl lg:text-3xl leading-relaxed mb-12">
                DIY Motorhomes is the UK&apos;s definitive resource for serious self-build 
                motorhome and campervan conversions.
              </p>
              <div className="space-y-8 font-sans text-brand-grey text-lg leading-relaxed">
                <p>
                  We exist because the self-build community deserves better than forum threads from 2012 
                  and affiliate blogs written by people who&apos;ve never crimped a terminal. Every guide 
                  is engineering-first. Every product recommendation is based on real-world testing. 
                  Every blueprint is built to be pinned to your workshop wall.
                </p>
                <p>
                  We don&apos;t romanticise van life. We engineer it. There&apos;s a meaningful difference between 
                  a van that looks good on Instagram and a van that runs lithium off-grid through an 
                  Alpine winter, heats to 22°C in -10°C ambient, and carries you 100,000 miles without 
                  breaking a sweat.
                </p>
                <p>
                  That difference is knowledge. We&apos;ve built the platform to give it to you.
                </p>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="blueprint-border bg-brand-carbon p-12 relative overflow-hidden">
                <div className="blueprint-grid absolute inset-0 opacity-20 pointer-events-none" />
                <div className="relative z-10 space-y-8">
                  {[
                    { label: "Base Vehicles Profiled", value: "6" },
                    { label: "Build Systems Documented", value: "6" },
                    { label: "Configurator Steps", value: "10" },
                    { label: "Blueprint Tiers", value: "3" },
                  ].map((stat) => (
                    <div key={stat.label} className="flex justify-between items-end border-b border-brand-border/30 pb-8 last:border-none last:pb-0">
                      <span className="font-mono text-[10px] text-brand-grey uppercase tracking-widest">{stat.label}</span>
                      <span className="font-display text-4xl text-brand-orange">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-32 bg-brand-carbon border-y border-brand-border/30">
        <div className="container mx-auto px-6">
          <h2 className="font-display text-[10px] uppercase text-brand-grey tracking-[0.4em] mb-16 italic">// Our Engineering Philosophy</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "No Fluff",
                body: "We don't pad guides to hit word counts. If something can be said in 50 words, we say it in 50 words. Your time is finite. Your build timeline is not."
              },
              {
                title: "Real Testing",
                body: "Every system recommendation has been used in a real build, in a real vehicle, in real conditions. We don't recommend hardware we haven't seen perform."
              },
              {
                title: "Safety First",
                body: "Gas Safe. Correct fusing. Thermal bridging. Payload limits. The boring stuff that keeps you alive. We cover it in every guide, because ignoring it kills people."
              }
            ].map((item) => (
              <div key={item.title} className="space-y-4">
                <div className="w-8 h-px bg-brand-orange" />
                <h3 className="font-display text-2xl uppercase">{item.title}</h3>
                <p className="font-sans text-brand-grey leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Avorria Family */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            <h2 className="font-display text-4xl uppercase mb-8">Part of the <span className="text-brand-orange">Avorria</span> Family</h2>
            <p className="font-sans text-brand-grey text-lg leading-relaxed mb-12">
              DIY Motorhomes is built and maintained by{" "}
              <a href="https://avorria.com" target="_blank" rel="noopener noreferrer" className="text-brand-orange hover:text-brand-white transition-colors">
                Avorria
              </a>
              {" "}— a premium digital design and development agency based in Chesterfield, Derbyshire. 
              Avorria specialises in building high-performance digital experiences for ambitious brands and 
              founder-led businesses that refuse to look average.
            </p>
            <a 
              href="https://avorria.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-brand-orange border-b border-brand-orange/30 pb-2 hover:border-brand-orange transition-all"
            >
              Visit Avorria <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-32 bg-brand-carbon border-t border-brand-border/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-5">
              <h2 className="font-display text-5xl uppercase mb-8">GET IN <span className="text-brand-orange">TOUCH</span></h2>
              <p className="font-sans text-brand-grey text-lg leading-relaxed mb-12">
                Whether you have a technical question, a partnership enquiry, or want to submit your 
                build to the community showcase — we read every message.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Mail className="w-4 h-4 text-brand-orange" />
                  <span className="font-mono text-[11px] text-brand-grey">hello@diymotorhomes.co.uk</span>
                </div>
                <div className="flex items-center gap-4">
                  <MapPin className="w-4 h-4 text-brand-orange" />
                  <span className="font-mono text-[11px] text-brand-grey">Chesterfield, Derbyshire, UK</span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-mono text-[9px] text-brand-grey uppercase tracking-widest mb-3">Your Name</label>
                    <input
                      type="text"
                      className="w-full bg-brand-obsidian border border-brand-border p-4 font-mono text-xs text-brand-white focus:outline-none focus:border-brand-orange transition-colors"
                      placeholder="First Last"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[9px] text-brand-grey uppercase tracking-widest mb-3">Email Address</label>
                    <input
                      type="email"
                      className="w-full bg-brand-obsidian border border-brand-border p-4 font-mono text-xs text-brand-white focus:outline-none focus:border-brand-orange transition-colors"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-mono text-[9px] text-brand-grey uppercase tracking-widest mb-3">Subject</label>
                  <input
                    type="text"
                    className="w-full bg-brand-obsidian border border-brand-border p-4 font-mono text-xs text-brand-white focus:outline-none focus:border-brand-orange transition-colors"
                    placeholder="Technical question / Partnership / Build submission"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[9px] text-brand-grey uppercase tracking-widest mb-3">Message</label>
                  <textarea
                    rows={6}
                    className="w-full bg-brand-obsidian border border-brand-border p-4 font-mono text-xs text-brand-white focus:outline-none focus:border-brand-orange transition-colors resize-none"
                    placeholder="Tell us about your project, question, or enquiry..."
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full py-5 bg-brand-orange text-white font-display text-xs uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
