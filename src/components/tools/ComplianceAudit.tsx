"use client";

import { useState, useMemo } from "react";
import { 
  ClipboardCheck, 
  CheckCircle2, 
  Circle, 
  AlertCircle, 
  ChevronDown, 
  ChevronUp,
  FileText,
  ShieldAlert,
  Terminal,
  Info
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AuditItem {
  id: string;
  label: string;
  description: string;
  standard: string;
  critical: boolean;
}

interface AuditSection {
  id: string;
  title: string;
  icon: any;
  items: AuditItem[];
}

const AUDIT_DATA: AuditSection[] = [
  {
    id: "structural",
    title: "Structural Compliance (DVLA)",
    icon: FileText,
    items: [
      { id: "s1", label: "Fixed Bed (Minimum 180cm)", description: "The bed must be fixed or part of a convertible assembly that is secure to the floor.", standard: "DVLA V5C Registry", critical: true },
      { id: "s2", label: "Fixed Table (Removable OK)", description: "Table must be fixed or have a dedicated mount and be accessible when bed is away.", standard: "DVLA V5C Registry", critical: true },
      { id: "s3", label: "Windows on Both Sides", description: "At least one window on each longitudinal side of the habitation area.", standard: "DVLA V5C Registry", critical: true },
      { id: "s4", label: "Internal Storage Hubs", description: "Fixed cupboards or lockers for general storage of clothing and gear.", standard: "DVLA V5C Registry", critical: false },
    ]
  },
  {
    id: "gas",
    title: "Gas Safety (BS EN 1949)",
    icon: ShieldAlert,
    items: [
      { id: "g1", label: "Sealed Gas Locker", description: "Locker must be gas-tight to the habitation area and accessible from inside/outside.", standard: "BS EN 1949", critical: true },
      { id: "g2", label: "Floor Level Drop Holes", description: "Locker must have a minimum 50mm diameter floor vent (drop hole) for LPG drainage.", standard: "BS EN 1949", critical: true },
      { id: "g3", label: "Copper Pipelaying & Glands", description: "Gas lines must be rigid copper or stainless steel, with proper bulkhead glands.", standard: "BS EN 1949", critical: true },
    ]
  },
  {
    id: "electrical",
    title: "Electrical Integrity (BS EN 1648)",
    icon: Terminal,
    items: [
      { id: "e1", label: "Fused Circuit Protection", description: "Every positive leg of a 12V circuit MUST have a fuse sized to the cable gauge.", standard: "BS EN 1648-2", critical: true },
      { id: "e2", label: "Chassis Earth Bonding", description: "Negative busbars must be bonded to the vehicle chassis with a suitable gauge cable.", standard: "BS EN 1648-2", critical: true },
      { id: "e3", label: "Battery Mechanical Fixings", description: "Batteries must be held in position by mechanical straps or clamps (no Velcro).", standard: "BS EN 1648-2", critical: true },
    ]
  }
];

export default function ComplianceAudit() {
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set());
  const [expandedSection, setExpandedSection] = useState<string | null>("structural");

  const toggleCheck = (id: string) => {
    const newChecked = new Set(checkedIds);
    if (newChecked.has(id)) {
      newChecked.delete(id);
    } else {
      newChecked.add(id);
    }
    setCheckedIds(newChecked);
  };

  const sectionProgress = useMemo(() => {
    return AUDIT_DATA.reduce((acc, section) => {
      const checkedInSection = section.items.filter(i => checkedIds.has(i.id)).length;
      acc[section.id] = (checkedInSection / section.items.length) * 100;
      return acc;
    }, {} as Record<string, number>);
  }, [checkedIds]);

  const totalCriticalFail = useMemo(() => {
    const allCritical = AUDIT_DATA.flatMap(s => s.items).filter(i => i.critical);
    return allCritical.some(i => !checkedIds.has(i.id));
  }, [checkedIds]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      {/* Checklist Hub */}
      <div className="lg:col-span-12 xl:col-span-8 space-y-6">
        {AUDIT_DATA.map((section) => {
          const Icon = section.icon;
          const isExpanded = expandedSection === section.id;
          
          return (
            <div key={section.id} className={cn(
              "blueprint-border transition-all duration-500",
              isExpanded ? "bg-brand-carbon/50 pt-8" : "bg-brand-carbon/20"
            )}>
              <button 
                onClick={() => setExpandedSection(isExpanded ? null : section.id)}
                className="w-full px-8 pb-8 flex items-center justify-between group"
              >
                <div className="flex items-center gap-6">
                  <div className={cn(
                    "w-12 h-12 blueprint-border flex items-center justify-center transition-all",
                    sectionProgress[section.id] === 100 ? "bg-brand-orange text-white" : "text-brand-orange group-hover:bg-brand-orange/10"
                  )}>
                    <Icon size={20} />
                  </div>
                  <div className="text-left">
                     <h2 className="font-display text-2xl uppercase tracking-widest">{section.title}</h2>
                     <div className="flex items-center gap-4 mt-2">
                        <div className="h-1 bg-brand-border w-32">
                           <div 
                             className="h-full bg-brand-orange transition-all duration-1000" 
                             style={{ width: `${sectionProgress[section.id]}%` }}
                           />
                        </div>
                        <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest">{Math.round(sectionProgress[section.id])}% Verified</span>
                     </div>
                  </div>
                </div>
                {isExpanded ? <ChevronUp className="text-brand-grey" /> : <ChevronDown className="text-brand-grey" />}
              </button>

              {isExpanded && (
                <div className="px-8 pb-8 space-y-4 animate-in fade-in slide-in-from-top-4">
                  {section.items.map((item) => (
                    <div 
                      key={item.id}
                      onClick={() => toggleCheck(item.id)}
                      className={cn(
                        "p-6 flex items-start gap-6 cursor-pointer border transition-all group",
                        checkedIds.has(item.id) 
                          ? "bg-brand-orange/5 border-brand-orange/30" 
                          : "bg-brand-obsidian border-brand-border hover:border-brand-grey"
                      )}
                    >
                      <div className="mt-1">
                        {checkedIds.has(item.id) ? (
                          <CheckCircle2 className="text-brand-orange w-5 h-5" />
                        ) : (
                          <Circle className="text-brand-grey group-hover:text-brand-orange transition-colors w-5 h-5" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-display text-sm uppercase tracking-widest">{item.label}</h3>
                          <span className={cn(
                            "font-mono text-[8px] px-2 py-0.5 border uppercase tracking-widest",
                            item.critical ? "border-red-500/50 text-red-500 bg-red-500/5" : "border-brand-grey/50 text-brand-grey"
                          )}>
                            {item.critical ? "Critical Failure Node" : "Technical Recommendation"}
                          </span>
                        </div>
                        <p className="font-sans text-xs text-brand-grey leading-relaxed mb-4">
                          {item.description}
                        </p>
                        <div className="flex items-center gap-2">
                           <span className="font-mono text-[8px] text-brand-orange uppercase tracking-widest italic opacity-60">Standard: {item.standard}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Audit Result Telemetry */}
      <div className="lg:col-span-12 xl:col-span-4">
         <div className="sticky top-48 blueprint-border p-10 bg-brand-carbon flex flex-col items-center">
            <div className="flex items-center gap-3 mb-12 italic">
               <ClipboardCheck className="text-brand-orange w-4 h-4" />
               <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[.4em]">// Overall Audit Telemetry</span>
            </div>

            <div className="relative w-48 h-48 flex items-center justify-center mb-12">
               {/* Progress Ring */}
               <svg className="w-full h-full -rotate-90">
                  <circle cx="50%" cy="50%" r="40%" className="fill-none stroke-[8] stroke-brand-border" />
                  <circle 
                    cx="50%" cy="50%" r="40%" 
                    strokeDasharray="251" 
                    strokeDashoffset={251 - (251 * checkedIds.size) / AUDIT_DATA.flatMap(s => s.items).length}
                    className="fill-none stroke-[8] stroke-brand-orange transition-all duration-1000" 
                  />
               </svg>
               <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="font-display text-6xl text-white">{Math.round((checkedIds.size / AUDIT_DATA.flatMap(s => s.items).length) * 100)}%</span>
                  <span className="font-mono text-[8px] text-brand-grey uppercase tracking-widest">Global Integrity</span>
               </div>
            </div>

            <div className="w-full space-y-6 mb-12">
               <div className="flex justify-between items-center bg-brand-obsidian p-4 border border-brand-border">
                  <span className="font-mono text-[10px] text-brand-grey uppercase">Verified Items</span>
                  <span className="font-display text-xl text-white">{checkedIds.size} / {AUDIT_DATA.flatMap(s => s.items).length}</span>
               </div>
               
               {totalCriticalFail ? (
                 <div className="p-6 bg-red-500/10 border border-red-500/30 flex gap-4">
                   <AlertCircle className="text-red-500 shrink-0" />
                   <div>
                     <span className="font-display text-xs text-red-500 uppercase block mb-1">Audit Failed</span>
                     <p className="font-mono text-[9px] text-red-500 leading-relaxed uppercase opacity-80">
                       Incomplete critical safety nodes detected. Vehicle does not currently satisfy mandatory reclassification standards.
                     </p>
                   </div>
                 </div>
               ) : (
                 <div className="p-6 bg-green-500/10 border border-green-500/30 flex gap-4">
                   <CheckCircle2 className="text-green-500 shrink-0" />
                   <div>
                     <span className="font-display text-xs text-green-500 uppercase block mb-1">Safety Compliant</span>
                     <p className="font-mono text-[9px] text-green-500 leading-relaxed uppercase opacity-80">
                       All critical engineering nodes verified. Vehicle satisfies primary reclassification and safety guidelines.
                     </p>
                   </div>
                 </div>
               )}
            </div>

            <div className="p-8 border-l-4 border-brand-orange bg-brand-obsidian/50 space-y-4 w-full">
               <div className="flex items-center gap-3">
                  <Info className="text-brand-orange w-4 h-4" />
                  <h4 className="font-display text-xs uppercase italic tracking-widest text-white text-left leading-tight">Next Action Hub</h4>
               </div>
               <p className="font-sans text-xs text-brand-grey leading-relaxed">
                  Upon completion, export your compliance ledger to support your insurance application or DVLA reclassification evidence bundle.
               </p>
            </div>
         </div>
      </div>
    </div>
  );
}
