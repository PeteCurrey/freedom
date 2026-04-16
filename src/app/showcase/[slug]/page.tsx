import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowLeft, 
  Battery, 
  Flame, 
  Droplets, 
  Calendar, 
  MapPin, 
  User,
  Wrench,
  Gauge,
  CircleDollarSign,
  ChevronRight
} from "lucide-react";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { data: build } = await supabase
    .from('showcase_builds')
    .select('title, description, story, builder_name, hero_image')
    .eq('slug', params.slug)
    .single();

  if (!build) {
    return { title: 'Blueprint Not Found' };
  }

  const desc = build.description || build.story || `Explore this custom campervan blueprint by ${build.builder_name || "a community member"}.`;
  
  return {
    title: `${build.title}`,
    description: desc,
    openGraph: {
      title: `${build.title} | Amplios Showcase`,
      description: desc,
      images: build.hero_image ? [build.hero_image] : [],
    },
  };
}

export default async function BuildDetailPage({ params }: { params: { slug: string } }) {
  const { data: build, error } = await supabase
    .from('showcase_builds')
    .select('*')
    .eq('slug', params.slug)
    .single();

  if (error || !build) {
    notFound();
  }

  const specs = build.specs_summary || {};

  return (
    <main className="bg-brand-obsidian min-h-screen text-white selection:bg-brand-orange selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] overflow-hidden">
        <Image
          src={build.hero_image || "/images/community-showcase.png"}
          alt={build.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian via-brand-obsidian/40 to-transparent" />
        
        {/* Technical HUD Overlay */}
        <div className="absolute inset-x-0 bottom-0 py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl">
              <Link href="/showcase" className="inline-flex items-center gap-2 font-mono text-[10px] text-brand-orange uppercase tracking-[.4em] mb-8 hover:text-white transition-colors">
                <ArrowLeft className="w-3 h-3" /> // BACK_TO_SHOWCASE
              </Link>
              
              <div className="space-y-4 mb-12">
                <p className="font-mono text-[10px] text-brand-grey uppercase tracking-[.5em]">MISSION ARCHIVE // {build.id.slice(0, 8)}</p>
                <h1 className="font-display text-6xl lg:text-8xl uppercase leading-tight italic">
                  {build.title}
                </h1>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-brand-border/30 pt-8">
                <div>
                   <p className="font-mono text-[8px] text-brand-grey uppercase tracking-widest mb-1">FOUNDATION</p>
                   <p className="font-display text-lg uppercase">{build.chassis_type}</p>
                </div>
                <div>
                   <p className="font-mono text-[8px] text-brand-grey uppercase tracking-widest mb-1">PROJECT_DUR</p>
                   <p className="font-display text-lg uppercase">{build.build_duration || "8 Months"}</p>
                </div>
                <div>
                   <p className="font-mono text-[8px] text-brand-grey uppercase tracking-widest mb-1">BUDGET_CLASS</p>
                   <p className="font-display text-lg uppercase">{build.budget_range || "PRO"}</p>
                </div>
                <div>
                   <p className="font-mono text-[8px] text-brand-grey uppercase tracking-widest mb-1">COMPLETED</p>
                   <p className="font-display text-lg uppercase">{build.year_completed || build.created_at.slice(0,4)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Sidebar Mini-HUD */}
        <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden xl:block space-y-4">
           {[1, 2, 3].map(i => (
             <div key={i} className="w-1 h-8 bg-brand-orange/20" />
           ))}
           <div className="w-1 h-12 bg-brand-orange" />
           {[1, 2].map(i => (
             <div key={i} className="w-1 h-8 bg-brand-orange/20" />
           ))}
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            
            {/* Left Column: Narrative */}
            <div className="lg:col-span-7 space-y-16">
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-px flex-1 bg-brand-border/30" />
                  <h3 className="font-mono text-[10px] text-brand-orange uppercase tracking-widest px-4 border border-brand-orange/30 py-1">THE_MISSION</h3>
                  <div className="h-px flex-1 bg-brand-border/30" />
                </div>
                <p className="font-sans text-brand-grey text-xl leading-relaxed first-letter:text-5xl first-letter:font-display first-letter:text-brand-orange first-letter:mr-3 first-letter:float-left">
                  {build.description || build.story}
                </p>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="blueprint-border bg-brand-carbon p-8 relative">
                   <Battery className="absolute top-6 right-6 w-6 h-6 text-brand-orange opacity-20" />
                   <h4 className="font-display text-sm uppercase italic mb-4 text-brand-orange">Electrical Core</h4>
                   <p className="font-sans text-brand-grey text-sm leading-relaxed">{specs.electrical || "300Ah Lithium via Victron Multiplus II 3000."}</p>
                </div>
                <div className="blueprint-border bg-brand-carbon p-8 relative">
                   <Flame className="absolute top-6 right-6 w-6 h-6 text-brand-orange opacity-20" />
                   <h4 className="font-display text-sm uppercase italic mb-4 text-brand-orange">Climate Tech</h4>
                   <p className="font-sans text-brand-grey text-sm leading-relaxed">{specs.heating || "Autoterm 2D Diesel Heater with Comfort Control."}</p>
                </div>
                <div className="blueprint-border bg-brand-carbon p-8 relative">
                   <Droplets className="absolute top-6 right-6 w-6 h-6 text-brand-orange opacity-20" />
                   <h4 className="font-display text-sm uppercase italic mb-4 text-brand-orange">Water Management</h4>
                   <p className="font-sans text-brand-grey text-sm leading-relaxed">{specs.water || "80L Internal Fresh Tank, 50L underslung grey."}</p>
                </div>
                <div className="blueprint-border bg-brand-carbon p-8 relative">
                   <Wrench className="absolute top-6 right-6 w-6 h-6 text-brand-orange opacity-20" />
                   <h4 className="font-display text-sm uppercase italic mb-4 text-brand-orange">Build Detail</h4>
                   <p className="font-sans text-brand-grey text-sm leading-relaxed">{build.vehicle_model}</p>
                </div>
              </div>
            </div>

            {/* Right Column: Metadata & Interaction */}
            <div className="lg:col-span-5 space-y-12">
               <div className="bg-brand-carbon/50 border border-brand-border/30 p-10 lg:sticky lg:top-32">
                 <div className="space-y-8 mb-12">
                   <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-full bg-brand-obsidian border border-brand-orange/30 flex items-center justify-center text-brand-orange group overflow-hidden">
                        <User className="w-6 h-6 group-hover:scale-110 transition-transform" />
                      </div>
                      <div>
                        <p className="font-mono text-[8px] text-brand-grey uppercase tracking-widest mb-1">ENGINEER_IN_CHARGE</p>
                        <p className="font-display text-xl uppercase italic">{build.builder_name || "Community Member"}</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-full bg-brand-obsidian border border-brand-border/30 flex items-center justify-center text-brand-grey">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-mono text-[8px] text-brand-grey uppercase tracking-widest mb-1">DEPLOYMENT_SITE</p>
                        <p className="font-display text-xl uppercase italic">{build.location || "United Kingdom"}</p>
                      </div>
                   </div>
                 </div>

                 <div className="space-y-4">
                    <p className="font-mono text-[9px] text-brand-grey uppercase tracking-widest text-center mb-6">INTEL TOOLS</p>
                    <button className="w-full py-5 border border-brand-orange text-brand-orange font-display text-[10px] uppercase tracking-[.3em] hover:bg-brand-orange hover:text-white transition-all flex items-center justify-center gap-3">
                       <Gauge className="w-4 h-4" /> Export Spec Sheet
                    </button>
                    <button className="w-full py-5 bg-white text-brand-obsidian font-display text-[10px] uppercase tracking-[.3em] hover:bg-brand-orange hover:text-white transition-all flex items-center justify-center gap-3">
                       <CircleDollarSign className="w-4 h-4" /> Est. Build Cost
                    </button>
                 </div>
                 
                 <div className="mt-12 pt-12 border-t border-brand-border/30">
                    <h5 className="font-display text-xs uppercase mb-6 italic text-brand-grey">Similar Builds</h5>
                    <div className="space-y-4">
                       {[1, 2].map(i => (
                         <div key={i} className="flex gap-4 group cursor-pointer">
                            <div className="w-20 aspect-video bg-brand-obsidian overflow-hidden border border-brand-border/30">
                               <div className="w-full h-full bg-brand-obsidian group-hover:bg-brand-orange/20 transition-colors" />
                            </div>
                            <div className="flex-1 border-b border-brand-border/10 pb-4">
                               <p className="font-display text-[10px] uppercase group-hover:text-brand-orange transition-colors">Alternative Alpha Build {i}</p>
                               <p className="font-mono text-[7px] text-brand-grey uppercase">Mercedes Sprinter</p>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* Full Width Gallery Placeholder */}
      <section className="py-24 bg-brand-carbon/30 border-y border-brand-border/10">
         <div className="container mx-auto px-6">
           <div className="mb-16 flex items-end justify-between">
              <div>
                <p className="font-mono text-[10px] text-brand-orange uppercase tracking-[.4em] mb-4">// VISUALS</p>
                <h2 className="font-display text-4xl uppercase">Build <span className="text-brand-orange">Evidence</span></h2>
              </div>
              <p className="font-mono text-[10px] text-brand-grey uppercase tracking-widest max-w-sm hidden md:block">
                High-resolution photographic logs documenting the engineering process and final deployment.
              </p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {(build.images && build.images.length > 0) ? (
                build.images.map((img: string, i: number) => (
                  <div key={i} className="aspect-square bg-brand-obsidian blueprint-border relative group overflow-hidden">
                    <Image src={img} alt={`Build detail ${i}`} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                  </div>
                ))
              ) : (
                [1, 2, 3].map(i => (
                  <div key={i} className="aspect-square bg-brand-obsidian blueprint-border relative group flex items-center justify-center">
                    <span className="font-mono text-[10px] text-brand-grey uppercase">IMAGE_{i}_MISSING</span>
                  </div>
                ))
              )}
           </div>
         </div>
      </section>

      <Footer />
    </main>
  );
}
