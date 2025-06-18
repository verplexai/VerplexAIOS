import React from 'react';
import { 
  Crown, 
  Shield, 
  DollarSign, 
  Package, 
  Users, 
  CheckSquare, 
  BookOpen, 
  Palette, 
  BarChart3,
  Settings,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  activeModule: string;
  onModuleChange: (module: string) => void;
}

const modules = [
  { id: 'headquarters', name: 'Founders HQ', icon: Crown, restricted: 'founder' },
  { id: 'legal', name: 'Legal Vault', icon: Shield, restricted: 'admin' },
  { id: 'finance', name: 'Finance Center', icon: DollarSign, restricted: 'admin' },
  { id: 'services', name: 'Services Hub', icon: Package },
  { id: 'clients', name: 'Client Portal', icon: Users },
  { id: 'operations', name: 'Operations', icon: CheckSquare },
  { id: 'wiki', name: 'Knowledge Base', icon: BookOpen },
  { id: 'brand', name: 'Brand Center', icon: Palette },
  { id: 'analytics', name: 'Analytics', icon: BarChart3 },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeModule, onModuleChange }) => {
  const { user, logout, hasPermission } = useAuth();

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
            <Package className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Verplex</h1>
            <p className="text-xs text-gray-500">Operating System</p>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <img 
            src={user?.avatar} 
            alt={user?.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
            <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
          </div>
          <div className={`px-2 py-1 text-xs rounded-full ${
            user?.role === 'founder' ? 'bg-purple-100 text-purple-700' :
            user?.role === 'team' ? 'bg-blue-100 text-blue-700' :
            user?.role === 'contractor' ? 'bg-orange-100 text-orange-700' :
            'bg-gray-100 text-gray-700'
          }`}>
            {user?.role === 'founder' ? '👑' : user?.role === 'team' ? '⚡' : '🔧'}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {modules.map((module) => {
          const hasAccess = hasPermission(module.id, 'view');
          const isRestricted = module.restricted && (
            (module.restricted === 'founder' && user?.role !== 'founder') ||
            (module.restricted === 'admin' && !['founder'].includes(user?.role || ''))
          );
          
          return (
            <button
              key={module.id}
              onClick={() => hasAccess && onModuleChange(module.id)}
              disabled={!hasAccess}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 ${
                activeModule === module.id
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : hasAccess
                  ? 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  : 'text-gray-400 cursor-not-allowed opacity-50'
              }`}
            >
              <module.icon className={`w-5 h-5 ${
                activeModule === module.id ? 'text-blue-600' : ''
              }`} />
              <span className="font-medium">{module.name}</span>
              {isRestricted && (
                <div className="ml-auto">
                  {module.restricted === 'founder' ? (
                    <Crown className="w-3 h-3 text-purple-500" />
                  ) : (
                    <Shield className="w-3 h-3 text-red-500" />
                  )}
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-gray-100 space-y-1">
        <button className="w-full flex items-center space-x-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors">
          <Settings className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </button>
        <button 
          onClick={logout}
          className="w-full flex items-center space-x-3 px-3 py-2.5 text-gray-600 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  );
};