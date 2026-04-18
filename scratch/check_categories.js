
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://tpxivymjmjitmsksksge.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder' // I'll use the user's provided key if I can find it or just try to run it
);

async function checkCategories() {
  const { data, error } = await supabase.from('product_categories').select('name, slug');
  if (error) console.error(error);
  else console.log(JSON.stringify(data, null, 2));
}

checkCategories();
