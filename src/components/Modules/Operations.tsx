import React, { useState } from 'react';
import { CheckSquare, Calendar, Users, Plus, Filter, Clock, AlertCircle, CheckCircle, Zap } from 'lucide-react';
import { StatsCard } from '../Dashboard/StatsCard';

export const Operations: React.FC = () => {
  const [activeTab, setActiveTab] = useState('tasks');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const tasks = [
    {
      id: 'TASK-001',
      title: 'Complete NLP model training for TechCorp',
      description: 'Finalize training on customer sentiment analysis model',
      status: 'in-progress',
      priority: 'high',
      assignedTo: 'Sarah Johnson',
      dueDate: '2024-01-20',
      client: 'TechCorp Solutions',
      tags: ['nlp', 'ml', 'client-work'],
      progress: 75
    },
    {
      id: 'TASK-002', 
      title: 'Design dashboard mockups for InnovateLabs',
      description: 'Create wireframes and visual designs for analytics dashboard',
      status: 'review',
      priority: 'medium',
      assignedTo: 'Mike Chen',
      dueDate: '2024-01-18',
      client: 'InnovateLabs',
      tags: ['design', 'dashboard', 'client-work'],
      progress: 90
    },
    {
      id: 'TASK-003',
      title: 'Update legal templates',
      description: 'Review and update MSA and SOW templates with legal team',
      status: 'todo',
      priority: 'low',
      assignedTo: 'Alex Founder',
      dueDate: '2024-01-25',
      client: null,
      tags: ['legal', 'internal', 'templates'],
      progress: 0
    },
    {
      id: 'TASK-004',
      title: 'Setup automation for lead scoring',
      description: 'Implement Zapier automation for CRM lead scoring system',
      status: 'completed',
      priority: 'medium',
      assignedTo: 'Emma Rodriguez',
      dueDate: '2024-01-15',
      client: null,
      tags: ['automation', 'internal', 'crm'],
      progress: 100
    }
  ];

  const sprints = [
    {
      id: 'SPR-001',
      name: 'Sprint 1 - Client Deliverables',
      startDate: '2024-01-15',
      endDate: '2024-01-29',
      status: 'active',
      tasks: 8,
      completed: 3,
      team: ['Sarah Johnson', 'Mike Chen', 'Emma Rodriguez']
    },
    {
      id: 'SPR-002',
      name: 'Sprint 2 - Internal Systems',
      startDate: '2024-01-29',
      endDate: '2024-02-12',
      status: 'planned',
      tasks: 12,
      completed: 0,
      team: ['Alex Founder', 'Sarah Johnson']
    }
  ];

  const tabs = [
    { id: 'tasks', name: 'Task Board', icon: CheckSquare },
    { id: 'sprints', name: 'Sprints', icon: Calendar },
    { id: 'automation', name: 'Automations', icon: Zap },
    { id: 'requests', name: 'Internal Requests', icon: Users },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'todo': return 'bg-gray-100 text-gray-700';
      case 'in-progress': return 'bg-blue-100 text-blue-700';
      case 'review': return 'bg-yellow-100 text-yellow-700';
      case 'completed': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-gray-100 text-gray-600';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'high': return 'bg-red-100 text-red-700';
      case 'critical': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'todo': return <Clock className="w-4 h-4 text-gray-500" />;
      case 'in-progress': return <AlertCircle className="w-4 h-4 text-blue-500" />;
      case 'review': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const filteredTasks = selectedStatus === 'all' ? tasks : tasks.filter(task => task.status === selectedStatus);

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Active Tasks"
          value={tasks.filter(t => t.status === 'in-progress').length}
          change={15}
          trend="up"
          icon={CheckSquare}
          color="blue"
        />
        <StatsCard
          title="Completed This Week"
          value={tasks.filter(t => t.status === 'completed').length}
          change={25}
          trend="up"
          icon={CheckCircle}
          color="green"
        />
        <StatsCard
          title="Overdue Tasks"
          value="2"
          change={-10}
          trend="down"
          icon={AlertCircle}
          color="red"
        />
        <StatsCard
          title="Team Productivity"
          value="92%"
          change={8}
          trend="up"
          icon={Users}
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
          {activeTab === 'tasks' && (
            <div className="space-y-6">
              {/* Task Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Tasks</option>
                    <option value="todo">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="review">Review</option>
                    <option value="completed">Completed</option>
                  </select>
                  <button className="flex items-center space-x-2 px-3 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
                    <Filter className="w-4 h-4" />
                    <span>Filter</span>
                  </button>
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  <span>Add Task</span>
                </button>
              </div>

              {/* Kanban Board */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {['todo', 'in-progress', 'review', 'completed'].map((status) => (
                  <div key={status} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900 capitalize flex items-center space-x-2">
                        {getStatusIcon(status)}
                        <span>{status.replace('-', ' ')}</span>
                      </h3>
                      <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
                        {tasks.filter(task => task.status === status).length}
                      </span>
                    </div>
                    
                    <div className="space-y-3">
                      {tasks
                        .filter(task => task.status === status)
                        .map((task) => (
                          <div key={task.id} className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-medium text-gray-900 text-sm leading-tight">{task.title}</h4>
                              <span className={`px-2 py-1 text-xs rounded capitalize ${getPriorityColor(task.priority)}`}>
                                {task.priority}
                              </span>
                            </div>
                            
                            <p className="text-xs text-gray-600 mb-3 line-clamp-2">{task.description}</p>
                            
                            {task.progress > 0 && (
                              <div className="mb-3">
                                <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                                  <span>Progress</span>
                                  <span>{task.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-1">
                                  <div 
                                    className="bg-blue-600 h-1 rounded-full transition-all duration-300" 
                                    style={{ width: `${task.progress}%` }}
                                  ></div>
                                </div>
                              </div>
                            )}
                            
                            <div className="flex flex-wrap gap-1 mb-3">
                              {task.tags.map((tag, index) => (
                                <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                                  {tag}
                                </span>
                              ))}
                            </div>
                            
                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <span>{task.assignedTo}</span>
                              <span>{task.dueDate}</span>
                            </div>
                            
                            {task.client && (
                              <div className="mt-2 pt-2 border-t border-gray-100">
                                <span className="text-xs text-gray-600">Client: {task.client}</span>
                              </div>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'sprints' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Sprint Management</h3>
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  <span>New Sprint</span>
                </button>
              </div>

              <div className="space-y-4">
                {sprints.map((sprint) => (
                  <div key={sprint.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-900">{sprint.name}</h4>
                        <p className="text-sm text-gray-600">{sprint.startDate} - {sprint.endDate}</p>
                      </div>
                      <span className={`px-3 py-1 text-sm rounded-full ${
                        sprint.status === 'active' ? 'bg-green-100 text-green-700' :
                        sprint.status === 'planned' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {sprint.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Progress</h5>
                        <div className="flex items-center space-x-3">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                              style={{ width: `${(sprint.completed / sprint.tasks) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">
                            {sprint.completed}/{sprint.tasks}
                          </span>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Team</h5>
                        <div className="flex flex-wrap gap-1">
                          {sprint.team.map((member, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                              {member}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Actions</h5>
                        <div className="flex items-center space-x-2">
                          <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded">
                            View Tasks
                          </button>
                          <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded">
                            Edit Sprint
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'automation' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Automation Dashboard</h3>
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  <span>Add Automation</span>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {[
                  {
                    name: 'Lead Scoring Automation',
                    trigger: 'New lead in CRM',
                    action: 'Score lead based on criteria',
                    status: 'active',
                    runs: 156,
                    lastRun: '2024-01-15 14:30'
                  },
                  {
                    name: 'Client Onboarding Flow',
                    trigger: 'Contract signed',
                    action: 'Create workspace & send welcome',
                    status: 'active',
                    runs: 12,
                    lastRun: '2024-01-12 09:15'
                  },
                  {
                    name: 'Invoice Generation',
                    trigger: 'Project milestone completed',
                    action: 'Generate and send invoice',
                    status: 'paused',
                    runs: 45,
                    lastRun: '2024-01-10 16:45'
                  },
                  {
                    name: 'Task Assignment Alerts',
                    trigger: 'Task assigned to team member',
                    action: 'Send Slack notification',
                    status: 'active',
                    runs: 89,
                    lastRun: '2024-01-15 11:22'
                  }
                ].map((automation, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-900">{automation.name}</h4>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        automation.status === 'active' ? 'bg-green-100 text-green-700' :
                        automation.status === 'paused' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {automation.status}
                      </span>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-600">Trigger:</span>
                        <p className="font-medium">{automation.trigger}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Action:</span>
                        <p className="font-medium">{automation.action}</p>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-100">
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>{automation.runs} total runs</span>
                        <span>Last: {automation.lastRun}</span>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center space-x-2">
                      <button className="flex-1 px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded">
                        View Logs
                      </button>
                      <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded">
                        Edit
                      </button>
                      <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded">
                        {automation.status === 'active' ? 'Pause' : 'Activate'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'requests' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Internal Requests</h3>
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  <span>New Request</span>
                </button>
              </div>

              <div className="space-y-4">
                {[
                  {
                    id: 'REQ-001',
                    title: 'New laptop for contractor',
                    department: 'IT',
                    requestedBy: 'Sarah Johnson',
                    priority: 'medium',
                    status: 'pending',
                    date: '2024-01-14'
                  },
                  {
                    id: 'REQ-002',
                    title: 'Legal review of client contract',
                    department: 'Legal',
                    requestedBy: 'Mike Chen',
                    priority: 'high',
                    status: 'in-progress',
                    date: '2024-01-13'
                  },
                  {
                    id: 'REQ-003',
                    title: 'Update company handbook',
                    department: 'HR',
                    requestedBy: 'Alex Founder',
                    priority: 'low',
                    status: 'completed',
                    date: '2024-01-10'
                  }
                ].map((request) => (
                  <div key={request.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{request.title}</h4>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs rounded capitalize ${getPriorityColor(request.priority)}`}>
                          {request.priority}
                        </span>
                        <span className={`px-2 py-1 text-xs rounded capitalize ${getStatusColor(request.status)}`}>
                          {request.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>{request.department} • Requested by {request.requestedBy}</span>
                      <span>{request.date}</span>
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