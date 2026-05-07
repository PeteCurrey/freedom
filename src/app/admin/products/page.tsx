"use client";

import { useState } from "react";
import { PRODUCTS, getProductCTA, SupplierType } from "@/lib/data/productRegistry";
import { 
  Plus, Search, Filter, MoreVertical, ExternalLink, 
  Package, Truck, Share2, Magnet, Receipt, AlertCircle,
  Edit2, Trash2
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminProductManager() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSupplierIcon = (type: SupplierType) => {
    switch (type) {
      case 'internal': return <Package className="w-3 h-3" />;
      case 'affiliate': return <Share2 className="w-3 h-3" />;
      case 'quote': return <Magnet className="w-3 h-3" />;
      default: return <Truck className="w-3 h-3" />;
    }
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      
      <div className="flex justify-between items-end">
        <div>
          <h1 className="font-display text-3xl uppercase tracking-tighter mb-2">Product <span className="text-brand-orange">Manager</span></h1>
          <p className="font-mono text-[10px] text-brand-grey uppercase tracking-[0.2em]">Registry Depth: {PRODUCTS.length} Commercial Assets</p>
        </div>
        <button className="bg-brand-orange text-white px-6 py-3 font-display text-xs uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all flex items-center gap-2">
           <Plus className="w-4 h-4" /> Add New Product
        </button>
      </div>

      {/* FILTERS & SEARCH */}
      <div className="flex flex-col md:flex-row gap-4 bg-brand-carbon p-4 border border-brand-border">
         <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-grey" />
            <input 
              type="text" 
              placeholder="Search registry by name, brand, or category..." 
              className="w-full bg-brand-obsidian border border-brand-border py-3 pl-12 pr-4 text-xs font-mono text-white outline-none focus:border-brand-orange transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
         </div>
         <button className="px-6 py-3 border border-brand-border text-brand-grey font-mono text-[10px] uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2">
            <Filter className="w-3 h-3" /> Filters
         </button>
      </div>

      {/* PRODUCT TABLE */}
      <div className="bg-brand-carbon border border-brand-border overflow-hidden">
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="border-b border-brand-border font-mono text-[9px] text-brand-grey uppercase tracking-widest bg-brand-obsidian/50">
                     <th className="p-6 font-normal">Product / Brand</th>
                     <th className="p-6 font-normal">Category</th>
                     <th className="p-6 font-normal">Supply Route</th>
                     <th className="p-6 font-normal">Stock</th>
                     <th className="p-6 font-normal">Price</th>
                     <th className="p-6 font-normal text-right">Actions</th>
               </tr>
               </thead>
               <tbody className="font-mono text-[11px]">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="border-b border-brand-border/30 hover:bg-brand-obsidian/40 transition-colors group">
                       <td className="p-6">
                          <div className="flex flex-col">
                             <span className="text-white font-bold mb-1">{p.name}</span>
                             <span className="text-brand-grey text-[9px] uppercase tracking-widest">{p.brand}</span>
                          </div>
                       </td>
                       <td className="p-6">
                          <span className="text-brand-grey uppercase tracking-widest text-[10px]">{p.category.replace('-', ' ')}</span>
                       </td>
                       <td className="p-6">
                          <div className="flex items-center gap-2">
                             <div className={cn(
                               "w-6 h-6 border flex items-center justify-center rounded",
                               p.supplierType === 'internal' ? "border-brand-orange text-brand-orange bg-brand-orange/5" : "border-brand-border text-brand-grey"
                             )}>
                                {getSupplierIcon(p.supplierType)}
                             </div>
                             <span className="uppercase tracking-widest text-[9px] text-brand-grey">{p.supplierType}</span>
                          </div>
                       </td>
                       <td className="p-6">
                          <span className={cn(
                            "flex items-center gap-2 uppercase tracking-widest text-[9px]",
                            p.stockStatus === 'in-stock' ? "text-green-500" : "text-yellow-500"
                          )}>
                             <div className={cn("w-1.5 h-1.5 rounded-full", p.stockStatus === 'in-stock' ? "bg-green-500" : "bg-yellow-500")} />
                             {p.stockStatus.replace('-', ' ')}
                          </span>
                       </td>
                       <td className="p-6 font-bold text-white">
                          £{p.price.toLocaleString()}
                       </td>
                       <td className="p-6 text-right">
                          <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                             <button className="p-2 border border-brand-border hover:border-brand-orange hover:text-brand-orange transition-colors rounded">
                                <Edit2 className="w-3 h-3" />
                             </button>
                             <button className="p-2 border border-brand-border hover:border-red-500 hover:text-red-500 transition-colors rounded">
                                <Trash2 className="w-3 h-3" />
                             </button>
                             <button className="p-2 border border-brand-border hover:border-white transition-colors rounded">
                                <MoreVertical className="w-3 h-3" />
                             </button>
                          </div>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
         {filteredProducts.length === 0 && (
           <div className="p-20 text-center text-brand-grey font-mono text-xs uppercase tracking-widest">
              No products found matching your search.
           </div>
         )}
      </div>

    </div>
  );
}
