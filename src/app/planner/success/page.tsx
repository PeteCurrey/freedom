import { redirect } from "next/navigation";
import { Download, CheckCircle, Car } from "lucide-react";
import Stripe from "stripe";
import Link from "next/link";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: { session_id?: string; build?: string };
}) {
  if (!searchParams.session_id) {
    redirect("/planner");
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2025-02-24.acacia' as any,
  });

  try {
    const session = await stripe.checkout.sessions.retrieve(searchParams.session_id);
    
    if (session.payment_status !== "paid") {
      redirect("/planner");
    }

    return (
      <div className="min-h-screen bg-brand-obsidian text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* Background Grids */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none" />
        
        <div className="w-full max-w-2xl bg-brand-carbon/80 backdrop-blur-md blueprint-border p-12 text-center relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700 shadow-2xl">
           <div className="w-20 h-20 bg-brand-orange/10 border border-brand-orange rounded-full flex items-center justify-center mx-auto mb-8">
             <CheckCircle className="w-10 h-10 text-brand-orange" />
           </div>
           
           <h1 className="font-display text-5xl md:text-6xl uppercase tracking-tight mb-4">Manifest Secured</h1>
           <p className="font-mono text-xs text-brand-grey uppercase tracking-widest mb-12">
             Build ID: {searchParams.build || "UNKNOWN"} // Status: Verified
           </p>

           <div className="bg-black/50 p-6 border border-brand-border/40 text-left space-y-4 mb-12">
             <p className="font-sans text-brand-grey text-sm">
               Your payment was successful. We are now generating your high-resolution Technical Blueprint, including full schematics, 1:20 master diagrams, and your procurement BOM.
             </p>
             <p className="font-sans text-brand-grey text-sm">
               Due to the dynamic nature of these documents, our rendering engine requires approximately 30 seconds to compile the requested assets.
             </p>
           </div>

           <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <a 
               href={`/api/blueprints/generate?buildId=${searchParams.build}`}
               className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-brand-orange text-white font-mono text-[10px] uppercase tracking-widest transition-all hover:bg-white hover:text-brand-orange"
             >
                <Download className="w-4 h-4" /> Download PDF Blueprint
             </a>
             <Link href="/dashboard" className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 border border-brand-border text-white font-mono text-[10px] uppercase tracking-widest hover:border-brand-orange transition-all">
                <Car className="w-4 h-4" /> Go to Dashboard
             </Link>
           </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error retrieving checkout session:", error);
    redirect("/planner");
  }
}
