"use client";

import { useEffect, useState, use } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, 
  Save, 
  User, 
  Truck, 
  FileText, 
  Package, 
  Plus, 
  Trash2, 
  ExternalLink,
  Globe,
  Mail,
  Phone
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function EditSupplierPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  
  const [activeTab, setActiveTab] = useState("profile");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const [supplier, setSupplier] = useState({
    id: "",
    name: "",
    website: "",
    status: "potential",
    trade_account: false,
    notes: "",
    categories: [] as string[],
    brands_handled: [] as string[],
    contact_name: "",
    contact_email: "",
    contact_phone: "",
    account_number: "",
    order_minimum: 0,
    lead_time_days: 14
  });

  const [documents, setDocuments] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [newDoc, setNewDoc] = useState({ label: "", url: "", type: "catalog" });
  const [newBrand, setNewBrand] = useState("");

  const availableCategories = ['electrical', 'solar', 'heating', 'water', 'plumbing', 'insulation', 'gas', 'ventilation', 'interiors', 'hardware', 'exterior', 'lifestyle'];

  useEffect(() => {
    async function fetchData() {
      // 1. Fetch Supplier
      const { data: s } = await supabase.from('suppliers').select('*').eq('id', id).single();
      if (s) {
        setSupplier({
          id: s.id,
          name: s.name,
          website: s.website || "",
          status: s.status || "potential",
          trade_account: s.trade_account || false,
          notes: s.notes || "",
          categories: s.categories || [],
          brands_handled: s.brands_handled || [],
          contact_name: s.contact_name || "",
          contact_email: s.contact_email || "",
          contact_phone: s.contact_phone || "",
          account_number: s.account_number || "",
          order_minimum: s.order_minimum || 0,
          lead_time_days: s.lead_time_days || 14
        });
      }

      // 2. Fetch Documents
      const { data: docs } = await supabase.from('supplier_documents').select('*').eq('supplier_id', id).order('created_at', { ascending: false });
      setDocuments(docs || []);

      // 3. Fetch Linked Products
      const { data: prods } = await supabase.from('products').select('*').eq('supplier_id', id).order('name');
      setProducts(prods || []);

      setLoading(false);
    }
    fetchData();
  }, [id]);

  const toggleCategory = (cat: string) => {
    setSupplier(prev => ({
      ...prev,
      categories: prev.categories.includes(cat) 
        ? prev.categories.filter(c => c !== cat)
        : [...prev.categories, cat]
    }));
  };

  const addBrand = () => {
    if (!newBrand || supplier.brands_handled.includes(newBrand)) return;
    setSupplier(prev => ({
      ...prev,
      brands_handled: [...prev.brands_handled, newBrand]
    }));
    setNewBrand("");
  };

  const removeBrand = (brand: string) => {
    setSupplier(prev => ({
      ...prev,
      brands_handled: prev.brands_handled.filter(b => b !== brand)
    }));
  };

  const handleAddDocument = async () => {
    if (!newDoc.label || !newDoc.url) return;
    const { data, error } = await supabase.from('supplier_documents').insert([{
      supplier_id: id,
      label: newDoc.label,
      document_url: newDoc.url,
      document_type: newDoc.type
    }]).select().single();

    if (data) {
      setDocuments([data, ...documents]);
      setNewDoc({ label: "", url: "", type: "catalog" });
    }
  };

  const handleDeleteDocument = async (docId: string) => {
    await supabase.from('supplier_documents').delete().eq('id', docId);
    setDocuments(documents.filter(d => d.id !== docId));
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
      status: supplier.status,
      trade_account: supplier.status === 'active_trade',
      notes: supplier.notes,
      categories: supplier.categories,
      brands_handled: supplier.brands_handled,
      contact_name: supplier.contact_name,
      contact_email: supplier.contact_email,
      contact_phone: supplier.contact_phone,
      account_number: supplier.account_number,
      order_minimum: supplier.order_minimum,
      lead_time_days: supplier.lead_time_days
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
    <div className="p-8 pb-32 min-h-screen bg-brand-obsidian text-brand-white">
      <div className="max-w-6xl mx-auto">
        <Link href="/admin/store/suppliers" className="flex items-center gap-2 font-mono text-[10px] text-brand-orange uppercase tracking-[0.3em] mb-8 hover:text-brand-white transition-colors">
          <ArrowLeft size={12} /> Back to Network
        </Link>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <h1 className="font-display text-5xl uppercase tracking-tighter mb-2">Edit Supplier</h1>
            <p className="font-mono text-[10px] text-brand-grey uppercase tracking-widest">{supplier.name}</p>
          </div>
          <button 
            onClick={handleSave}
            disabled={saving}
            className="px-12 py-5 bg-brand-orange text-brand-white font-mono text-[12px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all flex items-center justify-center gap-3"
          >
             {saving ? "Saving..." : <><Save size={16} /> Save Changes</>}
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-brand-border/50 mb-12">
          {[
            { id: 'profile', label: 'Company Profile', icon: User },
            { id: 'logistics', label: 'Logistics & Contact', icon: Truck },
            { id: 'documents', label: 'Document Vault', icon: FileText },
            { id: 'products', label: 'Linked Products', icon: Package },
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "px-8 py-4 font-mono text-[10px] uppercase tracking-widest border-b-2 transition-all flex items-center gap-2",
                  activeTab === tab.id 
                    ? "border-brand-orange text-brand-orange bg-brand-orange/5" 
                    : "border-transparent text-brand-grey hover:text-brand-white hover:border-brand-border"
                )}
              >
                <Icon size={14} />
                {tab.label}
              </button>
            )
          })}
        </div>
        
        <div className="grid grid-cols-1 gap-12">
          
          {/* TAB 1: PROFILE */}
          {activeTab === 'profile' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-2">Company Name *</label>
                    <input 
                      type="text" 
                      value={supplier.name}
                      onChange={(e) => setSupplier({ ...supplier, name: e.target.value })}
                      className="w-full bg-brand-carbon border border-brand-border p-4 font-sans text-sm text-brand-white focus:border-brand-orange outline-none"
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
                  <div>
                    <label className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-2">Internal CRM Notes</label>
                    <textarea 
                      value={supplier.notes}
                      onChange={(e) => setSupplier({ ...supplier, notes: e.target.value })}
                      className="w-full bg-brand-carbon border border-brand-border p-4 font-sans text-sm text-brand-white h-48 focus:border-brand-orange outline-none"
                      placeholder="Contacts, order thresholds, discounts..."
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-2">Main Website</label>
                    <div className="relative">
                      <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-grey" />
                      <input 
                        type="text" 
                        value={supplier.website}
                        onChange={(e) => setSupplier({ ...supplier, website: e.target.value })}
                        className="w-full bg-brand-carbon border border-brand-border pl-12 pr-4 py-4 font-sans text-sm text-brand-white focus:border-brand-orange outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-4">Focus Categories</label>
                    <div className="flex flex-wrap gap-2">
                      {availableCategories.map(cat => (
                        <button
                          key={cat}
                          onClick={() => toggleCategory(cat)}
                          className={cn(
                            "px-4 py-2 font-mono text-[9px] uppercase tracking-widest border transition-all",
                            supplier.categories.includes(cat)
                              ? "bg-brand-orange border-brand-orange text-brand-white" 
                              : "border-brand-border text-brand-grey hover:border-brand-grey"
                          )}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-4 italic text-brand-orange">Brand Portfolio</label>
                    <div className="blueprint-border p-6 bg-brand-obsidian/50 space-y-4">
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          value={newBrand}
                          onChange={(e) => setNewBrand(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addBrand())}
                          placeholder="e.g. RIB Seats"
                          className="flex-1 bg-brand-carbon border border-brand-border p-3 font-sans text-xs text-brand-white focus:border-brand-orange outline-none"
                        />
                        <button 
                          onClick={addBrand}
                          className="px-6 py-3 bg-brand-orange text-brand-white font-mono text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all"
                        >
                          Add
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {supplier.brands_handled.length === 0 ? (
                          <span className="font-mono text-[8px] text-brand-grey uppercase tracking-widest italic">No brands associated.</span>
                        ) : (
                          supplier.brands_handled.map(brand => (
                            <span 
                              key={brand} 
                              className="group flex items-center gap-2 px-3 py-1 bg-brand-carbon border border-brand-border/50 font-mono text-[9px] text-brand-white uppercase tracking-widest"
                            >
                              {brand}
                              <button onClick={() => removeBrand(brand)} className="text-brand-grey hover:text-red-500 transition-colors">
                                <Trash2 size={10} />
                              </button>
                            </span>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LOGISTICS */}
          {activeTab === 'logistics' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="blueprint-border p-8 bg-brand-carbon/20 space-y-6">
                    <h3 className="font-display text-2xl uppercase mb-4 text-brand-orange">Points of Contact</h3>
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
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-grey" />
                          <input 
                            type="email" 
                            value={supplier.contact_email}
                            onChange={(e) => setSupplier({ ...supplier, contact_email: e.target.value })}
                            className="w-full bg-brand-carbon border border-brand-border pl-12 pr-4 py-4 font-sans text-sm text-brand-white focus:border-brand-orange outline-none"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-2">Phone</label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-grey" />
                          <input 
                            type="text" 
                            value={supplier.contact_phone}
                            onChange={(e) => setSupplier({ ...supplier, contact_phone: e.target.value })}
                            className="w-full bg-brand-carbon border border-brand-border pl-12 pr-4 py-4 font-sans text-sm text-brand-white focus:border-brand-orange outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="blueprint-border p-8 bg-brand-carbon/20 space-y-6">
                    <h3 className="font-display text-2xl uppercase mb-4 text-brand-orange">Account Logistics</h3>
                    <div>
                      <label className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-2">Wholesale Account Number</label>
                      <input 
                        type="text" 
                        value={supplier.account_number}
                        onChange={(e) => setSupplier({ ...supplier, account_number: e.target.value })}
                        className="w-full bg-brand-carbon border border-brand-border p-4 font-mono text-sm text-brand-white focus:border-brand-orange outline-none"
                        placeholder="ACC-XXXXX"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-2">Order Minimum (£)</label>
                        <input 
                          type="number" 
                          value={supplier.order_minimum}
                          onChange={(e) => setSupplier({ ...supplier, order_minimum: parseFloat(e.target.value) })}
                          className="w-full bg-brand-carbon border border-brand-border p-4 font-mono text-sm text-brand-white focus:border-brand-orange outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-2">Lead Time (Days)</label>
                        <input 
                          type="number" 
                          value={supplier.lead_time_days}
                          onChange={(e) => setSupplier({ ...supplier, lead_time_days: parseInt(e.target.value) })}
                          className="w-full bg-brand-carbon border border-brand-border p-4 font-mono text-sm text-brand-white focus:border-brand-orange outline-none"
                        />
                      </div>
                    </div>
                  </div>
               </div>
            </div>
          )}

          {/* TAB 3: DOCUMENTS */}
          {activeTab === 'documents' && (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-500">
              
              {/* Add Document Section */}
              <div className="blueprint-border p-8 bg-brand-carbon/30">
                <h3 className="font-display text-xl uppercase mb-6 italic text-brand-orange">Add New Document Entity</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-2">Document Label</label>
                    <input 
                      type="text" 
                      value={newDoc.label}
                      onChange={(e) => setNewDoc({ ...newDoc, label: e.target.value })}
                      className="w-full bg-brand-obsidian border border-brand-border p-4 font-sans text-xs text-brand-white focus:border-brand-orange outline-none"
                      placeholder="e.g. 2024 Trade Catalog"
                    />
                  </div>
                  <div className="md:col-span-1">
                    <label className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-2">Document URL / Path</label>
                    <input 
                      type="text" 
                      value={newDoc.url}
                      onChange={(e) => setNewDoc({ ...newDoc, url: e.target.value })}
                      className="w-full bg-brand-obsidian border border-brand-border p-4 font-sans text-xs text-brand-white focus:border-brand-orange outline-none"
                      placeholder="https://drive.google.com/..."
                    />
                  </div>
                   <div>
                    <label className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-2">Doc Type</label>
                    <select 
                      value={newDoc.type}
                      onChange={(e) => setNewDoc({ ...newDoc, type: e.target.value })}
                      className="w-full bg-brand-obsidian border border-brand-border p-4 font-mono text-[9px] uppercase tracking-widest text-brand-white focus:border-brand-orange outline-none"
                    >
                      <option value="catalog">Product Catalog</option>
                      <option value="price_list">Price List</option>
                      <option value="agreement">Trade Agreement</option>
                      <option value="invoice">invoice / Receipt</option>
                    </select>
                  </div>
                </div>
                <button 
                  onClick={handleAddDocument}
                  className="mt-6 px-10 py-4 bg-brand-orange text-brand-white font-mono text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all flex items-center gap-2"
                >
                  <Plus size={14} /> Register Document
                </button>
              </div>

              {/* Documents List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {documents.map(doc => (
                  <div key={doc.id} className="blueprint-border p-6 bg-brand-carbon group hover:border-brand-orange transition-all">
                     <div className="flex justify-between items-start mb-4">
                        <span className="font-mono text-[8px] text-brand-orange uppercase border border-brand-orange/30 px-2 py-1 italic">
                          {doc.document_type || 'unclassified'}
                        </span>
                        <button onClick={() => handleDeleteDocument(doc.id)} className="text-brand-grey hover:text-red-500 transition-colors">
                          <Trash2 size={14} />
                        </button>
                     </div>
                     <h4 className="font-display text-xl uppercase mb-4 tracking-wider">{doc.label}</h4>
                     <a 
                      href={doc.document_url} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="font-mono text-[9px] text-brand-grey uppercase tracking-widest flex items-center gap-2 hover:text-brand-orange transition-colors"
                    >
                        View Resource <ExternalLink size={10} />
                     </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: PRODUCTS */}
          {activeTab === 'products' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
               <div className="blueprint-border bg-brand-carbon overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-brand-obsidian/50 border-b border-brand-border/50 font-mono text-[10px] text-brand-grey uppercase tracking-widest">
                        <th className="p-6">Product Item</th>
                        <th className="p-6">Serial / SKU</th>
                        <th className="p-6">Category</th>
                        <th className="p-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-border/50 font-sans text-sm">
                      {products.length === 0 ? (
                        <tr><td colSpan={4} className="p-12 text-center text-brand-grey font-mono text-[10px] uppercase tracking-widest italic">No products currently sourced from this supplier.</td></tr>
                      ) : (
                        products.map(p => (
                          <tr key={p.id} className="hover:bg-brand-obsidian/30 transition-colors">
                            <td className="p-6">
                              <span className="font-display uppercase tracking-wide">{p.name}</span>
                              <span className="block text-[10px] text-brand-grey">{p.brand}</span>
                            </td>
                            <td className="p-6 font-mono text-xs">{p.sku || 'N/A'}</td>
                            <td className="p-6">
                              <span className="font-mono text-[9px] uppercase tracking-widest bg-brand-obsidian px-2 py-1 border border-brand-border/30">
                                {p.category}
                              </span>
                            </td>
                            <td className="p-6 text-right">
                              <Link href={`/admin/store/products/${p.id}`} className="text-brand-orange hover:underline font-mono text-[9px] uppercase tracking-widest">Edit product →</Link>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
