"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Settings, 
  Shield, 
  Key, 
  Database, 
  Save, 
  AlertCircle,
  Cpu,
  Globe,
  Zap,
  CheckCircle2,
  Lock,
  Mail,
  CreditCard,
  Cloud,
  ChevronRight,
  Server,
  RefreshCcw,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const [settings, setSettings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSettings() {
      const { data } = await supabase.from('admin_settings').select('*');
      setSettings(data || []);
      setLoading(false);
    }
    fetchSettings();
  }, []);

  const handleSave = async (service: string, apiKey: string) => {
    setSaving(service);
    const { error } = await supabase
      .from('admin_settings')
      .upsert({ service, api_key: apiKey }, { onConflict: 'service' });

    if (!error) {
      setTimeout(() => setSaving(null), 1000);
    }
  };

  const getSetting = (service: string) => settings.find(s => s.service === service)?.api_key || "";

  if (loading) return (
    <div className="p-8 flex items-center justify-center min-h-[60vh]">
      <Loader2 size={24} className="animate-spin text-brand-orange" />
    </div>
  );

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tighter flex items-center gap-3">
             <Settings className="text-brand-orange" /> System Settings
          </h1>
          <p className="text-slate-500 text-sm mt-1">Global configuration and third-party integrations</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-slate-900/10">
           <Shield size={14} className="text-brand-orange" /> Super Admin Access
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
         {/* Main Settings (Left 2/3) */}
         <div className="lg:col-span-2 space-y-8">
            {/* AI & Content */}
            <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
               <div className="p-6 border-b border-slate-100 flex items-center gap-3">
                  <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center text-brand-orange">
                     <Cpu size={16} />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">AI & Content Engine</h3>
               </div>
               <div className="p-6 space-y-6">
                  <div className="space-y-2">
                     <div className="flex justify-between items-end">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Anthropic (Claude 3.5)</label>
                        <span className="text-[9px] font-bold text-emerald-600 uppercase">Connected</span>
                     </div>
                     <div className="flex gap-3">
                        <input 
                          type="password" 
                          defaultValue={getSetting('anthropic')}
                          placeholder="sk-ant-..."
                          className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
                        />
                        <button className="px-6 py-2 bg-slate-900 text-white rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-brand-orange transition-all">
                           Update
                        </button>
                     </div>
                  </div>
               </div>
            </section>

            {/* SEO & Marketing */}
            <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
               <div className="p-6 border-b border-slate-100 flex items-center gap-3">
                  <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center text-blue-500">
                     <Globe size={16} />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">SEO & Marketing Tools</h3>
               </div>
               <div className="p-6 space-y-8">
                  <div className="space-y-2">
                     <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">DataforSEO API</label>
                     <div className="flex gap-3">
                        <input 
                          type="password" 
                          defaultValue={getSetting('dataforseo')}
                          className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none"
                        />
                        <button className="px-6 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:border-slate-400 transition-all">
                           Identify
                        </button>
                     </div>
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Resend (Email API)</label>
                     <div className="flex gap-3">
                        <input 
                          type="password" 
                          defaultValue={getSetting('resend')}
                          placeholder="re_..."
                          className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none"
                        />
                        <button className="px-6 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:border-slate-400 transition-all">
                           Verify
                        </button>
                     </div>
                  </div>
               </div>
            </section>

            {/* Commerce & Payments */}
            <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
               <div className="p-6 border-b border-slate-100 flex items-center gap-3">
                  <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center text-emerald-500">
                     <CreditCard size={16} />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Commerce & Payments</h3>
               </div>
               <div className="p-6 space-y-6">
                  <div className="space-y-2">
                     <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Stripe Secret Key</label>
                     <div className="flex gap-3">
                        <input 
                          type="password" 
                          defaultValue={getSetting('stripe')}
                          placeholder="sk_live_..."
                          className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none"
                        />
                        <button className="px-6 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:border-slate-400 transition-all">
                           Update
                        </button>
                     </div>
                  </div>
               </div>
            </section>
         </div>

         {/* Sidebar Stats & Security (Right 1/3) */}
         <div className="space-y-8">
            {/* Security Protocol */}
            <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-all">
                  <Lock size={48} />
               </div>
               <div className="relative z-10">
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                     <Shield size={12} className="text-brand-orange" /> Security Infrastructure
                  </h3>
                  <div className="space-y-4">
                     <div className="flex justify-between items-center py-3 border-b border-white/5">
                        <span className="text-[10px] text-slate-400 uppercase">Encryption</span>
                        <span className="text-[10px] font-bold text-emerald-500 uppercase">Active (AES-256)</span>
                     </div>
                     <div className="flex justify-between items-center py-3 border-b border-white/5">
                        <span className="text-[10px] text-slate-400 uppercase">RLS Policies</span>
                        <span className="text-[10px] font-bold text-emerald-500 uppercase">Enforced</span>
                     </div>
                     <div className="flex justify-between items-center py-3">
                        <span className="text-[10px] text-slate-400 uppercase">Admin Guard</span>
                        <span className="text-[10px] font-bold text-brand-orange uppercase">Active Node</span>
                     </div>
                  </div>
                  <button className="w-full py-3 mt-6 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all">
                     Rotate Security Tokens
                  </button>
               </div>
            </div>

            {/* System Status */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
               <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-6">Environment Status</h3>
               <div className="space-y-4">
                  {[
                    { label: 'Supabase DB', status: 'Healthy', icon: Server },
                    { label: 'Cloud Storage', status: 'Healthy', icon: Cloud },
                    { label: 'Vercel Deployment', status: 'Live', icon: RefreshCcw },
                    { label: 'Cron Tasks', status: 'Running', icon: Clock },
                  ].map((s, i) => (
                    <div key={i} className="flex items-center justify-between">
                       <div className="flex items-center gap-3">
                          <s.icon size={14} className="text-slate-400" />
                          <span className="text-[11px] font-bold text-slate-700">{s.label}</span>
                       </div>
                       <span className="text-[9px] font-bold text-emerald-600 uppercase">{s.status}</span>
                    </div>
                  ))}
               </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-red-50 border border-red-100 rounded-xl p-6">
               <h3 className="text-[10px] font-bold uppercase tracking-widest text-red-600 mb-4 flex items-center gap-2">
                  <AlertCircle size={14} /> Danger Zone
               </h3>
               <p className="text-[10px] text-red-500 mb-6 leading-relaxed">
                  These actions are irreversible and will affect the production environment immediately.
               </p>
               <div className="space-y-3">
                  <button className="w-full py-3 border border-red-200 text-red-600 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all">
                     Flush Application Cache
                  </button>
                  <button className="w-full py-3 border border-red-200 text-red-600 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all">
                     Reset Production Database
                  </button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}

import { Clock } from "lucide-react";
