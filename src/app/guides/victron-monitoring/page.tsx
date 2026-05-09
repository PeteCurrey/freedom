import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { VictronSidebar } from "@/components/editorial/VictronSidebar";
import { RelatedProducts } from "@/components/editorial/RelatedProducts";
import { ArrowRight, Smartphone, Monitor, Globe, Wifi, Thermometer, Navigation, Battery } from "lucide-react";

export const metadata: Metadata = {
  title: "Victron Monitoring Guide UK | Cerbo GX, VRM & VictronConnect | Amplios",
  description: "How to monitor your Victron system: VictronConnect app, Cerbo GX touchscreen, and VRM portal explained. Battery %, solar yield and remote alerts — all free.",
  openGraph: {
    title: "Victron Monitoring Guide UK | Cerbo GX, VRM & VictronConnect",
    description: "Monitor your Victron system from anywhere with Cerbo GX, VRM portal and the free VictronConnect app.",
    url: "https://amplios.co.uk/guides/victron-monitoring",
  },
  alternates: { canonical: "https://amplios.co.uk/guides/victron-monitoring" },
};

const TOC = [
  { id: "intro", label: "Three monitoring layers" },
  { id: "victronconnect", label: "VictronConnect App" },
  { id: "cerbo-gx", label: "Cerbo GX + GX Touch" },
  { id: "vrm", label: "VRM Portal" },
  { id: "connections", label: "What Cerbo GX Connects To" },
  { id: "vrm-features", label: "VRM Dashboard Features" },
  { id: "shop", label: "Shop Monitoring" },
];

const CERBO_CONNECTIONS = [
  { icon: Wifi, label: "MultiPlus-II / Quattro", detail: "via VE.Bus" },
  { icon: Battery, label: "SmartSolar MPPT controllers", detail: "via VE.Direct (up to 5)" },
  { icon: Battery, label: "SmartShunt / BMV battery monitors", detail: "via VE.Direct" },
  { icon: Globe, label: "Lynx Smart BMS / Lynx Distributor", detail: "via VE.Can" },
  { icon: Thermometer, label: "Tank level sensors", detail: "via generic inputs" },
  { icon: Thermometer, label: "Temperature probes", detail: "via generic inputs" },
  { icon: Navigation, label: "GPS dongle", detail: "route and location tracking" },
  { icon: Wifi, label: "WiFi / LAN / 4G dongle", detail: "for VRM portal connection" },
];

const VRM_FEATURES = [
  "Solar production vs consumption graphs",
  "Battery state of charge over time",
  "AC input/output detailed logs",
  "Remote alarm configuration and push notifications",
  "Generator control rules and auto-start",
  "Share access with installer for remote support",
  "Historical data export",
  "Multiple system management from one login",
];

const MENTIONED_PRODUCTS = [
  { name: "Cerbo GX", brand: "Victron Energy", price: 29500, slug: "victron-cerbo-gx" },
  { name: "GX Touch 50", brand: "Victron Energy", price: 18500, slug: "victron-gx-touch-50" },
  { name: "SmartShunt 500A", brand: "Victron Energy", price: 11500, slug: "victron-smartshunt-500a" },
];

