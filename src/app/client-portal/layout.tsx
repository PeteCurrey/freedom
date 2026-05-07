"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useBuild } from "@/hooks/useBuild";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, ShoppingBag, Package, FileText, 
  Settings, ClipboardCheck, ArrowLeft, Zap, ShieldCheck
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarLinks = [
  { name: "Control Centre", href: "/client-portal", icon: LayoutDashboard },
  { name: "Build Specification", href: "/client-portal/basket", icon: Package },
  { name: "Quote History", href: "/client-portal/quotes", icon: FileText },
  { name: "My Orders", href: "/client-portal/orders", icon: ShoppingBag },
  { name: "Compliance Check", href: "/client-portal/compliance", icon: ShieldCheck },
  { name: "Portal Settings", href: "/client-portal/settings", icon: Settings },
];

export default function ClientPortalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { activeBuild } = useBuild();

  return (
    <div className="bg-brand-obsidian min-h-screen text-white flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex pt-24">
        {/* Sidebar */}
        <aside className="w-72 border-r border-brand-border hidden lg:flex flex-col bg-brand-obsidian sticky top-24 h-[calc(100vh-6rem)]">
          <div className="p-8 border-b border-brand-border">
            <div className="flex items-center gap-3 mb-2">
               <div className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
               <span className="font-mono text-[10px] text-brand-orange uppercase tracking-widest font-bold">System Status: Active</span>
            </div>
            <h2 className="font-display text-lg uppercase tracking-tight">Build Commander</h2>
            <p className="font-sans text-[10px] text-brand-grey uppercase tracking-widest mt-1">ID: AM-CL-04829</p>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            {sidebarLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-4 px-6 py-4 transition-all group relative overflow-hidden",
                    isActive 
                      ? "bg-brand-orange/10 text-brand-orange border border-brand-orange/20" 
                      : "text-brand-grey hover:text-white hover:bg-brand-carbon/40"
                  )}
                >
                  {isActive && <div className="absolute left-0 top-0 w-1 h-full bg-brand-orange" />}
                  <Icon className={cn("w-4 h-4", isActive ? "text-brand-orange" : "group-hover:text-brand-orange transition-colors")} />
                  <span className="font-mono text-[10px] uppercase tracking-widest font-bold">{link.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="p-8 border-t border-brand-border bg-brand-carbon/20">
             <div className="space-y-4">
                <div className="flex justify-between items-center">
                   <span className="font-mono text-[8px] text-brand-grey uppercase">Build Progress</span>
                   <span className="font-mono text-[8px] text-brand-orange uppercase font-bold">{activeBuild?.progressPercentage || 0}%</span>
                </div>
                <div className="w-full h-1 bg-brand-border rounded-full overflow-hidden">
                   <div 
                     className="h-full bg-brand-orange transition-all duration-1000" 
                     style={{ width: `${activeBuild?.progressPercentage || 0}%` }}
                   />
                </div>
                <p className="font-sans text-[10px] text-brand-grey leading-tight italic">
                   "Next phase: {activeBuild?.currentStage.split(':')[1] || 'Planning'}"
                </p>
             </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-[#080808] relative">
           <div className="absolute inset-0 blueprint-grid opacity-5 pointer-events-none" />
           <div className="relative z-10">
              {children}
           </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
