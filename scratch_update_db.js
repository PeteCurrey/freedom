const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://hkdibbwqlxfezismkaxu.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhrZGliYndxbHhmZXppc21rYXh1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjM0NTQ2MiwiZXhwIjoyMDkxOTIxNDYyfQ.Gkwt1X7anNOUTXFzDzJuWEnFdik5VV8hOrLcMJO6Ejo'
);

async function updateStatus() {
  console.log("Updating suppliers status...");
  const { data, error } = await supabase
    .from('suppliers')
    .update({ status: 'potential' })
    .neq('name', 'Energy Solutions');

  if (error) {
    console.error("ERROR:", error.message);
  } else {
    console.log("SUCCESS! All other suppliers set to 'potential'.");
  }
}

updateStatus();
