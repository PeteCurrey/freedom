-- Migration: Product Intelligence Layer Upgrade
-- Date: 2026-05-17

-- 1. Create Manufacturers Table
CREATE TABLE IF NOT EXISTS public.manufacturers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    website_url TEXT,
    description TEXT,
    logo_url TEXT,
    product_categories JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- RLS Policies for manufacturers
ALTER TABLE public.manufacturers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Manufacturers are viewable by everyone." 
ON public.manufacturers FOR SELECT 
USING (true);

CREATE POLICY "Manufacturers are editable by authenticated users." 
ON public.manufacturers FOR ALL 
USING (auth.role() = 'authenticated');

-- 2. Alter Products Table (Add Intelligence Fields)
-- Using IF NOT EXISTS safely by checking columns via DO block if needed, but standard ALTER TABLE ADD COLUMN IF NOT EXISTS works in PG 9.6+
ALTER TABLE public.products 
    ADD COLUMN IF NOT EXISTS manufacturer_id UUID REFERENCES public.manufacturers(id) ON DELETE SET NULL,
    ADD COLUMN IF NOT EXISTS product_type TEXT, -- 'system', 'component', 'accessory'
    ADD COLUMN IF NOT EXISTS system_category TEXT, -- 'electrical', 'plumbing', 'interior', 'exterior', 'suspension', 'hvac'
    ADD COLUMN IF NOT EXISTS dimensions_mm JSONB, -- { "length": 0, "width": 0, "height": 0 }
    ADD COLUMN IF NOT EXISTS install_location TEXT, -- 'floor', 'wall', 'roof', 'exterior', 'interior', 'underbody'
    ADD COLUMN IF NOT EXISTS power_draw_w NUMERIC,
    ADD COLUMN IF NOT EXISTS compatibility_tags JSONB DEFAULT '[]'::jsonb, -- e.g., ["sprinter", "crafter", "12v"]
    ADD COLUMN IF NOT EXISTS install_complexity TEXT, -- 'beginner', 'intermediate', 'advanced', 'professional'
    ADD COLUMN IF NOT EXISTS usage_category JSONB DEFAULT '[]'::jsonb, -- ["off-grid", "expedition", "stealth", "family", "commercial"]
    ADD COLUMN IF NOT EXISTS bom_category TEXT,
    ADD COLUMN IF NOT EXISTS planner_placement_hint TEXT,
    ADD COLUMN IF NOT EXISTS placeholder_3d_id TEXT;

-- Create an index on manufacturer_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_products_manufacturer_id ON public.products(manufacturer_id);
