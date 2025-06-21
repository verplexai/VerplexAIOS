import React, { useState } from 'react';
import { HelpCircle, MessageSquare, Phone, Mail, Clock, CheckCircle, AlertCircle, Send } from 'lucide-react';

export const ClientSupport: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [message, setMessage] = useState('');

  const supportTickets = [
    {
      id: 'TICKET-001',
      subject: 'Dashboard Login Issue',
      category: 'Technical',
      status: 'resolved',
      priority: 'medium',
      createdDate: '2024-01-10',
      lastUpdate: '2024-01-12',
      assignedTo: 'Support Team'
    },
    {
      id: 'TICKET-002',
      subject: 'Request for Additional Features',
      category: 'Feature Request',
      status: 'in-progress',
      priority: 'low',
      createdDate: '2024-01-08',
      lastUpdate: '2024-01-14',
      assignedTo: 'Product Team'
    }
  ];

  const faqItems = [
    {
      question: 'How do I access my project dashboard?',
      answer: 'You can access your project dashboard by logging into the client portal and navigating to the "My Projects" section. Each project will have its own dedicated dashboard with real-time progress updates.'
    },
    {
      question: 'When will I receive project updates?',
      answer: 'We provide regular project updates through multiple channels: weekly progress emails, milestone completion notifications, and real-time updates in your client portal dashboard.'
    },
    {
      question: 'How do I download my invoices?',
      answer: 'Navigate to the "Invoices & Billing" section in your client portal. Each invoice has a "Download PDF" button that will generate and download your invoice.'
    },
    {
      question: 'Who is my main point of contact?',
      answer: 'Your main point of contact depends on your project. You can find your assigned team members in the "My Projects" section, and all communication history is available in the "Communications" tab.'
    },
    {
      question: 'How do I request changes to my project?',
      answer: 'You can request changes by submitting a support ticket through this portal, sending an email to your project manager, or scheduling a call through the communications section.'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'bg-green-100 text-green-700';
      case 'in-progress': return 'bg-blue-100 text-blue-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'closed': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'in-progress': return <Clock className="w-4 h-4 text-blue-500" />;
      case 'pending': return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'closed': return <CheckCircle className="w-4 h-4 text-gray-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
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

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle ticket submission
    console.log('Submitting ticket:', { category: selectedCategory, message });
    setSelectedCategory('');
    setMessage('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Help & Support</h1>
        <div className="text-sm text-gray-600">
          We're here to help you succeed
        </div>
      </div>

      {/* Quick Contact Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-3">
            <MessageSquare className="w-6 h-6 text-blue-600" />
            <h3 className="font-semibold text-blue-900">Live Chat</h3>
          </div>
          <p className="text-blue-700 text-sm mb-4">Get instant help from our support team</p>
          <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Start Chat
          </button>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-3">
            <Phone className="w-6 h-6 text-green-600" />
            <h3 className="font-semibold text-green-900">Phone Support</h3>
          </div>
          <p className="text-green-700 text-sm mb-4">Call us for urgent matters</p>
          <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            Call Now
          </button>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-3">
            <Mail className="w-6 h-6 text-purple-600" />
            <h3 className="font-semibold text-purple-900">Email Support</h3>
          </div>
          <p className="text-purple-700 text-sm mb-4">Send us a detailed message</p>
          <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            Send Email
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Submit New Ticket */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Submit Support Ticket</h3>
          <form onSubmit={handleSubmitTicket} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select a category</option>
                <option value="technical">Technical Issue</option>
                <option value="billing">Billing Question</option>
                <option value="feature">Feature Request</option>
                <option value="project">Project Question</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe your issue or question in detail..."
                required
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Send className="w-4 h-4" />
              <span>Submit Ticket</span>
            </button>
          </form>
        </div>

        {/* Support Tickets */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Your Support Tickets</h3>
          {supportTickets.length === 0 ? (
            <div className="text-center py-8">
              <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">No support tickets yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {supportTickets.map((ticket) => (
                <div key={ticket.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{ticket.subject}</h4>
                    <div className="flex items-center space-x-1">
                      {getStatusIcon(ticket.status)}
                      <span className={`px-2 py-1 text-xs rounded ${getStatusColor(ticket.status)}`}>
                        {ticket.status.replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                    <span>#{ticket.id}</span>
                    <span className={`px-2 py-1 text-xs rounded ${getPriorityColor(ticket.priority)}`}>
                      {ticket.priority}
                    </span>
                    <span>{ticket.category}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Created: {ticket.createdDate}</span>
                    <span>Updated: {ticket.lastUpdate}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Frequently Asked Questions</h3>
        <div className="space-y-4">
          {faqItems.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">{faq.question}</h4>
              <p className="text-gray-600 text-sm">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-gray-900 mb-1">Support Hours</h4>
            <p className="text-gray-600">Monday - Friday: 9 AM - 6 PM PST</p>
            <p className="text-gray-600">Saturday: 10 AM - 4 PM PST</p>
            <p className="text-gray-600">Sunday: Closed</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-1">Emergency Contact</h4>
            <p className="text-gray-600">For urgent issues outside business hours</p>
            <p className="text-gray-600">Phone: +1 (555) 123-4567</p>
            <p className="text-gray-600">Email: emergency@verplex.ai</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-1">Response Times</h4>
            <p className="text-gray-600">High Priority: 2-4 hours</p>
            <p className="text-gray-600">Medium Priority: 24 hours</p>
            <p className="text-gray-600">Low Priority: 48-72 hours</p>
          </div>
        </div>
      </div>
    </div>
  );
};