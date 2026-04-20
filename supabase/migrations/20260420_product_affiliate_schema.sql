-- Migration: Product Affiliate Schema
-- Adds support for external affiliate links to store products

ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS affiliate_url text,
ADD COLUMN IF NOT EXISTS is_affiliate boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS affiliate_id uuid REFERENCES public.affiliate_management(id) ON DELETE SET NULL;

-- Create an index for faster affiliate product lookups
CREATE INDEX IF NOT EXISTS idx_products_is_affiliate ON public.products(is_affiliate);

COMMENT ON COLUMN public.products.affiliate_url IS 'External tracked URL for partner product pages';
COMMENT ON COLUMN public.products.is_affiliate IS 'If true, local checkout is disabled and replaced by external buy link';
COMMENT ON COLUMN public.products.affiliate_id IS 'Link to global affiliate partner for performance tracking';
