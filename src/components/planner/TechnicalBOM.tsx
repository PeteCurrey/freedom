'use client';

import React, { useState } from 'react';
import { 
  FileText, 
  ShoppingCart, 
  ExternalLink, 
  Download, 
  Info, 
  CheckCircle2, 
  Package,
  Zap,
  Droplets,
  Thermometer,
  Wind,
  Shield,
  Sparkles,
  Flame,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { systemManifests, ManifestItem } from '@/lib/data/manifests';
import { supplierData } from '@/lib/data/suppliers';
import { generateProductLink } from '@/lib/affiliate';

interface TechnicalBOMProps {
  selections: {
    systems: Record<string, string>;
  };
  isPreview?: boolean;
}

const categoryIcons: Record<string, any> = {
  electrical: Zap,
  lighting: Sparkles,
  heating: Thermometer,
  water: Droplets,
  gas: Flame,
  insulation: Wind,
  security: Shield,
  finishing: Sparkles
};

export function TechnicalBOM({ selections, isPreview = false }: TechnicalBOMProps) {
  const [expandedSystems, setExpandedSystems] = useState<string[]>(Object.keys(selections.systems));

  const toggleSystem = (system: string) => {
    setExpandedSystems(prev => 
      prev.includes(system) ? prev.filter(s => s !== system) : [...prev, system]
    );
  };

  const activeSystems = Object.entries(selections.systems).filter(([_, tierId]) => tierId !== 'none');

  const totalEstimatedCost = activeSystems.reduce((acc, [systemId, tierId]) => {
    const items = systemManifests[systemId]?.[tierId] || [];
    return acc + items.reduce((sum, item) => sum + (item.approxPrice || 0), 0);
  }, 0);

  const handleExportCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,Category,Product,Specification,Recommended Supplier,Estimated Price (£)\n";
    
    activeSystems.forEach(([systemId, tierId]) => {
      const items = systemManifests[systemId]?.[tierId] || [];
      items.forEach(item => {
        csvContent += `${systemId},${item.name},${item.spec || ''},${item.supplierId},${item.approxPrice || 0}\n`;
      });
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "freedom_manifest_bom.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-brand-border/40 pb-8">
        <div>
          <h3 className="font-display text-3xl uppercase tracking-tight text-white mb-2">Technical Bill of Materials</h3>
          <p className="font-mono text-[10px] text-brand-grey uppercase tracking-widest">Master Hardware Ledger & Procurement Manifest</p>
        </div>
        {!isPreview && (
          <div className="flex gap-4">
            <button 
              onClick={handleExportCSV}
              className="flex items-center gap-2 px-5 py-2.5 bg-brand-carbon border border-brand-border hover:border-brand-orange transition-all font-mono text-[10px] uppercase tracking-widest text-white"
            >
              <Download className="w-4 h-4" /> Export CSV
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4">
        {activeSystems.map(([systemId, tierId]) => {
          const items = systemManifests[systemId]?.[tierId] || [];
          const Icon = categoryIcons[systemId] || Package;
          const isExpanded = expandedSystems.includes(systemId);

          if (items.length === 0) return null;

          return (
            <div key={systemId} className="blueprint-border bg-brand-obsidian/40 overflow-hidden transition-all">
              <button 
                onClick={() => toggleSystem(systemId)}
                className="w-full flex items-center justify-between p-6 hover:bg-brand-carbon/20 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-carbon flex items-center justify-center border border-brand-orange/30">
                    <Icon className="w-5 h-5 text-brand-orange" />
                  </div>
                  <div className="text-left">
                    <span className="font-display text-lg uppercase text-white block">{systemId}</span>
                    <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest">Tier {tierId} Manifest</span>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="hidden md:block text-right">
                    <span className="font-mono text-[9px] text-brand-grey uppercase block mb-1">Est. System Cost</span>
                    <span className="font-display text-white italic">£{items.reduce((sum, i) => sum + (i.approxPrice || 0), 0).toLocaleString()}</span>
                  </div>
                  {isExpanded ? <ChevronUp className="w-5 h-5 text-brand-grey" /> : <ChevronDown className="w-5 h-5 text-brand-grey" />}
                </div>
              </button>

              {isExpanded && (
                <div className="border-t border-brand-border/20 px-6 pb-6">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-brand-border/10">
                          <th className="py-4 font-mono text-[9px] text-brand-grey uppercase tracking-widest">Part Identification</th>
                          <th className="py-4 font-mono text-[9px] text-brand-grey uppercase tracking-widest hidden md:table-cell">Technical Specification</th>
                          <th className="py-4 font-mono text-[9px] text-brand-grey uppercase tracking-widest">Supplier</th>
                          <th className="py-4 font-mono text-[9px] text-brand-grey uppercase tracking-widest text-right">Procure</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-brand-border/10">
                        {items.map((item, idx) => {
                          const supplier = supplierData.find(s => s.id === item.supplierId);
                          const shopLink = generateProductLink(item.name, supplier?.website || '#', item.supplierId);

                          return (
                            <tr key={idx} className="group hover:bg-white/5 transition-colors">
                              <td className="py-5 pr-4">
                                <div className="flex flex-col">
                                  <span className="font-display text-sm text-white uppercase group-hover:text-brand-orange transition-colors">{item.name}</span>
                                  <span className="font-mono text-[9px] text-brand-grey uppercase tracking-tighter">{item.category}</span>
                                </div>
                              </td>
                              <td className="py-5 pr-4 hidden md:table-cell">
                                <span className="font-sans text-xs text-brand-grey">{item.spec || 'Standard Specification'}</span>
                              </td>
                              <td className="py-5 pr-4">
                                <div className="flex flex-col">
                                  <span className="font-mono text-[10px] text-white uppercase">{supplier?.name || item.supplierId}</span>
                                  {supplier?.status === 'active_trade' && (
                                    <span className="flex items-center gap-1 font-mono text-[8px] text-green-500 uppercase">
                                      <CheckCircle2 className="w-2 h-2" /> Trade Account
                                    </span>
                                  )}
                                </div>
                              </td>
                              <td className="py-5 text-right">
                                <a 
                                  href={shopLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 px-4 py-2 bg-brand-orange/10 border border-brand-orange/30 text-brand-orange hover:bg-brand-orange hover:text-white transition-all font-mono text-[9px] uppercase tracking-widest"
                                >
                                  Shop <ExternalLink className="w-3 h-3" />
                                </a>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="blueprint-border bg-brand-carbon p-8 flex flex-col md:flex-row justify-between items-center gap-6 border-l-4 border-brand-orange">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-brand-orange/10 flex items-center justify-center">
            <Info className="w-6 h-6 text-brand-orange" />
          </div>
          <div>
            <span className="font-mono text-[9px] text-brand-grey uppercase tracking-widest block mb-1">Pricing Notice</span>
            <p className="font-sans text-xs text-brand-grey max-w-md leading-relaxed">
              Estimates reflect median UK market pricing for new hardware. Trade accounts via the <span className="text-brand-white">Freedom Partner Hub</span> may yield 5-15% discounts on Victron and Truma components.
            </p>
          </div>
        </div>
        <div className="text-right">
          <span className="font-mono text-[10px] text-brand-grey uppercase tracking-[0.2em] block mb-2">Total Est. Hardware Cost</span>
          <span className="font-display text-5xl text-white italic">£{totalEstimatedCost.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
