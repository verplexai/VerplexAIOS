/*
  # Complete Verplex Database Schema

  1. New Tables
    - `profiles` - User profiles with role-based access
    - `organizations` - Company/organization management
    - `user_organizations` - User-organization relationships
    - `projects` - Project management and tracking
    - `tasks` - Task assignment and tracking
    - `files` - File storage and management
    - `file_categories` - File categorization system
    - `file_permissions` - File access control
    - `client_portals` - Client portal management
    - `legal_documents` - Legal document tracking
    - `financial_records` - Financial and invoice management
    - `services` - Service catalog
    - `knowledge_articles` - Knowledge base articles
    - `activity_logs` - System activity tracking
    - `notifications` - User notifications

  2. Security
    - Enable RLS on all tables
    - Role-based access policies
    - Activity logging triggers
    - Automatic timestamp updates

  3. Functions
    - Helper functions for user context
    - Activity logging system
    - User registration handling
*/

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing policies if they exist to avoid conflicts
DO $$ 
BEGIN
  -- Drop policies for profiles
  DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
  DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
  
  -- Drop policies for organizations
  DROP POLICY IF EXISTS "Users can view organizations they belong to" ON organizations;
  DROP POLICY IF EXISTS "Organization admins can update organizations" ON organizations;
  
  -- Drop policies for projects
  DROP POLICY IF EXISTS "Users can view projects in their organizations" ON projects;
  DROP POLICY IF EXISTS "Users can create projects in their organizations" ON projects;
  DROP POLICY IF EXISTS "Project managers can update their projects" ON projects;
  
  -- Drop policies for tasks
  DROP POLICY IF EXISTS "Users can view tasks in accessible projects" ON tasks;
  DROP POLICY IF EXISTS "Users can create tasks in accessible projects" ON tasks;
  
  -- Drop policies for files
  DROP POLICY IF EXISTS "Users can view accessible files" ON files;
  DROP POLICY IF EXISTS "Users can upload files" ON files;
  DROP POLICY IF EXISTS "Users can update own files or with permissions" ON files;
  
  -- Drop policies for notifications
  DROP POLICY IF EXISTS "Users can view own notifications" ON notifications;
  DROP POLICY IF EXISTS "Users can update own notifications" ON notifications;
EXCEPTION
  WHEN undefined_table THEN
    NULL; -- Table doesn't exist yet, continue
  WHEN undefined_object THEN
    NULL; -- Policy doesn't exist, continue
END $$;

-- Helper function to get current user ID
CREATE OR REPLACE FUNCTION uid() RETURNS uuid AS $$
  SELECT auth.uid();
$$ LANGUAGE sql SECURITY DEFINER;

-- Helper function to get user role
CREATE OR REPLACE FUNCTION get_user_role() RETURNS text AS $$
  SELECT role FROM profiles WHERE id = uid();
$$ LANGUAGE sql SECURITY DEFINER;

-- Helper function to check organization access
CREATE OR REPLACE FUNCTION user_has_org_access(org_id uuid) RETURNS boolean AS $$
  SELECT EXISTS (
    SELECT 1 FROM user_organizations 
    WHERE user_id = uid() AND organization_id = org_id
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to log activity
CREATE OR REPLACE FUNCTION log_activity()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO activity_logs (entity_type, entity_id, action, user_id, changes)
  VALUES (
    TG_TABLE_NAME,
    COALESCE(NEW.id, OLD.id),
    TG_OP,
    uid(),
    CASE 
      WHEN TG_OP = 'DELETE' THEN to_jsonb(OLD)
      WHEN TG_OP = 'UPDATE' THEN jsonb_build_object('old', to_jsonb(OLD), 'new', to_jsonb(NEW))
      ELSE to_jsonb(NEW)
    END
  );
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  display_name text,
  avatar_url text,
  role text DEFAULT 'user' CHECK (role IN ('admin', 'manager', 'user', 'client')),
  department text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Organizations table
CREATE TABLE IF NOT EXISTS organizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  logo_url text,
  website text,
  industry text,
  size_category text CHECK (size_category IN ('startup', 'small', 'medium', 'large', 'enterprise')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;

-- User organizations relationship
CREATE TABLE IF NOT EXISTS user_organizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  organization_id uuid REFERENCES organizations(id) ON DELETE CASCADE,
  role text DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'manager', 'member')),
  joined_at timestamptz DEFAULT now(),
  UNIQUE(user_id, organization_id)
);

