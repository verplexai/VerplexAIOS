import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { ClientHeader } from './ClientHeader';
import { ClientSidebar } from './ClientSidebar';
import { ClientDashboard } from './ClientDashboard';
import { ClientProjects } from './ClientProjects';
import { ClientInvoices } from './ClientInvoices';
import { ClientCommunications } from './ClientCommunications';
import { ClientDocuments } from './ClientDocuments';
import { ClientSupport } from './ClientSupport';

export const ClientPortalApp: React.FC = () => {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <ClientDashboard />;
      case 'projects':
        return <ClientProjects />;
      case 'invoices':
        return <ClientInvoices />;
      case 'communications':
        return <ClientCommunications />;
      case 'documents':
        return <ClientDocuments />;
      case 'support':
        return <ClientSupport />;
      default:
        return <ClientDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <ClientHeader 
        user={user} 
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      
      <div className="flex">
        <ClientSidebar 
          activeSection={activeSection} 
          onSectionChange={setActiveSection}
        />
        
        <main className="flex-1 p-6 ml-64">
          <div className="max-w-7xl mx-auto">
            {renderSection()}
          </div>
        </main>
      </div>
    </div>
  );
};