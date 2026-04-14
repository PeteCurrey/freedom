import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { 
  ShoppingBag, ShieldCheck, Truck, RotateCcw, 
  ChevronRight, Info, Wrench, Download, Share2, Heart
} from "lucide-react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { cn } from "@/lib/utils";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder_key'
);

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  // 1. Fetch product details
  const { data: product } = await supabaseAdmin
    .from('products')
    .select('*, product_categories(name, slug)')
    .eq('slug', slug)
    .single();

  if (!product) {
    return (
      <main className="bg-brand-obsidian min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h1 className="font-display text-4xl mb-4">Product Not Found</h1>
        <Link href="/store" className="font-mono text-xs uppercase tracking-widest text-brand-orange">Return to Store Hub</Link>
      </main>
    );
  }

  return (
    <main className="bg-brand-obsidian min-h-screen">
       <Navbar />
       
       <section className="pt-48 pb-32">
          <div className="container mx-auto px-6">
             
             {/* Breadcrumbs */}
             <div className="flex items-center gap-4 font-mono text-[10px] text-brand-grey uppercase mb-12 tracking-[0.3em]">
                <Link href="/store" className="hover:text-brand-orange transition-colors">Store</Link>
                <ChevronRight className="w-3 h-3" />
                <Link href={`/store/${product.product_categories?.slug}`} className="hover:text-brand-orange transition-colors">
                   {product.product_categories?.name}
                </Link>
                <ChevronRight className="w-3 h-3" />
                <span className="text-brand-orange">{product.name}</span>
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24">
                
                {/* Left: Gallery (Placeholder) */}
                <div className="space-y-6">
                   <div className="aspect-square bg-brand-carbon blueprint-border relative overflow-hidden group">
                      <div className="absolute inset-0 flex items-center justify-center text-brand-orange/5">
                         <ShoppingBag className="w-48 h-48" />
                      </div>
                      {/* Interaction HUD */}
                      <div className="absolute top-6 left-6 font-mono text-[10px] space-y-2">
                         <div className="bg-brand-obsidian/80 border border-brand-border px-3 py-1 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-white">IN STOCK</span>
                         </div>
                      </div>
                      <div className="absolute bottom-6 right-6 flex gap-4">
                         <button className="w-10 h-10 bg-brand-obsidian border border-brand-border flex items-center justify-center hover:border-brand-orange transition-all">
                            <Share2 className="w-4 h-4 text-brand-grey" />
                         </button>
                         <button className="w-10 h-10 bg-brand-obsidian border border-brand-border flex items-center justify-center hover:border-brand-orange transition-all">
                            <Heart className="w-4 h-4 text-brand-grey" />
                         </button>
                      </div>
                   </div>
                   
                   <div className="grid grid-cols-4 gap-4">
                      {[1,2,3,4].map(i => (
                        <div key={i} className="aspect-square bg-brand-carbon blueprint-border opacity-50 hover:opacity-100 transition-opacity cursor-pointer" />
                      ))}
                   </div>
                </div>

                {/* Right: Info */}
                <div className="flex flex-col">
                   <div className="mb-12">
                      <div className="font-mono text-xs text-brand-orange uppercase tracking-widest mb-4 flex items-center gap-3">
                         <span className="bg-brand-orange/10 px-3 py-1 border border-brand-orange/30">{product.brand}</span>
                         <span className="text-brand-grey opacity-50">// SKU: {product.sku}</span>
                      </div>
                      <h1 className="font-display text-5xl lg:text-7xl uppercase mb-6 leading-none shadow-brand-orange/5">
                         {product.name}
                      </h1>
                      <div className="font-display text-6xl text-brand-white mb-8 tracking-tighter">
                         £{(product.price_gbp / 100).toLocaleString()}
                      </div>
                      <p className="font-sans text-brand-grey text-lg leading-relaxed mb-12">
                         {product.description}
                      </p>
                   </div>

                   {/* Quick Specs HUD */}
                   <div className="grid grid-cols-2 gap-px bg-brand-border/30 border border-brand-border/30 mb-12">
                       <div className="bg-brand-carbon p-6">
                          <span className="block font-mono text-[8px] text-brand-grey uppercase tracking-widest mb-2">Category</span>
                          <span className="block font-display text-sm uppercase">{product.product_categories?.name}</span>
                       </div>
                       <div className="bg-brand-carbon p-6">
                          <span className="block font-mono text-[8px] text-brand-grey uppercase tracking-widest mb-2">Build Type</span>
                          <span className="block font-display text-sm uppercase">Technical Core</span>
                       </div>
                       <div className="bg-brand-carbon p-6">
                          <span className="block font-mono text-[8px] text-brand-grey uppercase tracking-widest mb-2">Compatibility</span>
                          <span className="block font-display text-sm uppercase">Blueprint Verified</span>
                       </div>
                       <div className="bg-brand-carbon p-6">
                          <span className="block font-mono text-[8px] text-brand-grey uppercase tracking-widest mb-2">Integration</span>
                          <span className="block font-display text-sm uppercase">Plug & Play</span>
                       </div>
                   </div>

                   {/* CTA Row */}
                   <div className="flex flex-col sm:flex-row gap-6 mb-16">
                      <button className="flex-1 bg-brand-orange text-white py-6 font-display text-sm uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all flex items-center justify-center gap-3 group">
                         <ShoppingBag className="w-5 h-5" />
                         Add to Build Cart
                         <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                      <Link href="/planner" className="flex-1 blueprint-border py-6 font-display text-sm uppercase tracking-widest hover:bg-brand-orange transition-all flex items-center justify-center gap-3">
                         <Wrench className="w-5 h-5" />
                         Open Planner
                      </Link>
                   </div>

                   {/* Trust HUD */}
                   <div className="space-y-6 pt-8 border-t border-brand-border/30">
                      <div className="flex items-center gap-4">
                         <ShieldCheck className="w-5 h-5 text-brand-orange" />
                         <div>
                            <span className="block font-display text-[10px] uppercase tracking-widest">5 Year Warranty</span>
                            <span className="block font-sans text-xs text-brand-grey">Direct manufacturer support.</span>
                         </div>
                      </div>
                      <div className="flex items-center gap-4">
                         <Truck className="w-5 h-5 text-brand-orange" />
                         <div>
                            <span className="block font-display text-[10px] uppercase tracking-widest">Global Shipping</span>
                            <span className="block font-sans text-xs text-brand-grey">Courier tracked delivery to your workshop.</span>
                         </div>
                      </div>
                      <div className="flex items-center gap-4">
                         <Download className="w-5 h-5 text-brand-orange" />
                         <div>
                            <span className="block font-display text-[10px] uppercase tracking-widest">Technical Data</span>
                            <span className="block font-sans text-xs text-brand-grey hover:text-brand-orange cursor-pointer transition-colors">Download Wiring Schematics (.PDF)</span>
                         </div>
                      </div>
                   </div>

                </div>

             </div>
          </div>
       </section>

       {/* Technical Deep Dive Section (Features) */}
       <section className="py-32 bg-brand-carbon relative">
          <div className="container mx-auto px-6">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
                <div>
                   <h2 className="font-display text-4xl uppercase mb-12">Technical Specifications</h2>
                   <div className="space-y-4">
                      {[
                        { label: 'Brand', value: product.brand },
                        { label: 'SKU Identifier', value: product.sku },
                        { label: 'System Class', value: 'Phase 2 Industrial' },
                        { label: 'Installation Level', value: 'Intermediate' },
                        { label: 'Blueprint Active', value: 'Yes' },
                        { label: 'Unit Weight', value: '3.4kg' }
                      ].map((spec, i) => (
                        <div key={i} className="flex justify-between py-4 border-b border-brand-border/30 font-mono text-xs">
                           <span className="text-brand-grey uppercase tracking-widest">{spec.label}</span>
                           <span className="text-white uppercase">{spec.value}</span>
                        </div>
                      ))}
                   </div>
                </div>
                <div>
                   <h2 className="font-display text-4xl uppercase mb-12">Key Design Features</h2>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      {[
                        'Low Voltage Protection',
                        'High Efficiency Logic',
                        'Dust & Moisture Rated',
                        'Vibration Resistant',
                        'Modular Expandability',
                        'Cloud Sync Compatible'
                      ].map((feature, i) => (
                        <div key={i} className="flex items-start gap-4">
                           <div className="w-5 h-5 rounded-full bg-brand-orange/20 flex items-center justify-center shrink-0 mt-0.5">
                              <Info className="w-3 h-3 text-brand-orange" />
                           </div>
                           <span className="font-sans text-sm text-brand-grey uppercase tracking-wider">{feature}</span>
                        </div>
                      ))}
                   </div>
                </div>
             </div>
          </div>
       </section>

       <Footer />
    </main>
  );
}
