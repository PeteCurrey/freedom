-- ============================================================
-- AMPLIOS — MIGRATION + FULL SEED
-- Run in Supabase SQL Editor (Dashboard > SQL Editor > New Query)
-- ============================================================

-- STEP 1: Add missing columns to products table
ALTER TABLE products ADD COLUMN IF NOT EXISTS images text[] DEFAULT '{}';
ALTER TABLE products ADD COLUMN IF NOT EXISTS badge text;
ALTER TABLE products ADD COLUMN IF NOT EXISTS spec_line text;
ALTER TABLE products ADD COLUMN IF NOT EXISTS system_tier text;
ALTER TABLE products ADD COLUMN IF NOT EXISTS type text DEFAULT 'product';
ALTER TABLE products ADD COLUMN IF NOT EXISTS is_affiliate boolean DEFAULT false;
ALTER TABLE products ADD COLUMN IF NOT EXISTS is_editor_pick boolean DEFAULT false;
ALTER TABLE products ADD COLUMN IF NOT EXISTS subcategory text;
ALTER TABLE products ADD COLUMN IF NOT EXISTS compare_at_price integer;
ALTER TABLE products ADD COLUMN IF NOT EXISTS related_product_ids uuid[] DEFAULT '{}';
ALTER TABLE products ADD COLUMN IF NOT EXISTS datasheet_url text;
ALTER TABLE products ADD COLUMN IF NOT EXISTS sort_priority integer DEFAULT 0;

-- STEP 2: Upsert all 7 categories with correct slugs
INSERT INTO product_categories (name, slug, description, sort_order) VALUES
  ('Power Systems',          'electrical',           'Victron, Lithium, Solar',      1),
  ('Climate Control',        'climate',              'Heaters, AC, Fans',            2),
  ('Plumbing',               'plumbing',             'Tanks, Pumps, Filtration',     3),
  ('Insulation & Build',     'insulation',           'The Foundation',               4),
  ('Windows & Vent',         'windows-ventilation',  'Dometic, MaxxFan',             5),
  ('Exterior & Accessories', 'exterior-accessories', 'Racks, Ladders, Awnings',      6),
  ('Build Kits',             'kits',                 'Bundled System Packs',         7)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  sort_order = EXCLUDED.sort_order;

-- ============================================================
-- STEP 3: Migrate any old category slugs to new ones
-- ============================================================
UPDATE products SET category_id = (SELECT id FROM product_categories WHERE slug = 'electrical')
  WHERE category_id = (SELECT id FROM product_categories WHERE slug = 'power-systems');
UPDATE products SET category_id = (SELECT id FROM product_categories WHERE slug = 'electrical')
  WHERE category_id = (SELECT id FROM product_categories WHERE slug = 'power');
UPDATE products SET category_id = (SELECT id FROM product_categories WHERE slug = 'plumbing')
  WHERE category_id = (SELECT id FROM product_categories WHERE slug = 'water-plumbing');

-- ============================================================
-- STEP 4: Update existing electrical products (descriptions + images + weights)
-- ============================================================
UPDATE products SET
  full_description = 'The MultiPlus-II is the command centre of a serious off-grid electrical system. Combining a 3kVA pure sine wave inverter, a 120A adaptive battery charger, and an automatic AC transfer switch in a single compact unit, it''s the foundation every Full Autonomy build starts with. PowerAssist technology supplements shore or generator power during peak demand — so you can run high-draw appliances even on a limited hookup. 18kg. Dimensions: 362×214×133mm.',
  specs = '{"Works Well With": "Victron SmartSolar MPPT 100/30, Victron SmartShunt 500A, Victron Cerbo GX"}',
  weight_kg = 18,
  images = ARRAY['/images/electrical-technical.png']
WHERE slug = 'victron-multiplus-ii-12-3000-120-32';

UPDATE products SET
  full_description = 'The Cerbo GX is the intelligence layer of your Victron system — a monitoring and control hub that connects every Victron component and delivers real-time data to the GX Touch 70 screen, the VRM online portal, and the VictronConnect app. Install one and you''ll know your battery state of charge, solar input, inverter output, and AC load from anywhere in the world. Non-negotiable on a Full Autonomy build.',
  specs = '{"Works Well With": "Victron GX Touch 70, Victron SmartSolar MPPT 100/30, Victron SmartShunt 500A"}',
  weight_kg = 0.4,
  images = ARRAY['/images/electrical-technical.png']
WHERE slug = 'victron-cerbo-gx';

