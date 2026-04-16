"use client";

import { useState, useMemo } from "react";
import { Zap, Sun, CloudRain, Snowflake, Info, Plus, Trash2, Battery } from "lucide-react";
import { cn } from "@/lib/utils";

interface Consumer {
  id: string;
  name: string;
  watts: number;
  hoursPerDay: number;
}

const defaultConsumers: Consumer[] = [
  { id: "1", name: "12V Fridge", watts: 45, hoursPerDay: 8 },
  { id: "2", name: "LED Lighting", watts: 20, hoursPerDay: 4 },
  { id: "3", name: "USB Charging", watts: 15, hoursPerDay: 3 },
  { id: "4", name: "Water Pump", watts: 40, hoursPerDay: 0.1 },
];

const seasonalSolar = {
  summer: 4.5, // Peak sun hours UK summer
  shoulder: 2.2, // Spring/Autumn
  winter: 0.5, // Winter gloom
};

export function PowerCalculator() {
  const [consumers, setConsumers] = useState<Consumer[]>(defaultConsumers);
  const [solarWatts, setSolarWatts] = useState(200);
  const [batteryAh, setBatteryAh] = useState(100);
  const [season, setSeason] = useState<keyof typeof seasonalSolar>("summer");

  const totals = useMemo(() => {
    const dailyWh = consumers.reduce((acc, c) => acc + (c.watts * c.hoursPerDay), 0);
    const dailyAh = dailyWh / 12; // Standard 12V system
    
    const solarYieldWh = solarWatts * seasonalSolar[season] * 0.8; // 80% efficiency factor
    const netAh = (solarYieldWh / 12) - dailyAh;
    
    // Autonomy calculation (Days until battery at 20% / DOD)
    // For Lithium (90% DOD), for AGM (50% DOD) - assuming Lithium for pro builds
    const usableAh = batteryAh * 0.9;
    const autonomyDays = usableAh / dailyAh;

    return { dailyWh, dailyAh, solarYieldWh, netAh, autonomyDays };
  }, [consumers, solarWatts, season, batteryAh]);

  const addConsumer = () => {
    const newConsumer = { id: Math.random().toString(), name: "New Load", watts: 10, hoursPerDay: 1 };
    setConsumers([...consumers, newConsumer]);
  };

  const removeConsumer = (id: string) => {
    setConsumers(consumers.filter(c => c.id !== id));
  };

  const updateConsumer = (id: string, field: keyof Consumer, value: any) => {
    setConsumers(consumers.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  return (
    <div className="blueprint-border bg-brand-carbon p-8 lg:p-12 relative overflow-hidden">
      <div className="blueprint-grid absolute inset-0 opacity-10 pointer-events-none" />
      
      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Inputs Section */}
          <div className="flex-1 space-y-12">
            <div>
              <h2 className="font-display text-3xl uppercase mb-2">POWER BUDGETING</h2>
              <p className="font-sans text-brand-grey text-sm">Calculate your energy balance for true off-grid autonomy.</p>
            </div>

            {/* Load Manager */}
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <span className="font-mono text-[10px] text-brand-grey uppercase tracking-widest">Daily DC Loads</span>
                <button onClick={addConsumer} className="text-brand-orange hover:text-white transition-colors flex items-center gap-2 font-mono text-[10px] uppercase">
                  <Plus className="w-3 h-3" /> Add Item
                </button>
              </div>
              
              <div className="space-y-2">
                {consumers.map((c) => (
                  <div key={c.id} className="grid grid-cols-12 gap-4 items-center bg-brand-obsidian p-4 border border-brand-border/30">
                    <input 
                      type="text" 
                      value={c.name} 
                      onChange={(e) => updateConsumer(c.id, "name", e.target.value)}
                      className="col-span-4 bg-transparent border-none text-[11px] font-mono text-brand-white focus:ring-0"
                    />
                    <div className="col-span-3 flex items-center gap-2">
                       <input 
                         type="number" 
                         value={c.watts} 
                         onChange={(e) => updateConsumer(c.id, "watts", parseFloat(e.target.value))}
                         className="w-16 bg-brand-carbon border border-brand-border p-2 text-[10px] font-mono text-center"
                       />
                       <span className="font-mono text-[8px] text-brand-grey">W</span>
                    </div>
                    <div className="col-span-3 flex items-center gap-2">
                       <input 
                         type="number" 
                         value={c.hoursPerDay} 
                         onChange={(e) => updateConsumer(c.id, "hoursPerDay", parseFloat(e.target.value))}
                         className="w-16 bg-brand-carbon border border-brand-border p-2 text-[10px] font-mono text-center"
                       />
                       <span className="font-mono text-[8px] text-brand-grey">HRS</span>
                    </div>
                    <button onClick={() => removeConsumer(c.id)} className="col-span-2 text-brand-grey hover:text-red-500 transition-colors flex justify-end">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Solar & Storage */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-brand-border/30">
               <div className="space-y-4">
                 <label className="font-mono text-[10px] text-brand-grey uppercase tracking-widest block">Solar Array Size (W)</label>
                 <div className="flex items-center gap-4">
                    <input 
                      type="range" min="0" max="1000" step="50" 
                      value={solarWatts} 
                      onChange={(e) => setSolarWatts(parseInt(e.target.value))}
                      className="flex-1 accent-brand-orange"
                    />
                    <span className="font-display text-2xl text-brand-white w-20">{solarWatts}W</span>
                 </div>
               </div>
               <div className="space-y-4">
                 <label className="font-mono text-[10px] text-brand-grey uppercase tracking-widest block">Battery Capacity (Ah)</label>
                 <div className="flex items-center gap-4">
                    <input 
                      type="range" min="100" max="800" step="100" 
                      value={batteryAh} 
                      onChange={(e) => setBatteryAh(parseInt(e.target.value))}
                      className="flex-1 accent-brand-orange"
                    />
                    <span className="font-display text-2xl text-brand-white w-20">{batteryAh}Ah</span>
                 </div>
               </div>
            </div>
          </div>

          {/* Results Sidebar */}
          <div className="lg:w-96">
            <div className="blueprint-border bg-brand-obsidian p-10 space-y-8 sticky top-32">
               <div className="text-center pb-8 border-b border-brand-border/30">
                  <p className="font-mono text-[8px] text-brand-grey uppercase tracking-widest mb-2">Energy Balance</p>
                  <div className={cn(
                    "font-display text-5xl",
                    totals.netAh >= 0 ? "text-green-500" : "text-brand-orange"
                   )}>
                    {totals.netAh >= 0 ? "+" : ""}{Math.round(totals.netAh)}Ah<span className="text-xs uppercase ml-2 text-brand-grey">/Day</span>
                  </div>
               </div>

               <div className="space-y-6">
                  {/* Seasonal Switcher */}
                  <div className="grid grid-cols-3 gap-2">
                     {(['summer', 'shoulder', 'winter'] as const).map((s) => (
                       <button
                         key={s}
                         onClick={() => setSeason(s)}
                         className={cn(
                           "flex flex-col items-center gap-2 p-3 border font-mono text-[8px] uppercase tracking-tighter transition-all",
                           season === s ? "border-brand-orange bg-brand-orange/10 text-brand-orange" : "border-brand-border text-brand-grey"
                         )}
                       >
                         {s === 'summer' && <Sun className="w-4 h-4" />}
                         {s === 'shoulder' && <CloudRain className="w-4 h-4" />}
                         {s === 'winter' && <Snowflake className="w-4 h-4" />}
                         {s}
                       </button>
                     ))}
                  </div>

                  <div className="pt-8 space-y-4">
                    <div className="flex justify-between items-end">
                       <span className="font-mono text-[9px] text-brand-grey uppercase">Daily Consumption</span>
                       <span className="font-display text-xl">{Math.round(totals.dailyAh)} Ah</span>
                    </div>
                    <div className="flex justify-between items-end">
                       <span className="font-mono text-[9px] text-brand-grey uppercase">Estimated Solar Gain</span>
                       <span className="font-display text-xl text-brand-orange">+{Math.round(totals.solarYieldWh / 12)} Ah</span>
                    </div>
                    <div className="flex justify-between items-end pt-4 border-t border-brand-border/30">
                       <span className="font-mono text-[9px] text-brand-white uppercase">Autonomy (No Sun)</span>
                       <span className={cn(
                         "font-display text-xl",
                         totals.autonomyDays < 2 ? "text-red-500" : "text-brand-white"
                       )}>
                         {totals.autonomyDays.toFixed(1)} Days
                       </span>
                    </div>
                  </div>

                  {totals.autonomyDays < 2 && (
                    <div className="p-4 bg-red-500/10 border border-red-500/30 flex gap-3">
                       <Info className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                       <p className="text-[9px] leading-relaxed text-red-500 uppercase font-mono">
                          CRITICAL: Insufficient reserve. Add a 2nd battery or increase solar array to maintain system health.
                       </p>
                    </div>
                  )}

                  <button className="w-full py-4 bg-brand-orange text-white font-display text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all mt-4">
                     Add To Build Blueprint →
                  </button>
               </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
