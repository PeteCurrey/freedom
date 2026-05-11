-- Brand Hub Expansion Migration
-- Adds fields for SEO, content, media, and downloads to the brands table

-- 1. Create brands table if it doesn't exist (ensuring we have the base)
CREATE TABLE IF NOT EXISTS public.brands (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  website text,
  logo text,
  country text,
  is_verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 2. Add expansion columns
ALTER TABLE public.brands 
ADD COLUMN IF NOT EXISTS description text,
ADD COLUMN IF NOT EXISTS hero_image text,
ADD COLUMN IF NOT EXISTS gallery jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS downloads jsonb DEFAULT '[]'::jsonb, -- {name: string, url: string, type: string}
ADD COLUMN IF NOT EXISTS links jsonb DEFAULT '[]'::jsonb,     -- {name: string, url: string, type: string}
ADD COLUMN IF NOT EXISTS seo_title text,
ADD COLUMN IF NOT EXISTS seo_description text,
ADD COLUMN IF NOT EXISTS published boolean DEFAULT false;

-- 3. Enable RLS
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;

-- 4. Policies
CREATE POLICY "Public brands access" ON public.brands FOR SELECT USING (published = true);
CREATE POLICY "Admin full access" ON public.brands FOR ALL USING (auth.role() = 'authenticated');

-- 5. Seed initial brands if they don't exist
INSERT INTO public.brands (name, slug, published) VALUES
('Victron Energy', 'victron-energy', true),
('Fogstar', 'fogstar', true),
('Webasto', 'webasto', true),
('Truma', 'truma', true),
('Dometic', 'dometic', true),
('Eberspacher', 'eberspacher', true),
('Whale', 'whale', true),
('Dodo Mat', 'dodo-mat', true),
('Maxx Air', 'maxx-air', true),
('Maxx Fan', 'maxx-fan', true),
('BF Goodrich', 'bf-goodrich', true),
('Thule', 'thule', true),
('Fiamma', 'fiamma', true),
('EcoFlow', 'ecoflow', true),
('Anker SOLIX', 'anker-solix', true)
ON CONFLICT (slug) DO NOTHING;
