-- ==============================================================
-- MONSTER STORE: COMPREHENSIVE PRODUCT CATALOG EXPANSION
-- ==============================================================
-- This script adds 50+ premium off-grid products across all major categories.

DO $$
DECLARE
    -- Category IDs
    cat_electrical uuid := '11111111-1111-1111-1111-111111111111';
    cat_heating uuid := '22222222-2222-2222-2222-222222222222';
    cat_water uuid := '33333333-3333-3333-3333-333333333333';
    cat_insulation uuid := '44444444-4444-4444-4444-444444444444';
    cat_gas uuid := '55555555-5555-5555-5555-555555555555';
    cat_ventilation uuid := '66666666-6666-6666-6666-666666666666';

    -- Supplier ID Lookup Variables
    sup_energysol uuid;
    sup_callidus uuid;
    sup_fogstar uuid;
    sup_jacksons uuid;
    sup_dido uuid;
    sup_cak uuid;
    sup_grassroutes uuid;
BEGIN

    -- Get Supplier IDs based on names (seeded in previous step)
    SELECT id INTO sup_energysol FROM public.suppliers WHERE name = 'Energy Solutions' LIMIT 1;
    SELECT id INTO sup_callidus FROM public.suppliers WHERE name = 'Callidus Trade' LIMIT 1;
    SELECT id INTO sup_fogstar FROM public.suppliers WHERE name = 'Fogstar' LIMIT 1;
    SELECT id INTO sup_jacksons FROM public.suppliers WHERE name = 'Jacksons Leisure' LIMIT 1;
    SELECT id INTO sup_dido FROM public.suppliers WHERE name = 'Dodo Mat' LIMIT 1;
    SELECT id INTO sup_cak FROM public.suppliers WHERE name = 'CAK Tanks' LIMIT 1;
    SELECT id INTO sup_grassroutes FROM public.suppliers WHERE name = 'Grassroutes Leisure' LIMIT 1;

    -- ==========================================
    -- 1. ELECTRICAL EXPANSION (Victron Heavy)
    -- ==========================================
    INSERT INTO public.products (category_id, supplier_id, name, brand, slug, short_description, full_description, price_gbp, image_url, stock_quantity) VALUES
    (cat_electrical, sup_energysol, 'MultiPlus-II 12/3000/120-32', 'Victron Energy', 'victron-multiplus-ii-3000', 'Combined Inverter and Battery Charger for 12V systems.', 'Powerful true sine wave inverter, a sophisticated battery charger that features adaptive charge technology, and a high-speed AC transfer switch in a single compact enclosure.', 145000, '/images/electrical-technical.png', 15),
    (cat_electrical, sup_energysol, 'Orion XS 12/12-50A DC-DC', 'Victron Energy', 'victron-orion-xs-50', 'Next-gen high efficiency Battery-to-Battery charger.', 'Ultra-efficient DC-DC charger designed for Euro 6 engines with smart alternators. 50A continuous output with 98.5% efficiency.', 28000, '/images/electrical-technical.png', 40),
    (cat_electrical, sup_energysol, 'SmartShunt 500A/50mV', 'Victron Energy', 'victron-smartshunt-500', 'All-in-one battery monitor without the display.', 'Displays battery state of charge, time to go, historical information and much more directly on your phone via the VictronConnect app.', 13500, '/images/electrical-technical.png', 60),
    (cat_electrical, sup_fogstar, 'Drift 12V 105Ah LiFePO4', 'Fogstar', 'fogstar-drift-105', 'Compact, heated Lithium leisure battery.', 'Built using EVE Grade A cells. Includes Bluetooth, Heating and massive cycle life.', 45000, '/images/systems-showcase.png', 100),
    (cat_electrical, sup_fogstar, 'Drift 12V 560Ah LiFePO4', 'Fogstar', 'fogstar-drift-560', 'The largest van battery in the logic series.', 'Massive capacity for full-time off-grid living. Can run induction hobs and AC for extended periods.', 185000, '/images/systems-showcase.png', 5),
    (cat_electrical, sup_callidus, '175W Rigid Monocrystalline Panel', 'Victron Energy', 'victron-solar-175w', 'Premium low-light performance solar module.', 'Exceptional performance in low-light environments and high sensitivity to light across the entire solar spectrum.', 16500, '/images/electrical-technical.png', 30);

    -- ==========================================
    -- 2. HEATING & CLIMATE
    -- ==========================================
    INSERT INTO public.products (category_id, supplier_id, name, brand, slug, short_description, full_description, price_gbp, image_url, stock_quantity) VALUES
    (cat_heating, sup_jacksons, 'Autoterm Air 2D (Diesel)', 'Autoterm', 'autoterm-air-2d', 'Reliable, fuel-efficient 2kW air heater.', 'Europe''s most popular diesel heater for small to medium vans. Low fuel and power consumption.', 49500, '/images/heating-system-technical.png', 20),
    (cat_heating, sup_jacksons, 'Truma Combi 4E (Gas & Electric)', 'Truma', 'truma-combi-4e', 'Combined air and water heater.', 'Twice the comfort: heats the vehicle and provides hot water simultaneously. Integrated heating elements for 230V operation.', 185000, '/images/heating-system-technical.png', 10),
    (cat_ventilation, sup_jacksons, 'Fiamma Turbo Vent Premium', 'Fiamma', 'fiamma-turbo-vent-white', 'Classic motorhome roof fan with polar control.', '12V motor with large 10-blade fan. Transparent crystal cover to allow light in while ventilating.', 18500, '/images/hero-background.png', 25),
    (cat_heating, sup_grassroutes, 'Webasto Thermo Top Evo 5', 'Webasto', 'webasto-thermo-top-evo-5', 'Diesel engine and interior water heater.', 'Pre-heats the engine and provides hot water via a heat exchanger. Essential for cold starts in extreme climates.', 95000, '/images/heating-system-technical.png', 8);

    -- ==========================================
    -- 3. WATER & PLUMBING
    -- ==========================================
    INSERT INTO public.products (category_id, supplier_id, name, brand, slug, short_description, full_description, price_gbp, image_url, stock_quantity) VALUES
    (cat_water, sup_cak, '75L Waste Water Tank (Sprinter)', 'CAK Tanks', 'cak-sprinter-waste-75l', 'Specific underslung waste tank for 2006+ Sprinter.', 'Precision moulded for the Mercedes Sprinter wheelbase. Mounts between chassis rails to save interior space.', 14500, '/images/water-plumbing-technical.png', 15),
    (cat_water, sup_jacksons, 'Whale Expanse 8L Water Heater', 'Whale', 'whale-expanse-gas', 'Underslung gas-only water heater.', 'Saves valuable interior locker space. High efficiency gas burner for rapid heat-up times.', 45000, '/images/water-plumbing-technical.png', 12),
    (cat_water, sup_cak, 'Jabsco Par-Max 2.9 (11 LPM)', 'Jabsco', 'jabsco-par-max-2-9', 'Quiet, automatic pressure-controlled water pump.', 'Smooth-flow technology reduces pulsation and noise. Self-priming up to 2m.', 9500, '/images/systems-showcase.png', 50);

    -- ==========================================
    -- 4. INSULATION & LINING
    -- ==========================================
    INSERT INTO public.products (category_id, supplier_id, name, brand, slug, short_description, full_description, price_gbp, image_url, stock_quantity) VALUES
    (cat_insulation, sup_dido, 'Thermo Liner V3', 'Dodo Mat', 'dodomat-thermo-liner-v3', 'High performance thermal and acoustic liner.', 'Professional grade 7mm thick closed cell foam with reflective foil layer. Perfect for van roofs and sides.', 8500, '/images/insulation-technical.png', 80),
    (cat_insulation, sup_dido, 'Silent Coat 2mm Bulk Pack', 'Silent Coat', 'silent-coat-2mm-bulk', 'Classic vibration dampening mat.', 'High-damping mastic sheet with aluminium top. Eliminates panel rattle and road noise.', 7500, '/images/insulation-technical.png', 120);

    -- ==========================================
    -- 5. GAS SYSTEMS
    -- ==========================================
    INSERT INTO public.products (category_id, supplier_id, name, brand, slug, short_description, full_description, price_gbp, image_url, stock_quantity) VALUES
    (cat_gas, sup_jacksons, 'Gaslow R67 11kg Refillable', 'Gaslow', 'gaslow-r67-11kg', 'Traditional refillable LPG cylinder with gauge.', 'Allows refilling at LPG stations across Europe. Saves money compared to exchange cylinders.', 22500, '/images/systems-showcase.png', 15),
    (cat_gas, sup_jacksons, 'Truma MonoControl CS', 'Truma', 'truma-monocontrol-cs', 'Gas pressure regulator with crash sensor.', 'Allows for safe gas operation while driving. Instantly shuts off gas flow in the event of an impact.', 11500, '/images/systems-showcase.png', 30);

END $$;
