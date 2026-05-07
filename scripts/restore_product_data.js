// scripts/restore_product_data.js
const { createClient } = require('@supabase/supabase-js');

// Using process.env directly (ensure keys are exported in shell or added here)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('placeholder')) {
  console.error('Error: Supabase credentials are missing or placeholders. Please set real keys in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const MULTIPLUS_II = {
  name: 'Victron MultiPlus-II 12/3000/120-32 230V Inverter/Charger',
  brand: 'Victron Energy',
  slug: 'victron-multiplus-ii-12-3000-120-32',
  short_description: 'The next generation of high-performance inverter/chargers. Professional-grade 3000VA pure sine wave inverter with integrated 120A adaptive charger.',
  full_description: `The MultiPlus-II combines the functions of the MultiPlus and the MultiGrid. It has all the features of the MultiPlus, plus an external current transformer option to implement PowerControl and PowerAssist and to optimize self-consumption with external current sensing (max. 32A). 

Key Features:
- PowerControl & PowerAssist: Boost the capacity of the grid or a generator.
- Integrated 32A Transfer Switch: Seamlessly switch between shore power and inverter.
- Lithium Optimized: Advanced charging profiles for LiFePO4 batteries.
- ESS Ready: Energy Storage System functionality for grid-interactive applications.
- High Peak Power: Handle high startup currents from induction hobs or air-con.`,
  price_gbp: 124500, // in pence
  weight_kg: 18.0,
  specs: {
    "Input Voltage Range": "9.5 – 17V DC",
    "Continuous Output Power": "3000VA / 2400W",
    "Peak Power": "5500W",
    "Max efficiency": "93%",
    "Charging Current": "120A",
    "Transfer Switch": "32A",
    "Enclosure": "Blue RAL 5001",
    "Protection": "IP22",
    "Dimensions": "506 x 275 x 147 mm"
  },
  stock_quantity: 25,
  is_active: true,
  is_featured: true,
  images: [
    '/images/products/victron-multiplus-ii-front.png',
    '/images/products/victron-multiplus-ii-angle.png',
    '/images/products/victron-multiplus-ii-ports.png'
  ],
  badge: 'Bestseller',
  system_tier: 'off-grid'
};

async function restoreData() {
  console.log('Restoring Victron MultiPlus-II metadata...');

  const { data, error } = await supabase
    .from('products')
    .upsert(MULTIPLUS_II, { onConflict: 'slug' })
    .select();

  if (error) {
    console.error('Error upserting product:', error.message);
  } else {
    console.log('Successfully restored MultiPlus-II:', data[0].name);
  }
}

restoreData();
