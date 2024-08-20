import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY,
  {
    headers: {
      "Cache-Control": "no-cache, no-store, must-revalidate",
    },
  }
);
