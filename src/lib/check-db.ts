import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

async function checkCategories() {
  const { data, error } = await supabase
    .from('product_categories')
    .select('*');
    
  if (error) {
    console.error('Error fetching categories:', error);
    return;
  }
  
  console.log('--- PRODUCT CATEGORIES ---');
  console.log(JSON.stringify(data, null, 2));
}

checkCategories();
