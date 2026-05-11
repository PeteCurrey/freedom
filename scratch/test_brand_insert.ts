import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function testInsert() {
  const newBrand = { name: "Test Brand " + Date.now(), website: "https://example.com", country: "UK", logo: "" }
  const { data, error } = await supabase.from('brands').insert([newBrand]).select().single()
  
  if (error) {
    console.error("Insert failed:", error)
  } else {
    console.log("Insert successful:", data)
  }
}

testInsert()
