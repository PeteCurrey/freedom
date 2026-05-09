import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RelatedProducts } from "@/components/editorial/RelatedProducts";
import { ArrowRight, Shield, Zap, Sun, Umbrella, CheckCircle, Settings, Home } from "lucide-react";

export const metadata: Metadata = {
  title: "Fiamma UK | Authorised Dealer | Awnings & Bike Racks | Amplios",
  description: "Fiamma is the world's leading manufacturer of RV accessories. Explore the F80s roof awning, Carry-Bike racks, and Turbo-Vent solutions. UK authorised stockist.",
  openGraph: {
    title: "Fiamma UK | Authorised Dealer | Amplios",
    description: "Explore the Fiamma F80s and Carry-Bike ranges. Quality Italian engineering for your van.",
    url: "https://amplios.co.uk/brands/fiamma",
  },
  alternates: { canonical: "https://amplios.co.uk/brands/fiamma" },
};

const STATS = [
  { value: "1945", label: "Founded in Italy" },
  { value: "GLOBAL", label: "Market Leader" },
  { value: "UK", label: "Full Spare Support" },
  { value: "ISO", label: "Quality Certified" },
];

const WHY_FIAMMA = [
  {
    icon: Umbrella,
    title: "Instant Outdoor Living",
    body: "The F80s roof awning provides over 3 metres of shaded outdoor space in under 60 seconds. Perfect for the unpredictable UK weather.",
  },
  {
    icon: Shield,
    title: "Structural Integrity",
    body: "Fiamma's bracket systems are engineered specifically for each van model, ensuring a secure and safe attachment to the vehicle chassis or roof.",
  },
  {
    icon: Home,
    title: "Complete Privacy",
    body: "Transform your awning into a full room with the Privacy Room system — creating a weather-sealed extension of your living space.",
  },
  {
    icon: Settings,
    title: "Spare Parts Availability",
    body: "Fiamma is unique in offering a complete catalogue of individual spare parts, ensuring your investment is repairable for years to come.",
  },
  {
    icon: Sun,
    title: "UV Protection",
    body: "Multi-layer vinyl fabrics provide 100% UV protection and are washable, flame retardant, and rot-proof.",
  },
];

const PRODUCT_RANGE = [
  {
    name: "F80s Roof Awnings",
    desc: "The low-profile roof-mounted standard for modern vans like the Sprinter and Ducato.",
    href: "/store/exterior-equipment?sub=awnings",
  },
  {
    name: "Carry-Bike Racks",
    desc: "Specifically designed racks for rear doors, including high-weight e-bike variants.",
    href: "/store/exterior-equipment?sub=bike-racks",
  },
  {
    name: "Turbo-Vent Fans",
    desc: "Compact 12V ventilation with transparent lids for maximum natural light.",
    href: "/store/solar-roof?sub=fans",
  },
  {
    name: "Water Tanks",
    desc: "Portable and fixed fresh/waste water solutions for off-grid travel.",
    href: "/store/water-plumbing?sub=tanks",
  },
  {
    name: "Levelling Systems",
    desc: "The original Level Up range for ensuring a level sleep on uneven ground.",
    href: "/store/exterior-equipment?sub=levelling",
  },
];

const MENTIONED_PRODUCTS = [
  { name: "Fiamma F80s Awning - 320 Black", brand: "Fiamma", price: 84500, slug: "fiamma-f80s-roof-awning-320-deep-black" },
  { name: "Fiamma Carry-Bike Sprinter/Crafter", brand: "Fiamma", price: 42500, slug: "fiamma-carry-bike-sprinter" },
  { name: "Fiamma Turbo-Vent Premium", brand: "Fiamma", price: 18500, slug: "fiamma-turbo-vent-premium" },
];

