export interface Supplier {
  id: string;
  name: string;
  website: string;
  status: 'active_trade' | 'potential';
  categories: string[];
  description: string;
}

export const supplierData: Supplier[] = [
  { id: 'energy-solutions', name: 'Energy Solutions', website: 'https://energy-solutions.co.uk', status: 'active_trade', categories: ['electrical', 'solar'], description: 'Victron full range — inverters, chargers, MPPT, batteries, monitors.' },
  { id: 'callidus-trade', name: 'Callidus Trade', website: 'https://callidus.shop', status: 'active_trade', categories: ['electrical', 'solar'], description: 'Victron full range, solar panels, batteries. Devon-based.' },
  { id: 'energy-monkey', name: 'Energy Monkey', website: 'https://energymonkey.co.uk', status: 'active_trade', categories: ['electrical', 'solar', 'batteries'], description: 'Victron specialist, off-grid systems, LiFePO4. Gloucestershire.' },
  { id: 'midsummer-energy', name: 'Midsummer Energy', website: 'https://midsummerenergy.co.uk', status: 'active_trade', categories: ['electrical', 'solar'], description: 'Victron, solar panels, charge controllers, mounting. Cambridge-based.' },
  { id: 'fogstar', name: 'Fogstar', website: 'https://fogstar.co.uk', status: 'potential', categories: ['electrical', 'batteries'], description: "LiFePO4 batteries (Drift range) — UK's leading van battery brand." },
  { id: '12volt-planet', name: '12 Volt Planet', website: 'https://12voltplanet.co.uk', status: 'active_trade', categories: ['electrical', 'components'], description: '12V components — fuse boxes, switches, cable, terminals, connectors.' },
  { id: 'alpha-batteries', name: 'Alpha Batteries', website: 'https://alpha-batteries.co.uk', status: 'active_trade', categories: ['electrical', 'batteries', 'kits'], description: 'Victron kits, leisure batteries, chargers, solar kits.' },
  { id: 'butler-technik', name: 'Butler Technik', website: 'https://butlertechnik.com', status: 'active_trade', categories: ['heating', 'electrical'], description: 'Webasto, Eberspächer, Truma — heaters, parts, service kits.' },
  { id: 'jacksons-leisure', name: 'Jacksons Leisure', website: 'https://jacksonsleisure.com', status: 'active_trade', categories: ['heating', 'water', 'leisure'], description: 'Truma (Combi, VarioHeat), Propex, Webasto.' },
  { id: 'pb-auto-electrics', name: 'PB Auto Electrics', website: 'https://pbautoelectrics.co.uk', status: 'active_trade', categories: ['heating', 'electrical'], description: 'Webasto, Eberspächer, Truma heaters and service kits.' },
  { id: 'nomadic-leisure', name: 'Nomadic Leisure', website: 'https://nomadicleisure.co.uk', status: 'active_trade', categories: ['heating', 'kits'], description: 'Truma complete kits, Webasto, ducting, controllers.' },
  { id: 'cak-tanks', name: 'CAK Tanks', website: 'https://caktanks.co.uk', status: 'active_trade', categories: ['water', 'plumbing', 'tanks'], description: 'Water tanks (custom + off-the-shelf), SMEV sinks, pumps.' },
  { id: 'leisurelines', name: 'Leisurelines', website: 'https://leisurelines.co.uk', status: 'active_trade', categories: ['water', 'plumbing', 'tanks'], description: 'Water tanks, pumps, taps, waste systems, shower trays.' },
  { id: 'sound-deadening-shop', name: 'Sound Deadening Shop', website: 'https://deadening.co.uk', status: 'potential', categories: ['insulation', 'deadening'], description: 'Dodo Mat products, pre-made van kits, Silent Coat.' },
  { id: 'wickes', name: 'Wickes', website: 'https://wickes.co.uk', status: 'active_trade', categories: ['furniture', 'cladding', 'timber'], description: 'Birch ply, PIR insulation, general timber.' },
  { id: 'maxxair', name: 'MaxxAir', website: 'https://maxxair.com', status: 'potential', categories: ['ventilation'], description: 'MaxxFan Deluxe roof vent fans.' },
  { id: 'thetford-marine', name: 'Thetford', website: 'https://thetfordmarine.com', status: 'potential', categories: ['plumbing', 'sanitation', 'cooking'], description: 'Cassette toilets, chemicals, gas hobs and ovens.' },
  { id: 'general-water-filtration', name: 'General Ecology', website: 'https://generalecology.com', status: 'potential', categories: ['water', 'filtration'], description: 'Nature Pure ultrafine water purifiers.' },
  { id: 'ebay-motors-uk', name: 'eBay Motors UK', website: 'https://ebay.co.uk', status: 'active_trade', categories: ['general'], description: 'UK marketplace for parts and vehicles.' }
];
