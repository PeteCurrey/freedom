"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, User, ShoppingCart, Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import gsap from "gsap";

const navLinks = [
  { name: "Base Vehicles", href: "/vehicles", mega: true },
  { name: "Build Systems", href: "/systems", mega: true },
  { name: "Resources", href: "/resources" },
  { name: "Store", href: "/store", mega: true },
  { name: "Build Planner", href: "/planner" },
  { name: "Showcase", href: "/showcase" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      gsap.fromTo(
        ".mobile-menu-item",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [mobileMenuOpen]);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        isScrolled
          ? "bg-brand-obsidian/90 backdrop-blur-xl border-brand-border py-4"
          : "bg-transparent border-transparent py-8"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group flex flex-col">
          <span className="font-display text-2xl leading-none tracking-tighter text-brand-white">
            DIY MOTORHOMES
          </span>
          <span className="font-mono text-[10px] tracking-[0.2em] text-brand-orange transition-opacity duration-300 group-hover:opacity-100">
            {/* // BUILT FOR THE ROAD */}
            BUILT FOR THE ROAD
          </span>
        </Link>

        {/* Primary Nav (Desktop) */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "relative font-sans text-xs uppercase tracking-widest transition-colors hover:text-brand-orange",
                pathname === link.href ? "text-brand-orange" : "text-brand-white/70"
              )}
            >
              {link.name}
              {link.mega && <ChevronDown className="inline-block ml-1 w-3 h-3 opacity-50" />}
            </Link>
          ))}
        </div>

        {/* Utility Nav */}
        <div className="flex items-center space-x-6 text-brand-white/80">
          <button className="hover:text-brand-orange transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <Link href="/account" className="hover:text-brand-orange transition-colors">
            <User className="w-5 h-5" />
          </Link>
          <Link href="/cart" className="relative hover:text-brand-orange transition-colors">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-2 -right-2 bg-brand-orange text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
              0
            </span>
          </Link>
          <button
            className="lg:hidden hover:text-brand-orange transition-colors"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-brand-obsidian z-[60] transition-transform duration-500 ease-expo-out lg:hidden",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="p-8 flex flex-col h-full">
          <div className="flex justify-between items-center mb-16">
            <span className="font-display text-xl">DIY MOTORHOMES</span>
            <button onClick={() => setMobileMenuOpen(false)}>
              <X className="w-8 h-8" />
            </button>
          </div>

          <div className="flex flex-col space-y-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="mobile-menu-item font-display text-4xl uppercase tracking-tighter hover:text-brand-orange transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="mt-auto pt-16 border-t border-brand-border flex flex-col space-y-4">
            <p className="font-mono text-xs text-brand-grey uppercase tracking-widest">
              Built for the road. Engineered for life.
            </p>
            <div className="flex space-x-6 text-[#F5F5F0]/60 text-sm">
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/terms">Terms</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
