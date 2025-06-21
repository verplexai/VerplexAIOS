import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Download, CheckCircle, Clock, AlertCircle, CreditCard } from 'lucide-react';

export const ClientInvoices: React.FC = () => {
  const { user } = useAuth();

  // Mock invoice data based on client
  const invoicesData = {
    '1': [ // TechCorp Solutions
      {
        id: 'INV-001',
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
        amount: 18750,
        status: 'sent',
        issueDate: '2024-01-15',
        dueDate: '2024-02-14',
        description: 'Dashboard Development - Milestone 3',
        items: [
          { id: '3', description: 'Dashboard Development', quantity: 1, rate: 18750, amount: 18750 }
        ]
      }
    ],
    '3': [ // DataFlow Inc
      {
        id: 'INV-003',
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
        amount: 16000,
        status: 'sent',
        issueDate: '2024-01-10',
        dueDate: '2024-02-09',
        description: 'ML Model Integration - Milestone 3',
        items: [
          { id: '6', description: 'ML Model Integration', quantity: 1, rate: 16000, amount: 16000 }
        ]
      }
    ]
  };

  const invoices = invoicesData[user?.clientId as keyof typeof invoicesData] || [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-700';
      case 'sent': return 'bg-blue-100 text-blue-700';
      case 'overdue': return 'bg-red-100 text-red-700';
      case 'draft': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'sent': return <Clock className="w-4 h-4 text-blue-500" />;
      case 'overdue': return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'draft': return <Clock className="w-4 h-4 text-gray-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const totalPaid = invoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.amount, 0);
  const totalOutstanding = invoices.filter(i => i.status === 'sent').reduce((sum, i) => sum + i.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Invoices & Billing</h1>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span>Total Outstanding:</span>
          <span className="font-semibold text-orange-600">
            ${totalOutstanding.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="font-medium text-green-900">Total Paid</h3>
          <p className="text-2xl font-bold text-green-900">${totalPaid.toLocaleString()}</p>
          <p className="text-sm text-green-700">{invoices.filter(i => i.status === 'paid').length} invoices</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-medium text-blue-900">Outstanding</h3>
          <p className="text-2xl font-bold text-blue-900">${totalOutstanding.toLocaleString()}</p>
          <p className="text-sm text-blue-700">{invoices.filter(i => i.status === 'sent').length} invoices</p>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <h3 className="font-medium text-purple-900">Total Investment</h3>
          <p className="text-2xl font-bold text-purple-900">${(totalPaid + totalOutstanding).toLocaleString()}</p>
          <p className="text-sm text-purple-700">{invoices.length} total invoices</p>
        </div>
      </div>

      {/* Invoices List */}
      {invoices.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CreditCard className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Invoices</h3>
          <p className="text-gray-600">You don't have any invoices yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {invoices.map((invoice) => (
            <div key={invoice.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold text-gray-900">{invoice.id}</h3>
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
                <h4 className="font-medium text-gray-900 mb-2">Invoice Items</h4>
                <div className="space-y-1">
                  {invoice.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-600">{item.description}</span>
                      <span className="font-medium">${item.amount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-4">
                <div className="flex items-center space-x-2">
                  <button className="flex items-center space-x-1 px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded">
                    <Download className="w-4 h-4" />
                    <span>Download PDF</span>
                  </button>
                  {invoice.status === 'sent' && (
                    <button className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700">
                      Pay Now
                    </button>
                  )}
                </div>
                <div className="text-sm text-gray-500">
                  Invoice #{invoice.id}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};