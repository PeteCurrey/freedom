-- =========================================
-- DIY MOTORHOMES — COMMERCE & LEADS SCHEMA
-- =========================================

-- 1. Orders Table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  stripe_session_id text UNIQUE,
  status text DEFAULT 'pending', -- pending, paid, shipped, cancelled
  total_amount_gbp integer NOT NULL, -- in pence
  shipping_address jsonb,
  customer_email text,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 2. Order Items Table
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id),
  quantity integer NOT NULL DEFAULT 1,
  price_at_purchase integer NOT NULL, -- in pence
  created_at timestamptz DEFAULT now()
);

-- 3. Leads Table (Consultancy/Advisor)
CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  type text NOT NULL, -- advisor, planner, consultancy
  email text NOT NULL,
  content jsonb DEFAULT '{}',
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Policies for Orders (Users can see their own)
CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

-- Policies for Leads (Users can view own)
CREATE POLICY "Users can view own leads" ON leads
  FOR SELECT USING (auth.uid() = user_id);
