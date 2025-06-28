import React, { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LoginForm } from './components/Auth/LoginForm';
import { Sidebar } from './components/Layout/Sidebar';
import { Header } from './components/Layout/Header';
import { ClientPortalApp } from './components/Client/ClientPortalApp';
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

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const InternalOSContent: React.FC = () => {
  const { profile } = useAuth();
  const [activeModule, setActiveModule] = useState('headquarters');

  // Set default module based on user role
  useEffect(() => {
    if (profile) {
      if (profile.role === 'admin') {
        setActiveModule('headquarters');
      } else if (profile.role === 'manager') {
        setActiveModule('services');
      } else if (profile.role === 'user') {
        setActiveModule('operations');
      }
    }
  }, [profile]);

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

const AppContent: React.FC = () => {
  const { isAuthenticated, profile, loading } = useAuth();
  const [isSignup, setIsSignup] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <LoginForm 
        onToggleMode={() => setIsSignup(!isSignup)} 
        isSignup={isSignup} 
      />
    );
  }

  // Route users based on their role
  if (profile?.role === 'client') {
    return <ClientPortalApp />;
  }

  // Internal staff (admin, manager, user) see the main OS
  return <InternalOSContent />;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;