import React, { useState } from 'react';
import { Bell, Search, Settings, User, ChevronDown, LogOut, Shield, Moon, Sun, Globe, HelpCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
  activeModule: string;
  onSettingsClick: () => void;
}

const moduleNames: Record<string, string> = {
  headquarters: 'Founders Headquarters',
  legal: 'Legal & Compliance Vault',
  finance: 'Finance & Payment Center',
  services: 'Services Command Center',
  clients: 'Client Operating Environment',
  operations: 'Internal Operations',
  wiki: 'Knowledge Base',
  brand: 'Brand & Asset Center',
  analytics: 'Performance Analytics',
  settings: 'System Settings',
};

export const Header: React.FC<HeaderProps> = ({ activeModule, onSettingsClick }) => {
  const { user, switchRole, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    {
      id: 1,
      title: 'Contract Expiring Soon',
      message: 'TechCorp MSA expires in 30 days',
      type: 'warning',
      time: '2 hours ago',
      unread: true
    },
    {
      id: 2,
      title: 'Invoice Payment Received',
      message: '$15,000 payment from InnovateLabs',
      type: 'success',
      time: '4 hours ago',
      unread: true
    },
    {
      id: 3,
      title: 'New Team Member Added',
      message: 'Sarah Johnson joined the AI team',
      type: 'info',
      time: '1 day ago',
      unread: false
    },
    {
      id: 4,
      title: 'System Backup Complete',
      message: 'Weekly backup completed successfully',
      type: 'info',
      time: '2 days ago',
      unread: false
    }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'warning': return '⚠️';
      case 'success': return '✅';
      case 'info': return 'ℹ️';
      case 'error': return '❌';
      default: return 'ℹ️';
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 relative">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {moduleNames[activeModule] || 'Dashboard'}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your {activeModule} with full control and visibility
          </p>
        </div>

        <div className="flex items-center space-x-4">
          {/* Demo Role Switching */}
          <div className="hidden md:flex items-center space-x-2">
            <span className="text-xs text-gray-500">Demo as:</span>
            <select 
              value={user?.role || 'founder'}
              onChange={(e) => switchRole(e.target.value as any)}
              className="text-xs border border-gray-200 rounded-md px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="founder">👑 Founder</option>
              <option value="team">⚡ Team</option>
              <option value="contractor">🔧 Contractor</option>
            </select>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
            />
          </div>

          {/* Notifications */}
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-50"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                    <button className="text-sm text-blue-600 hover:text-blue-700">
                      Mark all read
                    </button>
                  </div>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer ${
                        notification.unread ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <span className="text-lg">{getNotificationIcon(notification.type)}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                        </div>
                        {notification.unread && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-gray-100">
                  <button className="w-full text-sm text-center text-blue-600 hover:text-blue-700">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative">
            <button 
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <img 
                src={user?.avatar} 
                alt={user?.name}
                className="w-8 h-8 rounded-full object-cover border-2 border-gray-200"
              />
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>

            {/* User Dropdown */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={user?.avatar} 
                      alt={user?.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{user?.name}</p>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                      <span className={`inline-block px-2 py-1 text-xs rounded-full mt-1 ${
                        user?.role === 'founder' ? 'bg-purple-100 text-purple-700' :
                        user?.role === 'team' ? 'bg-blue-100 text-blue-700' :
                        user?.role === 'contractor' ? 'bg-orange-100 text-orange-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {user?.role === 'founder' ? '👑 Founder' : 
                         user?.role === 'team' ? '⚡ Team Member' : 
                         user?.role === 'contractor' ? '🔧 Contractor' : 'User'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="py-2">
                  <button 
                    onClick={() => {
                      setShowUserMenu(false);
                      // Navigate to profile
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <User className="w-4 h-4" />
                    <span>Profile Settings</span>
                  </button>
                  
                  <button 
                    onClick={() => {
                      setShowUserMenu(false);
                      onSettingsClick();
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <Settings className="w-4 h-4" />
                    <span>System Settings</span>
                  </button>
                  
                  <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    <Shield className="w-4 h-4" />
                    <span>Security</span>
                  </button>
                  
                  <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    <HelpCircle className="w-4 h-4" />
                    <span>Help & Support</span>
                  </button>
                </div>
                
                <div className="border-t border-gray-100 py-2">
                  <button 
                    onClick={() => {
                      setShowUserMenu(false);
                      logout();
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {(showUserMenu || showNotifications) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => {
            setShowUserMenu(false);
            setShowNotifications(false);
          }}
        />
      )}
    </header>
  );
};