// src/lib/data/productRegistry.ts

export type SupplierType = 'internal' | 'affiliate' | 'quote' | 'preOrder' | 'referral' | 'digital';
export type PriceType = 'fixed' | 'from' | 'quote' | 'affiliate';
export type InstallStage = 
  | 'Stage 1: Planning & safety' 
  | 'Stage 2: Vehicle preparation' 
  | 'Stage 3: Insulation & sound deadening' 
  | 'Stage 4: First fix electrical' 
  | 'Stage 5: Solar & charging' 
  | 'Stage 6: Heating & ventilation' 
  | 'Stage 7: Water & plumbing' 
  | 'Stage 8: Gas/cooking' 
  | 'Stage 9: Interior fit-out' 
  | 'Stage 10: Security & finishing' 
  | 'Stage 11: Compliance review' 
  | 'Stage 12: Final upgrades';

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  subcategory: string;
  price: number;
  priceType: PriceType;
  supplierType: SupplierType;
  supplierName?: string;
  affiliateUrl?: string;
  commissionType?: 'percentage' | 'fixed' | 'lead';
  estimatedMargin?: number;
  leadCaptureRequired?: boolean;
  quoteRequired?: boolean;
  stockStatus: 'in-stock' | 'out-of-stock' | 'low-stock' | 'pre-order' | 'available';
  fulfilmentNotes?: string;
  displayCTA?: string; // Override default CTA text
  shortDescription: string;
  longDescription?: string;
  keyFeatures: string[];
  recommendedFor?: string;
  compatibleVehicles: string[]; // e.g., ['sprinter', 'crafter', 'transit']
  compatibleBuildTypes: string[]; // e.g., ['off-grid', 'weekend', 'full-time']
  installDifficulty: 'beginner' | 'intermediate' | 'advanced' | 'professional';
  installStage: InstallStage;
  estimatedInstallTime?: string;
  payloadWeightKg: number;
  relatedProducts?: string[]; // IDs
  requiredAccessories?: string[]; // IDs
  upgradeOptions?: string[]; // IDs
  complianceNotes?: string;
  seoTitle?: string;
  seoDescription?: string;
  image?: string;
}

export type PurchaseStatus = 'not_purchased' | 'selected' | 'purchased' | 'already_owned' | 'quote_requested' | 'removed';
export type RequiredStatus = 'required' | 'recommended' | 'optional';

export interface BasketItem {
  id: string;
  productId: string;
  buildPlanId: string;
  stage: InstallStage;
  stageOrder: number;
  requiredStatus: RequiredStatus;
  purchaseStatus: PurchaseStatus;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  supplierType: SupplierType;
  affiliateUrl?: string;
  quoteRequired?: boolean;
  reasonRecommended?: string;
  alternativeProductIds?: string[];
  complianceNotes?: string;
}

export interface BuildPlan {
  id: string;
  userId: string;
  buildName: string;
  vehicle: string;
  wheelbase?: string;
  roofHeight?: string;
  usageType: string;
  buildGoal: string;
  offGridLevel: string;
  budgetRange: string;
  experienceLevel: string;
  createdAt: string;
  updatedAt: string;
  status: 'planning' | 'in-progress' | 'completed';
  progressPercentage: number;
  currentStage: InstallStage;
  estimatedTotalCost: number;
  purchasedValue: number;
  remainingValue: number;
  payloadEstimateKg: number;
  complianceFlags: string[];
}

export interface BuildBasket {
  id: string;
  buildPlanId: string;
  lockedAt?: string;
  totalValue: number;
  items: BasketItem[];
}

export interface QuoteRequest {
  id: string;
  buildPlanId: string;
  quoteType: string;
  requestedItems: string[];
  customerName: string;
  email: string;
  phone: string;
  location?: string;
  timeframe?: string;
  notes?: string;
  status: 'draft' | 'submitted' | 'awaiting_review' | 'quoted' | 'accepted' | 'declined' | 'expired';
  createdAt: string;
  updatedAt: string;
}

// Analytics Event Placeholders
export const trackEvent = (eventName: string, data?: any) => {
  console.log(`[Analytics] ${eventName}`, data);
  // Future implementation for GA4 / GTM / Meta Pixel
};

export const getProductCTA = (product: Product): string => {
  if (product.displayCTA) return product.displayCTA;
  
  switch (product.supplierType) {
    case 'internal': return 'Add to Cart';
    case 'affiliate': return 'Buy from Supplier';
    case 'quote': return 'Request Quote';
    case 'preOrder': return 'Register Interest';
    case 'referral': return 'Find Installer';
    case 'digital': return 'Buy Download';
    default: return 'View Product';
  }
};

