import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { Database } from '../lib/database.types';
import api from '../services/api';

type Profile = Database['public']['Tables']['profiles']['Row'];

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, displayName: string, role: Profile['role'], department?: string) => Promise<void>;
  logout: () => Promise<void>;
  hasPermission: (module: string, requiredAccess: 'view' | 'edit' | 'full') => boolean;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const rolePermissions: Record<Profile['role'], Record<string, 'none' | 'view' | 'edit' | 'full'>> = {
  admin: {
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
  manager: {
    headquarters: 'view',
    legal: 'view',
    finance: 'view',
    services: 'full',
    clients: 'full',
    operations: 'full',
    wiki: 'edit',
    brand: 'view',
    analytics: 'view',
  },
  user: {
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
      const profile = await api.profiles.getById(userId);
      setProfile(profile);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      await api.auth.signIn(email, password);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const signup = async (
    email: string, 
    password: string, 
    displayName: string, 
    role: Profile['role'], 
    department?: string
  ) => {
    setLoading(true);
    try {
      const { user } = await api.auth.signUp(email, password, { 
        display_name: displayName, 
        role,
        department 
      });

      if (user) {
        // Profile will be created automatically by the trigger
        await fetchProfile(user.id);
      }
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const logout = async () => {
    await api.auth.signOut();
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