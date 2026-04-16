-- Expand showcase_builds for technical depth and SEO
ALTER TABLE public.showcase_builds ADD COLUMN IF NOT EXISTS slug text UNIQUE;
ALTER TABLE public.showcase_builds ADD COLUMN IF NOT EXISTS hero_image text;
ALTER TABLE public.showcase_builds ADD COLUMN IF NOT EXISTS vehicle_model text;
ALTER TABLE public.showcase_builds ADD COLUMN IF NOT EXISTS chassis_type text;
ALTER TABLE public.showcase_builds ADD COLUMN IF NOT EXISTS year_completed integer;

-- Update existing records to have a slug if they don't (simplified)
UPDATE public.showcase_builds SET slug = lower(replace(title, ' ', '-')) WHERE slug IS NULL;
