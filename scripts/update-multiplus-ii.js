
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://hkdibbwqlxfezismkaxu.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhrZGliYndxbHhmZXppc21rYXh1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjM0NTQ2MiwiZXhwIjoyMDkxOTIxNDYyfQ.Gkwt1X7anNOUTXFzDzJuWEnFdik5VV8hOrLcMJO6Ejo';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function updateProduct() {
  const { data, error } = await supabase
    .from('products')
    .update({
      description: 'The MultiPlus-II is a multifunctional inverter/charger with two AC outputs. Suitable for professional marine, yachting, vehicle, and land-based off-grid systems, it also provides the isolation and redundancy required for ESS setups.\n\nPowerControl allows the MultiPlus-II to prevent grid or generator overload, while PowerAssist boosts AC power during peak demand. In the event of an outage, the inverter switches over in milliseconds, keeping computers and sensitive electronics running without interruption.\n\nRemote Monitoring and Control:\nWhen coupled with a GX device (e.g. Cerbo GX) you can monitor and control your Multi and system locally (LAN) or remotely via the internet from anywhere in the world, using the free VRM app and free VRM portal website.',
      short_description: 'Professional 3000VA Inverter/Charger with PowerAssist and UPS functionality.',
      datasheet_url: 'https://www.victronenergy.com/upload/documents/Datasheet-MultiPlus-II-inverter-charger-EN.pdf',
      specs: {
        "Power (VA)": "3000VA",
        "Power (W)": "2400W",
        "Input Voltage": "12V DC",
        "AC Output": "230V AC",
        "Max Charger Current": "120A",
        "Transfer Switch": "32A",
        "Efficiency": "93%",
        "Dimensions": "546 x 275 x 147 mm",
        "Weight": "19 kg",
        "IP Rating": "IP22",
        "Manual": "https://www.victronenergy.com/upload/documents/MultiPlus-II_230V/32424-MultiPlus-II___Quattro-II-pdf-en.pdf",
        "Enclosure": "https://www.victronenergy.com/upload/documents/MultiPlus-II-12V-3000VA-230Vac.pdf"
      },
      images: [
        'https://www.victronenergy.com/upload/documents/PMP122305010_Multiplus-II%2012V%203kVA_120-32%20230V%20%28front%29.png',
        'https://www.victronenergy.com/upload/documents/PMP122305010_Multiplus-II%2012V%203kVA_120-32%20230V%20%28left%29.png',
        'https://www.victronenergy.com/upload/documents/PMP122305010_Multiplus-II%2012V%203kVA_120-32%20230V%20%28right%29.png',
        'https://www.victronenergy.com/upload/documents/Multiplus-II%2012V%203000VA-120A%20%28connections1-new%20current%20sense%29.png'
      ]
    })
    .eq('slug', 'victron-multiplus-ii-12-3000-120-32');

  if (error) {
    console.error('Error updating product:', error);
  } else {
    console.log('Product updated successfully');
  }
}

updateProduct();
