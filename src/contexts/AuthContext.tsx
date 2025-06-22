import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { Database } from '../lib/database.types';

type Profile = Database['public']['Tables']['profiles']['Row'];

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string, role: Profile['role'], company?: string) => Promise<void>;
  logout: () => Promise<void>;
  hasPermission: (module: string, requiredAccess: 'view' | 'edit' | 'full') => boolean;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const rolePermissions: Record<Profile['role'], Record<string, 'none' | 'view' | 'edit' | 'full'>> = {
  founder: {
    headquarters: 'full',
    legal: 'full',
    finance: 'full',
    services: 'full',
    clients: 'full',
    operations: 'full',
    wiki: 'full',
    brand: 'full',
    analytics: 'full',
  },
  team: {
    headquarters: 'view',
    legal: 'view',
    finance: 'none',
    services: 'edit',
    clients: 'edit',
    operations: 'edit',
    wiki: 'view',
    brand: 'view',
    analytics: 'view',
  },
  contractor: {
    headquarters: 'none',
    legal: 'none',
    finance: 'none',
    services: 'view',
    clients: 'view',
    operations: 'edit',
    wiki: 'view',
    brand: 'view',
    analytics: 'none',
  },
  client: {
    headquarters: 'none',
    legal: 'none',
    finance: 'none',
    services: 'none',
    clients: 'view',
    operations: 'none',
    wiki: 'none',
    brand: 'none',
    analytics: 'none',
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await fetchProfile(session.user.id);
        } else {
          setProfile(null);
          setLoading(false);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
      } else {
        setProfile(data);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
  };

  const signup = async (
    email: string, 
    password: string, 
    name: string, 
    role: Profile['role'], 
    company?: string
  ) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    if (data.user) {
      // Create profile
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: data.user.id,
          name,
          role,
          company,
        });

      if (profileError) throw profileError;
    }
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const hasPermission = (module: string, requiredAccess: 'view' | 'edit' | 'full') => {
    if (!profile) return false;
    
    const userAccess = rolePermissions[profile.role]?.[module] || 'none';
    if (userAccess === 'none') return false;
    
    const accessLevels = { view: 1, edit: 2, full: 3 };
    return accessLevels[userAccess] >= accessLevels[requiredAccess];
  };

  const isAuthenticated = !!user && !!profile;

  return (
    <AuthContext.Provider value={{ 
      user, 
      profile,
      session,
      login, 
      signup, 
      logout, 
      hasPermission, 
      isAuthenticated,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};