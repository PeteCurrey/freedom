/**
 * Freedom Platform — Database Migration Runner
 * 
 * This script initializes all pending database tables via the Supabase Management API.
 * 
 * HOW TO RUN:
 *   1. Get your Supabase Personal Access Token:
 *      → Go to: https://supabase.com/dashboard/account/tokens
 *      → Click "Generate new token"
 *      → Copy the token
 * 
 *   2. Run this script:
 *      node scratch_test_db.js YOUR_TOKEN_HERE
 * 
 *   OR run inline:
 *      node scratch_test_db.js eyJhbGci...
 */

const PROJECT_REF = 'hkdibbwqlxfezismkaxu';
const ACCESS_TOKEN = process.argv[2];

if (!ACCESS_TOKEN) {
  console.error('\nERROR: No access token provided.');
  console.error('Usage: node scratch_test_db.js YOUR_SUPABASE_ACCESS_TOKEN\n');
  console.error('Get your token at: https://supabase.com/dashboard/account/tokens\n');
  process.exit(1);
}

const API_URL = `https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`;

async function runSQL(label, sql) {
  console.log(`\n⚙  Running: ${label}...`);
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: sql }),
  });

  const text = await res.text();
  if (!res.ok) {
    console.error(`  ✗ FAILED [${res.status}]: ${text}`);
    return false;
  }
  console.log(`  ✓ Done`);
  return true;
}

