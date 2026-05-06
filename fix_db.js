const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://hkdibbwqlxfezismkaxu.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhrZGliYndxbHhmZXppc21rYXh1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjM0NTQ2MiwiZXhwIjoyMDkxOTIxNDYyfQ.Gkwt1X7anNOUTXFzDzJuWEnFdik5VV8hOrLcMJO6Ejo'
);

async function run() {
  // Update category slugs
  const categoryUpdates = [
    { old: 'electrical-solar', new: 'power' },
    { old: 'heating-hot-water', new: 'climate' },
    { old: 'water-plumbing', new: 'plumbing' },
    { old: 'interior-furniture', new: 'hardware' }
  ];

  for (const update of categoryUpdates) {
    await supabase.from('product_categories').update({ slug: update.new }).eq('slug', update.old);
    console.log(`Updated category ${update.old} to ${update.new}`);
  }

  // Ensure 'kits' exists
  await supabase.from('product_categories').upsert({
    name: 'Build Kits',
    slug: 'kits',
    description: 'Bundled system packs for complete electrical, water and heating installs',
    sort_order: 9
  }, { onConflict: 'slug' });
  console.log(`Ensured 'kits' category exists`);

  // Insert or update missing flagship products
  // First get category IDs
  const { data: categories } = await supabase.from('product_categories').select('id, slug');
  const getCatId = (slug) => categories.find(c => c.slug === slug)?.id;

  const products = [
    {
      name: 'Victron MultiPlus 12/3000/120-16',
      brand: 'VICTRON ENERGY',
      slug: 'victron-multiplus-3000',
      short_description: '12V | 3000VA | 120A',
      price_gbp: 124500,
      images: ['/images/systems-showcase.png', '/images/electrical-technical.png'],
      is_editor_pick: true,
      is_featured: true,
      category_id: getCatId('power'),
      system_tier: 'full-autonomy'
    },
    {
      name: 'Dometic CFX3 55IM Fridge',
      brand: 'DOMETIC',
      slug: 'dometic-cfx3-55im',
      short_description: '55L | 12/24V | WiFi Control',
      price_gbp: 89900,
      images: ['/images/interior-showcase.png'],
      is_featured: true,
      category_id: getCatId('climate'),
      system_tier: 'grid-independent'
    },
    {
      name: 'Truma Combi 4E Kit',
      brand: 'TRUMA',
      slug: 'truma-combi-4e-kit',
      short_description: '4kW | Gas/230V | 10L Vessel',
      price_gbp: 185000,
      images: ['/images/heating-system-technical.png'],
      is_featured: true,
      category_id: getCatId('climate'),
      system_tier: 'expedition'
    }
  ];

  for (const prod of products) {
    const { error } = await supabase.from('products').upsert(prod, { onConflict: 'slug' });
    if (error) {
       console.error(`Error upserting product ${prod.slug}:`, error);
    } else {
       console.log(`Upserted product ${prod.slug}`);
    }
  }

  console.log("Done database update.");
}

run();
