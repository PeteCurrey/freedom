-- ==============================================================
-- ENHANCE SUPPLIER & DOCUMENT MANAGEMENT
-- ==============================================================

-- 1. Add enhanced fields to suppliers
ALTER TABLE public.suppliers 
ADD COLUMN IF NOT EXISTS status text DEFAULT 'potential',
ADD COLUMN IF NOT EXISTS contact_name text,
ADD COLUMN IF NOT EXISTS contact_email text,
ADD COLUMN IF NOT EXISTS contact_phone text,
ADD COLUMN IF NOT EXISTS account_number text,
ADD COLUMN IF NOT EXISTS order_minimum numeric DEFAULT 0,
ADD COLUMN IF NOT EXISTS lead_time_days integer DEFAULT 14;

-- 2. Create Supplier Documents table
CREATE TABLE IF NOT EXISTS public.supplier_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  supplier_id uuid REFERENCES public.suppliers(id) ON DELETE CASCADE,
  label text NOT NULL,
  document_url text NOT NULL,
  document_type text, -- e.g., 'catalog', 'price_list', 'agreement'
  created_at timestamptz DEFAULT now()
);

-- ==============================================================
-- END OF MIGRATION
-- ==============================================================
