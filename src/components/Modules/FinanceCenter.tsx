import React, { useState } from 'react';
import { DollarSign, TrendingUp, TrendingDown, CreditCard, FileText, Plus, Calendar, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { StatsCard } from '../Dashboard/StatsCard';
import { useAuth } from '../../contexts/AuthContext';

export const FinanceCenter: React.FC = () => {
  const { hasPermission } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  if (!hasPermission('finance', 'view')) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <DollarSign className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900">Access Restricted</h3>
          <p className="text-gray-600">You don't have permission to view this module.</p>
        </div>
      </div>
    );
  }

  const invoices = [
    {
      id: 'INV-001',
      client: 'TechCorp Solutions',
      amount: 15000,
      status: 'paid',
      sentDate: '2024-01-01',
      dueDate: '2024-01-31',
      paidDate: '2024-01-25',
      items: [
        { description: 'NLP Model Development', quantity: 1, rate: 10000, amount: 10000 },
        { description: 'Dashboard Integration', quantity: 1, rate: 5000, amount: 5000 }
      ]
    },
    {
      id: 'INV-002',
      client: 'InnovateLabs',
      amount: 8500,
      status: 'sent',
      sentDate: '2024-01-10',
      dueDate: '2024-02-09',
      paidDate: null,
      items: [
        { description: 'Automation Setup', quantity: 1, rate: 8500, amount: 8500 }
      ]
    },
    {
      id: 'INV-003',
      client: 'DataFlow Inc',
      amount: 22000,
      status: 'draft',
      sentDate: null,
      dueDate: '2024-02-15',
      paidDate: null,
      items: [
        { description: 'ML Pipeline Development', quantity: 1, rate: 15000, amount: 15000 },
        { description: 'Analytics Dashboard', quantity: 1, rate: 7000, amount: 7000 }
      ]
    }
  ];

  const expenses = [
    { id: 'EXP-001', category: 'Software', description: 'OpenAI API Credits', amount: 450, date: '2024-01-15', recurring: true },
    { id: 'EXP-002', category: 'Infrastructure', description: 'AWS Services', amount: 280, date: '2024-01-15', recurring: true },
    { id: 'EXP-003', category: 'Tools', description: 'Figma Pro Subscription', amount: 144, date: '2024-01-12', recurring: true },
    { id: 'EXP-004', category: 'Legal', description: 'Contract Review', amount: 800, date: '2024-01-10', recurring: false },
    { id: 'EXP-005', category: 'Marketing', description: 'Website Hosting', amount: 25, date: '2024-01-08', recurring: true },
  ];

  const tabs = [
    { id: 'overview', name: 'Overview', icon: DollarSign },
    { id: 'invoices', name: 'Invoices', icon: FileText },
    { id: 'expenses', name: 'Expenses', icon: CreditCard },
    { id: 'reports', name: 'Reports', icon: TrendingUp },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-700';
      case 'sent': return 'bg-blue-100 text-blue-700';
      case 'paid': return 'bg-green-100 text-green-700';
      case 'overdue': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft': return <Clock className="w-4 h-4 text-gray-500" />;
      case 'sent': return <AlertCircle className="w-4 h-4 text-blue-500" />;
      case 'paid': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'overdue': return <AlertCircle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const totalRevenue = invoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.amount, 0);
  const pendingRevenue = invoices.filter(inv => inv.status === 'sent').reduce((sum, inv) => sum + inv.amount, 0);
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const monthlyRecurring = expenses.filter(exp => exp.recurring).reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="space-y-6">
      {/* Security Alert */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-4">
        <div className="flex items-center space-x-3">
          <DollarSign className="w-6 h-6 text-green-600" />
          <div>
            <h3 className="font-semibold text-green-900">Finance & Payment Center</h3>
            <p className="text-green-700 text-sm">P&L tracking, invoicing, and financial oversight</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Revenue"
          value={`$${(totalRevenue / 1000).toFixed(0)}K`}
          change={25}
          trend="up"
          icon={TrendingUp}
          color="green"
        />
        <StatsCard
          title="Pending Revenue"
          value={`$${(pendingRevenue / 1000).toFixed(1)}K`}
          change={15}
          trend="up"
          icon={Clock}
          color="blue"
        />
        <StatsCard
          title="Monthly Expenses"
          value={`$${(totalExpenses / 1000).toFixed(1)}K`}
          change={-5}
          trend="down"
          icon={TrendingDown}
          color="orange"
        />
        <StatsCard
          title="Recurring Costs"
          value={`$${monthlyRecurring}`}
          change={8}
          trend="up"
          icon={CreditCard}
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
                    ? 'border-green-500 text-green-600'
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
                  <h3 className="font-semibold text-gray-900">Cash Flow Summary</h3>
                  <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-green-700 font-medium">Net Profit (YTD)</span>
                      <TrendingUp className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="text-2xl font-bold text-green-900">
                      ${(totalRevenue - totalExpenses).toLocaleString()}
                    </div>
                    <p className="text-sm text-green-700 mt-1">
                      Revenue: ${totalRevenue.toLocaleString()} - Expenses: ${totalExpenses.toLocaleString()}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">Recent Transactions</h4>
                    {[
                      { date: '2024-01-25', description: 'Payment received from TechCorp', amount: 15000, type: 'income' },
                      { date: '2024-01-15', description: 'OpenAI API Credits', amount: -450, type: 'expense' },
                      { date: '2024-01-15', description: 'AWS Services', amount: -280, type: 'expense' },
                      { date: '2024-01-10', description: 'Legal Contract Review', amount: -800, type: 'expense' },
                    ].map((transaction, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{transaction.description}</p>
                          <p className="text-xs text-gray-500">{transaction.date}</p>
                        </div>
                        <span className={`font-medium ${
                          transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.type === 'income' ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Financial Health</h3>
                  
                  <div className="space-y-3">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="font-medium text-blue-900 mb-2">Accounts Receivable</h4>
                      <div className="text-xl font-bold text-blue-900">${pendingRevenue.toLocaleString()}</div>
                      <p className="text-sm text-blue-700">Outstanding invoices</p>
                    </div>

                    <div className="bg-orange-50 rounded-lg p-4">
                      <h4 className="font-medium text-orange-900 mb-2">Monthly Burn Rate</h4>
                      <div className="text-xl font-bold text-orange-900">${monthlyRecurring.toLocaleString()}</div>
                      <p className="text-sm text-orange-700">Recurring expenses</p>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4">
                      <h4 className="font-medium text-purple-900 mb-2">Runway</h4>
                      <div className="text-xl font-bold text-purple-900">
                        {monthlyRecurring > 0 ? Math.floor(totalRevenue / monthlyRecurring) : '∞'} months
                      </div>
                      <p className="text-sm text-purple-700">At current burn rate</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'invoices' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Invoice Management</h3>
                <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  <span>New Invoice</span>
                </button>
              </div>

              <div className="space-y-4">
                {invoices.map((invoice) => (
                  <div key={invoice.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-semibold text-gray-900">{invoice.id}</h4>
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(invoice.status)}
                            <span className={`px-2 py-1 text-xs rounded capitalize ${getStatusColor(invoice.status)}`}>
                              {invoice.status}
                            </span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Client:</span>
                            <p className="font-medium">{invoice.client}</p>
                          </div>
                          
                          <div>
                            <span className="text-gray-600">Amount:</span>
                            <p className="font-medium text-green-600">${invoice.amount.toLocaleString()}</p>
                          </div>
                          
                          <div>
                            <span className="text-gray-600">Due Date:</span>
                            <p className="font-medium">{invoice.dueDate}</p>
                          </div>
                          
                          <div>
                            <span className="text-gray-600">
                              {invoice.paidDate ? 'Paid:' : 'Sent:'}
                            </span>
                            <p className="font-medium">
                              {invoice.paidDate || invoice.sentDate || 'Not sent'}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-4">
                        <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded">
                          View
                        </button>
                        <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded">
                          Download
                        </button>
                        {invoice.status === 'draft' && (
                          <button className="px-3 py-1 text-sm text-green-600 hover:bg-green-50 rounded">
                            Send
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-gray-100">
                      <div className="space-y-1">
                        {invoice.items.map((item, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span className="text-gray-600">{item.description}</span>
                            <span className="font-medium">${item.amount.toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'expenses' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Expense Tracking</h3>
                <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  <span>Add Expense</span>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="space-y-3">
                    {expenses.map((expense) => (
                      <div key={expense.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-1">
                            <h4 className="font-medium text-gray-900">{expense.description}</h4>
                            <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                              {expense.category}
                            </span>
                            {expense.recurring && (
                              <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">
                                Recurring
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{expense.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-red-600">${expense.amount}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Expense Categories</h4>
                  {[
                    { category: 'Software', amount: 594, percentage: 35 },
                    { category: 'Infrastructure', amount: 280, percentage: 17 },
                    { category: 'Legal', amount: 800, percentage: 47 },
                    { category: 'Tools', amount: 169, percentage: 10 },
                    { category: 'Marketing', amount: 25, percentage: 1 },
                  ].map((cat, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">{cat.category}</span>
                        <span className="font-medium">${cat.amount}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${cat.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="space-y-6">
              <h3 className="font-semibold text-gray-900">Financial Reports</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Profit & Loss Statement</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                        <span className="font-medium text-gray-900">Revenue</span>
                        <span className="font-semibold text-green-600">${totalRevenue.toLocaleString()}</span>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Client Services</span>
                          <span>${totalRevenue.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="font-medium text-gray-900">Expenses</span>
                        <span className="font-semibold text-red-600">${totalExpenses.toLocaleString()}</span>
                      </div>

                      <div className="space-y-2">
                        {[
                          { name: 'Software & Tools', amount: 763 },
                          { name: 'Infrastructure', amount: 280 },
                          { name: 'Legal & Professional', amount: 800 },
                          { name: 'Marketing', amount: 25 },
                        ].map((item, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span className="text-gray-600">{item.name}</span>
                            <span>${item.amount}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between items-center pt-2 border-t border-gray-300">
                        <span className="font-semibold text-gray-900">Net Profit</span>
                        <span className="font-bold text-green-600">
                          ${(totalRevenue - totalExpenses).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Key Metrics</h4>
                  <div className="space-y-3">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h5 className="font-medium text-blue-900 mb-2">Average Invoice Value</h5>
                      <div className="text-2xl font-bold text-blue-900">
                        ${Math.round(totalRevenue / invoices.length).toLocaleString()}
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <h5 className="font-medium text-green-900 mb-2">Profit Margin</h5>
                      <div className="text-2xl font-bold text-green-900">
                        {Math.round(((totalRevenue - totalExpenses) / totalRevenue) * 100)}%
                      </div>
                    </div>

                    <div className="bg-orange-50 rounded-lg p-4">
                      <h5 className="font-medium text-orange-900 mb-2">Collection Period</h5>
                      <div className="text-2xl font-bold text-orange-900">18 days</div>
                      <p className="text-sm text-orange-700">Average payment time</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};