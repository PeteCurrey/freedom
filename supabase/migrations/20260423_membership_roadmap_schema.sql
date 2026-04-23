-- STRIPE SUBSCRIPTIONS & MEMBERSHIPS SCHEMA EXPANSION

-- 1. PROFILES (Extending auth.users to store subscription state)
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  is_admin boolean default false,
  
  -- Subscription details
  stripe_customer_id text unique,
  stripe_subscription_id text unique,
  subscription_status text check (subscription_status in ('active', 'trialing', 'past_due', 'canceled', 'unpaid', 'incomplete', 'incomplete_expired')),
  subscription_tier text check (subscription_tier in ('free', 'pro', 'elite')) default 'free',
  current_period_end timestamptz,
  cancel_at_period_end boolean default false,
  
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- RLS for profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Function to handle new user signup automatically
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (new.id, new.email);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 2. BUILD KIT EXTENSION
-- Let's ensure build kits have a type and can link to digital downloads
ALTER TABLE public.build_kits 
  ADD COLUMN IF NOT EXISTS kit_type text default 'physical' check (kit_type in ('physical', 'digital', 'hybrid')),
  ADD COLUMN IF NOT EXISTS digital_resource_ids jsonb default '[]'::jsonb;

-- 3. ROADMAP / OPPORTUNITIES MODULE
CREATE TABLE IF NOT EXISTS public.roadmap_opportunities (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  category text check (category in ('feature', 'revenue', 'integration', 'content', 'other')) default 'feature',
  priority text check (priority in ('low', 'medium', 'high', 'critical')) default 'medium',
  status text check (status in ('idea', 'planned', 'in_progress', 'completed', 'archived')) default 'idea',
  estimated_impact text, -- e.g., '+$5k MRR'
  related_module text, -- e.g., 'planner', 'store'
  notes text,
  created_by uuid references auth.users(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- RLS for roadmap
ALTER TABLE public.roadmap_opportunities ENABLE ROW LEVEL SECURITY;
-- Only admins should access this (enforced in UI, but simple policy here)
CREATE POLICY "Admins can manage roadmap" ON public.roadmap_opportunities FOR ALL USING (
  exists (select 1 from public.profiles where id = auth.uid() and is_admin = true) OR
  exists (select 1 from public.admin_profiles where email = (select email from auth.users where id = auth.uid()))
);
