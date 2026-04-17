-- ==============================================================
-- ADD PEUGEOT BOXER & CITROEN RELAY MARKETPLACES
-- ==============================================================

-- 7. Peugeot Boxer
INSERT INTO public.vehicle_marketplaces (vehicle_id, marketplace_name, affiliate_url, icon_type) VALUES
('peugeot-boxer', 'eBay Motors UK', 'https://www.ebay.co.uk/sch/i.html?_nkw=peugeot+boxer+panel+van+lwb', 'ebay'),
('peugeot-boxer', 'AutoTrader Vans', 'https://www.autotrader.co.uk/vans/used-vans/peugeot/boxer', 'autotrader');

-- 8. Citroen Relay
INSERT INTO public.vehicle_marketplaces (vehicle_id, marketplace_name, affiliate_url, icon_type) VALUES
('citroen-relay', 'eBay Motors UK', 'https://www.ebay.co.uk/sch/i.html?_nkw=citroen+relay+panel+van+lwb', 'ebay'),
('citroen-relay', 'AutoTrader Vans', 'https://www.autotrader.co.uk/vans/used-vans/citroen/relay', 'autotrader');
