-- ==============================================================
-- FINAL PLATFORM POLISH: ANALYTICS & CATEGORY CENTRALIZATION
-- ==============================================================

-- 1. Product Performance Telemetry
ALTER TABLE IF EXISTS public.products 
ADD COLUMN IF NOT EXISTS click_count integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_click_at timestamp with time zone;

-- 2. Increment Product Click RPC
CREATE OR REPLACE FUNCTION increment_product_click(row_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE public.products
  SET click_count = click_count + 1,
      last_click_at = now()
  WHERE id = row_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Centralize Expansion Categories
-- This ensures all sectors from the store hub are managed via DB
INSERT INTO public.product_categories (name, slug, description, sort_order)
VALUES 
('Chassis & Exterior', 'chassis-exterior', 'Heavy-duty racks, ladders, wheels, and expedition hardware for your base vehicle.', 70),
('Security & Monitoring', 'security-monitoring', 'Professional-grade locks, alarm systems, and off-grid tracking technology.', 80)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  sort_order = EXCLUDED.sort_order;

-- 4. Supplier Metadata Enhancement
-- Ensure lead counts are initialized
UPDATE public.suppliers SET lead_count = 0 WHERE lead_count IS NULL;
