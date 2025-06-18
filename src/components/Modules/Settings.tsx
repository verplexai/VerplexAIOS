import React, { useState } from 'react';
import { Settings, User, Shield, Bell, Palette, Globe, Database, Zap, Key, Download, Upload, RefreshCw, Trash2, Save, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const Settings: React.FC = () => {
  const { user, hasPermission } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [showApiKey, setShowApiKey] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    marketing: false
  });

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'appearance', name: 'Appearance', icon: Palette },
    { id: 'integrations', name: 'Integrations', icon: Zap },
    { id: 'system', name: 'System', icon: Settings },
    { id: 'data', name: 'Data & Privacy', icon: Database },
  ];

  const integrations = [
    {
      name: 'Zapier',
      description: 'Automate workflows between Verplex and 5000+ apps',
      status: 'connected',
      lastSync: '2024-01-15 14:30',
      icon: '⚡'
    },
    {
      name: 'Slack',
      description: 'Get notifications and updates in your Slack workspace',
      status: 'connected',
      lastSync: '2024-01-15 12:15',
      icon: '💬'
    },
    {
      name: 'Google Workspace',
      description: 'Sync calendars, contacts, and documents',
      status: 'disconnected',
      lastSync: null,
      icon: '📧'
    },
    {
      name: 'GitHub',
      description: 'Connect repositories for project tracking',
      status: 'connected',
      lastSync: '2024-01-14 18:45',
      icon: '🐙'
    },
    {
      name: 'Stripe',
      description: 'Process payments and sync invoice data',
      status: 'connected',
      lastSync: '2024-01-15 09:30',
      icon: '💳'
    }
  ];

  const systemSettings = [
    {
      category: 'General',
      settings: [
        { name: 'Company Name', value: 'Verplex Technologies Inc.', type: 'text' },
        { name: 'Time Zone', value: 'UTC-8 (Pacific)', type: 'select' },
        { name: 'Date Format', value: 'MM/DD/YYYY', type: 'select' },
        { name: 'Currency', value: 'USD ($)', type: 'select' }
      ]
    },
    {
      category: 'Security',
      settings: [
        { name: 'Two-Factor Authentication', value: true, type: 'toggle' },
        { name: 'Session Timeout', value: '8 hours', type: 'select' },
        { name: 'Password Policy', value: 'Strong', type: 'select' },
        { name: 'Login Attempts', value: '5', type: 'number' }
      ]
    },
    {
      category: 'Backup',
      settings: [
        { name: 'Auto Backup', value: true, type: 'toggle' },
        { name: 'Backup Frequency', value: 'Daily', type: 'select' },
        { name: 'Retention Period', value: '90 days', type: 'select' },
        { name: 'Backup Location', value: 'AWS S3', type: 'select' }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-100 text-green-700';
      case 'disconnected': return 'bg-red-100 text-red-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200 rounded-xl p-4">
        <div className="flex items-center space-x-3">
          <Settings className="w-6 h-6 text-gray-600" />
          <div>
            <h3 className="font-semibold text-gray-900">System Settings</h3>
            <p className="text-gray-700 text-sm">Manage your account, security, and system preferences</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <h3 className="font-semibold text-gray-900">Profile Information</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={user?.avatar} 
                      alt={user?.name}
                      className="w-20 h-20 rounded-full object-cover border-4 border-gray-200"
                    />
                    <div>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Change Photo
                      </button>
                      <p className="text-sm text-gray-500 mt-1">JPG, PNG up to 5MB</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        defaultValue={user?.name}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        defaultValue={user?.email}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                      <input
                        type="text"
                        value={user?.role}
                        disabled
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 capitalize"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Preferences</h4>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time Zone</label>
                    <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>UTC-8 (Pacific Time)</option>
                      <option>UTC-5 (Eastern Time)</option>
                      <option>UTC+0 (GMT)</option>
                      <option>UTC+1 (Central European)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                    <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>English (US)</option>
                      <option>English (UK)</option>
                      <option>Spanish</option>
                      <option>French</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
                    <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>MM/DD/YYYY</option>
                      <option>DD/MM/YYYY</option>
                      <option>YYYY-MM-DD</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3 pt-4 border-t border-gray-100">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Save Changes
                </button>
                <button className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <h3 className="font-semibold text-gray-900">Security Settings</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">Password</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                        <input
                          type="password"
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                        <input
                          type="password"
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                        <input
                          type="password"
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Update Password
                      </button>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">Two-Factor Authentication</h4>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                        <p className="text-xs text-green-600 mt-1">✓ Currently enabled</p>
                      </div>
                      <button className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                        Configure
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">API Access</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">API Key</label>
                        <div className="flex items-center space-x-2">
                          <input
                            type={showApiKey ? 'text' : 'password'}
                            value="vx_live_sk_1234567890abcdef"
                            readOnly
                            className="flex-1 px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-600"
                          />
                          <button
                            onClick={() => setShowApiKey(!showApiKey)}
                            className="p-2 text-gray-600 hover:bg-gray-50 rounded"
                          >
                            {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors">
                          Regenerate
                        </button>
                        <button className="px-3 py-1 border border-gray-200 text-gray-700 text-sm rounded hover:bg-gray-50 transition-colors">
                          Copy
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">Active Sessions</h4>
                    <div className="space-y-3">
                      {[
                        { device: 'MacBook Pro', location: 'San Francisco, CA', current: true, lastActive: 'Now' },
                        { device: 'iPhone 14', location: 'San Francisco, CA', current: false, lastActive: '2 hours ago' },
                        { device: 'Chrome Browser', location: 'New York, NY', current: false, lastActive: '1 day ago' }
                      ].map((session, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {session.device} {session.current && <span className="text-green-600">(Current)</span>}
                            </p>
                            <p className="text-xs text-gray-500">{session.location} • {session.lastActive}</p>
                          </div>
                          {!session.current && (
                            <button className="text-sm text-red-600 hover:text-red-700">
                              Revoke
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h3 className="font-semibold text-gray-900">Notification Preferences</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Delivery Methods</h4>
                  
                  {Object.entries(notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900 capitalize">{key} Notifications</p>
                        <p className="text-sm text-gray-600">
                          {key === 'email' && 'Receive notifications via email'}
                          {key === 'push' && 'Browser and mobile push notifications'}
                          {key === 'sms' && 'Text message notifications for urgent items'}
                          {key === 'marketing' && 'Product updates and marketing emails'}
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={(e) => setNotifications(prev => ({ ...prev, [key]: e.target.checked }))}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Notification Types</h4>
                  
                  {[
                    { name: 'Contract Expiry Alerts', description: 'Get notified 30 days before contracts expire', enabled: true },
                    { name: 'Payment Received', description: 'Notifications when invoices are paid', enabled: true },
                    { name: 'Task Assignments', description: 'When tasks are assigned to you', enabled: true },
                    { name: 'System Updates', description: 'Important system maintenance and updates', enabled: true },
                    { name: 'Weekly Reports', description: 'Weekly performance and analytics summaries', enabled: false },
                    { name: 'Client Messages', description: 'Direct messages from clients', enabled: true }
                  ].map((notification, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{notification.name}</p>
                        <p className="text-sm text-gray-600">{notification.description}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          defaultChecked={notification.enabled}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="space-y-6">
              <h3 className="font-semibold text-gray-900">Appearance Settings</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">Theme</h4>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input type="radio" name="theme" defaultChecked className="text-blue-600" />
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-white border border-gray-300 rounded"></div>
                          <span>Light Mode</span>
                        </div>
                      </label>
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input type="radio" name="theme" className="text-blue-600" />
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-gray-800 rounded"></div>
                          <span>Dark Mode</span>
                        </div>
                      </label>
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input type="radio" name="theme" className="text-blue-600" />
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-gradient-to-r from-white to-gray-800 rounded"></div>
                          <span>Auto (System)</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">Density</h4>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input type="radio" name="density" className="text-blue-600" />
                        <span>Compact</span>
                      </label>
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input type="radio" name="density" defaultChecked className="text-blue-600" />
                        <span>Comfortable</span>
                      </label>
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input type="radio" name="density" className="text-blue-600" />
                        <span>Spacious</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">Color Scheme</h4>
                    <div className="grid grid-cols-4 gap-3">
                      {[
                        { name: 'Blue', color: 'bg-blue-600' },
                        { name: 'Purple', color: 'bg-purple-600' },
                        { name: 'Green', color: 'bg-green-600' },
                        { name: 'Orange', color: 'bg-orange-600' },
                        { name: 'Red', color: 'bg-red-600' },
                        { name: 'Pink', color: 'bg-pink-600' },
                        { name: 'Indigo', color: 'bg-indigo-600' },
                        { name: 'Teal', color: 'bg-teal-600' }
                      ].map((color, index) => (
                        <button
                          key={index}
                          className={`w-full h-12 rounded-lg border-2 ${color.color} ${
                            index === 0 ? 'border-gray-900' : 'border-transparent hover:border-gray-400'
                          } transition-colors`}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">Font Size</h4>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input type="radio" name="fontSize" className="text-blue-600" />
                        <span className="text-sm">Small</span>
                      </label>
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input type="radio" name="fontSize" defaultChecked className="text-blue-600" />
                        <span>Medium</span>
                      </label>
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input type="radio" name="fontSize" className="text-blue-600" />
                        <span className="text-lg">Large</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'integrations' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Integrations</h3>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Browse Integrations
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {integrations.map((integration, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{integration.icon}</span>
                        <div>
                          <h4 className="font-medium text-gray-900">{integration.name}</h4>
                          <p className="text-sm text-gray-600">{integration.description}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(integration.status)}`}>
                        {integration.status}
                      </span>
                    </div>
                    
                    {integration.lastSync && (
                      <p className="text-xs text-gray-500 mb-3">Last sync: {integration.lastSync}</p>
                    )}
                    
                    <div className="flex items-center space-x-2">
                      {integration.status === 'connected' ? (
                        <>
                          <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded">
                            Configure
                          </button>
                          <button className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded">
                            Disconnect
                          </button>
                        </>
                      ) : (
                        <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors">
                          Connect
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'system' && hasPermission('headquarters', 'full') && (
            <div className="space-y-6">
              <h3 className="font-semibold text-gray-900">System Administration</h3>
              
              <div className="space-y-6">
                {systemSettings.map((category, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-4">{category.category}</h4>
                    <div className="space-y-3">
                      {category.settings.map((setting, settingIndex) => (
                        <div key={settingIndex} className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">{setting.name}</span>
                          <div className="w-48">
                            {setting.type === 'toggle' ? (
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  defaultChecked={setting.value as boolean}
                                  className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                              </label>
                            ) : setting.type === 'select' ? (
                              <select className="w-full px-3 py-1 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option>{setting.value}</option>
                              </select>
                            ) : (
                              <input
                                type={setting.type}
                                defaultValue={setting.value as string}
                                className="w-full px-3 py-1 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="flex items-center justify-center space-x-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <Download className="w-5 h-5 text-gray-600" />
                  <span>Export Data</span>
                </button>
                <button className="flex items-center justify-center space-x-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <RefreshCw className="w-5 h-5 text-gray-600" />
                  <span>System Backup</span>
                </button>
                <button className="flex items-center justify-center space-x-2 p-4 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                  <Trash2 className="w-5 h-5" />
                  <span>Reset System</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'data' && (
            <div className="space-y-6">
              <h3 className="font-semibold text-gray-900">Data & Privacy</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">Data Export</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Download a copy of your data in JSON format
                    </p>
                    <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Request Data Export
                    </button>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">Data Retention</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Account Data:</span>
                        <span className="font-medium">Indefinite</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Activity Logs:</span>
                        <span className="font-medium">90 days</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">File Uploads:</span>
                        <span className="font-medium">1 year</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Deleted Items:</span>
                        <span className="font-medium">30 days</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">Privacy Controls</h4>
                    <div className="space-y-3">
                      {[
                        { name: 'Analytics Tracking', enabled: true },
                        { name: 'Usage Statistics', enabled: true },
                        { name: 'Error Reporting', enabled: true },
                        { name: 'Performance Monitoring', enabled: false }
                      ].map((control, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">{control.name}</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              defaultChecked={control.enabled}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border border-red-200 rounded-lg p-4">
                    <h4 className="font-medium text-red-900 mb-3">Danger Zone</h4>
                    <p className="text-sm text-red-600 mb-4">
                      These actions cannot be undone. Please proceed with caution.
                    </p>
                    <div className="space-y-2">
                      <button className="w-full px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                        Delete All Data
                      </button>
                      <button className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-100">
            <button className="px-6 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};