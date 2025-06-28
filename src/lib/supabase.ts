import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// More detailed error checking for environment variables
if (!supabaseUrl || supabaseUrl === 'your_supabase_project_url' || supabaseUrl.trim() === '') {
  console.error('❌ VITE_SUPABASE_URL is missing or not configured properly');
  console.error('Please set your Supabase project URL in the .env file');
  console.error('Get it from: Supabase Dashboard > Settings > API > Project URL');
  throw new Error('Missing or invalid VITE_SUPABASE_URL environment variable');
}

if (!supabaseAnonKey || supabaseAnonKey === 'your_supabase_anon_key' || supabaseAnonKey.trim() === '') {
  console.error('❌ VITE_SUPABASE_ANON_KEY is missing or not configured properly');
  console.error('Please set your Supabase anonymous key in the .env file');
  console.error('Get it from: Supabase Dashboard > Settings > API > Project API keys > anon public');
  throw new Error('Missing or invalid VITE_SUPABASE_ANON_KEY environment variable');
}

// Validate URL format
try {
  new URL(supabaseUrl);
} catch (error) {
  console.error('❌ VITE_SUPABASE_URL is not a valid URL:', supabaseUrl);
  throw new Error('Invalid VITE_SUPABASE_URL format');
}

console.log('✅ Supabase configuration loaded successfully');
console.log('📍 Supabase URL:', supabaseUrl);

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Helper function to handle Supabase errors
export const handleSupabaseError = (error: any) => {
  console.error('Supabase error:', error);
  
  // Provide more specific error messages for common issues
  if (error?.message?.includes('Failed to fetch')) {
    console.error('🔗 Connection failed - check your Supabase URL and network connection');
    throw new Error('Unable to connect to Supabase. Please check your internet connection and Supabase configuration.');
  }
  
  if (error?.message?.includes('Invalid API key')) {
    console.error('🔑 Invalid API key - check your Supabase anonymous key');
    throw new Error('Invalid Supabase API key. Please check your VITE_SUPABASE_ANON_KEY.');
  }
  
  if (error?.message) {
    throw new Error(error.message);
  }
  
  throw new Error('An unexpected error occurred');
};

// Helper function to get current user profile
export const getCurrentUserProfile = async () => {
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  
  if (userError) {
    handleSupabaseError(userError);
  }
  
  if (!user) {
    throw new Error('No authenticated user found');
  }
  
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();
  
  if (profileError) {
    handleSupabaseError(profileError);
  }
  
  return { user, profile };
};

// Helper function to check user permissions
export const checkUserPermission = async (requiredRole: string) => {
  const { profile } = await getCurrentUserProfile();
  
  const roleHierarchy = {
    'client': 0,
    'user': 1,
    'manager': 2,
    'admin': 3
  };
  
  const userLevel = roleHierarchy[profile.role as keyof typeof roleHierarchy] || 0;
  const requiredLevel = roleHierarchy[requiredRole as keyof typeof roleHierarchy] || 0;
  
  return userLevel >= requiredLevel;
};