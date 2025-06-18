import React, { useState } from 'react';
import { Shield, FileText, Plus, Search, Filter, Calendar, AlertTriangle, CheckCircle, Clock, Download, Eye } from 'lucide-react';
import { StatsCard } from '../Dashboard/StatsCard';
import { useAuth } from '../../contexts/AuthContext';

export const LegalVault: React.FC = () => {
  const { hasPermission } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedContract, setSelectedContract] = useState<string | null>(null);

  if (!hasPermission('legal', 'view')) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900">Access Restricted</h3>
          <p className="text-gray-600">You don't have permission to view this module.</p>
        </div>
      </div>
    );
  }

  const contracts = [
    {
      id: 'NDA-001',
      type: 'NDA',
      client: 'TechCorp Solutions',
      status: 'signed',
      signedDate: '2024-01-10',
      expiryDate: '2025-01-10',
      value: null,
      documents: ['nda-techcorp-signed.pdf'],
      lastUpdated: '2024-01-10'
    },
    {
      id: 'MSA-001',
      type: 'MSA',
      client: 'InnovateLabs',
      status: 'sent',
      signedDate: null,
      expiryDate: '2024-12-31',
      value: 50000,
      documents: ['msa-innovatelabs-draft.pdf'],
      lastUpdated: '2024-01-12'
    },
    {
      id: 'SOW-001',
      type: 'SOW',
      client: 'DataFlow Inc',
      status: 'draft',
      signedDate: null,
      expiryDate: null,
      value: 75000,
      documents: ['sow-dataflow-draft.pdf'],
      lastUpdated: '2024-01-14'
    },
    {
      id: 'DPA-001',
      type: 'DPA',
      client: 'TechCorp Solutions',
      status: 'signed',
      signedDate: '2024-01-10',
      expiryDate: '2025-01-10',
      value: null,
      documents: ['dpa-techcorp-signed.pdf'],
      lastUpdated: '2024-01-10'
    }
  ];

  const templates = [
    {
      id: 'TPL-NDA-001',
      name: 'Standard NDA Template',
      type: 'NDA',
      description: 'Mutual non-disclosure agreement for client discussions',
      lastUpdated: '2024-01-01',
      uses: 15,
      variables: ['Client Name', 'Date', 'Jurisdiction']
    },
    {
      id: 'TPL-MSA-001',
      name: 'Master Service Agreement',
      type: 'MSA',
      description: 'Standard MSA for ongoing client relationships',
      lastUpdated: '2023-12-15',
      uses: 8,
      variables: ['Client Name', 'Services', 'Payment Terms', 'Liability Cap']
    },
    {
      id: 'TPL-SOW-001',
      name: 'Statement of Work Template',
      type: 'SOW',
      description: 'Project-specific work agreement template',
      lastUpdated: '2024-01-05',
      uses: 12,
      variables: ['Project Name', 'Deliverables', 'Timeline', 'Budget']
    },
    {
      id: 'TPL-DPA-001',
      name: 'Data Processing Agreement',
      type: 'DPA',
      description: 'GDPR-compliant data processing agreement',
      lastUpdated: '2023-11-20',
      uses: 6,
      variables: ['Data Types', 'Processing Purpose', 'Retention Period']
    }
  ];

  const tabs = [
    { id: 'overview', name: 'Overview', icon: Shield },
    { id: 'contracts', name: 'Active Contracts', icon: FileText },
    { id: 'templates', name: 'Legal Templates', icon: Plus },
    { id: 'compliance', name: 'Compliance', icon: CheckCircle },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-700';
      case 'sent': return 'bg-blue-100 text-blue-700';
      case 'signed': return 'bg-green-100 text-green-700';
      case 'expired': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft': return <Clock className="w-4 h-4 text-gray-500" />;
      case 'sent': return <AlertTriangle className="w-4 h-4 text-blue-500" />;
      case 'signed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'expired': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'NDA': return 'bg-purple-100 text-purple-700';
      case 'MSA': return 'bg-blue-100 text-blue-700';
      case 'SOW': return 'bg-green-100 text-green-700';
      case 'DPA': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Security Alert */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl p-4">
        <div className="flex items-center space-x-3">
          <Shield className="w-6 h-6 text-red-600" />
          <div>
            <h3 className="font-semibold text-red-900">Legal & Compliance Vault</h3>
            <p className="text-red-700 text-sm">Secure document management and contract lifecycle tracking</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Active Contracts"
          value={contracts.filter(c => c.status === 'signed').length}
          change={15}
          trend="up"
          icon={FileText}
          color="green"
        />
        <StatsCard
          title="Pending Signatures"
          value={contracts.filter(c => c.status === 'sent').length}
          change={-5}
          trend="down"
          icon={Clock}
          color="orange"
        />
        <StatsCard
          title="Contract Value"
          value="$125K"
          change={20}
          trend="up"
          icon={Shield}
          color="blue"
        />
        <StatsCard
          title="Expiring Soon"
          value="2"
          change={0}
          trend="neutral"
          icon={AlertTriangle}
          color="red"
        />
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-red-500 text-red-600'
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
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Recent Activity</h3>
                  <div className="space-y-3">
                    {[
                      { date: '2024-01-14', action: 'SOW-001 created for DataFlow Inc', type: 'create' },
                      { date: '2024-01-12', action: 'MSA-001 sent to InnovateLabs', type: 'sent' },
                      { date: '2024-01-10', action: 'NDA-001 signed by TechCorp Solutions', type: 'signed' },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className={`w-2 h-2 rounded-full ${
                          item.type === 'signed' ? 'bg-green-500' : 
                          item.type === 'sent' ? 'bg-blue-500' : 'bg-gray-500'
                        }`} />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{item.action}</p>
                          <p className="text-xs text-gray-500">{item.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Compliance Status</h3>
                  <div className="space-y-3">
                    {[
                      { item: 'GDPR Compliance', status: 'compliant', lastReview: '2024-01-01' },
                      { item: 'Contract Templates Updated', status: 'compliant', lastReview: '2024-01-05' },
                      { item: 'Legal Review Schedule', status: 'pending', lastReview: '2023-12-15' },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{item.item}</p>
                          <p className="text-xs text-gray-500">Last review: {item.lastReview}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          item.status === 'compliant' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'contracts' && (
            <div className="space-y-6">
              {/* Contract Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search contracts..."
                      className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <button className="flex items-center space-x-2 px-3 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
                    <Filter className="w-4 h-4" />
                    <span>Filter</span>
                  </button>
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  <span>New Contract</span>
                </button>
              </div>

              {/* Contracts List */}
              <div className="space-y-4">
                {contracts.map((contract) => (
                  <div key={contract.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-semibold text-gray-900">{contract.id}</h4>
                          <span className={`px-2 py-1 text-xs rounded ${getTypeColor(contract.type)}`}>
                            {contract.type}
                          </span>
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(contract.status)}
                            <span className={`px-2 py-1 text-xs rounded capitalize ${getStatusColor(contract.status)}`}>
                              {contract.status}
                            </span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Client:</span>
                            <p className="font-medium">{contract.client}</p>
                          </div>
                          
                          {contract.value && (
                            <div>
                              <span className="text-gray-600">Value:</span>
                              <p className="font-medium">${contract.value.toLocaleString()}</p>
                            </div>
                          )}
                          
                          <div>
                            <span className="text-gray-600">
                              {contract.signedDate ? 'Signed:' : 'Last Updated:'}
                            </span>
                            <p className="font-medium">
                              {contract.signedDate || contract.lastUpdated}
                            </p>
                          </div>
                        </div>

                        {contract.expiryDate && (
                          <div className="mt-2">
                            <span className="text-gray-600 text-sm">Expires:</span>
                            <span className="font-medium text-sm ml-1">{contract.expiryDate}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-4">
                        <button className="p-2 text-gray-600 hover:bg-gray-50 rounded">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-600 hover:bg-gray-50 rounded">
                          <Download className="w-4 h-4" />
                        </button>
                        {hasPermission('legal', 'edit') && (
                          <button className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded">
                            Edit
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>Documents: {contract.documents.length}</span>
                          <span>Updated: {contract.lastUpdated}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'templates' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Legal Document Templates</h3>
                {hasPermission('legal', 'edit') && (
                  <button className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                    <Plus className="w-4 h-4" />
                    <span>New Template</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {templates.map((template) => (
                  <div key={template.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{template.name}</h4>
                        <p className="text-sm text-gray-600 mb-2">{template.description}</p>
                        <span className={`px-2 py-1 text-xs rounded ${getTypeColor(template.type)}`}>
                          {template.type}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Uses:</span>
                        <span className="font-medium">{template.uses}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Updated:</span>
                        <span className="font-medium">{template.lastUpdated}</span>
                      </div>
                    </div>

                    <div className="mt-3">
                      <p className="text-xs text-gray-600 mb-1">Variables:</p>
                      <div className="flex flex-wrap gap-1">
                        {template.variables.map((variable, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                            {variable}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 flex items-center space-x-2">
                      <button className="flex-1 px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors">
                        Use Template
                      </button>
                      {hasPermission('legal', 'edit') && (
                        <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded">
                          Edit
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'compliance' && (
            <div className="space-y-6">
              <h3 className="font-semibold text-gray-900">Compliance Dashboard</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Regulatory Compliance</h4>
                  {[
                    { name: 'GDPR Compliance', status: 'compliant', lastAudit: '2024-01-01', nextReview: '2024-07-01' },
                    { name: 'CCPA Compliance', status: 'compliant', lastAudit: '2023-12-15', nextReview: '2024-06-15' },
                    { name: 'SOC 2 Type II', status: 'in-progress', lastAudit: '2023-11-01', nextReview: '2024-05-01' },
                  ].map((item, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-gray-900">{item.name}</h5>
                        <span className={`px-2 py-1 text-xs rounded ${
                          item.status === 'compliant' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                        <div>
                          <span>Last Audit:</span>
                          <p className="font-medium">{item.lastAudit}</p>
                        </div>
                        <div>
                          <span>Next Review:</span>
                          <p className="font-medium">{item.nextReview}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Document Compliance</h4>
                  {[
                    { name: 'Privacy Policy', status: 'current', lastUpdate: '2024-01-01', version: 'v2.1' },
                    { name: 'Terms of Service', status: 'current', lastUpdate: '2023-12-20', version: 'v1.8' },
                    { name: 'Cookie Policy', status: 'needs-update', lastUpdate: '2023-10-15', version: 'v1.2' },
                  ].map((item, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-gray-900">{item.name}</h5>
                        <span className={`px-2 py-1 text-xs rounded ${
                          item.status === 'current' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                        <div>
                          <span>Version:</span>
                          <p className="font-medium">{item.version}</p>
                        </div>
                        <div>
                          <span>Updated:</span>
                          <p className="font-medium">{item.lastUpdate}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};