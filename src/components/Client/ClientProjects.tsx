import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Clock, CheckCircle, AlertCircle, Users, Calendar, DollarSign } from 'lucide-react';

export const ClientProjects: React.FC = () => {
  const { user } = useAuth();

  // Mock project data based on client
  const projectsData = {
    '1': [ // TechCorp Solutions
      {
        id: 'PRJ-001',
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
      }
    ],
    '3': [ // DataFlow Inc
      {
        id: 'PRJ-002',
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
    ]
  };

  const projects = projectsData[user?.clientId as keyof typeof projectsData] || [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning': return 'bg-blue-100 text-blue-700';
      case 'in-progress': return 'bg-yellow-100 text-yellow-700';
      case 'review': return 'bg-purple-100 text-purple-700';
      case 'completed': return 'bg-green-100 text-green-700';
      case 'on-hold': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'planning': return <Clock className="w-4 h-4 text-blue-500" />;
      case 'in-progress': return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'review': return <Clock className="w-4 h-4 text-purple-500" />;
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'on-hold': return <Clock className="w-4 h-4 text-gray-500" />;
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">My Projects</h1>
        <div className="text-sm text-gray-600">
          {projects.length} active project{projects.length !== 1 ? 's' : ''}
        </div>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Active Projects</h3>
          <p className="text-gray-600">You don't have any active projects at the moment.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.name}</h3>
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
                  <h4 className="font-medium text-gray-900 mb-2">Budget</h4>
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
                  <h4 className="font-medium text-gray-900 mb-2">Team</h4>
                  <div className="space-y-1">
                    {project.assignedTeam.map((member, index) => (
                      <p key={index} className="text-sm text-gray-600">{member}</p>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Services</h4>
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
                <h4 className="font-medium text-gray-900 mb-3">Project Milestones</h4>
                <div className="space-y-3">
                  {project.milestones.map((milestone) => (
                    <div key={milestone.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h5 className="font-medium text-gray-900">{milestone.name}</h5>
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
      )}
    </div>
  );
};