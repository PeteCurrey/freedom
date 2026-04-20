"use client";

import { useState, useEffect, useRef, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { supabase } from "@/lib/supabase";
import { 
  Activity, 
  ShieldCheck, 
  Thermometer, 
  Droplets, 
  Clock, 
  CheckCircle2, 
  Circle, 
  User, 
  ChevronRight, 
  AlertCircle,
  Maximize2,
  Layers,
  ArrowUpRight,
  Info
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollToPlugin);

export default function BuildTrackerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: displayId } = use(params);
  
  const [project, setProject] = useState<any>(null);
  const [installations, setInstallations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const roadmapRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchJourney() {
      setLoading(true);
      
      // 1. Fetch Project by Display ID (The Public Key)
      const { data: projData, error: projError } = await supabase
        .from('build_projects')
        .select('*')
        .eq('display_id', displayId)
        .eq('is_active', true)
        .single();
      
      if (projError || !projData) {
        setError("Invalid Registry Node ID. Connection Terminated.");
        setLoading(false);
        return;
      }

      setProject(projData);

      // 2. Fetch Installations for this project
      const { data: installData } = await supabase
        .from('project_installations')
        .select('*')
        .eq('project_id', projData.id)
        .order('updated_at', { ascending: true });
      
      setInstallations(installData || []);
      setLoading(false);

      // Cinematic Entry
      gsap.fromTo(".dashboard-node", 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out", delay: 0.5 }
      );
    }

    fetchJourney();
  }, [displayId]);

  if (loading) return <LoadingTerminal displayId={displayId} />;
  if (error) return <ErrorTerminal message={error} />;

  const stages = [
    { key: "DESIGN", label: "Design & Spec" },
    { key: "CHASSIS_PREP", label: "Chassis Prep" },
    { key: "SYSTEM_INSTALL", label: "Installation" },
    { key: "CABINETRY", label: "Fabrication" },
    { key: "FINISHING", label: "Final Polish" },
    { key: "QA", label: "Verification" },
    { key: "DELIVERY", label: "Delivery" }
  ];

  const currentStageIndex = stages.findIndex(s => s.key === project.current_stage);

  return (
    <main className="bg-brand-obsidian min-h-screen text-white relative" ref={dashboardRef}>
      <Navbar />

      {/* 1. IMMERSIVE HERO / STATUS BAR */}
      <section className="relative pt-48 pb-12 border-b border-brand-border/30 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/hero-background.png" 
            alt="Workshop Progress" 
            fill 
            className="object-cover opacity-10 grayscale brightness-50" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-obsidian via-transparent to-brand-obsidian" />
          <div className="blueprint-grid absolute inset-0 opacity-10 pointer-events-none" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12">
            <div>
              <div className="inline-flex items-center gap-3 px-3 py-1 bg-brand-orange/10 border border-brand-orange/30 mb-8">
                 <span className="w-1.5 h-1.5 bg-brand-orange rounded-full animate-pulse" />
                 <span className="font-mono text-[8px] text-brand-orange uppercase tracking-[0.4em]">Live Matrix Uplink</span>
              </div>
              <h1 className="font-display text-5xl lg:text-7xl uppercase tracking-tighter mb-4">
                PROJECT <span className="text-brand-orange">{project.display_id}</span>
              </h1>
              <p className="font-sans text-brand-grey text-xl italic max-w-xl">
                 Crafting the {project.vehicle_name} for <span className="text-white">{project.client_name}</span>. Precision engineering in progress.
              </p>
            </div>

            {/* Quick Stats Telemetry */}
            <div className="flex flex-wrap gap-8 lg:gap-12 pb-2">
               <TelemetryItem label="Node Status" value={project.current_stage.replace('_', ' ')} color="text-brand-orange" />
               <TelemetryItem label="Lead Technician" value={project.technician_name} color="text-white" />
               <TelemetryItem label="Deployment Date" value={new Date(project.start_date).toLocaleDateString()} color="text-brand-grey" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE JOURNEY ROADMAP (GSAP) */}
      <section className="bg-brand-carbon/30 py-16 border-b border-brand-border/30 overflow-x-auto no-scrollbar" ref={roadmapRef}>
        <div className="container mx-auto px-6 min-w-[1000px]">
           <div className="relative flex justify-between">
              {/* Progress Line Background */}
              <div className="absolute top-1/2 left-0 w-full h-[2px] bg-brand-border/30 -translate-y-1/2" />
              {/* Active Progress Line */}
              <div 
                className="absolute top-1/2 left-0 h-[2px] bg-brand-orange -translate-y-1/2 transition-all duration-1000 ease-in-out" 
                style={{ width: `${(currentStageIndex / (stages.length - 1)) * 100}%` }}
              />

              {stages.map((stage, idx) => {
                 const isActive = idx <= currentStageIndex;
                 const isCurrent = idx === currentStageIndex;
                 return (
                    <div key={stage.key} className="relative z-10 flex flex-col items-center">
                       <div className={cn(
                          "w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-700",
                          isCurrent ? "bg-brand-orange border-brand-orange shadow-[0_0_20px_rgba(255,107,0,0.5)] scale-110" :
                          isActive ? "bg-brand-obsidian border-brand-orange text-brand-orange" :
                          "bg-brand-obsidian border-brand-border text-brand-grey"
                       )}>
                          {isActive ? <CheckCircle2 size={18} /> : <Circle size={14} className="opacity-40" />}
                       </div>
                       <span className={cn(
                          "absolute top-16 whitespace-nowrap font-mono text-[9px] uppercase tracking-widest transition-all duration-500",
                          isActive ? "text-brand-white font-bold" : "text-brand-grey opacity-50"
                       )}>
                          {stage.label}
                       </span>
                    </div>
                 );
              })}
           </div>
        </div>
      </section>

      {/* 3. MAIN DASHBOARD CONTENT */}
      <section className="py-24 relative overflow-hidden">
        <div className="blueprint-grid absolute inset-0 opacity-5 pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            
            {/* Left: System Installation Nodes */}
            <div className="lg:col-span-8 space-y-16 dashboard-node">
               <div>
                  <h2 className="font-display text-4xl uppercase tracking-tight mb-4">Installation <span className="text-brand-orange">Nodes</span></h2>
                  <p className="font-sans text-brand-grey italic">Detailed verification of every system currently being integrated into your build registry.</p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {installations.map((node) => (
                     <div key={node.id} className="blueprint-border bg-brand-carbon/50 p-8 flex items-center justify-between group hover:bg-brand-obsidian transition-all duration-500">
                        <div className="flex items-center gap-6">
                           <div className={cn(
                              "w-14 h-14 border flex items-center justify-center transition-all duration-700",
                              node.status === 'COMPLETED' ? "border-green-500 bg-green-500/10 text-green-500" :
                              node.status === 'ACTIVE' ? "border-brand-orange bg-brand-orange/10 text-brand-orange animate-pulse" :
                              "border-brand-border bg-brand-obsidian text-brand-grey"
                           )}>
                              {node.status === 'COMPLETED' ? <CheckCircle2 size={24} /> : <Activity size={24} />}
                           </div>
                           <div>
                              <span className="block font-display text-lg tracking-tight uppercase group-hover:text-brand-orange transition-colors">{node.component_name}</span>
                              <span className="block font-mono text-[8px] text-brand-grey uppercase tracking-widest mt-1">Status: {node.status}</span>
                           </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-brand-grey group-hover:text-brand-orange transition-all" />
                     </div>
                  ))}
                  {installations.length === 0 && (
                     <div className="col-span-2 py-24 text-center blueprint-border border-dashed border-brand-border/30">
                        <Layers className="w-12 h-12 text-brand-grey mx-auto mb-6 opacity-20" />
                        <p className="font-mono text-xs text-brand-grey uppercase tracking-widest">Awaiting System Node Initialization...</p>
                     </div>
                  )}
               </div>

               {/* Workshop Media Gallery Feed */}
               <div className="pt-24 dashboard-node">
                  <div className="flex justify-between items-end mb-12">
                     <h2 className="font-display text-4xl uppercase tracking-tight">Workshop <span className="text-brand-orange">Transmission</span></h2>
                     <span className="font-mono text-[9px] text-brand-grey uppercase border-b border-brand-border pb-1">Secured Media Stream // LIVE</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <MediaFrame src="/images/hero-background.png" label="Node Assembly: Electrical Console" date="2 hours ago" />
                     <MediaFrame src="/images/interior-showcase.png" label="Chassis Sound Deadening Phase" date="Yesterday" />
                  </div>
               </div>
            </div>

            {/* Right: Technical Telemetry & Sidebar */}
            <div className="lg:col-span-4 space-y-12 dashboard-node">
               <div className="sticky top-32 space-y-12">
                  
                  {/* LIVE TELEMETRY BAR */}
                  <div className="blueprint-border p-10 bg-brand-carbon relative overflow-hidden">
                     <div className="absolute top-0 right-0 p-8 opacity-5"><Activity className="w-24 h-24" /></div>
                     <h3 className="font-display text-sm uppercase tracking-widest mb-10 text-brand-orange border-b border-brand-orange/20 pb-4 flex items-center gap-3">
                        <Monitor className="w-4 h-4" /> Live Registry Data
                     </h3>
                     
                     <div className="space-y-10">
                        <LiveSensor label="Workshop Ambient" value={`${project.workshop_temp}°C`} icon={Thermometer} />
                        <LiveSensor label="Relative Humidity" value={`${project.workshop_humidity}%`} icon={Droplets} />
                        <LiveSensor label="Uptime Track" value="14 Days" icon={Clock} />
                     </div>

                     <div className="mt-12 pt-8 border-t border-brand-border/30 flex items-center gap-4">
                        <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                        <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest">Signal Integrity 99.8%</span>
                     </div>
                  </div>

                  {/* PROJECT META CARD */}
                  <div className="blueprint-border p-10 bg-brand-obsidian">
                     <h3 className="font-display text-sm uppercase tracking-widest mb-8 text-white">Chassis Metadata</h3>
                     <div className="space-y-6">
                        <MetaRow label="Platform" value={project.vehicle_name} />
                        <MetaRow label="Deployment" value="Q2 2026" />
                        <MetaRow label="Spec Node" value={project.display_id} />
                     </div>
                     <Link href="/planner" className="mt-10 w-full group flex items-center justify-between p-4 border border-brand-border hover:border-brand-orange transition-all">
                        <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest group-hover:text-brand-orange">Open Build Plan →</span>
                        <ArrowUpRight size={14} className="text-brand-grey group-hover:text-brand-orange" />
                     </Link>
                  </div>

                  {/* NOTIFICATION CARD */}
                  <div className="blueprint-border p-8 bg-brand-orange/5 border-l-4 border-l-brand-orange">
                     <div className="flex items-start gap-4">
                        <Info className="w-5 h-5 text-brand-orange shrink-0 mt-1" />
                        <div>
                           <h4 className="font-display text-xs uppercase tracking-widest text-white mb-2">Automated Notifications</h4>
                           <p className="font-sans text-[10px] text-brand-grey leading-relaxed italic">
                              Registry updates are pushed every 24 hours. Connect your terminal for live push signals.
                           </p>
                        </div>
                     </div>
                  </div>

               </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function TelemetryItem({ label, value, color }: any) {
  return (
    <div className="flex flex-col">
      <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest mb-1">{label}</span>
      <span className={cn("font-display text-xl uppercase tracking-tighter", color)}>{value}</span>
    </div>
  );
}

