-- =========================================
-- DIY MOTORHOMES — FULL DB SEED EXPANSION
-- Run this in Supabase SQL Editor
-- =========================================

-- Ensure base tables exist
CREATE TABLE IF NOT EXISTS build_systems (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  hero_image text,
  tiers jsonb DEFAULT '{}',
  common_mistakes jsonb DEFAULT '[]',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS product_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES product_categories(id),
  name text NOT NULL,
  brand text,
  slug text UNIQUE NOT NULL,
  short_description text,
  full_description text,
  price_gbp integer NOT NULL,
  weight_kg numeric(10,2),
  specs jsonb DEFAULT '{}',
  image_url text,
  stock_quantity integer DEFAULT 50,
  is_active boolean DEFAULT true,
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- =====================
-- BUILD SYSTEMS (INSERT OR UPDATE ALL 6)
-- =====================

-- 1. Electrical & Solar (may already exist — upsert)
INSERT INTO build_systems (name, slug, description, tiers, common_mistakes)
VALUES (
  'Electrical & Solar',
  'electrical-solar',
  'The nervous system of your off-grid home. From a basic split-charge relay to a full Victron Multiplus system with 400Ah lithium — this is the most complex and highest-value system in any build.',
  '{
    "beginner": {
      "name": "First Light",
      "price_range": "£400 - £600",
      "weight": "15kg",
      "features": ["100Ah AGM battery", "Split charge relay from alternator", "4-way 12V fuse box", "3x 12V sockets", "USB charging panel", "LED strip lighting", "Simple voltmeter display"]
    },
    "intermediate": {
      "name": "Grid Independent",
      "price_range": "£2,000 - £2,800",
      "weight": "35kg",
      "features": ["200Ah LiFePO4 battery with BMS", "Victron Orion DC-DC charger", "200W solar panel + Victron MPPT 75/15", "800W pure sine inverter/charger", "Victron SmartShunt battery monitor", "Shore power hookup", "12V + 240V ring circuit", "Cerbo GX for monitoring"]
    },
    "advanced": {
      "name": "Full Autonomy",
      "price_range": "£5,500 - £7,500",
      "weight": "65kg",
      "features": ["400Ah LiFePO4 battery bank", "Victron MultiPlus 12/3000/120", "Victron Cerbo GX + GX Touch", "400W+ solar array via Victron MPPT 100/30", "Lynx Distributor + Lynx Shunt", "Full 240V ring circuit", "DC-DC charger 30A", "Victron Color Control remote monitoring"]
    }
  }',
  '[
    {"title": "Undersized Cables", "desc": "Using too-thin cables for high-current loads like inverters is a fire hazard. Always calculate voltage drop over the cable run using the correct formula — typically no more than 3% drop."},
    {"title": "Mixing Battery Chemistries", "desc": "Never parallel-connect AGM and Lithium batteries. They have fundamentally different voltage curves and one will destroy the other."},
    {"title": "No Fuse at the Battery Terminal", "desc": "Every wire leaving the positive battery terminal must be fused within 30cm. This is not optional — it is the only thing standing between you and a wiring fire."},
    {"title": "Skipping a DC-DC Charger", "desc": "Split charge relays do not work with modern Euro 6 vehicles with variable voltage alternators. A DC-DC charger is mandatory on any van made after 2016."}
  ]'
)
ON CONFLICT (slug) DO UPDATE SET
  tiers = EXCLUDED.tiers,
  common_mistakes = EXCLUDED.common_mistakes,
  description = EXCLUDED.description;

