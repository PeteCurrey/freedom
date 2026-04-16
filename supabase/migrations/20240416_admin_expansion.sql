-- Admin & RBAC Tables
CREATE TABLE IF NOT EXISTS admin_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  role text DEFAULT 'admin' CHECK (role IN ('super_admin', 'admin', 'editor')),
  full_name text,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Site Configuration (CMS)
CREATE TABLE IF NOT EXISTS site_config (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value jsonb NOT NULL,
  description text,
  updated_at timestamptz DEFAULT now()
);

-- SEO Research Hub
CREATE TABLE IF NOT EXISTS seo_research (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL, -- 'keyword', 'competitor', 'gap'
  query text NOT NULL,
  results jsonb DEFAULT '{}',
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Content Queue (Blog, Social, Newsletter)
CREATE TABLE IF NOT EXISTS content_queue (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL, -- 'blog', 'social', 'newsletter', 'landing_page'
  title text NOT NULL,
  content text,
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'review', 'published', 'scheduled')),
  platform text, -- 'site', 'instagram', 'twitter', 'newsletter'
  ai_metadata jsonb DEFAULT '{}',
  published_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Affiliate Link Management
CREATE TABLE IF NOT EXISTS affiliate_management (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  network text DEFAULT 'ebay',
  base_url text NOT NULL,
  tracking_id text,
  current_performance jsonb DEFAULT '{}',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Ensure Pete curated as Super Admin
INSERT INTO admin_profiles (email, role, full_name)
VALUES ('pete@avorria.com', 'super_admin', 'Pete Currey')
ON CONFLICT (email) DO NOTHING;

-- Admin Integration Settings (Encrypted or just stored for now)
CREATE TABLE IF NOT EXISTS admin_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service text UNIQUE NOT NULL, -- 'anthropic', 'dataforseo', 'google_cloud'
  api_key text,
  config jsonb DEFAULT '{}',
  updated_at timestamptz DEFAULT now()
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
