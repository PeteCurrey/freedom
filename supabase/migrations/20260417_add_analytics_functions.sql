-- ==============================================================
-- ANALYTICS HELPER FUNCTIONS
-- ==============================================================
-- These stored procedures ensure atomic incrementing of click counts
-- protecting against race conditions during high traffic periods.

-- 1. Increment Affiliate Project Clicks
CREATE OR REPLACE FUNCTION increment_affiliate_click(row_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE public.affiliate_management
  SET click_count = click_count + 1
  WHERE id = row_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Increment Marketplace Clicks (Used Vans)
CREATE OR REPLACE FUNCTION increment_marketplace_click(row_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE public.vehicle_marketplaces
  SET click_count = click_count + 1
  WHERE id = row_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Increment Supplier Lead Clicks
CREATE OR REPLACE FUNCTION increment_supplier_lead(row_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE public.suppliers
  SET lead_count = lead_count + 1
  WHERE id = row_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
