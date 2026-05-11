-- SEO Suite Expansion Migration
-- Adds advanced SEO and Social Graph metadata to products

ALTER TABLE public.products
ADD COLUMN IF NOT EXISTS focus_keyword text,
ADD COLUMN IF NOT EXISTS og_image text,
ADD COLUMN IF NOT EXISTS og_title text,
ADD COLUMN IF NOT EXISTS og_description text,
ADD COLUMN IF NOT EXISTS canonical_url text,
ADD COLUMN IF NOT EXISTS robots_index boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS robots_follow boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS structured_data jsonb DEFAULT '{}'::jsonb;

-- Ensure seo_title and seo_description exist (mapping meta_title/meta_description if needed)
-- (The existing schema had seo_title/seo_description, but let's be sure)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='products' AND column_name='meta_title') THEN
        ALTER TABLE public.products RENAME COLUMN seo_title TO meta_title;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='products' AND column_name='meta_description') THEN
        ALTER TABLE public.products RENAME COLUMN seo_description TO meta_description;
    END IF;
END $$;
