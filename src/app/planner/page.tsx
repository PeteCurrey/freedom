"use client";

import { useState, useMemo } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SVGSchematic, SystemTier } from "@/components/planner/SVGSchematic";
import { cn } from "@/lib/utils";
import { 
  Zap, Thermometer, Droplets, Weight, 
  PoundSterling, CheckCircle2,
  ChevronRight, ArrowLeft, Download, Eye,
  Wind, Flame, Loader2
} from "lucide-react";

// --- CONFIGURATION DATA ---

const steps = [
  "Foundation", "Layout", "Electrical", "Heating", 
  "Water", "Insulation", "Gas", "Interior", 
  "Diagnostics", "Checkout"
];

const vehicleFoundations = [
  { id: "sprinter", name: "Mercedes Sprinter", configs: ["144\" WB", "170\" WB", "170\" EXT"], baseWeight: 2200, payload: 1300 },
  { id: "crafter", name: "VW Crafter", configs: ["MWB", "LWB", "LWB Maxi"], baseWeight: 2150, payload: 1350 },
  { id: "ducato", name: "Fiat Ducato", configs: ["L2H2", "L3H2", "L4H3"], baseWeight: 2000, payload: 1500 },
];

const layoutTemplates = [
  { id: "expedition", name: "The Expedition", description: "Fixed rear transverse bed, mid kitchen, front dinette.", bestFor: "Solo or Couples" },
  { id: "fulltimer", name: "The Full-Timer", description: "Longitudinal bed, mid wet-room, large kitchen.", bestFor: "Full-time living" },
  { id: "workshop", name: "The Workshop", description: "Rear garage for bikes/tools, mid galley, front bed over cab.", bestFor: "Digital Nomads / Gearheads" },
];

const systemConfigs = {
  electrical: [
    { id: "basic", name: "First Light (Basic 12V)", price: 500, weight: 15, features: ["100Ah AGM", "Split Charge", "USB Sockets"], icon: Zap },
    { id: "mid", name: "Grid Independent (Lithium)", price: 2400, weight: 35, features: ["200Ah Lithium", "200W Solar", "800W Inverter"], icon: Zap },
    { id: "pro", name: "Full Autonomy (Premium)", price: 6500, weight: 65, features: ["400Ah Lithium", "400W Solar", "3000W Multiplus"], icon: Zap },
  ],
  heating: [
    { id: "basic", name: "Take the Edge Off", price: 250, weight: 5, features: ["Chinese Diesel Heater", "2 Outlets"], icon: Thermometer },
    { id: "mid", name: "Four Season (Webasto)", price: 1500, weight: 12, features: ["Webasto Air Top", "Digital Controller"], icon: Thermometer },
    { id: "pro", name: "Home Comfort (Truma)", price: 3000, weight: 22, features: ["Truma Combi 4E", "Dual Fuel", "10L Water Tank"], icon: Thermometer },
  ],
  water: [
    { id: "basic", name: "The Essentials", price: 300, weight: 10, features: ["40L Fresh", "25L Grey", "Submersible Pump"], icon: Droplets },
    { id: "mid", name: "Clean Living", price: 700, weight: 25, features: ["80L Fresh", "Pressure Pump", "Hot Mixer Tap"], icon: Droplets },
    { id: "pro", name: "Full Wet Room", price: 1200, weight: 45, features: ["100L Fresh", "Internal Shower", "Water Filter"], icon: Droplets },
  ],
  insulation: [
    { id: "basic", name: "Three Season", price: 400, weight: 30, features: ["25mm Foam", "Dodo Mat", "1x MaxxFan"], icon: Wind },
    { id: "mid", name: "All Season", price: 800, weight: 50, features: ["50mm Rigid Board", "Thinsulate", "Rain Sensor Fan"], icon: Wind },
    { id: "pro", name: "Extreme Climate", price: 1700, weight: 80, features: ["Full Composite", "Underfloor Heating", "Double Glazing"], icon: Wind },
  ],
  gas: [
    { id: "none", name: "No Gas (All Electric)", price: 0, weight: 0, features: ["Induction Cooking", "Diesel Heating"], icon: Flame },
    { id: "basic", name: "Single Bottle", price: 300, weight: 15, features: ["6kg Calor", "2-Burner Hob"], icon: Flame },
    { id: "pro", name: "Dual Bottle / Auto Change", price: 700, weight: 30, features: ["2x 6kg Bottles", "Oven/Grill", "BBQ Point"], icon: Flame },
  ]
};

