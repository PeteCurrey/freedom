"use client";

import { useBuild } from "@/hooks/useBuild";
import { 
  FileText, Clock, CheckCircle2, XCircle, 
  ArrowRight, Download, MessageSquare, Info,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

const MOCK_QUOTES = [
  {
    id: "QU-0482-A",
    type: "Full Electrical Specification",
    date: "2026-05-12",
    value: "£3,450.00",
    status: "quoted",
    notes: "Engineering review completed. Stock verified for MultiPlus-II and Roamer 460. Applied 5% project bundle discount."
  },
  {
    id: "QU-0391-B",
    type: "Heating & Ventilation Install",
    date: "2026-04-28",
    value: "£850.00",
    status: "accepted",
    notes: "Accepted and scheduled for Stage 6 build phase."
  },
  {
    id: "QU-0275-C",
    type: "Water System Audit",
    date: "2026-04-15",
    value: "£420.00",
    status: "expired",
    notes: "Quote expired due to price adjustment in plumbing hardware."
  }
];

export default function QuotesPage() {
  const { activeBuild } = useBuild();

  return (
    <div className="p-8 lg:p-12 space-y-12 pb-32">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
         <div>
            <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.2em] mb-4 block animate-pulse">// Engineering Desk</span>
            <h1 className="font-display text-4xl lg:text-7xl uppercase tracking-tighter leading-none">Quote <span className="text-brand-orange">History</span></h1>
         </div>
         <button className="px-10 py-4 bg-brand-orange text-white font-display text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all font-bold">
            Request New Quote
         </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-6">
            {MOCK_QUOTES.map((quote) => (
              <div key={quote.id} className="bg-brand-carbon border border-brand-border p-8 hover:bg-brand-carbon/60 transition-all group">
                 <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
                    <div className="space-y-1">
                       <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest">Quote ID: {quote.id}</span>
                       <h3 className="font-display text-2xl uppercase tracking-tight text-white">{quote.type}</h3>
                    </div>
                    <div className={cn(
                      "px-4 py-2 font-mono text-[9px] uppercase tracking-widest font-bold border",
                      quote.status === 'quoted' ? "bg-brand-orange/10 border-brand-orange text-brand-orange" :
                      quote.status === 'accepted' ? "bg-green-500/10 border-green-500 text-green-500" :
                      "bg-brand-border border-brand-border text-brand-grey"
                    )}>
                       {quote.status}
                    </div>
                 </div>

                 <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-brand-border/40">
                    <div className="space-y-1">
                       <span className="font-mono text-[8px] text-brand-grey uppercase">Date Issued</span>
                       <span className="font-mono text-[10px] text-white block uppercase">{quote.date}</span>
                    </div>
                    <div className="space-y-1">
                       <span className="font-mono text-[8px] text-brand-grey uppercase">Valid Until</span>
                       <span className="font-mono text-[10px] text-white block uppercase">2026-06-12</span>
                    </div>
                    <div className="space-y-1">
                       <span className="font-mono text-[8px] text-brand-grey uppercase">Calculated Value</span>
                       <span className="font-display text-xl text-brand-orange block leading-none">{quote.value}</span>
                    </div>
                    <div className="space-y-1 text-right">
                       <button className="text-brand-grey hover:text-white transition-colors">
                          <Download className="w-5 h-5 ml-auto" />
                       </button>
                    </div>
                 </div>

                 <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-start gap-3 bg-brand-obsidian/40 p-4 border border-brand-border flex-1">
                       <MessageSquare className="w-4 h-4 text-brand-orange shrink-0 mt-1" />
                       <p className="font-sans text-[11px] text-brand-grey leading-relaxed italic">
                          "{quote.notes}"
                       </p>
                    </div>
                    <div className="flex gap-4 shrink-0">
                       {quote.status === 'quoted' && (
                         <>
                            <button className="px-6 py-3 border border-brand-border text-brand-grey font-mono text-[9px] uppercase tracking-widest hover:text-white transition-all font-bold">
                               Decline
                            </button>
                            <button className="px-8 py-3 bg-brand-white text-brand-obsidian font-mono text-[9px] uppercase tracking-widest hover:bg-brand-orange hover:text-white transition-all font-bold flex items-center gap-2">
                               Accept & Buy <ArrowRight className="w-3 h-3" />
                            </button>
                         </>
                       )}
                       {quote.status === 'accepted' && (
                         <button className="px-8 py-3 border border-brand-border text-white font-mono text-[9px] uppercase tracking-widest font-bold flex items-center gap-2">
                            <CheckCircle2 className="w-3 h-3 text-brand-orange" />
                            Order Confirmed
                         </button>
                       )}
                    </div>
                 </div>
              </div>
            ))}
         </div>

         <div className="space-y-8">
            <div className="bg-brand-orange/5 border border-brand-orange/20 p-10 space-y-6 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-5">
                  <AlertCircle className="w-24 h-24 text-brand-orange" />
               </div>
               <h4 className="font-display text-xl uppercase tracking-tight text-white">Why request a <span className="text-brand-orange">Quote?</span></h4>
               <ul className="space-y-4">
                  {[
                    "Bulk project discounts on stage bundles",
                    "Engineering compatibility sign-off",
                    "Lead-time verification for scarce parts",
                    "Custom schematic adjustments",
                    "Installer referrals in your region"
                  ].map((text, i) => (
                    <li key={i} className="flex gap-4 items-start">
                       <div className="w-1.5 h-1.5 rounded-full bg-brand-orange mt-1.5 shrink-0" />
                       <span className="font-sans text-xs text-brand-grey leading-relaxed">{text}</span>
                    </li>
                  ))}
               </ul>
            </div>

            <div className="p-10 border border-brand-border space-y-6">
               <h4 className="font-display text-lg uppercase tracking-tight">Need a custom <span className="text-brand-orange">System?</span></h4>
               <p className="font-sans text-xs text-brand-grey leading-relaxed">
                  If your build requires specialized equipment not listed in our standard technical registry, our team can source and specify custom solutions.
               </p>
               <button className="w-full py-4 border border-brand-border text-white font-mono text-[10px] uppercase tracking-widest hover:bg-brand-carbon transition-all font-bold">
                  Contact Engineering Desk
               </button>
            </div>
         </div>
      </div>
    </div>
  );
}
