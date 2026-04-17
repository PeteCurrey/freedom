-- ==============================================================
-- DYNAMIC VAN MARKETPLACE AFFILIATES
-- ==============================================================

CREATE TABLE IF NOT EXISTS public.vehicle_marketplaces (
    id uuid default gen_random_uuid() primary key,
    vehicle_id text not null, -- 'mercedes-sprinter', 'vw-crafter', etc.
    marketplace_name text not null,
    affiliate_url text not null,
    icon_type text default 'external', -- 'ebay', 'autotrader', 'vantrader', 'external'
    is_active boolean default true,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS
ALTER TABLE public.vehicle_marketplaces ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access for active marketplaces" ON public.vehicle_marketplaces FOR SELECT USING (is_active = true);
CREATE POLICY "Admin full access marketplaces" ON public.vehicle_marketplaces FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- SEED MIGRATION DATA
-- Migrating existing static links from the old find-a-van page into the database

-- 1. Mercedes Sprinter
INSERT INTO public.vehicle_marketplaces (vehicle_id, marketplace_name, affiliate_url, icon_type) VALUES
('mercedes-sprinter', 'eBay Motors UK', 'https://www.ebay.co.uk/b/Mercedes-Benz-Sprinter-Vans/177063?mkcid=1&mkrid=711-53200-19255-0&siteid=3&campid=5339063718&customid=market-hub&mkevt=1', 'ebay'),
('mercedes-sprinter', 'AutoTrader Vans', 'https://www.autotrader.co.uk/vans/used-vans/mercedes-benz/sprinter', 'autotrader'),
('mercedes-sprinter', 'Van Trader', 'https://sovrn.co/8jnot3i', 'vantrader'); -- User Requested New Link

-- 2. VW Crafter
INSERT INTO public.vehicle_marketplaces (vehicle_id, marketplace_name, affiliate_url, icon_type) VALUES
('vw-crafter', 'eBay Motors UK', 'https://www.ebay.co.uk/b/Volkswagen-Crafter-Vans/177063?mkcid=1&mkrid=711-53200-19255-0&siteid=3&campid=5339063718&customid=market-hub&mkevt=1', 'ebay'),
('vw-crafter', 'AutoTrader Vans', 'https://www.autotrader.co.uk/vans/used-vans/volkswagen/crafter', 'autotrader');

-- 3. Ford Transit
INSERT INTO public.vehicle_marketplaces (vehicle_id, marketplace_name, affiliate_url, icon_type) VALUES
('ford-transit', 'eBay Motors UK', 'https://www.ebay.co.uk/b/Ford-Transit-Vans/177063?mkcid=1&mkrid=711-53200-19255-0&siteid=3&campid=5339063718&customid=market-hub&mkevt=1', 'ebay'),
('ford-transit', 'AutoTrader Vans', 'https://www.autotrader.co.uk/vans/used-vans/ford/transit', 'autotrader');

-- 4. Fiat Ducato
INSERT INTO public.vehicle_marketplaces (vehicle_id, marketplace_name, affiliate_url, icon_type) VALUES
('fiat-ducato', 'eBay Motors UK', 'https://www.ebay.co.uk/b/Fiat-Ducato-Vans/177063?mkcid=1&mkrid=711-53200-19255-0&siteid=3&campid=5339063718&customid=market-hub&mkevt=1', 'ebay'),
('fiat-ducato', 'AutoTrader Vans', 'https://www.autotrader.co.uk/vans/used-vans/fiat/ducato', 'autotrader');

-- 5. MAN TGE
INSERT INTO public.vehicle_marketplaces (vehicle_id, marketplace_name, affiliate_url, icon_type) VALUES
('man-tge', 'eBay Motors UK', 'https://www.ebay.co.uk/b/MAN-TGE-Vans/177063?mkcid=1&mkrid=711-53200-19255-0&siteid=3&campid=5339063718&customid=market-hub&mkevt=1', 'ebay'),
('man-tge', 'AutoTrader Vans', 'https://www.autotrader.co.uk/vans/used-vans/man/tge', 'autotrader');

-- 6. Iveco Daily
INSERT INTO public.vehicle_marketplaces (vehicle_id, marketplace_name, affiliate_url, icon_type) VALUES
('iveco-daily', 'eBay Motors UK', 'https://www.ebay.co.uk/b/Iveco-Daily-Vans/177063?mkcid=1&mkrid=711-53200-19255-0&siteid=3&campid=5339063718&customid=market-hub&mkevt=1', 'ebay'),
('iveco-daily', 'AutoTrader Vans', 'https://www.autotrader.co.uk/vans/used-vans/iveco/daily', 'autotrader');
