"use client";

import { useBuild } from "@/hooks/useBuild";
import { 
  ShieldCheck, AlertTriangle, CheckCircle2, 
  Scale, Zap, Gauge, Info, ClipboardCheck,
  FileText, ExternalLink, Download
} from "lucide-react";
import { cn } from "@/lib/utils";

const COMPLIANCE_SECTIONS = [
  {
    title: "V5C & Reclassification",
    description: "UK DVLA requirements for 'Motor Caravan' body type classification.",
    items: [
      { name: "External graphic visibility", status: "pending", info: "Requires stickers/decals to distinguish from a panel van." },
      { name: "Fixed seating & table", status: "pending", info: "Must be permanently fixed, not removable without tools." },
      { name: "Sleeping accommodation", status: "completed", info: "Minimum 1.8m length required." },
      { name: "Cooking & storage", status: "pending", info: "Fixed hob and water storage required." }
    ]
  },
  {
    title: "Electrical Safety",
    description: "Critical safety for 230V AC and 12V DC systems.",
    items: [
      { name: "Habitation Certificate (AC)", status: "pending", info: "Requires inspection by a qualified electrician." },
      { name: "Battery Ventilation", status: "completed", info: "Critical for lead-acid/AGM. Lithium requires specific BMS safety." },
      { name: "RCD & Fuse Protection", status: "pending", info: "Check parity between MultiPlus output and distribution." },
      { name: "Bonding & Earthing", status: "pending", info: "Chassis bonding verification required." }
    ]
  },
  {
    title: "Gas & Ventilation",
    description: "Preventing CO poisoning and explosion risk.",
    items: [
      { name: "Gas-Tight Locker", status: "pending", info: "Must have floor drop vents and a secure seal." },
      { name: "Landlord Certificate", status: "pending", info: "Recommended for all habitation builds, required for rental." },
      { name: "CO & Smoke Alarms", status: "completed", info: "Must be tested and positioned correctly." },
      { name: "Ventilation Calculation", status: "pending", info: "Ensuring sufficient air changes per hour." }
    ]
  },
  {
    title: "Weight & Payload",
    description: "Axle limits and total mass management.",
    items: [
      { name: "Total Build Mass (MAM)", status: "pending", info: "Must stay under 3,500kg (for standard Class B license)." },
      { name: "Axle Weight Distribution", status: "pending", info: "Ensuring heavy items (batteries/water) are centered." },
      { name: "Weighbridge Certificate", status: "pending", info: "Recommended before final DVLA submission." }
    ]
  }
];

