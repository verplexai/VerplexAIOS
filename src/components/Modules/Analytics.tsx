import React, { useState } from 'react';
import { BarChart3, TrendingUp, TrendingDown, Users, DollarSign, Target, Calendar, Filter, Download, RefreshCw } from 'lucide-react';
import { StatsCard } from '../Dashboard/StatsCard';

export const Analytics: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('30d');

  const kpis = [
    {
      id: 'KPI-001',
      name: 'Monthly Recurring Revenue',
      value: 45000,
      target: 50000,
      period: 'monthly',
      trend: 'up',
      change: 12,
      unit: 'currency'
    },
    {
      id: 'KPI-002',
      name: 'Client Acquisition Rate',
      value: 3,
      target: 4,
      period: 'monthly',
      trend: 'up',
      change: 25,
      unit: 'number'
    },
    {
      id: 'KPI-003',
      name: 'Project Completion Rate',
      value: 94,
      target: 95,
      period: 'monthly',
      trend: 'down',
      change: -2,
      unit: 'percentage'
    },
    {
      id: 'KPI-004',
      name: 'Client Satisfaction Score',
      value: 4.8,
      target: 4.5,
      period: 'monthly',
      trend: 'up',
      change: 6,
      unit: 'rating'
    }
  ];

  const performanceData = [
    { month: 'Oct', revenue: 32000, clients: 8, projects: 12 },
    { month: 'Nov', revenue: 38000, clients: 10, projects: 15 },
    { month: 'Dec', revenue: 42000, clients: 11, projects: 18 },
    { month: 'Jan', revenue: 45000, clients: 12, projects: 20 }
  ];

  const clientMetrics = [
    {
      client: 'TechCorp Solutions',
      revenue: 15000,
      projects: 3,
      satisfaction: 4.9,
      retention: 12,
      growth: 25
    },
    {
      client: 'InnovateLabs',
      revenue: 12500,
      projects: 2,
      satisfaction: 4.7,
      retention: 8,
      growth: 15
    },
    {
      client: 'DataFlow Inc',
      revenue: 18000,
      projects: 4,
      satisfaction: 4.8,
      retention: 6,
      growth: 35
    }
  ];

  const teamMetrics = [
    {
      member: 'Sarah Johnson',
      role: 'AI Engineer',
      projectsCompleted: 8,
      avgRating: 4.9,
      utilization: 92,
      revenue: 120000
    },
    {
      member: 'Mike Chen',
      role: 'Designer',
      projectsCompleted: 12,
      avgRating: 4.8,
      utilization: 88,
      revenue: 96000
    },
    {
      member: 'Emma Rodriguez',
      role: 'Automation Specialist',
      projectsCompleted: 15,
      avgRating: 4.7,
      utilization: 95,
      revenue: 135000
    }
  ];

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'revenue', name: 'Revenue Analytics', icon: DollarSign },
    { id: 'clients', name: 'Client Metrics', icon: Users },
    { id: 'team', name: 'Team Performance', icon: Target },
  ];

  const formatValue = (value: number, unit: string) => {
    switch (unit) {
      case 'currency':
        return `$${(value / 1000).toFixed(0)}K`;
      case 'percentage':
        return `${value}%`;
      case 'rating':
        return value.toFixed(1);
      default:
        return value.toString();
    }
  };

  const getProgressPercentage = (value: number, target: number) => {
    return Math.min((value / target) * 100, 100);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <BarChart3 className="w-6 h-6 text-orange-600" />
            <div>
              <h3 className="font-semibold text-orange-900">Performance Analytics</h3>
              <p className="text-orange-700 text-sm">KPIs, performance tracking, and business intelligence</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="border border-orange-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            <button className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg">
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Revenue"
          value="$137K"
          change={18}
          trend="up"
          icon={DollarSign}
          color="green"
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
          title="Avg Project Value"
          value="$11.4K"
          change={8}
          trend="up"
          icon={Target}
          color="purple"
        />
        <StatsCard
          title="Team Utilization"
          value="92%"
          change={5}
          trend="up"
          icon={TrendingUp}
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
                    ? 'border-orange-500 text-orange-600'
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
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Key Performance Indicators</h3>
                <button className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                  <Download className="w-4 h-4" />
                  <span>Export Report</span>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {kpis.map((kpi) => {
                  const progressPercentage = getProgressPercentage(kpi.value, kpi.target);
                  return (
                    <div key={kpi.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-gray-900">{kpi.name}</h4>
                        <div className={`flex items-center space-x-1 text-sm ${
                          kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {kpi.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                          <span>{Math.abs(kpi.change)}%</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-end space-x-2">
                          <span className="text-2xl font-bold text-gray-900">
                            {formatValue(kpi.value, kpi.unit)}
                          </span>
                          <span className="text-sm text-gray-600">
                            / {formatValue(kpi.target, kpi.unit)} target
                          </span>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Progress</span>
                            <span className="font-medium">{progressPercentage.toFixed(0)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all duration-300 ${
                                progressPercentage >= 100 ? 'bg-green-600' : 
                                progressPercentage >= 80 ? 'bg-blue-600' : 'bg-orange-600'
                              }`}
                              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Revenue Trend</h4>
                  <div className="space-y-3">
                    {performanceData.map((data, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-gray-600">{data.month}</span>
                        <div className="flex items-center space-x-4">
                          <span className="font-medium">${(data.revenue / 1000).toFixed(0)}K</span>
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-600 h-2 rounded-full transition-all duration-300" 
                              style={{ width: `${(data.revenue / 50000) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Growth Metrics</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <span className="text-green-700 font-medium">Revenue Growth</span>
                      <span className="text-green-900 font-bold">+18%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <span className="text-blue-700 font-medium">Client Growth</span>
                      <span className="text-blue-900 font-bold">+20%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <span className="text-purple-700 font-medium">Project Volume</span>
                      <span className="text-purple-900 font-bold">+25%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'revenue' && (
            <div className="space-y-6">
              <h3 className="font-semibold text-gray-900">Revenue Analytics</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="border border-gray-200 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Monthly Revenue Breakdown</h4>
                    <div className="space-y-4">
                      {performanceData.map((data, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">{data.month} 2024</span>
                            <span className="font-medium">${data.revenue.toLocaleString()}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div 
                              className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-300" 
                              style={{ width: `${(data.revenue / 50000) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h5 className="font-medium text-gray-900 mb-2">Revenue by Service</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">NLP Solutions</span>
                        <span className="font-medium">$52K</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Dashboards</span>
                        <span className="font-medium">$48K</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Automation</span>
                        <span className="font-medium">$37K</span>
                      </div>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <h5 className="font-medium text-gray-900 mb-2">Forecasting</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Feb Projection</span>
                        <span className="font-medium text-blue-600">$52K</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Q1 Target</span>
                        <span className="font-medium text-green-600">$150K</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Annual Goal</span>
                        <span className="font-medium text-purple-600">$600K</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'clients' && (
            <div className="space-y-6">
              <h3 className="font-semibold text-gray-900">Client Performance Metrics</h3>
              
              <div className="space-y-4">
                {clientMetrics.map((client, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-gray-900">{client.client}</h4>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs rounded ${
                          client.growth > 20 ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          +{client.growth}% growth
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Revenue</p>
                        <p className="text-lg font-bold text-green-600">${(client.revenue / 1000).toFixed(0)}K</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Projects</p>
                        <p className="text-lg font-bold text-blue-600">{client.projects}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Satisfaction</p>
                        <p className="text-lg font-bold text-purple-600">{client.satisfaction}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Retention</p>
                        <p className="text-lg font-bold text-orange-600">{client.retention}m</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Growth</p>
                        <p className="text-lg font-bold text-green-600">+{client.growth}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'team' && (
            <div className="space-y-6">
              <h3 className="font-semibold text-gray-900">Team Performance</h3>
              
              <div className="space-y-4">
                {teamMetrics.map((member, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-900">{member.member}</h4>
                        <p className="text-sm text-gray-600">{member.role}</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="text-yellow-500">★</span>
                        <span className="font-medium">{member.avgRating}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Projects</p>
                        <p className="text-lg font-bold text-blue-600">{member.projectsCompleted}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Utilization</p>
                        <p className="text-lg font-bold text-green-600">{member.utilization}%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Revenue</p>
                        <p className="text-lg font-bold text-purple-600">${(member.revenue / 1000).toFixed(0)}K</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Rating</p>
                        <p className="text-lg font-bold text-orange-600">{member.avgRating}</p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Utilization Rate</span>
                        <span className="font-medium">{member.utilization}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${member.utilization}%` }}
                        ></div>
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