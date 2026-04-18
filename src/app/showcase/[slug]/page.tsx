import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft, Share2, Award, Zap, HardDrive, Droplets } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getBuildBySlug } from "@/lib/data/showcase";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const build = getBuildBySlug(slug);
  if (!build) return { title: "Build Not Found" };

  return {
    title: `${build.title} | Community Archives`,
    description: build.description,
  };
}

export default async function TechnicalAuditPage({ params }: PageProps) {
  const { slug } = await params;
  const build = getBuildBySlug(slug);

  if (!build) notFound();

  return (
    <main className="bg-brand-obsidian min-h-screen text-white">
      <Navbar />

      {/* 1. CINEMATIC HERO */}
      <section className="relative h-[80vh] w-full overflow-hidden">
        <Image
          src={build.hero_image}
          alt={build.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian via-brand-obsidian/20 to-transparent" />
        
        <div className="container mx-auto px-6 relative h-full flex flex-col justify-end pb-24 z-10">
          <Link href="/showcase" className="flex items-center gap-2 font-mono text-[10px] text-brand-orange uppercase tracking-[.3em] mb-8 hover:text-white transition-colors">
            <ArrowLeft size={12} /> Return to Archives
          </Link>
          
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="px-3 py-1 bg-brand-orange/10 border border-brand-orange/40 font-mono text-[10px] text-brand-orange uppercase tracking-widest">
                Mission Ready // {build.chassis_type}
              </span>
              <span className="px-3 py-1 bg-white/5 border border-white/10 font-mono text-[10px] text-brand-grey uppercase tracking-widest">
                ID: {build.id}
              </span>
            </div>
            
            <h1 className="font-display text-6xl lg:text-8xl uppercase tracking-tighter mb-4 leading-none">
              {build.title}
            </h1>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-brand-orange/20 border border-brand-orange/40 flex items-center justify-center">
                  <span className="text-brand-orange font-mono text-[10px]">P</span>
                </div>
                <span className="font-mono text-xs text-brand-grey uppercase tracking-wider">{build.user_handle}</span>
              </div>
              <div className="h-4 w-px bg-brand-border/40" />
              <span className="font-mono text-xs text-brand-grey uppercase tracking-wider">Rating: {build.rating.toFixed(1)} / 5.0</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SPECIFICATION OVERLAY */}
      <section className="py-12 bg-brand-carbon border-y border-brand-border/30 sticky top-[72px] z-40 backdrop-blur-xl bg-brand-carbon/80">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {Object.entries(build.specs_summary).map(([key, value]) => (
              <div key={key} className="flex flex-col gap-1">
                <span className="font-mono text-[8px] text-brand-grey uppercase tracking-widest">{key} Index</span>
                <span className="font-display text-lg uppercase text-white">{value}</span>
              </div>
            ))}
            <div className="hidden lg:flex flex-col justify-center items-end ml-auto col-span-2">
              <button className="flex items-center gap-2 font-display text-[9px] uppercase tracking-[.3em] text-brand-orange hover:text-white transition-colors">
                <Share2 size={12} /> Share Mission Profile
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MISSION LOGS (SEQUENTIAL GALLERY) */}
      <section className="py-24 container mx-auto px-6">
        <div className="max-w-5xl mx-auto space-y-32">
          {/* Executive Summary */}
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl uppercase mb-8 flex items-center gap-4">
              <Award className="text-brand-orange w-6 h-6" /> Executive Summary
            </h2>
            <p className="font-sans text-brand-grey text-xl leading-relaxed italic mb-12">
              "{build.story || build.description}"
            </p>
          </div>

          {/* Sequential Gallery Items */}
          {build.gallery.map((item, index) => (
            <div key={item.id} className="relative group">
              {/* Technical Indicator */}
              <div className="absolute -top-12 left-0 z-10 flex items-center gap-4 opacity-40 group-hover:opacity-100 transition-opacity">
                <span className="font-display text-xs text-brand-orange uppercase tracking-[.4em]">
                  [ {item.technical_index} ]
                </span>
                <div className="h-px w-24 bg-brand-orange/40" />
              </div>

              {/* High-Fi Asset */}
              <div className="blueprint-border bg-brand-carbon p-1 overflow-hidden">
                <div className="relative aspect-[16/9] md:aspect-video overflow-hidden border border-brand-border/50">
                  <Image
                    src={item.image}
                    alt={item.label}
                    fill
                    className="object-cover scale-100 group-hover:scale-105 transition-transform duration-1000 grayscale-[0.2] group-hover:grayscale-0"
                  />
                  {/* Digital Graticule */}
                  <div className="absolute inset-0 pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity">
                    <div className="absolute top-8 left-8 w-24 h-[1px] bg-white" />
                    <div className="absolute top-8 left-8 w-[1px] h-24 bg-white" />
                    <div className="absolute bottom-8 right-8 w-24 h-[1px] bg-white" />
                    <div className="absolute bottom-8 right-8 w-[1px] h-24 bg-white" />
                  </div>
                </div>
              </div>

              {/* Technical Spec Label */}
              <div className="mt-8 flex flex-col md:flex-row justify-between items-start gap-8">
                <div className="max-w-xl">
                  <h3 className="font-display text-4xl uppercase mb-4 text-white">
                    {item.label}
                  </h3>
                  <p className="font-mono text-[10px] text-brand-grey uppercase tracking-[.2em] leading-relaxed">
                    TECHNICAL CLASSIFICATION: VERIFIED ARCHIVE ASSET // NODE {index + 1}
                  </p>
                </div>
                
                {/* Micro Specs */}
                <div className="flex gap-12">
                  <div className="flex flex-col items-end">
                    <span className="font-mono text-[8px] text-brand-orange uppercase tracking-widest mb-2">Stability</span>
                    <span className="font-display text-xl">100%</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-mono text-[8px] text-brand-orange uppercase tracking-widest mb-2">Index</span>
                    <span className="font-display text-xl">0{index + 1}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. TECHNICAL FOOTER / CTA */}
      <section className="py-32 bg-brand-carbon border-t border-brand-border/30 relative overflow-hidden text-center">
        <div className="blueprint-grid absolute inset-0 opacity-10 pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <Zap className="w-12 h-12 text-brand-orange mx-auto mb-8" />
          <h2 className="font-display text-5xl uppercase mb-6">REPLICATE THIS <span className="text-brand-orange">MISSION</span></h2>
          <p className="font-sans text-brand-grey text-xl max-w-2xl mx-auto mb-12 italic">
            Inspired by the {build.title}? Access the exact systems and technical kits used in this build through the Amplios registry.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              href="/store"
              className="bg-brand-orange px-12 py-5 font-display text-xs uppercase tracking-widest text-white hover:bg-white hover:text-brand-orange transition-all"
            >
              Browse Technical Kits
            </Link>
            <Link
              href="/build"
              className="border border-brand-border px-12 py-5 font-display text-xs uppercase tracking-widest text-white hover:bg-brand-orange hover:border-brand-orange transition-all"
            >
              Start Your Plan
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
