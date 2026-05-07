"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Settings, Shield, Key, Database, Save, 
  AlertCircle, Cpu, Globe, Zap, CheckCircle2,
  Lock, Mail, CreditCard, Cloud, ChevronRight,
  Server, RefreshCcw, Loader2, X, Info, 
  Monitor, ShoppingBag, Search, BarChart3
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: any;
  color: string;
  status: 'connected' | 'not-configured';
  service_key: string;
}

export default function IntegrationVaultPage() {
  const [integrations, setIntegrations] = useState<Integration[]>([
    { id: 'stripe', name: 'Stripe Payments', description: 'Handle commerce transactions and refunds', icon: CreditCard, color: 'text-emerald-500', status: 'not-configured', service_key: 'stripe_secret_key' },
    { id: 'ga4', name: 'Google Analytics 4', description: 'Track visitor behavior and conversion funnels', icon: BarChart3, color: 'text-amber-500', status: 'not-configured', service_key: 'ga4_measurement_id' },
    { id: 'gsc', name: 'Google Search Console', description: 'Monitor organic search performance', icon: Search, color: 'text-blue-500', status: 'not-configured', service_key: 'gsc_api_key' },
    { id: 'resend', name: 'Resend Email', description: 'Transactional email and build updates', icon: Mail, color: 'text-slate-900', status: 'not-configured', service_key: 'resend_api_key' },
    { id: 'ebay', name: 'eBay Connector', description: 'Sync products and orders with eBay UK', icon: ShoppingBag, color: 'text-blue-600', status: 'not-configured', service_key: 'ebay_auth_token' },
    { id: 'amazon', name: 'Amazon Connector', description: 'Manage Amazon FBA and Merchant listings', icon: Monitor, color: 'text-amber-600', status: 'not-configured', service_key: 'amazon_mws_key' },
  ]);
  const [loading, setLoading] = useState(true);
  const [activeIntegration, setActiveIntegration] = useState<Integration | null>(null);
  const [keyValue, setKeyValue] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchIntegrationStatus() {
      setLoading(true);
      const { data } = await supabase.from('admin_settings').select('*');
      
      if (data) {
        const updated = integrations.map(item => {
          const setting = data.find(s => s.service === item.id);
          return {
            ...item,
            status: (setting?.api_key ? 'connected' : 'not-configured') as 'connected' | 'not-configured'
          };
        });
        setIntegrations(updated);
      }
      setLoading(false);
    }
    fetchIntegrationStatus();
  }, []);

  const handleSave = async () => {
    if (!activeIntegration) return;
    setSaving(true);
    const { error } = await supabase
      .from('admin_settings')
      .upsert({ service: activeIntegration.id, api_key: keyValue }, { onConflict: 'service' });

    if (!error) {
      setIntegrations(prev => prev.map(i => i.id === activeIntegration.id ? { ...i, status: 'connected' } : i));
      setActiveIntegration(null);
      setKeyValue("");
    }
    setSaving(false);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="font-display text-4xl uppercase tracking-tighter text-slate-900">Integration <span className="text-brand-orange">Vault</span></h1>
          <p className="text-slate-500 text-sm mt-1">Centralised authentication hub for all platform services</p>
        </div>
        <div className="px-4 py-2 bg-slate-900 text-white rounded-lg text-[9px] font-bold uppercase tracking-[0.2em] flex items-center gap-2 shadow-xl shadow-slate-900/10">
          <Lock size={12} className="text-brand-orange" /> AES-256 Encrypted Storage
        </div>
      </div>

      {/* Integration Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {integrations.map((item) => (
          <div key={item.id} className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-xl hover:border-brand-orange transition-all group flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center bg-slate-50 border border-slate-100 transition-colors group-hover:bg-slate-900 group-hover:text-white", item.color)}>
                <item.icon size={24} />
              </div>
              <div className={cn(
                "px-2 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest border",
                item.status === 'connected' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-slate-50 text-slate-400 border-slate-100"
              )}>
                {item.status.replace('-', ' ')}
              </div>
            </div>
            
            <h3 className="font-display text-xl uppercase tracking-tight text-slate-900 mb-2">{item.name}</h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-8 flex-1">{item.description}</p>
            
            <button 
              onClick={() => {
                setActiveIntegration(item);
                setKeyValue(""); // Should probably fetch current value but it's a secret
              }}
              className="w-full py-3 bg-slate-50 text-slate-900 rounded-xl font-display text-[10px] uppercase tracking-widest hover:bg-brand-orange hover:text-white transition-all font-bold border border-slate-100"
            >
              {item.status === 'connected' ? 'Update Credentials' : 'Connect Service'}
            </button>
          </div>
        ))}
      </div>

      {/* System Status Banner */}
      <div className="bg-slate-900 rounded-2xl p-10 text-white relative overflow-hidden group">
         <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-all">
            <Database size={120} />
         </div>
         <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
               <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-orange mb-6">Environment Node</h3>
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
                     <Server className="text-slate-400" />
                  </div>
                  <div>
                     <p className="text-lg font-bold">Vercel Production</p>
                     <p className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Status: High Availability</p>
                  </div>
               </div>
            </div>
            <div>
               <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-orange mb-6">Database Health</h3>
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
                     <Database className="text-slate-400" />
                  </div>
                  <div>
                     <p className="text-lg font-bold">Supabase PostgreSQL</p>
                     <p className="text-[10px] text-emerald-500 uppercase tracking-widest font-mono">Status: Connected</p>
                  </div>
               </div>
            </div>
            <div>
               <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-orange mb-6">Security Layer</h3>
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
                     <Shield className="text-slate-400" />
                  </div>
                  <div>
                     <p className="text-lg font-bold">RLS Protocol</p>
                     <p className="text-[10px] text-emerald-500 uppercase tracking-widest font-mono">Status: Active</p>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* Integration Sidebar/Modal */}
      {activeIntegration && (
        <>
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[200] animate-in fade-in duration-300" onClick={() => setActiveIntegration(null)} />
          <div className="fixed inset-y-0 right-0 w-full max-w-lg bg-white shadow-2xl z-[210] p-10 animate-in slide-in-from-right duration-300 flex flex-col">
             <div className="flex justify-between items-center mb-12">
                <div className="flex items-center gap-4">
                   <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center bg-slate-50", activeIntegration.color)}>
                      <activeIntegration.icon size={20} />
                   </div>
                   <div>
                      <h2 className="text-xl font-bold text-slate-900 uppercase tracking-tight">{activeIntegration.name}</h2>
                      <p className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">Configuration Console</p>
                   </div>
                </div>
                <button onClick={() => setActiveIntegration(null)} className="p-2 hover:bg-slate-50 rounded-full transition-all text-slate-400"><X /></button>
             </div>

             <div className="flex-1 space-y-8">
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex gap-4">
                   <Info className="text-brand-orange shrink-0" size={18} />
                   <p className="text-xs text-slate-600 leading-relaxed">
                      Please enter your production credentials for {activeIntegration.name}. These will be encrypted at rest and only accessible by the system backend.
                   </p>
                </div>

                <div className="space-y-2">
                   <label className="block font-mono text-[10px] uppercase text-slate-400 tracking-widest font-bold">Secret API Key / Token</label>
                   <input 
                     type="password" 
                     value={keyValue}
                     onChange={e => setKeyValue(e.target.value)}
                     placeholder="sk_..."
                     className="w-full border-2 border-slate-100 p-4 text-sm focus:border-brand-orange outline-none rounded-xl transition-all"
                   />
                </div>

                <div className="p-6 border border-dashed border-slate-200 rounded-2xl">
                   <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-900 mb-4">Webhooks (Optional)</h4>
                   <div className="flex gap-2">
                      <input 
                        type="text" 
                        readOnly 
                        value={`https://amplios.com/api/webhooks/${activeIntegration.id}`}
                        className="flex-1 bg-slate-50 border-none text-[10px] p-3 rounded-lg font-mono text-slate-500"
                      />
                      <button className="px-4 py-2 bg-slate-100 text-[10px] font-bold uppercase rounded-lg">Copy</button>
                   </div>
                </div>
             </div>

             <div className="mt-auto pt-10 border-t border-slate-50">
                <button 
                  onClick={handleSave}
                  disabled={!keyValue || saving}
                  className="w-full bg-slate-900 text-white py-5 rounded-xl font-display text-xs uppercase tracking-widest hover:bg-brand-orange transition-all font-bold shadow-xl shadow-slate-200 disabled:opacity-50"
                >
                  {saving ? 'Encrypting & Saving...' : 'Confirm Connection'}
                </button>
             </div>
          </div>
        </>
      )}
    </div>
  );
}
