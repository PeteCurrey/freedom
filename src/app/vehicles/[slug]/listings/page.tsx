"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { generateEbaySearchUrl, generateAutotraderSearchUrl } from "@/lib/affiliate";
import { ExternalLink, ShieldCheck, Search, AlertCircle, CheckCircle2, Info, ArrowRight, Gauge, Layers, InfoIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { vehicleData } from "@/lib/data/vehicles";

export default function MarketplacePage() {
  const { slug } = useParams();
  const vKey = (slug as string) || "mercedes-sprinter";
  const vehicle = vehicleData[vKey];
  const vehicleName = vehicle?.name || "Base Vehicle";
  
  const [marketplaceLinks, setMarketplaceLinks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLinks() {
      const { data } = await supabase
        .from('vehicle_marketplaces')
        .select('*')
        .eq('vehicle_id', slug)
        .eq('is_active', true)
        .order('created_at', { ascending: true });
      
      if (data) {
        setMarketplaceLinks(data);
      }
      setLoading(false);
    }
    fetchLinks();
  }, [slug]);

  // Fallback URLs
  const ebayFallback = generateEbaySearchUrl({ vehicleName });
  const autotraderFallback = generateAutotraderSearchUrl({ vehicleName });

  // Helper to find specific marketplace by type
  const getMarketplaceUrl = (type: string, fallback: string) => {
    const link = marketplaceLinks.find(l => l.icon_type === type);
    return link ? `/api/affiliate/redirect?type=marketplace&id=${link.id}` : fallback;
  };

  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* 1. EDITORIAL HERO SECTION */}
      <section className="relative pt-48 pb-24 overflow-hidden border-b border-brand-border/30">
        <div className="absolute inset-0 z-0">
          <Image 
            src={vehicle?.heroImage || "/images/hero-background.png"} 
            alt={vehicleName} 
            fill
            className="object-cover opacity-20 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-obsidian via-transparent to-brand-obsidian" />
          <div className="blueprint-grid absolute inset-0 opacity-10 pointer-events-none" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <nav className="flex items-center gap-4 font-mono text-[10px] text-brand-grey uppercase tracking-[0.3em] mb-12">
                <Link href="/" className="hover:text-brand-orange transition-colors">Registry</Link>
                <div className="h-px w-4 bg-brand-border" />
                <Link href="/vehicles" className="hover:text-brand-orange transition-colors">Chassis</Link>
                <div className="h-px w-4 bg-brand-border" />
                <span className="text-brand-orange">{vehicleName}</span>
            </nav>
            
            <h1 className="font-display text-6xl lg:text-9xl mb-8 uppercase font-bold tracking-tighter leading-[0.85]">
              SOURCING <br/><span className="text-brand-orange">PROTOCOL</span>
            </h1>
            <p className="font-sans text-brand-grey text-xl lg:text-2xl leading-relaxed max-w-2xl mb-12">
               Verified sourcing channels for the {vehicleName} chassis. Our algorithms track pre-filtered listings across the UK's primary marketplaces.
            </p>

            <div className="flex flex-wrap gap-6 pt-4">
               <a 
                 href={getMarketplaceUrl('ebay', ebayFallback)}
                 target="_blank"
                 className="group bg-brand-orange text-white px-10 py-5 font-display text-[10px] uppercase tracking-[0.2em] transform transition-all hover:scale-105 shadow-xl shadow-brand-orange/20 flex items-center gap-4"
               >
                 Search eBay <ExternalLink className="w-4 h-4" />
               </a>
               <a 
                 href={getMarketplaceUrl('autotrader', autotraderFallback)}
                 target="_blank"
                 className="group bg-brand-white text-brand-obsidian px-10 py-5 font-display text-[10px] uppercase tracking-[0.2em] transform transition-all hover:scale-105 shadow-xl shadow-black/20 flex items-center gap-4"
               >
                 Search AutoTrader <ExternalLink className="w-4 h-4" />
               </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DUAL COLUMN LAYOUT */}
      <section className="py-24 relative">
        <div className="blueprint-grid absolute inset-0 opacity-5 pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            
            {/* Sidebar: BUYING GUIDE (Expert Editorial) */}
            <div className="lg:col-span-4 space-y-12">
              <div className="sticky top-32">
                <div className="mb-12">
                  <span className="font-mono text-[10px] text-brand-orange uppercase tracking-widest block mb-4">Node Registry Insight</span>
                  <h2 className="font-display text-4xl uppercase tracking-tighter mb-6">Expert Review</h2>
                  <p className="font-sans text-brand-grey leading-relaxed italic">
                    "The {vehicleName} is a formidable technical platform, but sourcing requires strict adherence to our inspection criteria."
                  </p>
                </div>

                <div className="space-y-6">
                  {/* WATCH OUT */}
                  <div className="blueprint-border p-8 bg-brand-carbon/30 border-l-4 border-red-500/50">
                    <div className="flex items-center gap-3 mb-6">
                      <AlertCircle className="w-5 h-5 text-red-500" />
                      <span className="font-mono text-[10px] text-white uppercase tracking-widest">CRITICAL CHECK: WATCH OUT</span>
                    </div>
                    <p className="font-sans text-brand-grey text-sm leading-relaxed">
                      {vehicle?.watchOutFor || "Perform a full structural and HPI node verification before funds transfer."}
                    </p>
                  </div>

                  {/* PROS & CONS */}
                  <div className="blueprint-border p-8 bg-brand-carbon/30 border-l-4 border-brand-orange">
                     <div className="flex items-center gap-3 mb-8">
                       <CheckCircle2 className="w-5 h-5 text-brand-orange" />
                       <span className="font-mono text-[10px] text-white uppercase tracking-widest">DEPLOYMENT ADVANTAGES</span>
                     </div>
                     <ul className="space-y-4">
                        {vehicle?.pros?.map((p, i) => (
                           <li key={i} className="flex items-start gap-3">
                              <div className="w-1.5 h-1.5 rounded-full bg-brand-orange mt-1.5 shrink-0" />
                              <span className="font-mono text-[10px] text-brand-grey uppercase tracking-wider">{p}</span>
                           </li>
                        ))}
                     </ul>
                  </div>

                  {/* VERDICT */}
                  <div className="blueprint-border p-8 bg-brand-carbon/30 border-l-4 border-brand-white/20">
                    <div className="flex items-center gap-3 mb-6">
                      <Layers className="w-5 h-5 text-brand-white" />
                      <span className="font-mono text-[10px] text-white uppercase tracking-widest">TECHNICAL VERDICT</span>
                    </div>
                    <p className="font-sans text-brand-grey text-sm leading-relaxed italic border-l border-brand-orange/30 pl-4">
                       {vehicle?.bestFor || "Ideal for professional conversions and high-mileage touring."}
                    </p>
                  </div>
                </div>

                {/* Technical Stats Card */}
                <div className="mt-12 p-8 bg-brand-obsidian blueprint-border overflow-hidden relative">
                   <div className="absolute top-0 right-0 p-8 opacity-5"><Gauge className="w-24 h-24" /></div>
                   <h3 className="font-display text-sm uppercase mb-6 tracking-widest">Chassis Metadata</h3>
                   <div className="grid grid-cols-2 gap-8">
                      <div>
                        <span className="block font-mono text-[9px] text-brand-grey uppercase mb-1">Max GVWR</span>
                        <span className="block font-display text-xl">{vehicle?.specs?.find(s => s.label === 'GVWR')?.value || "3,500"} KG</span>
                      </div>
                      <div>
                        <span className="block font-mono text-[9px] text-brand-grey uppercase mb-1">Int. Width</span>
                        <span className="block font-display text-xl">{vehicle?.internalWidth || "1.78M"}</span>
                      </div>
                   </div>
                </div>
              </div>
            </div>

            {/* Main Content: MARKETPLACE CHANNELS */}
            <div className="lg:col-span-8">
              <div className="flex items-center justify-between mb-16">
                 <div>
                    <h2 className="font-display text-3xl uppercase tracking-tight">Active Search <span className="text-brand-orange">Conduits</span></h2>
                    <p className="font-sans text-brand-grey mt-2">Specialized search filters pre-applied for {vehicleName} builds.</p>
                 </div>
                 <div className="hidden md:flex items-center gap-4 text-brand-grey font-mono text-[9px] uppercase tracking-widest">
                    <span>Registry Status</span>
                    <div className="h-px w-12 bg-brand-border" />
                    <span className="text-brand-orange">Operational</span>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Always Show eBay Card */}
                <ChannelCard 
                  title="eBay Motors Pro"
                  description={`Direct API access to ${vehicleName} listings. Filters include 'Panel Van' + 'LWB' to exclude micro-utility vehicles.`}
                  url={getMarketplaceUrl('ebay', ebayFallback)}
                  icon="/images/systems-showcase.png"
                  badge="Major Node"
                />

                {/* Always Show AutoTrader Card */}
                <ChannelCard 
                  title="AutoTrader Van Hunter"
                  description={`The UK's largest marketplace. Deep-linked to ${vehicleName} with professional trade-verified filtering.`}
                  url={getMarketplaceUrl('autotrader', autotraderFallback)}
                  icon="/images/hero-background.png"
                  badge="Critical Node"
                />

                {/* Show other dynamic marketplace links from DB */}
                {marketplaceLinks.filter(l => l.icon_type !== 'ebay' && l.icon_type !== 'autotrader').map((link) => (
                  <ChannelCard 
                    key={link.id}
                    title={link.marketplace_name}
                    description={`Specialised niche sourcing via ${link.marketplace_name}. Investigated and approved for ${vehicleName} sourcing.`}
                    url={`/api/affiliate/redirect?type=marketplace&id=${link.id}`}
                    icon="/images/community-showcase.png"
                    badge="Auxiliary Node"
                  />
                ))}
              </div>

              {/* Technical Disclaimer Strip */}
              <div className="mt-20 blueprint-border p-10 bg-brand-carbon/30 border-l-4 border-brand-orange relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-5"><InfoIcon size={48} /></div>
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="w-12 h-12 bg-brand-obsidian border border-brand-border flex items-center justify-center text-brand-orange shrink-0">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-display text-sm uppercase tracking-widest mb-2">Registry Transparency Notice</h4>
                    <p className="font-sans text-brand-grey text-xs leading-relaxed max-w-3xl">
                      To sustain our technical research, Amplios may receive compensation from marketplace partners when you source a vehicle via our conduit links. This does not impact the objectivity of our buying advice. All technical scores are engineering-driven.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Educational Pathways */}
              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-px bg-brand-border">
                  <Link href={`/vehicles/${slug}`} className="bg-brand-carbon p-10 group hover:bg-brand-obsidian transition-all">
                     <h5 className="font-display text-xs uppercase tracking-widest mb-4 group-hover:text-brand-orange transition-colors">Technical Specs →</h5>
                     <p className="font-sans text-xs text-brand-grey italic">View internal dimensions and load volume for planning.</p>
                  </Link>
                  <Link href="/planner" className="bg-brand-carbon p-10 group hover:bg-brand-obsidian transition-all">
                     <h5 className="font-display text-xs uppercase tracking-widest mb-4 group-hover:text-brand-orange transition-colors">Start Build Plan →</h5>
                     <p className="font-sans text-xs text-brand-grey italic">Configure systems for this chassis in the immersive planner.</p>
                  </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function ChannelCard({ title, description, url, icon, badge }: any) {
  return (
    <div className="group blueprint-border bg-brand-carbon hover:bg-brand-obsidian transition-all duration-700 overflow-hidden flex flex-col">
      <div className="relative h-48 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-1000">
        <Image src={icon} alt={title} fill className="object-cover opacity-20 group-hover:opacity-40 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-carbon to-transparent" />
        <div className="absolute top-6 right-6">
          <span className="font-mono text-[8px] text-brand-orange border border-brand-orange/40 px-3 py-1 uppercase tracking-widest bg-brand-obsidian/95 backdrop-blur-md">
             Registry {badge}
          </span>
        </div>
      </div>
      <div className="p-10 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-display text-2xl mb-4 group-hover:text-brand-orange transition-colors tracking-tight uppercase">{title}</h3>
          <p className="font-sans text-brand-grey text-xs leading-relaxed mb-10">{description}</p>
        </div>
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-4 bg-brand-obsidian border border-brand-border px-6 py-4 font-mono text-[9px] text-brand-white uppercase tracking-widest hover:border-brand-orange hover:bg-brand-orange/5 transition-all w-full justify-center group/btn"
        >
          Initialize Pipeline <ArrowRight className="w-3 h-3 text-brand-orange group-hover/btn:translate-x-1 transition-transform" />
        </a>
      </div>
    </div>
  );
}
