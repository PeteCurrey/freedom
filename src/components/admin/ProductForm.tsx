"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { 
  Save, 
  X, 
  Wand2, 
  Upload, 
  Link as LinkIcon, 
  Trash2, 
  Plus, 
  ChevronRight, 
  AlertCircle, 
  CheckCircle2,
  ExternalLink,
  Search,
  Eye
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
  const [formData, setFormData] = useState(initialData || {
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
    lead_time: "",
    category_id: "",
    subcategory: "",
    system_tier: [],
    vehicle_compatibility: ["All vehicles"],
    tags: [],
    status: "draft",
    visibility: "public",
    images: [],
    specs: {},
    meta_title: "",
    meta_description: "",
    slug: ""
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
    const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev: any) => ({ ...prev, [name]: val }));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Convert float input to pence/cents for DB
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

  const calculateCompleteness = () => {
    let score = 0;
    const checks = {
      name: !!formData.name,
      price: formData.price_gbp > 0,
      description: (formData.description?.length || 0) > 100,
      image: (formData.images?.length || 0) > 0,
      category: !!formData.category_id,
      specs: Object.keys(formData.specs || {}).length > 0,
      supplier_sku: !!formData.sku
    };
    
    if (checks.name) score += 15;
    if (checks.price) score += 15;
    if (checks.description) score += 20;
    if (checks.image) score += 20;
    if (checks.category) score += 10;
    if (checks.specs) score += 10;
    if (checks.supplier_sku) score += 10;
    
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
    
    // Auto-generate slug if missing
    if (!dataToSave.slug && dataToSave.name) {
      dataToSave.slug = dataToSave.name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
    }

    try {
      if (productId) {
        await supabase.from("products").update(dataToSave).eq("id", productId);
      } else {
        await supabase.from("products").insert([dataToSave]);
      }
      router.push("/admin/products");
    } catch (error) {
      console.error("Error saving product:", error);
    } finally {
      setLoading(false);
    }
  };

  const generateAIDescription = async () => {
    // Mocking AI generation for now
    const mockDescription = `This ${formData.brand || 'premium'} ${formData.name || 'component'} is a critical addition to any high-end campervan conversion. Engineered for durability and performance, it solves the common challenge of ${formData.category_id || 'system integration'} with ease. Ideally suited for Expedition and Full Autonomy build tiers, it offers unmatched reliability in off-grid conditions. Weighing just ${formData.specs?.Weight || 'a fraction of alternatives'}, it maintains vehicle payload without compromising on utility. A true professional's choice for those who demand the best on the road.`;
    
    if (confirm("Use AI to generate description based on current data?")) {
      setFormData((prev: any) => ({ ...prev, description: mockDescription }));
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 pb-20">
      {/* LEFT MAIN CONTENT */}
      <div className="flex-1 space-y-8">
        
        {/* SECTION: PRODUCT IDENTITY */}
        <div className="bg-white border border-gray-200 p-8 shadow-sm">
          <h2 className="font-display text-lg uppercase tracking-wider mb-6 pb-2 border-b border-gray-100">Product Identity</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block font-mono text-[10px] uppercase text-gray-500 mb-2">Product Name</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Victron MultiPlus-II 12/3000/120-32"
                className="w-full border border-gray-300 p-3 text-sm focus:border-brand-orange outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] uppercase text-gray-500 mb-2">Brand</label>
              <select 
                name="brand_id"
                value={formData.brand_id}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 text-sm focus:border-brand-orange outline-none transition-colors"
              >
                <option value="">Select Brand</option>
                {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block font-mono text-[10px] uppercase text-gray-500 mb-2">Supplier</label>
              <select 
                name="supplier_id"
                value={formData.supplier_id}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 text-sm focus:border-brand-orange outline-none transition-colors"
              >
                <option value="">Select Supplier</option>
                {suppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block font-mono text-[10px] uppercase text-gray-500 mb-2">Supplier SKU</label>
              <input 
                type="text" 
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                placeholder="e.g. 30209"
                className="w-full border border-gray-300 p-3 text-sm focus:border-brand-orange outline-none"
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] uppercase text-gray-500 mb-2">Internal SKU</label>
              <input 
                type="text" 
                name="internal_sku"
                value={formData.internal_sku}
                onChange={handleChange}
                placeholder="e.g. AMP-30209"
                className="w-full border border-gray-300 p-3 text-sm focus:border-brand-orange outline-none"
              />
            </div>
          </div>
        </div>

        {/* SECTION: DESCRIPTION */}
        <div className="bg-white border border-gray-200 p-8 shadow-sm">
          <div className="flex justify-between items-center mb-6 pb-2 border-b border-gray-100">
            <h2 className="font-display text-lg uppercase tracking-wider">Description</h2>
            <button 
              onClick={generateAIDescription}
              className="flex items-center gap-2 text-brand-orange font-mono text-[10px] uppercase tracking-widest hover:text-orange-600 transition-colors"
            >
              <Wand2 size={14} /> AI Generate Description
            </button>
          </div>
          <div className="space-y-6">
            <div>
              <label className="block font-mono text-[10px] uppercase text-gray-500 mb-2">Short Description (150 chars max)</label>
              <textarea 
                name="short_description"
                value={formData.short_description}
                onChange={handleChange}
                maxLength={150}
                rows={2}
                className="w-full border border-gray-300 p-3 text-sm focus:border-brand-orange outline-none transition-colors resize-none"
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] uppercase text-gray-500 mb-2">Full Description</label>
              <textarea 
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={8}
                className="w-full border border-gray-300 p-3 text-sm focus:border-brand-orange outline-none transition-colors font-sans"
              />
            </div>
          </div>
        </div>

        {/* SECTION: MEDIA */}
        <div className="bg-white border border-gray-200 p-8 shadow-sm">
          <h2 className="font-display text-lg uppercase tracking-wider mb-6 pb-2 border-b border-gray-100">Media</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-6">
            {(formData.images || []).map((img: string, i: number) => (
              <div key={i} className="aspect-square border border-gray-200 relative group">
                <img src={img} className="w-full h-full object-cover" />
                <button 
                  onClick={() => {
                    const newImgs = [...formData.images];
                    newImgs.splice(i, 1);
                    setFormData((prev: any) => ({ ...prev, images: newImgs }));
                  }}
                  className="absolute top-1 right-1 bg-white p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={12} className="text-red-500" />
                </button>
                {i === 0 && (
                  <div className="absolute bottom-0 left-0 right-0 bg-brand-orange text-white text-[8px] text-center py-0.5 uppercase">Main</div>
                )}
              </div>
            ))}
            <button className="aspect-square border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 hover:text-brand-orange hover:border-brand-orange transition-all">
              <Upload size={20} />
              <span className="font-mono text-[8px] mt-2">Upload</span>
            </button>
          </div>
          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="Paste image URL..." 
              className="flex-1 border border-gray-300 p-2 text-xs outline-none focus:border-brand-orange"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const val = (e.target as HTMLInputElement).value;
                  if (val) {
                    setFormData((prev: any) => ({ ...prev, images: [...prev.images, val] }));
                    (e.target as HTMLInputElement).value = "";
                  }
                }
              }}
            />
            <button className="bg-gray-100 px-4 py-2 text-[10px] font-mono uppercase border border-gray-200 hover:bg-gray-200 transition-colors">Import</button>
          </div>
        </div>

        {/* SECTION: PRICING */}
        <div className="bg-white border border-gray-200 p-8 shadow-sm">
          <h2 className="font-display text-lg uppercase tracking-wider mb-6 pb-2 border-b border-gray-100">Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block font-mono text-[10px] uppercase text-gray-500 mb-2">Retail Price (£ inc VAT)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">£</span>
                <input 
                  type="number" 
                  step="0.01"
                  name="price_gbp"
                  defaultValue={formData.price_gbp / 100}
                  onBlur={handlePriceChange}
                  className="w-full border border-gray-300 pl-8 p-3 text-sm focus:border-brand-orange outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block font-mono text-[10px] uppercase text-gray-500 mb-2">Cost Price (£ trade)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">£</span>
                <input 
                  type="number" 
                  step="0.01"
                  name="cost_price"
                  defaultValue={formData.cost_price / 100}
                  onBlur={handlePriceChange}
                  className="w-full border border-gray-300 pl-8 p-3 text-sm focus:border-brand-orange outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block font-mono text-[10px] uppercase text-gray-500 mb-2">Compare At Price (£)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">£</span>
                <input 
                  type="number" 
                  step="0.01"
                  name="compare_at_price"
                  defaultValue={formData.compare_at_price / 100}
                  onBlur={handlePriceChange}
                  className="w-full border border-gray-300 pl-8 p-3 text-sm focus:border-brand-orange outline-none"
                />
              </div>
            </div>
            <div className="md:col-span-1">
              <label className="block font-mono text-[10px] uppercase text-gray-500 mb-2">VAT Rate</label>
              <select 
                name="vat_rate"
                value={formData.vat_rate}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 text-sm focus:border-brand-orange outline-none"
              >
                <option value={20}>20% (Standard)</option>
                <option value={5}>5% (Reduced)</option>
                <option value={0}>0% (Zero)</option>
              </select>
            </div>
            <div className="bg-gray-50 p-4 border border-gray-100 flex flex-col justify-center">
              <span className="font-mono text-[9px] uppercase text-gray-400 mb-1">Price Ex. VAT</span>
              <span className="font-display text-xl">£{((formData.price_gbp / 100) / (1 + formData.vat_rate / 100)).toFixed(2)}</span>
            </div>
            <div className="bg-gray-50 p-4 border border-gray-100 flex flex-col justify-center">
              <span className="font-mono text-[9px] uppercase text-gray-400 mb-1">Margin</span>
              <span className={cn(
                "font-display text-xl",
                ((formData.price_gbp - formData.cost_price) / formData.price_gbp * 100) > 30 ? "text-green-600" : "text-orange-600"
              )}>
                {formData.price_gbp > 0 ? (((formData.price_gbp - formData.cost_price) / formData.price_gbp) * 100).toFixed(1) : 0}%
              </span>
            </div>
          </div>
        </div>

        {/* SECTION: SPECIFICATIONS */}
        <div className="bg-white border border-gray-200 p-8 shadow-sm">
          <h2 className="font-display text-lg uppercase tracking-wider mb-6 pb-2 border-b border-gray-100">Specifications</h2>
          <div className="space-y-4 mb-6">
            {Object.entries(formData.specs || {}).map(([label, value]: [string, any]) => (
              <div key={label} className="flex gap-4 items-center bg-gray-50 p-3 border border-gray-200">
                <span className="font-mono text-[10px] uppercase text-gray-500 w-32 shrink-0">{label}</span>
                <span className="text-sm flex-1">{value}</span>
                <button onClick={() => handleRemoveSpec(label)} className="text-gray-400 hover:text-red-500">
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input 
              type="text" 
              placeholder="Label (e.g. Voltage)" 
              value={newSpec.label}
              onChange={(e) => setNewSpec({ ...newSpec, label: e.target.value })}
              className="border border-gray-300 p-2 text-xs outline-none focus:border-brand-orange"
            />
            <input 
              type="text" 
              placeholder="Value (e.g. 12V)" 
              value={newSpec.value}
              onChange={(e) => setNewSpec({ ...newSpec, value: e.target.value })}
              className="border border-gray-300 p-2 text-xs outline-none focus:border-brand-orange"
            />
            <button 
              onClick={handleAddSpec}
              className="bg-brand-carbon text-white font-mono text-[10px] uppercase tracking-widest py-2 hover:bg-brand-obsidian transition-colors"
            >
              Add Row
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT SIDEBAR */}
      <div className="w-full lg:w-80 space-y-8">
        
        {/* PUBLISH CARD */}
        <div className="bg-white border border-gray-200 p-6 shadow-sm">
          <h3 className="font-display text-sm uppercase tracking-widest mb-4">Status & Visibility</h3>
          <div className="space-y-4">
            <div>
              <label className="block font-mono text-[9px] uppercase text-gray-500 mb-1">Status</label>
              <select 
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 text-xs outline-none focus:border-brand-orange"
              >
                <option value="draft">Draft</option>
                <option value="active">Active</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            <div>
              <label className="block font-mono text-[9px] uppercase text-gray-500 mb-1">Visibility</label>
              <select 
                name="visibility"
                value={formData.visibility}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 text-xs outline-none focus:border-brand-orange"
              >
                <option value="public">Public</option>
                <option value="hidden">Hidden</option>
              </select>
            </div>
            <div className="flex items-center gap-2 py-2">
              <input 
                type="checkbox" 
                id="is_featured" 
                checked={formData.is_featured} 
                onChange={(e) => setFormData((prev: any) => ({ ...prev, is_featured: e.target.checked }))}
              />
              <label htmlFor="is_featured" className="font-mono text-[10px] uppercase text-gray-600">Featured Item</label>
            </div>
            <div className="flex items-center gap-2 py-2">
              <input 
                type="checkbox" 
                id="is_editor_pick" 
                checked={formData.is_editor_pick} 
                onChange={(e) => setFormData((prev: any) => ({ ...prev, is_editor_pick: e.target.checked }))}
              />
              <label htmlFor="is_editor_pick" className="font-mono text-[10px] uppercase text-gray-600">Editor's Pick</label>
            </div>
          </div>
          <div className="mt-6 space-y-2">
            <button 
              onClick={() => handleSave()}
              className="w-full bg-brand-orange text-white py-3 font-display text-[10px] uppercase tracking-widest hover:bg-orange-600 transition-colors shadow-lg shadow-orange-100"
            >
              Save Product
            </button>
            {productId && (
              <Link 
                href={`/store/product/${formData.slug}`}
                target="_blank"
                className="w-full flex items-center justify-center gap-2 bg-white text-gray-500 py-3 font-display text-[10px] uppercase tracking-widest border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <Eye size={14} /> Preview Store
              </Link>
            )}
          </div>
        </div>

        {/* PRODUCT COMPLETENESS */}
        <div className="bg-white border border-gray-200 p-6 shadow-sm">
          <div className="flex justify-between items-end mb-4">
            <h3 className="font-display text-sm uppercase tracking-widest">Completeness</h3>
            <span className={cn(
              "font-display text-2xl",
              score >= 80 ? "text-green-600" : score >= 40 ? "text-orange-600" : "text-red-600"
            )}>{score}%</span>
          </div>
          <div className="w-full h-1 bg-gray-100 mb-6">
            <div className={cn(
              "h-full transition-all",
              score >= 80 ? "bg-green-600" : score >= 40 ? "bg-orange-600" : "bg-red-600"
            )} style={{ width: `${score}%` }} />
          </div>
          <ul className="space-y-2">
            {[
              { label: "Product Name", ok: checks.name },
              { label: "Price", ok: checks.price },
              { label: "Description (>100 chars)", ok: checks.description },
              { label: "At least 1 image", ok: checks.image },
              { label: "Category", ok: checks.category },
              { label: "Specifications", ok: checks.specs },
              { label: "Supplier SKU", ok: checks.supplier_sku }
            ].map(item => (
              <li key={item.label} className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest">
                {item.ok ? <CheckCircle2 size={12} className="text-green-500" /> : <AlertCircle size={12} className="text-gray-300" />}
                <span className={item.ok ? "text-gray-700" : "text-gray-400"}>{item.label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ORGANISATION */}
        <div className="bg-white border border-gray-200 p-6 shadow-sm">
          <h3 className="font-display text-sm uppercase tracking-widest mb-4">Organisation</h3>
          <div className="space-y-4">
            <div>
              <label className="block font-mono text-[9px] uppercase text-gray-500 mb-1">Category</label>
              <select 
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 text-xs outline-none focus:border-brand-orange"
              >
                <option value="">Select Category</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block font-mono text-[9px] uppercase text-gray-500 mb-1">Subcategory</label>
              <input 
                type="text" 
                name="subcategory"
                value={formData.subcategory}
                onChange={handleChange}
                placeholder="e.g. Inverters"
                className="w-full border border-gray-300 p-2 text-xs outline-none focus:border-brand-orange"
              />
            </div>
          </div>
        </div>

        {/* DANGER ZONE */}
        {productId && (
          <div className="bg-red-50 border border-red-100 p-6 shadow-sm">
            <h3 className="font-display text-sm uppercase tracking-widest mb-4 text-red-600">Danger Zone</h3>
            <button 
              onClick={async () => {
                if (confirm("Permanently delete this product?")) {
                  await supabase.from("products").delete().eq("id", productId);
                  router.push("/admin/products");
                }
              }}
              className="w-full flex items-center justify-center gap-2 bg-white text-red-600 py-3 font-display text-[10px] uppercase tracking-widest border border-red-200 hover:bg-red-600 hover:text-white transition-all"
            >
              <Trash2 size={14} /> Delete Product
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
