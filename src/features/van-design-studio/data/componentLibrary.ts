import type { ComponentDefinition } from '../types';

export const COMPONENT_LIBRARY: ComponentDefinition[] = [
  // SLEEPING
  { id: 'fixed-bed', name: 'Fixed Bed', category: 'Sleeping', widthMm: 1900, depthMm: 1400, heightMm: 300, weightKg: 35, estimatedCost: 450, systemType: 'structural', storeCategory: 'Interior & Furniture', description: 'Fixed platform bed fitted to chassis width. Smart component — auto-fits to van interior width.', defaultPlacement: 'rear', defaultHeightMm: 700 },
  { id: 'rock-roll-bed', name: 'Rock & Roll Bed', category: 'Sleeping', widthMm: 1400, depthMm: 1100, heightMm: 900, weightKg: 55, estimatedCost: 1200, systemType: 'structural', storeCategory: 'Interior & Furniture', description: 'Fold-out seating that converts to a bed. Popular for day-to-night conversions.', defaultPlacement: 'rear', defaultHeightMm: 450 },
  { id: 'single-bunk', name: 'Single Bunk', category: 'Sleeping', widthMm: 900, depthMm: 1950, heightMm: 200, weightKg: 20, estimatedCost: 280, systemType: 'structural', storeCategory: 'Interior & Furniture', description: 'Single overhead or lower bunk. Good for family builds or children\'s sleeping space.', defaultPlacement: 'rear', defaultHeightMm: 1300 },
  { id: 'dinette-bed', name: 'Convertible Dinette Bed', category: 'Sleeping', widthMm: 1200, depthMm: 1400, heightMm: 750, weightKg: 45, estimatedCost: 900, systemType: 'structural', storeCategory: 'Interior & Furniture', description: 'Dinette seating area that converts to a double sleeping space.', defaultPlacement: 'middle', defaultHeightMm: 450 },

  // KITCHEN
  { id: 'kitchen-galley', name: 'Kitchen Galley Unit', category: 'Kitchen', widthMm: 1200, depthMm: 600, heightMm: 900, weightKg: 40, estimatedCost: 800, systemType: 'general', storeCategory: 'Interior & Furniture', description: 'Full galley kitchen unit with worktop. Fits hob, sink, and under-counter storage.', defaultPlacement: 'middle', defaultHeightMm: 0 },
  { id: 'hob-unit', name: 'Hob Unit', category: 'Kitchen', widthMm: 600, depthMm: 500, heightMm: 50, weightKg: 8, estimatedCost: 220, systemType: 'general', storeCategory: 'Gas & Cooking', description: '2-burner LPG or induction hob. Flush-mount into worktop.', defaultPlacement: 'middle', defaultHeightMm: 900 },
  { id: 'sink-unit', name: 'Sink Unit', category: 'Kitchen', widthMm: 400, depthMm: 400, heightMm: 150, weightKg: 6, estimatedCost: 180, systemType: 'plumbing', storeCategory: 'Water & Plumbing', description: 'Stainless sink with drainer. Connects to fresh and waste water system.', defaultPlacement: 'middle', defaultHeightMm: 900 },
  { id: 'fridge', name: 'Compressor Fridge', category: 'Kitchen', widthMm: 500, depthMm: 500, heightMm: 850, weightKg: 22, estimatedCost: 550, systemType: 'electrical', storeCategory: 'Appliances', description: '12V compressor fridge. High efficiency, runs from leisure battery.', defaultPlacement: 'middle', defaultHeightMm: 0 },
  { id: 'overhead-kitchen-cabinet', name: 'Overhead Kitchen Cabinet', category: 'Kitchen', widthMm: 1000, depthMm: 350, heightMm: 400, weightKg: 15, estimatedCost: 320, systemType: 'structural', storeCategory: 'Interior & Furniture', description: 'Wall-mounted overhead cabinet above kitchen area.', defaultPlacement: 'middle', defaultHeightMm: 1400 },

  // STORAGE
  { id: 'tall-wardrobe', name: 'Tall Wardrobe', category: 'Storage', widthMm: 600, depthMm: 500, heightMm: 1700, weightKg: 30, estimatedCost: 400, systemType: 'structural', storeCategory: 'Interior & Furniture', description: 'Floor-to-ceiling wardrobe with hanging space and shelves.', defaultPlacement: 'front', defaultHeightMm: 0 },
  { id: 'overhead-locker', name: 'Overhead Locker', category: 'Storage', widthMm: 900, depthMm: 350, heightMm: 400, weightKg: 12, estimatedCost: 260, systemType: 'structural', storeCategory: 'Interior & Furniture', description: 'High-mounted storage locker. Ideal for lightweight items.', defaultPlacement: 'any', defaultHeightMm: 1400 },
  { id: 'rear-garage', name: 'Rear Garage Storage', category: 'Storage', widthMm: 1500, depthMm: 800, heightMm: 600, weightKg: 25, estimatedCost: 350, systemType: 'structural', storeCategory: 'Interior & Furniture', description: 'Under-bed rear garage storage. Accessed via rear doors or side hatch.', defaultPlacement: 'rear', defaultHeightMm: 0 },
  { id: 'drawer-unit', name: 'Drawer Unit', category: 'Storage', widthMm: 600, depthMm: 500, heightMm: 700, weightKg: 18, estimatedCost: 280, systemType: 'structural', storeCategory: 'Interior & Furniture', description: 'Multi-drawer storage unit. Under-counter or freestanding.', defaultPlacement: 'any', defaultHeightMm: 0 },

  // ELECTRICAL
  { id: 'leisure-battery', name: 'Leisure Battery (100Ah)', category: 'Electrical', widthMm: 350, depthMm: 175, heightMm: 190, weightKg: 28, estimatedCost: 180, systemType: 'electrical', storeCategory: 'Power & Solar', description: 'AGM or lithium leisure battery. Core of the 12V electrical system.', defaultPlacement: 'front', defaultHeightMm: 0 },
  { id: 'inverter', name: 'Inverter (1000W)', category: 'Electrical', widthMm: 350, depthMm: 200, heightMm: 100, weightKg: 4, estimatedCost: 280, systemType: 'electrical', storeCategory: 'Power & Solar', description: '12V to 230V inverter. Powers mains devices from leisure battery.', defaultPlacement: 'front', defaultHeightMm: 200 },
  { id: 'dcdc-charger', name: 'DC-DC Charger', category: 'Electrical', widthMm: 200, depthMm: 150, heightMm: 80, weightKg: 2, estimatedCost: 220, systemType: 'electrical', storeCategory: 'Power & Solar', description: 'Charges leisure battery from alternator while driving. Essential for modern vehicles.', defaultPlacement: 'front', defaultHeightMm: 300 },
  { id: 'solar-controller', name: 'Solar Controller (MPPT)', category: 'Electrical', widthMm: 180, depthMm: 100, heightMm: 60, weightKg: 1, estimatedCost: 160, systemType: 'electrical', storeCategory: 'Power & Solar', description: 'MPPT solar charge controller. Manages power from roof solar panels.', defaultPlacement: 'front', defaultHeightMm: 400 },
  { id: 'fuse-board', name: 'Fuse Board / Consumer Unit', category: 'Electrical', widthMm: 300, depthMm: 100, heightMm: 200, weightKg: 2, estimatedCost: 120, systemType: 'electrical', storeCategory: 'Power & Solar', description: 'Central fuse board protecting all 12V circuits. Essential safety component.', defaultPlacement: 'front', defaultHeightMm: 400 },
  { id: 'switch-panel', name: 'Switch Panel', category: 'Electrical', widthMm: 200, depthMm: 50, heightMm: 100, weightKg: 0.5, estimatedCost: 80, systemType: 'electrical', storeCategory: 'Power & Solar', description: 'Rocker switch panel for 12V circuits. Typically mounted near living area.', defaultPlacement: 'any', defaultHeightMm: 900 },
  { id: 'relay-module', name: 'Relay Module', category: 'Electrical', widthMm: 150, depthMm: 100, heightMm: 60, weightKg: 0.5, estimatedCost: 60, systemType: 'electrical', storeCategory: 'Power & Solar', description: 'Relay module for controlling high-current circuits. Used with heating, lighting etc.', defaultPlacement: 'front', defaultHeightMm: 350 },

  // PLUMBING
  { id: 'fresh-water-tank', name: 'Fresh Water Tank (80L)', category: 'Plumbing', widthMm: 800, depthMm: 400, heightMm: 250, weightKg: 3, estimatedCost: 180, systemType: 'plumbing', storeCategory: 'Water & Plumbing', description: 'Underslung or under-floor fresh water tank. Rated for potable water.', defaultPlacement: 'middle', defaultHeightMm: 0 },
  { id: 'waste-water-tank', name: 'Waste Water Tank (60L)', category: 'Plumbing', widthMm: 700, depthMm: 350, heightMm: 200, weightKg: 2, estimatedCost: 140, systemType: 'plumbing', storeCategory: 'Water & Plumbing', description: 'Grey waste collection tank. Underslung or under-floor placement.', defaultPlacement: 'middle', defaultHeightMm: 0 },
  { id: 'water-pump', name: '12V Water Pump', category: 'Plumbing', widthMm: 200, depthMm: 100, heightMm: 80, weightKg: 1, estimatedCost: 90, systemType: 'plumbing', storeCategory: 'Water & Plumbing', description: 'Demand water pump. Activates when tap is opened.', defaultPlacement: 'middle', defaultHeightMm: 200 },
  { id: 'shower-tray', name: 'Shower Tray & Cubicle', category: 'Plumbing', widthMm: 700, depthMm: 700, heightMm: 100, weightKg: 12, estimatedCost: 380, systemType: 'plumbing', storeCategory: 'Water & Plumbing', description: 'Wet room shower tray with fold-down door or curtain. Plumbed to grey waste.', defaultPlacement: 'front', defaultHeightMm: 0 },
  { id: 'toilet-cubicle', name: 'Toilet Cubicle', category: 'Plumbing', widthMm: 700, depthMm: 600, heightMm: 400, weightKg: 10, estimatedCost: 450, systemType: 'plumbing', storeCategory: 'Toilets & Washroom', description: 'Cassette or composting toilet with dedicated cubicle space.', defaultPlacement: 'front', defaultHeightMm: 0 },
  { id: 'water-heater', name: 'Water Heater', category: 'Plumbing', widthMm: 450, depthMm: 300, heightMm: 600, weightKg: 14, estimatedCost: 480, systemType: 'plumbing', storeCategory: 'Water & Plumbing', description: 'Combi or dedicated water heater. Gas or diesel-powered hot water on demand.', defaultPlacement: 'front', defaultHeightMm: 0 },

  // HEATING
  { id: 'diesel-heater', name: 'Diesel Heater', category: 'Heating', widthMm: 300, depthMm: 200, heightMm: 150, weightKg: 4, estimatedCost: 650, systemType: 'general', storeCategory: 'Climate & Heating', description: 'Diesel air heater. Runs independently of vehicle engine. Fuel-efficient.', defaultPlacement: 'front', defaultHeightMm: 0 },
  { id: 'hot-air-outlet', name: 'Hot Air Outlet', category: 'Heating', widthMm: 200, depthMm: 100, heightMm: 80, weightKg: 0.5, estimatedCost: 40, systemType: 'general', storeCategory: 'Climate & Heating', description: 'Ducted outlet for air heating system. Position near floor for best circulation.', defaultPlacement: 'any', defaultHeightMm: 100 },
  { id: 'thermostat-panel', name: 'Thermostat Panel', category: 'Heating', widthMm: 120, depthMm: 30, heightMm: 80, weightKg: 0.2, estimatedCost: 60, systemType: 'electrical', storeCategory: 'Climate & Heating', description: 'Digital thermostat for heating system control. Wall-mounted in living area.', defaultPlacement: 'any', defaultHeightMm: 1200 },

  // APPLIANCES
  { id: 'microwave', name: 'Microwave', category: 'Appliances', widthMm: 480, depthMm: 400, heightMm: 280, weightKg: 12, estimatedCost: 120, systemType: 'electrical', storeCategory: 'Appliances', description: 'Compact 230V microwave. Requires inverter or hook-up power.', defaultPlacement: 'any', defaultHeightMm: 900 },
  { id: 'roof-vent', name: 'Roof Vent Fan', category: 'Appliances', widthMm: 400, depthMm: 400, heightMm: 100, weightKg: 2, estimatedCost: 220, systemType: 'electrical', storeCategory: 'Climate & Heating', description: 'Powered roof vent fan with rain sensor. Essential for ventilation.', defaultPlacement: 'middle', defaultHeightMm: 1800 },
  { id: 'extractor-fan', name: 'Extractor Fan', category: 'Appliances', widthMm: 150, depthMm: 150, heightMm: 80, weightKg: 0.5, estimatedCost: 45, systemType: 'electrical', storeCategory: 'Climate & Heating', description: '12V kitchen extractor fan. Removes cooking odours and moisture.', defaultPlacement: 'middle', defaultHeightMm: 1600 },

  // SAFETY
  { id: 'fire-extinguisher', name: 'Fire Extinguisher', category: 'Safety', widthMm: 150, depthMm: 150, heightMm: 400, weightKg: 2, estimatedCost: 35, systemType: 'safety', storeCategory: 'Safety', description: 'Dry powder or CO2 fire extinguisher. Mount near exit in accessible location.', defaultPlacement: 'front', defaultHeightMm: 600 },
  { id: 'co-alarm', name: 'Carbon Monoxide Alarm', category: 'Safety', widthMm: 120, depthMm: 40, heightMm: 120, weightKg: 0.2, estimatedCost: 25, systemType: 'safety', storeCategory: 'Safety', description: 'EN50291 certified CO alarm. Mandatory for gas/diesel heating systems.', defaultPlacement: 'any', defaultHeightMm: 1500 },
  { id: 'gas-locker', name: 'Gas Locker', category: 'Safety', widthMm: 500, depthMm: 400, heightMm: 600, weightKg: 8, estimatedCost: 280, systemType: 'safety', storeCategory: 'Safety', description: 'Ventilated, sealed gas bottle locker with drain. Required for LPG installations.', defaultPlacement: 'rear', defaultHeightMm: 0 },
  { id: 'first-aid-kit', name: 'First Aid Kit', category: 'Safety', widthMm: 250, depthMm: 80, heightMm: 200, weightKg: 1, estimatedCost: 30, systemType: 'safety', storeCategory: 'Safety', description: 'Comprehensive first aid kit. Mount in accessible, visible location.', defaultPlacement: 'any', defaultHeightMm: 1000 },
];

export function getComponentById(id: string): ComponentDefinition | undefined {
  return COMPONENT_LIBRARY.find((c) => c.id === id);
}

export const COMPONENT_CATEGORIES = [
  'Sleeping', 'Kitchen', 'Storage', 'Electrical',
  'Plumbing', 'Heating', 'Appliances', 'Safety', 'Seating'
] as const;

export const FIXED_BED_ID = 'fixed-bed';
