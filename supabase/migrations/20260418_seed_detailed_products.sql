-- Job 4 & 6: Seed Detailed Products, Descriptions, and Category Images
DO $$ 
BEGIN
    -- 1. Updates for Electrical Products
    UPDATE public.products SET 
        description = 'The MultiPlus-II combines a powerful 3000VA pure sine wave inverter, a 120A adaptive battery charger, and an automatic AC transfer switch into a single compact unit. Designed for demanding off-grid installations, it seamlessly switches between shore power, generator, and inverter modes with zero transfer time for connected loads. The built-in GX communication port allows direct connection to a Cerbo GX for full system monitoring via the VRM portal. PowerAssist technology supplements shore or generator power with battery power during peak demand, making it possible to run high-draw appliances even on a limited shore connection. This is the unit specified in our Full Autonomy electrical tier and used in the majority of professional UK van conversions.',
        subcategory = 'inverters',
        is_editor_pick = true,
        images = '["/images/electrical-technical.png"]'::jsonb
    WHERE slug = 'victron-multiplus-ii-3000';

    UPDATE public.products SET 
        description = 'The brain of any serious Victron system. The Cerbo GX is a monitoring and control hub that connects to every Victron component in your installation — inverter/charger, MPPT, SmartShunt, batteries — and provides real-time system data via the built-in touchscreen (GX Touch sold separately), the VRM online portal, or the VictronConnect app. It enables remote monitoring from anywhere in the world, data logging, programmable relay control, and integration with tank level sensors and temperature probes. If you''re building a Full Autonomy system, this is non-negotiable.',
        subcategory = 'monitoring',
        images = '["/images/electrical-technical.png"]'::jsonb
    WHERE slug = 'victron-cerbo-gx';

    UPDATE public.products SET 
        description = 'A 30A solar charge controller with Victron''s ultra-fast Maximum Power Point Tracking algorithm. Handles up to 100V input from your solar array and delivers optimised charging to your 12V or 24V battery bank. Built-in Bluetooth for monitoring and configuration via the VictronConnect app. The adaptive 3-stage charging algorithm (bulk, absorption, float) is pre-configured for lithium (LiFePO4) and lead-acid batteries. Suitable for solar arrays up to approximately 440W on a 12V system. This is the controller we specify in both our Grid Independent and Full Autonomy tiers.',
        subcategory = 'mppt-controllers',
        images = '["/images/electrical-technical.png"]'::jsonb
    WHERE slug = 'victron-smartsolar-mppt-100-30';

    UPDATE public.products SET 
        description = 'A smart DC-DC charger that charges your leisure battery bank from your vehicle''s alternator while protecting both the starter battery and the alternator from damage. Unlike a basic split charge relay, the Orion-Tr Smart provides a proper multi-stage charge profile (bulk, absorption, float) which is essential for lithium battery health and longevity. 30A output delivers up to 360W of charging power while driving. Built-in Bluetooth for monitoring and configuration. Adaptive start/stop engine detection works with modern Euro 6 smart alternators without issues. Specified in our Grid Independent tier and above — if you have lithium batteries, this replaces the old-fashioned split charge relay.',
        subcategory = 'dc-dc-chargers',
        images = '["/images/electrical-technical.png"]'::jsonb
    WHERE slug = 'victron-orion-tr-smart-12-12-30';

    UPDATE public.products SET 
        description = 'A precision battery monitor that tracks every amp in and out of your battery bank to calculate accurate state of charge, time remaining, and historical consumption data. Connects via Bluetooth to the VictronConnect app and integrates with the Cerbo GX for system-wide monitoring. The 500A shunt handles even the largest campervan systems. Unlike a basic voltmeter (which only tells you voltage, not actual remaining capacity), the SmartShunt gives you a genuine fuel gauge for your batteries. Essential for any system where you need to know how much power you actually have left.',
        subcategory = 'monitoring',
        images = '["/images/electrical-technical.png"]'::jsonb
    WHERE slug = 'victron-smartshunt-500a';

    UPDATE public.products SET 
        description = 'Victron''s own lithium iron phosphate battery with integrated BMS (Battery Management System) and Bluetooth connectivity. The built-in BMS protects against over-charge, over-discharge, over-current, and over-temperature — and communicates directly with Victron inverter/chargers for coordinated system protection. 330Ah of usable capacity at 12.8V nominal provides over 4kWh of stored energy. LiFePO4 chemistry offers 2,500+ cycle life at 80% depth of discharge, roughly 5× the lifespan of an equivalent AGM battery. Compatible with the Victron Lynx Smart BMS for multi-battery bank management.',
        subcategory = 'batteries',
        images = '["/images/electrical-technical.png"]'::jsonb
    WHERE slug = 'victron-lifepo4-330ah';

    UPDATE public.products SET 
        description = 'A DC power distribution system that replaces traditional busbar and fuse setups with a clean, modular approach. Each connection point uses a Mega-fuse for protection, and the integrated busbar distributes DC power to all connected devices (inverter, charger, DC-DC, loads). Designed to work with the Lynx Smart BMS for lithium battery systems, and integrates with the Cerbo GX for fuse-blown alerts. Dramatically simplifies wiring in complex electrical installations and provides a professional, service-friendly layout. One Lynx Distributor typically handles an entire Full Autonomy tier installation.',
        subcategory = 'cables-fuses',
        images = '["/images/electrical-technical.png"]'::jsonb
    WHERE slug = 'victron-lynx-distributor';

    -- 2. General Image Mapping for other categories
    UPDATE public.products p
    SET images = '["/images/heating-system-technical.png"]'::jsonb
    FROM public.product_categories c
    WHERE p.category_id = c.id AND c.slug = 'climate-control' AND p.images = '[]'::jsonb;

    UPDATE public.products p
    SET images = '["/images/water-plumbing-technical.png"]'::jsonb
    FROM public.product_categories c
    WHERE p.category_id = c.id AND c.slug IN ('water-plumbing', 'plumbing') AND p.images = '[]'::jsonb;

    UPDATE public.products p
    SET images = '["/images/insulation-technical.png"]'::jsonb
    FROM public.product_categories c
    WHERE p.category_id = c.id AND c.slug = 'insulation-build' AND p.images = '[]'::jsonb;

    UPDATE public.products p
    SET images = '["/images/gas-lpg-technical.png"]'::jsonb
    FROM public.product_categories c
    WHERE p.category_id = c.id AND c.slug = 'gas-lpg' AND p.images = '[]'::jsonb;

    UPDATE public.products p
    SET images = '["/images/interior-showcase.png"]'::jsonb
    FROM public.product_categories c
    WHERE p.category_id = c.id AND c.slug = 'windows-ventilation' AND p.images = '[]'::jsonb;

    UPDATE public.products p
    SET images = '["/images/exterior-equipment-technical.png"]'::jsonb
    FROM public.product_categories c
    WHERE p.category_id = c.id AND c.slug = 'chassis-exterior' AND p.images = '[]'::jsonb;

    -- 3. Setting related product IDs for MultiPlus (Works well with...)
    -- We need to fetch the IDs first or use slugs in a subquery
    UPDATE public.products SET related_product_ids = (
        SELECT array_agg(id) FROM public.products WHERE slug IN ('victron-smartsolar-mppt-100-30', 'victron-smartshunt-500a', 'victron-cerbo-gx', 'victron-lifepo4-330ah')
    ) WHERE slug = 'victron-multiplus-ii-3000';

END $$;
