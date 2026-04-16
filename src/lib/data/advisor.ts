export interface QuizOption {
  id: string;
  label: string;
  desc: string;
  scores: Record<string, number>; // Maps vehicle slugs to scores
}

export interface QuizQuestion {
  id: string;
  text: string;
  options: QuizOption[];
}

export const BUILD_MATCH_QUESTIONS: QuizQuestion[] = [
  {
    id: "typology",
    text: "How do you plan to use the vehicle?",
    options: [
      { 
        id: "full-time", 
        label: "Full-Time Liveaboard", 
        desc: "Maximum storage, extreme insulation, and high-capacity systems.",
        scores: { "mercedes-sprinter": 3, "fiat-ducato": 2, "man-tge": 3, "iveco-daily": 4 }
      },
      { 
        id: "weekend", 
        label: "Weekend Warrior", 
        desc: "Fast setup, easier parking, focused on the basics.",
        scores: { "fiat-ducato": 4, "ford-transit": 4, "vw-crafter": 2 }
      },
      { 
        id: "expedition", 
        label: "Off-Grid Expedition", 
        desc: "4x4 capability, high ground clearance, heavy-duty chassis.",
        scores: { "mercedes-sprinter": 5, "iveco-daily": 5, "man-tge": 3 }
      }
    ]
  },
  {
    id: "height",
    text: "How tall is the primary occupant?",
    options: [
      { 
        id: "under-5-10", 
        label: "Under 5'10\"", 
        desc: "You can sleep transversely in most wide-body vans.",
        scores: { "fiat-ducato": 5, "ford-transit": 4, "vw-crafter": 3 }
      },
      { 
        id: "over-5-10", 
        label: "Over 5'10\"", 
        desc: "You'll likely need longitudinal beds or flares in a Sprinter.",
        scores: { "mercedes-sprinter": 4, "vw-crafter": 5, "man-tge": 5, "iveco-daily": 3 }
      }
    ]
  },
  {
    id: "priority",
    text: "What is your engineering priority?",
    options: [
      { 
        id: "width", 
        label: "Internal Width", 
        desc: "Maximizing layout options without external flares.",
        scores: { "fiat-ducato": 5, "ford-transit": 2 }
      },
      { 
        id: "reliability", 
        label: "Mechanical Reliability", 
        desc: "Parts availability and proven high-mileage chassis.",
        scores: { "mercedes-sprinter": 5, "vw-crafter": 4, "man-tge": 4 }
      },
      { 
        id: "payload", 
        label: "Payload Capacity", 
        desc: "Heavy luxury builds with full batteries and water.",
        scores: { "iveco-daily": 5, "man-tge": 3, "mercedes-sprinter": 2 }
      }
    ]
  }
];

export interface CostTier {
  id: string;
  name: string;
  range: string;
  description: string;
  multiplier: number;
}

export const COST_TIERS: CostTier[] = [
  { 
    id: "budget", 
    name: "Weekend Warrior", 
    range: "£3k - £7k", 
    description: "Functional basics, recycled materials, entry-level 12V.",
    multiplier: 1.0
  },
  { 
    id: "mid", 
    name: "Digital Nomad", 
    range: "£12k - £20k", 
    description: "Lithium power, high-grade insulation, professional heating.",
    multiplier: 2.5
  },
  { 
    id: "pro", 
    name: "Off-Grid Legend", 
    range: "£35k - £60k+", 
    description: "Full Victron ecosystem, custom cabinetry, hybrid heating.",
    multiplier: 5.0
  }
];

export const SYSTEM_BASE_COSTS = {
  electrical: 800,
  heating: 300,
  water: 400,
  insulation: 400,
  cabinetry: 600,
  labour: 0 // DIY assumed by default
};
