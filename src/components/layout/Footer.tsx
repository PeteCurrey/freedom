import Link from "next/link";
import { Mail, Instagram, Facebook, Twitter, Youtube } from "lucide-react";

const footerLinks = [
  {
    title: "About",
    links: [
      { name: "Our Story", href: "/about" },
      { name: "Community Showcase", href: "/showcase" },
      { name: "Contact Us", href: "/contact" },
      { name: "Privacy Policy", href: "/privacy" },
    ],
  },
  {
    title: "Quick Links",
    links: [
      { name: "Base Vehicles", href: "/vehicles" },
      { name: "Build Systems", href: "/systems" },
      { name: "Resources Library", href: "/resources" },
      { name: "Online Store", href: "/store" },
    ],
  },
  {
    title: "Build Systems",
    links: [
      { name: "Electrical & Solar", href: "/systems/electrical-solar" },
      { name: "Heating & Hot Water", href: "/systems/heating-hot-water" },
      { name: "Water & Plumbing", href: "/systems/water-plumbing" },
      { name: "Insulation & Vent", href: "/systems/insulation-ventilation" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-brand-carbon border-t border-brand-border pt-24 pb-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-24">
          {/* Brand Col */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <span className="font-display text-2xl text-brand-white">DIY MOTORHOMES</span>
            </Link>
            <p className="font-sans text-brand-grey text-sm mb-8 max-w-sm leading-relaxed">
              Definitive resources and premium gear for serious self-build motorhome and campervan
              conversions. Engineering excellence for the road ahead.
            </p>
            <div className="flex space-x-4">
              {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                <Link
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full border border-brand-border flex items-center justify-center text-brand-grey hover:text-brand-orange hover:border-brand-orange transition-all"
                >
                  <Icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Links Cols */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="font-display text-[10px] tracking-[0.2em] text-brand-white uppercase mb-8">
                {group.title}
              </h4>
              <ul className="space-y-4">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="font-sans text-brand-grey text-sm hover:text-brand-orange transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="blueprint-border p-8 lg:p-12 mb-24 relative overflow-hidden group">
          <div className="blueprint-grid absolute inset-0 pointer-events-none opacity-20" />
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-md">
              <h3 className="font-display text-2xl mb-2">JOIN THE BUILD</h3>
              <p className="font-sans text-brand-grey text-sm">
                Weekly guides, product drops, and community builds. No fluff.
              </p>
            </div>
            <form className="flex-1 max-w-md flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-brand-obsidian border border-brand-border px-6 py-4 flex-1 font-mono text-xs uppercase tracking-widest focus:outline-none focus:border-brand-orange"
              />
              <button className="bg-brand-orange text-white px-8 py-4 font-display text-xs uppercase tracking-widest hover:bg-brand-orange/90 transition-colors">
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-brand-border gap-6">
          <p className="font-mono text-[10px] text-brand-grey uppercase tracking-widest">
            © {new Date().getFullYear()} DIY MOTORHOMES. Part of the Avorria family.
          </p>
          <div className="flex items-center space-x-8">
            <Link
              href="/privacy"
              className="font-mono text-[10px] text-brand-grey uppercase tracking-widest hover:text-brand-orange"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="font-mono text-[10px] text-brand-grey uppercase tracking-widest hover:text-brand-orange"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
