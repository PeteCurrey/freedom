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
  },
  'heating-ventilation-guide': {
    slug: 'heating-ventilation-guide',
    hub: 'heating',
    title: 'Diesel Heating & Climate Control Strategy',
    seoTitle: 'Campervan Heating Guide | Diesel Heaters & Ventilation',
    metaDescription: 'Keep your van warm all year round. Comparison of Autoterm vs Webasto diesel heaters and advanced ventilation strategies.',
    content: `<h2>Year-Round Comfort</h2><p>Proper climate control requires a two-pronged approach: heat generation and effective moisture removal. Diesel heaters are the industry standard for their efficiency and high heat output.</p>`,
    commonMistakes: ['Poor fuel pick-up installation.', 'Blocking ventilation intake.', 'Incorrect heater orientation.'],
    recommendedProducts: ['autoterm-2d'],
    faqs: [{ q: 'Will a diesel heater drain my battery?', a: 'They draw high current only during startup (8-10A). Once running, they draw very little (1-2A).' }]
  },
  'campervan-water-plumbing-guide': {
    slug: 'campervan-water-plumbing-guide',
    hub: 'water',
    title: 'Plumbing & Fresh Water System Design',
    seoTitle: 'Campervan Plumbing Guide | Tanks, Pumps & Filtration',
    metaDescription: 'Design a leak-free campervan plumbing system. Learn about underslung tanks, 12V pumps, and UV filtration.',
    content: `<h2>Off-Grid Water Security</h2><p>A robust water system is essential for long-term off-grid living. From tank positioning to leak-prevention tactics, engineering matters.</p>`,
    commonMistakes: ['Using non-food-grade hose.', 'Inadequate winterization.', 'Undersized pump pressure.'],
    recommendedProducts: [],
    faqs: [{ q: 'Do I need a water filter?', a: 'Highly recommended for off-grid travel to remove bacteria and improve taste.' }]
  },
  'campervan-insulation-guide': {
    slug: 'campervan-insulation-guide',
    hub: 'insulation',
    title: 'Insulation & Sound Deadening Protocol',
    seoTitle: 'Campervan Insulation Guide | Thermal Barriers & Acoustics',
    metaDescription: 'Eliminate condensation and road noise. The ultimate guide to thermal barriers and sound deadening for DIY van builds.',
    content: `<h2>The Thermal Envelope</h2><p>Insulation is the most critical stage of your build. Once the walls are on, you can't fix it. Focus on eliminating thermal bridges and controlling moisture.</p>`,
    commonMistakes: ['Leaving exposed metal ribs.', 'Ignoring vapor barriers.', 'Overpacking loose insulation.'],
    recommendedProducts: [],
    faqs: [{ q: 'Should I use sheep wool or Celotex?', a: 'A combination of recycled plastic/wool for voids and PIR board for large panels is usually best.' }]
  },
  'campervan-toilets-washroom-guide': {
    slug: 'campervan-toilets-washroom-guide',
    hub: 'washroom',
    title: 'Campervan Toilet & Washroom Solutions',
    seoTitle: 'Campervan Toilet Guide | Composting vs Cassette',
    metaDescription: 'Choosing the right toilet for your van build. Comparison of composting, cassette, and portable solutions.',
    content: `<h2>Managing the Essentials</h2><p>Your toilet choice dictates your build's layout and maintenance routine. Composting toilets are increasingly popular for their off-grid longevity.</p>`,
    commonMistakes: ['Inadequate washroom ventilation.', 'Choosing a toilet with high water usage.', 'Difficult access for emptying.'],
    recommendedProducts: [],
    faqs: [{ q: 'Is a composting toilet really odorless?', a: 'Yes, provided the liquid/solid separation is effective and the ventilation fan is running.' }]
  }
};
