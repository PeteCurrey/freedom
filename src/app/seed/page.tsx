"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function SeedPage() {
  const [status, setStatus] = useState("Initializing...");
  const [logs, setLogs] = useState<string[]>([]);

  const log = (msg: string) => {
    console.log(msg);
    setLogs(prev => [...prev, msg]);
  };

  useEffect(() => {
    async function runSeed() {
      try {
        log("Starting seed process...");

        // 1. Ensure Categories exist with correct names and slugs
        const categories = [
          { name: 'Power Systems', slug: 'electrical', description: 'Victron, Lithium, Solar' },
          { name: 'Climate Control', slug: 'climate', description: 'Heaters, AC, Fans' },
          { name: 'Plumbing', slug: 'plumbing', description: 'Tanks, Pumps, Filtration' },
          { name: 'Insulation & Build', slug: 'insulation', description: 'The Foundation' },
          { name: 'Windows & Vent', slug: 'windows-ventilation', description: 'Dometic, MaxxFan' },
          { name: 'Exterior & Accessories', slug: 'exterior-accessories', description: 'Racks, Ladders, Awnings' },
          { name: 'Build Kits', slug: 'kits', description: 'Bundled System Packs' }
        ];

        for (const cat of categories) {
          log(`Upserting category: ${cat.name} (${cat.slug})`);
          const { error } = await supabase.from('product_categories').upsert(cat, { onConflict: 'slug' });
          if (error) throw error;
        }

        // Get category IDs
        const { data: catData, error: catError } = await supabase.from('product_categories').select('id, slug');
        if (catError) throw catError;
        const catMap = Object.fromEntries(catData?.map(c => [c.slug, c.id]) || []);

        // 2. Define Products
        const allProducts = [
          // CLIMATE
          { name: 'Webasto Air Top EVO 40', brand: 'Webasto', slug: 'webasto-air-top-evo-40', price_gbp: 115000, category_id: catMap['climate'], image_url: '/images/heating-system-technical.png', weight_kg: 5.9, short_description: '5kW diesel heater, 12V', is_active: true },
          { name: 'Eberspächer Airtronic D4', brand: 'Eberspächer', slug: 'eberspacher-airtronic-d4', price_gbp: 109500, category_id: catMap['climate'], image_url: '/images/heating-system-technical.png', weight_kg: 4.5, short_description: '4kW diesel heater, 12V/24V', is_active: true },
          { name: 'Truma Combi 4E', brand: 'Truma', slug: 'truma-combi-4e', price_gbp: 185000, category_id: catMap['climate'], image_url: '/images/heating-system-technical.png', weight_kg: 12.3, short_description: 'Combined heater + 10L hot water, LPG + 230V', is_active: true },
          { name: 'Truma VarioHeat Comfort', brand: 'Truma', slug: 'truma-varioheat-comfort', price_gbp: 94500, category_id: catMap['climate'], image_url: '/images/heating-system-technical.png', weight_kg: 5.1, short_description: '2.8kW LPG blown-air heater', is_active: true },
          { name: 'Propex HS2000', brand: 'Propex', slug: 'propex-hs2000', price_gbp: 44500, category_id: catMap['climate'], image_url: '/images/heating-system-technical.png', weight_kg: 4.0, short_description: '2kW LPG blown-air, 12V, 172×100×320mm', is_active: true },
          { name: 'Dometic CoolAir RTX 1000', brand: 'Dometic', slug: 'dometic-coolair-rtx-1000', price_gbp: 129500, category_id: catMap['climate'], image_url: '/images/heating-system-technical.png', weight_kg: 23.0, short_description: 'Roof-mount air conditioning unit', is_active: true },
          // INSULATION
          { name: 'Dodo Mat DEADN PRO', brand: 'Dodo Mat', slug: 'dodo-mat-deadn-pro', price_gbp: 8900, category_id: catMap['insulation'], image_url: '/images/insulation-technical.png', weight_kg: 4.5, short_description: '2.8mm butyl mat, 70% mass increase', is_active: true },
          { name: 'Dodo Mat Thermo Liner', brand: 'Dodo Mat', slug: 'dodo-mat-thermo-liner', price_gbp: 6500, category_id: catMap['insulation'], image_url: '/images/insulation-technical.png', weight_kg: 1.2, short_description: 'Closed-cell foam, 10mm, R-value 0.8', is_active: true },
          { name: 'Celotex GA4000 50mm', brand: 'Celotex', slug: 'celotex-ga4000-50mm', price_gbp: 4500, category_id: catMap['insulation'], image_url: '/images/insulation-technical.png', weight_kg: 2.5, short_description: 'PIR rigid board, R-value 2.25', is_active: true },
          { name: '3M Thinsulate SM600L', brand: '3M', slug: '3m-thinsulate-sm600l', price_gbp: 7500, category_id: catMap['insulation'], image_url: '/images/insulation-technical.png', weight_kg: 0.6, short_description: 'Flexible automotive insulation', is_active: true },
          { name: 'Vapor Guard Barrier Tape', brand: 'Vapor Guard', slug: 'vapor-guard-barrier-tape', price_gbp: 1800, category_id: catMap['insulation'], image_url: '/images/insulation-technical.png', weight_kg: 0.3, short_description: 'Self-adhesive vapour barrier', is_active: true },
          // WINDOWS
          { name: 'MaxxFan Deluxe', brand: 'MaxxAir', slug: 'maxxfan-deluxe', price_gbp: 34500, category_id: catMap['windows-ventilation'], image_url: '/images/insulation-technical.png', weight_kg: 6.0, short_description: '10-speed, reversible, rain sensor, 400×400mm', is_active: true },
          { name: 'Dometic S4 Sliding Window 700×300', brand: 'Dometic', slug: 'dometic-s4-700-300', price_gbp: 18500, category_id: catMap['windows-ventilation'], image_url: '/images/insulation-technical.png', weight_kg: 4.5, short_description: 'Double-glazed, integrated blind', is_active: true },
          { name: 'Dometic S4 Sliding Window 900×450', brand: 'Dometic', slug: 'dometic-s4-900-450', price_gbp: 24500, category_id: catMap['windows-ventilation'], image_url: '/images/insulation-technical.png', weight_kg: 6.2, short_description: 'Double-glazed, integrated blind', is_active: true },
          { name: 'Fiamma Vent 28 Roof Light', brand: 'Fiamma', slug: 'fiamma-vent-28', price_gbp: 16500, category_id: catMap['windows-ventilation'], image_url: '/images/insulation-technical.png', weight_kg: 2.5, short_description: '280×280mm, smoked, manual', is_active: true },
          // EXTERIOR
          { name: 'Fiamma F45S Awning 3.0m', brand: 'Fiamma', slug: 'fiamma-f45s-30m', price_gbp: 59500, category_id: catMap['exterior-accessories'], image_url: '/images/exterior-equipment-technical.png', weight_kg: 23.0, short_description: 'Titanium/grey, wall-mount, wind-out', is_active: true },
          { name: 'Fiamma Carry-Bike Pro C', brand: 'Fiamma', slug: 'fiamma-carry-bike-pro-c', price_gbp: 28500, category_id: catMap['exterior-accessories'], image_url: '/images/exterior-equipment-technical.png', weight_kg: 7.9, short_description: 'Rear carrier, 2 bikes, 35kg capacity', is_active: true },
          { name: 'Thule Step Rear Door', brand: 'Thule', slug: 'thule-step-rear', price_gbp: 16500, category_id: catMap['exterior-accessories'], image_url: '/images/exterior-equipment-technical.png', weight_kg: 5.5, short_description: 'Adjustable step, fits most LCV rear doors', is_active: true },
          { name: 'Ring RAC900 Inflator', brand: 'Ring', slug: 'ring-rac900', price_gbp: 8900, category_id: catMap['exterior-accessories'], image_url: '/images/exterior-equipment-technical.png', weight_kg: 3.5, short_description: '12V tyre inflator with pressure gauge', is_active: true }
        ];

        for (const p of allProducts) {
          log(`Upserting product: ${p.name}`);
          const { error } = await supabase.from('products').upsert(p, { onConflict: 'slug' });
          if (error) throw error;
        }

        // 3. Update Existing Products
        const updates = [
          {
            slug: 'victron-multiplus-ii-12-3000-120-32',
            full_description: "The MultiPlus-II is the command centre of a serious off-grid electrical system. Combining a 3kVA pure sine wave inverter, a 120A adaptive battery charger, and an automatic AC transfer switch in a single compact unit, it's the foundation every Full Autonomy build starts with. PowerAssist technology supplements shore or generator power during peak demand — so you can run high-draw appliances even on a limited hookup. The integrated GX communication port connects directly to a Cerbo GX for full VRM system monitoring. 18kg. Dimensions: 362×214×133mm.",
            specs: { "Works Well With": "Victron SmartSolar MPPT 100/30, Victron SmartShunt 500A, Victron Cerbo GX" },
            weight_kg: 18,
            image_url: '/images/electrical-technical.png'
          },
          {
            slug: 'victron-cerbo-gx',
            full_description: "The Cerbo GX is the intelligence layer of your Victron system — a monitoring and control hub that connects every Victron component and delivers real-time data to the GX Touch 70 screen, the VRM online portal, and the VictronConnect app. Install one and you'll know your battery state of charge, solar input, inverter output, and AC load from anywhere in the world. Supports tank level sensors, temperature probes, and up to 5 MPPT controllers. Non-negotiable on a Full Autonomy build.",
            specs: { "Works Well With": "Victron GX Touch 70, Victron SmartSolar MPPT 100/30, Victron SmartShunt 500A" },
            weight_kg: 0.4,
            image_url: '/images/electrical-technical.png'
          },
          {
            slug: 'victron-smartshunt-500a',
            full_description: "A battery monitor that actually tells you what's left in your bank — not just voltage, but genuine state of charge based on every amp in and out. The SmartShunt sits in the negative cable path and measures current with 500A capacity, logging it all to Bluetooth via VictronConnect. Integrates with Cerbo GX for system-wide monitoring. If you want to know whether you can run the fridge through the night without worrying, this is what you fit.",
            specs: { "Works Well With": "Victron Cerbo GX, Victron MultiPlus-II, Fogstar Drift 200Ah" },
            weight_kg: 0.1,
            image_url: '/images/electrical-technical.png'
          },
          {
            slug: 'victron-smartsolar-mppt-100-30',
            full_description: "A 30A solar charge controller with Victron's ultra-fast Maximum Power Point Tracking. Handles up to 100V solar input — suitable for arrays up to ~440W on a 12V system. Built-in Bluetooth for VictronConnect monitoring and configuration. The adaptive 3-stage charge algorithm (bulk, absorption, float) comes pre-configured for LiFePO4 lithium and lead-acid. Specified in both Grid Independent and Full Autonomy tiers. For systems needing more than 440W, step up to the MPPT 150/35.",
            specs: { "Works Well With": "Victron MultiPlus-II, Fogstar Drift 200Ah, 200W Solar Panel" },
            weight_kg: 1.3,
            image_url: '/images/systems-showcase.png'
          },
          {
            slug: 'fogstar-drift-200ah',
            full_description: "The Fogstar Drift has become the go-to 12V LiFePO4 battery for UK van conversions — and for good reason. Built-in BMS handles over-charge, over-discharge, over-temperature, and short-circuit protection. The optional Bluetooth module lets you monitor state of charge, cell voltages, and cycle count from your phone. At 24kg it's around a third of the weight of an equivalent AGM bank. Rated for 2,500+ cycles at 80% DoD — realistically 7-10 years of daily use. Two in parallel gives you 400Ah, which is enough for serious year-round off-grid living.",
            specs: { "Works Well With": "Victron SmartShunt 500A, Victron Orion-Tr Smart, Victron SmartSolar MPPT 100/30" },
            weight_kg: 24,
            image_url: '/images/electrical-technical.png'
          },
          {
            slug: 'dometic-cfx3-55im',
            full_description: "A 55-litre dual-zone compressor fridge/freezer that runs from 12V, 24V, or 230V — switching automatically between sources. The integrated ice maker produces up to 12 cubes per cycle. The CFX3 app connects via WiFi to let you monitor and adjust temperature remotely. Uses roughly 1.5-2Ah per hour at 12V in moderate ambient temperatures — realistic to run continuously from a 200Ah+ lithium bank. Variable Speed Compressor (VSC) technology reduces power consumption by 20% compared to the previous generation.",
            specs: { "Works Well With": "Fogstar Drift 200Ah battery, Victron SmartSolar MPPT 100/30, Victron Orion-Tr Smart" },
            weight_kg: 18.6,
            image_url: '/images/interior-showcase.png'
          },
          {
            slug: 'truma-combi-4e',
            full_description: "The Truma Combi 4E is the standard against which every other motorhome heating system is judged. A single compact unit provides 4kW of space heating via up to six ducted outlets AND heats a 10-litre water tank for hot water at the tap and shower — running on LPG, 230V electric, or both simultaneously. Whisper-quiet (47dB at full output — quieter than most refrigerators). The CP Plus control panel handles temperature zones, timer programmes, and hot water temperature. Requires Gas Safe certification for LPG connection. Dimensions: 534×270×235mm. Weight: 12.3kg including heat exchanger.",
            specs: { "Works Well With": "Truma CP Plus iNet X, Truma Ducting Kit, Truma Ultraheat" },
            weight_kg: 12.3,
            image_url: '/images/heating-system-technical.png'
          }
        ];

        for (const update of updates) {
          log(`Updating product info: ${update.slug}`);
          const { error } = await supabase.from('products').update(update).eq('slug', update.slug);
          if (error) throw error;
        }

        // 4. Seed Kits
        const kits = [
          {
            name: 'Full Autonomy Electrical Kit',
            brand: 'Amplios Verified',
            slug: 'full-autonomy',
            short_description: 'Everything you need for a complete Full Autonomy electrical system.',
            full_description: "Everything you need for a complete Full Autonomy electrical system. Victron MultiPlus-II inverter/charger, 400Ah LiFePO4 battery bank, 400W solar array, MPPT controller, SmartShunt monitor, and Cerbo GX with GX Touch 70 screen. Pre-matched for compatibility and sized for full-time off-grid use.",
            price_gbp: 289000,
            category_id: catMap['kits'],
            image_url: '/images/systems-showcase.png',
            type: 'kit',
            badge: '11% Saving',
            spec_line: 'MultiPlus-II · 400Ah Lithium · 400W Solar · Cerbo GX',
            system_tier: 'full-autonomy',
            is_active: true
          },
          {
            name: 'Four Season Climate Kit',
            brand: 'Amplios Verified',
            slug: 'four-season-climate',
            short_description: 'The complete Truma Combi 4E installation bundle.',
            full_description: "The complete Truma Combi 4E installation — heater unit, CP Plus control panel, ducting kit for up to 4 outlets, service flue set, and installation hardware. Runs on LPG gas or 230V electric. Everything in one box.",
            price_gbp: 189500,
            category_id: catMap['kits'],
            image_url: '/images/heating-system-technical.png',
            type: 'kit',
            badge: '10% Saving',
            spec_line: 'Truma Combi 4E · CP Plus · Ducting Kit · Flue Set',
            system_tier: 'intermediate',
            is_active: true
          },
          {
            name: 'Weekend Warrior Electrical Starter',
            brand: 'Amplios Verified',
            slug: 'weekend-warrior',
            short_description: 'Lithium starter system for weekenders.',
            full_description: "For weekenders and first-time builders who want a proper lithium system without overcomplicating things. 200Ah LiFePO4, Victron Orion DC-DC charger, SmartSolar MPPT 75/15, and 200W solar panel. Enough for lights, fridge, USB charging, and a 240V appliance via a small inverter.",
            price_gbp: 74900,
            category_id: catMap['kits'],
            image_url: '/images/electrical-technical.png',
            type: 'kit',
            badge: '10% Saving',
            spec_line: '200Ah Lithium · 30A DC-DC · 200W Solar · MPPT 75/15',
            system_tier: 'beginner',
            is_active: true
          }
        ];

        for (const kit of kits) {
          log(`Upserting kit: ${kit.name}`);
          const { error } = await supabase.from('products').upsert(kit, { onConflict: 'slug' });
          if (error) throw error;
        }

        setStatus("COMPLETED");
        log("Seed process finished successfully.");
      } catch (err: any) {
        console.error(err);
        setStatus("FAILED");
        log(`ERROR: ${err.message}`);
      }
    }

    runSeed();
  }, []);

  return (
    <div className="p-20 bg-slate-900 min-h-screen text-white font-mono">
      <h1 className="text-4xl mb-8">Amplios Database Seeder</h1>
      <div className="mb-4">Status: <span className={status === "COMPLETED" ? "text-green-500" : status === "FAILED" ? "text-red-500" : "text-yellow-500"}>{status}</span></div>
      <div className="bg-black p-8 rounded-lg overflow-y-auto max-h-[60vh] border border-slate-700">
        {logs.map((l, i) => <div key={i} className="mb-1 text-xs opacity-80">{l}</div>)}
      </div>
      {status === "COMPLETED" && (
        <div className="mt-8 p-4 bg-green-500/20 border border-green-500 rounded text-green-500">
          Database seeding successful. You can now close this page.
        </div>
      )}
    </div>
  );
}
