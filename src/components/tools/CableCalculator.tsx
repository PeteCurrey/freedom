"use client";

import { useState, useEffect } from "react";
import { 
  Zap, 
  ArrowRight, 
  ShieldAlert, 
  Dna, 
  Info,
  Scale
} from "lucide-react";
import { cn } from "@/lib/utils";

const VOLTAGES = [12, 24, 48];
const DROPS = [
  { label: "Critical (1%)", value: 0.01 },
  { label: "Standard (3%)", value: 0.03 }
];

// Calculation Logic:
// Area (mm2) = (Current * Distance * 2 * Resistivity) / (Voltage * Drop)
// Resistivity of Copper = 0.0172
const COPPER_RESISTIVITY = 0.0175;

export default function CableCalculator() {
  const [voltage, setVoltage] = useState(12);
  const [current, setCurrent] = useState(50);
  const [distance, setDistance] = useState(2);
  const [drop, setDrop] = useState(0.03);
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {
    // Distance * 2 because it's a round trip (positive + negative)
    const area = (current * distance * 2 * COPPER_RESISTIVITY) / (voltage * drop);
    setResult(area);
  }, [voltage, current, distance, drop]);

  const getAWG = (mm2: number) => {
    if (mm2 <= 1.5) return "16 AWG";
    if (mm2 <= 2.5) return "14 AWG";
    if (mm2 <= 4) return "12 AWG";
    if (mm2 <= 6) return "10 AWG";
    if (mm2 <= 10) return "8 AWG";
    if (mm2 <= 16) return "6 AWG";
    if (mm2 <= 25) return "4 AWG";
    if (mm2 <= 35) return "2 AWG";
    if (mm2 <= 50) return "0 AWG (1/0)";
    if (mm2 <= 70) return "2/0 AWG";
    if (mm2 <= 95) return "3/0 AWG";
    return "4/0 AWG+";
  };

  return (
    <div className="blueprint-border bg-brand-carbon p-10 lg:p-16 relative overflow-hidden">
      <div className="blueprint-grid absolute inset-0 opacity-10 pointer-events-none" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-12">
           <div className="p-3 bg-brand-orange/10 border border-brand-orange/30">
              <Zap className="w-6 h-6 text-brand-orange" />
           </div>
           <div>
              <h2 className="font-display text-2xl uppercase italic">CABLE SIZING TOOL</h2>
              <p className="font-mono text-[9px] text-brand-grey uppercase tracking-widest">Engineering Utility v1.0.4</p>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
           {/* Inputs */}
           <div className="lg:col-span-7 space-y-8">
              <div className="grid grid-cols-2 gap-8">
                 <div className="space-y-4">
                    <label className="font-mono text-[9px] text-brand-grey uppercase tracking-widest block">System Voltage</label>
                    <div className="flex gap-2">
                       {VOLTAGES.map(v => (
                         <button 
                           key={v}
                           onClick={() => setVoltage(v)}
                           className={cn(
                             "flex-1 py-3 font-display text-[10px] border transition-all",
                             voltage === v ? "bg-brand-orange border-brand-orange text-white" : "border-brand-border text-brand-grey hover:border-brand-grey"
                           )}
                         >
                           {v}V
                         </button>
                       ))}
                    </div>
                 </div>

                 <div className="space-y-4">
                    <label className="font-mono text-[9px] text-brand-grey uppercase tracking-widest block">Max Permitted Drop</label>
                    <div className="flex gap-2">
                       {DROPS.map(d => (
                         <button 
                           key={d.value}
                           onClick={() => setDrop(d.value)}
                           className={cn(
                             "flex-1 py-3 font-display text-[10px] border transition-all leading-tight",
                             drop === d.value ? "bg-brand-orange border-brand-orange text-white" : "border-brand-border text-brand-grey hover:border-brand-grey"
                           )}
                         >
                           {d.label}
                         </button>
                       ))}
                    </div>
                 </div>
              </div>

              <div className="space-y-8">
                 <div className="space-y-4">
                    <div className="flex justify-between items-end">
                       <label className="font-mono text-[9px] text-brand-grey uppercase tracking-widest">Max Current (Amps)</label>
                       <span className="font-display text-xl text-brand-orange">{current}A</span>
                    </div>
                    <input 
                      type="range" min="1" max="400" step="5"
                      value={current}
                      onChange={(e) => setCurrent(parseInt(e.target.value))}
                      className="w-full accent-brand-orange h-1 bg-brand-obsidian appearance-none rounded-full cursor-pointer"
                    />
                 </div>

                 <div className="space-y-4">
                    <div className="flex justify-between items-end">
                       <label className="font-mono text-[9px] text-brand-grey uppercase tracking-widest">Cable Run Distance (One-Way Metres)</label>
                       <span className="font-display text-xl text-brand-orange">{distance}m</span>
                    </div>
                    <input 
                      type="range" min="1" max="20" step="0.5"
                      value={distance}
                      onChange={(e) => setDistance(parseFloat(e.target.value))}
                      className="w-full accent-brand-orange h-1 bg-brand-obsidian appearance-none rounded-full cursor-pointer"
                    />
                 </div>
              </div>

              <div className="p-6 bg-brand-obsidian/50 border-l-2 border-brand-orange flex gap-4">
                 <ShieldAlert className="w-5 h-5 text-brand-orange shrink-0 mt-1" />
                 <p className="font-sans text-[10px] text-brand-grey uppercase italic leading-loose">
                    This tool calculates the required cross-section (mm²) based on voltage drop. Safety-critical circuits (chargers, heaters) should target a 1% drop. 
                    Always round UP to the nearest available cable size.
                 </p>
              </div>
           </div>

           {/* Result Display */}
           <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="blueprint-border bg-brand-obsidian p-10 text-center relative">
                 <div className="absolute top-4 left-4">
                    <Dna className="w-4 h-4 text-brand-orange/20" />
                 </div>
                 
                 <p className="font-mono text-[10px] text-brand-grey uppercase tracking-[.3em] mb-4">Calculated Spec</p>
                 <div className="font-display text-5xl lg:text-7xl text-brand-white mb-2">
                    {result?.toFixed(1)}<span className="text-brand-orange text-2xl">mm²</span>
                 </div>
                 <p className="font-mono text-[10px] text-brand-orange uppercase tracking-widest mb-10">Equivalent to {getAWG(result || 0)}</p>
                 
                 <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-t border-brand-border/30">
                       <span className="font-mono text-[8px] text-brand-grey uppercase">Resistance Factor</span>
                       <span className="font-mono text-[10px] text-brand-white">0.0175 Ω·mm²/m</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-t border-brand-border/30">
                       <span className="font-mono text-[8px] text-brand-grey uppercase">Total Round-Trip</span>
                       <span className="font-mono text-[10px] text-brand-white">{distance * 2}m</span>
                    </div>
                 </div>

                 <button className="w-full mt-10 py-4 bg-brand-orange/10 border border-brand-orange text-brand-orange font-display text-[10px] uppercase tracking-widest hover:bg-brand-orange hover:text-white transition-all flex items-center justify-center gap-2">
                    View Compatible Cables <ArrowRight className="w-3 h-3" />
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
