"use client";

import { useState, useRef, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { ArrowLeft, Upload, CheckCircle, Database } from "lucide-react";

export default function StoreImportPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [suppliers, setSuppliers] = useState<any[]>([]);
  
  const [targetCategory, setTargetCategory] = useState("");
  const [targetSupplier, setTargetSupplier] = useState("");
  const [conflictStrategy, setConflictStrategy] = useState<"skip" | "overwrite">("skip");
  
  const [parsedData, setParsedData] = useState<any[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [mapping, setMapping] = useState({ sku: "", name: "", price: "", brand: "" });
  
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [summary, setSummary] = useState<{ processed: number, successes: number, errors: number } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function fetchData() {
      const [{ data: cData }, { data: sData }] = await Promise.all([
        supabase.from('product_categories').select('id, name'),
        supabase.from('suppliers').select('id, name')
      ]);
      setCategories(cData || []);
      setSuppliers(sData || []);
    }
    fetchData();
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      parseCSV(text);
    };
    reader.readAsText(file);
  };

  const parseCSV = (text: string) => {
    // Basic CSV Parser (handles standard comma separation without complex escaping)
    const lines = text.split(/\r?\n/).filter(line => line.trim());
    if (lines.length < 2) return alert("Empty or invalid CSV file.");

    const rawHeaders = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
    setHeaders(rawHeaders);
    
    // Auto guess mappings
    const guess = { sku: "", name: "", price: "", brand: "" };
    rawHeaders.forEach(h => {
      const hl = h.toLowerCase();
      if (hl.includes("sku") || hl.includes("code") || hl.includes("part no") || hl.includes("ref")) guess.sku = h;
      else if (hl.includes("name") || hl.includes("title") || hl.includes("description")) guess.name = h;
      else if (hl.includes("price") || hl.includes("cost") || hl.includes("gbp") || hl.includes("net") || hl.includes("trade")) guess.price = h;
      else if (hl.includes("brand") || hl.includes("make") || hl.includes("manufacturer")) guess.brand = h;
    });
    setMapping(guess);

    const rows = lines.slice(1).map(line => {
      // Improved CSV split that handles quoted commas
      const values: string[] = [];
      let current = "";
      let inQuotes = false;
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') inQuotes = !inQuotes;
        else if (char === ',' && !inQuotes) {
          values.push(current.trim());
          current = "";
        } else {
          current += char;
        }
      }
      values.push(current.trim());

      const obj: any = {};
      rawHeaders.forEach((h, i) => {
        obj[h] = values[i] ? values[i].replace(/^"|"$/g, '').trim() : "";
      });
      return obj;
    });
    setParsedData(rows);
  };

  const executeImport = async () => {
    if (!mapping.sku || !mapping.name || !mapping.price) {
      return alert("You must map at least SKU, Name, and Price to proceed.");
    }
    if (!targetCategory || !targetSupplier) {
      return alert("Select a Category and Supplier to assign these products to.");
    }

    setUploading(true);
    setSummary(null);
    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < parsedData.length; i++) {
       const row = parsedData[i];
       
       const rawPrice = row[mapping.price];
       const numericPrice = parseFloat(rawPrice.replace(/[^0-9.]/g, ''));
       
       if (!row[mapping.sku] || !row[mapping.name] || isNaN(numericPrice)) {
          errorCount++;
          continue;
       }

       // Construct payload matching DB schema
       const payload = {
          name: row[mapping.name],
          sku: row[mapping.sku],
          brand: mapping.brand ? row[mapping.brand] : "",
          price_gbp: numericPrice * 100, // DB expects pence
          category_id: targetCategory,
          supplier_id: targetSupplier,
          slug: row[mapping.name].toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
          is_active: true
       };

       try {
         // Check if exists
         const { data: existing } = await supabase.from('products').select('id').eq('sku', payload.sku).single();
         
         if (existing) {
            if (conflictStrategy === "overwrite") {
               await supabase.from('products').update(payload).eq('id', existing.id);
               successCount++;
            } else {
               // Skip
            }
         } else {
            // Insert new 
            const { error: insErr } = await supabase.from('products').insert([payload]);
            if (insErr) errorCount++;
            else successCount++;
         }
       } catch (err) {
         errorCount++;
       }

       setProgress(Math.round(((i + 1) / parsedData.length) * 100));
    }

    setSummary({ processed: parsedData.length, successes: successCount, errors: errorCount });
    setUploading(false);
  };

  return (
    <div className="p-8 pb-32 min-h-screen bg-brand-obsidian text-brand-white">
      <div className="max-w-6xl mx-auto">
        <Link href="/admin/store" className="flex items-center gap-2 font-mono text-[10px] text-brand-orange uppercase tracking-[0.3em] mb-8 hover:text-brand-white transition-colors">
          <ArrowLeft size={12} /> Back to Store
        </Link>
        <h1 className="font-display text-5xl uppercase tracking-tighter mb-4 flex items-center gap-4">
          Mass Product <span className="text-brand-orange">Uploader</span>
        </h1>
        <p className="font-sans text-brand-grey max-w-2xl text-lg mb-12">
          Sync your trade catalogs directly. Map columns from your supplier's CSV file directly to our product database.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           <div className="lg:col-span-4 space-y-6">
              {/* Configuration Panel */}
              <div className="bg-brand-carbon blueprint-border p-6 space-y-6">
                 <h2 className="font-mono text-xs uppercase tracking-widest text-brand-white">1. Global Config</h2>
                 
                 <div>
                    <label className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-2">Assign to Category</label>
                    <select value={targetCategory} onChange={e => setTargetCategory(e.target.value)} className="w-full bg-brand-obsidian p-3 border border-brand-border outline-none focus:border-brand-orange font-sans text-sm">
                       <option value="">Select Category...</option>
                       {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                 </div>
                 
                 <div>
                    <label className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-2">Assign Supplier</label>
                    <select value={targetSupplier} onChange={e => setTargetSupplier(e.target.value)} className="w-full bg-brand-obsidian p-3 border border-brand-border outline-none focus:border-brand-orange font-sans text-sm">
                       <option value="">Select Supplier...</option>
                       {suppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                    </select>
                 </div>

                 <div>
                    <label className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-2">Conflict Rule</label>
                    <select value={conflictStrategy} onChange={e => setConflictStrategy(e.target.value as any)} className="w-full bg-brand-obsidian p-3 border border-brand-border outline-none focus:border-brand-orange font-sans text-sm">
                       <option value="skip">Skip Existing (Preserve existing data)</option>
                       <option value="overwrite">Overwrite (Update pricing/details)</option>
                    </select>
                 </div>
              </div>

              {/* Upload Panel */}
              <div className="bg-brand-carbon blueprint-border p-6 flex flex-col items-center justify-center text-center space-y-4">
                 <Database className="w-8 h-8 text-brand-orange mb-2" />
                 <h2 className="font-mono text-xs uppercase tracking-widest text-brand-white">2. Upload Feed</h2>
                 <p className="font-sans text-brand-grey text-xs">Must be a standard comma-separated CSV file mapping one product per row.</p>
                 
                 <input type="file" accept=".csv" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
                 <button onClick={() => fileInputRef.current?.click()} className="w-full py-3 bg-brand-orange text-brand-white font-mono text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all flex items-center justify-center gap-2">
                    <Upload size={14} /> Select CSV File
                 </button>
              </div>
           </div>

           <div className="lg:col-span-8">
              {/* Mapping & Preview */}
              <div className="bg-brand-carbon blueprint-border p-6 min-h-[500px] flex flex-col">
                 <h2 className="font-mono text-xs uppercase tracking-widest text-brand-white mb-6">3. Dynamic Mapping & Preview</h2>
                 
                 {headers.length === 0 ? (
                    <div className="flex-1 flex items-center justify-center border border-dashed border-brand-border/50">
                       <p className="font-mono text-[10px] text-brand-grey uppercase tracking-widest">Awaiting File Selection</p>
                    </div>
                 ) : (
                    <div className="space-y-8">
                       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-brand-obsidian p-4 border border-brand-border">
                          <div>
                             <label className="block font-mono text-[9px] text-brand-orange uppercase tracking-widest mb-2">Name Column *</label>
                             <select value={mapping.name} onChange={e => setMapping({...mapping, name: e.target.value})} className="w-full bg-brand-carbon p-2 text-xs border border-brand-border">
                                <option value="">-- Ignore --</option>
                                {headers.map(h => <option key={h} value={h}>{h}</option>)}
                             </select>
                          </div>
                          <div>
                             <label className="block font-mono text-[9px] text-brand-orange uppercase tracking-widest mb-2">SKU Column *</label>
                             <select value={mapping.sku} onChange={e => setMapping({...mapping, sku: e.target.value})} className="w-full bg-brand-carbon p-2 text-xs border border-brand-border">
                                <option value="">-- Ignore --</option>
                                {headers.map(h => <option key={h} value={h}>{h}</option>)}
                             </select>
                          </div>
                          <div>
                             <label className="block font-mono text-[9px] text-brand-orange uppercase tracking-widest mb-2">Price Col (GBP) *</label>
                             <select value={mapping.price} onChange={e => setMapping({...mapping, price: e.target.value})} className="w-full bg-brand-carbon p-2 text-xs border border-brand-border">
                                <option value="">-- Ignore --</option>
                                {headers.map(h => <option key={h} value={h}>{h}</option>)}
                             </select>
                          </div>
                          <div>
                             <label className="block font-mono text-[9px] text-brand-grey uppercase tracking-widest mb-2">Brand Column</label>
                             <select value={mapping.brand} onChange={e => setMapping({...mapping, brand: e.target.value})} className="w-full bg-brand-carbon p-2 text-xs border border-brand-border">
                                <option value="">-- Ignore --</option>
                                {headers.map(h => <option key={h} value={h}>{h}</option>)}
                             </select>
                          </div>
                       </div>

                       <div className="overflow-x-auto">
                          <table className="w-full text-left font-sans text-xs">
                             <thead>
                                <tr className="border-b border-brand-border/50 text-brand-grey pb-2">
                                   <th className="py-2 pr-4">{mapping.name || 'Title (Unmapped)'}</th>
                                   <th className="py-2 pr-4">{mapping.sku || 'SKU (Unmapped)'}</th>
                                   <th className="py-2">{mapping.price || 'Price (Unmapped)'}</th>
                                </tr>
                             </thead>
                             <tbody>
                                {parsedData.slice(0, 5).map((row, i) => (
                                   <tr key={i} className="border-b border-brand-border/20">
                                      <td className="py-3 pr-4 truncate max-w-[200px] text-brand-white">
                                         {mapping.name ? row[mapping.name] : '...'}
                                      </td>
                                      <td className="py-3 pr-4 text-brand-orange font-mono">
                                         {mapping.sku ? row[mapping.sku] : '...'}
                                      </td>
                                      <td className="py-3 text-brand-white">
                                         {mapping.price ? `£${row[mapping.price]}` : '...'}
                                      </td>
                                   </tr>
                                ))}
                             </tbody>
                          </table>
                          <p className="font-mono text-[9px] text-brand-grey uppercase tracking-widest mt-4">Showing 5 of {parsedData.length} records</p>
                       </div>

                       {uploading ? (
                          <div className="p-6 border border-brand-border bg-brand-obsidian/50 text-center space-y-4">
                             <div className="font-mono text-xs uppercase tracking-widest text-brand-orange">Initiating Payload Injection...</div>
                             <div className="w-full bg-brand-carbon h-2 rounded-full overflow-hidden">
                                <div className="bg-brand-orange h-full transition-all duration-300" style={{ width: `${progress}%` }} />
                             </div>
                             <div className="font-mono text-[10px] text-brand-grey">{progress}% Complete</div>
                          </div>
                       ) : summary ? (
                           <div className="p-6 border border-brand-orange/50 bg-brand-orange/5 flex flex-col items-center">
                              <CheckCircle className="w-12 h-12 text-brand-orange mb-4" />
                              <h3 className="font-display text-2xl uppercase tracking-wider mb-2">Import Complete</h3>
                              <p className="font-mono text-xs text-brand-grey mb-4">Processed {summary.processed} rows.</p>
                              <div className="flex gap-6 font-mono text-[11px] uppercase tracking-widest">
                                 <span className="text-green-500">{summary.successes} Success</span>
                                 <span className="text-red-500">{summary.errors} Ignored/Errors</span>
                              </div>
                           </div>
                       ) : (
                          <button 
                            onClick={executeImport}
                            className="w-full py-4 bg-brand-orange text-brand-white font-mono text-xs uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all"
                          >
                             Commit to Database
                          </button>
                       )}
                    </div>
                 )}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
