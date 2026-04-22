"use client";

import { useState, useMemo, useEffect } from "react";
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
  Info,
  Save,
  Download,
  Loader2,
  Lock
} from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { ComplianceReport } from "./ComplianceReport";

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
    title: "Structural Compliance (DVLA/V5C)",
    icon: FileText,
    items: [
      { id: "s1", label: "Fixed Bed Integration (1.8m Min)", description: "The bed must be a permanent part of the build (either direct fix or convertible from seating) and measure at least 180cm in length.", standard: "DVLA Motorcaravan Registry", critical: true },
      { id: "s2", label: "Permanently Fixed Seating", description: "All seating for habitation must be secured to the vehicle structure (bolted through floor with spreader plates where possible).", standard: "DVLA Motorcaravan Registry", critical: true },
      { id: "s3", label: "Dual-Side Fenestration", description: "At least two windows on one side of the main body (excluding cab doors) to provide natural daylight to the living area.", standard: "DVLA V1006 Criteria", critical: false },
      { id: "s4", label: "Integrated Storage Hubs", description: "Wardrobes, cupboards, or lockers must be permanently secured to the vehicle walls/floor and usable for general storage.", standard: "DVLA Motorcaravan Registry", critical: true },
      { id: "s5", label: "Fixed Table Attachment", description: "A dining table must be present with a permanent mounting system (floor socket or wall rail) even if the tabletop is removable.", standard: "DVLA V1006 Criteria", critical: true },
      { id: "s6", label: "Motorcaravan Graphics", description: "Exterior decals/graphics on both sides and rear identifying the vehicle as a motorcaravan for traffic recognition.", standard: "DVLA External Appearance", critical: false },
    ]
  },
  {
    id: "gas",
    title: "LPG Gas Safety (BS EN 1949)",
    icon: ShieldAlert,
    items: [
      { id: "g1", label: "Gas-Tight Sealed Locker", description: "Containment locker must be sealed from the habitation area with a gas-tight seal on the access door.", standard: "BS EN 1949:2021", critical: true },
      { id: "g2", label: "50mm Floor Drop-Vent", description: "Locker must have a minimum 50mm diameter floor vent for the drainage of heavier-than-air LPG.", standard: "BS EN 1949:2021", critical: true },
      { id: "g3", label: "Rigid Copper Pipelaying", description: "The gas distribution system must utilize rigid copper or stainless steel pipe with proper mechanical support.", standard: "BS EN 1949:10.5.1", critical: true },
      { id: "g4", label: "Dedicated Manifold Isolation", description: "Each gas appliance must have its own dedicated isolation valve, clearly labelled and accessible.", standard: "BS EN 1949:2021", critical: true },
      { id: "g5", label: "Impact-Sensing Regulator", description: "If gas is to be used while in motion (e.g. heating), a crash-sensing regulator (Truma MonoControl/DuoControl) is mandatory.", standard: "BS EN 1949:6.4", critical: false },
      { id: "g6", label: "Flue Exhaust Clearance", description: "All appliance flues must exit the vehicle body and be clear of windows, doors, or air intakes.", standard: "BS EN 1949:2021", critical: true },
    ]
  },
  {
    id: "electrical_dc",
    title: "12V DC Integrity (BS EN 1648)",
    icon: Zap,
    items: [
      { id: "ed1", label: "Individual Circuit Fusing", description: "Every positive line must be protected by a fuse/breaker sized to the cable's current carrying capacity.", standard: "BS EN 1648-2:2018", critical: true },
      { id: "ed2", label: "Common Ground Chassis Bonding", description: "The DC negative busbar must be bonded to the vehicle chassis with a suitable gauge (minimum 10mm² recommended).", standard: "BS EN 1648-2:5.2", critical: true },
      { id: "ed3", label: "Mechanical Battery Fixings", description: "Service batteries must be secured with mechanical clamps or heavy-duty straps (ratchet or steel-buckle).", standard: "BS EN 1648-2:2018", critical: true },
      { id: "ed4", label: "Vibration Protection (Glands)", description: "Cables passing through metal bulkheads must use rubber grommets or nylon cable glands to prevent insulation chaffing.", standard: "BS EN 1648-2:6.1", critical: true },
      { id: "ed5", label: "Battery Isolation Switch", description: "A high-current master isolation switch must be present near the battery bank for emergency disconnect.", standard: "BS EN 1648-2:2018", critical: true },
    ]
  },
  {
    id: "electrical_ac",
    title: "230V AC Mains (IET Section 721)",
    icon: Terminal,
    items: [
      { id: "ea1", label: "Dual-Pole RCD Protection", description: "Incoming mains must hit a 25A/30mA RCD and double-pole MCBs to protect against reverse polarity.", standard: "IET BS 7671:Section 721", critical: true },
      { id: "ea2", label: "Mains Earth Chassis Bond", description: "The mains earth must be bonded to the vehicle chassis (separate from DC ground bond).", standard: "IET BS 7671:721.411.3.1", critical: true },
      { id: "ea3", label: "Flex-Core Articulated Cable", description: "Wiring must be multi-strand 'flex' cable (not single-core household twin & earth) to handle vehicle vibration.", standard: "IET BS 7671:Section 721", critical: true },
      { id: "ea4", label: "IP44 External Inlet", description: "Mains hookup must use a CE/UKCA marked IP44 rated blue 3-pin coupler.", standard: "EN 60309-2", critical: true },
    ]
  },
  {
    id: "hvac",
    title: "Ventilation (BS EN 721)",
    icon: Activity,
    items: [
      { id: "v1", label: "Permanent High-Level Venting", description: "Adequate passive high-level ventilation (e.g. roof vent) that cannot be fully closed.", standard: "BS EN 721:2019", critical: true },
      { id: "v2", label: "Passive Low-Level Air Intake", description: "Low-level drop vents near floor level to provide fresh air and prevent CO/LPG pooling.", standard: "BS EN 721:2019", critical: true },
      { id: "v3", label: "Carbon Monoxide (CO) Monitoring", description: "Installation of a certified CO alarm within the habitation area.", standard: "BS EN 50291-1", critical: true },
      { id: "v4", label: "LPG Leak Sensing Hub", description: "Installation of a floor-level LPG sensor near gas-utilising appliances.", standard: "Safety Recommendation", critical: false },
    ]
  }
];

