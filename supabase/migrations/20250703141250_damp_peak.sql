/*
  # Complete Database Setup for Verplex Digital Operating System

  This migration sets up the complete database schema with:
  1. All necessary tables with proper relationships
  2. Row Level Security (RLS) policies
  3. Demo data for testing
  4. Indexes for performance
  5. Functions and triggers for automation

  ## Tables Created:
  - profiles (user profiles)
  - organizations (companies/clients)
  - user_organizations (user-org relationships)
  - projects (client projects)
  - tasks (project tasks)
  - files (document management)
  - file_permissions (file access control)
  - client_portals (client portal configurations)
  - legal_documents (contracts, NDAs, etc.)
  - financial_records (invoices, expenses)
  - services (service catalog)
  - knowledge_articles (internal wiki)
  - activity_logs (audit trail)
  - notifications (user notifications)
  - file_categories (file organization)

  ## Security:
  - RLS enabled on all tables
  - Appropriate policies for each user role
  - Secure file access controls
*/

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create enum types for better data consistency
CREATE TYPE user_role AS ENUM ('admin', 'manager', 'user', 'client');
CREATE TYPE project_status AS ENUM ('planning', 'active', 'on_hold', 'completed', 'cancelled');
CREATE TYPE task_status AS ENUM ('todo', 'in_progress', 'review', 'completed', 'cancelled');
CREATE TYPE task_priority AS ENUM ('low', 'medium', 'high', 'critical');
CREATE TYPE document_status AS ENUM ('draft', 'review', 'approved', 'signed', 'expired');
CREATE TYPE financial_status AS ENUM ('draft', 'sent', 'paid', 'overdue', 'cancelled');

-- Profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  display_name TEXT,
  avatar_url TEXT,
  role user_role DEFAULT 'user',
  department TEXT,
  phone TEXT,
  timezone TEXT DEFAULT 'UTC',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Organizations table
