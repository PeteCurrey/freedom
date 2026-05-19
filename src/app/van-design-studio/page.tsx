export const dynamic = 'force-dynamic';

import { getPageContent } from "@/lib/cms/getPageContent";
import VanDesignStudioClient from "./page.client";

export default async function VanDesignStudioPage() {
  const content = await getPageContent('van-design-studio');
  return <VanDesignStudioClient content={content} />;
}
