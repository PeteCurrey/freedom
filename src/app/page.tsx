export const dynamic = 'force-dynamic';

import { getPageContent } from "@/lib/cms/getPageContent";
import HomeClient from "./page.client";

export default async function HomePage() {
  const content = await getPageContent('home');
  return <HomeClient content={content} />;
}
