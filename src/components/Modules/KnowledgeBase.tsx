import React, { useState } from 'react';
import { BookOpen, Search, Plus, Filter, FileText, Video, Link, Users, Tag, Clock, Eye, ThumbsUp } from 'lucide-react';
import { StatsCard } from '../Dashboard/StatsCard';

export const KnowledgeBase: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  const articles = [
    {
      id: 'KB-001',
      title: 'Getting Started with NLP Projects',
      category: 'AI/ML',
      type: 'guide',
      content: 'Comprehensive guide to starting NLP projects...',
      author: 'Sarah Johnson',
      views: 245,
      likes: 18,
      lastUpdated: '2024-01-10',
      tags: ['nlp', 'getting-started', 'ai'],
      readTime: '8 min'
    },
    {
      id: 'KB-002',
      title: 'Dashboard Design Best Practices',
      category: 'Design',
      type: 'tutorial',
      content: 'Learn how to create effective dashboards...',
      author: 'Mike Chen',
      views: 189,
      likes: 24,
      lastUpdated: '2024-01-08',
      tags: ['dashboard', 'design', 'ux'],
      readTime: '12 min'
    },
    {
      id: 'KB-003',
      title: 'Zapier Integration Workflows',
      category: 'Automation',
      type: 'tutorial',
      content: 'Step-by-step automation setup guide...',
      author: 'Emma Rodriguez',
      views: 156,
      likes: 15,
      lastUpdated: '2024-01-12',
      tags: ['zapier', 'automation', 'integration'],
      readTime: '6 min'
    },
    {
      id: 'KB-004',
      title: 'Client Communication Templates',
      category: 'Communication',
      type: 'template',
      content: 'Email templates for client communication...',
      author: 'Alex Founder',
      views: 298,
      likes: 32,
      lastUpdated: '2024-01-05',
      tags: ['communication', 'templates', 'client'],
      readTime: '4 min'
    }
  ];

  const trainings = [
    {
      id: 'TRN-001',
      title: 'AI Engineer Onboarding',
      description: 'Complete onboarding track for AI engineers',
      modules: 8,
      duration: '4 hours',
      completions: 12,
      rating: 4.8,
      lastUpdated: '2024-01-01'
    },
    {
      id: 'TRN-002',
      title: 'Sales Process Training',
      description: 'End-to-end sales process and CRM usage',
      modules: 6,
      duration: '2.5 hours',
      completions: 8,
      rating: 4.6,
      lastUpdated: '2023-12-20'
    },
    {
      id: 'TRN-003',
      title: 'Client Success Fundamentals',
      description: 'Best practices for client relationship management',
      modules: 5,
      duration: '3 hours',
      completions: 15,
      rating: 4.9,
      lastUpdated: '2024-01-08'
    }
  ];

  const tools = [
    {
      id: 'TOOL-001',
      name: 'OpenAI GPT-4',
      category: 'AI/ML',
      description: 'Large language model for text generation and analysis',
      documentation: 'https://platform.openai.com/docs',
      internalGuide: 'KB-005',
      usage: 'Active',
      team: ['AI Team', 'Development']
    },
    {
      id: 'TOOL-002',
      name: 'Figma',
      category: 'Design',
      description: 'Collaborative design and prototyping tool',
      documentation: 'https://help.figma.com',
      internalGuide: 'KB-006',
      usage: 'Active',
      team: ['Design', 'Product']
    },
    {
      id: 'TOOL-003',
      name: 'Zapier',
      category: 'Automation',
      description: 'Workflow automation platform',
      documentation: 'https://zapier.com/help',
      internalGuide: 'KB-007',
      usage: 'Active',
      team: ['Operations', 'Development']
    }
  ];

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BookOpen },
    { id: 'articles', name: 'Articles & Guides', icon: FileText },
    { id: 'training', name: 'Training', icon: Video },
    { id: 'tools', name: 'Tools & Resources', icon: Link },
  ];

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'ai/ml': return 'bg-purple-100 text-purple-700';
      case 'design': return 'bg-blue-100 text-blue-700';
      case 'automation': return 'bg-green-100 text-green-700';
      case 'communication': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'guide': return <BookOpen className="w-4 h-4" />;
      case 'tutorial': return <Video className="w-4 h-4" />;
      case 'template': return <FileText className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-4">
        <div className="flex items-center space-x-3">
          <BookOpen className="w-6 h-6 text-green-600" />
          <div>
            <h3 className="font-semibold text-green-900">Knowledge Base</h3>
            <p className="text-green-700 text-sm">Internal wiki, training materials, and documentation</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Articles"
          value={articles.length}
          change={15}
          trend="up"
          icon={FileText}
          color="blue"
        />
        <StatsCard
          title="Training Modules"
          value={trainings.reduce((sum, t) => sum + t.modules, 0)}
          change={8}
          trend="up"
          icon={Video}
          color="green"
        />
        <StatsCard
          title="Total Views"
          value={articles.reduce((sum, a) => sum + a.views, 0)}
          change={22}
          trend="up"
          icon={Eye}
          color="purple"
        />
        <StatsCard
          title="Active Tools"
          value={tools.filter(t => t.usage === 'Active').length}
          change={5}
          trend="up"
          icon={Link}
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
                    ? 'border-green-500 text-green-600'
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
                  <h3 className="font-semibold text-gray-900">Popular Articles</h3>
                  <div className="space-y-3">
                    {articles
                      .sort((a, b) => b.views - a.views)
                      .slice(0, 5)
                      .map((article) => (
                        <div key={article.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          {getTypeIcon(article.type)}
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{article.title}</p>
                            <div className="flex items-center space-x-2 text-xs text-gray-500">
                              <span>{article.views} views</span>
                              <span>•</span>
                              <span>{article.readTime}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1">
                            <ThumbsUp className="w-3 h-3 text-gray-400" />
                            <span className="text-xs text-gray-500">{article.likes}</span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Recent Updates</h3>
                  <div className="space-y-3">
                    {articles
                      .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
                      .slice(0, 5)
                      .map((article) => (
                        <div key={article.id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{article.title}</p>
                            <p className="text-xs text-gray-500">Updated {article.lastUpdated} by {article.author}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">Most Viewed</h4>
                  <p className="text-lg font-bold text-blue-900">Client Communication Templates</p>
                  <p className="text-sm text-blue-700">298 views this month</p>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-medium text-green-900 mb-2">Top Training</h4>
                  <p className="text-lg font-bold text-green-900">Client Success Fundamentals</p>
                  <p className="text-sm text-green-700">4.9 rating • 15 completions</p>
                </div>

                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-medium text-purple-900 mb-2">Active Contributors</h4>
                  <p className="text-lg font-bold text-purple-900">4 Team Members</p>
                  <p className="text-sm text-purple-700">Contributing to knowledge base</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'articles' && (
            <div className="space-y-6">
              {/* Article Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search articles..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <button className="flex items-center space-x-2 px-3 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
                    <Filter className="w-4 h-4" />
                    <span>Filter</span>
                  </button>
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  <span>New Article</span>
                </button>
              </div>

              {/* Articles Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredArticles.map((article) => (
                  <div key={article.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          {getTypeIcon(article.type)}
                          <h4 className="font-semibold text-gray-900">{article.title}</h4>
                        </div>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{article.content}</p>
                        <div className="flex items-center space-x-2 mb-2">
                          <span className={`px-2 py-1 text-xs rounded ${getCategoryColor(article.category)}`}>
                            {article.category}
                          </span>
                          <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded capitalize">
                            {article.type}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {article.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                      <span>By {article.author}</span>
                      <span>{article.readTime} read</span>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{article.views}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <ThumbsUp className="w-4 h-4" />
                          <span>{article.likes}</span>
                        </div>
                        <span>Updated {article.lastUpdated}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="px-3 py-1 text-sm text-green-600 hover:bg-green-50 rounded">
                          Read
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

          {activeTab === 'training' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Training Programs</h3>
                <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  <span>Create Training</span>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {trainings.map((training) => (
                  <div key={training.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-2">{training.title}</h4>
                        <p className="text-sm text-gray-600 mb-3">{training.description}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div>
                        <span className="text-gray-600">Modules:</span>
                        <p className="font-medium">{training.modules}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Duration:</span>
                        <p className="font-medium">{training.duration}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Completions:</span>
                        <p className="font-medium">{training.completions}</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="text-gray-600">Rating:</span>
                        <div className="flex items-center space-x-1">
                          <span className="font-medium">{training.rating}</span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <div
                                key={i}
                                className={`w-3 h-3 ${
                                  i < Math.floor(training.rating) ? 'text-yellow-400' : 'text-gray-300'
                                }`}
                              >
                                ★
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-sm text-gray-500">Updated {training.lastUpdated}</span>
                      <div className="flex items-center space-x-2">
                        <button className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors">
                          Start Training
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

          {activeTab === 'tools' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Tools & Resources</h3>
                <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  <span>Add Tool</span>
                </button>
              </div>

              <div className="space-y-4">
                {tools.map((tool) => (
                  <div key={tool.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-semibold text-gray-900">{tool.name}</h4>
                          <span className={`px-2 py-1 text-xs rounded ${getCategoryColor(tool.category)}`}>
                            {tool.category}
                          </span>
                          <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded">
                            {tool.usage}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{tool.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="text-gray-600">Teams: {tool.team.join(', ')}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <a
                          href={tool.documentation}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded"
                        >
                          Documentation
                        </a>
                        <button className="px-3 py-1 text-sm text-green-600 hover:bg-green-50 rounded">
                          Internal Guide
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
        </div>
      </div>
    </div>
  );
};