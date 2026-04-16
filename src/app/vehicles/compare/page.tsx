import { Metadata } from "next";
import CompareVansClient from "./CompareVansClient";

export const metadata: Metadata = {
  title: "Compare Van Chassis for Motorhome Conversion | DIY Motorhomes",
  description: "Side-by-side technical comparison of Sprinter, Crafter, Transit, Ducato, and more. Compare internal width, payload, and drivetrain options.",
  openGraph: {
    title: "The Ultimate Van Comparison Tool",
    description: "Find the perfect base for your campervan build using our technical matrix.",
  },
};

export default function CompareVans() {
  return <CompareVansClient />;
}
