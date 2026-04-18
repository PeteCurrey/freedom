-- Seed Marketplaces Defaults
-- This script migrates previously hardcoded affiliate links to the database.

INSERT INTO vehicle_marketplaces (vehicle_id, marketplace_name, affiliate_url, icon_type, is_active)
VALUES 
  ('mercedes-sprinter', 'Sovrn Marketplace', 'https://sovrn.co/8jnot3i', 'external', true),
  ('man-tge', 'Sovrn Marketplace', 'https://sovrn.co/11auwij', 'external', true),
  ('fiat-ducato', 'Sovrn Marketplace', 'https://sovrn.co/12rriq1', 'external', true),
  ('peugeot-boxer', 'AutoTrader Vans', 'https://www.autotrader.co.uk/vans/used-vans/peugeot/boxer', 'autotrader', true),
  ('citroen-relay', 'AutoTrader Vans', 'https://www.autotrader.co.uk/vans/used-vans/citroen/relay', 'autotrader', true),
  ('mercedes-sprinter', 'eBay Motors UK', 'https://www.ebay.co.uk/sch/i.html?_nkw=mercedes+sprinter+panel+van+lwb', 'ebay', true),
  ('vw-crafter', 'eBay Motors UK', 'https://www.ebay.co.uk/sch/i.html?_nkw=vw+crafter+panel+van+lwb', 'ebay', true),
  ('ford-transit', 'eBay Motors UK', 'https://www.ebay.co.uk/sch/i.html?_nkw=ford+transit+panel+van+lwb', 'ebay', true),
  ('man-tge', 'eBay Motors UK', 'https://www.ebay.co.uk/sch/i.html?_nkw=man+tge+panel+van+lwb', 'ebay', true),
  ('fiat-ducato', 'eBay Motors UK', 'https://www.ebay.co.uk/sch/i.html?_nkw=fiat+ducato+panel+van+lwb', 'ebay', true),
  ('iveco-daily', 'eBay Motors UK', 'https://www.ebay.co.uk/sch/i.html?_nkw=iveco+daily+panel+van+lwb', 'ebay', true);
