// src/lib/data/pdfCompliance.ts

export interface PDFTier {
  id: string;
  name: string;
  price: number;
  pages: string;
  description: string;
  features: string[];
  samplePreview?: string;
}

export const PDF_TIERS: PDFTier[] = [
  {
    id: 'starter',
    name: 'Instant AI Build PDF',
    price: 29.00,
    pages: '15-25',
    description: 'A fast, personalized build plan generated instantly from your AI Planner results.',
    features: [
      'Build profile summary',
      'Recommended layout direction',
      'Core system overview (Electrical, Heating, Water)',
      'Suggested product list (BOM)',
      'Basic install sequencing',
      'Habitation safety checklist'
    ]
  },
  {
    id: 'detailed',
    name: 'Detailed Build Pack',
    price: 79.00,
    pages: '40-60',
    description: 'The ultimate DIY companion. Deep-dive schematics and comprehensive project management.',
    features: [
      'Everything in Starter',
      'System-by-system technical schematics',
      'Full bill of materials with SKU export',
      '7-Stage install roadmap',
      'Comprehensive tool & fastener list',
      'Detailed payload & axle weight audit',
      'UK compliance & DVLA reclassification guide'
    ]
  },
  {
    id: 'master',
    name: 'Human Engineering Review',
    price: 249.00,
    pages: '60+ & Consultation',
    description: 'Total build confidence. Our engineering team reviews your exact plan for safety and efficiency.',
    features: [
      'Everything in Detailed',
      'Professional engineering review of your schematic',
      'Product compatibility & thermal audit',
      'Risk mitigation & safety improvement notes',
      'Priority tech support (30-day window)',
      'Custom formal quote for entire build kit'
    ]
  }
];

export const COMPLIANCE_WARNINGS = [
  {
    title: 'DVLA Reclassification',
    content: 'UK motor-caravan reclassification depends on specific exterior and interior features. Following a build plan does not guarantee V5C approval.'
  },
  {
    title: 'Insurance Disclosure',
    content: 'All modifications from base vehicle specification must be disclosed to your insurer to ensure valid cover during habitation and transit.'
  },
  {
    title: '230V Electrical Systems',
    content: 'Installation of 230V AC systems requires suitable professional competence. We recommend inspection by a certified electrician before first use.'
  },
  {
    title: 'Gas Safety',
    content: 'Gas installations should be verified by a Gas Safe registered professional. Poorly installed gas systems pose critical carbon monoxide and fire risks.'
  }
];
