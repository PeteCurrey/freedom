const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://hkdibbwqlxfezismkaxu.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhrZGliYndxbHhmZXppc21rYXh1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjM0NTQ2MiwiZXhwIjoyMDkxOTIxNDYyfQ.Gkwt1X7anNOUTXFzDzJuWEnFdik5VV8hOrLcMJO6Ejo';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const products = [
  {
    slug: 'victron-multiplus-ii-12-3000-120-32',
    imageUrl: 'https://www.victronenergy.com/upload/products/MultiPlus-II_nw.png',
    filename: 'victron-multiplus-ii.png'
  },
  {
    slug: 'victron-smartsolar-mppt-100-30',
    imageUrl: 'https://www.victronenergy.com/upload/products/SmartSolar%20MPPT%20100-50%20(top).png',
    filename: 'victron-smartsolar-mppt.png'
  },
  {
    slug: 'victron-smartshunt-500a',
    imageUrl: 'https://www.victronenergy.com/upload/documents/SmartShunt%20500A-50mV%20(front).png',
    filename: 'victron-smartshunt.png'
  },
  {
    slug: 'victron-cerbo-gx',
    imageUrl: 'https://www.victronenergy.com/upload/products/Cerbo-GX_nw.png',
    filename: 'victron-cerbo-gx.png'
  },
  {
    slug: 'victron-orion-tr-smart-12-12-30a',
    imageUrl: 'https://www.victronenergy.com/upload/products/Orion-Tr-Smart_nw.png',
    filename: 'victron-orion-tr-smart.png'
  },
  {
    slug: 'fogstar-drift-200ah',
    imageUrl: 'https://www.fogstar.co.uk/cdn/shop/files/drift-230ah-lifepo4_main.jpg', // Using 230Ah as closest match
    filename: 'fogstar-drift-200ah.jpg'
  },
  {
    slug: 'dometic-cfx3-55im',
    imageUrl: 'https://www.dometic.com/imgproxy/s0QSdaxOKNNJjLSFPnhkOkHjkqOo4hmIefIJV_CpLyA/rs:fit:800:800/plain/https://www.dometic.com/globalassets/inriver/resources/pictures/9600028326-dometic-cfx3-55im-0001.jpg',
    filename: 'dometic-cfx3-55im.jpg'
  },
  {
    slug: 'truma-combi-4e',
    imageUrl: 'https://www.truma.com/media/product-images/combi-4-e/truma-combi-4-e_main.jpg',
    filename: 'truma-combi-4e.jpg'
  },
  {
    slug: 'maxxfan-deluxe',
    imageUrl: 'https://www.maxxair.com/cdn/shop/products/00-07500K_main.jpg',
    filename: 'maxxair-maxxfan-deluxe.jpg'
  },
];

async function fetchWithRetry(url, product) {
    const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    };

    try {
        let response = await fetch(url, { headers });
        if (response.ok) return response;

        // Victron fallback logic
        if (product.slug.includes('victron')) {
           const fallbacks = [
               url.replace('%20', ' '),
               url.replace(' (front).png', '%20%28front%29.png'),
               'https://www.victronenergy.com/upload/documents/SmartShunt%20500A-50mV%20%28front%29.png'
           ];
           for (const fb of fallbacks) {
              const res = await fetch(fb, { headers });
              if (res.ok) return res;
           }
        }

        return response;
    } catch (e) {
        return { ok: false, status: 500, statusText: e.message };
    }
}

async function uploadBuffer(product, response) {
    const buffer = await response.arrayBuffer();
    const contentType = response.headers.get('content-type') || 'image/png';
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(`products/${product.filename}`, buffer, {
        contentType,
        upsert: true
      });
    
    if (uploadError) {
      console.error(`Upload failed for ${product.slug}:`, uploadError.message);
      return false;
    }
    
    const { data: { publicUrl } } = supabase.storage
      .from('product-images')
      .getPublicUrl(`products/${product.filename}`);
    
    const { error: updateError } = await supabase
      .from('products')
      .update({ images: [publicUrl] })
      .eq('slug', product.slug);
    
    if (updateError) {
      console.error(`DB update failed for ${product.slug}:`, updateError.message);
      return false;
    }
    
    console.log(`✅ ${product.slug} → ${publicUrl}`);
    return true;
}

async function main() {
  console.log('Starting resilient product image fetch...\n');
  
  let succeeded = 0;
  let failed = 0;
  
  for (const product of products) {
     console.log(`Processing: ${product.slug}`);
     const response = await fetchWithRetry(product.imageUrl, product);
     if (response.ok) {
        const success = await uploadBuffer(product, response);
        if (success) succeeded++;
        else failed++;
     } else {
        console.error(`Failed to fetch image for ${product.slug}: ${response.status}`);
        failed++;
     }
  }
  
  console.log(`\nComplete: ${succeeded} succeeded, ${failed} failed`);
}

main();
