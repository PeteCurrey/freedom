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
    price: 1245.00,
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
    price: 1849.00,
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
    price: 165.00,
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
    price: 520.00,
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
