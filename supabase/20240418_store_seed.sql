-- =========================================
-- AMPLIOS STORE OVERHAUL - SEED DATA (FIXED V2)
-- =========================================

-- 1. Update Power Systems
UPDATE products SET 
  subcategory = 'batteries',
  system_tier = 'grid-independent',
  spec_line = 'LiFePO4 · 200Ah · Built-in BMS',
  badge = 'Most Popular'
WHERE slug LIKE '%lithium%' OR slug LIKE '%fogstar%';

UPDATE products SET 
  subcategory = 'mppt',
  system_tier = 'beginner',
  spec_line = '100V Max Input · 30A Charge · Bluetooth'
WHERE slug LIKE '%smartsolar%';

UPDATE products SET 
  subcategory = 'dc-dc',
  system_tier = 'intermediate',
  spec_line = '12V/12V · 30A · Adaptive 3-stage'
WHERE slug LIKE '%orion%';

-- 2. Update Climate Control
UPDATE products SET 
  subcategory = 'combi-heaters',
  system_tier = 'home-comfort',
  spec_line = 'Diesel/Electric · 4kW Heating · 10L Water'
WHERE slug LIKE '%combi%';

UPDATE products SET 
  subcategory = 'air-conditioning',
  system_tier = 'home-comfort',
  spec_line = 'Roof-mounted · 2.4kW Cooling · 1.7kW Heating'
WHERE slug LIKE '%aventa%';

UPDATE products SET 
  subcategory = 'diesel-heaters',
  system_tier = 'take-the-edge-off',
  spec_line = '2kW Diesel · Digital Controller · Silent Pump'
WHERE slug LIKE '%air-top%';

-- 3. Update Water & Plumbing
UPDATE products SET 
  subcategory = 'pumps',
  system_tier = 'clean-living',
  spec_line = '12V · 11LPM · 45PSI · SmartFlo'
WHERE slug LIKE '%watermaster%';

UPDATE products SET 
  subcategory = 'filtration',
  system_tier = 'high-purity',
  spec_line = 'Silver-ion Filter · 12mm Fit · 5000L'
WHERE slug LIKE '%filter%' OR name LIKE '%Accumulator%';

-- 4. Update Insulation
UPDATE products SET 
  subcategory = 'sound-deadening',
  system_tier = 'three-season',
  spec_line = '2mm Butyl · Hex Embossed · 2sqm'
WHERE slug LIKE '%deadn%';

UPDATE products SET 
  subcategory = 'insulation',
  system_tier = 'all-season',
  spec_line = '10mm Closed Cell · Foil Faced · 1.4m wide'
WHERE slug LIKE '%thermo-liner%';

-- 5. Insert New Products to fill gaps
INSERT INTO products (category_id, name, brand, slug, short_description, price_gbp, weight_grams, subcategory, system_tier, spec_line, images)
SELECT 
  id, 'SmartSolar MPPT 150/70', 'Victron Energy', 'victron-mppt-150-70', 'Large scale solar controller for high-autonomy builds.', 58000, 3000, 'mppt', 'full-autonomy', '150V Max Input · 70A Charge · CAN-bus', '["/images/electrical-technical.png"]'::jsonb
FROM product_categories WHERE slug = 'power-systems'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (category_id, name, brand, slug, short_description, price_gbp, weight_grams, subcategory, system_tier, spec_line, images, is_editor_pick)
SELECT 
  id, 'MaxxFan Deluxe with Remote', 'MaxxAir', 'maxxair-maxxfan-remote', 'The gold standard in campervan ventilation.', 34500, 6000, 'roof-fans', 'all-season', 'Electric Open · Rain Sensor · 10-Speed', '["/images/insulation-technical.png"]'::jsonb, true
FROM product_categories WHERE slug = 'windows-ventilation'
ON CONFLICT (slug) DO NOTHING;
