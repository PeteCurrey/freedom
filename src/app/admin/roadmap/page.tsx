"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, CheckCircle, Clock, AlertTriangle, Target, Lightbulb, TrendingUp, Layers } from "lucide-react";

export default function AdminRoadmapPage() {
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // We would fetch from roadmap_opportunities table here
    // For now, mock data to show the UI
    setOpportunities([
      { id: 1, title: "Bundle 'Beginner Electrics Kit'", category: "revenue", priority: "high", status: "planned", impact: "+£2k MRR" },
      { id: 2, title: "Add Solar Calculator to Tools", category: "feature", priority: "medium", status: "in_progress", impact: "Engagement" },
      { id: 3, title: "Gated Community Showcase", category: "feature", priority: "low", status: "idea", impact: "Retention" },
    ]);
    setLoading(false);
  }, []);

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'critical': return 'text-red-500';
      case 'high': return 'text-brand-orange';
      case 'medium': return 'text-yellow-500';
      default: return 'text-brand-grey';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'revenue': return <TrendingUp size={14} className="text-green-500" />;
      case 'feature': return <Lightbulb size={14} className="text-brand-orange" />;
      case 'integration': return <Layers size={14} className="text-blue-500" />;
      default: return <Target size={14} className="text-brand-grey" />;
    }
  };

  return (
    <div className="p-8 pb-32">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="font-display text-4xl uppercase tracking-tighter text-brand-white mb-2">
            Strategic <span className="text-brand-orange">Roadmap</span>
          </h1>
          <p className="font-mono text-[10px] text-brand-grey uppercase tracking-widest">
            Opportunity Tracking & Feature Pipeline
          </p>
        </div>
        <button className="px-6 py-3 bg-brand-orange text-brand-white font-mono text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all flex items-center gap-2">
          <Plus size={14} /> Log Opportunity
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Status Columns */}
        {['idea', 'planned', 'in_progress'].map((status) => (
          <div key={status} className="space-y-4">
            <h2 className="font-display text-lg uppercase tracking-widest text-brand-white border-b border-brand-border pb-2 mb-4">
              {status.replace('_', ' ')}
            </h2>
            {opportunities.filter(o => o.status === status).map((opp) => (
              <div key={opp.id} className="p-5 bg-brand-carbon border border-brand-border hover:border-brand-orange transition-colors cursor-pointer group">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(opp.category)}
                    <span className="font-mono text-[8px] uppercase tracking-widest text-brand-grey">{opp.category}</span>
                  </div>
                  <span className={`font-mono text-[8px] uppercase tracking-widest ${getPriorityColor(opp.priority)}`}>
                    {opp.priority}
                  </span>
                </div>
                <h3 className="font-mono text-[11px] text-brand-white uppercase tracking-wider mb-4 leading-relaxed group-hover:text-brand-orange transition-colors">
                  {opp.title}
                </h3>
                <div className="flex justify-between items-center pt-3 border-t border-brand-border/50">
                  <span className="font-mono text-[8px] text-brand-grey uppercase tracking-widest">Impact:</span>
                  <span className="font-mono text-[9px] text-green-400 font-bold uppercase tracking-widest">{opp.impact}</span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
