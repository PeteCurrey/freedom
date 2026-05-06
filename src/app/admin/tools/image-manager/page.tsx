"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Image as ImageIcon, 
  Search, 
  Plus, 
  Upload, 
  Link as LinkIcon, 
  Check, 
  X, 
  Loader2, 
  ChevronRight,
  AlertCircle,
  FileArchive,
  Grid
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function ImageManagerPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [importUrls, setImportUrls] = useState("");
  const [fetchedImages, setFetchedImages] = useState<string[]>([]);
  const [assigning, setAssigning] = useState<string | null>(null);

  useEffect(() => {
    fetchMissingImages();
  }, []);

  const fetchMissingImages = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("products")
      .select("id, name, brand, sku, images")
      .or("images.is.null,images.eq.'{}'")
      .order("created_at", { ascending: false });
    
    setProducts(data || []);
    setLoading(false);
  };

  const handleUrlFetch = () => {
    const urls = importUrls.split("\n").map(u => u.trim()).filter(u => u.startsWith("http"));
    setFetchedImages(prev => [...new Set([...prev, ...urls])]);
    setImportUrls("");
  };

  const assignImage = async (productId: string, imageUrl: string) => {
    setAssigning(productId);
    try {
      const { error } = await supabase
        .from("products")
        .update({ images: [imageUrl] })
        .eq("id", productId);
      
      if (error) throw error;
      
      // Update local state
      setProducts(prev => prev.filter(p => p.id !== productId));
    } catch (error) {
      console.error("Error assigning image:", error);
    } finally {
      setAssigning(null);
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.sku?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-[1600px] mx-auto px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="font-display text-5xl uppercase tracking-tighter text-gray-900">
            Bulk Image <span className="text-brand-orange">Manager</span>
          </h1>
          <p className="font-sans text-gray-500 mt-2">Efficiently assign photography to products missing media assets.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* LEFT: PRODUCTS LIST */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-gray-200 shadow-sm overflow-hidden flex flex-col h-[75vh]">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h3 className="font-display text-sm uppercase tracking-widest flex items-center gap-2">
                  <AlertCircle size={16} className="text-orange-500" /> Missing Images ({products.length})
                </h3>
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Search SKU or name..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 pr-4 py-2 border border-gray-200 text-[10px] uppercase font-mono bg-white outline-none focus:border-brand-orange w-48"
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
                {loading ? (
                  <div className="p-20 flex justify-center"><Loader2 className="animate-spin text-brand-orange" /></div>
                ) : filteredProducts.length === 0 ? (
                  <div className="p-20 text-center text-gray-300 font-mono text-[10px] uppercase tracking-widest">No products matching filters</div>
                ) : (
                  filteredProducts.map(p => (
                    <div key={p.id} className="p-4 flex items-center justify-between hover:bg-gray-50 group">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-300">
                          <ImageIcon size={18} />
                        </div>
                        <div>
                          <span className="block font-display text-xs uppercase text-gray-900 line-clamp-1">{p.name}</span>
                          <span className="block font-mono text-[8px] text-gray-400 uppercase tracking-widest">SKU: {p.sku || "N/A"} // {p.brand}</span>
                        </div>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <ChevronRight size={14} className="text-gray-300" />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* RIGHT: IMAGE SOURCE & PICKER */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* SOURCE: URL IMPORT */}
            <div className="bg-white border border-gray-200 p-8 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-display text-sm uppercase tracking-widest flex items-center gap-2">
                  <LinkIcon size={16} /> URL Import
                </h3>
                <span className="font-mono text-[9px] uppercase text-gray-400">Paste multiple image URLs (one per line)</span>
              </div>
              <textarea 
                value={importUrls}
                onChange={(e) => setImportUrls(e.target.value)}
                rows={4}
                className="w-full border border-gray-200 p-4 text-xs font-mono outline-none focus:border-brand-orange mb-4 bg-gray-50/30"
                placeholder="https://example.com/product-1.jpg&#10;https://example.com/product-2.png"
              />
              <button 
                onClick={handleUrlFetch}
                className="bg-brand-carbon text-white px-8 py-3 font-display text-[10px] uppercase tracking-widest hover:bg-brand-obsidian transition-all"
              >
                Fetch & Store Images
              </button>
            </div>

            {/* FETCHED IMAGES GRID */}
            <div className="bg-white border border-gray-200 p-8 shadow-sm min-h-[40vh]">
              <div className="flex justify-between items-center mb-8">
                <h3 className="font-display text-sm uppercase tracking-widest flex items-center gap-2">
                  <Grid size={16} /> Asset Library ({fetchedImages.length})
                </h3>
                <div className="flex gap-4">
                   <button className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-gray-400 hover:text-brand-orange transition-colors border border-gray-100 px-4 py-2">
                     <FileArchive size={14} /> ZIP Upload
                   </button>
                   <button className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-gray-400 hover:text-brand-orange transition-colors border border-gray-100 px-4 py-2">
                     <ImageIcon size={14} /> Auto-Match by SKU
                   </button>
                </div>
              </div>

              {fetchedImages.length === 0 ? (
                <div className="h-64 flex flex-col items-center justify-center text-gray-300 border-2 border-dashed border-gray-100">
                  <ImageIcon size={32} className="mb-4 opacity-50" />
                  <p className="font-mono text-[10px] uppercase tracking-widest">No assets loaded in current session</p>
                </div>
              ) : (
                <div className="grid grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6">
                  {fetchedImages.map((img, i) => (
                    <div key={i} className="aspect-square bg-gray-50 border border-gray-200 relative group overflow-hidden">
                      <img src={img} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                      
                      {/* ASSIGN OVERLAY */}
                      <div className="absolute inset-0 bg-brand-obsidian/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center">
                        <span className="font-mono text-[8px] uppercase tracking-tighter text-gray-400 mb-3">Assign to active product</span>
                        <div className="space-y-2 w-full">
                          {filteredProducts.slice(0, 3).map(p => (
                            <button 
                              key={p.id}
                              onClick={() => assignImage(p.id, img)}
                              disabled={assigning === p.id}
                              className="w-full bg-brand-orange text-white py-1.5 font-display text-[8px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all disabled:opacity-50"
                            >
                              {assigning === p.id ? "Assigning..." : p.name.split(' ')[0]}
                            </button>
                          ))}
                        </div>
                      </div>

                      <button 
                        onClick={() => setFetchedImages(prev => prev.filter((_, idx) => idx !== i))}
                        className="absolute top-1 right-1 w-6 h-6 bg-white shadow-md flex items-center justify-center text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
