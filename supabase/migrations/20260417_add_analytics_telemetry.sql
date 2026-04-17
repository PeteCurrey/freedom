-- ==============================================================
-- AFFILIATE ANALYTICS & PERFORMANCE TRACKING
-- ==============================================================
-- This script adds telemetry columns to affiliate-linked tables
-- allowing us to track high-performance partners and van links.

-- 1. Track performance on standard affiliate partners (Amazon, EcoFlow, etc)
ALTER TABLE public.affiliate_management 
ADD COLUMN IF NOT EXISTS click_count integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_click_at timestamp with time zone;

-- 2. Track performance on vehicle-specific marketplaces (eBay, AutoTrader, Van Trader)
ALTER TABLE public.vehicle_marketplaces 
ADD COLUMN IF NOT EXISTS click_count integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_click_at timestamp with time zone;

-- 3. Track direct supplier leads (External site clicks)
ALTER TABLE public.suppliers 
ADD COLUMN IF NOT EXISTS lead_count integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_lead_at timestamp with time zone;
