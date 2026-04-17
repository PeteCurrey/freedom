"use client";

import { useEffect, useState, use } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

export default function EditSupplierPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [supplier, setSupplier] = useState({
    id: "",
    name: "",
    website: "",
    trade_account: false,
    notes: "",
    categories: [] as string[]
  });

  const availableCategories = ['electrical', 'solar', 'heating', 'water', 'plumbing', 'insulation', 'gas', 'ventilation', 'interiors', 'hardware'];

  useEffect(() => {
    async function fetchSupplier() {
      const { data } = await supabase.from('suppliers').select('*').eq('id', id).single();
      if (data) {
        setSupplier({
          id: data.id,
          name: data.name,
          website: data.website || "",
          trade_account: data.trade_account || false,
          notes: data.notes || "",
          categories: data.categories || []
        });
      }
      setLoading(false);
    }
    fetchSupplier();
  }, [id]);

  const toggleCategory = (cat: string) => {
    setSupplier(prev => ({
      ...prev,
      categories: prev.categories.includes(cat) 
        ? prev.categories.filter(c => c !== cat)
        : [...prev.categories, cat]
    }));
  };

  const handleSave = async () => {
    if (!supplier.name) {
      alert("Supplier name is required.");
      return;
    }
    setSaving(true);
    
    // Auto format website
    let formattedWebsite = supplier.website;
    if (formattedWebsite && !formattedWebsite.startsWith('http')) {
      formattedWebsite = `https://${formattedWebsite}`;
    }

    const { error } = await supabase.from('suppliers').update({
      name: supplier.name,
      website: formattedWebsite,
      trade_account: supplier.trade_account,
      notes: supplier.notes,
      categories: supplier.categories
    }).eq('id', id);

    setSaving(false);
    if (error) {
      alert("Error updating supplier: " + error.message);
    } else {
      router.push("/admin/store/suppliers");
    }
  };

  if (loading) return <div className="p-12 text-brand-grey font-mono text-[10px] uppercase">Loading...</div>;

  return (
    <div className="p-8 pb-32 min-h-screen bg-brand-obsidian text-white">
      <div className="max-w-4xl mx-auto">
        <Link href="/admin/store/suppliers" className="flex items-center gap-2 font-mono text-[10px] text-brand-orange uppercase tracking-[0.3em] mb-8 hover:text-white transition-colors">
          <ArrowLeft size={12} /> Back to Network
        </Link>
        
        <h1 className="font-display text-4xl uppercase tracking-tighter mb-12">Edit Supplier</h1>
        
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-2">Company Name *</label>
              <input 
                type="text" 
                value={supplier.name}
                onChange={(e) => setSupplier({ ...supplier, name: e.target.value })}
                className="w-full bg-brand-carbon border border-brand-border p-4 font-sans text-sm text-white focus:border-brand-orange outline-none"
                placeholder="e.g. Energy Solutions"
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-2">Company Website</label>
              <input 
                type="text" 
                value={supplier.website}
                onChange={(e) => setSupplier({ ...supplier, website: e.target.value })}
                className="w-full bg-brand-carbon border border-brand-border p-4 font-sans text-sm text-white focus:border-brand-orange outline-none"
                placeholder="energy-solutions.co.uk"
              />
            </div>
          </div>

          <div>
             <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={supplier.trade_account}
                  onChange={(e) => setSupplier({...supplier, trade_account: e.target.checked})}
                  className="w-5 h-5 accent-brand-orange bg-brand-carbon border-brand-border"
                />
                <span className="font-mono text-xs uppercase tracking-widest">Active Trade Account Connected</span>
             </label>
          </div>

          <div>
            <label className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-2">Internal CRM Notes</label>
            <textarea 
              value={supplier.notes}
              onChange={(e) => setSupplier({ ...supplier, notes: e.target.value })}
              className="w-full bg-brand-carbon border border-brand-border p-4 font-sans text-sm text-white h-32 focus:border-brand-orange outline-none"
              placeholder="Contacts, order thresholds, discounts..."
            />
          </div>

          <div>
            <label className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-4">Category Focus Areas</label>
            <div className="flex flex-wrap gap-3">
              {availableCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  className={`px-4 py-2 font-mono text-[10px] uppercase tracking-widest border transition-colors ${
                    supplier.categories.includes(cat)
                      ? 'bg-brand-orange text-white border-brand-orange'
                      : 'bg-brand-carbon text-brand-grey border-brand-border hover:border-brand-orange/50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-brand-border/50">
          <button 
           onClick={handleSave}
           disabled={saving}
           className="w-full md:w-auto px-12 py-5 bg-brand-orange text-white font-mono text-[12px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all flex items-center justify-center gap-3"
          >
             {saving ? "Saving..." : <><Save size={16} /> Save Changes</>}
          </button>
        </div>
      </div>
    </div>
  );
}
