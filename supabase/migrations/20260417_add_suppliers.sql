-- =========================================
-- SUPPLIER & AFFILIATE SCHEMA EXPANSION
-- =========================================

-- 1. Create Suppliers Table
CREATE TABLE IF NOT EXISTS public.suppliers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  website text,
  trade_account boolean DEFAULT false,
  notes text,
  categories text[], -- e.g. ['electrical', 'solar']
  created_at timestamptz DEFAULT now()
);

-- 2. Link Products to Suppliers
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS supplier_id uuid REFERENCES public.suppliers(id);

-- 3. Enhance Affiliate Management
-- (affiliate_management already exists, let's ensure it has the right structure)
ALTER TABLE public.affiliate_management
ADD COLUMN IF NOT EXISTS commission_rate text,
ADD COLUMN IF NOT EXISTS category_focus text;

-- ==============================================================================
-- END OF MIGRATION
-- ==============================================================================
