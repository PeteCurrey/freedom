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
    status: "potential",
    notes: "",
    categories: [] as string[],
    contact_name: "",
    contact_email: "",
    contact_phone: "",
    account_number: "",
    order_minimum: 0,
    lead_time_days: 14
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
      status: supplier.status,
      trade_account: supplier.status === 'active_trade',
      notes: supplier.notes,
      categories: supplier.categories,
      contact_name: supplier.contact_name,
      contact_email: supplier.contact_email,
      contact_phone: supplier.contact_phone,
      account_number: supplier.account_number,
      order_minimum: supplier.order_minimum,
      lead_time_days: supplier.lead_time_days
    }]);

    setSaving(false);
    if (error) {
      alert("Error saving supplier: " + error.message);
    } else {
      router.push("/admin/store/suppliers");
    }
  };

  return (
    <div className="p-8 pb-32 min-h-screen bg-brand-obsidian text-brand-white">
      <div className="max-w-4xl mx-auto">
        <Link href="/admin/store/suppliers" className="flex items-center gap-2 font-mono text-[10px] text-brand-orange uppercase tracking-[0.3em] mb-8 hover:text-brand-white transition-colors">
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
                className="w-full bg-brand-carbon border border-brand-border p-4 font-sans text-sm text-brand-white focus:border-brand-orange outline-none"
                placeholder="e.g. Energy Solutions"
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-2">Account Status</label>
              <select 
                value={supplier.status}
                onChange={(e) => setSupplier({ ...supplier, status: e.target.value })}
                className="w-full bg-brand-carbon border border-brand-border p-4 font-mono text-[10px] uppercase tracking-widest text-brand-white focus:border-brand-orange outline-none"
              >
                <option value="potential">Potential Supplier</option>
                <option value="applied">Application Pending</option>
                <option value="active_trade">Account Active</option>
                <option value="on_hold">Account On Hold</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-2">Main Website</label>
              <input 
                type="text" 
                value={supplier.website}
                onChange={(e) => setSupplier({ ...supplier, website: e.target.value })}
                className="w-full bg-brand-carbon border border-brand-border p-4 font-sans text-sm text-brand-white focus:border-brand-orange outline-none"
                placeholder="energy-solutions.co.uk"
              />
            </div>
             <div>
              <label className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-2">Acc Number (Optional)</label>
              <input 
                type="text" 
                value={supplier.account_number}
                onChange={(e) => setSupplier({ ...supplier, account_number: e.target.value })}
                className="w-full bg-brand-carbon border border-brand-border p-4 font-mono text-xs text-brand-white focus:border-brand-orange outline-none"
                placeholder="ACC-XXXXX"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-brand-border/30">
             <div>
                <label className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-2">Contact Name</label>
                <input 
                  type="text" 
                  value={supplier.contact_name}
                  onChange={(e) => setSupplier({ ...supplier, contact_name: e.target.value })}
                  className="w-full bg-brand-carbon border border-brand-border p-4 font-sans text-sm text-brand-white focus:border-brand-orange outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-2">Email</label>
                  <input 
                    type="email" 
                    value={supplier.contact_email}
                    onChange={(e) => setSupplier({ ...supplier, contact_email: e.target.value })}
                    className="w-full bg-brand-carbon border border-brand-border p-4 font-sans text-sm text-brand-white focus:border-brand-orange outline-none"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-2">Phone</label>
                  <input 
                    type="text" 
                    value={supplier.contact_phone}
                    onChange={(e) => setSupplier({ ...supplier, contact_phone: e.target.value })}
                    className="w-full bg-brand-carbon border border-brand-border p-4 font-sans text-sm text-brand-white focus:border-brand-orange outline-none"
                  />
                </div>
              </div>
          </div>

          <div>
            <label className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-2">Internal CRM Notes</label>
            <textarea 
              value={supplier.notes}
              onChange={(e) => setSupplier({ ...supplier, notes: e.target.value })}
              className="w-full bg-brand-carbon border border-brand-border p-4 font-sans text-sm text-brand-white h-32 focus:border-brand-orange outline-none"
              placeholder="Contacts, order thresholds, discounts..."
            />
          </div>

          <div>
            <label className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-4">Initial Category Focus</label>
            <div className="flex flex-wrap gap-3">
              {availableCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  className={`px-4 py-2 font-mono text-[10px] uppercase tracking-widest border transition-colors ${
                    supplier.categories.includes(cat)
                      ? 'bg-brand-orange text-brand-white border-brand-orange'
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
           className="w-full md:w-auto px-12 py-5 bg-brand-orange text-brand-white font-mono text-[12px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all flex items-center justify-center gap-3"
          >
             {saving ? "Registering..." : <><Save size={16} /> Save Supplier</>}
          </button>
        </div>
      </div>
    </div>
  );
}
