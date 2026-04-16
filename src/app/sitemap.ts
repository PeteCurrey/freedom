import { MetadataRoute } from 'next';
import { vehicleData } from '@/lib/data/vehicles';
import { supabase } from '@/lib/supabase';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://diymotorhomes.co.uk';

  // Base pages
  const staticPages = [
    '',
    '/about',
    '/showcase',
    '/store',
    '/resources',
    '/find-a-van',
    '/vehicles/compare',
    '/cart',
    '/advisor',
    '/planner',
    '/account',
    '/tools/cable-calculator'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Vehicle Profile & Buying Guide pages
  const vehiclePages = Object.keys(vehicleData).flatMap((slug) => [
    {
      url: `${baseUrl}/vehicles/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/vehicles/${slug}/buying-guide`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9, // Higher priority for buying guides
    },
  ]);

  // Resource articles
  const resourcePages = [
    'conversion-cost-guide',
    'first-steps',
    'dvla-reclassification',
    'lithium-battery-guide',
    'truma-vs-webasto',
  ].map((slug) => ({
    url: `${baseUrl}/resources/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Dynamic Product Pages
  const productPages = await getProductPages(baseUrl);

  return [...staticPages, ...vehiclePages, ...resourcePages, ...productPages];
}

async function getProductPages(baseUrl: string) {
  try {
    const { data: products } = await supabase
      .from('products')
      .select('slug')
      .eq('is_active', true);

    return (products || []).map((p) => ({
      url: `${baseUrl}/store/product/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.error('Error fetching sitemap products:', error);
    return [];
  }
}
