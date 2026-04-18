"use client";

import { useState, useMemo } from "react";
import { Plus, PoundSterling, Layers, ChevronRight, Calculator, PieChart, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Tier {
  id: string;
  name: string;
  description: string;
  costRange: [number, number];
  components: string[];
  color: string;
}

interface SystemCategory {
  id: string;
  name: string;
  description: string;
  tiers: Tier[];
}

const SYSTEMS: SystemCategory[] = [
  {
    id: "electrical",
    name: "Electrical Hub",
    description: "The technical heart of your build. From basic battery sets to networked lithium architectures.",
    tiers: [
      {
        id: "e1",
        name: "Bronze (Essentials)",
        description: "Generic PWM charging, Lead-Acid batteries, basic split-charge. Functional but limited expansion.",
        costRange: [1200, 1800],
        components: ["Generic AGM Battery", "PWM Solar Controller", "Voltage Sensitive Relay", "Basic Blade Fusing"],
        color: "text-amber-700"
      },
      {
        id: "e2",
        name: "Silver (Reliability)",
        description: "Entry-level Victron/Renogy hardware. Smart charging, DC-DC engine charging, larger solar arrays.",
        costRange: [2500, 3800],
        components: ["Renogy Lithium Iron Phosphate", "Victron SmartSolar MPPT", "30A DC-DC Charger", "Pure Sine Inverter"],
        color: "text-slate-400"
      },
      {
        id: "e3",
        name: "Gold (State-of-the-Art)",
        description: "Full Victron integration. MultiPlus Inverter/Chargers, Cerbo GX monitoring, high-density Lithium.",
        costRange: [6000, 9500],
        components: ["Victron MultiPlus-II 3kVA", "Cerbo GX Hub", "400Ah+ Smart Lithium", "Lynx Distributor Architecture"],
        color: "text-brand-orange"
      }
    ]
  },
  {
    id: "heating",
    name: "Climate & Hot Water",
    description: "Multi-fuel heating solutions and pressurized hot water systems for year-round comfort.",
    tiers: [
      {
        id: "h1",
        name: "Bronze (Air Only)",
        description: "Standard diesel air heater (Eberspacher/Webasto) with basic controls. No hot water.",
        costRange: [800, 1200],
        components: ["Webasto Air Top 2000 STC", "Digital Controller", "Standard Ducting"],
        color: "text-amber-700"
      },
      {
        id: "h2",
        name: "Silver (Dual System)",
        description: "Integrated air and water heating. Truma Combi series or equivalent gas/electric hybrid.",
        costRange: [2200, 3500],
        components: ["Truma Combi 4E / 6E", "iNet X Controller", "Integrated 10L Tank"],
        color: "text-slate-400"
      }
    ]
  },
  {
    id: "water",
    name: "Water & Plumbing",
    description: "From simple submersible pumps to high-flow filtration and high-capacity tankage.",
    tiers: [
      {
        id: "w1",
        name: "Bronze (Gravity/Sub)",
        description: "Simple cold-water setup. Submersible pump, Jerry can tanking.",
        costRange: [150, 400],
        components: ["Submersible 12V Pump", "Comet Taps", "25L Fresh/Waste Cans"],
        color: "text-amber-700"
      },
      {
        id: "w2",
        name: "Gold (Full Marine)",
        description: "Pressurized Shurflo system, underslung high-capacity tanks, UV filtration.",
        costRange: [1200, 2400],
        components: ["Shurflo Trail King 7", "Underslung 80L+ Tanks", "UV/Carbon Filtration Hub"],
        color: "text-brand-orange"
      }
    ]
  }
];

export default function CostEstimator() {
  const [selections, setSelections] = useState<Record<string, string>>({
    electrical: "e1",
    heating: "h1",
    water: "w1",
  });

  const totals = useMemo(() => {
    let minTotal = 0;
    let maxTotal = 0;

    Object.entries(selections).forEach(([catId, tierId]) => {
      const category = SYSTEMS.find(s => s.id === catId);
      const tier = category?.tiers.find(t => t.id === tierId);
      if (tier) {
        minTotal += tier.costRange[0];
        maxTotal += tier.costRange[1];
      }
    });

    return [minTotal, maxTotal];
  }, [selections]);

  const updateSelection = (catId: string, tierId: string) => {
    setSelections(prev => ({ ...prev, [catId]: tierId }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      {/* Selection Hub */}
      <div className="lg:col-span-12 xl:col-span-7 space-y-12">
        {SYSTEMS.map((system) => (
          <div key={system.id} className="blueprint-border p-8 bg-brand-carbon/30">
            <div className="flex items-center gap-4 mb-2 border-b border-brand-border pb-6 mb-8">
              <Layers className="text-brand-orange w-5 h-5" />
              <h2 className="font-display text-2xl uppercase tracking-widest">{system.name}</h2>
            </div>
            
            <p className="font-sans text-brand-grey text-sm mb-8 leading-relaxed">
              {system.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {system.tiers.map((tier) => (
                <button
                  key={tier.id}
                  onClick={() => updateSelection(system.id, tier.id)}
                  className={cn(
                    "p-6 h-full flex flex-col border transition-all text-left group",
                    selections[system.id] === tier.id 
                      ? "bg-brand-orange/5 border-brand-orange ring-1 ring-brand-orange" 
                      : "bg-brand-obsidian border-brand-border hover:border-brand-grey"
                  )}
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className={cn("font-mono text-[8px] uppercase tracking-tighter", tier.color)}>
                      {tier.name.split(' ')[0]} Path //
                    </span>
                    {selections[system.id] === tier.id && <CheckCircle2 className="w-4 h-4 text-brand-orange" />}
                  </div>
                  <h3 className="font-display text-xs uppercase mb-2 group-hover:text-brand-orange transition-colors">
                    {tier.name.split(' (')[0]}
                  </h3>
                  <p className="font-mono text-[11px] text-white/80 leading-tight mb-4">
                    £{tier.costRange[0].toLocaleString()} - £{tier.costRange[1].toLocaleString()}
                  </p>
                  <div className="mt-auto pt-4 border-t border-brand-border/50">
                    <span className="font-mono text-[8px] text-brand-grey uppercase tracking-widest">Typical registry nodes:</span>
                    <ul className="mt-2 space-y-1">
                      {tier.components.slice(0, 2).map(c => (
                        <li key={c} className="font-mono text-[8px] text-brand-grey truncate">• {c}</li>
                      ))}
                    </ul>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Ledger Hub */}
      <div className="lg:col-span-12 xl:col-span-5">
        <div className="sticky top-48 blueprint-border p-12 bg-brand-carbon">
           <div className="flex items-center gap-3 mb-12 italic">
              <Calculator className="text-brand-orange w-4 h-4" />
              <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[.4em]">// Budget Forecast Ledger</span>
           </div>

           <div className="space-y-8 mb-16">
              <div className="flex justify-between items-end border-b border-brand-border pb-6">
                 <div>
                    <span className="font-mono text-[10px] text-brand-grey uppercase italic block mb-2">Estimated Baseline (Inc. VAT)</span>
                    <span className="font-display text-6xl text-white">£{totals[0].toLocaleString()}</span>
                 </div>
              </div>
              <div className="flex justify-between items-end border-b border-brand-border pb-6">
                 <div>
                    <span className="font-mono text-[10px] text-brand-grey uppercase italic block mb-2">High-Side Forecast</span>
                    <span className="font-display text-6xl text-brand-orange">£{totals[1].toLocaleString()}</span>
                 </div>
              </div>
           </div>

           <div className="bg-brand-obsidian p-6 border border-brand-border mb-12">
              <div className="flex items-center gap-3 mb-4">
                 <PieChart className="text-brand-orange w-4 h-4" />
                 <span className="font-mono text-[10px] text-white uppercase tracking-widest">Cost Allocation Hub</span>
              </div>
              <div className="h-4 bg-brand-border w-full flex overflow-hidden">
                 {SYSTEMS.map((system) => {
                   const tier = system.tiers.find(t => t.id === selections[system.id]);
                   const percentage = (tier?.costRange[0] || 0) / totals[0] * 100;
                   return (
                     <div 
                      key={system.id} 
                      style={{ width: `${percentage}%` }}
                      className={cn(
                        "h-full border-r border-brand-obsidian",
                        system.id === 'electrical' ? 'bg-brand-orange' : 
                        system.id === 'heating' ? 'bg-orange-800' : 'bg-orange-400'
                      )}
                     />
                   );
                 })}
              </div>
              <div className="mt-4 flex flex-wrap gap-4">
                 {SYSTEMS.map((system) => (
                   <div key={system.id} className="flex items-center gap-2">
                      <div className={cn(
                        "w-2 h-2",
                        system.id === 'electrical' ? 'bg-brand-orange' : 
                        system.id === 'heating' ? 'bg-orange-800' : 'bg-orange-400'
                      )} />
                      <span className="font-mono text-[8px] text-brand-grey uppercase">{system.name}</span>
                   </div>
                 ))}
              </div>
           </div>

           <button className="w-full py-6 bg-white text-brand-obsidian font-display text-xs uppercase tracking-[0.3em] hover:bg-brand-orange hover:text-white transition-all shadow-2xl">
              Export Component List
           </button>
        </div>
      </div>
    </div>
  );
}
