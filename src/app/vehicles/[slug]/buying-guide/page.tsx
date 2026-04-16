import { Metadata } from "next";
import { vehicleData } from "@/lib/data/vehicles";
import BuyingGuideClient from "./BuyingGuideClient";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const vehicle = vehicleData[params.slug] || vehicleData["mercedes-sprinter"];
  const brand = vehicle.name.split(" ")[0];
  
  return {
    title: `${brand} Motorhome Buying Guide | Amplios`,
    description: `The definitive 2026 guide to buying a ${vehicle.name} for campervan conversion. Includes price guides, mechanical checklists, and common rust points.`,
    openGraph: {
      title: `${brand} Conversion Buying Guide`,
      description: `Expert advice on sourcing a ${brand} for your motorhome build.`,
      images: [vehicle.heroImage],
    },
  };
}

export default function BuyingGuide({ params }: { params: { slug: string } }) {
  return <BuyingGuideClient slug={params.slug} />;
}

// Price Bracket Type
interface PriceBracket {
  years: string;
  mileage: string;
  price: string;
}

const getPriceBrackets = (slug: string): PriceBracket[] => {
  switch (slug) {
    case "mercedes-sprinter":
      return [
        { years: "2015-2017", mileage: "80k - 120k", price: "£12,000 - £18,000" },
        { years: "2018-2020", mileage: "40k - 80k", price: "£20,000 - £28,000" },
        { years: "2021+", mileage: "Under 40k", price: "£28,000 - £40,000" },
      ];
    case "vw-crafter":
    case "man-tge":
      return [
        { years: "2017-2019", mileage: "70k - 110k", price: "£14,000 - £20,000" },
        { years: "2020-2022", mileage: "30k - 70k", price: "£22,000 - £32,000" },
        { years: "2023+", mileage: "Under 30k", price: "£32,000 - £45,000" },
      ];
    case "ford-transit":
      return [
        { years: "2016-2018", mileage: "80k - 120k", price: "£10,000 - £15,000" },
        { years: "2019-2021", mileage: "40k - 80k", price: "£16,000 - £24,000" },
        { years: "2022+", mileage: "Under 40k", price: "£25,000 - £35,000" },
      ];
    case "fiat-ducato":
      return [
        { years: "2015-2018", mileage: "70k - 100k", price: "£8,000 - £14,000" },
        { years: "2019-2021", mileage: "30k - 70k", price: "£15,000 - £22,000" },
        { years: "2022+", mileage: "Under 30k", price: "£23,000 - £32,000" },
      ];
    case "iveco-daily":
      return [
        { years: "2014-2017", mileage: "100k - 150k", price: "£7,000 - £12,000" },
        { years: "2018-2020", mileage: "60k - 100k", price: "£13,000 - £20,000" },
        { years: "2021+", mileage: "Under 60k", price: "£22,000 - £35,000" },
      ];
    default:
      return [];
  }
};

const getVehicleSpecificChecks = (slug: string) => {
  switch (slug) {
    case "mercedes-sprinter":
      return [
        { title: "Injector Seals (Black Death)", desc: "Check for carbon buildup around injectors. Expensive if left too long." },
        { title: "Rear Wheel Arches", desc: "Common rust spot, especially on pre-2018 models." },
        { title: "Turbo Resonator", desc: "Known to split under pressure, causing limp mode." },
      ];
    case "vw-crafter":
    case "man-tge":
      return [
        { title: "AdBlue System", desc: "Post-2017 models can have sensor issues. Check for dashboard warnings." },
        { title: "Timing Belt", desc: "Ensure service history shows change every 4-5 years or 100k miles." },
        { title: "Front Subframe", desc: "Check for surface corrosion on older UK-based vans." },
      ];
    case "ford-transit":
      return [
        { title: "Security / Theft Risk", desc: "High theft risk. Check for deadlock installations or alarm upgrades." },
        { title: "Turbo Whistle", desc: "Listen for excessive whistling under load which may indicate imminent failure." },
        { title: "Injector Health", desc: "Especially on 2.2 TDCi models; listen for uneven idling." },
      ];
    case "fiat-ducato":
      return [
        { title: "3rd/4th Gear Crunch", desc: "Common on older manuals. Ensure smooth shifts during test drive." },
        { title: "Timing Belt & Water Pump", desc: "Must be done together. Check service stamps." },
        { title: "Sill Rust", desc: "Check rear crossmember and sill ends for rot." },
      ];
    case "iveco-daily":
      return [
        { title: "Dual-Mass Flywheel", desc: "Listen for clattering at idle. Expensive to replace." },
        { title: "EGR Valve", desc: "Prone to clogging if used for short trips. Check power delivery." },
        { title: "Brake Caliper Seizure", desc: "Rear calipers are prone to sticking on infrequently used vans." },
      ];
    default:
      return [];
  }
};
