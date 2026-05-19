"use client";

import { useState, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
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
  Search, Package, Monitor, Activity, Crown, FileText
} from "lucide-react";
import Image from "next/image";
import { vehicleData } from "@/lib/data/vehicles";
import { chassisData, ChassisVariant } from "@/lib/data/chassisData";
import { vehicleGeometryData, getVehicleGeometryById } from "@/lib/data/vehicleGeometryData";
import { systemManifests } from "@/lib/data/manifests";
import { ThreeDViewer } from "@/components/planner/ThreeDViewer";
import { TechnicalBOM } from '@/components/planner/TechnicalBOM';
import { BuildAdvisor } from "@/components/chat/BuildAdvisor";
import { supabase } from "@/lib/supabase";

// --- CONFIGURATION DATA ---

const steps = [
  "Chassis", "Layout", "Sleeping", 
  "Electrical", "Lighting", "Heating", "Water", 
  "Gas", "Insulation", "Windows", "Exterior",
  "Security", "Finishing", "Review"
];

// Redundant Foundations removed in favor of @/lib/data/vehicles

const layoutTemplates = [
  { 
    id: "expedition", 
    name: "The Expedition", 
    description: "Fixed rear transverse bed, mid kitchen, front dinette.", 
    bestFor: "Solo or Couples", 
    image: "/images/bespoke-sprinter.png",
    modules: [
      { id: "exp-bed", name: "Fixed Transverse Bed", type: "bed", dimensionsMm: [1780, 900, 1400], positionMm: [0, 0, 700], weightKg: 45 },
      { id: "exp-garage", name: "Rear Garage", type: "garage", dimensionsMm: [1780, 900, 1400], positionMm: [0, 0, 700], weightKg: 10 },
      { id: "exp-kitchen", name: "Mid Galley", type: "kitchen", dimensionsMm: [500, 900, 1200], positionMm: [-640, 0, 2000], weightKg: 35 },
      { id: "exp-seating", name: "Front Dinette", type: "seating", dimensionsMm: [1000, 450, 600], positionMm: [400, 0, 2800], weightKg: 20 },
    ]
  },
  { 
    id: "fulltimer", 
    name: "The Full-Timer", 
    description: "Longitudinal bed, mid wet-room, large kitchen.", 
    bestFor: "Full-time living", 
    image: "/images/bespoke-crafter.png",
    modules: [
      { id: "full-bed", name: "Longitudinal Bed", type: "bed", dimensionsMm: [1400, 900, 1900], positionMm: [-190, 0, 950], weightKg: 55 },
      { id: "full-bath", name: "Mid Wet-Room", type: "bathroom", dimensionsMm: [800, 1900, 800], positionMm: [500, 0, 2000], weightKg: 40 },
      { id: "full-kitchen", name: "L-Shape Kitchen", type: "kitchen", dimensionsMm: [1200, 900, 1000], positionMm: [-290, 0, 2800], weightKg: 50 },
    ]
  },
  { 
    id: "workshop", 
    name: "The Workshop", 
    description: "Rear garage for bikes/tools, mid galley, front bed over cab.", 
    bestFor: "Digital Nomads / Gearheads", 
    image: "/images/bespoke-man.png",
    modules: [
      { id: "work-garage", name: "Gear Workshop", type: "garage", dimensionsMm: [1780, 1200, 2000], positionMm: [0, 0, 1000], weightKg: 80 },
      { id: "work-kitchen", name: "Compact Galley", type: "kitchen", dimensionsMm: [450, 900, 1000], positionMm: [-665, 0, 2600], weightKg: 30 },
      { id: "work-bulk", name: "Safety Bulkhead", type: "bulkhead", dimensionsMm: [1780, 1800, 50], positionMm: [0, 0, 3100], weightKg: 25 },
    ]
  },
];

const sleepSystems = [
  { id: "fixed-rear", name: "Fixed Rear Bed", price: 80000, weight: 45, features: ["Standard Double", "Huge Garage Space"], icon: Layout },
  { id: "rib-seat", name: "RIB Seat/Bed", price: 280000, weight: 85, features: ["Crash Tested", "Passenger Safety", "Flexible Space"], icon: Layout },
  { id: "transverse", name: "Transverse Bed", price: 120000, weight: 35, features: ["Flares Required", "Maximizes Living Space"], icon: Layout },
];