UPDATE products SET
  full_description = 'A battery monitor that actually tells you what''s left in your bank — not just voltage, but genuine state of charge based on every amp in and out. The SmartShunt sits in the negative cable path and measures current with 500A capacity, logging it all to Bluetooth via VictronConnect. Integrates with Cerbo GX for system-wide monitoring.',
  specs = '{"Works Well With": "Victron Cerbo GX, Victron MultiPlus-II, Fogstar Drift 200Ah"}',
  weight_kg = 0.1,
  images = ARRAY['/images/electrical-technical.png']
WHERE slug = 'victron-smartshunt-500a';

UPDATE products SET
  full_description = 'A 30A solar charge controller with Victron''s ultra-fast Maximum Power Point Tracking. Handles up to 100V solar input — suitable for arrays up to ~440W on a 12V system. Built-in Bluetooth for VictronConnect monitoring and configuration. The adaptive 3-stage charge algorithm comes pre-configured for LiFePO4 lithium and lead-acid.',
  specs = '{"Works Well With": "Victron MultiPlus-II, Fogstar Drift 200Ah, 200W Solar Panel"}',
  weight_kg = 1.3,
  images = ARRAY['/images/systems-showcase.png']
WHERE slug = 'victron-smartsolar-mppt-100-30';

UPDATE products SET
  full_description = 'The Fogstar Drift has become the go-to 12V LiFePO4 battery for UK van conversions. Built-in BMS handles over-charge, over-discharge, over-temperature, and short-circuit protection. At 24kg it''s around a third of the weight of an equivalent AGM bank. Rated for 2,500+ cycles at 80% DoD — realistically 7–10 years of daily use.',
  specs = '{"Works Well With": "Victron SmartShunt 500A, Victron Orion-Tr Smart, Victron SmartSolar MPPT 100/30"}',
  weight_kg = 24,
  images = ARRAY['/images/electrical-technical.png']
WHERE slug = 'fogstar-drift-200ah';

UPDATE products SET
  full_description = 'A 55-litre dual-zone compressor fridge/freezer that runs from 12V, 24V, or 230V — switching automatically between sources. The integrated ice maker produces up to 12 cubes per cycle. Uses roughly 1.5–2Ah per hour at 12V in moderate ambient temperatures — realistic to run continuously from a 200Ah+ lithium bank.',
  specs = '{"Works Well With": "Fogstar Drift 200Ah battery, Victron SmartSolar MPPT 100/30, Victron Orion-Tr Smart"}',
  weight_kg = 18.6,
  images = ARRAY['/images/interior-showcase.png']
WHERE slug = 'dometic-cfx3-55im';

UPDATE products SET
  images = ARRAY['/images/systems-showcase.png']
WHERE slug LIKE 'victron-orion%';

