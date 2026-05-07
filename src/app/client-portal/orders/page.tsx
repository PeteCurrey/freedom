"use client";

import { useBuild } from "@/hooks/useBuild";
import { 
  ShoppingBag, Package, Truck, CheckCircle2, 
  ArrowRight, Download, Search, Filter,
  ExternalLink, CreditCard, Clock
} from "lucide-react";
import { cn } from "@/lib/utils";

const MOCK_ORDERS = [
  {
    id: "AM-ORD-74829",
    date: "2026-05-10",
    total: "£1,245.00",
    status: "dispatched",
    items: [
      { name: "MultiPlus-II 12/3000/120-32", brand: "Victron Energy", price: "£1,245.00" }
    ],
    tracking: "GB748291039",
    carrier: "DPD Engineering"
  },
  {
    id: "AM-ORD-73911",
    date: "2026-04-22",
    total: "£285.00",
    status: "delivered",
    items: [
      { name: "Stage 2 Sound Deadening Pack", brand: "Amplios", price: "£285.00" }
    ],
    tracking: "GB739110028",
    carrier: "DPD Engineering"
  }
];

export default function OrdersPage() {
  const { activeBuild } = useBuild();

  return (
    <div className="p-8 lg:p-12 space-y-12 pb-32">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
         <div>
            <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.2em] mb-4 block animate-pulse">// Procurement Archive</span>
            <h1 className="font-display text-4xl lg:text-7xl uppercase tracking-tighter leading-none">Order <span className="text-brand-orange">Ledger</span></h1>
         </div>
         <div className="flex gap-4">
            <button className="px-10 py-4 border border-brand-border text-white font-mono text-[10px] uppercase tracking-widest hover:bg-brand-carbon transition-all font-bold">
               Download All Invoices
            </button>
         </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-center justify-between bg-brand-carbon border border-brand-border p-6">
         <div className="flex-1 w-full relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-grey" />
            <input 
               type="text" 
               placeholder="Filter by Order ID or Reference..." 
               className="w-full bg-brand-obsidian border border-brand-border py-3 pl-12 pr-4 text-xs font-mono text-white focus:border-brand-orange outline-none transition-all"
            />
         </div>
         <div className="flex items-center gap-4">
            <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest">Sort:</span>
            <select className="bg-brand-obsidian border border-brand-border py-3 px-6 text-[9px] font-mono text-white uppercase tracking-widest outline-none focus:border-brand-orange">
               <Recent RecentOption value="recent">Recent First</RecentOption>
               <RecentOption value="value">Highest Value</RecentOption>
            </select>
         </div>
      </div>

      <div className="space-y-8">
         {MOCK_ORDERS.map((order) => (
           <div key={order.id} className="bg-brand-carbon border border-brand-border overflow-hidden">
              <div className="bg-brand-obsidian p-8 border-b border-brand-border flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                 <div className="flex items-center gap-8">
                    <div className="space-y-1">
                       <span className="font-mono text-[8px] text-brand-grey uppercase">Order Reference</span>
                       <span className="font-mono text-[10px] text-white block uppercase font-bold">{order.id}</span>
                    </div>
                    <div className="space-y-1">
                       <span className="font-mono text-[8px] text-brand-grey uppercase">Placement Date</span>
                       <span className="font-mono text-[10px] text-white block uppercase">{order.date}</span>
                    </div>
                    <div className="space-y-1">
                       <span className="font-mono text-[8px] text-brand-grey uppercase">Fulfillment Status</span>
                       <div className="flex items-center gap-2">
                          <div className={cn(
                            "w-1.5 h-1.5 rounded-full",
                            order.status === 'delivered' ? "bg-green-500" : "bg-brand-orange animate-pulse"
                          )} />
                          <span className="font-mono text-[9px] text-white uppercase tracking-widest">{order.status}</span>
                       </div>
                    </div>
                 </div>
                 <div className="text-right">
                    <span className="font-mono text-[8px] text-brand-grey uppercase block mb-1">Order Value</span>
                    <span className="font-display text-2xl text-white">{order.total}</span>
                 </div>
              </div>

              <div className="p-8">
                 <div className="space-y-6">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex justify-between items-center bg-brand-obsidian/40 border border-brand-border p-6 group hover:bg-brand-obsidian transition-all">
                         <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-brand-carbon border border-brand-border flex items-center justify-center">
                               <Package className="w-6 h-6 text-brand-grey/20" />
                            </div>
                            <div className="space-y-1">
                               <span className="font-mono text-[9px] text-brand-orange uppercase tracking-widest font-bold">{item.brand}</span>
                               <h4 className="font-display text-lg uppercase tracking-tight text-white">{item.name}</h4>
                            </div>
                         </div>
                         <div className="flex items-center gap-12">
                            <div className="text-right hidden md:block">
                               <span className="font-mono text-[8px] text-brand-grey uppercase block">Unit Price</span>
                               <span className="font-mono text-[10px] text-white">{item.price}</span>
                            </div>
                            <button className="p-3 text-brand-grey hover:text-white transition-all">
                               <ExternalLink className="w-4 h-4" />
                            </button>
                         </div>
                      </div>
                    ))}
                 </div>

                 <div className="mt-8 pt-8 border-t border-brand-border/40 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-8">
                       <div className="flex items-center gap-4">
                          <Truck className="w-5 h-5 text-brand-orange" />
                          <div className="space-y-0.5">
                             <span className="font-mono text-[8px] text-brand-grey uppercase">Tracking ({order.carrier})</span>
                             <span className="font-mono text-[10px] text-white uppercase tracking-widest hover:text-brand-orange cursor-pointer transition-colors">{order.tracking}</span>
                          </div>
                       </div>
                    </div>
                    <div className="flex gap-4">
                       <button className="px-8 py-3 border border-brand-border text-brand-grey font-mono text-[9px] uppercase tracking-widest hover:text-white transition-all font-bold flex items-center gap-2">
                          <Download className="w-3 h-3" />
                          Invoice .PDF
                       </button>
                       <button className="px-8 py-3 bg-brand-white text-brand-obsidian font-mono text-[9px] uppercase tracking-widest hover:bg-brand-orange hover:text-white transition-all font-bold">
                          Order Support
                       </button>
                    </div>
                 </div>
              </div>
           </div>
         ))}
      </div>

      <div className="p-12 border border-brand-border border-dashed text-center max-w-2xl mx-auto">
         <ShoppingBag className="w-10 h-10 text-brand-grey/20 mx-auto mb-6" />
         <h4 className="font-display text-xl uppercase tracking-tighter mb-4">Hardware Procurement History</h4>
         <p className="font-sans text-brand-grey text-sm mb-8">
            This area tracks all internal Amplios transactions. For external affiliate purchases (Amazon, eBay, etc.), please refer to your respective account ledgers.
         </p>
         <div className="flex justify-center gap-8">
            <div className="flex items-center gap-3">
               <Clock className="w-4 h-4 text-brand-orange" />
               <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest">Real-time status tracking</span>
            </div>
            <div className="flex items-center gap-3">
               <CreditCard className="w-4 h-4 text-brand-orange" />
               <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest">VAT Compliant Invoicing</span>
            </div>
         </div>
      </div>
    </div>
  );
}

function RecentOption({ value, children }: { value: string, children: React.ReactNode }) {
  return <option value={value} className="bg-brand-obsidian text-white">{children}</option>;
}
