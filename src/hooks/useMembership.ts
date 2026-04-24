import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export type MembershipTier = "free" | "pro" | "elite";

export function useMembership() {
  const [tier, setTier] = useState<MembershipTier>("free");
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function getMembership() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setTier("free");
          setLoading(false);
          return;
        }

        const { data: profile } = await supabase
          .from("profiles")
          .select("subscription_tier, is_admin")
          .eq("id", user.id)
          .single();

        if (profile) {
          setTier((profile.subscription_tier as MembershipTier) || "free");
          setIsAdmin(!!profile.is_admin);
        }
      } catch (err) {
        console.error("Error fetching membership:", err);
      } finally {
        setLoading(false);
      }
    }

    getMembership();
  }, []);

  return {
    tier,
    isAdmin,
    loading,
    isPro: tier === "pro" || tier === "elite",
    isElite: tier === "elite",
    canAccessBlueprints: tier === "pro" || tier === "elite",
    canAccessCAD: tier === "elite",
  };
}
