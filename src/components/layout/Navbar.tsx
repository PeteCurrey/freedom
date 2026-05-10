"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, User, ShoppingCart, Menu, X, ChevronDown, ArrowRight, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { supabase } from "@/lib/supabase";
import { PromotionBanner } from "./PromotionBanner";

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
      { name: "MAN TGE", href: "/vehicles/man-tge", image: "/images/man-tge-hero.png", tagline: "The Hidden Bargain" },
      { name: "Fiat Ducato", href: "/vehicles/fiat-ducato", image: "/images/fiat-ducato-hero.png", tagline: "Maximum Width" },
      { name: "Iveco Daily", href: "/vehicles/iveco-daily", image: "/images/iveco-daily-hero.png", tagline: "Ultimate Payload" },
      { name: "Renault Master", href: "/vehicles/renault-master", image: "/images/bespoke-master.png", tagline: "Efficient Fleet" },
      { name: "Compare All Chassis", href: "/vehicles/compare", image: "/images/sprinter.png", tagline: "Side-by-Side Analysis" },
    ]
  },
  { 
    name: "Build Systems", 
    href: "/systems", 
    mega: true,
    items: [
      { name: "Electrical & Solar", href: "/systems/electrical-solar", tagline: "Power Your Independence", image: "/images/electrical-technical.png" },
      { name: "Heating & Hot Water", href: "/systems/heating-hot-water", tagline: "Climate Control", image: "/images/heating-system-technical.png" },
      { name: "Water & Plumbing", href: "/systems/water-plumbing", tagline: "Flowing Without Constraints", image: "/images/water-plumbing-technical.png" },
      { name: "Insulation & Vent", href: "/systems/insulation-ventilation", tagline: "The Foundation", image: "/images/insulation-technical.png" },
      { name: "Gas & LPG", href: "/systems/gas-lpg", tagline: "Fueling the Adventure", image: "/images/gas-lpg-technical.png" },
      { name: "Lighting Systems", href: "/systems/lighting", tagline: "Illuminate Your Adventure", image: "/images/hero-background.png" },
      { name: "Air Conditioning", href: "/systems/air-conditioning", tagline: "Ultimate Climate Control", image: "/images/heating-system-technical.png" },
      { name: "Wheels & Tyres", href: "/systems/wheels-tyres", tagline: "The Foundation of Grip", image: "/images/wheels-tyres-technical.png" },
      { name: "Exterior Equipment", href: "/systems/exterior-equipment", tagline: "Racks, Ladders, Awnings", image: "/images/exterior-equipment-technical.png" },
      { name: "Security & Tracking", href: "/systems/security-tracking", tagline: "Protect Your Sanctuary", image: "/images/step_security_cinematic_1776675013013.png" },
      { name: "Interior & Furniture", href: "/systems/interior-furniture", tagline: "Design the Core", image: "/images/interior-showcase.png" },
    ]
  },
  { 
    name: "Store", 
    href: "/store", 
    mega: true,
    items: [
      { name: "Electrical Core", href: "/store/electrical-core", tagline: "Batteries & Charging", image: "/images/cat-power.png" },
      { name: "Solar & Roof", href: "/store/solar-roof", tagline: "Panels & Mounting", image: "/images/solar-technical.png" },
      { name: "Heating & Climate", href: "/store/heating-climate", tagline: "Diesel & Combi", image: "/images/cat-climate.png" },
      { name: "Water & Plumbing", href: "/store/water-plumbing", tagline: "Tanks & Pumps", image: "/images/cat-water.png" },
      { name: "Gas & Cooking", href: "/store/gas-cooking", tagline: "Lockers & Hobs", image: "/images/gas-lpg-technical.png" },
      { name: "Toilets & Washroom", href: "/store/toilets-washroom", tagline: "Composting & Tubs", image: "/images/cat-windows.png" },
      { name: "Complete Kits", href: "/store/complete-kits", tagline: "System Bundles", image: "/images/community-showcase.png" },
    ]
  },
  {
    name: "Learning",
    href: "/guides",
    mega: true,
    items: [
      { name: "Van Size Guide", href: "/guides/van-size-guide", tagline: "Choose Your Platform", image: "/images/sprinter.png" },
      { name: "Conversion Costs", href: "/guides/van-conversion-cost-guide", tagline: "2026 Budget Reality", image: "/images/cat-power.png" },
      { name: "DVLA Reclassification", href: "/guides/dvla-motor-caravan-reclassification", tagline: "Legal UK Status", image: "/images/cat-insulation.png" },
      { name: "Self-Build Insurance", href: "/guides/self-build-motorhome-insurance", tagline: "Protect Your Build", image: "/images/cat-power.png" },
      { name: "Build Timeline", href: "/guides/motorhome-conversion-timeline", tagline: "How Long It Takes", image: "/images/cat-insulation.png" },
      { name: "Should I Convert?", href: "/guides/should-i-convert-a-van", tagline: "The Honest Answer", image: "/images/cat-insulation.png" },
      { name: "Resident Blog", href: "/blog", tagline: "Stories From the Road", image: "/images/community-showcase.png" },
    ]
  },
  {
    name: "Layouts",
    href: "/guides",
    mega: true,
    items: [
      { name: "Sprinter LWB/MWB", href: "/guides/sprinter-van-conversion-layout", tagline: "The World's Favorite", image: "/images/cat-insulation.png" },
      { name: "VW Crafter LWB", href: "/guides/lwb-crafter-conversion-layout", tagline: "The Width Advantage", image: "/images/cat-insulation.png" },
      { name: "Ducato/Boxer/Relay", href: "/guides/lwb-ducato-conversion-layout", tagline: "Square Efficiency", image: "/images/cat-insulation.png" },
      { name: "MWB Sprinter", href: "/guides/mwb-sprinter-layout", tagline: "The 6 Metre Challenge", image: "/images/cat-insulation.png" },
      { name: "Fixed Bed vs Lounge", href: "/guides/fixed-bed-vs-u-shape-lounge", tagline: "The Ultimate Debate", image: "/images/cat-insulation.png" },
    ]
  },
  {
    name: "Gear",
    href: "/guides",
    mega: true,
    items: [
      { name: "Power Stations", href: "/guides/best-portable-power-station", tagline: "EcoFlow vs Jackery", image: "/images/cat-power.png" },
      { name: "12V Fridges", href: "/guides/best-12v-campervan-fridge", tagline: "Compressor Guide", image: "/images/interior-showcase.png" },
      { name: "Van Toilets", href: "/guides/best-campervan-toilet", tagline: "Composting Reality", image: "/images/cat-water.png" },
      { name: "Starlink Roam", href: "/guides/starlink-campervan-installation", tagline: "Off-Grid Internet", image: "/images/cat-insulation.png" },
      { name: "Roof Fans", href: "/guides/compare/maxxair-vs-fiamma", tagline: "MaxxAir vs Fiamma", image: "/images/cat-climate.png" },
    ]
  },
  {
    name: "Destinations",
    href: "/guides",
    mega: true,
    items: [
      { name: "NC500 Route Guide", href: "/guides/nc500-campervan-guide", tagline: "Scotland Road Trip", image: "/images/cat-insulation.png" },
      { name: "Wild Camping UK", href: "/guides/wild-camping-uk-campervan", tagline: "Laws & Essential Apps", image: "/images/cat-insulation.png" },
      { name: "Europe Post-Brexit", href: "/guides/van-life-europe-guide", tagline: "90/180 Days & Tolls", image: "/images/cat-insulation.png" },
      { name: "Winter in the Alps", href: "/guides/winter-van-life-alps", tagline: "Surviving -15°C", image: "/images/cat-insulation.png" },
    ]
  },
  {
    name: "Guides",
    href: "/guides",
    mega: true,
    items: [
      { name: "Electrical Guide", href: "/guides/campervan-electrical-guide", tagline: "Off-Grid Power Logic", image: "/images/cat-power.png" },
      { name: "Plumbing Guide", href: "/guides/campervan-plumbing-guide", tagline: "Water Systems UK", image: "/images/cat-water.png" },
      { name: "Insulation Guide", href: "/guides/how-to-insulate-a-van-uk", tagline: "Silence & Warmth", image: "/images/cat-insulation.png" },
      { name: "Heating Comparison", href: "/guides/campervan-heating-guide", tagline: "Diesel vs Gas", image: "/images/cat-climate.png" },
      { name: "Order of Work", href: "/guides/build-sequence", tagline: "Master Build Timeline", image: "/images/cat-insulation.png" },
      { name: "Tyre Guide", href: "/guides/van-conversion-tyres", tagline: "Best Off-Road Rubber", image: "/images/cat-insulation.png" },
      { name: "Alloy Wheels", href: "/guides/van-alloy-wheels-guide", tagline: "Load-Rated Style", image: "/images/bespoke-iveco.png" },
      { name: "Suspension Upgrades", href: "/guides/van-suspension-upgrade", tagline: "Stop the Sag", image: "/images/cat-insulation.png" },
    ]
  },
  { 
    name: "Resources",
    href: "/resources",
    mega: true,
    items: [
      { name: "Victron Energy Hub", href: "/brands/victron-energy", tagline: "UK Authorised Stockist", image: "/images/victron/brand-hero.jpg" },
      { name: "Truma Specialist Hub", href: "/brands/truma", tagline: "Heating & Hot Water", image: "/images/truma/brand-hero.png" },
      { name: "Propex Gas Hub", href: "/brands/propex", tagline: "British Gas Heating", image: "/images/cat-climate.png" },
      { name: "Fogstar Lithium Hub", href: "/brands/fogstar", tagline: "UK Value Leader", image: "/images/cat-power.png" },
      { name: "Webasto Diesel Hub", href: "/brands/webasto", tagline: "Premium Diesel Heating", image: "/images/cat-climate.png" },
      { name: "Fiamma Exterior Hub", href: "/brands/fiamma", tagline: "Awnings & Bike Racks", image: "/images/cat-insulation.png" },
      { name: "MaxxAir Vent Hub", href: "/brands/maxxair", tagline: "Ultimate Ventilation", image: "/images/cat-climate.png" },
      { name: "Alpicool Value Fridge Hub", href: "/brands/alpicool", tagline: "Budget Compressor Cooling", image: "/images/interior-showcase.png" },
      { name: "Dodo Mat Insulation Hub", href: "/brands/dodo-mat", tagline: "Silence & Thermal", image: "/images/cat-insulation.png" },
      { name: "Whale Underslung Hub", href: "/brands/whale", tagline: "Space-Saving Heating", image: "/images/cat-water.png" },
      { name: "Best Heaters 2024", href: "/guides/compare/best-campervan-heaters", tagline: "Diesel vs Gas Debate", image: "/images/cat-climate.png" },
    ]
  },
  { 
    name: "Engineering", 
    href: "/tools", 
    mega: true,
    items: [
      { name: "AI Build Planner", href: "/planner", tagline: "Spec Your Build", image: "/images/systems-showcase.png" },
      { name: "Payload & Balance", href: "/tools/payload-balancer", tagline: "GVM Audit", image: "/images/bespoke-iveco.png" },
      { name: "Cable Sizing", href: "/tools/cable-calculator", tagline: "Electrical Logic", image: "/images/systems-showcase.png" },
      { name: "Build Plan PDF", href: "/planner/results", tagline: "Paid Build Dossier", image: "/images/hero-background.png" },
    ]
  },
  { name: "Showcase", href: "/showcase" },
];

