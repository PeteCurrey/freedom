-- DIY Motorhomes - Seed Data for Products

-- 1. Insert Product Categories
INSERT INTO public.product_categories (id, slug, name, description, sort_order) VALUES
  ('cat-11111111-1111-1111-1111-111111111111', 'electrical', 'Electrical Systems', 'Hardware for power generation, storage, and distribution.', 1),
  ('cat-22222222-2222-2222-2222-222222222222', 'heating-climate', 'Heating & Climate', 'Air conditioning, diesel heaters, and climatic control.', 2),
  ('cat-33333333-3333-3333-3333-333333333333', 'plumbing', 'Plumbing & Water', 'Fresh water, grey water, and internal plumbing components.', 3)
ON CONFLICT (slug) DO NOTHING;

-- 2. Insert Products
INSERT INTO public.products (id, slug, name, brand, sku, description, short_description, price_gbp, category_id, stock_quantity, is_active) VALUES
  -- Electrical (Victron Energy)
  (uuid_generate_v4(), 'victron-multiplus-ii-12-3000-120-32', 'MultiPlus-II 12/3000/120-32', 'Victron Energy', 'PMP122305010', 'A combined inverter and charger in one elegant package.', '3000VA Inverter/Charger', 125000, 'cat-11111111-1111-1111-1111-111111111111', 10, true),
  (uuid_generate_v4(), 'victron-cerbo-gx', 'Cerbo GX', 'Victron Energy', 'BPP900450100', 'The communication-centre of your installation.', 'System Monitoring Hub', 29000, 'cat-11111111-1111-1111-1111-111111111111', 15, true),
  (uuid_generate_v4(), 'victron-smartsolar-mppt-100-30', 'SmartSolar MPPT 100/30', 'Victron Energy', 'SCC110030210', 'A solar charger gathers energy from your solar panels, and stores it in your batteries.', '30A Solar Charge Controller', 19500, 'cat-11111111-1111-1111-1111-111111111111', 20, true),
  (uuid_generate_v4(), 'victron-orion-tr-smart-12-12-30', 'Orion-Tr Smart 12/12-30A Non-isolated DC-DC charger', 'Victron Energy', 'ORI121236140', 'Professional DC to DC adaptive 3-stage charger with built-in Bluetooth.', '30A DC-DC Charger', 21000, 'cat-11111111-1111-1111-1111-111111111111', 12, true),
  (uuid_generate_v4(), 'victron-smart-lithium-12-8v-330ah', 'LiFePO4 Battery 12,8V/330Ah Smart', 'Victron Energy', 'BAT512132410', 'Lithium iron phosphate (LiFePO4) battery.', '330Ah Lithium Battery', 185000, 'cat-11111111-1111-1111-1111-111111111111', 5, true),
  
  -- Heating (Truma)
  (uuid_generate_v4(), 'truma-combi-d4-e', 'Combi D4 E', 'Truma', '33512-01', 'Diesel heater with integrated electric heating elements.', 'Diesel/Electric Heater & Boiler', 235000, 'cat-22222222-2222-2222-2222-222222222222', 8, true),
  (uuid_generate_v4(), 'truma-aventa-comfort', 'Aventa Comfort', 'Truma', '44091-51', 'Roof-mounted air conditioning system.', 'Roof Air Conditioner', 215000, 'cat-22222222-2222-2222-2222-222222222222', 4, true)
ON CONFLICT (slug) DO NOTHING;
