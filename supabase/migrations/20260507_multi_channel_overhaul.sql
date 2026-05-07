-- MULTI-CHANNEL LISTING FIELDS FOR PRODUCTS
ALTER TABLE products ADD COLUMN IF NOT EXISTS gtin TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS mpn TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS ebay_listing_id TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS ebay_listed_at TIMESTAMPTZ;
ALTER TABLE products ADD COLUMN IF NOT EXISTS amazon_asin TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS amazon_listed_at TIMESTAMPTZ;
ALTER TABLE products ADD COLUMN IF NOT EXISTS onbuy_listing_id TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS onbuy_listed_at TIMESTAMPTZ;
ALTER TABLE products ADD COLUMN IF NOT EXISTS google_merchant_status TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS meta_catalog_status TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS channel_notes TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS list_on_ebay BOOLEAN DEFAULT false;
ALTER TABLE products ADD COLUMN IF NOT EXISTS list_on_amazon BOOLEAN DEFAULT false;
ALTER TABLE products ADD COLUMN IF NOT EXISTS list_on_onbuy BOOLEAN DEFAULT false;
ALTER TABLE products ADD COLUMN IF NOT EXISTS list_on_pinterest BOOLEAN DEFAULT false;

-- PLATFORM INTEGRATIONS TABLE FOR CREDENTIALS
CREATE TABLE IF NOT EXISTS platform_integrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  platform_id text UNIQUE NOT NULL, -- e.g., 'ga4', 'stripe', 'ebay', etc.
  name text NOT NULL,
  status text DEFAULT 'not_connected', -- 'connected', 'not_connected', 'error'
  credentials jsonb DEFAULT '{}'::jsonb, -- encrypted/masked data
  last_sync_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on platform_integrations
ALTER TABLE platform_integrations ENABLE ROW LEVEL SECURITY;

-- Only admins can manage integrations
CREATE POLICY "Admins can manage integrations" ON platform_integrations
  FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_profiles WHERE admin_profiles.id = auth.uid()));

-- Insert placeholders for the 12 required platforms
INSERT INTO platform_integrations (platform_id, name) VALUES
  ('ga4', 'Google Analytics 4'),
  ('gsc', 'Google Search Console'),
  ('gtm', 'Google Tag Manager'),
  ('stripe', 'Stripe'),
  ('ebay', 'eBay Developer'),
  ('amazon', 'Amazon Seller (SP-API)'),
  ('onbuy', 'OnBuy.com'),
  ('gmc', 'Google Merchant Center'),
  ('meta', 'Meta (Facebook & Instagram)'),
  ('pinterest', 'Pinterest Shopping'),
  ('google_ads', 'Google Ads'),
  ('resend', 'Resend')
ON CONFLICT (platform_id) DO NOTHING;
