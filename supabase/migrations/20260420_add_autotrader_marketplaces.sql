-- ==============================================================
-- MARKETPLACE REGISTRY: PEUGEOT & CITROEN EXPANSION
-- ==============================================================

-- 7. Peugeot Boxer
INSERT INTO public.vehicle_marketplaces (vehicle_id, marketplace_name, affiliate_url, icon_type)
SELECT 'peugeot-boxer', 'eBay Motors UK', 'https://www.ebay.co.uk/b/Peugeot-Boxer-Vans/177063?mkcid=1&mkrid=711-53200-19255-0&siteid=3&campid=5339063718&customid=market-hub&mkevt=1', 'ebay'
WHERE NOT EXISTS (SELECT 1 FROM public.vehicle_marketplaces WHERE vehicle_id = 'peugeot-boxer' AND icon_type = 'ebay');

INSERT INTO public.vehicle_marketplaces (vehicle_id, marketplace_name, affiliate_url, icon_type)
SELECT 'peugeot-boxer', 'AutoTrader Vans', 'https://www.autotrader.co.uk/vans/used-vans/peugeot/boxer', 'autotrader'
WHERE NOT EXISTS (SELECT 1 FROM public.vehicle_marketplaces WHERE vehicle_id = 'peugeot-boxer' AND icon_type = 'autotrader');

-- 8. Citroen Relay
INSERT INTO public.vehicle_marketplaces (vehicle_id, marketplace_name, affiliate_url, icon_type)
SELECT 'citroen-relay', 'eBay Motors UK', 'https://www.ebay.co.uk/b/Citroen-Relay-Vans/177063?mkcid=1&mkrid=711-53200-19255-0&siteid=3&campid=5339063718&customid=market-hub&mkevt=1', 'ebay'
WHERE NOT EXISTS (SELECT 1 FROM public.vehicle_marketplaces WHERE vehicle_id = 'citroen-relay' AND icon_type = 'ebay');

INSERT INTO public.vehicle_marketplaces (vehicle_id, marketplace_name, affiliate_url, icon_type)
SELECT 'citroen-relay', 'AutoTrader Vans', 'https://www.autotrader.co.uk/vans/used-vans/citroen/relay', 'autotrader'
WHERE NOT EXISTS (SELECT 1 FROM public.vehicle_marketplaces WHERE vehicle_id = 'citroen-relay' AND icon_type = 'autotrader');

-- Link all new marketplaces to their global affiliate partners if not already done
-- (Assume affiliate_management already has eBay and AutoTrader partners from previous builds)
DO $$
DECLARE
    ebay_id uuid;
    at_id uuid;
BEGIN
    SELECT id INTO ebay_id FROM public.affiliate_management WHERE name ILIKE '%eBay%' LIMIT 1;
    SELECT id INTO at_id FROM public.affiliate_management WHERE name ILIKE '%AutoTrader%' LIMIT 1;

    -- Update eBay links
    UPDATE public.vehicle_marketplaces 
    SET affiliate_id = ebay_id
    WHERE icon_type = 'ebay' AND affiliate_id IS NULL;

    -- Update AutoTrader links
    UPDATE public.vehicle_marketplaces 
    SET affiliate_id = at_id
    WHERE icon_type = 'autotrader' AND affiliate_id IS NULL;
END $$;
