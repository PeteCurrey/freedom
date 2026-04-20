"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Terminal, Activity, ShieldCheck, ArrowRight, Loader2, Lock, UserCheck, AlertCircle } from "lucide-react";
import { gsap } from "gsap";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";

export default function JourneyEntryPage() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [builds, setBuilds] = useState<any[]>([]);
  const [status, setStatus] = useState("Initializing Encrypted Auth Layer...");
  const router = useRouter();
  
  const containerRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Cinematic entry animation
    gsap.fromTo(terminalRef.current, 
      { opacity: 0, y: 30, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: "power4.out", delay: 0.5 }
    );

    const initializeAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setStatus("ACCESS DENIED: REDIRECTING TO AUTH GATE...");
        setTimeout(() => {
          router.push("/account/login?redirect=/journey");
        }, 1500);
        return;
      }

      setUser(user);
      setStatus("AUTHENTICATED: QUERYING BUILD REGISTRY...");
      
      // Fetch builds registered to this user's email
      const { data: buildsData, error } = await supabase
        .from('build_projects')
        .select('*')
        .eq('client_email', user.email)
        .eq('is_active', true);

      if (error) {
        console.error("Registry Query Error:", error.message);
        setStatus("CRITICAL ERROR: UPLINK FAILURE.");
        setLoading(false);
        return;
      }

      setBuilds(buildsData || []);
      
      // Auto-routing logic
      if (buildsData && buildsData.length === 1) {
        setStatus(`UPLINK ESTABLISHED: INITIALIZING PROJECT ${buildsData[0].display_id}...`);
        setTimeout(() => {
          router.push(`/journey/${buildsData[0].display_id}`);
        }, 1500);
      } else {
        setStatus(buildsData?.length ? "MULTIPLE NODES DETECTED. SELECT ENTRY POINT." : "NO ACTIVE BUILD NODES REGISTERED TO THIS ACCOUNT.");
        setLoading(false);
      }
    };

    initializeAuth();
  }, [router]);

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

      <section className="relative z-10 min-h-screen flex items-center justify-center pt-40 pb-12 px-6">
        <div className="max-w-2xl w-full mt-12" ref={terminalRef}>
          <div className="blueprint-border bg-brand-obsidian/40 backdrop-blur-2xl p-12 relative overflow-hidden group">
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-brand-orange/30 group-hover:border-brand-orange transition-all duration-700" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-brand-orange/30 group-hover:border-brand-orange transition-all duration-700" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-brand-orange/30 group-hover:border-brand-orange transition-all duration-700" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-brand-orange/30 group-hover:border-brand-orange transition-all duration-700" />

            <div className="text-center mb-12">
               <div className="inline-flex items-center gap-3 px-4 py-2 bg-brand-orange/10 border border-brand-orange/30 mb-8 mx-auto">
                  {loading ? (
                    <Activity className="w-4 h-4 text-brand-orange animate-pulse" />
                  ) : (
                    <UserCheck className="w-4 h-4 text-brand-orange" />
                  )}
                  <span className="font-mono text-[9px] text-brand-orange uppercase tracking-[0.4em]">
                    {loading ? "Registry Uplink Active" : "Authentication Verified"}
                  </span>
               </div>
               <h1 className="font-display text-5xl uppercase tracking-tighter mb-4 text-white">
                  BUILD <br />
                  <span className="text-brand-orange">JOURNEY TRACKER</span>
               </h1>
               <p className="font-sans text-brand-grey text-sm italic">
                  {loading 
                    ? "Establishing encrypted connection to the Amplios workshop matrix..." 
                    : builds.length > 0 
                      ? "Select your build node below to initialize the real-time telemetry stream."
                      : "No active build nodes were found associated with this laboratory identity."
                  }
               </p>
            </div>

            <div className="space-y-6">
               {loading ? (
                 <div className="blueprint-border bg-brand-carbon/50 p-8 flex flex-col items-center gap-4">
                    <Loader2 className="w-8 h-8 text-brand-orange animate-spin" />
                    <span className="font-mono text-[10px] text-brand-grey uppercase tracking-widest">{status}</span>
                 </div>
               ) : builds.length > 0 ? (
                 <div className="grid gap-4">
                    {builds.map((project) => (
                      <Link 
                        key={project.id}
                        href={`/journey/${project.display_id}`}
                        className="blueprint-border bg-brand-carbon p-6 group hover:border-brand-orange transition-all flex items-center justify-between"
                      >
                        <div className="flex items-center gap-6">
                           <div className="w-12 h-12 bg-brand-obsidian border border-brand-border flex items-center justify-center text-brand-orange font-display">
                              {project.display_id.split('-')[1]}
                           </div>
                           <div>
                              <h3 className="font-display text-lg uppercase text-white group-hover:text-brand-orange transition-colors">{project.vehicle_name}</h3>
                              <p className="font-mono text-[9px] text-brand-grey uppercase tracking-widest mt-1">Project ID: {project.display_id} // Stage: {project.current_stage}</p>
                           </div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-brand-grey group-hover:text-brand-orange group-hover:translate-x-2 transition-all" />
                      </Link>
                    ))}
                 </div>
               ) : (
                 <div className="blueprint-border border-dashed border-brand-border p-12 flex flex-col items-center text-center gap-6">
                    <AlertCircle className="w-10 h-10 text-brand-grey opacity-20" />
                    <div className="space-y-2">
                       <p className="font-mono text-[10px] text-brand-grey uppercase tracking-widest">Entry Restricted</p>
                       <p className="font-sans text-xs text-brand-grey/60">If you have a build in progress, please contact your technician to register your account email to your node.</p>
                    </div>
                    <Link href="/account" className="font-display text-[9px] text-brand-orange uppercase tracking-widest hover:text-white transition-colors">Return to Dashboard</Link>
                 </div>
               )}
            </div>

            <div className="mt-12 pt-8 border-t border-brand-border/30 flex items-center justify-between">
               <div className="flex items-center gap-2 font-mono text-[8px] text-brand-grey uppercase tracking-widest">
                  <ShieldCheck className="w-3 h-3 text-brand-orange" />
                  Encrypted // TLS 1.3
               </div>
               <div className="font-mono text-[8px] text-brand-orange uppercase tracking-widest animate-pulse">
                  {status}
               </div>
            </div>
          </div>

          <p className="font-mono text-[8px] text-brand-grey/40 uppercase text-center mt-12 tracking-widest leading-relaxed">
             Technical Notice: The Build Journey Tracker provides real-time telemetry from the Amplios Workshop. <br />
             Access is restricted to verified clients and registry engineers.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
