'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  Download, Search, Filter, Mail, Calendar, 
  CreditCard, ChevronRight, ArrowUpDown, ExternalLink, Package 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface DiagramPurchase {
  id: string;
  email: string;
  diagram_slug: string;
  is_bundle: boolean;
  stripe_payment_intent_id: string;
  amount_gbp: number;
  download_url: string;
  download_expires_at: string;
  created_at: string;
}

export default function DiagramDownloadsAdmin() {
  const [purchases, setPurchases] = useState<DiagramPurchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPurchases();
  }, []);

  async function fetchPurchases() {
    setLoading(true);
    const { data, error } = await supabase
      .from('diagram_purchases')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setPurchases(data);
    }
    setLoading(false);
  }

  const filteredPurchases = purchases.filter(p => 
    p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.diagram_slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="font-display text-3xl font-black tracking-tighter uppercase mb-2">
            Diagram <span className="text-brand-orange">Revenue Hub</span>
          </h1>
          <p className="text-slate-400 text-sm">Tracking technical asset sales and digital delivery status.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text"
              placeholder="Search by email or diagram..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:border-brand-orange transition-all w-64 outline-none"
            />
          </div>
          <button 
            onClick={fetchPurchases}
            className="bg-brand-orange text-white px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all flex items-center gap-2"
          >
            Refresh
          </button>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/50">
                <th className="px-6 py-5">
                  <div className="flex items-center gap-2 font-mono text-[10px] text-slate-500 uppercase tracking-widest">
                    Customer / Date <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="px-6 py-5">
                  <div className="flex items-center gap-2 font-mono text-[10px] text-slate-500 uppercase tracking-widest">
                    Diagram Asset
                  </div>
                </th>
                <th className="px-6 py-5">
                  <div className="flex items-center gap-2 font-mono text-[10px] text-slate-500 uppercase tracking-widest">
                    Revenue
                  </div>
                </th>
                <th className="px-6 py-5">
                  <div className="flex items-center gap-2 font-mono text-[10px] text-slate-500 uppercase tracking-widest">
                    Status
                  </div>
                </th>
                <th className="px-6 py-5 text-right">
                  <div className="flex items-center justify-end gap-2 font-mono text-[10px] text-slate-500 uppercase tracking-widest">
                    Actions
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-6 h-6 border-2 border-brand-orange border-t-transparent rounded-full animate-spin" />
                      <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest">Loading Ledger...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredPurchases.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest">No diagram sales found.</span>
                  </td>
                </tr>
              ) : (
                filteredPurchases.map((purchase) => (
                  <tr key={purchase.id} className="hover:bg-slate-800/30 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="text-sm text-white font-medium mb-1">{purchase.email}</span>
                        <div className="flex items-center gap-2 text-[10px] text-slate-500">
                          <Calendar className="w-3 h-3" />
                          {format(new Date(purchase.created_at), 'dd MMM yyyy HH:mm')}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center border",
                          purchase.is_bundle 
                            ? "bg-brand-orange/10 border-brand-orange/30 text-brand-orange" 
                            : "bg-blue-500/10 border-blue-500/30 text-blue-400"
                        )}>
                          <Download className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs text-white font-bold uppercase tracking-tight">
                            {purchase.is_bundle ? 'Complete Diagram Bundle' : purchase.diagram_slug}
                          </span>
                          <span className="text-[10px] text-slate-500">Digital PDF Asset</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-3 h-3 text-emerald-500" />
                        <span className="text-sm text-white font-bold tracking-tight">
                          £{(purchase.amount_gbp / 100).toFixed(2)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Fulfilled</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button className="p-2 text-slate-500 hover:text-white transition-colors">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {[
          { label: "Total Revenue", value: `£${(purchases.reduce((acc, p) => acc + p.amount_gbp, 0) / 100).toFixed(2)}`, icon: CreditCard, color: "text-emerald-500" },
          { label: "Total Downloads", value: purchases.length, icon: Download, color: "text-blue-500" },
          { label: "Active Bundles", value: purchases.filter(p => p.is_bundle).length, icon: Package, color: "text-brand-orange" },
        ].map((stat) => (
          <div key={stat.label} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-center justify-between">
            <div>
              <p className="font-mono text-[9px] text-slate-500 uppercase tracking-[0.2em] mb-2">{stat.label}</p>
              <p className={cn("text-2xl font-black tracking-tighter", stat.color)}>{stat.value}</p>
            </div>
            <div className={cn("p-4 rounded-xl bg-slate-800/50", stat.color)}>
              <stat.icon className="w-6 h-6" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
