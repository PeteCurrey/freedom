import { Metadata } from "next";
import GuidesHubContent from "@/components/guides/GuidesHubContent";

export const metadata: Metadata = {
  title: "Campervan Conversion Guides | Technical Engineering Library | Amplios",
  description: "Explore our comprehensive library of technical guides for DIY campervan and motorhome conversions. From electrical schematics to insulation standards.",
  openGraph: {
    title: "Engineering Library | Amplios",
    description: "Expert technical guides for high-performance DIY campervan conversions.",
  }
};

export default function GuidesHubPage() {
  return <GuidesHubContent />;
}
