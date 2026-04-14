"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { supabase } from "@/lib/supabase";
import { Loader2, Mail, Lock, ArrowRight, Github } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        alert("Check your email for the confirmation link!");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        router.push("/account");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-brand-obsidian min-h-screen flex flex-col">
      <Navbar />
      
      <section className="flex-1 pt-48 pb-32 flex items-center justify-center">
        <div className="container mx-auto px-6 max-w-lg">
          <div className="blueprint-border bg-brand-carbon p-12 relative overflow-hidden">
            <div className="blueprint-grid absolute inset-0 opacity-10 pointer-events-none" />
            
            <div className="relative z-10">
              <div className="flex justify-between items-end mb-12">
                 <div>
                    <h1 className="font-display text-4xl uppercase mb-2">{isSignUp ? "Join the Lab" : "Welcome Back"}</h1>
                    <p className="font-sans text-brand-grey text-sm uppercase tracking-widest">Identify Yourself to Access your Lab</p>
                 </div>
                 <div className="w-12 h-12 bg-brand-obsidian border border-brand-border flex items-center justify-center text-brand-orange">
                    <Lock className="w-6 h-6" />
                 </div>
              </div>

              {error && (
                <div className="bg-red-900/10 border border-red-900/30 p-4 mb-8 text-red-500 font-mono text-[10px] uppercase tracking-widest">
                  Error: {error}
                </div>
              )}

              <form onSubmit={handleAuth} className="space-y-6">
                <div className="space-y-2">
                  <label className="font-mono text-[8px] text-brand-grey uppercase tracking-widest pl-4">Email Address</label>
                  <div className="relative">
                     <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-grey" />
                     <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-brand-obsidian border border-brand-border py-4 pl-12 pr-4 font-mono text-xs uppercase focus:border-brand-orange outline-none transition-all"
                        placeholder="BUILDER@FREEDOM.COM"
                     />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-mono text-[8px] text-brand-grey uppercase tracking-widest pl-4">Password</label>
                  <div className="relative">
                     <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-grey" />
                     <input 
                        type="password" 
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-brand-obsidian border border-brand-border py-4 pl-12 pr-4 font-mono text-xs uppercase focus:border-brand-orange outline-none transition-all"
                        placeholder="••••••••"
                     />
                  </div>
                </div>

                <button 
                  disabled={loading}
                  className="w-full bg-brand-orange text-white py-6 font-display text-sm uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all flex items-center justify-center gap-3 group"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : isSignUp ? "Create Lab Account" : "Access Lab"}
                  {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                </button>
              </form>

              <div className="mt-12 pt-8 border-t border-brand-border/30 flex flex-col items-center gap-6">
                 <button 
                   onClick={() => setIsSignUp(!isSignUp)}
                   className="font-mono text-[10px] uppercase tracking-widest text-brand-grey hover:text-brand-orange transition-colors"
                 >
                    {isSignUp ? "Already have an account? Login" : "Need an account? Sign up"}
                 </button>
                 
                 <div className="flex items-center gap-4 w-full">
                    <div className="h-px bg-brand-border/30 flex-1" />
                    <span className="font-mono text-[8px] text-brand-grey">OR</span>
                    <div className="h-px bg-brand-border/30 flex-1" />
                 </div>

                 <button className="w-full py-4 border border-brand-border font-mono text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 hover:border-white transition-all">
                    <Github className="w-4 h-4" /> Sign in with Github
                 </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