-- ============================================================
-- STEP 5: Seed Climate Control products
-- ============================================================
INSERT INTO products (category_id, name, brand, slug, short_description, full_description, price_gbp, weight_kg, images, image_url, spec_line, is_active, stock_quantity) VALUES
  ((SELECT id FROM product_categories WHERE slug='climate'), 'Webasto Air Top EVO 40', 'Webasto', 'webasto-air-top-evo-40', '5kW diesel heater, 12V', 'The Webasto Air Top EVO 40 is a premium 5kW diesel air heater designed for motorhome and van conversion use. Draws fuel directly from the vehicle tank. Near-silent operation makes it ideal for overnight use. Compact dimensions suit tight under-floor or under-seat installations. Full diagnostic via Webasto app.', 115000, 5.9, ARRAY['/images/heating-system-technical.png'], '/images/heating-system-technical.png', '5kW · Diesel · 12V · 0.11–0.51L/h', true, 50),
  ((SELECT id FROM product_categories WHERE slug='climate'), 'Eberspächer Airtronic D4', 'Eberspächer', 'eberspacher-airtronic-d4', '4kW diesel heater, 12V/24V', 'The Eberspächer Airtronic D4 is a robust 4kW diesel air heater with a 25-year track record in commercial and leisure vehicles. Available in 12V and 24V variants. EasyStart Pro controller allows 3 separate timer programmes. Meets Euro 5 emissions standards.', 109500, 4.5, ARRAY['/images/heating-system-technical.png'], '/images/heating-system-technical.png', '4kW · Diesel · 12V/24V · 0.10–0.47L/h', true, 50),
  ((SELECT id FROM product_categories WHERE slug='climate'), 'Truma Combi 4E', 'Truma', 'truma-combi-4e', 'Combined heater + 10L hot water, LPG + 230V', 'The Truma Combi 4E is the standard against which every other motorhome heating system is judged. A single compact unit provides 4kW of space heating AND heats a 10-litre water tank — running on LPG, 230V electric, or both simultaneously. Whisper-quiet at 47dB. The CP Plus panel handles temperature zones and timer programmes. Dimensions: 534×270×235mm.', 185000, 12.3, ARRAY['/images/heating-system-technical.png'], '/images/heating-system-technical.png', '4kW · LPG + 230V · 10L Hot Water · CP Plus', true, 50),
  ((SELECT id FROM product_categories WHERE slug='climate'), 'Truma VarioHeat Comfort', 'Truma', 'truma-varioheat-comfort', '2.8kW LPG blown-air heater', 'The Truma VarioHeat Comfort is a compact 2.8kW LPG blown-air heater ideal for smaller conversions where space is at a premium. Operates in two stages (1.4kW / 2.8kW). EcoMode reduces gas consumption by up to 30%. Weighs just 5.1kg with dimensions of 215×215×390mm.', 94500, 5.1, ARRAY['/images/heating-system-technical.png'], '/images/heating-system-technical.png', '2.8kW · LPG · 2-Stage · 215×215×390mm', true, 50),
  ((SELECT id FROM product_categories WHERE slug='climate'), 'Propex HS2000', 'Propex', 'propex-hs2000', '2kW LPG blown-air, 12V, 172×100×320mm', 'The Propex HS2000 is the most compact LPG heater in our range — just 172×100×320mm. A favourite among smaller van builders where every centimetre counts. Operates on 12V, draws from any LPG source, and produces 2kW of dry, clean heat. Widely used in campers, narrowboats, and caravans across the UK.', 44500, 4.0, ARRAY['/images/heating-system-technical.png'], '/images/heating-system-technical.png', '2kW · LPG · 12V · 172×100×320mm', true, 50),
  ((SELECT id FROM product_categories WHERE slug='climate'), 'Dometic CoolAir RTX 1000', 'Dometic', 'dometic-coolair-rtx-1000', 'Roof-mount air conditioning unit', 'The Dometic CoolAir RTX 1000 is a roof-mount air conditioning unit delivering 1,000W of cooling capacity. Designed for van conversions, it fits into a standard 400×400mm roof opening. Requires 230V hookup or a large inverter. Suitable for summer use across southern Europe.', 129500, 23.0, ARRAY['/images/heating-system-technical.png'], '/images/heating-system-technical.png', '1kW Cooling · 230V · 400×400mm Roof Mount', true, 50)
ON CONFLICT (slug) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  short_description = EXCLUDED.short_description,
  full_description = EXCLUDED.full_description,
  price_gbp = EXCLUDED.price_gbp,
  weight_kg = EXCLUDED.weight_kg,
  images = EXCLUDED.images,
  image_url = EXCLUDED.image_url,
  spec_line = EXCLUDED.spec_line;

