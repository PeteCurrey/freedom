"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Truck, 
  Plus, 
  ExternalLink, 
  Mail, 
  Phone, 
  Edit3, 
  Trash2, 
  Loader2, 
  FileUp,
  Globe,
  Clock,
  Shield
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newSupplier, setNewSupplier] = useState({
    name: "",
    website: "",
    account_number: "",
    contact_name: "",
    contact_email: "",
    notes: "",
    lead_time: ""
  });

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("suppliers")
      .select("*")
      .order("name", { ascending: true });
    
    setSuppliers(data || []);
    setLoading(false);
  };

  const handleAdd = async () => {
    try {
      const { error } = await supabase.from("suppliers").insert([newSupplier]);
      if (error) throw error;
      fetchSuppliers();
      setIsAdding(false);
      setNewSupplier({
        name: "",
        website: "",
        account_number: "",
        contact_name: "",
        contact_email: "",
        notes: "",
        lead_time: ""
      });
    } catch (error) {
      console.error("Error adding supplier:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-[1400px] mx-auto px-8 py-12">
        {/* Header */}
        <div className="mb-12 flex justify-between items-end">
          <div>
            <h1 className="font-display text-5xl uppercase tracking-tighter text-gray-900">
              Supplier <span className="text-brand-orange">Network</span>
            </h1>
            <p className="font-sans text-gray-500 mt-2">Manage your authorized trade vendors, account details, and procurement terms.</p>
          </div>
          <button 
            onClick={() => setIsAdding(true)}
            className="bg-brand-orange text-white px-8 py-4 font-display text-[10px] uppercase tracking-widest hover:bg-orange-600 transition-all flex items-center gap-2 shadow-lg shadow-orange-100"
          >
            <Plus size={16} /> Add Supplier
          </button>
        </div>

        {isAdding && (
          <div className="bg-white border border-gray-200 p-8 shadow-md mb-12 animate-in slide-in-from-top-4 duration-300">
            <h2 className="font-display text-xl uppercase tracking-tight mb-8">New Supplier Record</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div>
                <label className="block font-mono text-[9px] uppercase text-gray-400 mb-2">Company Name</label>
                <input 
                  type="text" 
                  value={newSupplier.name}
                  onChange={(e) => setNewSupplier({...newSupplier, name: e.target.value})}
                  className="w-full border border-gray-200 p-3 text-xs outline-none focus:border-brand-orange"
                />
              </div>
              <div>
                <label className="block font-mono text-[9px] uppercase text-gray-400 mb-2">Website</label>
                <input 
                  type="text" 
                  value={newSupplier.website}
                  onChange={(e) => setNewSupplier({...newSupplier, website: e.target.value})}
                  className="w-full border border-gray-200 p-3 text-xs outline-none focus:border-brand-orange"
                />
              </div>
              <div>
                <label className="block font-mono text-[9px] uppercase text-gray-400 mb-2">Trade Account #</label>
                <input 
                  type="text" 
                  value={newSupplier.account_number}
                  onChange={(e) => setNewSupplier({...newSupplier, account_number: e.target.value})}
                  className="w-full border border-gray-200 p-3 text-xs outline-none focus:border-brand-orange"
                />
              </div>
              <div>
                <label className="block font-mono text-[9px] uppercase text-gray-400 mb-2">Primary Contact</label>
                <input 
                  type="text" 
                  value={newSupplier.contact_name}
                  onChange={(e) => setNewSupplier({...newSupplier, contact_name: e.target.value})}
                  className="w-full border border-gray-200 p-3 text-xs outline-none focus:border-brand-orange"
                />
              </div>
              <div>
                <label className="block font-mono text-[9px] uppercase text-gray-400 mb-2">Contact Email</label>
                <input 
                  type="email" 
                  value={newSupplier.contact_email}
                  onChange={(e) => setNewSupplier({...newSupplier, contact_email: e.target.value})}
                  className="w-full border border-gray-200 p-3 text-xs outline-none focus:border-brand-orange"
                />
              </div>
              <div>
                <label className="block font-mono text-[9px] uppercase text-gray-400 mb-2">Lead Time</label>
                <input 
                  type="text" 
                  value={newSupplier.lead_time}
                  onChange={(e) => setNewSupplier({...newSupplier, lead_time: e.target.value})}
                  className="w-full border border-gray-200 p-3 text-xs outline-none focus:border-brand-orange"
                />
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <button onClick={() => setIsAdding(false)} className="px-8 py-3 font-display text-[10px] uppercase tracking-widest text-gray-400 hover:text-gray-600 transition-colors">Cancel</button>
              <button onClick={handleAdd} className="bg-brand-carbon text-white px-8 py-3 font-display text-[10px] uppercase tracking-widest hover:bg-brand-obsidian transition-colors">Save Supplier</button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {loading ? (
            <div className="col-span-full py-20 flex justify-center"><Loader2 className="animate-spin text-brand-orange" /></div>
          ) : suppliers.map(s => (
            <div key={s.id} className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden group">
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-16 h-16 bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-300">
                    <Truck size={32} />
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-gray-300 hover:text-brand-orange transition-colors"><Edit3 size={16} /></button>
                    <button className="p-2 text-gray-300 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                  </div>
                </div>

                <h3 className="font-display text-2xl uppercase tracking-tighter text-gray-900 mb-2">{s.name}</h3>
                <div className="flex items-center gap-4 mb-6">
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-brand-orange bg-orange-50 px-2 py-0.5 border border-orange-100">
                    Account: {s.account_number || "PENDING"}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-gray-400">
                    Terms: {s.payment_terms || "Standard 30 Days"}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-8 py-6 border-y border-gray-50">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-gray-500 hover:text-brand-orange transition-colors">
                      <Globe size={14} className="shrink-0" />
                      <a href={s.website} target="_blank" className="font-sans text-xs truncate">{s.website?.replace('https://', '')}</a>
                    </div>
                    <div className="flex items-center gap-3 text-gray-500">
                      <Clock size={14} className="shrink-0" />
                      <span className="font-sans text-xs">Lead Time: {s.lead_time || "3-5 Working Days"}</span>
                    </div>
                  </div>
                  <div className="space-y-4 border-l border-gray-50 pl-6">
                    <div className="flex items-center gap-3 text-gray-500">
                      <Mail size={14} className="shrink-0" />
                      <span className="font-sans text-xs truncate">{s.contact_email || "N/A"}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-500">
                      <Shield size={14} className="shrink-0" />
                      <span className="font-sans text-xs">{s.contact_name || "Account Manager"}</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="bg-gray-50 px-4 py-2 border border-gray-100 rounded-full">
                    <span className="font-mono text-[9px] uppercase text-gray-400">Total Products: <span className="text-gray-900 font-bold">142</span></span>
                  </div>
                  <button className="font-mono text-[9px] uppercase tracking-widest text-brand-orange hover:underline flex items-center gap-2">
                    Import Price List <FileUp size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
