export interface VehicleConfig {
  label: string;
  length: string;
  internalL: string;
  height: string;
  volume: string;
}

export interface VehicleSpec {
  label: string;
  value: string;
  unit?: string;
}

export interface VehicleData {
  name: string;
  tagline: string;
  description: string;
  heroImage: string;      // Premium Motorhome Lifestyle Image
  schematicImage: string; // Technical Blueprint / Schematic Image
  specs: VehicleSpec[];
  configurations: VehicleConfig[];
  pros: string[];
  cons: string[];
  bestFor: string;
  watchOutFor: string;
  manufacturerUrl: string;
  ebaySearch: string;
  autotraderSearch: string;
  fbSearch: string;
  internalWidth: string;
}

export const vehicleData: Record<string, VehicleData> = {
  "mercedes-sprinter": {
    name: "MERCEDES-BENZ SPRINTER",
    tagline: "Where Engineering Meets Capability.",
    description: "The Mercedes-Benz Sprinter is the undisputed gold standard for off-grid campervan conversions. Its combination of structural integrity, 4x4 availability, and extensive aftermarket support makes it the premier choice for serious builders who refuse to compromise on quality or capability.",
    heroImage: "/images/bespoke-sprinter.png",
    schematicImage: "/images/sprinter-schematic.png",
    specs: [
      { label: "Engine Options", value: "2.0L 4-Cyl CDI" },
      { label: "Power Output", value: "114 - 190", unit: "HP" },
      { label: "Drivetrain", value: "RWD / AWD" },
      { label: "Transmission", value: "9G-TRONIC" },
      { label: "GVWR", value: "3500 - 5000", unit: "KG" },
    ],
    configurations: [
      { label: "144\" WB Standard", length: "5932mm", internalL: "3272mm", height: "High Roof", volume: "10.5m³" },
      { label: "144\" WB High Roof", length: "5932mm", internalL: "3272mm", height: "High Roof", volume: "11.5m³" },
      { label: "170\" WB High Roof", length: "6967mm", internalL: "4307mm", height: "High Roof", volume: "14.5m³" },
      { label: "170\" EXT High Roof", length: "7367mm", internalL: "4707mm", height: "High Roof", volume: "15.5m³" },
    ],
    pros: ["Best-in-class reliability", "Superior 4x4 capability", "Massive aftermarket ecosystem", "High resale value"],
    cons: ["Higher purchase price", "Expensive maintenance", "Narrower than Sevel vans", "Rust issues on older models"],
    bestFor: "Off-grid adventurers with bigger budgets and taller individuals who want 4×4 capability.",
    watchOutFor: "Internal width of ~178cm means you'll need flares for a transverse bed if you're over 5'10\".",
    manufacturerUrl: "https://www.mercedes-benz-vans.com/en-gb/sprinter/panel-van.html",
    ebaySearch: "https://www.ebay.co.uk/sch/i.html?_nkw=mercedes+sprinter+panel+van+lwb",
    autotraderSearch: "https://www.autotrader.co.uk/van-search?make=Mercedes-Benz&model=Sprinter",
    fbSearch: "https://www.facebook.com/marketplace/category/vehicles",
    internalWidth: "1.78m",
  },
  "vw-crafter": {
    name: "VW CRAFTER",
    tagline: "The Refined Precision Touring Foundation.",
    description: "The second-generation VW Crafter is often cited as the most 'car-like' large van to drive. Its refined suspension and advanced driver assistance systems make it the preferred choice for those planning long-distance European tours where driver comfort is paramount.",
    heroImage: "/images/bespoke-crafter.png",
    schematicImage: "/images/vw-crafter.png",
    specs: [
      { label: "Engine Options", value: "2.0L TDI Eco" },
      { label: "Power Output", value: "102 - 177", unit: "HP" },
      { label: "Drivetrain", value: "FWD / RWD / 4MOTION" },
      { label: "Transmission", value: "8-Speed Auto" },
      { label: "GVWR", value: "3000 - 5500", unit: "KG" },
    ],
    configurations: [
      { label: "Medium Wheelbase", length: "5986mm", internalL: "3450mm", height: "High Roof", volume: "9.9m³" },
      { label: "Long Wheelbase", length: "6836mm", internalL: "4300mm", height: "High Roof", volume: "14.4m³" },
      { label: "LWB Maxi", length: "7391mm", internalL: "4855mm", height: "Super High", volume: "16.1m³" },
    ],
    pros: ["Exceptional driving ergonomics", "Great 8-speed automatic gearbox", "Square load box for easier building", "Modern tech stack"],
    cons: ["Complex electronics", "Fewer conversion parts than Sprinter", "DPF sensitivities", "RWD variants eat into payload"],
    bestFor: "Long-range adventure touring and owners who prioristise car-like handling and modern interiors.",
    watchOutFor: "AdBlue consumption and the LWB Maxi's significant rear overhang which can scrape on ferries.",
    manufacturerUrl: "https://www.volkswagen-vans.co.uk/en/models/crafter-panel-van.html",
    ebaySearch: "https://www.ebay.co.uk/sch/i.html?_nkw=vw+crafter+panel+van+lwb",
    autotraderSearch: "https://www.autotrader.co.uk/van-search?make=Volkswagen&model=Crafter",
    fbSearch: "https://www.facebook.com/marketplace/category/vehicles",
    internalWidth: "1.80m",
  },
  "ford-transit": {
    name: "FORD TRANSIT",
    tagline: "The Versatile Workhorse for Every Builder.",
    description: "The Ford Transit remains the most popular van in the UK for a reason. Its vast availability, relatively low maintenance costs, and the capable factory AWD option make it a fantastic middle-ground for builders who want capability without the 'sprinter tax'.",
    heroImage: "/images/bespoke-transit.png",
    schematicImage: "/images/transit-schematic.png",
    specs: [
      { label: "Engine Options", value: "2.0L EcoBlue" },
      { label: "Power Output", value: "105 - 185", unit: "HP" },
      { label: "Drivetrain", value: "FWD / RWD / AWD" },
      { label: "Transmission", value: "6-Speed / 10-Speed" },
      { label: "GVWR", value: "2900 - 4700", unit: "KG" },
    ],
    configurations: [
      { label: "L2 (Medium)", length: "5531mm", internalL: "3044mm", height: "H2 Medium", volume: "9.5m³" },
      { label: "L3 (Long)", length: "5981mm", internalL: "3494mm", height: "H3 High", volume: "11.5m³" },
      { label: "L4 (Jumbo)", length: "6704mm", internalL: "4217mm", height: "H3 High", volume: "15.1m³" },
    ],
    pros: ["Maintenance parts are available everywhere", "Huge cargo volume in 'Jumbo' L4H3", "Excellent FordPass connectivity", "Reliable AWD system"],
    cons: ["Highest theft risk in its class", "Lower resale than VW/Merc", "Cab interior feels more 'workmanlike'", "Complexity of the 10-speed auto"],
    bestFor: "Practical builders, those on a mid-range budget, and users who need the ultimate load volume of the L4 configuration.",
    watchOutFor: "Security is the #1 priority for Transit owners. Deadlocks and alarms are essential from day one.",
    manufacturerUrl: "https://www.ford.co.uk/commercial-vehicles/transit",
    ebaySearch: "https://www.ebay.co.uk/sch/i.html?_nkw=ford+transit+panel+van+lwb+h3",
    autotraderSearch: "https://www.autotrader.co.uk/van-search?make=Ford&model=Transit",
    fbSearch: "https://www.facebook.com/marketplace/category/vehicles",
    internalWidth: "1.78m",
  },
  "man-tge": {
    name: "MAN TGE",
    tagline: "The Commercial-Grade Van with Premium Support.",
    description: "Built on the same chassis as the VW Crafter, the MAN TGE distinguishes itself through its commercial-focused service network. If you're building a full-time tiny home, MAN's 24/7 truck-focused service centres are a game changer for maintenance and recovery.",
    heroImage: "/images/bespoke-man.png",
    schematicImage: "/images/man-tge.png",
    specs: [
      { label: "Engine Options", value: "2.0L Diesel" },
      { label: "Power Output", value: "102 - 177", unit: "HP" },
      { label: "Drivetrain", value: "FWD / RWD / AWD" },
      { label: "Transmission", value: "8-Speed Auto / 6-Speed" },
      { label: "GVWR", value: "3000 - 5500", unit: "KG" },
    ],
    configurations: [
      { label: "Standard Wheelbase", length: "5986mm", internalL: "3450mm", height: "High Roof", volume: "9.9m³" },
      { label: "Long Wheelbase", length: "6836mm", internalL: "4300mm", height: "High Roof", volume: "14.4m³" },
    ],
    pros: ["Truck-level service network (24/7)", "Superior mechanical warranty", "Identical to Crafter for parts", "Great build quality"],
    cons: ["Fewer retail dealers than VW", "Slightly more industrial brand image", "Expensive options list", "Complex ADAS systems"],
    bestFor: "Full-time vanlifers who cannot afford downtime and want the backing of a global truck network.",
    watchOutFor: "The ADAS (safety) systems can be sensitive to exterior modifications like bull bars.",
    manufacturerUrl: "https://www.man.eu/en-gb/trucks-and-vans/man-tge/overview.html",
    ebaySearch: "https://www.ebay.co.uk/sch/i.html?_nkw=man+tge+panel+van",
    autotraderSearch: "https://www.autotrader.co.uk/van-search?make=MAN&model=TGE",
    fbSearch: "https://www.facebook.com/marketplace/category/vehicles",
    internalWidth: "1.80m",
  },
  "fiat-ducato": {
    name: "FIAT DUCATO",
    tagline: "The Space-Maximiser for Creative Layouts.",
    description: "The Ducato (and its siblings Boxer/Relay) is the widest van in its class. Because the body doesn't taper as much towards the roof, it is the only van where a bed can be fitted transversely (across the van) without structural flares, saving thousands of pounds in the build.",
    heroImage: "/images/bespoke-fiat.png",
    schematicImage: "/images/fiat-ducato.png",
    specs: [
      { label: "Engine Options", value: "2.2L MultiJet3" },
      { label: "Power Output", value: "120 - 180", unit: "HP" },
      { label: "Drivetrain", value: "FWD Only" },
      { label: "Transmission", value: "9-Speed Auto / 6-Speed" },
      { label: "GVWR", value: "3000 - 4250", unit: "KG" },
    ],
    configurations: [
      { label: "L2H2 (MWB)", length: "5413mm", internalL: "3120mm", height: "H2 High", volume: "11.5m³" },
      { label: "L3H2 (LWB)", length: "5998mm", internalL: "3705mm", height: "H2 High", volume: "13.0m³" },
      { label: "L4H3 (XLWB)", length: "6363mm", internalL: "4070mm", height: "H3 Super", volume: "17.0m³" },
    ],
    pros: ["Widest internal loadspace (1.87m)", "Transverse bed layouts are easy", "Lightest chassis = highest payload", "Very economical engines"],
    cons: ["Front-wheel drive only (no 4x4)", "Noisier to drive than Crafter/Merc", "Rust on paint (typical Fiat)", "Lower cab build quality"],
    bestFor: "Maximum storage, transverse beds, and budget-conscious builders who need every gram of payload.",
    watchOutFor: "The Fiat 9-speed 'Torque Converter' auto is brilliant, the older 'Comfort-Matic' is best avoided.",
    manufacturerUrl: "https://www.fiatprofessional.com/gb/ducato",
    ebaySearch: "https://www.ebay.co.uk/sch/i.html?_nkw=fiat+ducato+panel+van+lwb",
    autotraderSearch: "https://www.autotrader.co.uk/van-search?make=Fiat&model=Ducato",
    fbSearch: "https://www.facebook.com/marketplace/category/vehicles",
    internalWidth: "1.87m",
  },
  "peugeot-boxer": {
    name: "PEUGEOT BOXER",
    tagline: "The Reliable Utility Foundation.",
    description: "Sharing the same legendary 'wide-body' chassis as the Ducato, the Peugeot Boxer is a favorite among UK fleets. Its BlueHDi engines are known for their efficiency, and its square cargo area is a dream for modular furniture installations.",
    heroImage: "/images/bespoke-boxer.png",
    schematicImage: "/images/peugeot-boxer-schematic.png",
    specs: [
      { label: "Engine Options", value: "2.2L BlueHDi" },
      { label: "Power Output", value: "120 - 165", unit: "HP" },
      { label: "Drivetrain", value: "FWD Only" },
      { label: "Transmission", value: "6-Speed Manual" },
      { label: "GVWR", value: "3000 - 4005", unit: "KG" },
    ],
    configurations: [
      { label: "L2H2 (MWB)", length: "5413mm", internalL: "3120mm", height: "H2 High", volume: "11.5m³" },
      { label: "L3H2 (LWB)", length: "5998mm", internalL: "3705mm", height: "H2 High", volume: "13.0m³" },
      { label: "L4H2 (XLWB)", length: "6363mm", internalL: "4070mm", height: "H2 High", volume: "15.0m³" },
    ],
    pros: ["Class-leading internal width", "Excellent fuel economy", "Simple mechanicals for easy repair", "High availability in the UK"],
    cons: ["Manual only (for most models)", "Noisy at motorway speeds", "Basic interior technology", "Limited 4x4 options"],
    bestFor: "Owners who want the benefits of a Sevel wide-body on a more industrial-focused fleet brand.",
    watchOutFor: "Timing belt changes are critical on the 2.2L engines. Every 50k miles is the enthusiast recommendation.",
    manufacturerUrl: "https://www.peugeot.co.uk/models/boxer.html",
    ebaySearch: "https://www.ebay.co.uk/sch/i.html?_nkw=peugeot+boxer+panel+van+lwb",
    autotraderSearch: "https://www.autotrader.co.uk/van-search?make=Peugeot&model=Boxer",
    fbSearch: "https://www.facebook.com/marketplace/category/vehicles",
    internalWidth: "1.87m",
  },
  "citroen-relay": {
    name: "CITROEN RELAY",
    tagline: "The Practical Professional Choice.",
    description: "The Citroen Relay completes the Sevel trio, offering the same 1.87m internal width that makes transverse beds a breeze. It is often the most competitively priced of the three, making it the savvy choice for builders focused on ROI.",
    heroImage: "/images/bespoke-relay.png",
    schematicImage: "/images/citroen-relay-schematic.png",
    specs: [
      { label: "Engine Options", value: "2.2L BlueHDi" },
      { label: "Power Output", value: "120 - 165", unit: "HP" },
      { label: "Drivetrain", value: "FWD Only" },
      { label: "Transmission", value: "6-Speed Manual" },
      { label: "GVWR", value: "3000 - 4000", unit: "KG" },
    ],
    configurations: [
      { label: "L1H1 (SWB)", length: "4963mm", internalL: "2670mm", height: "H1 Low", volume: "8.0m³" },
      { label: "L2H2 (MWB)", length: "5413mm", internalL: "3120mm", height: "H2 High", volume: "11.5m³" },
      { label: "L3H2 (LWB)", length: "5998mm", internalL: "3705mm", height: "H2 High", volume: "13.0m³" },
    ],
    pros: ["Superior width-to-length ratio", "Lightest in class (higher payload)", "Affordable parts and service", "Huge network of specialist breakers"],
    cons: ["Low ground clearance", "Interior feels dated", "Poor standard soundproofing", "Soft paint prone to stone chips"],
    bestFor: "Budget-conscious self-builders who prioritise internal volume and payload over luxury features.",
    watchOutFor: "Check the central 'U-bolt' on the rear leaf springs; they can loosen and cause noise on older models.",
    manufacturerUrl: "https://www.citroen.co.uk/models/relay.html",
    ebaySearch: "https://www.ebay.co.uk/sch/i.html?_nkw=citroen+relay+panel+van+lwb",
    autotraderSearch: "https://www.autotrader.co.uk/van-search?make=Citroen&model=Relay",
    fbSearch: "https://www.facebook.com/marketplace/category/vehicles",
    internalWidth: "1.87m",
  },
  "iveco-daily": {
    name: "IVECO DAILY",
    tagline: "The 7-Tonne Truck in an LCV Body.",
    description: "The Iveco Daily is unique in having a C-section truck-style ladder frame instead of a unibody. This makes it the ultimate choice for heavy-duty builds reaching up to 7.2 tonnes, or for those who plan to tow heavy equipment behind their motorhome.",
    heroImage: "/images/bespoke-iveco.png",
    schematicImage: "/images/iveco-daily.png",
    specs: [
      { label: "Engine Options", value: "3.0L F1C Diesel" },
      { label: "Power Output", value: "136 - 210", unit: "HP" },
      { label: "Drivetrain", value: "RWD / Real 4X4" },
      { label: "Transmission", value: "8-Speed Hi-Matic" },
      { label: "GVWR", value: "3300 - 7200", unit: "KG" },
    ],
    configurations: [
      { label: "V-Series (High)", length: "6100mm", internalL: "3540mm", height: "High Roof", volume: "12.0m³" },
      { label: "XL-Series", length: "7270mm", internalL: "4680mm", height: "High Roof", volume: "17.2m³" },
      { label: "Super XL", length: "7630mm", internalL: "5130mm", height: "Super High", volume: "19.6m³" },
    ],
    pros: ["Unmatched payload capacity", "Legendary 3.0L engine durability", "Best 4x4 system in the market", "Industrial-grade chassis"],
    cons: ["Very hard ride when empty", "Highest fuel consumption", "Requires C1 licence over 3.5t", "Significant internal floor height"],
    bestFor: "Ultimate overlanding, heavy luxury builds, and towing requirements that exceed 3 tonnes.",
    watchOutFor: "Most Iveco Dailys are over 3.5t GVWR - check your driver's licence requirements before buying.",
    manufacturerUrl: "https://www.iveco.com/uk-en/new-vehicles/daily",
    ebaySearch: "https://www.ebay.co.uk/sch/i.html?_nkw=iveco+daily+panel+van+lwb",
    autotraderSearch: "https://www.autotrader.co.uk/van-search?make=Iveco&model=Daily",
    fbSearch: "https://www.facebook.com/marketplace/category/vehicles",
    internalWidth: "1.74m",
  },
};
