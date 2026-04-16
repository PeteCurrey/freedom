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

  const initialBuilds = builds;

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
                BUILT BY THE <span className="text-brand-orange">COMMUNITY</span>
              </h1>
              <p className="font-sans text-brand-grey text-xl leading-relaxed max-w-2xl italic">
                A gallery of engineering excellence. Browse completed self-builds that adhere to the Amplios technical standard.
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
