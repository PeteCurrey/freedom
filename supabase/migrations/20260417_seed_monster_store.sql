-- ==============================================================
-- MONSTER STORE: SUPPLIER & PRODUCT GENERATOR SEED
-- ==============================================================
-- This script seeds the UK Supplier Directory into the Admin CRM
-- and generates a comprehensive product catalog.

DO $$
DECLARE
    -- Category IDs
    cat_electrical uuid := '11111111-1111-1111-1111-111111111111';
    cat_heating uuid := '22222222-2222-2222-2222-222222222222';
    cat_water uuid := '33333333-3333-3333-3333-333333333333';
    cat_insulation uuid := '44444444-4444-4444-4444-444444444444';
    cat_gas uuid := '55555555-5555-5555-5555-555555555555';
    cat_ventilation uuid := '66666666-6666-6666-6666-666666666666';

    -- Supplier IDs
    sup_energysol uuid := gen_random_uuid();
    sup_callidus uuid := gen_random_uuid();
    sup_fogstar uuid := gen_random_uuid();
    sup_jacksons uuid := gen_random_uuid();
    sup_dido uuid := gen_random_uuid();
    sup_cak uuid := gen_random_uuid();
    sup_grassroutes uuid := gen_random_uuid();
BEGIN

-- 1. SEED SUPPLIERS (CRM)
INSERT INTO public.suppliers (id, name, website, trade_account, notes, categories) VALUES
  (sup_energysol, 'Energy Solutions', 'https://energy-solutions.co.uk', true, 'UK Largest Victron Distributor since 2006. Essential tech support partner.', ARRAY['electrical', 'solar']),
  (sup_callidus, 'Callidus Trade', 'https://callidus.shop', true, 'Devon-based Victron distributor.', ARRAY['electrical', 'solar']),
  (sup_fogstar, 'Fogstar', 'https://fogstar.co.uk', true, 'UK leading van battery brand (Drift range).', ARRAY['electrical']),
  (sup_jacksons, 'Jacksons Leisure', 'https://jacksonsleisure.com', true, 'One of the UKs biggest leisure parts suppliers. Sells Truma, Webasto, complete kits.', ARRAY['heating', 'water', 'ventilation']),
  (sup_dido, 'Dodo Mat', 'https://dodomat.com', true, 'British made sound deadening and insulation.', ARRAY['insulation']),
  (sup_cak, 'CAK Tanks', 'https://caktanks.co.uk', true, 'Tank specialists, custom capacities.', ARRAY['water', 'plumbing']),
  (sup_grassroutes, 'Grassroutes Leisure', 'https://grassroutesleisure.co.uk', true, 'Vöhringer lightweight ply distributor.', ARRAY['interiors', 'hardware']);

-- 2. SEED AFFILIATE NETWORKS (CRM)
INSERT INTO public.affiliate_management (name, network, base_url, tracking_id, commission_rate, category_focus, is_active) VALUES
  ('Amazon DIY Components', 'Amazon Associates UK', 'https://amazon.co.uk', 'amplios-21', '1-10%', 'Catch-all standard components', true),
  ('EcoFlow Power Stations', 'EcoFlow Partner Network', 'https://ecoflow.com/uk', 'REF-AMP-1', '5%', 'Portable Power Stations', true),
  ('eBay Salvage Parts', 'eBay Partner Network', 'https://ebay.co.uk', '12345ABC', 'Variable', 'Used OEM Seats, Steering Wheels', true);

-- 3. SEED MASSIVE PRODUCT CATALOG (Mapped to Suppliers & Categories)

