-- DIY Motorhomes - Seed Data for Products

-- 1. Insert Product Categories
INSERT INTO public.product_categories (id, slug, name, description, sort_order) VALUES
  ('cat-11111111-1111-1111-1111-111111111111', 'electrical', 'Electrical Systems', 'Hardware for power generation, storage, and distribution.', 1),
  ('cat-22222222-2222-2222-2222-222222222222', 'heating-climate', 'Heating & Climate', 'Air conditioning, diesel heaters, and climatic control.', 2),
  ('cat-33333333-3333-3333-3333-333333333333', 'plumbing', 'Plumbing & Water', 'Fresh water, grey water, and internal plumbing components.', 3),
  ('cat-44444444-4444-4444-4444-444444444444', 'insulation', 'Insulation & Sound', 'Sound deadening, thermal barriers, and moisture control.', 4),
  ('cat-55555555-5555-5555-5555-555555555555', 'gas-lpg', 'Gas & LPG', 'Tanks, regulators, and gas-safe installation components.', 5),
  ('cat-66666666-6666-6666-6666-666666666666', 'ventilation', 'Ventilation', 'Roof fans, mushroom vents, and air extraction.', 6)
ON CONFLICT (slug) DO NOTHING;

-- 2. Insert Products
INSERT INTO public.products (id, slug, name, brand, sku, description, short_description, price_gbp, category_id, stock_quantity, is_active) VALUES
  -- Electrical (Victron Energy)
  (uuid_generate_v4(), 'victron-multiplus-ii-12-3000-120-32', 'MultiPlus-II 12/3000/120-32', 'Victron Energy', 'PMP122305010', 'A combined inverter and charger in one elegant package.', '3000VA Inverter/Charger', 125000, 'cat-11111111-1111-1111-1111-111111111111', 10, true),
  (uuid_generate_v4(), 'victron-cerbo-gx', 'Cerbo GX', 'Victron Energy', 'BPP900450100', 'The communication-centre of your installation.', 'System Monitoring Hub', 29000, 'cat-11111111-1111-1111-1111-111111111111', 15, true),
  (uuid_generate_v4(), 'victron-smartsolar-mppt-100-30', 'SmartSolar MPPT 100/30', 'Victron Energy', 'SCC110030210', 'A solar charger gathers energy from your solar panels.', '30A Solar Charge Controller', 19500, 'cat-11111111-1111-1111-1111-111111111111', 20, true),
  (uuid_generate_v4(), 'victron-orion-tr-smart-12-12-30', 'Orion-Tr Smart DC-DC 30A', 'Victron Energy', 'ORI121236140', 'Professional DC to DC adaptive 3-stage charger.', '30A DC-DC Charger', 21000, 'cat-11111111-1111-1111-1111-111111111111', 12, true),
  (uuid_generate_v4(), 'victron-smart-lithium-12-8v-330ah', 'LiFePO4 12,8V/330Ah Smart', 'Victron Energy', 'BAT512132410', 'Lithium iron phosphate (LiFePO4) battery.', '330Ah Lithium Battery', 185000, 'cat-11111111-1111-1111-1111-111111111111', 5, true),
  (uuid_generate_v4(), 'victron-lynx-distributor', 'Lynx Distributor', 'Victron Energy', 'LYN060102000', 'A modular DC busbar with locations for four fuses.', 'Modular DC Busbar', 16500, 'cat-11111111-1111-1111-1111-111111111111', 25, true),
  (uuid_generate_v4(), 'victron-smartshunt-500a', 'SmartShunt 500A', 'Victron Energy', 'SHU050150050', 'An all-in-one battery monitor, only without a display.', '500A Battery Monitor', 12500, 'cat-11111111-1111-1111-1111-111111111111', 30, true),
  
  -- Climate (Truma / Webasto / MaxxAir)
  (uuid_generate_v4(), 'truma-combi-d4-e', 'Combi D4 E', 'Truma', '33512-01', 'Diesel heater with integrated electric elements.', 'Diesel/Electric Heater', 235000, 'cat-22222222-2222-2222-2222-222222222222', 8, true),
  (uuid_generate_v4(), 'truma-aventa-comfort', 'Aventa Comfort', 'Truma', '44091-51', 'Roof-mounted air conditioning system.', 'Roof Air Conditioner', 215000, 'cat-22222222-2222-2222-2222-222222222222', 4, true),
  (uuid_generate_v4(), 'webasto-air-top-2000-stc', 'Air Top 2000 STC', 'Webasto', 'W9032156A', 'The simple and cost-effective solution.', 'Diesel Air Heater', 95000, 'cat-22222222-2222-2222-2222-222222222222', 12, true),
  (uuid_generate_v4(), 'maxxair-maxxfan-deluxe', 'MaxxFan Deluxe', 'MaxxAir', '00-07500K', 'A complete campervan ventilation system.', 'Roof Fan with Remote', 34500, 'cat-66666666-6666-6666-6666-666666666666', 40, true),
  
  -- Plumbing (Whale / Dometic)
  (uuid_generate_v4(), 'whale-expansions-bottle-2l', 'Whale Accumulator Tank 2L', 'Whale', 'AK1319', 'Reduces pump cycling and creates smoother flow.', '2L Accumulator Tank', 4500, 'cat-33333333-3333-3333-3333-333333333333', 50, true),
  (uuid_generate_v4(), 'whale-watermaster-pump', 'Whale Watermaster High Flow', 'Whale', 'FW0814', 'Pressure stabilized water pump.', '12V Pressure Pump', 9500, 'cat-33333333-3333-3333-3333-333333333333', 25, true),
  (uuid_generate_v4(), 'dometic-s4-window-900x450', 'S4 Hinged Window 900x450', 'Dometic', '9104116011', 'Complete window system for motorhomes.', 'Insulated Double Glazed Window', 44500, 'cat-66666666-6666-6666-6666-666666666666', 15, true),
  (uuid_generate_v4(), 'thetford-c223cs-toilet', 'Cassette Toilet C223-CS', 'Thetford', '5070006', 'High quality swivel toilet with ceramic bowl.', 'Electric Cassette Toilet', 49500, 'cat-33333333-3333-3333-3333-333333333333', 6, true),

  -- Insulation (Dodo Mat)
  (uuid_generate_v4(), 'dodo-mat-deadn-hex', 'Dodo Mat DEADN Hex', 'Dodo Mat', 'DODO-DEADN-HEX', 'Sound deadening vibration damper.', 'Butyl Sound Deadening', 6500, 'cat-44444444-4444-4444-4444-444444444444', 100, true),
  (uuid_generate_v4(), 'dodo-thermo-liner-extreme', 'Thermo Liner Extreme', 'Dodo Mat', 'DODO-TLE-10', 'High performance thermal insulation.', '10mm Thermal Liner', 8500, 'cat-44444444-4444-4444-4444-444444444444', 80, true),
  
  -- Gas
  (uuid_generate_v4(), 'gaslow-11kg-refillable-tank', 'Gaslow R67 11kg Cylinder', 'Gaslow', '01-1650', 'Direct refillable LPG cylinder.', 'Refillable Gas Bottle', 18500, 'cat-55555555-5555-5555-5555-555555555555', 20, true)
