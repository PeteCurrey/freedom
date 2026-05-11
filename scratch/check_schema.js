
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSchema() {
  const { data, error } = await supabase
    .rpc('get_table_columns', { table_name: 'products' });
  
  if (error) {
    // If RPC doesn't exist, try a direct query to information_schema
    const { data: cols, error: colError } = await supabase
      .from('products')
      .select('*')
      .limit(1);
    
    if (colError) {
      console.error('Error fetching columns:', colError);
    } else {
      console.log('Columns in products table:', Object.keys(cols[0] || {}));
    }
  } else {
    console.log('Columns:', data);
  }
}

checkSchema();
