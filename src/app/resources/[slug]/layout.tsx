import { Metadata } from "next";

const ARTICLE_META: Record<string, { title: string; subtitle: string; image: string }> = {
  "conversion-cost-guide": {
    title: "The Ultimate Guide to Van Conversion Costs",
    subtitle: "Realistic UK 2026 pricing for parts, materials, and chassis.",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1000",
  },
  "first-steps": {
    title: "Phase 1: Your First 8 Steps to a Mobile Home",
    subtitle: "The engineering-led build sequence that avoids rookie mistakes.",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1000",
  },
  "dvla-reclassification": {
    title: "DVLA Rules & Reclassification Guide",
    subtitle: "The legal landscape of campervan conversions in the UK.",
    image: "https://images.unsplash.com/photo-1544621443-42468301beaf?q=80&w=1000",
  },
  "lithium-battery-guide": {
    title: "The Lithium Battery Bible",
    subtitle: "Everything you need to know about LiFePO4 for van builds.",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1000",
  },
  "truma-vs-webasto": {
    title: "Truma vs Webasto: The Definitive Heater Comparison",
    subtitle: "Which diesel heater wins for UK vanlifers?",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=1000",
  },
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = ARTICLE_META[params.slug];

  if (!article) {
    return { title: "Resource Not Found" };
  }

  return {
    title: article.title,
    description: article.subtitle,
    openGraph: {
      title: `${article.title} | Amplios`,
      description: article.subtitle,
      images: [article.image],
    },
  };
}

export default function ResourceSlugLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
