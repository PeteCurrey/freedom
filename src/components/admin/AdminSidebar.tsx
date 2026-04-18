"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  BarChart3, 
  ShoppingBag, 
  Users, 
  Settings, 
  LayoutDashboard, 
  Search, 
  Monitor, 
  UserCircle,
  MessageSquare,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Database,
  FileText,
  Sun,
  Moon,
  Truck
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const menuItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Leads", href: "/admin/leads", icon: MessageSquare },
  { name: "Amplios Journal", href: "/admin/journal", icon: FileText },
  { name: "SEO Hub", href: "/admin/seo", icon: Search },
  { name: "Affiliate Network", href: "/admin/affiliates", icon: Database },
  { name: "Used Marketplaces", href: "/admin/marketing/marketplaces", icon: Monitor },
  { name: "Supplier Network", href: "/admin/store/suppliers", icon: Truck },
  { name: "Store Manager", href: "/admin/store", icon: ShoppingBag },
  { name: "Content / CMS", href: "/admin/cms", icon: Monitor },
  { name: "User Admin", href: "/admin/users", icon: Users },
  { name: "API Settings", href: "/admin/settings", icon: Settings },
  { name: "My Profile", href: "/admin/profile", icon: UserCircle },
];

interface AdminSidebarProps {
  isLightMode: boolean;
  onToggleTheme: () => void;
}

export function AdminSidebar({ isLightMode, onToggleTheme }: AdminSidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside className={cn(
      "bg-brand-carbon border-r border-brand-border h-screen sticky top-0 transition-all duration-300 flex flex-col z-[100]",
      "admin-sidebar-adaptive",
      isCollapsed ? "w-20" : "w-64"
    )}>
      {/* Sidebar Header */}
      <div className="p-6 flex items-center justify-between border-b border-brand-border">
        {!isCollapsed && (
          <Link href="/" className="flex flex-col items-start">
            <span className="font-display text-xl leading-none text-brand-white tracking-[0.08em] flex items-end">
              AMPLIOS<span className="text-brand-orange leading-[0.5] mb-1">.</span>
            </span>
            <span className="font-mono text-[8px] text-brand-grey tracking-[0.52em] uppercase whitespace-nowrap mt-1 -mr-[0.52em]">
              Built for the road
            </span>
          </Link>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-10 h-10 flex items-center justify-center text-brand-grey hover:text-brand-orange transition-colors"
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-4 p-3 transition-all group relative",
                isActive 
                  ? "bg-brand-orange text-white" 
                  : "text-brand-grey hover:bg-brand-obsidian hover:text-brand-orange"
              )}
            >
              <Icon size={20} className={cn("shrink-0", isActive ? "text-white" : "group-hover:scale-110 transition-transform")} />
              {!isCollapsed && (
                <span className="font-mono text-[10px] uppercase tracking-widest font-medium">
                  {item.name}
                </span>
              )}
              {isCollapsed && (
                <div className="absolute left-full ml-4 px-3 py-2 bg-brand-obsidian border border-brand-border text-white text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[110]">
                  {item.name}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-brand-border space-y-2">
        <button 
          onClick={onToggleTheme}
          className={cn(
            "flex items-center gap-4 p-3 w-full text-brand-grey hover:text-brand-orange transition-colors group",
            isCollapsed && "justify-center"
          )}
        >
          {isLightMode ? <Moon size={20} className="shrink-0" /> : <Sun size={20} className="shrink-0" />}
          {!isCollapsed && <span className="font-mono text-[10px] uppercase tracking-widest">{isLightMode ? "Dark Mode" : "Light Mode"}</span>}
        </button>

        <button className={cn(
          "flex items-center gap-4 p-3 w-full text-brand-grey hover:text-red-500 transition-colors group",
          isCollapsed && "justify-center"
        )}>
          <LogOut size={20} className="shrink-0" />
          {!isCollapsed && <span className="font-mono text-[10px] uppercase tracking-widest">Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}
