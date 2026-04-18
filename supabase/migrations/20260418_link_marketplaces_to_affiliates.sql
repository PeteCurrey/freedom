-- ==============================================================
-- LINK MARKETPLACES TO GLOBAL AFFILIATE NETWORK
-- ==============================================================

-- 1. ADAPT SCHEMA
ALTER TABLE IF EXISTS public.vehicle_marketplaces 
ADD COLUMN IF NOT EXISTS affiliate_id uuid REFERENCES public.affiliate_management(id) ON DELETE SET NULL;

ALTER TABLE IF EXISTS public.vehicle_marketplaces 
ADD COLUMN IF NOT EXISTS listing_label text;

ALTER TABLE IF EXISTS public.vehicle_marketplaces 
ADD COLUMN IF NOT EXISTS click_count integer DEFAULT 0;

ALTER TABLE IF EXISTS public.vehicle_marketplaces 
ADD COLUMN IF NOT EXISTS last_click_at timestamp with time zone;

-- 2. CREATE INCREMENT FUNCTION (If not exists from analytics)
CREATE OR REPLACE FUNCTION increment_marketplace_click(row_id uuid)
RETURNS void AS $$
BEGIN
    UPDATE public.vehicle_marketplaces
    SET click_count = click_count + 1,
        last_click_at = now()
    WHERE id = row_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. INITIAL MAPPING (Best effort based on common seed names)
-- Note: This assumes names exist in affiliate_management from previous seeds
DO $$
DECLARE
    ebay_id uuid;
    at_id uuid;
BEGIN
    SELECT id INTO ebay_id FROM public.affiliate_management WHERE name ILIKE '%eBay%' LIMIT 1;
    SELECT id INTO at_id FROM public.affiliate_management WHERE name ILIKE '%AutoTrader%' LIMIT 1;

    -- Update eBay links
    UPDATE public.vehicle_marketplaces 
    SET affiliate_id = ebay_id, listing_label = 'SEARCH EBAY INVENTORY'
    WHERE icon_type = 'ebay';

    -- Update AutoTrader links
    UPDATE public.vehicle_marketplaces 
    SET affiliate_id = at_id, listing_label = 'CHECK AUTOTRADER STOCK'
    WHERE icon_type = 'autotrader';

    -- Update others
    UPDATE public.vehicle_marketplaces 
    SET listing_label = 'VIEW LIVE LISTINGS'
    WHERE listing_label IS NULL;
END $$;
