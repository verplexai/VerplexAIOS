// Core system types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'founder' | 'team' | 'contractor' | 'client';
  avatar?: string;
  permissions: Permission[];
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