import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { 
  ShoppingCart, ShieldCheck, Truck, RefreshCw, 
  ChevronRight, ArrowLeft, ArrowRight, Star, Info, FileText, Layout,
  Share2, Heart, Plus, Terminal
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";
import { cn } from "@/lib/utils";
import { AddToCartButton } from "@/components/store/AddToCartButton";
import { ProductCard } from "@/components/store/ProductCard";
import { ProductHistoryTracker } from "@/components/store/ProductHistoryTracker";
import { StickyProductBar } from "@/components/store/StickyProductBar";

import { Metadata } from "next";

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
  const { data: product } = await supabaseAdmin
    .from('products')
    .select('*, product_categories(name, slug)')
    .eq('slug', slug)
    .single();

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

  // 3. Fetch kits this product is part of
  const { data: partOfKits } = await supabaseAdmin
    .from('products')
    .select('*')
    .eq('subcategory', 'kits')
    .contains('related_product_ids', [product.id])
    .limit(2);

  const priceExVat = product.price_gbp / 1.2;

  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-48 pb-24 relative overflow-hidden">
        <div className="blueprint-grid absolute inset-0 opacity-10 pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          
          {/* Breadcrumbs */}
          <div className="flex items-center gap-4 font-mono text-[9px] text-brand-grey uppercase tracking-widest mb-12">
            <Link href="/store" className="hover:text-brand-orange transition-colors">Store</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href={`/store/${product.product_categories?.slug}`} className="hover:text-brand-orange transition-colors">{product.product_categories?.name}</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            {/* Gallery Panel */}
            <div className="lg:col-span-12 xl:col-span-7 space-y-6">
              <div className="aspect-[16/10] bg-brand-carbon blueprint-border relative overflow-hidden group">
                <div className="blueprint-grid absolute inset-0 opacity-10 pointer-events-none" />
                <Image 
                  src={product.images?.[0] || "/images/hero-background.png"} 
                  alt={product.name} 
                  fill 
                  className="object-contain p-12 transition-transform duration-700 group-hover:scale-105" 
                />
                
                {/* Product Meta Badge */}
                <div className="absolute top-8 left-8 flex flex-col gap-2">
                  <span className="px-4 py-1.5 bg-brand-orange text-white font-mono text-[9px] uppercase tracking-widest shadow-xl">
                    Official UK Registry Item
                  </span>
                  {product.badge && (
                    <span className="px-4 py-1.5 bg-brand-obsidian border border-brand-border text-brand-grey font-mono text-[9px] uppercase tracking-widest">
                      {product.badge}
                    </span>
                  )}
                </div>
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-4">
                 {(product.images as (string | null)[] || [null, null, null, null]).slice(0, 4).map((img: string | null, i: number) => (
                   <div key={i} className={cn(
                     "aspect-square bg-brand-carbon blueprint-border transition-all cursor-pointer group flex items-center justify-center p-4",
                     i === 0 ? "border-brand-orange" : "opacity-40 hover:opacity-100"
                   )}>
                      {img ? <img src={img} className="w-full h-full object-contain" /> : <div className="text-brand-grey/20 font-display text-4xl">{i+1}</div>}
                   </div>
                 ))}
              </div>
            </div>

            {/* Config Panel */}
            <div className="lg:col-span-12 xl:col-span-5 flex flex-col">
              <div className="mb-8 p-10 bg-brand-carbon blueprint-border relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 flex gap-4">
                  <button className="text-brand-grey hover:text-brand-orange"><Share2 size={16} /></button>
                  <button className="text-brand-grey hover:text-brand-orange"><Heart size={16} /></button>
                </div>

                <p className="font-mono text-xs text-brand-orange uppercase tracking-[0.3em] mb-4">{product.brand}</p>
                <h1 className="font-display text-4xl lg:text-5xl uppercase leading-[0.9] mb-8">{product.name}</h1>
                
                <div className="flex flex-col gap-2 mb-10">
                  <div className="flex items-baseline gap-4">
                    <span className="font-display text-5xl text-white">£{(product.price_gbp / 100).toLocaleString()}</span>
                    <span className="font-mono text-[10px] text-brand-grey uppercase">inc. VAT</span>
                  </div>
                  <div className="font-mono text-xs text-brand-grey uppercase tracking-widest">
                    £{(priceExVat / 100).toLocaleString()} <span className="text-[10px] opacity-60">ex. VAT</span>
                  </div>
                </div>

                <p className="font-sans text-brand-grey text-lg leading-relaxed mb-6">
                  {product.short_description || "High-performance component verified for professional building standards."}
                </p>

                {/* Job 8: System Badge */}
                {product.system_tier && (
                  <div className="mb-12 flex items-center gap-4 p-4 border border-brand-orange/30 bg-brand-orange/5">
                    <div className="w-8 h-8 rounded-full bg-brand-orange/20 flex items-center justify-center border border-brand-orange/40">
                      <ShieldCheck className="w-4 h-4 text-brand-orange" />
                    </div>
                    <div>
                      <span className="block font-mono text-[8px] text-brand-orange uppercase tracking-[0.2em] mb-0.5">Engineered Deployment</span>
                      <span className="block font-display text-xs uppercase tracking-widest text-white">Recommended for {product.system_tier.replace(/-/g, ' ')} architecture</span>
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-4">
                  <AddToCartButton product={{
                    id: product.id,
                    name: product.name,
                    brand: product.brand,
                    price_gbp: product.price_gbp,
                    image_url: product.images?.[0],
                    slug: product.slug,
                    is_affiliate: product.is_affiliate,
                  }} />
                  <Link href="/planner" className="w-full py-5 border border-brand-border text-brand-grey hover:text-white hover:bg-brand-orange/10 hover:border-brand-orange transition-all text-center font-display text-[10px] uppercase tracking-widest">
                    Add to Build Plan
                  </Link>
                </div>
              </div>

              {/* Technical Spec Summary (Blueprint Style) */}
              <div className="grid grid-cols-2 gap-px bg-brand-border">
                {product.spec_line && (
                   <div className="col-span-2 bg-brand-carbon p-6 flex items-center gap-4 border-b border-brand-border">
                      <Terminal className="text-brand-orange w-4 h-4" />
                      <span className="font-mono text-[10px] text-brand-grey uppercase tracking-widest uppercase">{product.spec_line}</span>
                   </div>
                )}
                {Object.entries(product.specs || {}).slice(0, 4).map(([key, value]) => (
                  <div key={key} className="bg-brand-carbon p-6">
                    <span className="block font-mono text-[8px] text-brand-grey uppercase tracking-[0.2em] mb-1">{key}</span>
                    <span className="block font-mono text-xs text-white uppercase">{String(value)}</span>
                  </div>
                ))}
                <div className="bg-brand-carbon p-6">
                  <span className="block font-mono text-[8px] text-brand-grey uppercase tracking-[0.2em] mb-1">Weight</span>
                  <span className="block font-mono text-xs text-white uppercase">{product.weight_grams ? (product.weight_grams / 1000).toFixed(1) + 'kg' : 'N/A'}</span>
                </div>
                <div className="bg-brand-carbon p-6">
                  <span className="block font-mono text-[8px] text-brand-grey uppercase tracking-[0.2em] mb-1">Status</span>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                    <span className="font-mono text-xs text-white uppercase">{product.stock_quantity > 0 ? 'Registry Stocked' : 'Pre-Order'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs / Documentation */}
      <section className="py-24 border-y border-brand-border bg-brand-carbon/50">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-8">
              <div className="flex gap-12 border-b border-brand-border mb-12 overflow-x-auto no-scrollbar">
                {["Overview", "Full Specifications", "Downloads"].map((tab, i) => (
                  <button key={tab} className={cn(
                    "font-display text-xs uppercase tracking-[0.2em] pb-6 relative transition-all",
                    i === 0 ? "text-white" : "text-brand-grey hover:text-white"
                  )}>
                    {tab}
                    {i === 0 && <div className="absolute bottom-0 left-0 w-full h-1 bg-brand-orange" />}
                  </button>
                ))}
              </div>
              
              <div className="prose prose-invert max-w-none text-brand-grey text-lg leading-relaxed">
                <p className="whitespace-pre-line">{product.full_description || "No detailed description provided for this component."}</p>
                
                <div className="my-16 blueprint-border p-12 bg-brand-obsidian/30 relative">
                  <div className="absolute top-0 right-0 p-6 opacity-10"><Terminal size={64} /></div>
                  <h3 className="font-display text-2xl uppercase mb-6 flex items-center gap-4 italic">
                    <Info className="text-brand-orange" /> Technical Integration Note
                  </h3>
                  <p className="italic text-base">
                    This {product.name} satisfies the safety requirements for RCD (Recreational Craft Directive) and BS EN standards. 
                    Calculated for deployment within {product.system_tier?.replace(/-/g, ' ')} architecture. 
                    Ensure all connections are torqued to manufacturer specifications.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-4 space-y-12">
               {/* Datasheet Download */}
               {product.datasheet_url && (
                 <div className="blueprint-border p-8 bg-brand-carbon">
                    <h4 className="font-display text-xs uppercase tracking-widest mb-6">Documentation Hub</h4>
                    <Link href={product.datasheet_url} className="flex items-center gap-6 group">
                       <div className="w-12 h-12 bg-brand-obsidian flex items-center justify-center border border-brand-border group-hover:border-brand-orange transition-colors">
                          <FileText className="text-brand-orange" />
                       </div>
                       <div>
                          <span className="block font-mono text-[10px] uppercase text-white group-hover:text-brand-orange transition-colors">Manufacturer Datasheet</span>
                          <span className="block font-sans text-[10px] text-brand-grey uppercase">PDF Document (1.2MB)</span>
                       </div>
                    </Link>
                 </div>
               )}

               {/* Part of Kit Promo */}
               {partOfKits && partOfKits.length > 0 && (
                 <div className="space-y-6">
                    <h4 className="font-display text-xs uppercase tracking-widest">Part of Curated Kits</h4>
                    {partOfKits.map(kit => (
                      <Link key={kit.id} href={`/store/product/${kit.slug}`} className="block border border-brand-border bg-brand-orange/5 p-6 hover:bg-brand-orange/10 transition-all group">
                         <span className="font-mono text-[9px] text-brand-orange uppercase block mb-2">Save up to 15%</span>
                         <span className="font-display text-sm uppercase block group-hover:text-brand-orange transition-colors mb-1">{kit.name}</span>
                         <span className="font-sans text-[10px] text-brand-grey uppercase">View Bundle Registry →</span>
                      </Link>
                    ))}
                 </div>
               )}

               {/* System Guide Bridge */}
               <div className="blueprint-border p-8 bg-brand-obsidian p-8 border-l-4 border-brand-orange">
                  <span className="font-mono text-[9px] text-brand-orange uppercase block mb-4">Educational Bridge</span>
                  <h4 className="font-display text-sm uppercase mb-4 leading-tight">Used in our {product.product_categories?.name} Guide</h4>
                  <p className="font-sans text-xs text-brand-grey mb-6">Learn how to correctly integrated this {product.brand} component into your build systems.</p>
                  <Link href={`/systems/${product.product_categories?.slug}`} className="font-mono text-[10px] uppercase text-white hover:text-brand-orange flex items-center gap-2">
                     Read Guide <ArrowRight size={12} />
                  </Link>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Suggested Gear */}
      {related && related.length > 0 && (
        <section className="py-32">
          <div className="container mx-auto px-6">
            <h2 className="font-display text-4xl uppercase mb-16">Compatible Equipment</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map(p => (
                <ProductCard 
                  key={p.id}
                  id={p.id}
                  name={p.name}
                  brand={p.brand}
                  price={p.price_gbp}
                  compareAtPrice={p.compare_at_price}
                  image={p.images?.[0]}
                  slug={p.slug}
                  specLine={p.spec_line}
                  badge={p.badge}
                  isAffiliate={p.is_affiliate}
                  systemTier={p.system_tier}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <ProductHistoryTracker product={{
        id: product.id,
        name: product.name,
        brand: product.brand,
        price_gbp: product.price_gbp,
        images: product.images,
        slug: product.slug,
        spec_line: product.spec_line,
        badge: product.badge,
        system_tier: product.system_tier
      }} />
      <StickyProductBar product={{
        id: product.id,
        name: product.name,
        brand: product.brand,
        price_gbp: product.price_gbp,
        image: product.images?.[0],
        slug: product.slug,
        is_affiliate: product.is_affiliate,
      }} />

      <Footer />
    </main>
  );
}
