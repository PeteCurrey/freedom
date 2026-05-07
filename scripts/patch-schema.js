
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://hkdibbwqlxfezismkaxu.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhrZGliYndxbHhmZXppc21rYXh1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjM0NTQ2MiwiZXhwIjoyMDkxOTIxNDYyfQ.Gkwt1X7anNOUTXFzDzJuWEnFdik5VV8hOrLcMJO6Ejo';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function patchSchema() {
  console.log('Patching schema...');
  
  // We use RPC or raw SQL via Supabase if possible, but since we are an agent with terminal,
  // we can't easily run raw SQL unless we use the 'supabase' CLI or a pg client.
  // Actually, I have 'pg' in package.json! I'll use that.
  
  const { Client } = require('pg');
  const client = new Client({
    connectionString: "postgresql://postgres:hkdibbwqlxfezismkaxu@db.hkdibbwqlxfezismkaxu.supabase.co:5432/postgres"
  });

  try {
    await client.connect();
    console.log('Connected to Postgres');
    
    await client.query(`
      ALTER TABLE public.products 
      ADD COLUMN IF NOT EXISTS full_description TEXT,
      ADD COLUMN IF NOT EXISTS video_enabled BOOLEAN DEFAULT false,
      ADD COLUMN IF NOT EXISTS video_source TEXT,
      ADD COLUMN IF NOT EXISTS video_url TEXT,
      ADD COLUMN IF NOT EXISTS video_title TEXT,
      ADD COLUMN IF NOT EXISTS video_description TEXT,
      ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}'::jsonb;
    `);
    
    console.log('Schema patched successfully');
  } catch (err) {
    console.error('Error patching schema:', err);
  } finally {
    await client.end();
  }
}

patchSchema();
