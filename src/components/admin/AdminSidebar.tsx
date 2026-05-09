"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  Users,
  LayoutDashboard,
  BarChart3,
  Package,
  Layers,
  Tag,
  Truck,
  Box,
  Upload,
  Database,
  Receipt,
  User,
  Magnet,
  Percent,
  FileText,
  Car,
  Wrench,
  Folder,
  Map,
  Search,
  Mail,
  Sparkles,
  Share2,
  Settings,
  Bell,
  Monitor,
  Layout,
  ShoppingBag,
  Link2,
  MousePointerClick,
  Shield,
  ShieldCheck,
  Zap,
  Download
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

const navGroups = [
  {
    label: null,
    items: [
      { name: "Command Centre", href: "/admin", icon: LayoutDashboard },
      { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    ]
  },
  {
    label: "CATALOGUE",
    items: [
      { name: "Products", href: "/admin/products", icon: Package },
      { name: "Build Kits", href: "/admin/kits", icon: Box },
      { name: "Categories", href: "/admin/categories", icon: Layers },
      { name: "Brands", href: "/admin/brands", icon: Tag },
      { name: "Suppliers", href: "/admin/suppliers", icon: Truck },
      { name: "Bulk Import", href: "/admin/products/import", icon: Upload },
      { name: "Inventory", href: "/admin/inventory", icon: Receipt },
    ]
  },
  {
    label: "AFFILIATE",
    items: [
      { name: "Affiliate Products", href: "/admin/affiliate/products", icon: Link2 },
      { name: "Market Links", href: "/admin/affiliate/market-links", icon: Share2 },
      { name: "Affiliate Clicks", href: "/admin/affiliate/clicks", icon: MousePointerClick },
    ]
  },
  {
    label: "COMMERCE",
    items: [
      { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
      { name: "Customers", href: "/admin/customers", icon: Users },
      { name: "Discounts", href: "/admin/discounts", icon: Percent },
    ]
  },
  {
    label: "REVENUE",
    items: [
      { name: "Build Plans", href: "/admin/build-plans", icon: Layout },
      { name: "Quote Requests", href: "/admin/quotes", icon: Magnet },
      { name: "PDF Orders", href: "/admin/pdf-orders", icon: FileText },
      { name: "Diagram Downloads", href: "/admin/diagram-downloads", icon: Download },
    ]
  },
  {
    label: "MARKETING",
    items: [
      { name: "Automations", href: "/admin/marketing/automations", icon: Zap },
      { name: "Channels", href: "/admin/channels", icon: Monitor },
      { name: "SEO Commander", href: "/admin/seo", icon: Search },
      { name: "Newsletter", href: "/admin/newsletter", icon: Mail },
      { name: "AI Studio", href: "/admin/ai-studio", icon: Sparkles },
    ]
  },
  {
    label: "SERVICE",
    items: [
      { name: "Customer Support", href: "/admin/support", icon: ShieldCheck },
    ]
  },
  {
    label: "SYSTEM",
    items: [
      { name: "Settings", href: "/admin/settings", icon: Settings },
      { name: "Integration Vault", href: "/admin/integrations", icon: Shield },
      { name: "Team", href: "/admin/team", icon: Users },
    ]
  },
];

interface AdminSidebarProps {
  isLightMode: boolean;
  onToggleTheme: () => void;
}

export function AdminSidebar({ isLightMode, onToggleTheme }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname === href || pathname.startsWith(href + "/");
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/account/login");
  };

  return (
    <aside className={cn(
      "h-screen sticky top-0 transition-all duration-300 flex flex-col z-[100] border-r shadow-2xl",
      isCollapsed ? "w-16" : "w-60",
      isLightMode 
        ? "bg-white border-slate-200 text-slate-600" 
        : "bg-slate-900 border-slate-800 text-slate-400"
    )}>
      {/* Header */}
      <div className={cn(
        "px-4 py-6 flex items-center justify-between border-b transition-colors",
        isLightMode ? "border-slate-50" : "border-slate-800"
      )}>
        {!isCollapsed && (
          <Link href="/admin" className="flex flex-col items-start px-2">
            <span className={cn(
              "font-display text-lg font-black tracking-tighter transition-colors",
              isLightMode ? "text-slate-900" : "text-white"
            )}>
              AMPLIOS<span className="text-brand-orange leading-[0.5] mb-1">.</span>
            </span>
            <span className="font-mono text-[8px] text-brand-orange/50 tracking-[0.3em] uppercase mt-0.5 font-bold">Command Center</span>
          </Link>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn(
            "w-8 h-8 flex items-center justify-center rounded-lg transition-all ml-auto hover:bg-slate-100",
            !isLightMode && "hover:bg-slate-800"
          )}
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 space-y-8 no-scrollbar">
        {navGroups.map((group, gi) => (
          <div key={gi} className="px-3">
            {group.label && !isCollapsed && (
              <div className="px-3 mb-3">
                <span className="font-mono text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em]">{group.label}</span>
              </div>
            )}
            <div className="space-y-1">
              {group.items.map((item) => {
                const active = isActive(item.href);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group relative text-xs font-bold",
                      isCollapsed && "justify-center",
                      active 
                        ? (isLightMode 
                           ? "bg-slate-900 text-white shadow-lg shadow-slate-900/10" 
                           : "bg-brand-orange text-white shadow-lg shadow-brand-orange/20")
                        : (isLightMode 
                           ? "hover:bg-slate-50 text-slate-500 hover:text-slate-900" 
                           : "hover:bg-slate-800 text-slate-400 hover:text-white")
                    )}
                  >
                    <Icon size={16} className={cn("shrink-0 transition-colors", active ? "text-white" : "group-hover:text-brand-orange")} />
                    {!isCollapsed && (
                      <span className="uppercase tracking-widest">{item.name}</span>
                    )}
                    {isCollapsed && (
                      <div className="absolute left-full ml-4 px-3 py-2 bg-slate-900 text-white text-[9px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 pointer-events-none transition-all whitespace-nowrap z-[110] rounded-lg shadow-xl">
                        {item.name}
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer Tools */}
      <div className={cn(
        "p-4 border-t space-y-2",
        isLightMode ? "border-slate-50 bg-slate-50/50" : "border-slate-800 bg-slate-900"
      )}>
        <button 
          onClick={onToggleTheme}
          className={cn(
            "flex items-center gap-3 px-3 py-3 w-full rounded-xl transition-all text-xs font-bold uppercase tracking-widest",
            isCollapsed && "justify-center",
            isLightMode ? "hover:bg-white text-slate-500 hover:text-slate-900" : "hover:bg-slate-800 text-slate-400 hover:text-white"
          )}
        >
          {isLightMode ? <Moon size={16} className="shrink-0" /> : <Sun size={16} className="shrink-0" />}
          {!isCollapsed && <span>{isLightMode ? "Dark Mode" : "Light Mode"}</span>}
        </button>

        <Link 
          href="/" 
          target="_blank" 
          className={cn(
            "flex items-center gap-3 px-3 py-3 w-full rounded-xl transition-all text-xs font-bold uppercase tracking-widest",
            isCollapsed && "justify-center",
            isLightMode ? "hover:bg-white text-slate-500 hover:text-slate-900" : "hover:bg-slate-800 text-slate-400 hover:text-white"
          )}
        >
          <Monitor size={16} className="shrink-0" />
          {!isCollapsed && <span>Live Site</span>}
        </Link>

        <button 
          onClick={handleSignOut}
          className={cn(
            "flex items-center gap-3 px-3 py-3 w-full rounded-xl transition-all text-xs font-bold uppercase tracking-widest text-red-500",
            isCollapsed && "justify-center",
            isLightMode ? "hover:bg-red-50" : "hover:bg-red-900/20"
          )}
        >
          <LogOut size={16} className="shrink-0" />
          {!isCollapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}
