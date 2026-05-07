
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://hkdibbwqlxfezismkaxu.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhrZGliYndxbHhmZXppc21rYXh1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjM0NTQ2MiwiZXhwIjoyMDkxOTIxNDYyfQ.Gkwt1X7anNOUTXFzDzJuWEnFdik5VV8hOrLcMJO6Ejo';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function updateProduct() {
  const { data, error } = await supabase
    .from('products')
    .update({
      images: [
        'https://www.victronenergy.com/upload/documents/PMP122305010_Multiplus-II%2012V%203kVA_120-32%20230V%20%28front%29.png',
        'https://www.victronenergy.com/upload/documents/PMP122305010_Multiplus-II%2012V%203kVA_120-32%20230V%20%28bottom%29.png',
        'https://www.victronenergy.com/upload/documents/PMP122305010_Multiplus-II%2012V%203kVA_120-32%20230V%20%28left%29.png',
        'https://www.victronenergy.com/upload/documents/PMP122305010_Multiplus-II%2012V%203kVA_120-32%20230V%20%28right%29.png',
        'https://www.victronenergy.com/upload/documents/Multiplus-II%2012V%203000VA-120A%20%28connections1-new%20current%20sense%29.png'
      ]
    })
    .eq('slug', 'victron-multiplus-ii-12-3000-120-32');

  if (error) {
    console.error('Error updating product:', error);
  } else {
    console.log('Product images updated successfully');
  }
}

updateProduct();
