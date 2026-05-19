export const dynamic = 'force-dynamic';

import { getPageContent } from "@/lib/cms/getPageContent";
import BuildPlannerClient from "./page.client";

export default async function BuildPlannerPage() {
  const content = await getPageContent('planner');
  return <BuildPlannerClient content={content} />;
}
