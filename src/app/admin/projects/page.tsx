"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { 
  Plus, 
  Truck, 
  Activity, 
  ChevronRight, 
  Settings, 
  Trash2, 
  ArrowLeft,
  Shield,
  Search,
  RefreshCw,
  Clock,
  User,
  Thermometer,
  Droplets
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    setLoading(true);
    const { data } = await supabase
      .from('build_projects')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) setProjects(data);
    setLoading(false);
  }

  const filteredProjects = projects.filter(p => 
    p.client_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.display_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 pb-32">
      {/* Header */}
      <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <Link href="/admin/dashboard" className="flex items-center gap-2 font-mono text-[10px] text-brand-orange uppercase tracking-[0.3em] mb-4 hover:text-brand-white transition-colors">
            <ArrowLeft size={12} /> Return to Hub
          </Link>
          <h1 className="font-display text-5xl uppercase tracking-tighter text-brand-white">
            Project <span className="text-brand-orange">Pipeline</span>
          </h1>
        </div>
        <Link 
          href="/admin/projects/new"
          className="px-10 py-5 bg-brand-orange text-brand-white font-mono text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all flex items-center gap-3 shadow-xl shadow-brand-orange/20"
        >
          <Plus size={14} /> Initialize New Node
        </Link>
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
         {[
           { label: "Active Nodes", value: projects.length, icon: Activity, color: "text-brand-orange" },
           { label: "In Quality Assurance", value: projects.filter(p => p.current_stage === 'QA').length, icon: Shield, color: "text-blue-500" },
           { label: "Avg. Velocity", value: "88%", icon: RefreshCw, color: "text-green-500" },
           { label: "Workshop Uptime", value: "24/7", icon: Clock, color: "text-purple-500" },
         ].map((stat, i) => (
            <div key={i} className="blueprint-border p-6 bg-brand-carbon/50">
               <div className="flex justify-between items-center mb-4">
                  <stat.icon className={cn("w-4 h-4", stat.color)} />
                  <span className="font-mono text-[8px] text-brand-grey uppercase tracking-widest">{stat.label}</span>
               </div>
               <span className="font-display text-2xl text-brand-white">{stat.value}</span>
            </div>
         ))}
      </div>

      {/* Control Surface */}
      <div className="blueprint-border bg-brand-carbon overflow-hidden">
        <div className="p-6 border-b border-brand-border bg-brand-obsidian/50 flex justify-between items-center">
           <div className="relative w-full max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-grey w-4 h-4" />
              <input 
                type="text"
                placeholder="Search Active Projects (ID or Client)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-brand-obsidian border border-brand-border pl-12 pr-4 py-3 font-mono text-[10px] text-brand-white uppercase transition-all focus:border-brand-orange focus:ring-1 focus:ring-brand-orange/20"
              />
           </div>
           <button onClick={fetchProjects} className="p-3 text-brand-grey hover:text-brand-orange transition-colors">
              <RefreshCw size={14} />
           </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-brand-border bg-brand-obsidian/30">
                <th className="p-6 font-mono text-[9px] text-brand-grey uppercase tracking-widest">Node ID</th>
                <th className="p-6 font-mono text-[9px] text-brand-grey uppercase tracking-widest">Client / Vehicle</th>
                <th className="p-6 font-mono text-[9px] text-brand-grey uppercase tracking-widest">Stage</th>
                <th className="p-6 font-mono text-[9px] text-brand-grey uppercase tracking-widest">Telemetry</th>
                <th className="p-6 font-mono text-[9px] text-brand-grey uppercase tracking-widest">Timeline</th>
                <th className="p-6"></th>
              </tr>
            </thead>
            <tbody className="font-sans text-xs">
              {filteredProjects.map((project) => (
                <tr key={project.id} className="border-b border-brand-border/50 hover:bg-white/5 transition-colors group">
                  <td className="p-6">
                    <span className="font-mono text-brand-orange font-bold font-bold">{project.display_id}</span>
                  </td>
                  <td className="p-6">
                    <div className="flex flex-col">
                      <span className="text-brand-white font-bold mb-1">{project.client_name}</span>
                      <span className="text-brand-grey text-[10px] uppercase font-mono tracking-tight">{project.vehicle_name}</span>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-3">
                       <div className={cn(
                          "w-2 h-2 rounded-full",
                          project.current_stage === 'QA' ? "bg-blue-500 animate-pulse" : 
                          project.current_stage === 'DELIVERY' ? "bg-green-500" : "bg-brand-orange"
                       )} />
                       <span className="font-mono text-[10px] text-brand-white uppercase">{project.current_stage.replace('_', ' ')}</span>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex gap-4 text-brand-grey">
                       <div className="flex items-center gap-1">
                          <Thermometer size={10} className="text-red-400" />
                          <span className="font-mono text-[8px]">{project.workshop_temp}°C</span>
                       </div>
                       <div className="flex items-center gap-1">
                          <Droplets size={10} className="text-blue-400" />
                          <span className="font-mono text-[8px]">{project.workshop_humidity}%</span>
                       </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex flex-col">
                      <span className="text-brand-grey text-[9px] uppercase font-mono mb-1">Target Completion</span>
                      <span className="text-brand-white font-mono">{project.estimated_completion || "TBD"}</span>
                    </div>
                  </td>
                  <td className="p-6">
                    <Link 
                      href={`/admin/projects/${project.id}`}
                      className="p-3 bg-brand-obsidian border border-brand-border text-brand-grey hover:border-brand-orange hover:text-brand-orange transition-all flex items-center gap-2 font-mono text-[8px] uppercase tracking-widest"
                    >
                      Control <Settings size={12} />
                    </Link>
                  </td>
                </tr>
              ))}
              {filteredProjects.length === 0 && !loading && (
                <tr>
                  <td colSpan={6} className="p-20 text-center">
                    <Truck className="w-12 h-12 text-brand-grey mx-auto mb-6 opacity-20" />
                    <p className="font-mono text-[10px] text-brand-grey uppercase tracking-widest">No Active Build Nodes Detected.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
