import { Metadata } from "next";
import CompareVansClient from "./CompareVansClient";

export const metadata: Metadata = {
  title: "Compare Van Chassis for Motorhome Conversion | Amplios",
  description: "Side-by-side engineering comparison of Sprinter, Crafter, Transit, Ducato, and Daily chassis for off-grid builds.",
  openGraph: {
    title: "The Ultimate Van Comparison Tool",
    description: "Find the perfect base for your campervan build using our technical matrix.",
  },
};

export default function CompareVans() {
  return <CompareVansClient />;
}
