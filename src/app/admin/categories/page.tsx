"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Layers, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Loader2, 
  ChevronRight,
  GripVertical,
  Eye,
  Settings,
  Zap,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newCategory, setNewCategory] = useState<{
    name: string;
    slug: string;
    description: string;
    parent_id: string | null;
  }>({
    name: "",
    slug: "",
    description: "",
    parent_id: null
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("product_categories")
      .select("*")
      .order("name", { ascending: true });
    
    setCategories(data || []);
    setLoading(false);
  };

  const handleAdd = async () => {
    if (!newCategory.slug) {
      newCategory.slug = newCategory.name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
    }
    
    try {
      const { error } = await supabase.from("product_categories").insert([newCategory]);
      if (error) throw error;
      fetchCategories();
      setIsAdding(false);
      setNewCategory({ name: "", slug: "", description: "", parent_id: null });
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-[1400px] mx-auto px-8 py-12">
        {/* Header */}
        <div className="mb-12 flex justify-between items-end">
          <div>
            <h1 className="font-display text-5xl uppercase tracking-tighter text-gray-900">
              Store <span className="text-brand-orange">Categories</span>
            </h1>
            <p className="font-sans text-gray-500 mt-2">Manage the product taxonomy, collections, and automated sorting logic.</p>
          </div>
          <button 
            onClick={() => setIsAdding(true)}
            className="bg-brand-orange text-white px-8 py-4 font-display text-[10px] uppercase tracking-widest hover:bg-orange-600 transition-all flex items-center gap-2 shadow-lg shadow-orange-100"
          >
            <Plus size={16} /> Create Category
          </button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
          
          {/* LEFT: HIERARCHY TREE */}
          <div className="xl:col-span-8">
            {isAdding && (
              <div className="bg-white border border-gray-200 p-8 shadow-md mb-8 animate-in slide-in-from-top-4 duration-300">
                <h2 className="font-display text-xl uppercase tracking-tight mb-8">Create New Category</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="block font-mono text-[9px] uppercase text-gray-400 mb-2">Category Name</label>
                    <input 
                      type="text" 
                      value={newCategory.name}
                      onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                      className="w-full border border-gray-200 p-3 text-xs outline-none focus:border-brand-orange"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[9px] uppercase text-gray-400 mb-2">Parent Category</label>
                    <select 
                      value={newCategory.parent_id || ""}
                      onChange={(e) => setNewCategory({...newCategory, parent_id: e.target.value || null})}
                      className="w-full border border-gray-200 p-3 text-xs outline-none focus:border-brand-orange"
                    >
                      <option value="">Root Category</option>
                      {categories.filter(c => !c.parent_id).map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block font-mono text-[9px] uppercase text-gray-400 mb-2">Description</label>
                    <textarea 
                      value={newCategory.description}
                      onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                      rows={3}
                      className="w-full border border-gray-200 p-3 text-xs outline-none focus:border-brand-orange resize-none"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-4">
                  <button onClick={() => setIsAdding(false)} className="px-8 py-3 font-display text-[10px] uppercase tracking-widest text-gray-400 hover:text-gray-600 transition-colors">Cancel</button>
                  <button onClick={handleAdd} className="bg-brand-carbon text-white px-8 py-3 font-display text-[10px] uppercase tracking-widest hover:bg-brand-obsidian transition-colors">Save Category</button>
                </div>
              </div>
            )}

            <div className="bg-white border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                <span className="font-mono text-[10px] uppercase tracking-widest text-gray-500">Active Taxonomy</span>
                <button className="text-gray-400 hover:text-gray-600 font-mono text-[10px] uppercase tracking-widest">Expand All</button>
              </div>
              
              <div className="divide-y divide-gray-50">
                {loading ? (
                  <div className="p-20 flex justify-center"><Loader2 className="animate-spin text-brand-orange" /></div>
                ) : categories.length === 0 ? (
                  <div className="p-20 text-center font-mono text-[10px] uppercase text-gray-300">No categories defined</div>
                ) : (
                  categories.map(c => (
                    <div key={c.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors group">
                      <div className="flex items-center gap-6">
                        <div className="text-gray-200 group-hover:text-gray-400 transition-colors cursor-grab active:cursor-grabbing">
                          <GripVertical size={16} />
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400">
                            <Layers size={18} />
                          </div>
                          <div>
                            <h3 className="font-display text-sm uppercase text-gray-900">{c.name}</h3>
                            <span className="font-mono text-[9px] text-gray-400 uppercase tracking-widest">/{c.slug}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 border border-gray-100 rounded-full">
                          <span className="font-mono text-[9px] uppercase text-gray-400">Products: <span className="text-gray-900 font-bold">12</span></span>
                        </div>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Link href={`/store/${c.slug}`} target="_blank" className="p-2 text-gray-400 hover:text-brand-orange transition-colors"><Eye size={16} /></Link>
                          <button className="p-2 text-gray-400 hover:text-brand-orange transition-colors"><Edit3 size={16} /></button>
                          <button className="p-2 text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* RIGHT: AUTO-COLLECTIONS & LOGIC */}
          <div className="xl:col-span-4 space-y-8">
            <div className="bg-white border border-gray-200 p-8 shadow-sm">
              <h3 className="font-display text-sm uppercase tracking-widest mb-6 flex items-center gap-2">
                <Zap size={16} className="text-brand-orange" /> Smart Collections
              </h3>
              <p className="font-sans text-xs text-gray-500 mb-8 leading-relaxed">Create dynamic collections that automatically update based on product tags, brands, or pricing rules.</p>
              
              <div className="space-y-4">
                {[
                  { name: "New Arrivals", rule: "Created within 30 days", count: 8 },
                  { name: "Off-Grid Power", rule: "Tag = 'off-grid'", count: 24 },
                  { name: "Winter Ready", rule: "Tag = 'heating'", count: 12 }
                ].map(coll => (
                  <div key={coll.name} className="p-4 bg-gray-50 border border-gray-100 flex items-center justify-between hover:border-brand-orange transition-all cursor-pointer group">
                    <div>
                      <span className="block font-display text-xs uppercase text-gray-900">{coll.name}</span>
                      <span className="block font-mono text-[8px] text-gray-400 uppercase tracking-widest mt-1">{coll.rule}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[10px] text-gray-400">{coll.count}</span>
                      <ChevronRight size={14} className="text-gray-200 group-hover:text-brand-orange" />
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-8 py-3 border border-dashed border-gray-200 text-gray-400 font-mono text-[10px] uppercase tracking-widest hover:border-brand-orange hover:text-brand-orange transition-all">
                Create Smart Rule
              </button>
            </div>

            <div className="bg-brand-carbon text-white p-8 shadow-lg">
              <h3 className="font-display text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
                <Settings size={16} className="text-brand-orange" /> Taxonomy Tools
              </h3>
              <div className="space-y-4">
                <button className="w-full flex items-center justify-between p-4 bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-left">
                  <span className="font-mono text-[9px] uppercase tracking-widest">Rebuild URL Slugs</span>
                  <ArrowRight size={14} className="text-brand-orange" />
                </button>
                <button className="w-full flex items-center justify-between p-4 bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-left">
                  <span className="font-mono text-[9px] uppercase tracking-widest">Sync Product Counts</span>
                  <ArrowRight size={14} className="text-brand-orange" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
