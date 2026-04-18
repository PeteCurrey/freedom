import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import ComplianceAudit from "@/components/tools/ComplianceAudit";
import { ClipboardCheck, Info, ArrowLeft, Terminal, ShieldAlert, FileText } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Compliance Audit & Safety Checklist | Amplios",
  description: "Verify your van conversion against UK legal standards and technical safety regulations for gas, electrical, and structural integrity.",
};

export default function ComplianceCheckerPage() {
  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      <section className="pt-48 pb-24">
        <div className="container mx-auto px-6">
          <div className="mb-20">
            <Link href="/tools" className="inline-flex items-center gap-2 font-mono text-[10px] text-brand-grey uppercase tracking-widest hover:text-brand-orange transition-colors mb-8">
              <ArrowLeft className="w-3 h-3" /> Back to Tools Hub
            </Link>
            <div className="flex items-center gap-3 mb-6">
               <Terminal className="text-brand-orange w-4 h-4" />
               <p className="font-mono text-[10px] text-brand-orange uppercase tracking-[.4em] italic">// MODULE: LEGAL_INTEGRITY_02</p>
            </div>
            <h1 className="font-display text-5xl lg:text-7xl uppercase mb-8 leading-none tracking-tighter">
              COMPLIANCE <span className="text-brand-orange">AUDIT</span> HUB
            </h1>
            <p className="font-sans text-brand-grey text-xl max-w-3xl leading-relaxed">
              Achieve professional certification standards. Our structured audit framework verifies your build against DVLA motorcaravan criteria and critical British Standards (BS EN) for habitation safety.
            </p>
          </div>

          <ComplianceAudit />

          {/* Legal Framework context */}
          <div className="mt-48 grid grid-cols-1 lg:grid-cols-2 gap-24 border-t border-brand-border pt-24">
             <div className="space-y-8">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 blueprint-border flex items-center justify-center text-brand-orange">
                      <ShieldAlert className="w-6 h-6" />
                   </div>
                   <h3 className="font-display text-3xl uppercase italic leading-none">BS EN 1949:2021</h3>
                </div>
                <p className="font-sans text-brand-grey text-lg leading-relaxed">
                   The definitive standard for the installation of LPG systems for habitation purposes in leisure vehicles. Compliance here is non-negotiable for insurance coverage and life-safety.
                </p>
             </div>
             <div className="space-y-8">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 blueprint-border flex items-center justify-center text-brand-orange">
                      <FileText className="text-brand-orange w-6 h-6" />
                   </div>
                   <h3 className="font-display text-3xl uppercase italic leading-none">DVLA Reclassification</h3>
                </div>
                <p className="font-sans text-brand-grey text-lg leading-relaxed">
                   While current UK rules make V5C reclassification difficult, following these guidelines ensures your vehicle is technically recognized as a motorcaravan for insurance and speed-limit purposes.
                </p>
             </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
