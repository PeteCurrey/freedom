"use client";

import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { FileText, ArrowRight, ExternalLink, Plus } from "lucide-react";
import Link from "next/link";

interface ProductTabsProps {
  product: any;
  related: any[];
  fallbackImage: string;
}

export function ProductTabs({ product, related, fallbackImage }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="lg:col-span-8">
      <div className="flex gap-12 border-b border-brand-border mb-12 overflow-x-auto no-scrollbar">
        {["Overview", "Full Specifications", "Downloads"].map((tab) => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)}
            className={cn(
              "font-display text-xs uppercase tracking-[0.2em] pb-6 relative transition-all",
              activeTab === tab ? "text-white" : "text-brand-grey hover:text-white"
            )}
          >
            {tab}
            {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-1 bg-brand-orange" />}
          </button>
        ))}
      </div>
      
      <div className="prose prose-invert max-w-none text-brand-grey text-lg leading-relaxed">
        {activeTab === "Overview" && (
          <div className="animate-in fade-in duration-500">
            <p className="whitespace-pre-line">{product.full_description || product.description || "No detailed description provided for this component."}</p>
            
            {/* 4. PRODUCT VIDEO SYSTEM */}
            {product.video_enabled && product.video_url && (
              <div className="my-16 space-y-8 animate-in fade-in duration-1000">
                <div className="flex items-center gap-4 border-l-2 border-brand-orange pl-6">
                   <div className="w-10 h-10 bg-brand-orange/10 flex items-center justify-center text-brand-orange rounded-full">
                      <Plus className="w-5 h-5 animate-pulse" />
                   </div>
                   <div>
                      <span className="font-mono text-[10px] text-brand-orange uppercase tracking-widest block">Technical Walkthrough</span>
                      <h3 className="font-display text-2xl uppercase text-white">{product.video_title || "Field Performance Review"}</h3>
                   </div>
                </div>
                
                <div className="aspect-video bg-brand-carbon blueprint-border overflow-hidden relative group">
                   <div className="absolute inset-0 z-0 opacity-10 pointer-events-none blueprint-grid" />
                   {product.video_source === 'youtube' ? (
                     <iframe 
                       src={`https://www.youtube.com/embed/${product.video_url.split('v=')[1]?.split('&')[0] || product.video_url.split('/').pop()}`}
                       className="w-full h-full relative z-10"
                       allowFullScreen
                     />
                   ) : product.video_source === 'vimeo' ? (
                     <iframe 
                       src={`https://player.vimeo.com/video/${product.video_url.split('/').pop()}`}
                       className="w-full h-full relative z-10"
                       allowFullScreen
                     />
                   ) : (
                     <video 
                       src={product.video_url} 
                       controls 
                       className="w-full h-full relative z-10"
                       poster={product.images?.[0] || fallbackImage}
                     />
                   )}
                </div>
                
                {product.video_description && (
                  <p className="font-mono text-xs text-brand-grey leading-relaxed max-w-2xl">
                     {product.video_description}
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === "Full Specifications" && (
          <div className="animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-brand-border">
              {Object.entries(product.specs || {}).map(([key, value]) => (
                <div key={key} className="bg-brand-carbon p-8 flex flex-col gap-2">
                  <span className="font-mono text-[9px] text-brand-orange uppercase tracking-widest">{key}</span>
                  <span className="font-display text-lg uppercase text-white">{String(value)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "Downloads" && (
          <div className="animate-in fade-in duration-500 space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {product.datasheet_url && (
                <Link href={product.datasheet_url} className="flex items-center justify-between p-8 bg-brand-carbon blueprint-border group hover:bg-brand-carbon/80 transition-all">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-brand-obsidian flex items-center justify-center border border-brand-border">
                      <FileText className="text-brand-orange" />
                    </div>
                    <div>
                      <span className="block font-display text-sm uppercase text-white">Manufacturer Datasheet</span>
                      <span className="block font-mono text-[9px] text-brand-grey uppercase">Official Specifications (PDF)</span>
                    </div>
                  </div>
                  <ArrowRight className="text-brand-grey group-hover:text-brand-orange transition-colors" size={20} />
                </Link>
              )}
              {Object.entries(product.specs || {}).filter(([k]) => ['Manual', 'Enclosure', 'Installation Guide'].includes(k)).map(([key, value]) => (
                <Link key={key} href={String(value)} className="flex items-center justify-between p-8 bg-brand-carbon blueprint-border group hover:bg-brand-carbon/80 transition-all">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-brand-obsidian flex items-center justify-center border border-brand-border">
                      <ExternalLink className="text-brand-orange" size={20} />
                    </div>
                    <div>
                      <span className="block font-display text-sm uppercase text-white">{key} Guide</span>
                      <span className="block font-mono text-[9px] text-brand-grey uppercase">Official {product.brand} documentation</span>
                    </div>
                  </div>
                  <ArrowRight className="text-brand-grey group-hover:text-brand-orange transition-colors" size={20} />
                </Link>
              ))}
            </div>
          </div>
        )}

        {related && related.length > 0 && (
          <div className="my-24 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="flex items-center gap-4 mb-12">
              <div className="w-12 h-12 bg-brand-orange/10 flex items-center justify-center text-brand-orange rounded-full">
                <Plus className="w-6 h-6" />
              </div>
              <div>
                <span className="font-mono text-[10px] text-brand-orange uppercase tracking-widest block">System Synergy</span>
                <h3 className="font-display text-3xl uppercase text-white">Works Well With</h3>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {related.slice(0, 4).map((item) => (
                <Link 
                  key={item.id} 
                  href={`/store/product/${item.slug}`}
                  className="group/rel flex items-center gap-6 p-6 bg-brand-carbon/50 blueprint-border hover:bg-brand-carbon transition-all"
                >
                  <div className="w-20 h-20 bg-brand-obsidian relative overflow-hidden flex items-center justify-center p-2">
                    <img 
                      src={item.images?.[0] || "/images/electrical-technical.png"} 
                      className="w-full h-full object-contain grayscale group-hover/rel:grayscale-0 transition-all" 
                    />
                  </div>
                  <div>
                    <span className="block font-mono text-[9px] text-brand-grey uppercase tracking-widest mb-1">{item.brand}</span>
                    <span className="block font-display text-sm uppercase group-hover/rel:text-brand-orange transition-colors">{item.name}</span>
                    <span className="block font-mono text-[10px] text-brand-orange mt-2">£{(item.price_gbp / 100).toLocaleString()}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