ALTER TABLE user_organizations ENABLE ROW LEVEL SECURITY;

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  status text DEFAULT 'active' CHECK (status IN ('planning', 'active', 'on_hold', 'completed', 'cancelled')),
  priority text DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  organization_id uuid REFERENCES organizations(id),
  project_manager_id uuid REFERENCES profiles(id),
  client_id uuid REFERENCES profiles(id),
  start_date date,
  end_date date,
  budget numeric(12,2),
  currency text DEFAULT 'USD',
  progress_percentage integer DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
  created_by uuid NOT NULL REFERENCES profiles(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  status text DEFAULT 'todo' CHECK (status IN ('todo', 'in_progress', 'review', 'done', 'cancelled')),
  priority text DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  assigned_to uuid REFERENCES profiles(id),
  created_by uuid NOT NULL REFERENCES profiles(id),
  due_date timestamptz,
  estimated_hours numeric(5,2),
  actual_hours numeric(5,2),
  progress_percentage integer DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- File categories table
CREATE TABLE IF NOT EXISTS file_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  description text,
  module text NOT NULL,
  allowed_file_types text[],
  max_file_size_mb integer DEFAULT 50,
  icon text,
  color text,
  created_at timestamptz DEFAULT now()
);

-- Files table
CREATE TABLE IF NOT EXISTS files (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  filename text NOT NULL,
  original_filename text NOT NULL,
  file_path text NOT NULL,
  file_size_bytes bigint NOT NULL,
  file_type text NOT NULL,
  file_extension text NOT NULL,
  category_id uuid REFERENCES file_categories(id),
  project_id uuid REFERENCES projects(id),
  organization_id uuid REFERENCES organizations(id),
  uploaded_by uuid NOT NULL REFERENCES profiles(id),
  upload_timestamp timestamptz DEFAULT now(),
  last_accessed timestamptz,
  access_count integer DEFAULT 0,
  is_public boolean DEFAULT false,
  storage_bucket text NOT NULL DEFAULT 'files',
  version integer DEFAULT 1,
  parent_file_id uuid REFERENCES files(id),
  metadata jsonb DEFAULT '{}',
  file_hash text,
  thumbnail_path text,
  processing_status text DEFAULT 'pending' CHECK (processing_status IN ('pending', 'processing', 'processed', 'error')),
  page_count integer,
  word_count integer,
  extracted_text text,
  duration_seconds integer,
  width integer,
  height integer,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  deleted_at timestamptz
);

ALTER TABLE files ENABLE ROW LEVEL SECURITY;

-- File permissions table
CREATE TABLE IF NOT EXISTS file_permissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  file_id uuid REFERENCES files(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id),
  organization_id uuid REFERENCES organizations(id),
  permission_type text NOT NULL CHECK (permission_type IN ('read', 'write', 'delete', 'share', 'admin')),
  granted_by uuid NOT NULL REFERENCES profiles(id),
  expires_at timestamptz,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE file_permissions ENABLE ROW LEVEL SECURITY;