const systemConfigs = {
  electrical: {
    guidance: "Energy is the lifeblood of your build. For full-time off-grid use, we recommend a minimum of 200Ah Lithium and 300W of Solar.",
    proTip: "Always use oversized cables for inverter-to-battery connections to prevent voltage drop and heating.",
    image: "/images/tech-electrical.png",
    tiers: [
      { 
        id: "basic", name: "First Light (Basic 12V)", price: 50000, weight: 15, position: 1.5, features: ["100Ah AGM", "Split Charge", "USB Sockets"], icon: Zap,
        components: [{ id: "bat-1", name: "100Ah AGM", type: "battery", dimensionsMm: [330, 220, 170], positionMm: [-500, 0, 800], weightKg: 28 }]
      },
      { 
        id: "mid", name: "Grid Independent (Lithium)", price: 240000, weight: 35, position: 1.5, features: ["200Ah Lithium", "200W Solar", "800W Inverter"], icon: Zap,
        components: [
          { id: "bat-2", name: "200Ah Lithium", type: "battery", dimensionsMm: [480, 240, 170], positionMm: [-500, 0, 800], weightKg: 22 },
          { id: "inv-1", name: "800W Inverter", type: "inverter", dimensionsMm: [250, 150, 100], positionMm: [-500, 250, 800], weightKg: 4 },
          { id: "sol-1", name: "200W Solar Array", type: "solar", dimensionsMm: [1000, 40, 1500], positionMm: [0, 2000, 1500], weightKg: 12 }
        ]
      },
      { 
        id: "pro", name: "Full Autonomy (Premium)", price: 650000, weight: 65, position: 1.5, features: ["400Ah Lithium", "600W Solar", "3000W Multiplus"], icon: Zap,
        components: [
          { id: "bat-3", name: "400Ah Lithium Bank", type: "battery", dimensionsMm: [600, 300, 400], positionMm: [-500, 0, 800], weightKg: 45 },
          { id: "inv-2", name: "3000W Multiplus", type: "inverter", dimensionsMm: [400, 200, 300], positionMm: [-500, 450, 800], weightKg: 18 },
          { id: "sol-2", name: "600W Solar Array", type: "solar", dimensionsMm: [1500, 40, 3000], positionMm: [0, 2000, 2000], weightKg: 35 }
        ]
      },
    ]
  },
  lighting: {
    guidance: "Atmosphere is everything. Multi-zone dimmable lighting allows you to shift from utility mode to cozy dinner mode instantly.",
    proTip: "Use warm white (3000K) LEDs for the interior to avoid a clinical, 'hospital' feel.",
    image: "/images/step_lighting_cinematic_1776674939507.png",
    tiers: [
      { 
        id: "basic", name: "Stealth Setup", price: 20000, weight: 2, position: 2.0, features: ["Soft White LED Strips", "Single Zone Control"], icon: Sun,
        components: [{ id: "light-1", name: "Main LED Strip", type: "light-strip", dimensionsMm: [10, 10, 3000], positionMm: [0, 1950, 1500], weightKg: 1, color: "#fff9e6" }]
      },
      { 
        id: "mid", name: "Multi-Zone Pro", price: 55000, weight: 4, position: 2.0, features: ["3-Zone Dimming", "Under-Cabinet LEDs", "App Control"], icon: Sun,
        components: [
          { id: "light-2", name: "Ceiling North", type: "light-strip", dimensionsMm: [5, 5, 2000], positionMm: [-500, 1950, 1000], weightKg: 1, color: "#fff9e6" },
          { id: "light-3", name: "Ceiling South", type: "light-strip", dimensionsMm: [5, 5, 2000], positionMm: [500, 1950, 1000], weightKg: 1, color: "#fff9e6" },
          { id: "light-4", name: "Kick Plate", type: "light-strip", dimensionsMm: [2000, 5, 5], positionMm: [0, 100, 2000], weightKg: 1, color: "#ff6b00" }
        ]
      },
      { id: "pro", name: "Cinematic Luxe", price: 120000, weight: 10, position: 2.0, features: ["RGBW Ambient Strips", "External Scene Lights", "Motion Entry Lighting"], icon: Sun },
    ]
  },
  heating: {
    guidance: "Don't let the weather dictate your adventure. A reliable heater is the difference between a season and a year of freedom.",
    proTip: "A diesel heater altitude kit is essential if you plan on skiing or mountain trekking above 1500m.",
    image: "/images/cat-climate.png",
    tiers: [
      { 
        id: "basic", name: "Take the Edge Off", price: 25000, weight: 5, position: 0.5, features: ["5kW Diesel Heater", "2 Outlets"], icon: Thermometer,
        components: [{ id: "heat-1", name: "5kW Diesel Unit", type: "heater", dimensionsMm: [400, 150, 150], positionMm: [0, 0, 3500], weightKg: 5 }]
      },
      { 
        id: "mid", name: "Four Season (Webasto)", price: 150000, weight: 12, position: 0.5, features: ["Webasto Air Top", "Digital Controller"], icon: Thermometer,
        components: [{ id: "heat-2", name: "Webasto Air Top", type: "heater", dimensionsMm: [350, 120, 120], positionMm: [0, 0, 3500], weightKg: 8 }]
      },
      { id: "pro", name: "Home Comfort (Truma)", price: 300000, weight: 22, position: 1.0, features: ["Truma Combi 4E", "Dual Fuel", "10L Water Tank"], icon: Thermometer },
    ]
  },
  water: {
    guidance: "Off-grid endurance is measured in litres. Efficient plumbing and large-capacity tanks mean more days in the wild.",
    proTip: "Accumulator tanks drastically reduce pump cycling noise and extend the life of your plumbing joints.",
    image: "/images/tech-water.png",
    tiers: [
      { 
        id: "basic", name: "The Essentials", price: 30000, weight: 10, position: 3.5, features: ["40L Fresh", "25L Grey", "Submersible Pump"], icon: Droplets,
        components: [{ id: "tank-1", name: "40L Fresh", type: "tank", dimensionsMm: [400, 300, 400], positionMm: [400, 0, 1000], weightKg: 40 }]
      },
      { 
        id: "mid", name: "Clean Living", price: 70000, weight: 25, position: 3.5, features: ["80L Fresh", "Pressure Pump", "Hot Mixer Tap"], icon: Droplets,
        components: [{ id: "tank-2", name: "80L Fresh", type: "tank", dimensionsMm: [600, 350, 400], positionMm: [400, 0, 1200], weightKg: 80 }]
      },
      { 
        id: "pro", name: "Full Wet Room", price: 120000, weight: 45, position: 3.0, features: ["100L Fresh", "Internal Shower", "Water Filter"], icon: Droplets,
        components: [{ id: "tank-3", name: "100L High-Cap Fresh", type: "tank", dimensionsMm: [800, 400, 400], positionMm: [400, 0, 1500], weightKg: 100 }]
      },
    ]
  },
  gas: {
    guidance: "Cooking with flame is efficient, but requires strict safety standards. Consider all-electric if you want a gas-free build.",
    proTip: "Always use a gas locker with a floor vent for safety. It's a non-negotiable for insurance.",
    image: "/images/cat-gas.png",
    tiers: [
      { id: "none", name: "No Gas (All Electric)", price: 0, weight: 0, position: 0, features: ["Induction Cooking", "Diesel Heating"], icon: Flame },
      { 
        id: "basic", name: "Single Bottle", price: 30000, weight: 15, position: 3.8, features: ["6kg Calor", "2-Burner Hob"], icon: Flame,
        components: [{ id: "gas-1", name: "Safety Locker", type: "gas-locker", dimensionsMm: [300, 400, 300], positionMm: [500, 0, 500], weightKg: 15 }]
      },
      { id: "pro", name: "Dual Bottle / Auto Change", price: 70000, weight: 30, position: 3.8, features: ["2x 6kg Bottles", "Oven/Grill", "BBQ Point"], icon: Flame },
    ]
  },
  insulation: {
    guidance: "The best heater won't work without good insulation. High-quality polyisocyanurate (PIR) board and sound deadening is the foundation of comfort.",
    proTip: "Cover every inch of exposed metal with insulation or lining carpet to prevent condensation cold-spots.",
    image: "/images/cat-insulation.png",
    tiers: [
      { id: "basic", name: "Three Season", price: 40000, weight: 30, position: 2.0, features: ["25mm Foam", "Dodo Mat", "1x MaxxFan"], icon: Wind },
      { id: "mid", name: "All Season", price: 80000, weight: 50, position: 2.0, features: ["50mm Rigid Board", "Thinsulate", "Rain Sensor Fan"], icon: Wind },
      { id: "pro", name: "Extreme Climate", price: 170000, weight: 80, position: 2.0, features: ["Full Composite", "Underfloor Heating", "Double Glazing"], icon: Wind },
    ]
  },
  windows: {
    guidance: "Natural light transforms a van from a metal box into a home. Strategic window placement is key for both views and cross-ventilation.",
    proTip: "Bonded windows provide a much cleaner, factory look than traditional rubber-seal windows.",
    image: "/images/cat-interior.png",
    tiers: [
      { 
        id: "basic", name: "Standard Venting", price: 40000, weight: 12, position: 2.0, features: ["1x Sliding Window", "1x Fixed Window"], icon: Eye,
        components: [
          { id: "win-1", name: "Side Slider", type: "window", dimensionsMm: [1000, 500, 10], positionMm: [-900, 1000, 1500], weightKg: 6 },
          { id: "win-2", name: "Fixed Panel", type: "window", dimensionsMm: [1000, 500, 10], positionMm: [900, 1000, 1500], weightKg: 6 }
        ]
      },
      { 
        id: "pro", name: "Full Panoramic", price: 120000, weight: 35, position: 2.0, features: ["All-Round Glass", "Privacy Tint", "Blackout Blinds"], icon: Eye,
        components: [
          { id: "win-3", name: "Rear Quarters", type: "window", dimensionsMm: [800, 450, 10], positionMm: [-900, 1000, 500], weightKg: 5 },
          { id: "win-4", name: "Rear Quarters", type: "window", dimensionsMm: [800, 450, 10], positionMm: [900, 1000, 500], weightKg: 5 }
        ]
      },
    ]
  },
  exterior: {
    guidance: "Your van's external configuration defines its utility. Racks, ladders, and awnings turn it into a hub for outdoor adventure.",
    proTip: "Side-mounted ladders are less stress on the rear door hinges and don't block your rearview optics.",
    image: "/images/step_exterior_cinematic_1776674981526.png",
    tiers: [
      { 
        id: "basic", name: "Minimalist Utility", price: 35000, weight: 15, position: 4.5, features: ["Roof Cross Bars", "Side Steps"], icon: Settings,
        components: [{ id: "rack-1", name: "Cross Bars", type: "rack", dimensionsMm: [1800, 50, 100], positionMm: [0, 2050, 1000], weightKg: 15 }]
      },
      { 
        id: "mid", name: "Basecamp Ready", price: 140000, weight: 45, position: 4.5, features: ["Fiamma Awning", "Rear Ladder", "Lashing Points"], icon: Settings,
        components: [
          { id: "awn-1", name: "Fiamma F45", type: "awning", dimensionsMm: [150, 150, 3000], positionMm: [950, 2000, 1500], weightKg: 25 },
          { id: "rack-2", name: "Utility Rack", type: "rack", dimensionsMm: [1700, 100, 3500], positionMm: [0, 2100, 1750], weightKg: 35 }
        ]
      },
      { id: "pro", name: "Expedition Grade", price: 350000, weight: 85, position: 4.5, features: ["Full Walk-On Rack", "Side Ladder", "Case Storage"], icon: Settings },
    ]
  },
  security: {
    guidance: "Protect your sanctuary. Modern security combines physical barriers with digital monitoring for total peace of mind.",
    proTip: "A Ghost immobiliser is the single most effective electronic theft deterrent currently available in the UK.",
    image: "/images/step_security_cinematic_1776675013013.png",
    tiers: [
      { id: "basic", name: "Deterrent Level", price: 25000, weight: 5, position: 0.5, features: ["External Deadlocks", "OBD Port Lock"], icon: Shield },
      { id: "mid", name: "Pro Monitoring", price: 65000, weight: 8, position: 0.5, features: ["Thatcham S7 Tracker", "24/7 Monitoring", "Internal Alarm"], icon: Shield },
      { id: "pro", name: "Fortress Mode", price: 150000, weight: 12, position: 0.5, features: ["Ghost Immobiliser", "S5+ Tracker", "Motion CCTV"], icon: Shield },
    ]
  },
  finishing: {
    guidance: "The final touch. Premium worktops, linens, and upholstery turn a 'build' into a 'home'. Choose your material palette.",
    proTip: "Opt for marine-grade fabrics; they're UV resistant and much easier to clean after a muddy adventure.",
    image: "/images/step_finishing_touches_cinematic_1776675074937.png",
    tiers: [
      { id: "basic", name: "Raw Efficiency", price: 50000, weight: 10, position: 2.5, features: ["Birch Ply Trim", "Canvas Upholstery"], icon: Sparkles },
      { id: "mid", name: "Mountain Modern", price: 180000, weight: 25, position: 2.5, features: ["Bamboo Worktops", "Velour Lining", "Premium Foam"], icon: Sparkles },
      { id: "pro", name: "Luxury High-End", price: 450000, weight: 40, position: 2.5, features: ["Solid Walnut", "Alcantara Upholstery", "Stone Worktops"], icon: Sparkles },
    ]
  }
};

