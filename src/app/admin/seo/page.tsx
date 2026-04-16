"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Search, 
  BarChart3, 
  TrendingUp, 
  Globe, 
  FileText,
  Plus,
  ArrowRight,
  AlertCircle,
  Zap,
  Globe2,
  LineChart
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function SEOHubPage() {
  const [research, setResearch] = useState<any[]>([]);
  const [hasApiKey, setHasApiKey] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkSetup() {
      const { data: settings } = await supabase
        .from('admin_settings')
        .select('*')
        .eq('service', 'dataforseo')
        .single();
      
      setHasApiKey(!!settings?.api_key);
      
      const { data: researchData } = await supabase
        .from('seo_research')
        .select('*')
        .order('created_at', { ascending: false });
        
      setResearch(researchData || []);
      setLoading(false);
    }
    checkSetup();
  }, []);

  if (loading) return null;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <div className="flex items-center gap-2 font-mono text-[10px] text-brand-orange uppercase tracking-[0.3em] mb-4">
            <Search size={12} /> Search Engine Hub: seo.delta
          </div>
          <h1 className="font-display text-5xl uppercase tracking-tighter text-white">
            SEO <span className="text-brand-orange">Strategist</span>
          </h1>
        </div>
        
        <div className="flex gap-4">
           <Link 
             href="/admin/seo/generator"
             className="px-8 py-4 bg-brand-orange text-white font-mono text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all flex items-center gap-2"
           >
             <Plus size={14} /> Generate Content
           </Link>
        </div>
      </div>

      {!hasApiKey && (
        <div className="blueprint-border p-12 bg-brand- carbon border-dashed border-brand-orange/30 mb-12 text-center">
           <AlertCircle className="w-12 h-12 text-brand-orange mx-auto mb-6" />
           <h3 className="font-display text-2xl uppercase mb-2">Technical Disruption Detected</h3>
           <p className="font-mono text-xs text-brand-grey uppercase tracking-widest max-w-sm mx-auto mb-8">
             SEO intelligence tools (DataforSEO / GSC) are currently disconnected. 
             Analysis and gap-finding are running in manual mode.
           </p>
           <Link href="/admin/settings" className="px-8 py-4 bg-brand-obsidian border border-brand-border text-brand-grey font-mono text-[10px] uppercase tracking-widest hover:border-brand-orange transition-all">
             Restore API Credentials
           </Link>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {[
          { label: "Tracked Keywords", value: "482", icon: BarChart3, trend: "+12%" },
          { label: "Est. Organic Traffic", value: "12.4K", icon: TrendingUp, trend: "+5.2%" },
          { label: "Competitor Market Share", value: "18.5%", icon: Globe, trend: "-0.8%" },
        ].map((stat, i) => (
          <div key={i} className="blueprint-border p-8 bg-brand-carbon group">
            <div className="flex justify-between items-start mb-6">
              <div className="w-10 h-10 bg-brand-obsidian border border-brand-border flex items-center justify-center text-brand-orange">
                <stat.icon size={20} />
              </div>
              <span className={cn("font-mono text-[10px]", stat.trend.startsWith('+') ? "text-green-500" : "text-red-500")}>
                {stat.trend}
              </span>
            </div>
            <span className="block font-mono text-[9px] text-brand-grey uppercase tracking-widest mb-1">{stat.label}</span>
            <span className="block font-display text-3xl text-white">{stat.value}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
        {/* Keyword Gap Analysis */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="font-display text-xl uppercase tracking-tighter">Keyword Intelligence</h2>
            <button className="flex items-center gap-2 font-mono text-[10px] text-brand-orange uppercase tracking-widest hover:underline">
               Perform New Scan <ArrowRight size={12} />
            </button>
          </div>
          <div className="blueprint-border bg-brand-carbon overflow-hidden">
             <table className="w-full text-left">
                <thead>
                   <tr className="bg-brand-obsidian border-b border-brand-border font-mono text-[10px] uppercase tracking-widest text-brand-grey">
                      <th className="p-4">Target Phrase</th>
                      <th className="p-4">Volume</th>
                      <th className="p-4">KD%</th>
                      <th className="p-4">Opportunity</th>
                   </tr>
                </thead>
                <tbody className="font-sans text-xs">
                   {[
                     { phrase: "sprinter van conversion kit uk", vol: "2.4K", kd: "45", opp: "High" },
                     { phrase: "best insulation for campervan", vol: "5.8K", kd: "62", opp: "Medium" },
                     { phrase: "off grid electrical setup guide", vol: "1.2K", kd: "32", opp: "High" },
                     { phrase: "fiat ducato interior furniture", vol: "900", kd: "28", opp: "Critical" },
                   ].map((k, i) => (
                     <tr key={i} className="border-b border-brand-border/50 hover:bg-brand-obsidian transition-colors">
                        <td className="p-4 font-display text-[11px] uppercase text-white">{k.phrase}</td>
                        <td className="p-4 font-mono text-brand-grey">{k.vol}</td>
                        <td className="p-4 font-mono text-brand-grey">{k.kd}</td>
                        <td className="p-4">
                           <span className={cn(
                             "px-2 py-0.5 border font-mono text-[8px] uppercase tracking-widest",
                             k.opp === 'Critical' ? "text-brand-orange border-brand-orange" : "text-brand-grey border-brand-border"
                           )}>{k.opp}</span>
                        </td>
                     </tr>
                   ))}
                </tbody>
             </table>
          </div>
        </div>

        {/* Competitor Analysis */}
        <div className="space-y-6">
          <h2 className="font-display text-xl uppercase tracking-tighter text-brand-orange">Competitor Field Monitor</h2>
          <div className="space-y-4">
            {[
              { site: "roadandmountains.com", authority: 42, gap: 14, status: "stable" },
              { site: "vanlifeoutfitters.com", authority: 58, gap: 28, status: "rising" },
              { site: "diycamper.uk", authority: 35, gap: 5, status: "caution" },
            ].map((c, i) => (
              <div key={i} className="blueprint-border p-6 bg-brand-obsidian flex flex-col gap-6">
                 <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                       <Globe2 size={16} className="text-brand-grey" />
                       <span className="font-display text-lg uppercase text-white">{c.site}</span>
                    </div>
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      c.status === 'rising' ? "bg-green-500" : "bg-brand-orange"
                    )} />
                 </div>
                 
                 <div className="grid grid-cols-2 gap-8">
                    <div>
                       <span className="block font-mono text-[8px] text-brand-grey uppercase tracking-widest mb-1">Domain Authority</span>
                       <div className="flex items-center gap-2">
                          <div className="flex-1 h-1 bg-brand-carbon border border-brand-border overflow-hidden">
                             <div className="h-full bg-brand-orange" style={{ width: `${c.authority}%` }} />
                          </div>
                          <span className="font-mono text-[10px] text-white">{c.authority}</span>
                       </div>
                    </div>
                    <div>
                       <span className="block font-mono text-[8px] text-brand-grey uppercase tracking-widest mb-1">Content Gaps</span>
                       <span className="font-display text-xl text-brand-orange">{c.gap} High-Value</span>
                    </div>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
