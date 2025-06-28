import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

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