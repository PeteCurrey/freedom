"use client";

import { useState } from "react";
import { Search, Percent, Package, Star, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AffiliateProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const products = [
    { id: '1', name: 'Victron MultiPlus-II 3000VA', sku: 'VIC-MP2-3000', price: 1249.99, commission: 5, active: true },
    { id: '2', name: 'Roamer 400Ah Seatbase Lithium', sku: 'RMR-400-SB', price: 1699.00, commission: 8, active: true },
    { id: '3', name: 'Truma Combi 4E Heater', sku: 'TRU-C4E', price: 1450.00, commission: 5, active: false },
    { id: '4', name: 'Maxxair MaxxFan Deluxe', sku: 'MAX-FAN-DEL', price: 349.99, commission: 10, active: true },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tighter flex items-center gap-3">
             <Package className="text-brand-orange" /> Commissionable Products
          </h1>
          <p className="text-slate-500 text-sm mt-1">Manage affiliate rates and visibility for your catalogue</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search products to enable affiliate commissions..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-mono uppercase tracking-widest text-slate-400">
              <th className="px-6 py-4">Product</th>
              <th className="px-6 py-4">Retail Price</th>
              <th className="px-6 py-4">Commission Rate</th>
              <th className="px-6 py-4">Affiliate Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.map(p => (
              <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <p className="text-sm font-bold text-slate-900">{p.name}</p>
                  <p className="text-[10px] text-slate-400 font-mono">{p.sku}</p>
                </td>
                <td className="px-6 py-4 text-sm font-bold text-slate-600">£{p.price.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-emerald-600">{p.commission}%</span>
                    <span className="text-[10px] text-slate-400">(£{((p.price * p.commission) / 100).toFixed(2)})</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={cn(
                    "text-[9px] font-bold uppercase px-2 py-1 rounded-full border",
                    p.active ? "text-emerald-600 bg-emerald-50 border-emerald-200" : "text-slate-400 bg-slate-50 border-slate-200"
                  )}>
                    {p.active ? 'Enabled' : 'Disabled'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-[10px] font-bold uppercase text-brand-orange hover:underline">Edit Rate</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
