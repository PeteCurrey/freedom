const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://hkdibbwqlxfezismkaxu.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhrZGliYndxbHhmZXppc21rYXh1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjM0NTQ2MiwiZXhwIjoyMDkxOTIxNDYyfQ.Gkwt1X7anNOUTXFzDzJuWEnFdik5VV8hOrLcMJO6Ejo'
);

// Run SQL via the REST API using rpc
async function runSQL(sql) {
  const res = await supabase.rpc('exec_sql', { query: sql });
  if (res.error) {
    // If exec_sql doesn't exist, try the query directly
    console.error('RPC error:', res.error.message);
  }
  return res;
}

async function run() {
  console.log('Creating suppliers table...');
  const { error: suppErr } = await supabase.from('suppliers').select('id').limit(1);
  if (suppErr && suppErr.code === '42P01') {
    console.log('suppliers table does not exist — create it via Supabase Dashboard SQL editor with:');
    console.log(`
CREATE TABLE IF NOT EXISTS public.suppliers (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  website text,
  account_number text,
  contact_name text,
  contact_email text,
  contact_phone text,
  payment_terms text,
  lead_time text,
  min_order_value integer DEFAULT 0,
  discount_tier text,
  notes text,
  price_list_updated_at timestamptz,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
    `);
  } else {
    console.log('suppliers table exists ✓');
  }

  console.log('Checking brands table...');
  const { error: brandErr } = await supabase.from('brands').select('id').limit(1);
  if (brandErr && brandErr.code === '42P01') {
    console.log('brands table does not exist — create it via Supabase Dashboard SQL editor with:');
    console.log(`
CREATE TABLE IF NOT EXISTS public.brands (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL UNIQUE,
  slug text NOT NULL UNIQUE,
  logo_url text,
  country_of_origin text,
  description text,
  website_url text,
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
    `);
  } else {
    console.log('brands table exists ✓');
  }

  // Check products columns
  const { data: p } = await supabase.from('products').select('*').limit(1);
  if (p && p.length > 0) {
    const cols = Object.keys(p[0]);
    const missing = ['internal_sku', 'barcode', 'status', 'supplier_id', 'brand_id', 'vat_rate', 'cost_price', 'allow_backorder', 'low_stock_threshold', 'lead_time', 'meta_title', 'meta_description', 'visibility', 'tags']
      .filter(c => !cols.includes(c));
    if (missing.length > 0) {
      console.log('Missing product columns — add via Supabase SQL editor:');
      missing.forEach(col => {
        const defs = {
          internal_sku: `ALTER TABLE products ADD COLUMN IF NOT EXISTS internal_sku text;`,
          barcode: `ALTER TABLE products ADD COLUMN IF NOT EXISTS barcode text;`,
          status: `ALTER TABLE products ADD COLUMN IF NOT EXISTS status text DEFAULT 'draft';`,
          supplier_id: `ALTER TABLE products ADD COLUMN IF NOT EXISTS supplier_id uuid REFERENCES suppliers(id);`,
          brand_id: `ALTER TABLE products ADD COLUMN IF NOT EXISTS brand_id uuid REFERENCES brands(id);`,
          vat_rate: `ALTER TABLE products ADD COLUMN IF NOT EXISTS vat_rate integer DEFAULT 20;`,
          cost_price: `ALTER TABLE products ADD COLUMN IF NOT EXISTS cost_price integer DEFAULT 0;`,
          allow_backorder: `ALTER TABLE products ADD COLUMN IF NOT EXISTS allow_backorder boolean DEFAULT false;`,
          low_stock_threshold: `ALTER TABLE products ADD COLUMN IF NOT EXISTS low_stock_threshold integer DEFAULT 5;`,
          lead_time: `ALTER TABLE products ADD COLUMN IF NOT EXISTS lead_time text;`,
          meta_title: `ALTER TABLE products ADD COLUMN IF NOT EXISTS meta_title text;`,
          meta_description: `ALTER TABLE products ADD COLUMN IF NOT EXISTS meta_description text;`,
          visibility: `ALTER TABLE products ADD COLUMN IF NOT EXISTS visibility text DEFAULT 'public';`,
          tags: `ALTER TABLE products ADD COLUMN IF NOT EXISTS tags text[];`,
        };
        console.log('  ', defs[col]);
      });
    } else {
      console.log('All product columns exist ✓');
    }
  }

  // Seed initial suppliers
  const suppliers = [
    { name: 'Grassroutes Leisure', website: 'https://grassroutesleisure.co.uk', notes: '148-page catalogue, 1240+ SKUs. Contact for image ZIP + CSV export.' },
    { name: 'Fogstar', website: 'https://www.fogstar.co.uk', notes: 'LiFePO4 batteries. Trade discount applies as %. Download images from product pages.' },
    { name: 'Energy Solutions (Victron)', website: 'https://www.energy-solutions.co.uk', notes: 'Register at professional.victronenergy.com for full product database + pricing.' },
    { name: '12V Planet', website: 'https://www.12vplanet.co.uk', notes: 'Trade account pricing available via portal.' },
    { name: 'Nomadic Leisure', website: 'https://nomadic-leisure.co.uk', notes: 'Request trade price list.' },
  ];

  for (const s of suppliers) {
    const { error } = await supabase.from('suppliers').upsert(s, { onConflict: 'name' });
    if (error) console.error('Supplier upsert error:', error.message);
    else console.log(`Seeded supplier: ${s.name} ✓`);
  }

  // Seed initial brands
  const brands = [
    { name: 'Victron Energy', slug: 'victron-energy', country_of_origin: 'Netherlands', website_url: 'https://www.victronenergy.com' },
    { name: 'Dometic', slug: 'dometic', country_of_origin: 'Sweden', website_url: 'https://www.dometic.com' },
    { name: 'Truma', slug: 'truma', country_of_origin: 'Germany', website_url: 'https://www.truma.com' },
    { name: 'Propex', slug: 'propex', country_of_origin: 'UK', website_url: 'https://www.propexheatsource.co.uk' },
    { name: 'Eberspächer', slug: 'eberspacher', country_of_origin: 'Germany', website_url: 'https://www.eberspacher.com' },
    { name: 'Fogstar', slug: 'fogstar', country_of_origin: 'UK', website_url: 'https://www.fogstar.co.uk' },
    { name: 'Sargent', slug: 'sargent', country_of_origin: 'UK', website_url: 'https://www.sargent.co.uk' },
    { name: 'Sterling Power', slug: 'sterling-power', country_of_origin: 'UK', website_url: 'https://www.sterling-power.com' },
    { name: 'CAN', slug: 'can', country_of_origin: 'Italy', website_url: 'https://www.can-group.it' },
    { name: 'MaxxAir', slug: 'maxxair', country_of_origin: 'USA', website_url: 'https://www.maxxair.com' },
    { name: 'Fiamma', slug: 'fiamma', country_of_origin: 'Italy', website_url: 'https://www.fiamma.com' },
    { name: 'Thule', slug: 'thule', country_of_origin: 'Sweden', website_url: 'https://www.thule.com' },
    { name: 'Webasto', slug: 'webasto', country_of_origin: 'Germany', website_url: 'https://www.webasto-comfort.com' },
    { name: 'Whale', slug: 'whale', country_of_origin: 'UK', website_url: 'https://www.whalepumps.com' },
  ];

  for (const b of brands) {
    const { error } = await supabase.from('brands').upsert(b, { onConflict: 'slug' });
    if (error) console.error('Brand upsert error:', error.message);
    else console.log(`Seeded brand: ${b.name} ✓`);
  }

  console.log('\nDone. Copy any SQL above into the Supabase SQL Editor to create missing tables/columns.');
}

run().catch(console.error);
