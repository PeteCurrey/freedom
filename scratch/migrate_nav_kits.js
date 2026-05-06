const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://hkdibbwqlxfezismkaxu.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhrZGliYndxbHhmZXppc21rYXh1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjM0NTQ2MiwiZXhwIjoyMDkxOTIxNDYyfQ.Gkwt1X7anNOUTXFzDzJuWEnFdik5VV8hOrLcMJO6Ejo'
);

async function migrate() {
  console.log('Starting migration...');

  // 1. Update Category Slugs
  const categoryMap = [
    { old: 'electrical-solar', new: 'electrical', name: 'Power Systems' },
    { old: 'heating-hot-water', new: 'climate', name: 'Climate Control' },
    { old: 'water-plumbing', new: 'plumbing', name: 'Plumbing' },
    { old: 'insulation', new: 'insulation', name: 'Insulation & Build' },
    { old: 'windows-ventilation', new: 'windows-ventilation', name: 'Windows & Vent' },
    { old: 'exterior-accessories', new: 'exterior-accessories', name: 'Exterior & Accessories' },
    { old: 'kits', new: 'kits', name: 'Build Kits' }
  ];

  for (const cat of categoryMap) {
    console.log(`Updating category ${cat.old} -> ${cat.new} (${cat.name})`);
    const { error } = await supabase
      .from('product_categories')
      .update({ slug: cat.new, name: cat.name })
      .eq('slug', cat.old);
    
    if (error) {
      console.warn(`Could not update category ${cat.old}: ${error.message}`);
      // Try to insert if missing
      const { error: insErr } = await supabase
        .from('product_categories')
        .upsert({ slug: cat.new, name: cat.name }, { onConflict: 'slug' });
      if (insErr) console.error(`Error inserting category ${cat.new}: ${insErr.message}`);
    }
  }

  // 2. Seed Kits
  const { data: kitCat } = await supabase
    .from('product_categories')
    .select('id')
    .eq('slug', 'kits')
    .single();

  if (!kitCat) {
    console.error('Kits category not found. Cannot seed kits.');
    return;
  }

  const kits = [
    {
      name: 'Full Autonomy Electrical Kit',
      slug: 'full-autonomy-electrical-kit',
      brand: 'Amplios Engineered',
      short_description: 'Complete 12V/240V power system for off-grid living. Features Victron MultiPlus-II, 400Ah Lithium, and 400W Solar array.',
      description: 'The ultimate power foundation for expedition builds. This kit includes every core component required for a high-performance electrical system.\n\nIncluded Hardware:\n· Victron MultiPlus-II 12/3000/120-32\n· 400Ah LiFePO4 Smart Battery Bank\n· Cerbo GX + GX Touch 50\n· SmartSolar MPPT 100/30\n· Orion-Tr Smart DC-DC 30A\n· Lynx Distributor + Fusing',
      price_gbp: 345000,
      compare_at_price: 472600, // ~27% saving
      category_id: kitCat.id,
      type: 'kit',
      is_active: true,
      badge: 'Save 27%',
      system_tier: 'advanced',
      spec_line: '3000VA Inverter · 400Ah Lithium · 400W Solar'
    },
    {
      name: 'Four Season Climate Kit',
      slug: 'four-season-climate-kit',
      brand: 'Amplios Engineered',
      short_description: 'Integrated heating and hot water solution. Webasto diesel heating paired with Truma electric hot water.',
      description: 'Stay warm year-round with our most popular climate bundle. Combines rapid air heating with efficient water heating for the perfect all-season build.\n\nIncluded Hardware:\n· Webasto Air Top 2000 STC Diesel Heater\n· Truma Ultrastore 10L Gas/Electric Boiler\n· Digital Thermostat Control\n· Full Insulated Ducting Kit\n· External Fuel Standpipe',
      price_gbp: 210000,
      compare_at_price: 247000, // ~15% saving
      category_id: kitCat.id,
      type: 'kit',
      is_active: true,
      badge: 'Save 15%',
      system_tier: 'intermediate',
      spec_line: '2kW Diesel Heat · 10L Hot Water'
    },
    {
      name: 'Premium Wetroom Kit',
      slug: 'premium-wetroom-kit',
      brand: 'Amplios Engineered',
      short_description: 'Full bathroom hardware suite including high-pressure pump, shower controls, and designer tapware.',
      description: 'Everything you need for a luxury van bathroom. High-flow pressure system matched with premium fixtures for a domestic-grade experience.\n\nIncluded Hardware:\n· Whale High-Flow 12V Pressure Pump\n· 2L Accumulator Tank\n· Matte Black Shower Mixer + Head\n· Fold-down Designer Basin Tap\n· 12V Grey Water Waste Pump',
      price_gbp: 85000,
      compare_at_price: 96500, // ~12% saving
      category_id: kitCat.id,
      type: 'kit',
      is_active: true,
      badge: 'Save 12%',
      system_tier: 'intermediate',
      spec_line: '12LPM Pressure · Matte Black Fixtures'
    }
  ];

  for (const kit of kits) {
    console.log(`Seeding kit: ${kit.name}`);
    const { error } = await supabase
      .from('products')
      .upsert(kit, { onConflict: 'slug' });
    
    if (error) console.error(`Error seeding kit ${kit.name}: ${error.message}`);
  }

  console.log('Migration complete.');
}

migrate().catch(console.error);
