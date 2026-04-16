-- Community Showcase Populations
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

-- Delete existing placeholders if any
TRUNCATE TABLE showcase_builds;

-- Insert Community Builds
INSERT INTO showcase_builds (slug, title, user_handle, vehicle_model, chassis_type, description, hero_image, specs_summary, year_completed, is_community_pick, rating)
VALUES 
(
  'highland-overlander',
  'The Highland Overlander',
  '@AdventurePete',
  'Mercedes Sprinter 4x4 170" WB',
  'Mercedes Sprinter',
  'A full-spec 4x4 expedition build designed for the Scottish Highlands. Features a full Victron Multiplus system, off-road suspension, and a custom rear garage for bikes.',
  '/images/sprinter-hd.png',
  '{"Solar": "400W", "Battery": "300Ah Lithium", "Water": "100L", "Heating": "Diesel Air"}',
  2024,
  true,
  5.0
),
(
  'scandi-minimalist',
  'Scandi Ghost',
  '@NorthernVans',
  'VW Crafter MWB',
  'VW Crafter',
  'Minimalist interior focus with emphasis on thermal efficiency and stealth. All birch-ply interior with hidden fasteners and ultra-quiet environmental systems.',
  '/images/vw-crafter-expedition.png',
  '{"Solar": "200W", "Battery": "200Ah Lithium", "Water": "60L", "Heating": "Webasto Air"}',
  2023,
  false,
  4.9
),
(
  'pacific-coast-explorer',
  'Pacific Explorer',
  '@CoastalBuilds',
  'Ford Transit L3H3',
  'Ford Transit',
  'Built for long coastal tours with a dual-zone layout. Integrated surf-rack and external shower system. High-power electrical for induction cooking.',
  '/images/transit-hd.png',
  '{"Solar": "350W", "Battery": "400Ah Lithium", "Water": "85L", "Heating": "Truma Combi"}',
  2024,
  false,
  4.7
),
(
  'alpine-studio',
  'The Alpine Studio',
  '@MountainModern',
  'Fiat Ducato L4H3',
  'Fiat Ducato',
  'A luxury leisure build focused on comfort and aesthetics. Features a full wet-room, leather upholstery, and a cinematic panoramic roof window.',
  '/images/fiat-ducato-camper.png',
  '{"Solar": "180W", "Battery": "160Ah AGM", "Water": "90L", "Heating": "Truma 6E"}',
  2023,
  false,
  4.8
),
(
  'desert-raider',
  'Desert Raider 4x4',
  '@GlobalTrekker',
  'Iveco Daily 4x4',
  'Iveco Daily',
  'Heavy-duty global expedition vehicle. Built for 14-day autonomy in desert environments with massive water storage and redundant power systems.',
  '/images/iveco-daily-4x4-expedition.png',
  '{"Solar": "600W", "Battery": "600Ah Lithium", "Water": "180L", "Heating": "Diesel/Electric Hybrid"}',
  2024,
  false,
  5.0
),
(
  'nomad-command',
  'Nomad Command Centre',
  '@DigitalDrifter',
  'MAN TGE LWB',
  'VW Crafter',
  'A mobile office for a full-time software engineer. Dedicated Starlink mount, dual-monitor workstation, and extreme sound insulation.',
  '/images/man-tge-adventure.png',
  '{"Solar": "500W", "Battery": "400Ah Lithium", "Water": "40L", "Heating": "5kW Diesel"}',
  2024,
  false,
  4.6
);
