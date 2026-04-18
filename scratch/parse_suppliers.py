
import json

# Data extracted from user prompt
suppliers_raw = [
    # Category: ELECTRICAL & SOLAR
    {"name": "Energy Solutions", "website": "https://energy-solutions.co.uk", "trade_account": True, "status": "active_trade", "categories": ["electrical", "solar"], "notes": "Victron full range — inverters, chargers, MPPT, batteries, monitors. First call for Victron. Technical support team."},
    {"name": "Callidus Trade", "website": "https://callidus.shop", "trade_account": True, "status": "active_trade", "categories": ["electrical", "solar"], "notes": "Victron full range, solar panels, batteries. Devon-based. 01626 563563"},
    {"name": "Energy Monkey", "website": "https://energymonkey.co.uk", "trade_account": True, "status": "active_trade", "categories": ["electrical", "solar", "batteries"], "notes": "Victron specialist, off-grid systems, LiFePO4. Gloucestershire. 01452 699300. Family-run, excellent technical support."},
    {"name": "Midsummer Energy", "website": "https://midsummerenergy.co.uk", "trade_account": True, "status": "active_trade", "categories": ["electrical", "solar"], "notes": "Victron, solar panels, charge controllers, mounting. Cambridge-based. Strong on solar panels."},
    {"name": "Fogstar", "website": "https://fogstar.co.uk", "trade_account": False, "status": "potential", "categories": ["electrical", "batteries"], "notes": "LiFePO4 batteries (Drift range) — UK's leading van battery brand. Hugely popular in UK self-build community."},
    {"name": "Renogy UK", "website": "https://renogy.co.uk", "trade_account": False, "status": "potential", "categories": ["electrical", "solar"], "notes": "Solar panels, charge controllers, batteries, inverters. Budget-friendly Victron alternative."},
    {"name": "12 Volt Planet", "website": "https://12voltplanet.co.uk", "trade_account": True, "status": "active_trade", "categories": ["electrical", "components"], "notes": "12V components — fuse boxes, switches, cable, terminals, connectors. Essential for all the small components."},
    {"name": "Bimble Solar", "website": "https://bimblesolar.com", "trade_account": True, "status": "active_trade", "categories": ["electrical", "solar"], "notes": "Solar panels, MPPT controllers, cables, connectors, mounting kits. UK-based solar specialist."},
    {"name": "Alpha Batteries", "website": "https://alpha-batteries.co.uk", "trade_account": True, "status": "active_trade", "categories": ["electrical", "batteries", "kits"], "notes": "Victron kits, leisure batteries, chargers, solar kits. Stock complete Victron off-grid conversion kits."},
    {"name": "Butler Technik", "website": "https://butlertechnik.com", "trade_account": True, "status": "active_trade", "categories": ["electrical", "kits"], "notes": "Victron power upgrade kits, batteries, inverters. Specialise in pre-configured Victron kits."},

    # Category: HEATING & HOT WATER
    {"name": "Jacksons Leisure", "website": "https://jacksonsleisure.com", "trade_account": True, "status": "active_trade", "categories": ["heating", "water", "leisure"], "notes": "Truma (Combi, VarioHeat), Propex, Webasto. Stock complete Truma Combi kits with all ducting."},
    {"name": "PB Auto Electrics", "website": "https://pbautoelectrics.co.uk", "trade_account": True, "status": "active_trade", "categories": ["heating", "electrical"], "notes": "Webasto, Eberspächer, Truma — heaters, parts, service kits. Specialist in vehicle heating."},
    {"name": "Webasto UK", "website": "https://webasto-comfort.com/en-gb", "trade_account": True, "status": "potential", "categories": ["heating", "climate"], "notes": "Webasto diesel heaters (Air Top range), water heaters. Contact UK office directly for trade account."},
    {"name": "Eberspächer UK", "website": "https://eberspacher.com", "trade_account": True, "status": "potential", "categories": ["heating", "climate"], "notes": "Eberspächer diesel heaters (Airtronic range), water heaters. Contact UK sales team."},
    {"name": "Propex", "website": "https://propexheatsource.co.uk", "trade_account": False, "status": "potential", "categories": ["heating", "gas"], "notes": "Propex HS2000, HS2211 — LPG blown-air heaters. UK manufacturer — contact direct. Popular budget-friendly LPG heater."},
    {"name": "Nomadic Leisure", "website": "https://nomadicleisure.co.uk", "trade_account": True, "status": "active_trade", "categories": ["heating", "kits"], "notes": "Truma complete kits, Webasto, ducting, controllers. Good pre-packaged Truma installation kits."},

    # Category: WATER & PLUMBING
    {"name": "CAK Tanks", "website": "https://caktanks.co.uk", "trade_account": True, "status": "active_trade", "categories": ["water", "plumbing", "tanks"], "notes": "Water tanks (custom + off-the-shelf), SMEV sinks, pumps, taps, plumbing fittings. Specialist in tanks."},
    {"name": "Whale Pumps", "website": "https://whalepumps.com", "trade_account": False, "status": "potential", "categories": ["water", "plumbing"], "notes": "Water pumps (Ultraflow, Gulper), taps, shower fittings, water systems. Premium pump brand."},
    {"name": "John Guest / Speedfit", "website": "https://johnguest.com", "trade_account": False, "status": "potential", "categories": ["plumbing", "fittings"], "notes": "Push-fit plumbing fittings, pipe, valves. The standard for campervan plumbing."},
    {"name": "Leisurelines", "website": "https://leisurelines.co.uk", "trade_account": True, "status": "active_trade", "categories": ["water", "plumbing", "tanks"], "notes": "Water tanks, pumps, taps, waste systems, shower trays. Good range of purpose-built campervan tanks."},

    # Category: INSULATION & SOUND DEADENING
    {"name": "Dodo Mat", "website": "https://dodomat.com", "trade_account": False, "status": "potential", "categories": ["insulation", "deadening"], "notes": "DEADN Hex/Pro butyl sound deadening, Thermo Liner, Thermo Fleece, floor insulation. THE UK brand for van sound deadening."},
    {"name": "Sound Deadening Shop", "website": "https://deadening.co.uk", "trade_account": False, "status": "potential", "categories": ["insulation", "deadening"], "notes": "Dodo Mat products, pre-made van kits, Silent Coat. Retail + bulk pricing."},
    {"name": "Kilmat", "website": "https://kilmat.com", "trade_account": False, "status": "potential", "categories": ["insulation", "deadening"], "notes": "Budget butyl sound deadening mats (80 mil). Budget alternative to Dodo."},
    {"name": "Celotex / Kingspan", "website": "https://celotex.co.uk", "trade_account": False, "status": "potential", "categories": ["insulation"], "notes": "PIR rigid insulation board (25mm, 50mm, 75mm). The gold standard rigid insulation."},
    {"name": "3M Thinsulate", "website": "https://3m.co.uk", "trade_account": False, "status": "potential", "categories": ["insulation"], "notes": "Thinsulate SM600L automotive insulation. Flexible, excellent for ceilings and curved surfaces."},

    # Category: PANELLING, CLADDING & FURNITURE PLY
    {"name": "Grassroutes Leisure", "website": "https://grassroutesleisure.co.uk", "trade_account": True, "status": "active_trade", "categories": ["furniture", "materials", "ply"], "notes": "Vöhringer lightweight ply, furniture materials. UK's main Vöhringer distributor. Used by professional converters."},
    {"name": "Premier Forest (Superva)", "website": "https://premierforest.co.uk", "trade_account": True, "status": "active_trade", "categories": ["furniture", "materials", "ply", "cnc"], "notes": "Superva lightweight laminated ply panels. CNC cutting + edge banding service. Used by pro converters."},
    {"name": "Panel Company", "website": "https://panelcompany.co.uk", "trade_account": True, "status": "active_trade", "categories": ["furniture", "cladding", "pvcp"], "notes": "PVC wall panels, waterproof cladding, wood-effect panels. Good for wet room/shower areas."},
    {"name": "Wickes / Homebase", "website": "https://wickes.co.uk", "trade_account": True, "status": "active_trade", "categories": ["furniture", "cladding", "timber"], "notes": "Tongue & groove spruce cladding, birch ply, general timber. Budget option for wall cladding."},
    {"name": "Robbins Timber", "website": "https://robbinstimber.co.uk", "trade_account": True, "status": "active_trade", "categories": ["furniture", "materials", "timber"], "notes": "Birch plywood (all grades), marine ply, hardwoods, veneers. Bristol-based."},

    # Category: WINDOWS, DOORS & VENTILATION
    {"name": "Wholesale Van Accessories", "website": "https://wholesalevanaccessories.co.uk", "trade_account": True, "status": "active_trade", "categories": ["windows", "hardware"], "notes": "Conversion windows (trade supply), bonded windows, rubber seal windows. Supply windows to biggest UK converters."},
    {"name": "Kiravans", "website": "https://kiravans.co.uk", "trade_account": True, "status": "active_trade", "categories": ["windows", "hardware", "accessories"], "notes": "Barn door windows, tailgate windows, bonded glass, privacy glass. Innovators — designed original T5/T6 barn door window."},
    {"name": "Dometic UK", "website": "https://dometic.com/en-gb", "trade_account": False, "status": "potential", "categories": ["windows", "ventilation", "climate"], "notes": "Dometic S4 sliding windows, Seitz rooflights. The premium window choice."},
    {"name": "MaxxAir", "website": "https://maxxair.com", "trade_account": False, "status": "potential", "categories": ["ventilation"], "notes": "MaxxFan Deluxe roof vent fans. The #1 roof vent for conversions."},
    {"name": "Fiamma", "website": "https://fiamma.com", "trade_account": False, "status": "potential", "categories": ["ventilation", "externals"], "notes": "Roof vents, turbo vents, hatches. Budget roof vent options alongside MaxxAir."},

    # Category: WHEELS, TYRES & EXTERIOR
    {"name": "Elite Wheels", "website": "https://elitewheels.co.uk", "trade_account": False, "status": "potential", "categories": ["wheels", "tyres", "externals"], "notes": "Alloy wheels + AT tyre packages for Ducato/Boxer/Relay, Sprinter, Crafter. Specialist in van wheels."},
    {"name": "4×4 Tyres", "website": "https://4x4tyres.co.uk", "trade_account": False, "status": "potential", "categories": ["tyres", "externals"], "notes": "BFGoodrich KO2, KO3, Falken Wildpeak AT3W, all-terrain tyres. UK's leading BFG/AT tyre supplier."},
    {"name": "3SDM", "website": "https://3sdm.co.uk", "trade_account": False, "status": "potential", "categories": ["wheels", "externals"], "notes": "Custom alloy wheels — UK manufactured, spin-forged. 0.66HD model rated for campervan weights."},
    {"name": "Transporter HQ", "website": "https://transporterhq.co.uk", "trade_account": True, "status": "active_trade", "categories": ["wheels", "externals", "styling"], "notes": "VW T5/T6 alloy wheels, styling, bumpers, lights, accessories. VW Transporter specialist."},
    {"name": "Thule", "website": "https://thule.com", "trade_account": False, "status": "potential", "categories": ["externals", "racks"], "notes": "Roof racks, bike carriers, awnings, steps. Premium exterior accessories."},

    # Category: LIGHTING
    {"name": "ATOM LED", "website": "https://atomled.co.uk", "trade_account": False, "status": "potential", "categories": ["lighting", "electrical"], "notes": "12V COB LED strip (motorhome-specific range). UK stock. 5-year warranty."},
    {"name": "LED Lighthouse", "website": "https://led-lighthouse.co.uk", "trade_account": False, "status": "potential", "categories": ["lighting", "electrical"], "notes": "12V LED strip, RGB strip for awnings, voltage regulators. Good for exterior/awning LED strip."},
    {"name": "UK LED Lights", "website": "https://ukledlights.co.uk", "trade_account": False, "status": "potential", "categories": ["lighting", "electrical"], "notes": "12V campervan LED strip, dimmers. Good budget range with campervan-specific collection."},
    {"name": "Litewave", "website": "https://litewave.co.uk", "trade_account": False, "status": "potential", "categories": ["lighting", "electrical"], "notes": "12V LED van lighting modules, bars, ultra-bright work lighting. More commercial focus."},

    # Category: GADGETS, TECH & ACCESSORIES
    {"name": "EcoFlow", "website": "https://ecoflow.com/uk", "trade_account": False, "status": "potential", "categories": ["tech", "power"], "notes": "Portable power stations (River, Delta), portable solar panels. Popular for supplementary power."},
    {"name": "Jackery", "website": "https://jackery.com/uk", "trade_account": False, "status": "potential", "categories": ["tech", "power"], "notes": "Portable power stations, solar generators. Competitor to EcoFlow."},
    {"name": "Thetford", "website": "https://thetfordmarine.com", "trade_account": False, "status": "potential", "categories": ["plumbing", "sanitation"], "notes": "Cassette toilets (C200, C400), toilet chemicals. The toilet brand for motorhomes."},
    {"name": "Nature's Head", "website": "https://natureshead.net", "trade_account": False, "status": "potential", "categories": ["plumbing", "sanitation", "eco"], "notes": "Composting toilets. The premium composting toilet. Growing in popularity."},
    {"name": "Phaesun / BougeRV", "website": "https://bougerv.co.uk", "trade_account": False, "status": "potential", "categories": ["tech", "cooling"], "notes": "12V portable fridges, portable AC, accessories. Budget alternative to Dometic fridges."},
    {"name": "Ring Automotive", "website": "https://ringautomotive.com", "trade_account": True, "status": "active_trade", "categories": ["tech", "electrical"], "notes": "12V inverters, compressors, battery chargers, work lights. Available through motor factors."},

    # Category: ONE-STOP-SHOP
    {"name": "UK Leisure Parts", "website": "https://ukleisureparts.co.uk", "trade_account": True, "status": "active_trade", "categories": ["general", "wholesale"], "notes": "Reimo (roofs, furniture), Dometic, Fiamma, Truma, Thetford, Thule. 350+ trade customers."},
    {"name": "Van Conversion Shop", "website": "https://vanconversionshop.co.uk", "trade_account": True, "status": "active_trade", "categories": ["general", "kits"], "notes": "Wide range — electrical, plumbing, heating, insulation, furniture, windows."},
    {"name": "Seaside Campers", "website": "https://seasidecampers.co.uk", "trade_account": True, "status": "active_trade", "categories": ["general", "bundles"], "notes": "Dodo insulation kits, Dometic, electrical, plumbing bundles."},
    {"name": "Magnum Motorhomes", "website": "https://magnummotorhomes.co.uk", "trade_account": False, "status": "potential", "categories": ["general", "leisure"], "notes": "Huge warehouse — everything from windows to toilets to awnings. Visit showroom recommended."},

    # Category: WHOLESALE-ONLY
    {"name": "Miriad Quest Leisure (MQL)", "website": "https://mql.co.uk", "trade_account": True, "status": "active_trade", "categories": ["wholesale", "trade-only"], "notes": "Trade-ONLY. 40+ years. All major brands. Catalogues available."},
    {"name": "LKQ Nova Leisure", "website": "https://novaleisure.com", "trade_account": True, "status": "active_trade", "categories": ["wholesale"], "notes": "Major UK leisure distributor. Credit + cash trade accounts."},
    {"name": "Leisure Spares", "website": "https://leisurespares.co.uk", "trade_account": False, "status": "potential", "categories": ["wholesale", "spares"], "notes": "Genuine spare parts for Dometic, Truma, Thetford, Seitz, SMEV. Mail order."},
]

print(json.dumps(suppliers_raw, indent=2))
