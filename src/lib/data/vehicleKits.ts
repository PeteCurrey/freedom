// src/lib/data/vehicleKits.ts

export interface KitTier {
  name: string;
  description: string;
  priceEstimate: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  specs: {
    electrical: string;
    solar: string;
    heating: string;
    water: string;
    ventilation: string;
    safety: string;
  };
  includes: string[];
}

export interface VehicleKit {
  slug: string;
  name: string;
  headline: string;
  shortPositioning: string;
  suitability: {
    useCases: string[];
    wheelbases: string[];
    payload: string;
    offGrid: string;
    easeOfConversion: string;
    limitations: string;
  };
  tiers: {
    essential: KitTier;
    offGrid: KitTier;
    liveaboard: KitTier;
  };
  faqs: { q: string; a: string }[];
}

export const VEHICLE_KITS: Record<string, VehicleKit> = {
  'mercedes-sprinter-campervan-conversion-kit': {
    slug: 'mercedes-sprinter-campervan-conversion-kit',
    name: 'Mercedes Sprinter',
    headline: 'Engineering the Perfect Sprinter Build',
    shortPositioning: 'The Sprinter is the industry benchmark for off-grid conversions. Our kits are optimized for its unique payload distribution and electrical architecture.',
    suitability: {
      useCases: ['Digital Nomad Hub', 'Professional Off-Grid Home', 'Mountain Sports Base'],
      wheelbases: ['MWB (L2)', 'LWB (L3)', 'Extra-LWB (L4)'],
      payload: 'Exceptional payload capacity (especially 3.5t/5t models), allowing for heavy-duty lithium banks and underslung tanks.',
      offGrid: 'Highest potential. Large roof space allows for up to 600W+ solar arrays.',
      easeOfConversion: 'Excellent. Huge community support and pre-fabricated parts availability.',
      limitations: 'Rust vulnerability on older pre-2018 models. High entry price for the base vehicle.'
    },
    tiers: {
      essential: {
        name: 'Essential Starter Kit',
        description: 'Perfect for weekend adventures and summer builds.',
        priceEstimate: '£3,500 - £5,000',
        difficulty: 'Beginner',
        specs: {
          electrical: '100Ah AGM + DC-DC Charger',
          solar: '175W Rigid Panel',
          heating: '2kW Diesel Heater',
          water: '25L Internal Fresh/Waste',
          ventilation: 'Single 40x40 Skylight',
          safety: 'Smoke & CO Alarms'
        },
        includes: ['Insulation Pack', 'Ply Lining Template', 'Basic Electrical Harness']
      },
      offGrid: {
        name: 'Off-Grid Core Kit',
        description: 'The sweet spot for serious explorers needing 3-5 days autonomy.',
        priceEstimate: '£7,000 - £10,000',
        difficulty: 'Intermediate',
        specs: {
          electrical: '200Ah Lithium + 2000W Inverter',
          solar: '350W Solar Array',
          heating: '2kW Autoterm Diesel Heater',
          water: '75L Underslung Fresh / 50L Waste',
          ventilation: 'MaxxFan Deluxe + Bonded Side Window',
          safety: 'Gas Locker + Drop Vents'
        },
        includes: ['Victron Smart Monitoring', 'Underslung Tank Brackets', 'Dometic Window Kit']
      },
      liveaboard: {
        name: 'Full-Time Liveaboard Kit',
        description: 'Total autonomy. Power induction cooking and showers anywhere in the world.',
        priceEstimate: '£15,000+',
        difficulty: 'Advanced',
        specs: {
          electrical: '460Ah Lithium + 3000W Victron MultiPlus',
          solar: '600W+ High-Efficiency Array',
          heating: 'Truma Combi 4E (Air & Water)',
          water: '100L Underslung Fresh / 75L Waste',
          ventilation: 'Dual MaxxFans + Full Bonded Glass Set',
          safety: 'S5 Tracker + Ghost Immobiliser'
        },
        includes: ['Starlink Mount', 'Induction Cooktop', 'Full Wetroom Kit']
      }
    },
    faqs: [
      { q: 'Is a Sprinter L3H2 big enough for a shower?', a: 'Yes, the L3 (LWB) is the ideal length for a full internal wetroom without sacrificing too much kitchen space.' },
      { q: 'What is the payload risk on a 3.5t Sprinter?', a: 'With a high-spec liveaboard build, you can easily approach the 3.5t limit. We recommend using our payload calculator before ordering heavy water tanks.' }
    ]
  },
  'volkswagen-crafter-campervan-conversion-kit': {
    slug: 'volkswagen-crafter-campervan-conversion-kit',
    name: 'Volkswagen Crafter',
    headline: 'Modern Precision for your Crafter Build',
    shortPositioning: 'The post-2017 Crafter offers the best ergonomic driving experience and a square interior footprint ideal for bed pods.',
    suitability: {
      useCases: ['High-End Modern Living', 'Adventure Van', 'Family Weekender'],
      wheelbases: ['MWB', 'LWB', 'LWB Max'],
      payload: 'Good, though slightly less than the RWD Sprinter due to FWD components on some models.',
      offGrid: 'Very high. Square roof profile makes solar mounting straightforward.',
      easeOfConversion: 'Excellent. Vertical walls make furniture fitting easier than in a Transit or Sprinter.',
      limitations: 'Complex CAN-bus electrical system requires specialist integration modules.'
    },
    tiers: {
      essential: {
        name: 'Essential Starter Kit',
        description: 'High-quality basics for a clean, simple build.',
        priceEstimate: '£4,000 - £6,000',
        difficulty: 'Beginner',
        specs: {
          electrical: 'Victron Orion DC-DC + 110Ah AGM',
          solar: '175W Rigid Panel',
          heating: 'Planar 2kW Diesel Heater',
          water: '25L Internal Cans',
          ventilation: 'Fiamma 40x40 Vent',
          safety: 'Basic Fire & Alarm Pack'
        },
        includes: ['Crafter-Specific Floor Template', 'Sound Deadening Pack']
      },
      offGrid: {
        name: 'Off-Grid Core Kit',
        description: 'Advanced power and comfort for long-range trips.',
        priceEstimate: '£8,500 - £12,000',
        difficulty: 'Intermediate',
        specs: {
          electrical: 'Roamer 230Ah Lithium + MultiPlus 1600',
          solar: '350W Solar array',
          heating: 'Autoterm 2D + Comfort Controller',
          water: '80L Underslung Fresh',
          ventilation: 'MaxxFan Deluxe',
          safety: 'Full Gas Safety Kit'
        },
        includes: ['Bed Pods (Flare-outs)', 'Custom Galley Module']
      },
      liveaboard: {
        name: 'Full-Time Liveaboard Kit',
        description: 'The ultimate Crafter spec for year-round habitation.',
        priceEstimate: '£18,000+',
        difficulty: 'Advanced',
        specs: {
          electrical: 'Victron 48V System / 10kWh Storage',
          solar: '700W+ Custom Roof Array',
          heating: 'Truma Combi 6E',
          water: '120L Insulated Under-tank',
          ventilation: 'AC System + Dual Vents',
          safety: 'Full Security & Tracker Suite'
        },
        includes: ['Premium Bathroom Module', 'Custom 48V Induction Kit']
      }
    },
    faqs: [
      { q: 'Should I choose FWD or 4Motion Crafter?', a: 'FWD is great for payload and fuel economy. 4Motion is essential for serious off-track exploration but reduces your payload by ~150kg.' }
    ]
  }
};
