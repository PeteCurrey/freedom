import { supabase } from "@/lib/supabase";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/store/ProductCard";
import { 
  Globe, Download, ExternalLink, ShieldCheck, 
  ChevronRight, ArrowRight, Package, FileText, 
  Image as ImageIcon 
} from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

interface BrandPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: BrandPageProps): Promise<Metadata> {
  const { data: brand } = await supabase
    .from('brands')
    .select('name, seo_title, seo_description')
    .eq('slug', params.slug)
    .single();

  return {
    title: brand?.seo_title || `${brand?.name} | Professional Off-Grid Hardware | Amplios`,
    description: brand?.seo_description || `Official UK stockist for ${brand?.name}. Professional-grade components for serious van builds and off-grid living.`,
  };
}

export default async function BrandPage({ params }: BrandPageProps) {
  const { slug } = params;

  // 1. Fetch Brand Data
  const { data: brand } = await supabase
    .from('brands')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!brand) return <div>Brand not found</div>;

  // 2. Fetch Brand Products
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('brand', brand.name)
    .eq('is_active', true)
    .limit(12);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] lg:h-[70vh] flex items-center overflow-hidden bg-brand-obsidian">
        {brand.hero_image && (
          <div className="absolute inset-0 z-0">
            <img 
              src={brand.hero_image} 
              alt={brand.name} 
              className="w-full h-full object-cover opacity-40 grayscale" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian via-brand-obsidian/40 to-transparent" />
          </div>
        )}
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-6">
              <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em]">
                // CERTIFIED BRAND PARTNER
              </span>
              <div className="h-[1px] w-12 bg-brand-orange/30" />
            </div>
            
            <div className="flex items-center gap-8 mb-8">
               <div className="w-24 h-24 bg-white rounded-xl p-4 flex items-center justify-center shadow-2xl">
                 {brand.logo ? <img src={brand.logo} alt={brand.name} className="w-full h-full object-contain" /> : <span className="text-4xl font-display text-brand-obsidian">{brand.name[0]}</span>}
               </div>
               <h1 className="font-display text-5xl lg:text-7xl uppercase tracking-tighter text-white leading-none">
                 {brand.name}
               </h1>
            </div>

            <p className="font-sans text-xl text-brand-grey max-w-2xl leading-relaxed mb-10">
              Professional-grade engineering for the world's most capable off-grid builds. 
              {brand.country && ` Engineered in ${brand.country}.`}
            </p>

            <div className="flex flex-wrap gap-4">
               <Link href="#products" className="bg-brand-orange text-white px-10 py-5 font-display text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all font-bold">
                 Browse Hardware
               </Link>
               {brand.website && (
                 <a href={brand.website} target="_blank" className="bg-transparent border border-white/20 text-white px-10 py-5 font-display text-[10px] uppercase tracking-widest hover:bg-white/5 transition-all font-bold flex items-center gap-2">
                   Brand Website <ExternalLink size={14} />
                 </a>
               )}
            </div>
          </div>
        </div>
      </section>

      {/* Editorial & Products */}
      <section className="py-24 bg-white" id="products">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Sidebar: Metadata & Downloads */}
            <aside className="lg:col-span-4 space-y-12 order-2 lg:order-1">
              {/* Brand Bio */}
              <div className="space-y-6">
                 <div className="flex items-center gap-2">
                   <ShieldCheck className="text-brand-orange w-5 h-5" />
                   <h3 className="font-display text-lg uppercase tracking-tight">The Ecosystem</h3>
                 </div>
                 <div className="prose prose-sm font-sans text-brand-grey leading-relaxed">
                   {brand.description || `Explore the technical range from ${brand.name}, specifically selected by Amplios for their reliability, efficiency, and engineering excellence in off-grid environments.`}
                 </div>
              </div>

              {/* Technical Downloads */}
              {brand.downloads && brand.downloads.length > 0 && (
                <div className="space-y-6 pt-12 border-t border-slate-100">
                   <div className="flex items-center gap-2">
                     <Download className="text-brand-orange w-5 h-5" />
                     <h3 className="font-display text-lg uppercase tracking-tight">Technical Downloads</h3>
                   </div>
                   <div className="space-y-3">
                     {brand.downloads.map((item: any, idx: number) => (
                       <a 
                         key={idx} 
                         href={item.url} 
                         className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 hover:border-brand-orange transition-all group rounded-lg"
                       >
                         <div className="flex flex-col">
                           <span className="font-bold text-xs uppercase tracking-tight">{item.name}</span>
                           <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">{item.type || 'PDF DOCUMENT'}</span>
                         </div>
                         <Download size={14} className="text-slate-300 group-hover:text-brand-orange transition-colors" />
                       </a>
                     ))}
                   </div>
                </div>
              )}

              {/* External Links */}
              {brand.links && brand.links.length > 0 && (
                <div className="space-y-6 pt-12 border-t border-slate-100">
                   <div className="flex items-center gap-2">
                     <Globe className="text-brand-orange w-5 h-5" />
                     <h3 className="font-display text-lg uppercase tracking-tight">Support & Documentation</h3>
                   </div>
                   <div className="space-y-2">
                     {brand.links.map((link: any, idx: number) => (
                       <a 
                         key={idx} 
                         href={link.url} 
                         className="flex items-center gap-3 text-brand-grey hover:text-brand-orange transition-colors py-2 border-b border-slate-50 group"
                       >
                         <ChevronRight size={14} className="text-brand-orange opacity-0 group-hover:opacity-100 transition-all -ml-4 group-hover:ml-0" />
                         <span className="font-mono text-[10px] uppercase tracking-widest">{link.name}</span>
                       </a>
                     ))}
                   </div>
                </div>
              )}
            </aside>

            {/* Main: Product Grid & Gallery */}
            <div className="lg:col-span-8 order-1 lg:order-2 space-y-24">
              {/* Product Grid */}
              <div className="space-y-12">
                 <div className="flex items-end justify-between border-b border-slate-100 pb-8">
                   <div>
                     <h2 className="font-display text-3xl lg:text-4xl uppercase tracking-tighter">Hardware Showcase</h2>
                     <p className="font-mono text-[10px] text-brand-grey uppercase tracking-widest mt-2">Available to order today</p>
                   </div>
                   <Link href="/store" className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.2em] flex items-center gap-2 hover:gap-4 transition-all">
                     View All <ArrowRight size={12} />
                   </Link>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   {products?.map((product) => (
                     <ProductCard 
                       key={product.id}
                       id={product.id}
                       name={product.name}
                       brand={product.brand}
                       price={product.price_gbp}
                       image={product.images?.[0] || ""}
                       slug={product.slug}
                       specLine={product.specs?.voltage || product.specs?.capacity || ""}
                       badge={product.is_featured ? "Bestseller" : ""}
                     />
                   ))}
                 </div>
              </div>

              {/* Media Gallery */}
              {brand.gallery && brand.gallery.length > 0 && (
                <div className="space-y-12">
                   <div className="flex items-center gap-2 mb-8">
                     <ImageIcon className="text-brand-orange w-5 h-5" />
                     <h2 className="font-display text-3xl uppercase tracking-tighter">Engineering in Action</h2>
                   </div>
                   <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                     {brand.gallery.map((url: string, idx: number) => (
                       <div key={idx} className="aspect-square bg-slate-100 overflow-hidden rounded-xl border border-slate-200">
                         <img src={url} alt={`${brand.name} action ${idx}`} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-110" />
                       </div>
                     ))}
                   </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Cross-Sell Footer */}
      <section className="py-24 bg-brand-obsidian text-white border-t border-white/5">
        <div className="container mx-auto px-6 text-center">
           <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.5em] mb-6 block">NEXT STEPS</span>
           <h2 className="font-display text-4xl lg:text-6xl uppercase tracking-tighter mb-12">
             READY TO DESIGN <br /> YOUR {brand.name.toUpperCase()} SYSTEM?
           </h2>
           <div className="flex flex-wrap justify-center gap-8">
             <Link href="/planner" className="flex items-center gap-4 group">
               <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:border-brand-orange transition-colors">
                 <Package className="w-6 h-6 text-white group-hover:text-brand-orange transition-colors" />
               </div>
               <div className="text-left">
                 <span className="block font-display text-sm uppercase tracking-tight">Open Build Planner</span>
                 <span className="block font-mono text-[8px] text-brand-grey uppercase tracking-widest">Interactive Spec Tool</span>
               </div>
             </Link>
             <Link href="/store" className="flex items-center gap-4 group">
               <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:border-brand-orange transition-colors">
                 <FileText className="w-6 h-6 text-white group-hover:text-brand-orange transition-colors" />
               </div>
               <div className="text-left">
                 <span className="block font-display text-sm uppercase tracking-tight">Browse All Gear</span>
                 <span className="block font-mono text-[8px] text-brand-grey uppercase tracking-widest">Full Product Registry</span>
               </div>
             </Link>
           </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