-- 2. Heating & Hot Water (may already exist — upsert)
INSERT INTO build_systems (name, slug, description, tiers, common_mistakes)
VALUES (
  'Heating & Hot Water',
  'heating-hot-water',
  'Year-round comfort from -20°C to +40°C. The difference between a miserable winter weekend and a genuinely off-grid lifestyle.',
  '{
    "beginner": {
      "name": "Diesel Air Heater",
      "price_range": "£150 - £300",
      "weight": "5kg",
      "features": ["5kW diesel air heater (Chinese unit)", "External fuel tap from main tank", "Digital thermostat controller", "Single forward-facing outlet", "Silencer exhaust kit included"]
    },
    "intermediate": {
      "name": "Webasto / Propex System",
      "price_range": "£1,200 - £1,800",
      "weight": "12kg",
      "features": ["Webasto Air Top EVO 40 (4kW)", "German-engineered reliability", "SmartPhone app control via GSM module", "Or Propex HS2000 LPG heater as alternative", "Hot water via Propex Malaga 5E water heater"]
    },
    "advanced": {
      "name": "Truma Combi System",
      "price_range": "£2,500 - £3,500",
      "weight": "22kg",
      "features": ["Truma Combi 4E or 6E", "Combined space heating + 10L instant hot water", "LPG + 240V shore power hybrid", "Ducting to multiple rooms including garage", "Truma iNet remote app control", "Wall-mounted controller with diagnostics"]
    }
  }',
  '[
    {"title": "Siting the Air Inlet Too Close to an Opening", "desc": "The fresh air inlet for a diesel heater must be at least 300mm from any opening where CO could accumulate — a common installation mistake."},
    {"title": "Undersized Exhaust Silencer", "desc": "Diesel heaters are noisy without adequate silencing. Budget for a silencer on any build where stealth matters."},
    {"title": "Forgetting the Garage Zone", "desc": "If you have a rear garage, route heating ducting there too — batteries and water systems need protection from freezing."}
  ]'
)
ON CONFLICT (slug) DO UPDATE SET
  tiers = EXCLUDED.tiers,
  common_mistakes = EXCLUDED.common_mistakes,
  description = EXCLUDED.description;

-- 3. Water & Plumbing (NEW)
INSERT INTO build_systems (name, slug, description, tiers, common_mistakes)
VALUES (
  'Water & Plumbing',
  'water-plumbing',
  'From a jerry can to a full wet room with hot pressure shower. The water system is where most first-time builders underspec — and regret it.',
  '{
    "beginner": {
      "name": "The Essentials",
      "price_range": "£200 - £400",
      "weight": "15kg",
      "features": ["40L fresh water tank", "25L grey water tank", "Whale submersible pump", "Single cold tap over kitchen sink", "Jerry can filler point", "Simple tank level float indicator"]
    },
    "intermediate": {
      "name": "Clean Living",
      "price_range": "£500 - £900",
      "weight": "30kg",
      "features": ["80L baffled fresh tank with sensor", "50L grey tank with sensor", "Whale Smartflo pressure pump (12V)", "Hot + cold mixer tap", "Outdoor shower point (cold)", "Inline carbon filter", "Drain-down valve for winter"]
    },
    "advanced": {
      "name": "Full Wet Room",
      "price_range": "£900 - £1,500",
      "weight": "50kg",
      "features": ["100L+ baffled fresh with multi-point sensor", "70L grey with level sensor + alarm", "Whale high-flow pressure pump with accumulator", "Hot + cold in kitchen AND wet room", "Internal shower tray, screen + drainage pump", "Multi-stage filter system", "Calorifier or Truma boiler integration"]
    }
  }',
  '[
    {"title": "No Baffles in the Fresh Tank", "desc": "Un-baffled tanks create significant water surge noise on corners and in braking. Always specify baffled tanks."},
    {"title": "Grey Tank Too Small", "desc": "Most builders size the grey tank at half the fresh capacity. In practice, with cooking and washing, you fill it faster than you empty the fresh. Aim for at least 60% of fresh capacity."},
    {"title": "No Non-Return Valve on the Filler", "desc": "A non-return valve prevents water siphoning back out of the tank when the van is on a slope. It costs £4 and saves a wet floor."},
    {"title": "Unsecured Pipe Runs", "desc": "All pipe runs must be clamped every 300-400mm. Unsecured pipes rattle, chafe against panel edges, and eventually fail."},
    {"title": "No Accumulator Tank", "desc": "Without an accumulator tank, the pump cycles ON/OFF every time there is a slight pressure drop — which rapidly wears out the pump bearings."}
  ]'
)
ON CONFLICT (slug) DO UPDATE SET
  tiers = EXCLUDED.tiers,
  common_mistakes = EXCLUDED.common_mistakes,
  description = EXCLUDED.description;

