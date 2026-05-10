import { MetadataRoute } from 'next';
import { vehicleData } from '@/lib/data/vehicles';
import { createClient } from '@supabase/supabase-js';

const baseUrl = 'https://amplios.co.uk';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  );

  // Static core pages
  const staticPages = [
    '',
    '/about',
    '/showcase',
    '/resources',
    '/guides',
    '/find-a-van',
    '/vehicles/compare',
    '/vehicles/compare/man-tge-vs-vw-crafter',
    '/cart',
    '/advisor',
    '/planner',
    '/account',
    '/tools/cable-calculator',
    '/suppliers'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Vehicle Profile & Buying Guide pages (8 Chassis * 3 pages)
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
      priority: 0.9,
    },
    {
      url: `${baseUrl}/vehicles/${slug}/listings`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ]);

  // Resource articles (/resources/)
  const resourcesList = [
    'conversion-cost-guide',
    'first-steps',
    'dvla-reclassification',
    'lithium-battery-guide',
    'truma-combi-install',
    'sound-deadening-basics',
    'solar-shading-guide',
  ].map((slug) => ({
    url: `${baseUrl}/resources/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Technical Guides (/guides/)
  const guidesList = [
    'campervan-electrical-guide',
    'campervan-heating-guide',
    'campervan-plumbing-guide',
    'how-to-insulate-a-van-uk',
    'van-size-guide',
    'should-i-convert-a-van',
    'motorhome-conversion-timeline',
    'wild-camping-uk-campervan',
    'van-life-europe-guide',
    'winter-van-life-alps',
    'nc500-campervan-guide',
    'starlink-campervan-installation',
    'best-portable-power-station',
    'best-12v-campervan-fridge',
    'best-campervan-toilet',
    'van-conversion-tyres',
    'van-alloy-wheels-guide',
    'van-suspension-upgrade',
    'build-sequence',
    'compare/maxxair-vs-fiamma',
    'compare/best-campervan-heaters',
    'compare/truma-vs-webasto',
    'compare/truma-vs-chinese-diesel-heater',
    'compare/fogstar-vs-victron-lithium',
    'compare/dometic-cfx3-vs-alternatives',
  ].map((slug) => ({
    url: `${baseUrl}/guides/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Dynamic content from Supabase
  let dynamicPages: MetadataRoute.Sitemap = [];

  try {
    // 1. Store Products
    const { data: products } = await supabaseAdmin.from('products').select('slug, updated_at');
    if (products) {
      dynamicPages.push(...products.map(p => ({
        url: `${baseUrl}/store/product/${p.slug}`,
        lastModified: new Date(p.updated_at),
        changeFrequency: 'daily' as const,
        priority: 0.9
      })));
    }

    // 2. Showcase Builds
    const { data: showcase } = await supabaseAdmin.from('showcase_builds').select('slug, updated_at');
    if (showcase) {
      dynamicPages.push(...showcase.map(s => ({
        url: `${baseUrl}/showcase/${s.slug}`,
        lastModified: new Date(s.updated_at),
        changeFrequency: 'weekly' as const,
        priority: 0.7
      })));
    }

    // 3. Suppliers
    const { data: suppliers } = await supabaseAdmin.from('suppliers').select('slug, updated_at');
    if (suppliers) {
      dynamicPages.push(...suppliers.map(sup => ({
        url: `${baseUrl}/suppliers/${sup.slug}`,
        lastModified: new Date(sup.updated_at),
        changeFrequency: 'monthly' as const,
        priority: 0.6
      })));
    }

    // 4. Build Systems
    const { data: systems } = await supabaseAdmin.from('build_systems').select('slug, updated_at');
    if (systems) {
      dynamicPages.push(...systems.map(sys => ({
        url: `${baseUrl}/systems/${sys.slug}`,
        lastModified: new Date(sys.updated_at),
        changeFrequency: 'monthly' as const,
        priority: 0.8
      })));
    }
  } catch (error) {
    console.error('Sitemap dynamic fetch failed:', error);
  }

  return [...staticPages, ...vehiclePages, ...resourcesList, ...guidesList, ...dynamicPages];
}