-- Client portals table
CREATE TABLE IF NOT EXISTS client_portals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  client_id uuid NOT NULL REFERENCES profiles(id),
  portal_name text NOT NULL,
  description text,
  is_active boolean DEFAULT true,
  access_code text UNIQUE,
  custom_domain text,
  branding_config jsonb DEFAULT '{}',
  created_by uuid NOT NULL REFERENCES profiles(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE client_portals ENABLE ROW LEVEL SECURITY;

-- Legal documents table
CREATE TABLE IF NOT EXISTS legal_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  document_type text NOT NULL CHECK (document_type IN ('nda', 'msa', 'contract', 'agreement', 'policy', 'compliance')),
  file_id uuid REFERENCES files(id),
  organization_id uuid REFERENCES organizations(id),
  project_id uuid REFERENCES projects(id),
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'review', 'approved', 'signed', 'expired', 'terminated')),
  effective_date date,
  expiration_date date,
  signed_by jsonb DEFAULT '[]',
  created_by uuid NOT NULL REFERENCES profiles(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE legal_documents ENABLE ROW LEVEL SECURITY;

-- Financial records table
CREATE TABLE IF NOT EXISTS financial_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  record_type text NOT NULL CHECK (record_type IN ('invoice', 'payment', 'expense', 'budget', 'estimate')),
  project_id uuid REFERENCES projects(id),
  organization_id uuid REFERENCES organizations(id),
  amount numeric(12,2) NOT NULL,
  currency text DEFAULT 'USD',
  description text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'paid', 'overdue', 'cancelled')),
  due_date date,
  paid_date date,
  file_id uuid REFERENCES files(id),
  created_by uuid NOT NULL REFERENCES profiles(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE financial_records ENABLE ROW LEVEL SECURITY;

-- Services table
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  category text NOT NULL,
  price_type text DEFAULT 'fixed' CHECK (price_type IN ('fixed', 'hourly', 'monthly', 'custom')),
  base_price numeric(10,2),
  currency text DEFAULT 'USD',
  estimated_duration_hours integer,
  requirements jsonb DEFAULT '[]',
  deliverables jsonb DEFAULT '[]',
  is_active boolean DEFAULT true,
  created_by uuid NOT NULL REFERENCES profiles(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Knowledge articles table
CREATE TABLE IF NOT EXISTS knowledge_articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  excerpt text,
  category text NOT NULL,
  tags text[] DEFAULT '{}',
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  is_public boolean DEFAULT false,
  view_count integer DEFAULT 0,
  helpful_count integer DEFAULT 0,
  author_id uuid NOT NULL REFERENCES profiles(id),
  organization_id uuid REFERENCES organizations(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE knowledge_articles ENABLE ROW LEVEL SECURITY;

-- Activity logs table
CREATE TABLE IF NOT EXISTS activity_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type text NOT NULL,
  entity_id uuid NOT NULL,
  action text NOT NULL,
  user_id uuid REFERENCES profiles(id),
  ip_address inet,
  user_agent text,
  changes jsonb DEFAULT '{}',
  metadata jsonb DEFAULT '{}',
  timestamp timestamptz DEFAULT now()
);

ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  message text NOT NULL,
  type text DEFAULT 'info' CHECK (type IN ('info', 'success', 'warning', 'error')),
  category text NOT NULL,
  entity_type text,
  entity_id uuid,
  is_read boolean DEFAULT false,
  action_url text,
  expires_at timestamptz,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_user_organizations_user_id ON user_organizations(user_id);
CREATE INDEX IF NOT EXISTS idx_projects_organization_id ON projects(organization_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_tasks_project_id ON tasks(project_id);
CREATE INDEX IF NOT EXISTS idx_tasks_assigned_to ON tasks(assigned_to);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
CREATE INDEX IF NOT EXISTS idx_files_project_id ON files(project_id);
CREATE INDEX IF NOT EXISTS idx_files_organization_id ON files(organization_id);
CREATE INDEX IF NOT EXISTS idx_files_uploaded_by ON files(uploaded_by);
CREATE INDEX IF NOT EXISTS idx_files_category_id ON files(category_id);
CREATE INDEX IF NOT EXISTS idx_files_created_at ON files(created_at);
CREATE INDEX IF NOT EXISTS idx_files_file_type ON files(file_type);
CREATE INDEX IF NOT EXISTS idx_activity_logs_entity ON activity_logs(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_user_id ON activity_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);

-- RLS Policies (created after ensuring they don't exist)

-- Profiles policies
CREATE POLICY "profiles_select_own" ON profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON profiles FOR UPDATE TO authenticated USING (auth.uid() = id);

-- Organizations policies
CREATE POLICY "organizations_select_member" ON organizations FOR SELECT TO authenticated 
USING (id IN (SELECT organization_id FROM user_organizations WHERE user_id = uid()));

CREATE POLICY "organizations_update_admin" ON organizations FOR UPDATE TO authenticated 
USING (id IN (SELECT organization_id FROM user_organizations WHERE user_id = uid() AND role IN ('owner', 'admin')));

-- Projects policies
CREATE POLICY "projects_select_accessible" ON projects FOR SELECT TO authenticated 
USING (
  organization_id IN (SELECT organization_id FROM user_organizations WHERE user_id = uid()) OR
  project_manager_id = uid() OR
  client_id = uid()
);

CREATE POLICY "projects_insert_org_member" ON projects FOR INSERT TO authenticated 
WITH CHECK (user_has_org_access(organization_id) AND created_by = uid());

CREATE POLICY "projects_update_manager" ON projects FOR UPDATE TO authenticated 
USING (project_manager_id = uid() OR created_by = uid() OR get_user_role() = 'admin');

-- Tasks policies
CREATE POLICY "tasks_select_accessible" ON tasks FOR SELECT TO authenticated 
USING (
  project_id IN (
    SELECT id FROM projects WHERE 
    organization_id IN (SELECT organization_id FROM user_organizations WHERE user_id = uid()) OR
    project_manager_id = uid() OR
    client_id = uid()
  ) OR
  assigned_to = uid() OR
  created_by = uid()
);

CREATE POLICY "tasks_insert_project_member" ON tasks FOR INSERT TO authenticated 
WITH CHECK (
  project_id IN (
    SELECT id FROM projects WHERE 
    organization_id IN (SELECT organization_id FROM user_organizations WHERE user_id = uid()) OR
    project_manager_id = uid()
  ) AND
  created_by = uid()
);

-- Files policies
CREATE POLICY "files_select_accessible" ON files FOR SELECT TO authenticated 
USING (
  uploaded_by = uid() OR
  is_public = true OR
  organization_id IN (SELECT organization_id FROM user_organizations WHERE user_id = uid()) OR
  id IN (SELECT file_id FROM file_permissions WHERE user_id = uid() AND permission_type IN ('read', 'write', 'admin'))
);

CREATE POLICY "files_insert_uploader" ON files FOR INSERT TO authenticated 
WITH CHECK (uploaded_by = uid() AND (organization_id IS NULL OR user_has_org_access(organization_id)));

CREATE POLICY "files_update_owner_or_permitted" ON files FOR UPDATE TO authenticated 
USING (
  uploaded_by = uid() OR
  id IN (SELECT file_id FROM file_permissions WHERE user_id = uid() AND permission_type IN ('write', 'admin'))
);

-- Notifications policies
CREATE POLICY "notifications_select_own" ON notifications FOR SELECT TO authenticated USING (user_id = uid());
CREATE POLICY "notifications_update_own" ON notifications FOR UPDATE TO authenticated USING (user_id = uid());

-- Add triggers for updated_at timestamps
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_organizations_updated_at ON organizations;
CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON organizations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_tasks_updated_at ON tasks;
CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_files_updated_at ON files;
CREATE TRIGGER update_files_updated_at BEFORE UPDATE ON files FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Add triggers for activity logging
DROP TRIGGER IF EXISTS log_projects_activity ON projects;
CREATE TRIGGER log_projects_activity AFTER INSERT OR UPDATE OR DELETE ON projects FOR EACH ROW EXECUTE FUNCTION log_activity();

DROP TRIGGER IF EXISTS log_tasks_activity ON tasks;
CREATE TRIGGER log_tasks_activity AFTER INSERT OR UPDATE OR DELETE ON tasks FOR EACH ROW EXECUTE FUNCTION log_activity();

DROP TRIGGER IF EXISTS log_files_activity ON files;
CREATE TRIGGER log_files_activity AFTER INSERT OR UPDATE OR DELETE ON files FOR EACH ROW EXECUTE FUNCTION log_activity();

-- Insert default file categories
INSERT INTO file_categories (name, description, module, allowed_file_types, max_file_size_mb, icon, color) 
VALUES
('Documents', 'General documents and files', 'general', ARRAY['pdf', 'doc', 'docx', 'txt'], 50, 'FileText', '#3B82F6'),
('Images', 'Image files and graphics', 'general', ARRAY['jpg', 'jpeg', 'png', 'gif', 'svg'], 25, 'Image', '#10B981'),
('Legal', 'Legal documents and contracts', 'legal', ARRAY['pdf', 'doc', 'docx'], 100, 'Scale', '#EF4444'),
('Financial', 'Financial records and invoices', 'finance', ARRAY['pdf', 'xlsx', 'csv'], 50, 'DollarSign', '#F59E0B'),
('Project Files', 'Project-related documents', 'projects', ARRAY['pdf', 'doc', 'docx', 'xlsx', 'ppt', 'pptx'], 100, 'FolderOpen', '#8B5CF6')
ON CONFLICT (name) DO NOTHING;

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, display_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'display_name')
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user registration
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();