-- 4. Insulation & Ventilation (NEW)
INSERT INTO build_systems (name, slug, description, tiers, common_mistakes)
VALUES (
  'Insulation & Ventilation',
  'insulation-ventilation',
  'The invisible system that makes or breaks your build. Poor insulation creates condensation, mould, noise, and a van that is freezing in winter and an oven in summer.',
  '{
    "beginner": {
      "name": "Three Season",
      "price_range": "£300 - £500",
      "weight": "20kg",
      "features": ["25mm closed-cell foam on all surfaces", "Carpet-lined wheel arches", "Ply floor with XPS underlay", "1x MaxxFan Deluxe (manual speed control)", "Sound deadening on wheel arches (30% coverage)"]
    },
    "intermediate": {
      "name": "All Season",
      "price_range": "£600 - £1,000",
      "weight": "35kg",
      "features": ["50mm Celotex between battens", "25mm closed-cell foam vapour barrier layer", "Thinsulate ceiling liner (military-spec)", "XPS underfloor insulation + ply deck", "MaxxFan Deluxe with rain sensor + thermostat", "Roof mushroom vent x1", "Full vapour barrier membrane on roof"]
    },
    "advanced": {
      "name": "Extreme Climate",
      "price_range": "£1,200 - £2,200",
      "weight": "55kg",
      "features": ["Full Celotex + closed-cell + Thinsulate composite", "Thermal bridge isolation on all ribs", "Dometic S4 double-glazed windows x4 (replacing OEM)", "12V electric underfloor heating mat", "MaxxFan + additional roof vent + 2x mushroom vents", "Full condensation management system", "Cabinetry sealed from outer skin"]
    }
  }',
  '[
    {"title": "Ignoring Thermal Bridging", "desc": "Every metal rib you allow to touch both the cold outer skin and the warm inner lining creates a thermal bridge — a highway for heat loss and condensation. Isolate every rib with foam tape or battening."},
    {"title": "No Vapour Barrier", "desc": "Moisture-laden warm air will pass through insulation and condense on the cold metal skin — causing rust and mould. A vapour barrier slows this process significantly."},
    {"title": "100% Sound Deadening Coverage", "desc": "Many YouTube builds show total sound deadening coverage. This is overkill and adds significant weight. 30-50% coverage on flat panels is the optimal acoustic point — beyond that, diminishing returns."},
    {"title": "Single Vent Only", "desc": "One fan creates a positive or negative pressure zone. Two vents — one in, one out — create proper cross-ventilation to control humidity and remove cooking smells."}
  ]'
)
ON CONFLICT (slug) DO UPDATE SET
  tiers = EXCLUDED.tiers,
  common_mistakes = EXCLUDED.common_mistakes,
  description = EXCLUDED.description;

