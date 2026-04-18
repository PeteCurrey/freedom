"use client";

import { useState, useMemo } from "react";
import { Plus, Trash2, Weight, Info, AlertTriangle, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface WeightNode {
  id: string;
  name: string;
  weight: number;
  category: "base" | "fluid" | "component" | "build" | "person";
}

const INITIAL_NODES: WeightNode[] = [
  { id: "1", name: "Base Vehicle (Empty)", weight: 2200, category: "base" },
  { id: "2", name: "Driver", weight: 80, category: "person" },
];

const PRESETS = [
  { name: "Fresh Water (100L)", weight: 100, category: "fluid" },
  { name: "Diesel (Full Tank)", weight: 65, category: "fluid" },
  { name: "Kitchen Galley (Plywood)", weight: 45, category: "build" },
  { name: "Lithium Battery (100Ah)", weight: 12, category: "component" },
  { name: "Solar Panel (400W)", weight: 22, category: "component" },
  { name: "MaxxFan Deluxe", weight: 6, category: "component" },
] as const;

export default function PayloadCalculator() {
  const [nodes, setNodes] = useState<WeightNode[]>(INITIAL_NODES);
  const [gvm, setGvm] = useState(3500); // Default common limit

  const totalWeight = useMemo(() => nodes.reduce((acc, node) => acc + node.weight, 0), [nodes]);
  const percentage = Math.min((totalWeight / gvm) * 100, 100);
  const isOver = totalWeight > gvm;

  const addNode = (preset?: typeof PRESETS[number]) => {
    const newNode: WeightNode = {
      id: Math.random().toString(36).substr(2, 9),
      name: preset?.name || "New Node",
      weight: preset?.weight || 0,
      category: preset?.category || "component",
    };
    setNodes([...nodes, newNode]);
  };

  const removeNode = (id: string) => {
    setNodes(nodes.filter((n) => n.id !== id));
  };

  const updateWeight = (id: string, weight: number) => {
    setNodes(nodes.map((n) => (n.id === id ? { ...n, weight } : n)));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      {/* Left Column: Calculator Hub */}
      <div className="lg:col-span-12 xl:col-span-8 flex flex-col gap-8">
        <div className="blueprint-border p-10 bg-brand-carbon/30">
          <div className="flex items-center justify-between mb-12 border-b border-brand-border pb-6">
            <h2 className="font-display text-2xl uppercase italic tracking-widest">Weight Registry // Node List</h2>
            <div className="flex items-center gap-4">
               <span className="font-mono text-[10px] text-brand-grey uppercase">GVM Target:</span>
               <input 
                 type="number" 
                 value={gvm} 
                 onChange={(e) => setGvm(Number(e.target.value))}
                 className="bg-brand-obsidian border border-brand-border px-4 py-2 font-mono text-xs text-brand-orange focus:outline-none w-24 text-center"
               />
               <span className="font-mono text-[10px] text-brand-grey uppercase">KG</span>
            </div>
          </div>

          <div className="space-y-3">
            {nodes.map((node) => (
              <div key={node.id} className="flex items-center gap-4 p-4 bg-brand-obsidian border border-brand-border group hover:border-brand-orange/40 transition-all">
                <div className="w-8 h-8 flex items-center justify-center text-brand-orange opacity-40 group-hover:opacity-100">
                  <Weight size={16} />
                </div>
                <input 
                  type="text" 
                  value={node.name}
                  onChange={(e) => setNodes(nodes.map(n => n.id === node.id ? {...n, name: e.target.value} : n))}
                  className="flex-1 bg-transparent border-none font-mono text-xs uppercase tracking-widest text-white focus:outline-none placeholder:text-brand-grey/20"
                />
                <div className="flex items-center gap-3">
                   <input 
                     type="number" 
                     value={node.weight}
                     onChange={(e) => updateWeight(node.id, Number(e.target.value))}
                     className="bg-brand-carbon border border-brand-border px-4 py-2 font-mono text-xs text-white text-right w-24 focus:border-brand-orange transition-all outline-none"
                   />
                   <span className="font-mono text-[9px] text-brand-grey uppercase">kg</span>
                </div>
                {node.category !== 'base' && (
                  <button onClick={() => removeNode(node.id)} className="text-brand-grey hover:text-red-500 transition-colors p-2">
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
             {PRESETS.map((preset) => (
               <button 
                key={preset.name}
                onClick={() => addNode(preset)}
                className="px-4 py-2 border border-dashed border-brand-border hover:border-brand-orange hover:text-brand-orange transition-all font-mono text-[9px] uppercase tracking-widest"
               >
                 + {preset.name}
               </button>
             ))}
             <button 
              onClick={() => addNode()}
              className="px-4 py-2 bg-brand-orange text-white font-display text-[10px] uppercase tracking-widest"
             >
               Add Custom Item
             </button>
          </div>
        </div>
      </div>

      {/* Right Column: Visual Telemetry */}
      <div className="lg:col-span-12 xl:col-span-4 space-y-8">
        <div className="blueprint-border p-10 bg-brand-carbon flex flex-col items-center">
            <p className="font-mono text-[10px] text-brand-orange uppercase tracking-[.4em] mb-12 italic text-center text-balance">// Real-Time Payload Distribution</p>
            
            <div className="relative w-full aspect-square flex items-center justify-center mb-12">
               {/* Gauge Circle */}
               <svg className="w-full h-full -rotate-90">
                 <circle 
                   cx="50%" cy="50%" r="45%" 
                   className={cn("fill-none stroke-[4] stroke-brand-border transition-all duration-1000", isOver && "stroke-red-500/20")}
                 />
                 <circle 
                   cx="50%" cy="50%" r="45%" 
                   strokeDasharray="283" 
                   strokeDashoffset={283 - (283 * percentage) / 100}
                   className={cn(
                    "fill-none stroke-[8] transition-all duration-1000",
                    isOver ? "stroke-red-500" : percentage > 90 ? "stroke-orange-500" : "stroke-brand-orange"
                   )}
                 />
               </svg>
               <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className={cn("font-display text-8xl leading-none", isOver ? "text-red-500" : "text-white")}>{Math.round(percentage)}%</span>
                  <span className="font-mono text-[10px] text-brand-grey uppercase tracking-widest">of GVM Capacity</span>
               </div>
            </div>

            <div className="w-full space-y-8">
               <div className="flex justify-between items-end border-b border-brand-border pb-4">
                  <span className="font-mono text-[10px] text-brand-grey uppercase italic">Current Total Mass</span>
                  <span className={cn("font-display text-4xl", isOver ? "text-red-500" : "text-white")}>{totalWeight.toLocaleString()}kg</span>
               </div>
               <div className="flex justify-between items-end border-b border-brand-border pb-4">
                  <span className="font-mono text-[10px] text-brand-grey uppercase italic">Residual Payload</span>
                  <span className={cn("font-display text-4xl", isOver ? "text-red-500" : "text-brand-orange")}>{(gvm - totalWeight).toLocaleString()}kg</span>
               </div>
            </div>

            {isOver && (
              <div className="mt-8 p-6 bg-red-500/10 border border-red-500/30 flex gap-4 w-full">
                <AlertTriangle className="text-red-500 shrink-0" />
                <p className="font-mono text-[10px] text-red-500 leading-relaxed uppercase">
                  CRITICAL: Vehicle mass exceeds GVM limit. Structural and braking safety compromised. Legal non-compliance detected.
                </p>
              </div>
            )}
        </div>

        <div className="p-8 border-l-4 border-brand-orange bg-brand-carbon/50 space-y-4">
          <div className="flex items-center gap-3">
            <Info className="text-brand-orange w-4 h-4" />
            <h4 className="font-display text-xs uppercase italic tracking-widest text-white text-balance text-left leading-tight">Engineering Note: The 70/30 Rule</h4>
          </div>
          <p className="font-sans text-xs text-brand-grey leading-relaxed">
            Optimise for stability by placing at least 70% of your mass low and between the axles. Avoid high overhead cabinets for heavy technical hardware.
          </p>
        </div>
      </div>
    </div>
  );
}
