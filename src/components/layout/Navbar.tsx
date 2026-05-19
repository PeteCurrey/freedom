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

interface NavCategory {
  name: string;
  items: NavSubItem[];
}

interface NavLink {
  name: string;
  href: string;
  mega?: boolean;
  items?: NavSubItem[];
  categories?: NavCategory[];
}

const navLinks: NavLink[] = [
  { 
    name: "Base Vehicles", 
    href: "/vehicles", 
    mega: true,
    items: [
      { name: "Mercedes Sprinter", href: "/vehicles/mercedes-sprinter", image: "/images/sprinter.png", tagline: "The Gold Standard" },
      { name: "Ford Transit", href: "/vehicles/ford-transit", image: "/images/transit.png", tagline: "The Practical Choice" },
      { name: "VW Crafter", href: "/vehicles/vw-crafter-hero.png", image: "/images/vw-crafter-hero.png", tagline: "Modern Touring" },
      { name: "MAN TGE", href: "/vehicles/man-tge-hero.png", image: "/images/man-tge-hero.png", tagline: "The Hidden Bargain" },
      { name: "Fiat Ducato", href: "/vehicles/fiat-ducato-hero.png", image: "/images/fiat-ducato-hero.png", tagline: "Maximum Width" },
      { name: "Iveco Daily", href: "/vehicles/iveco-daily-hero.png", image: "/images/iveco-daily-hero.png", tagline: "Ultimate Payload" },
      { name: "Renault Master", href: "/vehicles/renault-master", image: "/images/bespoke-relay.png", tagline: "Efficient Fleet" },
      { name: "Compare All Chassis", href: "/vehicles/compare", image: "/images/sprinter-schematic.png", tagline: "Side-by-Side Analysis" },
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
      { name: "Lighting Systems", href: "/systems/lighting", tagline: "Illuminate Your Adventure", image: "/images/tech-interior.png" },
      { name: "Air Conditioning", href: "/systems/air-conditioning", tagline: "Ultimate Climate Control", image: "/images/cat-climate.png" },
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
    categories: [
      {
        name: "Power & Solar",
        items: [
          { name: "Inverters & Chargers", href: "/store/electrical-core?sub=inverters-chargers", tagline: "Victron & MultiPlus", image: "/images/cat-power.png" },
          { name: "Lithium Batteries", href: "/store/electrical-core?sub=batteries", tagline: "Fogstar & Roamer", image: "/images/tech-electrical.png" },
          { name: "Solar Panels", href: "/store/solar-roof?sub=solar-panels", tagline: "Rigid & Flexible", image: "/images/cat-power.png" },
          { name: "Monitoring & UI", href: "/store/electrical-core?sub=monitoring", tagline: "Cerbo & GX Touch", image: "/images/victron-monitoring.png" },
          { name: "DC-DC & MPPT", href: "/store/electrical-core?sub=dc-dc", tagline: "Smart Charging", image: "/images/electrical-technical.png" },
        ]
      },
      {
        name: "Climate & Heating",
        items: [
          { name: "Diesel Heaters", href: "/store/heating-climate?sub=diesel-heaters", tagline: "Autoterm & Webasto", image: "/images/cat-climate.png" },
          { name: "Combi Systems", href: "/store/heating-climate?sub=combi-systems", tagline: "Air & Water Heat", image: "/images/heating-system-technical.png" },
          { name: "Air Conditioning", href: "/store/heating-climate?sub=air-conditioning", tagline: "Dometic FreshJet", image: "/images/cat-climate.png" },
          { name: "Roof Ventilation", href: "/store/heating-climate?sub=ventilation", tagline: "MaxxFan & Fiamma", image: "/images/insulation-technical.png" },
          { name: "LPG Heating", href: "/store/heating-climate?sub=lpg-heaters", tagline: "Propex HS2000", image: "/images/gas-lpg-technical.png" },
        ]
      },
      {
        name: "Water & Gas",
        items: [
          { name: "Water Heaters", href: "/store/water-plumbing?sub=water-heaters", tagline: "Whale & Truma", image: "/images/cat-water.png" },
          { name: "Tanks & Plumbing", href: "/store/water-plumbing?sub=tanks", tagline: "Underslung & Fresh", image: "/images/water-plumbing-technical.png" },
          { name: "Gas Lockers", href: "/store/gas-cooking?sub=gas-lockers", tagline: "Safe Storage", image: "/images/cat-gas.png" },
          { name: "Hobs & Ovens", href: "/store/gas-cooking?sub=cooking", tagline: "Dometic & Thetford", image: "/images/cat-gas.png" },
          { name: "Water Filtration", href: "/store/water-plumbing?sub=filtration", tagline: "Clean Drinkable Water", image: "/images/tech-water.png" },
        ]
      },
      {
        name: "Interior & Fittings",
        items: [
          { name: "S4 Windows", href: "/store/windows?sub=windows", tagline: "Dometic Glazing", image: "/images/exterior-equipment-technical.png" },
          { name: "Refrigeration", href: "/store/appliances?sub=refrigeration", tagline: "12V Compressor", image: "/images/cat-interior.png" },
          { name: "Insulation", href: "/store/insulation-sound?sub=thermal-insulation", tagline: "Dodo Mat & Wool", image: "/images/cat-insulation.png" },
          { name: "Sound Deadening", href: "/store/insulation-sound?sub=sound-deadening", tagline: "Vibration Control", image: "/images/insulation-technical.png" },
          { name: "Toilets", href: "/store/toilets-washroom?sub=toilets", tagline: "Composting & Cassette", image: "/images/tech-water.png" },
        ]
      },
      {
        name: "Bundles & Kits",
        items: [
          { name: "Electrical Kits", href: "/store/complete-kits?sub=electrical-kits", tagline: "Verified Victron Specs", image: "/images/kit-expedition.png" },
          { name: "Plumbing Kits", href: "/store/complete-kits?sub=plumbing-kits", tagline: "Full System Packs", image: "/images/kit-essential.png" },
          { name: "Full Build Bundles", href: "/store/complete-kits", tagline: "The Whole Van Spec", image: "/images/kit-luxury.png" },
        ]
      },
      {
        name: "Brands",
        items: [
          { name: "Victron Energy", href: "/brands/victron-energy", tagline: "Power Systems", image: "/images/victron-monitoring.png" },
          { name: "Fogstar", href: "/brands/fogstar", tagline: "Lithium Batteries", image: "/images/tech-electrical.png" },
          { name: "Webasto", href: "/brands/webasto", tagline: "Diesel Heating", image: "/images/cat-climate.png" },
          { name: "Truma", href: "/brands/truma", tagline: "Combi Heating", image: "/images/heating-system-technical.png" },
          { name: "Dometic", href: "/brands/dometic", tagline: "Fridges & Windows", image: "/images/cat-interior.png" },
          { name: "Eberspacher", href: "/brands/eberspacher", tagline: "Diesel Heaters", image: "/images/cat-climate.png" },
          { name: "Whale", href: "/brands/whale", tagline: "Pumps & Heating", image: "/images/cat-water.png" },
          { name: "Dodo Mat", href: "/brands/dodo-mat", tagline: "Insulation", image: "/images/cat-insulation.png" },
          { name: "MaxxAir", href: "/brands/maxxair", tagline: "Roof Fans", image: "/images/insulation-technical.png" },
          { name: "EcoFlow", href: "/brands/ecoflow", tagline: "Portable Power", image: "/images/cat-power.png" },
        ]
      }
    ]
  },
  { 
    name: "Resources",
    href: "/resources",
    mega: true,
    categories: [
      {
        name: "Learning & Foundations",
        items: [
          { name: "Van Size Guide", href: "/guides/van-size-guide", tagline: "Choose Your Platform", image: "/images/transit-schematic.png" },
          { name: "Conversion Costs", href: "/guides/van-conversion-cost-guide", tagline: "2026 Budget Reality", image: "/images/kit-essential.png" },
          { name: "DVLA Reclassification", href: "/guides/dvla-motor-caravan-reclassification", tagline: "Legal UK Status", image: "/images/kit-base.png" },
          { name: "Self-Build Insurance", href: "/guides/self-build-motorhome-insurance", tagline: "Protect Your Build", image: "/images/kit-luxury.png" },
          { name: "Build Timeline", href: "/guides/motorhome-conversion-timeline", tagline: "How Long It Takes", image: "/images/peugeot-boxer-schematic.png" },
          { name: "Should I Convert?", href: "/guides/should-i-convert-a-van", tagline: "The Honest Answer", image: "/images/systems-showcase.png" },
          { name: "Resident Blog", href: "/blog", tagline: "Stories From the Road", image: "/images/community-showcase.png" },
        ]
      },
      {
        name: "Vehicle Layouts",
        items: [
          { name: "Sprinter LWB/MWB", href: "/guides/sprinter-van-conversion-layout", tagline: "The World's Favorite", image: "/images/sprinter-schematic.png" },
          { name: "VW Crafter LWB", href: "/guides/lwb-crafter-conversion-layout", tagline: "The Width Advantage", image: "/images/bespoke-crafter.png" },
          { name: "Ducato/Boxer/Relay", href: "/guides/lwb-ducato-conversion-layout", tagline: "Square Efficiency", image: "/images/citroen-relay-schematic.png" },
          { name: "MWB Sprinter", href: "/guides/mwb-sprinter-layout", tagline: "The 6 Metre Challenge", image: "/images/bespoke-sprinter.png" },
          { name: "Fixed Bed vs Lounge", href: "/guides/fixed-bed-vs-u-shape-lounge", tagline: "The Ultimate Debate", image: "/images/tech-interior.png" },
        ]
      },
      {
        name: "Essential Gear",
        items: [
          { name: "Power Stations", href: "/guides/best-portable-power-station", tagline: "EcoFlow vs Jackery", image: "/images/tech-electrical.png" },
          { name: "12V Fridges", href: "/guides/best-12v-campervan-fridge", tagline: "Compressor Guide", image: "/images/cat-interior.png" },
          { name: "Van Toilets", href: "/guides/best-campervan-toilet", tagline: "Composting Reality", image: "/images/tech-water.png" },
          { name: "Starlink Roam", href: "/guides/starlink-campervan-installation", tagline: "Off-Grid Internet", image: "/images/exterior-equipment-technical.png" },
          { name: "Roof Fans", href: "/guides/compare/maxxair-vs-fiamma", tagline: "MaxxAir vs Fiamma", image: "/images/cat-climate.png" },
        ]
      },
      {
        name: "Destinations",
        items: [
          { name: "NC500 Route Guide", href: "/guides/nc500-campervan-guide", tagline: "Scotland Road Trip", image: "/images/hero-background.png" },
          { name: "Wild Camping UK", href: "/guides/wild-camping-uk-campervan", tagline: "Laws & Essential Apps", image: "/images/community-showcase.png" },
          { name: "Europe Post-Brexit", href: "/guides/van-life-europe-guide", tagline: "90/180 Days & Tolls", image: "/images/bespoke-transit.png" },
          { name: "Winter in the Alps", href: "/guides/winter-van-life-alps", tagline: "Surviving -15°C", image: "/images/cat-climate.png" },
        ]
      },
      {
        name: "Technical Guides",
        items: [
          { name: "Electrical Guide", href: "/guides/campervan-electrical-guide", tagline: "Off-Grid Power Logic", image: "/images/electrical-technical.png" },
          { name: "Plumbing Guide", href: "/guides/campervan-plumbing-guide", tagline: "Water Systems UK", image: "/images/water-plumbing-technical.png" },
          { name: "Insulation Guide", href: "/guides/how-to-insulate-a-van-uk", tagline: "Silence & Warmth", image: "/images/insulation-technical.png" },
          { name: "Heating Comparison", href: "/guides/campervan-heating-guide", tagline: "Diesel vs Gas", image: "/images/cat-climate.png" },
          { name: "Order of Work", href: "/guides/build-sequence", tagline: "Master Build Timeline", image: "/images/kit-essential.png" },
          { name: "Tyre Guide", href: "/guides/van-conversion-tyres", tagline: "Best Off-Road Rubber", image: "/images/wheels-tyres-technical.png" },
          { name: "Alloy Wheels", href: "/guides/van-alloy-wheels-guide", tagline: "Load-Rated Style", image: "/images/bespoke-iveco.png" },
          { name: "Suspension Upgrades", href: "/guides/van-suspension-upgrade", tagline: "Stop the Sag", image: "/images/bespoke-man.png" },
        ]
      },
      {
        name: "Technical & Brand Hubs",
        items: [
          { name: "Victron Energy Hub", href: "/brands/victron-energy", tagline: "UK Authorised Stockist", image: "/images/victron/brand-hero.jpg" },
          { name: "Truma Specialist Hub", href: "/brands/truma", tagline: "Heating & Hot Water", image: "/images/truma/brand-hero.png" },
          { name: "Propex Gas Hub", href: "/brands/propex", tagline: "British Gas Heating", image: "/images/cat-gas.png" },
          { name: "Fogstar Lithium Hub", href: "/brands/fogstar", tagline: "UK Value Leader", image: "/images/cat-power.png" },
          { name: "Webasto Diesel Hub", href: "/brands/webasto", tagline: "Premium Diesel Heating", image: "/images/heating-system-technical.png" },
          { name: "Fiamma Exterior Hub", href: "/brands/fiamma", tagline: "Awnings & Bike Racks", image: "/images/exterior-equipment-technical.png" },
          { name: "MaxxAir Vent Hub", href: "/brands/maxxair", tagline: "Ultimate Ventilation", image: "/images/cat-climate.png" },
          { name: "Alpicool Value Fridge Hub", href: "/brands/alpicool", tagline: "Budget Compressor Cooling", image: "/images/tech-interior.png" },
          { name: "Dodo Mat Insulation Hub", href: "/brands/dodo-mat", tagline: "Silence & Thermal", image: "/images/cat-insulation.png" },
          { name: "Whale Underslung Hub", href: "/brands/whale", tagline: "Space-Saving Heating", image: "/images/tech-water.png" },
          { name: "Best Heaters 2024", href: "/guides/compare/best-campervan-heaters", tagline: "Diesel vs Gas Debate", image: "/images/heating-system-technical.png" },
        ]
      },
    ]
  },
  { 
    name: "Engineering", 
    href: "/tools", 
    mega: true,
    items: [
      { name: "AI Build Planner", href: "/planner", tagline: "Spec Your Build", image: "/images/systems-showcase.png" },
      { name: "Payload & Balance", href: "/tools/payload-balancer", tagline: "GVM Audit", image: "/images/iveco-daily.png" },
      { name: "Cable Sizing", href: "/tools/cable-calculator", tagline: "Electrical Logic", image: "/images/electrical-technical.png" },
      { name: "Build Plan PDF", href: "/planner/results", tagline: "Paid Build Dossier", image: "/images/sprinter-schematic.png" },
    ]
  },
  { name: "Showcase", href: "/showcase" },
];

export function Navbar() {
  const [links, setLinks] = useState<NavLink[]>(navLinks);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<number>(0);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const pathname = usePathname();
  const isStorePage = pathname?.startsWith('/store');
  const isStoreRoot = pathname === '/store';
  const isLightMode = isStorePage && !isStoreRoot;

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
    // Reset active category for new mega menu
    setActiveCategory(0);
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
      <PromotionBanner />
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group flex flex-col items-center w-fit mt-1">
            <span className={cn(
              "font-display text-[26px] leading-none tracking-[0.25em] flex items-end ml-[0.25em]",
              isLightMode ? "text-[#0A0A0A]" : "text-white"
            )}>
              AMPLIOS<span className="text-brand-orange leading-[0.5] mb-[0.15em] -ml-1">.</span>
            </span>
            <span className={cn(
              "font-mono text-[8px] tracking-[0.5em] pl-[0.5em] uppercase whitespace-nowrap w-full text-center mt-1.5",
              isLightMode ? "text-[#0A0A0A]/60" : "text-brand-grey"
            )}>
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
                    : (isLightMode ? "text-[#0A0A0A]" : "text-brand-white/70")
                )}
              >
                {link.name}
                {link.mega && <ChevronDown className={cn("inline-block ml-1 w-3 h-3 opacity-50 transition-transform", hoveredNav === link.name && "rotate-180")} />}
              </Link>

              {/* Mega Menu Dropdown */}
              {link.mega && (link.items || link.categories) && (
                <div className={cn(
                  "absolute top-full left-0 right-0 border-b transition-all duration-300 overflow-hidden shadow-2xl z-[100]",
                  isLightMode && !isScrolled 
                    ? "bg-white border-slate-200" 
                    : "bg-brand-obsidian border-brand-border",
                  "before:absolute before:-top-8 before:left-0 before:right-0 before:h-8 before:content-['']",
                  hoveredNav === link.name ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
                )}>
                  <div className="container mx-auto px-6 py-12">
                    {link.categories ? (
                      <div className="flex gap-12 min-h-[400px]">
                        {/* Categories Sidebar */}
                        <div className="w-72 border-r border-brand-border/30 pr-8 space-y-2">
                          {link.categories.map((cat, idx) => (
                            <button
                              key={cat.name}
                              onMouseEnter={() => setActiveCategory(idx)}
                              className={cn(
                                "block w-full text-left font-display text-sm uppercase tracking-tighter transition-all duration-300 py-3 px-4",
                                activeCategory === idx 
                                  ? "text-brand-orange bg-brand-orange/5 border-l-2 border-brand-orange" 
                                  : (isLightMode && !isScrolled ? "text-slate-400 hover:text-brand-obsidian hover:bg-slate-50" : "text-brand-grey hover:text-white hover:bg-white/5")
                              )}
                            >
                              {cat.name}
                            </button>
                          ))}
                        </div>
                        
                        {/* Category Items Grid */}
                        <div className="flex-1">
                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
                            {link.categories[activeCategory].items.map((item) => (
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
                    ) : (
                      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
                        {link.items?.map((item) => (
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
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Utility Nav */}
        <div className={cn(
          "flex items-center space-x-6",
          isLightMode ? "text-[#0A0A0A]" : "text-brand-white/80"
        )}>
          <Link 
            href="/client-portal" 
            className={cn(
              "hidden lg:flex items-center gap-2 border px-5 py-2 group/journey transition-all hover:border-brand-orange",
              isLightMode && !isScrolled ? "border-brand-obsidian/20" : "border-brand-border"
            )}
          >
            <Shield className="w-3 h-3 text-brand-orange" />
            <span className={cn(
              "font-display text-[9px] uppercase tracking-widest transition-colors",
              isLightMode ? "text-[#0A0A0A]" : "text-brand-grey group-hover/journey:text-white"
            )}>Command Centre</span>
          </Link>
          <Link 
            href="/planner" 
            className={cn(
              "hidden xl:flex items-center gap-2 px-5 py-2 group/cta transition-all hover:bg-brand-orange",
              isLightMode ? "bg-[#0A0A0A] text-white" : "bg-brand-orange/10 border border-brand-orange/30 text-white"
            )}
          >
            <span className="font-display text-[9px] uppercase tracking-widest group-hover/cta:text-white transition-colors">Build Planner</span>
            <ArrowRight className="w-3 h-3 group-hover/cta:text-white transition-colors" />
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
