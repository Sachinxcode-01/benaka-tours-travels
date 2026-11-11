export interface EnvConfig {
  appName: string;
  siteUrl: string;
  googleMapsApiKey?: string;
  supabaseUrl?: string;
  supabaseAnonKey?: string;
}

export const env: EnvConfig = {
  appName: import.meta.env.VITE_APP_NAME || "Kedar Tours & Travels",
  siteUrl: import.meta.env.VITE_SITE_URL || "https://kedartravels.in",
  googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || undefined,
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL || undefined,
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || undefined,
};
