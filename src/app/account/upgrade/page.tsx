"use client";

import { useState } from "react";
import { Crown, Check, Loader2, Zap } from "lucide-react";
import { supabase } from "@/lib/supabase";

const plans = [
  {
    id: "pro",
    name: "Amplios Pro",
    monthlyPrice: 9,
    annualPrice: 79,
    description: "For serious self-builders",
    features: [
      "Unlimited saved build plans",
      "5% off all build kits in the store",
      "Priority blueprint PDF generation",
      "Access to premium guides & downloads",
      "Community showcase pro badge",
    ],
    cta: "Start Pro",
    highlight: false,
  },
  {
    id: "elite",
    name: "Amplios Elite",
    monthlyPrice: 19,
    annualPrice: 149,
    description: "For professionals & coaches",
    features: [
      "Everything in Pro",
      "Unlimited blueprint PDFs",
      "3D CAD layout files",
      "Compliance document templates (V5C, gas certs)",
      "Build consultation credit (1/month)",
      "Priority support access",
    ],
    cta: "Start Elite",
    highlight: true,
  },
];

export default function MembershipUpgradePage() {
  const [billing, setBilling] = useState<"monthly" | "annual">("annual");
  const [loading, setLoading] = useState<string | null>(null);

  const handleUpgrade = async (planId: string) => {
    setLoading(planId);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        window.location.href = "/account/login?redirect=/account/upgrade";
        return;
      }

      const res = await fetch("/api/stripe/membership", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          userEmail: user.email,
          plan: planId,
          billing,
        }),
      });

      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else throw new Error(data.error || "Checkout failed");
    } catch (err: any) {
      console.error(err);
      alert("Could not initiate checkout. Please try again.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <main className="min-h-screen bg-brand-black text-brand-white">
      <section className="py-24 px-6 max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 font-mono text-[10px] text-brand-orange uppercase tracking-[0.3em] mb-6">
            <Crown size={12} /> Membership Tiers
          </div>
          <h1 className="font-display text-5xl md:text-7xl uppercase tracking-tighter mb-4">
            Build <span className="text-brand-orange">Smarter</span>
          </h1>
          <p className="font-sans text-brand-grey max-w-lg mx-auto">
            Unlock the full Amplios platform. Unlimited builds, premium downloads, and exclusive kit discounts.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <button
            onClick={() => setBilling("monthly")}
            className={`font-mono text-[10px] uppercase tracking-widest px-4 py-2 border transition-all ${
              billing === "monthly" ? "border-brand-orange text-white bg-brand-orange" : "border-brand-border text-brand-grey hover:border-brand-orange"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBilling("annual")}
            className={`font-mono text-[10px] uppercase tracking-widest px-4 py-2 border transition-all ${
              billing === "annual" ? "border-brand-orange text-white bg-brand-orange" : "border-brand-border text-brand-grey hover:border-brand-orange"
            }`}
          >
            Annual <span className="text-green-400 ml-1">Save ~30%</span>
          </button>
        </div>

        {/* Plan Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`p-8 border flex flex-col ${
                plan.highlight
                  ? "border-brand-orange bg-brand-orange/5"
                  : "border-brand-border bg-brand-carbon"
              }`}
            >
              {plan.highlight && (
                <div className="bg-brand-orange text-white font-mono text-[8px] uppercase tracking-widest px-3 py-1 self-start mb-4">
                  Most Popular
                </div>
              )}

              <h2 className="font-display text-3xl uppercase tracking-tighter mb-1">{plan.name}</h2>
              <p className="font-mono text-[9px] text-brand-grey uppercase tracking-widest mb-6">{plan.description}</p>

              <div className="mb-8">
                <span className="font-display text-5xl text-white">
                  £{billing === "annual" ? plan.annualPrice : plan.monthlyPrice * 12}
                </span>
                <span className="font-mono text-[10px] text-brand-grey ml-2">
                  / {billing === "annual" ? "year" : "month"}
                </span>
                {billing === "annual" && (
                  <div className="font-mono text-[9px] text-green-400 mt-1 uppercase tracking-widest">
                    £{plan.monthlyPrice}/mo equivalent
                  </div>
                )}
              </div>

              <ul className="space-y-3 mb-10 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-brand-orange mt-0.5 shrink-0" />
                    <span className="font-sans text-sm text-brand-grey">{f}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleUpgrade(plan.id)}
                disabled={loading === plan.id}
                className={`w-full py-4 font-mono text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${
                  plan.highlight
                    ? "bg-brand-orange text-white hover:bg-white hover:text-brand-orange"
                    : "bg-brand-obsidian text-white border border-brand-border hover:border-brand-orange"
                } disabled:opacity-50 disabled:cursor-wait`}
              >
                {loading === plan.id ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</>
                ) : (
                  <><Zap className="w-4 h-4" /> {plan.cta}</>
                )}
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
