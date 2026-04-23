"use client";

import { useState, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SVGSchematic, SystemTier } from "@/components/planner/SVGSchematic";
const PDFExportPortal = dynamic(
  () => import("@/components/planner/PDFExportPortal"),
  { ssr: false }
);
import { cn } from "@/lib/utils";
import { 
  Zap, Thermometer, Droplets, Weight, 
  PoundSterling, CheckCircle2,
  ChevronRight, ArrowLeft, ArrowRight, Download, Eye,
  Wind, Flame, Loader2, Layout, AlertTriangle,
  Sun, Shield, Sparkles, Settings, Info,
  Search, Package, Monitor, Activity
} from "lucide-react";
import Image from "next/image";
import { vehicleData } from "@/lib/data/vehicles";
import { systemManifests } from "@/lib/data/manifests";
import { TechnicalBOM } from '@/components/planner/TechnicalBOM';
import { BuildAdvisor } from "@/components/chat/BuildAdvisor";
import { supabase } from "@/lib/supabase";

// --- CONFIGURATION DATA ---

const steps = [
  "Foundation", "Chassis", "Layout", "Sleeping", 
  "Electrical", "Lighting", "Heating", "Water", 
  "Gas", "Insulation", "Windows", "Exterior",
  "Security", "Finishing", "Review"
];

// Redundant Foundations removed in favor of @/lib/data/vehicles

const layoutTemplates = [
  { id: "expedition", name: "The Expedition", description: "Fixed rear transverse bed, mid kitchen, front dinette.", bestFor: "Solo or Couples", image: "/images/bespoke-sprinter.png" },
  { id: "fulltimer", name: "The Full-Timer", description: "Longitudinal bed, mid wet-room, large kitchen.", bestFor: "Full-time living", image: "/images/bespoke-crafter.png" },
  { id: "workshop", name: "The Workshop", description: "Rear garage for bikes/tools, mid galley, front bed over cab.", bestFor: "Digital Nomads / Gearheads", image: "/images/bespoke-man.png" },
];

const sleepSystems = [
  { id: "fixed-rear", name: "Fixed Rear Bed", price: 800, weight: 45, features: ["Standard Double", "Huge Garage Space"], icon: Layout },
  { id: "rib-seat", name: "RIB Seat/Bed", price: 2800, weight: 85, features: ["Crash Tested", "Passenger Safety", "Flexible Space"], icon: Layout },
  { id: "transverse", name: "Transverse Bed", price: 1200, weight: 35, features: ["Flares Required", "Maximizes Living Space"], icon: Layout },
];

