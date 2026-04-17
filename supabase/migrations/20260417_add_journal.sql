-- Migration: Add Journal System
-- Description: Creates the foundation for the 'Amplios Journal' editorial platform.

CREATE TABLE IF NOT EXISTS public.journal_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    featured_image TEXT,
    author_name TEXT DEFAULT 'Pete Currey',
    author_role TEXT DEFAULT 'Founder // Lead Engineer',
    category TEXT DEFAULT 'Technical Guide',
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    reading_time_minutes INTEGER DEFAULT 5,
    seo_title TEXT,
    seo_description TEXT,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- RLS Policies
ALTER TABLE public.journal_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Journal posts are viewable by everyone" 
ON public.journal_posts FOR SELECT 
USING (status = 'published');

CREATE POLICY "Journal posts are manageable by admins" 
ON public.journal_posts FOR ALL 
USING (auth.jwt() ->> 'email' IN (SELECT email FROM public.admin_users));

-- Create index for performance
CREATE INDEX IF NOT EXISTS journal_posts_slug_idx ON public.journal_posts (slug);
CREATE INDEX IF NOT EXISTS journal_posts_status_idx ON public.journal_posts (status);