-- 5. Gas & LPG (NEW)
INSERT INTO build_systems (name, slug, description, tiers, common_mistakes)
VALUES (
  'Gas & LPG',
  'gas-lpg',
  'The most power-dense fuel source per kilo — but it must be installed correctly. LPG sinks to the floor, ignites at 1.8% concentration, and has no smell until you add the odorant. Handle with respect.',
  '{
    "option_a": {
      "name": "No Gas (All-Electric)",
      "price_range": "£0",
      "weight": "0kg",
      "features": ["Induction hob (requires strong electrical system)", "Diesel or electric heating only", "Simpler compliance — no Gas Safe certification", "Best paired with Full Autonomy electrical tier", "No LPG storage compliance issues on ferries"]
    },
    "option_b": {
      "name": "Single Bottle Setup",
      "price_range": "£200 - £400",
      "weight": "15kg",
      "features": ["6kg Calor propane bottle", "Clip-on regulator + pigtail hose (armoured)", "2-burner hob (CAN or Dometic)", "Gas isolation valve accessible externally", "Gas drop-out vent mandatory", "Gas Safe engineer sign-off required"]
    },
    "option_c": {
      "name": "Dual Bottle + Oven",
      "price_range": "£400 - £700",
      "weight": "25kg",
      "features": ["2x 6kg propane bottles in sealed gas locker", "Auto-changeover regulator (never runs out)", "2-burner hob + grill + oven (Thetford Triplex)", "Gas isolation valve + external BBQ point", "Gas drop-out vent + LPG gas alarm", "Gas Safe certification required"]
    }
  }',
  '[
    {"title": "No Drop-Out Vent", "desc": "LPG (propane and butane) is HEAVIER than air. It sinks to the floor and collects. A drop-out vent at floor level is a non-negotiable safety requirement — it is illegal to certificate a system without one."},
    {"title": "Gas Locker Not Sealed from Living Space", "desc": "The gas bottle compartment must be completely sealed from the living area and drain to the outside. Any leak must vent outward, not inward."},
    {"title": "Using Non-Armoured Rubber Hose for Fixed Runs", "desc": "Standard catering rubber hose is not approved for use in vehicle installations. Use armoured stainless hose or copper pipe for all fixed runs."},
    {"title": "Skipping Gas Safe Certification", "desc": "A van with gas that has not been Gas Safe signed off cannot be insured as a motorhome. The certification usually costs £100-£200 and is worth every penny."}
  ]'
)
ON CONFLICT (slug) DO UPDATE SET
  tiers = EXCLUDED.tiers,
  common_mistakes = EXCLUDED.common_mistakes,
  description = EXCLUDED.description;

-- 6. Interior & Furniture (NEW)
INSERT INTO build_systems (name, slug, description, tiers, common_mistakes)
VALUES (
  'Interior & Furniture',
  'interior-furniture',
  'Where engineering becomes craftsmanship. Every millimetre earns its place. The interior is where you spend 100% of your time — and where most of the build budget goes.',
  '{
    "beginner": {
      "name": "Functional",
      "price_range": "£500 - £1,000",
      "weight": "60kg",
      "features": ["Basic ply bed platform with storage beneath", "Open shelving units (no doors)", "Off-the-shelf kitchen pod or flat-pack unit", "Laminate worktop", "Basic LED strip lighting", "Ply wall panels with vinyl wrap"]
    },
    "intermediate": {
      "name": "Custom Built",
      "price_range": "£1,500 - £3,000",
      "weight": "90kg",
      "features": ["CNC-cut 12mm birch ply cabinetry", "Integrated bed frame with gas-strut lift-up storage", "Bespoke kitchen unit with hardwood-edge worktop", "Blum soft-close hinges and drawer runners", "Overhead storage lockers throughout", "Dedicated shoe/kit storage at door", "Feature lighting including warm ambient LEDs"]
    },
    "advanced": {
      "name": "Premium Finish",
      "price_range": "£3,000 - £6,000+",
      "weight": "120kg",
      "features": ["Precision-cut cabinetry with hidden fixings", "Solid surface or bamboo worktops", "Upholstered wall and ceiling panels", "Integrated LED ambient lighting system", "Bespoke soft furnishings (cushions, curtains)", "CNC-cut jig templates for perfect vehicle-specific fit", "Designer hardware (brushed brass or matte black)"]
    }
  }',
  '[
    {"title": "Using MDF", "desc": "MDF is heavy (twice the weight of plywood per sheet), swells when wet, and delaminate at edges. Never use MDF in a vehicle build. 9mm or 12mm birch ply is the standard."},
    {"title": "Fixing Furniture Directly to the Outer Skin", "desc": "The van\u2019s outer skin flexes as the body twists on uneven ground. Fix to the floor or ribs via floating mounts — never rigid-fix to the outer skin."},
    {"title": "Not Accounting for Vehicle Flex", "desc": "Rigid joints on full-length furniture will crack as the van flexes on rough roads. Use piano hinges, floating panels, or deliberate flex joints on runs over 1.5m."},
    {"title": "Bed Too Short", "desc": "Measure your actual required sleeping length (shoulder to foot + 150mm) before committing to a layout. Too many builds end up with a bed that is 30mm too short."},
    {"title": "Insufficient Access to Services", "desc": "All pipe joints, electrical connections, and service penetrations must be accessible for inspection and maintenance. Hiding them behind sealed panels is a future nightmare."}
  ]'
)
ON CONFLICT (slug) DO UPDATE SET
  tiers = EXCLUDED.tiers,
  common_mistakes = EXCLUDED.common_mistakes,
  description = EXCLUDED.description;


