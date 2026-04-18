-- =========================================
-- AMPLIOS STORE OVERHAUL - SCHEMA EXPANSION
-- =========================================

-- 1. EXPAND PRODUCT CATEGORIES
ALTER TABLE product_categories ADD COLUMN IF NOT EXISTS subcategories jsonb DEFAULT '[]';

-- 2. EXPAND PRODUCTS
ALTER TABLE products ADD COLUMN IF NOT EXISTS subcategory text;
ALTER TABLE products ADD COLUMN IF NOT EXISTS system_tier text;
ALTER TABLE products ADD COLUMN IF NOT EXISTS badge text;
ALTER TABLE products ADD COLUMN IF NOT EXISTS compare_at_price integer;
ALTER TABLE products ADD COLUMN IF NOT EXISTS is_editor_pick boolean DEFAULT false;
ALTER TABLE products ADD COLUMN IF NOT EXISTS sort_priority integer DEFAULT 0;
ALTER TABLE products ADD COLUMN IF NOT EXISTS spec_line text;
ALTER TABLE products ADD COLUMN IF NOT EXISTS related_product_ids jsonb DEFAULT '[]';
ALTER TABLE products ADD COLUMN IF NOT EXISTS datasheet_url text;

-- 3. UPDATE EXISTING CATEGORIES WITH SUBCATEGORY TAXONOMY
UPDATE product_categories SET 
  name = 'Power Systems',
  slug = 'power-systems',
  subcategories = '[
    {"slug": "inverters", "name": "Inverters & chargers"},
    {"slug": "solar-panels", "name": "Solar panels"},
    {"slug": "mppt", "name": "MPPT controllers"},
    {"slug": "dc-dc", "name": "DC-DC chargers"},
    {"slug": "batteries", "name": "Batteries (LiFePO4 + AGM)"},
    {"slug": "monitoring", "name": "Monitoring & Control"},
    {"slug": "distribution", "name": "Fuses & Distribution"}
  ]'::jsonb
WHERE slug = 'electrical-solar';

UPDATE product_categories SET 
  name = 'Climate Control',
  slug = 'climate-control',
  subcategories = '[
    {"slug": "diesel-heaters", "name": "Diesel heaters"},
    {"slug": "lpg-heaters", "name": "LPG heaters"},
    {"slug": "combi-heaters", "name": "Combi heaters"},
    {"slug": "air-conditioning", "name": "Air conditioning"},
    {"slug": "water-heaters", "name": "Water heaters"}
  ]'::jsonb
WHERE slug = 'heating-hot-water';

UPDATE product_categories SET 
  name = 'Water & Plumbing',
  slug = 'water-plumbing',
  subcategories = '[
    {"slug": "fresh-tanks", "name": "Fresh water tanks"},
    {"slug": "grey-tanks", "name": "Grey water tanks"},
    {"slug": "pumps", "name": "Pumps & accumulators"},
    {"slug": "taps", "name": "Taps & mixers"},
    {"slug": "filtration", "name": "Water filtration"}
  ]'::jsonb
WHERE slug = 'water-plumbing';

UPDATE product_categories SET 
  name = 'Insulation & Build',
  slug = 'insulation-build',
  subcategories = '[
    {"slug": "sound-deadening", "name": "Sound deadening"},
    {"slug": "insulation", "name": "Thermal insulation"},
    {"slug": "vapour-barriers", "name": "Vapour barriers"},
    {"slug": "panelling", "name": "Lightweight panelling"},
    {"slug": "adhesives", "name": "Adhesives & sealants"}
  ]'::jsonb
WHERE slug = 'insulation';

UPDATE product_categories SET 
  name = 'Windows & Ventilation',
  slug = 'windows-ventilation',
  subcategories = '[
    {"slug": "sliding-windows", "name": "Sliding windows"},
    {"slug": "roof-fans", "name": "Roof vents & fans"},
    {"slug": "mushroom-vents", "name": "Mushroom vents"},
    {"slug": "blinds", "name": "Window blinds & covers"}
  ]'::jsonb
WHERE slug = 'windows-ventilation' OR slug = 'gas'; -- merging gas as it was placeholder

INSERT INTO product_categories (name, slug, sort_order, subcategories)
VALUES ('Exterior & Accessories', 'exterior-accessories', 6, '[
    {"slug": "awnings", "name": "Awnings"},
    {"slug": "bike-racks", "name": "Bike racks"},
    {"slug": "roof-racks", "name": "Roof racks & bars"},
    {"slug": "ladders", "name": "Ladders & steps"},
    {"slug": "wheels", "name": "Alloy wheels"}
  ]'::jsonb)
ON CONFLICT (slug) DO UPDATE SET subcategories = EXCLUDED.subcategories;

-- 4. UPDATE EXISTING PRODUCTS WITH NEW FIELDS (SAMPLE DATA)
UPDATE products SET 
  subcategory = 'inverters',
  system_tier = 'full-autonomy',
  spec_line = '3kVA inverter · 120A charger · 12V',
  is_editor_pick = true,
  badge = 'Bestseller'
WHERE slug LIKE '%multiplus%';
