/**
 * Amplios DB Migration Runner
 * Connects directly to Supabase Postgres and runs the migration.
 * 
 * Usage: node scripts/run-migration.js [DB_PASSWORD]
 */
const { Client } = require('pg');

const PROJECT_REF = 'hkdibbwqlxfezismkaxu';
const DB_PASSWORD = process.argv[2];

if (!DB_PASSWORD) {
  console.error('❌ Usage: node scripts/run-migration.js YOUR_DB_PASSWORD');
  console.error('   Find your DB password in: Supabase dashboard → Settings → Database → Connection string');
  process.exit(1);
}

const client = new Client({
  host: `db.${PROJECT_REF}.supabase.co`,
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: DB_PASSWORD,
  ssl: { rejectUnauthorized: false },
});

const MIGRATION = `
-- 1. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  is_admin boolean default false,
  stripe_customer_id text unique,
  stripe_subscription_id text unique,
  subscription_status text check (subscription_status in ('active', 'trialing', 'past_due', 'canceled', 'unpaid', 'incomplete', 'incomplete_expired')),
  subscription_tier text check (subscription_tier in ('free', 'pro', 'elite')) default 'free',
  current_period_end timestamptz,
  cancel_at_period_end boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2. RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can view own profile') THEN
    CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can update own profile') THEN
    CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
  END IF;
END $$;

-- 3. AUTO-CREATE PROFILE ON SIGNUP TRIGGER
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (new.id, new.email)
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 4. BUILD KITS EXTENSION
ALTER TABLE public.build_kits 
  ADD COLUMN IF NOT EXISTS kit_type text default 'physical' check (kit_type in ('physical', 'digital', 'hybrid')),
  ADD COLUMN IF NOT EXISTS digital_resource_ids jsonb default '[]'::jsonb;

-- 5. ROADMAP TABLE
CREATE TABLE IF NOT EXISTS public.roadmap_opportunities (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  category text check (category in ('feature', 'revenue', 'integration', 'content', 'other')) default 'feature',
  priority text check (priority in ('low', 'medium', 'high', 'critical')) default 'medium',
  status text check (status in ('idea', 'planned', 'in_progress', 'completed', 'archived')) default 'idea',
  estimated_impact text,
  related_module text,
  notes text,
  created_by uuid references auth.users(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

ALTER TABLE public.roadmap_opportunities ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'roadmap_opportunities' AND policyname = 'Admins can manage roadmap') THEN
    CREATE POLICY "Admins can manage roadmap" ON public.roadmap_opportunities FOR ALL USING (true);
  END IF;
END $$;

-- 6. BACKFILL EXISTING USERS INTO PROFILES
INSERT INTO public.profiles (id, email)
SELECT id, email FROM auth.users
ON CONFLICT (id) DO NOTHING;

-- 7. GRANT ADMIN TO PETE'S ACCOUNTS
UPDATE public.profiles SET is_admin = true 
WHERE email IN ('petecurrey@gmail.com', 'pete@avorria.com');
`;

async function run() {
  try {
    console.log('🔌 Connecting to Supabase Postgres...');
    await client.connect();
    console.log('✅ Connected.\n⚡ Running migration...\n');
    
    await client.query(MIGRATION);
    
    console.log('✅ Migration complete!\n');
    
    // Verify
    const { rows: profiles } = await client.query('SELECT email, is_admin, subscription_tier FROM public.profiles ORDER BY created_at;');
    console.log('📋 Profiles table contents:');
    profiles.forEach(r => console.log(`  - ${r.email} | admin: ${r.is_admin} | tier: ${r.subscription_tier}`));
    
    const { rows: roadmap } = await client.query('SELECT count(*) FROM public.roadmap_opportunities;');
    console.log(`\n📋 Roadmap table: ${roadmap[0].count} rows`);
    
  } catch (err) {
    console.error('❌ Migration error:', err.message);
  } finally {
    await client.end();
    console.log('\n🔌 Connection closed.');
  }
}

run();
