"use client";

import { useState, useEffect, use } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, 
  Save, 
  RefreshCw, 
  Trash2, 
  Activity, 
  Shield, 
  CheckCircle2, 
  Clock, 
  Plus, 
  Layers,
  Thermometer,
  Droplets,
  User as UserIcon
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const isNew = id === "new";

  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(!isNew);
  const [project, setProject] = useState<any>({
    display_id: "",
    client_name: "",
    vehicle_name: "",
    vehicle_slug: "",
    current_stage: "DESIGN",
    technician_name: "Lead Engineer",
    workshop_temp: 19.5,
    workshop_humidity: 45.0,
    start_date: new Date().toISOString().split('T')[0],
    estimated_completion: "",
    is_active: true
  });

  const [installations, setInstallations] = useState<any[]>([]);

  useEffect(() => {
    if (!isNew) {
      fetchProjectData();
    }
  }, [id]);

  async function fetchProjectData() {
    // 1. Fetch Project
    const { data: projData } = await supabase.from('build_projects').select('*').eq('id', id).single();
    if (projData) setProject(projData);

    // 2. Fetch Installations
    const { data: installData } = await supabase.from('project_installations').select('*').eq('project_id', id);
    if (installData) setInstallations(installData);
    
    setLoading(false);
  }

  const handleSave = async () => {
    setSaving(true);
    const { id: _, created_at: __, updated_at: ___, ...saveData } = project;
    
    let projectId = id;
    if (isNew) {
      const { data, error } = await supabase.from('build_projects').insert(saveData).select().single();
      if (!error) projectId = data.id;
    } else {
      await supabase.from('build_projects').update(saveData).eq('id', id);
    }

    setSaving(false);
    if (isNew) router.push(`/admin/projects/${projectId}`);
  };

  const addInstallation = async () => {
    if (isNew) {
       alert("Please save the project core identity first.");
       return;
    }
    const name = prompt("Enter Component Name (e.g. Victron MultiPlus, MaxxAir Fan):");
    if (!name) return;

    const { data, error } = await supabase
      .from('project_installations')
      .insert({ project_id: id, component_name: name, status: 'PENDING' })
      .select()
      .single();
    
    if (data) setInstallations([...installations, data]);
  };

  const toggleInstallation = async (instId: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'PENDING' ? 'ACTIVE' : currentStatus === 'ACTIVE' ? 'COMPLETED' : 'PENDING';
    const { error } = await supabase.from('project_installations').update({ status: nextStatus }).eq('id', instId);
    if (!error) {
       setInstallations(installations.map(inst => inst.id === instId ? { ...inst, status: nextStatus } : inst));
    }
  };

  if (loading) return <div className="p-12 font-mono text-[10px] text-brand-grey uppercase">Synchronizing Node Data...</div>;

  return (
    <div className="p-8 pb-32">
      <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <Link href="/admin/projects" className="flex items-center gap-2 font-mono text-[10px] text-brand-orange uppercase tracking-[0.3em] mb-4 hover:text-brand-white transition-colors">
            <ArrowLeft size={12} /> Back to Pipeline
          </Link>
          <h1 className="font-display text-5xl uppercase tracking-tighter text-brand-white">
            {isNew ? "Initialize" : "Maintain"} <span className="text-brand-orange">Node</span>
          </h1>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={handleSave}
            disabled={saving}
            className="px-10 py-4 bg-brand-orange text-brand-white font-mono text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {saving ? <RefreshCw size={14} className="animate-spin" /> : <Save size={14} />} 
            {saving ? "Processing..." : isNew ? "Create Project" : "Update Registry"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Core Settings */}
        <div className="lg:col-span-2 space-y-8">
           <div className="blueprint-border bg-brand-carbon p-8">
              <div className="flex items-center gap-3 mb-8 border-b border-brand-border pb-4">
                 <Shield className="text-brand-orange" size={18} />
                 <h2 className="font-display text-xl uppercase tracking-widest text-brand-white">Core <span className="text-brand-orange">Registry</span></h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-white">
                 <div>
                    <label className="block font-mono text-[9px] text-brand-grey uppercase mb-2">Display ID (Public)</label>
                    <input 
                      type="text"
                      value={project.display_id}
                      onChange={(e) => setProject({...project, display_id: e.target.value})}
                      placeholder="e.g. AM-204"
                      className="w-full bg-brand-obsidian border border-brand-border p-3 font-mono text-[10px] focus:border-brand-orange outline-none"
                    />
                 </div>
                 <div>
                    <label className="block font-mono text-[9px] text-brand-grey uppercase mb-2">Client Name</label>
                    <input 
                      type="text"
                      value={project.client_name}
                      onChange={(e) => setProject({...project, client_name: e.target.value})}
                      className="w-full bg-brand-obsidian border border-brand-border p-3 font-sans text-xs focus:border-brand-orange outline-none"
                    />
                 </div>
                 <div>
                    <label className="block font-mono text-[9px] text-brand-grey uppercase mb-2">Vehicle Platform</label>
                    <input 
                      type="text"
                      value={project.vehicle_name}
                      onChange={(e) => setProject({...project, vehicle_name: e.target.value})}
                      placeholder="e.g. Sprinter L3H2"
                      className="w-full bg-brand-obsidian border border-brand-border p-3 font-sans text-xs focus:border-brand-orange outline-none"
                    />
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-white">
                 <div>
                    <label className="block font-mono text-[9px] text-brand-grey uppercase mb-2">Current Deployment Stage</label>
                    <select 
                      value={project.current_stage}
                      onChange={(e) => setProject({...project, current_stage: e.target.value})}
                      className="w-full bg-brand-obsidian border border-brand-border p-3 font-mono text-[10px] uppercase focus:border-brand-orange outline-none"
                    >
                       <option value="DESIGN">Design & Specification</option>
                       <option value="CHASSIS_PREP">Chassis Preparation</option>
                       <option value="SYSTEM_INSTALL">System Installation</option>
                       <option value="CABINETRY">Cabinetry & Fabrication</option>
                       <option value="FINISHING">Interior Finishing</option>
                       <option value="QA">Quality Assurance</option>
                       <option value="DELIVERY">Final Delivery</option>
                    </select>
                 </div>
                 <div>
                    <label className="block font-mono text-[9px] text-brand-grey uppercase mb-2">Lead Technician</label>
                    <div className="flex items-center gap-3 bg-brand-obsidian border border-brand-border p-1">
                       <div className="w-8 h-8 bg-brand-carbon flex items-center justify-center text-brand-orange">
                          <UserIcon size={14} />
                       </div>
                       <input 
                        type="text"
                        value={project.technician_name}
                        onChange={(e) => setProject({...project, technician_name: e.target.value})}
                        className="flex-1 bg-transparent border-none p-2 font-mono text-[10px] focus:ring-0 outline-none"
                      />
                    </div>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white text-xs">
                 <div>
                    <label className="block font-mono text-[9px] text-brand-grey uppercase mb-2">Start Date</label>
                    <input type="date" value={project.start_date} onChange={(e) => setProject({...project, start_date: e.target.value})} className="w-full bg-brand-obsidian border border-brand-border p-3" />
                 </div>
                 <div>
                    <label className="block font-mono text-[9px] text-brand-grey uppercase mb-2">Estimated Completion</label>
                    <input type="date" value={project.estimated_completion} onChange={(e) => setProject({...project, estimated_completion: e.target.value})} className="w-full bg-brand-obsidian border border-brand-border p-3" />
                 </div>
              </div>
           </div>

           {/* Installation Node Checklist */}
           <div className="blueprint-border bg-brand-carbon p-8">
              <div className="flex items-center justify-between gap-3 mb-8 border-b border-brand-border pb-4">
                 <div className="flex items-center gap-3">
                    <Layers className="text-brand-orange" size={18} />
                    <h2 className="font-display text-xl uppercase tracking-widest text-brand-white">System <span className="text-brand-orange">Nodes</span></h2>
                 </div>
                 {!isNew && (
                    <button onClick={addInstallation} className="p-2 border border-brand-orange/30 text-brand-orange hover:bg-brand-orange hover:text-white transition-all">
                       <Plus size={16} />
                    </button>
                 )}
              </div>

              <div className="space-y-3">
                 {installations.map((inst) => (
                    <div 
                      key={inst.id} 
                      onClick={() => toggleInstallation(inst.id, inst.status)}
                      className="group cursor-pointer p-6 bg-brand-obsidian border border-brand-border flex items-center justify-between hover:border-brand-orange transition-all"
                    >
                       <div className="flex items-center gap-6">
                          <div className={cn(
                             "w-12 h-12 border flex items-center justify-center transition-all",
                             inst.status === 'COMPLETED' ? "border-green-500 bg-green-500/10 text-green-500" :
                             inst.status === 'ACTIVE' ? "border-brand-orange bg-brand-orange/10 text-brand-orange animate-pulse" :
                             "border-brand-border bg-brand-carbon text-brand-grey"
                          )}>
                             {inst.status === 'COMPLETED' ? <CheckCircle2 size={18} /> : <Activity size={18} />}
                          </div>
                          <div>
                             <span className="block font-mono text-[10px] text-brand-white uppercase mb-1">{inst.component_name}</span>
                             <span className="block font-mono text-[8px] text-brand-grey uppercase tracking-widest">{inst.status}</span>
                          </div>
                       </div>
                       <ChevronIcon status={inst.status} />
                    </div>
                 ))}
                 {installations.length === 0 && (
                    <div className="py-12 border border-dashed border-brand-border text-center">
                       <p className="font-mono text-[9px] text-brand-grey uppercase tracking-widest opacity-30">No active system nodes detected.</p>
                    </div>
                 )}
              </div>
           </div>
        </div>

        {/* Sidebar Telemetry */}
        <div className="space-y-8">
           <div className="blueprint-border bg-brand-carbon p-8 sticky top-32">
              <div className="flex items-center gap-3 mb-8 border-b border-brand-border pb-4">
                 <Activity className="text-brand-orange" size={18} />
                 <h2 className="font-display text-xl uppercase tracking-widest text-brand-white">Technical <span className="text-brand-orange">Telemetry</span></h2>
              </div>
              
              <div className="space-y-6">
                 <div>
                    <label className="flex items-center justify-between mb-2">
                       <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest">Workshop Ambient</span>
                       <span className="font-mono text-[9px] text-brand-orange">{project.workshop_temp}°C</span>
                    </label>
                    <input 
                      type="range" 
                      min="10" 
                      max="40" 
                      step="0.1"
                      value={project.workshop_temp}
                      onChange={(e) => setProject({...project, workshop_temp: Number(e.target.value)})}
                      className="w-full accent-brand-orange" 
                    />
                 </div>

                 <div>
                    <label className="flex items-center justify-between mb-2">
                       <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest">Relative Humidity</span>
                       <span className="font-mono text-[9px] text-blue-400">{project.workshop_humidity}%</span>
                    </label>
                    <input 
                      type="range" 
                      min="20" 
                      max="80" 
                      step="1"
                      value={project.workshop_humidity}
                      onChange={(e) => setProject({...project, workshop_humidity: Number(e.target.value)})}
                      className="w-full accent-blue-400" 
                    />
                 </div>

                 <div className="pt-8 border-t border-brand-border flex items-center justify-between">
                    <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest">Active Transmission</span>
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

function ChevronIcon({ status }: { status: string }) {
  return (
    <div className={cn(
       "w-6 h-6 border border-brand-border flex items-center justify-center transition-all",
       status === 'COMPLETED' ? "border-green-500 text-green-500" :
       status === 'ACTIVE' ? "border-brand-orange text-brand-orange" : ""
    )}>
       <div className="w-1.5 h-1.5 bg-current" />
    </div>
  );
}
