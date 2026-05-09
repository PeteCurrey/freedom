"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ChevronRight, BookOpen } from "lucide-react";

interface TocItem {
  id: string;
  label: string;
}

interface AlpicoolSidebarProps {
  items: TocItem[];
  currentPage: string;
}

const ALPICOOL_PAGES = [
  { name: "Alpicool Brand Hub", href: "/brands/alpicool" },
  { name: "C20 Fridge Review", href: "/guides/alpicool/c20-fridge-review" },
  { name: "Fridge Installation", href: "/guides/alpicool/fridge-installation" },
];

export function AlpicoolSidebar({ items, currentPage }: AlpicoolSidebarProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-20% 0% -60% 0%" }
    );

    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <aside className="hidden xl:block sticky top-28 w-64 flex-shrink-0">
      {/* Table of Contents */}
      <div className="bg-brand-carbon border border-brand-border rounded-sm mb-6">
        <div className="px-5 py-4 border-b border-brand-border">
          <span className="font-mono text-[9px] text-brand-orange uppercase tracking-[0.3em]">
            On this page
          </span>
        </div>
        <nav className="p-4 space-y-1">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`w-full text-left flex items-center gap-2 px-3 py-2 rounded-sm text-[12px] font-sans transition-all ${
                activeId === item.id
                  ? "text-brand-orange bg-brand-obsidian"
                  : "text-brand-grey hover:text-brand-white hover:bg-brand-obsidian"
              }`}
            >
              <ChevronRight className={`w-3 h-3 flex-shrink-0 transition-transform ${activeId === item.id ? "translate-x-0.5 text-brand-orange" : ""}`} />
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Alpicool Guides navigation */}
      <div className="bg-brand-carbon border border-brand-border rounded-sm">
        <div className="px-5 py-4 border-b border-brand-border flex items-center gap-2">
          <BookOpen className="w-3.5 h-3.5 text-brand-orange" />
          <span className="font-mono text-[9px] text-brand-orange uppercase tracking-[0.3em]">
            Alpicool Hub
          </span>
        </div>
        <nav className="p-4 space-y-1">
          {ALPICOOL_PAGES.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className={`flex items-center justify-between px-3 py-2 rounded-sm text-[12px] font-sans transition-all group ${
                page.href === currentPage
                  ? "text-brand-orange bg-brand-obsidian font-medium"
                  : "text-brand-grey hover:text-brand-white hover:bg-brand-obsidian"
              }`}
            >
              <span>{page.name}</span>
              <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
