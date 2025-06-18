import React, { useState } from 'react';
import { Users, Plus, Filter, Search, Mail, Phone, Building, Calendar, DollarSign, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { StatsCard } from '../Dashboard/StatsCard';

export const ClientPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedClient, setSelectedClient] = useState<string | null>(null);

  const clients = [
    {
      id: '1',
      name: 'TechCorp Solutions',
      contact: 'Sarah Johnson',
      email: 'sarah@techcorp.com',
      phone: '+1 (555) 123-4567',
      stage: 'active',
      value: 45000,
      services: ['NLP Analysis', 'Custom Dashboard'],
      lastContact: '2024-01-15',
      startDate: '2023-12-01',
      status: 'on-track'
    },
    {
      id: '2',
      name: 'InnovateLabs',
      contact: 'Mike Chen',
      email: 'mike@innovatelabs.com',
      phone: '+1 (555) 987-6543',
      stage: 'qualified',
      value: 25000,
      services: ['Automation Suite'],
      lastContact: '2024-01-12',
      startDate: '2024-02-01',
      status: 'pending'
    },
    {
      id: '3',
      name: 'DataFlow Inc',
      contact: 'Emma Rodriguez',
      email: 'emma@dataflow.com',
      phone: '+1 (555) 456-7890',
      stage: 'lead',
      value: 60000,
      services: ['ML Pipeline', 'Analytics Dashboard'],
      lastContact: '2024-01-10',
      startDate: null,
      status: 'qualifying'
    }
  ];

  const tabs = [
    { id: 'overview', name: 'Overview', icon: Users },
    { id: 'pipeline', name: 'Pipeline', icon: DollarSign },
    { id: 'active', name: 'Active Projects', icon: CheckCircle },
    { id: 'templates', name: 'Templates', icon: Plus },
  ];

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'lead': return 'bg-yellow-100 text-yellow-700';
      case 'qualified': return 'bg-blue-100 text-blue-700';
      case 'active': return 'bg-green-100 text-green-700';
      case 'completed': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'on-track': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'qualifying': return <AlertCircle className="w-4 h-4 text-blue-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Clients"
          value="12"
          change={20}
          trend="up"
          icon={Users}
          color="blue"
        />
        <StatsCard
          title="Active Projects"
          value="8"
          change={12}
          trend="up"
          icon={CheckCircle}
          color="green"
        />
        <StatsCard
          title="Pipeline Value"
          value="$340K"
          change={25}
          trend="up"
          icon={DollarSign}
          color="purple"
        />
        <StatsCard
          title="Avg Project Value"
          value="$28K"
          change={5}
          trend="up"
          icon={DollarSign}
          color="orange"
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
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Search and Filters */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search clients..."
                      className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button className="flex items-center space-x-2 px-3 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
                    <Filter className="w-4 h-4" />
                    <span>Filter</span>
                  </button>
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  <span>Add Client</span>
                </button>
              </div>

              {/* Client List */}
              <div className="space-y-4">
                {clients.map((client) => (
                  <div key={client.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-gray-900">{client.name}</h3>
                          <span className={`px-2 py-1 text-xs rounded-full capitalize ${getStageColor(client.stage)}`}>
                            {client.stage}
                          </span>
                          {getStatusIcon(client.status)}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2 text-gray-600">
                              <Building className="w-4 h-4" />
                              <span>{client.contact}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-600">
                              <Mail className="w-4 h-4" />
                              <span>{client.email}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-600">
                              <Phone className="w-4 h-4" />
                              <span>{client.phone}</span>
                            </div>
                          </div>
                          
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2 text-gray-600">
                              <DollarSign className="w-4 h-4" />
                              <span>${client.value.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-600">
                              <Calendar className="w-4 h-4" />
                              <span>Last contact: {client.lastContact}</span>
                            </div>
                            {client.startDate && (
                              <div className="flex items-center space-x-2 text-gray-600">
                                <Calendar className="w-4 h-4" />
                                <span>Started: {client.startDate}</span>
                              </div>
                            )}
                          </div>
                          
                          <div>
                            <p className="text-gray-600 mb-1">Services:</p>
                            <div className="flex flex-wrap gap-1">
                              {client.services.map((service, index) => (
                                <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                                  {service}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-4">
                        <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded">
                          View
                        </button>
                        <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded">
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'pipeline' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                {['Lead', 'Qualified', 'Proposal', 'Negotiation'].map((stage) => (
                  <div key={stage} className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">{stage}</h3>
                    <div className="space-y-3">
                      {clients
                        .filter(client => client.stage === stage.toLowerCase() || 
                          (stage === 'Lead' && client.stage === 'lead') ||
                          (stage === 'Qualified' && client.stage === 'qualified'))
                        .map((client) => (
                          <div key={client.id} className="bg-white p-3 rounded border border-gray-200">
                            <h4 className="font-medium text-gray-900 text-sm">{client.name}</h4>
                            <p className="text-xs text-gray-600 mt-1">{client.contact}</p>
                            <p className="text-sm font-medium text-green-600 mt-2">
                              ${client.value.toLocaleString()}
                            </p>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'active' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Active Client Projects</h3>
              <div className="space-y-4">
                {clients
                  .filter(client => client.stage === 'active')
                  .map((client) => (
                    <div key={client.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-gray-900">{client.name}</h4>
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                          Active
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <h5 className="font-medium text-gray-900 mb-2">Project Details</h5>
                          <div className="space-y-1 text-sm text-gray-600">
                            <p>Value: ${client.value.toLocaleString()}</p>
                            <p>Started: {client.startDate}</p>
                            <p>Contact: {client.contact}</p>
                          </div>
                        </div>
                        
                        <div>
                          <h5 className="font-medium text-gray-900 mb-2">Services</h5>
                          <div className="flex flex-wrap gap-1">
                            {client.services.map((service, index) => (
                              <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                                {service}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h5 className="font-medium text-gray-900 mb-2">Status</h5>
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(client.status)}
                            <span className="text-sm capitalize">{client.status.replace('-', ' ')}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <button className="text-sm text-blue-600 hover:underline">
                              View Workspace
                            </button>
                            <button className="text-sm text-gray-600 hover:underline">
                              Update Status
                            </button>
                            <button className="text-sm text-gray-600 hover:underline">
                              Send Update
                            </button>
                          </div>
                          <p className="text-xs text-gray-500">Last updated: {client.lastContact}</p>
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
                <h3 className="font-semibold text-gray-900">Client Templates</h3>
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  <span>Create Template</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    name: 'Client Onboarding',
                    description: 'Complete onboarding checklist for new clients',
                    type: 'Workflow',
                    uses: 12
                  },
                  {
                    name: 'Project Kickoff',
                    description: 'Standard kickoff meeting template and agenda',
                    type: 'Meeting',
                    uses: 8
                  },
                  {
                    name: 'Monthly Update',
                    description: 'Monthly progress report template for clients',
                    type: 'Report',
                    uses: 15
                  },
                  {
                    name: 'Project Handover',
                    description: 'Final deliverable and handover documentation',
                    type: 'Document',
                    uses: 6
                  },
                  {
                    name: 'NLP Service Proposal',
                    description: 'Pre-filled proposal for NLP analysis services',
                    type: 'Proposal',
                    uses: 4
                  },
                  {
                    name: 'Dashboard Demo',
                    description: 'Demo script and materials for dashboard presentations',
                    type: 'Presentation',
                    uses: 9
                  }
                ].map((template, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h4 className="font-semibold text-gray-900 mb-2">{template.name}</h4>
                    <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded">{template.type}</span>
                      <span className="text-gray-500">{template.uses} uses</span>
                    </div>
                    <div className="mt-3 flex items-center space-x-2">
                      <button className="flex-1 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors">
                        Use Template
                      </button>
                      <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded">
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};