export default function CompliancePage() {
  const { activeBuild } = useBuild();

  return (
    <div className="p-8 lg:p-12 space-y-12 pb-32">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
         <div>
            <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.2em] mb-4 block animate-pulse">// Safety Protocol</span>
            <h1 className="font-display text-4xl lg:text-7xl uppercase tracking-tighter leading-none">Compliance <span className="text-brand-orange">Audit</span></h1>
         </div>
         <div className="flex gap-4">
            <button className="px-10 py-4 border border-brand-border text-white font-mono text-[10px] uppercase tracking-widest hover:bg-brand-carbon transition-all font-bold flex items-center gap-2">
               <Download className="w-3 h-3" />
               Download PDF Guide
            </button>
            <button className="px-10 py-4 bg-brand-orange text-white font-display text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all font-bold shadow-xl shadow-brand-orange/20">
               Request Audit Review
            </button>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         <div className="bg-brand-carbon border border-brand-border p-8">
            <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest block mb-4">DVLA Eligibility</span>
            <div className="flex items-center gap-3">
               <div className="w-3 h-3 rounded-full bg-brand-orange" />
               <span className="font-display text-lg text-white uppercase tracking-tighter">Evaluation Required</span>
            </div>
         </div>
         <div className="bg-brand-carbon border border-brand-border p-8">
            <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest block mb-4">System Safety</span>
            <div className="flex items-center gap-3">
               <div className="w-3 h-3 rounded-full bg-green-500" />
               <span className="font-display text-lg text-white uppercase tracking-tighter">Hardware Compatible</span>
            </div>
         </div>
         <div className="bg-brand-carbon border border-brand-border p-8">
            <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest block mb-4">Payload Health</span>
            <div className="flex items-center gap-3">
               <div className="w-3 h-3 rounded-full bg-brand-orange" />
               <span className="font-display text-lg text-white uppercase tracking-tighter">72kg specified</span>
            </div>
         </div>
         <div className="bg-brand-carbon border border-brand-border p-8">
            <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest block mb-4">Legal Document status</span>
            <div className="flex items-center gap-3">
               <div className="w-3 h-3 rounded-full bg-brand-border" />
               <span className="font-display text-lg text-white uppercase tracking-tighter">04 pending docs</span>
            </div>
         </div>
      </div>

      <div className="space-y-16">
         {COMPLIANCE_SECTIONS.map((section, idx) => (
           <div key={idx} className="space-y-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-brand-border pb-6 gap-6">
                 <div>
                    <h3 className="font-display text-2xl uppercase tracking-widest text-white">{section.title}</h3>
                    <p className="font-sans text-[11px] text-brand-grey uppercase tracking-widest mt-2">{section.description}</p>
                 </div>
                 <div className="flex items-center gap-4">
                    <span className="font-mono text-[8px] text-brand-grey uppercase">Completion:</span>
                    <div className="flex gap-1">
                       {section.items.map((item, i) => (
                         <div key={i} className={cn("w-6 h-1.5", item.status === 'completed' ? "bg-brand-orange" : "bg-brand-border")} />
                       ))}
                    </div>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-brand-border border border-brand-border">
                 {section.items.map((item, i) => (
                   <div key={i} className="bg-brand-carbon/30 p-8 flex gap-6 group hover:bg-brand-carbon transition-all relative overflow-hidden">
                      <div className="shrink-0 pt-1">
                         {item.status === 'completed' ? (
                           <CheckCircle2 className="w-5 h-5 text-brand-orange" />
                         ) : (
                           <div className="w-5 h-5 border border-brand-border rounded-full" />
                         )}
                      </div>
                      <div className="flex-1 space-y-2">
                         <h4 className={cn(
                           "font-display text-sm uppercase tracking-widest",
                           item.status === 'completed' ? "text-white" : "text-brand-grey"
                         )}>
                            {item.name}
                         </h4>
                         <p className="font-sans text-[10px] text-brand-grey leading-relaxed italic max-w-sm">
                            {item.info}
                         </p>
                      </div>
                      <button className="self-center p-3 text-brand-grey hover:text-white transition-all opacity-0 group-hover:opacity-100">
                         <ExternalLink className="w-4 h-4" />
                      </button>
                   </div>
                 ))}
              </div>
           </div>
         ))}
      </div>

      <div className="bg-brand-orange/5 border border-brand-orange/20 p-12 relative overflow-hidden">
         <div className="absolute top-0 right-0 p-12 opacity-5">
            <ShieldCheck className="w-64 h-64 text-brand-orange" />
         </div>
         <div className="max-w-2xl relative z-10 space-y-8">
            <h3 className="font-display text-3xl uppercase tracking-tighter text-white">UK Build <span className="text-brand-orange">Legalities</span></h3>
            <p className="font-sans text-brand-grey leading-relaxed">
               The requirements for campervan habitation in the UK are stringent. While Amplios provides the hardware and engineering specifications, final legal responsibility for build safety lies with the owner.
            </p>
            <div className="flex flex-wrap gap-4">
               <button className="px-8 py-4 bg-brand-orange text-white font-mono text-[9px] uppercase tracking-widest font-bold hover:bg-white hover:text-brand-orange transition-all shadow-xl">
                  Connect with Certified Inspector
               </button>
               <button className="px-8 py-4 border border-brand-border text-white font-mono text-[9px] uppercase tracking-widest font-bold hover:bg-brand-carbon transition-all">
                  Read UK V5C Guide
               </button>
            </div>
         </div>
      </div>
    </div>
  );
}
