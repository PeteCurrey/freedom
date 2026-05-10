import { Metadata } from "next";
import { GUIDES } from "@/lib/data/guides";
import GuideContent from "@/components/guides/GuideContent";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const guide = GUIDES[resolvedParams.slug];

  if (!guide) return { title: "Guide Not Found | Amplios" };

  return {
    title: `${guide.title} | Campervan Engineering Guide | Amplios`,
    description: guide.metaDescription,
    openGraph: {
      title: guide.title,
      description: guide.metaDescription,
    }
  };
}

export default function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  return <GuideContent params={params} />;
}
