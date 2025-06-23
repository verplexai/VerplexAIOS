/*
  # Initial Verplex Database Schema

  1. New Tables
    - `profiles` - User profiles extending Supabase auth
    - `clients` - Client companies and contacts
    - `projects` - Client projects and work
    - `project_milestones` - Project milestone tracking
    - `services` - Service catalog
    - `service_templates` - Service templates and SOPs
    - `contracts` - Legal contracts and agreements
    - `invoices` - Client invoicing
    - `invoice_items` - Invoice line items
    - `communications` - Communication logs
    - `documents` - Shared documents
    - `tasks` - Task management
    - `expenses` - Company expenses
    - `knowledge_base` - Internal wiki articles
    - `integrations` - Third-party integrations
    - `analytics_kpis` - Key performance indicators

  2. Security
    - Enable RLS on all tables
    - Add policies for role-based access
*/

-- Create enum types
CREATE TYPE user_role AS ENUM ('founder', 'team', 'contractor', 'client');
CREATE TYPE access_level AS ENUM ('none', 'view', 'edit', 'full');
CREATE TYPE project_status AS ENUM ('planning', 'in-progress', 'review', 'completed', 'on-hold');
CREATE TYPE milestone_status AS ENUM ('pending', 'in-progress', 'completed', 'overdue');
CREATE TYPE contract_type AS ENUM ('nda', 'msa', 'sow', 'dpa', 'ip_transfer', 'terms_conditions');
CREATE TYPE contract_status AS ENUM ('draft', 'sent', 'signed', 'expired', 'cancelled');
CREATE TYPE invoice_status AS ENUM ('draft', 'sent', 'paid', 'overdue', 'cancelled');
CREATE TYPE task_status AS ENUM ('todo', 'in-progress', 'review', 'completed');
CREATE TYPE task_priority AS ENUM ('low', 'medium', 'high', 'critical');
CREATE TYPE communication_type AS ENUM ('email', 'call', 'meeting', 'message');
CREATE TYPE document_type AS ENUM ('contract', 'proposal', 'report', 'deliverable', 'other');
CREATE TYPE service_category AS ENUM ('nlp', 'dashboards', 'automation', 'custom');

-- Profiles table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  role user_role NOT NULL DEFAULT 'team',
  avatar_url text,
  client_id uuid REFERENCES clients(id),
  company text,
  phone text,
  timezone text DEFAULT 'UTC',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Clients table
CREATE TABLE IF NOT EXISTS clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  company text NOT NULL,
  email text NOT NULL,
  phone text,
  website text,
  address text,
  stage text NOT NULL DEFAULT 'lead',
  status text NOT NULL DEFAULT 'active',
  value numeric DEFAULT 0,
  assigned_to uuid REFERENCES profiles(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  last_contact timestamptz
);

-- Services table
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  category service_category NOT NULL,
  base_price numeric DEFAULT 0,
  estimated_hours integer DEFAULT 0,
  status text NOT NULL DEFAULT 'active',
  tags text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Service templates table
CREATE TABLE IF NOT EXISTS service_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id uuid REFERENCES services(id) ON DELETE CASCADE,
  name text NOT NULL,
  type text NOT NULL,
  content text,
  variables text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  status project_status NOT NULL DEFAULT 'planning',
  progress integer DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  start_date date,
  due_date date,
  completed_date date,
  budget numeric DEFAULT 0,
  spent numeric DEFAULT 0,
  assigned_team uuid[] DEFAULT '{}',
  services text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Project milestones table
CREATE TABLE IF NOT EXISTS project_milestones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  due_date date NOT NULL,
  status milestone_status NOT NULL DEFAULT 'pending',
  completed_date date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Contracts table
CREATE TABLE IF NOT EXISTS contracts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  contract_number text NOT NULL UNIQUE,
  type contract_type NOT NULL,
  status contract_status NOT NULL DEFAULT 'draft',
  title text NOT NULL,
  value numeric,
  signed_date date,
  expiry_date date,
  auto_renewal boolean DEFAULT false,
  documents text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Invoices table
CREATE TABLE IF NOT EXISTS invoices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  project_id uuid REFERENCES projects(id),
  invoice_number text NOT NULL UNIQUE,
  status invoice_status NOT NULL DEFAULT 'draft',
  amount numeric NOT NULL DEFAULT 0,
  issue_date date NOT NULL DEFAULT CURRENT_DATE,
  due_date date NOT NULL,
  paid_date date,
  payment_method text,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Invoice items table
