"use client";

import { useEffect, useState, use } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  Image as ImageIcon, 
  Settings, 
  FileText,
  Clock,
  User,
  Globe,
  Tag
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [post, setPost] = useState<any>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    featured_image: "",
    category: "Technical Guide",
    status: "draft",
    author_name: "Pete Currey",
    reading_time_minutes: 5,
    seo_title: "",
    seo_description: ""
  });

  useEffect(() => {
    async function fetchPost() {
      if (id === 'new') {
        setLoading(false);
        return;
      }
      const { data } = await supabase
        .from('journal_posts')
        .select('*')
        .eq('id', id)
        .single();
      
      if (data) {
        setPost(data);
      }
      setLoading(false);
    }
    fetchPost();
  }, [id]);

  const handleSave = async () => {
    setSaving(true);
    
    // Auto-generate slug if missing
    if (!post.slug && post.title) {
       post.slug = post.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    }

    const payload = {
      ...post,
      updated_at: new Date().toISOString(),
      published_at: post.status === 'published' && !post.published_at ? new Date().toISOString() : post.published_at
    };

    let error;
    if (id === 'new') {
       const { error: err } = await supabase.from('journal_posts').insert([payload]);
       error = err;
    } else {
       const { error: err } = await supabase.from('journal_posts').update(payload).eq('id', id);
       error = err;
    }

    setSaving(false);
    if (!error) {
      router.push("/admin/journal");
    } else {
      alert("Error saving post: " + error.message);
    }
  };

  if (loading) return null;

  return (
    <div className="p-8 pb-32 bg-brand-obsidian min-h-screen text-brand-white">
      <div className="max-w-6xl mx-auto">
        {/* Top Navigation */}
        <div className="flex justify-between items-center mb-12">
          <Link href="/admin/journal" className="flex items-center gap-2 font-mono text-[10px] text-brand-orange uppercase tracking-[0.3em] hover:text-brand-white transition-colors">
            <ArrowLeft size={12} /> Return to Hub
          </Link>
          <div className="flex gap-4">
             <button className="flex items-center gap-2 px-6 py-2 border border-brand-border font-mono text-[10px] uppercase tracking-widest text-brand-grey hover:border-white hover:text-brand-white transition-all">
                <Eye size={14} /> Preview
             </button>
             <button 
               onClick={handleSave}
               disabled={saving}
               className="flex items-center gap-2 px-8 py-2 bg-brand-orange text-brand-white font-mono text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all"
             >
                {saving ? "Deploying..." : <><Save size={14} /> Sync Node</>}
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-2">
               <label className="font-mono text-[10px] text-brand-grey uppercase tracking-widest">Article Headline</label>
               <input 
                 type="text" 
                 value={post.title}
                 onChange={(e) => setPost({ ...post, title: e.target.value })}
                 className="w-full bg-transparent border-b border-brand-border py-4 font-display text-4xl uppercase tracking-tighter outline-none focus:border-brand-orange transition-colors"
                 placeholder="The Engineering of Freedom..."
               />
            </div>

            <div className="space-y-2">
               <label className="font-mono text-[10px] text-brand-grey uppercase tracking-widest">Quick Brief (Excerpt)</label>
               <textarea 
                 value={post.excerpt}
                 onChange={(e) => setPost({ ...post, excerpt: e.target.value })}
                 className="w-full bg-brand-carbon border border-brand-border p-4 font-sans text-sm text-brand-grey outline-none focus:border-brand-orange h-24"
                 placeholder="A cinematic overview of the build philosophy..."
               />
            </div>

            <div className="space-y-4">
               <div className="flex justify-between items-end">
                  <label className="font-mono text-[10px] text-brand-grey uppercase tracking-widest flex items-center gap-2">
                     <FileText size={12} className="text-brand-orange" /> Main Intel (Content)
                  </label>
                  <span className="font-mono text-[8px] text-brand-grey uppercase">Supports Markdown Patterns</span>
               </div>
               <textarea 
                 value={post.content}
                 onChange={(e) => setPost({ ...post, content: e.target.value })}
                 className="w-full bg-brand-carbon border border-brand-border p-8 font-mono text-xs leading-relaxed text-brand-white outline-none focus:border-brand-orange h-[600px] custom-scrollbar"
                 placeholder="# Start your tactical analysis here..."
               />
            </div>
          </div>

          {/* Sidebar Settings Area */}
          <div className="space-y-8">
             {/* Publishing Panel */}
             <div className="blueprint-border p-6 bg-brand-carbon relative">
                <div className="blueprint-grid absolute inset-0 opacity-10 pointer-events-none" />
                <h3 className="relative z-10 font-display text-sm uppercase tracking-widest mb-6 flex items-center gap-2">
                   <Settings size={14} className="text-brand-orange" /> Publishing Controls
                </h3>
                
                <div className="relative z-10 space-y-6">
                   <div className="space-y-2">
                      <label className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest">Operational Status</label>
                      <select 
                        value={post.status}
                        onChange={(e) => setPost({ ...post, status: e.target.value })}
                        className="w-full bg-brand-obsidian border border-brand-border p-3 font-mono text-[10px] uppercase text-brand-white outline-none focus:border-brand-orange"
                      >
                         <option value="draft">Draft Protocol</option>
                         <option value="published">Active Deployment</option>
                         <option value="archived">Archived Node</option>
                      </select>
                   </div>

                   <div className="space-y-2">
                      <label className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest">Taxonomy Category</label>
                      <input 
                        type="text" 
                        value={post.category}
                        onChange={(e) => setPost({ ...post, category: e.target.value })}
                        className="w-full bg-brand-obsidian border border-brand-border p-3 font-mono text-[10px] uppercase text-brand-white outline-none focus:border-brand-orange"
                      />
                   </div>

                   <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                         <label className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest">Author</label>
                         <div className="flex items-center gap-2 p-3 bg-brand-obsidian border border-brand-border text-brand-grey font-mono text-[10px]">
                            <User size={12} /> PMB
                         </div>
                      </div>
                      <div className="space-y-2">
                         <label className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest">Time Est (Min)</label>
                         <input 
                           type="number" 
                           value={post.reading_time_minutes}
                           onChange={(e) => setPost({ ...post, reading_time_minutes: parseInt(e.target.value) })}
                           className="w-full bg-brand-obsidian border border-brand-border p-3 font-mono text-[10px] uppercase text-brand-white outline-none focus:border-brand-orange"
                         />
                      </div>
                   </div>
                </div>
             </div>

             {/* SEO Deployment Panel */}
             <div className="blueprint-border p-6 bg-brand-carbon">
                <h3 className="font-display text-sm uppercase tracking-widest mb-6 flex items-center gap-2">
                   <Globe size={14} className="text-brand-orange" /> Search Engine Optimization
                </h3>
                
                <div className="space-y-6">
                   <div className="space-y-2">
                      <label className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest">Resource Slug</label>
                      <input 
                        type="text" 
                        value={post.slug}
                        onChange={(e) => setPost({ ...post, slug: e.target.value })}
                        className="w-full bg-brand-obsidian border border-brand-border p-3 font-mono text-[10px] text-brand-orange outline-none focus:border-brand-orange"
                      />
                   </div>

                   <div className="space-y-2">
                      <label className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest">Meta Title Template</label>
                      <input 
                        type="text" 
                        value={post.seo_title}
                        onChange={(e) => setPost({ ...post, seo_title: e.target.value })}
                        className="w-full bg-brand-obsidian border border-brand-border p-3 font-sans text-xs text-brand-grey outline-none focus:border-brand-orange"
                        placeholder="Amplios // Article Title"
                      />
                   </div>

                   <div className="space-y-2">
                      <label className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest">Meta Description</label>
                      <textarea 
                        value={post.seo_description}
                        onChange={(e) => setPost({ ...post, seo_description: e.target.value })}
                        className="w-full bg-brand-obsidian border border-brand-border p-3 font-sans text-xs text-brand-grey outline-none focus:border-brand-orange h-24"
                      />
                   </div>
                </div>
             </div>

             {/* Cinematic Assets */}
             <div className="blueprint-border p-6 bg-brand-carbon">
                <h3 className="font-display text-sm uppercase tracking-widest mb-6 flex items-center gap-2">
                   <ImageIcon size={14} className="text-brand-orange" /> Cinematic Assets
                </h3>
                
                <div className="space-y-4">
                   <div className="aspect-video bg-brand-obsidian border border-brand-border overflow-hidden relative group">
                      {post.featured_image ? (
                         <img src={post.featured_image} className="w-full h-full object-cover" />
                      ) : (
                         <div className="absolute inset-0 flex items-center justify-center text-brand-grey/20">
                            <ImageIcon size={48} />
                         </div>
                      )}
                      <div className="absolute inset-0 bg-brand-obsidian/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                         <button className="px-4 py-2 border border-white font-mono text-[8px] uppercase tracking-widest">Replace Asset</button>
                      </div>
                   </div>
                   <input 
                     type="text" 
                     value={post.featured_image}
                     onChange={(e) => setPost({ ...post, featured_image: e.target.value })}
                     className="w-full bg-brand-obsidian border border-brand-border p-3 font-mono text-[8px] text-brand-grey outline-none focus:border-brand-orange"
                     placeholder="/images/hero-background.png"
                   />
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
