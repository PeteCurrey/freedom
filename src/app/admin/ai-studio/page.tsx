"use client";

import { useState } from "react";
import { 
  Sparkles, 
  Layers, 
  Zap, 
  Settings2, 
  ChevronRight, 
  Plus, 
  Eye, 
  RefreshCcw, 
  FileText, 
  ShoppingBag, 
  Globe, 
  CheckCircle2, 
  AlertCircle,
  X,
  Send,
  Loader2,
  MoreVertical,
  Magnet,
  Maximize2,
  Trash2,
  Volume2
} from "lucide-react";
import { cn } from "@/lib/utils";

const enrichmentQueue = [
  { id: 1, type: 'Product', name: 'Victron Orion XS 12/12-50A', issue: 'Missing Full Description', completeness: 45 },
  { id: 2, type: 'Product', name: 'Fogstar 400Ah Lithium Battery', issue: 'No Specs found', completeness: 62 },
  { id: 3, type: 'Resource', name: 'Winter Insulation Guide', issue: 'SEO Gaps detected', completeness: 78 },
  { id: 4, type: 'Product', name: 'Dometic S4 Window 900x500', issue: 'Low resolution images', completeness: 30 },
];

export default function AIStudioPage() {
  const [selectedStyle, setSelectedStyle] = useState('Premium');
  const [processing, setProcessing] = useState(false);

  const styles = [
    { name: 'Premium', desc: 'Editorial, high-end, authoritative' },
    { name: 'Technical', desc: 'Data-driven, precise, engineered' },
    { name: 'Conversational', desc: 'Friendly, approachable, builder-to-builder' },
    { name: 'SEO-Focus', desc: 'Keyword dense, structured for ranking' },
  ];

  const handleGenerate = () => {
    setProcessing(true);
    setTimeout(() => setProcessing(false), 2000);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tighter flex items-center gap-3">
             <Sparkles className="text-brand-orange" /> AI Content Studio
          </h1>
          <p className="text-slate-500 text-sm mt-1">Batch content generation and product enrichment engine</p>
        </div>
        
        <div className="flex items-center gap-3">
           <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-bold uppercase tracking-widest border border-emerald-100">
              <Zap size={12} className="animate-pulse" /> Anthropic Claude 3.5 Sonnet Connected
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN — ENRICHMENT QUEUE */}
        <div className="lg:col-span-1 space-y-6">
           <div className="flex justify-between items-center px-2">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Enrichment Queue</h3>
              <span className="text-[10px] font-bold text-brand-orange uppercase">{enrichmentQueue.length} Pending</span>
           </div>
           
           <div className="space-y-3">
              {enrichmentQueue.map(item => (
                <div key={item.id} className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm hover:border-brand-orange transition-all group cursor-pointer">
                   <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-slate-400">
                         {item.type === 'Product' ? <ShoppingBag size={10} /> : <FileText size={10} />}
                         {item.type}
                      </div>
                      <div className="flex items-center gap-1 text-[10px] font-bold text-red-500">
                         <AlertCircle size={10} /> {item.completeness}%
                      </div>
                   </div>
                   <h4 className="text-sm font-bold text-slate-900 mb-1 group-hover:text-brand-orange transition-colors">{item.name}</h4>
                   <p className="text-[10px] text-slate-500 italic mb-4">{item.issue}</p>
                   <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-200" style={{ width: `${item.completeness}%` }} />
                   </div>
                </div>
              ))}
              <button className="w-full py-4 border-2 border-dashed border-slate-100 text-slate-400 hover:text-slate-600 hover:border-slate-300 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all">
                 <Plus size={14} className="mx-auto mb-1" /> Add to Queue
              </button>
           </div>
        </div>

        {/* RIGHT COLUMN — WORKSHOP */}
        <div className="lg:col-span-2 space-y-8">
           {/* Generator Interface */}
           <div className="bg-white border border-slate-200 rounded-2xl shadow-lg overflow-hidden border-t-4 border-t-brand-orange">
              <div className="p-8 space-y-8">
                 <div className="flex justify-between items-start">
                    <div>
                       <h2 className="text-xl font-bold text-slate-900">Content Workshop</h2>
                       <p className="text-xs text-slate-500 mt-1">Generate high-fidelity copy for the selected node</p>
                    </div>
                    <div className="flex gap-2">
                       <button className="p-2 bg-slate-50 text-slate-400 hover:text-slate-900 rounded-lg transition-all"><Maximize2 size={16} /></button>
                       <button className="p-2 bg-slate-50 text-slate-400 hover:text-red-500 rounded-lg transition-all"><Trash2 size={16} /></button>
                    </div>
                 </div>

                 <div className="space-y-4">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 px-1">Selected Target</label>
                    <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                       <div className="w-12 h-12 bg-white rounded-lg border border-slate-200 flex items-center justify-center text-brand-orange">
                          <ShoppingBag size={20} />
                       </div>
                       <div>
                          <p className="text-sm font-bold text-slate-900">Victron Orion XS 12/12-50A</p>
                          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">SKU: VIC-ORI-XS-50</p>
                       </div>
                       <button className="ml-auto text-[10px] font-bold text-brand-orange uppercase hover:underline">Change</button>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                       <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 px-1">Style Presets</label>
                       <div className="grid grid-cols-1 gap-3">
                          {styles.map(style => (
                            <button 
                              key={style.name}
                              onClick={() => setSelectedStyle(style.name)}
                              className={cn(
                                "flex flex-col items-start p-4 rounded-xl border transition-all text-left",
                                selectedStyle === style.name 
                                  ? "bg-slate-900 border-slate-900 text-white shadow-lg shadow-slate-900/10" 
                                  : "bg-white border-slate-200 text-slate-600 hover:border-slate-400"
                              )}
                            >
                               <span className="text-xs font-bold uppercase tracking-widest mb-1">{style.name}</span>
                               <span className={cn("text-[10px]", selectedStyle === style.name ? "text-slate-400" : "text-slate-400")}>{style.desc}</span>
                            </button>
                          ))}
                       </div>
                    </div>

                    <div className="space-y-4">
                       <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 px-1">Generation Options</label>
                       <div className="space-y-4">
                          {[
                            { id: 'specs', label: 'Extract Technical Specs', icon: Settings2 },
                            { id: 'seo', label: 'Optimize for Keywords', icon: Globe },
                            { id: 'html', label: 'Format with HTML/Rich Text', icon: Layers },
                            { id: 'social', label: 'Generate Social Snippets', icon: Volume2 },
                          ].map(opt => (
                            <label key={opt.id} className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100 transition-all border border-transparent hover:border-slate-200">
                               <input type="checkbox" className="w-4 h-4 rounded text-brand-orange focus:ring-brand-orange border-slate-300" />
                               <opt.icon size={14} className="text-slate-400" />
                               <span className="text-xs font-bold text-slate-700">{opt.label}</span>
                            </label>
                          ))}
                       </div>
                    </div>
                 </div>

                 <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center gap-4">
                    <button 
                      onClick={handleGenerate}
                      disabled={processing}
                      className="w-full md:flex-1 py-4 bg-brand-orange text-white rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-slate-900 transition-all flex items-center justify-center gap-3 shadow-xl shadow-brand-orange/20"
                    >
                       {processing ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
                       {processing ? 'Processing Intelligence...' : 'Initialize Generation'}
                    </button>
                    <button className="w-full md:w-auto px-8 py-4 bg-white border border-slate-200 text-slate-600 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] hover:border-slate-400 transition-all">
                       Save as Draft
                    </button>
                 </div>
              </div>

              {/* Output Preview (only shows if something was generated, mocked here as fixed for demo) */}
              <div className="bg-slate-50 p-8 border-t border-slate-200 relative">
                 <div className="absolute top-4 right-8 flex items-center gap-2">
                    <span className="text-[9px] font-mono text-slate-400 uppercase">Preview</span>
                    <div className="flex bg-white rounded border border-slate-200 p-1">
                       <button className="p-1.5 text-slate-400 hover:text-slate-900"><Eye size={12} /></button>
                       <button className="p-1.5 text-slate-400 hover:text-brand-orange"><RefreshCcw size={12} /></button>
                    </div>
                 </div>
                 
                 <div className="prose prose-sm max-w-none prose-slate">
                    <h3 className="text-slate-900 font-bold">Generated Description</h3>
                    <p className="text-slate-600 italic">"The Victron Orion XS 12/12-50A is the next evolution in DC-to-DC charging technology. Engineered for the professional van builder, this compact powerhouse delivers a sustained 50A charge while maintaining peak efficiency in even the most constrained engine bays..."</p>
                    <ul className="text-slate-600 text-xs mt-4">
                       <li>Efficiency: 98.5%</li>
                       <li>Dimensions: Compact 120x80x40mm</li>
                       <li>Smart Alternator Compatible: Yes</li>
                    </ul>
                 </div>
                 
                 <div className="mt-8 flex justify-end gap-3">
                    <button className="px-6 py-2 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-100 transition-all flex items-center gap-2">
                       <CheckCircle2 size={14} /> Commit to Live Store
                    </button>
                 </div>
              </div>
           </div>

           {/* Batch Processing Status */}
           <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                    <Layers size={18} />
                 </div>
                 <div>
                    <h3 className="text-sm font-bold text-slate-900">Batch Processing Status</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Automated enrichment running for "Electrical" category</p>
                 </div>
              </div>
              <div className="flex items-center gap-6">
                 <div className="text-right">
                    <p className="text-[9px] font-mono text-slate-400 uppercase mb-1">Items Processed</p>
                    <p className="text-sm font-bold text-slate-900">42 / 128</p>
                 </div>
                 <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-orange" style={{ width: '32%' }} />
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