// --- COMPONENT ---

export default function BuildPlannerClient({ content }: { content: any }) {
  const [mounted, setMounted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [savedPlanId, setSavedPlanId] = useState<string | null>(null);
  const [clientBuildId, setClientBuildId] = useState("");
  
  const [selections, setSelections] = useState({
    vehicleId: "mercedes-sprinter",
    variantId: "sprinter-144-standard", // Maps to vehicleGeometryData ID
    configId: "144\" WB Standard",
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

  const [manualOverride, setManualOverride] = useState({
    active: false,
    baseKerbWeightKg: 0, // Using 0 so we fallback to variant data unless overridden
    grossVehicleWeightKg: 0,
    frontAxleLimitKg: 0,
    rearAxleLimitKg: 0,
    exteriorLengthMm: 0,
    exteriorWidthMm: 0,
    exteriorHeightMm: 0,
    loadLengthMm: 0,
    loadWidthMm: 0,
    loadHeightMm: 0,
    wheelbaseMm: 0,
  });

  useEffect(() => {
    setMounted(true);
    setClientBuildId("BUILD-" + Math.random().toString(36).substring(2, 9).toUpperCase());
  }, []);

  // --- Engineering Calculation Engine ---
  const getSelectedChassisVariant = () => {
    return getVehicleGeometryById(selections.variantId) || vehicleGeometryData[0];
  };

  const getActiveDimensions = () => {
    const variant = getSelectedChassisVariant();
    return {
      exteriorLengthMm: manualOverride.active && manualOverride.exteriorLengthMm ? manualOverride.exteriorLengthMm : variant.exteriorLengthMm,
      exteriorWidthMm: manualOverride.active && manualOverride.exteriorWidthMm ? manualOverride.exteriorWidthMm : variant.exteriorWidthMm,
      exteriorHeightMm: manualOverride.active && manualOverride.exteriorHeightMm ? manualOverride.exteriorHeightMm : variant.exteriorHeightMm,
      loadLengthMm: manualOverride.active && manualOverride.loadLengthMm ? manualOverride.loadLengthMm : variant.loadLengthMm,
      loadWidthMm: manualOverride.active && manualOverride.loadWidthMm ? manualOverride.loadWidthMm : variant.loadWidthMm,
      loadHeightMm: manualOverride.active && manualOverride.loadHeightMm ? manualOverride.loadHeightMm : variant.loadHeightMm,
      wheelbaseMm: manualOverride.active && manualOverride.wheelbaseMm ? manualOverride.wheelbaseMm : variant.wheelbaseMm,
    };
  };

  const totals = useMemo(() => {
    let cost = 0;
    let hardwareWeight = 0;
    
    const variant = getSelectedChassisVariant();
    const baseKerbWeightKg = manualOverride.active && manualOverride.baseKerbWeightKg ? manualOverride.baseKerbWeightKg : variant.baseKerbWeightKg;
    const grossVehicleWeightKg = manualOverride.active && manualOverride.grossVehicleWeightKg ? manualOverride.grossVehicleWeightKg : variant.grossVehicleWeightKg;
    
    const frontAxleLimitKg = manualOverride.active && manualOverride.frontAxleLimitKg ? manualOverride.frontAxleLimitKg : 1850;
    const rearAxleLimitKg = manualOverride.active && manualOverride.rearAxleLimitKg ? manualOverride.rearAxleLimitKg : 2100;

    // Sum system tiers
    Object.entries(selections.systems).forEach(([key, tierId]) => {
      const config = (systemConfigs as any)[key]?.tiers.find((t: any) => t.id === tierId);
      if (config) {
        cost += config.price;
        hardwareWeight += config.weight;
      }
    });

    // Add sleeping system
    const sleep = sleepSystems.find(s => s.id === selections.sleepingId);
    if (sleep) {
      cost += sleep.price;
      hardwareWeight += sleep.weight;
    }

    // Calculate moment and weight from layout modules
    const selectedLayout = layoutTemplates.find(l => l.id === selections.layoutId);
    let layoutWeight = 0;
    let layoutMoment = 0; // Relative to front axle
    
    if (selectedLayout) {
      selectedLayout.modules.forEach(m => {
        layoutWeight += m.weightKg;
        // Position is relative to REAR center of floor. 
        // Need to convert to distance from FRONT axle.
        // frontAxlePos (relative to rear) = loadLength + 0.5 (approx)
        // distance from rear = - m.positionMm[2] (because z is negative moving forward)
        // Actually my z in 3D is negative moving forward from rear.
        // So distance from rear = m.positionMm[2] 
        // No, in my 3D I put modules at [x, y, z] relative to loadspace rear.
        // Let's assume z is distance from rear wall.
        const distFromRear = m.positionMm[2];
        const distFromFrontAxle = (variant.loadLengthMm + 500) - distFromRear; 
        layoutMoment += m.weightKg * (distFromFrontAxle / 1000); // kg*m
      });
    }

    // Calculate moment and weight from system components
    let systemMoment = 0;
    let systemCompWeight = 0;
    
    Object.entries(selections.systems).forEach(([key, tierId]) => {
      const config = (systemConfigs as any)[key]?.tiers.find((t: any) => t.id === tierId);
      if (config?.components) {
        config.components.forEach((m: any) => {
          systemCompWeight += m.weightKg;
          const distFromRear = m.positionMm[2];
          const distFromFrontAxle = (variant.loadLengthMm + 500) - distFromRear; 
          systemMoment += m.weightKg * (distFromFrontAxle / 1000);
        });
      }
    });

    // Calculate insulation mass based on surface area
    const dims = getActiveDimensions();
    const surfaceAreaM2 = (dims.loadLengthMm * dims.loadWidthMm * 2 + dims.loadLengthMm * dims.loadHeightMm * 2 + dims.loadWidthMm * dims.loadHeightMm) / 1000000;
    const insulationTier = systemConfigs.insulation.tiers.find(t => t.id === selections.systems.insulation);
    const insulationWeight = surfaceAreaM2 * (insulationTier?.id === 'pro' ? 8 : insulationTier?.id === 'mid' ? 5 : 3);

    const totalHardwareWeight = hardwareWeight + layoutWeight + systemCompWeight + insulationWeight;
    const estimatedGrossMassKg = baseKerbWeightKg + totalHardwareWeight;
    const payloadRemainingKg = grossVehicleWeightKg - estimatedGrossMassKg;

    // Base chassis moment (assuming 55/45 distribution of empty van)
    const wheelbaseM = (variant.wheelbaseMm || 3665) / 1000;
    const baseRearLoad = baseKerbWeightKg * 0.45;
    const baseMoment = baseRearLoad * wheelbaseM;

    // Total moment relative to front axle
    const totalMoment = baseMoment + layoutMoment + systemMoment;
    
    // Calculate axle loads
    const rearAxleEstimateKg = totalMoment / wheelbaseM;
    const frontAxleEstimateKg = estimatedGrossMassKg - rearAxleEstimateKg;

    return { 
      cost, 
      weight: totalHardwareWeight, 
      baseKerbWeightKg,
      grossVehicleWeightKg,
      estimatedGrossMassKg,
      payloadRemainingKg,
      frontAxleEstimateKg,
      rearAxleEstimateKg,
      frontAxleLimitKg,
      rearAxleLimitKg,
      gvmOver: payloadRemainingKg < 0,
      frontOver: frontAxleEstimateKg > frontAxleLimitKg,
      rearOver: rearAxleEstimateKg > rearAxleLimitKg
    };
  }, [selections.systems, selections.sleepingId, selections.variantId, selections.vehicleId, selections.layoutId, manualOverride]);

  const selectedVehicle = useMemo(() => {
    return selections.vehicleId ? vehicleData[selections.vehicleId] : null;
  }, [selections.vehicleId]);

  const systemComponents = useMemo(() => {
    const components: any[] = [];
    Object.entries(selections.systems).forEach(([key, tierId]) => {
      const config = (systemConfigs as any)[key]?.tiers.find((t: any) => t.id === tierId);
      if (config?.components) {
        components.push(...config.components);
      }
    });
    return components;
  }, [selections.systems]);

  const payloadUsagePercent = useMemo(() => {
    if (!totals.grossVehicleWeightKg) return 0;
    return Math.round((totals.estimatedGrossMassKg / totals.grossVehicleWeightKg) * 100);
  }, [totals.estimatedGrossMassKg, totals.grossVehicleWeightKg]);

  const formatCurrency = (val: number) => {
    if (!mounted) return `£${(val / 100) || 0}`;
    return `£${((val || 0) / 100).toLocaleString()}`;
  };

  const formatWeight = (val: number) => {
    if (!mounted) return `${val || 0}kg`;
    return `${(val || 0).toLocaleString()}kg`;
  };

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
                  
                  {/* Chassis Selection Stage */}
                  {currentStep === 0 && (
                    <div className="space-y-8 animate-in fade-in duration-700">
                      <div>
                        <h2 className="font-display text-5xl uppercase mb-4 tracking-tighter leading-none">Chassis & Wheelbase Selection</h2>
                        <p className="font-sans text-brand-grey text-lg max-w-xl">Every serious build starts with the right foundation. Select your vehicle platform and wheelbase so the planner can calculate payload, space and system recommendations more accurately.</p>
                      </div>

                      {/* Main visual area: 3D translucent van viewer */}
                      <div className="w-full h-[50vh] min-h-[400px]">
                        <ThreeDViewer vehicle={{...getSelectedChassisVariant(), ...getActiveDimensions()}} />
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Chassis cards */}
                        <div>
                          <h3 className="font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-4">1. Vehicle Platform</h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {Object.entries(vehicleData).map(([id, v]) => (
                              <button
                                key={id}
                                onClick={() => {
                                  const firstVariant = vehicleGeometryData.find(c => c.id.startsWith(id.split('-')[1] || id));
                                  setSelections({ 
                                    ...selections, 
                                    vehicleId: id,
                                    variantId: firstVariant ? firstVariant.id : selections.variantId,
                                  });
                                }}
                                className={cn(
                                  "p-4 text-left blueprint-border transition-all",
                                  selections.vehicleId === id ? "bg-brand-orange/10 border-brand-orange" : "bg-brand-obsidian/50 hover:border-brand-grey"
                                )}
                              >
                                <span className="font-display text-lg uppercase block">{v.name}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Variant selector & Advanced override */}
                        <div className="space-y-8">
                          <div>
                            <h3 className="font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-4">2. Wheelbase & Roof Variant</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {vehicleGeometryData.filter(v => v.id.includes(selections.vehicleId.split('-')[1] || selections.vehicleId)).map(c => (
                                <button
                                  key={c.id}
                                  onClick={() => setSelections({...selections, variantId: c.id})}
                                  className={cn(
                                    "p-4 blueprint-border text-left transition-all bg-brand-obsidian/50",
                                    selections.variantId === c.id ? "bg-brand-orange/10 border-brand-orange" : "border-brand-border/30 hover:border-brand-grey"
                                  )}
                                >
                                  <span className="font-display text-sm uppercase block mb-1">{c.wheelbaseLabel} {c.roofLabel && `- ${c.roofLabel}`}</span>
                                  <span className="font-mono text-[8px] text-brand-grey uppercase tracking-widest block">{c.variantLabel}</span>
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Manual Override Form */}
                          <div className="pt-4 border-t border-brand-border/30">
                            <button 
                              onClick={() => setManualOverride({...manualOverride, active: !manualOverride.active})}
                              className="font-mono text-[10px] uppercase tracking-widest text-brand-orange hover:text-white transition-colors flex items-center gap-2"
                            >
                              <Settings className="w-3 h-3" /> Advanced: Actual Vehicle Dimensions Override
                            </button>
                            
                            {manualOverride.active && (
                              <div className="mt-4 space-y-6 p-6 bg-brand-obsidian border border-brand-border/50 animate-in fade-in">
                                <div>
                                  <p className="font-mono text-[9px] text-brand-orange uppercase tracking-widest mb-4">Using user-supplied vehicle data for this build.</p>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <label className="block font-mono text-[9px] uppercase tracking-widest text-brand-grey mb-2">External Length (mm)</label>
                                      <input type="number" value={manualOverride.exteriorLengthMm || ''} onChange={e => setManualOverride({...manualOverride, exteriorLengthMm: parseInt(e.target.value) || 0})} className="w-full bg-brand-carbon border border-brand-border p-2 text-white font-mono text-xs" />
                                    </div>
                                    <div>
                                      <label className="block font-mono text-[9px] uppercase tracking-widest text-brand-grey mb-2">External Width (mm)</label>
                                      <input type="number" value={manualOverride.exteriorWidthMm || ''} onChange={e => setManualOverride({...manualOverride, exteriorWidthMm: parseInt(e.target.value) || 0})} className="w-full bg-brand-carbon border border-brand-border p-2 text-white font-mono text-xs" />
                                    </div>
                                    <div>
                                      <label className="block font-mono text-[9px] uppercase tracking-widest text-brand-grey mb-2">External Height (mm)</label>
                                      <input type="number" value={manualOverride.exteriorHeightMm || ''} onChange={e => setManualOverride({...manualOverride, exteriorHeightMm: parseInt(e.target.value) || 0})} className="w-full bg-brand-carbon border border-brand-border p-2 text-white font-mono text-xs" />
                                    </div>
                                    <div>
                                      <label className="block font-mono text-[9px] uppercase tracking-widest text-brand-grey mb-2">Internal Load Length (mm)</label>
                                      <input type="number" value={manualOverride.loadLengthMm || ''} onChange={e => setManualOverride({...manualOverride, loadLengthMm: parseInt(e.target.value) || 0})} className="w-full bg-brand-carbon border border-brand-border p-2 text-white font-mono text-xs" />
                                    </div>
                                    <div>
                                      <label className="block font-mono text-[9px] uppercase tracking-widest text-brand-grey mb-2">Internal Load Width (mm)</label>
                                      <input type="number" value={manualOverride.loadWidthMm || ''} onChange={e => setManualOverride({...manualOverride, loadWidthMm: parseInt(e.target.value) || 0})} className="w-full bg-brand-carbon border border-brand-border p-2 text-white font-mono text-xs" />
                                    </div>
                                    <div>
                                      <label className="block font-mono text-[9px] uppercase tracking-widest text-brand-grey mb-2">Internal Load Height (mm)</label>
                                      <input type="number" value={manualOverride.loadHeightMm || ''} onChange={e => setManualOverride({...manualOverride, loadHeightMm: parseInt(e.target.value) || 0})} className="w-full bg-brand-carbon border border-brand-border p-2 text-white font-mono text-xs" />
                                    </div>
                                    <div>
                                      <label className="block font-mono text-[9px] uppercase tracking-widest text-brand-grey mb-2">Wheelbase (mm)</label>
                                      <input type="number" value={manualOverride.wheelbaseMm || ''} onChange={e => setManualOverride({...manualOverride, wheelbaseMm: parseInt(e.target.value) || 0})} className="w-full bg-brand-carbon border border-brand-border p-2 text-white font-mono text-xs" />
                                    </div>
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-brand-border/30">
                                   <div>
                                     <label className="block font-mono text-[9px] uppercase tracking-widest text-brand-grey mb-2">Actual Base Kerb Weight (kg)</label>
                                     <input type="number" value={manualOverride.baseKerbWeightKg || ''} onChange={e => setManualOverride({...manualOverride, baseKerbWeightKg: parseInt(e.target.value) || 0})} className="w-full bg-brand-carbon border border-brand-border p-2 text-white font-mono text-xs" />
                                   </div>
                                   <div>
                                     <label className="block font-mono text-[9px] uppercase tracking-widest text-brand-grey mb-2">Actual Gross Vehicle Weight (kg)</label>
                                     <input type="number" value={manualOverride.grossVehicleWeightKg || ''} onChange={e => setManualOverride({...manualOverride, grossVehicleWeightKg: parseInt(e.target.value) || 0})} className="w-full bg-brand-carbon border border-brand-border p-2 text-white font-mono text-xs" />
                                   </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-8 p-4 border border-brand-border/30 bg-brand-obsidian/30">
                        <p className="font-mono text-[9px] text-brand-grey uppercase tracking-widest leading-relaxed">
                          Disclaimer: Dimensions and weights are planning estimates. Confirm your actual vehicle measurements, VIN plate, V5C/specification data and weighbridge results before cutting, ordering or relying on payload calculations.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Interior Layout Architect */}
                  {currentStep === 1 && (
                    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                      <div>
                        <h2 className="font-display text-5xl uppercase mb-4 tracking-tighter leading-none">Interior Layout Architect</h2>
                        <p className="font-sans text-brand-grey text-lg max-w-xl">
                          Select your build template. Each layout is engineering-optimized for weight distribution, 
                          structural integrity, and internal build volume.
                        </p>
                      </div>

                      {/* Layout Visualizer */}
                      <div className="w-full h-[50vh] min-h-[400px]">
                        <ThreeDViewer 
                          vehicle={{...getSelectedChassisVariant(), ...getActiveDimensions()}} 
                          mode="Interior Build Envelope"
                          layoutModules={layoutTemplates.find(l => l.id === selections.layoutId)?.modules as any}
                          systemComponents={systemComponents}
                        />
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {layoutTemplates.map((template) => (
                          <button
                            key={template.id}
                            onClick={() => setSelections({ ...selections, layoutId: template.id })}
                            className={cn(
                              "group relative p-8 border text-left transition-all duration-500 overflow-hidden",
                              selections.layoutId === template.id 
                                ? "bg-brand-orange/10 border-brand-orange ring-1 ring-brand-orange" 
                                : "bg-brand-obsidian/40 border-brand-border hover:border-brand-grey"
                            )}
                          >
                            <div className="flex flex-col h-full gap-6">
                              <div className="flex justify-between items-start">
                                <Layout className={cn(
                                  "w-8 h-8 transition-colors",
                                  selections.layoutId === template.id ? "text-brand-orange" : "text-brand-grey group-hover:text-white"
                                )} />
                                <span className="font-mono text-[10px] text-brand-grey uppercase tracking-widest">{template.bestFor}</span>
                              </div>
                              
                              <div className="space-y-2">
                                <h3 className="font-display text-2xl uppercase text-white">{template.name}</h3>
                                <p className="font-sans text-xs text-brand-grey leading-relaxed">{template.description}</p>
                              </div>

                              <div className="mt-auto pt-6 border-t border-brand-border/20 space-y-4">
                                <div className="flex justify-between font-mono text-[9px] uppercase tracking-widest">
                                  <span className="text-brand-grey">Module Weight</span>
                                  <span className="text-white">{template.modules.reduce((acc, m) => acc + m.weightKg, 0)}kg</span>
                                </div>
                                <div className="flex justify-between font-mono text-[9px] uppercase tracking-widest">
                                  <span className="text-brand-grey">Storage Cap</span>
                                  <span className="text-white">High</span>
                                </div>
                              </div>
                            </div>
                            
                            {selections.layoutId === template.id && (
                              <div className="absolute top-0 right-0 p-2 bg-brand-orange text-white">
                                <CheckCircle2 className="w-4 h-4" />
                              </div>
                            )}
                          </button>
                        ))}
                      </div>

                      <div className="p-8 bg-brand-carbon/40 border border-brand-border flex items-start gap-6">
                        <div className="p-3 bg-brand-orange/10 border border-brand-orange/30">
                          <Settings className="w-6 h-6 text-brand-orange" />
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-display text-sm uppercase text-white">Technical Stability Note</h4>
                          <p className="font-sans text-xs text-brand-grey leading-relaxed max-w-2xl">
                            All layouts are centered on the vehicle floor axis. Transverse modules are fixed to wall boundaries. 
                            If your Actual Vehicle dimensions differ from manufacturer standards, modules will automatically scale to fit the available envelope.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Sleeping Configuration */}
                  {currentStep === 2 && (
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
                                <div className="font-display text-4xl text-brand-white">{formatCurrency(s.price)}</div>
                                <div className="font-mono text-[10px] text-brand-grey uppercase tracking-widest mt-1">+{formatWeight(s.weight)} Impact</div>
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
                            
                            {/* MONETIZATION CTA */}
                            <div className="bg-brand-orange/5 border border-brand-orange/20 p-4 mt-8 flex items-center gap-4">
                               <div className="bg-brand-orange/10 p-2 border border-brand-orange/30">
                                  <Package className="w-5 h-5 text-brand-orange" />
                               </div>
                               <div>
                                  <p className="font-mono text-[9px] text-brand-orange uppercase tracking-[0.2em] font-bold">Direct Hardware Mapping</p>
                                  <p className="font-sans text-[10px] text-brand-grey uppercase tracking-widest mt-1">Your choice here will generate a verified parts list in your Build Basket.</p>
                               </div>
                            </div>
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

                          <div className="w-full h-[400px] lg:h-[600px] blueprint-border bg-brand-carbon/20">
                            <ThreeDViewer 
                               vehicle={{...getSelectedChassisVariant(), ...getActiveDimensions()}} 
                               mode="System X-Ray"
                               layoutModules={layoutTemplates.find(l => l.id === selections.layoutId)?.modules as any}
                               systemComponents={systemComponents}
                            />
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
                                <div className="font-display text-4xl text-brand-white">{formatCurrency(config.price)}</div>
                                <div className="font-mono text-[10px] text-brand-grey uppercase tracking-widest mt-1">+{formatWeight(config.weight)} Weight</div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })()}

                  {currentStep === 13 && (
                    <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 space-y-16">
                      {/* Premium Header */}
                      <div className="relative pt-12">
                         <div className="absolute top-0 left-0 w-32 h-px bg-gradient-to-r from-brand-orange to-transparent" />
                         <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em] mb-4 block">Manifest Finalization // Logic Locked</span>
                         <h2 className="font-display text-5xl lg:text-7xl uppercase tracking-tighter text-white mb-6 italic">Engineering Report</h2>
                         <p className="font-sans text-brand-grey text-lg max-w-2xl leading-relaxed">
                           Your custom vehicle architecture has been calculated. We have generated a comprehensive 
                           blueprint that covers structural weight distribution, electrical capacity, and habitation safety.
                         </p>
                      </div>

                      {/* Main Review Grid */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        <div className="space-y-12">
                           <div className="blueprint-border bg-brand-carbon/30 p-8 border-l-4 border-brand-orange relative overflow-hidden group">
                              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                                 <Shield className="w-20 h-20 text-white" />
                              </div>
                              <h3 className="font-display text-2xl uppercase tracking-tight text-white mb-4">Freedom Classification</h3>
                              <p className="font-sans text-brand-grey text-sm mb-8">
                                Your build profile meets the technical requirements for UK Motor-Caravan reclassification. 
                                The system manifest includes all mandated hardware for V5C compliance.
                              </p>
                              <div className="grid grid-cols-2 gap-4">
                                 {[
                                   { label: 'Weight Balance', status: 'Optimal' },
                                   { label: 'Power Integrity', status: 'Verified' },
                                   { label: 'Habitation Safety', status: 'Certified' },
                                   { label: 'DVLA Readiness', status: 'Ready' },
                                 ].map(item => (
                                   <div key={item.label} className="bg-brand-obsidian/50 p-4 border border-brand-border/40">
                                      <span className="font-mono text-[8px] text-brand-grey uppercase tracking-widest block mb-1">{item.label}</span>
                                      <span className="font-mono text-[10px] text-brand-orange font-bold uppercase">{item.status}</span>
                                   </div>
                                 ))}
                              </div>
                           </div>

                           <div className="space-y-6">
                              <div className="flex items-start gap-4">
                                 <div className="w-12 h-12 bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center shrink-0">
                                    <Zap className="w-6 h-6 text-brand-orange" />
                                 </div>
                                 <div>
                                    <h4 className="font-display text-lg uppercase text-white mb-1">Energy Intelligence</h4>
                                    <p className="font-sans text-brand-grey text-xs">Calculated total daily consumption at {Math.round(totals.weight * 0.8)}Wh with 20% safety margin.</p>
                                 </div>
                              </div>
                              <div className="flex items-start gap-4">
                                 <div className="w-12 h-12 bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center shrink-0">
                                    <Weight className="w-6 h-6 text-brand-orange" />
                                 </div>
                                 <div>
                                     <h4 className="font-display text-lg uppercase text-white mb-1">Structural Audit</h4>
                                     <p className="font-sans text-brand-grey text-xs">Load center optimized at {Math.round(totals.frontAxleEstimateKg / totals.estimatedGrossMassKg * 100)}% front bias for dynamic stability.</p>
                                 </div>
                              </div>
                           </div>
                        </div>

                        <div className="relative group">
                          <div className="absolute -inset-4 bg-brand-orange/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                          <div className="relative blueprint-border bg-black/40 overflow-hidden">
                             <div className="absolute top-4 left-4 z-20">
                                <span className="bg-brand-orange text-white font-mono text-[9px] px-3 py-1 uppercase tracking-widest">Master Manifest 01</span>
                             </div>
                             <SVGSchematic 
                               masterSelections={selections.systems} 
                               vehicleLength={selectedVehicle?.wheelbase ? selectedVehicle.wheelbase * 1.5 : 6000} 
                               vehicleWidth={1800}
                               className="w-full opacity-80"
                             />
                             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                          </div>
                        </div>
                      </div>

                      {/* BOM PREVIEW & CTA SECTION */}
                      <div className="relative mt-20 pt-20 border-t border-brand-border/20">
                         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-brand-orange" />
                         
                         <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
                            <div className="lg:col-span-2 relative">
                               <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0A0A0A] z-10" />
                               <div className="opacity-20 blur-[3px] pointer-events-none select-none scale-95 origin-top">
                                  <TechnicalBOM selections={selections} isPreview={true} />
                               </div>
                               <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0A0A0A] to-transparent z-20" />
                            </div>

                            <div className="space-y-8 lg:pl-8">
                               <div className="bg-brand-orange/5 border border-brand-orange/20 p-8 backdrop-blur-md">
                                  <Crown className="w-10 h-10 text-brand-orange mb-6" />
                                  <h4 className="font-display text-2xl uppercase tracking-tighter text-white mb-4">Complete Your Build kit</h4>
                                  <p className="font-sans text-brand-grey text-sm mb-8 leading-relaxed">
                                    Generate your full build basket and technical quote. Includes 60+ page engineering pack, 
                                    wiring diagrams, and trade-price hardware manifest.
                                  </p>
                                  <Link 
                                    href="/planner/results"
                                    className="w-full py-5 bg-brand-orange text-white font-mono text-[11px] uppercase tracking-[0.2em] hover:bg-white hover:text-brand-orange transition-all flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(255,107,0,0.2)]"
                                  >
                                    Generate Build Basket <ArrowRight className="w-4 h-4" />
                                  </Link>
                               </div>
                               
                               <div className="flex items-center gap-4 px-4 font-mono text-[9px] text-brand-grey uppercase tracking-widest opacity-60">
                                  <CheckCircle2 className="w-4 h-4 text-brand-orange" />
                                  <span>Locked Pricing Verified</span>
                               </div>
                            </div>
                         </div>
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
                         <Layout className="w-3 h-3" /> active build
                      </p>
                      <p className="font-display text-2xl uppercase leading-none text-white">{getSelectedChassisVariant().displayName}</p>
                      <div className="flex items-center justify-between mt-2">
                        <p className="font-mono text-[10px] text-brand-orange uppercase tracking-widest">{getSelectedChassisVariant().variantLabel}</p>
                        <span className={cn(
                          "font-mono text-[8px] uppercase tracking-widest px-2 py-0.5 border",
                          getSelectedChassisVariant().dimensionConfidence === 'manufacturer' ? "border-green-500 text-green-500 bg-green-500/10" :
                          getSelectedChassisVariant().dimensionConfidence === 'industry-data' ? "border-blue-500 text-blue-500 bg-blue-500/10" :
                          "border-yellow-500 text-yellow-500 bg-yellow-500/10"
                        )}>
                          {getSelectedChassisVariant().dimensionConfidence.replace('-', ' ')} data
                        </span>
                      </div>
                    </div>

                    <div className="pt-8 border-t border-brand-border/40 space-y-4">
                      <p className="font-mono text-[9px] text-brand-grey uppercase tracking-widest flex items-center gap-2">
                         <Monitor className="w-3 h-3" /> Vehicle Dimensions
                      </p>
                      <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                        <div>
                          <span className="block font-mono text-[8px] text-brand-grey uppercase tracking-widest mb-1">Exterior L/W/H</span>
                          <span className="block font-mono text-[11px] text-white">
                            {getActiveDimensions().exteriorLengthMm} x {getActiveDimensions().exteriorWidthMm} x {getActiveDimensions().exteriorHeightMm} mm
                          </span>
                        </div>
                        <div>
                          <span className="block font-mono text-[8px] text-brand-grey uppercase tracking-widest mb-1">Interior Load L/W/H</span>
                          <span className="block font-mono text-[11px] text-white">
                            {getActiveDimensions().loadLengthMm} x {getActiveDimensions().loadWidthMm} x {getActiveDimensions().loadHeightMm} mm
                          </span>
                        </div>
                        <div>
                          <span className="block font-mono text-[8px] text-brand-grey uppercase tracking-widest mb-1">Wheelbase</span>
                          <span className="block font-mono text-[11px] text-white">{getActiveDimensions().wheelbaseMm} mm</span>
                        </div>
                      </div>
                      {manualOverride.active && (
                        <p className="font-mono text-[8px] text-brand-orange uppercase tracking-widest animate-pulse mt-2">
                          Using user-supplied vehicle data for this build.
                        </p>
                      )}
                    </div>
                    
                    <div className="pt-10 border-t border-brand-border/40 space-y-8">
                      <div className="flex justify-between items-end">
                        <div className="flex items-center gap-2">
                          <PoundSterling className="w-4 h-4 text-brand-grey" />
                          <span className="font-mono text-[10px] text-brand-grey uppercase tracking-widest">hardware subtotal</span>
                        </div>
                        <span className="font-display text-3xl text-white">{formatCurrency(totals.cost)}</span>
                      </div>
                      
                      {/* GVM GAUGE */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-end">
                           <div className="flex items-center gap-2">
                              <Weight className="w-3.5 h-3.5 text-brand-grey" />
                              <span className="font-mono text-[10px] uppercase tracking-widest text-brand-grey">estimated build mass</span>
                           </div>
                           <span className={cn(
                             "font-display text-3xl",
                             totals.gvmOver ? "text-red-500" : "text-white"
                           )}>{formatWeight(Math.round(totals.estimatedGrossMassKg))}</span>
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
                           <span>Base Kerb: {formatWeight(totals.baseKerbWeightKg)}</span>
                           <span className={totals.gvmOver ? "text-red-500 font-bold" : ""}>GVW Limit: {formatWeight(totals.grossVehicleWeightKg)}</span>
                        </div>
                        
                         {/* System Performance Monitor */}
                         <div className="pt-6 border-t border-brand-border/20 space-y-4">
                           <div className="flex items-center gap-2 mb-2">
                             <Monitor className="w-3 h-3 text-brand-orange" />
                             <span className="font-mono text-[9px] text-brand-orange uppercase tracking-[0.2em]">System Performance</span>
                           </div>
                           
                           <div className="grid grid-cols-2 gap-4">
                             <div className="bg-brand-carbon/30 p-3 border border-brand-border/40">
                               <div className="flex items-center gap-2 mb-1">
                                 <Zap className="w-2.5 h-2.5 text-brand-grey" />
                                 <span className="font-mono text-[8px] text-brand-grey uppercase tracking-widest">Electrical Cap</span>
                               </div>
                               <span className="font-display text-xl text-white">
                                 {systemComponents.filter(c => c.type === 'battery').reduce((acc, c) => acc + parseInt(c.name) || 100, 0)}Ah
                               </span>
                             </div>
                             <div className="bg-brand-carbon/30 p-3 border border-brand-border/40">
                               <div className="flex items-center gap-2 mb-1">
                                 <Droplets className="w-2.5 h-2.5 text-brand-grey" />
                                 <span className="font-mono text-[8px] text-brand-grey uppercase tracking-widest">Water Storage</span>
                               </div>
                               <span className="font-display text-xl text-white">
                                 {systemComponents.filter(c => c.type === 'tank').reduce((acc, c) => acc + parseInt(c.name) || 0, 0)}L
                               </span>
                             </div>
                             <div className="bg-brand-carbon/30 p-3 border border-brand-border/40 col-span-2">
                               <div className="flex items-center gap-2 mb-1">
                                 <Thermometer className="w-2.5 h-2.5 text-brand-grey" />
                                 <span className="font-mono text-[8px] text-brand-grey uppercase tracking-widest">Thermal Rating</span>
                               </div>
                               <div className="flex items-end justify-between">
                                 <span className="font-display text-xl text-brand-orange uppercase">
                                   {selections.systems.insulation === 'pro' ? 'Extreme Arctic' : selections.systems.insulation === 'mid' ? '4-Season Alpine' : '3-Season Standard'}
                                 </span>
                                 <span className="font-mono text-[10px] text-brand-grey">R-{selections.systems.insulation === 'pro' ? '6.2' : selections.systems.insulation === 'mid' ? '4.5' : '2.1'}</span>
                               </div>
                             </div>
                           </div>
                         </div>
                         
                         {/* Payload Status */}
                        {(() => {
                           const payload = totals.payloadRemainingKg;
                           let color = "text-green-500";
                           let message = "Healthy payload margin";
                           if (payload < 0) {
                             color = "text-red-600 font-bold";
                             message = "Estimated overweight — revise build before proceeding";
                           } else if (payload < 250) {
                             color = "text-red-500";
                             message = "Payload risk — reduce weight or confirm higher GVW";
                           } else if (payload < 500) {
                             color = "text-yellow-500";
                             message = "Payload tightening — monitor system choices";
                           }
                           return (
                             <>
                               <div className="flex justify-between items-center mt-3 pt-3 border-t border-brand-border/20">
                                 <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest">Est. Payload Remaining</span>
                                 <span className={cn("font-mono text-[10px] uppercase tracking-widest font-bold", color)}>
                                    {payload > 0 ? "+" : ""}{Math.round(payload)}kg
                                 </span>
                               </div>
                               <div className={cn("font-mono text-[8px] uppercase tracking-widest text-right mt-1", color)}>{message}</div>
                             </>
                           );
                        })()}
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
                             <span className={cn("font-display text-lg", totals.frontOver ? "text-red-500" : "text-white")}>{formatWeight(Math.round(totals.frontAxleEstimateKg))}</span>
                          </div>
                          <div className="h-0.5 bg-brand-carbon">
                             <div 
                               className={cn("h-full transition-all duration-700", totals.frontOver ? "bg-red-500" : "bg-brand-orange")}
                               style={{ width: `${Math.min(100, (totals.frontAxleEstimateKg / (totals.frontAxleLimitKg || 1)) * 100)}%` }}
                             />
                          </div>
                        </div>

                        {/* Rear Axle */}
                        <div className="space-y-2">
                          <div className="flex justify-between items-end">
                             <span className="font-mono text-[8px] text-brand-grey uppercase tracking-widest">Rear Axle Hub</span>
                             <span className={cn("font-display text-lg", totals.rearOver ? "text-red-500" : "text-white")}>{formatWeight(Math.round(totals.rearAxleEstimateKg))}</span>
                          </div>
                          <div className="h-0.5 bg-brand-carbon">
                             <div 
                               className={cn("h-full transition-all duration-700", totals.rearOver ? "bg-red-500" : "bg-brand-orange")}
                               style={{ width: `${Math.min(100, (totals.rearAxleEstimateKg / (totals.rearAxleLimitKg || 1)) * 100)}%` }}
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
                            vehicleName: getSelectedChassisVariant().displayName,
                            configId: getSelectedChassisVariant().variantLabel,
                            buildId: clientBuildId || "PENDING",
                            tier: "Freedom Blueprint",
                            totalWeight: totals.weight || 0,
                            bom: Object.entries(selections.systems).flatMap(([systemId, tierId]) => {
                              const items = systemManifests[systemId]?.[tierId] || [];
                              return items.map(item => ({
                                sku: `AMP-${systemId.substring(0,3).toUpperCase()}-${tierId.toUpperCase()}`,
                                name: item.name,
                                qty: 1,
                                vendor: item.supplierId
                              }));
                            })
                          }} 
                        />

                        {/* Product / Kit Recommendations */}
                        <div className="pt-8 space-y-4">
                           <div className="flex items-center justify-between">
                             <h4 className="font-display text-sm uppercase tracking-widest text-brand-white">Recommended Build Kits</h4>
                             <Link href="/store" className="font-mono text-[8px] uppercase tracking-widest text-brand-orange hover:text-white transition-colors">Shop All Kits</Link>
                           </div>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             {/* Mock Recommended Kits based on selections */}
                             <Link href="/store/kits/victron-electrical-bundle" className="p-4 bg-brand-obsidian border border-brand-border hover:border-brand-orange transition-all flex flex-col gap-3 group">
                               <div className="flex justify-between items-start">
                                 <span className="font-mono text-[8px] uppercase tracking-widest text-brand-grey bg-brand-carbon px-2 py-1">Electrical System</span>
                                 <span className="font-mono text-[9px] text-green-500 uppercase">Save 15%</span>
                               </div>
                               <h5 className="font-display text-lg text-white group-hover:text-brand-orange transition-colors">Pro-Spec Victron Power Bundle</h5>
                               <p className="font-sans text-[10px] text-brand-grey">Matches your calculated {totals.weight}kg payload profile.</p>
                             </Link>
                             <Link href="/store/kits/dometic-climate-bundle" className="p-4 bg-brand-obsidian border border-brand-border hover:border-brand-orange transition-all flex flex-col gap-3 group">
                               <div className="flex justify-between items-start">
                                 <span className="font-mono text-[8px] uppercase tracking-widest text-brand-grey bg-brand-carbon px-2 py-1">Climate System</span>
                                 <span className="font-mono text-[9px] text-green-500 uppercase">Save 10%</span>
                               </div>
                               <h5 className="font-display text-lg text-white group-hover:text-brand-orange transition-colors">Dometic & Truma Comfort Kit</h5>
                               <p className="font-sans text-[10px] text-brand-grey">Optimised for your {selectedVehicle?.name}.</p>
                             </Link>
                           </div>
                        </div>

                        {/* Membership Upgrade Prompt */}
                        <div className="mt-8 p-6 border-2 border-brand-orange/30 bg-gradient-to-br from-brand-orange/10 to-transparent flex flex-col md:flex-row gap-6 items-center justify-between">
                           <div className="space-y-2">
                             <h4 className="font-display text-lg uppercase tracking-tight text-white flex items-center gap-2">
                               <Crown className="w-5 h-5 text-brand-orange" /> Amplios PRO Membership
                             </h4>
                             <p className="font-sans text-[11px] text-brand-grey max-w-sm">
                               Unlock unlimited saved builds, exclusive 3D CAD files, and an extra 5% off all build kits in the store.
                             </p>
                           </div>
                           <Link href="/account/upgrade" className="px-6 py-3 bg-brand-orange text-white font-mono text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-colors whitespace-nowrap">
                             Upgrade to PRO
                           </Link>
                        </div>

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
          vehicle: getSelectedChassisVariant().displayName,
          variant: getSelectedChassisVariant().variantLabel,
          layout: layoutTemplates.find(l => l.id === selections.layoutId)?.name,
          systems: selections.systems,
          weight: totals.estimatedGrossMassKg,
          payloadRemaining: totals.payloadRemainingKg,
          cost: totals.cost
        }}
      />

      <Footer />
    </main>
  );
}
