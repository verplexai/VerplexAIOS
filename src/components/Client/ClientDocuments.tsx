import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { FileText, Download, Eye, Calendar, User } from 'lucide-react';

export const ClientDocuments: React.FC = () => {
  const { user } = useAuth();

  // Mock document data based on client
  const documentsData = {
    '1': [ // TechCorp Solutions
      {
        id: 'DOC-001',
        name: 'Project Proposal - Sentiment Analysis System',
        type: 'proposal',
        url: '#',
        uploadDate: '2023-11-20',
        size: '2.4 MB',
        uploadedBy: 'Alex Founder',
        description: 'Comprehensive project proposal outlining scope, timeline, and deliverables',
        version: 'v1.0',
        projectId: 'PRJ-001'
      },
      {
        id: 'DOC-002',
        name: 'Technical Specification Document',
        type: 'specification',
        url: '#',
        uploadDate: '2023-12-05',
        size: '1.8 MB',
        uploadedBy: 'Sarah Johnson',
        description: 'Detailed technical specifications for the NLP system',
        version: 'v2.1',
        projectId: 'PRJ-001'
      },
      {
        id: 'DOC-003',
        name: 'Model Performance Report',
        type: 'report',
        url: '#',
        uploadDate: '2024-01-12',
        size: '956 KB',
        uploadedBy: 'Sarah Johnson',
        description: 'Comprehensive report on model training results and performance metrics',
        version: 'v1.0',
        projectId: 'PRJ-001'
      },
      {
        id: 'DOC-004',
        name: 'Master Service Agreement',
        type: 'contract',
        url: '#',
        uploadDate: '2023-11-15',
        size: '1.2 MB',
        uploadedBy: 'Alex Founder',
        description: 'Signed master service agreement',
        version: 'v1.0',
        projectId: null
      }
    ],
    '3': [ // DataFlow Inc
      {
        id: 'DOC-005',
        name: 'Analytics Pipeline Architecture',
        type: 'specification',
        url: '#',
        uploadDate: '2023-11-28',
        size: '3.2 MB',
        uploadedBy: 'Emma Rodriguez',
        description: 'System architecture diagrams and technical documentation',
        version: 'v1.0',
        projectId: 'PRJ-002'
      },
      {
        id: 'DOC-006',
        name: 'Data Processing Pipeline Report',
        type: 'report',
        url: '#',
        uploadDate: '2024-01-10',
        size: '1.5 MB',
        uploadedBy: 'Sarah Johnson',
        description: 'Implementation report for the data processing pipeline',
        version: 'v1.0',
        projectId: 'PRJ-002'
      },
      {
        id: 'DOC-007',
        name: 'Project Proposal - Analytics Pipeline',
        type: 'proposal',
        url: '#',
        uploadDate: '2023-11-10',
        size: '2.8 MB',
        uploadedBy: 'Alex Founder',
        description: 'Initial project proposal for real-time analytics pipeline',
        version: 'v1.0',
        projectId: 'PRJ-002'
      },
      {
        id: 'DOC-008',
        name: 'Data Processing Agreement',
        type: 'contract',
        url: '#',
        uploadDate: '2023-11-15',
        size: '890 KB',
        uploadedBy: 'Alex Founder',
        description: 'GDPR-compliant data processing agreement',
        version: 'v1.0',
        projectId: null
      }
    ]
  };

  const documents = documentsData[user?.clientId as keyof typeof documentsData] || [];

  const getDocumentTypeColor = (type: string) => {
    switch (type) {
      case 'contract': return 'bg-red-100 text-red-700';
      case 'proposal': return 'bg-blue-100 text-blue-700';
      case 'report': return 'bg-green-100 text-green-700';
      case 'specification': return 'bg-purple-100 text-purple-700';
      case 'deliverable': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getDocumentTypeIcon = (type: string) => {
    return <FileText className="w-5 h-5" />;
  };

  const documentsByType = documents.reduce((acc, doc) => {
    if (!acc[doc.type]) {
      acc[doc.type] = [];
    }
    acc[doc.type].push(doc);
    return acc;
  }, {} as Record<string, typeof documents>);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
        <div className="text-sm text-gray-600">
          {documents.length} document{documents.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Document Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Object.entries(documentsByType).map(([type, docs]) => (
          <div key={type} className={`border rounded-lg p-4 ${getDocumentTypeColor(type).replace('text-', 'border-').replace('-700', '-200')}`}>
            <div className="flex items-center space-x-2">
              {getDocumentTypeIcon(type)}
              <span className="font-medium capitalize">{type}s</span>
            </div>
            <p className="text-2xl font-bold mt-2">{docs.length}</p>
          </div>
        ))}
      </div>

      {/* Documents List */}
      {documents.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Documents</h3>
          <p className="text-gray-600">No documents have been shared yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc) => (
            <div key={doc.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">{doc.name}</h3>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{doc.description}</p>
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
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Size:</span>
                  <span className="font-medium">{doc.size}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Uploaded:</span>
                  <span className="font-medium">{doc.uploadDate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">By:</span>
                  <span className="font-medium">{doc.uploadedBy}</span>
                </div>
                {doc.projectId && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Project:</span>
                    <span className="font-medium">{doc.projectId}</span>
                  </div>
                )}
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
      )}

      {/* Document Categories */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Document Categories</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(documentsByType).map(([type, docs]) => (
            <div key={type} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900 capitalize">{type}s</h4>
                <span className={`px-2 py-1 text-xs rounded ${getDocumentTypeColor(type)}`}>
                  {docs.length}
                </span>
              </div>
              <div className="space-y-1">
                {docs.slice(0, 3).map((doc) => (
                  <p key={doc.id} className="text-sm text-gray-600 truncate">{doc.name}</p>
                ))}
                {docs.length > 3 && (
                  <p className="text-xs text-gray-500">+{docs.length - 3} more</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};