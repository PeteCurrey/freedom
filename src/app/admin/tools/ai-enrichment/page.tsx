"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Wand2, 
  Search, 
  Filter, 
  CheckSquare, 
  Square, 
  Loader2, 
  ChevronRight, 
  Check, 
  X, 
  Edit3,
  AlertCircle,
  Clock,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function AIEnrichmentPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [processing, setProcessing] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [results, setResults] = useState<Record<string, any>>({});

  useEffect(() => {
    fetchQueue();
  }, []);

  const fetchQueue = async () => {
    setLoading(true);
    // Fetch products that need enrichment
    const { data } = await supabase
      .from("products")
      .select("id, name, brand, description, meta_description, specs")
      .or("description.is.null,description.eq.'',meta_description.is.null")
      .order("created_at", { ascending: false });
    
    setProducts(data || []);
    setLoading(false);
  };

  const toggleAll = () => {
    if (selectedIds.size === products.length) setSelectedIds(new Set());
    else setSelectedIds(new Set(products.map(p => p.id)));
  };

  const toggleOne = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const startEnrichment = async () => {
    setProcessing(true);
    const ids = Array.from(selectedIds);
    setProgress({ current: 0, total: ids.length });

    for (let i = 0; i < ids.length; i++) {
      const id = ids[i];
      setCurrentId(id);
      
      // Mocking AI API Call
      const product = products.find(p => p.id === id);
      await new Promise(r => setTimeout(r, 1500)); // Simulate API delay
      
      const enrichedDescription = `The ${product.name} by ${product.brand} is a professional-grade component designed specifically for premium campervan conversions. Optimized for efficiency and durability, it integration seamlessly into high-performance off-grid systems. Whether you're building a weekend cruiser or a full-time expedition vehicle, this unit provides the reliability required for the open road. Engineered with high-quality materials to withstand vibration and temperature fluctuations common in mobile environments.`;
      
      setResults(prev => ({ 
        ...prev, 
        [id]: { 
          description: enrichedDescription,
          meta_title: `${product.name} | Professional Conversion Components | Amplios`,
          meta_description: `Shop the ${product.name} by ${product.brand} at Amplios. Premium quality, technically verified components for professional campervan conversions.`
        } 
      }));
      
      setProgress(prev => ({ ...prev, current: i + 1 }));
    }
    
    setProcessing(false);
    setCurrentId(null);
  };

  const saveEnrichment = async (id: string) => {
    const result = results[id];
    if (!result) return;

    try {
      const { error } = await supabase
        .from("products")
        .update({
          description: result.description,
          meta_title: result.meta_title,
          meta_description: result.meta_description
        })
        .eq("id", id);
      
      if (error) throw error;
      
      // Remove from list
      setProducts(prev => prev.filter(p => p.id !== id));
      const nextSelected = new Set(selectedIds);
      nextSelected.delete(id);
      setSelectedIds(nextSelected);
      
      const nextResults = { ...results };
      delete nextResults[id];
      setResults(nextResults);
    } catch (error) {
      console.error("Error saving enrichment:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-[1400px] mx-auto px-8 py-12">
        {/* Header */}
        <div className="mb-12 flex justify-between items-end">
          <div>
            <h1 className="font-display text-5xl uppercase tracking-tighter text-gray-900">
              AI Enrichment <span className="text-brand-orange">Queue</span>
            </h1>
            <p className="font-sans text-gray-500 mt-2">Bulk-generate technical product copy and SEO metadata using Anthropic AI.</p>
          </div>
          <div className="flex gap-4">
            {selectedIds.size > 0 && !processing && (
              <button 
                onClick={startEnrichment}
                className="bg-brand-orange text-white px-8 py-4 font-display text-[10px] uppercase tracking-widest hover:bg-orange-600 transition-all flex items-center gap-3 shadow-lg shadow-orange-100"
              >
                <Sparkles size={16} /> Enrich {selectedIds.size} Products
              </button>
            )}
          </div>
        </div>

        {processing && (
          <div className="bg-white border border-gray-200 p-8 shadow-sm mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="font-mono text-[10px] uppercase tracking-widest text-gray-400">Processing Sequential Queue</span>
              <span className="font-display text-xl text-brand-orange">{Math.round((progress.current / progress.total) * 100)}%</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-brand-orange transition-all duration-300"
                style={{ width: `${(progress.current / progress.total) * 100}%` }}
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* QUEUE LIST */}
          <div className={cn(
            "space-y-4",
            Object.keys(results).length > 0 ? "xl:col-span-4" : "xl:col-span-12"
          )}>
            <div className="bg-white border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <button onClick={toggleAll} className="text-gray-400 hover:text-brand-orange transition-colors">
                    {selectedIds.size === products.length && products.length > 0 ? <CheckSquare size={16} className="text-brand-orange" /> : <Square size={16} />}
                  </button>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-gray-500">{products.length} Products in Queue</span>
                </div>
                <button onClick={fetchQueue} className="text-gray-400 hover:text-gray-600"><Clock size={14} /></button>
              </div>
              
              <div className="max-h-[70vh] overflow-y-auto">
                {loading ? (
                  <div className="p-20 flex justify-center"><Loader2 className="animate-spin text-brand-orange" /></div>
                ) : products.length === 0 ? (
                  <div className="p-20 text-center">
                    <p className="font-mono text-[10px] uppercase text-gray-300">All products enriched</p>
                  </div>
                ) : (
                  products.map(p => (
                    <div 
                      key={p.id} 
                      className={cn(
                        "p-4 border-b border-gray-50 flex items-center justify-between hover:bg-gray-50 transition-colors group",
                        selectedIds.has(p.id) && "bg-orange-50/30",
                        currentId === p.id && "border-l-4 border-l-brand-orange bg-orange-50"
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <button onClick={() => toggleOne(p.id)} className="text-gray-300 group-hover:text-gray-500 transition-colors">
                          {selectedIds.has(p.id) ? <CheckSquare size={16} className="text-brand-orange" /> : <Square size={16} />}
                        </button>
                        <div>
                          <span className="block font-display text-xs uppercase text-gray-900 line-clamp-1">{p.name}</span>
                          <span className="block font-mono text-[8px] text-gray-400 uppercase tracking-widest">{p.brand}</span>
                        </div>
                      </div>
                      {currentId === p.id && <Loader2 size={14} className="animate-spin text-brand-orange" />}
                      {results[p.id] && <CheckCircle2 size={14} className="text-green-500" />}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* RESULTS PREVIEW */}
          {Object.keys(results).length > 0 && (
            <div className="xl:col-span-8 space-y-6">
              {Object.entries(results).map(([id, data]: [string, any]) => {
                const product = products.find(p => p.id === id);
                if (!product) return null;

                return (
                  <div key={id} className="bg-white border border-gray-200 shadow-md animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                      <div>
                        <span className="font-mono text-[9px] uppercase tracking-widest text-brand-orange mb-1 block">Enrichment Generated</span>
                        <h3 className="font-display text-lg uppercase tracking-tight">{product.name}</h3>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 border border-gray-200 hover:bg-white text-gray-400 hover:text-gray-600 transition-colors"><Edit3 size={16} /></button>
                        <button className="p-2 border border-gray-200 hover:bg-white text-gray-400 hover:text-red-500 transition-colors"><X size={16} /></button>
                        <button 
                          onClick={() => saveEnrichment(id)}
                          className="bg-brand-orange text-white px-6 py-2 font-display text-[10px] uppercase tracking-widest hover:bg-orange-600 transition-all flex items-center gap-2"
                        >
                          <Check size={16} /> Accept & Save
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <label className="block font-mono text-[9px] uppercase text-gray-400 mb-2">Generated Description</label>
                        <div className="bg-gray-50 p-4 border border-gray-100 text-sm leading-relaxed text-gray-600 font-sans italic">
                          "{data.description}"
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div>
                          <label className="block font-mono text-[9px] uppercase text-gray-400 mb-2">Meta Title</label>
                          <div className="bg-gray-50 p-3 border border-gray-100 text-xs text-gray-600 font-mono">
                            {data.meta_title}
                          </div>
                        </div>
                        <div>
                          <label className="block font-mono text-[9px] uppercase text-gray-400 mb-2">Meta Description</label>
                          <div className="bg-gray-50 p-3 border border-gray-100 text-xs text-gray-600 font-sans italic">
                            {data.meta_description}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