-- ============================================================
-- STEP 6: Seed Insulation products
-- ============================================================
INSERT INTO products (category_id, name, brand, slug, short_description, full_description, price_gbp, weight_kg, images, image_url, spec_line, is_active, stock_quantity) VALUES
  ((SELECT id FROM product_categories WHERE slug='insulation'), 'Dodo Mat DEADN PRO', 'Dodo Mat', 'dodo-mat-deadn-pro', '2.8mm butyl mat, 70% mass increase', 'Dodo Mat DEADN PRO is a professional-grade 2.8mm constrained-layer butyl mat that increases panel mass by 70%, dramatically reducing road noise, resonance, and vibration. Self-adhesive backing adheres to bare metal without primer. Supplied in 2m² rolls. The first layer of any serious van insulation build.', 8900, 4.5, ARRAY['/images/insulation-technical.png'], '/images/insulation-technical.png', '2.8mm Butyl · 2m² Roll · 70% Mass Increase', true, 100),
  ((SELECT id FROM product_categories WHERE slug='insulation'), 'Dodo Mat Thermo Liner', 'Dodo Mat', 'dodo-mat-thermo-liner', 'Closed-cell foam, 10mm, R-value 0.8', 'A 10mm closed-cell foam thermal liner that bonds directly over DEADN PRO or bare metal. R-value 0.8 per sheet. Acts as a secondary vapour barrier. Available in 1m² sheets. Lightweight at 1.2kg/m². Pairs with DEADN PRO for a complete acoustic and thermal first layer.', 6500, 1.2, ARRAY['/images/insulation-technical.png'], '/images/insulation-technical.png', '10mm Closed-Cell Foam · R-0.8 · 1m² Sheet', true, 100),
  ((SELECT id FROM product_categories WHERE slug='insulation'), 'Celotex GA4000 50mm', 'Celotex', 'celotex-ga4000-50mm', 'PIR rigid board, R-value 2.25', 'Celotex GA4000 50mm PIR rigid insulation board is the industry standard for van wall and ceiling cavities. R-value 2.25 per 50mm board. Lightweight at 2.5kg per 1.2×2.4m sheet. Cuts cleanly with a sharp knife and straight edge. Boards can be friction-fitted between ribs or adhered with expanding foam.', 4500, 2.5, ARRAY['/images/insulation-technical.png'], '/images/insulation-technical.png', '50mm PIR · R-2.25 · 1200×2400mm Board', true, 100),
  ((SELECT id FROM product_categories WHERE slug='insulation'), '3M Thinsulate SM600L', '3M', '3m-thinsulate-sm600l', 'Flexible automotive insulation', '3M Thinsulate SM600L is the premium flexible insulation for areas where rigid boards won''t fit — wheel arches, door skins, curved panels, and overhead cabinets. Vapour-open construction prevents condensation build-up. Suitable for both thermal and acoustic insulation. 600g/m² weight. Easy to cut and tuck.', 7500, 0.6, ARRAY['/images/insulation-technical.png'], '/images/insulation-technical.png', '600g/m² · Flexible · Vapour-Open · 1m²', true, 100),
  ((SELECT id FROM product_categories WHERE slug='insulation'), 'Vapor Guard Barrier Tape', 'Vapor Guard', 'vapor-guard-barrier-tape', 'Self-adhesive vapour barrier', 'Self-adhesive vapour barrier tape for sealing joints between insulation boards and around cable/pipe penetrations. Essential for preventing condensation migration through the insulation layer. 75mm wide, 50m roll. Compatible with PIR, foam, and fleece insulation systems.', 1800, 0.3, ARRAY['/images/insulation-technical.png'], '/images/insulation-technical.png', '75mm Wide · 50m Roll · Self-Adhesive', true, 200)
ON CONFLICT (slug) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  short_description = EXCLUDED.short_description,
  full_description = EXCLUDED.full_description,
  price_gbp = EXCLUDED.price_gbp,
  weight_kg = EXCLUDED.weight_kg,
  images = EXCLUDED.images,
  image_url = EXCLUDED.image_url,
  spec_line = EXCLUDED.spec_line;

-- ============================================================
-- STEP 7: Seed Windows & Ventilation products
-- ============================================================
INSERT INTO products (category_id, name, brand, slug, short_description, full_description, price_gbp, weight_kg, images, image_url, spec_line, is_active, stock_quantity) VALUES
  ((SELECT id FROM product_categories WHERE slug='windows-ventilation'), 'MaxxFan Deluxe', 'MaxxAir', 'maxxfan-deluxe', '10-speed, reversible, rain sensor, 400×400mm', 'The MaxxFan Deluxe is the gold standard roof fan for van conversions. 10-speed motor runs in both intake and exhaust modes. Built-in rain sensor automatically closes the lid if it detects moisture. Operates at just 2.2A on speed 10. Fits a standard 400×400mm roof cutout. Remote control included. A non-negotiable for summer comfort.', 34500, 6.0, ARRAY['/images/insulation-technical.png'], '/images/insulation-technical.png', '10-Speed · Reversible · Rain Sensor · 400×400mm', true, 50),
  ((SELECT id FROM product_categories WHERE slug='windows-ventilation'), 'Dometic S4 Sliding Window 700×300', 'Dometic', 'dometic-s4-700-300', 'Double-glazed, integrated blind, 700×300mm', 'The Dometic S4 is the most specified sliding window for professional van conversions. Double-glazed for thermal performance, with integrated flyscreen and blackout blind in a single cassette frame. 700×300mm external cut size. 30mm frame depth. Available in black or white. Supplied with adhesive foam seal.', 18500, 4.5, ARRAY['/images/insulation-technical.png'], '/images/insulation-technical.png', '700×300mm · Double-Glazed · Integrated Blind', true, 50),
  ((SELECT id FROM product_categories WHERE slug='windows-ventilation'), 'Dometic S4 Sliding Window 900×450', 'Dometic', 'dometic-s4-900-450', 'Double-glazed, integrated blind, 900×450mm', 'Larger format Dometic S4 sliding window for panel van rear quarters or high-roof installations. 900×450mm external cut size. Same double-glazed, integrated blind cassette system as the 700×300. Ideal for rear seating areas where maximum light and ventilation are required.', 24500, 6.2, ARRAY['/images/insulation-technical.png'], '/images/insulation-technical.png', '900×450mm · Double-Glazed · Integrated Blind', true, 50),
  ((SELECT id FROM product_categories WHERE slug='windows-ventilation'), 'Fiamma Vent 28 Roof Light', 'Fiamma', 'fiamma-vent-28', '280×280mm smoked roof vent, manual', 'The Fiamma Vent 28 is a compact 280×280mm smoked polycarbonate roof light for vans and motorhomes. Manual opening with a friction-hold stay. Supplied with 10mm installation frame and internal cover trim. Adds natural light to darker rear areas without requiring a full fan cutout. Ideal for toilet or shower compartments.', 16500, 2.5, ARRAY['/images/insulation-technical.png'], '/images/insulation-technical.png', '280×280mm · Smoked · Manual · 10mm Frame', true, 50)
