import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { BarChart3, FolderOpen, CreditCard, Clock, TrendingUp, CheckCircle, AlertCircle, Calendar } from 'lucide-react';

export const ClientDashboard: React.FC = () => {
  const { user } = useAuth();

  // Mock data based on client
  const clientData = {
    '1': { // TechCorp Solutions
      company: 'TechCorp Solutions',
      activeProjects: 2,
      totalInvestment: 45000,
      pendingInvoices: 1,
      avgProgress: 75,
      recentActivity: [
        { date: '2024-01-15', action: 'NLP Model training completed', type: 'success' },
        { date: '2024-01-12', action: 'Dashboard mockups approved', type: 'info' },
        { date: '2024-01-10', action: 'Project milestone reached', type: 'success' },
      ],
      upcomingMilestones: [
        { name: 'Dashboard Development', dueDate: '2024-02-01', project: 'Sentiment Analysis' },
        { name: 'Final Testing', dueDate: '2024-02-15', project: 'Sentiment Analysis' },
      ]
    },
    '3': { // DataFlow Inc
      company: 'DataFlow Inc',
      activeProjects: 1,
      totalInvestment: 60000,
      pendingInvoices: 1,
      avgProgress: 60,
      recentActivity: [
        { date: '2024-01-14', action: 'ML Pipeline architecture approved', type: 'success' },
        { date: '2024-01-10', action: 'Data processing pipeline completed', type: 'success' },
        { date: '2024-01-08', action: 'Weekly progress review', type: 'info' },
      ],
      upcomingMilestones: [
        { name: 'ML Model Integration', dueDate: '2024-02-15', project: 'Analytics Pipeline' },
        { name: 'Dashboard Development', dueDate: '2024-03-01', project: 'Analytics Pipeline' },
      ]
    }
  };

  const data = clientData[user?.clientId as keyof typeof clientData] || clientData['1'];

  const StatCard = ({ title, value, change, trend, icon: Icon, color }: any) => (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
          {change !== undefined && (
            <div className={`flex items-center mt-2 text-sm ${
              trend === 'up' ? 'text-green-600' : 
              trend === 'down' ? 'text-red-600' : 
              'text-gray-600'
            }`}>
              <span className="mr-1">
                {trend === 'up' ? '↗' : trend === 'down' ? '↘' : '→'}
              </span>
              {Math.abs(change)}% vs last period
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg border ${color}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {user?.name}!</h1>
            <p className="text-blue-100 mt-1">{data.company} • Client Portal</p>
          </div>
          <div className="text-right">
            <p className="text-blue-100">Last login</p>
            <p className="font-semibold">Today, 2:30 PM</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Active Projects"
          value={data.activeProjects}
          change={0}
          trend="neutral"
          icon={FolderOpen}
          color="bg-blue-50 text-blue-600 border-blue-200"
        />
        <StatCard
          title="Total Investment"
          value={`$${data.totalInvestment.toLocaleString()}`}
          change={0}
          trend="neutral"
          icon={CreditCard}
          color="bg-green-50 text-green-600 border-green-200"
        />
        <StatCard
          title="Pending Invoices"
          value={data.pendingInvoices}
          change={0}
          trend="neutral"
          icon={Clock}
          color="bg-orange-50 text-orange-600 border-orange-200"
        />
        <StatCard
          title="Avg Progress"
          value={`${data.avgProgress}%`}
          change={5}
          trend="up"
          icon={TrendingUp}
          color="bg-purple-50 text-purple-600 border-purple-200"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {data.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'success' ? 'bg-green-500' : 
                  activity.type === 'info' ? 'bg-blue-500' : 'bg-gray-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Milestones */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Upcoming Milestones</h3>
          <div className="space-y-4">
            {data.upcomingMilestones.map((milestone, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">{milestone.name}</p>
                    <p className="text-xs text-blue-700">{milestone.project}</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-blue-600">{milestone.dueDate}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Project Overview */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Project Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">In Progress</h4>
            <p className="text-2xl font-bold text-blue-900">{data.activeProjects}</p>
            <p className="text-sm text-blue-700">Active projects</p>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <h4 className="font-medium text-green-900 mb-2">Budget Utilization</h4>
            <p className="text-2xl font-bold text-green-900">
              ${Math.round(data.totalInvestment * 0.75).toLocaleString()}
            </p>
            <p className="text-sm text-green-700">
              of ${data.totalInvestment.toLocaleString()} budget
            </p>
          </div>

          <div className="bg-purple-50 rounded-lg p-4">
            <h4 className="font-medium text-purple-900 mb-2">Team Members</h4>
            <p className="text-2xl font-bold text-purple-900">3</p>
            <p className="text-sm text-purple-700">Working on your projects</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="flex items-center justify-center space-x-2 p-4 border border-blue-200 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
            <FolderOpen className="w-5 h-5" />
            <span>View Projects</span>
          </button>
          <button className="flex items-center justify-center space-x-2 p-4 border border-green-200 text-green-600 rounded-lg hover:bg-green-50 transition-colors">
            <CreditCard className="w-5 h-5" />
            <span>View Invoices</span>
          </button>
          <button className="flex items-center justify-center space-x-2 p-4 border border-purple-200 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors">
            <FileText className="w-5 h-5" />
            <span>Download Reports</span>
          </button>
          <button className="flex items-center justify-center space-x-2 p-4 border border-orange-200 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors">
            <AlertCircle className="w-5 h-5" />
            <span>Contact Support</span>
          </button>
        </div>
      </div>
    </div>
  );
};