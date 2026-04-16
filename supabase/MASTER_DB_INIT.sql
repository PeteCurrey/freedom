-- ==============================================================================
-- AMPLIOS POWER ADMIN SUITE & COMMUNITY HUB - MASTER DATABASE INITIALIZATION
-- ==============================================================================
-- Description: Sets up the entire database architecture for the Amplios project.
-- Includes: Core Systems, Product Catalog, Admin RBAC, SEO Hub, and Showcase.
-- Safety: Uses IF NOT EXISTS and ON CONFLICT DO NOTHING for safe repeated execution.
-- ==============================================================================

-- =========================================
-- 1. CORE ARCHITECTURE & INFRASTRUCTURE
-- =========================================

-- Build Systems (The Engineering Blueprint)
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

-- Product Categories
CREATE TABLE IF NOT EXISTS product_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Technical Product Catalog
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

-- =========================================
-- 2. ADMIN, RBAC & SITE CONFIGURATION
-- =========================================

-- Admin Profiles (Metadata for Super Admin and Staff)
CREATE TABLE IF NOT EXISTS admin_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), -- Linking happens via email match or dynamic id sync
  email text UNIQUE NOT NULL,
  role text DEFAULT 'admin' CHECK (role IN ('super_admin', 'admin', 'editor')),
  full_name text,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Site Configuration (CMS - Hero images, Global Text)
CREATE TABLE IF NOT EXISTS site_config (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value jsonb NOT NULL,
  description text,
  updated_at timestamptz DEFAULT now()
);

-- Admin Integration Settings (API Keys for Anthropic, DataforSEO, etc)
CREATE TABLE IF NOT EXISTS admin_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service text UNIQUE NOT NULL, 
  api_key text,
  config jsonb DEFAULT '{}',
  updated_at timestamptz DEFAULT now()
);

-- =========================================
-- 3. SEO HUB & CONTENT ENGINE
-- =========================================

-- SEO Research Hub (Keywords, Competitors)
CREATE TABLE IF NOT EXISTS seo_research (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL, -- 'keyword', 'competitor', 'gap'
  query text NOT NULL,
  results jsonb DEFAULT '{}',
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Content Queue (Blog, Social, Newsletter, Landing Pages)
CREATE TABLE IF NOT EXISTS content_queue (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL, 
  title text NOT NULL,
  content text,
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'review', 'published', 'scheduled')),
  platform text, 
  ai_metadata jsonb DEFAULT '{}',
  published_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Affiliate Link Management
CREATE TABLE IF NOT EXISTS affiliate_management (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  network text DEFAULT 'amazon',
  base_url text NOT NULL,
  tracking_id text,
  current_performance jsonb DEFAULT '{}',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Dynamic SEO Landing Pages
CREATE TABLE IF NOT EXISTS landing_pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  header_title text,
  hero_image text,
  content jsonb DEFAULT '[]',
  meta_description text,
  is_published boolean DEFAULT false,
  seo_score integer,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- =========================================
-- 4. COMMUNITY SHOWCASE
-- =========================================

-- User Submitted Build Gallery
CREATE TABLE IF NOT EXISTS showcase_builds (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  user_handle text NOT NULL,
  vehicle_model text NOT NULL,
  chassis_type text NOT NULL,
  description text,
  hero_image text,
  specs_summary jsonb DEFAULT '{}',
  year_completed integer,
  status text DEFAULT 'published',
  is_community_pick boolean DEFAULT false,
  rating decimal(3,1) DEFAULT 4.8,
  created_at timestamptz DEFAULT now()
);

-- ==============================================================================
-- 5. MASTER SEED DATA
-- ==============================================================================

-- SEED: Build Systems
INSERT INTO build_systems (name, slug, description, tiers, common_mistakes)
VALUES 
(
  'Electrical & Solar', 'electrical-solar',
  'The nervous system of your off-grid home.',
  '{
    "beginner": {"name": "First Light", "price_range": "£400 - £600", "weight": "15kg", "features": ["100Ah AGM battery", "Split charge relay"]},
    "intermediate": {"name": "Grid Independent", "price_range": "£2,000 - £2,800", "weight": "35kg", "features": ["200Ah Lithium", "Victron DC-DC", "200W Solar"]},
    "advanced": {"name": "Full Autonomy", "price_range": "£5,500 - £7,500", "weight": "65kg", "features": ["400Ah Lithium", "MultiPlus 3000", "400W Solar"]}
  }',
  '[{"title": "Undersized Cables", "desc": "Fire hazard risk."}]'
),
(
  'Heating & Hot Water', 'heating-hot-water',
  'Year-round comfort from -20C to +40C.',
  '{
    "beginner": {"name": "Diesel Air Heater", "features": ["5kW Heater"]},
    "intermediate": {"name": "Webasto System", "features": ["Webasto EVO 40"]},
    "advanced": {"name": "Truma Combi", "features": ["Truma Combi 4E/6E"]}
  }',
  '[]'
)
ON CONFLICT (slug) DO UPDATE SET tiers = EXCLUDED.tiers;

