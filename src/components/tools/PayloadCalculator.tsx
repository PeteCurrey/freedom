"use client";

import { useState, useMemo, useEffect } from "react";
import { 
  Plus, 
  Trash2, 
  Weight, 
  ArrowRight, 
  Info, 
  AlertCircle,
  Bus,
  Save,
  Loader2,
  ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";

interface VehicleProfile {
  id: string;
  name: string;
  wheelbase: number; // m
  gvm: number; // kg
  frontLimit: number; // kg
  rearLimit: number; // kg
  unladenMass: number; // kg
  unladenFront: number; // kg
  unladenRear: number; // kg
}

interface PayloadItem {
  id: string;
  name: string;
  weight: number; // kg
  position: number; // m from front axle
}

const VEHICLE_PRESETS: VehicleProfile[] = [
  {
    id: "sprinter-l3",
    name: "Mercedes Sprinter L3H2 (LWB)",
    wheelbase: 4.325,
    gvm: 3500,
    frontLimit: 1860,
    rearLimit: 2250,
    unladenMass: 2280,
    unladenFront: 1350,
    unladenRear: 930
  },
  {
    id: "crafter-l3",
    name: "VW Crafter L3H3 (MWB)",
    wheelbase: 3.640,
    gvm: 3500,
    frontLimit: 1800,
    rearLimit: 2100,
    unladenMass: 2150,
    unladenFront: 1250,
    unladenRear: 900
  },
  {
    id: "ducato-l3",
    name: "Fiat Ducato L3H2 (LWB)",
    wheelbase: 4.035,
    gvm: 3500,
    frontLimit: 1850,
    rearLimit: 2000,
    unladenMass: 1975,
    unladenFront: 1150,
    unladenRear: 825
  }
];

const ITEM_PRESETS = [
  { name: "Water Tank (Loaded - 80L)", weight: 90, position: 3.5 },
  { name: "Battery Bank (200Ah LiFePO4)", weight: 24, position: 2.0 },
  { name: "Furniture Kit (Ply)", weight: 150, position: 2.5 },
  { name: "Kitchen Unit + Galley", weight: 65, position: 1.5 },
  { name: "Diesel Heater + Fuel", weight: 12, position: 0.5 },
  { name: "Spare Wheel + Carrier", weight: 35, position: 4.8 }
];

export default function PayloadCalculator() {
  const [selectedVehicleId, setSelectedVehicleId] = useState(VEHICLE_PRESETS[0].id);
  const [items, setItems] = useState<PayloadItem[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const vehicle = useMemo(() => 
    VEHICLE_PRESETS.find(v => v.id === selectedVehicleId) || VEHICLE_PRESETS[0]
  , [selectedVehicleId]);

  const stats = useMemo(() => {
    const cargoMass = items.reduce((acc, item) => acc + item.weight, 0);
    const totalMass = vehicle.unladenMass + cargoMass;
    
    // Calculate Moments relative to Front Axle
    const cargoMoment = items.reduce((acc, item) => acc + (item.weight * item.position), 0);
    
    // Rear Axle Incremental Load = Sum of Moments / Wheelbase
    const rearIncremental = cargoMoment / vehicle.wheelbase;
    const frontIncremental = cargoMass - rearIncremental;
    
    const frontTotal = vehicle.unladenFront + frontIncremental;
    const rearTotal = vehicle.unladenRear + rearIncremental;
    
    // Center of Gravity from Front Axle
    // Moment Total / Mass Total
    const totalMoment = (vehicle.unladenRear * vehicle.wheelbase) + cargoMoment;
    const cogPosition = totalMoment / totalMass;

    return {
      totalMass,
      cargoMass,
      frontTotal,
      rearTotal,
      cogPosition,
      gvmOver: totalMass > vehicle.gvm,
      frontOver: frontTotal > vehicle.frontLimit,
      rearOver: rearTotal > vehicle.rearLimit
    };
  }, [vehicle, items]);

  useEffect(() => {
    async function loadConfig() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("payload_configurations")
        .select("*")
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false })
        .limit(1)
        .single();

      if (data) {
        setSelectedVehicleId(data.base_specs.id || VEHICLE_PRESETS[0].id);
        setItems(data.items || []);
      }
      setIsLoaded(true);
    }
    loadConfig();
  }, []);

  const addItem = (preset?: typeof ITEM_PRESETS[0]) => {
    const newItem: PayloadItem = {
      id: Math.random().toString(36).substr(2, 9),
      name: preset?.name || "New Component",
      weight: preset?.weight || 10,
      position: preset?.position || 1.0
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(i => i.id !== id));
  };

  const updateItem = (id: string, updates: Partial<PayloadItem>) => {
    setItems(items.map(i => i.id === id ? { ...i, ...updates } : i));
  };

  const handleSave = async () => {
    setIsSaving(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      alert("Please login to save your configuration.");
      setIsSaving(false);
      return;
    }

    const { error } = await supabase.from("payload_configurations").upsert({
      user_id: user.id,
      vehicle_name: vehicle.name,
      base_specs: vehicle,
      items: items,
    });

    if (error) {
      console.error("Save Error:", error);
      alert("Failed to save payload configuration.");
    }
    setIsSaving(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-12 pb-32">
      {/* Input Hub */}
      <div className="lg:col-span-8 space-y-8">
        
        {/* Vehicle Selector */}
        <div className="blueprint-border p-8 bg-brand-carbon relative overflow-hidden">
          <div className="blueprint-grid absolute inset-0 opacity-10 pointer-events-none" />
          <div className="relative z-10">
            <label className="font-mono text-[8px] text-brand-grey uppercase tracking-widest block mb-4">Base Chassis Configuration</label>
            <div className="flex flex-col md:flex-row gap-8 items-center">
               <div className="w-full md:w-auto relative group">
                  <select 
                    value={selectedVehicleId}
                    onChange={(e) => setSelectedVehicleId(e.target.value)}
                    className="appearance-none bg-brand-obsidian border border-brand-border px-8 py-4 font-display text-lg uppercase tracking-wider text-white pr-16 focus:ring-0 cursor-pointer group-hover:border-brand-orange transition-all"
                  >
                    {VEHICLE_PRESETS.map(v => (
                      <option key={v.id} value={v.id}>{v.name}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-brand-grey group-hover:text-brand-orange" />
               </div>
               
               <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center md:text-left">
                     <span className="font-mono text-[8px] text-brand-grey uppercase block">Wheelbase</span>
                     <span className="font-display text-xl text-white">{vehicle.wheelbase}m</span>
                  </div>
                  <div className="text-center md:text-left">
                     <span className="font-mono text-[8px] text-brand-grey uppercase block">Legal GVM</span>
                     <span className="font-display text-xl text-white">{vehicle.gvm}kg</span>
                  </div>
                  <div className="text-center md:text-left">
                     <span className="font-mono text-[8px] text-brand-grey uppercase block">Front Axle Hub</span>
                     <span className="font-display text-xl text-brand-orange">{vehicle.frontLimit}kg</span>
                  </div>
                  <div className="text-center md:text-left">
                     <span className="font-mono text-[8px] text-brand-grey uppercase block">Rear Axle Hub</span>
                     <span className="font-display text-xl text-brand-orange">{vehicle.rearLimit}kg</span>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Item Ledger */}
        <div className="blueprint-border p-8 bg-brand-carbon/50">
           <div className="flex justify-between items-center mb-8">
              <h3 className="font-display text-xl uppercase tracking-widest">Components & Ballast</h3>
              <div className="flex gap-4">
                 {/* Preset Quick Add */}
                 <div className="hidden md:flex gap-2">
                    {ITEM_PRESETS.slice(0, 3).map(p => (
                       <button 
                         key={p.name}
                         onClick={() => addItem(p)}
                         className="px-3 py-1 border border-brand-border hover:border-brand-orange text-brand-grey hover:text-brand-orange font-mono text-[8px] uppercase transition-all"
                       >
                         + {p.name.split(' (')[0]}
                       </button>
                    ))}
                 </div>
                 <button onClick={() => addItem()} className="flex items-center gap-2 bg-brand-orange px-4 py-2 text-white font-mono text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all">
                    <Plus size={14} /> Add Item
                 </button>
              </div>
           </div>

           <div className="space-y-4">
              {items.length === 0 ? (
                <div className="p-12 text-center border border-dashed border-brand-border text-brand-grey italic font-mono text-xs uppercase">
                  No components mapped. Add items to calculate moments.
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="grid grid-cols-12 gap-6 items-center bg-brand-obsidian p-6 border border-brand-border/50 hover:border-brand-grey transition-all group">
                     {/* Name */}
                     <div className="col-span-12 md:col-span-4">
                        <label className="font-mono text-[7px] text-brand-grey uppercase block mb-1">Description</label>
                        <input 
                          type="text" 
                          value={item.name}
                          onChange={(e) => updateItem(item.id, { name: e.target.value })}
                          className="bg-transparent border-none p-0 font-display text-sm text-white focus:ring-0 w-full"
                        />
                     </div>
                     
                     {/* Weight */}
                     <div className="col-span-5 md:col-span-3">
                        <label className="font-mono text-[7px] text-brand-grey uppercase block mb-1">Mass (kg)</label>
                        <div className="flex items-center gap-3">
                           <input 
                             type="number" 
                             value={item.weight}
                             onChange={(e) => updateItem(item.id, { weight: parseFloat(e.target.value) || 0 })}
                             className="bg-brand-carbon border border-brand-border px-3 py-2 font-mono text-xs text-white w-20 h-8"
                           />
                           <Weight size={12} className="text-brand-grey" />
                        </div>
                     </div>

                     {/* Position slider */}
                     <div className="col-span-5 md:col-span-4">
                        <label className="font-mono text-[7px] text-brand-grey uppercase block mb-1">Center Pos (m from Front)</label>
                        <div className="flex items-center gap-4">
                           <input 
                             type="range" 
                             min={-1} 
                             max={vehicle.wheelbase + 1.5} 
                             step={0.1}
                             value={item.position}
                             onChange={(e) => updateItem(item.id, { position: parseFloat(e.target.value) })}
                             className="flex-1 accent-brand-orange h-1"
                           />
                           <span className="font-mono text-[10px] text-brand-white w-8">{item.position.toFixed(1)}m</span>
                        </div>
                     </div>

                     {/* Delete */}
                     <div className="col-span-2 md:col-span-1 flex justify-end">
                        <button onClick={() => removeItem(item.id)} className="text-brand-grey hover:text-red-500 transition-colors">
                           <Trash2 size={16} />
                        </button>
                     </div>
                  </div>
                ))
              )}
           </div>
        </div>

        {/* Visualization Component */}
        <div className="blueprint-border p-8 bg-brand-carbon overflow-hidden relative min-h-[300px] flex items-center justify-center">
           <div className="blueprint-grid absolute inset-0 opacity-10 pointer-events-none" />
           <div className="relative w-full max-w-4xl opacity-40">
              {/* Van Schematic Placeholder - SVG will be more complex in final */}
              <div className="h-24 bg-brand-border/20 border border-brand-border rounded-lg relative">
                 {/* Wheel markers */}
                 <div className="absolute -bottom-4 left-[20%] w-8 h-8 rounded-full border-2 border-brand-orange bg-brand-obsidian" />
                 <div className="absolute -bottom-4 right-[15%] w-8 h-8 rounded-full border-2 border-brand-orange bg-brand-obsidian" />
              </div>
           </div>
           
           {/* Dynamic CoG Marker */}
           <div 
             className="absolute top-1/2 -translate-y-1/2 transition-all duration-500"
             style={{ 
               left: `${20 + (stats.cogPosition / 6) * 65}%` // Normalized to container
             }}
           >
              <div className="flex flex-col items-center">
                 <div className="w-px h-16 bg-brand-orange" />
                 <div className="w-4 h-4 border-2 border-brand-orange rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-brand-orange rounded-full" />
                 </div>
                 <span className="font-mono text-[8px] text-brand-orange uppercase mt-2">Combined CoG</span>
              </div>
           </div>
           
           {/* Items visualization */}
           {items.map(item => (
              <div 
                key={item.id}
                className="absolute top-1/2 -translate-y-1/2 opacity-20 pointer-events-none"
                style={{ left: `${20 + (item.position / 6) * 65}%` }}
              >
                 <div className="w-px h-8 bg-brand-grey opacity-50" />
              </div>
           ))}
        </div>

      </div>

      {/* Analytics Sidebar */}
      <div className="lg:col-span-4">
         <div className="sticky top-48 space-y-6">
            
            <div className="blueprint-border bg-brand-carbon p-10 flex flex-col items-center">
               <div className="flex items-center gap-3 mb-10 italic">
                  <Weight className="text-brand-orange w-4 h-4" />
                  <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em]">// MASS DISTRIBUTION TELEMETRY</span>
               </div>

               {/* Global GVM Progress */}
               <div className="w-full space-y-6 mb-12 pb-12 border-b border-brand-border/30">
                  <div className="flex justify-between items-end">
                     <div>
                        <span className="font-mono text-[8px] text-brand-grey uppercase">Total System Mass</span>
                        <h4 className={cn(
                          "font-display text-4xl block",
                          stats.gvmOver ? "text-red-500" : "text-white"
                        )}>{Math.round(stats.totalMass)}kg</h4>
                     </div>
                     <span className="font-mono text-[10px] text-brand-grey uppercase tracking-widest">{Math.round((stats.totalMass / vehicle.gvm) * 100)}% GVM</span>
                  </div>
                  <div className="h-2 bg-brand-obsidian border border-brand-border relative">
                     <div 
                       className={cn(
                         "absolute top-0 left-0 h-full transition-all duration-1000",
                         stats.gvmOver ? "bg-red-500" : "bg-brand-orange"
                       )} 
                       style={{ width: `${Math.min(100, (stats.totalMass / vehicle.gvm) * 100)}%` }}
                     />
                     <div className="absolute top-0 right-0 h-full w-0.5 bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                  </div>
               </div>

               {/* Axle Logic Hub */}
               <div className="w-full space-y-8">
                  <div className="space-y-4">
                     <div className="flex justify-between items-end">
                        <span className="font-mono text-[8px] text-brand-grey uppercase">Front Axle Bias</span>
                        <span className={cn(
                          "font-display text-xl",
                          stats.frontOver ? "text-red-500" : "text-white"
                        )}>{Math.round(stats.frontTotal)}kg</span>
                     </div>
                     <div className="h-1 bg-brand-border">
                        <div 
                          className={cn(
                            "h-full transition-all duration-1000",
                            stats.frontOver ? "bg-red-500" : "bg-brand-orange"
                          )}
                          style={{ width: `${Math.min(100, (stats.frontTotal / vehicle.frontLimit) * 100)}%` }}
                        />
                     </div>
                  </div>

                  <div className="space-y-4">
                     <div className="flex justify-between items-end">
                        <span className="font-mono text-[8px] text-brand-grey uppercase">Rear Axle Bias</span>
                        <span className={cn(
                          "font-display text-xl",
                          stats.rearOver ? "text-red-500" : "text-white"
                        )}>{Math.round(stats.rearTotal)}kg</span>
                     </div>
                     <div className="h-1 bg-brand-border">
                        <div 
                          className={cn(
                            "h-full transition-all duration-1000",
                            stats.rearOver ? "bg-red-500" : "bg-brand-orange"
                          )}
                          style={{ width: `${Math.min(100, (stats.rearTotal / vehicle.rearLimit) * 100)}%` }}
                        />
                     </div>
                  </div>
               </div>

               {/* Status Alert Hub */}
               <div className="mt-12 w-full">
                  {stats.gvmOver || stats.frontOver || stats.rearOver ? (
                    <div className="p-6 bg-red-500/10 border border-red-500/30 flex gap-4">
                       <AlertCircle className="text-red-500 shrink-0 w-5 h-5" />
                       <div className="space-y-1">
                          <span className="font-display text-[10px] text-red-500 uppercase block tracking-widest">Structural Warning</span>
                          <p className="font-mono text-[8px] text-red-500/80 leading-relaxed uppercase">
                             Legal weight limits exceeded. Check {stats.gvmOver ? 'GVM' : ''} {stats.frontOver ? 'Front Axle' : ''} {stats.rearOver ? 'Rear Axle' : ''}.
                          </p>
                       </div>
                    </div>
                  ) : (
                    <div className="p-6 bg-green-500/10 border border-green-500/30 flex gap-4">
                       <Bus className="text-green-500 shrink-0 w-5 h-5" />
                       <div className="space-y-1">
                          <span className="font-display text-[10px] text-green-500 uppercase block tracking-widest">Balance Validated</span>
                          <p className="font-mono text-[8px] text-green-500/80 leading-relaxed uppercase">
                             Vehicle payload is currently within legal and safe engineering tolerances.
                          </p>
                       </div>
                    </div>
                  )}
               </div>

               {/* Save Button */}
               <button 
                 onClick={handleSave}
                 disabled={isSaving}
                 className="w-full mt-10 py-5 bg-brand-orange text-white font-display text-[11px] uppercase tracking-[0.2em] hover:bg-white hover:text-brand-orange transition-all flex items-center justify-center gap-3"
               >
                 {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                 Cache Engineering Profile
               </button>
            </div>

            <div className="p-8 border-l-4 border-brand-orange bg-brand-carbon/30">
               <div className="flex items-center gap-3 mb-4">
                  <Info className="text-brand-orange w-4 h-4" />
                  <h4 className="font-display text-xs uppercase italic tracking-widest text-white">Stability Tip</h4>
               </div>
               <p className="font-sans text-[10px] text-brand-grey leading-relaxed">
                  Keep heavy items like water tanks and battery banks as low as possible and ideally between the axles to maintain a lower center of gravity and improve handling.
               </p>
            </div>

         </div>
      </div>
    </div>
  );
}
