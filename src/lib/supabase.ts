import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for the database (simplified for now, can be generated with supabase CLI)
export type Database = {
  public: {
    Tables: {
      vehicles: { Row: Record<string, unknown> };
      products: { Row: Record<string, unknown> };
      build_systems: { Row: Record<string, unknown> };
      resources: { Row: Record<string, unknown> };
      orders: { Row: Record<string, unknown> };
      build_plans: { Row: Record<string, unknown> };
      showcase_builds: { Row: Record<string, unknown> };
    };
  };
};
