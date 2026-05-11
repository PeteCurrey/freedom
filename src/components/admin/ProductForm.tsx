"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { 
  Save, X, Wand2, Upload, Link as LinkIcon, 
  Trash2, Plus, ChevronRight, AlertCircle, 
  CheckCircle2, ExternalLink, Search, Eye, 
  ShoppingBag, Sparkles, Video, Info, GripVertical,
  Layers, Tag, Truck, Globe, ShieldCheck, FileText, Monitor
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ProductFormProps {
  productId?: string;
  initialData?: any;
}

export function ProductForm({ productId, initialData }: ProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);
  const [newBrand, setNewBrand] = useState({ name: "", website: "", logo: "", country: "" });
  const [aiGenerating, setAiGenerating] = useState(false);
  
  const defaults = {
    name: "",
    brand_id: "",
    supplier_id: "",
    sku: "",
    internal_sku: "",
    barcode: "",
    short_description: "",
    description: "",
    price_gbp: 0,
    cost_price: 0,
    vat_rate: 20,
    compare_at_price: 0,
    stock_quantity: 0,
    low_stock_threshold: 5,
    allow_backorder: false,
    track_stock: true,
    lead_time: "",
    category_id: "",
    subcategory: "",
    system_tier: [],
    vehicle_compatibility: ["All vehicles"],
    tags: [],
    gtin: "",
    mpn: "",
    weight_kg: 0,
    dimensions: { l: 0, w: 0, h: 0 },
    list_on_ebay: false,
    list_on_amazon: false,
    list_on_onbuy: false,
    list_on_google: true,
    list_on_meta: true,
    ebay_listing_id: "",
    amazon_asin: "",
    onbuy_listing_id: "",
    status: "draft",
    visibility: "public",
    images: [],
    video_url: "",
    show_video: false,
    specs: {},
    meta_title: "",
    meta_description: "",
    slug: "",
    related_products: [],
    is_featured: false,
    is_editor_pick: false,
    is_affiliate: false,
    affiliate_url: "",
    commission_rate: "",
    focus_keyword: "",
    og_title: "",
    og_description: "",
    og_image: "",
    canonical_url: "",
    robots_index: true,
    robots_follow: true,
    structured_data: {}
  };

  const [formData, setFormData] = useState({
    ...defaults,
    ...initialData,
    dimensions: initialData?.dimensions || defaults.dimensions,
    images: initialData?.images || defaults.images,
    specs: initialData?.specs || defaults.specs,
    system_tier: initialData?.system_tier || defaults.system_tier,
    vehicle_compatibility: initialData?.vehicle_compatibility || defaults.vehicle_compatibility,
    tags: initialData?.tags || defaults.tags,
  });

  const [categories, setCategories] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [newSpec, setNewSpec] = useState({ label: "", value: "" });

  useEffect(() => {
    async function fetchData() {
      const [catsRes, brandsRes, suppsRes] = await Promise.all([
        supabase.from("product_categories").select("*").order("name"),
        supabase.from("brands").select("*").order("name"),
        supabase.from("suppliers").select("*").order("name")
      ]);
      setCategories(catsRes.data || []);
      setBrands(brandsRes.data || []);
      setSuppliers(suppsRes.data || []);
    }
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const val = type === "checkbox" ? (e.target as any).checked : value;
    setFormData((prev: any) => ({ ...prev, [name]: val }));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const pence = Math.round(parseFloat(value) * 100);
    setFormData((prev: any) => ({ ...prev, [name]: pence }));
  };

  const handleAddSpec = () => {
    if (newSpec.label && newSpec.value) {
      setFormData((prev: any) => ({
        ...prev,
        specs: { ...prev.specs, [newSpec.label]: newSpec.value }
      }));
      setNewSpec({ label: "", value: "" });
    }
  };

  const handleRemoveSpec = (label: string) => {
    const newSpecs = { ...formData.specs };
    delete newSpecs[label];
    setFormData((prev: any) => ({ ...prev, specs: newSpecs }));
  };

  const handleAddBrand = async () => {
    if (!newBrand.name) {
      alert("Brand name is required");
      return;
    }

    const slug = newBrand.name.toLowerCase().trim().replace(/ /g, "-").replace(/[^\w-]+/g, "");
    const brandToInsert = { ...newBrand, slug };

    try {
      const { data, error } = await supabase.from("brands").insert([brandToInsert]).select().single();
      
      if (error) {
        console.error("Failed to add brand:", error);
        const msg = error.code === '42P01' 
          ? "Database error: The 'brands' table is missing. Please check the implementation plan for the SQL script."
          : `Error: ${error.message || "Failed to create brand registry node"}`;
        alert(msg);
        return;
      }

      if (data) {
        setBrands((prev: any[]) => [...prev, data].sort((a, b) => a.name.localeCompare(b.name)));
        setFormData((prev: any) => ({ ...prev, brand_id: data.id }));
        setIsBrandModalOpen(false);
        setNewBrand({ name: "", website: "", logo: "", country: "" });
      }
    } catch (err) {
      console.error("Unexpected error adding brand:", err);
      alert("An unexpected error occurred while saving the brand dossier.");
    }
  };

  const calculateCompleteness = () => {
    let score = 0;
    const checks = {
      name: !!formData.name,
      price: formData.price_gbp > 0,
      description: (formData.description?.length || 0) > 100,
      image: (formData.images?.length || 0) > 0,
      category: !!formData.category_id,
      specs: Object.keys(formData.specs || {}).length > 0,
      supplier_sku: !!formData.sku,
      seo: !!formData.meta_title && !!formData.meta_description && !!formData.focus_keyword
    };
    
    if (checks.name) score += 15;
    if (checks.price) score += 10;
    if (checks.description) score += 15;
    if (checks.image) score += 15;
    if (checks.category) score += 10;
    if (checks.specs) score += 10;
    if (checks.supplier_sku) score += 10;
    if (checks.seo) score += 15;
    
    return { score, checks };
  };

  const { score, checks } = calculateCompleteness();

  const handleSave = async (statusOverride?: string) => {
    setLoading(true);
    const dataToSave = { 
      ...formData, 
      status: statusOverride || formData.status,
      updated_at: new Date().toISOString()
    };
    
    if (!dataToSave.slug && dataToSave.name) {
      dataToSave.slug = dataToSave.name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
    }

    try {
      let result;
      if (productId) {
        result = await supabase.from("products").update(dataToSave).eq("id", productId).select().single();
      } else {
        result = await supabase.from("products").insert([dataToSave]).select().single();
      }

      // Real-time Sync to GMC if active
      if (result.data && result.data.status === 'active') {
         // We'll call an API route to handle the server-side GMC push
         fetch('/api/admin/integrations/gmc/sync', {
           method: 'POST',
           body: JSON.stringify({ productId: result.data.id })
         }).catch(err => console.error("Auto-sync failed:", err));
      }

      router.push("/admin/products");
    } catch (error) {
      console.error("Error saving product:", error);
    } finally {
      setLoading(false);
    }
  };

  const generateAIDescription = async () => {
    setAiGenerating(true);
    // Simulate AI delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const brandName = brands.find(b => b.id === formData.brand_id)?.name || "premium";
    const catName = categories.find(c => c.id === formData.category_id)?.name || "component";
    
    const mockDescription = `This ${brandName} ${formData.name || 'unit'} is a high-performance ${catName} designed for the most demanding DIY campervan conversions. Expertly engineered to meet UK building standards, it offers seamless integration into your 12V or 24V architecture. Whether you're planning a weekend getaway or a full-time off-grid expedition, this ${formData.name || 'part'} ensures reliability and efficiency in all conditions. Built with premium materials, it provides long-lasting service life and is favored by professional converters across Europe for its straightforward installation and robust performance profile.`;
    
    setFormData((prev: any) => ({ ...prev, description: mockDescription }));
    setAiGenerating(false);
  };
 
  const generateSEOMetadata = () => {
    const brandName = brands.find(b => b.id === formData.brand_id)?.name || "";
    const name = formData.name || "Product";
    
    // Meta Title: Brand + Name + Platform
    const title = `${brandName} ${name} | Professional Off-Grid Hardware | Amplios`.trim();
    
    // Meta Description: Short Bio + Key Promise
    const desc = `Buy the ${brandName} ${name} at Amplios. Professional-grade engineering for serious van builds. Authorized UK stockist with technical support and fast delivery.`.trim();
    
    setFormData((prev: any) => ({
      ...prev,
      meta_title: title.slice(0, 60),
      meta_description: desc.slice(0, 160),
      focus_keyword: `${brandName} ${name}`.toLowerCase()
    }));
  };

  const margin = formData.price_gbp > 0 ? (((formData.price_gbp / 1.2) - formData.cost_price) / (formData.price_gbp / 1.2)) * 100 : 0;

  return (
    <div className="flex flex-col lg:flex-row gap-12 pb-32 relative">
      
      {/* LEFT COLUMN - Main Content */}
      <div className="flex-1 space-y-12">
        
        {/* PRODUCT IDENTITY */}
        <section className="bg-white border border-slate-200 p-10 shadow-sm rounded-xl">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-50">
            <Tag className="w-5 h-5 text-brand-orange" />
            <h2 className="font-display text-xl uppercase tracking-tight text-slate-900">Product Identity</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:col-span-2">
              <label className="block font-mono text-[10px] uppercase text-slate-400 mb-2 tracking-widest">Product Name</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Victron MultiPlus-II 12/3000/120-32"
                className="w-full border border-slate-200 bg-slate-50/50 p-4 text-sm font-bold focus:border-brand-orange focus:bg-white outline-none transition-all rounded-lg"
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block font-mono text-[10px] uppercase text-slate-400 tracking-widest">Brand</label>
                <button onClick={() => setIsBrandModalOpen(true)} className="text-[9px] font-bold text-brand-orange uppercase hover:underline">+ Add New</button>
              </div>
              <select 
                name="brand_id"
                value={formData.brand_id}
                onChange={handleChange}
                className="w-full border border-slate-200 bg-slate-50/50 p-4 text-sm focus:border-brand-orange focus:bg-white outline-none transition-all rounded-lg"
              >
                <option value="">Select Brand</option>
                {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block font-mono text-[10px] uppercase text-slate-400 mb-2 tracking-widest">Supplier</label>
              <select 
                name="supplier_id"
                value={formData.supplier_id}
                onChange={handleChange}
                className="w-full border border-slate-200 bg-slate-50/50 p-4 text-sm focus:border-brand-orange focus:bg-white outline-none transition-all rounded-lg"
              >
                <option value="">Select Supplier</option>
                {suppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block font-mono text-[10px] uppercase text-slate-400 mb-2 tracking-widest">Supplier SKU</label>
              <input 
                type="text" 
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                placeholder="Manufacturer code"
                className="w-full border border-slate-200 bg-slate-50/50 p-4 text-sm focus:border-brand-orange focus:bg-white outline-none rounded-lg"
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] uppercase text-slate-400 mb-2 tracking-widest">Internal SKU</label>
              <input 
                type="text" 
                name="internal_sku"
                value={formData.internal_sku || `AMP-${formData.sku || 'TEMP'}`}
                onChange={handleChange}
                className="w-full border border-slate-200 bg-slate-50/50 p-4 text-sm focus:border-brand-orange focus:bg-white outline-none rounded-lg"
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] uppercase text-slate-400 mb-2 tracking-widest">EAN/GTIN</label>
              <input 
                type="text" 
                name="gtin"
                value={formData.gtin}
                onChange={handleChange}
                className="w-full border border-slate-200 bg-slate-50/50 p-4 text-sm focus:border-brand-orange focus:bg-white outline-none rounded-lg"
              />
            </div>
          </div>
        </section>

        {/* MEDIA */}
        <section className="bg-white border border-slate-200 p-10 shadow-sm rounded-xl">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-50">
            <div className="flex items-center gap-3">
              <Upload className="w-5 h-5 text-brand-orange" />
              <h2 className="font-display text-xl uppercase tracking-tight text-slate-900">Media Assets</h2>
            </div>
            <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">{formData.images.length}/10 Images</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-8">
            {formData.images.map((img: string, i: number) => (
              <div key={i} className="aspect-square bg-slate-50 border border-slate-100 rounded-xl relative group overflow-hidden">
                <img src={img} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                   <button onClick={() => {
                     const newImgs = [...formData.images];
                     newImgs.splice(i, 1);
                     setFormData({...formData, images: newImgs});
                   }} className="p-2 bg-white text-red-500 rounded-full hover:scale-110 transition-transform">
                     <Trash2 size={14} />
                   </button>
                </div>
                {i === 0 && <div className="absolute top-2 left-2 bg-brand-orange text-white text-[7px] font-bold uppercase px-2 py-0.5 rounded shadow-sm">Primary</div>}
              </div>
            ))}
            <button className="aspect-square border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-slate-400 hover:border-brand-orange hover:text-brand-orange transition-all bg-slate-50/50">
              <Upload size={24} />
              <span className="font-mono text-[8px] mt-2 font-bold uppercase tracking-widest">Add Media</span>
            </button>
          </div>
          <div className="flex flex-col md:flex-row gap-6 p-6 bg-slate-50 rounded-xl border border-slate-100">
            <div className="flex-1 space-y-2">
               <label className="block font-mono text-[9px] uppercase text-slate-400 tracking-widest">Video URL (YouTube/Vimeo)</label>
               <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <Video className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                    <input 
                      type="text" 
                      name="video_url"
                      value={formData.video_url}
                      onChange={handleChange}
                      placeholder="https://youtube.com/..."
                      className="w-full border border-slate-200 pl-10 p-3 text-xs focus:border-brand-orange outline-none rounded-lg"
                    />
                  </div>
                  <div className="flex items-center gap-2 px-4 bg-white border border-slate-200 rounded-lg">
                    <input 
                      type="checkbox" 
                      checked={formData.show_video}
                      onChange={(e) => setFormData({...formData, show_video: e.target.checked})}
                    />
                    <span className="font-mono text-[9px] uppercase font-bold text-slate-500">Show</span>
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* DESCRIPTION */}
        <section className="bg-white border border-slate-200 p-10 shadow-sm rounded-xl">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-50">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-brand-orange" />
              <h2 className="font-display text-xl uppercase tracking-tight text-slate-900">Commercial Narrative</h2>
            </div>
            <button 
              onClick={generateAIDescription}
              disabled={aiGenerating}
              className="flex items-center gap-2 text-brand-orange font-mono text-[10px] uppercase tracking-widest hover:text-slate-900 transition-all font-bold disabled:opacity-50"
            >
              {aiGenerating ? <Sparkles className="w-4 h-4 animate-pulse" /> : <Wand2 className="w-4 h-4" />}
              AI Generate Copy
            </button>
          </div>
          <div className="space-y-8">
            <div>
              <label className="block font-mono text-[10px] uppercase text-slate-400 mb-2 tracking-widest">Short Description (150 chars)</label>
              <textarea 
                name="short_description"
                value={formData.short_description}
                onChange={handleChange}
                maxLength={150}
                rows={2}
                className="w-full border border-slate-200 bg-slate-50/50 p-4 text-sm focus:border-brand-orange focus:bg-white outline-none transition-all rounded-lg resize-none"
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] uppercase text-slate-400 mb-2 tracking-widest">Full Narrative</label>
              <textarea 
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={12}
                className="w-full border border-slate-200 bg-slate-50/50 p-4 text-sm focus:border-brand-orange focus:bg-white outline-none transition-all rounded-lg font-sans leading-relaxed"
              />
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section className="bg-white border border-slate-200 p-10 shadow-sm rounded-xl">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-50">
            <ShoppingBag className="w-5 h-5 text-brand-orange" />
            <h2 className="font-display text-xl uppercase tracking-tight text-slate-900">Commercial Configuration</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-slate-900 text-white rounded-2xl space-y-4">
               <label className="block font-mono text-[9px] uppercase text-brand-orange tracking-widest font-bold">Retail Price (£ Inc VAT)</label>
               <div className="relative">
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 text-2xl font-display text-slate-500">£</span>
                  <input 
                    type="number" 
                    step="0.01"
                    name="price_gbp"
                    defaultValue={formData.price_gbp / 100}
                    onBlur={handlePriceChange}
                    className="w-full bg-transparent border-none p-0 pl-6 text-4xl font-display focus:ring-0 outline-none"
                  />
               </div>
            </div>
            <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl space-y-4">
               <label className="block font-mono text-[9px] uppercase text-slate-400 tracking-widest font-bold">Cost Price (£ Trade)</label>
               <div className="relative">
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 text-xl font-display text-slate-300">£</span>
                  <input 
                    type="number" 
                    step="0.01"
                    name="cost_price"
                    defaultValue={formData.cost_price / 100}
                    onBlur={handlePriceChange}
                    className="w-full bg-transparent border-none p-0 pl-6 text-2xl font-display text-slate-700 focus:ring-0 outline-none"
                  />
               </div>
            </div>
            <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl space-y-4">
               <div className="flex justify-between items-center">
                  <label className="block font-mono text-[9px] uppercase text-slate-400 tracking-widest font-bold">Gross Margin</label>
                  <Info className="w-3 h-3 text-slate-300" />
               </div>
               <div className={cn(
                 "text-3xl font-display",
                 margin > 30 ? "text-emerald-500" : margin > 15 ? "text-amber-500" : "text-red-500"
               )}>
                 {margin.toFixed(1)}%
               </div>
               <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden">
                  <div className={cn("h-full", margin > 30 ? "bg-emerald-500" : margin > 15 ? "bg-amber-500" : "bg-red-500")} style={{ width: `${Math.min(margin, 100)}%` }} />
               </div>
            </div>
            <div>
               <label className="block font-mono text-[10px] uppercase text-slate-400 mb-2 tracking-widest">Compare At Price (£)</label>
               <input 
                 type="number" 
                 name="compare_at_price"
                 defaultValue={formData.compare_at_price / 100}
                 onBlur={handlePriceChange}
                 className="w-full border border-slate-200 bg-slate-50/50 p-4 text-sm focus:border-brand-orange focus:bg-white outline-none rounded-lg"
               />
            </div>
            <div>
               <label className="block font-mono text-[10px] uppercase text-slate-400 mb-2 tracking-widest">VAT Rate</label>
               <select 
                 name="vat_rate"
                 value={formData.vat_rate}
                 onChange={handleChange}
                 className="w-full border border-slate-200 bg-slate-50/50 p-4 text-sm focus:border-brand-orange focus:bg-white outline-none rounded-lg"
               >
                 <option value={20}>20% (Standard)</option>
                 <option value={5}>5% (Reduced)</option>
                 <option value={0}>0% (Zero)</option>
               </select>
            </div>
            <div className="flex flex-col justify-center px-4">
               <span className="font-mono text-[9px] uppercase text-slate-400 tracking-widest">Price Ex. VAT</span>
               <span className="font-display text-xl text-slate-900">£{((formData.price_gbp / 100) / 1.2).toFixed(2)}</span>
            </div>
          </div>
        </section>
 
         {/* SEO & SEARCH DOMINANCE */}
         <section className="bg-white border border-slate-200 p-10 shadow-sm rounded-xl">
           <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-50">
             <div className="flex items-center gap-3">
               <Search className="w-5 h-5 text-brand-orange" />
               <h2 className="font-display text-xl uppercase tracking-tight text-slate-900">Search Engine Dominance</h2>
             </div>
             <div className="flex items-center gap-4">
                <button 
                  onClick={generateSEOMetadata}
                  className="px-3 py-1 bg-slate-900 text-white font-mono text-[9px] uppercase tracking-widest hover:bg-brand-orange transition-all font-bold flex items-center gap-2"
                >
                  <Wand2 size={10} /> Auto-Generate
                </button>
                <div className={cn(
                  "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                  checks.seo ? "bg-emerald-100 text-emerald-600" : "bg-orange-100 text-brand-orange"
                )}>
                  {checks.seo ? 'Optimized' : 'Needs Work'}
                </div>
             </div>
           </div>
           
           <div className="space-y-10">
             {/* Focus Keyword */}
             <div className="p-6 bg-slate-900 rounded-xl space-y-4">
                <div className="flex justify-between items-center">
                   <label className="block font-mono text-[10px] uppercase text-brand-orange tracking-widest font-bold">Focus Keyword</label>
                   <Sparkles className="w-4 h-4 text-brand-orange animate-pulse" />
                </div>
                <input 
                  type="text" 
                  name="focus_keyword"
                  value={formData.focus_keyword}
                  onChange={handleChange}
                  placeholder="e.g. Victron MultiPlus 3000W 12V"
                  className="w-full bg-white/5 border border-white/10 p-4 text-white text-sm focus:border-brand-orange outline-none rounded-xl"
                />
                <p className="text-[9px] text-slate-500 font-mono uppercase tracking-widest">
                  The primary search term you want this product to rank for.
                </p>
             </div>
 
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Meta Title */}
                <div className="space-y-2">
                   <div className="flex justify-between items-center">
                      <label className="block font-mono text-[10px] uppercase text-slate-400 tracking-widest">Meta Title</label>
                      <span className={cn(
                        "text-[9px] font-mono",
                        formData.meta_title.length > 60 ? "text-red-500" : "text-slate-400"
                      )}>{formData.meta_title.length}/60</span>
                   </div>
                   <input 
                     type="text" 
                     name="meta_title"
                     value={formData.meta_title}
                     onChange={handleChange}
                     className="w-full border border-slate-200 bg-slate-50/50 p-4 text-sm focus:border-brand-orange focus:bg-white outline-none rounded-lg"
                   />
                </div>
 
                {/* Canonical URL */}
                <div className="space-y-2">
                   <label className="block font-mono text-[10px] uppercase text-slate-400 tracking-widest">Canonical URL</label>
                   <input 
                     type="text" 
                     name="canonical_url"
                     value={formData.canonical_url}
                     onChange={handleChange}
                     placeholder={formData.slug ? `https://amplios.co.uk/store/product/${formData.slug}` : "Auto-generated"}
                     className="w-full border border-slate-200 bg-slate-50/50 p-4 text-sm focus:border-brand-orange focus:bg-white outline-none rounded-lg"
                   />
                </div>
 
                {/* Meta Description */}
                <div className="md:col-span-2 space-y-2">
                   <div className="flex justify-between items-center">
                      <label className="block font-mono text-[10px] uppercase text-slate-400 tracking-widest">Meta Description</label>
                      <span className={cn(
                        "text-[9px] font-mono",
                        formData.meta_description.length > 160 ? "text-red-500" : "text-slate-400"
                      )}>{formData.meta_description.length}/160</span>
                   </div>
                   <textarea 
                     name="meta_description"
                     value={formData.meta_description}
                     onChange={handleChange}
                     rows={3}
                     className="w-full border border-slate-200 bg-slate-50/50 p-4 text-sm focus:border-brand-orange focus:bg-white outline-none rounded-lg resize-none"
                   />
                </div>
             </div>
 
             {/* Open Graph & Social */}
             <div className="pt-8 border-t border-slate-100">
                <div className="flex items-center gap-2 mb-6">
                   <Globe className="w-4 h-4 text-slate-400" />
                   <h3 className="font-display text-sm uppercase tracking-widest">Social Graph (OG) Settings</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                   <div className="md:col-span-1">
                      <label className="block font-mono text-[10px] uppercase text-slate-400 mb-2">OG Image</label>
                      <div className="aspect-video bg-slate-100 rounded-xl overflow-hidden border border-slate-200 relative group">
                         {formData.og_image || formData.images?.[0] ? (
                           <img src={formData.og_image || formData.images?.[0]} className="w-full h-full object-cover" />
                         ) : (
                           <div className="flex flex-col items-center justify-center h-full text-slate-400">
                             <ImageIcon size={24} />
                             <span className="text-[8px] uppercase mt-2">Placeholder</span>
                           </div>
                         )}
                         <input 
                           type="text" 
                           name="og_image"
                           value={formData.og_image}
                           onChange={handleChange}
                           placeholder="Custom Image URL"
                           className="absolute bottom-0 left-0 right-0 p-2 bg-white/90 text-[8px] focus:ring-0 outline-none border-t border-slate-200"
                         />
                      </div>
                   </div>
                   <div className="md:col-span-2 space-y-4">
                      <div>
                        <label className="block font-mono text-[10px] uppercase text-slate-400 mb-2">OG Title</label>
                        <input 
                          type="text" 
                          name="og_title"
                          value={formData.og_title}
                          onChange={handleChange}
                          placeholder={formData.meta_title}
                          className="w-full border border-slate-200 bg-slate-50/50 p-4 text-sm focus:border-brand-orange focus:bg-white outline-none rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[10px] uppercase text-slate-400 mb-2">OG Description</label>
                        <textarea 
                          name="og_description"
                          value={formData.og_description}
                          onChange={handleChange}
                          placeholder={formData.meta_description}
                          rows={2}
                          className="w-full border border-slate-200 bg-slate-50/50 p-4 text-sm focus:border-brand-orange focus:bg-white outline-none rounded-lg resize-none"
                        />
                      </div>
                   </div>
                </div>
             </div>
 
             {/* Robots & Indexing */}
             <div className="pt-8 border-t border-slate-100">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                   <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="font-mono text-[9px] uppercase font-bold text-slate-600">Index</span>
                      <input 
                        type="checkbox" 
                        name="robots_index"
                        checked={formData.robots_index}
                        onChange={handleChange}
                        className="w-4 h-4 rounded text-brand-orange"
                      />
                   </div>
                   <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="font-mono text-[9px] uppercase font-bold text-slate-600">Follow</span>
                      <input 
                        type="checkbox" 
                        name="robots_follow"
                        checked={formData.robots_follow}
                        onChange={handleChange}
                        className="w-4 h-4 rounded text-brand-orange"
                      />
                   </div>
                </div>
             </div>
 
             {/* SERP PREVIEW */}
             <div className="pt-8 border-t border-slate-100">
                <label className="block font-mono text-[10px] uppercase text-slate-400 mb-4 tracking-widest">Google SERP Preview</label>
                <div className="p-6 bg-white border border-slate-100 rounded-xl shadow-sm max-w-xl">
                   <div className="text-[14px] text-[#1a0dab] font-sans hover:underline cursor-pointer truncate">
                      {formData.meta_title || formData.name || "Product Title Preview"} | Amplios
                   </div>
                   <div className="text-[12px] text-[#006621] font-sans truncate mb-1">
                      https://amplios.co.uk/store/product/{formData.slug || "product-url"}
                   </div>
                   <div className="text-[13px] text-[#545454] font-sans line-clamp-2">
                      {formData.meta_description || "Please provide a meta description to see how your product will appear in Google search results."}
                   </div>
                </div>
             </div>
           </div>

        {/* AFFILIATE & PARTNER LINKS */}
        <section className="bg-white border border-slate-200 p-10 shadow-sm rounded-xl">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-50">
            <div className="flex items-center gap-3">
              <LinkIcon className="w-5 h-5 text-brand-orange" />
              <h2 className="font-display text-xl uppercase tracking-tight text-slate-900">Affiliate & Partner Links</h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[9px] uppercase font-bold text-slate-400">Enable Commissions</span>
              <input 
                type="checkbox" 
                name="is_affiliate"
                checked={formData.is_affiliate}
                onChange={(e) => setFormData({...formData, is_affiliate: e.target.checked})}
                className="w-4 h-4 rounded text-brand-orange focus:ring-brand-orange"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:col-span-2">
              <label className="block font-mono text-[10px] uppercase text-slate-400 mb-2 tracking-widest">Affiliate Redirect URL</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  name="affiliate_url"
                  value={formData.affiliate_url}
                  onChange={handleChange}
                  placeholder="https://supplier.com/product?ref=..."
                  className="flex-1 border border-slate-200 bg-slate-50/50 p-4 text-sm focus:border-brand-orange focus:bg-white outline-none transition-all rounded-lg"
                />
                <button className="px-4 bg-slate-50 border border-slate-200 rounded-lg text-slate-400 hover:text-brand-orange">
                  <ExternalLink size={16} />
                </button>
              </div>
            </div>
            <div>
              <label className="block font-mono text-[10px] uppercase text-slate-400 mb-2 tracking-widest">Commission Rate</label>
              <input 
                type="text" 
                name="commission_rate"
                value={formData.commission_rate}
                onChange={handleChange}
                placeholder="e.g. 5% or £10"
                className="w-full border border-slate-200 bg-slate-50/50 p-4 text-sm focus:border-brand-orange focus:bg-white outline-none rounded-lg"
              />
            </div>
            <div className="flex items-center gap-4 p-4 bg-orange-50/50 border border-orange-100 rounded-xl">
               <AlertCircle size={16} className="text-brand-orange shrink-0" />
               <p className="text-[10px] text-brand-orange/80 font-medium leading-relaxed">
                 When enabled, the primary CTA on the product page will redirect to this URL instead of the local checkout flow.
               </p>
            </div>
          </div>
        </section>

        {/* SPECIFICATIONS */}
        <section className="bg-white border border-slate-200 p-10 shadow-sm rounded-xl">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-50">
            <Layers className="w-5 h-5 text-brand-orange" />
            <h2 className="font-display text-xl uppercase tracking-tight text-slate-900">Technical Specifications</h2>
          </div>
          <div className="space-y-4 mb-8">
            {Object.entries(formData.specs || {}).map(([label, value]: [string, any]) => (
              <div key={label} className="flex gap-6 items-center bg-slate-50 p-4 border border-slate-100 rounded-xl group">
                <GripVertical size={14} className="text-slate-300 cursor-grab" />
                <span className="font-mono text-[10px] uppercase font-bold text-slate-500 w-40 shrink-0">{label}</span>
                <span className="text-sm text-slate-900 flex-1">{value}</span>
                <button onClick={() => handleRemoveSpec(label)} className="text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 bg-slate-50/50 border border-dashed border-slate-200 rounded-2xl">
            <input 
              type="text" 
              placeholder="Label (e.g. Voltage)" 
              value={newSpec.label}
              onChange={(e) => setNewSpec({ ...newSpec, label: e.target.value })}
              className="md:col-span-1 border border-slate-200 p-3 text-xs outline-none focus:border-brand-orange rounded-lg"
            />
            <input 
              type="text" 
              placeholder="Value (e.g. 12V)" 
              value={newSpec.value}
              onChange={(e) => setNewSpec({ ...newSpec, value: e.target.value })}
              className="md:col-span-2 border border-slate-200 p-3 text-xs outline-none focus:border-brand-orange rounded-lg"
            />
            <button 
              onClick={handleAddSpec}
              className="bg-slate-900 text-white font-mono text-[9px] uppercase tracking-widest py-3 hover:bg-brand-orange transition-all font-bold rounded-lg"
            >
              Add Property
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 pt-8 border-t border-slate-50">
             <div>
                <label className="block font-mono text-[10px] uppercase text-slate-400 mb-2 tracking-widest">Weight (kg)</label>
                <input 
                  type="number" 
                  name="weight_kg"
                  value={formData.weight_kg}
                  onChange={handleChange}
                  className="w-full border border-slate-200 bg-slate-50/50 p-4 text-sm focus:border-brand-orange focus:bg-white outline-none rounded-lg"
                />
             </div>
             <div>
                <label className="block font-mono text-[10px] uppercase text-slate-400 mb-2 tracking-widest">Dimensions (L x W x H mm)</label>
                <div className="flex gap-2">
                   {['l', 'w', 'h'].map(dim => (
                     <input 
                       key={dim}
                       type="number" 
                       placeholder={dim.toUpperCase()}
                       value={formData.dimensions[dim as keyof typeof formData.dimensions]}
                       onChange={(e) => setFormData({...formData, dimensions: {...formData.dimensions, [dim]: parseFloat(e.target.value)}})}
                       className="flex-1 border border-slate-200 bg-slate-50/50 p-4 text-sm text-center focus:border-brand-orange focus:bg-white outline-none rounded-lg"
                     />
                   ))}
                </div>
             </div>
          </div>
        </section>

      </div>

      {/* RIGHT COLUMN - Sidebar */}
      <div className="w-full lg:w-96 space-y-8">
        
        {/* PUBLISH CONTROLS */}
        <section className="bg-white border border-slate-200 p-8 shadow-xl rounded-2xl sticky top-8">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-50">
            <Globe className="w-5 h-5 text-brand-orange" />
            <h2 className="font-display text-lg uppercase tracking-tight text-slate-900">Governance</h2>
          </div>
          <div className="space-y-6">
            <div>
              <label className="block font-mono text-[9px] uppercase text-slate-400 mb-2 tracking-widest font-bold">Lifecycle Status</label>
              <select 
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border-2 border-slate-100 p-4 text-sm font-bold focus:border-brand-orange outline-none transition-all rounded-xl"
              >
                <option value="draft">DRAFT (Internal Only)</option>
                <option value="active">ACTIVE (Live on Store)</option>
                <option value="archived">ARCHIVED (Historic)</option>
              </select>
            </div>
            <div>
              <label className="block font-mono text-[9px] uppercase text-slate-400 mb-2 tracking-widest font-bold">Public Visibility</label>
              <select 
                name="visibility"
                value={formData.visibility}
                onChange={handleChange}
                className="w-full border-2 border-slate-100 p-4 text-sm font-bold focus:border-brand-orange outline-none transition-all rounded-xl"
              >
                <option value="public">PUBLIC (Indexed)</option>
                <option value="hidden">HIDDEN (Direct Link Only)</option>
              </select>
            </div>
            <div className="space-y-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
               <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] uppercase font-bold text-slate-600">Featured Item</span>
                  <input 
                    type="checkbox" 
                    checked={formData.is_featured} 
                    onChange={(e) => setFormData({...formData, is_featured: e.target.checked})}
                    className="w-4 h-4 rounded text-brand-orange"
                  />
               </div>
               <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] uppercase font-bold text-slate-600">Editor's Pick</span>
                  <input 
                    type="checkbox" 
                    checked={formData.is_editor_pick} 
                    onChange={(e) => setFormData({...formData, is_editor_pick: e.target.checked})}
                    className="w-4 h-4 rounded text-brand-orange"
                  />
               </div>
            </div>
          </div>

          <div className="mt-10 space-y-3">
             <button 
               onClick={() => handleSave()}
               className="w-full bg-brand-orange text-white py-5 rounded-xl font-display text-xs uppercase tracking-widest hover:bg-slate-900 transition-all font-bold shadow-xl shadow-brand-orange/20"
             >
               {productId ? 'Update Asset' : 'Publish to Store'}
             </button>
             <button 
               onClick={() => handleSave('draft')}
               className="w-full bg-white text-slate-900 py-5 rounded-xl font-display text-xs uppercase tracking-widest border border-slate-200 hover:bg-slate-50 transition-all font-bold"
             >
               Save as Draft
             </button>
          </div>
        </section>

        {/* HEALTH & COMPLETENESS */}
        <section className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl space-y-8">
           <div className="flex justify-between items-end">
              <div>
                 <h3 className="font-display text-sm uppercase tracking-widest text-brand-orange">Asset Integrity</h3>
                 <p className="text-[10px] text-slate-500 font-mono mt-1 uppercase tracking-tighter">SEO & Content Quality Score</p>
              </div>
              <span className={cn(
                "font-display text-4xl",
                score >= 80 ? "text-emerald-400" : score >= 40 ? "text-amber-400" : "text-red-400"
              )}>{score}%</span>
           </div>
           <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div className={cn("h-full transition-all duration-1000", 
                score >= 80 ? "bg-emerald-400" : score >= 40 ? "bg-amber-400" : "bg-red-400"
              )} style={{ width: `${score}%` }} />
           </div>
           <ul className="space-y-4">
              {[
                { label: "Product Identity", ok: checks.name },
                { label: "Commercial Pricing", ok: checks.price },
                { label: "Technical Specs", ok: checks.specs },
                { label: "Asset Media", ok: checks.image },
                { label: "Narrative Content", ok: checks.description },
                { label: "SEO Optimization", ok: checks.seo }
              ].map(item => (
                <li key={item.label} className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest">
                   <span className={item.ok ? "text-slate-300" : "text-slate-600"}>{item.label}</span>
                   {item.ok ? <ShieldCheck className="w-4 h-4 text-emerald-400" /> : <AlertCircle className="w-4 h-4 text-slate-700" />}
                </li>
              ))}
           </ul>
        </section>

        {/* SEO STRATEGY CHECKLIST */}
        <section className="bg-white border border-slate-200 p-8 shadow-sm rounded-2xl space-y-6">
           <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-brand-orange" />
              <h3 className="font-display text-sm uppercase tracking-widest text-slate-900">SEO Best Practices</h3>
           </div>
           <div className="space-y-4">
              {[
                { q: "Keyword in Meta Title?", a: formData.meta_title.toLowerCase().includes(formData.focus_keyword.toLowerCase()) && formData.focus_keyword !== "" },
                { q: "Meta Title < 60 chars?", a: formData.meta_title.length > 0 && formData.meta_title.length <= 60 },
                { q: "Keyword in Slug?", a: formData.slug.includes(formData.focus_keyword.toLowerCase().replace(/ /g, '-')) && formData.focus_keyword !== "" },
                { q: "Meta Description < 160 chars?", a: formData.meta_description.length > 0 && formData.meta_description.length <= 160 },
                { q: "Primary Image OG Set?", a: !!formData.og_image || formData.images.length > 0 }
              ].map(item => (
                <div key={item.q} className="flex items-center gap-3">
                   <div className={cn(
                     "w-4 h-4 rounded-full flex items-center justify-center border",
                     item.a ? "bg-emerald-500 border-emerald-500 text-white" : "border-slate-200 text-transparent"
                   )}>
                     {item.a && <CheckCircle2 size={10} />}
                   </div>
                   <span className="text-[10px] font-mono uppercase text-slate-500">{item.q}</span>
                </div>
              ))}
           </div>
        </section>

        {/* CHANNELS */}
        <section className="bg-white border border-slate-200 p-8 shadow-sm rounded-2xl space-y-8">
           <div className="flex items-center gap-3">
              <Monitor className="w-5 h-5 text-brand-orange" />
              <h3 className="font-display text-sm uppercase tracking-widest text-slate-900">Active Channels</h3>
           </div>
           <div className="space-y-4">
              {[
                { name: 'Amplios Store', status: 'Live', active: true },
                { name: 'eBay UK', status: formData.list_on_ebay ? 'Live' : 'Inactive', active: formData.list_on_ebay },
                { name: 'Google Merchant', status: 'In Feed', active: true },
                { name: 'Meta Catalog', status: 'In Feed', active: true },
              ].map(ch => (
                <div key={ch.name} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                   <span className="text-[10px] font-bold text-slate-900 uppercase tracking-widest">{ch.name}</span>
                   <span className={cn(
                     "text-[8px] font-bold uppercase px-2 py-0.5 rounded",
                     ch.active ? "bg-emerald-100 text-emerald-600" : "bg-slate-200 text-slate-500"
                   )}>{ch.status}</span>
                </div>
              ))}
           </div>
        </section>

      </div>

      {/* BRAND MODAL */}
      {isBrandModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[200] flex items-center justify-center p-8 animate-in fade-in duration-300">
           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-10 animate-in zoom-in-95 duration-300">
              <div className="flex justify-between items-center mb-8">
                 <h3 className="font-display text-2xl uppercase tracking-tighter">Register New <span className="text-brand-orange">Brand</span></h3>
                 <button onClick={() => setIsBrandModalOpen(false)} className="text-slate-400 hover:text-slate-900"><X /></button>
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
                       />
                    </div>
                    <div>
                       <label className="block font-mono text-[10px] uppercase text-slate-400 mb-2">Country</label>
                       <input 
                         type="text" 
                         value={newBrand.country}
                         onChange={e => setNewBrand({...newBrand, country: e.target.value})}
                         className="w-full border-2 border-slate-100 p-4 text-xs focus:border-brand-orange outline-none rounded-xl"
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
