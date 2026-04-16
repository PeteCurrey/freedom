"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    async function checkAuth() {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error || !user) {
        console.error("Unauthorized: No session found");
        router.push("/account/login");
        return;
      }

      // STRICT SUPER ADMIN CHECK
      // Pete's specific email requirement as requested
      const SUPER_ADMIN = "pete@avorria.com";
      
      if (user.email !== SUPER_ADMIN) {
        // In a real environment, we would also check the admin_profiles table
        // But for the hard launch, we enforce Pete's account.
        const { data: profile } = await supabase
          .from("admin_profiles")
          .select("role")
          .eq("id", user.id)
          .single();

        if (!profile || (profile.role !== 'admin' && profile.role !== 'super_admin')) {
          router.push("/"); // Boot non-admins back to home
          return;
        }
      }

      setAuthorized(true);
      setLoading(false);
    }

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="bg-brand-obsidian min-h-screen flex flex-col items-center justify-center p-12">
        <div className="w-16 h-16 border-t-2 border-brand-orange animate-spin rounded-full mb-8" />
        <h2 className="font-display text-2xl uppercase tracking-tighter text-white">Authenticating...</h2>
        <p className="font-mono text-[10px] uppercase text-brand-grey tracking-[0.2em] mt-4">Establishing Secure Node Connection</p>
      </div>
    );
  }

  if (!authorized) return null;

  return (
    <div className="flex min-h-screen bg-brand-obsidian">
      <AdminSidebar />
      <main className="flex-1 overflow-x-hidden pt-6">
        {children}
      </main>
    </div>
  );
}
