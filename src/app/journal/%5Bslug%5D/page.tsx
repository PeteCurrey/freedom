"use client";

import { useEffect, useState, use } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { 
  ArrowLeft, 
  Clock, 
  User, 
  Tag, 
  Share2, 
  ChevronRight,
  Monitor,
  Package
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MarkdownRenderer } from "@/components/journal/MarkdownRenderer";

export default function JournalPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      const { data } = await supabase
        .from('journal_posts')
        .select('*')
        .eq('slug', slug)
        .single();
      
      if (data) setPost(data);
      setLoading(false);
    }
    fetchPost();
  }, [slug]);

  if (loading) return (
     <div className="min-h-screen bg-brand-obsidian flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-t-2 border-brand-orange animate-spin rounded-full mb-8" />
        <span className="font-mono text-[10px] text-brand-grey uppercase tracking-widest">Accessing Editorial Intel</span>
     </div>
  );

  if (!post) return (
    <div className="min-h-screen bg-brand-obsidian pt-32 text-center pb-24">
       <h1 className="font-display text-4xl mb-4">Tactical Error: Post Not Found</h1>
       <Link href="/journal" className="text-brand-orange font-mono uppercase tracking-widest hover:underline">Return to Journal Hub</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-brand-obsidian pb-32">
      {/* Hero Section */}
      <div className="relative h-[80vh] overflow-hidden">
         <img 
           src={post.featured_image || "/images/hero-background.png"} 
           className="w-full h-full object-cover grayscale opacity-40 animate-pulse-slow"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian via-brand-obsidian/60 to-transparent" />
         
         <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
            <div className="container max-w-4xl mx-auto">
               <div className="flex items-center justify-center gap-4 mb-8">
                  <span className="px-3 py-1 bg-brand-orange/20 border border-brand-orange/40 text-brand-orange font-mono text-[10px] uppercase tracking-widest flex items-center gap-2">
                     <Tag size={10} /> {post.category}
                  </span>
                  <span className="font-mono text-[10px] text-brand-grey uppercase tracking-widest flex items-center gap-2">
                     <Clock size={12} /> {post.reading_time_minutes} min intel
                  </span>
               </div>
               <h1 className="font-display text-5xl md:text-8xl uppercase tracking-tighter text-white mb-8 leading-[0.9]">
                  {post.title}
               </h1>
               <div className="flex items-center justify-center gap-4 text-brand-grey">
                  <div className="flex items-center gap-2">
                     <div className="w-10 h-10 rounded-full border border-brand-orange/30 p-1">
                        <div className="w-full h-full bg-brand-carbon rounded-full flex items-center justify-center text-brand-orange">
                           <User size={14} />
                        </div>
                     </div>
                     <div className="text-left">
                        <span className="block font-display text-xs text-white uppercase">{post.author_name}</span>
                        <span className="block font-mono text-[8px] uppercase tracking-widest">{post.author_role}</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
            <ChevronRight size={24} className="rotate-90" />
         </div>
      </div>

      <div className="container mx-auto px-6 max-w-7xl pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Article Navigation Sidebar */}
          <div className="lg:col-span-1 hidden lg:block sticky top-32 h-fit">
             <div className="flex flex-col gap-8">
                <Link href="/journal" className="w-12 h-12 border border-brand-border flex items-center justify-center text-brand-grey hover:text-brand-orange hover:border-brand-orange transition-all group">
                   <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                </Link>
                <button className="w-12 h-12 border border-brand-border flex items-center justify-center text-brand-grey hover:text-brand-orange hover:border-brand-orange transition-all">
                   <Share2 size={18} />
                </button>
             </div>
          </div>

          {/* Main Article Content */}
          <article className="lg:col-span-7">
             <div className="mb-16">
                <p className="font-sans text-xl text-brand-grey italic leading-relaxed border-l-2 border-brand-orange pl-8">
                   {post.excerpt}
                </p>
             </div>
             
             <MarkdownRenderer content={post.content} />
             
             <div className="mt-24 pt-12 border-t border-brand-border">
                <div className="flex justify-between items-center">
                   <div className="font-mono text-[9px] text-brand-grey uppercase tracking-widest">
                      Intel Node ID: {post.id.substring(0, 8)} // Ver: 1.0
                   </div>
                   <div className="flex gap-4">
                      <button className="text-brand-grey hover:text-white transition-colors"><Share2 size={16} /></button>
                   </div>
                </div>
             </div>
          </article>

          {/* Contextual Technical Sidebar */}
          <aside className="lg:col-span-4 space-y-12 h-fit lg:sticky lg:top-32">
             {/* Related Resources */}
             <div className="blueprint-border p-8 bg-brand-carbon relative">
                <div className="blueprint-grid absolute inset-0 opacity-10 pointer-events-none" />
                <h3 className="font-display text-sm uppercase tracking-widest mb-8 border-b border-brand-border pb-4">
                   Tactical Resources
                </h3>
                <div className="space-y-6 relative z-10">
                   <Link href="/store" className="group flex items-center justify-between p-4 bg-brand-obsidian border border-brand-border hover:border-brand-orange transition-all">
                      <div className="flex items-center gap-4">
                         <Package size={16} className="text-brand-grey group-hover:text-brand-orange transition-colors" />
                         <span className="font-mono text-[10px] uppercase tracking-widest">Monster Store Hardware</span>
                      </div>
                      <ChevronRight size={14} className="text-brand-grey" />
                   </Link>
                   <Link href="/vehicles" className="group flex items-center justify-between p-4 bg-brand-obsidian border border-brand-border hover:border-brand-orange transition-all">
                      <div className="flex items-center gap-4">
                         <Monitor size={16} className="text-brand-grey group-hover:text-brand-orange transition-colors" />
                         <span className="font-mono text-[10px] uppercase tracking-widest">Base Vehicle Analysis</span>
                      </div>
                      <ChevronRight size={14} className="text-brand-grey" />
                   </Link>
                </div>
             </div>

             {/* Join the Network */}
             <div className="bg-brand-orange p-10 text-white">
                <h3 className="font-display text-2xl uppercase tracking-tighter mb-4">Never miss an engineering update.</h3>
                <p className="font-sans text-white/80 text-sm mb-8 leading-relaxed">
                   Get tactical build advice and product technical briefs delivered to your secure node weekly.
                </p>
                <Link href="#" className="block w-full text-center py-4 bg-white text-brand-orange font-mono text-[10px] uppercase tracking-widest font-bold hover:bg-brand-obsidian hover:text-white transition-all">
                   Register Signal
                </Link>
             </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