export function Navbar() {
  const [links, setLinks] = useState<NavLink[]>(navLinks);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const pathname = usePathname();
  const isLightMode = pathname?.startsWith('/store') || pathname?.startsWith('/cart') || pathname?.startsWith('/checkout') || pathname?.startsWith('/account');

  useEffect(() => {
    const updateCartCount = () => {
      try {
        const stored = localStorage.getItem("amplios-cart");
        const cart = stored ? JSON.parse(stored) : [];
        const count = Array.isArray(cart) 
          ? cart.reduce((acc: number, item: any) => acc + (item.quantity || 0), 0)
          : 0;
        setCartCount(count);
      } catch (error) {
        console.error("Failed to parse cart count:", error);
        setCartCount(0);
      }
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

  /* 
  useEffect(() => {
    async function fetchStoreCategories() {
      const { data } = await supabase
        .from('product_categories')
        .select('name, slug, description')
        .order('sort_order', { ascending: true });
        
      const imageMap: Record<string, string> = {
        'electrical': '/images/cat-power.png',
        'climate': '/images/cat-climate.png',
        'plumbing': '/images/cat-water.png',
        'insulation': '/images/cat-insulation.png',
        'windows-ventilation': '/images/cat-windows.png',
        'exterior-accessories': '/images/exterior-equipment-technical.png',
        'kits': '/images/community-showcase.png'
      };
        
      if (data) {
        // Filter to only included categories
        const includedSlugs = ['electrical', 'climate', 'plumbing', 'insulation', 'windows-ventilation', 'exterior-accessories', 'kits'];
        const filteredCats = data.filter(c => includedSlugs.includes(c.slug));

        setLinks(currentLinks => {
          const newLinks = [...currentLinks];
          const storeIndex = newLinks.findIndex(l => l.name === 'Store');
          if (storeIndex !== -1) {
            newLinks[storeIndex] = {
              ...newLinks[storeIndex],
              items: filteredCats.map(cat => ({
                name: cat.name,
                href: `/store/${cat.slug}`,
                tagline: cat.description || "Technical Registry",
                image: imageMap[cat.slug] || "/images/hero-background.png" 
              }))
            };
          }
          return newLinks;
        });
      }
    }
    fetchStoreCategories();
  }, []);
  */

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
      <PromotionBanner />
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group flex flex-col items-center w-fit mt-1">
            <span className={cn(
              "font-display text-[26px] leading-none tracking-[0.25em] flex items-end ml-[0.25em]",
              isLightMode && !isScrolled ? "text-brand-obsidian" : "text-white"
            )}>
              AMPLIOS<span className="text-brand-orange leading-[0.5] mb-[0.15em] -ml-1">.</span>
            </span>
            <span className="font-mono text-[8px] text-brand-grey tracking-[0.5em] pl-[0.5em] uppercase whitespace-nowrap w-full text-center mt-1.5">
              Built for the road
            </span>
        </Link>

        {/* Primary Nav (Desktop) */}
        <div className="hidden lg:flex items-center space-x-8 h-full">
          {links.map((link) => (
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
                  pathname === link.href 
                    ? "text-brand-orange" 
                    : (isLightMode && !isScrolled ? "text-brand-obsidian/70" : "text-brand-white/70")
                )}
              >
                {link.name}
                {link.mega && <ChevronDown className={cn("inline-block ml-1 w-3 h-3 opacity-50 transition-transform", hoveredNav === link.name && "rotate-180")} />}
              </Link>

              {/* Mega Menu Dropdown */}
              {link.mega && link.items && (
                <div className={cn(
                  "absolute top-full left-0 right-0 border-b transition-all duration-300 overflow-hidden shadow-2xl z-[100]",
                  isLightMode && !isScrolled 
                    ? "bg-white border-slate-200" 
                    : "bg-brand-obsidian border-brand-border",
                  "before:absolute before:-top-8 before:left-0 before:right-0 before:h-8 before:content-['']",
                  hoveredNav === link.name ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
                )}>
                  <div className="container mx-auto px-6 py-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
                      {link.items.map((item) => (
                        <Link 
                          key={item.name} 
                          href={item.href}
                          className="group/item block space-y-4"
                        >
                          <div className="aspect-[16/10] overflow-hidden blueprint-border bg-white/5">
                              <img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-full h-full object-cover group-hover/item:scale-110 transition-all duration-500"
                              />
                          </div>
                          <div>
                            <span className={cn(
                              "block font-display text-sm uppercase group-hover/item:text-brand-orange transition-colors tracking-tighter",
                              isLightMode && !isScrolled ? "text-[#111111]" : "text-white"
                            )}>
                              {item.name}
                            </span>
                            <span className={cn(
                              "block font-mono text-[8px] uppercase tracking-widest mt-1",
                              isLightMode && !isScrolled ? "text-[#666666]" : "text-brand-grey"
                            )}>
                              {item.tagline}
                            </span>
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
        <div className={cn(
          "flex items-center space-x-6",
          isLightMode && !isScrolled ? "text-brand-obsidian/80" : "text-brand-white/80"
        )}>
          <Link 
            href="/client-portal" 
            className="hidden lg:flex items-center gap-2 border border-brand-border px-5 py-2 group/journey transition-all hover:border-brand-orange"
          >
            <Shield className="w-3 h-3 text-brand-orange" />
            <span className="font-display text-[9px] uppercase tracking-widest text-brand-grey group-hover/journey:text-white transition-colors">Command Centre</span>
          </Link>
          <Link 
            href="/planner" 
            className="hidden xl:flex items-center gap-2 bg-brand-orange/10 border border-brand-orange/30 px-5 py-2 group/cta transition-all hover:bg-brand-orange"
          >
            <span className="font-display text-[9px] uppercase tracking-widest text-white group-hover/cta:text-white transition-colors">Build Planner</span>
            <ArrowRight className="w-3 h-3 text-white group-hover/cta:text-white transition-colors" />
          </Link>
          <button className="hover:text-brand-orange transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <Link href="/account" className="hover:text-brand-orange transition-colors">
            <User className="w-5 h-5" />
          </Link>
          <Link href="/cart" className="relative hover:text-brand-orange transition-colors">
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-brand-orange text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-brand-obsidian">
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
            <div className="flex flex-col items-start">
              <span className="font-display text-2xl tracking-[0.08em] text-brand-white">
                AMPLIOS<span className="text-brand-orange">.</span>
              </span>
              <span className="font-mono text-[8px] tracking-[0.52em] text-brand-grey uppercase -mr-[0.52em]">
                Built for the road
              </span>
            </div>
            <button onClick={() => setMobileMenuOpen(false)}>
              <X className="w-8 h-8" />
            </button>
          </div>

          <div className="flex flex-col space-y-8">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="mobile-menu-item font-display text-4xl uppercase tracking-tighter hover:text-brand-orange transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            
            <Link 
              href="/journey" 
              className="mobile-menu-item mt-8 px-6 py-4 border border-brand-orange text-brand-orange font-mono text-[10px] uppercase tracking-[0.3em] flex items-center justify-between group"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Track My Build</span>
              <Shield className="w-4 h-4" />
            </Link>
          </div>

          <div className="mt-auto pt-16 border-t border-brand-border flex flex-col space-y-4">
            <p className="font-mono text-xs text-brand-grey uppercase tracking-widest">
              Built for the road. Engineered for life.
            </p>
            <div className="flex space-x-6 text-[#F5F5F0]/60 text-sm">
              <Link href="/about">About</Link>
              <Link href="/about#contact">Contact</Link>
              <Link href="/terms">Terms</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
