"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { 
  Upload, 
  Send, 
  CheckCircle2, 
  Loader2, 
  ArrowLeft,
  Wrench,
  Camera,
  Activity
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function SubmitBuildPage() {
  const [formData, setFormData] = useState({
    title: "",
    vehicle_model: "",
    chassis_type: "Mercedes Sprinter",
    description: "",
    electrical: "",
    heating: "",
    water: ""
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const chassisTypes = ["Mercedes Sprinter", "VW Crafter", "Ford Transit", "Fiat Ducato", "Iveco Daily", "Other"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/showcase/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          specs: {
            electrical: formData.electrical,
            heating: formData.heating,
            water: formData.water
          }
        })
      });

      const result = await response.json();
      if (result.error) throw new Error(result.error);
      
      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <main className="bg-brand-obsidian min-h-screen flex flex-col">
        <Navbar />
        <section className="flex-1 pt-48 pb-32 flex items-center justify-center">
           <div className="container mx-auto px-6 max-w-2xl text-center">
              <div className="w-20 h-20 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center text-green-500 mx-auto mb-10">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h1 className="font-display text-5xl uppercase mb-6">INTEL <span className="text-brand-orange">RECEIVED</span></h1>
              <p className="font-sans text-brand-grey text-xl mb-12 italic">
                Your build mission has been logged. Our engineering moderators will review your specs and reach out if any further schematics are required before publication.
              </p>
              <Link href="/showcase" className="bg-brand-orange text-white px-10 py-5 font-display text-xs uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all">
                Return to Showcase
              </Link>
           </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="bg-brand-obsidian min-h-screen flex flex-col">
      <Navbar />

      <section className="flex-1 pt-48 pb-32">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-16">
              <Link href="/showcase" className="inline-flex items-center gap-2 font-mono text-[10px] text-brand-grey uppercase tracking-widest hover:text-brand-orange transition-colors mb-8">
                <ArrowLeft className="w-3 h-3" /> Back to Showcase
              </Link>
              <p className="font-mono text-[10px] text-brand-orange uppercase tracking-[.4em] mb-4">// MISSION SUBMISSION</p>
              <h1 className="font-display text-5xl lg:text-7xl uppercase mb-6">
                ARCHIVE <span className="text-brand-orange">YOUR BUILD</span>
              </h1>
              <p className="font-sans text-brand-grey text-lg leading-relaxed">
                Contribute your engineering logs to the community archive. Showcase your solutions to the complex hurdles of self-build conversion.
              </p>
            </div>

            <div className="blueprint-border bg-brand-carbon p-10 lg:p-16 relative overflow-hidden">
              <div className="blueprint-grid absolute inset-0 opacity-10 pointer-events-none" />
              
              <form onSubmit={handleSubmit} className="relative z-10 space-y-12">
                {/* Basic Info */}
                <div className="space-y-8">
                   <div className="flex items-center gap-4 border-b border-brand-border/30 pb-4">
                      <Wrench className="w-5 h-5 text-brand-orange" />
                      <h3 className="font-display text-xl uppercase italic">Vehicle Foundation</h3>
                   </div>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                         <label className="font-mono text-[9px] text-brand-grey uppercase tracking-widest">Build Title (e.g. Arctic Explorer)</label>
                         <input 
                           type="text" required
                           value={formData.title}
                           onChange={e => setFormData({...formData, title: e.target.value})}
                           placeholder="Enter mission name..."
                           className="w-full bg-brand-obsidian border border-brand-border p-4 font-mono text-xs text-brand-white focus:outline-none focus:border-brand-orange transition-colors"
                         />
                      </div>
                      <div className="space-y-2">
                         <label className="font-mono text-[9px] text-brand-grey uppercase tracking-widest">Base Vehicle (e.g. Sprinter 144)</label>
                         <input 
                           type="text" required
                           value={formData.vehicle_model}
                           onChange={e => setFormData({...formData, vehicle_model: e.target.value})}
                           placeholder="Chassis detail..."
                           className="w-full bg-brand-obsidian border border-brand-border p-4 font-mono text-xs text-brand-white focus:outline-none focus:border-brand-orange transition-colors"
                         />
                      </div>
                   </div>

                   <div className="space-y-4">
                      <label className="font-mono text-[9px] text-brand-grey uppercase tracking-widest">Primary Chassis Category</label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                         {chassisTypes.map(c => (
                           <button 
                             key={c}
                             type="button"
                             onClick={() => setFormData({...formData, chassis_type: c})}
                             className={cn(
                               "py-3 border font-display text-[10px] uppercase transition-all",
                               formData.chassis_type === c ? "bg-brand-orange border-brand-orange text-white" : "border-brand-border text-brand-grey hover:border-brand-grey"
                             )}
                           >
                             {c}
                           </button>
                         ))}
                      </div>
                   </div>
                </div>

                {/* Technical Specs */}
                <div className="space-y-8">
                   <div className="flex items-center gap-4 border-b border-brand-border/30 pb-4">
                      <Activity className="w-5 h-5 text-brand-orange" />
                      <h3 className="font-display text-xl uppercase italic">Technical Schematics</h3>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div className="space-y-2">
                         <label className="font-mono text-[9px] text-brand-grey uppercase tracking-widest">Electrical Core</label>
                         <input 
                           type="text" required
                           value={formData.electrical}
                           onChange={e => setFormData({...formData, electrical: e.target.value})}
                           placeholder="e.g. 400Ah Lithium..."
                           className="w-full bg-brand-obsidian border border-brand-border p-4 font-mono text-xs text-brand-white focus:outline-none"
                         />
                      </div>
                      <div className="space-y-2">
                         <label className="font-mono text-[9px] text-brand-grey uppercase tracking-widest">Climate System</label>
                         <input 
                           type="text" required
                           value={formData.heating}
                           onChange={e => setFormData({...formData, heating: e.target.value})}
                           placeholder="e.g. Truma Combi..."
                           className="w-full bg-brand-obsidian border border-brand-border p-4 font-mono text-xs text-brand-white focus:outline-none"
                         />
                      </div>
                      <div className="space-y-2">
                         <label className="font-mono text-[9px] text-brand-grey uppercase tracking-widest">Water Capacity</label>
                         <input 
                           type="text" required
                           value={formData.water}
                           onChange={e => setFormData({...formData, water: e.target.value})}
                           placeholder="e.g. 100L underslung..."
                           className="w-full bg-brand-obsidian border border-brand-border p-4 font-mono text-xs text-brand-white focus:outline-none"
                         />
                      </div>
                   </div>

                   <div className="space-y-2">
                      <label className="font-mono text-[9px] text-brand-grey uppercase tracking-widest">Build Narrative / Solutions</label>
                      <textarea 
                        required
                        rows={5}
                        value={formData.description}
                        onChange={e => setFormData({...formData, description: e.target.value})}
                        placeholder="Describe your design choices and any bespoke engineering hacks..."
                        className="w-full bg-brand-obsidian border border-brand-border p-4 font-mono text-xs text-brand-white focus:outline-none focus:border-brand-orange transition-colors resize-none"
                      />
                   </div>
                </div>

                {/* Submit */}
                <div className="pt-8 border-t border-brand-border/30">
                   {error && <p className="text-red-500 font-mono text-[9px] uppercase mb-4">{error}</p>}
                   <button 
                     type="submit"
                     disabled={loading}
                     className="w-full py-6 bg-brand-orange text-white font-display text-xs uppercase tracking-[0.3em] hover:bg-white hover:text-brand-orange transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-[0_20px_50px_rgba(255,107,0,0.15)]"
                   >
                     {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-5 h-5" /> Dispatch Submission</>}
                   </button>
                   <p className="mt-6 text-center font-mono text-[8px] text-brand-grey uppercase tracking-widest">
                      Engineering verification required before public indexing.
                   </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
