"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { cn } from "@/lib/utils";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isLightMode, setIsLightMode] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const savedTheme = localStorage.getItem("admin_theme");
    if (savedTheme === "light") setIsLightMode(true);
  }, []);

  const toggleTheme = () => {
    const newMode = !isLightMode;
    setIsLightMode(newMode);
    localStorage.setItem("admin_theme", newMode ? "light" : "dark");
  };

  useEffect(() => {
    // 1. Initial Check
    async function initAuth() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        processUser(session.user);
      } else {
        setLoading(false);
        router.push("/account/login");
      }
    }

    // 2. Continuous Listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        processUser(session.user);
      } else if (event === 'SIGNED_OUT') {
        setAuthorized(false);
        router.push("/account/login");
      }
    });

    async function processUser(user: any) {
      const SUPER_ADMIN = "pete@avorria.com";
      
      // ROOT OVERRIDE: Pete is always let in
      if (user.email === SUPER_ADMIN) {
        setAuthorized(true);
        setLoading(false);
        return;
      }

      // SECONDARY CHECK: For other admins in the database
      const { data: profile } = await supabase
        .from("admin_profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (profile && (profile.role === 'admin' || profile.role === 'super_admin')) {
        setAuthorized(true);
      } else {
        router.push("/");
      }
      setLoading(false);
    }

    initAuth();
    return () => subscription.unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="bg-brand-obsidian min-h-screen flex flex-col items-center justify-center p-12">
        <div className="w-16 h-16 border-t-2 border-brand-orange animate-spin rounded-full mb-8" />
        <h2 className="font-display text-2xl uppercase tracking-tighter text-brand-white">
          System <span className="text-brand-orange">Verification</span>
        </h2>
        <p className="font-mono text-[10px] uppercase text-brand-grey tracking-[0.2em] mt-4">Establishing Secure Node Connection</p>
      </div>
    );
  }

  if (!authorized) return null;

  return (
    <div className={cn(
      "flex h-screen overflow-hidden transition-colors duration-300",
      isLightMode ? "admin-light bg-brand-obsidian" : "bg-brand-obsidian"
    )}>
      <AdminSidebar isLightMode={isLightMode} onToggleTheme={toggleTheme} />
      <main className="flex-1 overflow-y-auto overflow-x-hidden pt-6 custom-scrollbar text-brand-white">
        {children}
      </main>
    </div>
  );
}
