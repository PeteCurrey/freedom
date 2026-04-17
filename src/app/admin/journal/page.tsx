"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { 
  FileText, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Eye, 
  Clock,
  User,
  Filter,
  CheckCircle2,
  FileEdit,
  Archive
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function JournalAdminPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    async function fetchPosts() {
      let query = supabase.from('journal_posts').select('*').order('created_at', { ascending: false });
      
      if (filter !== 'all') {
        query = query.eq('status', filter);
      }

      const { data } = await query;
      setPosts(data || []);
      setLoading(false);
    }
    fetchPosts();
  }, [filter]);

  const deletePost = async (id: string) => {
    const confirm = window.confirm("Tactical Alert: Confirm deletion of this editorial node?");
    if (!confirm) return;

    const { error } = await supabase.from('journal_posts').delete().eq('id', id);
    if (!error) {
       setPosts(posts.filter(p => p.id !== id));
    }
  };

  if (loading) return null;

  return (
    <div className="p-8 pb-32">
      {/* Header */}
      <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <div className="flex items-center gap-2 font-mono text-[10px] text-brand-orange uppercase tracking-[0.3em] mb-4">
            <FileText size={12} /> Editorial Hub: journal.alpha
          </div>
          <h1 className="font-display text-5xl uppercase tracking-tighter text-white">
            Amplios <span className="text-brand-orange">Journal</span>
          </h1>
        </div>
        
        <div className="flex gap-4">
           <Link 
             href="/admin/journal/new"
             className="px-8 py-4 bg-brand-orange text-white font-mono text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all flex items-center gap-2"
           >
             <Plus size={14} /> New Article
           </Link>
        </div>
      </div>

      {/* Stats Quick Look */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
        {[
          { label: "Published", count: posts.filter(p => p.status === 'published').length, icon: CheckCircle2, color: "text-green-500" },
          { label: "Drafts", count: posts.filter(p => p.status === 'draft').length, icon: FileEdit, color: "text-brand-orange" },
          { label: "Archived", count: posts.filter(p => p.status === 'archived').length, icon: Archive, color: "text-brand-grey" },
          { label: "Total Articles", count: posts.length, icon: FileText, color: "text-white" },
        ].map((stat, i) => (
          <div key={i} className="blueprint-border p-4 bg-brand-carbon flex items-center justify-between">
            <div>
              <span className="block font-mono text-[8px] text-brand-grey uppercase tracking-widest mb-1">{stat.label}</span>
              <span className="font-display text-xl">{stat.count}</span>
            </div>
            <stat.icon className={cn("w-5 h-5 opacity-20", stat.color)} />
          </div>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
         {["all", "published", "draft", "archived"].map((st) => (
           <button
             key={st}
             onClick={() => setFilter(st)}
             className={cn(
               "px-4 py-2 font-mono text-[10px] uppercase tracking-widest border transition-all whitespace-nowrap",
               filter === st ? "bg-brand-orange border-brand-orange text-white" : "border-brand-border text-brand-grey hover:border-brand-grey"
             )}
           >
             {st}
           </button>
         ))}
      </div>

      {/* Posts Table */}
      <div className="blueprint-border bg-brand-carbon overflow-hidden">
        <table className="w-full text-left">
           <thead>
              <tr className="bg-brand-obsidian border-b border-brand-border font-mono text-[10px] uppercase tracking-widest text-brand-grey">
                 <th className="p-6">Article Integrity</th>
                 <th className="p-6">Author / Category</th>
                 <th className="p-6">Stats</th>
                 <th className="p-6">Status</th>
                 <th className="p-6 text-right">Actions</th>
              </tr>
           </thead>
           <tbody className="font-sans text-xs">
              {posts.map((post) => (
                <tr key={post.id} className="border-b border-brand-border/50 hover:bg-brand-obsidian transition-colors group">
                   <td className="p-6">
                      <div className="flex flex-col">
                        <span className="font-display text-sm uppercase text-white mb-1 group-hover:text-brand-orange transition-colors">{post.title}</span>
                        <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest italic">{post.slug}</span>
                      </div>
                   </td>
                   <td className="p-6">
                      <div className="flex items-center gap-2 text-white mb-1">
                        <User size={12} className="text-brand-orange" />
                        <span className="font-medium">{post.author_name}</span>
                      </div>
                      <span className="px-2 py-0.5 border border-brand-border font-mono text-[8px] text-brand-grey uppercase tracking-widest">{post.category}</span>
                   </td>
                   <td className="p-6 font-mono text-[10px] text-brand-grey uppercase tracking-widest">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                           <Clock size={12} /> {post.reading_time_minutes}m
                        </div>
                      </div>
                   </td>
                   <td className="p-6">
                      <span className={cn(
                        "px-2 py-1 border font-mono text-[8px] uppercase tracking-widest flex w-fit items-center gap-2",
                        post.status === 'published' ? "text-green-500 border-green-500/30 bg-green-500/5" : 
                        post.status === 'draft' ? "text-brand-orange border-brand-orange/30 bg-brand-orange/5" : 
                        "text-brand-grey border-brand-border"
                      )}>
                        <span className={cn("w-1 h-1 rounded-full", post.status === 'published' ? "bg-green-500" : "bg-brand-orange")} />
                        {post.status}
                      </span>
                   </td>
                   <td className="p-6 text-right">
                      <div className="flex justify-end gap-3 text-brand-grey opacity-0 group-hover:opacity-100 transition-opacity">
                         <Link href={`/journal/${post.slug}`} target="_blank" className="hover:text-brand-orange transition-colors"><Eye size={16} /></Link>
                         <Link href={`/admin/journal/${post.id}`} className="hover:text-white transition-colors"><Edit3 size={16} /></Link>
                         <button 
                           onClick={() => deletePost(post.id)}
                           className="hover:text-red-500 transition-colors"
                         >
                           <Trash2 size={16} />
                         </button>
                      </div>
                   </td>
                </tr>
              ))}
              {posts.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-12 text-center font-mono text-[10px] text-brand-grey uppercase">No journal entries found in this sector.</td>
                </tr>
              )}
           </tbody>
        </table>
      </div>
    </div>
  );
}