function LiveSensor({ label, value, icon: Icon }: any) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 rounded-full bg-brand-obsidian border border-brand-border flex items-center justify-center text-brand-grey group-hover:text-brand-orange transition-colors">
          <Icon className="w-4 h-4" />
        </div>
        <span className="font-mono text-[10px] text-brand-grey uppercase tracking-widest">{label}</span>
      </div>
      <span className="font-display text-xl text-white">{value}</span>
    </div>
  );
}

function MetaRow({ label, value }: any) {
  return (
    <div className="flex justify-between border-b border-brand-border/30 pb-3">
      <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest">{label}</span>
      <span className="font-mono text-[10px] text-white uppercase">{value}</span>
    </div>
  );
}

function MediaFrame({ src, label, date }: any) {
  return (
    <div className="group blueprint-border bg-brand-obsidian overflow-hidden">
      <div className="relative h-64 grayscale group-hover:grayscale-0 transition-all duration-1000">
        <Image src={src} alt={label} fill className="object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian to-transparent opacity-60" />
        <div className="absolute top-4 right-4">
          <button className="bg-brand-obsidian/80 backdrop-blur-md p-3 text-brand-white hover:text-brand-orange transition-colors">
            <Maximize2 size={16} />
          </button>
        </div>
      </div>
      <div className="p-6 flex justify-between items-center bg-brand-carbon">
        <span className="font-mono text-[9px] text-brand-white uppercase tracking-widest">{label}</span>
        <span className="font-mono text-[8px] text-brand-grey uppercase">{date}</span>
      </div>
    </div>
  );
}

