import type { ContentMap } from './getPageContent';

/**
 * Safely retrieve a CMS value from a ContentMap.
 * If the value is missing or the map is empty, returns the hardcoded fallback.
 * This guarantees zero visual change if the DB has no content for this page.
 *
 * @example
 * const content = await getPageContent('home');
 * const heading = cms(content, 'hero', 'heading', 'Engineering Freedom.');
 */
export function cms(
  content: ContentMap,
  section: string,
  field: string,
  fallback: string = ''
): string {
  return content?.[section]?.[field] || fallback;
}
