"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  Plus,
  Layers,
  Tag,
  Truck,
  FileUp,
  Archive,
  ShoppingCart,
  FileText,
  Monitor,
  Wrench,
  Wand2,
  Image,
  Search,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  MessageSquare,
  Users,
  Crown,
  Camera,
  Map,
  Database,
  BarChart3
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navGroups = [
  {
    label: null,
    items: [
      { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    ]
  },
  {
    label: "CATALOGUE",
    items: [
      { name: "All Products", href: "/admin/products", icon: Package },
      { name: "Add Product", href: "/admin/products/new", icon: Plus },
      { name: "Categories", href: "/admin/categories", icon: Layers },
      { name: "Brands", href: "/admin/brands", icon: Tag },
      { name: "Suppliers", href: "/admin/suppliers", icon: Truck },
      { name: "Bulk Import", href: "/admin/products/import", icon: FileUp },
      { name: "Inventory", href: "/admin/inventory", icon: Archive },
    ]
  },
  {
    label: "ORDERS",
    items: [
      { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
      { name: "Leads", href: "/admin/leads", icon: MessageSquare },
    ]
  },
  {
    label: "CONTENT",
    items: [
      { name: "Journal / Blog", href: "/admin/journal", icon: FileText },
      { name: "Systems / CMS", href: "/admin/cms", icon: Monitor },
      { name: "Blueprints", href: "/admin/blueprints", icon: Database },
      { name: "Showcase", href: "/admin/showcase", icon: Camera },
    ]
  },
  {
    label: "TOOLS",
    items: [
      { name: "AI Enrichment", href: "/admin/tools/ai-enrichment", icon: Wand2 },
      { name: "Image Manager", href: "/admin/tools/image-manager", icon: Image },
      { name: "SEO Checker", href: "/admin/seo", icon: Search },
      { name: "Affiliates", href: "/admin/affiliates", icon: BarChart3 },
    ]
  },
  {
    label: "SETTINGS",
    items: [
      { name: "Users", href: "/admin/users", icon: Users },
      { name: "Memberships", href: "/admin/memberships", icon: Crown },
      { name: "API Settings", href: "/admin/settings", icon: Settings },
      { name: "My Profile", href: "/admin/profile", icon: Users },
      { name: "Roadmap", href: "/admin/roadmap", icon: Map },
    ]
  },
];

interface AdminSidebarProps {
  isLightMode: boolean;
  onToggleTheme: () => void;
}

export function AdminSidebar({ isLightMode, onToggleTheme }: AdminSidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isActive = (href: string) => {
    if (href === "/admin/products") return pathname === href || (pathname.startsWith("/admin/products") && pathname !== "/admin/products/new" && !pathname.includes("/import"));
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <aside className={cn(
      "bg-[#111] border-r border-[#2a2a2a] h-screen sticky top-0 transition-all duration-300 flex flex-col z-[100]",
      isCollapsed ? "w-16" : "w-56"
    )}>
      {/* Header */}
      <div className="px-4 py-4 flex items-center justify-between border-b border-[#2a2a2a]">
        {!isCollapsed && (
          <Link href="/" className="flex flex-col items-start">
            <span className="font-display text-base leading-none text-white tracking-[0.08em] flex items-end">
              AMPLIOS<span className="text-brand-orange leading-[0.5] mb-1">.</span>
            </span>
            <span className="font-mono text-[7px] text-[#555] tracking-[0.3em] uppercase mt-1">Admin</span>
          </Link>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-8 h-8 flex items-center justify-center text-[#555] hover:text-white transition-colors ml-auto"
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 custom-scrollbar">
        {navGroups.map((group, gi) => (
          <div key={gi} className={gi > 0 ? "mt-2" : ""}>
            {group.label && !isCollapsed && (
              <div className="px-4 py-1.5">
                <span className="font-mono text-[9px] text-[#444] uppercase tracking-[0.2em]">{group.label}</span>
              </div>
            )}
            {group.label && isCollapsed && <div className="h-px bg-[#222] mx-2 my-2" />}
            {group.items.map((item) => {
              const active = isActive(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2 transition-all group relative text-sm",
                    isCollapsed && "justify-center px-3",
                    active 
                      ? "bg-brand-orange/10 text-brand-orange border-r-2 border-brand-orange" 
                      : "text-[#666] hover:text-white hover:bg-[#1a1a1a]"
                  )}
                >
                  <Icon size={15} className="shrink-0" />
                  {!isCollapsed && (
                    <span className="font-mono text-[10px] uppercase tracking-wider">{item.name}</span>
                  )}
                  {isCollapsed && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-[#1a1a1a] border border-[#333] text-white text-[9px] uppercase tracking-widest opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[110]">
                      {item.name}
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-[#2a2a2a] space-y-1">
        <button 
          onClick={onToggleTheme}
          className={cn("flex items-center gap-3 px-3 py-2 w-full text-[#555] hover:text-white transition-colors", isCollapsed && "justify-center")}
        >
          {isLightMode ? <Moon size={14} className="shrink-0" /> : <Sun size={14} className="shrink-0" />}
          {!isCollapsed && <span className="font-mono text-[9px] uppercase tracking-wider">{isLightMode ? "Dark Mode" : "Light Mode"}</span>}
        </button>

        <Link href="/" target="_blank" className={cn("flex items-center gap-3 px-3 py-2 w-full text-[#555] hover:text-white transition-colors", isCollapsed && "justify-center")}>
          <Monitor size={14} className="shrink-0" />
          {!isCollapsed && <span className="font-mono text-[9px] uppercase tracking-wider">View Site</span>}
        </Link>

        <button className={cn("flex items-center gap-3 px-3 py-2 w-full text-[#555] hover:text-red-400 transition-colors", isCollapsed && "justify-center")}>
          <LogOut size={14} className="shrink-0" />
          {!isCollapsed && <span className="font-mono text-[9px] uppercase tracking-wider">Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}
