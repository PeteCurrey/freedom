import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SuppliersClient } from "./SuppliersClient";
import { createClient } from "@supabase/supabase-js";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "UK Supplier Network | Freedom Platform",
  description: "Browse our directory of official UK suppliers for Victron, Truma, Webasto, and more. Direct links to trade accounts and off-grid hardware.",
};

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder_key'
);

export default async function SuppliersDirectory() {
  const { data: suppliers } = await supabaseAdmin
    .from('suppliers')
    .select('*')
    .order('name');

  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />
      
      {/* Editorial Hero */}
      <section className="relative pt-48 pb-32 border-b border-brand-border/30 overflow-hidden">
         <div className="absolute inset-0 z-0 opacity-10">
            <div className="blueprint-grid absolute inset-0" />
         </div>
         <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl">
               <div className="flex items-center gap-4 font-mono text-[10px] text-brand-orange uppercase mb-8 tracking-[0.3em]">
                  <span>Infrastructure Nodes</span>
                  <span className="text-brand-grey">/</span>
                  <span>United Kingdom</span>
               </div>
               <h1 className="font-display text-7xl lg:text-9xl mb-8 uppercase leading-tighter tracking-tighter">
                  SUPPLIER <span className="text-brand-orange">NETWORK</span>
               </h1>
               <p className="font-sans text-brand-grey text-xl lg:text-2xl leading-relaxed max-w-2xl">
                  The verified supply chain for professional DIYers. Trade accounts, wholesale distributors, and official brand retailers.
               </p>
            </div>
         </div>
      </section>

      <SuppliersClient initialSuppliers={suppliers || []} />

      <Footer />
    </main>
  );
}
