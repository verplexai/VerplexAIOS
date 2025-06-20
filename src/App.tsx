import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LoginForm } from './components/Auth/LoginForm';
import { Sidebar } from './components/Layout/Sidebar';
import { Header } from './components/Layout/Header';
import { FoundersHQ } from './components/Modules/FoundersHQ';
import { LegalVault } from './components/Modules/LegalVault';
import { FinanceCenter } from './components/Modules/FinanceCenter';
import { ServicesHub } from './components/Modules/ServicesHub';
import { ClientPortal } from './components/Modules/ClientPortal';
import { Operations } from './components/Modules/Operations';
import { KnowledgeBase } from './components/Modules/KnowledgeBase';
import { BrandCenter } from './components/Modules/BrandCenter';
import { Analytics } from './components/Modules/Analytics';
import { Settings } from './components/Modules/Settings';

const AppContent: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const [activeModule, setActiveModule] = useState('headquarters');
  const [isSignup, setIsSignup] = useState(false);

  // Set default module based on user role
  useEffect(() => {
    if (user) {
      if (user.role === 'client') {
        setActiveModule('clients');
      } else {
        setActiveModule('headquarters');
      }
    }
  }, [user]);

  if (!isAuthenticated) {
    return (
      <LoginForm 
        onToggleMode={() => setIsSignup(!isSignup)} 
        isSignup={isSignup} 
      />
    );
  }

  const renderModule = () => {
    switch (activeModule) {
      case 'headquarters':
        return <FoundersHQ />;
      case 'legal':
        return <LegalVault />;
      case 'finance':
        return <FinanceCenter />;
      case 'services':
        return <ServicesHub />;
      case 'clients':
        return <ClientPortal />;
      case 'operations':
        return <Operations />;
      case 'wiki':
        return <KnowledgeBase />;
      case 'brand':
        return <BrandCenter />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <Settings />;
      default:
        return <FoundersHQ />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeModule={activeModule} onModuleChange={setActiveModule} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          activeModule={activeModule} 
          onSettingsClick={() => setActiveModule('settings')}
        />
        <main className="flex-1 overflow-auto p-6">
          {renderModule()}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;