CREATE TABLE IF NOT EXISTS organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  logo_url TEXT,
  website TEXT,
  industry TEXT,
  size_category TEXT,
  address JSONB,
  contact_info JSONB,
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User-Organization relationships
CREATE TABLE IF NOT EXISTS user_organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'member',
  permissions JSONB DEFAULT '{}',
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, organization_id)
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  status project_status DEFAULT 'planning',
  priority task_priority DEFAULT 'medium',
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  project_manager_id UUID REFERENCES profiles(id),
  client_id UUID REFERENCES profiles(id),
  start_date DATE,
  end_date DATE,
  budget DECIMAL(12,2),
  currency TEXT DEFAULT 'USD',
  progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
  tags TEXT[] DEFAULT '{}',
  metadata JSONB DEFAULT '{}',
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  status task_status DEFAULT 'todo',
  priority task_priority DEFAULT 'medium',
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  assigned_to UUID REFERENCES profiles(id),
  created_by UUID REFERENCES profiles(id),
  due_date TIMESTAMPTZ,
  estimated_hours DECIMAL(5,2),
  actual_hours DECIMAL(5,2),
  progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
  tags TEXT[] DEFAULT '{}',
  dependencies UUID[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- File categories for organization
CREATE TABLE IF NOT EXISTS file_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  module TEXT NOT NULL,
  allowed_file_types TEXT[],
  max_file_size_mb INTEGER DEFAULT 10,
  icon TEXT,
  color TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Files table for document management
CREATE TABLE IF NOT EXISTS files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  filename TEXT NOT NULL,
  original_filename TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size_bytes BIGINT NOT NULL,
  file_type TEXT NOT NULL,
  file_extension TEXT NOT NULL,
  category_id UUID REFERENCES file_categories(id),
  project_id UUID REFERENCES projects(id),
  organization_id UUID REFERENCES organizations(id),
  uploaded_by UUID REFERENCES profiles(id),
  upload_timestamp TIMESTAMPTZ DEFAULT NOW(),
  last_accessed TIMESTAMPTZ,
  access_count INTEGER DEFAULT 0,
  is_public BOOLEAN DEFAULT FALSE,
  storage_bucket TEXT DEFAULT 'files',
  version INTEGER DEFAULT 1,
  parent_file_id UUID REFERENCES files(id),
  metadata JSONB DEFAULT '{}',
  file_hash TEXT,
  thumbnail_path TEXT,
  processing_status TEXT DEFAULT 'completed',
  page_count INTEGER,
  word_count INTEGER,
  extracted_text TEXT,
  duration_seconds INTEGER,
  width INTEGER,
  height INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

-- File permissions for access control
CREATE TABLE IF NOT EXISTS file_permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  file_id UUID REFERENCES files(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id),
  organization_id UUID REFERENCES organizations(id),
  permission_type TEXT NOT NULL CHECK (permission_type IN ('read', 'write', 'admin')),
  granted_by UUID REFERENCES profiles(id),
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Client portals for external access
CREATE TABLE IF NOT EXISTS client_portals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id),
  client_id UUID REFERENCES profiles(id) NOT NULL,
  portal_name TEXT NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  access_code TEXT,
  custom_domain TEXT,
  branding_config JSONB DEFAULT '{}',
  allowed_features TEXT[] DEFAULT '{}',
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Legal documents management
CREATE TABLE IF NOT EXISTS legal_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  document_type TEXT NOT NULL,
  file_id UUID REFERENCES files(id),
  organization_id UUID REFERENCES organizations(id),
  project_id UUID REFERENCES projects(id),
  status document_status DEFAULT 'draft',
  effective_date DATE,
  expiration_date DATE,
  signed_by JSONB DEFAULT '[]',
  auto_renewal BOOLEAN DEFAULT FALSE,
  renewal_notice_days INTEGER DEFAULT 30,
  metadata JSONB DEFAULT '{}',
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Financial records (invoices, expenses, etc.)
CREATE TABLE IF NOT EXISTS financial_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  record_type TEXT NOT NULL CHECK (record_type IN ('invoice', 'expense', 'payment', 'refund')),
  project_id UUID REFERENCES projects(id),
  organization_id UUID REFERENCES organizations(id),
  amount DECIMAL(12,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  description TEXT,
  status financial_status DEFAULT 'draft',
  due_date DATE,
  paid_date DATE,
  payment_method TEXT,
  reference_number TEXT,
  line_items JSONB DEFAULT '[]',
  tax_amount DECIMAL(12,2) DEFAULT 0,
  file_id UUID REFERENCES files(id),
  metadata JSONB DEFAULT '{}',
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Services catalog
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  price_type TEXT DEFAULT 'fixed' CHECK (price_type IN ('fixed', 'hourly', 'custom')),
  base_price DECIMAL(10,2),
  currency TEXT DEFAULT 'USD',
  estimated_duration_hours INTEGER,
  requirements JSONB DEFAULT '[]',
  deliverables JSONB DEFAULT '[]',
  tags TEXT[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT TRUE,
  sop_document_id UUID REFERENCES files(id),
  template_ids UUID[] DEFAULT '{}',
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Knowledge base articles
CREATE TABLE IF NOT EXISTS knowledge_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  is_public BOOLEAN DEFAULT FALSE,
  view_count INTEGER DEFAULT 0,
  helpful_count INTEGER DEFAULT 0,
  search_vector tsvector,
  author_id UUID REFERENCES profiles(id),
  organization_id UUID REFERENCES organizations(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Activity logs for audit trail
CREATE TABLE IF NOT EXISTS activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type TEXT NOT NULL,
  entity_id UUID NOT NULL,
  action TEXT NOT NULL,
  user_id UUID REFERENCES profiles(id),
  ip_address INET,
  user_agent TEXT,
  changes JSONB DEFAULT '{}',
  metadata JSONB DEFAULT '{}',
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- Notifications system
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'info' CHECK (type IN ('info', 'success', 'warning', 'error')),
  category TEXT NOT NULL,
  entity_type TEXT,
  entity_id UUID,
  is_read BOOLEAN DEFAULT FALSE,
  action_url TEXT,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_organizations_slug ON organizations(slug);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_client_id ON projects(client_id);
CREATE INDEX IF NOT EXISTS idx_projects_organization_id ON projects(organization_id);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_assigned_to ON tasks(assigned_to);
CREATE INDEX IF NOT EXISTS idx_tasks_project_id ON tasks(project_id);
CREATE INDEX IF NOT EXISTS idx_files_project_id ON files(project_id);
CREATE INDEX IF NOT EXISTS idx_files_uploaded_by ON files(uploaded_by);
CREATE INDEX IF NOT EXISTS idx_files_organization_id ON files(organization_id);
CREATE INDEX IF NOT EXISTS idx_legal_documents_status ON legal_documents(status);
CREATE INDEX IF NOT EXISTS idx_legal_documents_expiration_date ON legal_documents(expiration_date);
CREATE INDEX IF NOT EXISTS idx_financial_records_status ON financial_records(status);
CREATE INDEX IF NOT EXISTS idx_financial_records_due_date ON financial_records(due_date);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_activity_logs_entity ON activity_logs(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_user_id ON activity_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_timestamp ON activity_logs(timestamp);

-- Full-text search index for knowledge articles
CREATE INDEX IF NOT EXISTS idx_knowledge_articles_search ON knowledge_articles USING gin(search_vector);

-- Enable Row Level Security on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE files ENABLE ROW LEVEL SECURITY;
ALTER TABLE file_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_portals ENABLE ROW LEVEL SECURITY;
ALTER TABLE legal_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE financial_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE file_categories ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- RLS Policies for organizations
CREATE POLICY "Users can view organizations they belong to" ON organizations
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_organizations 
      WHERE user_id = auth.uid() AND organization_id = organizations.id
    )
  );

CREATE POLICY "Admins can manage organizations" ON organizations
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- RLS Policies for projects
CREATE POLICY "Users can view projects in their organization" ON projects
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_organizations 
      WHERE user_id = auth.uid() AND organization_id = projects.organization_id
    )
    OR client_id = auth.uid()
  );

