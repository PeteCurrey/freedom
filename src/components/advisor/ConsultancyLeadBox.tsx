"use client";

import { useState } from "react";
import { 
  Wrench, 
  Send, 
  CheckCircle2, 
  Loader2, 
  ShieldCheck,
  Zap
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";

export default function ConsultancyLeadBox() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          type: "consultancy",
          content: { 
            message,
            timestamp: new Date().toISOString()
          },
          userId: user?.id
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
      <div className="blueprint-border bg-brand-carbon p-12 text-center">
        <div className="w-16 h-16 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center text-green-500 mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h4 className="font-display text-2xl uppercase mb-4">Transmission Received</h4>
        <p className="font-sans text-brand-grey text-sm mb-0">Our engineering team has received your brief. Expect a response within 24 working hours.</p>
      </div>
    );
  }

  return (
    <div className="blueprint-border bg-brand-carbon relative overflow-hidden group">
      <div className="blueprint-grid absolute inset-0 opacity-10 pointer-events-none" />
      
      <div className="p-10 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-1/2">
            <div className="flex items-center gap-4 mb-6">
               <div className="p-3 bg-brand-orange/10 border border-brand-orange/30">
                  <Wrench className="w-6 h-6 text-brand-orange" />
               </div>
               <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[.4em]">// PREMIUM CONSULTANCY</span>
            </div>
            <h3 className="font-display text-4xl lg:text-5xl uppercase mb-6 leading-none tracking-tighter italic">
              REQUEST <span className="text-brand-orange">ENGINEERING</span> REVIEW
            </h3>
            <p className="font-sans text-brand-grey text-base leading-relaxed mb-8">
              Bespoke build planning is complex. Our senior engineers provide one-to-one layout reviews, electrical schematic validation, and weight distribution auditing.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-xs font-mono text-brand-white uppercase italic">
                <ShieldCheck className="w-4 h-4 text-brand-orange" /> UK Gas Safe & RCD Compliance Audits
              </div>
              <div className="flex items-center gap-3 text-xs font-mono text-brand-white uppercase italic">
                <Zap className="w-4 h-4 text-brand-orange" /> Optimized Power Distribution Design
              </div>
            </div>
          </div>

          <div className="lg:w-1/2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="font-mono text-[9px] text-brand-grey uppercase tracking-widest">Builder Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-brand-obsidian border border-brand-border p-4 font-mono text-xs text-brand-white focus:outline-none focus:border-brand-orange transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="font-mono text-[9px] text-brand-grey uppercase tracking-widest">Build Intent / Brief</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your goals, chosen chassis, and any specific engineering blockers..."
                  className="w-full bg-brand-obsidian border border-brand-border p-4 font-mono text-xs text-brand-white focus:outline-none focus:border-brand-orange transition-colors resize-none"
                />
              </div>

              {error && (
                <p className="text-red-500 font-mono text-[9px] uppercase">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-5 bg-brand-orange text-white font-display text-xs uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all flex items-center justify-center gap-3"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Send className="w-4 h-4" /> Dispatch Request</>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
