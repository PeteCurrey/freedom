import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, Gauge, Zap, ShieldCheck, Info, CheckCircle, Settings, Truck } from "lucide-react";

export const metadata: Metadata = {
  title: "Upgrading Van Suspension for Conversion UK | Air vs Springs | Amplios",
  description: "Improve ride quality and handle heavy payloads. Our guide to upgrading Mercedes Sprinter and VW Crafter suspension for campervan conversions.",
  openGraph: {
    title: "Upgrading Van Suspension for Conversion UK | Air vs Springs",
    description: "Don't let your van sag. The ultimate guide to suspension upgrades.",
    url: "https://amplios.co.uk/guides/van-suspension-upgrade",
  },
  alternates: { canonical: "https://amplios.co.uk/guides/van-suspension-upgrade" },
};

export default function SuspensionGuide() {
  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[50vh] flex items-end pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/bespoke-iveco.png" // Placeholder
            alt="Van Suspension"
            fill
            className="object-cover opacity-20 grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian via-brand-obsidian/60 to-transparent" />
        </div>
        
        <div className="relative container mx-auto px-6 pb-16 z-10">
          <div className="max-w-4xl">
            <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em] mb-4 block leading-none">
              // HANDLING THE LOAD
            </span>
            <h1 className="font-display text-4xl lg:text-7xl uppercase tracking-tighter text-brand-white leading-[0.9] mb-6">
              RIDE<br /><span className="text-brand-orange">QUALITY</span><br />CONTROL
            </h1>
            <p className="font-sans text-brand-grey text-lg max-w-2xl italic border-l-2 border-brand-orange pl-6">
              A standard panel van is designed to carry weight occasionally. 
              A campervan conversion carries weight constantly. Here is how 
              to stop the sag and improve the drive.
            </p>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          
          <section className="mb-24">
            <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-8">Why Upgrade?</h2>
            <div className="prose prose-invert max-w-none font-sans text-brand-grey text-base leading-relaxed space-y-6">
              <p>
                As you add batteries, water tanks, cabinets, and gear, your van's 
                factory suspension is compressed. This leads to several issues:
              </p>
              <ul className="grid md:grid-cols-2 gap-4 not-prose">
                <li className="flex gap-3 items-center p-4 bg-brand-carbon border border-brand-border">
                  <Truck className="w-4 h-4 text-brand-orange" />
                  <span className="text-xs">Reduced ground clearance at the rear</span>
                </li>
                <li className="flex gap-3 items-center p-4 bg-brand-carbon border border-brand-border">
                  <Settings className="w-4 h-4 text-brand-orange" />
                  <span className="text-xs">Increased body roll on corners</span>
                </li>
                <li className="flex gap-3 items-center p-4 bg-brand-carbon border border-brand-border">
                  <Gauge className="w-4 h-4 text-brand-orange" />
                  <span className="text-xs">'Bottoming out' over speed bumps</span>
                </li>
                <li className="flex gap-3 items-center p-4 bg-brand-carbon border border-brand-border">
                  <ShieldCheck className="w-4 h-4 text-brand-orange" />
                  <span className="text-xs">Vague and wandering steering feel</span>
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-24">
            <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-10">Upgrade Options</h2>
            <div className="space-y-6">
              {[
                { title: "Air Helper Springs", type: "Most Popular", desc: "Airbags that sit between the axle and frame. Allow you to level the van and adjust the stiffness depending on your load. Brands: Dunlop, VB-Airsuspension." },
                { title: "Heavy Duty Springs", type: "Simple & Reliable", desc: "Replacing the factory leaf or coil springs with higher-rate versions. Great for constant heavy builds. Brands: Pedders, Eibach." },
                { title: "Uprated Dampers", type: "Ride Comfort", desc: "Shock absorbers (like Koni Special Active) that react to road conditions to kill the 'bouncy' feel of a heavy van." },
              ].map((item) => (
                <div key={item.title} className="p-8 border border-brand-border bg-brand-carbon/50 space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="font-display text-lg uppercase text-brand-white">{item.title}</h4>
                    <span className="font-mono text-[9px] text-brand-orange uppercase tracking-widest">{item.type}</span>
                  </div>
                  <p className="font-sans text-brand-grey text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-24 p-12 border-2 border-brand-orange bg-brand-carbon/50 text-center">
            <h3 className="font-display text-3xl uppercase tracking-tighter text-brand-white mb-6">Need a GVM Audit?</h3>
            <p className="font-sans text-brand-grey text-base mb-10 max-w-xl mx-auto">
              If your van is sitting low, you may be close to your legal weight 
              limit. Use our Payload Balancer tool to check your distribution 
              before upgrading your suspension.
            </p>
            <Link href="/tools/payload-balancer" className="inline-flex items-center gap-3 bg-brand-orange text-white px-10 py-5 font-display text-xs uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all">
              Launch Payload Balancer <ArrowRight className="w-4 h-4" />
            </Link>
          </section>

        </div>
      </div>

      <Footer />
    </main>
  );
}
