import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { 
  ShoppingCart, ShieldCheck, Truck, RefreshCw, 
  ChevronRight, ArrowLeft, Star, Info
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";
import { cn } from "@/lib/utils";
import { AddToCartButton } from "@/components/store/AddToCartButton";
import StickyProductBar from "@/components/store/StickyProductBar";

import { Metadata } from "next";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder_key'
);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const { data: product } = await supabaseAdmin
    .from('products')
    .select('name, brand, short_description, image_url')
    .eq('slug', slug)
    .single();

  if (!product) {
    return { title: 'Product Not Found' };
  }

  return {
    title: `${product.brand} ${product.name}`,
    description: product.short_description || `Purchase the ${product.brand} ${product.name} component for your DIY Motorhome build.`,
    openGraph: {
      title: `${product.brand} ${product.name} | Amplios`,
      description: product.short_description,
      images: product.image_url ? [product.image_url] : [],
    },
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const { data: product } = await supabaseAdmin
    .from('products')
    .select('*, product_categories(name, slug)')
    .eq('slug', slug)
    .single();

  if (!product) {
    return (
      <main className="bg-brand-obsidian min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h1 className="font-display text-4xl mb-4">Product Not Found</h1>
        <p className="font-mono text-brand-grey text-[10px] uppercase tracking-widest mb-12">The item may have been moved or discontinued.</p>
        <Link href="/store" className="blueprint-border px-10 py-5 font-display text-[10px] uppercase tracking-widest hover:bg-brand-orange transition-all">
          Return to Store
        </Link>
      </main>
    );
  }

  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      <section className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-4 font-mono text-[9px] text-brand-grey uppercase tracking-widest mb-12">
            <Link href="/store" className="hover:text-brand-white transition-colors">Store</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href={`/store/${product.product_categories?.slug}`} className="hover:text-brand-white transition-colors">{product.product_categories?.name}</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-brand-orange">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Product Image Panel */}
            <div className="lg:col-span-7 space-y-6">
              <div className="aspect-square bg-brand-carbon blueprint-border relative overflow-hidden group">
                <div className="blueprint-grid absolute inset-0 opacity-10 pointer-events-none" />
                {product.image_url ? (
                  <Image src={product.image_url} alt={product.name} fill className="object-contain p-12 transition-transform duration-700 group-hover:scale-105" />
                ) : (
                   <div className="absolute inset-0 flex items-center justify-center text-brand-orange/10">
                      <ShoppingCart className="w-32 h-32" />
                   </div>
                )}
                <div className="absolute top-8 left-8">
                   <span className="px-4 py-2 bg-brand-obsidian border border-brand-orange text-brand-orange font-mono text-[10px] uppercase tracking-widest">
                      {product.brand} Official
                   </span>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-6">
                 {[1,2,3].map(i => (
                   <div key={i} className="aspect-square bg-brand-carbon blueprint-border opacity-30 hover:opacity-100 transition-opacity cursor-pointer flex items-center justify-center">
                      <ShoppingCart className="w-6 h-6 text-brand-grey" />
                   </div>
                 ))}
              </div>
            </div>

            {/* Product Meta Panel */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="mb-8">
                <p className="font-mono text-xs text-brand-orange uppercase tracking-[0.3em] mb-4">{product.brand}</p>
                <h1 className="font-display text-4xl lg:text-6xl uppercase leading-none mb-6">{product.name}</h1>
                <div className="flex items-center gap-6 mb-8">
                   <div className="font-display text-4xl text-brand-white">£{(product.price_gbp / 100).toLocaleString()}</div>
                   <div className="px-3 py-1 border border-green-500/50 text-green-500 font-mono text-[9px] uppercase tracking-widest bg-green-500/5">In Stock</div>
                </div>
                <p className="font-sans text-brand-grey text-lg leading-relaxed mb-12">
                  {product.short_description}
                </p>
              </div>

              {/* Specs Quick Grid */}
              <div className="grid grid-cols-2 gap-px bg-brand-border/30 border border-brand-border/30 mb-12">
                 {Object.entries(product.specs || {}).map(([key, value]) => (
                   <div key={key} className="bg-brand-carbon p-6">
                      <span className="block font-mono text-[8px] text-brand-grey uppercase tracking-widest mb-1">{key}</span>
                      <span className="block font-mono text-xs text-brand-white uppercase">{String(value)}</span>
                   </div>
                 ))}
                 <div className="bg-brand-carbon p-6">
                    <span className="block font-mono text-[8px] text-brand-grey uppercase tracking-widest mb-1">Weight</span>
                    <span className="block font-mono text-xs text-brand-white uppercase">{product.weight_kg} kg</span>
                 </div>
              </div>

              <div className="space-y-4 mb-12">
                <AddToCartButton product={{
                  id: product.id,
                  name: product.name,
                  brand: product.brand,
                  price_gbp: product.price_gbp,
                  image_url: product.image_url,
                  slug: product.slug,
                }} />
                <Link href="/planner" className="w-full py-6 border border-brand-border text-brand-grey hover:text-white hover:border-brand-orange text-center block font-display text-[10px] uppercase tracking-widest transition-all">
                   Test Compatibility in Planner
                </Link>
              </div>

              <div className="mt-auto space-y-6 pt-12 border-t border-brand-border/30">
                 <div className="flex items-start gap-4">
                    <Truck className="w-5 h-5 text-brand-orange shrink-0" />
                    <div>
                      <p className="font-mono text-[10px] uppercase text-brand-white">Next Day Engineering-Grade Delivery</p>
                      <p className="font-sans text-[10px] text-brand-grey uppercase">Free for orders over £250</p>
                    </div>
                 </div>
                 <div className="flex items-start gap-4">
                    <ShieldCheck className="w-5 h-5 text-brand-orange shrink-0" />
                    <div>
                      <p className="font-mono text-[10px] uppercase text-brand-white">5-Year Manufacturer Warranty</p>
                      <p className="font-sans text-[10px] text-brand-grey uppercase">Official UK Trade Partner</p>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full Description & Tech Notes */}
      <section className="py-32 bg-brand-carbon border-y border-brand-border/30">
         <div className="container mx-auto px-6">
            <div className="max-w-4xl">
               <h2 className="font-display text-xs uppercase text-brand-grey tracking-[0.4em] mb-12 italic">// Technical Documentation</h2>
               <div className="prose prose-invert max-w-none font-sans text-brand-grey text-lg leading-relaxed space-y-8">
                  <p>{product.full_description || "Detailed technical documentation for this component is sourced directly from manufacturer specifications."}</p>
                  
                  <div className="blueprint-border p-12 bg-brand-obsidian/50 border-l-4 border-brand-orange my-16">
                     <div className="flex items-center gap-4 mb-6">
                        <Info className="w-6 h-6 text-brand-orange" />
                        <h3 className="font-display text-2xl uppercase italic">ENGINEER&apos;S NOTE</h3>
                     </div>
                     <p className="italic">
                        This {product.name} satisfies the safety requirements for RCD (Recreational Craft Directive) and BS EN standards. 
                        Ensure all cables are sized for a maximum 3% voltage drop across the run.
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      <StickyProductBar product={{
        id: product.id,
        name: product.name,
        brand: product.brand,
        price_gbp: product.price_gbp,
        image_url: product.image_url,
        slug: product.slug,
      }} />

      <Footer />
    </main>
  );
}