export default function ComplianceAudit() {
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set());
  const [expandedSection, setExpandedSection] = useState<string | null>("structural");
  const [projectName, setProjectName] = useState("My Base Build");
  const [isSaving, setIsSaving] = useState(false);
  const [authStatus, setAuthStatus] = useState<'loading' | 'unauthenticated' | 'authenticated'>('loading');

  useEffect(() => {
    async function loadAudit() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setAuthStatus('unauthenticated');
        return;
      }
      setAuthStatus('authenticated');

      const { data } = await supabase
        .from('compliance_audits')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false })
        .limit(1)
        .single();

      if (data) {
        setProjectName(data.project_name);
        setCheckedIds(new Set(data.responses as string[]));
      }
    }
    loadAudit();
  }, []);

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

  const totalPossibleItems = useMemo(() => AUDIT_DATA.flatMap(s => s.items).length, []);
  
  const auditStats = useMemo(() => {
    const allItems = AUDIT_DATA.flatMap(s => s.items);
    const checkedCount = checkedIds.size;
    const score = Math.round((checkedCount / allItems.length) * 100);
    const allCritical = allItems.filter(i => i.critical);
    const criticalFail = allCritical.some(i => !checkedIds.has(i.id));
    
    return { score, criticalFail, isCompliant: !criticalFail && score > 80 };
  }, [checkedIds]);

  const handleSave = async () => {
    setIsSaving(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      alert("Please login to save your audit progress.");
      setIsSaving(false);
      return;
    }

    const { error } = await supabase.from('compliance_audits').upsert({
      user_id: user.id,
      project_name: projectName,
      responses: Array.from(checkedIds),
      audit_score: auditStats.score,
      is_compliant: auditStats.isCompliant,
    }, { onConflict: 'user_id, project_name' });

    if (error) {
      console.error("Save Error:", error);
      alert("Failed to save audit registry.");
    }
    setIsSaving(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      {/* Checklist Hub */}
      <div className="lg:col-span-12 xl:col-span-8 space-y-6">
        {/* Project Meta Input */}
        <div className="blueprint-border p-8 bg-brand-carbon flex flex-col md:flex-row items-center gap-6 mb-12">
           <div className="flex-1">
              <label className="font-mono text-[8px] text-brand-grey uppercase tracking-widest block mb-2">Build Identifier</label>
              <input 
                type="text" 
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="bg-transparent border-none font-display text-2xl uppercase tracking-tighter text-white focus:ring-0 w-full"
                placeholder="PRO-204 EXPEDITION"
              />
           </div>
           
           <div className="flex gap-4 w-full md:w-auto">
              {authStatus === 'authenticated' ? (
                <button 
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex-1 md:flex-initial flex items-center justify-center gap-3 bg-brand-orange text-white px-8 py-4 font-display text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all disabled:opacity-50"
                >
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Save Integrity
                </button>
              ) : (
                <div className="flex-1 md:flex-initial flex items-center justify-center gap-3 bg-brand-border/30 text-brand-grey px-8 py-4 font-display text-[10px] uppercase tracking-widest cursor-not-allowed">
                  <Lock className="w-4 h-4" />
                  Auth Required
                </div>
              )}
           </div>
        </div>

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
                    strokeDashoffset={251 - (251 * checkedIds.size) / totalPossibleItems}
                    className="fill-none stroke-[8] stroke-brand-orange transition-all duration-1000" 
                  />
               </svg>
               <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="font-display text-6xl text-white">{auditStats.score}%</span>
                  <span className="font-mono text-[8px] text-brand-grey uppercase tracking-widest">Global Integrity</span>
               </div>
            </div>

            <div className="w-full space-y-6 mb-12">
               <div className="flex justify-between items-center bg-brand-obsidian p-4 border border-brand-border">
                  <span className="font-mono text-[10px] text-brand-grey uppercase">Verified Items</span>
                  <span className="font-display text-xl text-white">{checkedIds.size} / {totalPossibleItems}</span>
               </div>
               
               {auditStats.criticalFail ? (
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

            <div className="w-full space-y-6">
               <PDFDownloadLink
                 document={
                   <ComplianceReport 
                     projectName={projectName}
                     auditItems={AUDIT_DATA}
                     checkedIds={checkedIds}
                     score={auditStats.score}
                     isCompliant={auditStats.isCompliant}
                   />
                 }
                 fileName={`Freedom_Compliance_${projectName.replace(/\s+/g, '_')}.pdf`}
                 className={cn(
                   "w-full flex items-center justify-center gap-4 py-6 font-display text-xs uppercase tracking-widest transition-all",
                   "bg-white text-brand-obsidian hover:bg-brand-orange hover:text-white"
                 )}
               >
                 {/* @ts-ignore */}
                 {({ loading }) => (
                   <>
                     {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                     Download Technical Manifest
                   </>
                 )}
               </PDFDownloadLink>

               <div className="p-8 border-l-4 border-brand-orange bg-brand-obsidian/50 space-y-4 w-full">
                  <div className="flex items-center gap-3">
                     <Info className="text-brand-orange w-4 h-4" />
                     <h4 className="font-display text-xs uppercase italic tracking-widest text-white text-left leading-tight">Registry Node</h4>
                  </div>
                  <p className="font-sans text-[10px] text-brand-grey leading-relaxed">
                    Export your compliance ledger to support your insurance application or DVLA reclassification evidence bundle. Verified snapshots are stored in your Laboratory profile.
                  </p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
