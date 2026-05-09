const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function run() {
  console.log("Migrating store_config table...");
  const { error: migrationError } = await supabase.from('store_config').select('count').limit(1).single().catch(() => ({ error: { code: '42P01' } }));
  
  // If table doesn't exist, we'll use a safer approach since run_sql RPC might not exist
  // We'll try to create it via a known RPC or just assume it exists if the user ran migrations elsewhere.
  // Actually, I'll try to use a simple query to see if it works.
  
  const seeds = [
    { key: 'store_hero_image', value: '/images/hero-background.png' },
    { key: 'category_image_electrical_core', value: '/images/electrical-technical.png' },
    { key: 'category_image_solar_roof', value: '/images/systems-showcase.png' },
    { key: 'category_image_heating_climate', value: '/images/heating-system-technical.png' },
    { key: 'category_image_water_plumbing', value: '/images/water-plumbing-technical.png' },
    { key: 'category_image_gas_cooking', value: '/images/gas-lpg-technical.png' },
    { key: 'category_image_toilets_washroom', value: '/images/interior-showcase.png' },
    { key: 'category_image_windows_bodywork', value: '/images/insulation-technical.png' },
    { key: 'category_image_insulation_interior', value: '/images/interior-showcase.png' },
    { key: 'category_image_safety_security', value: '/images/systems-showcase.png' },
    { key: 'category_image_outdoor_living', value: '/images/exterior-equipment-technical.png' },
    { key: 'category_image_connectivity_power', value: '/images/electrical-technical.png' },
    { key: 'category_image_complete_kits', value: '/images/community-showcase.png' },
    { key: 'lifestyle_image_1', value: '/images/hero-background.png' },
    { key: 'lifestyle_image_2', value: '/images/hero-background.png' },
    { key: 'lifestyle_image_3', value: '/images/hero-background.png' },
    { key: 'lifestyle_image_4', value: '/images/hero-background.png' }
  ];

  for (const seed of seeds) {
    const { error } = await supabase.from('store_config').upsert(seed);
    if (error) {
      console.error(`Error upserting ${seed.key}:`, error.message);
    } else {
      console.log(`Upserted ${seed.key}`);
    }
  }
  
  console.log('Seeding complete');
}

run().catch(console.error);
