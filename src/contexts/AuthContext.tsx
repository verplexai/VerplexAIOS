import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string, role: User['role'], company?: string) => Promise<void>;
  logout: () => void;
  switchRole: (role: User['role']) => void;
  hasPermission: (module: string, requiredAccess: 'view' | 'edit' | 'full') => boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Alex Founder',
    email: 'alex@verplex.ai',
    role: 'founder',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face',
    permissions: [
      { module: 'headquarters', access: 'full' },
      { module: 'legal', access: 'full' },
      { module: 'finance', access: 'full' },
      { module: 'services', access: 'full' },
      { module: 'clients', access: 'full' },
      { module: 'operations', access: 'full' },
      { module: 'wiki', access: 'full' },
      { module: 'brand', access: 'full' },
      { module: 'analytics', access: 'full' },
    ]
  },
  {
    id: '2',
    name: 'Sarah Manager',
    email: 'sarah@verplex.ai',
    role: 'team',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face',
    permissions: [
      { module: 'headquarters', access: 'view' },
      { module: 'legal', access: 'view' },
      { module: 'finance', access: 'none' },
      { module: 'services', access: 'edit' },
      { module: 'clients', access: 'edit' },
      { module: 'operations', access: 'edit' },
      { module: 'wiki', access: 'view' },
      { module: 'brand', access: 'view' },
      { module: 'analytics', access: 'view' },
    ]
  },
  {
    id: '3',
    name: 'Mike Developer',
    email: 'mike@contractor.com',
    role: 'contractor',
    avatar: 'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face',
    permissions: [
      { module: 'headquarters', access: 'none' },
      { module: 'legal', access: 'none' },
      { module: 'finance', access: 'none' },
      { module: 'services', access: 'view' },
      { module: 'clients', access: 'view' },
      { module: 'operations', access: 'edit' },
      { module: 'wiki', access: 'view' },
      { module: 'brand', access: 'view' },
      { module: 'analytics', access: 'none' },
    ]
  },
  {
    id: '4',
    name: 'John Smith',
    email: 'john@techcorp.com',
    role: 'client',
    clientId: '1', // Links to TechCorp Solutions
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face',
    permissions: [
      { module: 'headquarters', access: 'none' },
      { module: 'legal', access: 'none' },
      { module: 'finance', access: 'none' },
      { module: 'services', access: 'none' },
      { module: 'clients', access: 'view' },
      { module: 'operations', access: 'none' },
      { module: 'wiki', access: 'none' },
      { module: 'brand', access: 'none' },
      { module: 'analytics', access: 'none' },
    ]
  },
  {
    id: '5',
    name: 'Emma Wilson',
    email: 'emma@dataflow.com',
    role: 'client',
    clientId: '3', // Links to DataFlow Inc
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face',
    permissions: [
      { module: 'headquarters', access: 'none' },
      { module: 'legal', access: 'none' },
      { module: 'finance', access: 'none' },
      { module: 'services', access: 'none' },
      { module: 'clients', access: 'view' },
      { module: 'operations', access: 'none' },
      { module: 'wiki', access: 'none' },
      { module: 'brand', access: 'none' },
      { module: 'analytics', access: 'none' },
    ]
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for stored auth state
    const storedUser = localStorage.getItem('verplex_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Demo password check
    if (password !== 'demo123') {
      throw new Error('Invalid password. Use "demo123" for demo accounts.');
    }

    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser) {
      setUser(foundUser);
      setIsAuthenticated(true);
      localStorage.setItem('verplex_user', JSON.stringify(foundUser));
    } else {
      throw new Error('User not found');
    }
  };

  const signup = async (email: string, password: string, name: string, role: User['role'], company?: string) => {
    // Generate clientId for client role based on company name or email domain
    let clientId: string | undefined;
    if (role === 'client') {
      // For demo purposes, generate a simple clientId
      clientId = Date.now().toString();
    }

    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      role,
      clientId,
      avatar: 'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face',
      permissions: [
        { module: 'headquarters', access: role === 'founder' ? 'full' : 'none' },
        { module: 'legal', access: role === 'founder' ? 'full' : role === 'team' ? 'view' : 'none' },
        { module: 'finance', access: role === 'founder' ? 'full' : 'none' },
        { module: 'services', access: role === 'contractor' ? 'view' : role === 'client' ? 'none' : 'edit' },
        { module: 'clients', access: role === 'client' ? 'view' : role === 'contractor' ? 'view' : 'edit' },
        { module: 'operations', access: role === 'client' ? 'none' : 'edit' },
        { module: 'wiki', access: role === 'client' ? 'none' : 'view' },
        { module: 'brand', access: role === 'client' ? 'none' : 'view' },
        { module: 'analytics', access: role === 'founder' ? 'full' : role === 'team' ? 'view' : 'none' },
      ]
    };

    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('verplex_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('verplex_user');
  };

  const switchRole = (role: User['role']) => {
    const mockUser = mockUsers.find(u => u.role === role);
    if (mockUser) {
      setUser(mockUser);
      localStorage.setItem('verplex_user', JSON.stringify(mockUser));
    }
  };

  const hasPermission = (module: string, requiredAccess: 'view' | 'edit' | 'full') => {
    if (!user) return false;
    
    const permission = user.permissions.find(p => p.module === module);
    if (!permission || permission.access === 'none') return false;
    
    const accessLevels = { view: 1, edit: 2, full: 3 };
    return accessLevels[permission.access] >= accessLevels[requiredAccess];
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      signup, 
      logout, 
      switchRole, 
      hasPermission, 
      isAuthenticated 
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