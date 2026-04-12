-- DIY Motorhomes - Initial Schema

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. VEHICLES TABLE
create table if not exists public.vehicles (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  name text not null,
  manufacturer text not null,
  tagline text,
  description text,
  hero_image text,
  gallery jsonb default '[]'::jsonb,
  configurations jsonb default '[]'::jsonb,
  engine_options jsonb default '[]'::jsonb,
  drivetrain_options jsonb default '[]'::jsonb,
  starting_price_gbp integer,
  pros jsonb default '[]'::jsonb,
  cons jsonb default '[]'::jsonb,
  best_for text,
  watch_out_for text,
  conversion_rating integer check (conversion_rating >= 1 and conversion_rating <= 10),
  seo_title text,
  seo_description text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  published boolean default false,
  sort_order integer default 0
);

-- 2. PRODUCT CATEGORIES
create table if not exists public.product_categories (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  name text not null,
  description text,
  image text,
  parent_id uuid references public.product_categories(id),
  sort_order integer default 0
);

-- 3. PRODUCTS
create table if not exists public.products (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  name text not null,
  brand text,
  sku text,
  description text,
  short_description text,
  price_gbp integer not null, -- stored in pence
  compare_at_price integer,
  cost_price integer,
  images jsonb default '[]'::jsonb,
  category_id uuid references public.product_categories(id),
  system_ids jsonb default '[]'::jsonb,
  vehicle_compatibility jsonb default '[]'::jsonb,
  specs jsonb default '{}'::jsonb,
  weight_grams integer,
  stock_quantity integer default 0,
  is_featured boolean default false,
  is_active boolean default true,
  seo_title text,
  seo_description text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 4. BUILD SYSTEMS
create table if not exists public.build_systems (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  name text not null,
  tagline text,
  description text,
  icon text,
  hero_image text,
  tiers jsonb default '{}'::jsonb,
  common_mistakes jsonb default '[]'::jsonb,
  seo_title text,
  seo_description text,
  sort_order integer default 0,
  published boolean default false
);

-- 5. RESOURCES
create table if not exists public.resources (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  title text not null,
  excerpt text,
  content text,
  featured_image text,
  category text, -- guide, video, download, calculator
  system_ids jsonb default '[]'::jsonb,
  vehicle_ids jsonb default '[]'::jsonb,
  difficulty text, -- beginner, intermediate, advanced
  reading_time_minutes integer,
  author text,
  products_mentioned jsonb default '[]'::jsonb,
  seo_title text,
  seo_description text,
  published boolean default false,
  published_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 6. BUILD KITS
create table if not exists public.build_kits (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  name text not null,
  description text,
  image text,
  product_ids jsonb default '[]'::jsonb,
  kit_price_gbp integer,
  savings_percentage integer,
  system_id uuid references public.build_systems(id),
  sort_order integer default 0,
  is_active boolean default true
);

-- 7. ORDERS
create table if not exists public.orders (
  id uuid primary key default uuid_generate_v4(),
  order_number text unique not null,
  user_id uuid references auth.users(id),
  email text not null,
  status text default 'pending',
  items jsonb default '[]'::jsonb,
  subtotal integer,
  vat integer,
  shipping integer,
  total integer,
  shipping_address jsonb,
  billing_address jsonb,
  stripe_payment_intent_id text,
  tracking_number text,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 8. BUILD PLANS (ENHANCED)
create table if not exists public.build_plans (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id),
  name text,
  vehicle_id uuid references public.vehicles(id),
  configuration_id text, -- unique ID for the wheelbase/roof combo
  layout_id text, -- ID of the selected floor plan template
  system_tiers jsonb default '{
    "electrical": "basic",
    "heating": "none",
    "water": "basic",
    "insulation": "basic",
    "gas": "none"
  }'::jsonb,
  add_ons jsonb default '[]'::jsonb,
  power_budget_detailed jsonb default '{
    "consumers": [],
    "total_daily_ah": 0,
    "autonomy_days": 0
  }'::jsonb,
  total_weight_grams integer default 0,
  total_cost_gbp integer default 0, -- stored in pence
  share_token text unique default encode(gen_random_bytes(12), 'hex'),
  is_public boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 8.1 BLUEPRINT PURCHASES
create table if not exists public.blueprint_purchases (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id),
  plan_id uuid references public.build_plans(id),
  tier text not null check (tier in ('starter', 'full', 'master')),
  stripe_session_id text unique,
  stripe_payment_intent_id text unique,
  amount_paid_gbp integer not null, -- stored in pence
  status text default 'pending' check (status in ('pending', 'completed', 'failed')),
  generated_pdf_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 9. SHOWCASE BUILDS
create table if not exists public.showcase_builds (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id),
  builder_name text,
  location text,
  vehicle_id uuid references public.vehicles(id),
  title text,
  story text,
  images jsonb default '[]'::jsonb,
  specs_summary jsonb default '{}'::jsonb,
  build_duration text,
  budget_range text,
  status text default 'pending',
  featured boolean default false,
  created_at timestamptz default now()
);

-- 10. NEWSLETTER SUBSCRIBERS
create table if not exists public.newsletter_subscribers (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  subscribed_at timestamptz default now(),
  source text
);

-- 11. REVIEWS
create table if not exists public.reviews (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid references public.products(id),
  user_id uuid references auth.users(id),
  author_name text,
  rating integer check (rating >= 1 and rating <= 5),
  title text,
  body text,
  verified_purchase boolean default false,
  status text default 'pending',
  created_at timestamptz default now()
);

-- RLS POLICIES

-- Vehicles, Systems, Products, Categories, Resources: Public Read
alter table public.vehicles enable row level security;
create policy "Public vehicles access" on public.vehicles for select using (published = true);

alter table public.build_systems enable row level security;
create policy "Public systems access" on public.build_systems for select using (published = true);

alter table public.products enable row level security;
create policy "Public products access" on public.products for select using (is_active = true);

alter table public.product_categories enable row level security;
create policy "Public categories access" on public.product_categories for select using (true);

alter table public.resources enable row level security;
create policy "Public resources access" on public.resources for select using (published = true);

alter table public.build_kits enable row level security;
create policy "Public kits access" on public.build_kits for select using (is_active = true);

-- Orders: Owner access
alter table public.orders enable row level security;
create policy "Owners can view orders" on public.orders for select using (auth.uid() = user_id);

-- Build Plans: Owner access
alter table public.build_plans enable row level security;
create policy "Owners can crud plans" on public.build_plans for all using (auth.uid() = user_id);
create policy "Public can view public plans" on public.build_plans for select using (is_public = true);

-- Blueprint Purchases: Owner access
alter table public.blueprint_purchases enable row level security;
create policy "Users can view their own purchases" on public.blueprint_purchases for select using (auth.uid() = user_id);

-- Showcase Builds: Public Read (Approved)
alter table public.showcase_builds enable row level security;
create policy "Public approved showcase" on public.showcase_builds for select using (status = 'approved');
create policy "Users can submit showcase" on public.showcase_builds for insert with check (auth.role() = 'authenticated');

-- Reviews: Public Read (Approved)
alter table public.reviews enable row level security;
create policy "Public approved reviews" on public.reviews for select using (status = 'approved');
create policy "Users can submit reviews" on public.reviews for insert with check (auth.role() = 'authenticated');
