
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://hkdibbwqlxfezismkaxu.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhrZGliYndxbHhmZXppc21rYXh1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjM0NTQ2MiwiZXhwIjoyMDkxOTIxNDYyfQ.Gkwt1X7anNOUTXFzDzJuWEnFdik5VV8hOrLcMJO6Ejo';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function updateProduct() {
  const { data, error } = await supabase
    .from('products')
    .update({
      specs: {
        "Dimensions": "546 x 275 x 147 mm",
        "Continuous Power": "3000VA / 2400W",
        "Charger Current": "120A",
        "Transfer Switch": "32A",
        "Peak Power": "5500W",
        "Input Voltage": "12V DC",
        "AC Output": "230V AC",
        "Efficiency": "93%",
        "Weight": "19 kg",
        "IP Rating": "IP22",
        "Manual": "https://www.victronenergy.com/upload/documents/MultiPlus-II_230V/32424-MultiPlus-II___Quattro-II-pdf-en.pdf",
        "Enclosure": "https://www.victronenergy.com/upload/documents/MultiPlus-II-12V-3000VA-230Vac.pdf"
      }
    })
    .eq('slug', 'victron-multiplus-ii-12-3000-120-32');

  if (error) {
    console.error('Error updating product:', error);
  } else {
    console.log('Product specs updated successfully with dimensions prioritized');
  }
}

updateProduct();
