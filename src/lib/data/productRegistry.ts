// src/lib/data/productRegistry.ts

export type SupplierType = 'internal' | 'affiliate' | 'quote' | 'preOrder' | 'referral' | 'digital';
export type PriceType = 'fixed' | 'from' | 'quote' | 'affiliate';
export type InstallStage = 'Stage 1: Base vehicle prep' | 'Stage 2: Insulation' | 'Stage 3: First fix electrical' | 'Stage 4: Plumbing' | 'Stage 5: Heating' | 'Stage 6: Interior fit-out' | 'Stage 7: Finishing/compliance';

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
  { id: 'electrical-core', name: 'Electrical Core', description: 'Power your build with industry-leading batteries, inverters, and charging systems.' },
  { id: 'solar-roof', name: 'Solar & Roof Systems', description: 'Harvest clean energy with high-efficiency panels and robust mounting solutions.' },
  { id: 'heating-climate', name: 'Heating & Climate', description: 'Maintain total comfort year-round with diesel heaters and advanced ventilation.' },
  { id: 'water-plumbing', name: 'Water & Plumbing', description: 'Complete underslung and internal water systems for shower, sink, and waste.' },
  { id: 'gas-cooking', name: 'Gas & Cooking', description: 'Safe gas installations and efficient induction or gas-powered cooking modules.' },
  { id: 'toilets-washroom', name: 'Toilets & Washroom', description: 'From composting solutions to full wetroom waterproofing kits.' },
  { id: 'windows-bodywork', name: 'Windows, Vents & Bodywork', description: 'Bonded glass, skylights, and rust treatment for a professional exterior finish.' },
  { id: 'insulation-interior', name: 'Insulation & Interior Build', description: 'Sound deadening, thermal barriers, and premium ply lining kits.' },
  { id: 'safety-security', name: 'Safety, Security & Compliance', description: 'Protect your investment with trackers, alarms, and fire safety systems.' },
  { id: 'outdoor-living', name: 'Outdoor Living & Accessories', description: 'Awnings, bike racks, and camping kits to expand your living space.' },
  { id: 'connectivity-power', name: 'Connectivity & Power Lifestyle', description: 'Stay online anywhere with Starlink mounts and 5G mobile routers.' },
  { id: 'complete-kits', name: 'Complete System Kits', description: 'Engineered bundles for specific vehicles and build goals. Save time and cost.' },
];

export const PRODUCTS: Product[] = [
  // --- ELECTRICAL CORE ---
  {
    id: 'victron-multi-3000',
    slug: 'victron-multiplus-ii-3000va-inverter-charger',
    name: 'MultiPlus-II 12/3000/120-32 230V',
    brand: 'Victron Energy',
    category: 'electrical-core',
    subcategory: 'Inverter Chargers',
    price: 1245.00,
    priceType: 'fixed',
    supplierType: 'internal',
    stockStatus: 'in-stock',
    shortDescription: 'The gold standard for vanlife power. Combined inverter and charger in one elegant package.',
    keyFeatures: ['PowerControl', 'PowerAssist', 'UPS functionality', 'VE.Bus integration'],
    compatibleVehicles: ['all'],
    compatibleBuildTypes: ['off-grid', 'full-time'],
    installDifficulty: 'advanced',
    installStage: 'Stage 3: First fix electrical',
    payloadWeightKg: 18.0,
    complianceNotes: 'Requires 230V certification by a qualified professional for insurance compliance.',
    image: '/images/products/victron-multiplus.jpg'
  },
  {
    id: 'roamer-460',
    slug: 'roamer-460ah-lithium-lifepo4-battery',
    name: '460Ah SMART LiFePO4 Lithium Battery',
    brand: 'Roamer',
    category: 'electrical-core',
    subcategory: 'Lithium Batteries',
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
    installStage: 'Stage 3: First fix electrical',
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
    subcategory: 'Rigid Panels',
    price: 165.00,
    priceType: 'fixed',
    supplierType: 'internal',
    stockStatus: 'in-stock',
    shortDescription: 'High-efficiency rigid solar panel for fixed roof mounts.',
    keyFeatures: ['Anti-reflective glass', 'IP65 junction box', 'Corrosion-resistant frame'],
    compatibleVehicles: ['all'],
    compatibleBuildTypes: ['weekend', 'off-grid', 'full-time'],
    installDifficulty: 'intermediate',
    installStage: 'Stage 2: Insulation',
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
    subcategory: 'Diesel Heaters',
    price: 520.00,
    priceType: 'fixed',
    supplierType: 'internal',
    stockStatus: 'in-stock',
    shortDescription: 'Reliable, efficient diesel heating for small to medium van builds.',
    keyFeatures: ['Brushless motor', 'Quiet operation', 'High altitude kit included', 'External fuel pick-up'],
    compatibleVehicles: ['all'],
    compatibleBuildTypes: ['all'],
    installDifficulty: 'advanced',
    installStage: 'Stage 5: Heating',
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
    subcategory: 'Electrical Kits',
    price: 3450.00,
    priceType: 'from',
    supplierType: 'quote',
    stockStatus: 'in-stock',
    shortDescription: 'A complete, pre-configured power system for Sprinter builds. Includes battery, solar, and all cabling.',
    keyFeatures: ['Pre-wired distribution board', 'Custom mounting brackets', 'Full wiring schematic included', 'Tech support'],
    compatibleVehicles: ['sprinter'],
    compatibleBuildTypes: ['full-time', 'off-grid'],
    installDifficulty: 'advanced',
    installStage: 'Stage 3: First fix electrical',
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