export default function FiammaBrandHub() {
  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-[70vh] flex items-end">
        <div className="absolute inset-0 bg-brand-carbon">
          <Image
            src="/images/man-tge-hero.png" // Placeholder
            alt="Fiamma van accessories"
            fill
            className="object-cover opacity-40 grayscale hover:grayscale-0 transition-all duration-1000"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-obsidian via-brand-obsidian/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian/80 to-transparent" />
        </div>

        <div className="relative container mx-auto px-6 pb-20 pt-40">
          <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em] mb-4 block">
            // AUTHORISED UK STOCKIST
          </span>
          <h1 className="font-display text-5xl lg:text-7xl uppercase tracking-tight text-brand-white leading-[1] mb-4">
            FIAMMA <span className="text-brand-orange">ITALY</span>
          </h1>
          <p className="font-display text-xl lg:text-2xl text-brand-grey italic mb-2">
            Outdoor Living, Perfected. Engineering Freedom since 1945.
          </p>
          <p className="font-sans text-brand-grey/80 text-base mb-8 max-w-xl">
            From the world's most popular roof awnings to model-specific bike racks, Fiamma is the standard for exterior campervan equipment.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/store/exterior-equipment"
              className="inline-flex items-center gap-3 bg-brand-orange text-white px-8 py-4 font-display text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all font-bold"
            >
              Shop Fiamma Range <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/guides/fiamma/f80s-awning-installation"
              className="inline-flex items-center gap-3 border border-brand-border text-white px-8 py-4 font-display text-[10px] uppercase tracking-widest hover:border-brand-orange transition-all font-bold"
            >
              Installation Guides
            </Link>
          </div>
        </div>
      </section>

      {/* INTRO 2-COL */}
      <section className="py-20 border-t border-brand-border">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <span className="font-mono text-[9px] text-brand-orange uppercase tracking-[0.3em] mb-4 block">
                // EXTERIOR SPECIALISTS
              </span>
              <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-6">
                Expanding your boundaries
              </h2>
              <div className="space-y-4 font-sans text-brand-grey text-base leading-relaxed">
                <p>
                  Fiamma has been at the forefront of the RV industry for over 75 years. Their Italian-designed products are synonymous with quality and ease of use, becoming the de-facto choice for both OEM manufacturers and DIY converters.
                </p>
                <p>
                  For the modern van builder, Fiamma offers more than just a place to sit. Their awning and bike rack systems are engineered to integrate seamlessly with the structural points of your vehicle, ensuring that your external equipment is as robust as the interior of your build.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {STATS.map((stat) => (
                <div key={stat.label} className="bg-brand-carbon border border-brand-border p-6 flex flex-col items-center justify-center text-center group hover:border-brand-orange transition-colors">
                  <span className="font-display text-4xl text-brand-orange mb-2 group-hover:scale-110 transition-transform">{stat.value}</span>
                  <span className="font-mono text-[10px] text-brand-grey uppercase tracking-widest">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY FIAMMA GRID */}
      <section className="py-20 bg-brand-carbon border-y border-brand-border">
        <div className="container mx-auto px-6">
          <div className="mb-12">
            <span className="font-mono text-[9px] text-brand-orange uppercase tracking-[0.3em] mb-2 block">
              // TECHNICAL SUPERIORITY
            </span>
            <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white">
              Why Professionals Choose Fiamma
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_FIAMMA.map((item) => (
              <div key={item.title} className="bg-brand-obsidian border border-brand-border p-6 hover:border-brand-orange/40 transition-colors">
                <item.icon className="w-6 h-6 text-brand-orange mb-4" />
                <h3 className="font-display text-sm uppercase tracking-tight text-brand-white mb-3">
                  {item.title}
                </h3>
                <p className="font-sans text-brand-grey text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
            {/* Guide Cross-link */}
            <div className="bg-brand-obsidian border border-brand-orange/40 p-6 flex flex-col justify-between">
              <div>
                <span className="font-mono text-[9px] text-brand-orange uppercase tracking-widest mb-2 block">Decision Support</span>
                <h3 className="font-display text-sm uppercase tracking-tight text-brand-white mb-3">
                  F80s Installation
                </h3>
                <p className="font-sans text-brand-grey text-sm leading-relaxed">
                  Mounting a 30kg awning requires precision. Our guide covers bracket positioning, adhesive bonding, and final tensioning.
                </p>
              </div>
              <Link href="/guides/fiamma/f80s-awning-installation" className="inline-flex items-center gap-2 mt-4 text-brand-orange font-mono text-[10px] uppercase tracking-widest hover:gap-3 transition-all">
                Read the guide <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT RANGE GRID */}
      <section className="py-20 border-b border-brand-border">
        <div className="container mx-auto px-6">
          <div className="mb-12">
            <span className="font-mono text-[9px] text-brand-orange uppercase tracking-[0.3em] mb-2 block">
              // EXTERIOR ACCESSORIES
            </span>
            <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white">
              Shop by Fiamma category
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PRODUCT_RANGE.map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                className="group flex items-start gap-4 p-5 bg-brand-carbon border border-brand-border hover:border-brand-orange transition-all"
              >
                <CheckCircle className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-display text-sm uppercase tracking-tight text-brand-white group-hover:text-brand-orange transition-colors mb-1">
                    {cat.name}
                  </h3>
                  <p className="font-sans text-brand-grey text-[12px] leading-relaxed">{cat.desc}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-brand-grey/30 group-hover:text-brand-orange ml-auto flex-shrink-0 mt-0.5 transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-32 bg-[#050505] relative overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="font-display text-4xl lg:text-6xl uppercase tracking-tighter text-white mb-8">
            The Great <span className="text-brand-orange italic">Outdoors.</span>
          </h2>
          <p className="font-sans text-brand-grey text-xl max-w-2xl mx-auto mb-12">
            Professional exterior equipment designed for the road. Trusted by adventurers since 1945.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/store/exterior-equipment" className="bg-brand-orange text-white px-10 py-5 font-display text-[12px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all font-bold shadow-2xl">
              Browse All Fiamma
            </Link>
            <Link href="/planner" className="border border-brand-border text-white px-10 py-5 font-display text-[12px] uppercase tracking-widest hover:bg-brand-carbon transition-all font-bold">
              AI Build Planner
            </Link>
          </div>

          <div className="mt-24">
            <RelatedProducts products={MENTIONED_PRODUCTS} />
            
            <div className="mt-20 flex flex-wrap justify-center gap-8">
              <Link href="/guides/fiamma/f80s-awning-installation" className="font-mono text-[10px] text-brand-grey hover:text-brand-orange uppercase tracking-widest transition-colors flex items-center gap-2">
                F80s Installation Guide <ArrowRight className="w-3 h-3" />
              </Link>
              <Link href="/store/exterior-equipment?sub=bike-racks" className="font-mono text-[10px] text-brand-grey hover:text-brand-orange uppercase tracking-widest transition-colors flex items-center gap-2">
                Carry-Bike Range <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
