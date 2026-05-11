-- =========================================
-- AFFILIATE SYSTEM SCHEMA OVERHAUL
-- =========================================

-- 1. Update Products Table for Affiliate Support
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS is_affiliate boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS affiliate_url text,
ADD COLUMN IF NOT EXISTS commission_rate text; -- Store as text to allow "5%" or "£10" or "Variable"

-- 2. Update Affiliate Management for Marketing Links
ALTER TABLE public.affiliate_management
ADD COLUMN IF NOT EXISTS code text; -- Tracking/Ref Code for the partner

-- 3. Ensure existing data is compatible
UPDATE public.products SET is_affiliate = true WHERE affiliate_url IS NOT NULL;
