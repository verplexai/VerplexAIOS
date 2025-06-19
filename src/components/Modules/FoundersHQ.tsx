import React, { useState } from 'react';
import { Crown, Users, FileText, Target, TrendingUp, Shield, AlertTriangle, Plus, Calendar, DollarSign, Building, CheckCircle, Clock } from 'lucide-react';
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
    { id: 'company', name: 'Company Profile', icon: Building },
    { id: 'decisions', name: 'Decision Register', icon: Target },
    { id: 'stakeholders', name: 'Stakeholders', icon: Users },
  ];

  const boardroomUpdates = [
    {
      id: 'BR-001',
      date: '2024-01-15',
      topic: 'Series A Strategy Discussion',
      summary: 'Discussed targeting $10M Series A with focus on enterprise clients and AI capabilities',
      participants: ['Alex Founder', 'Sarah Manager', 'Board Advisor'],
      priority: 'high',
      actionItems: 3
    },
    {
      id: 'BR-002',
      date: '2024-01-12',
      topic: 'Product Roadmap Q1 2024',
      summary: 'Reviewed Q1 product priorities, approved new NLP features and dashboard improvements',
      participants: ['Alex Founder', 'Sarah Manager'],
      priority: 'medium',
      actionItems: 5
    },
    {
      id: 'BR-003',
      date: '2024-01-08',
      topic: 'Team Expansion Planning',
      summary: 'Approved hiring plan for 3 new engineers and 1 sales representative',
      participants: ['Alex Founder', 'HR Lead'],
      priority: 'medium',
      actionItems: 2
    }
  ];

  const companyInfo = {
    legalName: 'Verplex Technologies Inc.',
    registrationNumber: 'DEL-2023-8845921',
    jurisdiction: 'Delaware, USA',
    taxId: '88-1234567',
    foundingDate: 'January 15, 2023',
    incorporationType: 'C-Corporation',
    registeredAgent: 'Corporate Services Inc.',
    businessAddress: '123 Innovation Drive, San Francisco, CA 94105'
  };

  const foundersAgreement = {
    status: 'active',
    lastUpdated: 'December 15, 2023',
    equitySplit: {
      'Alex Founder': '60%',
      'Co-Founder': '40%'
    },
    vestingSchedule: '4 years with 1-year cliff',
    accelerationTrigger: 'Double trigger (termination + change of control)',
    restrictionPeriod: '12 months post-departure',
    ipAssignment: 'All IP assigned to company',
    nonCompete: '12 months in same market'
  };

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
                  <h3 className="font-semibold text-gray-900">Boardroom Updates</h3>
                  <div className="space-y-3">
                    {boardroomUpdates.map((update) => (
                      <div key={update.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h4 className="font-semibold text-gray-900">{update.topic}</h4>
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                update.priority === 'high' ? 'bg-red-100 text-red-700' :
                                update.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-green-100 text-green-700'
                              }`}>
                                {update.priority} priority
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">{update.summary}</p>
                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              <span className="flex items-center space-x-1">
                                <Calendar className="w-3 h-3" />
                                <span>{update.date}</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <Users className="w-3 h-3" />
                                <span>{update.participants.length} participants</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <CheckCircle className="w-3 h-3" />
                                <span>{update.actionItems} action items</span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="pt-3 border-t border-gray-100">
                          <div className="flex items-center justify-between">
                            <div className="flex flex-wrap gap-1">
                              {update.participants.map((participant, index) => (
                                <span key={index} className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded">
                                  {participant}
                                </span>
                              ))}
                            </div>
                            <button className="text-sm text-purple-600 hover:text-purple-700">
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Critical Actions</h3>
                  <div className="space-y-3">
                    {[
                      { task: 'Review Q1 financial projections', priority: 'high', due: '2024-01-20', owner: 'Alex Founder' },
                      { task: 'Legal review of new MSA template', priority: 'medium', due: '2024-01-25', owner: 'Legal Team' },
                      { task: 'Approve new brand guidelines', priority: 'low', due: '2024-01-30', owner: 'Marketing' },
                      { task: 'Board meeting preparation', priority: 'high', due: '2024-01-22', owner: 'Alex Founder' },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                        <AlertTriangle className={`w-4 h-4 ${
                          item.priority === 'high' ? 'text-red-500' : 
                          item.priority === 'medium' ? 'text-yellow-500' : 'text-gray-400'
                        }`} />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{item.task}</p>
                          <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <span>Due: {item.due}</span>
                            <span>•</span>
                            <span>Owner: {item.owner}</span>
                          </div>
                        </div>
                        <button className="px-2 py-1 text-xs text-purple-600 hover:bg-purple-50 rounded">
                          Assign
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4">
                    <h4 className="font-medium text-purple-900 mb-2">Quick Insights</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-purple-700">Open Action Items:</span>
                        <span className="font-medium text-purple-900">12</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-purple-700">Decisions This Month:</span>
                        <span className="font-medium text-purple-900">8</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-purple-700">Next Board Meeting:</span>
                        <span className="font-medium text-purple-900">Jan 25, 2024</span>
                      </div>
                    </div>
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
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between py-2 border-b border-gray-200">
                        <span className="text-gray-600">Legal Name</span>
                        <span className="font-medium">{companyInfo.legalName}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-200">
                        <span className="text-gray-600">Registration #</span>
                        <span className="font-medium">{companyInfo.registrationNumber}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-200">
                        <span className="text-gray-600">Jurisdiction</span>
                        <span className="font-medium">{companyInfo.jurisdiction}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-200">
                        <span className="text-gray-600">Tax ID</span>
                        <span className="font-medium">{companyInfo.taxId}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-200">
                        <span className="text-gray-600">Founded</span>
                        <span className="font-medium">{companyInfo.foundingDate}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-200">
                        <span className="text-gray-600">Type</span>
                        <span className="font-medium">{companyInfo.incorporationType}</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-gray-600">Registered Agent</span>
                        <span className="font-medium">{companyInfo.registeredAgent}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">Business Address</h4>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <p className="text-blue-900 font-medium">{companyInfo.businessAddress}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Founders Agreement</h3>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-green-800 font-medium">Active & Executed</span>
                    </div>
                    <div className="space-y-3 text-sm">
                      <div>
                        <h5 className="font-medium text-green-900 mb-2">Equity Distribution</h5>
                        {Object.entries(foundersAgreement.equitySplit).map(([founder, percentage]) => (
                          <div key={founder} className="flex justify-between">
                            <span className="text-green-700">{founder}</span>
                            <span className="text-green-800 font-medium">{percentage}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="pt-3 border-t border-green-200">
                        <div className="grid grid-cols-1 gap-2">
                          <div className="flex justify-between">
                            <span className="text-green-700">Vesting Schedule</span>
                            <span className="text-green-800 font-medium">{foundersAgreement.vestingSchedule}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-green-700">Acceleration</span>
                            <span className="text-green-800 font-medium">Double Trigger</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-green-700">Non-Compete</span>
                            <span className="text-green-800 font-medium">{foundersAgreement.nonCompete}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-green-700">Last Updated</span>
                            <span className="text-green-800 font-medium">{foundersAgreement.lastUpdated}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">Key Provisions</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start space-x-2 p-2 bg-gray-50 rounded">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                        <span>IP Assignment: {foundersAgreement.ipAssignment}</span>
                      </div>
                      <div className="flex items-start space-x-2 p-2 bg-gray-50 rounded">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                        <span>Restriction Period: {foundersAgreement.restrictionPeriod}</span>
                      </div>
                      <div className="flex items-start space-x-2 p-2 bg-gray-50 rounded">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                        <span>Acceleration: {foundersAgreement.accelerationTrigger}</span>
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
                <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  <span>Log New Decision</span>
                </button>
              </div>
              
              <div className="space-y-3">
                {[
                  {
                    id: 'DEC-001',
                    date: '2024-01-15',
                    title: 'Series A Funding Strategy Approval',
                    description: 'Approved targeting $10M Series A with focus on enterprise clients and AI capabilities. Board unanimously agreed on timeline and investor targets.',
                    impact: 'Company Direction',
                    decidedBy: 'Both Founders + Board',
                    status: 'Implemented',
                    rationale: 'Market opportunity analysis shows strong demand for enterprise AI solutions. Current traction supports higher valuation.',
                    actionItems: ['Prepare pitch deck', 'Identify lead investors', 'Update financial projections']
                  },
                  {
                    id: 'DEC-002',
                    date: '2024-01-12',
                    title: 'Key Hire: VP of Engineering',
                    description: 'Hired Sarah Johnson as VP of Engineering with 0.8% equity package and $180K base salary.',
                    impact: 'Team Structure',
                    decidedBy: 'Alex (CEO)',
                    status: 'Completed',
                    rationale: 'Need experienced technical leadership to scale engineering team and improve product architecture.',
                    actionItems: ['Complete onboarding', 'Define engineering roadmap', 'Hire 2 senior engineers']
                  },
                  {
                    id: 'DEC-003',
                    date: '2024-01-10',
                    title: 'ML Pipeline Architecture Pivot',
                    description: 'Switched from TensorFlow to PyTorch for better model flexibility and faster iteration cycles.',
                    impact: 'Technical Strategy',
                    decidedBy: 'Both Founders + Engineering',
                    status: 'In Progress',
                    rationale: 'PyTorch offers better debugging capabilities and more flexible model architecture for our use cases.',
                    actionItems: ['Migrate existing models', 'Update deployment pipeline', 'Train team on PyTorch']
                  },
                  {
                    id: 'DEC-004',
                    date: '2024-01-08',
                    title: 'Remote-First Work Policy',
                    description: 'Established permanent remote-first policy with quarterly in-person team gatherings.',
                    impact: 'Operations',
                    decidedBy: 'Both Founders',
                    status: 'Implemented',
                    rationale: 'Access to global talent pool and reduced overhead costs while maintaining team cohesion.',
                    actionItems: ['Update employee handbook', 'Establish remote work stipend', 'Plan Q1 team gathering']
                  }
                ].map((decision) => (
                  <div key={decision.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-semibold text-gray-900">{decision.title}</h4>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            decision.status === 'Implemented' ? 'bg-green-100 text-green-700' :
                            decision.status === 'Completed' ? 'bg-blue-100 text-blue-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {decision.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{decision.description}</p>
                        
                        <div className="bg-gray-50 rounded-lg p-3 mb-3">
                          <h5 className="font-medium text-gray-900 mb-1">Rationale</h5>
                          <p className="text-sm text-gray-700">{decision.rationale}</p>
                        </div>

                        {decision.actionItems.length > 0 && (
                          <div className="mb-3">
                            <h5 className="font-medium text-gray-900 mb-2">Action Items</h5>
                            <div className="space-y-1">
                              {decision.actionItems.map((item, index) => (
                                <div key={index} className="flex items-center space-x-2 text-sm">
                                  <Clock className="w-3 h-3 text-gray-400" />
                                  <span className="text-gray-700">{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500 pt-3 border-t border-gray-100">
                      <div className="flex items-center space-x-4">
                        <span>{decision.id} • {decision.date}</span>
                        <span>Impact: {decision.impact}</span>
                      </div>
                      <span>Decided by: {decision.decidedBy}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'stakeholders' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-900">Stakeholder Management</h3>
                <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  <span>Add Stakeholder</span>
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Current Investors</h4>
                  {[
                    { 
                      name: 'Seed Ventures', 
                      type: 'VC', 
                      investment: '$500K', 
                      stake: '8%', 
                      leadInvestor: true,
                      boardSeat: true,
                      investmentDate: '2023-06-15',
                      contact: 'John Smith, Partner'
                    },
                    { 
                      name: 'Angel Group Alpha', 
                      type: 'Angel', 
                      investment: '$250K', 
                      stake: '4%', 
                      leadInvestor: false,
                      boardSeat: false,
                      investmentDate: '2023-08-20',
                      contact: 'Multiple Angels'
                    },
                    { 
                      name: 'Tech Founders Fund', 
                      type: 'VC', 
                      investment: '$150K', 
                      stake: '2.5%', 
                      leadInvestor: false,
                      boardSeat: false,
                      investmentDate: '2023-09-10',
                      contact: 'Sarah Chen, Associate'
                    },
                  ].map((investor, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h5 className="font-semibold text-gray-900">{investor.name}</h5>
                        <div className="flex items-center space-x-2">
                          {investor.leadInvestor && (
                            <span className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded-full">
                              Lead
                            </span>
                          )}
                          {investor.boardSeat && (
                            <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                              Board Seat
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                        <div>
                          <span className="text-gray-500">Investment</span>
                          <p className="font-medium text-green-600">{investor.investment}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Stake</span>
                          <p className="font-medium">{investor.stake}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Type</span>
                          <p className="font-medium">{investor.type}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Date</span>
                          <p className="font-medium">{investor.investmentDate}</p>
                        </div>
                      </div>
                      <div className="pt-3 border-t border-gray-100">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Contact: {investor.contact}</span>
                          <button className="text-sm text-purple-600 hover:text-purple-700">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Advisory Board</h4>
                  {[
                    { 
                      name: 'Dr. Jane Smith', 
                      role: 'AI/ML Advisor', 
                      equity: '0.5%', 
                      expertise: 'Machine Learning',
                      background: 'Former Google AI Research',
                      commitment: 'Monthly meetings',
                      joinDate: '2023-07-01'
                    },
                    { 
                      name: 'Mike Rodriguez', 
                      role: 'Go-to-Market Advisor', 
                      equity: '0.3%', 
                      expertise: 'Enterprise Sales',
                      background: 'Former Salesforce VP',
                      commitment: 'Bi-weekly calls',
                      joinDate: '2023-08-15'
                    },
                    { 
                      name: 'Lisa Chen', 
                      role: 'Legal Advisor', 
                      equity: '0.2%', 
                      expertise: 'Tech Law',
                      background: 'Partner at Wilson Sonsini',
                      commitment: 'As needed',
                      joinDate: '2023-09-01'
                    },
                  ].map((advisor, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h5 className="font-semibold text-gray-900">{advisor.name}</h5>
                        <span className="px-2 py-1 text-xs bg-orange-100 text-orange-700 rounded">
                          {advisor.equity} equity
                        </span>
                      </div>
                      <div className="space-y-2 text-sm mb-3">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Role</span>
                          <span className="font-medium">{advisor.role}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Background</span>
                          <span className="font-medium">{advisor.background}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Commitment</span>
                          <span className="font-medium">{advisor.commitment}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Joined</span>
                          <span className="font-medium">{advisor.joinDate}</span>
                        </div>
                      </div>
                      <div className="pt-3 border-t border-gray-100">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-blue-600">{advisor.expertise}</span>
                          <button className="text-sm text-purple-600 hover:text-purple-700">
                            Contact
                          </button>
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