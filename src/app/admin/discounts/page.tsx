"use client";

import { useState } from "react";
import { Percent, Plus, Copy, Power, Trash2, Calendar, Tag } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DiscountsPage() {
  const discounts = [
    { id: '1', code: 'SUMMER24', type: 'percentage', value: 10, usageLimit: 500, used: 142, status: 'active', expires: '2024-08-31' },
    { id: '2', code: 'WELCOME-VAN', type: 'fixed', value: 25, usageLimit: null, used: 843, status: 'active', expires: null },
    { id: '3', code: 'WINTER-CLEAR', type: 'percentage', value: 15, usageLimit: 100, used: 100, status: 'expired', expires: '2024-02-28' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tighter flex items-center gap-3">
             <Percent className="text-brand-orange" /> Promotion Ledger
          </h1>
          <p className="text-slate-500 text-sm mt-1">Manage global discount codes and promotional campaigns</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-brand-orange transition-all text-xs font-bold uppercase tracking-widest shadow-lg shadow-slate-900/10">
           <Plus size={14} /> Create Discount
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
           <div className="flex justify-between items-start mb-4">
              <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Active Codes</p>
              <Tag size={14} className="text-slate-300" />
           </div>
           <span className="text-2xl font-bold text-slate-900">2</span>
         </div>
         <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
           <div className="flex justify-between items-start mb-4">
              <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Total Uses</p>
              <Percent size={14} className="text-slate-300" />
           </div>
           <span className="text-2xl font-bold text-slate-900">985</span>
         </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-mono uppercase tracking-widest text-slate-400">
              <th className="px-6 py-4">Promo Code</th>
              <th className="px-6 py-4">Value</th>
              <th className="px-6 py-4">Usage</th>
              <th className="px-6 py-4">Expiration</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {discounts.map(d => (
              <tr key={d.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900 uppercase tracking-widest font-mono bg-slate-100 px-2 py-1 rounded">{d.code}</span>
                    <button className="text-slate-400 hover:text-brand-orange opacity-0 group-hover:opacity-100 transition-all"><Copy size={12} /></button>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-bold text-slate-700">
                    {d.type === 'percentage' ? `${d.value}% OFF` : `£${d.value.toFixed(2)} OFF`}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900">{d.used}</span>
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest">/ {d.usageLimit || '∞'}</span>
                  </div>
                  {d.usageLimit && (
                     <div className="w-24 bg-slate-100 h-1 rounded-full mt-1 overflow-hidden">
                        <div className="h-full bg-slate-300" style={{ width: `${(d.used / d.usageLimit) * 100}%` }} />
                     </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  {d.expires ? (
                    <div className="flex items-center gap-2 text-slate-600 text-sm">
                      <Calendar size={12} /> {new Date(d.expires).toLocaleDateString()}
                    </div>
                  ) : (
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Never</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <span className={cn(
                    "text-[9px] font-bold uppercase px-2 py-1 rounded-full border",
                    d.status === 'active' ? "text-emerald-600 bg-emerald-50 border-emerald-200" : "text-slate-400 bg-slate-50 border-slate-200"
                  )}>
                    {d.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                    <button className="p-2 text-slate-400 hover:text-amber-500 bg-slate-50 hover:bg-amber-50 rounded transition-colors"><Power size={14} /></button>
                    <button className="p-2 text-slate-400 hover:text-red-500 bg-slate-50 hover:bg-red-50 rounded transition-colors"><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
