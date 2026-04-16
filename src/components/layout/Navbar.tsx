"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, User, ShoppingCart, Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import gsap from "gsap";

interface NavSubItem {
  name: string;
  href: string;
  tagline: string;
  image: string;
}

interface NavLink {
  name: string;
  href: string;
  mega?: boolean;
  items?: NavSubItem[];
}

const navLinks: NavLink[] = [
  { 
    name: "Base Vehicles", 
    href: "/vehicles", 
    mega: true,
    items: [
      { name: "Mercedes Sprinter", href: "/vehicles/mercedes-sprinter", image: "/images/sprinter.png", tagline: "The Gold Standard" },
      { name: "Ford Transit", href: "/vehicles/ford-transit", image: "/images/transit.png", tagline: "The Practical Choice" },
      { name: "VW Crafter", href: "/vehicles/vw-crafter", image: "/images/vw-crafter-hero.png", tagline: "Modern Touring" },
      { name: "MAN TGE", href: "/vehicles/man-tge", image: "/images/man-tge-hero.png", tagline: "Heavy Duty Build" },
      { name: "Fiat Ducato", href: "/vehicles/fiat-ducato", image: "/images/fiat-ducato-hero.png", tagline: "Maximum Width" },
      { name: "Iveco Daily", href: "/vehicles/iveco-daily", image: "/images/iveco-daily-hero.png", tagline: "Ultimate Payload" },
      { name: "Search All Used Vans", href: "/find-a-van", image: "/images/hero-background.png", tagline: "Marketplace Aggregator" },
      { name: "Compare All Chassis", href: "/vehicles/compare", image: "/images/sprinter.png", tagline: "Side-by-Side Analysis" },
    ]
  },
  { 
    name: "Build Systems", 
    href: "/systems", 
    mega: true,
    items: [
      { name: "Electrical & Solar", href: "/systems/electrical-solar", tagline: "Power Your Independence", image: "/images/electrical-technical.png" },
      { name: "Heating & Hot Water", href: "/systems/heating-hot-water", tagline: "Climate Control", image: "/images/systems-showcase.png" },
      { name: "Water & Plumbing", href: "/systems/water-plumbing", tagline: "Flowing Without Constraints", image: "/images/hero-background.png" },
      { name: "Insulation & Vent", href: "/systems/insulation-ventilation", tagline: "The Foundation", image: "/images/transit.png" },
      { name: "Gas & LPG", href: "/systems/gas-lpg", tagline: "Fueling the Adventure", image: "/images/man-tge-hero.png" },
      { name: "Interior & Furniture", href: "/systems/interior-furniture", tagline: "Design the Core", image: "/images/interior-showcase.png" },
    ]
  },
  { name: "Resources", href: "/resources" },
  { 
    name: "Store", 
    href: "/store", 
    mega: true,
    items: [
      { name: "Power Systems", href: "/store/power", tagline: "Victron, Lithium, Solar", image: "/images/systems-showcase.png" },
      { name: "Climate Control", href: "/store/climate", tagline: "Heaters, AC, Fans", image: "/images/interior-showcase.png" },
      { name: "Plumbing", href: "/store/plumbing", tagline: "Tanks, Pumps, Filtration", image: "/images/hero-background.png" },
      { name: "Hardware", href: "/store/hardware", tagline: "Fixings, Latches, Rails", image: "/images/sprinter.png" },
      { name: "Build Kits", href: "/store/kits", tagline: "Bundled System Packs", image: "/images/community-showcase.png" },
    ]
  },
  { name: "Build Planner", href: "/planner" },
  { name: "AI Advisor", href: "/advisor" },
  { 
    name: "Engineering", 
    href: "/tools", 
    mega: true,
    items: [
      { name: "Cable Sizing", href: "/tools/cable-calculator", tagline: "Amps, Voltage, Run", image: "/images/systems-showcase.png" },
      { name: "Cost Estimator", href: "/advisor", tagline: "Project Budgeting", image: "/images/interior-showcase.png" },
      { name: "Build Matcher", href: "/advisor", tagline: "Chassis Discovery", image: "/images/hero-background.png" },
      { name: "Tech Standards", href: "/resources", tagline: "BS EN / RCD Rules", image: "/images/sprinter.png" },
    ]
  },
  { name: "Showcase", href: "/showcase" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const updateCartCount = () => {
      const stored = localStorage.getItem("diym_cart");
      const cart = stored ? JSON.parse(stored) : [];
      const count = cart.reduce((acc: number, item: any) => acc + item.quantity, 0);
      setCartCount(count);
    };
    updateCartCount();
    window.addEventListener("cart-updated", updateCartCount);
    return () => window.removeEventListener("cart-updated", updateCartCount);
  }, []);

  const handleMouseEnter = (linkName: string) => {
    if (timeoutId) clearTimeout(timeoutId);
    setHoveredNav(linkName);
  };

  const handleMouseLeave = () => {
    const id = setTimeout(() => {
      setHoveredNav(null);
    }, 150);
    setTimeoutId(id);
  };

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
            AMPLIOS
          </span>
          <span className="font-mono text-[10px] tracking-[0.2em] text-brand-orange transition-opacity duration-300 group-hover:opacity-100">
            {/* // BUILT FOR THE ROAD */}
            BUILT FOR THE ROAD
          </span>
        </Link>

        {/* Primary Nav (Desktop) */}
        <div className="hidden lg:flex items-center space-x-8 h-full">
          {navLinks.map((link) => (
            <div 
              key={link.name}
              className="h-full flex items-center"
              onMouseEnter={() => link.mega && handleMouseEnter(link.name)}
              onMouseLeave={() => link.mega && handleMouseLeave()}
            >
              <Link
                href={link.href}
                className={cn(
                  "relative font-sans text-xs uppercase tracking-widest transition-colors hover:text-brand-orange py-8",
                  pathname === link.href ? "text-brand-orange" : "text-brand-white/70"
                )}
              >
                {link.name}
                {link.mega && <ChevronDown className={cn("inline-block ml-1 w-3 h-3 opacity-50 transition-transform", hoveredNav === link.name && "rotate-180")} />}
              </Link>

              {/* Mega Menu Dropdown */}
              {link.mega && link.items && (
                <div className={cn(
                  "absolute top-full left-0 right-0 bg-brand-obsidian border-b border-brand-border transition-all duration-300 overflow-hidden",
                  "before:absolute before:-top-8 before:left-0 before:right-0 before:h-8 before:content-['']",
                  hoveredNav === link.name ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
                )}>
                  <div className="container mx-auto px-6 py-12">
                    <div className="grid grid-cols-6 gap-6">
                      {link.items.map((item) => (
                        <Link 
                          key={item.name} 
                          href={item.href}
                          className="group/item block space-y-4"
                        >
                          <div className="aspect-[16/10] overflow-hidden blueprint-border bg-brand-carbon">
                              <img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-full h-full object-cover grayscale group-hover/item:grayscale-0 group-hover/item:scale-110 transition-all duration-500"
                              />
                          </div>
                          <div>
                            <span className="block font-display text-sm uppercase group-hover/item:text-brand-orange transition-colors tracking-tighter">{item.name}</span>
                            <span className="block font-mono text-[8px] text-brand-grey uppercase tracking-widest mt-1">{item.tagline}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
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
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-brand-orange text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
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
            <span className="font-display text-xl">AMPLIOS</span>
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
