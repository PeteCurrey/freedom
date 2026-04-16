import Link from "next/link";

const Instagram = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const Facebook = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Twitter = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-1 2.18-4.19 2.73c0 0 1.21.3 2.14 1.72s-1.83 1.13-2.63.96c0 0-1.72 5.39-7.14 5.39-3 0-6-1.5-6-1.5s1.42 5.09 6.53 5.09c0 0-5.73 3.41-10.7 1.14 0 0 7.3 4.14 12.63 0 0 0 5.4 0 9.5-5.32 0 0 1.12-1 1.21-1.3z" />
  </svg>
);

const Youtube = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" /><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

const footerLinks = [
  {
    title: "About",
    links: [
      { name: "Our Story", href: "/about" },
      { name: "Community Showcase", href: "/showcase" },
      { name: "Engineering Tools", href: "/tools/cable-calculator" },
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
    title: "Engineering",
    links: [
      { name: "Cable Sizing Tool", href: "/tools/cable-calculator" },
      { name: "Electrical & Solar", href: "/systems/electrical-solar" },
      { name: "Heating & Hot Water", href: "/systems/heating-hot-water" },
      { name: "Tech Standards", href: "/resources" },
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
          <div className="flex flex-col gap-4">
            <p className="font-mono text-[10px] text-brand-grey uppercase tracking-widest">
              © {new Date().getFullYear()} DIY MOTORHOMES. Part of the Avorria family.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[9px] text-brand-grey/50 uppercase tracking-widest">A signature build by</span>
                <a href="https://avorria.co.uk" target="_blank" rel="noopener noreferrer" className="font-display text-[11px] text-brand-white hover:text-brand-orange transition-colors">AVORRIA</a>
              </div>
              
              {/* Founder Signature Integration */}
              <div className="h-8 w-24 relative opacity-80 hover:opacity-100 transition-opacity">
                <svg viewBox="0 0 120 40" className="w-full h-full text-brand-white fill-none stroke-current" style={{ strokeWidth: 1.2, strokeLinecap: 'round', strokeLinejoin: 'round' }}>
                  {/* Replicating the provided high-fidelity signature path */}
                  <path d="M15 30c2-1 8-5 12-12s5-15 0-18-12 5-10 15 8 18 20 12 15-15 10-22-12-5-15 5 2 20 15 22 25-5 25-15-10-15-18-5c-5 6-2 15 5 18 10 4 25-10 45-12" />
                  <path d="M75 18c5-2 12-5 15-2s2 10-5 12-15-5-12-15 10-12 18-5 5 15-5 18-20-2-15-15" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:items-end gap-6 text-right">
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
            
            <div className="flex flex-col items-end">
               <span className="font-mono text-[8px] text-brand-grey uppercase tracking-[0.3em] font-medium pr-1">Pete Currey // Founder</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