ON CONFLICT (slug) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  short_description = EXCLUDED.short_description,
  full_description = EXCLUDED.full_description,
  price_gbp = EXCLUDED.price_gbp,
  weight_kg = EXCLUDED.weight_kg,
  images = EXCLUDED.images,
  image_url = EXCLUDED.image_url,
  spec_line = EXCLUDED.spec_line;

-- ============================================================
-- STEP 8: Seed Exterior & Accessories products
-- ============================================================
INSERT INTO products (category_id, name, brand, slug, short_description, full_description, price_gbp, weight_kg, images, image_url, spec_line, is_active, stock_quantity) VALUES
  ((SELECT id FROM product_categories WHERE slug='exterior-accessories'), 'Fiamma F45S Awning 3.0m', 'Fiamma', 'fiamma-f45s-30m', 'Titanium/grey, wall-mount, wind-out, 3m', 'The Fiamma F45S is the most popular awning for motorhome conversions. Aluminium case protects the fabric when retracted. 3.0m projection, titanium/grey colour scheme. Attaches directly to the vehicle roof rail or wall. Manual wind-out handle included. Anti-drip valance prevents water pooling. Fabric: acrylic Fiamma F45.', 59500, 23.0, ARRAY['/images/exterior-equipment-technical.png'], '/images/exterior-equipment-technical.png', '3.0m · Titanium/Grey · Wall Mount · Manual', true, 30),
  ((SELECT id FROM product_categories WHERE slug='exterior-accessories'), 'Fiamma Carry-Bike Pro C', 'Fiamma', 'fiamma-carry-bike-pro-c', 'Rear bike carrier, 2 bikes, 35kg capacity', 'The Fiamma Carry-Bike Pro C is a swing-arm rear bike carrier rated for 2 bikes and 35kg total capacity. Mounts to the rear door via the vehicle-specific adapter. Anti-tilt device prevents the carrier swinging under load. Compatible with e-bikes. Available for Volkswagen Crafter, Mercedes Sprinter, Ford Transit, and Fiat Ducato with the appropriate adapter kit.', 28500, 7.9, ARRAY['/images/exterior-equipment-technical.png'], '/images/exterior-equipment-technical.png', '2 Bikes · 35kg Capacity · Rear Door Mount', true, 30),
  ((SELECT id FROM product_categories WHERE slug='exterior-accessories'), 'Thule Step Rear Door', 'Thule', 'thule-step-rear', 'Adjustable step, fits most LCV rear doors', 'The Thule Step is an adjustable folding step that mounts to the rear door frame of most light commercial vehicles. Rated to 150kg. Folds flat when not in use. Height-adjustable between 30–55cm from ground. Anti-slip tread plate surface. No drilling required on most van models — clamps to the door seal channel.', 16500, 5.5, ARRAY['/images/exterior-equipment-technical.png'], '/images/exterior-equipment-technical.png', '150kg Rated · Foldable · Height-Adjustable', true, 50),
  ((SELECT id FROM product_categories WHERE slug='exterior-accessories'), 'Ring RAC900 Inflator', 'Ring', 'ring-rac900', '12V tyre inflator with digital pressure gauge', 'The Ring RAC900 is a 12V compressor tyre inflator with a digital pressure gauge. Inflates a standard car tyre from flat in under 8 minutes. Pre-set your target pressure and it auto-stops when reached. Comes with adaptors for inflating bike tyres, sports equipment, and airbeds. Essential recovery kit for any remote trip.', 8900, 3.5, ARRAY['/images/exterior-equipment-technical.png'], '/images/exterior-equipment-technical.png', '12V · Digital Gauge · Auto-Stop · 8min Inflate', true, 100)
