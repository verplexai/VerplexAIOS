import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { Database } from '../lib/database.types';

type Profile = Database['public']['Tables']['profiles']['Row'];

interface AuthUser extends User {
  name?: string;
  avatar?: string;
  clientId?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  profile: Profile | null;
  session: Session | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string, role: Profile['role'], company?: string) => Promise<void>;
  logout: () => Promise<void>;
  switchRole: (role: Profile['role']) => void;
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

// Mock user data for demo purposes
const mockUsers: Record<string, AuthUser & { profile: Profile }> = {
  'founder@verplex.ai': {
    id: 'founder-1',
    email: 'founder@verplex.ai',
    name: 'Alex Founder',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    profile: {
      id: 'founder-1',
      email: 'founder@verplex.ai',
      display_name: 'Alex Founder',
      avatar_url: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      role: 'founder',
      department: null,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    }
  },
  'team@verplex.ai': {
    id: 'team-1',
    email: 'team@verplex.ai',
    name: 'Sarah Johnson',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    profile: {
      id: 'team-1',
      email: 'team@verplex.ai',
      display_name: 'Sarah Johnson',
      avatar_url: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      role: 'team',
      department: 'Engineering',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    }
  },
  'contractor@verplex.ai': {
    id: 'contractor-1',
    email: 'contractor@verplex.ai',
    name: 'Mike Chen',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    profile: {
      id: 'contractor-1',
      email: 'contractor@verplex.ai',
      display_name: 'Mike Chen',
      avatar_url: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      role: 'contractor',
      department: 'Design',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    }
  },
  'john@techcorp.com': {
    id: 'client-1',
    email: 'john@techcorp.com',
    name: 'John Smith',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    clientId: '1',
    profile: {
      id: 'client-1',
      email: 'john@techcorp.com',
      display_name: 'John Smith',
      avatar_url: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      role: 'client',
      department: null,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    }
  },
  'emma@dataflow.com': {
    id: 'client-3',
    email: 'emma@dataflow.com',
    name: 'Emma Wilson',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    clientId: '3',
    profile: {
      id: 'client-3',
      email: 'emma@dataflow.com',
      display_name: 'Emma Wilson',
      avatar_url: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      role: 'client',
      department: null,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    }
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check for existing session in localStorage
    const savedUser = localStorage.getItem('verplex_user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setProfile(userData.profile);
      setSession({ user: userData } as Session);
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Mock authentication - in real app, this would use Supabase
      const mockUser = mockUsers[email];
      if (mockUser && password === 'password') {
        setUser(mockUser);
        setProfile(mockUser.profile);
        setSession({ user: mockUser } as Session);
        localStorage.setItem('verplex_user', JSON.stringify(mockUser));
      } else {
        throw new Error('Invalid credentials');
      }
    } finally {
      setLoading(false);
    }
  };

  const signup = async (
    email: string, 
    password: string, 
    name: string, 
    role: Profile['role'], 
    company?: string
  ) => {
    setLoading(true);
    try {
      // Mock signup - in real app, this would use Supabase
      const newUser: AuthUser & { profile: Profile } = {
        id: `user-${Date.now()}`,
        email,
        name,
        avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        profile: {
          id: `user-${Date.now()}`,
          email,
          display_name: name,
          avatar_url: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
          role,
          department: company || null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      };
      
      setUser(newUser);
      setProfile(newUser.profile);
      setSession({ user: newUser } as Session);
      localStorage.setItem('verplex_user', JSON.stringify(newUser));
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setUser(null);
    setProfile(null);
    setSession(null);
    localStorage.removeItem('verplex_user');
  };

  const switchRole = (role: Profile['role']) => {
    if (user && profile) {
      const updatedProfile = { ...profile, role };
      const updatedUser = { ...user, profile: updatedProfile };
      setProfile(updatedProfile);
      setUser(updatedUser);
      localStorage.setItem('verplex_user', JSON.stringify(updatedUser));
    }
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
      switchRole,
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