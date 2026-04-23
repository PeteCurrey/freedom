"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { supabase } from "@/lib/supabase";
import { 
  User, Package, FileText, Settings, 
  ChevronRight, LogOut, ArrowRight, Activity, 
  Download, ShoppingBag, Wrench, Crown, CreditCard, CheckCircle
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function AccountDashboard() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [plans, setPlans] = useState<any[]>([]);
  const [purchases, setPurchases] = useState<any[]>([]);
  const [builds, setBuilds] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("plans");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/account/login");
        return;
      }
      setUser(user);
      
      // Fetch user data
      const [plansRes, purchasesRes, buildsRes, profileRes] = await Promise.all([
        supabase.from('build_plans').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
        supabase.from('blueprint_purchases').select('*, build_plans(*)').eq('user_id', user.id).order('created_at', { ascending: false }),
        supabase.from('showcase_builds').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
        supabase.from('profiles').select('*').eq('id', user.id).single()
      ]);

      setPlans(plansRes.data || []);
      setPurchases(purchasesRes.data || []);
      setBuilds(buildsRes.data || []);
      setProfile(profileRes.data || null);
      setLoading(false);
    };

    checkUser();
  }, [router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  if (loading) {
    return (
      <main className="bg-brand-obsidian min-h-screen flex items-center justify-center">
         <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-t-2 border-brand-orange rounded-full animate-spin" />
            <span className="font-mono text-[8px] text-brand-grey uppercase tracking-widest">Initialising Laboratory Context...</span>
         </div>
      </main>
    );
  }

  return (
    <main className="bg-brand-obsidian min-h-screen flex flex-col">
      <Navbar />
      
      <section className="flex-1 pt-48 pb-32">
        <div className="container mx-auto px-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Sidebar Nav */}
            <aside className="lg:col-span-3 space-y-4">
               <div className="blueprint-border bg-brand-carbon p-8 flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-brand-obsidian border border-brand-border rounded-full flex items-center justify-center text-brand-orange mb-6">
                     <User className="w-10 h-10" />
                  </div>
                  <h2 className="font-display text-xl uppercase mb-1">{user?.email?.split('@')[0]}</h2>
                  <p className="font-mono text-[8px] text-brand-grey uppercase tracking-widest mb-8">{user?.email}</p>
                  <button 
                    onClick={handleSignOut}
                    className="w-full py-3 border border-brand-border font-mono text-[10px] uppercase tracking-widest text-brand-grey hover:text-white transition-all flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-3 h-3" /> Sign Out
                  </button>
               </div>

               <nav className="space-y-1">
                  {[
                    { id: "plans", name: "My Build Plans", icon: Activity, count: plans.length },
                    { id: "membership", name: "Membership", icon: Crown },
                    { id: "showcase", name: "My Showcase Builds", icon: Wrench, count: builds.length },
                    { id: "purchases", name: "Purchase History", icon: ShoppingBag, count: purchases.length },
                    { id: "settings", name: "Account Settings", icon: Settings },
                  ].map((item) => (
                    <button 
                      key={item.id} 
                      onClick={() => setActiveTab(item.id)}
                      className={cn(
                      "w-full flex items-center justify-between p-4 font-mono text-[10px] uppercase tracking-widest border transition-all",
                      activeTab === item.id ? "bg-brand-orange/10 border-brand-orange text-brand-orange" : "bg-brand-obsidian border-brand-border text-brand-grey hover:border-brand-grey"
                    )}>
                       <span className="flex items-center gap-3"><item.icon className="w-4 h-4" /> {item.name}</span>
                       {item.count !== undefined && <span className="opacity-50">{item.count}</span>}
                    </button>
                  ))}
               </nav>
            </aside>

            {/* Main Dashboard */}
            <div className="lg:col-span-9 space-y-12">
               
               {/* Membership Tab */}
               {activeTab === "membership" && (
                 <div>
                   <h3 className="font-display text-3xl uppercase mb-8">Membership Status</h3>
                   {profile?.subscription_tier && profile.subscription_tier !== 'free' ? (
                     <div className="blueprint-border bg-brand-carbon p-8 space-y-8">
                       <div className="flex items-center justify-between">
                         <div className="flex items-center gap-4">
                           <div className="w-14 h-14 bg-brand-orange/10 border border-brand-orange flex items-center justify-center">
                             <Crown className="w-7 h-7 text-brand-orange" />
                           </div>
                           <div>
                             <h4 className="font-display text-2xl uppercase">{profile.subscription_tier?.toUpperCase()} Member</h4>
                             <p className="font-mono text-[9px] text-brand-grey uppercase tracking-widest mt-1">
                               Status: <span className="text-green-400">{profile.subscription_status}</span>
                             </p>
                           </div>
                         </div>
                         <span className="bg-brand-orange text-white font-mono text-[8px] uppercase tracking-widest px-3 py-1">
                           Active
                         </span>
                       </div>
                       <div className="grid grid-cols-2 gap-6 pt-6 border-t border-brand-border">
                         <div>
                           <p className="font-mono text-[9px] text-brand-grey uppercase tracking-widest mb-1">Renewal Date</p>
                           <p className="font-display text-lg">
                             {profile.current_period_end ? new Date(profile.current_period_end).toLocaleDateString('en-GB') : 'N/A'}
                           </p>
                         </div>
                         <div>
                           <p className="font-mono text-[9px] text-brand-grey uppercase tracking-widest mb-1">Billing</p>
                           <p className="font-display text-lg">{profile.cancel_at_period_end ? 'Cancels at period end' : 'Auto-renews'}</p>
                         </div>
                       </div>
                       <div className="flex gap-4 pt-2">
                         <a href="https://billing.stripe.com/p/login" target="_blank" rel="noopener noreferrer"
                           className="px-6 py-3 border border-brand-border font-mono text-[10px] uppercase tracking-widest text-brand-grey hover:border-brand-orange hover:text-white transition-all flex items-center gap-2">
                           <CreditCard className="w-4 h-4" /> Manage Billing
                         </a>
                       </div>
                     </div>
                   ) : (
                     <div className="blueprint-border bg-brand-carbon p-10 flex flex-col items-center text-center gap-6">
                       <Crown className="w-12 h-12 text-brand-orange/40" />
                       <div>
                         <h4 className="font-display text-2xl uppercase mb-2">Free Tier</h4>
                         <p className="font-sans text-brand-grey text-sm max-w-sm">
                           Upgrade to Pro or Elite to unlock unlimited saved builds, premium downloads, kit discounts, and more.
                         </p>
                       </div>
                       <Link href="/account/upgrade" className="px-8 py-4 bg-brand-orange text-white font-mono text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all flex items-center gap-2">
                         <Crown className="w-4 h-4" /> Upgrade Membership
                       </Link>
                     </div>
                   )}
                 </div>
               )}

               {/* Saved Plans */}
               {activeTab === "plans" && (
                 <div>
                    <div className="flex justify-between items-end mb-8">
                       <h3 className="font-display text-3xl uppercase">Saved Build Plans</h3>
                       <Link href="/planner" className="font-mono text-[10px] text-brand-orange uppercase tracking-widest hover:text-white transition-colors">Start New Build +</Link>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       {plans.map((plan) => (
                         <div key={plan.id} className="blueprint-border bg-brand-carbon p-8 group hover:border-brand-orange transition-all">
                            <div className="flex justify-between items-start mb-6">
                               <div className="w-10 h-10 bg-brand-obsidian border border-brand-border flex items-center justify-center text-brand-orange">
                                  <FileText className="w-5 h-5" />
                               </div>
                               <span className="font-mono text-[8px] text-brand-grey uppercase tracking-widest leading-none">
                                  Created: {new Date(plan.created_at).toLocaleDateString()}
                               </span>
                            </div>
                            <h4 className="font-display text-xl uppercase mb-2">{plan.name}</h4>
                            <p className="font-sans text-brand-grey text-xs uppercase mb-8">{plan.vehicle_id} // {plan.config_id}</p>
                            
                            <div className="flex gap-4">
                               <Link href={`/planner?planId=${plan.id}`} className="flex-1 py-3 bg-brand-obsidian border border-brand-border font-mono text-[10px] uppercase tracking-widest text-center hover:border-brand-orange transition-all">View Plan</Link>
                               <button className="flex-1 py-3 bg-brand-orange text-white font-mono text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all">Checkout</button>
                            </div>
                         </div>
                       ))}
                       {plans.length === 0 && (
                         <div className="col-span-full py-16 border border-dashed border-brand-border flex flex-col items-center gap-6">
                            <p className="font-mono text-brand-grey text-xs uppercase">No saved builds found in your lab.</p>
                            <Link href="/planner" className="bg-brand-orange px-8 py-3 font-display text-xs uppercase tracking-widest">Initiate Planner</Link>
                         </div>
                       )}
                    </div>
                 </div>
               )}

               {/* Showcase Builds */}
               {activeTab === "showcase" && (
                 <div>
                    <div className="flex justify-between items-end mb-8">
                       <h3 className="font-display text-3xl uppercase">My Showcase Submissions</h3>
                       <Link href="/showcase/submit" className="font-mono text-[10px] text-brand-orange uppercase tracking-widest hover:text-white transition-colors">Submit New Build +</Link>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       {builds.map((build) => (
                         <div key={build.id} className="blueprint-border bg-brand-carbon p-8 group hover:border-brand-orange transition-all">
                            <div className="flex justify-between items-start mb-6">
                               <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 bg-brand-obsidian border border-brand-border flex items-center justify-center text-brand-orange">
                                     <Wrench className="w-5 h-5" />
                                  </div>
                                  <div className={cn(
                                    "px-2 py-0.5 font-mono text-[7px] uppercase tracking-widest border",
                                    build.status === 'approved' ? "bg-green-500/10 border-green-500/30 text-green-500" :
                                    build.status === 'review' ? "bg-brand-orange/10 border-brand-orange/30 text-brand-orange" :
                                    "bg-red-500/10 border-red-500/30 text-red-500"
                                  )}>
                                    {build.status || 'review'}
                                  </div>
                               </div>
                            </div>
                            <h4 className="font-display text-xl uppercase mb-2">{build.title}</h4>
                            <p className="font-mono text-[9px] text-brand-grey uppercase tracking-widest mb-8">{build.chassis_type} // {build.vehicle_model}</p>
                            
                            <div className="flex gap-4">
                               {build.status === 'approved' && (
                                 <Link href={`/showcase/${build.slug}`} className="flex-1 py-3 bg-brand-obsidian border border-brand-border font-mono text-[10px] uppercase tracking-widest text-center hover:border-brand-orange transition-all">View Report</Link>
                               )}
                               <button className="flex-1 py-3 border border-brand-border font-mono text-[10px] uppercase tracking-widest text-brand-grey hover:text-white transition-all">Manage Build</button>
                            </div>
                         </div>
                       ))}
                       {builds.length === 0 && (
                         <div className="col-span-full py-16 border border-dashed border-brand-border flex flex-col items-center gap-6 text-center">
                            <p className="font-mono text-brand-grey text-xs uppercase max-w-xs">You haven't contributed to the community archive yet.</p>
                            <Link href="/showcase/submit" className="bg-brand-orange px-8 py-3 font-display text-xs uppercase tracking-widest">Share Your Build</Link>
                         </div>
                       )}
                    </div>
                 </div>
               )}

               {/* Purchases */}
               {activeTab === "purchases" && (
                 <div>
                    <h3 className="font-display text-3xl uppercase mb-8">Full Blueprint Access</h3>
                    <div className="blueprint-border bg-brand-carbon overflow-hidden">
                       <table className="w-full text-left">
                          <thead>
                             <tr className="border-b border-brand-border font-mono text-[10px] uppercase tracking-widest text-brand-grey bg-brand-obsidian">
                                <th className="p-6">Order ID</th>
                                <th className="p-6">Blueprint Package</th>
                                <th className="p-6">Status</th>
                                <th className="p-6 text-right">Action</th>
                             </tr>
                          </thead>
                          <tbody className="font-sans text-xs text-brand-white">
                             {purchases.map((p) => (
                               <tr key={p.id} className="border-b border-brand-border px-6">
                                  <td className="p-6 font-mono text-[10px] uppercase">#{p.id.split('-')[0]}</td>
                                  <td className="p-6 uppercase">{p.tier} Package</td>
                                  <td className="p-6">
                                     <span className="flex items-center gap-2 text-green-500 font-mono text-[10px] uppercase">
                                        <Package className="w-3 h-3" /> Ready
                                     </span>
                                  </td>
                                  <td className="p-6 text-right">
                                     <button className="font-mono text-[10px] uppercase tracking-widest text-brand-orange flex items-center justify-end gap-2 ml-auto">
                                        Download PDF <Download className="w-4 h-4" />
                                     </button>
                                  </td>
                               </tr>
                             ))}
                             {purchases.length === 0 && (
                               <tr>
                                  <td colSpan={4} className="p-12 text-center text-brand-grey font-mono text-[10px] uppercase">No blueprint purchases detected.</td>
                               </tr>
                             )}
                          </tbody>
                       </table>
                    </div>
                 </div>
               )}
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
