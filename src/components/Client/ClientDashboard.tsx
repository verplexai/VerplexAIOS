import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { BarChart3, FolderOpen, CreditCard, Clock, TrendingUp, CheckCircle, AlertCircle, Calendar, FileText } from 'lucide-react';
import { useProjects, useTasks, useFiles } from '../../hooks/useSupabase';

export const ClientDashboard: React.FC = () => {
  const { user, profile } = useAuth();
  
  // Fetch real data for the client
  const { data: projects = [] } = useProjects();
  const { data: tasks = [] } = useTasks();
  const { data: files = [] } = useFiles();

  // Filter data for current client
  const clientProjects = projects.filter(p => p.client_id === user?.id);
  const clientTasks = tasks.filter(t => 
    clientProjects.some(p => p.id === t.project_id)
  );
  const clientFiles = files.filter(f => 
    clientProjects.some(p => p.id === f.project_id)
  );

  const activeProjects = clientProjects.filter(p => p.status === 'active').length;
  const totalInvestment = clientProjects.reduce((sum, p) => sum + (Number(p.budget) || 0), 0);
  const avgProgress = clientProjects.length > 0 
    ? Math.round(clientProjects.reduce((sum, p) => sum + (p.progress_percentage || 0), 0) / clientProjects.length)
    : 0;

  const recentActivity = [
    { date: '2024-01-15', action: 'Project milestone completed', type: 'success' },
    { date: '2024-01-12', action: 'New document shared', type: 'info' },
    { date: '2024-01-10', action: 'Task assigned to team', type: 'info' },
  ];

  const upcomingMilestones = clientProjects.flatMap(project => 
    project.end_date ? [{
      name: `${project.name} Completion`,
      dueDate: project.end_date,
      project: project.name
    }] : []
  ).slice(0, 3);

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
            <h1 className="text-2xl font-bold">Welcome back, {profile?.display_name || user?.email}!</h1>
            <p className="text-blue-100 mt-1">Client Portal</p>
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
          value={activeProjects}
          change={0}
          trend="neutral"
          icon={FolderOpen}
          color="bg-blue-50 text-blue-600 border-blue-200"
        />
        <StatCard
          title="Total Investment"
          value={`$${totalInvestment.toLocaleString()}`}
          change={0}
          trend="neutral"
          icon={CreditCard}
          color="bg-green-50 text-green-600 border-green-200"
        />
        <StatCard
          title="Open Tasks"
          value={clientTasks.filter(t => t.status !== 'done').length}
          change={0}
          trend="neutral"
          icon={Clock}
          color="bg-orange-50 text-orange-600 border-orange-200"
        />
        <StatCard
          title="Avg Progress"
          value={`${avgProgress}%`}
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
            {recentActivity.map((activity, index) => (
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
            {upcomingMilestones.length > 0 ? (
              upcomingMilestones.map((milestone, index) => (
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
              ))
            ) : (
              <p className="text-gray-500 text-sm">No upcoming milestones</p>
            )}
          </div>
        </div>
      </div>

      {/* Project Overview */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Project Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">In Progress</h4>
            <p className="text-2xl font-bold text-blue-900">{activeProjects}</p>
            <p className="text-sm text-blue-700">Active projects</p>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <h4 className="font-medium text-green-900 mb-2">Budget Utilization</h4>
            <p className="text-2xl font-bold text-green-900">
              ${Math.round(totalInvestment * 0.75).toLocaleString()}
            </p>
            <p className="text-sm text-green-700">
              of ${totalInvestment.toLocaleString()} budget
            </p>
          </div>

          <div className="bg-purple-50 rounded-lg p-4">
            <h4 className="font-medium text-purple-900 mb-2">Team Members</h4>
            <p className="text-2xl font-bold text-purple-900">
              {Array.from(new Set(clientProjects.flatMap(p => [p.project_manager_id].filter(Boolean)))).length}
            </p>
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