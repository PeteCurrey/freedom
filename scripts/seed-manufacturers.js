const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const manufacturers = [
  // Electrical / Power
  { name: 'Victron Energy', website_url: 'https://www.victronenergy.com', description: 'Premium electrical systems for off-grid power.', product_categories: ['electrical-core', 'solar-roof'] },
  { name: 'Fogstar', website_url: 'https://www.fogstar.co.uk', description: 'High-density LiFePO4 batteries.', product_categories: ['electrical-core'] },
  { name: 'EcoFlow', website_url: 'https://www.ecoflow.com', description: 'Portable power stations and smart devices.', product_categories: ['electrical-core'] },
  { name: 'Bluetti', website_url: 'https://www.bluettipower.co.uk', description: 'Solar generators and power stations.', product_categories: ['electrical-core'] },
  { name: 'Renogy', website_url: 'https://www.renogy.com', description: 'Accessible solar panels and power solutions.', product_categories: ['electrical-core', 'solar-roof'] },
  { name: 'Sterling Power', website_url: 'https://sterling-power.com', description: 'Advanced battery charging technology.', product_categories: ['electrical-core'] },

  // Suspension / Offroad
  { name: 'Agile Offroad', website_url: 'https://agileoffroad.com', description: 'Suspension upgrades and off-road components.', product_categories: ['suspension'] },
  { name: 'Van Compass', website_url: 'https://vancompass.com', description: 'Sprinter and Transit lift kits and armour.', product_categories: ['suspension'] },
  { name: 'ARB', website_url: 'https://arbusa.com', description: '4x4 accessories and air compressors.', product_categories: ['suspension', 'outdoor-living'] },
  { name: 'Fox Suspension', website_url: 'https://www.ridefox.com', description: 'High-performance shock absorbers.', product_categories: ['suspension'] },
  { name: 'Old Man Emu', website_url: 'https://www.oldmanemu.com.au', description: 'Integrated 4x4 suspension systems.', product_categories: ['suspension'] },

  // Lighting
  { name: 'Lazer Lamps', website_url: 'https://www.lazerlamps.com', description: 'High-performance LED driving lights.', product_categories: ['outdoor-living'] },
  { name: 'Baja Designs', website_url: 'https://www.bajadesigns.com', description: 'Premium off-road LED lighting.', product_categories: ['outdoor-living'] },
  { name: 'KC HiLiTES', website_url: 'https://www.kchilites.com', description: 'Iconic off-road lighting solutions.', product_categories: ['outdoor-living'] },
  { name: 'Rigid Industries', website_url: 'https://www.rigidindustries.com', description: 'Durable LED light bars and pods.', product_categories: ['outdoor-living'] },

  // HVAC / Comfort
  { name: 'Dometic', website_url: 'https://www.dometic.com', description: 'Global leader in mobile cooling and climate.', product_categories: ['heating-climate', 'water-plumbing', 'windows-bodywork'] },
  { name: 'Webasto', website_url: 'https://www.webasto-comfort.com', description: 'Premium diesel and water heating systems.', product_categories: ['heating-climate'] },
  { name: 'Eberspächer', website_url: 'https://www.eberspaecher.com', description: 'Advanced climate control technology.', product_categories: ['heating-climate'] },
  { name: 'Truma', website_url: 'https://www.truma.com', description: 'Integrated heating and water systems.', product_categories: ['heating-climate'] },
  { name: 'Cruise N Comfort', website_url: 'https://cruisencomfortusa.com', description: '12V air conditioning systems.', product_categories: ['heating-climate'] },
  { name: 'Maxxair', website_url: 'https://www.maxxair.com', description: 'Premium roof ventilation fans.', product_categories: ['heating-climate', 'windows-bodywork'] },

  // Exterior / Storage / Accessories
  { name: 'Roam Adventure Co', website_url: 'https://www.roamadventureco.com', description: 'Rugged storage cases and awnings.', product_categories: ['outdoor-living'] },
  { name: 'Front Runner', website_url: 'https://www.frontrunneroutfitters.com', description: 'Modular roof racks and overlanding gear.', product_categories: ['outdoor-living'] },
  { name: 'Thule', website_url: 'https://www.thule.com', description: 'Awnings, steps, and cargo solutions.', product_categories: ['outdoor-living'] },
  { name: 'Fiamma', website_url: 'https://www.fiamma.it', description: 'Motorhome awnings and bike carriers.', product_categories: ['outdoor-living'] },
  { name: 'Agency 6', website_url: 'https://agency6.com', description: 'Recovery gear and exterior accessories.', product_categories: ['outdoor-living'] },
  { name: 'Off Grid Fabrications', website_url: 'https://offgridfabrications.com', description: 'Custom van ladders and racks.', product_categories: ['outdoor-living'] },
  { name: 'Backwoods Adventure Mods', website_url: 'https://backwoodsadventuremods.com', description: 'Heavy-duty bumpers and racks.', product_categories: ['outdoor-living'] },
  { name: 'Sidepodz', website_url: 'https://sidepodz.co.uk', description: 'Van side flare extensions.', product_categories: ['windows-bodywork'] },
  { name: 'AMP Research', website_url: 'https://www.amp-research.com', description: 'Power-deploying running boards.', product_categories: ['outdoor-living'] },

  // Plumbing
  { name: 'Whale', website_url: 'https://www.whalepumps.com', description: 'Water pumps and underslung heating.', product_categories: ['water-plumbing', 'heating-climate'] },
  { name: 'Shurflo', website_url: 'https://www.shurflo.com', description: 'Reliable diaphragm water pumps.', product_categories: ['water-plumbing'] },
  { name: 'Thetford', website_url: 'https://www.thetford.com', description: 'Sanitation systems and cassette toilets.', product_categories: ['toilets-washroom'] },

  // Connectivity
  { name: 'Starlink', website_url: 'https://www.starlink.com', description: 'Global satellite internet for RVs.', product_categories: ['connectivity-power'] },
  { name: 'Pepwave', website_url: 'https://www.peplink.com', description: 'Industrial cellular routers.', product_categories: ['connectivity-power'] },

  // Interior Hardware
  { name: 'Häfele', website_url: 'https://www.hafele.co.uk', description: 'Architectural hardware and fittings.', product_categories: ['insulation-interior'] },

  // Wheels / Tyres
  { name: 'BFGoodrich', website_url: 'https://www.bfgoodrichtires.com', description: 'All-terrain KO2 and off-road tyres.', product_categories: ['suspension'] },
  { name: 'Method Race Wheels', website_url: 'https://www.methodracewheels.com', description: 'High-load rated off-road wheels.', product_categories: ['suspension'] },

  // Insulation
  { name: 'Dodo Mat', website_url: 'https://www.dodomat.com', description: 'Sound deadening and thermal insulation.', product_categories: ['insulation-interior'] },
];

async function seed() {
  console.log("Seeding Manufacturers...");
  let count = 0;
  for (const mfg of manufacturers) {
    const { data, error } = await supabase
      .from('manufacturers')
      .upsert(mfg, { onConflict: 'name' });
      
    if (error) {
      console.error(`Error inserting ${mfg.name}:`, error.message);
    } else {
      console.log(`✓ Inserted ${mfg.name}`);
      count++;
    }
  }
  console.log(`\nCompleted. Inserted ${count} manufacturers.`);
}

seed();
