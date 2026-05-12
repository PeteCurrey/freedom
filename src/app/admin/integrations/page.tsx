"use client";

import { Shield, Key, Mail, CreditCard, BarChart2, AlertCircle, CheckCircle2, Copy, RefreshCw } from "lucide-react";

export default function IntegrationsVault() {
  const integrations = [
    {
      id: "stripe",
      name: "Stripe",
      type: "Payment Gateway",
      icon: CreditCard,
      status: "connected",
      lastSync: "2 mins ago",
      keys: [
        { label: "Publishable Key", value: "pk_test_...8x9F", type: "public" },
        { label: "Secret Key", value: "sk_test_...mP2Q", type: "secret" },
        { label: "Webhook Secret", value: "whsec_...kL9A", type: "secret" },
      ],
      description: "Handles all store transactions, digital blueprints, and active quote conversions."
    },
    {
      id: "resend",
      name: "Resend",
      type: "Email Operations",
      icon: Mail,
      status: "connected",
      lastSync: "1 hour ago",
      keys: [
        { label: "API Key", value: "re_...v8N2", type: "secret" },
        { label: "Verified Domain", value: "amplios.co.uk", type: "public" },
      ],
      description: "Delivers automated purchase receipts, engineering quote updates, and system alerts."
    },
    {
      id: "ga4",
      name: "Google Analytics 4",
      type: "Telemetry & Tracking",
      icon: BarChart2,
      status: "disconnected",
      lastSync: "Never",
      keys: [
        { label: "Measurement ID", value: "G-XXXXXXXXXX", type: "public" },
      ],
      description: "Provides high-resolution tracking of user drop-offs during the AI Build Planner."
    },
    {
      id: "gmc",
      name: "Google Merchant Center",
      type: "Sales Channels",
      icon: CreditCard, // We'll just use CreditCard or add another icon if needed
      status: "disconnected",
      lastSync: "Never",
      keys: [
        { label: "Service Account", value: "amplios-rv.json", type: "secret" },
      ],
      description: "Submit your products to Google Shopping (Organic and Paid listings) via real-time Content API."
    }
  ];

  return (
    <div className="p-8 space-y-12 max-w-7xl mx-auto animate-in fade-in duration-500">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="font-display text-4xl uppercase tracking-tighter text-slate-900 mb-1 flex items-center gap-4">
            Integration <span className="text-brand-orange">Vault</span>
            <Shield className="w-8 h-8 text-brand-orange/20" />
          </h1>
          <p className="font-mono text-[10px] text-slate-500 uppercase tracking-[0.2em]">Secure API Key Management & Infrastructure Routing</p>
        </div>
        <div className="flex gap-4">
           <button className="bg-slate-900 text-white hover:bg-brand-orange rounded-lg px-6 py-3 font-mono text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center gap-2">
              <RefreshCw className="w-4 h-4" /> Sync All Connections
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {integrations.map((int) => {
          const isConnected = int.status === "connected";
          return (
            <div key={int.id} className={`border rounded-2xl p-8 transition-all ${
              isConnected ? "bg-white border-slate-200 shadow-sm" : "bg-slate-50 border-slate-200 opacity-75"
            }`}>
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${
                    isConnected ? "bg-brand-orange/10 border-brand-orange/20 text-brand-orange" : "bg-slate-100 border-slate-200 text-slate-400"
                  }`}>
                    <int.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="font-display text-2xl text-slate-900 tracking-tight">{int.name}</h2>
                    <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest font-bold">{int.type}</span>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full border flex items-center gap-2 font-mono text-[9px] font-bold uppercase tracking-widest ${
                  isConnected ? "bg-emerald-50 border-emerald-200 text-emerald-600" : "bg-slate-100 border-slate-300 text-slate-500"
                }`}>
                  {isConnected ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                  {int.status}
                </div>
              </div>

              <p className="text-sm text-slate-600 mb-8 leading-relaxed">
                {int.description}
              </p>

              <div className="space-y-4 mb-8">
                {int.keys.map((k, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-lg group">
                    <div>
                      <span className="block font-mono text-[9px] text-slate-400 uppercase tracking-widest font-bold mb-1">
                        {k.label}
                      </span>
                      <span className="font-mono text-xs text-slate-700">
                        {k.type === 'secret' && !isConnected ? '••••••••••••••••' : k.value}
                      </span>
                    </div>
                    <button className="text-slate-400 hover:text-brand-orange transition-colors opacity-0 group-hover:opacity-100">
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                <span className="font-mono text-[9px] text-slate-400 uppercase tracking-widest">
                  Last Sync: {int.lastSync}
                </span>
                <button className={`font-mono text-[10px] font-bold uppercase tracking-widest px-6 py-2 rounded-lg transition-colors ${
                  isConnected 
                    ? "bg-slate-100 text-slate-600 hover:bg-red-50 hover:text-red-600" 
                    : "bg-slate-900 text-white hover:bg-brand-orange"
                }`}>
                  {isConnected ? "Disconnect" : "Configure"}
                </button>
              </div>
            </div>
          );
        })}

        {/* Placeholder for Add New Integration */}
        <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:border-brand-orange/50 hover:bg-brand-orange/5 transition-all cursor-pointer min-h-[300px]">
          <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-4">
            <Key className="w-6 h-6 text-slate-400" />
          </div>
          <h3 className="font-display text-xl text-slate-900 tracking-tight mb-2">Add New Integration</h3>
          <p className="font-mono text-[10px] text-slate-500 uppercase tracking-widest max-w-[200px]">
            Connect Webhooks, CRM, or external analytics
          </p>
        </div>
      </div>
    </div>
  );
}
