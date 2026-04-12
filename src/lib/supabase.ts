import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for the database (simplified for now, can be generated with supabase CLI)
export type Database = {
  public: {
    Tables: {
      vehicles: any;
      products: any;
      build_systems: any;
      resources: any;
      orders: any;
      build_plans: any;
      showcase_builds: any;
    };
  };
};
