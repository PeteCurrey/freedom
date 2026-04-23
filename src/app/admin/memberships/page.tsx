"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Users, Crown, Shield, Activity, Settings, RefreshCw, CreditCard } from "lucide-react";

export default function AdminMembershipsPage() {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // We would fetch from profiles table joining auth.users here
    // Mocking for now to show UI
    setMembers([
      { id: '1', email: 'petercurrey@gmail.com', tier: 'elite', status: 'active', joined: '2024-03-01' },
      { id: '2', email: 'j.smith@example.com', tier: 'pro', status: 'active', joined: '2024-04-10' },
      { id: '3', email: 'd.walker@example.com', tier: 'free', status: 'inactive', joined: '2024-04-15' },
    ]);
    setLoading(false);
  }, []);

  return (
    <div className="p-8 pb-32">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="font-display text-4xl uppercase tracking-tighter text-brand-white mb-2">
            Membership <span className="text-brand-orange">Control</span>
          </h1>
          <p className="font-mono text-[10px] text-brand-grey uppercase tracking-widest">
            Subscription & Access Management
          </p>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-3 border border-brand-border text-brand-grey font-mono text-[10px] uppercase tracking-widest hover:border-brand-orange hover:text-brand-white transition-all flex items-center gap-2">
            <RefreshCw size={14} /> Sync Stripe
          </button>
          <button className="px-6 py-3 bg-brand-orange text-brand-white font-mono text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all flex items-center gap-2">
            <Settings size={14} /> Plan Config
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="p-6 bg-brand-carbon border border-brand-border">
          <div className="flex justify-between items-start mb-4">
            <Crown className="text-brand-orange" size={20} />
            <span className="text-green-500 font-mono text-[9px]">+12%</span>
          </div>
          <p className="font-mono text-[9px] text-brand-grey uppercase tracking-widest mb-1">Active Pros</p>
          <p className="font-display text-3xl text-brand-white">245</p>
        </div>
        <div className="p-6 bg-brand-carbon border border-brand-border">
          <div className="flex justify-between items-start mb-4">
            <CreditCard className="text-blue-500" size={20} />
            <span className="text-green-500 font-mono text-[9px]">+5%</span>
          </div>
          <p className="font-mono text-[9px] text-brand-grey uppercase tracking-widest mb-1">MRR (Subscriptions)</p>
          <p className="font-display text-3xl text-brand-white">£4,290</p>
        </div>
        <div className="p-6 bg-brand-carbon border border-brand-border">
          <div className="flex justify-between items-start mb-4">
            <Activity className="text-red-500" size={20} />
            <span className="text-red-500 font-mono text-[9px]">-2%</span>
          </div>
          <p className="font-mono text-[9px] text-brand-grey uppercase tracking-widest mb-1">Churn Rate</p>
          <p className="font-display text-3xl text-brand-white">3.2%</p>
        </div>
      </div>

      {/* Members List */}
      <div className="bg-brand-carbon border border-brand-border overflow-hidden">
        <div className="px-6 py-4 border-b border-brand-border flex justify-between items-center bg-brand-obsidian/50">
          <h2 className="font-mono text-[11px] text-brand-white uppercase tracking-widest">Recent Members</h2>
        </div>
        <div className="divide-y divide-brand-border">
          {members.map((member) => (
            <div key={member.id} className="p-6 flex items-center justify-between hover:bg-brand-obsidian transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-brand-obsidian border border-brand-border flex items-center justify-center text-brand-grey">
                  <Users size={16} />
                </div>
                <div>
                  <p className="font-mono text-[11px] text-brand-white tracking-widest">{member.email}</p>
                  <p className="font-mono text-[9px] text-brand-grey tracking-widest uppercase mt-1">Joined: {member.joined}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <span className={`px-2 py-1 text-[8px] uppercase tracking-widest font-bold font-mono ${member.tier === 'elite' ? 'bg-brand-orange text-white' : member.tier === 'pro' ? 'bg-blue-500 text-white' : 'bg-brand-border text-brand-grey'}`}>
                    {member.tier}
                  </span>
                </div>
                <div className="w-24 text-right">
                  <span className={`font-mono text-[9px] uppercase tracking-widest ${member.status === 'active' ? 'text-green-500' : 'text-brand-grey'}`}>
                    {member.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
