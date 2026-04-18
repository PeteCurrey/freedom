-- 1. Add brands_handled column to suppliers table
ALTER TABLE public.suppliers 
ADD COLUMN IF NOT EXISTS brands_handled text[] DEFAULT '{}';

-- 2. Seed the Database with Industry Suppliers
-- We use DO block to prevent accidental duplicate inserts if IDs are somehow matched later
DO $$ 
BEGIN
    INSERT INTO public.suppliers (id, name, website, trade_account, status, categories, brands_handled, notes) VALUES
    (gen_random_uuid(), 'Kiravans', 'https://www.kiravans.co.uk', true, 'active_trade', '{interiors, hardware, electrical}', '{RIB, Webasto, Dometic, Kiravans}', 'Major UK supplier for seats, windows, and general conversion hardware.'),
    (gen_random_uuid(), 'Clearcut Conversions', 'https://www.clearcutconversions.com', true, 'applied', '{interiors, hardware, water}', '{Vohringer, Dometic, Thetford}', 'Specialists in CNC furniture and rock and roll beds.'),
    (gen_random_uuid(), 'Rayne Automotive', 'https://www.rayneautomotive.co.uk', true, 'active_trade', '{electrical}', '{Victron, Rayne}', 'High-quality loom manufacturers and electrical systems.'),
    (gen_random_uuid(), 'Victron Energy', 'https://www.victronenergy.com', false, 'potential', '{electrical}', '{Victron}', 'Global leaders in off-grid power systems.'),
    (gen_random_uuid(), 'Dometic UK', 'https://www.dometic.com', false, 'potential', '{climate, water, interiors}', '{Dometic}', 'Primary manufacturer for fridges, AC, and windows.'),
    (gen_random_uuid(), 'Truma UK', 'https://www.truma.com', false, 'potential', '{heating, water}', '{Truma}', 'Specialists in combi heaters and gas systems.'),
    (gen_random_uuid(), 'Webasto', 'https://www.webasto.com', false, 'potential', '{heating, climate}', '{Webasto}', 'Air and water heating specialists.'),
    (gen_random_uuid(), 'MaxxAir', 'https://www.airxcel.com', false, 'potential', '{ventilation}', '{MaxxAir}', 'Ventilation and roof fan specialists.'),
    (gen_random_uuid(), 'Whale Pumps', 'https://www.whalepumps.com', false, 'potential', '{water, plumbing}', '{Whale}', 'Water system and high-flow pump specialists.'),
    (gen_random_uuid(), 'Thetford Europe', 'https://www.thetford-europe.com', false, 'potential', '{plumbing, interiors}', '{Thetford}', 'Sanitation and cooking appliance leaders.'),
    (gen_random_uuid(), 'Dodo Mat', 'https://www.dodomat.com', true, 'active_trade', '{insulation}', '{Dodo Mat}', 'Sound deadening and thermal insulation specialists.'),
    (gen_random_uuid(), 'Gaslow', 'https://www.gaslowdirect.com', true, 'active_trade', '{gas}', '{Gaslow}', 'Refillable LPG system specialists.'),
    (gen_random_uuid(), 'Jackson Leisure', 'https://www.jacksonsleisure.com', true, 'applied', '{general, appliance}', '{Dometic, Thetford, Fiamma}', 'Major distributor for caravan and motorhome parts.'),
    (gen_random_uuid(), 'Rainbow Conversions', 'https://www.rainbow-conversions.co.uk', true, 'potential', '{general, furniture}', '{SCA, RIB}', 'One of the UK largest conversion equipment suppliers.'),
    (gen_random_uuid(), 'Transporter HQ', 'https://www.transporterhq.co.uk', true, 'active_trade', '{exterior, hardware}', '{THQ, Bilstein}', 'VW Transporter specialist hardware and styling.'),
    (gen_random_uuid(), 'Megavanmats', 'https://www.megavanmats.com', true, 'active_trade', '{interiors, insulation}', '{Megavanmats, Trimberry}', 'Leading supplier for lining carpets and adhesives.')
    ON CONFLICT (name) DO NOTHING;
END $$;