-- =====================
-- PRODUCT CATEGORIES (UPSERT ALL)
-- =====================
INSERT INTO product_categories (name, slug, sort_order, description) VALUES
  ('Electrical & Solar', 'electrical-solar', 1, 'Batteries, inverters, solar panels, charge controllers and monitoring'),
  ('Heating & Hot Water', 'heating-hot-water', 2, 'Diesel, LPG and electric heating systems plus water heaters'),
  ('Water & Plumbing', 'water-plumbing', 3, 'Tanks, pumps, taps, filters and grey water management'),
  ('Insulation', 'insulation', 4, 'Celotex, closed-cell foam, Thinsulate and vapour barriers'),
  ('Gas & LPG', 'gas-lpg', 5, 'Hobs, regulators, bottles, changeover valves and gas safety'),
  ('Windows & Ventilation', 'windows-ventilation', 6, 'Dometic S4 windows, MaxxFan roof vents and mushroom vents'),
  ('Interior & Furniture', 'interior-furniture', 7, 'Plywood, fittings, worktops, hinges and soft furnishings'),
  ('Exterior & Accessories', 'exterior-accessories', 8, 'Awnings, steps, bike carriers and exterior styling'),
  ('Build Kits', 'kits', 9, 'Bundled system packs for complete electrical, water and heating installs')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  sort_order = EXCLUDED.sort_order,
  description = EXCLUDED.description;


-- =====================
-- PRODUCTS — Expanded Technical Catalog
-- =====================

-- Energy Distribution
INSERT INTO products (name, brand, slug, short_description, full_description, price_gbp, weight_kg, specs, stock_quantity, is_active, is_featured, category_id)
SELECT
  'Victron Lynx Distributor',
  'Victron Energy',
  'victron-lynx-distributor',
  'Modular DC busbar with fuse monitoring. The heart of a safe 12V distribution system.',
  'The Lynx Distributor is a modular DC busbar, with locations for four DC fuses. It will monitor the status of each fuse, and indicate its condition with a LED on the front. Part of the modular Lynx distribution system.',
  19500,
  2.2,
  '{"Max Current": "1000A", "Voltage Range": "9-60V DC", "Fuse Type": "MEGA", "Connections": "M8", "Monitoring": "LED per fuse"}',
  50, true, true,
  (SELECT id FROM product_categories WHERE slug = 'electrical-solar')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (name, brand, slug, short_description, full_description, price_gbp, weight_kg, specs, stock_quantity, is_active, is_featured, category_id)
SELECT
  'Sterling Power BB1260 DC-DC',
  'Sterling Power',
  'sterling-bb1260-dc-dc',
  'High-power 60A battery-to-battery charger. Ideal for fast alternator charging.',
  'The Sterling BB1260 is a 60A DC-to-DC charger designed to charge your leisure battery from the vehicle alternator at the optimal voltage profile. Essential for modern smart alternators and high-capacity lithium banks.',
  28900,
  1.5,
  '{"Current": "60A", "Input Voltage": "9-16V", "Output": "Multi-stage", "Efficiency": "95%", "Protection": "Overheat/Short"}',
  50, true, false,
  (SELECT id FROM product_categories WHERE slug = 'electrical-solar')