ON CONFLICT (slug) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  short_description = EXCLUDED.short_description,
  full_description = EXCLUDED.full_description,
  price_gbp = EXCLUDED.price_gbp,
  weight_kg = EXCLUDED.weight_kg,
  images = EXCLUDED.images,
  image_url = EXCLUDED.image_url,
  spec_line = EXCLUDED.spec_line;

-- ============================================================
-- STEP 9: Seed Build Kits
-- ============================================================
INSERT INTO products (category_id, name, brand, slug, short_description, full_description, price_gbp, images, image_url, spec_line, badge, system_tier, type, is_active, stock_quantity) VALUES
  (
    (SELECT id FROM product_categories WHERE slug='kits'),
    'Full Autonomy Electrical Kit', 'Amplios Verified', 'full-autonomy',
    'Complete Full Autonomy electrical system — pre-matched for compatibility.',
    'Everything you need for a complete Full Autonomy electrical system. Victron MultiPlus-II inverter/charger, 400Ah LiFePO4 battery bank (2× Fogstar Drift 200Ah), 400W solar array, SmartSolar MPPT 100/30, SmartShunt 500A, and Cerbo GX with GX Touch 70 screen. All components pre-matched for compatibility and sized for full-time off-grid use. Individual total value ~£3,260. Save £370.',
    289000, ARRAY['/images/systems-showcase.png'], '/images/systems-showcase.png',
    'MultiPlus-II · 400Ah Lithium · 400W Solar · Cerbo GX',
    '11% Saving', 'full-autonomy', 'kit', true, 10
  ),
  (
    (SELECT id FROM product_categories WHERE slug='kits'),
    'Four Season Climate Kit', 'Amplios Verified', 'four-season-climate',
    'Complete Truma Combi 4E installation bundle — heat and hot water in one box.',
    'The complete Truma Combi 4E installation — heater unit, CP Plus iNet X control panel, ducting kit for up to 4 outlets, service flue set, and all installation hardware. Runs on LPG gas or 230V electric, or both simultaneously. Everything you need for a professional heating installation in one box. Individual total value ~£2,100. Save £205.',
    189500, ARRAY['/images/heating-system-technical.png'], '/images/heating-system-technical.png',
    'Truma Combi 4E · CP Plus iNet X · Ducting Kit · Flue Set',
    '10% Saving', 'intermediate', 'kit', true, 10
  ),
  (
    (SELECT id FROM product_categories WHERE slug='kits'),
    'Weekend Warrior Electrical Starter', 'Amplios Verified', 'weekend-warrior',
    'Proper lithium starter system for weekenders — no compromises.',
    'For weekenders and first-time builders who want a proper lithium system without overcomplicating things. 200Ah LiFePO4 (Fogstar Drift), Victron Orion-Tr Smart 30A DC-DC charger, SmartSolar MPPT 75/15, and a 200W solar panel. Enough for lights, fridge, USB charging, and a 240V appliance via a small inverter. Individual total value ~£830. Save £81.',
    74900, ARRAY['/images/electrical-technical.png'], '/images/electrical-technical.png',
    '200Ah Lithium · 30A DC-DC · 200W Solar · MPPT 75/15',
    '10% Saving', 'beginner', 'kit', true, 10
  )
ON CONFLICT (slug) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  short_description = EXCLUDED.short_description,
  full_description = EXCLUDED.full_description,
  price_gbp = EXCLUDED.price_gbp,
  images = EXCLUDED.images,
  image_url = EXCLUDED.image_url,
  spec_line = EXCLUDED.spec_line,
  badge = EXCLUDED.badge,
  system_tier = EXCLUDED.system_tier,
  type = EXCLUDED.type;

-- ============================================================
-- STEP 10: Sync image_url -> images[] for all products that have
-- image_url but empty images array (covers all existing products)
-- ============================================================
UPDATE products
SET images = ARRAY[image_url]
WHERE image_url IS NOT NULL
  AND image_url != ''
  AND (images IS NULL OR images = '{}');

-- Done — verify with:
-- SELECT slug, name, type FROM products ORDER BY created_at;
-- SELECT slug, name FROM product_categories ORDER BY sort_order;
