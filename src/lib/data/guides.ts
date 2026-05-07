// src/lib/data/guides.ts

export interface GuideArticle {
  slug: string;
  hub: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  content: string; // Markdown or structured HTML
  technicalSpecs?: { label: string; value: string }[];
  commonMistakes: string[];
  recommendedProducts: string[]; // Product IDs
  relatedCalculators?: { name: string; url: string }[];
  faqs: { q: string; a: string }[];
}

export const GUIDE_HUBS = [
  { id: 'electrical', name: 'Electrical Systems', icon: 'zap' },
  { id: 'heating', name: 'Heating & Climate', icon: 'thermometer' },
  { id: 'water', name: 'Water & Plumbing', icon: 'droplet' },
  { id: 'insulation', name: 'Insulation & Ventilation', icon: 'wind' },
  { id: 'washroom', name: 'Toilets & Washroom', icon: 'bath' },
  { id: 'compliance', name: 'Compliance & Safety', icon: 'shield' },
];

export const GUIDES: Record<string, GuideArticle> = {
  'campervan-electrical-system': {
    slug: 'campervan-electrical-system',
    hub: 'electrical',
    title: 'The Ultimate Guide to Campervan Electrical Systems',
    seoTitle: 'Campervan Electrical System Guide | DIY 12V & 230V Design',
    metaDescription: 'Master your campervan electrical system. Learn about 12V vs 24V, lithium batteries, solar sizing, and UK wiring safety standards for DIY builds.',
    content: `
      <h2>The Foundation of Off-Grid Living</h2>
      <p>Designing a reliable electrical system is the most complex part of any van conversion. It requires a deep understanding of energy consumption, storage density, and safety protocols.</p>
      <h3>12V vs 24V Architecture</h3>
      <p>For larger builds (Sprinter L3/L4), we increasingly recommend 24V systems to reduce cable thickness and improve efficiency for high-power appliances like induction hobs.</p>
    `,
    technicalSpecs: [
      { label: 'Nominal Voltage', value: '12V / 24V / 48V' },
      { label: 'Battery Type', value: 'LiFePO4 (Recommended)' },
      { label: 'Max Inverter Load', value: '3000VA+' }
    ],
    commonMistakes: [
      'Undersized cabling leading to voltage drop and fire risk.',
      'Inadequate ventilation for high-power inverters.',
      'Mixing battery chemistries (e.g. Lead Acid + Lithium).'
    ],
    recommendedProducts: ['victron-multi-3000', 'roamer-460'],
    relatedCalculators: [{ name: 'Solar Array Calculator', url: '/tools/solar-calculator' }],
    faqs: [
      { q: 'How many batteries do I need for off-grid living?', a: 'Typically, 200Ah-400Ah of Lithium is the "sweet spot" for 3-5 days of autonomy.' }
    ]
  },
  'campervan-compliance-uk': {
    slug: 'campervan-compliance-uk',
    hub: 'compliance',
    title: 'UK Campervan Compliance & Safety Standards',
    seoTitle: 'UK Campervan Compliance Guide | DVLA, Gas & Electrical Safety',
    metaDescription: 'Complete guide to UK campervan compliance. Learn about DVLA motor-caravan reclassification, gas safety requirements, and insurance modifications.',
    content: `
      <h2>Navigating UK Regulations</h2>
      <p>Building a campervan in the UK involves meeting several regulatory standards, from the DVLA's reclassification criteria to gas and electrical safety certifications.</p>
    `,
    commonMistakes: [
      'Ignoring payload weight limits (3,500kg gross).',
      'Non-compliant gas locker installation.',
      'Failing to disclose modifications to insurers.'
    ],
    recommendedProducts: [],
    faqs: [
      { q: 'Is DVLA reclassification mandatory?', a: 'No, but your insurance must reflect that the vehicle is used as a motor-caravan.' }
    ]
  }
};
