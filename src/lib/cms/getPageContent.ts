import { createClient } from '@supabase/supabase-js';

export type ContentMap = Record<string, Record<string, string>>;

/**
 * Fetch all CMS content for a given pageKey.
 * Returns a nested map: content[sectionKey][fieldKey] = value
 * Falls back to empty object (pages use hardcoded fallbacks via cms() helper).
 *
 * Uses a server-side admin client to bypass RLS for reads.
 * Always fetches fresh — no cache — so edits are reflected immediately.
 */
export async function getPageContent(pageKey: string): Promise<ContentMap> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        fetch: (url, init) => fetch(url, { ...init, cache: 'no-store' })
      }
    }
  );

  const { data, error } = await supabase
    .from('page_content')
    .select('section_key, field_key, value')
    .eq('page_key', pageKey);

  if (error || !data || data.length === 0) {
    return {};
  }

  return data.reduce((acc: ContentMap, row) => {
    if (!acc[row.section_key]) acc[row.section_key] = {};
    acc[row.section_key][row.field_key] = row.value ?? '';
    return acc;
  }, {});
}

/**
 * Client-side version: fetches via the public anon key.
 * Use this in 'use client' components where service role is not available.
 */
export async function getPageContentClient(pageKey: string): Promise<ContentMap> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        fetch: (url, init) => fetch(url, { ...init, cache: 'no-store' })
      }
    }
  );

  const { data, error } = await supabase
    .from('page_content')
    .select('section_key, field_key, value')
    .eq('page_key', pageKey);

  if (error || !data || data.length === 0) {
    return {};
  }

  return data.reduce((acc: ContentMap, row) => {
    if (!acc[row.section_key]) acc[row.section_key] = {};
    acc[row.section_key][row.field_key] = row.value ?? '';
    return acc;
  }, {});
}