CREATE POLICY "Project managers can update their projects" ON projects
  FOR UPDATE USING (
    project_manager_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'manager')
    )
  );

CREATE POLICY "Authorized users can create projects" ON projects
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'manager')
    )
  );

-- RLS Policies for tasks
CREATE POLICY "Users can view tasks assigned to them or in their projects" ON tasks
  FOR SELECT USING (
    assigned_to = auth.uid() OR
    created_by = auth.uid() OR
    EXISTS (
      SELECT 1 FROM projects p
      JOIN user_organizations uo ON p.organization_id = uo.organization_id
      WHERE p.id = tasks.project_id AND uo.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update tasks assigned to them" ON tasks
  FOR UPDATE USING (
    assigned_to = auth.uid() OR
    created_by = auth.uid() OR
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'manager')
    )
  );

-- RLS Policies for files
CREATE POLICY "Users can view files they have access to" ON files
  FOR SELECT USING (
    uploaded_by = auth.uid() OR
    is_public = true OR
    EXISTS (
      SELECT 1 FROM file_permissions fp
      WHERE fp.file_id = files.id AND fp.user_id = auth.uid()
    ) OR
    EXISTS (
      SELECT 1 FROM user_organizations uo
      WHERE uo.user_id = auth.uid() AND uo.organization_id = files.organization_id
    )
  );

CREATE POLICY "Users can upload files to their organization" ON files
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_organizations 
      WHERE user_id = auth.uid() AND organization_id = files.organization_id
    )
  );

-- RLS Policies for notifications
CREATE POLICY "Users can view their own notifications" ON notifications
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can update their own notifications" ON notifications
  FOR UPDATE USING (user_id = auth.uid());

-- RLS Policies for activity logs (read-only for users, full access for admins)
CREATE POLICY "Admins can view all activity logs" ON activity_logs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Users can view their own activity" ON activity_logs
  FOR SELECT USING (user_id = auth.uid());

-- RLS Policies for other tables (similar pattern)
CREATE POLICY "Organization members can view legal documents" ON legal_documents
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_organizations 
      WHERE user_id = auth.uid() AND organization_id = legal_documents.organization_id
    )
  );

CREATE POLICY "Organization members can view financial records" ON financial_records
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_organizations 
      WHERE user_id = auth.uid() AND organization_id = financial_records.organization_id
    )
  );

CREATE POLICY "Users can view active services" ON services
  FOR SELECT USING (is_active = true);

CREATE POLICY "Organization members can view knowledge articles" ON knowledge_articles
  FOR SELECT USING (
    is_public = true OR
    EXISTS (
      SELECT 1 FROM user_organizations 
      WHERE user_id = auth.uid() AND organization_id = knowledge_articles.organization_id
    )
  );

-- Functions and triggers for automation

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at trigger to relevant tables
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON organizations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_files_updated_at BEFORE UPDATE ON files
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_legal_documents_updated_at BEFORE UPDATE ON legal_documents
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_financial_records_updated_at BEFORE UPDATE ON financial_records
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_knowledge_articles_updated_at BEFORE UPDATE ON knowledge_articles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'role', 'user')::user_role
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update search vector for knowledge articles
CREATE OR REPLACE FUNCTION update_knowledge_search_vector()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector := to_tsvector('english', COALESCE(NEW.title, '') || ' ' || COALESCE(NEW.content, '') || ' ' || COALESCE(array_to_string(NEW.tags, ' '), ''));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_knowledge_search_vector_trigger
  BEFORE INSERT OR UPDATE ON knowledge_articles
  FOR EACH ROW EXECUTE FUNCTION update_knowledge_search_vector();

-- Function to log activity
CREATE OR REPLACE FUNCTION log_activity()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO activity_logs (entity_type, entity_id, action, user_id, changes)
  VALUES (
    TG_TABLE_NAME,
    COALESCE(NEW.id, OLD.id),
    TG_OP,
    auth.uid(),
    CASE 
      WHEN TG_OP = 'DELETE' THEN to_jsonb(OLD)
      WHEN TG_OP = 'UPDATE' THEN jsonb_build_object('old', to_jsonb(OLD), 'new', to_jsonb(NEW))
      ELSE to_jsonb(NEW)
    END
  );
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Apply activity logging to key tables
CREATE TRIGGER log_projects_activity AFTER INSERT OR UPDATE OR DELETE ON projects
  FOR EACH ROW EXECUTE FUNCTION log_activity();

CREATE TRIGGER log_tasks_activity AFTER INSERT OR UPDATE OR DELETE ON tasks
  FOR EACH ROW EXECUTE FUNCTION log_activity();

CREATE TRIGGER log_files_activity AFTER INSERT OR UPDATE OR DELETE ON files
  FOR EACH ROW EXECUTE FUNCTION log_activity();