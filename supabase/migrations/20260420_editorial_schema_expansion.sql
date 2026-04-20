-- ==============================================================
-- FREEDOM PLATFORM: EDITORIAL & VIDEO SYSTEM UPGRADE
-- ==============================================================

-- 1. ENHANCE PRODUCTS TABLE
DO $$ 
BEGIN
    -- Editorial Fields
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='products' AND column_name='is_editor_pick') THEN
        ALTER TABLE public.products ADD COLUMN is_editor_pick BOOLEAN DEFAULT false;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='products' AND column_name='sort_priority') THEN
        ALTER TABLE public.products ADD COLUMN sort_priority INTEGER DEFAULT 0;
    END IF;

    -- Video System Fields
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='products' AND column_name='video_enabled') THEN
        ALTER TABLE public.products ADD COLUMN video_enabled BOOLEAN DEFAULT false;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='products' AND column_name='video_source') THEN
        ALTER TABLE public.products ADD COLUMN video_source TEXT; -- 'youtube', 'vimeo', 'upload'
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='products' AND column_name='video_url') THEN
        ALTER TABLE public.products ADD COLUMN video_url TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='products' AND column_name='video_title') THEN
        ALTER TABLE public.products ADD COLUMN video_title TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='products' AND column_name='video_description') THEN
        ALTER TABLE public.products ADD COLUMN video_description TEXT;
    END IF;
END $$;

-- 2. ENHANCE CATEGORIES TABLE
DO $$ 
BEGIN
    -- Subcategory hints for editorial grid
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='product_categories' AND column_name='subcategories') THEN
        ALTER TABLE public.product_categories ADD COLUMN subcategories JSONB DEFAULT '[]'::jsonb;
    END IF;
END $$;

-- 3. REGISTER SECURITY & TRACKING SYSTEM
INSERT INTO public.build_systems (slug, name, tagline, description, icon, published, sort_order)
VALUES (
    'security-tracking',
    'Security & Tracking',
    'Protect your investment.',
    'Professional-grade locks, alarm systems, and off-grid tracking technology.',
    'Shield',
    true,
    90
) ON CONFLICT (slug) DO NOTHING;

-- 4. UPDATE SEED DATA FOR EDITORIAL EXPERIENCE
-- Seed subcategories for the new grid
UPDATE public.product_categories SET subcategories = '[{"name": "Inverters", "slug": "inverters"}, {"name": "Batteries", "slug": "batteries"}, {"name": "Solar", "slug": "solar"}]' WHERE slug = 'power-systems';
UPDATE public.product_categories SET subcategories = '[{"name": "Diesel Heaters", "slug": "diesel-heaters"}, {"name": "Combi Boilers", "slug": "combi-boilers"}, {"name": "AC Units", "slug": "ac-units"}]' WHERE slug = 'climate-control';
UPDATE public.product_categories SET subcategories = '[{"name": "Internal Tanks", "slug": "internal-tanks"}, {"name": "Filtration", "slug": "filtration"}, {"name": "Shower Kits", "slug": "shower-kits"}]' WHERE slug = 'water-plumbing';
UPDATE public.product_categories SET subcategories = '[{"name": "Sound Deadening", "slug": "sound-deadening"}, {"name": "PIR Board", "slug": "pir-board"}, {"name": "Lining Carpet", "slug": "lining-carpet"}]' WHERE slug = 'insulation-build';
UPDATE public.product_categories SET subcategories = '[{"name": "Skylights", "slug": "skylights"}, {"name": "Bonded Glass", "slug": "bonded-glass"}, {"name": "Bunk Windows", "slug": "bunk-windows"}]' WHERE slug = 'windows-ventilation';
UPDATE public.product_categories SET subcategories = '[{"name": "Wheel Carriers", "slug": "wheel-carriers"}, {"name": "Ladders", "slug": "ladders"}, {"name": "Side Steps", "slug": "side-steps"}]' WHERE slug = 'chassis-exterior';
UPDATE public.product_categories SET subcategories = '[{"name": "GPS Trackers", "slug": "trackers"}, {"name": "Deadlocks", "slug": "deadlocks"}, {"name": "Alarm Systems", "slug": "alarms"}]' WHERE slug = 'security-monitoring';

-- Set a few Editor's Picks
UPDATE public.products SET is_editor_pick = true WHERE slug IN ('victron-multiplus-ii-3000', 'dometic-cfx3-45', 'maxxfan-deluxe-transparent');

-- Note: Storage buckets for 'product-media' should be created via the Supabase Dashboard
-- or via an API call in the bootstrap script if available.
