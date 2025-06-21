import React from 'react';
import { 
  BarChart3, 
  FolderOpen, 
  CreditCard, 
  MessageSquare, 
  FileText, 
  HelpCircle,
  User,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface ClientSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const sections = [
  { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
  { id: 'projects', name: 'My Projects', icon: FolderOpen },
  { id: 'invoices', name: 'Invoices & Billing', icon: CreditCard },
  { id: 'communications', name: 'Communications', icon: MessageSquare },
  { id: 'documents', name: 'Documents', icon: FileText },
  { id: 'support', name: 'Support', icon: HelpCircle },
];

export const ClientSidebar: React.FC<ClientSidebarProps> = ({ activeSection, onSectionChange }) => {
  const { user, logout } = useAuth();

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 pt-20 z-30">
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
            <p className="text-xs text-gray-500">Client Account</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => onSectionChange(section.id)}
            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 ${
              activeSection === section.id
                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <section.icon className={`w-5 h-5 ${
              activeSection === section.id ? 'text-blue-600' : ''
            }`} />
            <span className="font-medium">{section.name}</span>
          </button>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-gray-100 space-y-1">
        <button 
          onClick={() => onSectionChange('profile')}
          className="w-full flex items-center space-x-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors"
        >
          <User className="w-5 h-5" />
          <span className="font-medium">Profile</span>
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