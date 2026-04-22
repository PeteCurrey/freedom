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
  type: 'header' | 'schematic' | 'technical_specs' | 'bill_of_materials' | 'footer' | 'notes' | 'image';
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
      { id: "cover", type: "header", y: 0, content: "Expedition Series Blueprint", fontSize: 36 },
      { id: "hero_img", type: "image", y: 100, content: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?q=80&w=2070&auto=format&fit=crop", height: 400 },
      { id: "intro_notes", type: "notes", y: 550, content: "Top-tier off-grid build tailored for extended 4-season expeditions. Features 800W solar array, 400Ah lithium bank, and advanced thermal management." },
      { id: "specs", type: "technical_specs", y: 650 },
      { id: "schematic_1", type: "schematic", y: 800, height: 450, content: "Electrical Architecture" },
      { id: "schematic_2", type: "schematic", y: 1300, height: 450, content: "Plumbing & Hydronics" },
      { id: "bom", type: "bill_of_materials", y: 1800 },
      { id: "compliance", type: "notes", y: 2400, content: "DVLA Reclassification Compliant. Sign-off ready for independent engineer inspection." },
      { id: "footer", type: "footer", y: 2600, content: "© 2026 Amplios Engineering // PRO-SPEC" }
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
                          <p className="text-[10px] text-brand-grey font-mono uppercase tracking-widest mt-2">TECHNICAL ARCHIVE // VEHICLE CLASSIFICATION PROTOCOL</p>
                        </div>
                        <div className="text-right">
                           <div className="w-16 h-16 bg-brand-obsidian flex items-center justify-center ml-auto shadow-sm">
                              <span className="text-brand-orange font-display text-[10px] tracking-tighter">AMPLIOS</span>
                           </div>
                        </div>
                      </div>
                    )}

                    {block.type === 'image' && (
                       <div className="overflow-hidden border border-gray-200" style={{ height: `${block.height}px` }}>
                          {block.content ? (
                             <img src={block.content} alt="Blueprint Visual" className="w-full h-full object-cover" />
                          ) : (
                             <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                <span className="font-mono text-xs text-gray-400">IMG_PLACEHOLDER</span>
                             </div>
                          )}
                       </div>
                    )}

                    {block.type === 'notes' && (
                       <div className="bg-gray-50 border-l-4 p-6" style={{ borderLeftColor: config.settings.primaryColor }}>
                          <h4 className="font-mono text-[9px] uppercase tracking-widest text-brand-grey mb-2">Engineer's Notes</h4>
                          <p className="font-sans text-xs text-black leading-relaxed">
                             {block.content || "Insert engineering notes or compliance statements here."}
                          </p>
                       </div>
                    )}

                    {block.type === 'schematic' && (() => {
                      const imgSrc = (block.content || '').toLowerCase().includes('plumb')
                        ? '/schematics/plumbing.png'
                        : '/schematics/electrical.png';
                      return (
                        <div className="border border-gray-200 overflow-hidden relative" style={{ height: `${block.height}px` }}>
                          <img src={imgSrc} alt={block.content} className="w-full h-full object-contain bg-gray-50" />
                          <div className="absolute top-3 left-3 bg-white/90 border border-gray-200 px-3 py-1.5 shadow-sm">
                            <span className="font-mono text-[8px] uppercase tracking-widest text-brand-orange font-bold">{block.content || 'System Schematic'}</span>
                          </div>
                        </div>
                      );
                    })()}

                    {block.type === 'technical_specs' && (
                      <div className="grid grid-cols-2 gap-12 py-10 border-b border-gray-200">
                         <div>
                            <h4 className="font-mono text-[10px] uppercase tracking-widest text-brand-grey border-b border-gray-200 pb-2 mb-4 font-bold">Engineering Limits & Telemetry</h4>
                            <div className="space-y-3">
                               <div className="flex justify-between items-center py-1 border-b border-gray-50">
                                  <span className="text-[10px] text-gray-500 uppercase font-mono">Gross Vehicle Mass (GVM)</span>
                                  <span className="text-[11px] text-black font-bold uppercase tracking-widest">3500 KG</span>
                               </div>
                               <div className="flex justify-between items-center py-1 border-b border-gray-50">
                                  <span className="text-[10px] text-gray-500 uppercase font-mono">Projected Kerb Weight</span>
                                  <span className="text-[11px] text-black font-bold uppercase tracking-widest">2840 KG</span>
                               </div>
                               <div className="flex justify-between items-center py-1 border-b border-gray-50">
                                  <span className="text-[10px] text-gray-500 uppercase font-mono">Available Payload</span>
                                  <span className="text-[11px] text-green-600 font-bold uppercase tracking-widest">660 KG</span>
                               </div>
                               <div className="flex justify-between items-center py-1 border-b border-gray-50">
                                  <span className="text-[10px] text-gray-500 uppercase font-mono">Energy Capacity (DC)</span>
                                  <span className="text-[11px] text-black font-bold uppercase tracking-widest">4800 Wh</span>
                               </div>
                            </div>
                         </div>
                         <div>
                            <h4 className="font-mono text-[10px] uppercase tracking-widest text-brand-grey border-b border-gray-200 pb-2 mb-4 font-bold">Load Balance Analysis</h4>
                            <div className="h-24 bg-gray-50 border border-gray-200 flex flex-col items-center justify-center p-4">
                               <div className="w-full h-2 bg-gray-200 relative rounded-full mb-3">
                                  <div className="absolute top-1/2 -translate-y-1/2 left-[48%] w-3 h-6 bg-brand-orange rounded-sm shadow-md" />
                               </div>
                               <div className="flex justify-between w-full font-mono text-[8px] text-gray-400 uppercase">
                                  <span>Rear Axle (45%)</span>
                                  <span className="text-brand-orange font-bold">Optimal CG</span>
                                  <span>Front Axle (55%)</span>
                               </div>
                            </div>
                         </div>
                      </div>
                    )}

                    {block.type === 'bill_of_materials' && (
                      <div className="py-10">
                         <h4 className="font-mono text-[10px] uppercase tracking-widest text-brand-grey border-b border-gray-200 pb-2 mb-6 font-bold">Manifest Ledger (Hardware BOM)</h4>
                         <table className="w-full text-left">
                            <thead>
                               <tr className="text-[9px] uppercase text-gray-500 font-mono border-b-2 border-gray-200">
                                  <th className="pb-4 font-bold">SKU</th>
                                  <th className="pb-4 font-bold">Component Specification</th>
                                  <th className="pb-4 text-center font-bold">QTY</th>
                                  <th className="pb-4 text-right font-bold">Vendor / Brand</th>
                               </tr>
                            </thead>
                            <tbody>
                               <tr className="border-b border-gray-100 text-[10px]">
                                  <td className="py-4 text-gray-400 font-mono">PWR-VIC-3000</td>
                                  <td className="py-4 text-black font-bold">Victron MultiPlus-II 12/3000/120-32 Inverter/Charger</td>
                                  <td className="py-4 text-center text-gray-600 font-mono">1</td>
                                  <td className="py-4 text-right text-gray-500 uppercase font-mono">Victron Energy</td>
                               </tr>
                               <tr className="border-b border-gray-100 text-[10px]">
                                  <td className="py-4 text-gray-400 font-mono">BAT-RMR-400</td>
                                  <td className="py-4 text-black font-bold">Roamer 400Ah 12V LiFePO4 Seatbase Battery</td>
                                  <td className="py-4 text-center text-gray-600 font-mono">1</td>
                                  <td className="py-4 text-right text-gray-500 uppercase font-mono">Roamer Batteries</td>
                               </tr>
                               <tr className="border-b border-gray-100 text-[10px]">
                                  <td className="py-4 text-gray-400 font-mono">HVA-TRU-4E</td>
                                  <td className="py-4 text-black font-bold">Truma Combi 4E CP Plus (Gas/Electric) Boiler</td>
                                  <td className="py-4 text-center text-gray-600 font-mono">1</td>
                                  <td className="py-4 text-right text-gray-500 uppercase font-mono">Truma</td>
                               </tr>
                               <tr className="border-b border-gray-100 text-[10px]">
                                  <td className="py-4 text-gray-400 font-mono">SOL-FLX-200</td>
                                  <td className="py-4 text-black font-bold">200W Monocrystalline Flexible Solar Panel</td>
                                  <td className="py-4 text-center text-gray-600 font-mono">4</td>
                                  <td className="py-4 text-right text-gray-500 uppercase font-mono">Photonic Universe</td>
                               </tr>
                               <tr className="border-b border-gray-100 text-[10px]">
                                  <td className="py-4 text-gray-400 font-mono">WTR-CAF-80</td>
                                  <td className="py-4 text-black font-bold">CAK Tanks 80L Fresh Water Underslung (Sprinter)</td>
                                  <td className="py-4 text-center text-gray-600 font-mono">1</td>
                                  <td className="py-4 text-right text-gray-500 uppercase font-mono">CAK Tanks</td>
                               </tr>
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
