"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Save,
  RefreshCw,
  FolderOpen
} from "lucide-react";

export default function ManageCategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newCat, setNewCat] = useState({ name: "", slug: "", description: "" });

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    const { data } = await supabase
      .from('product_categories')
      .select('*')
      .order('name');
    setCategories(data || []);
    setLoading(false);
  }

  const handleAdd = async () => {
    if (!newCat.name || !newCat.slug) return;
    setSaving(true);
    const { error } = await supabase.from('product_categories').insert([newCat]);
    if (!error) {
       setNewCat({ name: "", slug: "", description: "" });
       await fetchCategories();
    } else {
       console.error(error);
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure? This may orphan products.")) return;
    await supabase.from('product_categories').delete().eq('id', id);
    fetchCategories();
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <Link href="/admin/store" className="flex items-center gap-2 font-mono text-[10px] text-brand-orange uppercase tracking-[0.3em] mb-4 hover:text-white transition-colors">
            <ArrowLeft size={12} /> Back to Store Manager
          </Link>
          <h1 className="font-display text-5xl uppercase tracking-tighter text-white">
            Manage <span className="text-brand-orange">Categories</span>
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* List Categories */}
        <div className="lg:col-span-2">
           <div className="blueprint-border bg-brand-carbon overflow-hidden">
             <div className="p-6 bg-brand-obsidian border-b border-brand-border flex items-center gap-3">
               <FolderOpen className="text-brand-orange" size={20} />
               <h2 className="font-display text-xl uppercase tracking-widest text-white">Active Classifications</h2>
             </div>
             {categories.length === 0 && !loading && (
                <div className="p-12 text-center text-brand-grey font-mono text-[10px] uppercase tracking-widest">
                   No categories found.
                </div>
             )}
             <div className="divide-y divide-brand-border/50">
               {categories.map((cat) => (
                 <div key={cat.id} className="p-6 flex items-center justify-between group hover:bg-brand-obsidian transition-colors">
                   <div>
                     <span className="block font-display text-xl uppercase text-white mb-1">{cat.name}</span>
                     <span className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest">Slug: {cat.slug}</span>
                     <span className="block font-sans text-xs text-brand-grey mt-2">{cat.description}</span>
                   </div>
                   <button 
                     onClick={() => handleDelete(cat.id)}
                     className="text-brand-grey hover:text-red-500 transition-colors p-2"
                   >
                     <Trash2 size={18} />
                   </button>
                 </div>
               ))}
             </div>
           </div>
        </div>

        {/* Add Category */}
        <div className="lg:col-span-1">
           <div className="blueprint-border p-8 bg-brand-carbon sticky top-32">
             <h2 className="font-display text-xl uppercase tracking-widest text-white mb-8 border-b border-brand-border pb-4">Create New Category</h2>
             
             <div className="space-y-6">
                <div>
                   <label className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-2">Category Name</label>
                   <input 
                     type="text" 
                     value={newCat.name}
                     onChange={(e) => {
                       const name = e.target.value;
                       const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                       setNewCat({ ...newCat, name, slug });
                     }}
                     className="w-full bg-brand-obsidian border border-brand-border p-4 font-sans text-sm text-white focus:border-brand-orange outline-none transition-colors"
                     placeholder="e.g. Electrical Components"
                   />
                </div>
                <div>
                   <label className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-2">URL Slug</label>
                   <input 
                     type="text" 
                     value={newCat.slug}
                     onChange={(e) => setNewCat({ ...newCat, slug: e.target.value })}
                     className="w-full bg-brand-obsidian border border-brand-border p-4 font-sans text-sm text-brand-grey focus:border-brand-orange outline-none transition-colors"
                     placeholder="e.g. electrical-components"
                   />
                </div>
                <div>
                   <label className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-2">Description</label>
                   <textarea 
                     value={newCat.description}
                     onChange={(e) => setNewCat({ ...newCat, description: e.target.value })}
                     className="w-full bg-brand-obsidian border border-brand-border p-4 font-sans text-sm text-white focus:border-brand-orange outline-none transition-colors min-h-[100px]"
                     placeholder="Short category description..."
                   />
                </div>
                
                <button 
                  onClick={handleAdd}
                  disabled={saving || !newCat.name}
                  className="w-full py-4 bg-brand-orange text-white font-mono text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {saving ? <RefreshCw className="animate-spin" size={14} /> : <Plus size={14} />} 
                  {saving ? "Saving..." : "Add Category"}
                </button>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
