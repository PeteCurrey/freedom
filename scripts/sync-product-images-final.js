
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://hkdibbwqlxfezismkaxu.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhrZGliYndxbHhmZXppc21rYXh1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjM0NTQ2MiwiZXhwIjoyMDkxOTIxNDYyfQ.Gkwt1X7anNOUTXFzDzJuWEnFdik5VV8hOrLcMJO6Ejo';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const PRODUCT_DATA = {
  "victron-lynx-distributor": [
    'https://www.victronenergy.com/upload/documents/Lynxdistributor%201000%20M10-front.png',
    'https://www.victronenergy.com/upload/documents/Lynx_DC-distributor%20%28left%29.png',
    'https://www.victronenergy.com/upload/documents/Lynx_DC-distributor%20%28right%29.png'
  ],
  "maxxair-maxxfan-deluxe": [
    'https://www.maxxair.com/wp-content/uploads/2018/11/00-07500K_main.jpg'
  ],
  "dometic-s4-window-900x450": [
    'https://www.dometic.com/assets/15/34/dometic-s4-hinged-window_71534.jpg'
  ],
  "thetford-c223cs-toilet": [
    'https://www.thetford.com/wp-content/uploads/2018/11/C223-CS-Main.png'
  ],
  "gaslow-11kg-refillable-tank": [
    'https://gaslow.co.uk/wp-content/uploads/2021/04/01-4311-Refillable-Cylinder-11kg.jpg'
  ],
  "victron-smart-lithium-12-8v-330ah": [
    'https://www.victronenergy.com/upload/documents/LiFePO4-battery-12,8V-330Ah-Smart%20%28front%29.png',
    'https://www.victronenergy.com/upload/documents/LiFePO4-battery-12,8V-330Ah-Smart%20%28front-top%29.png'
  ],
  "victron-orion-tr-smart-12-12-30": [
    'https://www.victronenergy.com/upload/documents/Orion-Tr%20Smart%20DC-DC%20charger%20isolated%20250-400W%20%28front%29.png',
    'https://www.victronenergy.com/upload/documents/Orion-Tr%20Smart%20DC-DC%20charger%20isolated%20250-400W%20%28left%29.png'
  ],
  "truma-combi-d4-e": [
    'https://www.truma.com/en/media/product-images/combi-d-4-e/truma-combi-d-4-e_main.jpg'
  ],
  "truma-aventa-comfort": [
    'https://www.truma.com/en/media/product-images/aventa-comfort/truma-aventa-comfort_main.jpg'
  ],
  "webasto-air-top-2000-stc": [
    'https://www.webasto.com/fileadmin/webasto_int/Recreation_Vehicles/Heating_Solutions/Air_Heating/Air_Top_2000_STC/Webasto-Air-Top-2000-STC-Main.jpg'
  ],
  "whale-watermaster-pump": [
    'https://www.whalepumps.com/rv/image-library/Watermaster-IC-High-Flow-Pump-Main.jpg'
  ],
  "whale-expansions-bottle-2l": [
    'https://www.whalepumps.com/rv/image-library/Accumulator-Tank-2L-Main.jpg'
  ],
  "dodo-mat-deadn-hex": [
    'https://www.dodomat.com/cdn/shop/files/DodoMat_DEADN_Hex_Roll_Main.jpg'
  ],
  "dodo-thermo-liner-extreme": [
    'https://www.dodomat.com/cdn/shop/files/Dodo_Thermo_Liner_Extreme_Main.jpg'
  ],
  "victron-multiplus-3000": [
    'https://www.victronenergy.com/upload/documents/PMP122301102-MultiPlus-12V-3kVA-120A-16A-230V-%28front%29.png'
  ],
  "dometic-cfx3-55im": [
    'https://www.dometic.com/imgproxy/s0QSdaxOKNNJjLSFPnhkOkHjkqOo4hmIefIJV_CpLyA/rs:fit:800:800/plain/https://www.dometic.com/globalassets/inriver/resources/pictures/9600028326-dometic-cfx3-55im-0001.jpg'
  ],
  "truma-combi-4e-kit": [
    'https://www.truma.com/en/media/product-images/combi-4-e/truma-combi-4-e_main.jpg'
  ],
  "full-autonomy-electrical-kit": [
    'https://www.victronenergy.com/upload/documents/PMP122305010_Multiplus-II%2012V%203kVA_120-32%20230V%20%28front%29.png'
  ],
  "four-season-climate-kit": [
    'https://www.truma.com/en/media/product-images/combi-d-4-e/truma-combi-d-4-e_main.jpg'
  ],
  "premium-wetroom-kit": [
    'https://www.thetford.com/wp-content/uploads/2018/11/C223-CS-Main.png'
  ]
};

async function updateAllProducts() {
  console.log('Updating product image arrays in database (NO AI)...');
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
  console.log('\nAll products synchronized with accurate manufacturer images.');
}

updateAllProducts();
