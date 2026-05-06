const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://hkdibbwqlxfezismkaxu.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhrZGliYndxbHhmZXppc21rYXh1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjM0NTQ2MiwiZXhwIjoyMDkxOTIxNDYyfQ.Gkwt1X7anNOUTXFzDzJuWEnFdik5VV8hOrLcMJO6Ejo'
);

async function run() {
  const { data: system } = await supabase.from('build_systems').select('common_mistakes').eq('slug', 'electrical-solar').single();
  
  if (system) {
    let mistakes = system.common_mistakes || [];
    
    // Check if new mistakes are already there
    const newMistakes = [
      { title: "Insufficient solar for UK winter", desc: "You only get 1.5 peak sun hours in December in the UK. A 400W array will yield less than 50Ah per day." },
      { title: "Inverter standby draw not included", desc: "A large inverter can draw 1-2A just being turned on with no load. Left on 24/7, this is 24-48Ah wasted daily." },
      { title: "Mixing AGM and lithium", desc: "Never parallel-connect AGM and Lithium batteries. They have fundamentally different voltage curves and one will destroy the other." },
      { title: "Shore power inlet without RCD", desc: "Connecting 230V shore power directly to an inverter/charger without an inline RCD/RCBO is illegal and highly dangerous." },
      { title: "Running AC ring without earth bonding", desc: "The vehicle chassis must be bonded to the AC earth. Without this, a fault in an appliance could make the metal shell of the van live." },
      { title: "Ignoring BMS cutoff voltage", desc: "Lithium capacity calculations must account for the BMS cutting off at 10-20% to protect the cells. You rarely have 100% usable capacity." }
    ];

    // Filter out ones we already have
    const existingTitles = mistakes.map(m => m.title);
    const toAdd = newMistakes.filter(m => !existingTitles.includes(m.title));
    
    if (toAdd.length > 0) {
      mistakes = [...mistakes, ...toAdd];
      await supabase.from('build_systems').update({ common_mistakes: mistakes }).eq('slug', 'electrical-solar');
      console.log("Updated electrical-solar common mistakes!");
    } else {
      console.log("Mistakes already added.");
    }
  }
}

run();
