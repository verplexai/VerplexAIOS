import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { MessageSquare, Phone, Video, Mail, Calendar } from 'lucide-react';

export const ClientCommunications: React.FC = () => {
  const { user } = useAuth();

  // Mock communication data based on client
  const communicationsData = {
    '1': [ // TechCorp Solutions
      {
        id: 'COMM-001',
        type: 'email',
        subject: 'Project Update: Milestone 2 Completed',
        content: 'We are pleased to inform you that Milestone 2 (Model Training & Validation) has been completed ahead of schedule. The sentiment analysis models are performing exceptionally well with 94% accuracy.',
        from: 'Sarah Johnson',
        to: ['john@techcorp.com'],
        date: '2024-01-12',
        time: '2:30 PM',
        priority: 'medium',
        projectId: 'PRJ-001'
      },
      {
        id: 'COMM-002',
        type: 'meeting',
        subject: 'Dashboard Design Review',
        content: 'Conducted design review session for the sentiment analysis dashboard. Reviewed wireframes, discussed user interface preferences, and finalized the dashboard layout.',
        from: 'Mike Chen',
        to: ['john@techcorp.com'],
        date: '2024-01-08',
        time: '10:00 AM',
        priority: 'high',
        projectId: 'PRJ-001'
      },
      {
        id: 'COMM-003',
        type: 'call',
        subject: 'Weekly Progress Check-in',
        content: 'Weekly progress call to discuss project status, address any concerns, and plan next steps for the dashboard development phase.',
        from: 'Sarah Johnson',
        to: ['john@techcorp.com'],
        date: '2024-01-05',
        time: '3:00 PM',
        priority: 'medium',
        projectId: 'PRJ-001'
      }
    ],
    '3': [ // DataFlow Inc
      {
        id: 'COMM-004',
        type: 'email',
        subject: 'ML Pipeline Architecture Approved',
        content: 'The machine learning pipeline architecture has been reviewed and approved. We will proceed with the implementation phase as planned.',
        from: 'Sarah Johnson',
        to: ['emma@dataflow.com'],
        date: '2024-01-14',
        time: '11:15 AM',
        priority: 'high',
        projectId: 'PRJ-002'
      },
      {
        id: 'COMM-005',
        type: 'meeting',
        subject: 'Technical Deep Dive Session',
        content: 'Detailed technical discussion about the analytics pipeline implementation, data flow architecture, and integration requirements.',
        from: 'Emma Rodriguez',
        to: ['emma@dataflow.com'],
        date: '2024-01-10',
        time: '2:00 PM',
        priority: 'medium',
        projectId: 'PRJ-002'
      },
      {
        id: 'COMM-006',
        type: 'call',
        subject: 'Project Kickoff Call',
        content: 'Initial project kickoff call to discuss requirements, timeline, and expectations for the real-time analytics pipeline project.',
        from: 'Alex Founder',
        to: ['emma@dataflow.com'],
        date: '2023-11-15',
        time: '1:30 PM',
        priority: 'high',
        projectId: 'PRJ-002'
      }
    ]
  };

  const communications = communicationsData[user?.clientId as keyof typeof communicationsData] || [];

  const getCommunicationTypeIcon = (type: string) => {
    switch (type) {
      case 'email': return <Mail className="w-5 h-5 text-blue-500" />;
      case 'call': return <Phone className="w-5 h-5 text-green-500" />;
      case 'meeting': return <Video className="w-5 h-5 text-purple-500" />;
      case 'message': return <MessageSquare className="w-5 h-5 text-orange-500" />;
      default: return <MessageSquare className="w-5 h-5 text-gray-500" />;
    }
  };

  const getCommunicationTypeColor = (type: string) => {
    switch (type) {
      case 'email': return 'bg-blue-50 border-blue-200';
      case 'call': return 'bg-green-50 border-green-200';
      case 'meeting': return 'bg-purple-50 border-purple-200';
      case 'message': return 'bg-orange-50 border-orange-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Communications</h1>
        <div className="text-sm text-gray-600">
          {communications.length} communication{communications.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Communication Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Mail className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-blue-900">Emails</span>
          </div>
          <p className="text-2xl font-bold text-blue-900 mt-2">
            {communications.filter(c => c.type === 'email').length}
          </p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Phone className="w-5 h-5 text-green-600" />
            <span className="font-medium text-green-900">Calls</span>
          </div>
          <p className="text-2xl font-bold text-green-900 mt-2">
            {communications.filter(c => c.type === 'call').length}
          </p>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Video className="w-5 h-5 text-purple-600" />
            <span className="font-medium text-purple-900">Meetings</span>
          </div>
          <p className="text-2xl font-bold text-purple-900 mt-2">
            {communications.filter(c => c.type === 'meeting').length}
          </p>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <MessageSquare className="w-5 h-5 text-orange-600" />
            <span className="font-medium text-orange-900">Messages</span>
          </div>
          <p className="text-2xl font-bold text-orange-900 mt-2">
            {communications.filter(c => c.type === 'message').length}
          </p>
        </div>
      </div>

      {/* Communications List */}
      {communications.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Communications</h3>
          <p className="text-gray-600">No communication history available.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {communications.map((comm) => (
            <div key={comm.id} className={`border rounded-lg p-6 hover:shadow-lg transition-shadow ${getCommunicationTypeColor(comm.type)}`}>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  {getCommunicationTypeIcon(comm.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{comm.subject}</h3>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs rounded ${getPriorityColor(comm.priority)}`}>
                        {comm.priority}
                      </span>
                      <span className="text-sm text-gray-500">{comm.date} at {comm.time}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-3">{comm.content}</p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4">
                      <span className="text-gray-600">From: <span className="font-medium">{comm.from}</span></span>
                      <span className="text-gray-600">Type: <span className="font-medium capitalize">{comm.type}</span></span>
                      {comm.projectId && (
                        <span className="text-gray-600">Project: <span className="font-medium">{comm.projectId}</span></span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Need to Get in Touch?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center space-x-2 p-4 border border-blue-200 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
            <Mail className="w-5 h-5" />
            <span>Send Email</span>
          </button>
          <button className="flex items-center justify-center space-x-2 p-4 border border-green-200 text-green-600 rounded-lg hover:bg-green-50 transition-colors">
            <Calendar className="w-5 h-5" />
            <span>Schedule Meeting</span>
          </button>
          <button className="flex items-center justify-center space-x-2 p-4 border border-purple-200 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors">
            <MessageSquare className="w-5 h-5" />
            <span>Send Message</span>
          </button>
        </div>
      </div>
    </div>
  );
};