async function migrate() {
  console.log('\n╔══════════════════════════════════════════╗');
  console.log('║  FREEDOM PLATFORM — DB MIGRATION RUNNER  ║');
  console.log('╚══════════════════════════════════════════╝\n');

  // ─────────────────────────────────────────────
  // MIGRATION 1: Vehicle Marketplaces (Affiliate Links)
  // ─────────────────────────────────────────────
  await runSQL('Create vehicle_marketplaces table', `
    CREATE TABLE IF NOT EXISTS public.vehicle_marketplaces (
      id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
      vehicle_id text NOT NULL,
      marketplace_name text NOT NULL,
      affiliate_url text NOT NULL,
      icon_type text DEFAULT 'external',
      is_active boolean DEFAULT true,
      created_at timestamptz DEFAULT timezone('utc'::text, now()) NOT NULL
    );
  `);

  await runSQL('Enable RLS on vehicle_marketplaces', `
    ALTER TABLE public.vehicle_marketplaces ENABLE ROW LEVEL SECURITY;
  `);

  await runSQL('Create RLS policy for vehicle_marketplaces', `
    DO $$ BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'vehicle_marketplaces' 
        AND policyname = 'Public read access for active marketplaces'
      ) THEN
        CREATE POLICY "Public read access for active marketplaces"
        ON public.vehicle_marketplaces FOR SELECT
        USING (is_active = true);
      END IF;
    END $$;
  `);

  await runSQL('Seed Mercedes Sprinter marketplace links', `
    INSERT INTO public.vehicle_marketplaces (vehicle_id, marketplace_name, affiliate_url, icon_type)
    VALUES
      ('mercedes-sprinter', 'eBay Motors UK', 'https://www.ebay.co.uk/b/Mercedes-Benz-Sprinter-Vans/177063?mkcid=1&mkrid=711-53200-19255-0&siteid=3&campid=5339063718&customid=market-hub&mkevt=1', 'ebay'),
      ('mercedes-sprinter', 'AutoTrader Vans', 'https://www.autotrader.co.uk/vans/used-vans/mercedes-benz/sprinter', 'autotrader'),
      ('mercedes-sprinter', 'Van Trader', 'https://sovrn.co/8jnot3i', 'vantrader')
    ON CONFLICT DO NOTHING;
  `);

  await runSQL('Seed VW Crafter marketplace links', `
    INSERT INTO public.vehicle_marketplaces (vehicle_id, marketplace_name, affiliate_url, icon_type)
    VALUES
      ('vw-crafter', 'eBay Motors UK', 'https://www.ebay.co.uk/b/Volkswagen-Crafter-Vans/177063?mkcid=1&mkrid=711-53200-19255-0&siteid=3&campid=5339063718&customid=market-hub&mkevt=1', 'ebay'),
      ('vw-crafter', 'AutoTrader Vans', 'https://www.autotrader.co.uk/vans/used-vans/volkswagen/crafter', 'autotrader')
    ON CONFLICT DO NOTHING;
  `);

  await runSQL('Seed Ford Transit marketplace links', `
    INSERT INTO public.vehicle_marketplaces (vehicle_id, marketplace_name, affiliate_url, icon_type)
    VALUES
      ('ford-transit', 'eBay Motors UK', 'https://www.ebay.co.uk/b/Ford-Transit-Vans/177063?mkcid=1&mkrid=711-53200-19255-0&siteid=3&campid=5339063718&customid=market-hub&mkevt=1', 'ebay'),
      ('ford-transit', 'AutoTrader Vans', 'https://www.autotrader.co.uk/vans/used-vans/ford/transit', 'autotrader')
    ON CONFLICT DO NOTHING;
  `);

  await runSQL('Seed Fiat Ducato marketplace links', `
    INSERT INTO public.vehicle_marketplaces (vehicle_id, marketplace_name, affiliate_url, icon_type)
    VALUES
      ('fiat-ducato', 'eBay Motors UK', 'https://www.ebay.co.uk/b/Fiat-Ducato-Vans/177063?mkcid=1&mkrid=711-53200-19255-0&siteid=3&campid=5339063718&customid=market-hub&mkevt=1', 'ebay'),
      ('fiat-ducato', 'AutoTrader Vans', 'https://www.autotrader.co.uk/vans/used-vans/fiat/ducato', 'autotrader'),
      ('fiat-ducato', 'Van Trader', 'https://sovrn.co/12rriq1', 'vantrader')
    ON CONFLICT DO NOTHING;
  `);

  await runSQL('Seed MAN TGE marketplace links', `
    INSERT INTO public.vehicle_marketplaces (vehicle_id, marketplace_name, affiliate_url, icon_type)
    VALUES
      ('man-tge', 'eBay Motors UK', 'https://www.ebay.co.uk/b/MAN-TGE-Vans/177063?mkcid=1&mkrid=711-53200-19255-0&siteid=3&campid=5339063718&customid=market-hub&mkevt=1', 'ebay'),
      ('man-tge', 'AutoTrader Vans', 'https://www.autotrader.co.uk/vans/used-vans/man/tge', 'autotrader'),
      ('man-tge', 'Van Trader', 'https://sovrn.co/11auwij', 'vantrader')
    ON CONFLICT DO NOTHING;
  `);

  await runSQL('Seed Iveco Daily marketplace links', `
    INSERT INTO public.vehicle_marketplaces (vehicle_id, marketplace_name, affiliate_url, icon_type)
    VALUES
      ('iveco-daily', 'eBay Motors UK', 'https://www.ebay.co.uk/b/Iveco-Daily-Vans/177063?mkcid=1&mkrid=711-53200-19255-0&siteid=3&campid=5339063718&customid=market-hub&mkevt=1', 'ebay'),
      ('iveco-daily', 'AutoTrader Vans', 'https://www.autotrader.co.uk/vans/used-vans/iveco/daily', 'autotrader')
    ON CONFLICT DO NOTHING;
  `);

  await runSQL('Seed Peugeot Boxer & Citroen Relay marketplace links', `
    INSERT INTO public.vehicle_marketplaces (vehicle_id, marketplace_name, affiliate_url, icon_type)
    VALUES
      ('peugeot-boxer', 'eBay Motors UK', 'https://www.ebay.co.uk/b/Peugeot-Boxer-Vans/177063?mkcid=1&mkrid=711-53200-19255-0&siteid=3&campid=5339063718&customid=market-hub&mkevt=1', 'ebay'),
      ('peugeot-boxer', 'AutoTrader Vans', 'https://www.autotrader.co.uk/vans/used-vans/peugeot/boxer', 'autotrader'),
      ('citroen-relay', 'eBay Motors UK', 'https://www.ebay.co.uk/b/Citroen-Relay-Vans/177063?mkcid=1&mkrid=711-53200-19255-0&siteid=3&campid=5339063718&customid=market-hub&mkevt=1', 'ebay'),
      ('citroen-relay', 'AutoTrader Vans', 'https://www.autotrader.co.uk/vans/used-vans/citroen/relay', 'autotrader')
    ON CONFLICT DO NOTHING;
  `);

  // ─────────────────────────────────────────────
  // MIGRATION 2: Payload Configurations (GVM Module)
  // ─────────────────────────────────────────────
  await runSQL('Create payload_configurations table', `
    CREATE TABLE IF NOT EXISTS public.payload_configurations (
      id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
      user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
      vehicle_name text NOT NULL DEFAULT 'My Base Build',
      base_specs jsonb NOT NULL DEFAULT '{}',
      items jsonb NOT NULL DEFAULT '[]',
      created_at timestamptz DEFAULT now(),
      updated_at timestamptz DEFAULT now()
    );
  `);

  await runSQL('Enable RLS on payload_configurations', `
    ALTER TABLE public.payload_configurations ENABLE ROW LEVEL SECURITY;
  `);

  await runSQL('Create RLS policy for payload_configurations', `
    DO $$ BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'payload_configurations' 
        AND policyname = 'Users can manage their own payload configs'
      ) THEN
        CREATE POLICY "Users can manage their own payload configs"
        ON public.payload_configurations FOR ALL
        USING (auth.uid() = user_id);
      END IF;
    END $$;
  `);

  // ─────────────────────────────────────────────
  // MIGRATION 3: Compliance Audits (previously required)
  // ─────────────────────────────────────────────
  await runSQL('Create compliance_audits table', `
    CREATE TABLE IF NOT EXISTS public.compliance_audits (
      id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
      user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
      project_name text NOT NULL DEFAULT 'Unnamed Build',
      responses jsonb NOT NULL DEFAULT '{}',
      audit_score integer DEFAULT 0,
      is_compliant boolean DEFAULT false,
      created_at timestamptz DEFAULT now(),
      updated_at timestamptz DEFAULT now()
    );
  `);

  await runSQL('Enable RLS on compliance_audits', `
    ALTER TABLE public.compliance_audits ENABLE ROW LEVEL SECURITY;
  `);

  await runSQL('Create RLS policy for compliance_audits', `
    DO $$ BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'compliance_audits' 
        AND policyname = 'Users manage own audits'
      ) THEN
        CREATE POLICY "Users manage own audits"
        ON public.compliance_audits FOR ALL
        USING (auth.uid() = user_id);
      END IF;
    END $$;
  `);

  console.log('\n╔══════════════════════════════════════════╗');
  console.log('║       ALL MIGRATIONS COMPLETE! ✓         ║');
  console.log('╚══════════════════════════════════════════╝\n');
  console.log('Tables initialized:');
  console.log('  ✓ public.vehicle_marketplaces  (affiliate links)');
  console.log('  ✓ public.payload_configurations (GVM module)');
  console.log('  ✓ public.compliance_audits      (compliance hub)\n');
}

migrate().catch(err => {
  console.error('\nFATAL:', err.message);
  process.exit(1);
});
