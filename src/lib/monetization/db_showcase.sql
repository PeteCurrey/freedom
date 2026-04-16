-- =========================================
-- DIY MOTORHOMES — DYNAMIC SHOWCASE SCHEMA
-- =========================================

CREATE TABLE IF NOT EXISTS showcase_builds (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  vehicle_model text NOT NULL,
  chassis_type text NOT NULL, -- e.g. 'Mercedes Sprinter'
  description text,
  hero_image text,
  gallery_images jsonb DEFAULT '[]',
  specs jsonb DEFAULT '{}', -- { electrical: '...', heating: '...' }
  featured_product_ids uuid[] DEFAULT '{}', -- Links to products table
  year_completed integer,
  status text DEFAULT 'draft', -- draft, review, published
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE showcase_builds ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public can view published builds" ON showcase_builds
  FOR SELECT USING (status = 'published');

CREATE POLICY "Users can manage own builds" ON showcase_builds
  FOR ALL USING (auth.uid() = user_id);

-- Initial Data Migration (Convert static to dynamic)
-- Note: Real images should be uploaded to Supabase Storage in production
INSERT INTO showcase_builds (title, slug, vehicle_model, chassis_type, description, hero_image, specs, year_completed, status)
VALUES 
(
  'THE SUMMIT OVERLANDER', 
  'summit-overlander', 
  'Mercedes Sprinter 170" 4×4', 
  'Mercedes Sprinter', 
  'A fully capable expedition build designed for extended off-grid use in the Scottish Highlands. 400Ah lithium system, Truma Combi, and full wet room.',
  '/images/community-showcase.png',
  '{"electrical": "400Ah Lithium", "heating": "Truma Combi 4E", "water": "Full Wet Room"}',
  2025,
  'published'
),
(
  'ALPINE NOMAD', 
  'alpine-nomad', 
  'VW Crafter LWB', 
  'VW Crafter', 
  'A refined long-term touring setup built for European travel. Clean Scandi interior aesthetic with behind-the-scenes technical precision.',
  '/images/interior-showcase.png',
  '{"electrical": "200Ah LiFePO4", "heating": "Webasto Air Top", "water": "Pressure System"}',
  2025,
  'published'
);
