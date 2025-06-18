import React, { useState } from 'react';
import { Crown, Users, FileText, Target, TrendingUp, Shield, AlertTriangle } from 'lucide-react';
import { StatsCard } from '../Dashboard/StatsCard';
import { useAuth } from '../../contexts/AuthContext';

export const FoundersHQ: React.FC = () => {
  const { hasPermission } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  if (!hasPermission('headquarters', 'view')) {
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

  const tabs = [
    { id: 'overview', name: 'Overview', icon: Crown },
    { id: 'company', name: 'Company Profile', icon: FileText },
    { id: 'decisions', name: 'Decision Register', icon: Target },
    { id: 'investors', name: 'Stakeholders', icon: Users },
  ];

  return (
    <div className="space-y-6">
      {/* Quick Alert */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-xl p-4">
        <div className="flex items-center space-x-3">
          <Crown className="w-6 h-6 text-purple-600" />
          <div>
            <h3 className="font-semibold text-purple-900">Founders Command Center</h3>
            <p className="text-purple-700 text-sm">Strategic oversight and company-wide controls</p>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Company Valuation"
          value="$2.5M"
          change={15}
          trend="up"
          icon={TrendingUp}
          color="purple"
        />
        <StatsCard
          title="Active Clients"
          value="12"
          change={20}
          trend="up"
          icon={Users}
          color="blue"
        />
        <StatsCard
          title="Team Members"
          value="8"
          change={12}
          trend="up"
          icon={Users}
          color="green"
        />
        <StatsCard
          title="Monthly Revenue"
          value="$45K"
          change={8}
          trend="up"
          icon={TrendingUp}
          color="green"
        />
      </div>

      {/* Tabs */}
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
                  <h3 className="font-semibold text-gray-900">Recent Decisions</h3>
                  <div className="space-y-3">
                    {[
                      { date: '2024-01-15', decision: 'Approved Series A funding strategy', impact: 'high' },
                      { date: '2024-01-12', decision: 'Hired VP of Engineering', impact: 'medium' },
                      { date: '2024-01-10', decision: 'Pivoted ML pipeline architecture', impact: 'high' },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className={`w-2 h-2 rounded-full ${
                          item.impact === 'high' ? 'bg-red-500' : 'bg-yellow-500'
                        }`} />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{item.decision}</p>
                          <p className="text-xs text-gray-500">{item.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Critical Actions</h3>
                  <div className="space-y-3">
                    {[
                      { task: 'Review Q1 financial projections', priority: 'high', due: '2024-01-20' },
                      { task: 'Legal review of new MSA template', priority: 'medium', due: '2024-01-25' },
                      { task: 'Approve new brand guidelines', priority: 'low', due: '2024-01-30' },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                        <AlertTriangle className={`w-4 h-4 ${
                          item.priority === 'high' ? 'text-red-500' : 
                          item.priority === 'medium' ? 'text-yellow-500' : 'text-gray-400'
                        }`} />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{item.task}</p>
                          <p className="text-xs text-gray-500">Due: {item.due}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'company' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Company Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Legal Name</span>
                      <span className="font-medium">Verplex Technologies Inc.</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Registration #</span>
                      <span className="font-medium">DEL-2023-8845921</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Jurisdiction</span>
                      <span className="font-medium">Delaware, USA</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Tax ID</span>
                      <span className="font-medium">88-1234567</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Founded</span>
                      <span className="font-medium">January 2023</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Founders Agreement</h3>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-green-800 font-medium">Active & Signed</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-green-700">Equity Split</span>
                        <span className="text-green-800 font-medium">60/40</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-700">Vesting Schedule</span>
                        <span className="text-green-800 font-medium">4yr / 1yr cliff</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-700">Last Updated</span>
                        <span className="text-green-800 font-medium">Dec 2023</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'decisions' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-900">Decision Register</h3>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  Log New Decision
                </button>
              </div>
              
              <div className="space-y-3">
                {[
                  {
                    id: 'DEC-001',
                    date: '2024-01-15',
                    title: 'Series A Funding Strategy Approval',
                    description: 'Approved targeting $10M Series A with focus on enterprise clients',
                    impact: 'Company Direction',
                    decidedBy: 'Both Founders',
                    status: 'Implemented'
                  },
                  {
                    id: 'DEC-002',
                    date: '2024-01-12',
                    title: 'Key Hire: VP of Engineering',
                    description: 'Hired Sarah Johnson as VP of Engineering, equity: 0.8%',
                    impact: 'Team Structure',
                    decidedBy: 'Alex (CEO)',
                    status: 'Completed'
                  },
                  {
                    id: 'DEC-003',
                    date: '2024-01-10',
                    title: 'ML Pipeline Architecture Pivot',
                    description: 'Switched from TensorFlow to PyTorch for better model flexibility',
                    impact: 'Technical Strategy',
                    decidedBy: 'Both Founders',
                    status: 'In Progress'
                  }
                ].map((decision) => (
                  <div key={decision.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">{decision.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{decision.description}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        decision.status === 'Implemented' ? 'bg-green-100 text-green-700' :
                        decision.status === 'Completed' ? 'bg-blue-100 text-blue-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {decision.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{decision.id} • {decision.date}</span>
                      <span>{decision.decidedBy} • {decision.impact}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'investors' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-900">Stakeholder Management</h3>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  Add Stakeholder
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Current Investors</h4>
                  {[
                    { name: 'Seed Ventures', type: 'VC', investment: '$500K', stake: '8%', leadInvestor: true },
                    { name: 'Angel Group Alpha', type: 'Angel', investment: '$250K', stake: '4%', leadInvestor: false },
                    { name: 'Tech Founders Fund', type: 'VC', investment: '$150K', stake: '2.5%', leadInvestor: false },
                  ].map((investor, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-gray-900">{investor.name}</h5>
                        {investor.leadInvestor && (
                          <span className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded-full">
                            Lead
                          </span>
                        )}
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div>
                          <span className="text-gray-500">Investment</span>
                          <p className="font-medium">{investor.investment}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Stake</span>
                          <p className="font-medium">{investor.stake}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Type</span>
                          <p className="font-medium">{investor.type}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Advisory Board</h4>
                  {[
                    { name: 'Dr. Jane Smith', role: 'AI/ML Advisor', equity: '0.5%', expertise: 'Machine Learning' },
                    { name: 'Mike Rodriguez', role: 'Go-to-Market', equity: '0.3%', expertise: 'Enterprise Sales' },
                    { name: 'Lisa Chen', role: 'Legal Advisor', equity: '0.2%', expertise: 'Tech Law' },
                  ].map((advisor, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <h5 className="font-medium text-gray-900 mb-2">{advisor.name}</h5>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-gray-500">Role</span>
                          <p className="font-medium">{advisor.role}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Equity</span>
                          <p className="font-medium">{advisor.equity}</p>
                        </div>
                      </div>
                      <div className="mt-2">
                        <span className="text-gray-500 text-sm">Expertise</span>
                        <p className="text-sm font-medium text-blue-600">{advisor.expertise}</p>
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