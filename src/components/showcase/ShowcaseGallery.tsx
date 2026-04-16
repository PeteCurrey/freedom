"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

interface Build {
  id: string;
  slug?: string;
  title: string;
  vehicle_model: string;
  chassis_type: string;
  description: string;
  hero_image?: string;
  specs?: any;
  specs_summary?: any;
  year_completed?: number;
  user_handle?: string;
  is_community_pick?: boolean;
  rating?: number;
}

interface ShowcaseGalleryProps {
  initialBuilds: Build[];
}

const filters = ["All", "Mercedes Sprinter", "VW Crafter", "Ford Transit", "Fiat Ducato", "Iveco Daily"];

export default function ShowcaseGallery({ initialBuilds }: ShowcaseGalleryProps) {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = initialBuilds.filter(b =>
    activeFilter === "All" || b.chassis_type === activeFilter
  );

  return (
    <>
      {/* Filters */}
      <section className="py-8 border-b border-brand-border/30 sticky top-[72px] z-40 bg-brand-obsidian/95 backdrop-blur-xl">
        <div className="container mx-auto px-6">
          <div className="flex gap-4 overflow-x-auto no-scrollbar">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "font-mono text-[9px] uppercase tracking-widest px-5 py-2 border shrink-0 transition-all",
                  activeFilter === filter
                    ? "border-brand-orange text-brand-orange bg-brand-orange/10"
                    : "border-brand-border text-brand-grey hover:border-brand-grey"
                )}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Build Grid */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          {filtered.length === 0 ? (
            <div className="py-32 text-center">
              <p className="font-mono text-brand-grey text-xs uppercase tracking-widest">No builds found for this chassis yet at this capability level.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filtered.map((build) => (
                <div key={build.id} className="group blueprint-border bg-brand-carbon overflow-hidden flex flex-col relative">
                  {build.is_community_pick && (
                    <div className="absolute top-0 right-10 z-20 px-4 py-2 bg-brand-orange text-white font-display text-[8px] uppercase tracking-widest">
                      Community Pick
                    </div>
                  )}
                  
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={build.hero_image || "/images/community-showcase.png"}
                      alt={build.title}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian via-transparent to-transparent" />
                    <div className="absolute top-6 left-6 px-3 py-1 bg-brand-obsidian border border-brand-orange/40 font-mono text-[8px] text-brand-orange uppercase tracking-widest">
                      {build.chassis_type}
                    </div>
                    <div className="absolute top-6 right-6 px-3 py-1 bg-brand-obsidian border border-brand-border font-mono text-[8px] text-brand-grey uppercase tracking-widest">
                      {build.year_completed}
                    </div>
                  </div>
                  <div className="p-10 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-2">
                       <h2 className="font-display text-3xl uppercase group-hover:text-brand-orange transition-colors">{build.title}</h2>
                       <div className="font-mono text-[10px] text-brand-orange flex items-center gap-1">
                          ★ <span className="text-white">{build.rating || "4.8"}</span>
                       </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-6">
                       <div className="w-4 h-4 rounded-full bg-brand-orange/20 border border-brand-orange/40" />
                       <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest">Submitted by {build.user_handle || "@AmpliosMember"}</span>
                    </div>

                    <p className="font-sans text-brand-grey text-sm leading-relaxed mb-8">{build.description}</p>
                    
                    <div className="grid grid-cols-3 gap-4 mt-auto pt-8 border-t border-brand-border/30">
                      {Object.entries(build.specs_summary || build.specs || {}).map(([key, val]) => (
                        <div key={key}>
                          <p className="font-mono text-[7px] text-brand-grey uppercase tracking-widest mb-1">{key}</p>
                          <p className="font-mono text-[9px] text-brand-white">{String(val)}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 flex justify-end">
                       <Link 
                         href={`/showcase/${build.slug || build.id}`} 
                         className="flex items-center gap-2 font-display text-[9px] uppercase tracking-[.3em] text-brand-orange hover:text-white transition-colors"
                        >
                         Technical Audit <ChevronRight className="w-4 h-4" />
                       </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
    </>
  );
}
