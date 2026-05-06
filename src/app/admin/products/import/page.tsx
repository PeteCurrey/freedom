"use client";

import { useState } from "react";
import { 
  FileUp, 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  AlertTriangle, 
  Loader2, 
  Download,
  Table,
  CheckCircle2,
  XCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Step = "upload" | "map" | "preview" | "progress";

export default function BulkImportPage() {
  const [step, setStep] = useState<Step>("upload");
  const [file, setFile] = useState<File | null>(null);
  const [csvData, setCsvData] = useState<any[]>([]);
  const [mapping, setMapping] = useState<Record<string, string>>({});
  const [importStatus, setImportStatus] = useState({
    total: 0,
    current: 0,
    success: 0,
    errors: [] as { row: number; error: string }[]
  });

  const ampliosFields = [
    { label: "Name", value: "name" },
    { label: "Brand", value: "brand" },
    { label: "Supplier SKU", value: "sku" },
    { label: "Internal SKU", value: "internal_sku" },
    { label: "Description", value: "description" },
    { label: "Retail Price (£)", value: "price_gbp" },
    { label: "Cost Price (£)", value: "cost_price" },
    { label: "Category", value: "category" },
    { label: "Subcategory", value: "subcategory" },
    { label: "Stock Qty", value: "stock_quantity" },
    { label: "Dimensions", value: "dimensions" },
    { label: "Weight", value: "weight" },
    { label: "Tags", value: "tags" },
    { label: "Image URL", value: "image_url" }
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    
    // Parse CSV (simple version for demo, real implementation should use PapaParse)
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const lines = text.split("\n");
      const headers = lines[0].split(",").map(h => h.trim());
      const data = lines.slice(1).filter(l => l.trim()).map(line => {
        const values = line.split(",").map(v => v.trim());
        const obj: any = {};
        headers.forEach((h, i) => obj[h] = values[i]);
        return obj;
      });
      
      setCsvData(data);
      
      // Auto-detect mapping
      const newMapping: Record<string, string> = {};
      headers.forEach(h => {
        const matched = ampliosFields.find(f => 
          f.label.toLowerCase() === h.toLowerCase() || 
          f.value.toLowerCase() === h.toLowerCase() ||
          h.toLowerCase().includes(f.value.toLowerCase())
        );
        if (matched) newMapping[h] = matched.value;
      });
      setMapping(newMapping);
      setStep("map");
    };
    reader.readAsText(selectedFile);
  };

  const startImport = async () => {
    setStep("progress");
    setImportStatus({ total: csvData.length, current: 0, success: 0, errors: [] });
    
    for (let i = 0; i < csvData.length; i++) {
      const row = csvData[i];
      const productToInsert: any = {};
      
      Object.entries(mapping).forEach(([csvHeader, ampliosField]) => {
        let value = row[csvHeader];
        // Handle numeric conversion for prices (pence)
        if (ampliosField === 'price_gbp' || ampliosField === 'cost_price') {
          productToInsert[ampliosField] = Math.round(parseFloat(value) * 100);
        } else {
          productToInsert[ampliosField] = value;
        }
      });
      
      // Basic defaults
      if (productToInsert.name) {
        productToInsert.slug = productToInsert.name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
      }
      productToInsert.status = "draft";
      productToInsert.is_active = false;

      try {
        const { error } = await supabase.from("products").insert([productToInsert]);
        if (error) throw error;
        setImportStatus(prev => ({ ...prev, current: i + 1, success: prev.success + 1 }));
      } catch (error: any) {
        setImportStatus(prev => ({ 
          ...prev, 
          current: i + 1, 
          errors: [...prev.errors, { row: i + 2, error: error.message }] 
        }));
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-[1200px] mx-auto px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <Link href="/admin/products" className="flex items-center gap-2 font-mono text-[10px] text-gray-400 uppercase tracking-widest mb-4 hover:text-brand-orange transition-colors">
            <ChevronLeft size={12} /> Back to catalogue
          </Link>
          <h1 className="font-display text-5xl uppercase tracking-tighter text-gray-900">
            Mass <span className="text-brand-orange">CSV Import</span>
          </h1>
          <p className="font-sans text-gray-500 mt-2">Upload supplier catalogues and bulk-populate your store inventory.</p>
        </div>

        {/* Steps Navigation */}
        <div className="flex items-center gap-8 mb-12">
          {[
            { id: "upload", label: "1. Upload" },
            { id: "map", label: "2. Map Fields" },
            { id: "preview", label: "3. Preview" },
            { id: "progress", label: "4. Progress" }
          ].map((s, i) => (
            <div key={s.id} className="flex items-center gap-4">
              <span className={cn(
                "font-display text-[10px] uppercase tracking-widest transition-colors",
                step === s.id ? "text-brand-orange" : "text-gray-300"
              )}>
                {s.label}
              </span>
              {i < 3 && <ChevronRight size={14} className="text-gray-200" />}
            </div>
          ))}
        </div>

        {/* STEP 1: UPLOAD */}
        {step === "upload" && (
          <div className="bg-white border border-gray-200 p-12 text-center shadow-sm">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
                <FileUp size={40} />
              </div>
              <h2 className="font-display text-xl uppercase tracking-tight mb-2">Upload your catalogue</h2>
              <p className="font-sans text-sm text-gray-500 mb-8">Select a .csv or .xlsx file from your supplier. Ensure SKU and Price columns are present.</p>
              
              <label className="block w-full border-2 border-dashed border-gray-200 p-8 cursor-pointer hover:border-brand-orange hover:bg-orange-50 transition-all group">
                <input type="file" accept=".csv" className="hidden" onChange={handleFileUpload} />
                <span className="font-mono text-[10px] uppercase tracking-widest text-gray-400 group-hover:text-brand-orange">Select file from device</span>
              </label>
              
              <div className="mt-8 flex items-center justify-center gap-4 text-gray-400">
                <Download size={14} />
                <button className="font-mono text-[9px] uppercase tracking-widest hover:text-gray-600 transition-colors">Download CSV Template</button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: MAP FIELDS */}
        {step === "map" && (
          <div className="bg-white border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h2 className="font-display text-lg uppercase tracking-wider">Map CSV Columns</h2>
              <button 
                onClick={() => setStep("preview")}
                className="bg-brand-orange text-white px-8 py-3 font-display text-[10px] uppercase tracking-widest hover:bg-orange-600 transition-colors"
              >
                Preview Import
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-white border-b border-gray-100 font-mono text-[9px] uppercase tracking-widest text-gray-400">
                    <th className="p-6">CSV Column</th>
                    <th className="p-6">Sample Value</th>
                    <th className="p-6">Maps to Amplios Field</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {Object.keys(csvData[0] || {}).map((header) => (
                    <tr key={header} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="p-6 font-mono text-[11px] font-bold text-gray-700">{header}</td>
                      <td className="p-6 text-gray-400 font-sans italic">"{csvData[0][header]}"</td>
                      <td className="p-6">
                        <select 
                          value={mapping[header] || ""}
                          onChange={(e) => setMapping({ ...mapping, [header]: e.target.value })}
                          className="w-full max-w-xs border border-gray-200 p-2 text-xs outline-none focus:border-brand-orange"
                        >
                          <option value="">Skip this column</option>
                          {ampliosFields.map(f => (
                            <option key={f.value} value={f.value}>{f.label}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* STEP 3: PREVIEW */}
        {step === "preview" && (
          <div className="space-y-8">
            <div className="bg-white border border-gray-200 p-8 shadow-sm flex justify-between items-center">
              <div>
                <h2 className="font-display text-xl uppercase tracking-tight mb-1">Import Summary</h2>
                <p className="font-sans text-sm text-gray-500">
                  <span className="font-bold text-brand-orange">{csvData.length}</span> products will be imported as <span className="underline">Drafts</span>.
                </p>
              </div>
              <div className="flex gap-4">
                <button onClick={() => setStep("map")} className="px-6 py-3 font-display text-[10px] uppercase tracking-widest border border-gray-200 hover:bg-gray-50 transition-colors">Adjust Mapping</button>
                <button 
                  onClick={startImport}
                  className="bg-brand-orange text-white px-8 py-3 font-display text-[10px] uppercase tracking-widest hover:bg-orange-600 transition-colors shadow-lg shadow-orange-100"
                >
                  Confirm & Start Import
                </button>
              </div>
            </div>

            <div className="bg-white border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-6 bg-gray-50 border-b border-gray-100">
                <h3 className="font-display text-sm uppercase tracking-widest">Data Preview (First 5 Rows)</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-white border-b border-gray-100 font-mono text-[8px] uppercase tracking-widest text-gray-400">
                      {Object.values(mapping).map((field) => (
                        <th key={field} className="p-4">{ampliosFields.find(f => f.value === field)?.label}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="text-xs">
                    {csvData.slice(0, 5).map((row, i) => (
                      <tr key={i} className="border-b border-gray-50">
                        {Object.entries(mapping).map(([csvHeader, ampliosField]) => (
                          <td key={csvHeader} className="p-4 text-gray-600">
                            {ampliosField === 'price_gbp' || ampliosField === 'cost_price' ? `£${row[csvHeader]}` : row[csvHeader]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: PROGRESS */}
        {step === "progress" && (
          <div className="bg-white border border-gray-200 p-12 shadow-sm">
            <div className="max-w-2xl mx-auto">
              <div className="flex justify-between items-end mb-4">
                <div>
                  <h2 className="font-display text-2xl uppercase tracking-tighter">
                    {importStatus.current < importStatus.total ? "Importing Data..." : "Import Complete"}
                  </h2>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-gray-400 mt-1">
                    Processed {importStatus.current} of {importStatus.total} SKUs
                  </p>
                </div>
                <span className="font-display text-4xl text-brand-orange">
                  {Math.round((importStatus.current / importStatus.total) * 100)}%
                </span>
              </div>
              
              <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden mb-12">
                <div 
                  className="h-full bg-brand-orange transition-all duration-300"
                  style={{ width: `${(importStatus.current / importStatus.total) * 100}%` }}
                />
              </div>

              <div className="grid grid-cols-2 gap-8 mb-12">
                <div className="bg-green-50 p-6 border border-green-100">
                  <div className="flex items-center gap-3 text-green-600 mb-2">
                    <CheckCircle2 size={18} />
                    <span className="font-display text-sm uppercase tracking-widest">Successful</span>
                  </div>
                  <span className="font-display text-3xl text-green-700">{importStatus.success}</span>
                </div>
                <div className="bg-red-50 p-6 border border-red-100">
                  <div className="flex items-center gap-3 text-red-600 mb-2">
                    <XCircle size={18} />
                    <span className="font-display text-sm uppercase tracking-widest">Errors</span>
                  </div>
                  <span className="font-display text-3xl text-red-700">{importStatus.errors.length}</span>
                </div>
              </div>

              {importStatus.errors.length > 0 && (
                <div className="border border-gray-200 rounded-sm">
                  <div className="p-4 bg-gray-50 border-b border-gray-200 font-mono text-[10px] uppercase tracking-widest text-gray-500">Error Log</div>
                  <div className="max-h-40 overflow-y-auto p-4 space-y-2">
                    {importStatus.errors.map((err, i) => (
                      <div key={i} className="flex gap-4 text-[11px] font-mono">
                        <span className="text-red-500 w-12 shrink-0">Row {err.row}</span>
                        <span className="text-gray-600">{err.error}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {importStatus.current === importStatus.total && (
                <div className="mt-12 flex justify-center">
                  <Link 
                    href="/admin/products"
                    className="bg-brand-orange text-white px-12 py-4 font-display text-[10px] uppercase tracking-widest hover:bg-orange-600 transition-all shadow-lg shadow-orange-100"
                  >
                    Go to product catalogue
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
