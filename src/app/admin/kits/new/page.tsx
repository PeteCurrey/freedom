"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { 
  ArrowLeft, Search, Plus, Minus, Trash2, 
  Save, CheckCircle2, Box, Info, Image as ImageIcon,
  Tag, Package
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  sku: string;
  price_gbp: number;
  stock_quantity: number;
  image_url: string;
}

interface KitItem extends Product {
  quantity: number;
}

export default function KitDesignerNew() {
  const router = useRouter();
  
  // Kit Metadata
  const [kitName, setKitName] = useState("");
  const [kitSlug, setKitSlug] = useState("");
  const [description, setDescription] = useState("");
  const [kitPriceGbp, setKitPriceGbp] = useState<number | "">("");
  const [status, setStatus] = useState<'draft' | 'active'>('draft');
  const [imageUrl, setImageUrl] = useState("");
  
  // Component Bundler
  const [searchTerm, setSearchTerm] = useState("");
  const [availableProducts, setAvailableProducts] = useState<Product[]>([]);
  const [selectedItems, setSelectedItems] = useState<KitItem[]>([]);
  
  // UI State
  const [loading, setLoading] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  // Fetch available products
  useEffect(() => {
    async function fetchProducts() {
      const { data } = await supabase
        .from('products')
        .select('id, name, slug, price_gbp, stock_quantity, image_url')
        .eq('is_active', true);
        
      if (data) {
        setAvailableProducts(data.map(d => ({
          id: d.id,
          name: d.name,
          sku: d.slug, // Using slug as SKU for mockup
          price_gbp: d.price_gbp,
          stock_quantity: d.stock_quantity || 0,
          image_url: d.image_url || ""
        })));
      }
    }
    fetchProducts();
  }, []);

  // Generate slug from name
  useEffect(() => {
    if (!kitSlug && kitName) {
      setKitSlug(kitName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
    }
  }, [kitName]);

  // Derived Financials
  const retailTotal = selectedItems.reduce((acc, item) => acc + (item.price_gbp * item.quantity), 0);
  const currentKitPrice = typeof kitPriceGbp === 'number' ? kitPriceGbp : 0;
  const savingsGbp = retailTotal > 0 && currentKitPrice > 0 ? (retailTotal - currentKitPrice) : 0;
  const savingsPercent = retailTotal > 0 && currentKitPrice > 0 ? (savingsGbp / retailTotal) * 100 : 0;

  const filteredProducts = useMemo(() => {
    if (!searchTerm) return [];
    return availableProducts.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      p.sku.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 5); // Limit suggestions
  }, [availableProducts, searchTerm]);

  const handleAddItem = (product: Product) => {
    setSelectedItems(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setSearchTerm("");
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setSelectedItems(prev => prev.map(i => {
      if (i.id === id) {
        const newQ = Math.max(1, i.quantity + delta);
        return { ...i, quantity: newQ };
      }
      return i;
    }));
  };

  const handleRemoveItem = (id: string) => {
    setSelectedItems(prev => prev.filter(i => i.id !== id));
  };

  const handleSave = async (publish: boolean) => {
    if (!kitName || !kitSlug) return alert("Name and Slug are required.");
    if (selectedItems.length === 0) return alert("You must add at least one component.");
    
    setLoading(true);
    const finalStatus = publish ? 'active' : 'draft';

    const { data: kitData, error: kitError } = await supabase
      .from('build_kits')
      .insert({
        name: kitName,
        slug: kitSlug,
        description: description,
        kit_price_gbp: currentKitPrice,
        retail_total_gbp: retailTotal,
        status: finalStatus,
        image: imageUrl,
        items_count: selectedItems.reduce((acc, i) => acc + i.quantity, 0)
      })
      .select()
      .single();

    if (kitError) {
      alert("Error saving kit: " + kitError.message);
      setLoading(false);
      return;
    }

    // In a real implementation, you would also save to `build_kit_items` table here
    // using kitData.id and the selectedItems array.
    
    setLoading(false);
    router.push("/admin/kits");
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 pb-32">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200">
        <div className="flex items-center gap-4">
          <Link href="/admin/kits" className="w-10 h-10 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-slate-500 hover:text-brand-orange hover:border-brand-orange/30 transition-all">
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="font-display text-3xl uppercase tracking-tighter text-slate-900">Kit Designer</h1>
            <p className="font-mono text-[10px] text-slate-500 uppercase tracking-widest mt-1">Configure New Bundle</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => handleSave(false)}
            disabled={loading}
            className="px-6 py-3 bg-white border border-slate-200 text-slate-700 font-mono text-[10px] uppercase tracking-widest hover:bg-slate-50 font-bold rounded-lg transition-all"
          >
            Save Draft
          </button>
          <button 
            onClick={() => handleSave(true)}
            disabled={loading}
            className="px-8 py-3 bg-brand-orange text-white font-mono text-[10px] uppercase tracking-widest hover:bg-slate-900 font-bold rounded-lg shadow-lg shadow-brand-orange/20 transition-all flex items-center gap-2"
          >
            {loading ? "Processing..." : <><CheckCircle2 size={14} /> Publish Kit</>}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* LEFT PANE: METADATA */}
        <div className="xl:col-span-5 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
            <h2 className="font-display text-lg uppercase tracking-widest text-slate-900 mb-6 flex items-center gap-2">
              <Box size={18} className="text-brand-orange" /> Kit Identity
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block font-mono text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Display Name</label>
                <input 
                  type="text" 
                  value={kitName}
                  onChange={(e) => setKitName(e.target.value)}
                  placeholder="e.g. Full Autonomy Electrical Tier"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange/20 font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center justify-between">
                  <span>URL Slug</span>
                  <span className="text-slate-400 font-normal">Auto-generated</span>
                </label>
                <input 
                  type="text" 
                  value={kitSlug}
                  onChange={(e) => setKitSlug(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange/20 font-mono text-sm text-slate-600"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Short Description</label>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange/20 text-sm text-slate-600 resize-none"
                  placeholder="Describe the purpose and target audience for this kit..."
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Cover Image URL</label>
                <div className="flex gap-4">
                  <div className="w-16 h-16 shrink-0 bg-slate-100 border border-slate-200 rounded-lg flex items-center justify-center overflow-hidden">
                    {imageUrl ? <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" /> : <ImageIcon size={20} className="text-slate-300" />}
                  </div>
                  <input 
                    type="text" 
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange/20 text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* FINANCIAL SUMMARY */}
          <div className="bg-slate-900 rounded-2xl p-8 relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-8 opacity-5">
                <Tag className="w-32 h-32 text-white" />
             </div>
             
             <h2 className="font-display text-lg uppercase tracking-widest text-white mb-6 relative z-10 flex items-center gap-2">
               Pricing Strategy
             </h2>

             <div className="space-y-6 relative z-10">
                <div className="flex justify-between items-end border-b border-slate-800 pb-4">
                   <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">Retail Total (Individual)</span>
                   <span className="font-display text-2xl text-slate-300 line-through">£{(retailTotal / 100).toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                </div>

                <div>
                  <label className="block font-mono text-[10px] font-bold text-brand-orange uppercase tracking-widest mb-2">Kit Price (Override)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white font-display text-xl">£</span>
                    <input 
                      type="number" 
                      value={kitPriceGbp === "" ? "" : kitPriceGbp / 100}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value);
                        setKitPriceGbp(isNaN(val) ? "" : Math.round(val * 100));
                      }}
                      className="w-full pl-10 pr-4 py-4 bg-slate-800 border-2 border-slate-700 focus:border-brand-orange rounded-xl focus:outline-none text-white font-display text-2xl transition-colors"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4">
                   <div className="flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                     <span className="font-mono text-[10px] text-emerald-500 uppercase tracking-widest font-bold">Total Savings</span>
                   </div>
                   <div className="text-right">
                     <span className="block font-display text-2xl text-emerald-400">£{(savingsGbp / 100).toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                     <span className="font-mono text-[10px] text-emerald-500/70 uppercase tracking-widest">{savingsPercent.toFixed(1)}% OFF RETAIL</span>
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* RIGHT PANE: BUNDLER */}
        <div className="xl:col-span-7 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col h-full min-h-[600px]">
            
            {/* Search Header */}
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 rounded-t-2xl">
              <h2 className="font-display text-lg uppercase tracking-widest text-slate-900 mb-4 flex items-center gap-2">
                Component Bundler
              </h2>
              <div className="relative">
                <Search className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${searchFocused ? 'text-brand-orange' : 'text-slate-400'}`} size={18} />
                <input 
                  type="text" 
                  placeholder="Search products by name or SKU..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                  className="w-full pl-12 pr-4 py-4 bg-white border-2 border-slate-200 focus:border-brand-orange rounded-xl text-sm focus:outline-none transition-all shadow-sm"
                />
                
                {/* Search Dropdown */}
                {searchFocused && searchTerm && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden">
                    {filteredProducts.length === 0 ? (
                      <div className="p-4 text-center text-sm text-slate-500 font-mono">No components found</div>
                    ) : (
                      <ul className="divide-y divide-slate-100">
                        {filteredProducts.map(p => (
                          <li 
                            key={p.id} 
                            onClick={() => handleAddItem(p)}
                            className="p-4 hover:bg-slate-50 flex items-center justify-between cursor-pointer group transition-colors"
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-slate-100 rounded flex items-center justify-center overflow-hidden shrink-0">
                                {p.image_url ? <img src={p.image_url} alt="" className="w-full h-full object-cover" /> : <Package size={16} className="text-slate-300" />}
                              </div>
                              <div>
                                <p className="text-sm font-bold text-slate-900">{p.name}</p>
                                <p className="font-mono text-[9px] text-slate-400 uppercase tracking-widest">{p.sku}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="text-sm font-bold text-slate-900">£{(p.price_gbp / 100).toLocaleString()}</span>
                              <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-brand-orange group-hover:text-white transition-colors">
                                <Plus size={14} />
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Selected Items List */}
            <div className="flex-1 p-6 overflow-y-auto bg-white">
              {selectedItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 space-y-4 py-20">
                  <div className="w-20 h-20 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center mb-2">
                    <Package size={32} className="text-slate-300" />
                  </div>
                  <h3 className="font-display text-xl uppercase tracking-tighter text-slate-900">Empty Kit</h3>
                  <p className="font-mono text-[10px] uppercase tracking-widest max-w-[250px]">
                    Search and add components above to begin building this kit
                  </p>
                </div>
              ) : (
                <ul className="space-y-3">
                  {selectedItems.map((item) => (
                    <li key={item.id} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-xl group hover:border-brand-orange/30 transition-colors">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-12 h-12 bg-white border border-slate-200 rounded-lg flex items-center justify-center overflow-hidden shrink-0">
                          {item.image_url ? <img src={item.image_url} alt="" className="w-full h-full object-cover" /> : <Package size={16} className="text-slate-300" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-slate-900 line-clamp-1">{item.name}</p>
                          <p className="font-mono text-[9px] text-slate-500 uppercase tracking-widest">{item.sku}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-8 pl-4">
                        <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-lg p-1">
                          <button 
                            onClick={() => handleUpdateQuantity(item.id, -1)}
                            className="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-brand-orange hover:bg-slate-50 rounded transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="font-mono text-xs font-bold w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => handleUpdateQuantity(item.id, 1)}
                            className="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-brand-orange hover:bg-slate-50 rounded transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        <div className="text-right w-24">
                          <p className="text-sm font-bold text-slate-900">£{((item.price_gbp * item.quantity) / 100).toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
                          <p className="font-mono text-[8px] text-slate-400 uppercase tracking-widest">Line Total</p>
                        </div>

                        <button 
                          onClick={() => handleRemoveItem(item.id)}
                          className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer Summary */}
            <div className="p-6 border-t border-slate-100 bg-slate-50/50 rounded-b-2xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                 <Info size={14} className="text-slate-400" />
                 <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest">{selectedItems.length} Unique Components</span>
              </div>
              <div className="text-right flex items-center gap-4">
                <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest">Total Components:</span>
                <span className="font-display text-xl text-slate-900">{selectedItems.reduce((acc, i) => acc + i.quantity, 0)}</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