CREATE TABLE IF NOT EXISTS invoice_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id uuid NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
  description text NOT NULL,
  quantity numeric NOT NULL DEFAULT 1,
  rate numeric NOT NULL DEFAULT 0,
  amount numeric NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Communications table
CREATE TABLE IF NOT EXISTS communications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  project_id uuid REFERENCES projects(id),
  type communication_type NOT NULL,
  subject text NOT NULL,
  content text,
  from_user uuid REFERENCES profiles(id),
  to_emails text[] DEFAULT '{}',
  priority text DEFAULT 'medium',
  attachments text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Documents table
CREATE TABLE IF NOT EXISTS documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES clients(id),
  project_id uuid REFERENCES projects(id),
  name text NOT NULL,
  type document_type NOT NULL,
  file_url text NOT NULL,
  file_size text,
  uploaded_by uuid REFERENCES profiles(id),
  description text,
  version text DEFAULT 'v1.0',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  status task_status NOT NULL DEFAULT 'todo',
  priority task_priority NOT NULL DEFAULT 'medium',
  assigned_to uuid REFERENCES profiles(id),
  client_id uuid REFERENCES clients(id),
  project_id uuid REFERENCES projects(id),
  due_date date,
  progress integer DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  tags text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Expenses table
CREATE TABLE IF NOT EXISTS expenses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  description text NOT NULL,
  amount numeric NOT NULL,
  category text NOT NULL,
  vendor text,
  expense_date date NOT NULL DEFAULT CURRENT_DATE,
  recurring boolean DEFAULT false,
  created_by uuid REFERENCES profiles(id),
  created_at timestamptz DEFAULT now()
);

-- Knowledge base table
CREATE TABLE IF NOT EXISTS knowledge_base (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text,
  category text NOT NULL,
  type text NOT NULL DEFAULT 'article',
  author uuid REFERENCES profiles(id),
  tags text[] DEFAULT '{}',
  views integer DEFAULT 0,
  likes integer DEFAULT 0,
  read_time text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Integrations table
CREATE TABLE IF NOT EXISTS integrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  status text NOT NULL DEFAULT 'disconnected',
  config jsonb DEFAULT '{}',
  last_sync timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Analytics KPIs table
CREATE TABLE IF NOT EXISTS analytics_kpis (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  value numeric NOT NULL,
  target numeric,
  period text NOT NULL,
  trend text,
  change_percentage numeric,
  date date NOT NULL DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoice_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE communications ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_base ENABLE ROW LEVEL SECURITY;
ALTER TABLE integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_kpis ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Founders can view all profiles" ON profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'founder'
    )
  );

-- Clients policies
CREATE POLICY "Authenticated users can view clients" ON clients
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Team members can manage clients" ON clients
  FOR ALL TO authenticated USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role IN ('founder', 'team')
    )
  );

CREATE POLICY "Clients can view own data" ON clients
  FOR SELECT TO authenticated USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND client_id = clients.id
    )
  );

-- Projects policies
CREATE POLICY "Authenticated users can view projects" ON projects
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Team members can manage projects" ON projects
  FOR ALL TO authenticated USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role IN ('founder', 'team', 'contractor')
    )
  );

CREATE POLICY "Clients can view own projects" ON projects
  FOR SELECT TO authenticated USING (
    EXISTS (
      SELECT 1 FROM profiles p
      JOIN clients c ON p.client_id = c.id
      WHERE p.id = auth.uid() AND c.id = projects.client_id
    )
  );

-- Similar policies for other tables...
CREATE POLICY "Authenticated users can view services" ON services
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Team members can manage services" ON services
  FOR ALL TO authenticated USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role IN ('founder', 'team')
    )
  );

-- Add indexes for performance
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_clients_status ON clients(status);
CREATE INDEX idx_projects_client_id ON projects(client_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_invoices_client_id ON invoices(client_id);
CREATE INDEX idx_invoices_status ON invoices(status);
CREATE INDEX idx_tasks_assigned_to ON tasks(assigned_to);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_communications_client_id ON communications(client_id);
CREATE INDEX idx_documents_client_id ON documents(client_id);

-- Functions for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON clients
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();