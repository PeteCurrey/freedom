"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Camera, CheckCircle, XCircle, Star, Search, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminShowcaseModerationPage() {
  const [builds, setBuilds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBuilds() {
      const { data } = await supabase
        .from('showcase_builds')
        .select('*, vehicles(name)')
        .order('created_at', { ascending: false });
      
      setBuilds(data || []);
      setLoading(false);
    }
    fetchBuilds();
  }, []);

  return (
    <div className="p-8 pb-32">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="font-display text-4xl uppercase tracking-tighter text-brand-white mb-2">
            Community <span className="text-brand-orange">Showcase</span>
          </h1>
          <p className="font-mono text-[10px] text-brand-grey uppercase tracking-widest">
            Submission Moderation & Feature Control
          </p>
        </div>
      </div>

      {/* Pending Submissions */}
      <div className="mb-12">
        <h2 className="font-display text-xl uppercase tracking-widest text-brand-white border-b border-brand-border pb-2 mb-6 flex items-center gap-2">
          <ShieldAlert className="text-brand-orange" size={20} /> Needs Review
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {builds.filter(b => b.status === 'pending').map((build) => (
            <div key={build.id} className="p-6 bg-brand-carbon border border-brand-border flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-display text-xl text-white">{build.title}</h3>
                  <p className="font-mono text-[9px] text-brand-grey uppercase tracking-widest mt-1">By {build.builder_name} // {build.location}</p>
                </div>
                <span className="bg-yellow-500/10 text-yellow-500 font-mono text-[8px] uppercase tracking-widest px-2 py-1">Pending</span>
              </div>
              
              <div className="h-32 bg-brand-obsidian border border-brand-border flex items-center justify-center text-brand-grey overflow-hidden">
                {build.images?.[0] ? <img src={build.images[0]} className="w-full h-full object-cover" /> : <Camera size={24} />}
              </div>

              <div className="flex gap-2 mt-2">
                <button className="flex-1 py-2 bg-brand-orange text-white font-mono text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white hover:text-brand-orange transition-colors">
                  <CheckCircle size={14} /> Approve
                </button>
                <button className="flex-1 py-2 bg-brand-obsidian text-red-500 border border-brand-border font-mono text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:border-red-500 transition-colors">
                  <XCircle size={14} /> Reject
                </button>
              </div>
            </div>
          ))}
          {builds.filter(b => b.status === 'pending').length === 0 && (
            <div className="col-span-2 py-12 text-center border border-dashed border-brand-border text-brand-grey font-mono text-[10px] uppercase tracking-widest">
              No pending submissions.
            </div>
          )}
        </div>
      </div>

      {/* Approved / Featured */}
      <div>
        <h2 className="font-display text-xl uppercase tracking-widest text-brand-white border-b border-brand-border pb-2 mb-6">
          Live Gallery
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {builds.filter(b => b.status === 'approved').map((build) => (
            <div key={build.id} className={cn("p-4 bg-brand-carbon border transition-colors", build.featured ? "border-brand-orange" : "border-brand-border")}>
               <div className="flex justify-between items-start mb-3">
                 <h4 className="font-display text-lg text-white">{build.title}</h4>
                 {build.featured && <Star size={16} className="text-brand-orange fill-brand-orange" />}
               </div>
               <p className="font-mono text-[8px] text-brand-grey uppercase tracking-widest mb-4">{build.vehicles?.name || 'Unknown Vehicle'}</p>
               <div className="flex justify-between items-center">
                 <span className="text-green-500 font-mono text-[8px] uppercase tracking-widest">Approved</span>
                 <button className="font-mono text-[8px] text-brand-orange uppercase tracking-widest hover:text-white transition-colors">Manage Links</button>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
