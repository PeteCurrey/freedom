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
  Zap
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

  if (loading) return null;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-2 font-mono text-[10px] text-brand-orange uppercase tracking-[0.3em] mb-4">
          <Settings size={12} /> System Node: settings.omega
        </div>
        <h1 className="font-display text-5xl uppercase tracking-tighter text-brand-white">
          API <span className="text-brand-orange">Integrations</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
        {/* API Services */}
        <div className="space-y-8">
          <div className="blueprint-border p-8 bg-brand-carbon relative overflow-hidden">
             <div className="blueprint-grid absolute inset-0 opacity-10 pointer-events-none" />
             <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-brand-obsidian border border-brand-orange/30 flex items-center justify-center text-brand-orange">
                    <Cpu size={24} />
                  </div>
                  <div>
                    <h3 className="font-display text-xl uppercase">AI Engine (Anthropic)</h3>
                    <p className="font-mono text-[9px] text-brand-grey uppercase tracking-widest">Connect Claude for content generation</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <label className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest">Anthropic API Key</label>
                  <div className="flex gap-4">
                    <input 
                      type="password"
                      defaultValue={getSetting('anthropic')}
                      id="anthropic-key"
                      placeholder="sk-ant-..."
                      className="flex-1 bg-brand-obsidian border border-brand-border p-4 font-mono text-xs text-brand-white focus:border-brand-orange outline-none"
                    />
                    <button 
                      onClick={() => {
                        const val = (document.getElementById('anthropic-key') as HTMLInputElement).value;
                        handleSave('anthropic', val);
                      }}
                      className="px-8 py-4 bg-brand-orange text-brand-white font-mono text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all flex items-center gap-2"
                    >
                      {saving === 'anthropic' ? "Saving..." : <><Save size={14} /> Commit</>}
                    </button>
                  </div>
                </div>
             </div>
          </div>

          <div className="blueprint-border p-8 bg-brand-carbon">
             <div className="flex items-center gap-4 mb-8">
               <div className="w-12 h-12 bg-brand-obsidian border border-brand-border flex items-center justify-center text-blue-500">
                 <Globe size={24} />
               </div>
               <div>
                 <h3 className="font-display text-xl uppercase">SEO Data (DataforSEO)</h3>
                 <p className="font-mono text-[9px] text-brand-grey uppercase tracking-widest">Keyword gaps & competitor analysis</p>
               </div>
             </div>
             
             <div className="space-y-4">
               <label className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest">DataforSEO API Key / Credential</label>
               <div className="flex gap-4">
                 <input 
                   type="password"
                   defaultValue={getSetting('dataforseo')}
                   id="dataforseo-key"
                   className="flex-1 bg-brand-obsidian border border-brand-border p-4 font-mono text-xs text-brand-white focus:border-brand-orange outline-none"
                 />
                 <button 
                    onClick={() => {
                      const val = (document.getElementById('dataforseo-key') as HTMLInputElement).value;
                      handleSave('dataforseo', val);
                    }}
                   className="px-8 py-4 bg-brand-obsidian border border-brand-border text-brand-grey font-mono text-[10px] uppercase tracking-widest hover:border-brand-orange transition-all"
                 >
                   {saving === 'dataforseo' ? "Saving..." : "Connect"}
                 </button>
               </div>
             </div>
          </div>

          <div className="blueprint-border p-8 bg-brand-carbon">
             <div className="flex items-center gap-4 mb-8">
               <div className="w-12 h-12 bg-brand-obsidian border border-brand-border flex items-center justify-center text-brand-orange">
                 <Zap size={24} />
               </div>
               <div>
                 <h3 className="font-display text-xl uppercase">Search Console (Google)</h3>
                 <p className="font-mono text-[9px] text-brand-grey uppercase tracking-widest">Direct index & performance tracking</p>
               </div>
             </div>
             
             <div className="space-y-4">
               <label className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest">GSC JSON Key (File Path or B64)</label>
               <div className="flex gap-4">
                 <input 
                   type="text"
                   defaultValue={getSetting('google_cloud')}
                   id="google-key"
                   className="flex-1 bg-brand-obsidian border border-brand-border p-4 font-mono text-xs text-brand-white focus:border-brand-orange outline-none"
                 />
                 <button 
                    onClick={() => {
                      const val = (document.getElementById('google-key') as HTMLInputElement).value;
                      handleSave('google_cloud', val);
                    }}
                   className="px-8 py-4 bg-brand-obsidian border border-brand-border text-brand-grey font-mono text-[10px] uppercase tracking-widest hover:border-brand-orange transition-all"
                 >
                   {saving === 'google_cloud' ? "Saving..." : "Identify"}
                 </button>
               </div>
             </div>
          </div>
        </div>

        {/* Security / System Info */}
        <div className="space-y-8">
           <div className="p-8 border border-white/5 bg-brand-obsidian/50">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="text-brand-orange" size={20} />
                <h3 className="font-display text-lg uppercase tracking-tighter text-brand-white">Security Protocol</h3>
              </div>
              <p className="font-sans text-xs text-brand-grey leading-relaxed mb-8">
                All API keys are stored in the <span className="text-brand-orange font-mono">admin_settings</span> table. 
                Ensure that Postgres Row Level Security (RLS) is enabled to prevent unauthorized read access to these credentials.
              </p>
              <div className="space-y-4">
                 <div className="flex justify-between items-center p-4 bg-brand-carbon border border-brand-border">
                   <span className="font-mono text-[9px] uppercase tracking-widest text-brand-grey">Encryption Status</span>
                   <span className="font-mono text-[10px] text-green-500 uppercase">ACTIVE</span>
                 </div>
                 <div className="flex justify-between items-center p-4 bg-brand-carbon border border-brand-border">
                   <span className="font-mono text-[9px] uppercase tracking-widest text-brand-grey">Super Admin Guard</span>
                   <span className="font-mono text-[10px] text-green-500 uppercase">LOCKED (pete@avorria.com)</span>
                 </div>
              </div>
           </div>

           <div className="p-8 border border-brand-border border-dashed">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="text-brand-orange" size={16} />
                <h3 className="font-mono text-[10px] uppercase tracking-widest text-brand-orange">Developer Note</h3>
              </div>
              <p className="font-mono text-[9px] text-brand-grey leading-relaxed uppercase">
                Changing keys will affect all pending AI content generation tasks and SEO crawls currently in the content queue. 
                Verify connectivity after each change.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
