import { useState, useEffect } from "react";
import { Link as LinkIcon, Plus, Copy, ExternalLink, Activity, Loader2, X, Save, Globe, Zap, Percent } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";

export default function AffiliateLinksPage() {
  const [links, setLinks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingLink, setEditingLink] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchLinks();
  }, []);

  async function fetchLinks() {
    setLoading(true);
    const { data } = await supabase
      .from("affiliate_management")
      .select("*")
      .order("name");
    setLinks(data || []);
    setLoading(false);
  }

  const handleSave = async () => {
    if (!editingLink) return;
    setSaving(true);
    try {
      const { error } = await supabase
        .from("affiliate_management")
        .update({
          name: editingLink.name,
          network: editingLink.network,
          base_url: editingLink.base_url,
          tracking_id: editingLink.tracking_id,
          code: editingLink.code,
          commission_rate: editingLink.commission_rate,
          is_active: editingLink.is_active
        })
        .eq("id", editingLink.id);
      
      if (error) throw error;
      
      setLinks(prev => prev.map(l => l.id === editingLink.id ? editingLink : l));
      setEditingLink(null);
    } catch (error) {
      console.error("Error saving link:", error);
    } finally {
      setSaving(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Could add a toast here
  };

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
              <th className="px-6 py-4 text-center">Commission</th>
              <th className="px-6 py-4 text-center">Status</th>
              <th className="px-6 py-4 text-right">Activity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-20 text-center">
                  <Loader2 className="w-8 h-8 text-brand-orange animate-spin mx-auto" />
                </td>
              </tr>
            ) : links.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-20 text-center text-slate-400 text-sm">
                  No tracking links found.
                </td>
              </tr>
            ) : links.map(l => (
              <tr 
                key={l.id} 
                onClick={() => setEditingLink(l)}
                className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
              >
                <td className="px-6 py-4">
                  <p className="text-sm font-bold text-slate-900 group-hover:text-brand-orange transition-colors">{l.name}</p>
                  <p className="text-[10px] text-slate-400 font-mono uppercase">{l.network || 'Internal'}</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                     <span className="text-xs font-mono text-slate-500 truncate max-w-[250px]">{l.base_url}</span>
                     <button 
                       onClick={(e) => { e.stopPropagation(); copyToClipboard(l.base_url); }}
                       className="p-1.5 text-slate-300 hover:text-brand-orange hover:bg-orange-50 rounded transition-colors"
                     >
                       <Copy size={12} />
                     </button>
                  </div>
                </td>
                <td className="px-6 py-4 text-center text-sm font-bold text-emerald-600">
                  {l.commission_rate || 'Var'}
                </td>
                <td className="px-6 py-4 text-center">
                   <span className={cn(
                     "text-[8px] font-bold uppercase px-2 py-1 rounded border tracking-widest",
                     l.is_active ? "text-emerald-600 bg-emerald-50 border-emerald-200" : "text-slate-400 bg-slate-50 border-slate-200"
                   )}>
                     {l.is_active ? 'Active' : 'Paused'}
                   </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 text-slate-300 group-hover:text-brand-orange transition-colors">
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">Edit Partner</span>
                    <Activity size={14} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* EDIT MODAL */}
      {editingLink && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[200] flex items-center justify-center p-8 animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="bg-slate-900 p-8 text-white flex justify-between items-center">
              <div>
                <h3 className="font-display text-2xl uppercase tracking-tighter">Edit Partner <span className="text-brand-orange">Link</span></h3>
                <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mt-1">Registry ID: {editingLink.id.split('-')[0]}</p>
              </div>
              <button onClick={() => setEditingLink(null)} className="text-slate-400 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="block font-mono text-[10px] uppercase text-slate-400 mb-2 tracking-widest">Partner Name</label>
                  <input 
                    type="text" 
                    value={editingLink.name}
                    onChange={e => setEditingLink({...editingLink, name: e.target.value})}
                    className="w-full border-2 border-slate-100 p-4 text-sm font-bold focus:border-brand-orange outline-none rounded-xl bg-slate-50/50"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase text-slate-400 mb-2 tracking-widest">Affiliate Network</label>
                  <input 
                    type="text" 
                    value={editingLink.network}
                    onChange={e => setEditingLink({...editingLink, network: e.target.value})}
                    className="w-full border-2 border-slate-100 p-4 text-sm focus:border-brand-orange outline-none rounded-xl bg-slate-50/50"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase text-slate-400 mb-2 tracking-widest">Ref Code</label>
                  <div className="relative">
                    <Zap className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-orange" />
                    <input 
                      type="text" 
                      value={editingLink.code}
                      onChange={e => setEditingLink({...editingLink, code: e.target.value})}
                      className="w-full border-2 border-slate-100 pl-11 p-4 text-sm font-mono focus:border-brand-orange outline-none rounded-xl bg-slate-50/50"
                    />
                  </div>
                </div>
                <div className="col-span-2">
                  <label className="block font-mono text-[10px] uppercase text-slate-400 mb-2 tracking-widest">Base Destination URL</label>
                  <div className="relative">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                    <input 
                      type="text" 
                      value={editingLink.base_url}
                      onChange={e => setEditingLink({...editingLink, base_url: e.target.value})}
                      className="w-full border-2 border-slate-100 pl-11 p-4 text-sm focus:border-brand-orange outline-none rounded-xl bg-slate-50/50"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase text-slate-400 mb-2 tracking-widest">Commission Rate</label>
                  <div className="relative">
                    <Percent className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500" />
                    <input 
                      type="text" 
                      value={editingLink.commission_rate}
                      onChange={e => setEditingLink({...editingLink, commission_rate: e.target.value})}
                      className="w-full border-2 border-slate-100 pl-11 p-4 text-sm font-bold focus:border-brand-orange outline-none rounded-xl bg-slate-50/50"
                      placeholder="e.g. 10%"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-50 border-2 border-slate-100 rounded-xl">
                  <span className="font-mono text-[10px] uppercase font-bold text-slate-500">Active Status</span>
                  <input 
                    type="checkbox" 
                    checked={editingLink.is_active}
                    onChange={e => setEditingLink({...editingLink, is_active: e.target.checked})}
                    className="w-5 h-5 rounded text-brand-orange focus:ring-brand-orange"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  onClick={() => setEditingLink(null)}
                  className="flex-1 py-4 border-2 border-slate-100 text-slate-400 font-display text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-[2] bg-brand-orange text-white py-4 rounded-xl font-display text-[10px] uppercase tracking-widest hover:bg-slate-900 transition-all font-bold shadow-xl shadow-brand-orange/20 flex items-center justify-center gap-2"
                >
                  {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                  {saving ? 'Saving...' : 'Save Partner Details'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
