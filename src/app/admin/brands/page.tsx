"use client";

import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Plus, Search, Edit2, Trash2, Globe, 
  MapPin, ShieldCheck, Tag, ExternalLink
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Brand {
  id: string;
  name: string;
  website?: string;
  logo?: string;
  country?: string;
  products_count: number;
  is_verified: boolean;
}

export default function AdminBrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBrand, setNewBrand] = useState({ name: "", website: "", country: "", logo: "" });

  useEffect(() => {
    async function fetchBrands() {
      setLoading(true);
      const { data } = await supabase
        .from('brands')
        .select('*, products(count)')
        .order('name');

      if (data) {
        setBrands(data.map(b => ({
          ...b,
          products_count: b.products?.[0]?.count || 0
        })) as Brand[]);
      }
      setLoading(false);
    }
    fetchBrands();
  }, []);

  const filteredBrands = useMemo(() => {
    return brands.filter(b => 
      b.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [brands, searchTerm]);

  const handleAddBrand = async () => {
    if (!newBrand.name) {
      alert("Brand name is required");
      return;
    }

    const slug = newBrand.name.toLowerCase().trim().replace(/ /g, "-").replace(/[^\w-]+/g, "");
    const brandToInsert = { ...newBrand, slug };

    try {
      const { data, error } = await supabase.from('brands').insert([brandToInsert]).select().single();
      
      if (error) {
        console.error("Failed to add brand:", error);
        alert(`Error: ${error.message || "Failed to create brand registry node"}`);
        return;
      }

      if (data) {
        setBrands(prev => [...prev, { ...data, products_count: 0 }].sort((a, b) => a.name.localeCompare(b.name)));
        setIsModalOpen(false);
        setNewBrand({ name: "", website: "", country: "", logo: "" });
      }
    } catch (err) {
      console.error("Unexpected error adding brand:", err);
      alert("An unexpected error occurred while saving the brand dossier.");
    }
  };

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="font-display text-4xl uppercase tracking-tighter text-slate-900">Brand Registry</h1>
          <p className="text-slate-500 text-sm mt-1">
            {brands.length} partner brands registered in the Amplios ecosystem
          </p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-8 py-3 bg-brand-orange text-white font-display text-[10px] uppercase tracking-widest hover:bg-slate-900 transition-all font-bold shadow-lg shadow-brand-orange/20 flex items-center gap-2"
        >
          <Plus size={16} /> Register Brand
        </button>
      </div>

      <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 group">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-orange transition-colors" />
          <input 
            type="text" 
            placeholder="Search brands..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/20 transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading ? (
          Array(8).fill(0).map((_, i) => (
            <div key={i} className="h-40 bg-slate-50 border border-slate-100 rounded-2xl animate-pulse" />
          ))
        ) : filteredBrands.map(brand => (
          <div key={brand.id} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-xl hover:border-brand-orange transition-all group relative overflow-hidden">
             <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-slate-300 font-display text-xl group-hover:bg-brand-orange group-hover:text-white transition-colors">
                   {brand.logo ? <img src={brand.logo} className="w-full h-full object-contain p-2" /> : brand.name.charAt(0)}
                </div>
                {brand.is_verified && <ShieldCheck size={16} className="text-emerald-500" />}
             </div>
             
             <h3 className="font-display text-xl uppercase tracking-tight text-slate-900 mb-1">{brand.name}</h3>
             <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-4">
                <MapPin size={10} /> {brand.country || 'Global'}
             </div>

             <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                <div className="flex flex-col">
                   <span className="text-xs font-bold text-slate-900">{brand.products_count}</span>
                   <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest">Products</span>
                </div>
                <div className="flex gap-2">
                   {brand.website && (
                     <a href={brand.website} target="_blank" className="p-2 text-slate-300 hover:text-brand-orange transition-colors">
                        <Globe size={14} />
                     </a>
                   )}
                   <button className="p-2 text-slate-300 hover:text-slate-900 transition-colors">
                      <Edit2 size={14} />
                   </button>
                </div>
             </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[200] flex items-center justify-center p-8 animate-in fade-in duration-300">
           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-10 animate-in zoom-in-95 duration-300">
              <div className="flex justify-between items-center mb-8">
                 <h3 className="font-display text-2xl uppercase tracking-tighter text-slate-900">Add New <span className="text-brand-orange">Brand</span></h3>
                 <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-900"><Plus size={24} className="rotate-45" /></button>
              </div>
              <div className="space-y-6">
                 <div>
                    <label className="block font-mono text-[10px] uppercase text-slate-400 mb-2">Brand Name</label>
                    <input 
                      type="text" 
                      value={newBrand.name}
                      onChange={e => setNewBrand({...newBrand, name: e.target.value})}
                      className="w-full border-2 border-slate-100 p-4 text-sm font-bold focus:border-brand-orange outline-none rounded-xl"
                    />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                       <label className="block font-mono text-[10px] uppercase text-slate-400 mb-2">Website</label>
                       <input 
                         type="text" 
                         value={newBrand.website}
                         onChange={e => setNewBrand({...newBrand, website: e.target.value})}
                         className="w-full border-2 border-slate-100 p-4 text-xs focus:border-brand-orange outline-none rounded-xl"
                         placeholder="https://..."
                       />
                    </div>
                    <div>
                       <label className="block font-mono text-[10px] uppercase text-slate-400 mb-2">Country</label>
                       <input 
                         type="text" 
                         value={newBrand.country}
                         onChange={e => setNewBrand({...newBrand, country: e.target.value})}
                         className="w-full border-2 border-slate-100 p-4 text-xs focus:border-brand-orange outline-none rounded-xl"
                         placeholder="e.g. Germany"
                       />
                    </div>
                 </div>
                 <button 
                   onClick={handleAddBrand}
                   className="w-full bg-slate-900 text-white py-5 rounded-xl font-display text-[10px] uppercase tracking-widest hover:bg-brand-orange transition-all font-bold mt-4"
                 >
                   Save Brand Dossier
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