const systemConfigs = {
  electrical: {
    guidance: "Energy is the lifeblood of your build. For full-time off-grid use, we recommend a minimum of 200Ah Lithium and 300W of Solar.",
    proTip: "Always use oversized cables for inverter-to-battery connections to prevent voltage drop and heating.",
    image: "/images/tech-electrical.png",
    tiers: [
      { id: "basic", name: "First Light (Basic 12V)", price: 500, weight: 15, position: 1.5, features: ["100Ah AGM", "Split Charge", "USB Sockets"], icon: Zap },
      { id: "mid", name: "Grid Independent (Lithium)", price: 2400, weight: 35, position: 1.5, features: ["200Ah Lithium", "200W Solar", "800W Inverter"], icon: Zap },
      { id: "pro", name: "Full Autonomy (Premium)", price: 6500, weight: 65, position: 1.5, features: ["400Ah Lithium", "600W Solar", "3000W Multiplus"], icon: Zap },
    ]
  },
  lighting: {
    guidance: "Atmosphere is everything. Multi-zone dimmable lighting allows you to shift from utility mode to cozy dinner mode instantly.",
    proTip: "Use warm white (3000K) LEDs for the interior to avoid a clinical, 'hospital' feel.",
    image: "/images/step_lighting_cinematic_1776674939507.png",
    tiers: [
      { id: "basic", name: "Stealth Setup", price: 200, weight: 2, position: 2.0, features: ["Soft White LED Strips", "Single Zone Control"], icon: Sun },
      { id: "mid", name: "Multi-Zone Pro", price: 550, weight: 4, position: 2.0, features: ["3-Zone Dimming", "Under-Cabinet LEDs", "App Control"], icon: Sun },
      { id: "pro", name: "Cinematic Luxe", price: 1200, weight: 10, position: 2.0, features: ["RGBW Ambient Strips", "External Scene Lights", "Motion Entry Lighting"], icon: Sun },
    ]
  },
  heating: {
    guidance: "Don't let the weather dictate your adventure. A reliable heater is the difference between a season and a year of freedom.",
    proTip: "A diesel heater altitude kit is essential if you plan on skiing or mountain trekking above 1500m.",
    image: "/images/cat-climate.png",
    tiers: [
      { id: "basic", name: "Take the Edge Off", price: 250, weight: 5, position: 0.5, features: ["5kW Diesel Heater", "2 Outlets"], icon: Thermometer },
      { id: "mid", name: "Four Season (Webasto)", price: 1500, weight: 12, position: 0.5, features: ["Webasto Air Top", "Digital Controller"], icon: Thermometer },
      { id: "pro", name: "Home Comfort (Truma)", price: 3000, weight: 22, position: 1.0, features: ["Truma Combi 4E", "Dual Fuel", "10L Water Tank"], icon: Thermometer },
    ]
  },
  water: {
    guidance: "Off-grid endurance is measured in litres. Efficient plumbing and large-capacity tanks mean more days in the wild.",
    proTip: "Accumulator tanks drastically reduce pump cycling noise and extend the life of your plumbing joints.",
    image: "/images/tech-water.png",
    tiers: [
      { id: "basic", name: "The Essentials", price: 300, weight: 10, position: 3.5, features: ["40L Fresh", "25L Grey", "Submersible Pump"], icon: Droplets },
      { id: "mid", name: "Clean Living", price: 700, weight: 25, position: 3.5, features: ["80L Fresh", "Pressure Pump", "Hot Mixer Tap"], icon: Droplets },
      { id: "pro", name: "Full Wet Room", price: 1200, weight: 45, position: 3.0, features: ["100L Fresh", "Internal Shower", "Water Filter"], icon: Droplets },
    ]
  },
  gas: {
    guidance: "Cooking with flame is efficient, but requires strict safety standards. Consider all-electric if you want a gas-free build.",
    proTip: "Always use a gas locker with a floor vent for safety. It's a non-negotiable for insurance.",
    image: "/images/cat-gas.png",
    tiers: [
      { id: "none", name: "No Gas (All Electric)", price: 0, weight: 0, position: 0, features: ["Induction Cooking", "Diesel Heating"], icon: Flame },
      { id: "basic", name: "Single Bottle", price: 300, weight: 15, position: 3.8, features: ["6kg Calor", "2-Burner Hob"], icon: Flame },
      { id: "pro", name: "Dual Bottle / Auto Change", price: 700, weight: 30, position: 3.8, features: ["2x 6kg Bottles", "Oven/Grill", "BBQ Point"], icon: Flame },
    ]
  },
  insulation: {
    guidance: "The best heater won't work without good insulation. High-quality polyisocyanurate (PIR) board and sound deadening is the foundation of comfort.",
    proTip: "Cover every inch of exposed metal with insulation or lining carpet to prevent condensation cold-spots.",
    image: "/images/cat-insulation.png",
    tiers: [
      { id: "basic", name: "Three Season", price: 400, weight: 30, position: 2.0, features: ["25mm Foam", "Dodo Mat", "1x MaxxFan"], icon: Wind },
      { id: "mid", name: "All Season", price: 800, weight: 50, position: 2.0, features: ["50mm Rigid Board", "Thinsulate", "Rain Sensor Fan"], icon: Wind },
      { id: "pro", name: "Extreme Climate", price: 1700, weight: 80, position: 2.0, features: ["Full Composite", "Underfloor Heating", "Double Glazing"], icon: Wind },
    ]
  },
  windows: {
    guidance: "Natural light transforms a van from a metal box into a home. Strategic window placement is key for both views and cross-ventilation.",
    proTip: "Bonded windows provide a much cleaner, factory look than traditional rubber-seal windows.",
    image: "/images/cat-interior.png",
    tiers: [
      { id: "basic", name: "Standard Venting", price: 400, weight: 12, position: 2.0, features: ["1x Sliding Window", "1x Fixed Window"], icon: Eye },
      { id: "pro", name: "Full Panoramic", price: 1200, weight: 35, position: 2.0, features: ["All-Round Glass", "Privacy Tint", "Blackout Blinds"], icon: Eye },
    ]
  },
  exterior: {
    guidance: "Your van's external configuration defines its utility. Racks, ladders, and awnings turn it into a hub for outdoor adventure.",
    proTip: "Side-mounted ladders are less stress on the rear door hinges and don't block your rearview optics.",
    image: "/images/step_exterior_cinematic_1776674981526.png",
    tiers: [
      { id: "basic", name: "Minimalist Utility", price: 350, weight: 15, position: 4.5, features: ["Roof Cross Bars", "Side Steps"], icon: Settings },
      { id: "mid", name: "Basecamp Ready", price: 1400, weight: 45, position: 4.5, features: ["Fiamma Awning", "Rear Ladder", "Lashing Points"], icon: Settings },
      { id: "pro", name: "Expedition Grade", price: 3500, weight: 85, position: 4.5, features: ["Full Walk-On Rack", "Side Ladder", "Case Storage"], icon: Settings },
    ]
  },
  security: {
    guidance: "Protect your sanctuary. Modern security combines physical barriers with digital monitoring for total peace of mind.",
    proTip: "A Ghost immobiliser is the single most effective electronic theft deterrent currently available in the UK.",
    image: "/images/step_security_cinematic_1776675013013.png",
    tiers: [
      { id: "basic", name: "Deterrent Level", price: 250, weight: 5, position: 0.5, features: ["External Deadlocks", "OBD Port Lock"], icon: Shield },
      { id: "mid", name: "Pro Monitoring", price: 650, weight: 8, position: 0.5, features: ["Thatcham S7 Tracker", "24/7 Monitoring", "Internal Alarm"], icon: Shield },
      { id: "pro", name: "Fortress Mode", price: 1500, weight: 12, position: 0.5, features: ["Ghost Immobiliser", "S5+ Tracker", "Motion CCTV"], icon: Shield },
    ]
  },
  finishing: {
    guidance: "The final touch. Premium worktops, linens, and upholstery turn a 'build' into a 'home'. Choose your material palette.",
    proTip: "Opt for marine-grade fabrics; they're UV resistant and much easier to clean after a muddy adventure.",
    image: "/images/step_finishing_touches_cinematic_1776675074937.png",
    tiers: [
      { id: "basic", name: "Raw Efficiency", price: 500, weight: 10, position: 2.5, features: ["Birch Ply Trim", "Canvas Upholstery"], icon: Sparkles },
      { id: "mid", name: "Mountain Modern", price: 1800, weight: 25, position: 2.5, features: ["Bamboo Worktops", "Velour Lining", "Premium Foam"], icon: Sparkles },
      { id: "pro", name: "Luxury High-End", price: 4500, weight: 40, position: 2.5, features: ["Solid Walnut", "Alcantara Upholstery", "Stone Worktops"], icon: Sparkles },
    ]
  }
};

