"use client";

import React from 'react';
import { Download, Lock } from "lucide-react";

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
  return (
    <div className="w-full flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-brand-grey p-4 border border-brand-border/50 bg-brand-obsidian/50">
      <div className="flex items-center gap-2 text-brand-orange/70">
         <Lock className="w-4 h-4" /> 
         <span>Preview Locked</span>
      </div>
      <div>
         Save plan to generate PDF
      </div>
    </div>
  );
};

export default PDFExportPortal;