ON CONFLICT (slug) DO NOTHING;

-- Chassis & Suspension
INSERT INTO products (name, brand, slug, short_description, full_description, price_gbp, weight_kg, specs, stock_quantity, is_active, is_featured, category_id)
SELECT
  'SumoSprings Solo Rear Custom',
  'SuperSprings',
  'sumosprings-sprinter-rear',
  'Maintenance-free suspension enhancement. Reduces body roll and improves stability.',
  'SumoSprings are a patented suspension product designed to enhance load carrying ability, stabilize sway, and improve overall driver control and comfort. They are maintenance-free, do not leak air, and do not require airlines or compressors.',
  34500,
  4.0,
  '{"Material": "Micro-cellular Urethane", "Fitment": "Mercedes Sprinter 906/907", "Load Leveling": "Up to 1200kg", "Maintenance": "Zero"}',
  50, true, true,
  (SELECT id FROM product_categories WHERE slug = 'exterior-accessories')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (name, brand, slug, short_description, full_description, price_gbp, weight_kg, specs, stock_quantity, is_active, is_featured, category_id)
SELECT
  'BFGoodrich All-Terrain T/A KO2',
  'BFGoodrich',
  'bfg-ko2-245-75-16',
  'The ultimate off-road tyre for expedition vans. 3-Peak Mountain Snowflake rated.',
  'The BFGoodrich All-Terrain T/A KO2 is our toughest all-terrain tyre ever. Delivering 20% tougher sidewalls and exceptional traction in snow, mud, and rock, it is the de-facto choice for 4x4 Sprinters and Transits.',
  18500,
  15.0,
  '{"Size": "245/75 R16", "Load Index": "120/116", "Speed Rating": "S", "Season": "All-Season (3PMSF)", "Sidewall": "Black"}',
  50, true, true,
  (SELECT id FROM product_categories WHERE slug = 'exterior-accessories')
ON CONFLICT (slug) DO NOTHING;

-- Comfort & Environmental
INSERT INTO products (name, brand, slug, short_description, full_description, price_gbp, weight_kg, specs, stock_quantity, is_active, is_featured, category_id)
SELECT
  'Truma Aventa Compact Plus',
  'Truma',
  'truma-aventa-compact-plus',
  'Roof-mounted air conditioning. Compact, powerful and remarkably quiet.',
  'The Truma Aventa compact plus is the most powerful A/C in its class. It fits on any vehicle roof, even if space is at a premium. Despite its performance, it is extremely quiet and energy-efficient.',
  195000,
  29.5,
  '{"Cooling Power": "2200W", "Heating Power": "Optional via heat pump", "Consumption": "4.3A", "Dimensions": "785x560x265mm", "Weight": "29.5kg"}',
  50, true, true,
  (SELECT id FROM product_categories WHERE slug = 'heating-hot-water')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (name, brand, slug, short_description, full_description, price_gbp, weight_kg, specs, stock_quantity, is_active, is_featured, category_id)
SELECT
  'Dometic S4 Top-Hung Window 900x500',
  'Dometic',
  'dometic-s4-900-500',
  'Classic top-hung window with telescopic stays. Integrated blind and screen.',
  'The Dometic S4 window system is the choice of motorhome manufacturers worldwide. Excellent thermal insulation and ease of use. This large 900x500 unit is perfect for side dinette positions.',
  28500,
  4.2,
  '{"Dimensions": "900x500mm", "Type": "Top-Hung", "Glazing": "Double Acrylic", "U-Value": "1.8", "Weight": "4.2kg"}',
  50, true, false,
  (SELECT id FROM product_categories WHERE slug = 'windows-ventilation')
ON CONFLICT (slug) DO NOTHING;
