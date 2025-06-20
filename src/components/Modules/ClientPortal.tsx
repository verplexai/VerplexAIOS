import React, { useState } from 'react';
import { Users, Plus, Filter, Search, Mail, Phone, Building, Calendar, DollarSign, CheckCircle, Clock, AlertCircle, FileText, MessageSquare, Download, Eye, TrendingUp, BarChart3, Target, Star } from 'lucide-react';
import { StatsCard } from '../Dashboard/StatsCard';
import { useAuth } from '../../contexts/AuthContext';
import { ClientProject, ClientInvoice, CommunicationLog, SharedDocument, ProjectMilestone } from '../../types';

export const ClientPortal: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock data for client-specific information
  const clients = [
    {
      id: '1',
      name: 'TechCorp Solutions',
      contact: 'John Smith',
      email: 'john@techcorp.com',
      phone: '+1 (555) 123-4567',
      stage: 'active',
      value: 45000,
      services: ['NLP Analysis', 'Custom Dashboard'],
      lastContact: '2024-01-15',
      startDate: '2023-12-01',
      status: 'on-track',
      clientId: '1'
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
      status: 'pending',
      clientId: '2'
    },
    {
      id: '3',
      name: 'DataFlow Inc',
      contact: 'Emma Wilson',
      email: 'emma@dataflow.com',
      phone: '+1 (555) 456-7890',
      stage: 'active',
      value: 60000,
      services: ['ML Pipeline', 'Analytics Dashboard'],
      lastContact: '2024-01-10',
      startDate: '2023-11-15',
      status: 'on-track',
      clientId: '3'
    }
  ];

  const projects: ClientProject[] = [
    {
      id: 'PRJ-001',
      clientId: '1',
      name: 'Customer Sentiment Analysis System',
      description: 'Advanced NLP system for analyzing customer feedback and sentiment across multiple channels',
      status: 'in-progress',
      progress: 75,
      startDate: '2023-12-01',
      dueDate: '2024-02-15',
      assignedTeam: ['Sarah Johnson', 'Mike Chen'],
      services: ['NLP Analysis', 'Custom Dashboard'],
      budget: 45000,
      spent: 33750,
      milestones: [
        {
          id: 'MS-001',
          name: 'Data Collection & Preprocessing',
          description: 'Gather and clean customer feedback data',
          dueDate: '2023-12-15',
          status: 'completed',
          completedDate: '2023-12-14'
        },
        {
          id: 'MS-002',
          name: 'Model Training & Validation',
          description: 'Train and validate sentiment analysis models',
          dueDate: '2024-01-15',
          status: 'completed',
          completedDate: '2024-01-12'
        },
        {
          id: 'MS-003',
          name: 'Dashboard Development',
          description: 'Build interactive dashboard for sentiment insights',
          dueDate: '2024-02-01',
          status: 'in-progress'
        },
        {
          id: 'MS-004',
          name: 'Testing & Deployment',
          description: 'Final testing and production deployment',
          dueDate: '2024-02-15',
          status: 'pending'
        }
      ]
    },
    {
      id: 'PRJ-002',
      clientId: '3',
      name: 'Real-time Analytics Pipeline',
      description: 'ML-powered analytics pipeline for real-time data processing and insights',
      status: 'in-progress',
      progress: 60,
      startDate: '2023-11-15',
      dueDate: '2024-03-01',
      assignedTeam: ['Sarah Johnson', 'Emma Rodriguez'],
      services: ['ML Pipeline', 'Analytics Dashboard'],
      budget: 60000,
      spent: 36000,
      milestones: [
        {
          id: 'MS-005',
          name: 'Architecture Design',
          description: 'Design scalable pipeline architecture',
          dueDate: '2023-12-01',
          status: 'completed',
          completedDate: '2023-11-28'
        },
        {
          id: 'MS-006',
          name: 'Data Pipeline Implementation',
          description: 'Build core data processing pipeline',
          dueDate: '2024-01-15',
          status: 'completed',
          completedDate: '2024-01-10'
        },
        {
          id: 'MS-007',
          name: 'ML Model Integration',
          description: 'Integrate machine learning models',
          dueDate: '2024-02-15',
          status: 'in-progress'
        },
        {
          id: 'MS-008',
          name: 'Dashboard & Reporting',
          description: 'Build analytics dashboard and reporting features',
          dueDate: '2024-03-01',
          status: 'pending'
        }
      ]
    }
  ];

  const invoices: ClientInvoice[] = [
    {
      id: 'INV-001',
      clientId: '1',
      projectId: 'PRJ-001',
      amount: 15000,
      status: 'paid',
      issueDate: '2024-01-01',
      dueDate: '2024-01-31',
      paidDate: '2024-01-25',
      description: 'NLP Model Development - Milestone 1 & 2',
      paymentMethod: 'ACH Transfer',
      items: [
        { id: '1', description: 'Data Collection & Preprocessing', quantity: 1, rate: 8000, amount: 8000 },
        { id: '2', description: 'Model Training & Validation', quantity: 1, rate: 7000, amount: 7000 }
      ]
    },
    {
      id: 'INV-002',
      clientId: '1',
      projectId: 'PRJ-001',
      amount: 18750,
      status: 'sent',
      issueDate: '2024-01-15',
      dueDate: '2024-02-14',
      description: 'Dashboard Development - Milestone 3',
      items: [
        { id: '3', description: 'Dashboard Development', quantity: 1, rate: 18750, amount: 18750 }
      ]
    },
    {
      id: 'INV-003',
      clientId: '3',
      projectId: 'PRJ-002',
      amount: 20000,
      status: 'paid',
      issueDate: '2023-12-01',
      dueDate: '2023-12-31',
      paidDate: '2023-12-28',
      description: 'Pipeline Architecture & Initial Development',
      paymentMethod: 'Wire Transfer',
      items: [
        { id: '4', description: 'Architecture Design', quantity: 1, rate: 8000, amount: 8000 },
        { id: '5', description: 'Data Pipeline Implementation', quantity: 1, rate: 12000, amount: 12000 }
      ]
    },
    {
      id: 'INV-004',
      clientId: '3',
      projectId: 'PRJ-002',
      amount: 16000,
      status: 'sent',
      issueDate: '2024-01-10',
      dueDate: '2024-02-09',
      description: 'ML Model Integration - Milestone 3',
      items: [
        { id: '6', description: 'ML Model Integration', quantity: 1, rate: 16000, amount: 16000 }
      ]
    }
  ];

  const communications: CommunicationLog[] = [
    {
      id: 'COMM-001',
      clientId: '1',
      projectId: 'PRJ-001',
      type: 'email',
      subject: 'Project Update: Milestone 2 Completed',
      content: 'We are pleased to inform you that Milestone 2 (Model Training & Validation) has been completed ahead of schedule. The sentiment analysis models are performing exceptionally well with 94% accuracy.',
      from: 'Sarah Johnson',
      to: ['john@techcorp.com'],
      date: '2024-01-12',
      priority: 'medium'
    },
    {
      id: 'COMM-002',
      clientId: '1',
      projectId: 'PRJ-001',
      type: 'meeting',
      subject: 'Dashboard Design Review',
      content: 'Conducted design review session for the sentiment analysis dashboard. Reviewed wireframes, discussed user interface preferences, and finalized the dashboard layout.',
      from: 'Mike Chen',
      to: ['john@techcorp.com'],
      date: '2024-01-08',
      priority: 'high'
    },
    {
      id: 'COMM-003',
      clientId: '3',
      projectId: 'PRJ-002',
      type: 'call',
      subject: 'Weekly Progress Check-in',
      content: 'Weekly progress call to discuss ML model integration status. Reviewed current progress, addressed technical questions, and planned next steps for the analytics dashboard.',
      from: 'Sarah Johnson',
      to: ['emma@dataflow.com'],
      date: '2024-01-15',
      priority: 'medium'
    }
  ];

  const documents: SharedDocument[] = [
    {
      id: 'DOC-001',
      clientId: '1',
      projectId: 'PRJ-001',
      name: 'Project Proposal - Sentiment Analysis System',
      type: 'proposal',
      url: '#',
      uploadDate: '2023-11-20',
      size: '2.4 MB',
      uploadedBy: 'Alex Founder',
      description: 'Comprehensive project proposal outlining scope, timeline, and deliverables',
      version: 'v1.0'
    },
    {
      id: 'DOC-002',
      clientId: '1',
      projectId: 'PRJ-001',
      name: 'Technical Specification Document',
      type: 'other',
      url: '#',
      uploadDate: '2023-12-05',
      size: '1.8 MB',
      uploadedBy: 'Sarah Johnson',
      description: 'Detailed technical specifications for the NLP system',
      version: 'v2.1'
    },
    {
      id: 'DOC-003',
      clientId: '1',
      projectId: 'PRJ-001',
      name: 'Model Performance Report',
      type: 'report',
      url: '#',
      uploadDate: '2024-01-12',
      size: '956 KB',
      uploadedBy: 'Sarah Johnson',
      description: 'Comprehensive report on model training results and performance metrics',
      version: 'v1.0'
    },
    {
      id: 'DOC-004',
      clientId: '3',
      projectId: 'PRJ-002',
      name: 'Analytics Pipeline Architecture',
      type: 'other',
      url: '#',
      uploadDate: '2023-11-28',
      size: '3.2 MB',
      uploadedBy: 'Emma Rodriguez',
      description: 'System architecture diagrams and technical documentation',
      version: 'v1.0'
    }
  ];

  // Filter data based on user's clientId
  const currentClient = user?.clientId ? clients.find(c => c.clientId === user.clientId) : null;
  const clientProjects = user?.clientId ? projects.filter(p => p.clientId === user.clientId) : [];
  const clientInvoices = user?.clientId ? invoices.filter(i => i.clientId === user.clientId) : [];
  const clientCommunications = user?.clientId ? communications.filter(c => c.clientId === user.clientId) : [];
  const clientDocuments = user?.clientId ? documents.filter(d => d.clientId === user.clientId) : [];

  const tabs = user?.role === 'client' ? [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
    { id: 'projects', name: 'My Projects', icon: CheckCircle },
    { id: 'invoices', name: 'Invoices & Billing', icon: DollarSign },
    { id: 'communications', name: 'Communications', icon: MessageSquare },
    { id: 'documents', name: 'Documents', icon: FileText },
  ] : [
    { id: 'overview', name: 'Overview', icon: Users },
    { id: 'pipeline', name: 'Pipeline', icon: DollarSign },
    { id: 'active', name: 'Active Projects', icon: CheckCircle },
    { id: 'templates', name: 'Templates', icon: FileText },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning': return 'bg-blue-100 text-blue-700';
      case 'in-progress': return 'bg-yellow-100 text-yellow-700';
      case 'review': return 'bg-purple-100 text-purple-700';
      case 'completed': return 'bg-green-100 text-green-700';
      case 'on-hold': return 'bg-gray-100 text-gray-700';
      case 'paid': return 'bg-green-100 text-green-700';
      case 'sent': return 'bg-blue-100 text-blue-700';
      case 'overdue': return 'bg-red-100 text-red-700';
      case 'cancelled': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'planning': return <Clock className="w-4 h-4 text-blue-500" />;
      case 'in-progress': return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'review': return <Eye className="w-4 h-4 text-purple-500" />;
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'on-hold': return <Clock className="w-4 h-4 text-gray-500" />;
      case 'paid': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'sent': return <Clock className="w-4 h-4 text-blue-500" />;
      case 'overdue': return <AlertCircle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getMilestoneStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'in-progress': return 'bg-blue-100 text-blue-700';
      case 'overdue': return 'bg-red-100 text-red-700';
      case 'pending': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getDocumentTypeColor = (type: string) => {
    switch (type) {
      case 'contract': return 'bg-red-100 text-red-700';
      case 'proposal': return 'bg-blue-100 text-blue-700';
      case 'report': return 'bg-green-100 text-green-700';
      case 'deliverable': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getCommunicationTypeIcon = (type: string) => {
    switch (type) {
      case 'email': return '📧';
      case 'call': return '📞';
      case 'meeting': return '🤝';
      case 'message': return '💬';
      default: return '📝';
    }
  };

  // If user is a client, show client-specific portal
  if (user?.role === 'client') {
    if (!currentClient) {
      return (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900">Client Data Not Found</h3>
            <p className="text-gray-600">Unable to load your client information.</p>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
              <p className="text-gray-600 mt-1">{currentClient.name} • Client Portal</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Last login</p>
              <p className="font-semibold text-gray-900">Today, 2:30 PM</p>
            </div>
          </div>
        </div>

        {/* Quick Stats for Client */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Active Projects"
            value={clientProjects.filter(p => p.status === 'in-progress').length}
            change={0}
            trend="neutral"
            icon={CheckCircle}
            color="blue"
          />
          <StatsCard
            title="Total Investment"
            value={`$${clientProjects.reduce((sum, p) => sum + p.budget, 0).toLocaleString()}`}
            change={0}
            trend="neutral"
            icon={DollarSign}
            color="green"
          />
          <StatsCard
            title="Pending Invoices"
            value={clientInvoices.filter(i => i.status === 'sent').length}
            change={0}
            trend="neutral"
            icon={Clock}
            color="orange"
          />
          <StatsCard
            title="Avg Progress"
            value={`${Math.round(clientProjects.reduce((sum, p) => sum + p.progress, 0) / clientProjects.length)}%`}
            change={5}
            trend="up"
            icon={TrendingUp}
            color="purple"
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
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900">Project Overview</h3>
                    <div className="space-y-3">
                      {clientProjects.map((project) => (
                        <div key={project.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium text-gray-900">{project.name}</h4>
                            <span className={`px-2 py-1 text-xs rounded ${getStatusColor(project.status)}`}>
                              {project.status.replace('-', ' ')}
                            </span>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Progress</span>
                              <span className="font-medium">{project.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                                style={{ width: `${project.progress}%` }}
                              ></div>
                            </div>
                            <div className="flex justify-between text-sm text-gray-600">
                              <span>Due: {project.dueDate}</span>
                              <span>Budget: ${project.budget.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900">Recent Activity</h3>
                    <div className="space-y-3">
                      {clientCommunications.slice(0, 5).map((comm) => (
                        <div key={comm.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                          <span className="text-lg">{getCommunicationTypeIcon(comm.type)}</span>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{comm.subject}</p>
                            <p className="text-xs text-gray-600 mt-1">From: {comm.from}</p>
                            <p className="text-xs text-gray-500">{comm.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 mb-2">Next Milestone</h4>
                    {clientProjects.length > 0 && (
                      <>
                        <p className="text-lg font-bold text-blue-900">Dashboard Development</p>
                        <p className="text-sm text-blue-700">Due: February 1, 2024</p>
                      </>
                    )}
                  </div>

                  <div className="bg-green-50 rounded-lg p-4">
                    <h4 className="font-medium text-green-900 mb-2">Total Spent</h4>
                    <p className="text-lg font-bold text-green-900">
                      ${clientProjects.reduce((sum, p) => sum + p.spent, 0).toLocaleString()}
                    </p>
                    <p className="text-sm text-green-700">
                      of ${clientProjects.reduce((sum, p) => sum + p.budget, 0).toLocaleString()} budget
                    </p>
                  </div>

                  <div className="bg-purple-50 rounded-lg p-4">
                    <h4 className="font-medium text-purple-900 mb-2">Team Members</h4>
                    <p className="text-lg font-bold text-purple-900">
                      {Array.from(new Set(clientProjects.flatMap(p => p.assignedTeam))).length}
                    </p>
                    <p className="text-sm text-purple-700">Working on your projects</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="space-y-6">
                <h3 className="font-semibold text-gray-900">My Projects</h3>
                <div className="space-y-6">
                  {clientProjects.map((project) => (
                    <div key={project.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-xl font-semibold text-gray-900 mb-2">{project.name}</h4>
                          <p className="text-gray-600 mb-3">{project.description}</p>
                          <div className="flex items-center space-x-4 text-sm">
                            <div className="flex items-center space-x-1">
                              {getStatusIcon(project.status)}
                              <span className={`px-2 py-1 text-xs rounded ${getStatusColor(project.status)}`}>
                                {project.status.replace('-', ' ')}
                              </span>
                            </div>
                            <span className="text-gray-600">Started: {project.startDate}</span>
                            <span className="text-gray-600">Due: {project.dueDate}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-blue-600">{project.progress}%</p>
                          <p className="text-sm text-gray-600">Complete</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div>
                          <h5 className="font-medium text-gray-900 mb-2">Budget</h5>
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Total Budget:</span>
                              <span className="font-medium">${project.budget.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Spent:</span>
                              <span className="font-medium">${project.spent.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Remaining:</span>
                              <span className="font-medium">${(project.budget - project.spent).toLocaleString()}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h5 className="font-medium text-gray-900 mb-2">Team</h5>
                          <div className="space-y-1">
                            {project.assignedTeam.map((member, index) => (
                              <p key={index} className="text-sm text-gray-600">{member}</p>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h5 className="font-medium text-gray-900 mb-2">Services</h5>
                          <div className="flex flex-wrap gap-1">
                            {project.services.map((service, index) => (
                              <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                                {service}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium text-gray-900 mb-3">Project Milestones</h5>
                        <div className="space-y-3">
                          {project.milestones.map((milestone) => (
                            <div key={milestone.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                  <h6 className="font-medium text-gray-900">{milestone.name}</h6>
                                  <span className={`px-2 py-1 text-xs rounded ${getMilestoneStatusColor(milestone.status)}`}>
                                    {milestone.status.replace('-', ' ')}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-600 mb-1">{milestone.description}</p>
                                <div className="flex items-center space-x-4 text-xs text-gray-500">
                                  <span>Due: {milestone.dueDate}</span>
                                  {milestone.completedDate && (
                                    <span>Completed: {milestone.completedDate}</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'invoices' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">Invoices & Billing</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <span>Total Outstanding:</span>
                    <span className="font-semibold text-orange-600">
                      ${clientInvoices.filter(i => i.status === 'sent').reduce((sum, i) => sum + i.amount, 0).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  {clientInvoices.map((invoice) => (
                    <div key={invoice.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="font-semibold text-gray-900">{invoice.id}</h4>
                            <div className="flex items-center space-x-1">
                              {getStatusIcon(invoice.status)}
                              <span className={`px-2 py-1 text-xs rounded ${getStatusColor(invoice.status)}`}>
                                {invoice.status}
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{invoice.description}</p>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-gray-600">Issue Date:</span>
                              <p className="font-medium">{invoice.issueDate}</p>
                            </div>
                            <div>
                              <span className="text-gray-600">Due Date:</span>
                              <p className="font-medium">{invoice.dueDate}</p>
                            </div>
                            {invoice.paidDate && (
                              <div>
                                <span className="text-gray-600">Paid Date:</span>
                                <p className="font-medium">{invoice.paidDate}</p>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-green-600">${invoice.amount.toLocaleString()}</p>
                          {invoice.paymentMethod && (
                            <p className="text-sm text-gray-600">via {invoice.paymentMethod}</p>
                          )}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-gray-100">
                        <h5 className="font-medium text-gray-900 mb-2">Invoice Items</h5>
                        <div className="space-y-1">
                          {invoice.items.map((item) => (
                            <div key={item.id} className="flex justify-between text-sm">
                              <span className="text-gray-600">{item.description}</span>
                              <span className="font-medium">${item.amount.toLocaleString()}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-3">
                        <div className="flex items-center space-x-2">
                          <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded">
                            <Download className="w-4 h-4 inline mr-1" />
                            Download PDF
                          </button>
                          {invoice.status === 'sent' && (
                            <button className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700">
                              Pay Now
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'communications' && (
              <div className="space-y-6">
                <h3 className="font-semibold text-gray-900">Communications</h3>
                <div className="space-y-4">
                  {clientCommunications.map((comm) => (
                    <div key={comm.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start space-x-4">
                        <span className="text-2xl">{getCommunicationTypeIcon(comm.type)}</span>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-900">{comm.subject}</h4>
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              <span>{comm.date}</span>
                              <span className={`px-2 py-1 text-xs rounded ${
                                comm.priority === 'high' ? 'bg-red-100 text-red-700' :
                                comm.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-gray-100 text-gray-700'
                              }`}>
                                {comm.priority}
                              </span>
                            </div>
                          </div>
                          <p className="text-gray-600 mb-3">{comm.content}</p>
                          <div className="flex items-center justify-between text-sm">
                            <div>
                              <span className="text-gray-600">From: </span>
                              <span className="font-medium">{comm.from}</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Type: </span>
                              <span className="font-medium capitalize">{comm.type}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'documents' && (
              <div className="space-y-6">
                <h3 className="font-semibold text-gray-900">Shared Documents</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {clientDocuments.map((doc) => (
                    <div key={doc.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 mb-1">{doc.name}</h4>
                          <p className="text-sm text-gray-600 mb-2">{doc.description}</p>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 text-xs rounded ${getDocumentTypeColor(doc.type)}`}>
                              {doc.type}
                            </span>
                            <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                              {doc.version}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm mb-4">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Size:</span>
                          <span className="font-medium">{doc.size}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Uploaded:</span>
                          <span className="font-medium">{doc.uploadDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">By:</span>
                          <span className="font-medium">{doc.uploadedBy}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors">
                          <Download className="w-4 h-4" />
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
          </div>
        </div>
      </div>
    );
  }

  // Original admin/team view for non-client users
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
          {/* Original admin content remains the same */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="space-y-4">
                {clients.map((client) => (
                  <div key={client.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-gray-900">{client.name}</h3>
                          <span className={`px-2 py-1 text-xs rounded-full capitalize ${getStatusColor(client.stage)}`}>
                            {client.stage}
                          </span>
                          {getStatusIcon(client.status)}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2 text-gray-600">
                              <span>{client.contact}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-600">
                              <span>{client.email}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-600">
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
        </div>
      </div>
    </div>
  );
};