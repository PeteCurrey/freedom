"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { 
  Mail, 
  Lock, 
  ArrowRight, 
  Loader2, 
  ShieldCheck,
  AlertCircle 
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface AuthFormProps {
  mode: 'login' | 'signup';
}

export function AuthForm({ mode }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/account`,
          },
        });
        if (error) throw error;
        alert("Check your email for the confirmation link!");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        router.push("/account");
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="blueprint-border bg-brand-carbon p-10 relative overflow-hidden">
        <div className="blueprint-grid absolute inset-0 opacity-10 pointer-events-none" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-brand-orange/10 border border-brand-orange/30">
              <ShieldCheck className="w-5 h-5 text-brand-orange" />
            </div>
            <h2 className="font-display text-xl uppercase tracking-tighter">
              {mode === 'login' ? 'Authorise Access' : 'Create Credentials'}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="font-mono text-[9px] text-brand-grey uppercase tracking-widest block">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-grey" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-brand-obsidian border border-brand-border p-4 pl-12 font-mono text-xs text-brand-white focus:outline-none focus:border-brand-orange transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-mono text-[9px] text-brand-grey uppercase tracking-widest block">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-grey" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-brand-obsidian border border-brand-border p-4 pl-12 font-mono text-xs text-brand-white focus:outline-none focus:border-brand-orange transition-colors"
                />
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/30 flex gap-3 items-start">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <p className="font-mono text-[9px] text-red-500 uppercase leading-relaxed">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-brand-orange text-white font-display text-xs uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  {mode === 'login' ? 'Login' : 'Register Account'} 
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-brand-border flex flex-col gap-4 text-center">
            {mode === 'login' ? (
              <p className="font-mono text-[10px] text-brand-grey uppercase">
                New builder? <Link href="/account/signup" className="text-brand-orange hover:underline">Create an account</Link>
              </p>
            ) : (
              <p className="font-mono text-[10px] text-brand-grey uppercase">
                Already registered? <Link href="/account/login" className="text-brand-orange hover:underline">Log in to your lab</Link>
              </p>
            )}
            <Link href="/" className="font-mono text-[9px] text-brand-grey/50 uppercase hover:text-brand-white transition-colors">
              Return to Command Centre
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
