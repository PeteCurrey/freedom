"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

export default function NewSupplierPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [supplier, setSupplier] = useState({
    name: "",
    website: "",
    trade_account: false,
    notes: "",
    categories: [] as string[]
  });

  const availableCategories = ['electrical', 'solar', 'heating', 'water', 'plumbing', 'insulation', 'gas', 'ventilation', 'interiors', 'hardware'];

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

    const { error } = await supabase.from('suppliers').insert([{
      name: supplier.name,
      website: formattedWebsite,
      trade_account: supplier.trade_account,
      notes: supplier.notes,
      categories: supplier.categories
    }]);

    setSaving(false);
    if (error) {
      alert("Error saving supplier: " + error.message);
    } else {
      router.push("/admin/store/suppliers");
    }
  };

  return (
    <div className="p-8 pb-32 min-h-screen bg-brand-obsidian text-white">
      <div className="max-w-4xl mx-auto">
        <Link href="/admin/store/suppliers" className="flex items-center gap-2 font-mono text-[10px] text-brand-orange uppercase tracking-[0.3em] mb-8 hover:text-white transition-colors">
          <ArrowLeft size={12} /> Back to Network
        </Link>
        
        <h1 className="font-display text-4xl uppercase tracking-tighter mb-12">Register Supplier</h1>
        
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
             {saving ? "Registering..." : <><Save size={16} /> Save Supplier</>}
          </button>
        </div>
      </div>
    </div>
  );
}
