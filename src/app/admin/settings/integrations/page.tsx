"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  BarChart3, 
  Search, 
  Globe, 
  CreditCard, 
  ShoppingBag, 
  Mail, 
  Link as LinkIcon, 
  MessageSquare,
  ShieldCheck,
  AlertCircle,
  Clock,
  ExternalLink,
  ChevronRight,
  Plus
} from "lucide-react";
import { IntegrationCard } from "@/components/admin/integrations/IntegrationCard";
import { cn } from "@/lib/utils";

export default function IntegrationsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Analytics", "Sales Channels", "Marketing", "Email", "Affiliate", "Communication"];

  const handleSave = async (id: string, data: any): Promise<void> => {
    console.log(`Saving ${id}:`, data);
    return new Promise(resolve => setTimeout(resolve, 1000));
  };

  const handleTest = async (id: string): Promise<boolean> => {
    console.log(`Testing ${id}`);
    return new Promise<boolean>(resolve => setTimeout(() => resolve(Math.random() > 0.2), 1500));
  };

  const integrations = [
    // ANALYTICS
    {
      id: "ga4",
      category: "Analytics",
      name: "Google Analytics 4",
      description: "Connect GA4 to see sessions, pageviews, and conversion data directly in your dashboard.",
      status: "not_connected" as "connected" | "not_connected" | "error",
      logo: <BarChart3 className="text-[#F9AB00]" size={24} />,
      setupGuideUrl: "https://support.google.com/analytics/answer/9304153",
      fields: [
        { id: "measurement_id", label: "Measurement ID", type: "text" as const, placeholder: "G-XXXXXXXXXX", required: true },
        { id: "api_secret", label: "API Secret", type: "password" as const, description: "For Measurement Protocol (optional)" },
        { id: "service_account", label: "Service Account JSON", type: "file" as const, description: "Required for Admin API access" }
      ]
    },
    {
      id: "gsc",
      category: "Analytics",
      name: "Google Search Console",
      description: "Track keyword rankings, impressions, and index coverage for amplios.co.uk.",
      status: "not_connected" as "connected" | "not_connected" | "error",
      logo: <Search className="text-[#4285F4]" size={24} />,
      fields: [
        { id: "site_url", label: "Site Property URL", type: "text" as const, placeholder: "https://amplios.co.uk", required: true },
        { id: "service_email", label: "Service Account Email", type: "text" as const, description: "Grant read access to this email in GSC" }
      ]
    },
    {
      id: "gtm",
      category: "Analytics",
      name: "Google Tag Manager",
      description: "Manage all your tracking pixels and scripts without code changes.",
      status: "not_connected" as "connected" | "not_connected" | "error",
      logo: <Globe className="text-[#246FDB]" size={24} />,
      fields: [
        { id: "container_id", label: "Container ID", type: "text" as const, placeholder: "GTM-XXXXXXX", required: true }
      ]
    },
    // SALES CHANNELS
    {
      id: "stripe",
      category: "Sales Channels",
      name: "Stripe",
      description: "Power your store payments and see real-time revenue analytics.",
      status: "not_connected" as "connected" | "not_connected" | "error",
      logo: <CreditCard className="text-[#635BFF]" size={24} />,
      fields: [
        { id: "publishable_key", label: "Publishable Key", type: "password" as const, placeholder: "pk_live_...", required: true },
        { id: "secret_key", label: "Secret Key", type: "password" as const, placeholder: "sk_live_...", required: true },
        { id: "webhook_secret", label: "Webhook Signing Secret", type: "password" as const, placeholder: "whsec_...", required: true }
      ]
    },
    {
      id: "ebay",
      category: "Sales Channels",
      name: "eBay Developer",
      description: "List products to eBay UK and sync inventory and orders automatically.",
      status: "not_connected" as "connected" | "not_connected" | "error",
      logo: <ShoppingBag className="text-[#E53238]" size={24} />,
      fields: [
        { id: "app_id", label: "App ID (Client ID)", type: "text" as const, required: true },
        { id: "dev_id", label: "Dev ID", type: "text" as const, required: true },
        { id: "cert_id", label: "Cert ID (Client Secret)", type: "password" as const, required: true },
        { id: "auth_token", label: "User Auth Token", type: "password" as const, description: "Use the button below to authorize" }
      ]
    },
    {
      id: "amazon",
      category: "Sales Channels",
      name: "Amazon Seller (SP-API)",
      description: "Connect to Amazon UK to list products and sync merchant-fulfilled orders.",
      status: "not_connected" as "connected" | "not_connected" | "error",
      logo: <ShoppingBag className="text-[#FF9900]" size={24} />,
      fields: [
        { id: "seller_id", label: "Seller ID (Merchant Token)", type: "text" as const, required: true },
        { id: "marketplace_id", label: "Marketplace ID", type: "text" as const, placeholder: "A1F83G8C2ARO7P", required: true },
        { id: "aws_access_key", label: "AWS Access Key ID", type: "text" as const, required: true },
        { id: "aws_secret_key", label: "AWS Secret Access Key", type: "password" as const, required: true },
        { id: "role_arn", label: "Role ARN", type: "text" as const, required: true }
      ]
    },
    {
      id: "onbuy",
      category: "Sales Channels",
      name: "OnBuy.com",
      description: "The UK's fastest growing marketplace. Ideal for automotive and build parts.",
      status: "not_connected" as "connected" | "not_connected" | "error",
      logo: <ShoppingBag className="text-[#00BFFF]" size={24} />,
      fields: [
        { id: "api_key", label: "API Key", type: "password" as const, required: true },
        { id: "site_id", label: "Site ID", type: "text" as const, placeholder: "2000 (UK)", required: true }
      ]
    },
    // MARKETING
    {
      id: "gmc",
      category: "Marketing",
      name: "Google Merchant Center",
      description: "Submit your products to Google Shopping (Organic and Paid listings).",
      status: "not_connected" as "connected" | "not_connected" | "error",
      logo: <ShoppingBag className="text-[#4285F4]" size={24} />,
      fields: [
        { id: "merchant_id", label: "Merchant ID", type: "text" as const, required: true },
        { id: "feed_url", label: "Feed URL", type: "text" as const, description: "https://amplios.co.uk/api/feeds/google-merchant" }
      ]
    },
    {
      id: "meta",
      category: "Marketing",
      name: "Meta Shopping",
      description: "Sync your catalog to Facebook and Instagram Shops and Shopping Ads.",
      status: "not_connected" as "connected" | "not_connected" | "error",
      logo: <ShoppingBag className="text-[#0668E1]" size={24} />,
      fields: [
        { id: "bm_id", label: "Business Manager ID", type: "text" as const, required: true },
        { id: "catalog_id", label: "Catalog ID", type: "text" as const, required: true },
        { id: "access_token", label: "Access Token", type: "password" as const, required: true }
      ]
    },
    {
      id: "pinterest",
      category: "Marketing",
      name: "Pinterest Shopping",
      description: "Reach van conversion enthusiasts with shoppable Pins.",
      status: "not_connected" as "connected" | "not_connected" | "error",
      logo: <ShoppingBag className="text-[#E60023]" size={24} />,
      fields: [
        { id: "app_id", label: "App ID", type: "text" as const, required: true },
        { id: "access_token", label: "Access Token", type: "password" as const, required: true }
      ]
    },
    // EMAIL
    {
      id: "resend",
      category: "Email",
      name: "Resend",
      description: "Used for order confirmations, newsletters, and blueprint deliveries.",
      status: "not_connected" as "connected" | "not_connected" | "error",
      logo: <Mail className="text-slate-900" size={24} />,
      fields: [
        { id: "api_key", label: "API Key", type: "password" as const, placeholder: "re_...", required: true },
        { id: "from_email", label: "From Email", type: "text" as const, placeholder: "pete@amplios.co.uk", required: true },
        { id: "from_name", label: "From Name", type: "text" as const, placeholder: "Pete at Amplios", required: true }
      ]
    },
    // AFFILIATE
    {
      id: "epn",
      category: "Affiliate",
      name: "eBay Partner Network",
      description: "Earn commission when users buy from your eBay affiliate links.",
      status: "not_connected" as "connected" | "not_connected" | "error",
      logo: <LinkIcon className="text-[#E53238]" size={24} />,
      fields: [
        { id: "campaign_id", label: "Campaign ID", type: "text" as const, required: true },
        { id: "custom_id", label: "Custom ID", type: "text" as const }
      ]
    },
    {
      id: "amazon_assoc",
      category: "Affiliate",
      name: "Amazon Associates",
      description: "The standard for product recommendations and affiliate revenue.",
      status: "not_connected" as "connected" | "not_connected" | "error",
      logo: <LinkIcon className="text-[#FF9900]" size={24} />,
      fields: [
        { id: "tracking_id", label: "Tracking ID", type: "text" as const, placeholder: "amplios-21", required: true }
      ]
    },
    // COMMUNICATION
    {
      id: "supabase",
      category: "Communication",
      name: "Supabase",
      description: "Core database and authentication provider. (Read-only via env vars).",
      status: "connected" as "connected" | "not_connected" | "error",
      logo: <MessageSquare className="text-[#3ECF8E]" size={24} />,
      fields: []
    }
  ];

  const filteredIntegrations = activeCategory === "All" 
    ? integrations 
    : integrations.filter(i => i.category === activeCategory);

  const stats = {
    total: integrations.length,
    active: integrations.filter(i => i.status === 'connected').length,
    error: integrations.filter(i => i.status === 'error').length,
    missing: integrations.filter(i => i.status === 'not_connected').length
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tighter flex items-center gap-3">
             Integrations & <span className="text-brand-orange underline decoration-brand-orange/20">Credentials</span>
          </h1>
          <p className="text-slate-500 text-sm mt-1">Connect your platforms to power analytics, channel listing, and marketing automation.</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl px-6 py-4 flex gap-8 shadow-sm">
           <div className="flex flex-col">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Connected</span>
              <span className="text-xl font-bold text-slate-900">{stats.active} of {stats.total}</span>
           </div>
           <div className="flex flex-col">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Warnings</span>
              <span className="text-xl font-bold text-slate-900">{stats.error}</span>
           </div>
           <div className="flex flex-col">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Inactive</span>
              <span className="text-xl font-bold text-slate-900">{stats.missing}</span>
           </div>
        </div>
      </div>

      <div className="flex items-center gap-4 border-b border-slate-200 overflow-x-auto no-scrollbar pb-1">
         {categories.map(cat => (
           <button
             key={cat}
             onClick={() => setActiveCategory(cat)}
             className={cn(
               "px-4 py-3 text-[10px] font-bold uppercase tracking-[0.2em] whitespace-nowrap transition-all border-b-2",
               activeCategory === cat 
                 ? "border-brand-orange text-brand-orange" 
                 : "border-transparent text-slate-400 hover:text-slate-600"
             )}
           >
             {cat}
           </button>
         ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {filteredIntegrations.map(integration => (
           <IntegrationCard
             key={integration.id}
             {...integration}
             onSave={handleSave}
             onTest={handleTest}
           />
         ))}
      </div>

      <div className="bg-slate-900 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 mt-12 border border-slate-800 relative overflow-hidden">
         <div className="absolute top-0 right-0 p-8 opacity-10">
            <ShieldCheck size={120} className="text-white" />
         </div>
         <div className="relative z-10 max-w-xl">
            <h3 className="text-xl font-bold text-white mb-2">Secure Credential Storage</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Your API keys and secrets are stored in an encrypted vault. They are only ever decrypted 
              server-side for the purpose of making authorized requests to the third-party platforms. 
              Client-side code only ever sees masked values.
            </p>
         </div>
         <Link 
           href="/admin/roadmap" 
           className="relative z-10 px-6 py-3 bg-white/10 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-white/20 transition-all flex items-center gap-2"
         >
           Security Policy <ExternalLink size={12} />
         </Link>
      </div>
    </div>
  );
}
