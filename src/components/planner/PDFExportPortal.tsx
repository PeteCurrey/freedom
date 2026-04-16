"use client";

import React from 'react';
import { PDFDownloadLink } from "@react-pdf/renderer";
import { BlueprintPDF } from "@/components/blueprint/BlueprintPDF";
import { Download } from "lucide-react";

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
  const safeData = {
    ...data,
    vehicleName: data.vehicleName || "Unknown Chassis",
    configId: data.configId || "Standard",
    buildId: data.buildId || "PENDING",
    tier: data.tier || "Standard",
    totalWeight: data.totalWeight || 0,
    bom: data.bom || []
  };

  return (
    <PDFDownloadLink 
      document={<BlueprintPDF data={safeData} />}
      fileName="Amplios-Build-Plan.pdf"
      className="w-full flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-brand-grey hover:text-brand-white p-4 border border-brand-border transition-all"
    >
      {/* @ts-ignore */}
      {({ loading }) => (
        <>
          <Download className="w-4 h-4" /> 
          {loading ? "Preparing PDF..." : "Export Summary (Free)"}
        </>
      )}
    </PDFDownloadLink>
  );
};

export default PDFExportPortal;
