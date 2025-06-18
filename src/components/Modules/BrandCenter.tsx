import React, { useState } from 'react';
import { Palette, Download, Eye, Upload, Plus, Search, Filter, Image, FileText, Link, Zap } from 'lucide-react';
import { StatsCard } from '../Dashboard/StatsCard';

export const BrandCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const brandAssets = [
    {
      id: 'ASSET-001',
      name: 'Verplex Logo - Primary',
      type: 'logo',
      format: 'SVG',
      size: '2.4 KB',
      category: 'logos',
      downloads: 45,
      lastUpdated: '2024-01-01',
      preview: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
      id: 'ASSET-002',
      name: 'Verplex Logo - White',
      type: 'logo',
      format: 'PNG',
      size: '15.2 KB',
      category: 'logos',
      downloads: 32,
      lastUpdated: '2024-01-01',
      preview: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
      id: 'ASSET-003',
      name: 'Brand Guidelines PDF',
      type: 'document',
      format: 'PDF',
      size: '2.8 MB',
      category: 'guidelines',
      downloads: 28,
      lastUpdated: '2023-12-20',
      preview: null
    },
    {
      id: 'ASSET-004',
      name: 'Color Palette Swatches',
      type: 'colors',
      format: 'ASE',
      size: '1.2 KB',
      category: 'colors',
      downloads: 18,
      lastUpdated: '2023-12-15',
      preview: null
    },
    {
      id: 'ASSET-005',
      name: 'Marketing Banner Template',
      type: 'template',
      format: 'PSD',
      size: '12.5 MB',
      category: 'templates',
      downloads: 15,
      lastUpdated: '2024-01-05',
      preview: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    }
  ];

  const brandGuidelines = {
    colors: {
      primary: '#2563EB',
      secondary: '#7C3AED',
      accent: '#059669',
      neutral: '#6B7280',
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444'
    },
    typography: {
      primary: 'Inter',
      secondary: 'Roboto Mono',
      headings: 'Inter',
      body: 'Inter'
    },
    voice: {
      tone: 'Professional, Innovative, Approachable',
      personality: 'Expert, Reliable, Forward-thinking',
      language: 'Clear, Technical when needed, Human-centered'
    }
  };

  const socialMedia = [
    {
      platform: 'LinkedIn',
      handle: '@verplex-ai',
      url: 'https://linkedin.com/company/verplex-ai',
      status: 'active',
      followers: '1.2K',
      lastPost: '2024-01-14'
    },
    {
      platform: 'Twitter',
      handle: '@verplexai',
      url: 'https://twitter.com/verplexai',
      status: 'active',
      followers: '856',
      lastPost: '2024-01-13'
    },
    {
      platform: 'GitHub',
      handle: '@verplex',
      url: 'https://github.com/verplex',
      status: 'active',
      followers: '234',
      lastPost: '2024-01-12'
    }
  ];

  const domains = [
    {
      domain: 'verplex.ai',
      type: 'primary',
      status: 'active',
      registrar: 'Namecheap',
      expires: '2025-03-15',
      autoRenew: true
    },
    {
      domain: 'verplex.com',
      type: 'redirect',
      status: 'active',
      registrar: 'Namecheap',
      expires: '2025-03-15',
      autoRenew: true
    },
    {
      domain: 'getverplex.com',
      type: 'marketing',
      status: 'parked',
      registrar: 'GoDaddy',
      expires: '2024-08-20',
      autoRenew: false
    }
  ];

  const tabs = [
    { id: 'overview', name: 'Overview', icon: Palette },
    { id: 'assets', name: 'Brand Assets', icon: Image },
    { id: 'guidelines', name: 'Brand Guidelines', icon: FileText },
    { id: 'digital', name: 'Digital Presence', icon: Link },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'logos': return 'bg-purple-100 text-purple-700';
      case 'guidelines': return 'bg-blue-100 text-blue-700';
      case 'colors': return 'bg-green-100 text-green-700';
      case 'templates': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'logo': return <Image className="w-4 h-4" />;
      case 'document': return <FileText className="w-4 h-4" />;
      case 'colors': return <Palette className="w-4 h-4" />;
      case 'template': return <Zap className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'parked': return 'bg-yellow-100 text-yellow-700';
      case 'expired': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-4">
        <div className="flex items-center space-x-3">
          <Palette className="w-6 h-6 text-purple-600" />
          <div>
            <h3 className="font-semibold text-purple-900">Brand & Asset Center</h3>
            <p className="text-purple-700 text-sm">Brand guidelines, logos, messaging, and marketing assets</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Brand Assets"
          value={brandAssets.length}
          change={8}
          trend="up"
          icon={Image}
          color="purple"
        />
        <StatsCard
          title="Total Downloads"
          value={brandAssets.reduce((sum, asset) => sum + asset.downloads, 0)}
          change={15}
          trend="up"
          icon={Download}
          color="blue"
        />
        <StatsCard
          title="Social Followers"
          value="2.3K"
          change={12}
          trend="up"
          icon={Link}
          color="green"
        />
        <StatsCard
          title="Active Domains"
          value={domains.filter(d => d.status === 'active').length}
          change={0}
          trend="neutral"
          icon={Zap}
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
                    ? 'border-purple-500 text-purple-600'
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
                  <h3 className="font-semibold text-gray-900">Brand Identity</h3>
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center">
                        <Palette className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900">Verplex</h4>
                        <p className="text-gray-600">AI-Powered Digital Solutions</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700">
                      Verplex represents innovation, reliability, and cutting-edge AI technology. 
                      Our brand embodies the perfect blend of technical expertise and human-centered design.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">Brand Colors</h4>
                    <div className="grid grid-cols-4 gap-3">
                      {Object.entries(brandGuidelines.colors).map(([name, color]) => (
                        <div key={name} className="text-center">
                          <div 
                            className="w-full h-12 rounded-lg border border-gray-200 mb-2"
                            style={{ backgroundColor: color }}
                          ></div>
                          <p className="text-xs font-medium text-gray-900 capitalize">{name}</p>
                          <p className="text-xs text-gray-500">{color}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Recent Activity</h3>
                  <div className="space-y-3">
                    {[
                      { date: '2024-01-14', action: 'Logo downloaded by Marketing Team', type: 'download' },
                      { date: '2024-01-12', action: 'Brand guidelines updated', type: 'update' },
                      { date: '2024-01-10', action: 'New marketing template added', type: 'create' },
                      { date: '2024-01-08', action: 'Social media assets requested', type: 'request' },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className={`w-2 h-2 rounded-full ${
                          item.type === 'download' ? 'bg-blue-500' : 
                          item.type === 'update' ? 'bg-green-500' : 
                          item.type === 'create' ? 'bg-purple-500' : 'bg-orange-500'
                        }`} />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{item.action}</p>
                          <p className="text-xs text-gray-500">{item.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">Quick Actions</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <button className="flex items-center justify-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <Download className="w-4 h-4" />
                        <span className="text-sm">Download Logo</span>
                      </button>
                      <button className="flex items-center justify-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <Eye className="w-4 h-4" />
                        <span className="text-sm">View Guidelines</span>
                      </button>
                      <button className="flex items-center justify-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <Upload className="w-4 h-4" />
                        <span className="text-sm">Upload Asset</span>
                      </button>
                      <button className="flex items-center justify-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <Plus className="w-4 h-4" />
                        <span className="text-sm">New Template</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'assets' && (
            <div className="space-y-6">
              {/* Asset Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search assets..."
                      className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <button className="flex items-center space-x-2 px-3 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
                    <Filter className="w-4 h-4" />
                    <span>Filter</span>
                  </button>
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  <Upload className="w-4 h-4" />
                  <span>Upload Asset</span>
                </button>
              </div>

              {/* Assets Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {brandAssets.map((asset) => (
                  <div key={asset.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                      {asset.preview ? (
                        <img 
                          src={asset.preview} 
                          alt={asset.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex flex-col items-center space-y-2">
                          {getTypeIcon(asset.type)}
                          <span className="text-xs text-gray-500">{asset.format}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <h4 className="font-medium text-gray-900 text-sm leading-tight">{asset.name}</h4>
                        <span className={`px-2 py-1 text-xs rounded ${getCategoryColor(asset.category)}`}>
                          {asset.category}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{asset.format} • {asset.size}</span>
                        <span>{asset.downloads} downloads</span>
                      </div>

                      <p className="text-xs text-gray-500">Updated {asset.lastUpdated}</p>
                    </div>

                    <div className="mt-4 flex items-center space-x-2">
                      <button className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-purple-600 text-white text-sm rounded hover:bg-purple-700 transition-colors">
                        <Download className="w-3 h-3" />
                        <span>Download</span>
                      </button>
                      <button className="p-2 text-gray-600 hover:bg-gray-50 rounded">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'guidelines' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Brand Guidelines</h3>
                <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="border border-gray-200 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Typography</h4>
                    <div className="space-y-4">
                      {Object.entries(brandGuidelines.typography).map(([type, font]) => (
                        <div key={type} className="flex items-center justify-between">
                          <span className="text-gray-600 capitalize">{type}:</span>
                          <span className="font-medium" style={{ fontFamily: font }}>{font}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Logo Usage</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                        <p>Use primary logo on light backgrounds</p>
                      </div>
                      <div className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                        <p>Use white logo on dark backgrounds</p>
                      </div>
                      <div className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                        <p>Maintain minimum clear space of 2x logo height</p>
                      </div>
                      <div className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                        <p>Don't stretch, rotate, or modify the logo</p>
                      </div>
                      <div className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                        <p>Don't use logo on busy backgrounds</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="border border-gray-200 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Brand Voice</h4>
                    <div className="space-y-4">
                      {Object.entries(brandGuidelines.voice).map(([aspect, description]) => (
                        <div key={aspect}>
                          <h5 className="font-medium text-gray-900 capitalize mb-1">{aspect}:</h5>
                          <p className="text-sm text-gray-600">{description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Messaging</h4>
                    <div className="space-y-3">
                      <div>
                        <h5 className="font-medium text-gray-900 mb-1">Tagline:</h5>
                        <p className="text-sm text-gray-600">"AI-Powered Digital Solutions"</p>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-900 mb-1">Mission:</h5>
                        <p className="text-sm text-gray-600">
                          Empowering businesses with intelligent automation and data-driven insights.
                        </p>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-900 mb-1">Value Proposition:</h5>
                        <p className="text-sm text-gray-600">
                          Transform your business operations with custom AI solutions that deliver measurable results.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'digital' && (
            <div className="space-y-6">
              <h3 className="font-semibold text-gray-900">Digital Presence</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Social Media Accounts</h4>
                  <div className="space-y-3">
                    {socialMedia.map((social, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <h5 className="font-medium text-gray-900">{social.platform}</h5>
                            <span className={`px-2 py-1 text-xs rounded ${getStatusColor(social.status)}`}>
                              {social.status}
                            </span>
                          </div>
                          <a 
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-600 hover:text-purple-700"
                          >
                            <Link className="w-4 h-4" />
                          </a>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-sm">
                          <div>
                            <span className="text-gray-600">Handle:</span>
                            <p className="font-medium">{social.handle}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Followers:</span>
                            <p className="font-medium">{social.followers}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Last Post:</span>
                            <p className="font-medium">{social.lastPost}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Domain Portfolio</h4>
                  <div className="space-y-3">
                    {domains.map((domain, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <h5 className="font-medium text-gray-900">{domain.domain}</h5>
                            <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">
                              {domain.type}
                            </span>
                            <span className={`px-2 py-1 text-xs rounded ${getStatusColor(domain.status)}`}>
                              {domain.status}
                            </span>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-gray-600">Registrar:</span>
                            <p className="font-medium">{domain.registrar}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Expires:</span>
                            <p className="font-medium">{domain.expires}</p>
                          </div>
                        </div>
                        <div className="mt-2 flex items-center space-x-2">
                          <span className="text-xs text-gray-600">Auto-renew:</span>
                          <span className={`text-xs ${domain.autoRenew ? 'text-green-600' : 'text-red-600'}`}>
                            {domain.autoRenew ? 'Enabled' : 'Disabled'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};