"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ChevronRight, BookOpen } from "lucide-react";

interface TocItem {
  id: string;
  label: string;
}

interface TrumaSidebarProps {
  items: TocItem[];
  currentPage: string;
}

const TRUMA_PAGES = [
  { name: "Truma Specialist Hub", href: "/brands/truma" },
  { name: "Combi 4E Guide", href: "/guides/truma/combi-4e-guide" },
  { name: "Installation Guide", href: "/guides/truma/combi-installation" },
  { name: "Truma vs Webasto", href: "/guides/compare/truma-vs-webasto" },
  { name: "Truma vs Chinese Diesel", href: "/guides/compare/truma-vs-chinese-diesel-heater" },
];

export function TrumaSidebar({ items, currentPage }: TrumaSidebarProps) {
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
      <div className="bg-brand-carbon border border-brand-border rounded-sm mb-6 shadow-xl">
        <div className="px-5 py-4 border-b border-brand-border bg-brand-obsidian/50">
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

      {/* Truma Guides navigation */}
      <div className="bg-brand-carbon border border-brand-border rounded-sm shadow-xl">
        <div className="px-5 py-4 border-b border-brand-border flex items-center gap-2 bg-brand-obsidian/50">
          <BookOpen className="w-3.5 h-3.5 text-brand-orange" />
          <span className="font-mono text-[9px] text-brand-orange uppercase tracking-[0.3em]">
            Truma Hub
          </span>
        </div>
        <nav className="p-4 space-y-1">
          {TRUMA_PAGES.map((page) => (
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
