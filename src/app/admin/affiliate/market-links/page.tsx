"use client";

import { useState } from "react";
import { Link as LinkIcon, Plus, Copy, ExternalLink, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AffiliateLinksPage() {
  const links = [
    { id: '1', affiliate: 'NateMurphy', code: 'NATE10', url: 'https://amplios.co.uk/store?ref=NATE10', clicks: 1240, conversions: 42, revenue: 12450.00 },
    { id: '2', affiliate: 'VandogTraveller', code: 'VANDOG', url: 'https://amplios.co.uk/store?ref=VANDOG', clicks: 856, conversions: 18, revenue: 3200.00 },
    { id: '3', affiliate: 'GregVirgoe', code: 'GREGV', url: 'https://amplios.co.uk/store/electrical-core?ref=GREGV', clicks: 2100, conversions: 89, revenue: 45600.00 },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tighter flex items-center gap-3">
             <LinkIcon className="text-brand-orange" /> Market Links
          </h1>
          <p className="text-slate-500 text-sm mt-1">Generate and monitor unique tracking URLs for your partners</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-brand-orange transition-all text-xs font-bold uppercase tracking-widest">
           <Plus size={14} /> New Tracking Link
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-mono uppercase tracking-widest text-slate-400">
              <th className="px-6 py-4">Partner / Affiliate</th>
              <th className="px-6 py-4">Tracking Link</th>
              <th className="px-6 py-4 text-right">Clicks</th>
              <th className="px-6 py-4 text-right">Conversions</th>
              <th className="px-6 py-4 text-right">Generated Rev.</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {links.map(l => (
              <tr key={l.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <p className="text-sm font-bold text-slate-900">{l.affiliate}</p>
                  <p className="text-[10px] text-slate-400 font-mono uppercase">Ref Code: {l.code}</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                     <span className="text-xs font-mono text-slate-500 truncate max-w-[250px]">{l.url}</span>
                     <button className="p-1.5 text-slate-400 hover:text-brand-orange hover:bg-orange-50 rounded transition-colors"><Copy size={12} /></button>
                     <button className="p-1.5 text-slate-400 hover:text-brand-orange hover:bg-orange-50 rounded transition-colors"><ExternalLink size={12} /></button>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-sm font-bold text-slate-900">{l.clicks.toLocaleString()}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-sm font-bold text-emerald-600">{l.conversions}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-sm font-bold text-slate-900">£{l.revenue.toLocaleString()}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
