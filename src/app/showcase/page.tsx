import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Upload, ChevronRight } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import ShowcaseGallery from "@/components/showcase/ShowcaseGallery";

export const metadata: Metadata = {
  title: "Community Showcase | Amplios",
  description: "Explore real-world expedition builds from the Amplios community. Real specs, real technical precision.",
};

const FALLBACK_BUILDS = [
  {
    id: "fb-1",
    slug: "highland-overlander",
    title: "The Highland Overlander",
    user_handle: "@AdventurePete",
    vehicle_model: "Mercedes Sprinter 4x4",
    chassis_type: "Mercedes Sprinter",
    description: "A full-spec 4x4 expedition build designed for the Scottish Highlands. Features a full Victron Multiplus system and custom off-road fabrication.",
    hero_image: "/images/sprinter.png",
    year_completed: 2024,
    is_community_pick: true,
    rating: 5.0,
    specs_summary: { "Solar": "400W", "Battery": "300Ah Li", "Heating": "Diesel" }
  },
  {
    id: "fb-2",
    slug: "scandi-ghost",
    title: "Scandi Ghost",
    user_handle: "@NorthernVans",
    vehicle_model: "VW Crafter MWB",
    chassis_type: "VW Crafter",
    description: "Minimalist interior focus with emphasis on stealth and thermal efficiency. All birch-ply interior with hidden fasteners.",
    hero_image: "/images/vw-crafter.png",
    year_completed: 2023,
    rating: 4.9,
    specs_summary: { "Solar": "200W", "Battery": "200Ah Li", "Water": "60L" }
  },
  {
    id: "fb-3",
    slug: "pacific-explorer",
    title: "Pacific Explorer",
    user_handle: "@CoastalBuilds",
    vehicle_model: "Ford Transit L3H3",
    chassis_type: "Ford Transit",
    description: "Built for long coastal tours with an integrated surf-rack and high-power induction cooking suite.",
    hero_image: "/images/transit.png",
    year_completed: 2024,
    rating: 4.7,
    specs_summary: { "Solar": "350W", "Battery": "400Ah Li", "Water": "85L" }
  },
  {
    id: "fb-4",
    slug: "alpine-studio",
    title: "The Alpine Studio",
    user_handle: "@MountainModern",
    vehicle_model: "Fiat Ducato L4H3",
    chassis_type: "Fiat Ducato",
    description: "A luxury leisure build focused on comfort. Features a full wet-room and leather upholstery.",
    hero_image: "/images/fiat-ducato.png",
    year_completed: 2023,
    rating: 4.8,
    specs_summary: { "Solar": "180W", "Battery": "160Ah AGM", "Water": "90L" }
  },
  {
    id: "fb-5",
    slug: "desert-raider",
    title: "Desert Raider 4x4",
    user_handle: "@GlobalTrekker",
    vehicle_model: "Iveco Daily 4x4",
    chassis_type: "Iveco Daily",
    description: "Heavy-duty global expedition vehicle with 14-day desert autonomy.",
    hero_image: "/images/iveco-daily.png",
    year_completed: 2024,
    rating: 5.0,
    specs_summary: { "Solar": "600W", "Battery": "600Ah Li", "Water": "180L" }
  },
  {
    id: "fb-6",
    slug: "nomad-command",
    title: "Nomad Command Centre",
    user_handle: "@DigitalDrifter",
    vehicle_model: "MAN TGE LWB",
    chassis_type: "VW Crafter",
    description: "Mobile office for full-time nomads with Starlink and dual-workstation integration.",
    hero_image: "/images/man-tge.png",
    year_completed: 2024,
    rating: 4.6,
    specs_summary: { "Solar": "500W", "Battery": "400Ah Li", "Water": "40L" }
  }
];

export default async function ShowcasePage() {
  let builds: any[] = [];
  
  try {
    const { data, error } = await supabase
      .from('showcase_builds')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching builds:', error);
    } else {
      builds = data || [];
    }
  } catch (err) {
    console.error('Supabase connection failed during build:', err);
  }

  // Use fallback if database is empty or connection fails
  const initialBuilds = builds.length > 0 ? builds : FALLBACK_BUILDS;

  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-48 pb-24 overflow-hidden border-b border-brand-border/30">
        <div className="blueprint-grid absolute inset-0 opacity-10 pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-12">
            <div className="max-w-3xl">
              <p className="font-mono text-[10px] text-brand-orange uppercase tracking-[.4em] mb-8">
                // Community Archives
              </p>
              <h1 className="font-display text-7xl lg:text-9xl mb-8 uppercase leading-none tracking-tighter">
                COMMUNITY <span className="text-brand-orange">ARCHIVES</span>
              </h1>
              <p className="font-sans text-brand-grey text-xl leading-relaxed max-w-2xl italic">
                A living index of engineering excellence. Browse 500+ community-indexed builds and technical mission logs from across the globe.
              </p>
            </div>
            <div>
              <Link
                href="/showcase/submit"
                className="inline-flex items-center gap-3 bg-brand-orange px-10 py-5 font-display text-xs uppercase tracking-widest text-white hover:bg-white hover:text-brand-orange transition-all shadow-[0_0_50px_rgba(255,107,0,0.2)]"
              >
                <Upload className="w-4 h-4" /> Submit Your Build
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Gallery Component */}
      <ShowcaseGallery initialBuilds={initialBuilds} />

      {/* Submit CTA */}
      <section className="py-32 bg-brand-carbon border-t border-brand-border/30 relative">
        <div className="blueprint-grid absolute inset-0 opacity-5 pointer-events-none" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="font-display text-5xl lg:text-6xl uppercase mb-6">ARCHIVE <span className="text-brand-orange">YOUR MISSION</span></h2>
          <p className="font-sans text-brand-grey text-xl max-w-2xl mx-auto mb-12 italic">
            Joined the ranks of completed builds? Submit your engineering logs and photos to be indexed in the official community showcase.
          </p>
          <Link
            href="/showcase/submit"
            className="inline-flex items-center gap-3 bg-brand-orange px-12 py-5 font-display text-xs uppercase tracking-widest text-white hover:bg-white hover:text-brand-orange transition-all"
          >
            Initiate Submission <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