-- A. PREMIUM ELECTRICAL
INSERT INTO public.products (category_id, supplier_id, name, brand, slug, short_description, full_description, price_gbp, image_url, stock_quantity) VALUES
  (cat_electrical, sup_energysol, 'SmartSolar MPPT 150/70 Tr', 'Victron Energy', 'victron-mppt-150-70-tr', 'Ultra-fast Maximum Power Point Tracking (MPPT).', '## Ultra-fast Solar Processing\nSpecifically designed to maximise energy-harvest from vast solar arrays in expedition vehicles.', 55000, '/images/electrical-technical.png', 12),
  (cat_electrical, sup_energysol, 'Quattro 12/5000/220-100/100', 'Victron Energy', 'victron-quattro-5000', 'Two AC inputs and two AC outputs with massive 5000W output.', '## The Ultimate Power \nPerfect for running domestic air conditioning, induction hobs, and heavy loads simultaneously.', 250000, '/images/electrical-technical.png', 4),
  (cat_electrical, sup_fogstar, 'Drift PRO 12V 280Ah LiFePO4', 'Fogstar', 'fogstar-drift-pro-280', 'UK designed, smart heated lithium leisure battery.', '## Fogstar Drift Pro\nHeated technology allowing safe charging below 0C. Integrated BMS with bluetooth monitoring.', 85000, '/images/systems-showcase.png', 40),
  (cat_electrical, sup_energysol, 'Lynx Shunt VE.Can', 'Victron Energy', 'victron-lynx-shunt', 'Intelligent battery monitor housed within the Lynx distribution framework.', 'Provides exact state of charge telemetry directly to the Cerbo GX.', 32000, '/images/electrical-technical.png', 10);

-- B. CLIMATE CONTROL
INSERT INTO public.products (category_id, supplier_id, name, brand, slug, short_description, full_description, price_gbp, image_url, stock_quantity) VALUES
  (cat_heating, sup_jacksons, 'Combi 6E Diesel & 230v', 'Truma', 'truma-combi-6e', 'Powerful combination heater for extreme climates.', 'Capable of running entirely off campsite hook-up or diesel. Perfect for arctic environments.', 280000, '/images/heating-system-technical.png', 5),
  (cat_heating, sup_jacksons, 'Air Top 2000 STC w/ MultiControl', 'Webasto', 'webasto-airtop-2000', 'Compact, whisper-quiet air heating.', 'Includes altitude sensing mode to allow safe combustion at up to 2,200m elevation.', 120000, '/images/heating-system-technical.png', 15),
  (cat_ventilation, sup_jacksons, 'MaxxFan Deluxe (Smoke)', 'MaxxAir', 'maxxair-fan-deluxe-smoke', '10-speed bi-directional roof fan with rain dome.', 'Allows operation in heavy rain. Built in thermostat for automatic climate regulation.', 36000, '/images/hero-background.png', 20);

-- C. PLUMBING
INSERT INTO public.products (category_id, supplier_id, name, brand, slug, short_description, full_description, price_gbp, image_url, stock_quantity) VALUES
  (cat_water, sup_cak, 'Under-Chassis 90L Sprinter Tank', 'CAK Tanks', 'cak-sprinter-90l-fresh', 'Custom moulded fresh water tank mapping chassis cavities.', 'Replaces spare wheel cradle for massive water storage without compromising ground clearance.', 18500, '/images/water-plumbing-technical.png', 30),
  (cat_water, sup_jacksons, 'Watermaster High Flow Pump', 'Whale', 'whale-watermaster', 'Pressurised, high flow smooth delivery.', 'Smooth constant flow prevents the pulsing common in cheaper shurflo equivalents.', 11000, '/images/systems-showcase.png', 50);

-- D. INSULATION
INSERT INTO public.products (category_id, supplier_id, name, brand, slug, short_description, full_description, price_gbp, image_url, stock_quantity) VALUES
  (cat_insulation, sup_dido, 'DEADN Hex Bulk Pack', 'Dodo Mat', 'dodomat-deadn-hex-bulk', 'Professional grade vibration damper.', 'Mutes panel resonance. Essential for a premium, solid-sounding vehicle superstructure.', 6500, '/images/insulation-technical.png', 200),
  (cat_insulation, sup_dido, 'Thermo Fleece 50mm x 10m', 'Dodo Mat', 'dodomat-thermo-fleece', 'Hydrophobic cavity wall insulation.', 'Does not absorb airborne moisture, eliminating rust risks associated with generic rockwool.', 7000, '/images/insulation-technical.png', 150);

END $$;
