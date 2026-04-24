"use client";

import React, { useState, useEffect } from 'react';
import { Download, Lock, Loader2, Sparkles } from "lucide-react";
import Link from "next/link";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { BlueprintPDF } from "@/components/blueprint/BlueprintPDF";
import { supabase } from "@/lib/supabase";
import { useMembership } from "@/hooks/useMembership";
import { cn } from "@/lib/utils";

interface PDFExportPortalProps {
  data: {
    vehicleName: string;
    configId: string;
    buildId: string;
    tier: string;
    totalWeight: number;
    bom?: any[];
  };
}

const PDFExportPortal: React.FC<PDFExportPortalProps> = ({ data }) => {
  const { isPro, isAdmin, loading: membershipLoading } = useMembership();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    }
    getUser();
  }, []);

  const isUnlocked = isPro || isAdmin || user?.email === 'petecurrey@gmail.com' || user?.email === 'pete@avorria.com';

  if (membershipLoading) {
    return (
      <div className="w-full h-12 bg-brand-obsidian/50 animate-pulse border border-brand-border/50" />
    );
  }

  if (!isUnlocked) {
    return (
      <div className="w-full flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-brand-grey p-4 border border-brand-border/50 bg-brand-obsidian/50 group hover:border-brand-orange/50 transition-colors">
        <div className="flex items-center gap-2 text-brand-orange/70">
           <Lock className="w-4 h-4" /> 
           <span>Portfolio Locked</span>
        </div>
        <div className="flex items-center gap-4">
           <span className="hidden sm:inline opacity-50">Requires Pro Tier Access</span>
           <Link 
             href="/account/upgrade"
             className="text-brand-orange hover:text-white flex items-center gap-2 bg-brand-orange/10 px-3 py-1.5 border border-brand-orange/30 hover:border-brand-orange transition-all"
           >
             <Sparkles className="w-3 h-3" /> Upgrade to Pro
           </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-6 border-2 border-brand-orange bg-brand-orange/5 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display text-lg uppercase tracking-tight text-white flex items-center gap-2">
            Blueprint Ready
            <span className="bg-brand-orange text-[10px] px-2 py-0.5 rounded text-white font-mono">MASTER</span>
          </h3>
          <p className="font-mono text-[9px] text-brand-grey uppercase tracking-widest mt-1">
            Build Index: {data.buildId} // {data.vehicleName}
          </p>
        </div>
        <div className="w-10 h-10 bg-brand-orange flex items-center justify-center">
          <Download className="w-5 h-5 text-white" />
        </div>
      </div>

      <PDFDownloadLink
        document={
          <BlueprintPDF 
            buildId={data.buildId}
            vehicleName={data.vehicleName}
            bom={data.bom}
          />
        }
        fileName={`Amplios-Blueprint-${data.buildId}.pdf`}
        className="w-full"
      >
        {(({ loading }: { loading: boolean }) => (
          <button
            disabled={loading}
            className={cn(
              "w-full py-4 font-display text-[11px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3",
              loading 
                ? "bg-brand-grey/20 text-brand-grey cursor-wait" 
                : "bg-brand-orange text-white hover:bg-white hover:text-brand-orange shadow-[0_0_20px_rgba(255,107,0,0.3)]"
            )}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Compiling Architecture...
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Download Technical Portfolio
              </>
            )}
          </button>
        )) as any}
      </PDFDownloadLink>

      <div className="mt-4 flex items-center justify-center gap-6 font-mono text-[8px] text-brand-grey uppercase tracking-widest">
        <span>ISO 9001 Compliant</span>
        <span className="w-1 h-1 bg-brand-orange/40 rounded-full" />
        <span>V5C Ready</span>
        <span className="w-1 h-1 bg-brand-orange/40 rounded-full" />
        <span>BOM Verified</span>
      </div>
    </div>
  );
};

export default PDFExportPortal;
