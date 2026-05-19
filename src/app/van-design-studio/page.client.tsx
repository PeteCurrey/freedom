"use client";

import { AppShell } from "@/features/van-design-studio/components/AppShell";

export default function VanDesignStudioClient({ content }: { content: any }) {
  // If AppShell supported content, we'd pass it here. For now, just render.
  return <AppShell />;
}