export const CATEGORIES = [
  { 
    id: 'electrical-core', 
    name: 'Electrical Core', 
    slug: 'electrical-core',
    description: 'Power your build with industry-leading batteries, inverters, and charging systems.',
    subcategories: [
      { slug: 'inverters-chargers', name: 'Inverters & Chargers' },
      { slug: 'batteries', name: 'Batteries' },
      { slug: 'dc-dc-chargers', name: 'DC-DC Chargers' },
      { slug: 'solar-controllers', name: 'Solar Controllers' },
      { slug: 'monitoring-bms', name: 'Monitoring & BMS' },
      { slug: 'cables-fuses', name: 'Cables & Fuses' },
      { slug: 'distribution-busbars', name: 'Distribution & Busbars' }
    ]
  },
  { 
    id: 'solar-roof', 
    name: 'Solar & Roof Systems', 
    slug: 'solar-roof',
    description: 'Harvest clean energy with high-efficiency panels and robust mounting solutions.',
    subcategories: [
      { slug: 'solar-panels', name: 'Solar Panels' },
      { slug: 'roof-mounts', name: 'Roof Mounts' },
      { slug: 'cables-connectors', name: 'Cables & Connectors' },
      { slug: 'charge-controllers', name: 'Charge Controllers' },
      { slug: 'roof-vents-fans', name: 'Roof Vents & Fans' }
    ]
  },
  { 
    id: 'heating-climate', 
    name: 'Heating & Climate', 
    slug: 'heating-climate',
    description: 'Maintain total comfort year-round with diesel heaters and advanced ventilation.',
    subcategories: [
      { slug: 'diesel-heaters', name: 'Diesel Heaters' },
      { slug: 'lpg-heaters', name: 'LPG Heaters' },
      { slug: 'combi-systems', name: 'Combi Systems' },
      { slug: 'air-conditioning', name: 'Air Conditioning' },
      { slug: 'water-heaters', name: 'Water Heaters' },
      { slug: 'ducting-vents', name: 'Ducting & Vents' }
    ]
  },
  { 
    id: 'water-plumbing', 
    name: 'Water & Plumbing', 
    slug: 'water-plumbing',
    description: 'Complete underslung and internal water systems for shower, sink, and waste.',
    subcategories: [
      { slug: 'fresh-water-tanks', name: 'Fresh Water Tanks' },
      { slug: 'grey-water-tanks', name: 'Grey Water Tanks' },
      { slug: 'pumps', name: 'Pumps' },
      { slug: 'taps-mixers', name: 'Taps & Mixers' },
      { slug: 'filtration', name: 'Filtration' },
      { slug: 'pipe-fittings', name: 'Pipe & Fittings' }
    ]
  },
  { 
    id: 'gas-cooking', 
    name: 'Gas & Cooking', 
    slug: 'gas-cooking',
    description: 'Safe gas installations and efficient induction or gas-powered cooking modules.',
    subcategories: [
      { slug: 'hobs', name: 'Hobs' },
      { slug: 'sink-hob-combos', name: 'Sink & Hob Combos' },
      { slug: 'ovens', name: 'Ovens' },
      { slug: 'regulators', name: 'Regulators' },
      { slug: 'gas-lockers', name: 'Gas Lockers' },
      { slug: 'piping-safety', name: 'Piping & Safety' }
    ]
  },
  { 
    id: 'toilets-washroom', 
    name: 'Toilets & Washroom', 
    slug: 'toilets-washroom',
    description: 'From composting solutions to full wetroom waterproofing kits.',
    subcategories: [
      { slug: 'cassette-toilets', name: 'Cassette Toilets' },
      { slug: 'composting-toilets', name: 'Composting Toilets' },
      { slug: 'wash-basins', name: 'Wash Basins' },
      { slug: 'shower-systems', name: 'Shower Systems' },
      { slug: 'waterproofing', name: 'Waterproofing' }
    ]
  },
  { 
    id: 'windows-bodywork', 
    name: 'Windows, Vents & Bodywork', 
    slug: 'windows-bodywork',
    description: 'Bonded glass, skylights, and rust treatment for a professional exterior finish.',
    subcategories: [
      { slug: 'sliding-windows', name: 'Sliding Windows' },
      { slug: 'fixed-windows', name: 'Fixed Windows' },
      { slug: 'rooflights', name: 'Rooflights' },
      { slug: 'ventilation-grilles', name: 'Ventilation Grilles' },
      { slug: 'seals-trim', name: 'Seals & Trim' },
      { slug: 'rust-treatment', name: 'Rust Treatment' }
    ]
  },
  { 
    id: 'insulation-interior', 
    name: 'Insulation & Interior Build', 
    slug: 'insulation-interior',
    description: 'Sound deadening, thermal barriers, and premium ply lining kits.',
    subcategories: [
      { slug: 'sound-deadening', name: 'Sound Deadening' },
      { slug: 'thermal-insulation', name: 'Thermal Insulation' },
      { slug: 'wall-cladding', name: 'Wall Cladding' },
      { slug: 'lightweight-ply', name: 'Lightweight Ply' },
      { slug: 'flooring', name: 'Flooring' },
      { slug: 'adhesives', name: 'Adhesives' }
    ]
  },
  { 
    id: 'safety-security', 
    name: 'Safety, Security & Compliance', 
    slug: 'safety-security',
    description: 'Protect your investment with trackers, alarms, and fire safety systems.',
    subcategories: [
      { slug: 'gps-trackers', name: 'GPS Trackers' },
      { slug: 'alarms', name: 'Alarms' },
      { slug: 'deadlocks', name: 'Deadlocks' },
      { slug: 'fire-safety', name: 'Fire Safety' },
      { slug: 'carbon-monoxide', name: 'Carbon Monoxide' },
      { slug: 'immobilisers', name: 'Immobilisers' }
    ]
  },
  { 
    id: 'outdoor-living', 
    name: 'Outdoor Living & Accessories', 
    slug: 'outdoor-living',
    description: 'Awnings, bike racks, and camping kits to expand your living space.',
    subcategories: [
      { slug: 'awnings', name: 'Awnings' },
      { slug: 'bike-racks', name: 'Bike Racks' },
      { slug: 'roof-racks', name: 'Roof Racks' },
      { slug: 'steps-ladders', name: 'Steps & Ladders' },
      { slug: 'storage-pods', name: 'Storage Pods' },
      { slug: 'outdoor-lighting', name: 'Outdoor Lighting' }
    ]
  },
  { 
    id: 'connectivity-power', 
    name: 'Connectivity & Power Lifestyle', 
    slug: 'connectivity-power',
    description: 'Stay online anywhere with Starlink mounts and 5G mobile routers.',
    subcategories: [
      { slug: 'starlink-mounts', name: 'Starlink Mounts' },
      { slug: '5g-routers', name: '5G Routers' },
      { slug: 'signal-boosters', name: 'Signal Boosters' },
      { slug: 'usb-hubs', name: 'USB Hubs' },
      { slug: 'satellite-equipment', name: 'Satellite Equipment' }
    ]
  },
  { 
    id: 'complete-kits', 
    name: 'Complete System Kits', 
    slug: 'complete-kits',
    description: 'Engineered bundles for specific vehicles and build goals. Save time and cost.',
    subcategories: [
      { slug: 'electrical-kits', name: 'Electrical Kits' },
      { slug: 'heating-kits', name: 'Heating Kits' },
      { slug: 'water-kits', name: 'Water Kits' },
      { slug: 'full-build-kits', name: 'Full Build Kits' },
      { slug: 'starter-kits', name: 'Starter Kits' }
    ]
  },
];

