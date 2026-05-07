"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Save,
  RefreshCw,
  Image as ImageIcon,
  DollarSign,
  Tag,
  AlignLeft,
  Settings,
  Trash2,
  Plus,
  Monitor,
  TrendingUp,
  Play,
  Sparkles
} from "lucide-react";
import { use } from "react";

import { updateProductAction } from "../../actions";

export default function EditProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const router = useRouter();
  const { slug } = use(params);
  
  const [categories, setCategories] = useState<any[]>([]);
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [affiliates, setAffiliates] = useState<any[]>([]);
  const [existingBrands, setExistingBrands] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<any>({
    id: "",
    name: "",
    slug: "",
    brand: "",
    sku: "",
    price_gbp: 0,
    stock_quantity: 0,
    weight_kg: 0,
    category_id: "",
    short_description: "",
    description: "",
    images: [],
    is_active: true,
    is_affiliate: false,
    affiliate_url: "",
    affiliate_id: "",
    is_editor_pick: false,
    sort_priority: 0,
    video_enabled: false,
    video_source: "youtube",
    video_url: "",
    video_title: "",
    video_description: "",
    system_tier: "",
    spec_line: "",
    badge: "",
    datasheet_url: "",
    specs: {},
  });

  useEffect(() => {
    async function fetchData() {
      // 1. Fetch Categories, Suppliers, Affiliates & Brands
      const [
        { data: catData },
        { data: supData },
        { data: affData },
        { data: brandData }
      ] = await Promise.all([
        supabase.from('product_categories').select('*').order('name'),
        supabase.from('suppliers').select('*').order('name'),
        supabase.from('affiliate_management').select('*').order('name'),
        supabase.from('products').select('brand')
      ]);

      setCategories(catData || []);
      setSuppliers(supData || []);
      setAffiliates(affData || []);
      
      const uniqueBrands = Array.from(new Set((brandData || []).map(p => p.brand).filter(Boolean))) as string[];
      setExistingBrands(uniqueBrands.sort());

      // 2. Fetch Product
      const { data: prodData } = await supabase.from('products').select('*').eq('slug', slug).single();
      if (prodData) {
        setProduct({
          ...prodData,
          images: prodData.images || [],
          specs: prodData.specs || {},
          price_gbp: prodData.price_gbp / 100 // Convert pence back to gbp for editing
        });
      }
      setLoading(false);
    }
    fetchData();
  }, [slug]);

  const handleSave = async () => {
    if (!product.name || !product.slug || !product.category_id) {
       alert("Please fill out Name, Slug, and Category.");
       return;
    }
    setSaving(true);
    
    // Process form
    const updateData = {
      ...product,
      price_gbp: Math.floor(Number(product.price_gbp) * 100), // convert to pence
    };

    // Remove read-only or problematic fields
    delete updateData.product_categories;

    const result = await updateProductAction(product.id, product.slug, updateData);
    
    setSaving(false);
    if (result.success) {
       router.push("/admin/store");
    } else {
       console.error("Save error:", result.error);
       alert(`Failed to update product: ${result.error}`);
    }
  };

  const handleAddImage = () => {
    setProduct({ ...product, images: [...product.images, ""] });
  };

  const handleUpdateImage = (index: number, val: string) => {
    const newImages = [...product.images];
    newImages[index] = val;
    setProduct({ ...product, images: newImages });
  };

  const handleRemoveImage = (index: number) => {
    setProduct({ ...product, images: product.images.filter((_: any, i: number) => i !== index) });
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    const { error } = await supabase.from('products').delete().eq('id', product.id);
    if (!error) {
       router.push("/admin/store");
    }
  };

  if (loading) {
     return <div className="p-12 font-mono text-[10px] uppercase text-brand-grey">Loading System Node...</div>;
  }

  return (
    <div className="p-8 pb-32">
      {/* Header */}
      <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <Link href="/admin/store" className="flex items-center gap-2 font-mono text-[10px] text-brand-orange uppercase tracking-[0.3em] mb-4 hover:text-brand-white transition-colors">
            <ArrowLeft size={12} /> Back to Store Manager
          </Link>
          <h1 className="font-display text-5xl uppercase tracking-tighter text-brand-white">
            Maintain <span className="text-brand-orange">SKU</span>
          </h1>
        </div>
        <div className="flex gap-4">
           <button 
             onClick={handleDelete}
             className="px-6 py-4 border border-brand-border text-brand-grey font-mono text-[10px] uppercase tracking-widest hover:border-red-500 hover:text-red-500 transition-all flex items-center gap-2"
           >
             <Trash2 size={14} /> Delete
           </button>
           <button 
             onClick={handleSave}
             disabled={saving}
             className="px-10 py-4 bg-brand-orange text-brand-white font-mono text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all flex items-center gap-2 disabled:opacity-50"
           >
             {saving ? <RefreshCw size={14} className="animate-spin" /> : <Save size={14} />} 
             {saving ? "Saving..." : "Update Product"}
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Info */}
        <div className="lg:col-span-2 space-y-8">
           <div className="blueprint-border bg-brand-carbon p-8">
              <div className="flex items-center gap-3 mb-8 border-b border-brand-border pb-4">
                <Tag className="text-brand-orange" size={20} />
                <h2 className="font-display text-xl uppercase tracking-widest text-brand-white">Core <span className="text-brand-orange">Identity</span></h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                 <div>
                    <label className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-2">Product Name</label>
                    <input 
                      type="text" 
                      value={product.name}
                      onChange={(e) => {
                        const name = e.target.value;
                        const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                        setProduct({ ...product, name, slug });
                      }}
                      className="w-full bg-brand-obsidian border border-brand-border p-4 font-sans text-sm text-brand-white focus:border-brand-orange outline-none"
                    />
                 </div>
                 <div>
                    <label className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-2">URL Slug</label>
                    <input 
                      type="text" 
                      value={product.slug}
                      onChange={(e) => setProduct({ ...product, slug: e.target.value })}
                      className="w-full bg-brand-obsidian border border-brand-border p-4 font-sans text-sm text-brand-grey focus:border-brand-orange outline-none"
                    />
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                 <div>
                    <label className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-2">Manufacturer Brand</label>
                    <div className="flex flex-col gap-2">
                       <input 
                         type="text" 
                         list="brands-list"
                         value={product.brand}
                         onChange={(e) => setProduct({ ...product, brand: e.target.value })}
                         className="w-full bg-brand-obsidian border border-brand-border p-4 font-sans text-sm text-brand-white focus:border-brand-orange outline-none"
                         placeholder="Type or select brand..."
                       />
                       <datalist id="brands-list">
                          {existingBrands.map(b => <option key={b} value={b} />)}
                       </datalist>
                       <p className="font-mono text-[8px] text-brand-grey uppercase tracking-widest">TIP: Select from list or type to create new</p>
                    </div>
                 </div>
                 <div>
                    <label className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-2">SKU Code</label>
                    <input 
                      type="text" 
                      value={product.sku}
                      onChange={(e) => setProduct({ ...product, sku: e.target.value })}
                      className="w-full bg-brand-obsidian border border-brand-border p-4 font-mono text-sm text-brand-white focus:border-brand-orange outline-none"
                    />
                 </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                 <div>
                    <label className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-2">Category Assignment</label>
                    <select 
                      value={product.category_id}
                      onChange={(e) => setProduct({ ...product, category_id: e.target.value })}
                      className="w-full bg-brand-obsidian border border-brand-border p-4 font-sans text-sm text-brand-white focus:border-brand-orange outline-none"
                    >
                       {categories.map((cat) => (
                         <option key={cat.id} value={cat.id}>{cat.name}</option>
                       ))}
                    </select>
                 </div>
                 <div>
                    <label className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-2">Primary Supplier</label>
                    <select 
                      value={product.supplier_id}
                      onChange={(e) => setProduct({ ...product, supplier_id: e.target.value })}
                      className="w-full bg-brand-obsidian border border-brand-border p-4 font-sans text-sm text-brand-white focus:border-brand-orange outline-none"
                    >
                       <option value="">No Supplier Mapping</option>
                       {suppliers.map((sup) => (
                         <option key={sup.id} value={sup.id}>{sup.name}</option>
                       ))}
                    </select>
                 </div>
              </div>
           </div>

           <div className="blueprint-border bg-brand-carbon p-8">
              <div className="flex items-center gap-3 mb-8 border-b border-brand-border pb-4">
                <AlignLeft className="text-brand-orange" size={20} />
                <h2 className="font-display text-xl uppercase tracking-widest text-brand-white">Marketing <span className="text-brand-orange">Content</span></h2>
              </div>
              <div className="space-y-6">
                 <div>
                    <label className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-2">Short Description (Summary)</label>
                    <textarea 
                      value={product.short_description || ""}
                      onChange={(e) => setProduct({ ...product, short_description: e.target.value })}
                      className="w-full bg-brand-obsidian border border-brand-border p-4 font-sans text-sm text-brand-white focus:border-brand-orange outline-none min-h-[80px]"
                    />
                 </div>
                 <div>
                    <label className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-2">Full Technical Description (Markdown)</label>
                    <textarea 
                      value={product.description || ""}
                      onChange={(e) => setProduct({ ...product, description: e.target.value })}
                      className="w-full bg-brand-obsidian border border-brand-border p-4 font-mono text-xs text-brand-grey focus:border-brand-orange outline-none min-h-[200px]"
                    />
                 </div>
              </div>
           </div>

           <div className="blueprint-border bg-brand-carbon p-8">
              <div className="flex items-center gap-3 mb-8 border-b border-brand-border pb-4">
                <Settings className="text-brand-orange" size={20} />
                <h2 className="font-display text-xl uppercase tracking-widest text-brand-white">Technical <span className="text-brand-orange">Spec Sheet</span></h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                 <div>
                    <label className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-2">Spec Line Summary</label>
                    <input 
                      type="text" 
                      value={product.spec_line || ""}
                      onChange={(e) => setProduct({ ...product, spec_line: e.target.value })}
                      className="w-full bg-brand-obsidian border border-brand-border p-4 font-mono text-xs text-brand-white focus:border-brand-orange outline-none"
                      placeholder="e.g. 12V | 3000VA | 120A"
                    />
                 </div>
                 <div>
                    <label className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-2">System Tier</label>
                    <select 
                      value={product.system_tier || ""}
                      onChange={(e) => setProduct({ ...product, system_tier: e.target.value })}
                      className="w-full bg-brand-obsidian border border-brand-border p-4 font-sans text-sm text-brand-white focus:border-brand-orange outline-none"
                    >
                       <option value="">None</option>
                       <option value="off-grid">Off-Grid</option>
                       <option value="expedition">Expedition</option>
                       <option value="adventure">Adventure</option>
                       <option value="weekend">Weekend</option>
                    </select>
                 </div>
              </div>

              <div>
                 <label className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-2">Detailed Specs (JSON Editor)</label>
                 <textarea 
                   value={JSON.stringify(product.specs, null, 2)}
                   onChange={(e) => {
                     try {
                        const specs = JSON.parse(e.target.value);
                        setProduct({ ...product, specs });
                     } catch (err) {}
                   }}
                   className="w-full bg-brand-obsidian border border-brand-border p-4 font-mono text-[10px] text-brand-orange focus:border-brand-orange outline-none min-h-[150px]"
                 />
              </div>
           </div>
        </div>

        {/* Sidebar Info */}
        <div className="lg:col-span-1 space-y-8">
           <div className="blueprint-border bg-brand-carbon p-8 top-32 sticky">
              <div className="flex items-center gap-3 mb-8 border-b border-brand-border pb-4">
                <DollarSign className="text-brand-orange" size={20} />
                <h2 className="font-display text-xl uppercase tracking-widest text-brand-white">Logistics <span className="text-brand-orange">Pipeline</span></h2>
              </div>
              
              <div className="space-y-6 mb-8">
                 <div>
                    <label className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-2">Price (GBP)</label>
                    <div className="relative">
                       <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-brand-grey">£</span>
                       <input 
                         type="number" 
                         value={product.price_gbp}
                         onChange={(e) => setProduct({ ...product, price_gbp: Number(e.target.value) })}
                         className="w-full bg-brand-obsidian border border-brand-border py-4 pl-10 pr-4 font-display text-xl text-brand-white focus:border-brand-orange outline-none"
                       />
                    </div>
                 </div>
                 <div>
                    <label className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-2">Current Stock</label>
                    <input 
                      type="number" 
                      value={product.stock_quantity}
                      onChange={(e) => setProduct({ ...product, stock_quantity: Number(e.target.value) })}
                      className="w-full bg-brand-obsidian border border-brand-border p-4 font-mono text-sm text-brand-white focus:border-brand-orange outline-none"
                    />
                 </div>
                 <div>
                    <label className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-2">Weight (KG)</label>
                    <input 
                      type="number" 
                      step="0.1"
                      value={product.weight_kg}
                      onChange={(e) => setProduct({ ...product, weight_kg: Number(e.target.value) })}
                      className="w-full bg-brand-obsidian border border-brand-border p-4 font-mono text-sm text-brand-white focus:border-brand-orange outline-none"
                    />
                 </div>
              </div>

              <div className="flex items-center gap-3 mb-8 border-b border-brand-border pb-4 pt-4">
                <ImageIcon className="text-brand-orange" size={20} />
                <h2 className="font-display text-xl uppercase tracking-widest text-brand-white">Media <span className="text-brand-orange">Asset Registry</span></h2>
              </div>

              <div className="space-y-6">
                 {product.images.map((img: string, idx: number) => (
                    <div key={idx} className="space-y-2 group">
                       <div className="aspect-square bg-brand-obsidian border border-brand-border overflow-hidden relative">
                          {img ? (
                             <img src={img} className="w-full h-full object-cover" />
                          ) : (
                             <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-brand-grey">
                                <ImageIcon size={24} className="mb-2 opacity-50" />
                                <span className="font-mono text-[8px] uppercase tracking-widest">Empty Asset Slot</span>
                             </div>
                          )}
                          <button 
                            onClick={() => handleRemoveImage(idx)}
                            className="absolute top-2 right-2 p-1.5 bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                             <Trash2 size={12} />
                          </button>
                       </div>
                       <input 
                         type="text" 
                         value={img}
                         onChange={(e) => handleUpdateImage(idx, e.target.value)}
                         className="w-full bg-brand-obsidian border border-brand-border p-3 font-mono text-[9px] text-brand-grey focus:border-brand-orange outline-none"
                         placeholder="Image URL..."
                       />
                    </div>
                 ))}
                 
                 <button 
                   onClick={handleAddImage}
                   className="w-full py-3 border border-dashed border-brand-border text-brand-grey hover:border-brand-orange hover:text-brand-orange transition-all font-mono text-[10px] uppercase tracking-widest flex items-center justify-center gap-2"
                 >
                    <Plus size={12} /> Add Media Asset
                 </button>
              </div>
              
              <div className="flex items-center gap-3 mb-8 border-b border-brand-border pb-4 pt-8">
                <Monitor className="text-brand-orange" size={20} />
                <h2 className="font-display text-xl uppercase tracking-widest text-brand-white">Video <span className="text-brand-orange">Registry</span></h2>
              </div>
              
              <label className="flex items-center gap-4 cursor-pointer mb-6">
                  <input 
                    type="checkbox" 
                    checked={product.video_enabled}
                    onChange={(e) => setProduct({ ...product, video_enabled: e.target.checked })}
                    className="w-4 h-4 accent-brand-orange"
                  />
                  <span className="font-mono text-xs uppercase tracking-widest text-brand-white">Enable Video Player</span>
               </label>

               {product.video_enabled && (
                  <div className="space-y-4 mb-8 animate-in fade-in slide-in-from-top-2">
                     <div className="space-y-2">
                        <label className="block font-mono text-[9px] text-brand-grey uppercase tracking-widest">Video URL / ID</label>
                        <input 
                          type="text" 
                          value={product.video_url || ""}
                          onChange={(e) => setProduct({ ...product, video_url: e.target.value })}
                          placeholder="YouTube/Vimeo Link..."
                          className="w-full bg-brand-obsidian border border-brand-border p-3 font-mono text-[10px] text-brand-grey focus:border-brand-orange outline-none"
                        />
                     </div>
                  </div>
               )}

              <div className="flex items-center gap-3 mb-8 border-b border-brand-border pb-4 pt-8">
                <Settings className="text-brand-orange" size={20} />
                <h2 className="font-display text-xl uppercase tracking-widest text-brand-white">Deployment <span className="text-brand-orange">Status</span></h2>
              </div>
              
              <div className="space-y-4">
                 <label className="flex items-center gap-4 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={product.is_active}
                      onChange={(e) => setProduct({ ...product, is_active: e.target.checked })}
                      className="w-4 h-4 accent-brand-orange"
                    />
                    <span className="font-mono text-xs uppercase tracking-widest text-brand-white">Active (Public)</span>
                 </label>

                 <label className="flex items-center gap-4 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={product.is_editor_pick}
                      onChange={(e) => setProduct({ ...product, is_editor_pick: e.target.checked })}
                      className="w-4 h-4 accent-brand-orange"
                    />
                    <span className="font-mono text-xs uppercase tracking-widest text-brand-white">Editor's Pick</span>
                 </label>
              </div>

           </div>
        </div>
      </div>
    </div>
  );
}
