export interface ManifestItem {
  name: string;
  category: string;
  spec?: string;
  supplierId: string;
  approxPrice?: number;
}

export interface SystemManifest {
  [tierId: string]: ManifestItem[];
}

export const systemManifests: Record<string, SystemManifest> = {
  electrical: {
    basic: [
      { name: "Yuasa L36-EFB 100Ah", category: "Battery", spec: "Leisure Battery (Lead Acid)", supplierId: "alpha-batteries", approxPrice: 120 },
      { name: "Victron Orion-Tr Smart 12/12-30", category: "Charging", spec: "30A DC-DC Charger", supplierId: "energy-solutions", approxPrice: 180 },
      { name: "Blue Sea Systems 6-Circuit Fuse Block", category: "Distribution", spec: "Blade Fuse Box", supplierId: "12volt-planet", approxPrice: 45 }
    ],
    mid: [
      { name: "Fogstar Drift 230Ah Lithium", category: "Battery", spec: "LiFePO4 with Bluetooth BMS", supplierId: "fogstar", approxPrice: 750 },
      { name: "Victron MultiPlus 12/800/35", category: "Inverter/Charger", spec: "800W Sine Wave / 35A Charger", supplierId: "energy-solutions", approxPrice: 650 },
      { name: "Victron SmartSolar MPPT 100/20", category: "Solar", spec: "20A Solar Controller", supplierId: "energy-monkey", approxPrice: 130 },
      { name: "200W Monocrystalline Panel", category: "Solar", spec: "Rigid Solar Panel", supplierId: "midsummer-energy", approxPrice: 180 }
    ],
    pro: [
      { name: "Fogstar Drift 460Ah Lithium", category: "Battery", spec: "High Capacity LiFePO4", supplierId: "fogstar", approxPrice: 1400 },
      { name: "Victron MultiPlus-II 12/3000/120-32", category: "Inverter/Charger", spec: "3000W Sustained / 120A Charger", supplierId: "energy-solutions", approxPrice: 1100 },
      { name: "Victron Cerbo GX & Touch 50", category: "Monitoring", spec: "System Controller & Display", supplierId: "energy-solutions", approxPrice: 450 },
      { name: "3x 175W Victron Solar Panels", category: "Solar", spec: "525W Total Array", supplierId: "energy-monkey", approxPrice: 480 },
      { name: "Victron Lynx Distributor", category: "Distribution", spec: "Modular Busbar System", supplierId: "energy-solutions", approxPrice: 180 }
    ]
  },
  heating: {
    basic: [
      { name: "Chinese Diesel Heater 5kW", category: "Heating", spec: "Budget Forced Air Heater", supplierId: "ebay-motors-uk", approxPrice: 150 },
      { name: "Aftermarket Digital Controller", category: "Control", spec: "LCD Control Unit", supplierId: "ebay-motors-uk", approxPrice: 30 }
    ],
    mid: [
      { name: "Webasto Air Top 2000 STC", category: "Heating", spec: "Diesel Air Heater (Altitude Kit)", supplierId: "butler-technik", approxPrice: 1100 },
      { name: "Webasto SmartControl", category: "Control", spec: "Digital Programmable Timer", supplierId: "butler-technik", approxPrice: 120 }
    ],
    pro: [
      { name: "Truma Combi 4E", category: "Heating/Water", spec: "Gas/Electric Blown Air & Water Heater", supplierId: "jacksons-leisure", approxPrice: 2200 },
      { name: "Truma iNet X Panel", category: "Control", spec: "Touchscreen System Interface", supplierId: "jacksons-leisure", approxPrice: 250 },
      { name: "Truma Gas Pressure Regulator", category: "Gas", spec: "MonoControl CS High Pressure", supplierId: "jacksons-leisure", approxPrice: 140 }
    ]
  },
  water: {
    basic: [
      { name: "Fiamma 40L Roll Tank", category: "Tanks", spec: "Portable Fresh Water Tank", supplierId: "leisurelines", approxPrice: 85 },
      { name: "Whale Submersible Pump", category: "Pumping", spec: "12V High Flow Pump", supplierId: "leisurelines", approxPrice: 35 }
    ],
    mid: [
      { name: "CAK 80L Internal Custom Tank", category: "Tanks", spec: "Wheelarch Fitted Tank", supplierId: "cak-tanks", approxPrice: 180 },
      { name: "Shurflo Trail King 7 Pump", category: "Pumping", spec: "30PSI Pressure Pump", supplierId: "leisurelines", approxPrice: 95 },
      { name: "Whale Accumulator Tank", category: "Plumbing", spec: "2L Pressure Buffer", supplierId: "leisurelines", approxPrice: 40 }
    ],
    pro: [
      { name: "100L Underslung Fresh Tank", category: "Tanks", spec: "Chassis Specific Moulded Tank", supplierId: "cak-tanks", approxPrice: 250 },
      { name: "Whale Expanse Water Heater", category: "Water", spec: "Underslung Gas/Electric Storage", supplierId: "nomadic-leisure", approxPrice: 850 },
      { name: "Thetford C223CS Cassette", category: "Sanitation", spec: "Electric Flush Bench Toilet", supplierId: "thetford-marine", approxPrice: 450 },
      { name: "General Ecology Nature Pure QC", category: "Filtration", spec: "Ultrafine Water Purifier", supplierId: "general-water-filtration", approxPrice: 320 }
    ]
  },
  insulation: {
    basic: [
      { name: "Dodo Mat DEADN Hex", category: "Deadening", spec: "Butyl Sound Deadening (50 Sheets)", supplierId: "sound-deadening-shop", approxPrice: 140 },
      { name: "Kingspan TF70 25mm", category: "Insulation", spec: "PIR Rigid Board", supplierId: "wickes", approxPrice: 100 }
    ],
    mid: [
      { name: "Dodo Mat DEADN Pro", category: "Deadening", spec: "High Grade Sound Deadening", supplierId: "sound-deadening-shop", approxPrice: 220 },
      { name: "3M Thinsulate SM600L", category: "Insulation", spec: "Acoustic & Thermal Fleece", supplierId: "3m-thinsulate", approxPrice: 350 },
      { name: "Dodo Thermo Liner 6mm", category: "Insulation", spec: "Closed Cell Foam Barrier", supplierId: "sound-deadening-shop", approxPrice: 180 }
    ],
    pro: [
      { name: "Dodo Mat Full Sound/Thermal Kit", category: "Deadening", spec: "LWB Master Kit", supplierId: "sound-deadening-shop", approxPrice: 650 },
      { name: "ThermaSkirt Underfloor", category: "Heating", spec: "Wet System Underfloor Heating", supplierId: "nomadic-leisure", approxPrice: 800 },
      { name: "MaxxFan Deluxe", category: "Ventilation", spec: "Remote Control Roof Fan", supplierId: "maxxair", approxPrice: 380 }
    ]
  },
  gas: {
    basic: [
      { name: "6kg Calor Gas Bottle", category: "Gas", spec: "Steel LPG Bottle", supplierId: "propex", approxPrice: 80 },
      { name: "Thetford Topline 922", category: "Cooking", spec: "2-Burner Gas Hob", supplierId: "thetford-marine", approxPrice: 220 }
    ],
    pro: [
      { name: "Gaslow Refillable 6kg System", category: "Gas", spec: "Refillable LPG Bottle Kit", supplierId: "nomadic-leisure", approxPrice: 350 },
      { name: "Thetford Triplex Oven/Grill", category: "Cooking", spec: "Combined Oven, Grill & Hob", supplierId: "thetford-marine", approxPrice: 580 },
      { name: "Gaslow Auto-Changeover", category: "Gas", spec: "Dual Bottle Regulator", supplierId: "nomadic-leisure", approxPrice: 120 }
    ]
  }
};
