"use client";

import { useBuild } from "@/hooks/useBuild";
import { PRODUCTS, InstallStage, getProductCTA } from "@/lib/data/productRegistry";
import { useState } from "react";
import { 
  Package, ShoppingCart, Check, Trash2, RefreshCcw, 
  Search, Filter, Info, Download, ArrowRight,
  ShieldCheck, AlertTriangle, ExternalLink
} from "lucide-react";
import { cn } from "@/lib/utils";

const ALL_STAGES: InstallStage[] = [
  'Stage 1: Planning & safety',
  'Stage 2: Vehicle preparation',
  'Stage 3: Insulation & sound deadening',
  'Stage 4: First fix electrical',
  'Stage 5: Solar & charging',
  'Stage 6: Heating & ventilation',
  'Stage 7: Water & plumbing',
  'Stage 8: Gas/cooking',
  'Stage 9: Interior fit-out',
  'Stage 10: Security & finishing',
  'Stage 11: Compliance review',
  'Stage 12: Final upgrades'
];

export default function BuildBasketPage() {
  const { basket, markAsOwned, removeItem, replaceItem } = useBuild();
  const [activeStageFilter, setActiveStageFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  if (!basket) {
    return (
      <div className="p-12 text-center max-w-xl mx-auto min-h-screen flex flex-col justify-center">
         <Package className="w-16 h-16 text-brand-grey/20 mx-auto mb-8" />
         <h1 className="font-display text-4xl uppercase tracking-tighter mb-4">No Specification Loaded</h1>
         <p className="font-sans text-brand-grey text-lg mb-12">
            Your technical build basket is empty. Use the AI Build Planner to generate your recommended system architecture.
         </p>
         <button className="px-12 py-5 bg-brand-orange text-white font-display text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all shadow-xl font-bold">
            Start Planner
         </button>
      </div>
    );
  }

  const filteredItems = basket.items.filter(item => {
    const product = PRODUCTS.find(p => p.id === item.productId);
    const matchesSearch = product?.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product?.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStage = !activeStageFilter || item.stage === activeStageFilter;
    const isNotRemoved = item.purchaseStatus !== 'removed';
    return matchesSearch && matchesStage && isNotRemoved;
  });

  const stagedItems = ALL_STAGES.reduce((acc, stage) => {
    const items = filteredItems.filter(i => i.stage === stage);
    if (items.length > 0) acc[stage] = items;
    return acc;
  }, {} as Record<string, typeof basket.items>);

  return (
    <div className="p-8 lg:p-12 space-y-12 pb-48">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
         <div>
            <div className="flex items-center gap-3 mb-4">
               <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.2em] animate-pulse">// Procurement Control</span>
               <div className="h-px w-12 bg-brand-orange/30" />
               <span className="font-mono text-[10px] text-brand-grey uppercase tracking-widest">Locked: {new Date(basket.lockedAt || '').toLocaleDateString()}</span>
            </div>
            <h1 className="font-display text-4xl lg:text-7xl uppercase tracking-tighter leading-none">Build <span className="text-brand-orange">Specification</span></h1>
         </div>

         <div className="flex gap-4 w-full lg:w-auto">
            <button className="flex-1 lg:flex-none px-10 py-4 bg-brand-orange text-white font-display text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all font-bold shadow-lg shadow-brand-orange/20 flex items-center gap-2 justify-center">
               <ShoppingCart className="w-3 h-3" />
               Buy Full Specification
            </button>
            <button className="flex-1 lg:flex-none px-10 py-4 border border-brand-border text-white font-mono text-[10px] uppercase tracking-widest hover:bg-brand-carbon transition-all font-bold flex items-center gap-2 justify-center">
               <Download className="w-3 h-3" />
               Export CSV
            </button>
         </div>
      </div>

      {/* Filters & Tools */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between bg-brand-carbon border border-brand-border p-6">
         <div className="flex-1 w-full relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-grey" />
            <input 
               type="text" 
               placeholder="Search technical identifiers..." 
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full bg-brand-obsidian border border-brand-border py-3 pl-12 pr-4 text-xs font-mono text-white focus:border-brand-orange outline-none transition-all"
            />
         </div>
         <div className="flex items-center gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-thin">
            <button 
               onClick={() => setActiveStageFilter(null)}
               className={cn(
                 "px-4 py-2 font-mono text-[9px] uppercase tracking-widest whitespace-nowrap transition-all",
                 !activeStageFilter ? "bg-brand-orange text-white" : "text-brand-grey hover:text-white"
               )}
            >
               All Stages
            </button>
            {ALL_STAGES.map(stage => {
              const hasItems = basket.items.some(i => i.stage === stage);
              if (!hasItems) return null;
              return (
                <button 
                  key={stage}
                  onClick={() => setActiveStageFilter(stage)}
                  className={cn(
                    "px-4 py-2 font-mono text-[9px] uppercase tracking-widest whitespace-nowrap transition-all border border-transparent",
                    activeStageFilter === stage ? "border-brand-orange text-brand-orange" : "text-brand-grey hover:text-white"
                  )}
                >
                  {stage.split(':')[0]}
                </button>
              );
            })}
         </div>
      </div>

      {/* Staged Content */}
      <div className="space-y-32">
         {Object.entries(stagedItems).map(([stage, items]) => {
           const stageTotal = items.reduce((sum, i) => sum + i.totalPrice, 0);
           const stageBought = items.filter(i => i.purchaseStatus === 'purchased' || i.purchaseStatus === 'already_owned').length;
           
           return (
             <div key={stage} className="space-y-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-brand-border pb-6 gap-6">
                   <div className="flex items-center gap-6">
                      <div className="w-2 h-12 bg-brand-orange" />
                      <div>
                         <h3 className="font-display text-3xl uppercase tracking-widest text-white">{stage}</h3>
                         <div className="flex items-center gap-4 mt-2">
                            <span className="font-mono text-[9px] text-brand-grey uppercase">Completion:</span>
                            <div className="flex gap-1">
                               {items.map((item, idx) => (
                                 <div 
                                   key={idx} 
                                   className={cn(
                                     "w-3 h-1.5", 
                                     item.purchaseStatus === 'purchased' || item.purchaseStatus === 'already_owned' 
                                       ? "bg-brand-orange" 
                                       : "bg-brand-border"
                                   )} 
                                 />
                               ))}
                            </div>
                         </div>
                      </div>
                   </div>
                   <div className="flex flex-col items-end gap-3">
                      <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest">Stage Value: <span className="text-white text-lg ml-2">£{stageTotal.toLocaleString()}</span></span>
                      <button className="px-6 py-2 bg-brand-carbon border border-brand-border text-white font-mono text-[9px] uppercase tracking-widest hover:border-brand-orange transition-all font-bold">
                         Buy Remaining Stage Parts
                      </button>
                   </div>
                </div>

                <div className="grid grid-cols-1 gap-px bg-brand-border border border-brand-border">
                   {items.map((item) => {
                     const product = PRODUCTS.find(p => p.id === item.productId)!;
                     const isOwned = item.purchaseStatus === 'already_owned';
                     
                     return (
                       <div key={item.id} className={cn(
                         "bg-brand-carbon/30 p-10 flex flex-col lg:flex-row gap-12 group hover:bg-brand-carbon transition-all relative overflow-hidden",
                         isOwned && "opacity-60 grayscale"
                       )}>
                          {isOwned && (
                            <div className="absolute top-10 -right-12 rotate-45 bg-brand-orange text-white px-12 py-1 font-mono text-[8px] uppercase tracking-[0.2em] font-bold shadow-xl">
                               Already Owned
                            </div>
                          )}
                          
                          <div className="w-full lg:w-48 aspect-square bg-brand-obsidian border border-brand-border p-8 flex items-center justify-center shrink-0 relative">
                             <div className="absolute inset-0 blueprint-grid opacity-5" />
                             <Package className="w-12 h-12 text-brand-orange/20" />
                             <div className="absolute top-4 left-4">
                                <span className="font-mono text-[8px] text-brand-orange/50 uppercase tracking-[0.2em]">{product.brand}</span>
                             </div>
                          </div>

                          <div className="flex-1 space-y-6">
                             <div className="flex items-center gap-4">
                                <span className={cn(
                                  "font-mono text-[9px] px-3 py-1 uppercase tracking-widest font-bold",
                                  item.requiredStatus === 'required' ? "bg-brand-orange text-white" : "bg-brand-grey text-brand-obsidian"
                                )}>
                                   {item.requiredStatus}
                                </span>
                                <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest italic">// {item.reasonRecommended || "Optimized Fitment"}</span>
                             </div>
                             <h4 className="font-display text-3xl uppercase tracking-tighter text-white">{product.name}</h4>
                             <p className="font-sans text-sm text-brand-grey leading-relaxed max-w-3xl line-clamp-2">
                                {product.shortDescription}
                             </p>
                             <div className="flex flex-wrap gap-4">
                                <div className="flex items-center gap-2">
                                   <ShieldCheck className="w-3 h-3 text-brand-orange" />
                                   <span className="font-mono text-[8px] text-brand-grey uppercase tracking-widest">Compliance Verified</span>
                                </div>
                                <div className="flex items-center gap-2">
                                   <AlertTriangle className="w-3 h-3 text-brand-grey" />
                                   <span className="font-mono text-[8px] text-brand-grey uppercase tracking-widest">Complex Install</span>
                                </div>
                             </div>
                          </div>

                          <div className="lg:w-72 flex flex-col justify-between items-end gap-8">
                             <div className="text-right">
                                <span className="font-display text-4xl block text-white">£{item.totalPrice.toLocaleString()}</span>
                                <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest mt-1 block">Qty: {item.quantity}</span>
                             </div>
                             
                             <div className="w-full space-y-3">
                                {!isOwned ? (
                                  <button className="w-full bg-brand-white text-brand-obsidian font-display text-[10px] uppercase tracking-widest py-4 hover:bg-brand-orange hover:text-white transition-all font-bold">
                                     {getProductCTA(product)}
                                  </button>
                                ) : (
                                  <button className="w-full border border-brand-border text-brand-grey font-display text-[10px] uppercase tracking-widest py-4 hover:text-white transition-all font-bold">
                                     Re-Add to procurement
                                  </button>
                                )}
                                <div className="grid grid-cols-3 gap-2">
                                   <button 
                                      onClick={() => markAsOwned(item.id)}
                                      title="Mark as owned"
                                      className="flex justify-center items-center p-3 border border-brand-border text-brand-grey hover:text-brand-orange hover:border-brand-orange/40 transition-all"
                                   >
                                      <Check className="w-4 h-4" />
                                   </button>
                                   <button 
                                      onClick={() => replaceItem(item.id, 'alt-id')}
                                      title="Replace with alternative"
                                      className="flex justify-center items-center p-3 border border-brand-border text-brand-grey hover:text-brand-orange hover:border-brand-orange/40 transition-all"
                                   >
                                      <RefreshCcw className="w-4 h-4" />
                                   </button>
                                   <button 
                                      onClick={() => removeItem(item.id)}
                                      title="Remove from specification"
                                      className="flex justify-center items-center p-3 border border-brand-border text-brand-grey hover:text-red-500 hover:border-red-500/40 transition-all"
                                   >
                                      <Trash2 className="w-4 h-4" />
                                   </button>
                                </div>
                             </div>
                          </div>
                       </div>
                     );
                   })}
                </div>
             </div>
           );
         })}
      </div>

      {/* Sticky Bottom Actions */}
      <div className="fixed bottom-0 left-0 lg:left-72 right-0 bg-brand-obsidian/95 backdrop-blur-xl border-t border-brand-border py-6 px-12 z-50 flex flex-col md:flex-row justify-between items-center gap-8 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
         <div className="flex gap-12">
            <div className="space-y-1">
               <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest">Total Remaining</span>
               <span className="font-display text-2xl text-brand-orange block leading-none">£{filteredItems.filter(i => i.purchaseStatus === 'not_purchased').reduce((sum, i) => sum + i.totalPrice, 0).toLocaleString()}</span>
            </div>
            <div className="space-y-1">
               <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest">Total Items</span>
               <span className="font-display text-2xl text-white block leading-none">{filteredItems.length} SKU</span>
            </div>
         </div>
         <div className="flex gap-4 w-full md:w-auto">
            <button className="flex-1 md:flex-none px-12 py-4 border border-brand-border text-white font-mono text-[10px] uppercase tracking-widest hover:bg-brand-carbon transition-all font-bold">
               Request Full Quote
            </button>
            <button className="flex-1 md:flex-none px-12 py-4 bg-brand-orange text-white font-mono text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all font-bold shadow-lg shadow-brand-orange/20">
               Buy Staged Items
            </button>
         </div>
      </div>
    </div>
  );
}