export default function VictronMonitoringGuide() {
  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-[55vh] flex items-end pt-24">
        <div className="absolute inset-0 bg-brand-carbon overflow-hidden">
          <Image
            src="/images/victron/monitoring-hero.jpg"
            alt="Victron monitoring: Cerbo GX, VRM portal and VictronConnect app"
            fill
            className="object-cover opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian via-brand-obsidian/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-obsidian/80 to-transparent" />
        </div>
        <div className="relative container mx-auto px-6 pb-16">
          <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em] mb-4 block">
            // VICTRON MONITORING
          </span>
          <h1 className="font-display text-4xl lg:text-6xl uppercase tracking-tight text-brand-white leading-[1] mb-4">
            Cerbo GX, VRM<br />+ VictronConnect
          </h1>
          <p className="font-sans text-brand-grey text-lg max-w-2xl">
            Know your battery state of charge, solar input, and AC load from anywhere in the world — for free.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16">
        <div className="flex gap-12">
          <div className="flex-1 min-w-0">

            {/* INTRO */}
            <section id="intro" className="mb-16 scroll-mt-28">
              <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white mb-6">
                Three monitoring layers
              </h2>
              <p className="font-sans text-brand-grey text-base leading-relaxed max-w-3xl mb-8">
                Victron's monitoring ecosystem works in three layers, each building on the last — from a simple
                Bluetooth app on your phone to a full remote dashboard accessible anywhere in the world.
                All three are free to use.
              </p>

              <div className="grid md:grid-cols-3 gap-4 mb-8">
                {[
                  { num: "01", label: "VictronConnect App", desc: "Bluetooth — within 10m of the device" },
                  { num: "02", label: "Cerbo GX + GX Touch", desc: "Local dashboard — anywhere in the van" },
                  { num: "03", label: "VRM Portal", desc: "Remote — anywhere in the world" },
                ].map((l) => (
                  <div key={l.num} className="bg-brand-carbon border border-brand-border p-5">
                    <span className="font-display text-3xl text-brand-orange/30 mb-2 block">{l.num}</span>
                    <h3 className="font-display text-sm uppercase tracking-tight text-brand-white mb-1">{l.label}</h3>
                    <p className="font-sans text-[11px] text-brand-grey">{l.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* VICTRONCONNECT */}
            <section id="victronconnect" className="mb-16 scroll-mt-28">
              <div className="flex items-center gap-3 mb-4">
                <Smartphone className="w-6 h-6 text-brand-orange" />
                <span className="font-mono text-[9px] text-brand-orange uppercase tracking-[0.3em]">// LAYER 1</span>
              </div>
              <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white mb-6">
                VictronConnect App
              </h2>
              <div className="space-y-4 font-sans text-brand-grey text-base leading-relaxed max-w-3xl">
                <p>
                  The starting point. VictronConnect connects directly to any Bluetooth-enabled Victron device —
                  SmartSolar MPPT, SmartShunt, MultiPlus-II, Orion-Tr Smart — and gives you real-time data,
                  configuration access, and firmware updates. <strong className="text-brand-white">No internet required.</strong>{" "}
                  Works within Bluetooth range (approximately 10 metres).
                </p>
                <div className="bg-brand-carbon border border-brand-border p-5 mt-4">
                  <span className="font-mono text-[9px] text-brand-orange uppercase tracking-widest mb-3 block">What you can see</span>
                  <div className="grid grid-cols-2 gap-2">
                    {["Battery voltage", "State of charge %", "Solar input watts", "AC load", "Historical data", "Alarm notifications", "Configuration access", "Firmware updates"].map((item) => (
                      <div key={item} className="flex items-center gap-2 text-sm text-brand-grey">
                        <span className="w-1.5 h-1.5 bg-brand-orange rounded-full flex-shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* CERBO GX */}
            <section id="cerbo-gx" className="mb-16 scroll-mt-28">
              <div className="flex items-center gap-3 mb-4">
                <Monitor className="w-6 h-6 text-brand-orange" />
                <span className="font-mono text-[9px] text-brand-orange uppercase tracking-[0.3em]">// LAYER 2</span>
              </div>
              <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white mb-6">
                Cerbo GX + GX Touch
              </h2>
              <div className="space-y-4 font-sans text-brand-grey text-base leading-relaxed max-w-3xl">
                <p>
                  The Cerbo GX is the communication hub of a full Victron system. It connects to every component
                  via VE.Bus (MultiPlus), VE.Direct (MPPT, SmartShunt), and CAN bus (some battery BMS units),
                  aggregating all data into a single dashboard.
                </p>
                <p>
                  The <strong className="text-brand-white">GX Touch 50</strong> (5 inch) or{" "}
                  <strong className="text-brand-white">GX Touch 70</strong> (7 inch) screen mounts anywhere in
                  the van — showing battery %, solar yield, AC consumption, and tank levels in real time.
                  The GX Touch is optional — the Cerbo GX also connects to the VRM portal remotely without a screen.
                </p>
              </div>
            </section>

            {/* VRM */}
            <section id="vrm" className="mb-16 scroll-mt-28">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="w-6 h-6 text-brand-orange" />
                <span className="font-mono text-[9px] text-brand-orange uppercase tracking-[0.3em]">// LAYER 3</span>
              </div>
              <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white mb-6">
                VRM Portal — remote, free
              </h2>
              <div className="space-y-4 font-sans text-brand-grey text-base leading-relaxed max-w-3xl">
                <p>
                  The VRM (Victron Remote Monitoring) portal is a free web and app-based platform that stores
                  historical data, shows real-time system status, allows remote configuration changes, and sends
                  push notifications for alarms.
                </p>
                <p>
                  Connect the Cerbo GX to the internet via WiFi, ethernet, or 4G dongle — and you can monitor
                  your van from anywhere in the world. Your dealer or installer can also access the system remotely
                  to diagnose issues before they become problems.
                </p>
              </div>
            </section>

            {/* CERBO CONNECTIONS */}
            <section id="connections" className="mb-16 scroll-mt-28">
              <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white mb-6">
                What Cerbo GX connects to
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {CERBO_CONNECTIONS.map((c) => (
                  <div key={c.label} className="flex items-start gap-3 p-4 bg-brand-carbon border border-brand-border">
                    <c.icon className="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-sans text-sm text-brand-white block">{c.label}</span>
                      <span className="font-mono text-[10px] text-brand-grey">{c.detail}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* VRM FEATURES */}
            <section id="vrm-features" className="mb-16 scroll-mt-28">
              <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white mb-6">
                VRM dashboard features
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {VRM_FEATURES.map((f) => (
                  <div key={f} className="flex items-start gap-3 p-4 bg-brand-carbon border border-brand-border">
                    <span className="w-1.5 h-1.5 bg-brand-orange rounded-full flex-shrink-0 mt-2" />
                    <span className="font-sans text-sm text-brand-grey">{f}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* SHOP */}
            <section id="shop" className="mb-12 scroll-mt-28 p-8 bg-brand-carbon border border-brand-orange/40">
              <span className="font-mono text-[9px] text-brand-orange uppercase tracking-[0.3em] mb-2 block">// SHOP MONITORING</span>
              <h2 className="font-display text-xl uppercase tracking-tight text-brand-white mb-3">
                Shop Cerbo GX & GX Touch displays
              </h2>
              <p className="font-sans text-brand-grey text-sm mb-6">
                Available from Amplios — the UK's authorised Victron stockist.
              </p>
              <Link href="/store/electrical-core?sub=monitoring" className="inline-flex items-center gap-2 bg-brand-orange text-white px-6 py-3 font-display text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all font-bold">
                Shop Monitoring Products <ArrowRight className="w-4 h-4" />
              </Link>
            </section>

            {/* RELATED */}
            <div className="pt-12 border-t border-brand-border">
              <RelatedProducts products={MENTIONED_PRODUCTS} />
              
              <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest mb-4 mt-16 block">Related Guides</span>
              <div className="flex flex-wrap gap-4">
                <Link href="/brands/victron-energy" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">Victron Energy Hub →</Link>
                <Link href="/guides/victron-system-guide" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">System Selector Guide →</Link>
                <Link href="/guides/victron-multiplus-ii" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">MultiPlus-II Guide →</Link>
                <Link href="/guides/why-victron-energy" className="text-sm text-brand-grey hover:text-brand-orange transition-colors">Is Victron Worth It? →</Link>
              </div>
            </div>
          </div>

          <VictronSidebar items={TOC} currentPage="/guides/victron-monitoring" />
        </div>
      </div>

      <Footer />
    </main>
  );
}
