"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Terminal, Search, Activity, ShieldCheck, ArrowRight, Loader2 } from "lucide-react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

export default function JourneyEntryPage() {
  const [projectId, setProjectId] = useState("");
  const [searching, setSearching] = useState(false);
  const [status, setStatus] = useState("Awaiting Registry Signal...");
  const router = useRouter();
  
  const containerRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Cinematic entry animation
    gsap.fromTo(terminalRef.current, 
      { opacity: 0, y: 30, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: "power4.out", delay: 0.5 }
    );
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectId.trim()) return;
    
    setSearching(true);
    setStatus("Establishing Encrypted Connection...");
    
    // Simulate registry search for cinematic effect
    setTimeout(() => {
      setStatus("Decrypting Build Node Metadata...");
      setTimeout(() => {
        router.push(`/journey/${projectId.toUpperCase()}`);
      }, 1200);
    }, 1200);
  };

  return (
    <main className="bg-brand-obsidian min-h-screen relative overflow-hidden" ref={containerRef}>
      <Navbar />
      
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/hero-background.png" 
          alt="Workshop Background" 
          fill 
          className="object-cover opacity-20 grayscale brightness-50" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-obsidian via-transparent to-brand-obsidian" />
        <div className="blueprint-grid absolute inset-0 opacity-10 pointer-events-none" />
      </div>

      <section className="relative z-10 min-h-screen flex items-center justify-center pt-24 pb-12 px-6">
        <div className="max-w-xl w-full" ref={terminalRef}>
          <div className="blueprint-border bg-brand-obsidian/40 backdrop-blur-2xl p-12 relative overflow-hidden group">
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-brand-orange/30 group-hover:border-brand-orange transition-all duration-700" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-brand-orange/30 group-hover:border-brand-orange transition-all duration-700" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-brand-orange/30 group-hover:border-brand-orange transition-all duration-700" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-brand-orange/30 group-hover:border-brand-orange transition-all duration-700" />

            <div className="text-center mb-12">
               <div className="inline-flex items-center gap-3 px-4 py-2 bg-brand-orange/10 border border-brand-orange/30 mb-8 mx-auto">
                  <Activity className="w-4 h-4 text-brand-orange animate-pulse" />
                  <span className="font-mono text-[9px] text-brand-orange uppercase tracking-[0.4em]">Registry Uplink Active</span>
               </div>
               <h1 className="font-display text-5xl uppercase tracking-tighter mb-4 text-white">
                  TRACK YOUR <br />
                  <span className="text-brand-orange">BUILD JOURNEY</span>
               </h1>
               <p className="font-sans text-brand-grey text-sm italic">
                  Enter your unique Node ID to initialize the telemetry stream for your bespoke coachbuild.
               </p>
            </div>

            <form onSubmit={handleSearch} className="space-y-8">
               <div className="relative">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-grey">
                    <Terminal className="w-5 h-5" />
                  </div>
                  <input 
                    type="text" 
                    value={projectId}
                    onChange={(e) => setProjectId(e.target.value.toUpperCase())}
                    placeholder="Enter Project ID (e.g. AM-204)"
                    disabled={searching}
                    className="w-full bg-brand-carbon border border-brand-border py-6 pl-16 pr-6 font-mono text-xl text-brand-white focus:border-brand-orange outline-none transition-all placeholder:text-brand-grey/30"
                  />
                  {searching && (
                    <div className="absolute right-6 top-1/2 -translate-y-1/2">
                      <Loader2 className="w-5 h-5 text-brand-orange animate-spin" />
                    </div>
                  )}
               </div>

               <button 
                 type="submit"
                 disabled={searching || !projectId}
                 className="w-full group bg-brand-orange hover:bg-white text-white hover:text-brand-obsidian py-6 font-display text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-4 transition-all duration-500 shadow-xl shadow-brand-orange/10 disabled:opacity-50 disabled:cursor-not-allowed"
               >
                 {searching ? "Initializing..." : "Initialize Node Search"} <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
               </button>
            </form>

            <div className="mt-12 pt-8 border-t border-brand-border/30 flex items-center justify-between">
               <div className="flex items-center gap-2 font-mono text-[8px] text-brand-grey uppercase tracking-widest">
                  <ShieldCheck className="w-3 h-3 text-brand-orange" />
                  Encrypted // TLS 1.3
               </div>
               <div className="font-mono text-[8px] text-brand-grey uppercase tracking-widest animate-pulse">
                  {status}
               </div>
            </div>
          </div>

          <p className="font-mono text-[8px] text-brand-grey/40 uppercase text-center mt-12 tracking-widest leading-relaxed">
             Technical Notice: The Build Journey Tracker provides real-time telemetry from the Amplios Workshop. <br />
             Access is restricted to verified clients and registry engineers. Node IDs are case-sensitive.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