-- SEED: Product Categories
INSERT INTO product_categories (name, slug, sort_order) VALUES
  ('Electrical', 'electrical-solar', 1),
  ('Heating', 'heating-hot-water', 2),
  ('Water', 'water-plumbing', 3),
  ('Insulation', 'insulation', 4),
  ('Gas', 'gas-lpg', 5),
  ('Exteriors', 'exterior-accessories', 6)
ON CONFLICT (slug) DO NOTHING;

-- SEED: Super Admin (Pete)
INSERT INTO admin_profiles (email, role, full_name)
VALUES ('pete@avorria.com', 'super_admin', 'Pete Currey')
ON CONFLICT (email) DO NOTHING;

-- SEED: Community Builds
INSERT INTO showcase_builds (slug, title, user_handle, vehicle_model, chassis_type, description, hero_image, specs_summary, year_completed, is_community_pick, rating)
VALUES 
(
  'highland-overlander', 'The Highland Overlander', '@AdventurePete', 'Mercedes Sprinter 4x4', 'Mercedes Sprinter',
  'Full-spec expedition build for the Highlands.', '/images/sprinter.png',
  '{"Solar": "400W", "Battery": "300Ah Li"}', 2024, true, 5.0
),
(
  'scandi-ghost', 'Scandi Ghost', '@NorthernVans', 'VW Crafter MWB', 'VW Crafter',
  'Minimalist interior focus.', '/images/vw-crafter.png',
  '{"Solar": "200W", "Battery": "200Ah Li"}', 2023, false, 4.9
),
(
  'pacific-explorer', 'Pacific Explorer', '@CoastalBuilds', 'Ford Transit L3H3', 'Ford Transit',
  'Built for long coastal tours.', '/images/transit.png',
  '{"Solar": "350W", "Battery": "400Ah Li"}', 2024, false, 4.7
),
(
  'alpine-studio', 'The Alpine Studio', '@MountainModern', 'Fiat Ducato L4H3', 'Fiat Ducato',
  'Luxury leisure build.', '/images/fiat-ducato.png',
  '{"Solar": "180W", "Battery": "160Ah AGM"}', 2023, false, 4.8
),
(
  'desert-raider', 'Desert Raider 4x4', '@GlobalTrekker', 'Iveco Daily 4x4', 'Iveco Daily',
  'Heavy-duty global expedition vehicle.', '/images/iveco-daily.png',
  '{"Solar": "600W", "Battery": "600Ah Li"}', 2024, false, 5.0
),
(
  'nomad-command', 'Nomad Command Centre', '@DigitalDrifter', 'MAN TGE LWB', 'VW Crafter',
  'Mobile office for full-time nomads.', '/images/man-tge.png',
  '{"Solar": "500W", "Battery": "400Ah Li"}', 2024, false, 4.6
)
ON CONFLICT (slug) DO NOTHING;

-- ==============================================================================
-- END OF MASTER INITIALIZATION
-- ==============================================================================
