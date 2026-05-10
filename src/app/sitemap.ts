import { MetadataRoute } from 'next';
import { vehicleData } from '@/lib/data/vehicles';
import { createClient } from '@supabase/supabase-js';
import { PRODUCTS } from '@/lib/data/productRegistry';
import { WIRING_DIAGRAMS } from '@/lib/data/wiringDiagrams';
import { VEHICLE_KITS } from '@/lib/data/vehicleKits';
import fs from 'fs';
import path from 'path';

const baseUrl = 'https://amplios.co.uk';

// Recursive helper to find all static routes in src/app
function getStaticRoutes(dir: string, base: string = ''): string[] {
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir);
  let routes: string[] = [];

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // Skip dynamic routes, internal folders, and API routes
      if (file.startsWith('[') || file === 'api' || file === 'components') continue;
      
      // Handle Route Groups (e.g., (marketing)) - don't add to the URL path
      const nextBase = file.startsWith('(') && file.endsWith(')') ? base : path.join(base, file);
      routes = routes.concat(getStaticRoutes(fullPath, nextBase));
    } else if (file === 'page.tsx' || file === 'page.js') {
      const route = base.replace(/\\/g, '/') || '/';
      routes.push(route.startsWith('/') ? route : `/${route}`);
    }
  }
  return routes;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
    process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder_key'
  );

  // 1. Automatically discover all static routes (Home, About, Tools, static Guides, etc.)
  const appDir = path.join(process.cwd(), 'src/app');
  const discoveredRoutes = getStaticRoutes(appDir);
  
  // Filter out routes that shouldn't be indexed
  const excludedRoutes = ['/cart', '/account', '/checkout', '/login', '/register', '/admin'];
  const staticPages = discoveredRoutes
    .filter(route => !excludedRoutes.includes(route))
    .map(route => ({
      url: `${baseUrl}${route === '/' ? '' : route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: route === '/' ? 1 : 0.8,
    }));

  // 2. Vehicle Profiles (8 Chassis * 3 sub-pages)
  const vehiclePages = Object.keys(vehicleData).flatMap((slug) => [
    { url: `${baseUrl}/vehicles/${slug}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/vehicles/${slug}/buying-guide`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${baseUrl}/vehicles/${slug}/listings`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
  ]);

  // 3. Vehicle Kits
  const kitPages = Object.keys(VEHICLE_KITS).map((slug) => ({
    url: `${baseUrl}/kits/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // 4. Local Product Registry (112 products)
  const localProductPages = Object.keys(PRODUCTS).map((slug) => ({
    url: `${baseUrl}/store/product/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }));

  // 5. Local Wiring Diagrams (98 diagrams)
  const localWiringPages = Object.keys(WIRING_DIAGRAMS).map((slug) => ({
    url: `${baseUrl}/guides/wiring-diagrams/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // 6. Dynamic Content from Supabase (Products, Showcase, Suppliers, Systems, Blog)
  let dynamicPages: MetadataRoute.Sitemap = [];

  try {
    const tables = [
      { name: 'products', prefix: '/store/product', priority: 0.9, freq: 'daily' as const },
      { name: 'showcase_builds', prefix: '/showcase', priority: 0.7, freq: 'weekly' as const },
      { name: 'suppliers', prefix: '/suppliers', priority: 0.6, freq: 'monthly' as const },
      { name: 'build_systems', prefix: '/systems', priority: 0.8, freq: 'monthly' as const },
      { name: 'blog_posts', prefix: '/blog', priority: 0.8, freq: 'weekly' as const },
      { name: 'authors', prefix: '/authors', priority: 0.5, freq: 'monthly' as const }
    ];

    for (const table of tables) {
      const { data } = await supabaseAdmin.from(table.name).select('slug, updated_at');
      if (data) {
        data.forEach(item => {
          if (item.slug) {
            dynamicPages.push({
              url: `${baseUrl}${table.prefix}/${item.slug}`,
              lastModified: item.updated_at ? new Date(item.updated_at) : new Date(),
              changeFrequency: table.freq,
              priority: table.priority
            });
          }
        });
      }
    }
  } catch (error) {
    console.error('Sitemap dynamic fetch failed:', error);
  }

  // Combine and de-duplicate by URL
  const allPages = [
    ...staticPages, 
    ...vehiclePages, 
    ...kitPages, 
    ...localProductPages, 
    ...localWiringPages, 
    ...dynamicPages
  ];

  const uniquePages = Array.from(new Map(allPages.map(p => [p.url, p])).values());

  return uniquePages;
}
