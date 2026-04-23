/**
 * Run with: npx ts-node --skip-project scripts/grant-admin.ts
 * Grants admin/pro access to the specified email address.
 */
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://hkdibbwqlxfezismkaxu.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhrZGliYndxbHhmZXppc21rYXh1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjM0NTQ2MiwiZXhwIjoyMDkxOTIxNDYyfQ.Gkwt1X7anNOUTXFzDzJuWEnFdik5VV8hOrLcMJO6Ejo'
);

async function main() {
  // Step 1: Add is_admin column if it doesn't exist (safe to run multiple times)
  await supabase.rpc('exec_sql', {
    sql: `ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS is_admin boolean DEFAULT false;`
  }).catch(() => null); // ignore if rpc doesn't exist, we'll use raw SQL below

  // Step 2: Find the user by email
  const email = 'petercurrey@me.com';
  const { data: users, error } = await supabase.auth.admin.listUsers();
  
  if (error) {
    console.error('Error listing users:', error.message);
    return;
  }

  const user = users.users.find((u: any) => u.email === email);
  
  if (!user) {
    console.error(`User with email ${email} not found.`);
    console.log('Available users:', users.users.map((u: any) => u.email));
    return;
  }

  console.log(`Found user: ${user.email} (${user.id})`);

  // Step 3: Upsert profile with is_admin = true
  const { error: profileError } = await supabase
    .from('profiles')
    .upsert({
      id: user.id,
      email: user.email,
      is_admin: true,
    }, { onConflict: 'id' });

  if (profileError) {
    console.error('Profile upsert error:', profileError.message);
  } else {
    console.log('✅ Profile updated successfully — is_admin = true');
  }

  // Step 4: Also insert a "master" blueprint purchase grant for any existing plans
  // so existing plans work immediately without needing a Stripe session
  const { data: plans } = await supabase
    .from('build_plans')
    .select('id')
    .eq('user_id', user.id);

  if (plans && plans.length > 0) {
    for (const plan of plans) {
      await supabase.from('blueprint_purchases').upsert({
        user_id: user.id,
        plan_id: plan.id,
        tier: 'master',
        amount_paid_gbp: 0,
        status: 'completed',
        stripe_session_id: `admin_bypass_${plan.id}`,
        stripe_payment_intent_id: `admin_bypass_pi_${plan.id}`,
      }, { onConflict: 'stripe_session_id' });
    }
    console.log(`✅ Granted master blueprint access to ${plans.length} existing plans`);
  }

  console.log('Done! Peter now has full admin bypass access.');
}

main();
