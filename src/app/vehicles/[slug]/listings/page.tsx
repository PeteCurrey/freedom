"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { generateEbaySearchUrl } from "@/lib/affiliate";
import { ExternalLink, ShieldCheck, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";

// Vehicle Metadata to ensure we have the right display name
const vehicleMap: Record<string, string> = {
  "mercedes-sprinter": "Mercedes-Benz Sprinter",
  "vw-crafter": "VW Crafter",
  "ford-transit": "Ford Transit",
  "man-tge": "MAN TGE",
  "fiat-ducato": "Fiat Ducato",
  "iveco-daily": "Iveco Daily",
};

// Fallback links in case the database is not yet seeded or configured
const getFallbackLinks = (slug: string, vehicleName: string) => {
  const affLinks: Record<string, string> = {
    "mercedes-sprinter": "https://sovrn.co/8jnot3i",
    "man-tge": "https://sovrn.co/11auwij",
    "fiat-ducato": "https://sovrn.co/12rriq1",
    "peugeot-boxer": "https://www.autotrader.co.uk/vans/used-vans/peugeot/boxer",
    "citroen-relay": "https://www.autotrader.co.uk/vans/used-vans/citroen/relay",
  };

  const vanTraderUrl = affLinks[slug] || `https://www.autotrader.co.uk/vans/used-vans/${slug.replace('-', '/')}`;
  const ebayUrl = `https://www.ebay.co.uk/sch/i.html?_nkw=${vehicleName.replace(' ', '+')}+panel+van+lwb`;

  return [
    {
      id: "fallback-ebay",
      marketplace_name: "eBay Motors UK",
      affiliate_url: ebayUrl,
      icon_type: "ebay",
      is_fallback: true
    },
    {
      id: "fallback-vantrader",
      marketplace_name: "VanTrader Classifieds",
      affiliate_url: vanTraderUrl,
      icon_type: "vantrader",
      is_fallback: true
    }
  ];
};

export default function MarketplacePage() {
  const { slug } = useParams();
  const vehicleName = vehicleMap[slug as string] || "Base";
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
      
      if (data && data.length > 0) {
        setMarketplaceLinks(data);
      } else {
        // Use fallback if database returns nothing (prevents "vanishing" links)
        setMarketplaceLinks(getFallbackLinks(slug as string, vehicleName));
      }
      setLoading(false);
    }
    fetchLinks();
  }, [slug, vehicleName]);

  const ebayHeroUrl = generateEbaySearchUrl({ vehicleName });

  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 border-b border-brand-border">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <nav className="flex items-center gap-2 font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-8">
                <Link href="/" className="hover:text-brand-orange">Home</Link>
                <span>/</span>
                <Link href={`/vehicles/${slug}`} className="hover:text-brand-orange">{vehicleName}</Link>
                <span>/</span>
                <span className="text-brand-white">Used Listings</span>
              </nav>
              <h1 className="font-display text-5xl lg:text-7xl mb-6 leading-none uppercase">
                THE <span className="text-brand-orange">MARKETPLACE</span>
              </h1>
              <p className="font-sans text-brand-grey text-lg lg:text-xl max-w-xl">
                Sourcing the perfect {vehicleName} foundation. Below are specialized tracking routes and 
                investigated sourcing channels.
              </p>
            </div>
            <a 
              href={ebayHeroUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-orange text-white px-10 py-5 font-display text-xs uppercase tracking-[0.2em] hover:scale-105 transition-transform inline-flex items-center gap-3"
            >
              Browse all on eBay <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Marketplace Grid */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Sidebar / Filters Placeholder */}
            <div className="space-y-12">
              <div>
                <h3 className="font-display text-xs tracking-[0.3em] text-brand-white uppercase mb-8 italic">Buying Guide</h3>
                <div className="space-y-6">
                  <div className="blueprint-border p-6 bg-brand-carbon/50">
                    <p className="font-mono text-[10px] text-brand-orange uppercase mb-2">Check 01 // Rust</p>
                    <p className="font-sans text-brand-grey text-[11px] leading-relaxed">
                      Check rear arches and step wells. For Sprinters, inspect the roof seams.
                    </p>
                  </div>
                  <div className="blueprint-border p-6 bg-brand-carbon/50">
                    <p className="font-mono text-[10px] text-brand-orange uppercase mb-2">Check 02 // History</p>
                    <p className="font-sans text-brand-grey text-[11px] leading-relaxed">
                      Full service history (FSH) is vital. Ex-lease vans are often well-maintained.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Listings Bridge */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-12">
                <h2 className="font-display text-xl uppercase tracking-widest">{vehicleName} <span className="text-brand-orange">Search Pipes</span></h2>
                <div className="h-px flex-1 bg-brand-border mx-8 hidden md:block" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {marketplaceLinks.length > 0 ? (
                  marketplaceLinks.map((link) => (
                    <ListingChannelCard 
                      key={link.id}
                      title={link.marketplace_name}
                      description={`Direct conduit to ${link.marketplace_name} results for ${vehicleName} chassis. Includes pre-applied trade filters.`}
                      url={link.is_fallback ? link.affiliate_url : `/api/affiliate/redirect?type=marketplace&id=${link.id}`}
                      logo={link.icon_type === 'ebay' ? "/images/systems-showcase.png" : "/images/hero-background.png"}
                      badge={link.is_fallback ? "Vetted Source" : "Affiliate Partner"}
                    />
                  ))
                ) : !loading ? (
                   <div className="col-span-full p-12 text-center bg-brand-obsidian border border-brand-border/50">
                    <Search className="w-8 h-8 text-brand-grey mx-auto mb-4" />
                    <p className="font-mono text-xs uppercase tracking-widest text-brand-grey">No approved marketplace conduits configured for this chassis.</p>
                  </div>
                ) : (
                  <div className="col-span-full py-20 text-center font-mono text-xs uppercase tracking-[0.3em] text-brand-grey animate-pulse">
                    Scanning Network Nodes...
                  </div>
                )}
              </div>

              {/* Technical Notice */}
              <div className="mt-16 blueprint-border p-8 border-brand-orange/20 bg-brand-orange/5">
                <div className="flex gap-6 items-start">
                  <ShieldCheck className="w-8 h-8 text-brand-orange shrink-0" />
                  <div>
                    <h4 className="font-display text-sm mb-2">Technical Disclaimer</h4>
                    <p className="font-sans text-brand-grey text-xs leading-relaxed max-w-2xl">
                      Amplios may receive a small commission from sales generated through the links on this 
                      page. This helps fund our technical research and free build guides. All listings are 
                      third-party; always perform an HPI check before purchasing.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}


function ListingChannelCard({ title, description, url, logo, badge }: any) {
  return (
    <div className="group blueprint-border bg-brand-carbon hover:bg-brand-graphite transition-all duration-500 overflow-hidden">
      <div className="relative h-48 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
        <Image src={logo} alt={title} fill className="object-cover opacity-30 group-hover:opacity-60 group-hover:scale-110 transition-transform duration-1000" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-carbon to-transparent" />
        <div className="absolute top-4 right-4">
          <span className="font-mono text-[8px] text-brand-orange border border-brand-orange/40 px-2 py-1 uppercase tracking-widest bg-brand-obsidian/80">
            {badge}
          </span>
        </div>
      </div>
      <div className="p-8">
        <h3 className="font-display text-xl mb-4 group-hover:text-brand-orange transition-colors">{title}</h3>
        <p className="font-sans text-brand-grey text-xs leading-relaxed mb-8">{description}</p>
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 font-mono text-[10px] text-brand-white uppercase tracking-widest border-b border-brand-white/20 pb-2 hover:border-brand-orange hover:text-brand-orange transition-all"
        >
          Open Marketplace <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}
