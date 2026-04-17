export interface Build {
  id: string;
  slug: string;
  title: string;
  user_handle: string;
  vehicle_model: string;
  chassis_type: string;
  description: string;
  hero_image: string;
  year_completed: number;
  is_community_pick?: boolean;
  rating: number;
  specs_summary: {
    [key: string]: string;
  };
  build_duration?: string;
  budget_range?: string;
  builder_name?: string;
  location?: string;
  story?: string;
}

export const FALLBACK_BUILDS: Build[] = [
  {
    id: "fb-1",
    slug: "highland-overlander",
    title: "The Highland Overlander",
    user_handle: "@AdventurePete",
    builder_name: "Pete Currey",
    vehicle_model: "Mercedes Sprinter 4x4 170\" WB",
    chassis_type: "Mercedes Sprinter",
    description: "A full-spec 4x4 expedition build designed for the Scottish Highlands. Features a full Victron Multiplus system, off-road suspension, and a custom rear garage for mountain bikes.",
    story: "Built over 14 months during the lockdowns, this Sprinter was designed to be the ultimate mobile basecamp for mountain biking and photography in the most remote parts of the UK. The goal was 14-day total autonomy.",
    hero_image: "/images/bespoke-sprinter.png",
    year_completed: 2024,
    build_duration: "14 Months",
    budget_range: "PRO-LEVEL",
    location: "Scotland, UK",
    is_community_pick: true,
    rating: 5.0,
    specs_summary: { 
      "Solar": "400W Victron", 
      "Battery": "300Ah LiFePO4", 
      "Heating": "Autoterm 4kW",
      "Electrical": "Victron MultiPlus II",
      "Water": "100L Fresh / 50L Grey"
    }
  },
  {
    id: "fb-2",
    slug: "scandi-ghost",
    title: "Scandi Ghost",
    user_handle: "@NorthernVans",
    builder_name: "Erik Nilsson",
    vehicle_model: "VW Crafter MWB",
    chassis_type: "VW Crafter",
    description: "Minimalist interior focus with emphasis on stealth and extreme thermal efficiency. All birch-ply interior with hidden fasteners and ultra-quiet environmental systems.",
    hero_image: "/images/bespoke-crafter.png",
    year_completed: 2023,
    build_duration: "6 Months",
    budget_range: "MID-TIER",
    location: "Sweden",
    rating: 4.9,
    specs_summary: { 
      "Solar": "200W", 
      "Battery": "200Ah Lithium", 
      "Water": "60L",
      "Heating": "Webasto Air Top"
    }
  },
  {
    id: "fb-3",
    slug: "pacific-explorer",
    title: "Pacific Explorer",
    user_handle: "@CoastalBuilds",
    builder_name: "Sarah Miller",
    vehicle_model: "Ford Transit L3H3",
    chassis_type: "Ford Transit",
    description: "Built for long coastal tours with an integrated surf-rack, external shower system, and high-power induction cooking suite.",
    hero_image: "/images/bespoke-transit.png",
    year_completed: 2024,
    build_duration: "9 Months",
    budget_range: "ENTHUSIAST",
    location: "California, USA",
    rating: 4.7,
    specs_summary: { 
      "Solar": "350W", 
      "Battery": "400Ah LiFePO4", 
      "Water": "85L",
      "Heating": "Truma Combi 4E"
    }
  },
  {
    id: "fb-4",
    slug: "alpine-studio",
    title: "The Alpine Studio",
    user_handle: "@MountainModern",
    builder_name: "Marco Rossi",
    vehicle_model: "Fiat Ducato L4H3",
    chassis_type: "Fiat Ducato",
    description: "A luxury leisure build focused on comfort and aesthetics. Features a full wet-room, leather upholstery, and a cinematic panoramic roof window.",
    hero_image: "/images/bespoke-fiat.png",
    year_completed: 2023,
    build_duration: "12 Months",
    budget_range: "LUXURY",
    location: "Italy",
    rating: 4.8,
    specs_summary: { 
      "Solar": "180W", 
      "Battery": "160Ah AGM", 
      "Water": "90L",
      "Heating": "Truma Combi 6E"
    }
  },
  {
    id: "fb-5",
    slug: "desert-raider",
    title: "Desert Raider 4x4",
    user_handle: "@GlobalTrekker",
    builder_name: "Hans Muller",
    vehicle_model: "Iveco Daily 4x4",
    chassis_type: "Iveco Daily",
    description: "Heavy-duty global expedition vehicle with 14-day desert autonomy. Features massive water storage and redundant power systems.",
    hero_image: "/images/bespoke-iveco.png",
    year_completed: 2024,
    build_duration: "24 Months",
    budget_range: "EXPEDITION",
    location: "Namibia / Germany",
    rating: 5.0,
    specs_summary: { 
      "Solar": "600W", 
      "Battery": "600Ah Lithium", 
      "Water": "180L",
      "Heating": "Diesel/Electric Hybrid"
    }
  },
  {
    id: "fb-6",
    slug: "nomad-command",
    title: "Nomad Command Centre",
    user_handle: "@DigitalDrifter",
    builder_name: "Alex Reed",
    vehicle_model: "MAN TGE LWB",
    chassis_type: "VW Crafter",
    description: "Mobile office for full-time nomads with Starlink integration, dual-monitor workstation, and extreme sound insulation.",
    hero_image: "/images/bespoke-man.png",
    year_completed: 2024,
    build_duration: "10 Months",
    budget_range: "PROFESSIONAL",
    location: "Digital Nomad Hub",
    rating: 4.6,
    specs_summary: { 
      "Solar": "500W", 
      "Battery": "400Ah Lithium", 
      "Water": "40L",
      "Heating": "5kW Diesel"
    }
  }
];
