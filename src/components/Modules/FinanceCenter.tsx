import React, { useState } from 'react';
import { DollarSign, TrendingUp, TrendingDown, CreditCard, FileText, Plus, Calendar, AlertCircle, CheckCircle, Clock, PieChart, BarChart3, Target } from 'lucide-react';
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
      paymentMethod: 'ACH Transfer',
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
      paymentMethod: null,
      items: [
        { description: 'Automation Setup', quantity: 1, rate: 8500, amount: 8500 }
      ]
    },
    {
      id: 'INV-003',
      client: 'DataFlow Inc',
      amount: 22000,
      status: 'overdue',
      sentDate: '2023-12-15',
      dueDate: '2024-01-14',
      paidDate: null,
      paymentMethod: null,
      items: [
        { description: 'ML Pipeline Development', quantity: 1, rate: 15000, amount: 15000 },
        { description: 'Analytics Dashboard', quantity: 1, rate: 7000, amount: 7000 }
      ]
    },
    {
      id: 'INV-004',
      client: 'StartupXYZ',
      amount: 12000,
      status: 'draft',
      sentDate: null,
      dueDate: '2024-02-15',
      paidDate: null,
      paymentMethod: null,
      items: [
        { description: 'Custom Dashboard', quantity: 1, rate: 12000, amount: 12000 }
      ]
    }
  ];

  const expenses = [
    { id: 'EXP-001', category: 'Software', description: 'OpenAI API Credits', amount: 450, date: '2024-01-15', recurring: true, vendor: 'OpenAI' },
    { id: 'EXP-002', category: 'Infrastructure', description: 'AWS Services', amount: 280, date: '2024-01-15', recurring: true, vendor: 'Amazon Web Services' },
    { id: 'EXP-003', category: 'Software', description: 'Figma Pro Subscription', amount: 144, date: '2024-01-12', recurring: true, vendor: 'Figma Inc.' },
    { id: 'EXP-004', category: 'Legal', description: 'Contract Review', amount: 800, date: '2024-01-10', recurring: false, vendor: 'Wilson Sonsini' },
    { id: 'EXP-005', category: 'Infrastructure', description: 'Website Hosting', amount: 25, date: '2024-01-08', recurring: true, vendor: 'Vercel' },
    { id: 'EXP-006', category: 'Software', description: 'Slack Pro Plan', amount: 96, date: '2024-01-01', recurring: true, vendor: 'Slack Technologies' },
    { id: 'EXP-007', category: 'Software', description: 'GitHub Enterprise', amount: 84, date: '2024-01-01', recurring: true, vendor: 'GitHub Inc.' },
    { id: 'EXP-008', category: 'Marketing', description: 'Google Ads Campaign', amount: 500, date: '2024-01-05', recurring: false, vendor: 'Google LLC' },
  ];

  const startupCosts = {
    initialCapital: 100000,
    currentCash: 75000,
    totalInvestment: 900000,
    burnRate: 12000,
    runway: 6.25, // months
    monthlyRevenue: 45000,
    projectedBreakeven: '2024-08-01'
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: DollarSign },
    { id: 'invoices', name: 'Client Invoicing Tracker', icon: FileText },
    { id: 'expenses', name: 'Expenses & Subscriptions', icon: CreditCard },
    { id: 'reports', name: 'Financial Reports', icon: BarChart3 },
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
  const overdueRevenue = invoices.filter(inv => inv.status === 'overdue').reduce((sum, inv) => sum + inv.amount, 0);
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const monthlyRecurring = expenses.filter(exp => exp.recurring).reduce((sum, exp) => sum + exp.amount, 0);

  const expensesByCategory = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

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
          title="Monthly Burn Rate"
          value={`$${(startupCosts.burnRate / 1000).toFixed(0)}K`}
          change={-5}
          trend="down"
          icon={TrendingDown}
          color="orange"
        />
        <StatsCard
          title="Runway"
          value={`${startupCosts.runway.toFixed(1)}m`}
          change={8}
          trend="up"
          icon={Target}
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
                  <h3 className="font-semibold text-gray-900">Startup Cost Sheet</h3>
                  <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-6">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-green-700">Initial Capital</p>
                        <p className="text-2xl font-bold text-green-900">${startupCosts.initialCapital.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-green-700">Total Investment</p>
                        <p className="text-2xl font-bold text-green-900">${(startupCosts.totalInvestment / 1000).toFixed(0)}K</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-green-700">Current Cash</p>
                        <p className="text-xl font-bold text-green-900">${startupCosts.currentCash.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-green-700">Monthly Burn</p>
                        <p className="text-xl font-bold text-red-600">${startupCosts.burnRate.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-green-200">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-green-700">Runway</p>
                          <p className="text-lg font-bold text-green-900">{startupCosts.runway} months</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-green-700">Projected Breakeven</p>
                          <p className="text-lg font-bold text-blue-600">{startupCosts.projectedBreakeven}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">Cash Flow Summary</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                        <span className="text-green-700 font-medium">Monthly Revenue</span>
                        <span className="font-bold text-green-900">${startupCosts.monthlyRevenue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                        <span className="text-red-700 font-medium">Monthly Expenses</span>
                        <span className="font-bold text-red-900">${startupCosts.burnRate.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <span className="text-blue-700 font-medium">Net Monthly</span>
                        <span className="font-bold text-blue-900">
                          ${(startupCosts.monthlyRevenue - startupCosts.burnRate).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Financial Health</h3>
                  
                  <div className="space-y-3">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="font-medium text-blue-900 mb-2">Accounts Receivable</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-blue-700">Pending Invoices</span>
                          <span className="font-bold text-blue-900">${pendingRevenue.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-red-700">Overdue Invoices</span>
                          <span className="font-bold text-red-900">${overdueRevenue.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between pt-2 border-t border-blue-200">
                          <span className="text-blue-700 font-medium">Total Outstanding</span>
                          <span className="font-bold text-blue-900">${(pendingRevenue + overdueRevenue).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-orange-50 rounded-lg p-4">
                      <h4 className="font-medium text-orange-900 mb-2">Expense Breakdown</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-orange-700">Recurring Subscriptions</span>
                          <span className="font-bold text-orange-900">${monthlyRecurring.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-orange-700">One-time Expenses</span>
                          <span className="font-bold text-orange-900">${(totalExpenses - monthlyRecurring).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between pt-2 border-t border-orange-200">
                          <span className="text-orange-700 font-medium">Total This Month</span>
                          <span className="font-bold text-orange-900">${totalExpenses.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4">
                      <h4 className="font-medium text-purple-900 mb-2">Key Metrics</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-purple-700">Gross Margin</span>
                          <span className="font-bold text-purple-900">
                            {Math.round(((startupCosts.monthlyRevenue - monthlyRecurring) / startupCosts.monthlyRevenue) * 100)}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-purple-700">Customer LTV</span>
                          <span className="font-bold text-purple-900">$28K</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-purple-700">CAC Payback</span>
                          <span className="font-bold text-purple-900">8 months</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'invoices' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Client Invoicing Tracker</h3>
                <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  <span>New Invoice</span>
                </button>
              </div>

              {/* Invoice Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-medium text-green-900">Paid Invoices</h4>
                  <p className="text-2xl font-bold text-green-900">${totalRevenue.toLocaleString()}</p>
                  <p className="text-sm text-green-700">{invoices.filter(i => i.status === 'paid').length} invoices</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900">Pending Payment</h4>
                  <p className="text-2xl font-bold text-blue-900">${pendingRevenue.toLocaleString()}</p>
                  <p className="text-sm text-blue-700">{invoices.filter(i => i.status === 'sent').length} invoices</p>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-medium text-red-900">Overdue</h4>
                  <p className="text-2xl font-bold text-red-900">${overdueRevenue.toLocaleString()}</p>
                  <p className="text-sm text-red-700">{invoices.filter(i => i.status === 'overdue').length} invoices</p>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900">Draft</h4>
                  <p className="text-2xl font-bold text-gray-900">
                    ${invoices.filter(i => i.status === 'draft').reduce((sum, i) => sum + i.amount, 0).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-700">{invoices.filter(i => i.status === 'draft').length} invoices</p>
                </div>
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
                          {invoice.status === 'overdue' && (
                            <span className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded">
                              {Math.floor((new Date().getTime() - new Date(invoice.dueDate).getTime()) / (1000 * 60 * 60 * 24))} days overdue
                            </span>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-sm">
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

                          <div>
                            <span className="text-gray-600">Payment Method:</span>
                            <p className="font-medium">{invoice.paymentMethod || 'N/A'}</p>
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
                        {invoice.status === 'overdue' && (
                          <button className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700">
                            Follow Up
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
                <h3 className="font-semibold text-gray-900">Expenses & Recurring Subscriptions Audit</h3>
                <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  <span>Add Expense</span>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  {/* Recurring Subscriptions Section */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-gray-900">Recurring Subscriptions & Tools</h4>
                      <span className="px-3 py-1 bg-orange-100 text-orange-700 text-sm rounded-full">
                        ${monthlyRecurring}/month
                      </span>
                    </div>
                    <div className="space-y-3">
                      {expenses.filter(expense => expense.recurring).map((expense) => (
                        <div key={expense.id} className="flex items-center justify-between p-4 border border-orange-200 bg-orange-50 rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-1">
                              <h5 className="font-medium text-orange-900">{expense.description}</h5>
                              <span className="px-2 py-1 text-xs bg-orange-200 text-orange-800 rounded">
                                {expense.category}
                              </span>
                              <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">
                                Monthly
                              </span>
                            </div>
                            <p className="text-sm text-orange-700">Vendor: {expense.vendor}</p>
                            <p className="text-xs text-orange-600">Last charged: {expense.date}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-orange-900">${expense.amount}</p>
                            <div className="flex items-center space-x-2 mt-2">
                              <button className="px-2 py-1 text-xs text-orange-700 hover:bg-orange-200 rounded">
                                Review
                              </button>
                              <button className="px-2 py-1 text-xs text-red-600 hover:bg-red-50 rounded">
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* One-time Expenses */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">One-time Expenses</h4>
                    <div className="space-y-3">
                      {expenses.filter(expense => !expense.recurring).map((expense) => (
                        <div key={expense.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-1">
                              <h5 className="font-medium text-gray-900">{expense.description}</h5>
                              <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                                {expense.category}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600">Vendor: {expense.vendor}</p>
                            <p className="text-xs text-gray-500">{expense.date}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">${expense.amount}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Expense Categories</h4>
                  {Object.entries(expensesByCategory)
                    .sort(([,a], [,b]) => b - a)
                    .map(([category, amount], index) => {
                      const percentage = Math.round((amount / totalExpenses) * 100);
                      return (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">{category}</span>
                            <span className="font-medium">${amount}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-600 h-2 rounded-full transition-all duration-300" 
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-gray-500">{percentage}% of total expenses</p>
                        </div>
                      );
                    })}

                  <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h5 className="font-medium text-blue-900 mb-2">Subscription Optimization</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-blue-700">Total Subscriptions:</span>
                        <span className="font-medium text-blue-900">${monthlyRecurring}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-700">Potential Savings:</span>
                        <span className="font-medium text-green-600">$120/month</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-700">Unused Tools:</span>
                        <span className="font-medium text-orange-600">2 identified</span>
                      </div>
                    </div>
                    <button className="w-full mt-3 px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                      Review Subscriptions
                    </button>
                  </div>
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
                        {Object.entries(expensesByCategory).map(([category, amount]) => (
                          <div key={category} className="flex justify-between text-sm">
                            <span className="text-gray-600">{category}</span>
                            <span>${amount}</span>
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
                  <h4 className="font-medium text-gray-900">Key Financial Metrics</h4>
                  <div className="space-y-3">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h5 className="font-medium text-blue-900 mb-2">Average Invoice Value</h5>
                      <div className="text-2xl font-bold text-blue-900">
                        ${Math.round(totalRevenue / invoices.filter(i => i.status === 'paid').length).toLocaleString()}
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

                    <div className="bg-purple-50 rounded-lg p-4">
                      <h5 className="font-medium text-purple-900 mb-2">Revenue Growth</h5>
                      <div className="text-2xl font-bold text-purple-900">+25%</div>
                      <p className="text-sm text-purple-700">Month over month</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-medium text-gray-900 mb-4">Financial Projections</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Q1 2024 Revenue Target</p>
                    <p className="text-xl font-bold text-blue-600">$150K</p>
                    <p className="text-sm text-green-600">On track</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Annual Revenue Goal</p>
                    <p className="text-xl font-bold text-purple-600">$600K</p>
                    <p className="text-sm text-blue-600">Achievable</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Break-even Target</p>
                    <p className="text-xl font-bold text-green-600">Aug 2024</p>
                    <p className="text-sm text-green-600">Projected</p>
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