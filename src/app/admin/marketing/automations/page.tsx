"use client";

import { useState } from "react";
import { 
  Zap, 
  Plus, 
  ArrowRight, 
  Play, 
  Pause, 
  Settings, 
  Trash2, 
  BarChart3, 
  Users, 
  Mail,
  ShoppingCart,
  MousePointer2,
  Clock,
  CheckCircle2,
  MoreVertical,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AutomationsPage() {
  const [flows, setFlows] = useState([
    { id: 1, name: "Abandoned Cart Recovery", status: "active", trigger: "Cart Abandoned", audience: "All Visitors", conversions: "12.4%", sent: 1240 },
    { id: 2, name: "Welcome Series (Build Kit)", status: "active", trigger: "Newsletter Signup", audience: "Kit Interested", conversions: "8.2%", sent: 850 },
    { id: 3, name: "Post-Purchase Review", status: "paused", trigger: "Order Shipped", audience: "Customers", conversions: "5.1%", sent: 320 },
    { id: 4, name: "T3 Build Nurture", status: "active", trigger: "Quote Requested", audience: "High Intent", conversions: "18.5%", sent: 145 }
  ]);

  const toggleStatus = (id: number) => {
    setFlows(flows.map(f => f.id === id ? { ...f, status: f.status === 'active' ? 'paused' : 'active' } : f));
  };

  return (
    <div className="p-8 pb-32 bg-brand-obsidian min-h-screen text-brand-white">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] text-brand-orange uppercase tracking-[.4em] mb-4">
              <Zap size={12} /> Marketing Node: automation.zeta
            </div>
            <h1 className="font-display text-5xl uppercase tracking-tighter text-brand-white">
              Marketing <span className="text-brand-orange">Automations</span>
            </h1>
          </div>
          
          <button className="px-8 py-4 bg-brand-orange text-brand-white font-mono text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all flex items-center gap-2">
             <Plus size={14} /> Create New Flow
          </button>
        </div>

        {/* Global Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
           {[
              { label: 'Active Flows', value: '3', icon: Play, color: 'text-brand-orange' },
              { label: 'Total Enrolled', value: '2,555', icon: Users, color: 'text-brand-white' },
              { label: 'Avg conversion', value: '11.0%', icon: MousePointer2, color: 'text-emerald-500' },
              { label: 'Revenue Generated', value: '£4,250', icon: BarChart3, color: 'text-brand-white' }
           ].map((stat, i) => (
              <div key={i} className="blueprint-border p-8 bg-brand-carbon">
                 <div className="flex justify-between items-center mb-4">
                    <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest">{stat.label}</span>
                    <stat.icon size={14} className={stat.color} />
                 </div>
                 <p className="font-display text-3xl uppercase tracking-tight">{stat.value}</p>
              </div>
           ))}
        </div>

        {/* Flows Ledger */}
        <div className="blueprint-border bg-brand-carbon overflow-hidden">
           <div className="p-6 bg-brand-obsidian border-b border-brand-border flex justify-between items-center">
              <h3 className="font-display text-sm uppercase tracking-widest text-brand-white">
                 Operational <span className="text-brand-orange">Flow Ledger</span>
              </h3>
           </div>
           <table className="w-full text-left">
              <thead>
                 <tr className="bg-brand-obsidian border-b border-brand-border font-mono text-[10px] uppercase tracking-widest text-brand-grey">
                    <th className="p-6">Automation Flow</th>
                    <th className="p-6">Trigger Event</th>
                    <th className="p-6 text-center">Status</th>
                    <th className="p-6 text-center">Conversions</th>
                    <th className="p-6 text-center">Sent</th>
                    <th className="p-6 text-right">Actions</th>
                 </tr>
              </thead>
              <tbody className="font-sans text-xs">
                 {flows.map((flow) => (
                    <tr key={flow.id} className={cn(
                      "border-b border-brand-border/50 hover:bg-brand-obsidian transition-colors group",
                      flow.status === 'paused' && "opacity-60 grayscale"
                    )}>
                       <td className="p-6">
                          <div className="flex items-center gap-4">
                             <div className="p-3 bg-brand-obsidian border border-brand-border text-brand-orange group-hover:border-brand-orange transition-all">
                                {flow.name.includes('Cart') ? <ShoppingCart size={18} /> : flow.name.includes('Welcome') ? <Mail size={18} /> : <Zap size={18} />}
                             </div>
                             <div>
                                <span className="block font-display text-sm uppercase text-brand-white group-hover:text-brand-orange transition-colors">{flow.name}</span>
                                <span className="block font-mono text-[8px] text-brand-grey uppercase tracking-widest mt-0.5">{flow.audience}</span>
                             </div>
                          </div>
                       </td>
                       <td className="p-6">
                          <div className="flex items-center gap-2 text-brand-grey">
                             <Clock size={12} />
                             <span className="font-mono text-[9px] uppercase tracking-widest">{flow.trigger}</span>
                          </div>
                       </td>
                       <td className="p-6 text-center">
                          <button 
                            onClick={() => toggleStatus(flow.id)}
                            className={cn(
                              "px-3 py-1 font-mono text-[8px] uppercase tracking-widest border transition-all",
                              flow.status === 'active' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-brand-grey/10 text-brand-grey border-brand-grey/20"
                            )}
                          >
                             {flow.status}
                          </button>
                       </td>
                       <td className="p-6 text-center font-display text-lg text-emerald-500">{flow.conversions}</td>
                       <td className="p-6 text-center font-mono text-brand-white">{flow.sent.toLocaleString()}</td>
                       <td className="p-6 text-right">
                          <div className="flex justify-end gap-3 text-brand-grey opacity-0 group-hover:opacity-100 transition-opacity">
                             <button className="hover:text-brand-orange transition-colors"><Settings size={16} /></button>
                             <button className="hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                             <ChevronRight size={16} className="text-brand-grey/20" />
                          </div>
                       </td>
                    </tr>
                 ))}
              </tbody>
           </table>
        </div>

        {/* Visual Flow Preview (Placeholder/Aesthetic) */}
        <div className="mt-12 blueprint-border bg-brand-carbon p-12 relative overflow-hidden">
           <div className="blueprint-grid absolute inset-0 opacity-10 pointer-events-none" />
           <div className="relative z-10 flex flex-col items-center">
              <h4 className="font-display text-xl uppercase tracking-widest text-brand-white mb-8">Node Logic Visualization</h4>
              
              <div className="flex items-center gap-12">
                 <div className="blueprint-border p-6 bg-brand-obsidian border-brand-orange shadow-lg shadow-brand-orange/10 flex flex-col items-center">
                    <ShoppingCart className="text-brand-orange mb-3" />
                    <span className="font-mono text-[9px] uppercase text-brand-white">Checkout Started</span>
                 </div>
                 <ArrowRight className="text-brand-grey" />
                 <div className="blueprint-border p-6 bg-brand-obsidian border-brand-border flex flex-col items-center">
                    <Clock className="text-brand-grey mb-3" />
                    <span className="font-mono text-[9px] uppercase text-brand-white">Wait 1 Hour</span>
                 </div>
                 <ArrowRight className="text-brand-grey" />
                 <div className="blueprint-border p-6 bg-brand-obsidian border-brand-border flex flex-col items-center">
                    <ShoppingCart className="text-brand-grey mb-3 opacity-30" />
                    <span className="font-mono text-[9px] uppercase text-brand-white">Order Exists?</span>
                 </div>
                 <ArrowRight className="text-brand-grey" />
                 <div className="blueprint-border p-6 bg-brand-obsidian border-emerald-500 shadow-lg shadow-emerald-500/10 flex flex-col items-center">
                    <Mail className="text-emerald-500 mb-3" />
                    <span className="font-mono text-[9px] uppercase text-brand-white">Send Recovery Email</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
