-- Migration: Marketing & SEO Power Tools
-- Description: Enables global banners and per-route metadata management.

-- Table for Site-wide Dynamic Metadata
CREATE TABLE IF NOT EXISTS public.site_metadata (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    route_path TEXT UNIQUE NOT NULL, -- e.g. '/', '/journal', '/vehicles/mercedes-sprinter'
    title TEXT,
    description TEXT,
    og_image TEXT,
    canonical_url TEXT,
    no_index BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table for Global Marketing Promotions
CREATE TABLE IF NOT EXISTS public.site_promotions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    content TEXT,
    banner_type TEXT DEFAULT 'header' CHECK (banner_type IN ('header', 'popup', 'product_badge')),
    status TEXT DEFAULT 'inactive' CHECK (status IN ('active', 'inactive')),
    start_date TIMESTAMP WITH TIME ZONE,
    end_date TIMESTAMP WITH TIME ZONE,
    priority INTEGER DEFAULT 0,
    link_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- RLS Policies
ALTER TABLE public.site_metadata ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_promotions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Metadata is public" ON public.site_metadata FOR SELECT USING (true);
CREATE POLICY "Promotions are public" ON public.site_promotions FOR SELECT USING (true);

CREATE POLICY "Admins manage metadata" ON public.site_metadata FOR ALL USING (auth.jwt() ->> 'email' IN (SELECT email FROM public.admin_users));
CREATE POLICY "Admins manage promotions" ON public.site_promotions FOR ALL USING (auth.jwt() ->> 'email' IN (SELECT email FROM public.admin_users));
