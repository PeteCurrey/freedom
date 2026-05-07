"use client";

import { useBuild } from "@/hooks/useBuild";
import { 
  User, Settings, Bell, Lock, Shield, 
  CreditCard, Smartphone, LogOut, ArrowRight,
  Info
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function PortalSettingsPage() {
  const { activeBuild } = useBuild();

  return (
    <div className="p-8 lg:p-12 space-y-12 pb-32 max-w-4xl">
      <div>
         <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.2em] mb-4 block animate-pulse">// User Configuration</span>
         <h1 className="font-display text-4xl lg:text-7xl uppercase tracking-tighter leading-none">Portal <span className="text-brand-orange">Settings</span></h1>
      </div>

      <div className="space-y-12">
         {/* Profile Section */}
         <div className="bg-brand-carbon border border-brand-border p-10 space-y-8">
            <div className="flex items-center gap-6">
               <div className="w-20 h-20 bg-brand-obsidian border border-brand-border flex items-center justify-center relative group">
                  <User className="w-8 h-8 text-brand-grey group-hover:text-brand-orange transition-colors" />
               </div>
               <div>
                  <h3 className="font-display text-2xl uppercase tracking-tight text-white">Pete Currey</h3>
                  <p className="font-mono text-[10px] text-brand-grey uppercase tracking-widest mt-1">Founding Builder // ID: AM-04829</p>
               </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-brand-border/40">
               <div className="space-y-2">
                  <label className="font-mono text-[9px] text-brand-grey uppercase tracking-widest">Email Address</label>
                  <input type="email" defaultValue="pete@example.com" className="w-full bg-brand-obsidian border border-brand-border p-4 text-xs font-mono text-white outline-none focus:border-brand-orange" />
               </div>
               <div className="space-y-2">
                  <label className="font-mono text-[9px] text-brand-grey uppercase tracking-widest">Primary Build Vehicle</label>
                  <input type="text" defaultValue={activeBuild?.vehicle || "Mercedes Sprinter L3H2"} className="w-full bg-brand-obsidian border border-brand-border p-4 text-xs font-mono text-white outline-none focus:border-brand-orange" />
               </div>
            </div>
         </div>

         {/* Build Goals */}
         <div className="bg-brand-carbon border border-brand-border p-10 space-y-8">
            <div className="flex items-center gap-4">
               <Settings className="w-5 h-5 text-brand-orange" />
               <h3 className="font-display text-xl uppercase tracking-tight text-white">Build Parameters</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {[
                 { label: "Usage Type", value: "Off-Grid / Full-Time" },
                 { label: "Budget Tier", value: "£15k - £25k" },
                 { label: "Difficulty", value: "Advanced" }
               ].map((item, i) => (
                 <div key={i} className="bg-brand-obsidian/50 border border-brand-border p-6 hover:bg-brand-obsidian transition-colors group cursor-pointer">
                    <span className="font-mono text-[8px] text-brand-grey uppercase tracking-widest block mb-2">{item.label}</span>
                    <div className="flex justify-between items-center">
                       <span className="font-display text-sm text-white uppercase">{item.value}</span>
                       <ArrowRight className="w-3 h-3 text-brand-grey group-hover:text-brand-orange transition-all" />
                    </div>
                 </div>
               ))}
            </div>
         </div>

         {/* Support Tiers */}
         <div className="p-10 border border-brand-orange/20 bg-brand-orange/5 space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
               <Shield className="w-32 h-32 text-brand-orange" />
            </div>
            <div className="space-y-4">
               <h3 className="font-display text-xl uppercase tracking-tight text-white">Engineering <span className="text-brand-orange">Support</span></h3>
               <p className="font-sans text-xs text-brand-grey leading-relaxed max-w-xl">
                  Your current portal access is <strong>Community Tier</strong>. Upgrade to <strong>Engineering Tier</strong> for priority technical support, system schematic audits, and trade pricing on bulk orders.
               </p>
            </div>
            <button className="px-10 py-4 bg-brand-orange text-white font-mono text-[10px] uppercase tracking-widest font-bold hover:bg-white hover:text-brand-orange transition-all shadow-xl">
               Upgrade Support Tier
            </button>
         </div>

         {/* Notifications & Privacy */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-brand-carbon border border-brand-border p-10 space-y-6">
               <div className="flex items-center gap-4">
                  <Bell className="w-5 h-5 text-brand-orange" />
                  <h4 className="font-display text-lg uppercase tracking-tight text-white">Notifications</h4>
               </div>
               <div className="space-y-4">
                  {[
                    "Price Drop Alerts for Spec Items",
                    "New Engineering Guides",
                    "Order Shipment Updates",
                    "Compliance Expiry Warnings"
                  ].map((text, i) => (
                    <label key={i} className="flex items-center justify-between group cursor-pointer">
                       <span className="font-sans text-xs text-brand-grey group-hover:text-white transition-colors">{text}</span>
                       <div className="w-10 h-5 bg-brand-border rounded-full p-1 relative">
                          <div className={cn("w-3 h-3 rounded-full transition-all", i < 3 ? "bg-brand-orange translate-x-5" : "bg-brand-grey")} />
                       </div>
                    </label>
                  ))}
               </div>
            </div>

            <div className="bg-brand-carbon border border-brand-border p-10 space-y-6">
               <div className="flex items-center gap-4">
                  <Lock className="w-5 h-5 text-brand-orange" />
                  <h4 className="font-display text-lg uppercase tracking-tight text-white">Security</h4>
               </div>
               <div className="space-y-4">
                  <button className="w-full text-left font-sans text-xs text-brand-grey hover:text-white transition-colors py-2 border-b border-brand-border/40 flex justify-between items-center">
                     Change Portal Password <ArrowRight className="w-3 h-3" />
                  </button>
                  <button className="w-full text-left font-sans text-xs text-brand-grey hover:text-white transition-colors py-2 border-b border-brand-border/40 flex justify-between items-center">
                     Two-Factor Authentication <span className="font-mono text-[8px] text-brand-orange font-bold px-2 py-0.5 border border-brand-orange/30">Recommended</span>
                  </button>
                  <button className="w-full text-left font-sans text-xs text-red-500 hover:text-red-400 transition-colors py-2 flex justify-between items-center group">
                     Delete Portal & Data <Info className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
