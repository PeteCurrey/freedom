import { StoreHero } from "@/components/store/StoreHero";
import { EditorsPick } from "@/components/store/EditorsPick";
import { CategoryGrid } from "@/components/store/CategoryGrid";
import { FeaturedProducts } from "@/components/store/FeaturedProducts";
import { KitsBand } from "@/components/store/KitsBand";
import { BrandShowcase } from "@/components/store/BrandShowcase";
import { LifestyleBand } from "@/components/store/LifestyleBand";
import { EditorialBridge } from "@/components/store/EditorialBridge";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CATEGORIES, PRODUCTS } from "@/lib/data/productRegistry";
import { supabaseAdmin } from "@/lib/supabase-admin";

// Define fallback config locally to ensure rendering even if DB fails
const FALLBACK_CONFIG: Record<string, string> = {
  'store_hero_image': '/images/hero-background.png',
  'category_image_electrical-core': '/images/electrical-technical.png',
  'category_image_solar-roof': '/images/systems-showcase.png',
  'category_image_heating-climate': '/images/heating-system-technical.png',
  'category_image_water-plumbing': '/images/water-plumbing-technical.png',
  'category_image_gas-cooking': '/images/gas-lpg-technical.png',
  'category_image_toilets-washroom': '/images/interior-showcase.png',
  'category_image_windows-bodywork': '/images/insulation-technical.png',
  'category_image_insulation-interior': '/images/interior-showcase.png',
  'category_image_safety-security': '/images/systems-showcase.png',
  'category_image_outdoor-living': '/images/exterior-equipment-technical.png',
  'category_image_connectivity-power': '/images/electrical-technical.png',
  'category_image_complete-kits': '/images/community-showcase.png',
  'lifestyle_image_1': '/images/electrical-technical.png',
  'lifestyle_image_2': '/images/exterior-equipment-technical.png',
  'lifestyle_image_3': '/images/interior-showcase.png',
  'lifestyle_image_4': '/images/hero-background.png'
};

export default async function StoreHub() {
  // Fetch store config
  let configMap: Record<string, string> = { ...FALLBACK_CONFIG };
  try {
    // Attempt to fetch from DB if available
    const { data: configData } = await supabaseAdmin.from('store_config').select('key, value');
    if (configData) {
      configData.forEach((item: any) => {
        configMap[item.key] = item.value;
      });
    }
  } catch (error) {
    console.error("Failed to fetch store_config, using fallbacks.", error);
  }

  // Fetch Editor's Pick
  let editorPickProduct = PRODUCTS[0];
  try {
    const { data: featured } = await supabaseAdmin
      .from('products')
      .select('*')
      .eq('is_editor_pick', true)
      .limit(1)
      .single();
    if (featured) editorPickProduct = featured;
  } catch (e) {
    // fallback to registry
    editorPickProduct = PRODUCTS.find(p => p.id === 'elec-multi-3k') || PRODUCTS[0];
  }

  // Fetch Popular Products
  let popularProducts = PRODUCTS.slice(0, 8);
  try {
    const { data: popular } = await supabaseAdmin
      .from('products')
      .select('*')
      .eq('is_featured', true)
      .limit(8);
    if (popular && popular.length > 0) popularProducts = popular;
  } catch (e) {
    // fallback to registry
    popularProducts = PRODUCTS.slice(0, 8);
  }

  // Map category images from config
  const mappedCategories = CATEGORIES.map(cat => ({
    ...cat,
    image: configMap[`category_image_${cat.id}`] || FALLBACK_CONFIG[`category_image_${cat.id}`] || '/images/hero-background.png',
    slug: cat.id
  }));

  const lifestyleImages = [
    configMap['lifestyle_image_1'],
    configMap['lifestyle_image_2'],
    configMap['lifestyle_image_3'],
    configMap['lifestyle_image_4'],
  ].filter(Boolean) as string[];

  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />
      
      {/* 2px Orange Border Threshold */}
      <div className="w-full h-[2px] bg-brand-orange" />

      <StoreHero image={configMap['store_hero_image']} />
      <EditorsPick product={editorPickProduct as any} />
      <CategoryGrid categories={mappedCategories} />
      <FeaturedProducts products={popularProducts as any} />
      <KitsBand />
      <BrandShowcase />
      <LifestyleBand images={lifestyleImages} />
      <EditorialBridge />
      
      <Footer />
    </main>
  );
}
