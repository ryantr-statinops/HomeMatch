import { createClient } from "@supabase/supabase-js";
import { env } from "@/configs/env";

export const supabase = createClient(
  env.supabaseUrl,
  env.supabaseAnonKey,
);
