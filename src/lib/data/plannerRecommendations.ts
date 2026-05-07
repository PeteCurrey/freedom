// src/lib/data/plannerRecommendations.ts

import { PRODUCTS, Product, InstallStage } from './productRegistry';

export interface BasketSummary {
  vehicleType: string;
  estimatedCost: number;
  estimatedPayloadImpactKg: number;
  estimatedDifficulty: string;
}

export interface BuildBasket {
  summary: BasketSummary;
  stack: Record<string, string>;
  basket: Record<InstallStage, { product: Product; quantity: number; whyRecommended: string }[]>;
  upgrades: { product: Product; whyRecommended: string }[];
  complianceFlags: { title: string; description: string; level: 'critical' | 'warning' }[];
}

export function generateBuildBasket(userAnswers: any): BuildBasket {
  // Logic to map user answers to registry products
  const selectedProducts: { product: Product; quantity: number; whyRecommended: string }[] = [
    {
      product: PRODUCTS.find(p => p.id === 'victron-multiplus-ii-12-3000-120-32')!,
      quantity: 1,
      whyRecommended: "Highest reliability for 230V systems. Required for induction cooking and heavy off-grid usage."
    },
    {
      product: PRODUCTS.find(p => p.id === 'roamer-460')!,
      quantity: 1,
      whyRecommended: "Perfect fit for Sprinter seat bases. Provides 3-5 days of autonomy for your specified build goal."
    },
    {
      product: PRODUCTS.find(p => p.id === 'renogy-rigid-175')!,
      quantity: 2,
      whyRecommended: "Optimized for your roof footprint. Provides sufficient harvest for your battery bank size."
    },
    {
      product: PRODUCTS.find(p => p.id === 'autoterm-2d')!,
      quantity: 1,
      whyRecommended: "Essential for your all-season requirement. Low fuel consumption and high thermal efficiency."
    }
  ];

  // Group by stage
  const basketByStage: any = {};
  selectedProducts.forEach(item => {
    const stage = item.product.installStage;
    if (!basketByStage[stage]) basketByStage[stage] = [];
    basketByStage[stage].push(item);
  });

  return {
    summary: {
      vehicleType: userAnswers.vehicleType || "Mercedes Sprinter L3H2",
      estimatedCost: selectedProducts.reduce((sum, item) => sum + (item.product.price * item.quantity), 0),
      estimatedPayloadImpactKg: selectedProducts.reduce((sum, item) => sum + (item.product.payloadWeightKg * item.quantity), 0),
      estimatedDifficulty: "Advanced"
    },
    stack: {
      "Electrical": "3kVA / 460Ah Lithium",
      "Solar": "350W Rigid Array",
      "Heating": "2kW Diesel (Autoterm)",
      "Water": "75L Fresh / 50L Waste",
      "Gas": "Internal Locker System"
    },
    basket: basketByStage,
    upgrades: [
      {
        product: PRODUCTS.find(p => p.id === 'kit-full-power-sprinter')!,
        whyRecommended: "Save 15+ hours on installation with our pre-wired distribution board and custom brackets."
      }
    ],
    complianceFlags: [
      {
        title: "Payload Warning",
        description: "Your calculated hardware weight is 72kg. Ensure your total build including furniture does not exceed 3,500kg.",
        level: "warning"
      },
      {
        title: "Gas Ventilation",
        description: "For internal gas lockers, UK law requires 2x floor drop vents and a gas-tight seal. Critical for MOT/insurance.",
        level: "critical"
      }
    ]
  };
}
