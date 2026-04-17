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
  Settings
} from "lucide-react";

export default function NewProductPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    slug: "",
    brand: "",
    sku: "",
    price_gbp: 0,
    stock_quantity: 0,
    weight_kg: 0,
    category_id: "",
    supplier_id: "",
    short_description: "",
    full_description: "",
    image_url: "",
    is_active: true,
  });

  useEffect(() => {
    async function fetchData() {
      const { data: cats } = await supabase.from('product_categories').select('*').order('name');
      const { data: sups } = await supabase.from('suppliers').select('*').order('name');
      setCategories(cats || []);
      setSuppliers(sups || []);
      if (cats && cats.length > 0) {
        setProduct((prev) => ({ ...prev, category_id: cats[0].id }));
      }
    }
    fetchData();
  }, []);

  const handleSave = async () => {
    if (!product.name || !product.slug || !product.category_id) {
       alert("Please fill out Name, Slug, and Category.");
       return;
    }
    setSaving(true);
    
    // Process form
    const newProductData = {
      ...product,
      price_gbp: Math.floor(Number(product.price_gbp) * 100), // convert to pence if saving as £
    };

    const { error } = await supabase.from('products').insert([newProductData]);
    
    setSaving(false);
    if (!error) {
       router.push("/admin/store");
    } else {
       console.error("Save error:", error);
       alert("Failed to save product. Check the console.");
    }
  };

  return (
    <div className="p-8 pb-32">
      {/* Header */}
      <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <Link href="/admin/store" className="flex items-center gap-2 font-mono text-[10px] text-brand-orange uppercase tracking-[0.3em] mb-4 hover:text-white transition-colors">
            <ArrowLeft size={12} /> Back to Store Manager
          </Link>
          <h1 className="font-display text-5xl uppercase tracking-tighter text-white">
            Create New <span className="text-brand-orange">SKU</span>
          </h1>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="px-10 py-4 bg-brand-orange text-white font-mono text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all flex items-center gap-2 disabled:opacity-50"
        >
          {saving ? <RefreshCw size={14} className="animate-spin" /> : <Save size={14} />} 
          {saving ? "Saving..." : "Deploy Product"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Info */}
        <div className="lg:col-span-2 space-y-8">
           <div className="blueprint-border bg-brand-carbon p-8">
             <div className="flex items-center gap-3 mb-8 border-b border-brand-border pb-4">
               <Tag className="text-brand-orange" size={20} />
               <h2 className="font-display text-xl uppercase tracking-widest text-white">Core Identity</h2>
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
                     className="w-full bg-brand-obsidian border border-brand-border p-4 font-sans text-sm text-white focus:border-brand-orange outline-none"
                     placeholder="e.g. Victron MultiPlus 3000VA"
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
                   <input 
                     type="text" 
                     value={product.brand}
                     onChange={(e) => setProduct({ ...product, brand: e.target.value })}
                     className="w-full bg-brand-obsidian border border-brand-border p-4 font-sans text-sm text-white focus:border-brand-orange outline-none"
                     placeholder="e.g. Victron Energy"
                   />
                </div>
                <div>
                   <label className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-2">SKU Code</label>
                   <input 
                     type="text" 
                     value={product.sku}
                     onChange={(e) => setProduct({ ...product, sku: e.target.value })}
                     className="w-full bg-brand-obsidian border border-brand-border p-4 font-mono text-sm text-white focus:border-brand-orange outline-none"
                     placeholder="e.g. VIC-MP-3000"
                   />
                </div>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                   <label className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-2">Category Assignment</label>
                   <select 
                     value={product.category_id}
                     onChange={(e) => setProduct({ ...product, category_id: e.target.value })}
                     className="w-full bg-brand-obsidian border border-brand-border p-4 font-sans text-sm text-white focus:border-brand-orange outline-none"
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
                     className="w-full bg-brand-obsidian border border-brand-border p-4 font-sans text-sm text-white focus:border-brand-orange outline-none"
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
               <h2 className="font-display text-xl uppercase tracking-widest text-white">Marketing Content</h2>
             </div>
             <div className="space-y-6">
                <div>
                   <label className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-2">Short Description (Summary)</label>
                   <textarea 
                     value={product.short_description}
                     onChange={(e) => setProduct({ ...product, short_description: e.target.value })}
                     className="w-full bg-brand-obsidian border border-brand-border p-4 font-sans text-sm text-white focus:border-brand-orange outline-none min-h-[80px]"
                   />
                </div>
                <div>
                   <label className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-2">Full Technical Description (Markdown)</label>
                   <textarea 
                     value={product.full_description}
                     onChange={(e) => setProduct({ ...product, full_description: e.target.value })}
                     className="w-full bg-brand-obsidian border border-brand-border p-4 font-mono text-xs text-brand-grey focus:border-brand-orange outline-none min-h-[200px]"
                   />
                </div>
             </div>
           </div>
        </div>

        {/* Sidebar Info */}
        <div className="lg:col-span-1 space-y-8">
           <div className="blueprint-border bg-brand-carbon p-8 top-32 sticky">
             <div className="flex items-center gap-3 mb-8 border-b border-brand-border pb-4">
               <DollarSign className="text-brand-orange" size={20} />
               <h2 className="font-display text-xl uppercase tracking-widest text-white">Logistics</h2>
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
                        className="w-full bg-brand-obsidian border border-brand-border py-4 pl-10 pr-4 font-display text-xl text-white focus:border-brand-orange outline-none"
                      />
                   </div>
                </div>
                <div>
                   <label className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-2">Initial Stock</label>
                   <input 
                     type="number" 
                     value={product.stock_quantity}
                     onChange={(e) => setProduct({ ...product, stock_quantity: Number(e.target.value) })}
                     className="w-full bg-brand-obsidian border border-brand-border p-4 font-mono text-sm text-white focus:border-brand-orange outline-none"
                   />
                </div>
                <div>
                   <label className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-2">Weight (KG)</label>
                   <input 
                     type="number" 
                     step="0.1"
                     value={product.weight_kg}
                     onChange={(e) => setProduct({ ...product, weight_kg: Number(e.target.value) })}
                     className="w-full bg-brand-obsidian border border-brand-border p-4 font-mono text-sm text-white focus:border-brand-orange outline-none"
                   />
                </div>
             </div>

             <div className="flex items-center gap-3 mb-8 border-b border-brand-border pb-4 pt-4">
               <ImageIcon className="text-brand-orange" size={20} />
               <h2 className="font-display text-xl uppercase tracking-widest text-white">Media Asset</h2>
             </div>

             <div className="space-y-4">
                <div className="aspect-square bg-brand-obsidian border border-brand-border overflow-hidden relative">
                   {product.image_url ? (
                      <img src={product.image_url} className="w-full h-full object-cover" />
                   ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-brand-grey">
                         <ImageIcon size={32} className="mb-4 opacity-50" />
                         <span className="font-mono text-[10px] uppercase tracking-widest">No Image Asset</span>
                      </div>
                   )}
                </div>
                <input 
                  type="text" 
                  value={product.image_url}
                  onChange={(e) => setProduct({ ...product, image_url: e.target.value })}
                  className="w-full bg-brand-obsidian border border-brand-border p-3 font-mono text-[10px] text-brand-grey focus:border-brand-orange outline-none"
                  placeholder="/images/hero-background.png or https://"
                />
             </div>
             
             <div className="flex items-center gap-3 mb-8 border-b border-brand-border pb-4 pt-8">
               <Settings className="text-brand-orange" size={20} />
               <h2 className="font-display text-xl uppercase tracking-widest text-white">Status</h2>
             </div>
             
             <label className="flex items-center gap-4 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={product.is_active}
                  onChange={(e) => setProduct({ ...product, is_active: e.target.checked })}
                  className="w-4 h-4 accent-brand-orange"
                />
                <span className="font-mono text-xs uppercase tracking-widest text-white">Active (Visible in Store)</span>
             </label>

           </div>
        </div>
      </div>
    </div>
  );
}
