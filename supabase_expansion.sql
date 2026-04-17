-- 8. SUPPLIERS TABLE
CREATE TABLE IF NOT EXISTS suppliers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  website text,
  contact_email text,
  contact_phone text,
  status text DEFAULT 'potential', -- 'active_trade', 'applied', 'potential', 'on_hold'
  categories text[], -- Array of strings
  description text,
  lead_count integer DEFAULT 0,
  last_lead_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- 9. LEADS TABLE
CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  first_name text,
  last_name text,
  source text, -- 'newsletter', 'contact_form', 'quote'
  status text DEFAULT 'new', -- 'new', 'nurture', 'converted', 'lost'
  interests text[],
  build_readiness text, -- 'planning', 'buying', 'building'
  notes text,
  created_at timestamptz DEFAULT now()
);

-- 10. SITE PROMOTIONS
CREATE TABLE IF NOT EXISTS site_promotions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  banner_type text DEFAULT 'info', -- 'sale', 'warning', 'info'
  status text DEFAULT 'active', -- 'active', 'inactive'
  priority integer DEFAULT 0,
  link_url text,
  start_at timestamptz,
  end_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- 11. SITE METADATA (SEO Overrides)
CREATE TABLE IF NOT EXISTS site_metadata (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  route_path text UNIQUE NOT NULL,
  title text,
  description text,
  keywords text[],
  no_index boolean DEFAULT false,
  og_image text,
  created_at timestamptz DEFAULT now()
);

-- 12. JOURNAL POSTS
CREATE TABLE IF NOT EXISTS journal_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text,
  content text,
  featured_image text,
  category text,
  author_name text DEFAULT 'Pete Currey',
  status text DEFAULT 'draft', -- 'draft', 'published', 'archived'
  reading_time_minutes integer,
  published_at timestamptz,
  seo_title text,
  seo_description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 13. ADMIN PROFILES
CREATE TABLE IF NOT EXISTS admin_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  role text DEFAULT 'admin', -- 'super_admin', 'admin', 'editor'
  full_name text,
  created_at timestamptz DEFAULT now()
);

-- 14. FK UPDATES FOR PRODUCTS
ALTER TABLE products ADD COLUMN IF NOT EXISTS supplier_id uuid REFERENCES suppliers(id);
ALTER TABLE products ADD COLUMN IF NOT EXISTS affiliate_url text;

-- SEED ENERGY SOLUTIONS
INSERT INTO suppliers (name, website, status, categories, description)
VALUES (
  'Energy Solutions',
  'https://energysolutions.uk.com',
  'active_trade',
  ARRAY['Electrical', 'Systems', 'Victron', 'Power Distribution'],
  'Specialist in off-grid power systems, Victron Energy technical distributor.'
) ON CONFLICT (name) DO NOTHING;
