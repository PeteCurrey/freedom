
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const SUPABASE_URL = 'https://hkdibbwqlxfezismkaxu.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhrZGliYndxbHhmZXppc21rYXh1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjM0NTQ2MiwiZXhwIjoyMDkxOTIxNDYyfQ.Gkwt1X7anNOUTXFzDzJuWEnFdik5VV8hOrLcMJO6Ejo';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const PRODUCT_DATA = {};

const GENERATED_KITS = [
  { slug: "full-autonomy-electrical-kit", path: "C:\\Users\\pete\\.gemini\\antigravity\\brain\\7c2f8167-931c-4c78-b3d2-d55ba575eab4\\full_autonomy_electrical_kit_1778157754203.png" },
  { slug: "four-season-climate-kit", path: "C:\\Users\\pete\\.gemini\\antigravity\\brain\\7c2f8167-931c-4c78-b3d2-d55ba575eab4\\four_season_climate_kit_1778157784199.png" },
  { slug: "premium-wetroom-kit", path: "C:\\Users\\pete\\.gemini\\antigravity\\brain\\7c2f8167-931c-4c78-b3d2-d55ba575eab4\\premium_wetroom_kit_1778158042908.png" }
];

async function uploadKitImages() {
  console.log('Uploading generated kit images...');
  for (const kit of GENERATED_KITS) {
    if (!fs.existsSync(kit.path)) {
      console.error(`File not found: ${kit.path}`);
      continue;
    }
    const buffer = fs.readFileSync(kit.path);
    const { data, error } = await supabase.storage
      .from('product-images')
      .upload(`kits/${kit.slug}.png`, buffer, {
        contentType: 'image/png',
        upsert: true
      });
    
    if (error) {
      console.error(`Upload failed for ${kit.slug}:`, error.message);
    } else {
      const { data: { publicUrl } } = supabase.storage.from('product-images').getPublicUrl(`kits/${kit.slug}.png`);
      PRODUCT_DATA[kit.slug] = [publicUrl];
      console.log(`Uploaded ${kit.slug} -> ${publicUrl}`);
    }
  }
}

async function updateKits() {
  await uploadKitImages();
  
  for (const [slug, images] of Object.entries(PRODUCT_DATA)) {
    const { error } = await supabase
      .from('products')
      .update({ images })
      .eq('slug', slug);
    
    if (error) {
      console.error(`Update failed for ${slug}:`, error.message);
    } else {
      console.log(`✅ Updated ${slug}`);
    }
  }
}

updateKits();
