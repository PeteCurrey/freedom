"use client";

import { useBuild } from "@/hooks/useBuild";
import Link from "next/link";
import { 
  ArrowRight, Package, ShoppingBag, FileText, 
  Settings, ClipboardCheck, Zap, ShieldCheck, 
  LayoutDashboard, Gauge, Hammer, Info, AlertTriangle,
  History, TrendingUp, CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";

const STAGES = [
  { id: 1, name: "Planning", icon: FileText, status: "completed" },
  { id: 2, name: "Vehicle Prep", icon: Hammer, status: "in-progress" },
  { id: 3, name: "Insulation", icon: Package, status: "not-started" },
  { id: 4, name: "Electrical", icon: Zap, status: "not-started" },
  { id: 5, name: "Plumbing", icon: Gauge, status: "not-started" },
  { id: 6, name: "Compliance", icon: ShieldCheck, status: "not-started" },
];

export default function ClientPortalDashboard() {
  const { activeBuild, basket } = useBuild();

  if (!activeBuild) {
    return (
      <div className="p-12 min-h-screen flex flex-col items-center justify-center text-center max-w-2xl mx-auto">
         <div className="w-20 h-20 bg-brand-carbon border border-brand-border flex items-center justify-center mb-8 rotate-45 group">
            <LayoutDashboard className="w-8 h-8 text-brand-grey -rotate-45" />
         </div>
         <h1 className="font-display text-4xl uppercase tracking-tighter mb-4">No Active Build Found</h1>
         <p className="font-sans text-brand-grey text-lg mb-12 leading-relaxed">
            Your Command Centre is offline. Complete the AI Build Planner to generate your technical specification and unlock your portal.
         </p>
         <div className="flex gap-4">
            <Link href="/planner" className="px-12 py-5 bg-brand-orange text-white font-display text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all shadow-xl font-bold">
               Launch Build Planner
            </Link>
            <Link href="/store" className="px-12 py-5 border border-brand-border text-white font-mono text-[10px] uppercase tracking-widest hover:bg-brand-carbon transition-all font-bold">
               Browse Store
            </Link>
         </div>
      </div>
    );
  }

  return (
    <div className="p-8 lg:p-12 space-y-12 pb-32">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
         <div>
            <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.2em] mb-4 block animate-pulse">// Mission Control</span>
            <h1 className="font-display text-4xl lg:text-6xl uppercase tracking-tighter leading-none">{activeBuild.buildName}</h1>
            <div className="flex items-center gap-4 mt-6">
               <div className="flex items-center gap-2 px-3 py-1 bg-brand-carbon border border-brand-border">
                  <span className="font-mono text-[8px] text-brand-grey uppercase">Vehicle:</span>
                  <span className="font-mono text-[8px] text-white uppercase font-bold">{activeBuild.vehicle}</span>
               </div>
               <div className="flex items-center gap-2 px-3 py-1 bg-brand-carbon border border-brand-border">
                  <span className="font-mono text-[8px] text-brand-grey uppercase">Status:</span>
                  <span className="font-mono text-[8px] text-brand-orange uppercase font-bold">{activeBuild.status}</span>
               </div>
            </div>
         </div>

         <div className="flex gap-4 w-full lg:w-auto">
            <Link href="/client-portal/basket" className="flex-1 lg:flex-none px-10 py-4 bg-brand-white text-brand-obsidian font-display text-[10px] uppercase tracking-widest hover:bg-brand-orange hover:text-white transition-all font-bold text-center">
               View Specification
            </Link>
            <button className="flex-1 lg:flex-none px-10 py-4 border border-brand-border text-white font-mono text-[10px] uppercase tracking-widest hover:bg-brand-carbon transition-all font-bold">
               Export Data
            </button>
         </div>
      </div>

      {/* Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
         <div className="bg-brand-carbon border border-brand-border p-8 relative group hover:border-brand-orange/40 transition-colors">
            <TrendingUp className="absolute top-6 right-6 w-5 h-5 text-brand-orange opacity-20 group-hover:opacity-100 transition-opacity" />
            <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest block mb-4">Total Spec Value</span>
            <div className="flex items-baseline gap-2">
               <span className="font-display text-3xl text-white">£{activeBuild.estimatedTotalCost.toLocaleString()}</span>
               <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest italic">est. parts</span>
            </div>
         </div>

         <div className="bg-brand-carbon border border-brand-border p-8 relative group hover:border-brand-orange/40 transition-colors">
            <ShoppingBag className="absolute top-6 right-6 w-5 h-5 text-brand-orange opacity-20 group-hover:opacity-100 transition-opacity" />
            <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest block mb-4">Procured to Date</span>
            <div className="flex items-baseline gap-2">
               <span className="font-display text-3xl text-brand-orange">£{activeBuild.purchasedValue.toLocaleString()}</span>
               <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest italic">{(activeBuild.purchasedValue / activeBuild.estimatedTotalCost * 100).toFixed(0)}% completion</span>
            </div>
         </div>

         <div className="bg-brand-carbon border border-brand-border p-8 relative group hover:border-brand-orange/40 transition-colors">
            <History className="absolute top-6 right-6 w-5 h-5 text-brand-orange opacity-20 group-hover:opacity-100 transition-opacity" />
            <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest block mb-4">Pending Purchase</span>
            <div className="flex items-baseline gap-2">
               <span className="font-display text-3xl text-white">£{activeBuild.remainingValue.toLocaleString()}</span>
               <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest italic">across {basket?.items.filter(i => i.purchaseStatus === 'not_purchased').length || 0} items</span>
            </div>
         </div>

         <div className="bg-brand-carbon border border-brand-border p-8 relative group hover:border-brand-orange/40 transition-colors">
            <ShieldCheck className="absolute top-6 right-6 w-5 h-5 text-brand-orange opacity-20 group-hover:opacity-100 transition-opacity" />
            <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest block mb-4">Compliance Status</span>
            <div className="flex items-center gap-3">
               <div className="flex gap-1">
                  {[1,2,3].map(i => <div key={i} className={`w-2 h-4 ${i <= 1 ? 'bg-brand-orange' : 'bg-brand-border'}`} />)}
               </div>
               <span className="font-display text-lg text-white uppercase tracking-tighter">Provisional Approval</span>
            </div>
         </div>
      </div>

      {/* Main Content Sections */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
         {/* Roadmap */}
         <div className="xl:col-span-2 space-y-8">
            <div className="flex items-center justify-between">
               <h3 className="font-display text-2xl uppercase tracking-tighter">Build <span className="text-brand-orange">Roadmap</span></h3>
               <Link href="/client-portal/compliance" className="font-mono text-[9px] text-brand-grey uppercase tracking-widest hover:text-white transition-colors">Detailed Timeline →</Link>
            </div>
            <div className="bg-brand-carbon border border-brand-border p-8 lg:p-12 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Settings className="w-32 h-32" />
               </div>
               <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-8 relative z-10">
                  {STAGES.map((stage) => {
                    const Icon = stage.icon;
                    return (
                      <div key={stage.id} className="flex flex-col items-center text-center group">
                         <div className={cn(
                           "w-16 h-16 border flex items-center justify-center mb-6 transition-all duration-500",
                           stage.status === 'completed' ? "bg-brand-orange border-brand-orange" : 
                           stage.status === 'in-progress' ? "border-brand-orange animate-pulse" : "border-brand-border"
                         )}>
                            <Icon className={cn("w-6 h-6", stage.status === 'completed' ? "text-white" : "text-brand-grey group-hover:text-brand-orange")} />
                         </div>
                         <span className="font-mono text-[8px] text-brand-grey uppercase tracking-widest mb-1">Stage 0{stage.id}</span>
                         <span className="font-display text-[10px] text-white uppercase tracking-widest">{stage.name}</span>
                         <div className="mt-4 flex flex-col items-center">
                            {stage.status === 'completed' && <CheckCircle2 className="w-3 h-3 text-brand-orange" />}
                            {stage.status === 'in-progress' && <div className="w-1.5 h-1.5 rounded-full bg-brand-orange" />}
                         </div>
                      </div>
                    );
                  })}
               </div>
               {/* Connector Line */}
               <div className="hidden lg:block absolute top-[calc(3rem+32px)] left-[15%] right-[15%] h-px bg-brand-border -z-10" />
            </div>

            {/* Next Recommended Purchase */}
            <div className="space-y-6">
               <h3 className="font-display text-2xl uppercase tracking-tighter">Critical <span className="text-brand-orange">Procurement</span></h3>
               <div className="bg-brand-obsidian border border-brand-border flex flex-col md:flex-row items-center p-8 gap-8 group hover:border-brand-orange/40 transition-all">
                  <div className="w-32 h-32 bg-brand-carbon border border-brand-border flex items-center justify-center shrink-0">
                     <Package className="w-12 h-12 text-brand-orange/20" />
                  </div>
                  <div className="flex-1 space-y-4">
                     <div className="flex items-center gap-3">
                        <span className="font-mono text-[9px] bg-brand-orange text-white px-3 py-1 uppercase tracking-widest font-bold">Priority Stage 1</span>
                        <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest italic">// Critical Path Item</span>
                     </div>
                     <h4 className="font-display text-2xl uppercase tracking-tight text-white">Full Insulation & Acoustic Kit</h4>
                     <p className="font-sans text-brand-grey text-sm leading-relaxed italic">
                        "Your build cannot proceed past Stage 3 without full thermal treatment. Securing these materials now ensures your wiring first-fix stays on schedule."
                     </p>
                  </div>
                  <div className="shrink-0 text-center md:text-right flex flex-col gap-4">
                     <span className="font-display text-3xl text-white">£1,245.00</span>
                     <button className="px-10 py-4 bg-brand-orange text-white font-display text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all font-bold">
                        Add to Cart
                     </button>
                  </div>
               </div>
            </div>
         </div>

         {/* Right Column: Quotes & Actions */}
         <div className="space-y-12">
            <div className="bg-brand-carbon border border-brand-border p-10 space-y-8">
               <div className="flex items-center justify-between">
                  <h4 className="font-display text-xl uppercase tracking-tight">Active <span className="text-brand-orange">Quotes</span></h4>
                  <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest px-2 py-1 bg-brand-obsidian border border-brand-border">03 Drafts</span>
               </div>
               <div className="space-y-4">
                  {[
                    { type: "Full Electrical Kit", value: "£3,450", status: "Awaiting Review" },
                    { type: "Diesel Heating Install", value: "£850", status: "Draft" },
                  ].map((quote, i) => (
                    <div key={i} className="bg-brand-obsidian/50 border border-brand-border p-6 hover:bg-brand-obsidian transition-colors group">
                       <div className="flex justify-between items-start mb-4">
                          <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest">{quote.type}</span>
                          <span className="font-mono text-[8px] text-brand-orange uppercase font-bold">{quote.status}</span>
                       </div>
                       <div className="flex justify-between items-end">
                          <span className="font-display text-lg text-white">{quote.value}</span>
                          <ArrowRight className="w-4 h-4 text-brand-grey group-hover:text-brand-orange transition-colors" />
                       </div>
                    </div>
                  ))}
               </div>
               <button className="w-full py-4 border border-dashed border-brand-border text-brand-grey font-mono text-[10px] uppercase tracking-widest hover:text-white hover:border-brand-orange/40 transition-all flex items-center justify-center gap-3">
                  <Info className="w-3 h-3" />
                  Request Stage Quote
               </button>
            </div>

            <div className="bg-brand-orange/10 border border-brand-orange/20 p-10 space-y-6">
               <div className="flex items-center gap-4 text-brand-orange">
                  <AlertTriangle className="w-6 h-6" />
                  <h4 className="font-display text-xl uppercase tracking-tight">Compliance Alert</h4>
               </div>
               <p className="font-sans text-brand-grey text-sm leading-relaxed">
                  Your current electrical specification requires a <strong>certified habitation check</strong> for 230V systems. Failure to document this may void your insurance.
               </p>
               <button className="w-full py-4 bg-brand-orange text-white font-mono text-[10px] uppercase tracking-widest font-bold hover:bg-white hover:text-brand-orange transition-all">
                  Read Compliance Guide
               </button>
            </div>

            <div className="p-8 border border-brand-border border-dashed text-center">
               <h4 className="font-display text-sm uppercase tracking-widest mb-4">Need Help?</h4>
               <p className="font-sans text-[11px] text-brand-grey mb-8">Access our engineering desk for 1-on-1 technical support on your specific build specification.</p>
               <Link href="/client-portal/settings" className="font-mono text-[9px] text-brand-orange uppercase tracking-widest underline underline-offset-4">Upgrade to Human Review</Link>
            </div>
         </div>
      </div>
    </div>
  );
}