// --- COMPONENT ---

export default function BuildPlanner() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [savedPlanId, setSavedPlanId] = useState<string | null>(null);
  const [selections, setSelections] = useState({
    vehicleId: "sprinter",
    configId: "144\" WB",
    layoutId: "expedition",
    systems: {
      electrical: "basic" as SystemTier,
      heating: "basic" as SystemTier,
      water: "basic" as SystemTier,
      insulation: "basic" as SystemTier,
      gas: "none" as SystemTier
    },
    powerBudget: {
      consumers: [
        { name: "Fridge", ah: 35 },
        { name: "Lights", ah: 8 },
        { name: "Pump", ah: 3 }
      ]
    }
  });

  // Derived Values
  const totals = useMemo(() => {
    let cost = 0;
    let weight = 0;
    
    // Sum system tiers
    Object.entries(selections.systems).forEach(([key, tierId]) => {
      const config = systemConfigs[key as keyof typeof systemConfigs].find(t => t.id === tierId);
      if (config) {
        cost += config.price;
        weight += config.weight;
      }
    });

    return { cost, weight };
  }, [selections.systems]);

  const vehicle = vehicleFoundations.find(v => v.id === selections.vehicleId);
  const payloadLimit = vehicle?.payload || 0;
  const payloadUsagePercent = (totals.weight / payloadLimit) * 100;

  const nextStep = () => setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 0));

  const savePlan = async () => {
    try {
      const response = await fetch("/api/plans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${selections.vehicleId.toUpperCase()} - ${selections.configId}`,
          vehicleId: selections.vehicleId,
          configId: selections.configId,
          layoutId: selections.layoutId,
          systems: selections.systems,
          powerBudget: selections.powerBudget,
          totalWeight: totals.weight,
          totalCost: totals.cost
        }),
      });
      const data = await response.json();
      if (data.id) {
        setSavedPlanId(data.id);
        return data.id;
      }
    } catch (err) {
      console.error("Save plan error", err);
    }
    return null;
  };

  const handleCheckout = async (tier: string) => {
    setIsProcessing(true);
    try {
      // 1. Ensure the plan is saved to the database first
      const planId = savedPlanId || await savePlan();
      
      if (!planId) {
        throw new Error("Could not save build plan. Please check your connection.");
      }

      // 2. Proceed to Stripe Checkout using the real Plan ID
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          planId: planId,
          tier 
        }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error("Checkout redir error", err);
      alert("Checkout failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="bg-brand-obsidian min-h-screen flex flex-col">
      <Navbar />
      
      <section className="flex-1 pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/interior-showcase.png" 
            alt="Van interior background" 
            className="w-full h-full object-cover opacity-10 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-obsidian via-transparent to-brand-obsidian" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          
          {/* Progress Tracker */}
          <div className="flex overflow-x-auto pb-8 mb-12 no-scrollbar gap-8 justify-between max-w-6xl mx-auto border-b border-brand-border/30">
            {steps.map((step, i) => (
              <div key={step} className="flex items-center shrink-0">
                <div className={cn(
                  "w-8 h-8 rounded-full border flex items-center justify-center font-mono text-[10px] transition-all",
                  i <= currentStep ? "border-brand-orange text-brand-orange bg-brand-orange/10" : "border-brand-border text-brand-grey"
                )}>
                  {i < currentStep ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                </div>
                <span className={cn(
                  "ml-3 font-display text-[9px] uppercase tracking-[0.2em] whitespace-nowrap",
                  i === currentStep ? "text-brand-white" : "text-brand-grey"
                )}>
                  {step}
                </span>
                {i < steps.length - 1 && <div className="ml-4 w-4 h-px bg-brand-border/30" />}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-7xl mx-auto">
            
            {/* Main Configurator Area */}
            <div className="lg:col-span-8">
              <div className="blueprint-border bg-brand-carbon p-8 lg:p-12 relative overflow-hidden h-full flex flex-col">
                <div className="blueprint-grid absolute inset-0 opacity-10 pointer-events-none" />
                
                <div className="relative z-10 flex-1">
                  
                  {/* Step 0: Foundation */}
                  {currentStep === 0 && (
                    <div className="space-y-12 animate-in fade-in duration-500">
                      <div>
                        <h2 className="font-display text-4xl uppercase mb-2">CHOOSE YOUR FOUNDATION</h2>
                        <p className="font-sans text-brand-grey">Every serious build starts with the right chassis.</p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {vehicleFoundations.map((v) => (
                          <button
                            key={v.id}
                            onClick={() => setSelections({ ...selections, vehicleId: v.id })}
                            className={cn(
                              "p-8 text-left blueprint-border transition-all group relative",
                              selections.vehicleId === v.id ? "bg-brand-orange/10 border-brand-orange" : "bg-brand-obsidian hover:border-brand-grey"
                            )}
                          >
                            <span className="font-display text-xl uppercase block mb-1">{v.name}</span>
                            <span className="font-mono text-[8px] text-brand-grey uppercase tracking-widest">Base Payload: {v.payload}kg</span>
                            <div className="flex flex-wrap gap-2 mt-6">
                              {v.configs.map(c => (
                                <span 
                                  key={c}
                                  onClick={(e) => { e.stopPropagation(); setSelections({...selections, configId: c}) }}
                                  className={cn(
                                    "px-3 py-1 border text-[8px] font-mono tracking-widest cursor-pointer",
                                    selections.configId === c ? "border-brand-orange text-brand-orange bg-brand-orange/10" : "border-brand-border text-brand-grey"
                                  )}
                                >
                                  {c}
                                </span>
                              ))}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 1: Layout */}
                  {currentStep === 1 && (
                    <div className="space-y-12 animate-in fade-in duration-500">
                      <h2 className="font-display text-4xl uppercase">Select Your Layout</h2>
                      <div className="grid grid-cols-1 gap-6">
                        {layoutTemplates.map((l) => (
                          <div
                            key={l.id}
                            onClick={() => setSelections({ ...selections, layoutId: l.id })}
                            className={cn(
                              "relative p-8 blueprint-border transition-all cursor-pointer overflow-hidden group",
                              selections.layoutId === l.id ? "bg-brand-orange/5 border-brand-orange" : "bg-brand-obsidian/50 border-brand-border/30"
                            )}
                          >
                            <div className="relative z-10 flex flex-col md:flex-row gap-8">
                              <div className="w-full md:w-1/3 aspect-[3/2] bg-brand-obsidian blueprint-border overflow-hidden p-4">
                                <SVGSchematic system="electrical" tier="basic" />
                              </div>
                              <div className="flex-1 space-y-4">
                                <h3 className="font-display text-2xl group-hover:text-brand-orange transition-colors uppercase">{l.name}</h3>
                                <p className="font-sans text-brand-grey text-sm">{l.description}</p>
                                <div className="inline-block px-3 py-1 bg-brand-obsidian border border-brand-border rounded-full font-mono text-[9px] text-brand-white">
                                  BEST FOR: {l.bestFor}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Steps 2-6: Systems */}
                  {currentStep >= 2 && currentStep <= 6 && (() => {
                    const systemKey = steps[currentStep].toLowerCase() as keyof typeof systemConfigs;
                    const configs = systemConfigs[systemKey];
                    return (
                      <div className="space-y-12 animate-in fade-in duration-500">
                        <div className="flex justify-between items-end">
                          <div>
                            <h2 className="font-display text-4xl uppercase mb-2">{steps[currentStep]} Configuration</h2>
                            <p className="font-sans text-brand-grey text-sm">Choose the tier that matches your mission profile.</p>
                          </div>
                          <div className="w-48">
                            <SVGSchematic system={systemKey} tier={selections.systems[systemKey as keyof typeof selections.systems] as SystemTier} />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-4">
                          {configs.map((config) => (
                            <button
                              key={config.id}
                              onClick={() => setSelections({
                                ...selections,
                                systems: { ...selections.systems, [systemKey]: config.id }
                              })}
                              className={cn(
                                "flex flex-col md:flex-row items-center gap-8 p-8 blueprint-border transition-all text-left",
                                selections.systems[systemKey as keyof typeof selections.systems] === config.id 
                                  ? "bg-brand-orange/10 border-brand-orange" 
                                  : "bg-brand-obsidian/50 border-brand-border/30 hover:border-brand-grey"
                              )}
                            >
                              <div className="w-12 h-12 bg-brand-carbon flex items-center justify-center text-brand-orange shrink-0">
                                <config.icon className="w-6 h-6" />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-display text-xl uppercase mb-1">{config.name}</h3>
                                <div className="flex flex-wrap gap-x-4 gap-y-1">
                                  {config.features.map(f => (
                                    <span key={f} className="font-mono text-[9px] text-brand-grey uppercase">○ {f}</span>
                                  ))}
                                </div>
                              </div>
                              <div className="text-right shrink-0">
                                <div className="font-display text-2xl text-brand-white">£{config.price.toLocaleString()}</div>
                                <div className="font-mono text-[9px] text-brand-grey uppercase">+{config.weight}kg</div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })()}

                  {/* Step 8: Diagnostics */}
                  {currentStep === 8 && (
                    <div className="space-y-12 animate-in fade-in duration-500">
                      <h2 className="font-display text-4xl uppercase">Build Diagnostics</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="blueprint-border p-8 bg-brand-obsidian">
                          <h3 className="font-display text-lg mb-8 uppercase flex items-center gap-2"><Zap className="w-4 h-4 text-brand-orange" /> Power Balance</h3>
                          <div className="space-y-4">
                            <div className="flex justify-between font-mono text-[10px] uppercase">
                              <span className="text-brand-grey">Total Usage</span>
                              <span className="text-brand-white">46 AH / Day</span>
                            </div>
                            <div className="flex justify-between font-mono text-[10px] uppercase">
                              <span className="text-brand-grey">Solar Yield (Avg)</span>
                              <span className="text-brand-orange">85 AH / Day</span>
                            </div>
                            <div className="pt-4 border-t border-brand-border">
                              <p className="font-sans text-[10px] text-brand-grey leading-relaxed">
                                <span className="text-green-500 font-bold uppercase">Verdict:</span> Your system is net-positive. You can sustain this load indefinitely in summer conditions.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="blueprint-border p-8 bg-brand-obsidian">
                          <h3 className="font-display text-lg mb-8 uppercase flex items-center gap-2"><Weight className="w-4 h-4 text-brand-orange" /> Payload Safety</h3>
                          <div className="relative h-2 bg-brand-carbon w-full mb-4">
                            <div className={cn(
                              "h-full transition-all duration-1000",
                              payloadUsagePercent > 90 ? "bg-red-500" : payloadUsagePercent > 70 ? "bg-yellow-500" : "bg-brand-orange"
                            )} style={{ width: `${payloadUsagePercent}%` }} />
                          </div>
                          <p className="font-mono text-[10px] text-brand-grey uppercase">
                            Conversion Weight: {totals.weight}kg / Payload: {payloadLimit}kg ({payloadUsagePercent.toFixed(1)}%)
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 9: Checkout */}
                  {currentStep === 9 && (
                    <div className="space-y-12 animate-in fade-in duration-500">
                      <h2 className="font-display text-4xl uppercase">Select Blueprint Tier</h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                          { tier: "Starter", price: 29, pages: "15-25", desc: "Essential drawings and BOM." },
                          { tier: "Full", price: 79, pages: "40-60", desc: "Professional schematics and sequence guide.", popular: true },
                          { tier: "Master", price: 149, pages: "80+", desc: "Exhaustive details, 3D views, and updates." }
                        ].map((t) => (
                          <div key={t.tier} className={cn(
                            "blueprint-border p-8 bg-brand-obsidian flex flex-col items-center text-center transition-all",
                            t.popular ? "border-brand-orange scale-105 shadow-2xl shadow-brand-orange/10 relative z-20" : "opacity-60"
                          )}>
                            {t.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-orange text-white font-mono text-[8px] px-3 py-1 uppercase tracking-widest">Recommended</div>}
                            <h3 className="font-display text-2xl mb-2 uppercase">{t.tier}</h3>
                            <div className="font-display text-4xl mb-4">£{t.price}</div>
                            <p className="font-mono text-[9px] text-brand-grey uppercase mb-8">{t.pages} Page Technical PDF</p>
                            <button 
                              disabled={isProcessing}
                              onClick={() => handleCheckout(t.tier.toLowerCase())}
                              className={cn(
                                "w-full py-4 font-display text-[10px] uppercase tracking-widest transition-all mt-auto flex items-center justify-center gap-2",
                                t.popular ? "bg-brand-orange text-white" : "border border-brand-border text-white hover:border-brand-orange"
                              )}
                            >
                              {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : `Select ${t.tier}`}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Local Nav */}
                <div className="mt-16 flex justify-between pt-8 border-t border-brand-border">
                  <button
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-brand-grey hover:text-brand-white disabled:opacity-30 disabled:pointer-events-none"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <button
                    onClick={nextStep}
                    disabled={currentStep === steps.length - 1}
                    className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-brand-orange hover:text-brand-white transition-colors"
                  >
                    {currentStep === steps.length - 1 ? "Complete Configuration" : `Next: ${steps[currentStep + 1]} `} <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar Summary */}
            <div className="lg:col-span-4 space-y-8">
              <div className="blueprint-border bg-brand-obsidian p-8 border-l-4 border-brand-orange sticky top-32">
                  <div className="flex justify-between items-center mb-8">
                    <span className="font-mono text-[10px] text-brand-grey uppercase tracking-widest">Build Status</span>
                    <span className="font-mono text-[10px] text-brand-orange uppercase animate-pulse">● Active Configuration</span>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <p className="font-mono text-[8px] text-brand-grey uppercase tracking-widest mb-1">Vehicle</p>
                      <p className="font-display text-xl uppercase leading-none">{vehicle?.name} {selections.configId}</p>
                    </div>
                    
                    <div className="pt-6 border-t border-brand-border space-y-4">
                      <div className="flex justify-between items-end">
                        <div className="flex items-center gap-2">
                          <PoundSterling className="w-3 h-3 text-brand-grey" />
                          <span className="font-mono text-[8px] text-brand-grey uppercase tracking-widest">Est. Parts</span>
                        </div>
                        <span className="font-display text-xl text-brand-white">£{totals.cost.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-end text-brand-orange">
                        <div className="flex items-center gap-2">
                           <Weight className="w-3 h-3" />
                           <span className="font-mono text-[8px] uppercase tracking-widest">Conv. Weight</span>
                        </div>
                        <span className="font-display text-xl">{totals.weight}kg</span>
                      </div>
                    </div>

                    <div className="pt-8 space-y-3">
                      <button className="w-full flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-brand-grey hover:text-brand-white p-4 border border-brand-border transition-all">
                        <Download className="w-4 h-4" /> Export Summary (Free)
                      </button>
                      <button className="w-full flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-brand-white p-4 bg-brand-carbon border border-brand-border hover:border-brand-orange transition-all">
                        <Eye className="w-4 h-4" /> Blueprint Preview
                      </button>
                    </div>
                  </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
