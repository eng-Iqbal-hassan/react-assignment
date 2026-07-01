import { createClient } from '@supabase/supabase-js';

// No custom parameters, no object extensions, no typescript compiler errors
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL, // Assumes: http://localhost:54321
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY // Your local verified key
);
