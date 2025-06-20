// Core system types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'founder' | 'team' | 'contractor' | 'client';
  avatar?: string;
  permissions: Permission[];
  clientId?: string; // Links client users to their specific client data
}

export interface Permission {
  module: string;
  access: 'full' | 'view' | 'edit' | 'none';
}

export interface Client {
  id: string;
  name: string;
  email: string;
  company: string;
  stage: 'lead' | 'qualified' | 'onboarded' | 'active' | 'completed';
  value: number;
  createdAt: string;
  lastContact: string;
  assignedTo: string;
  services: string[];
  status: 'active' | 'inactive' | 'archived';
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignedTo: string;
  dueDate: string;
  clientId?: string;
  serviceId?: string;
  tags: string[];
  createdAt: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  category: 'nlp' | 'dashboards' | 'automation' | 'custom';
  basePriceTier: number;
  estimatedHours: number;
  sopId?: string;
  templates: ServiceTemplate[];
  tags: string[];
}

export interface ServiceTemplate {
  id: string;
  name: string;
  type: 'proposal' | 'contract' | 'handover' | 'sop';
  content: string;
  variables: string[];
}

export interface Contract {
  id: string;
  clientId: string;
  type: 'nda' | 'msa' | 'sow' | 'dpa';
  status: 'draft' | 'sent' | 'signed' | 'expired';
  signedDate?: string;
  expiryDate?: string;
  value?: number;
  documents: string[];
}

export interface Invoice {
  id: string;
  clientId: string;
  amount: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  sentDate?: string;
  dueDate: string;
  paidDate?: string;
  items: InvoiceItem[];
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface KPI {
  id: string;
  name: string;
  value: number;
  target: number;
  period: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  trend: 'up' | 'down' | 'stable';
  change: number;
}

// New types for client portal enhancements
export interface ClientProject {
  id: string;
  clientId: string;
  name: string;
  description: string;
  status: 'planning' | 'in-progress' | 'review' | 'completed' | 'on-hold';
  progress: number;
  startDate: string;
  dueDate: string;
  completedDate?: string;
  assignedTeam: string[];
  services: string[];
  milestones: ProjectMilestone[];
  budget: number;
  spent: number;
}

export interface ProjectMilestone {
  id: string;
  name: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'in-progress' | 'completed' | 'overdue';
  completedDate?: string;
}

export interface ClientInvoice {
  id: string;
  clientId: string;
  projectId?: string;
  amount: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  issueDate: string;
  dueDate: string;
  paidDate?: string;
  description: string;
  items: InvoiceItem[];
  paymentMethod?: string;
}

export interface CommunicationLog {
  id: string;
  clientId: string;
  projectId?: string;
  type: 'email' | 'call' | 'meeting' | 'message';
  subject: string;
  content: string;
  from: string;
  to: string[];
  date: string;
  attachments?: string[];
  priority: 'low' | 'medium' | 'high';
}

export interface SharedDocument {
  id: string;
  clientId: string;
  projectId?: string;
  name: string;
  type: 'contract' | 'proposal' | 'report' | 'deliverable' | 'other';
  url: string;
  uploadDate: string;
  size: string;
  uploadedBy: string;
  description?: string;
  version: string;
}