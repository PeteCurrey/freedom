"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { 
  ArrowRight, 
  Clock, 
  User, 
  Tag,
  ChevronRight,
  Filter
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function JournalIndexPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      const { data } = await supabase
        .from('journal_posts')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false });
      
      setPosts(data || []);
      setLoading(false);
    }
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-obsidian flex flex-col items-center justify-center">
         <div className="w-16 h-16 border-t-2 border-brand-orange animate-spin rounded-full mb-8" />
         <span className="font-mono text-[10px] text-brand-grey uppercase tracking-widest">Initialising Editorial Node</span>
      </div>
    );
  }

  const featuredPost = posts[0];
  const secondaryPosts = posts.slice(1);

  return (
    <div className="min-h-screen bg-brand-obsidian pt-32 pb-24">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="mb-24 flex flex-col lg:flex-row lg:items-end justify-between gap-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 font-mono text-[10px] text-brand-orange uppercase tracking-[0.3em] mb-4">
              <ChevronRight size={12} /> The Tactical Journal
            </div>
            <h1 className="font-display text-7xl uppercase tracking-tighter leading-[0.9] text-white">
               Engineering <br />
               <span className="text-brand-orange">Knowledge.</span>
            </h1>
          </div>
          <div className="max-w-sm">
             <p className="font-sans text-brand-grey text-sm mb-8 leading-relaxed">
               Cinematic build stories, technical guides, and engineering protocols for the serious self-builder. Decades of conversion expertise, documented for the road.
             </p>
             <div className="flex items-center gap-4 border-l border-brand-orange/30 pl-6 py-2">
                <span className="font-display text-2xl">{posts.length}</span>
                <span className="font-mono text-[8px] text-brand-grey uppercase tracking-widest leading-none">Active Articles<br />in the network</span>
             </div>
          </div>
        </div>

        {/* Featured Post (Cinematic Hero) */}
        {featuredPost && (
          <div className="mb-32">
             <Link href={`/journal/${featuredPost.slug}`} className="group block relative aspect-[21/9] overflow-hidden blueprint-border bg-brand-carbon">
                <img 
                  src={featuredPost.featured_image || "/images/hero-background.png"} 
                  className="w-full h-full object-cover grayscale opacity-60 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian to-transparent opacity-80" />
                
                <div className="absolute bottom-0 left-0 right-0 p-12 lg:p-20">
                   <div className="flex items-center gap-4 mb-6">
                      <span className="px-3 py-1 bg-brand-orange text-white font-mono text-[10px] uppercase tracking-widest leading-none flex items-center gap-2">
                         <Tag size={10} /> {featuredPost.category}
                      </span>
                      <span className="font-mono text-[10px] text-white/50 uppercase tracking-widest flex items-center gap-2 italic">
                         <Clock size={12} /> {featuredPost.reading_time_minutes}m intel
                      </span>
                   </div>
                   <h2 className="font-display text-4xl lg:text-6xl uppercase tracking-tighter text-white mb-6 group-hover:text-brand-orange transition-colors">
                      {featuredPost.title}
                   </h2>
                   <p className="font-sans text-brand-grey text-base max-w-2xl mb-8 group-hover:text-white transition-colors duration-500">
                      {featuredPost.excerpt}
                   </p>
                   <div className="flex items-center gap-3 font-mono text-[10px] text-brand-orange uppercase tracking-widest group-hover:gap-6 transition-all">
                      Extract intel <ArrowRight size={14} />
                   </div>
                </div>
             </Link>
          </div>
        )}

        {/* Post Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
           {secondaryPosts.map((post) => (
             <Link key={post.id} href={`/journal/${post.slug}`} className="group flex flex-col">
                <div className="aspect-square overflow-hidden blueprint-border bg-brand-carbon mb-8 relative">
                   <img 
                     src={post.featured_image || "/images/hero-background.png"} 
                     className="w-full h-full object-cover grayscale group-hover:scale-110 group-hover:grayscale-0 transition-all duration-700"
                   />
                   <div className="absolute inset-0 bg-brand-obsidian/40 opacity-40 group-hover:opacity-0 transition-opacity" />
                </div>
                
                <div className="space-y-4">
                   <div className="flex justify-between items-center">
                      <span className="font-mono text-[8px] text-brand-orange uppercase tracking-[0.3em]">{post.category}</span>
                      <span className="font-mono text-[8px] text-brand-grey uppercase tracking-widest">{post.reading_time_minutes}m</span>
                   </div>
                   <h3 className="font-display text-xl uppercase tracking-tight group-hover:text-brand-orange transition-colors">
                      {post.title}
                   </h3>
                   <p className="font-sans text-brand-grey text-xs leading-relaxed line-clamp-2">
                      {post.excerpt}
                   </p>
                   <div className="flex items-center gap-2 font-mono text-[10px] text-white/40 uppercase tracking-widest group-hover:text-white transition-colors">
                      Read more <ArrowRight size={12} />
                   </div>
                </div>
             </Link>
           ))}
        </div>

        {/* Newsletter Interstitial Alternative */}
        <div className="mt-32 blueprint-border p-12 lg:p-20 bg-brand-carbon relative overflow-hidden group">
           <div className="blueprint-grid absolute inset-0 opacity-10 pointer-events-none" />
           <div className="absolute top-0 right-0 p-8">
              <span className="text-stroke font-display text-8xl opacity-10 pointer-events-none select-none">JOURNAL</span>
           </div>
           
           <div className="relative z-10 max-w-2xl">
              <h3 className="font-display text-4xl uppercase tracking-tighter mb-6">Stay integrated in the <br /><span className="text-brand-orange">build circle.</span></h3>
              <p className="font-sans text-brand-grey text-base mb-12">
                 Join 5,000+ engineers and self-builders receiving weekly technical protocols and conversion stories.
              </p>
              <form className="flex flex-col md:flex-row gap-4">
                 <input 
                   type="email" 
                   placeholder="Tactical Email Address"
                   className="flex-1 bg-brand-obsidian border border-brand-border px-8 py-4 font-mono text-xs uppercase tracking-widest focus:outline-none focus:border-brand-orange transition-colors"
                 />
                 <button className="px-12 py-4 bg-brand-orange text-white font-mono text-xs uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all">
                    Register Hub
                 </button>
              </form>
           </div>
        </div>
      </div>
    </div>
  );
}