// --- COMPONENT ---

export default function BuildPlanner() {
  const [mounted, setMounted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [savedPlanId, setSavedPlanId] = useState<string | null>(null);
  const [clientBuildId, setClientBuildId] = useState("");
  
  const [selections, setSelections] = useState({
    vehicleId: "mercedes-sprinter",
    configId: "144\" WB",
    layoutId: "expedition",
    sleepingId: "fixed-rear",
    systems: {
      electrical: "basic",
      lighting: "basic",
      heating: "basic",
      water: "basic",
      gas: "none",
      insulation: "basic",
      windows: "basic",
      exterior: "basic",
      security: "basic",
      finishing: "basic",
    },
    powerBudget: {
      consumers: [
        { name: "Fridge", ah: 35 },
        { name: "Lights", ah: 8 },
        { name: "Pump", ah: 3 }
      ]
    }
  });

  useEffect(() => {
    setMounted(true);
    setClientBuildId("BUILD-" + Math.random().toString(36).substring(2, 9).toUpperCase());
  }, []);

  // --- Engineering Calculation Engine ---
  const totals = useMemo(() => {
    let cost = 0;
    let weight = 0;
    let moment = 0; // kg*m relative to front axle
    
    const vehicle = vehicleData[selections.vehicleId];
    if (!vehicle) return { 
      cost: 0, weight: 0, frontAxle: 0, rearAxle: 0, cog: 0, 
      totalMass: 0, gvmOver: false, frontOver: false, rearOver: false 
    };

    // Sum system tiers
    Object.entries(selections.systems).forEach(([key, tierId]) => {
      const config = (systemConfigs as any)[key]?.tiers.find((t: any) => t.id === tierId);
      if (config) {
        cost += config.price;
        weight += config.weight;
        // Calculation: Moment = Mass * Position (from front axle)
        moment += config.weight * (config.position || 0.5);
      }
    });

    // Add sleeping system (Assume position is rear-heavy for fixed, mid for seat)
    const sleep = sleepSystems.find(s => s.id === selections.sleepingId);
    if (sleep) {
      cost += sleep.price;
      weight += sleep.weight;
      const sleepPos = selections.sleepingId === 'fixed-rear' ? (vehicle.wheelbase * 0.9) : 2.5;
      moment += sleep.weight * sleepPos;
    }

    // Moment Principle: Rear Axle Incremental Load = Total Moment / Wheelbase
    const rearIncremental = moment / vehicle.wheelbase;
    const frontIncremental = weight - rearIncremental;

    const frontAxle = vehicle.unladenFront + frontIncremental;
    const rearAxle = vehicle.unladenRear + rearIncremental;
    
    // Combined Center of Gravity (m from front axle)
    const totalMass = vehicle.unladenMass + weight;
    const totalMoment = (vehicle.unladenRear * vehicle.wheelbase) + moment;
    const cog = totalMoment / totalMass;

    return { 
      cost, 
      weight, 
      frontAxle, 
      rearAxle, 
      cog,
      totalMass,
      gvmOver: totalMass > vehicle.gvm,
      frontOver: frontAxle > vehicle.frontAxleLimit,
      rearOver: rearAxle > vehicle.rearAxleLimit
    };
  }, [selections.systems, selections.sleepingId, selections.vehicleId]);

  const selectedVehicle = vehicleData[selections.vehicleId];
  const payloadUsagePercent = selectedVehicle ? Math.round((totals.totalMass / selectedVehicle.gvm) * 100) : 0;

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
      const planId = savedPlanId || await savePlan();
      if (!planId) throw new Error("Could not save build plan.");

      // Developer Bypass: Auto-unlock for Pete
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email === 'petecurrey@gmail.com' || user?.email === 'pete@avorria.com') {
        console.log("Developer Bypass: Granting access to " + tier);
        // We could manually insert a record into blueprint_purchases here if needed,
        // but for testing the planner, just staying on the page and letting 
        // PDFExportPortal handle the unlock is enough.
        // However, let's redirect to a success-like state or just alert for now.
        alert("Developer Access Granted: " + tier.toUpperCase());
        return;
      }

      const response = await fetch("/api/stripe/checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ buildId: planId, tier }),
      });
      const data = await response.json();
      if (data.url) window.location.href = data.url;
    } catch (err) {
      console.error("Checkout redir error", err);
      alert("Checkout failed.");
    } finally {
      setIsProcessing(false);
    }
  };

  const currentSystemKey = useMemo(() => {
    const stepName = steps[currentStep].toLowerCase();
    const map: any = {
      "electrical": "electrical",
      "lighting": "lighting",
      "heating": "heating",
      "water": "water",
      "gas": "gas",
      "insulation": "insulation",
      "windows": "windows",
      "exterior": "exterior",
      "security": "security",
      "finishing": "finishing"
    };
    return map[stepName];
  }, [currentStep]);

  return (
    <main className="bg-brand-obsidian min-h-screen flex flex-col">
      <Navbar />
      
      <section className="flex-1 pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10 grayscale brightness-50">
          {currentSystemKey ? (
            <Image 
              src={(systemConfigs as any)[currentSystemKey].image} 
              alt="System background" 
              fill
              className="object-cover"
            />
          ) : (
            <Image 
              src="/images/interior-showcase.png" 
              alt="Van interior" 
              fill
              className="object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-brand-obsidian via-transparent to-brand-obsidian" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          
          {/* Progress Tracker Hub */}
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
            
            {/* Main Configurator Console */}
            <div className="lg:col-span-8">
              <div className="blueprint-border bg-brand-carbon/60 backdrop-blur-md p-8 lg:p-12 relative overflow-hidden h-full flex flex-col">
                <div className="blueprint-grid absolute inset-0 opacity-10 pointer-events-none" />
                
                <div className="relative z-10 flex-1">
                  
                  {/* Foundation Selector */}
                  {currentStep === 0 && (
                    <div className="space-y-12 animate-in fade-in duration-700">
                      <div>
                        <h2 className="font-display text-5xl uppercase mb-4 tracking-tighter leading-none">Chassis Node Selection</h2>
                        <p className="font-sans text-brand-grey text-lg max-w-xl">Every serious build starts with the right foundation. Select your preferred vehicle platform.</p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {Object.entries(vehicleData).map(([id, v]) => (
                          <button
                            key={id}
                            onClick={() => setSelections({ ...selections, vehicleId: id })}
                            className={cn(
                              "p-8 text-left blueprint-border transition-all group relative",
                              selections.vehicleId === id ? "bg-brand-orange/10 border-brand-orange shadow-[0_0_30px_rgba(255,107,0,0.1)]" : "bg-brand-obsidian/50 hover:border-brand-grey"
                            )}
                          >
                            <span className="font-display text-2xl uppercase block mb-2">{v.name}</span>
                            <div className="flex items-center gap-4 text-brand-grey font-mono text-[9px] uppercase tracking-widest">
                              <div className="flex flex-wrap gap-2 mt-8">
                                {v.configurations.map(c => (
                                  <span 
                                    key={c.label}
                                    onClick={(e) => { e.stopPropagation(); setSelections({...selections, configId: c.label}) }}
                                    className={cn(
                                      "px-3 py-1.5 border text-[9px] font-mono tracking-widest cursor-pointer transition-all",
                                      selections.configId === c.label ? "border-brand-orange text-brand-orange bg-brand-orange/10" : "border-brand-border text-brand-grey hover:border-brand-white"
                                    )}
                                  >
                                    {c.label}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Chassis Configuration */}
                  {currentStep === 1 && (
                    <div className="space-y-12 animate-in fade-in duration-700">
                      <div>
                        <h2 className="font-display text-5xl uppercase mb-4 tracking-tighter">Wheelbase Registry</h2>
                        <p className="font-sans text-brand-grey text-lg">Define the physical footprint of your conversion.</p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {Object.entries(vehicleData).find(([id]) => id === selections.vehicleId)?.[1].configurations.map(c => (
                          <button
                            key={c.label}
                            onClick={() => setSelections({...selections, configId: c.label})}
                            className={cn(
                              "p-10 blueprint-border text-center transition-all bg-brand-obsidian/50",
                              selections.configId === c.label ? "bg-brand-orange/10 border-brand-orange shadow-lg" : "border-brand-border/30 hover:border-brand-grey"
                            )}
                          >
                             <div className="w-12 h-12 bg-brand-obsidian border border-brand-border flex items-center justify-center mx-auto mb-6 text-brand-grey group-hover:text-brand-orange transition-colors">
                                <Layout className="w-6 h-6" />
                             </div>
                             <span className="font-display text-2xl uppercase block mb-2">{c.label}</span>
                             <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest">Optimised Plot</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Layout Selection */}
                  {currentStep === 2 && (
                    <div className="space-y-12 animate-in fade-in duration-700">
                      <div>
                        <h2 className="font-display text-5xl uppercase mb-4 tracking-tighter">Spatial Architecture</h2>
                        <p className="font-sans text-brand-grey text-lg">Choose a template to initialize your internal living zones.</p>
                      </div>
                      <div className="grid grid-cols-1 gap-6">
                        {layoutTemplates.map((l) => (
                          <div
                            key={l.id}
                            onClick={() => setSelections({ ...selections, layoutId: l.id })}
                            className={cn(
                              "relative p-10 blueprint-border transition-all cursor-pointer overflow-hidden group",
                              selections.layoutId === l.id ? "bg-brand-orange/5 border-brand-orange shadow-inner" : "bg-brand-obsidian/40 border-brand-border/30"
                            )}
                          >
                            <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
                              <div className="w-full md:w-2/5 aspect-[4/3] bg-brand-obsidian blueprint-border overflow-hidden relative">
                                <Image src={l.image} alt={l.name} fill className="object-cover grayscale group-hover:grayscale-0 opacity-50 group-hover:opacity-100 transition-all duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian via-transparent to-transparent" />
                              </div>
                              <div className="flex-1 space-y-6">
                                <div className="flex justify-between items-start">
                                  <h3 className="font-display text-3xl uppercase group-hover:text-brand-orange transition-colors tracking-tight">{l.name}</h3>
                                  <span className="font-mono text-[9px] text-brand-orange bg-brand-orange/10 px-3 py-1 border border-brand-orange/20 uppercase tracking-widest">{l.bestFor}</span>
                                </div>
                                <p className="font-sans text-brand-grey text-sm leading-relaxed">{l.description}</p>
                                <div className="flex items-center gap-4 pt-4">
                                   <div className="flex -space-x-1">
                                      {[1,2,3].map(i => <div key={i} className="w-2 h-2 rounded-full bg-brand-orange/40" />)}
                                   </div>
                                   <span className="font-mono text-[9px] uppercase tracking-widest text-brand-grey">Blueprint Compatibility: 100%</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Sleeping Configuration */}
                  {currentStep === 3 && (
                    <div className="space-y-12 animate-in fade-in duration-700">
                      <h2 className="font-display text-5xl uppercase tracking-tighter">Sleeping Module</h2>
                      <div className="grid grid-cols-1 gap-4">
                        {sleepSystems.map((s) => (
                           <button
                             key={s.id}
                             onClick={() => setSelections({ ...selections, sleepingId: s.id })}
                             className={cn(
                               "flex flex-col md:flex-row items-center gap-10 p-10 blueprint-border transition-all text-left bg-brand-obsidian/40",
                               selections.sleepingId === s.id ? "bg-brand-orange/10 border-brand-orange" : "border-brand-border/30 hover:border-brand-grey"
                             )}
                           >
                             <div className="w-16 h-16 bg-brand-obsidian border border-brand-border flex items-center justify-center text-brand-orange shrink-0">
                                <Layout className="w-8 h-8" />
                             </div>
                             <div className="flex-1 space-y-4">
                                <h3 className="font-display text-2xl uppercase tracking-tight">{s.name}</h3>
                                <div className="flex flex-wrap gap-x-6 gap-y-2">
                                  {s.features.map(f => (
                                    <span key={f} className="font-mono text-[10px] text-brand-grey uppercase tracking-wider flex items-center gap-2">
                                       <div className="w-1.5 h-1.5 rounded-full bg-brand-orange/40" /> {f}
                                    </span>
                                  ))}
                                </div>
                             </div>
                             <div className="text-right shrink-0">
                                <div className="font-display text-4xl text-brand-white">£{s.price.toLocaleString()}</div>
                                <div className="font-mono text-[10px] text-brand-grey uppercase tracking-widest mt-1">+{s.weight}kg Impact</div>
                             </div>
                           </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Systems Multi-Step Rendering */}
                  {currentSystemKey && (() => {
                    const systemData = (systemConfigs as any)[currentSystemKey];
                    return (
                      <div className="space-y-12 animate-in fade-in duration-700">
                        <div className="flex flex-col md:flex-row justify-between items-end gap-12">
                          <div className="flex-1 space-y-6">
                            <div className="flex items-center gap-4 text-brand-orange font-mono text-xs uppercase tracking-widest">
                               <div className="h-px w-12 bg-brand-orange" /> System Node 0{currentStep + 1}
                            </div>
                            <h2 className="font-display text-5xl lg:text-7xl uppercase mb-4 tracking-tighter leading-none">{steps[currentStep]}</h2>
                            <p className="font-sans text-brand-grey text-xl leading-relaxed italic">{systemData.guidance}</p>
                          </div>
                          
                          <div className="w-full md:w-64 space-y-6 shrink-0">
                             <div className="blueprint-border bg-brand-orange/5 p-6 border-l-4 border-brand-orange relative overflow-hidden">
                                <div className="relative z-10">
                                  <div className="flex items-center gap-2 mb-3">
                                     <Sparkles className="w-3 h-3 text-brand-orange" />
                                     <span className="font-mono text-[9px] text-brand-orange uppercase tracking-widest">Expert Advice</span>
                                  </div>
                                  <p className="font-mono text-[10px] text-brand-grey leading-relaxed">{systemData.proTip}</p>
                                </div>
                             </div>
                             <div className="h-32 bg-brand-obsidian blueprint-border opacity-50 flex items-center justify-center p-8">
                                <SVGSchematic system={currentSystemKey as SystemTier} tier={selections.systems[currentSystemKey as keyof typeof selections.systems] as SystemTier} />
                             </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-6">
                          {systemData.tiers.map((config: any) => (
                            <button
                              key={config.id}
                              onClick={() => setSelections({
                                ...selections,
                                systems: { ...selections.systems, [currentSystemKey]: config.id }
                              })}
                              className={cn(
                                "flex flex-col md:flex-row items-center gap-10 p-10 blueprint-border transition-all text-left bg-brand-obsidian/40",
                                selections.systems[currentSystemKey as keyof typeof selections.systems] === config.id 
                                  ? "bg-brand-orange/10 border-brand-orange shadow-[0_0_20px_rgba(255,107,0,0.05)]" 
                                  : "border-brand-border/30 hover:border-brand-grey"
                              )}
                            >
                              <div className="w-16 h-16 bg-brand-obsidian border border-brand-border flex items-center justify-center text-brand-orange shrink-0">
                                <config.icon className="w-8 h-8" />
                              </div>
                              <div className="flex-1 space-y-4">
                                <h3 className="font-display text-2xl uppercase tracking-tight">{config.name}</h3>
                                <div className="flex flex-wrap gap-x-6 gap-y-2">
                                  {config.features.map((f: string) => (
                                    <span key={f} className="font-mono text-[10px] text-brand-grey uppercase tracking-wider flex items-center gap-2">
                                       <div className="w-1.5 h-1.5 rounded-full bg-brand-orange/30" /> {f}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <div className="text-right shrink-0">
                                <div className="font-display text-4xl text-brand-white">£{config.price.toLocaleString()}</div>
                                <div className="font-mono text-[10px] text-brand-grey uppercase tracking-widest mt-1">+{config.weight}kg Weight</div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })()}

                  {/* Step 14: Review & Build Report */}
                  {currentStep === 14 && (
                    <div className="space-y-12 animate-in fade-in duration-700">
                      <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
                        <div className="flex-1">
                          <h2 className="font-display text-5xl uppercase tracking-tighter mb-4">Master Build Report</h2>
                          <div className="flex items-center gap-4">
                             <div className="px-4 py-2 bg-brand-orange text-white font-display text-[10px] uppercase tracking-widest">
                                {(() => {
                                  const proCount = Object.values(selections.systems).filter(v => v === 'pro').length;
                                  if (proCount >= 7) return "Expedition Master Build";
                                  if (proCount >= 4) return "Professional Grade Build";
                                  return "Essential Explorer Build";
                                })()}
                             </div>
                             <span className="font-mono text-[10px] text-brand-grey uppercase tracking-widest">ID: {clientBuildId}</span>
                          </div>
                        </div>
                        <div className="text-right">
                           <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest block mb-1">Payload Assessment</span>
                           <span className={cn(
                             "font-display text-3xl uppercase",
                             payloadUsagePercent > 100 ? "text-red-500" : "text-brand-orange"
                           )}>
                             {totals.weight}kg / {selectedVehicle?.gvm || 0}kg
                           </span>
                        </div>
                      </div>

                      {/* MASTER BLUEPRINT PREVIEW (PDF Sample) */}
                      <div className="pt-8 w-full max-w-5xl mx-auto">
                        <div className="flex items-center justify-between mb-4">
                           <h3 className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.2em] flex items-center gap-2">
                             <Search className="w-3 h-3" /> Preview: Blueprint Page 4/80
                           </h3>
                           <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest bg-brand-obsidian px-3 py-1 border border-brand-border/40">Watermarked Sample</span>
                        </div>
                        
                        <div className="w-full bg-[#111] p-2 md:p-8 rounded shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-brand-border/60 relative overflow-hidden group">
                           {/* Watermark overlay */}
                           <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-5 select-none z-50">
                              <span className="font-display text-[150px] uppercase text-brand-white rotate-[-30deg]">SAMPLE</span>
                           </div>

                           {/* Document Header */}
                           <div className="flex border-b border-brand-border/40 pb-4 mb-4">
                              <div className="flex-1">
                                 <h1 className="font-display text-2xl uppercase text-white tracking-tight">System Composite Diagram</h1>
                                 <p className="font-mono text-[8px] text-brand-grey uppercase tracking-widest">Doc Ref: FRV-{clientBuildId}</p>
                              </div>
                              <div className="text-right">
                                 <span className="font-display text-sm text-brand-orange uppercase block">{selectedVehicle?.name}</span>
                                 <span className="font-mono text-[8px] text-brand-grey uppercase tracking-widest text-right block">V.1.0 // {new Date().getFullYear()}</span>
                              </div>
                           </div>

                           {/* The Dynamic Schematic */}
                           <div className="w-full bg-black/50 blueprint-border relative">
                              <SVGSchematic 
                                masterSelections={selections.systems} 
                                vehicleLength={selectedVehicle?.wheelbase ? selectedVehicle.wheelbase * 1500 : 6000} 
                                vehicleWidth={1800}
                                className="w-full"
                              />
                           </div>

                           {/* Engineering Notes & Constraints */}
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                             <div>
                               <h4 className="font-mono text-[9px] text-brand-grey uppercase tracking-[0.2em] mb-2 border-b border-brand-border/40 pb-2">Technical Constraints</h4>
                               <ul className="space-y-1 font-mono text-[8px] text-brand-grey uppercase">
                                 <li className="flex justify-between"><span>GVM Cap:</span> <span className="text-white">{selectedVehicle?.gvm}kg</span></li>
                                 <li className="flex justify-between"><span>Unladen Base:</span> <span className="text-white">{selectedVehicle?.unladenMass}kg</span></li>
                                 <li className="flex justify-between font-bold"><span>Projected Mass:</span> <span className="text-brand-orange">{Math.round(totals.totalMass)}kg</span></li>
                                 <li className="flex justify-between"><span>Front Axle:</span> <span className="text-white">{Math.round(totals.frontAxle)}kg / {selectedVehicle?.frontAxleLimit}kg</span></li>
                                 <li className="flex justify-between"><span>Rear Axle:</span> <span className="text-white">{Math.round(totals.rearAxle)}kg / {selectedVehicle?.rearAxleLimit}kg</span></li>
                               </ul>
                             </div>
                             <div className="relative">
                               <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#111] z-10" /> {/* Bleed out the BOM to tease content */}
                               <div className="opacity-50 blur-[1px]">
                                 <TechnicalBOM selections={selections} isPreview={true} />
                               </div>
                               <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap">
                                 <span className="font-mono text-[9px] bg-brand-orange text-white px-4 py-2 uppercase tracking-widest hidden md:block">
                                   Full BOM Available in Purchased Report
                                 </span>
                               </div>
                             </div>
                           </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-brand-border/40">
                        {[
                          { tier: "Starter", price: 29, pages: "15-25", desc: "Essential system schematics and full Bill of Materials (BOM)." },
                          { tier: "Full", price: 79, pages: "40-60", desc: "Professional blueprint, install guides, and technical sequence.", popular: true },
                          { tier: "Master", price: 149, pages: "80+", desc: "Exhaustive details, 3D wiring views, and priority support." }
                        ].map((t) => (
                          <div key={t.tier} className={cn(
                            "blueprint-border p-10 bg-brand-obsidian/80 flex flex-col items-center text-center transition-all",
                            t.popular ? "border-brand-orange scale-105 shadow-2xl shadow-brand-orange/20 relative z-20" : "opacity-60 border-brand-border/40"
                          )}>
                             {t.popular && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-orange text-white font-mono text-[10px] px-6 py-2 uppercase tracking-widest font-bold">Recommended Solution</div>}
                             <h3 className="font-display text-3xl mb-4 uppercase">{t.tier}</h3>
                             <div className="font-display text-6xl mb-6 font-bold leading-none">£{t.price}</div>
                             <p className="font-mono text-[10px] text-brand-grey uppercase tracking-[0.2em] mb-10">{t.pages} Page Technical PDF Portolio</p>
                             <p className="font-sans text-xs text-brand-grey leading-relaxed mb-12 flex-1">{t.desc}</p>
                             <button 
                                disabled={isProcessing}
                                onClick={() => handleCheckout(t.tier.toLowerCase())}
                                className={cn(
                                  "w-full py-5 font-display text-xs uppercase tracking-widest transition-all mt-auto flex items-center justify-center gap-3",
                                  t.popular ? "bg-brand-orange text-white hover:bg-white hover:text-brand-orange" : "border border-brand-border text-white hover:border-brand-orange"
                                )}
                              >
                                {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Select {t.tier} <ChevronRight className="w-4 h-4" /></>}
                              </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Navigation Console */}
                <div className="mt-16 flex justify-between items-center pt-10 border-t border-brand-border/40">
                  <button
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className="group flex items-center gap-4 font-mono text-[10px] uppercase tracking-widest text-brand-grey hover:text-brand-white disabled:opacity-20 disabled:pointer-events-none transition-all"
                  >
                    <div className="w-10 h-10 border border-brand-border group-hover:border-brand-white flex items-center justify-center">
                       <ArrowLeft className="w-4 h-4" /> 
                    </div>
                    <span>Previous Stage</span>
                  </button>
                  
                  <div className="flex flex-col items-center">
                     <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest mb-1">Module Registry</span>
                     <span className="font-mono text-xs text-brand-white font-bold">{currentStep + 1} / {steps.length}</span>
                  </div>

                  <button
                    onClick={nextStep}
                    disabled={currentStep === steps.length - 1}
                    className="group flex items-center gap-4 font-mono text-[10px] uppercase tracking-widest text-brand-orange hover:text-brand-white transition-all disabled:opacity-0"
                  >
                    <span>Next: {steps[currentStep + 1]} </span>
                    <div className="w-10 h-10 border border-brand-orange group-hover:bg-brand-orange group-hover:text-white flex items-center justify-center">
                       <ChevronRight className="w-4 h-4" />
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Global Telemetry Sidebar */}
            <div className="lg:col-span-4 space-y-8">
              <div className="blueprint-border bg-brand-obsidian/80 backdrop-blur-md p-10 border-l-4 border-brand-orange sticky top-32 shadow-2xl">
                  <div className="flex justify-between items-center mb-10 border-b border-brand-border/40 pb-6">
                    <div className="flex items-center gap-3">
                       <Monitor className="w-4 h-4 text-brand-grey" />
                       <span className="font-mono text-[10px] text-brand-grey uppercase tracking-widest leading-none pt-1">Telemetry Status</span>
                    </div>
                    <span className="font-mono text-[9px] text-brand-orange uppercase animate-pulse flex items-center gap-2">
                       <div className="w-1.5 h-1.5 rounded-full bg-brand-orange" /> Active Build
                    </span>
                  </div>
                  
                  <div className="space-y-10">
                    <div>
                      <p className="font-mono text-[9px] text-brand-grey uppercase tracking-widest mb-2 flex items-center gap-2">
                         <Layout className="w-3 h-3" /> selected foundation
                      </p>
                      <p className="font-display text-2xl uppercase leading-none text-white">{selectedVehicle?.name}</p>
                      <p className="font-mono text-[10px] text-brand-orange uppercase mt-2 tracking-widest">{selections.configId}</p>
                    </div>
                    
                    <div className="pt-10 border-t border-brand-border/40 space-y-8">
                      <div className="flex justify-between items-end">
                        <div className="flex items-center gap-2">
                          <PoundSterling className="w-4 h-4 text-brand-grey" />
                          <span className="font-mono text-[10px] text-brand-grey uppercase tracking-widest">hardware subtotal</span>
                        </div>
                        <span className="font-display text-3xl text-white">£{totals.cost.toLocaleString()}</span>
                      </div>
                      
                      {/* GVM GAUGE */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-end">
                           <div className="flex items-center gap-2">
                              <Weight className="w-3.5 h-3.5 text-brand-grey" />
                              <span className="font-mono text-[10px] uppercase tracking-widest text-brand-grey">gross vehicle mass (est)</span>
                           </div>
                           <span className={cn(
                             "font-display text-3xl",
                             totals.gvmOver ? "text-red-500" : "text-white"
                           )}>{Math.round(totals.totalMass)}kg</span>
                        </div>
                        <div className="h-1 bg-brand-carbon relative overflow-hidden">
                           <div 
                             className={cn(
                               "h-full transition-all duration-1000",
                               totals.gvmOver ? "bg-red-500" : payloadUsagePercent > 90 ? "bg-yellow-500" : "bg-brand-orange"
                             )} 
                             style={{ width: `${Math.min(100, payloadUsagePercent)}%` }} 
                           />
                        </div>
                        <div className="flex justify-between font-mono text-[8px] uppercase tracking-widest text-brand-grey">
                           <span>Base Net {selectedVehicle?.unladenMass}kg</span>
                           <span className={totals.gvmOver ? "text-red-500 font-bold" : ""}>PL Limit: {selectedVehicle?.gvm}kg</span>
                        </div>
                      </div>

                      {/* AXLE DISTRIBUTION */}
                      <div className="pt-8 border-t border-brand-border/20 space-y-6">
                        <div className="flex items-center gap-2 mb-4">
                           <Settings className="w-3 h-3 text-brand-orange" />
                           <span className="font-mono text-[9px] text-brand-orange uppercase tracking-[0.2em]">Axle Logic Hub</span>
                        </div>
                        
                        {/* Front Axle */}
                        <div className="space-y-2">
                          <div className="flex justify-between items-end">
                             <span className="font-mono text-[8px] text-brand-grey uppercase tracking-widest">Front Axle Hub</span>
                             <span className={cn("font-display text-lg", totals.frontOver ? "text-red-500" : "text-white")}>{Math.round(totals.frontAxle)}kg</span>
                          </div>
                          <div className="h-0.5 bg-brand-carbon">
                             <div 
                               className={cn("h-full transition-all duration-700", totals.frontOver ? "bg-red-500" : "bg-brand-orange")}
                               style={{ width: `${Math.min(100, (totals.frontAxle / (selectedVehicle?.frontAxleLimit || 1)) * 100)}%` }}
                             />
                          </div>
                        </div>

                        {/* Rear Axle */}
                        <div className="space-y-2">
                          <div className="flex justify-between items-end">
                             <span className="font-mono text-[8px] text-brand-grey uppercase tracking-widest">Rear Axle Hub</span>
                             <span className={cn("font-display text-lg", totals.rearOver ? "text-red-500" : "text-white")}>{Math.round(totals.rearAxle)}kg</span>
                          </div>
                          <div className="h-0.5 bg-brand-carbon">
                             <div 
                               className={cn("h-full transition-all duration-700", totals.rearOver ? "bg-red-500" : "bg-brand-orange")}
                               style={{ width: `${Math.min(100, (totals.rearAxle / (selectedVehicle?.rearAxleLimit || 1)) * 100)}%` }}
                             />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Technical Constraints */}
                    {(totals.gvmOver || totals.frontOver || totals.rearOver) && (
                      <div className={cn(
                        "p-6 border font-mono text-[10px] uppercase tracking-widest flex flex-col gap-4 animate-pulse",
                        (totals.gvmOver || totals.frontOver || totals.rearOver) ? "bg-red-500/10 border-red-500 text-red-500" : "bg-yellow-500/10 border-yellow-500 text-yellow-500"
                      )}>
                        <div className="flex items-center gap-3">
                           <AlertTriangle className="w-5 h-5" />
                           {totals.gvmOver ? "Structural Critical" : "Axle Bias Overload"}
                        </div>
                        <p className="font-sans text-[10px] leading-relaxed opacity-80 normal-case">
                           {totals.gvmOver 
                             ? "Total build mass exceeds legal GVM. Light-weighting alternatives required to remain road-legal in the UK." 
                             : "Specific axle capacity exceeded. Reposition heavy items (Batteries/Tanks) towards the center of the vehicle."}
                        </p>
                      </div>
                    )}

                    {/* Blueprint Metadata (Export) */}
                    {mounted && currentStep === 14 && (
                      <div className="pt-10 border-t border-brand-orange/30 space-y-6">
                        <div className="flex items-center gap-3 mb-4">
                           <Download className="w-4 h-4 text-brand-orange" />
                           <span className="font-mono text-[10px] text-brand-grey uppercase tracking-widest">Portfolio Preview</span>
                        </div>
                        <PDFExportPortal 
                          data={{
                            vehicleName: selectedVehicle?.name || "Unknown Chassis",
                            configId: selections.configId,
                            buildId: clientBuildId || "PENDING",
                            tier: "Freedom Blueprint",
                            totalWeight: totals.weight || 0,
                            bom: Object.entries(selections.systems).flatMap(([systemId, tierId]) => 
                              systemManifests[systemId]?.[tierId] || []
                            )
                          }} 
                        />
                      </div>
                    )}
                  </div>
              </div>

              {/* Step Checklist (Compact) */}
              <div className="blueprint-border bg-brand-carbon/40 p-10 hidden lg:block">
                 <h4 className="font-display text-sm uppercase mb-6 tracking-widest">Build Sequence</h4>
                 <div className="space-y-3">
                   {steps.map((s, i) => (
                     <div key={s} className="flex items-center gap-3">
                        <div className={cn(
                          "w-2 h-2 rounded-full",
                          i < currentStep ? "bg-brand-orange" : i === currentStep ? "bg-brand-white animate-pulse" : "bg-brand-border"
                        )} />
                        <span className={cn(
                          "font-mono text-[9px] uppercase tracking-widest transition-colors",
                          i === currentStep ? "text-brand-white" : "text-brand-grey"
                        )}>{s}</span>
                     </div>
                   ))}
                 </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* AI Configurator Contextual Integration */}
      <BuildAdvisor 
        context={{
          vehicle: selectedVehicle?.name,
          layout: layoutTemplates.find(l => l.id === selections.layoutId)?.name,
          systems: selections.systems,
          weight: totals.weight,
          cost: totals.cost
        }}
      />

      <Footer />
    </main>
  );
}
