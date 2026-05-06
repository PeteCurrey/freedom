"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Tag, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Loader2, 
  ExternalLink,
  Globe,
  MapPin,
  LayoutGrid,
  MoreVertical
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function BrandsPage() {
  const [brands, setBrands] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [newBrand, setNewBrand] = useState({
    name: "",
    slug: "",
    country_of_origin: "",
    website_url: "",
    description: ""
  });

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("brands")
      .select("*")
      .order("name", { ascending: true });
    
    setBrands(data || []);
    setLoading(false);
  };

  const handleAdd = async () => {
    if (!newBrand.slug) {
      newBrand.slug = newBrand.name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
    }
    
    try {
      const { error } = await supabase.from("brands").insert([newBrand]);
      if (error) throw error;
      fetchBrands();
      setIsAdding(false);
      setNewBrand({ name: "", slug: "", country_of_origin: "", website_url: "", description: "" });
    } catch (error) {
      console.error("Error adding brand:", error);
    }
  };

  const filteredBrands = brands.filter(b => 
    b.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    b.country_of_origin?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-[1400px] mx-auto px-8 py-12">
        {/* Header */}
        <div className="mb-12 flex justify-between items-end">
          <div>
            <h1 className="font-display text-5xl uppercase tracking-tighter text-gray-900">
              Brand <span className="text-brand-orange">Directory</span>
            </h1>
            <p className="font-sans text-gray-500 mt-2">Manage manufacturer relationships and brand identities within the catalogue.</p>
          </div>
          <button 
            onClick={() => setIsAdding(true)}
            className="bg-brand-orange text-white px-8 py-4 font-display text-[10px] uppercase tracking-widest hover:bg-orange-600 transition-all flex items-center gap-2 shadow-lg shadow-orange-100"
          >
            <Plus size={16} /> Register Brand
          </button>
        </div>

        {/* Toolbar */}
        <div className="bg-white border border-gray-200 p-4 mb-8 flex justify-between items-center shadow-sm">
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
            <input 
              type="text" 
              placeholder="Search by brand name or country..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-100 font-mono text-[11px] uppercase outline-none focus:border-brand-orange bg-gray-50/50"
            />
          </div>
        </div>

        {isAdding && (
          <div className="bg-white border border-gray-200 p-8 shadow-md mb-12 animate-in slide-in-from-top-4 duration-300">
            <h2 className="font-display text-xl uppercase tracking-tight mb-8">Register Brand</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div>
                <label className="block font-mono text-[9px] uppercase text-gray-400 mb-2">Brand Name</label>
                <input 
                  type="text" 
                  value={newBrand.name}
                  onChange={(e) => setNewBrand({...newBrand, name: e.target.value})}
                  className="w-full border border-gray-200 p-3 text-xs outline-none focus:border-brand-orange"
                />
              </div>
              <div>
                <label className="block font-mono text-[9px] uppercase text-gray-400 mb-2">Country of Origin</label>
                <input 
                  type="text" 
                  value={newBrand.country_of_origin}
                  onChange={(e) => setNewBrand({...newBrand, country_of_origin: e.target.value})}
                  className="w-full border border-gray-200 p-3 text-xs outline-none focus:border-brand-orange"
                />
              </div>
              <div>
                <label className="block font-mono text-[9px] uppercase text-gray-400 mb-2">Official Website</label>
                <input 
                  type="text" 
                  value={newBrand.website_url}
                  onChange={(e) => setNewBrand({...newBrand, website_url: e.target.value})}
                  className="w-full border border-gray-200 p-3 text-xs outline-none focus:border-brand-orange"
                />
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <button onClick={() => setIsAdding(false)} className="px-8 py-3 font-display text-[10px] uppercase tracking-widest text-gray-400 hover:text-gray-600 transition-colors">Cancel</button>
              <button onClick={handleAdd} className="bg-brand-carbon text-white px-8 py-3 font-display text-[10px] uppercase tracking-widest hover:bg-brand-obsidian transition-colors">Save Brand</button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading ? (
            <div className="col-span-full py-20 flex justify-center"><Loader2 className="animate-spin text-brand-orange" /></div>
          ) : filteredBrands.map(b => (
            <div key={b.id} className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all group overflow-hidden">
              <div className="aspect-[3/2] bg-gray-50 border-b border-gray-100 flex items-center justify-center p-12 grayscale group-hover:grayscale-0 transition-all">
                {b.logo_url ? (
                  <img src={b.logo_url} className="max-w-full max-h-full object-contain" />
                ) : (
                  <Tag size={40} className="text-gray-200" />
                )}
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-display text-lg uppercase tracking-tight text-gray-900 line-clamp-1">{b.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <MapPin size={10} className="text-gray-400" />
                      <span className="font-mono text-[9px] uppercase tracking-widest text-gray-400">{b.country_of_origin || "Global"}</span>
                    </div>
                  </div>
                  <button className="text-gray-300 hover:text-gray-600 transition-colors"><MoreVertical size={16} /></button>
                </div>

                <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-50">
                   <div className="flex items-center gap-2">
                     <LayoutGrid size={12} className="text-brand-orange" />
                     <span className="font-mono text-[9px] uppercase tracking-widest text-gray-500">12 Products</span>
                   </div>
                   <a href={b.website_url} target="_blank" className="p-2 border border-gray-100 text-gray-400 hover:text-brand-orange transition-colors">
                     <Globe size={14} />
                   </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
