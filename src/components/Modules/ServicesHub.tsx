import React, { useState } from 'react';
import { Package, Plus, Search, Filter, FileText, Clock, CheckCircle, Users, Tag, Star } from 'lucide-react';
import { StatsCard } from '../Dashboard/StatsCard';

export const ServicesHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState('catalog');
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const services = [
    {
      id: 'SVC-001',
      name: 'NLP Analysis & Implementation',
      category: 'nlp',
      description: 'Custom natural language processing solutions for text analysis, sentiment analysis, and content understanding',
      basePriceTier: 15000,
      estimatedHours: 120,
      tags: ['nlp', 'ai', 'machine-learning', 'text-analysis'],
      status: 'active',
      clientsUsed: 8,
      avgRating: 4.8,
      templates: ['proposal', 'sop', 'handover'],
      lastUpdated: '2024-01-10'
    },
    {
      id: 'SVC-002',
      name: 'Custom Dashboard Development',
      category: 'dashboards',
      description: 'Interactive data visualization dashboards with real-time analytics and custom reporting',
      basePriceTier: 12000,
      estimatedHours: 80,
      tags: ['dashboard', 'visualization', 'analytics', 'reporting'],
      status: 'active',
      clientsUsed: 12,
      avgRating: 4.9,
      templates: ['proposal', 'sop', 'handover'],
      lastUpdated: '2024-01-08'
    },
    {
      id: 'SVC-003',
      name: 'Business Process Automation',
      category: 'automation',
      description: 'End-to-end automation solutions using Zapier, Make, and custom integrations',
      basePriceTier: 8000,
      estimatedHours: 60,
      tags: ['automation', 'zapier', 'integration', 'workflow'],
      status: 'active',
      clientsUsed: 15,
      avgRating: 4.7,
      templates: ['proposal', 'sop', 'handover'],
      lastUpdated: '2024-01-12'
    },
    {
      id: 'SVC-004',
      name: 'AI Model Training & Deployment',
      category: 'custom',
      description: 'Custom machine learning model development, training, and cloud deployment',
      basePriceTier: 25000,
      estimatedHours: 200,
      tags: ['ai', 'machine-learning', 'deployment', 'cloud'],
      status: 'beta',
      clientsUsed: 3,
      avgRating: 4.6,
      templates: ['proposal', 'sop'],
      lastUpdated: '2024-01-15'
    }
  ];

  const sops = [
    {
      id: 'SOP-001',
      serviceId: 'SVC-001',
      title: 'NLP Project Delivery Process',
      version: 'v2.1',
      steps: 8,
      avgCompletionTime: '12 days',
      lastUpdated: '2024-01-10',
      status: 'active'
    },
    {
      id: 'SOP-002',
      serviceId: 'SVC-002',
      title: 'Dashboard Development Workflow',
      version: 'v1.8',
      steps: 6,
      avgCompletionTime: '8 days',
      lastUpdated: '2024-01-08',
      status: 'active'
    },
    {
      id: 'SOP-003',
      serviceId: 'SVC-003',
      title: 'Automation Implementation Guide',
      version: 'v1.5',
      steps: 5,
      avgCompletionTime: '5 days',
      lastUpdated: '2024-01-12',
      status: 'active'
    }
  ];

  const templates = [
    {
      id: 'TPL-001',
      name: 'NLP Service Proposal',
      type: 'proposal',
      serviceCategory: 'nlp',
      description: 'Comprehensive proposal template for NLP projects',
      variables: ['Client Name', 'Project Scope', 'Timeline', 'Budget'],
      uses: 24,
      lastUpdated: '2024-01-05'
    },
    {
      id: 'TPL-002',
      name: 'Dashboard Project Handover',
      type: 'handover',
      serviceCategory: 'dashboards',
      description: 'Complete handover documentation for dashboard projects',
      variables: ['Dashboard URL', 'Login Credentials', 'Maintenance Notes'],
      uses: 18,
      lastUpdated: '2024-01-03'
    },
    {
      id: 'TPL-003',
      name: 'Automation Setup SOP',
      type: 'sop',
      serviceCategory: 'automation',
      description: 'Step-by-step automation implementation process',
      variables: ['Tools Used', 'Trigger Events', 'Action Steps'],
      uses: 31,
      lastUpdated: '2024-01-12'
    }
  ];

  const tabs = [
    { id: 'catalog', name: 'Service Catalog', icon: Package },
    { id: 'sops', name: 'SOPs', icon: FileText },
    { id: 'templates', name: 'Templates', icon: Plus },
    { id: 'performance', name: 'Performance', icon: Star },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'nlp': return 'bg-purple-100 text-purple-700';
      case 'dashboards': return 'bg-blue-100 text-blue-700';
      case 'automation': return 'bg-green-100 text-green-700';
      case 'custom': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'beta': return 'bg-yellow-100 text-yellow-700';
      case 'deprecated': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-center space-x-3">
          <Package className="w-6 h-6 text-blue-600" />
          <div>
            <h3 className="font-semibold text-blue-900">Services Command Center</h3>
            <p className="text-blue-700 text-sm">Service catalog, SOPs, templates, and delivery workflows</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Active Services"
          value={services.filter(s => s.status === 'active').length}
          change={12}
          trend="up"
          icon={Package}
          color="blue"
        />
        <StatsCard
          title="Total Deliveries"
          value="38"
          change={25}
          trend="up"
          icon={CheckCircle}
          color="green"
        />
        <StatsCard
          title="Avg Rating"
          value="4.8"
          change={3}
          trend="up"
          icon={Star}
          color="purple"
        />
        <StatsCard
          title="Active SOPs"
          value={sops.filter(s => s.status === 'active').length}
          change={8}
          trend="up"
          icon={FileText}
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
          {activeTab === 'catalog' && (
            <div className="space-y-6">
              {/* Service Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search services..."
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
                  <span>Add Service</span>
                </button>
              </div>

              {/* Services Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {services.map((service) => (
                  <div key={service.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-gray-900">{service.name}</h3>
                          <span className={`px-2 py-1 text-xs rounded capitalize ${getCategoryColor(service.category)}`}>
                            {service.category}
                          </span>
                          <span className={`px-2 py-1 text-xs rounded capitalize ${getStatusColor(service.status)}`}>
                            {service.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{service.description}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div>
                        <span className="text-gray-600">Base Price:</span>
                        <p className="font-semibold text-green-600">${service.basePriceTier.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Est. Hours:</span>
                        <p className="font-medium">{service.estimatedHours}h</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Clients:</span>
                        <p className="font-medium">{service.clientsUsed}</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="font-medium">{service.avgRating}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-xs text-gray-600 mb-2">Tags:</p>
                      <div className="flex flex-wrap gap-1">
                        {service.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <span>Templates: {service.templates.length}</span>
                        <span>•</span>
                        <span>Updated: {service.lastUpdated}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded">
                          View Details
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

          {activeTab === 'sops' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Standard Operating Procedures</h3>
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  <span>Create SOP</span>
                </button>
              </div>

              <div className="space-y-4">
                {sops.map((sop) => {
                  const relatedService = services.find(s => s.id === sop.serviceId);
                  return (
                    <div key={sop.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="font-semibold text-gray-900">{sop.title}</h4>
                            <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">
                              {sop.version}
                            </span>
                            <span className={`px-2 py-1 text-xs rounded ${getStatusColor(sop.status)}`}>
                              {sop.status}
                            </span>
                          </div>
                          
                          {relatedService && (
                            <p className="text-sm text-gray-600 mb-2">
                              Service: {relatedService.name}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
                        <div>
                          <span className="text-gray-600">Steps:</span>
                          <p className="font-medium">{sop.steps}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Avg Completion:</span>
                          <p className="font-medium">{sop.avgCompletionTime}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Last Updated:</span>
                          <p className="font-medium">{sop.lastUpdated}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <div className="flex items-center space-x-4">
                          <button className="text-sm text-blue-600 hover:underline">
                            View SOP
                          </button>
                          <button className="text-sm text-gray-600 hover:underline">
                            Use Template
                          </button>
                        </div>
                        <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded">
                          Edit
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'templates' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Service Templates</h3>
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  <span>New Template</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates.map((template) => (
                  <div key={template.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{template.name}</h4>
                        <p className="text-sm text-gray-600 mb-2">{template.description}</p>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 text-xs rounded ${getCategoryColor(template.serviceCategory)}`}>
                            {template.serviceCategory}
                          </span>
                          <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded capitalize">
                            {template.type}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm mb-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Uses:</span>
                        <span className="font-medium">{template.uses}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Updated:</span>
                        <span className="font-medium">{template.lastUpdated}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-xs text-gray-600 mb-1">Variables:</p>
                      <div className="flex flex-wrap gap-1">
                        {template.variables.map((variable, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                            {variable}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
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

          {activeTab === 'performance' && (
            <div className="space-y-6">
              <h3 className="font-semibold text-gray-900">Service Performance Analytics</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Service Ratings</h4>
                  <div className="space-y-3">
                    {services.map((service) => (
                      <div key={service.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{service.name}</p>
                          <p className="text-sm text-gray-600">{service.clientsUsed} clients</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="font-medium">{service.avgRating}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Revenue by Service</h4>
                  <div className="space-y-3">
                    {services.map((service) => {
                      const revenue = service.basePriceTier * service.clientsUsed;
                      const percentage = Math.round((revenue / services.reduce((sum, s) => sum + (s.basePriceTier * s.clientsUsed), 0)) * 100);
                      
                      return (
                        <div key={service.id} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">{service.name}</span>
                            <span className="font-medium">${revenue.toLocaleString()}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-green-50 rounded-lg p-4">
                  <h5 className="font-medium text-green-900 mb-2">Top Performing Service</h5>
                  <p className="text-lg font-bold text-green-900">Custom Dashboards</p>
                  <p className="text-sm text-green-700">4.9 avg rating • 12 clients</p>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h5 className="font-medium text-blue-900 mb-2">Most Popular</h5>
                  <p className="text-lg font-bold text-blue-900">Process Automation</p>
                  <p className="text-sm text-blue-700">15 clients served</p>
                </div>

                <div className="bg-purple-50 rounded-lg p-4">
                  <h5 className="font-medium text-purple-900 mb-2">Highest Value</h5>
                  <p className="text-lg font-bold text-purple-900">AI Model Training</p>
                  <p className="text-sm text-purple-700">$25K base price</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};