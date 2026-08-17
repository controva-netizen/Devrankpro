import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Blog CRUD and comments are optional — the app has a documented fallback to
// hardcoded seed posts when Supabase isn't configured (see BlogContext).
// This module used to throw here, which crashed the entire site (every page,
// not just the blog) on missing/misconfigured env vars, since BlogProvider
// wraps the whole app above the router.
export const supabase: SupabaseClient | null = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : (console.warn('Supabase environment variables are missing — blog will use seed posts only, comments are disabled.'), null);