export const PRODUCTS: Product[] = [
  // --- ELECTRICAL CORE ---
  {
    id: 'victron-multiplus-ii-12-3000-120-32',
    slug: 'victron-multiplus-ii-12-3000-120-32',
    name: 'MultiPlus-II 12/3000/120-32 230V Inverter/Charger',
    brand: 'Victron Energy',
    category: 'electrical-core',
    subcategory: 'inverters-chargers',
    price: 124500,
    priceType: 'fixed',
    supplierType: 'internal',
    stockStatus: 'in-stock',
    shortDescription: 'The next generation of high-performance inverter/chargers. Professional-grade 3000VA pure sine wave inverter with integrated 120A adaptive charger and ultra-fast 32A transfer switch.',
    longDescription: 'The MultiPlus-II combines the functions of the MultiPlus and the MultiGrid. It has all the features of the MultiPlus, plus an external current transformer option to implement PowerControl and PowerAssist and to optimize self-consumption with external current sensing (max. 32A). It also has all the features of the MultiGrid with built-in anti-islanding and an increasingly long list of country approvals.',
    keyFeatures: ['PowerControl & PowerAssist', '32A Transfer Switch', 'Lithium Optimized Charging', 'Parallel & Three-Phase Operation', 'ESS Ready'],
    compatibleVehicles: ['all'],
    compatibleBuildTypes: ['off-grid', 'full-time', 'expedition'],
    installDifficulty: 'advanced',
    installStage: 'Stage 4: First fix electrical',
    payloadWeightKg: 18.0,
    complianceNotes: 'G98/G99 compliant. Requires 230V certification.',
    image: '/images/products/victron-multiplus-ii-front.png'
  },
  {
    id: 'roamer-460',
    slug: 'roamer-460ah-lithium-lifepo4-battery',
    name: '460Ah SMART LiFePO4 Lithium Battery',
    brand: 'Roamer',
    category: 'electrical-core',
    subcategory: 'batteries',
    price: 184900,
    priceType: 'fixed',
    supplierType: 'affiliate',
    affiliateUrl: 'https://roamerbatteries.com/products/460ah-smart',
    stockStatus: 'in-stock',
    shortDescription: 'Maximum density power. Designed to fit perfectly under Sprinter/Crafter seatbases.',
    keyFeatures: ['Integrated BMS', 'Bluetooth monitoring', 'Highest capacity in class', '5-year warranty'],
    compatibleVehicles: ['sprinter', 'crafter', 'tge', 'transit'],
    compatibleBuildTypes: ['off-grid', 'full-time'],
    installDifficulty: 'intermediate',
    installStage: 'Stage 4: First fix electrical',
    payloadWeightKg: 42.0,
    image: '/images/products/roamer-460.jpg'
  },
  
  // --- SOLAR & ROOF ---
  {
    id: 'renogy-rigid-175',
    slug: 'renogy-175w-monocrystalline-solar-panel',
    name: '175 Watt Monocrystalline Solar Panel',
    brand: 'Renogy',
    category: 'solar-roof',
    subcategory: 'solar-panels',
    price: 16500,
    priceType: 'fixed',
    supplierType: 'internal',
    stockStatus: 'in-stock',
    shortDescription: 'High-efficiency rigid solar panel for fixed roof mounts.',
    keyFeatures: ['Anti-reflective glass', 'IP65 junction box', 'Corrosion-resistant frame'],
    compatibleVehicles: ['all'],
    compatibleBuildTypes: ['weekend', 'off-grid', 'full-time'],
    installDifficulty: 'intermediate',
    installStage: 'Stage 5: Solar & charging',
    payloadWeightKg: 10.5,
    image: '/images/products/renogy-175.jpg'
  },

  // --- HEATING & CLIMATE ---
  {
    id: 'autoterm-2d',
    slug: 'autoterm-air-2d-diesel-heater-kit',
    name: 'Autoterm Air 2D Diesel Heater Kit (2kW)',
    brand: 'Autoterm',
    category: 'heating-climate',
    subcategory: 'diesel-heaters',
    price: 52000,
    priceType: 'fixed',
    supplierType: 'internal',
    stockStatus: 'in-stock',
    shortDescription: 'Reliable, efficient diesel heating for small to medium van builds.',
    keyFeatures: ['Brushless motor', 'Quiet operation', 'High altitude kit included', 'External fuel pick-up'],
    compatibleVehicles: ['all'],
    compatibleBuildTypes: ['all'],
    installDifficulty: 'advanced',
    installStage: 'Stage 6: Heating & ventilation',
    payloadWeightKg: 3.5,
    complianceNotes: 'Ensure fuel pick-up installation follows manufacturer guidelines to avoid warranty issues.',
    image: '/images/products/autoterm-2d.jpg'
  },

  // --- TRUMA HEATING ---
  {
    id: 'truma-combi-4e-kit',
    slug: 'truma-combi-4e-lpg-electric-air-water-heater',
    name: 'Combi 4E LPG & Electric Air/Water Heater Kit',
    brand: 'Truma',
    category: 'heating-climate',
    subcategory: 'combi-systems',
    price: 184500,
    priceType: 'fixed',
    supplierType: 'internal',
    stockStatus: 'in-stock',
    shortDescription: 'The UK motorhome standard. Combined 4kW air heating and 10L hot water storage. Operates on LPG, 230V electric, or mixed mode.',
    keyFeatures: ['Dual fuel (LPG/Electric)', '10L water tank', 'iNet X ready', 'Quiet operation', 'High efficiency'],
    compatibleVehicles: ['all'],
    compatibleBuildTypes: ['off-grid', 'full-time', 'premium'],
    installDifficulty: 'advanced',
    installStage: 'Stage 6: Heating & ventilation',
    payloadWeightKg: 15.5,
    image: '/images/products/truma-combi-4e.png'
  },
  {
    id: 'truma-varioheat-eco',
    slug: 'truma-varioheat-eco-compact-gas-heater',
    name: 'VarioHeat Eco Compact LPG Gas Heater',
    brand: 'Truma',
    category: 'heating-climate',
    subcategory: 'lpg-heaters',
    price: 99500,
    priceType: 'fixed',
    supplierType: 'internal',
    stockStatus: 'in-stock',
    shortDescription: 'Ultra-compact space heater for small to medium van builds. Lightweight and highly efficient gas heating.',
    keyFeatures: ['Space-saving design', 'Two power levels', 'Digital CP plus control', 'Night mode'],
    compatibleVehicles: ['all'],
    compatibleBuildTypes: ['weekend', 'off-grid'],
    installDifficulty: 'advanced',
    installStage: 'Stage 6: Heating & ventilation',
    payloadWeightKg: 5.1,
    image: '/images/products/truma-varioheat.png'
  },
  {
    id: 'truma-inet-x-panel',
    slug: 'truma-inet-x-central-control-panel',
    name: 'iNet X Central Control Panel',
    brand: 'Truma',
    category: 'heating-climate',
    subcategory: 'combi-systems',
    price: 245.00,
    priceType: 'fixed',
    supplierType: 'internal',
    stockStatus: 'in-stock',
    shortDescription: 'Smart central control for your Truma system. Intuitive touchscreen with app connectivity and remote control options.',
    keyFeatures: ['Touchscreen interface', 'App control', 'Retrofit compatible', 'Error code display'],
    compatibleVehicles: ['all'],
    compatibleBuildTypes: ['all'],
    installDifficulty: 'intermediate',
    installStage: 'Stage 6: Heating & ventilation',
    payloadWeightKg: 0.3,
    image: '/images/products/truma-inet-x.png'
  },
  
  // --- DOMETIC SYSTEMS ---
  {
    id: 'dometic-cfx3-55im',
    slug: 'dometic-cfx3-55im-portable-fridge-freezer-ice-maker',
    name: 'CFX3 55IM Portable Compressor Fridge/Freezer with Ice Maker',
    brand: 'Dometic',
    category: 'water-plumbing',
    subcategory: 'cooling',
    price: 1045.00,
    priceType: 'fixed',
    supplierType: 'internal',
    stockStatus: 'in-stock',
    shortDescription: 'The ultimate van fridge. 53L capacity with an independent ice maker. Rugged design with mobile app control.',
    keyFeatures: ['Integrated Ice Maker', 'VMSO3 compressor', 'Mobile app control', 'Dual power (AC/DC)', 'Weatherproof screen'],
    compatibleVehicles: ['all'],
    compatibleBuildTypes: ['off-grid', 'full-time', 'premium'],
    installDifficulty: 'beginner',
    installStage: 'Stage 9: Interior fit-out',
    payloadWeightKg: 21.3,
    image: '/images/products/dometic-cfx3.png'
  },
  {
    id: 'dometic-s4-window-range',
    slug: 'dometic-s4-hinged-campervan-window-range',
    name: 'S4 Hinged Window Range (All Sizes)',
    brand: 'Dometic',
    category: 'solar-roof',
    subcategory: 'windows',
    price: 495.00,
    priceType: 'from',
    supplierType: 'internal',
    stockStatus: 'in-stock',
    shortDescription: 'The industry standard for campervan windows. Double-glazed acrylic with integrated blind and flyscreen system.',
    keyFeatures: ['Double glazed', 'Integrated blackout blind', 'Integrated flyscreen', 'Security locking', 'Telescopic hinges'],
    compatibleVehicles: ['all'],
    compatibleBuildTypes: ['all'],
    installDifficulty: 'advanced',
    installStage: 'Stage 2: Vehicle preparation',
    payloadWeightKg: 8.5,
    image: '/images/products/dometic-s4.png'
  },
  {
    id: 'dometic-freshjet-2200',
    slug: 'dometic-freshjet-2200-roof-air-conditioner',
    name: 'FreshJet 2200 Roof Air Conditioner',
    brand: 'Dometic',
    category: 'heating-climate',
    subcategory: 'air-conditioning',
    price: 1995.00,
    priceType: 'fixed',
    supplierType: 'internal',
    stockStatus: 'in-stock',
    shortDescription: 'Ultra-compact roof air conditioner for large vans. Efficient cooling and heating with integrated LED lighting.',
    keyFeatures: ['High cooling power', 'Soft-start option', 'Integrated LED light', 'Compact footprint', 'Remote control'],
    compatibleVehicles: ['all'],
    compatibleBuildTypes: ['premium', 'full-time'],
    installDifficulty: 'advanced',
    installStage: 'Stage 6: Heating & ventilation',
    payloadWeightKg: 32.0,
    image: '/images/products/dometic-freshjet.png'
  },
  
  // --- WEBASTO HEATING ---
  {
    id: 'webasto-air-top-2000-stc',
    slug: 'webasto-air-top-2000-stc-diesel-heater-kit',
    name: 'Air Top 2000 STC Diesel Heater Kit',
    brand: 'Webasto',
    category: 'heating-climate',
    subcategory: 'diesel-heaters',
    price: 1145.00,
    priceType: 'fixed',
    supplierType: 'internal',
    stockStatus: 'in-stock',
    shortDescription: 'The premium diesel heating standard. Compact, reliable, and exceptionally fuel-efficient for all-season van life.',
    keyFeatures: ['Quiet operation', 'SmartControl compatible', 'Low fuel consumption', 'Compact design', 'UK warranty'],
    compatibleVehicles: ['all'],
    compatibleBuildTypes: ['off-grid', 'full-time'],
    installDifficulty: 'advanced',
    installStage: 'Stage 6: Heating & ventilation',
    payloadWeightKg: 2.6,
    image: '/images/products/webasto-air-top.png'
  },
  {
    id: 'webasto-thermo-top-evo',
    slug: 'webasto-thermo-top-evo-diesel-water-heater',
    name: 'Thermo Top Evo Diesel Water Heater',
    brand: 'Webasto',
    category: 'water-plumbing',
    subcategory: 'water-heaters',
    price: 1395.00,
    priceType: 'fixed',
    supplierType: 'internal',
    stockStatus: 'in-stock',
    shortDescription: 'Advanced diesel-powered water heating. Provides domestic-grade hot water and engine pre-heating capability.',
    keyFeatures: ['Rapid water heating', 'Engine pre-heat', 'Compact dimensions', 'Low power draw'],
    compatibleVehicles: ['all'],
    compatibleBuildTypes: ['expedition', 'full-time'],
    installDifficulty: 'professional',
    installStage: 'Stage 7: Water & plumbing',
    payloadWeightKg: 2.1,
    image: '/images/products/webasto-thermo-top.png'
  },
  
  // --- FOGSTAR LITHIUM ---
  {
    id: 'fogstar-drift-105ah',
    slug: 'fogstar-drift-105ah-lithium-lifepo4-leisure-battery',
    name: 'Drift 105Ah Lithium LiFePO4 Leisure Battery',
    brand: 'Fogstar',
    category: 'electrical-core',
    subcategory: 'batteries',
    price: 429.00,
    priceType: 'fixed',
    supplierType: 'internal',
    stockStatus: 'in-stock',
    shortDescription: 'The UK value leader. 105Ah of lithium power with integrated heating and JBD BMS. Perfect for standard van builds.',
    keyFeatures: ['Integrated heating', 'Bluetooth App', 'JBD BMS', 'Grade A EVE Cells', '10-year warranty'],
    compatibleVehicles: ['all'],
    compatibleBuildTypes: ['weekend', 'off-grid'],
    installDifficulty: 'intermediate',
    installStage: 'Stage 5: Solar & charging',
    payloadWeightKg: 10.5,
    image: '/images/products/fogstar-drift-105ah.png'
  },
  {
    id: 'fogstar-drift-280ah',
    slug: 'fogstar-drift-280ah-lithium-lifepo4-leisure-battery',
    name: 'Drift 280Ah Lithium LiFePO4 Leisure Battery',
    brand: 'Fogstar',
    category: 'electrical-core',
    subcategory: 'batteries',
    price: 799.00,
    priceType: 'fixed',
    supplierType: 'internal',
    stockStatus: 'in-stock',
    shortDescription: 'High-capacity off-grid power. 280Ah in a compact metal case. Ideal for full-time van life and heavy inverter loads.',
    keyFeatures: ['280Ah capacity', 'Integrated heating', 'Bluetooth App', 'Metal casing', 'Grade A EVE Cells'],
    compatibleVehicles: ['all'],
    compatibleBuildTypes: ['off-grid', 'full-time'],
    installDifficulty: 'intermediate',
    installStage: 'Stage 5: Solar & charging',
    payloadWeightKg: 24.0,
    image: '/images/products/fogstar-drift-280ah.png'
  },
  {
    id: 'fogstar-drift-300ah-pro',
    slug: 'fogstar-drift-300ah-pro-lithium-lifepo4-leisure-battery',
    name: 'Drift 300Ah PRO Lithium LiFePO4 Leisure Battery',
    brand: 'Fogstar',
    category: 'electrical-core',
    subcategory: 'batteries',
    price: 1099.00,
    priceType: 'fixed',
    supplierType: 'internal',
    stockStatus: 'in-stock',
    shortDescription: 'Professional grade power. 300Ah with 200A continuous discharge capability. Built for induction cooking and 3kVA inverters.',
    keyFeatures: ['200A BMS', '300Ah capacity', 'Grade A+ Cells', 'Integrated heating', 'Smart monitoring'],
    compatibleVehicles: ['all'],
    compatibleBuildTypes: ['premium', 'full-time'],
    installDifficulty: 'advanced',
    installStage: 'Stage 5: Solar & charging',
    payloadWeightKg: 28.5,
    image: '/images/products/fogstar-drift-300ah.png'
  },
  
  // --- EBERSPÄCHER HEATING ---
  {
    id: 'eberspacher-airtronic-s3',
    slug: 'eberspacher-airtronic-s3-d2l-diesel-heater-kit',
    name: 'Airtronic S3 D2L Diesel Heater Kit',
    brand: 'Eberspächer',
    category: 'heating-climate',
    subcategory: 'diesel-heaters',
    price: 1245.00,
    priceType: 'fixed',
    supplierType: 'internal',
    stockStatus: 'in-stock',
    shortDescription: 'The precision engineering choice. Silent-running fuel pump and stepless heating control for maximum comfort.',
    keyFeatures: ['Stepless heating', 'Silent fuel pump', 'CAN-bus architecture', 'Compact D2L size', 'UK support'],
    compatibleVehicles: ['all'],
    compatibleBuildTypes: ['off-grid', 'premium'],
    installDifficulty: 'advanced',
    installStage: 'Stage 6: Heating & ventilation',
    payloadWeightKg: 2.5,
    image: '/images/products/eberspacher-airtronic.png'
  },
  {
    id: 'eberspacher-hydronic-s3',
    slug: 'eberspacher-hydronic-s3-economy-water-heater',
    name: 'Hydronic S3 Economy Diesel Water Heater',
    brand: 'Eberspächer',
    category: 'water-plumbing',
    subcategory: 'water-heaters',
    price: 1495.00,
    priceType: 'fixed',
    supplierType: 'internal',
    stockStatus: 'in-stock',
    shortDescription: 'High-efficiency water heating. Compact design with brushless motor for long service life and reliable hot water.',
    keyFeatures: ['Brushless motor', 'Compact dimensions', 'Low maintenance', 'Rapid heating'],
    compatibleVehicles: ['all'],
    compatibleBuildTypes: ['expedition', 'full-time'],
    installDifficulty: 'professional',
    installStage: 'Stage 7: Water & plumbing',
    payloadWeightKg: 2.0,
    image: '/images/products/eberspacher-hydronic.png'
  },
  
  // --- MAXXAIR VENTILATION ---
  {
    id: 'maxxair-maxxfan-deluxe-tint',
    slug: 'maxxair-maxxfan-deluxe-roof-fan-tinted',
    name: 'MaxxFan Deluxe Roof Fan (Tinted)',
    brand: 'MaxxAir',
    category: 'heating-climate',
    subcategory: 'ventilation',
    price: 345.00,
    priceType: 'fixed',
    supplierType: 'internal',
    stockStatus: 'in-stock',
    shortDescription: 'The ultimate van ventilation system. Rain-proof lid, 10 speeds, and remote control for year-round comfort.',
    keyFeatures: ['Rain-proof lid', '10-speed fan', 'Remote control', 'Intake/Exhaust modes', 'Thermostat control'],
    compatibleVehicles: ['all'],
    compatibleBuildTypes: ['all'],
    installDifficulty: 'intermediate',
    installStage: 'Stage 6: Heating & ventilation',
    payloadWeightKg: 6.0,
    image: '/images/products/maxxair-maxxfan.png'
  },
  
  // --- FIAMMA EXTERIOR ---
  {
    id: 'fiamma-f80s-awning',
    slug: 'fiamma-f80s-roof-awning-320-deep-black',
    name: 'Fiamma F80s Roof Awning (3.2m)',
    brand: 'Fiamma',
    category: 'exterior-accessories',
    subcategory: 'awnings',
    price: 845.00,
    priceType: 'fixed',
    supplierType: 'internal',
    stockStatus: 'in-stock',
    shortDescription: 'The aerodynamic roof awning for modern vans. Compact design, triple guide, and dual shock-absorbers.',
    keyFeatures: ['Roof mounted', 'Triple guide', 'Dual shock-absorbers', 'LED ready', 'UK specific brackets available'],
    compatibleVehicles: ['all'],
    compatibleBuildTypes: ['all'],
    installDifficulty: 'advanced',
    installStage: 'Stage 10: Security & finishing',
    payloadWeightKg: 29.0,
    image: '/images/products/fiamma-f80s.png'
  },
  {
    id: 'fiamma-carry-bike-t6',
    slug: 'fiamma-carry-bike-vw-t6-pro',
    name: 'Fiamma Carry-Bike VW T6 Pro',
    brand: 'Fiamma',
    category: 'exterior-accessories',
    subcategory: 'bike-racks',
    price: 495.00,
    priceType: 'fixed',
    supplierType: 'internal',
    stockStatus: 'in-stock',
    shortDescription: 'The premium bike carrier for VW T6/T6.1. Safe, reliable, and does not block the tail lights.',
    keyFeatures: ['T6 specific', '4-bike expandable', 'No drilling required', 'Solid mounting'],
    compatibleVehicles: ['vw-t6'],
    compatibleBuildTypes: ['all'],
    installDifficulty: 'intermediate',
    installStage: 'Stage 10: Security & finishing',
    payloadWeightKg: 14.0,
    image: '/images/products/fiamma-carry-bike.png'
  },
  
  // --- PROPEX GAS HEATING ---
  {
    id: 'propex-hs2000',
    slug: 'propex-hs2000-gas-air-heater-single-outlet',
    name: 'Propex Heatsource HS2000 Gas Heater',
    brand: 'Propex',
    category: 'heating-climate',
    subcategory: 'gas-heaters',
    price: 595.00,
    priceType: 'fixed',
    supplierType: 'internal',
    stockStatus: 'in-stock',
    shortDescription: 'The clean, quiet alternative to diesel heating. Reliable gas-powered air heating for all-season use.',
    keyFeatures: ['Gas powered (LPG/Butane/Propane)', 'Low electrical draw', 'Quiet operation', 'Compact design', 'UK manufactured'],
    compatibleVehicles: ['all'],
    compatibleBuildTypes: ['all'],
    installDifficulty: 'advanced',
    installStage: 'Stage 6: Heating & ventilation',
    payloadWeightKg: 5.0,
    image: '/images/products/propex-hs2000.png'
  },
  {
    id: 'propex-hs2800',
    slug: 'propex-hs2800-gas-air-heater-high-output',
    name: 'Propex Heatsource HS2800 Gas Heater',
    brand: 'Propex',
    category: 'heating-climate',
    subcategory: 'gas-heaters',
    price: 745.00,
    priceType: 'fixed',
    supplierType: 'internal',
    stockStatus: 'in-stock',
    shortDescription: 'High-output 2.8kW gas heating. Perfect for larger vans and motorhomes requiring rapid heat-up times.',
    keyFeatures: ['2.8kW output', 'Rapid heating', 'Low maintenance', 'Gas Safe compatible'],
    compatibleVehicles: ['all'],
    compatibleBuildTypes: ['all'],
    installDifficulty: 'advanced',
    installStage: 'Stage 6: Heating & ventilation',
    payloadWeightKg: 6.5,
    image: '/images/products/propex-hs2800.png'
  },
  
  // --- WHALE WATER & AIR HEATING ---
  {
    id: 'whale-expanse-water-heater',
    slug: 'whale-expanse-underslung-gas-electric-water-heater',
    name: 'Whale Expanse Water Heater',
    brand: 'Whale',
    category: 'heating-climate',
    subcategory: 'water-heating',
    price: 895.00,
    priceType: 'fixed',
    supplierType: 'internal',
    stockStatus: 'in-stock',
    shortDescription: 'The underslung space-saver. High-efficiency gas and electric water heating that doesn’t take up internal cupboard space.',
    keyFeatures: ['Underslung mounting', '8L capacity', 'Gas & Electric (3-wire)', 'Rapid heat-up', 'Frost protection'],
    compatibleVehicles: ['all'],
    compatibleBuildTypes: ['all'],
    installDifficulty: 'advanced',
    installStage: 'Stage 7: Water & plumbing',
    payloadWeightKg: 4.5,
    image: '/images/products/whale-expanse.png'
  },
  {
    id: 'whale-heat-air',
    slug: 'whale-heat-air-underslung-gas-electric-heater',
    name: 'Whale Heat Air G/E',
    brand: 'Whale',
    category: 'heating-climate',
    subcategory: 'air-heating',
    price: 945.00,
    priceType: 'fixed',
    supplierType: 'internal',
    stockStatus: 'in-stock',
    shortDescription: 'Maximum internal space. An underslung air heater that provides powerful gas and electric warmth.',
    keyFeatures: ['Underslung design', 'Gas & Electric modes', 'Quiet night mode', 'Intelligent control'],
    compatibleVehicles: ['all'],
    compatibleBuildTypes: ['all'],
    installDifficulty: 'advanced',
    installStage: 'Stage 6: Heating & ventilation',
    payloadWeightKg: 5.5,
    image: '/images/products/whale-heat-air.png'
  },
  
  // --- DODO MAT INSULATION ---
  {
    id: 'dodo-deadening-liner',
    slug: 'dodo-mat-deadening-liner-vibe-filter',
    name: 'Dodo Mat Deadening Liner',
    brand: 'Dodo Mat',
    category: 'insulation-sound',
    subcategory: 'sound-deadening',
    price: 45.00,
    priceType: 'fixed',
    supplierType: 'internal',
    stockStatus: 'in-stock',
    shortDescription: 'The first step in any build. High-performance butyl sound deadening to stop panel vibration and road noise.',
    keyFeatures: ['Self-adhesive', 'High butyl content', 'Heat resistant', 'Easy to cut', 'UK manufactured'],
    compatibleVehicles: ['all'],
    compatibleBuildTypes: ['all'],
    installDifficulty: 'beginner',
    installStage: 'Stage 3: Insulation & sound deadening',
    payloadWeightKg: 4.0,
    image: '/images/products/dodo-deadening.png'
  },
  {
    id: 'dodo-thermo-liner',
    slug: 'dodo-mat-thermo-liner-extreme-v3',
    name: 'Dodo Mat Thermo Liner V3',
    brand: 'Dodo Mat',
    category: 'insulation-sound',
    subcategory: 'thermal-insulation',
    price: 65.00,
    priceType: 'fixed',
    supplierType: 'internal',
    stockStatus: 'in-stock',
    shortDescription: 'Professional thermal insulation. Closed-cell foam that provides excellent heat retention and sound absorption.',
    keyFeatures: ['Thermal insulation', 'Sound absorption', 'Closed cell foam', 'Fire resistant', 'Moisture resistant'],
    compatibleVehicles: ['all'],
    compatibleBuildTypes: ['all'],
    installDifficulty: 'beginner',
    installStage: 'Stage 3: Insulation & sound deadening',
    payloadWeightKg: 2.5,
    image: '/images/products/dodo-thermo.png'
  },
  
  // --- ALPICOOL REFRIGERATION ---
  {
    id: 'alpicool-c20',
    slug: 'alpicool-c20-portable-compressor-fridge-20l',
    name: 'Alpicool C20 Compressor Fridge',
    brand: 'Alpicool',
    category: 'appliances',
    subcategory: 'refrigeration',
    price: 185.00,
    priceType: 'fixed',
    supplierType: 'internal',
    stockStatus: 'in-stock',
    shortDescription: 'The value leader in compressor refrigeration. Reliable cooling and freezing at a fraction of the cost of premium brands.',
    keyFeatures: ['Compressor cooling', 'Digital control', 'Battery protection', 'Lightweight', '12/24V DC compatible'],
    compatibleVehicles: ['all'],
    compatibleBuildTypes: ['all'],
    installDifficulty: 'beginner',
    installStage: 'Stage 9: Interior fit-out',
    payloadWeightKg: 9.0,
    image: '/images/products/alpicool-c20.png'
  },
  {
    id: 'alpicool-k25',
    slug: 'alpicool-k25-portable-compressor-fridge-25l',
    name: 'Alpicool K25 Compressor Fridge',
    brand: 'Alpicool',
    category: 'appliances',
    subcategory: 'refrigeration',
    price: 215.00,
    priceType: 'fixed',
    supplierType: 'internal',
    stockStatus: 'in-stock',
    shortDescription: 'Enhanced 25L capacity. Features a more rugged design and faster cooling times for weekend adventures.',
    keyFeatures: ['25L capacity', 'Rugged design', 'Fast cooling', 'Low power mode'],
    compatibleVehicles: ['all'],
    compatibleBuildTypes: ['all'],
    installDifficulty: 'beginner',
    installStage: 'Stage 9: Interior fit-out',
    payloadWeightKg: 11.5,
    image: '/images/products/alpicool-k25.png'
  },

  // --- COMPLETE KITS ---
  {
    id: 'kit-full-power-sprinter',
    slug: 'ultimate-off-grid-power-kit-sprinter',
    name: 'Ultimate Off-Grid Power Kit (Sprinter L3H2)',
    brand: 'Amplios Engineered',
    category: 'complete-kits',
    subcategory: 'electrical-kits',
    price: 3450.00,
    priceType: 'from',
    supplierType: 'quote',
    stockStatus: 'in-stock',
    shortDescription: 'A complete, pre-configured power system for Sprinter builds. Includes battery, solar, and all cabling.',
    keyFeatures: ['Pre-wired distribution board', 'Custom mounting brackets', 'Full wiring schematic included', 'Tech support'],
    compatibleVehicles: ['sprinter'],
    compatibleBuildTypes: ['full-time', 'off-grid'],
    installDifficulty: 'advanced',
    installStage: 'Stage 4: First fix electrical',
    payloadWeightKg: 65.0,
    image: '/images/products/sprinter-kit.jpg'
  }
];

export function getProductsByCategory(categoryId: string): Product[] {
  return PRODUCTS.filter(p => p.category === categoryId);
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find(p => p.slug === slug);
}

export function getCategoryById(id: string) {
  return CATEGORIES.find(c => c.id === id);
}
