"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { 
  Settings, 
  Layout, 
  Type, 
  Palette, 
  Move, 
  Plus, 
  Trash2, 
  Save, 
  Eye,
  FileText,
  ChevronUp,
  ChevronDown,
  Monitor,
  CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";

interface BlueprintBlock {
  id: string;
  type: 'header' | 'schematic' | 'technical_specs' | 'bill_of_materials' | 'footer' | 'notes';
  y: number;
  height?: number;
  content?: string;
  fontSize?: number;
  color?: string;
}

interface TemplateConfig {
  settings: {
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
    pageSize: string;
  };
  blocks: BlueprintBlock[];
}

export default function BlueprintEditorPage() {
  const [config, setConfig] = useState<TemplateConfig>({
    settings: {
      primaryColor: "#ff6b00",
      secondaryColor: "#111111",
      fontFamily: "Inter",
      pageSize: "A4"
    },
    blocks: [
      { id: "header", type: "header", y: 0, content: "Master Engineering Manifest", fontSize: 24 },
      { id: "schematic", type: "schematic", y: 120, height: 300 },
      { id: "specs", type: "technical_specs", y: 450 },
      { id: "bom", type: "bill_of_materials", y: 600 },
      { id: "footer", type: "footer", y: 800, content: "© 2026 Amplios Engineering" }
    ]
  });

  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Load existing template if any
  useEffect(() => {
    async function loadTemplate() {
      const { data, error } = await supabase
        .from('blueprint_templates')
        .select('*')
        .eq('is_active', true)
        .single();
      
      if (data) {
        setConfig(data.layout_config);
      }
    }
    loadTemplate();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('blueprint_templates')
        .upsert({
          name: "Default Technical Portfolio",
          layout_config: config,
          is_active: true
        }, { onConflict: 'name' });
      
      if (error) throw error;
      alert("Blueprint template saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to save template.");
    } finally {
      setIsSaving(false);
    }
  };

  const moveBlock = (id: string, direction: 'up' | 'down') => {
    const index = config.blocks.findIndex(b => b.id === id);
    if (index === -1) return;
    
    const newBlocks = [...config.blocks];
    if (direction === 'up' && index > 0) {
      [newBlocks[index], newBlocks[index - 1]] = [newBlocks[index - 1], newBlocks[index]];
    } else if (direction === 'down' && index < newBlocks.length - 1) {
      [newBlocks[index], newBlocks[index + 1]] = [newBlocks[index + 1], newBlocks[index]];
    }
    
    setConfig({ ...config, blocks: newBlocks });
  };

  const updateBlock = (id: string, updates: Partial<BlueprintBlock>) => {
    setConfig({
      ...config,
      blocks: config.blocks.map(b => b.id === id ? { ...b, ...updates } : b)
    });
  };

  const selectedBlock = config.blocks.find(b => b.id === selectedBlockId);

  return (
    <main className="bg-brand-obsidian min-h-screen text-white">
      <Navbar />
      
      <div className="pt-24 min-h-[calc(100vh-80px)] flex flex-col">
        {/* Editor Toolbar */}
        <div className="bg-brand-carbon border-b border-brand-border/40 p-4 sticky top-[72px] z-50 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-orange/20 flex items-center justify-center border border-brand-orange/40">
                <Layout className="w-4 h-4 text-brand-orange" />
              </div>
              <h1 className="font-display text-sm uppercase tracking-widest">Blueprint Designer <span className="text-brand-grey font-mono text-[10px] ml-2">v2.0</span></h1>
            </div>
            <div className="h-4 w-px bg-brand-border/40" />
            <div className="flex gap-2">
              <button 
                onClick={() => setShowPreview(!showPreview)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 font-mono text-[10px] uppercase tracking-widest transition-all",
                  showPreview ? "bg-brand-orange text-white" : "hover:bg-brand-orange/10 text-brand-grey"
                )}
              >
                <Eye className="w-3 h-3" /> {showPreview ? "Edit Mode" : "Live Preview"}
              </button>
            </div>
          </div>

          <div className="flex gap-4">
             <button 
               onClick={handleSave}
               disabled={isSaving}
               className="flex items-center gap-2 bg-brand-orange px-6 py-2.5 font-display text-[10px] uppercase tracking-widest text-white hover:bg-white hover:text-brand-orange transition-all disabled:opacity-50"
             >
               {isSaving ? "Syncing..." : <><Save className="w-4 h-4" /> Deploy Template</>}
             </button>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar: Layers & Settings */}
          <aside className="w-80 bg-brand-carbon border-r border-brand-border/40 overflow-y-auto no-scrollbar flex flex-col">
            <div className="p-6 border-b border-brand-border/20">
               <h3 className="font-mono text-[9px] text-brand-grey uppercase tracking-[0.3em] mb-4">Master Theme</h3>
               <div className="space-y-4">
                  <div>
                    <label className="font-mono text-[8px] text-brand-grey uppercase block mb-2">Primary Accent</label>
                    <div className="flex gap-2">
                       <input 
                         type="color" 
                         value={config.settings.primaryColor} 
                         onChange={(e) => setConfig({ ...config, settings: { ...config.settings, primaryColor: e.target.value }})}
                         className="w-8 h-8 bg-transparent border-none p-0 cursor-pointer"
                       />
                       <input 
                         type="text" 
                         value={config.settings.primaryColor}
                         onChange={(e) => setConfig({ ...config, settings: { ...config.settings, primaryColor: e.target.value }})}
                         className="flex-1 bg-brand-obsidian border border-brand-border/40 font-mono text-[10px] px-3 uppercase text-white"
                       />
                    </div>
                  </div>
                  <div>
                    <label className="font-mono text-[8px] text-brand-grey uppercase block mb-2">Global Font</label>
                    <select 
                      value={config.settings.fontFamily}
                      onChange={(e) => setConfig({ ...config, settings: { ...config.settings, fontFamily: e.target.value }})}
                      className="w-full bg-brand-obsidian border border-brand-border/40 font-mono text-[10px] px-3 py-2 uppercase text-white"
                    >
                      <option value="Inter">Inter (Sans)</option>
                      <option value="Roboto Mono">Roboto Mono</option>
                      <option value="Outfit">Outfit (Display)</option>
                    </select>
                  </div>
               </div>
            </div>

            <div className="p-6 flex-1">
               <div className="flex items-center justify-between mb-6">
                 <h3 className="font-mono text-[9px] text-brand-grey uppercase tracking-[0.3em]">Layout Blocks</h3>
                 <button className="text-brand-orange hover:text-white transition-colors">
                    <Plus className="w-4 h-4" />
                 </button>
               </div>

               <div className="space-y-2">
                  {config.blocks.map((block, idx) => (
                    <div 
                      key={block.id}
                      onClick={() => setSelectedBlockId(block.id)}
                      className={cn(
                        "p-4 border transition-all cursor-pointer flex items-center justify-between group",
                        selectedBlockId === block.id 
                          ? "bg-brand-orange/10 border-brand-orange" 
                          : "bg-brand-obsidian border-brand-border/20 hover:border-brand-grey/40"
                      )}
                    >
                      <div className="flex items-center gap-3">
                         <div className="w-6 h-6 rounded-full border border-brand-border/40 flex items-center justify-center">
                            <span className="font-mono text-[8px] text-brand-grey">{idx + 1}</span>
                         </div>
                         <div>
                            <p className="font-display text-[10px] uppercase text-white">{block.type.replace('_', ' ')}</p>
                            <p className="font-mono text-[7px] text-brand-grey uppercase">ID: {block.id}</p>
                         </div>
                      </div>
                      <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button onClick={(e) => { e.stopPropagation(); moveBlock(block.id, 'up'); }} className="hover:text-brand-orange"><ChevronUp className="w-3 h-3" /></button>
                         <button onClick={(e) => { e.stopPropagation(); moveBlock(block.id, 'down'); }} className="hover:text-brand-orange"><ChevronDown className="w-3 h-3" /></button>
                      </div>
                    </div>
                  ))}
               </div>
            </div>

            {selectedBlock && (
              <div className="p-6 border-t border-brand-border/40 bg-brand-obsidian/50 animate-in slide-in-from-bottom-4 duration-300">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-mono text-[9px] text-brand-orange uppercase tracking-[0.3em]">Element Props</h3>
                  <button onClick={() => setConfig({ ...config, blocks: config.blocks.filter(b => b.id !== selectedBlockId)})} className="text-brand-grey hover:text-red-500 transition-colors">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
                
                <div className="space-y-4">
                   {(selectedBlock.type === 'header' || selectedBlock.type === 'footer' || selectedBlock.type === 'notes') && (
                     <div>
                       <label className="font-mono text-[8px] text-brand-grey uppercase block mb-2">Content Text</label>
                       <textarea 
                         value={selectedBlock.content}
                         onChange={(e) => updateBlock(selectedBlock.id, { content: e.target.value })}
                         className="w-full bg-brand-carbon border border-brand-border/40 font-sans text-xs p-3 text-white h-24 outline-none focus:border-brand-orange transition-colors"
                       />
                     </div>
                   )}
                   
                   {selectedBlock.type === 'schematic' && (
                     <div>
                       <label className="font-mono text-[8px] text-brand-grey uppercase block mb-2">Display Height (px)</label>
                       <input 
                         type="number"
                         value={selectedBlock.height}
                         onChange={(e) => updateBlock(selectedBlock.id, { height: parseInt(e.target.value) })}
                         className="w-full bg-brand-carbon border border-brand-border/40 font-mono text-xs p-3 text-white outline-none focus:border-brand-orange transition-colors"
                       />
                     </div>
                   )}

                   <div>
                      <label className="font-mono text-[8px] text-brand-grey uppercase block mb-2">Font Size (pt)</label>
                      <input 
                        type="range" 
                        min="8" 
                        max="72"
                        value={selectedBlock.fontSize || 12}
                        onChange={(e) => updateBlock(selectedBlock.id, { fontSize: parseInt(e.target.value) })}
                        className="w-full accent-brand-orange"
                      />
                   </div>
                </div>
              </div>
            )}
          </aside>

          {/* Main Canvas: Visual Preview */}
          <section className="flex-1 bg-[#0a0a0a] overflow-y-auto p-12 flex justify-center no-scrollbar">
            <div className={cn(
              "w-[794px] min-h-[1123px] bg-white shadow-2xl relative transition-all duration-500 origin-top",
              showPreview ? "" : "opacity-40 scale-95"
            )} style={{ fontFamily: config.settings.fontFamily }}>
              
              {/* Internal Canvas Border for Guide */}
              <div className="absolute inset-8 border border-dashed border-brand-grey/20 pointer-events-none" />

              <div className="p-16 relative h-full">
                {config.blocks.map((block) => (
                  <div 
                    key={block.id}
                    onClick={() => setSelectedBlockId(block.id)}
                    className={cn(
                      "relative mb-8 transition-all cursor-move group",
                      selectedBlockId === block.id ? "ring-2 ring-brand-orange ring-offset-4 ring-offset-white" : "hover:ring-1 hover:ring-brand-grey/30"
                    )}
                  >
                    {/* Visual Mock of Content */}
                    {block.type === 'header' && (
                      <div className="border-b-2 pb-6 flex justify-between items-end" style={{ borderBottomColor: config.settings.primaryColor }}>
                        <div>
                          <h1 style={{ fontSize: `${block.fontSize}pt`, color: config.settings.secondaryColor }} className="uppercase font-bold tracking-tighter leading-none">
                            {block.content || "Master Blueprint"}
                          </h1>
                          <p className="text-[10px] text-brand-grey font-mono uppercase tracking-widest mt-2">TECHNICAL ARCHIVE // CONFIDENTIAL</p>
                        </div>
                        <div className="text-right">
                           <div className="w-12 h-12 bg-black flex items-center justify-center ml-auto">
                              <span className="text-white font-display text-[8px] tracking-tighter">AMPLIOS</span>
                           </div>
                        </div>
                      </div>
                    )}

                    {block.type === 'schematic' && (
                      <div className="bg-gray-50 border border-gray-200 flex items-center justify-center overflow-hidden" style={{ height: `${block.height}px` }}>
                         <div className="text-center opacity-30">
                            <Monitor className="w-12 h-12 mx-auto mb-4 text-brand-grey" />
                            <p className="font-mono text-[10px] uppercase tracking-widest text-brand-grey">Dynamic SVG Schematic Viewport</p>
                            <p className="font-mono text-[8px] uppercase tracking-widest text-brand-grey mt-1">(Vehicle Footprint & System Overlays)</p>
                         </div>
                      </div>
                    )}

                    {block.type === 'technical_specs' && (
                      <div className="grid grid-cols-2 gap-12 py-10 border-b border-gray-100">
                         <div>
                            <h4 className="font-mono text-[9px] uppercase tracking-widest text-brand-grey border-b border-gray-100 pb-2 mb-4">Engineering Limits</h4>
                            <div className="space-y-2">
                               {[1,2,3].map(i => (
                                 <div key={i} className="flex justify-between items-center py-1">
                                    <span className="text-[9px] text-gray-400 uppercase">Parameter {i}</span>
                                    <span className="text-[10px] text-black font-bold uppercase tracking-widest">--- VALUE ---</span>
                                 </div>
                               ))}
                            </div>
                         </div>
                         <div>
                            <h4 className="font-mono text-[9px] uppercase tracking-widest text-brand-grey border-b border-gray-100 pb-2 mb-4">Load Balance Analysis</h4>
                            <div className="h-20 bg-gray-50 border border-gray-100 flex items-center justify-center">
                               <div className="w-1/2 h-1 bg-gray-200 relative">
                                  <div className="absolute top-1/2 -translate-y-1/2 left-1/3 w-2 h-4 bg-brand-orange" />
                               </div>
                            </div>
                         </div>
                      </div>
                    )}

                    {block.type === 'bill_of_materials' && (
                      <div className="py-10">
                         <h4 className="font-mono text-[9px] uppercase tracking-widest text-brand-grey border-b border-gray-100 pb-2 mb-6">Manifest Ledger (Hardware BOM)</h4>
                         <table className="w-full text-left">
                            <thead>
                               <tr className="text-[8px] uppercase text-gray-400 font-mono">
                                  <th className="pb-4">Part Index</th>
                                  <th className="pb-4">Specification</th>
                                  <th className="pb-4 text-right">Vendor</th>
                               </tr>
                            </thead>
                            <tbody>
                               {[1,2,3,4,5].map(i => (
                                 <tr key={i} className="border-b border-gray-50 text-[9px]">
                                    <td className="py-3 text-black uppercase font-bold tracking-tighter">Component Alpha-{i}</td>
                                    <td className="py-3 text-gray-500">Standard Technical Spec Reference</td>
                                    <td className="py-3 text-right text-gray-400 uppercase font-mono">AMPLIOS_SUPPLY_{i}</td>
                                 </tr>
                               ))}
                            </tbody>
                         </table>
                      </div>
                    )}

                    {block.type === 'footer' && (
                      <div className="absolute bottom-16 left-16 right-16 border-t pt-8 flex justify-between items-center text-[8px] text-gray-400 font-mono uppercase tracking-widest">
                         <div>{block.content}</div>
                         <div className="flex gap-4">
                            <span>Page 1 of 8</span>
                            <span>Ref: BLUEPRINT_GEN_900X</span>
                         </div>
                      </div>
                    )}

                    {/* Editor Overlays */}
                    {!showPreview && (
                      <div className="absolute -left-12 top-0 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-2">
                        <div className="w-8 h-8 bg-brand-orange flex items-center justify-center shadow-lg">
                           <Move className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
