export interface GalleryItem {
  id: string;
  image: string;
  label: string;
  technical_index: string;
  description?: string;
}

export interface Build {
  id: string;
  slug: string;
  title: string;
  user_handle: string;
  vehicle_model: string;
  chassis_type: string;
  description: string;
  hero_image: string;
  gallery: GalleryItem[];
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
    id: "fb-0",
    slug: "arctic-mission-yukon",
    title: "Arctic Mission: Yukon",
    user_handle: "@YukonExpedition",
    builder_name: "Pete Currey",
    vehicle_model: "Iveco Daily 4x4 Expedition",
    chassis_type: "Iveco Daily",
    description: "The ultimate cold-weather mission vehicle. Designed for zero-failure sub-zero stability and 14-day energy independence in the Canadian wilderness.",
    story: "Built specifically for high-latitude exploration, this Iveco was engineered to withstand temperatures down to -40°C while maintaining full technical operations. Every system has triple redundancy.",
    hero_image: "/Users/petercurrey/.gemini/antigravity/brain/94afb30f-4c38-44c4-a71a-42efc2c7c8f5/luxury_iveco_snow_canada_hd_hero_1776506636919.png",
    gallery: [
      { id: "yukon-1", image: "/Users/petercurrey/.gemini/antigravity/brain/94afb30f-4c38-44c4-a71a-42efc2c7c8f5/yukon_arctic_interior_1776506660974.png", label: "Mission Deck // Command Interior", technical_index: "System Index 01 // Living Quarters" },
      { id: "yukon-2", image: "/Users/petercurrey/.gemini/antigravity/brain/94afb30f-4c38-44c4-a71a-42efc2c7c8f5/yukon_technical_node_1776506694713.png", label: "Energy Hub // Victron Core", technical_index: "System Index 02 // Electrical Tier" },
      { id: "yukon-3", image: "/Users/petercurrey/.gemini/antigravity/brain/94afb30f-4c38-44c4-a71a-42efc2c7c8f5/general_water_filtration_technical_1776506719306.png", label: "Filtration Stack // UV Purge", technical_index: "System Index 03 // Hydration Tier" }
    ],
    year_completed: 2024,
    rating: 5.0,
    specs_summary: { "Solar": "800W", "Battery": "600Ah", "Heating": "Hydronic 5kW" }
  },
  {
    id: "fb-1",
    slug: "highland-overlander",
    title: "The Highland Overlander",
    user_handle: "@AdventurePete",
    builder_name: "Pete Currey",
    vehicle_model: "Mercedes Sprinter 4x4 170\" WB",
    chassis_type: "Mercedes Sprinter",
    description: "A full-spec 4x4 expedition build designed for the Scottish Highlands. Features a full Victron Multiplus system, off-road suspension, and a custom rear garage.",
    hero_image: "/images/bespoke-sprinter.png",
    gallery: [
      { id: "highland-1", image: "/Users/petercurrey/.gemini/antigravity/brain/94afb30f-4c38-44c4-a71a-42efc2c7c8f5/sprinter_expedition_interior_1776506856079.png", label: "Mission Deck // Expedition Interior", technical_index: "System Index 01 // Living Quarters" },
      { id: "highland-2", image: "/Users/petercurrey/.gemini/antigravity/brain/94afb30f-4c38-44c4-a71a-42efc2c7c8f5/yukon_technical_node_1776506694713.png", label: "Energy Hub // Multiplus Node", technical_index: "System Index 02 // Electrical Tier" }
    ],
    year_completed: 2024,
    is_community_pick: true,
    rating: 5.0,
    specs_summary: { "Solar": "400W", "Battery": "300Ah", "Heating": "Autoterm 4kW" }
  },
  {
    id: "fb-2",
    slug: "scandi-ghost",
    title: "Scandi Ghost",
    user_handle: "@NorthernVans",
    builder_name: "Erik Nilsson",
    vehicle_model: "VW Crafter MWB",
    chassis_type: "VW Crafter",
    description: "Minimalist interior focus with emphasis on stealth and extreme thermal efficiency. All birch-ply interior and ultra-quiet environmental systems.",
    hero_image: "/images/bespoke-crafter.png",
    gallery: [
      { id: "scandi-1", image: "/images/bespoke-crafter.png", label: "Exterior Shell // Stealth Node", technical_index: "System Index 01 // Chassis" },
      { id: "scandi-2", image: "/Users/petercurrey/.gemini/antigravity/brain/94afb30f-4c38-44c4-a71a-42efc2c7c8f5/yukon_arctic_interior_1776506660974.png", label: "Living Deck // Birch Ply Core", technical_index: "System Index 02 // Interior" }
    ],
    year_completed: 2023,
    rating: 4.9,
    specs_summary: { "Solar": "200W", "Battery": "200Ah", "Heating": "Webasto" }
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
    gallery: [
      { id: "pacific-1", image: "/images/bespoke-transit.png", label: "Exterior Shell // Coastal Node", technical_index: "System Index 01 // Chassis" }
    ],
    year_completed: 2024,
    rating: 4.7,
    specs_summary: { "Solar": "350W", "Battery": "400Ah", "Heating": "Truma" }
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
    gallery: [
      { id: "alpine-1", image: "/images/bespoke-fiat.png", label: "Exterior Shell // Alpine Node", technical_index: "System Index 01 // Chassis" }
    ],
    year_completed: 2023,
    rating: 4.8,
    specs_summary: { "Solar": "180W", "Battery": "160Ah", "Heating": "Truma" }
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
    gallery: [
      { id: "desert-1", image: "/images/bespoke-iveco.png", label: "Exterior Shell // Desert Node", technical_index: "System Index 01 // Chassis" }
    ],
    year_completed: 2024,
    rating: 5.0,
    specs_summary: { "Solar": "600W", "Battery": "600Ah", "Heating": "Hybrid" }
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
    gallery: [
      { id: "nomad-1", image: "/images/bespoke-man.png", label: "Exterior Shell // Nomad Node", technical_index: "System Index 01 // Chassis" }
    ],
    year_completed: 2024,
    rating: 4.6,
    specs_summary: { "Solar": "500W", "Battery": "400Ah", "Heating": "5kW Diesel" }
  }
];

export function getBuildBySlug(slug: string): Build | undefined {
  return FALLBACK_BUILDS.find(b => b.slug === slug);
}
