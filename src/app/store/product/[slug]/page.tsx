import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { 
  ShoppingCart, ShieldCheck, Truck, RefreshCw, 
  ChevronRight, ArrowLeft, ArrowRight, Star, Info, FileText, Layout,
  Share2, Heart, Plus, Terminal, ExternalLink
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";
import { cn } from "@/lib/utils";
import { AddToCartButton } from "@/components/store/AddToCartButton";
import { ProductCard } from "@/components/store/ProductCard";
import { ProductHistoryTracker } from "@/components/store/ProductHistoryTracker";
import { StickyProductBar } from "@/components/store/StickyProductBar";
import { ProductTabs } from "@/components/store/ProductTabs";
import { ProductGallery } from "@/components/store/ProductGallery";
import { Metadata } from "next";
import { PRODUCTS, getProductBySlug } from "@/lib/data/productRegistry";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder_key'
);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const { data: product } = await supabaseAdmin
    .from('products')
    .select('name, brand, short_description, images')
    .eq('slug', slug)
    .single();

  if (!product) return { title: 'Product Not Found' };

  const title = `${product.brand} ${product.name} | Off-Grid Components | Amplios`;
  const description = product.short_description || `High-performance ${product.brand} component for off-grid power, heating, and water systems.`;
  const image = product.images?.[0] || 'https://amplios.co.uk/images/og-store.png';

  return {
    title,
    description,
    openGraph: { title, description, images: [{ url: image }], type: 'website', siteName: 'Amplios' },
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // 1. Fetch main product details
  let { data: product } = await supabaseAdmin
    .from('products')
    .select('*, product_categories(name, slug)')
    .eq('slug', slug)
    .single();

  // Fallback to local registry if DB fails or product not found
  if (!product) {
    const registryProduct = getProductBySlug(slug);
    if (registryProduct) {
      product = {
        ...registryProduct,
        price_gbp: registryProduct.price,
        image_url: registryProduct.image,
        product_categories: {
          name: registryProduct.category.replace(/-/g, ' '),
          slug: registryProduct.category
        }
      } as any;
    }
  }

  if (!product) {
    return (
      <main className="bg-brand-obsidian min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h1 className="font-display text-4xl mb-4 text-white">404: Hardware Node Not Found</h1>
        <Link href="/store" className="blueprint-border px-10 py-5 font-display text-[10px] uppercase tracking-widest hover:bg-brand-orange transition-all">
          Return to Hub
        </Link>
      </main>
    );
  }

  // 2. Fetch related products (explicitly related or by subcategory)
  let related: any[] = [];
  if (product.related_product_ids && product.related_product_ids.length > 0) {
    const { data: explicitRelated } = await supabaseAdmin
      .from('products')
      .select('*')
      .in('id', product.related_product_ids);
    related = explicitRelated || [];
  }

  if (related.length < 4) {
    const { data: categoryRelated } = await supabaseAdmin
      .from('products')
      .select('*')
      .eq('subcategory', product.subcategory)
      .neq('id', product.id)
      .limit(4 - related.length);
    if (categoryRelated) related = [...related, ...categoryRelated];
  }

  const primaryImage = product.images?.[0] || product.image_url || null;
  const allImages = (product.images as (string | null)[] || (product.image_url ? [product.image_url] : []));

  // 4. Price Logic
  const priceExVat = Math.round(product.price_gbp / 1.2);

  return (
    <main className="bg-brand-obsidian min-h-screen pb-24">
      <Navbar />
      
      {/* 2px Orange Border Threshold */}
      <div className="w-full h-[2px] bg-brand-orange" />

      {/* Hero Section */}
      <section className="pt-24 pb-16 relative">
        <div className="container mx-auto px-6 relative z-10">
          
          {/* Breadcrumbs */}
          <div className="flex items-center gap-4 font-mono text-[9px] text-brand-grey uppercase tracking-widest mb-12">
            <Link href="/store" className="hover:text-brand-orange transition-colors">Store</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href={`/store/${product.product_categories?.slug}`} className="hover:text-brand-orange transition-colors">{product.product_categories?.name}</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-brand-white">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <ProductGallery 
              name={product.name} 
              brand={product.brand} 
              images={allImages} 
              badge={product.badge}
            />

            {/* Config Panel */}
            <div className="lg:col-span-12 xl:col-span-5 flex flex-col">
              <div className="mb-8 p-10 bg-white border border-brand-border rounded-xl shadow-sm relative">
                <div className="absolute top-0 right-0 p-6 flex gap-4">
                  <button className="text-brand-grey hover:text-brand-orange"><Share2 size={16} /></button>
                  <button className="text-brand-grey hover:text-brand-orange"><Heart size={16} /></button>
                </div>

                <p className="font-mono text-xs text-brand-orange uppercase tracking-[0.3em] mb-4">{product.brand}</p>
                <h1 className="font-display text-4xl lg:text-5xl uppercase leading-[1.1] mb-8 text-brand-white">{product.name}</h1>
                
                <div className="flex flex-col gap-2 mb-10">
                  <div className="flex items-baseline gap-3">
                    <span className="font-display font-bold text-5xl text-brand-white">£{(product.price_gbp / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    <span className="font-mono text-[10px] text-brand-grey uppercase tracking-widest">inc. VAT</span>
                  </div>
                  <div className="font-mono text-xs text-brand-grey uppercase tracking-widest flex items-center gap-2">
                    <span>£{(priceExVat / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    <span className="text-[10px] opacity-60">ex. VAT</span>
                  </div>
                </div>

                <p className="font-sans text-brand-grey text-lg leading-relaxed mb-6">
                  {product.short_description || "High-performance component verified for professional building standards."}
                </p>

                {/* System Badge */}
                {product.system_tier && (
                  <div className="mb-10 flex items-center gap-4 p-4 border border-[#E5E5E5] bg-[#F8F8F6] rounded-md">
                    <div className="w-8 h-8 rounded-full bg-brand-orange/10 flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4 text-brand-orange" />
                    </div>
                    <div>
                      <span className="block font-mono text-[8px] text-brand-grey uppercase tracking-[0.2em] mb-0.5">Engineered Deployment</span>
                      <span className="block font-display text-xs uppercase tracking-widest text-brand-white">Recommended for {product.system_tier.replace(/-/g, ' ')} architecture</span>
                    </div>
                  </div>
                )}

                {/* Victron Guide Link */}
                {product.brand?.toLowerCase().includes('victron') && (
                  <div className="mb-8 flex items-center justify-between p-4 border border-brand-orange/20 bg-brand-orange/5 rounded-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-brand-orange/10 flex items-center justify-center">
                        <FileText className="w-4 h-4 text-brand-orange" />
                      </div>
                      <span className="font-sans text-[12px] text-brand-grey font-medium leading-tight">
                        Need help with your Victron system?
                      </span>
                    </div>
                    <Link 
                      href="/brands/victron-energy" 
                      className="text-brand-orange font-mono text-[9px] uppercase tracking-widest hover:underline whitespace-nowrap"
                    >
                      Read the guide →
                    </Link>
                  </div>
                )}

                <div className="flex flex-col gap-4">
                  <AddToCartButton product={{
                    id: product.id,
                    name: product.name,
                    brand: product.brand,
                    price_gbp: product.price_gbp,
                    image_url: product.images?.[0] || product.image_url,
                    slug: product.slug,
                    is_affiliate: product.is_affiliate,
                  }} />
                  <Link href="/planner" className="w-full py-4 border border-brand-border text-brand-white hover:text-brand-orange hover:bg-[#F8F8F6] transition-all text-center font-display text-[10px] uppercase tracking-widest rounded-sm font-bold">
                    Add to Build Plan
                  </Link>
                </div>
              </div>

              {/* Technical Spec Summary */}
              <div className="grid grid-cols-2 gap-px bg-brand-border rounded-xl overflow-hidden border border-brand-border">
                {product.spec_line && (
                   <div className="col-span-2 bg-[#F8F8F6] p-6 flex items-center gap-4 border-b border-brand-border">
                      <Terminal className="text-brand-orange w-4 h-4" />
                      <span className="font-mono text-[10px] text-brand-grey uppercase tracking-widest">{product.spec_line}</span>
                   </div>
                )}
                {Object.entries(product.specs || {}).slice(0, 4).map(([key, value]) => (
                  <div key={key} className="bg-white p-6">
                    <span className="block font-mono text-[8px] text-brand-grey uppercase tracking-[0.2em] mb-1">{key}</span>
                    <span className="block font-sans text-sm text-brand-white">{String(value)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detail Tabs */}
      <section className="border-t border-brand-border bg-white pt-12">
        <ProductTabs product={product} related={related} fallbackImage={primaryImage || '/images/hero-background.png'} />
      </section>

      {/* Compatible Systems Block */}
      {related.length > 0 && (
        <section className="py-24 bg-[#F8F8F6] border-y border-brand-border mt-12">
          <div className="container mx-auto px-6">
            <div className="mb-12">
              <h2 className="font-display text-3xl uppercase tracking-tighter text-brand-white mb-2">Compatible Architecture</h2>
              <p className="font-sans text-brand-grey">Verified nodes for seamless integration.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map(rel => (
                <ProductCard 
                  key={rel.id}
                  id={rel.id}
                  name={rel.name}
                  brand={rel.brand}
                  price={rel.price_gbp}
                  image={rel.images?.[0] || rel.image_url}
                  slug={rel.slug}
                  specLine={rel.spec_line}
                  isAffiliate={rel.is_affiliate}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sticky Action Bar */}
      <StickyProductBar product={product} />

      <Footer />
    </main>
  );
}