function LoadingTerminal({ displayId }: any) {
   return (
      <main className="bg-brand-obsidian min-h-screen flex items-center justify-center p-6 text-center">
         <div className="max-w-md w-full">
            <Activity className="w-12 h-12 text-brand-orange animate-spin mx-auto mb-8" />
            <h2 className="font-display text-2xl uppercase tracking-tighter mb-4">Initializing Matrix Pipeline</h2>
            <p className="font-mono text-[10px] text-brand-grey uppercase tracking-[0.3em] animate-pulse">Requesting Node Cluster: {displayId}</p>
         </div>
      </main>
   );
}

function ErrorTerminal({ message }: any) {
   return (
      <main className="bg-brand-obsidian min-h-screen flex items-center justify-center p-6 text-center">
         <div className="max-w-md w-full">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-8" />
            <h2 className="font-display text-2xl uppercase tracking-tighter mb-4 text-red-500">Node Connection Error</h2>
            <p className="font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-8">{message}</p>
            <Link href="/journey" className="px-10 py-4 bg-brand-orange text-white font-display text-[10px] uppercase tracking-widest">
               Return to Entry Hub
            </Link>
         </div>
      </main>
   );
}

function Monitor(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="3" rx="2" />
      <line x1="8" x2="16" y1="21" y2="21" />
      <line x1="12" x2="12" y1="17" y2="21" />
    </svg>
  );
}