ON CONFLICT (slug) DO NOTHING;

-- 3. Insert Build Systems
INSERT INTO public.build_systems (slug, name, tagline, description, hero_image, tiers, common_mistakes, published) VALUES
  ('electrical-solar', 'ELECTRICAL & SOLAR', 'Power Your Independence', 'From your first LED to a full Victron Multiplus system with 600W solar and 400Ah lithium.', '/images/systems-showcase.png', 
  '{
    "beginner": {"name": "First Light", "price_range": "£400-£600", "weight": "15kg", "features": ["100Ah AGM", "Split Charge", "Basic 12V", "USB Sockets"]},
    "intermediate": {"name": "Grid Independent", "price_range": "£2000-£2800", "weight": "35kg", "features": ["200Ah Lithium", "200W Solar", "DC-DC Charger"]},
    "advanced": {"name": "Full Autonomy", "price_range": "£5500-£7500", "weight": "65kg", "features": ["400Ah Lithium", "600W Solar", "3000W Inverter"]}
  }'::jsonb,
  '[
    {"title": "Undersized wire gauge", "desc": "Causes voltage drop and potential fire risk on high-current runs."},
    {"title": "Split charge with Lithium", "desc": "Standard VSRs will damage lithium batteries; use a DC-DC charger instead."}
  ]'::jsonb, true),
  
  ('heating-hot-water', 'HEATING & HOT WATER', 'Climate Control Any Mission', 'Year-round comfort from -20°C to +40°C. Diesel, gas, electric — or all three.', '/images/interior-showcase.png',
  '{
    "beginner": {"name": "Take the Edge Off", "price_range": "£150-£300", "weight": "5kg", "features": ["5kW Diesel Heater", "Basic Control"]},
    "intermediate": {"name": "Four Season", "price_range": "£1200-£1800", "weight": "12kg", "features": ["Webasto Air Top", "Digital Controller"]},
    "advanced": {"name": "Home Comfort", "price_range": "£2500-£3500", "weight": "22kg", "features": ["Truma Combi 4E", "Dual Fuel", "10L Water"]}
  }'::jsonb,
  '[
    {"title": "No CO alarm", "desc": "An absolute safety requirement for any combustion-based heating system."},
    {"title": "Poor ducting design", "desc": "Avoid kinks and keep runs short to ensure even heat distribution."}
  ]'::jsonb, true)
ON CONFLICT (slug) DO NOTHING;


