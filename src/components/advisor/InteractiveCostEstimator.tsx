"use client";

import { useState, useMemo } from "react";
import { 
  COST_TIERS, 
  SYSTEM_BASE_COSTS, 
  CostTier 
} from "@/lib/data/advisor";
import { motion } from "framer-motion";
import { 
  PoundSterling, 
  Activity, 
  Battery, 
  Flame, 
  Droplets,
  Hammer,
  ShieldCheck,
  Zap,
  Layout
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function InteractiveCostEstimator() {
  const [tier, setTier] = useState<CostTier>(COST_TIERS[1]); // Default to Mid
  const [chassisCost, setChassisCost] = useState(15000); // Average used van price
  const [labourEnabled, setLabourEnabled] = useState(false);

  const calculations = useMemo(() => {
    const buildCost = Object.values(SYSTEM_BASE_COSTS).reduce((acc, val) => acc + (val * tier.multiplier), 0);
    const labourCost = labourEnabled ? buildCost * 0.8 : 0; // Rough pro labour estimate
    const total = chassisCost + buildCost + labourCost;
    
    // Performance score (1-100)
    const score = Math.min(100, Math.round((tier.multiplier / 5) * 100));

    return {
      buildOnly: Math.round(buildCost),
      labour: Math.round(labourCost),
      total: Math.round(total),
      score
    };
  }, [tier, chassisCost, labourEnabled]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      {/* Configuration Controls */}
      <div className="lg:col-span-12">
        <div className="flex flex-col md:flex-row gap-6 mb-12">
           {COST_TIERS.map((t) => (
             <button
               key={t.id}
               onClick={() => setTier(t)}
               className={cn(
                 "flex-1 p-6 blueprint-border text-left transition-all",
                 tier.id === t.id ? "bg-brand-orange/10 border-brand-orange" : "bg-brand-carbon border-brand-border grayscale"
               )}
             >
                <div className="flex justify-between items-start mb-4">
                   <h4 className="font-display text-lg uppercase italic">{t.name}</h4>
                   <span className={cn("text-xs font-mono px-2 py-1", tier.id === t.id ? "bg-brand-orange text-white" : "bg-brand-border text-brand-grey")}>TIER {COST_TIERS.indexOf(t) + 1}</span>
                </div>
                <p className="font-sans text-[10px] text-brand-grey leading-tight mb-4">{t.description}</p>
                <p className="font-mono text-xs text-brand-orange font-bold uppercase">{t.range}</p>
             </button>
           ))}
        </div>
      </div>

      {/* Main Analysis Area */}
      <div className="lg:col-span-7 space-y-12">
         <div className="blueprint-border p-10 bg-brand-carbon relative overflow-hidden">
            <div className="blueprint-grid absolute inset-0 opacity-10" />
            <h3 className="font-display text-xl mb-8 uppercase text-brand-white decoration-brand-orange underline underline-offset-8">Variable Parameters</h3>
            
            <div className="space-y-12">
               <div>
                  <div className="flex justify-between items-center mb-4">
                     <span className="font-mono text-[10px] text-brand-grey uppercase tracking-widest italic">Chassis Purchase Price</span>
                     <span className="font-display text-xl text-brand-orange">£{chassisCost.toLocaleString()}</span>
                  </div>
                  <input 
                    type="range" 
                    min="5000" 
                    max="45000" 
                    step="500" 
                    value={chassisCost}
                    onChange={(e) => setChassisCost(parseInt(e.target.value))}
                    className="w-full accent-brand-orange h-1 bg-brand-border appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between mt-2 font-mono text-[8px] text-brand-grey uppercase italic">
                     <span>Bargain / High Miles</span>
                     <span>Pristine / New Chassis</span>
                  </div>
               </div>

               <div className="flex items-center justify-between p-6 bg-brand-obsidian border border-brand-border">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 bg-brand-orange/10 border border-brand-orange/30 flex items-center justify-center">
                        <Hammer className="w-5 h-5 text-brand-orange" />
                     </div>
                     <div>
                        <p className="font-display text-sm uppercase">Pro-Labour Estimation</p>
                        <p className="font-sans text-[10px] text-brand-grey">Factor in professional workshop fees (+80% parts cost)</p>
                     </div>
                  </div>
                  <button 
                    onClick={() => setLabourEnabled(!labourEnabled)}
                    className={cn(
                      "w-12 h-6 rounded-full relative transition-colors",
                      labourEnabled ? "bg-brand-orange" : "bg-brand-border"
                    )}
                  >
                     <div className={cn(
                       "absolute top-1 w-4 h-4 bg-white transition-all",
                       labourEnabled ? "left-7" : "left-1"
                     )} />
                  </button>
               </div>
            </div>
         </div>

         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Electrical", cost: SYSTEM_BASE_COSTS.electrical * tier.multiplier, icon: Zap },
              { label: "Water", cost: SYSTEM_BASE_COSTS.water * tier.multiplier, icon: Droplets },
              { label: "Heating", cost: SYSTEM_BASE_COSTS.heating * tier.multiplier, icon: Flame },
              { label: "Joinery", cost: SYSTEM_BASE_COSTS.cabinetry * tier.multiplier, icon: Layout },
            ].map((s) => (
              <div key={s.label} className="blueprint-border p-6 bg-brand-carbon text-center">
                 <s.icon className="w-5 h-5 text-brand-orange mx-auto mb-4 opacity-50" />
                 <p className="font-mono text-[8px] text-brand-grey uppercase tracking-widest mb-1">{s.label}</p>
                 <p className="font-display text-sm text-brand-white italic">£{Math.round(s.cost).toLocaleString()}</p>
              </div>
            ))}
         </div>
      </div>

      {/* Result Sidebar */}
      <div className="lg:col-span-5">
         <div className="sticky top-32 space-y-6">
            <div className="blueprint-border p-10 bg-brand-orange text-white text-center shadow-[0_0_50px_rgba(255,107,0,0.15)]">
               <span className="font-mono text-[10px] uppercase tracking-[0.4em] mb-4 block underline underline-offset-4 decoration-white/30">Total Project Estimate</span>
               <h2 className="font-display text-6xl lg:text-7xl leading-none italic mb-4">£{calculations.total.toLocaleString()}</h2>
               <div className="border-t border-white/20 pt-6 mt-6 flex justify-between items-center text-left">
                  <div>
                     <p className="font-mono text-[8px] uppercase tracking-widest opacity-80">Build Level Score</p>
                     <p className="font-display text-2xl uppercase italic">{calculations.score}% MONSTER</p>
                  </div>
                  <Activity className="w-8 h-8 opacity-40 shrink-0" />
               </div>
            </div>

            <div className="blueprint-border p-8 bg-brand-carbon italic">
               <h4 className="font-display text-xs uppercase mb-6 flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4 text-brand-orange" /> Sourcing Strategy
               </h4>
               <p className="font-sans text-[11px] text-brand-grey leading-relaxed">
                  {tier.id === "pro" 
                    ? "In this tier, every component is sourced for maximum reliability. Expect full Victron integration and hybrid marine-grade heating systems. Resale value will be exceptionally high." 
                    : "Focus on functional essentials. You are prioritising utility over automation. Significant savings possible by sourcing used components for non-critical systems."}
               </p>
            </div>
         </div>
      </div>
    </div>
  );
}
