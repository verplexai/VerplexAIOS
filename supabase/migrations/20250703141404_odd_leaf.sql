/*
  # Insert Demo Data for Verplex Digital Operating System

  This migration inserts comprehensive demo data including:
  1. Demo user profiles
  2. Organizations and relationships
  3. File categories
  4. Sample projects and tasks
  5. Services catalog
  6. Knowledge base articles
  7. Sample financial records
  8. Legal documents
*/

-- Insert file categories first
INSERT INTO file_categories (id, name, description, module, allowed_file_types, max_file_size_mb, icon, color) VALUES
  ('cat-contracts', 'Contracts & Legal', 'Legal documents, contracts, NDAs', 'legal', ARRAY['pdf', 'doc', 'docx'], 50, 'FileText', '#dc2626'),
  ('cat-proposals', 'Proposals', 'Project proposals and quotes', 'services', ARRAY['pdf', 'doc', 'docx', 'ppt', 'pptx'], 25, 'FileText', '#2563eb'),
  ('cat-deliverables', 'Deliverables', 'Project deliverables and outputs', 'projects', ARRAY['pdf', 'zip', 'doc', 'docx', 'ppt', 'pptx'], 100, 'Package', '#059669'),
  ('cat-invoices', 'Invoices & Finance', 'Financial documents and invoices', 'finance', ARRAY['pdf', 'xlsx', 'csv'], 10, 'DollarSign', '#7c2d12'),
  ('cat-assets', 'Brand Assets', 'Logos, brand guidelines, marketing materials', 'brand', ARRAY['png', 'jpg', 'jpeg', 'svg', 'pdf'], 50, 'Palette', '#7c3aed'),
  ('cat-docs', 'Documentation', 'Technical documentation and guides', 'wiki', ARRAY['pdf', 'doc', 'docx', 'md'], 25, 'BookOpen', '#0891b2')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  allowed_file_types = EXCLUDED.allowed_file_types,
  max_file_size_mb = EXCLUDED.max_file_size_mb;

-- Insert demo organizations
INSERT INTO organizations (id, name, slug, description, logo_url, website, industry, size_category, contact_info) VALUES
  (
    '00000000-0000-0000-0000-000000000000',
    'Verplex Technologies',
    'verplex',
    'AI-powered digital operating system for modern businesses',
    'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    'https://verplex.ai',
    'Technology',
    'startup',
    '{"email": "hello@verplex.ai", "phone": "+1 (555) 123-4567", "address": "123 Innovation Drive, San Francisco, CA 94105"}'
  ),
  (
    'client-techcorp-0000-0000-000000000001',
    'TechCorp Solutions',
    'techcorp',
    'Enterprise software solutions company',
    'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    'https://techcorp.example.com',
    'Software',
    'enterprise',
    '{"email": "contact@techcorp.com", "phone": "+1 (555) 987-6543"}'
  ),
  (
    'client-dataflow-0000-0000-000000000002',
    'DataFlow Inc',
    'dataflow',
    'Data analytics and business intelligence',
    'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    'https://dataflow.example.com',
    'Analytics',
    'medium',
    '{"email": "hello@dataflow.com", "phone": "+1 (555) 456-7890"}'
  )
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  website = EXCLUDED.website,
  contact_info = EXCLUDED.contact_info;

-- Insert demo user profiles
INSERT INTO profiles (id, email, display_name, role, department, avatar_url, phone, timezone) VALUES
  (
    '11111111-1111-1111-1111-111111111111',
    'founder@verplex.ai',
    'Alex Chen',
    'admin',
    'Executive',
    'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    '+1 (555) 123-0001',
    'America/Los_Angeles'
  ),
  (
    '22222222-2222-2222-2222-222222222222',
    'team@verplex.ai',
    'Sarah Johnson',
    'manager',
    'Engineering',
    'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    '+1 (555) 123-0002',
    'America/Los_Angeles'
  ),
  (
    '33333333-3333-3333-3333-333333333333',
    'contractor@verplex.ai',
    'Mike Rodriguez',
    'user',
    'Design',
    'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    '+1 (555) 123-0003',
    'America/New_York'
  ),
  (
    '44444444-4444-4444-4444-444444444444',
    'john@techcorp.com',
    'John Smith',
    'client',
    'Product Management',
    'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    '+1 (555) 987-0001',
    'America/New_York'
  ),
  (
    '55555555-5555-5555-5555-555555555555',
    'emma@dataflow.com',
    'Emma Wilson',
    'client',
    'Data Science',
    'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    '+1 (555) 456-0001',
    'America/Chicago'
  )
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  display_name = EXCLUDED.display_name,
  role = EXCLUDED.role,
  department = EXCLUDED.department,
  avatar_url = EXCLUDED.avatar_url,
  phone = EXCLUDED.phone,
  timezone = EXCLUDED.timezone;

-- Link users to organizations
INSERT INTO user_organizations (user_id, organization_id, role, permissions) VALUES
  ('11111111-1111-1111-1111-111111111111', '00000000-0000-0000-0000-000000000000', 'owner', '{"all": true}'),
  ('22222222-2222-2222-2222-222222222222', '00000000-0000-0000-0000-000000000000', 'admin', '{"projects": true, "tasks": true, "files": true}'),
  ('33333333-3333-3333-3333-333333333333', '00000000-0000-0000-0000-000000000000', 'member', '{"tasks": true, "files": true}'),
  ('44444444-4444-4444-4444-444444444444', 'client-techcorp-0000-0000-000000000001', 'owner', '{"all": true}'),
  ('55555555-5555-5555-5555-555555555555', 'client-dataflow-0000-0000-000000000002', 'owner', '{"all": true}')
ON CONFLICT (user_id, organization_id) DO UPDATE SET
  role = EXCLUDED.role,
  permissions = EXCLUDED.permissions;

-- Insert demo services
INSERT INTO services (id, name, description, category, price_type, base_price, currency, estimated_duration_hours, requirements, deliverables, tags, is_active) VALUES
  (
    'svc-nlp-analysis',
    'NLP Analysis & Implementation',
    'Custom natural language processing solutions for text analysis, sentiment analysis, and content understanding',
    'AI/ML',
    'fixed',
    15000.00,
    'USD',
    120,
    '["Text data access", "API requirements", "Performance targets"]',
    '["Trained NLP models", "API endpoints", "Documentation", "Performance report"]',
    ARRAY['nlp', 'ai', 'machine-learning', 'text-analysis'],
    true
  ),
  (
    'svc-dashboard-dev',
    'Custom Dashboard Development',
    'Interactive data visualization dashboards with real-time analytics and custom reporting',
    'Development',
    'fixed',
    12000.00,
    'USD',
    80,
    '["Data sources", "Design requirements", "User access needs"]',
    '["Interactive dashboard", "User documentation", "Training session"]',
    ARRAY['dashboard', 'visualization', 'analytics', 'reporting'],
    true
  ),
  (
    'svc-automation',
    'Business Process Automation',
    'End-to-end automation solutions using Zapier, Make, and custom integrations',
    'Automation',
    'fixed',
    8000.00,
    'USD',
    60,
    '["Current process documentation", "Tool access", "Integration requirements"]',
    '["Automated workflows", "Process documentation", "Training materials"]',
    ARRAY['automation', 'zapier', 'integration', 'workflow'],
    true
  ),
  (
    'svc-ai-training',
    'AI Model Training & Deployment',
    'Custom machine learning model development, training, and cloud deployment',
    'AI/ML',
    'custom',
    25000.00,
    'USD',
    200,
    '["Training data", "Model requirements", "Deployment environment"]',
    '["Trained models", "Deployment pipeline", "Monitoring dashboard", "Documentation"]',
    ARRAY['ai', 'machine-learning', 'deployment', 'cloud'],
    true
  )
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  base_price = EXCLUDED.base_price,
  estimated_duration_hours = EXCLUDED.estimated_duration_hours;

-- Insert demo projects
INSERT INTO projects (id, name, description, status, priority, organization_id, project_manager_id, client_id, start_date, end_date, budget, progress_percentage, tags, created_by) VALUES
  (
    'proj-techcorp-nlp',
    'Customer Sentiment Analysis System',
    'Advanced NLP system for analyzing customer feedback and sentiment across multiple channels including social media, reviews, and support tickets',
    'active',
    'high',
    '00000000-0000-0000-0000-000000000000',
    '22222222-2222-2222-2222-222222222222',
    '44444444-4444-4444-4444-444444444444',
    '2023-12-01',
    '2024-02-15',
    45000.00,
    75,
    ARRAY['nlp', 'sentiment-analysis', 'customer-feedback'],
    '11111111-1111-1111-1111-111111111111'
  ),
  (
    'proj-dataflow-pipeline',
    'Real-time Analytics Pipeline',
    'ML-powered analytics pipeline for real-time data processing and insights with automated reporting and alerting',
    'active',
    'high',
    '00000000-0000-0000-0000-000000000000',
    '22222222-2222-2222-2222-222222222222',
    '55555555-5555-5555-5555-555555555555',
    '2023-11-15',
    '2024-03-01',
    60000.00,
    60,
    ARRAY['analytics', 'pipeline', 'real-time', 'ml'],
    '11111111-1111-1111-1111-111111111111'
  ),
  (
    'proj-internal-wiki',
    'Internal Knowledge Base',
    'Comprehensive internal wiki and knowledge management system for team documentation and processes',
    'planning',
    'medium',
    '00000000-0000-0000-0000-000000000000',
    '22222222-2222-2222-2222-222222222222',
    NULL,
    '2024-02-01',
    '2024-04-01',
    15000.00,
    10,
    ARRAY['internal', 'documentation', 'knowledge-base'],
    '11111111-1111-1111-1111-111111111111'
  )
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  status = EXCLUDED.status,
  progress_percentage = EXCLUDED.progress_percentage;

-- Insert demo tasks
INSERT INTO tasks (id, title, description, status, priority, project_id, assigned_to, created_by, due_date, estimated_hours, progress_percentage, tags) VALUES
  (
    'task-nlp-data-collection',
    'Data Collection & Preprocessing',
    'Gather and clean customer feedback data from multiple sources',
    'completed',
    'high',
    'proj-techcorp-nlp',
    '22222222-2222-2222-2222-222222222222',
    '11111111-1111-1111-1111-111111111111',
    '2023-12-15',
    40,
    100,
    ARRAY['data', 'preprocessing', 'nlp']
  ),
  (
    'task-nlp-model-training',
    'Model Training & Validation',
    'Train and validate sentiment analysis models using collected data',
    'completed',
    'high',
    'proj-techcorp-nlp',
    '22222222-2222-2222-2222-222222222222',
    '11111111-1111-1111-1111-111111111111',
    '2024-01-15',
    50,
    100,
    ARRAY['training', 'validation', 'ml']
  ),
  (
    'task-nlp-dashboard',
    'Dashboard Development',
    'Build interactive dashboard for sentiment insights and reporting',
    'in_progress',
    'medium',
    'proj-techcorp-nlp',
    '33333333-3333-3333-3333-333333333333',
    '11111111-1111-1111-1111-111111111111',
    '2024-02-01',
    30,
    60,
    ARRAY['dashboard', 'frontend', 'visualization']
  ),
  (
    'task-pipeline-architecture',
    'Pipeline Architecture Design',
    'Design scalable architecture for real-time data processing',
    'completed',
    'high',
    'proj-dataflow-pipeline',
    '22222222-2222-2222-2222-222222222222',
    '11111111-1111-1111-1111-111111111111',
    '2023-12-01',
    35,
    100,
    ARRAY['architecture', 'design', 'pipeline']
  ),
  (
    'task-pipeline-implementation',
    'Data Pipeline Implementation',
    'Build core data processing pipeline with ML integration',
    'in_progress',
    'high',
    'proj-dataflow-pipeline',
    '22222222-2222-2222-2222-222222222222',
    '11111111-1111-1111-1111-111111111111',
    '2024-02-15',
    80,
    70,
    ARRAY['implementation', 'pipeline', 'ml']
  )
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  status = EXCLUDED.status,
  progress_percentage = EXCLUDED.progress_percentage;

-- Insert demo financial records
INSERT INTO financial_records (id, record_type, project_id, organization_id, amount, currency, description, status, due_date, paid_date, payment_method, reference_number, line_items) VALUES
  (
    'inv-techcorp-001',
    'invoice',
    'proj-techcorp-nlp',
    '00000000-0000-0000-0000-000000000000',
    15000.00,
    'USD',
    'NLP Model Development - Milestone 1 & 2',
    'paid',
    '2024-01-31',
    '2024-01-25',
    'ACH Transfer',
    'INV-001',
    '[{"description": "Data Collection & Preprocessing", "quantity": 1, "rate": 8000, "amount": 8000}, {"description": "Model Training & Validation", "quantity": 1, "rate": 7000, "amount": 7000}]'
  ),
  (
    'inv-techcorp-002',
    'invoice',
    'proj-techcorp-nlp',
    '00000000-0000-0000-0000-000000000000',
    18750.00,
    'USD',
    'Dashboard Development - Milestone 3',
    'sent',
    '2024-02-14',
    NULL,
    NULL,
    'INV-002',
    '[{"description": "Dashboard Development", "quantity": 1, "rate": 18750, "amount": 18750}]'
  ),
  (
    'inv-dataflow-001',
    'invoice',
    'proj-dataflow-pipeline',
    '00000000-0000-0000-0000-000000000000',
    20000.00,
    'USD',
    'Pipeline Architecture & Initial Development',
    'paid',
    '2023-12-31',
    '2023-12-28',
    'Wire Transfer',
    'INV-003',
    '[{"description": "Architecture Design", "quantity": 1, "rate": 8000, "amount": 8000}, {"description": "Data Pipeline Implementation", "quantity": 1, "rate": 12000, "amount": 12000}]'
  ),
  (
    'exp-software-001',
    'expense',
    NULL,
    '00000000-0000-0000-0000-000000000000',
    450.00,
    'USD',
    'OpenAI API Credits - Monthly',
    'paid',
    '2024-01-15',
    '2024-01-15',
    'Credit Card',
    'EXP-001',
    '[{"description": "OpenAI API Usage", "quantity": 1, "rate": 450, "amount": 450}]'
  ),
  (
    'exp-infrastructure-001',
    'expense',
    NULL,
    '00000000-0000-0000-0000-000000000000',
    280.00,
    'USD',
    'AWS Services - Monthly',
    'paid',
    '2024-01-15',
    '2024-01-15',
    'Credit Card',
    'EXP-002',
    '[{"description": "AWS EC2, S3, RDS", "quantity": 1, "rate": 280, "amount": 280}]'
  )
ON CONFLICT (id) DO UPDATE SET
  amount = EXCLUDED.amount,
  description = EXCLUDED.description,
  status = EXCLUDED.status;

-- Insert demo legal documents
INSERT INTO legal_documents (id, title, document_type, organization_id, project_id, status, effective_date, expiration_date, auto_renewal, created_by) VALUES
  (
    'legal-techcorp-nda',
    'TechCorp Solutions - Mutual NDA',
    'NDA',
    '00000000-0000-0000-0000-000000000000',
    'proj-techcorp-nlp',
    'signed',
    '2023-11-20',
    '2024-11-20',
    false,
    '11111111-1111-1111-1111-111111111111'
  ),
  (
    'legal-techcorp-msa',
    'TechCorp Solutions - Master Service Agreement',
    'MSA',
    '00000000-0000-0000-0000-000000000000',
    'proj-techcorp-nlp',
    'signed',
    '2023-12-01',
    '2024-12-01',
    true,
    '11111111-1111-1111-1111-111111111111'
  ),
  (
    'legal-dataflow-dpa',
    'DataFlow Inc - Data Processing Agreement',
    'DPA',
    '00000000-0000-0000-0000-000000000000',
    'proj-dataflow-pipeline',
    'signed',
    '2023-11-15',
    '2024-11-15',
    true,
    '11111111-1111-1111-1111-111111111111'
  )
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  status = EXCLUDED.status,
  effective_date = EXCLUDED.effective_date;

-- Insert demo knowledge articles
INSERT INTO knowledge_articles (id, title, content, excerpt, category, tags, status, is_public, author_id, organization_id) VALUES
  (
    'kb-nlp-getting-started',
    'Getting Started with NLP Projects',
    'This comprehensive guide covers the essential steps for starting NLP projects at Verplex. We begin with data collection strategies, move through preprocessing techniques, and cover model selection and training best practices. Key considerations include data quality, annotation guidelines, and performance metrics.',
    'Essential guide for starting NLP projects including data collection, preprocessing, and model training',
    'AI/ML',
    ARRAY['nlp', 'getting-started', 'ai', 'machine-learning'],
    'published',
    false,
    '22222222-2222-2222-2222-222222222222',
    '00000000-0000-0000-0000-000000000000'
  ),
  (
    'kb-dashboard-design',
    'Dashboard Design Best Practices',
    'Learn how to create effective dashboards that provide actionable insights. This guide covers user experience principles, data visualization best practices, color theory, and responsive design considerations. Includes examples from successful client projects and common pitfalls to avoid.',
    'Comprehensive guide to creating effective dashboards with great UX and data visualization',
    'Design',
    ARRAY['dashboard', 'design', 'ux', 'visualization'],
    'published',
    false,
    '33333333-3333-3333-3333-333333333333',
    '00000000-0000-0000-0000-000000000000'
  ),
  (
    'kb-client-communication',
    'Client Communication Templates',
    'Collection of email templates and communication guidelines for different stages of client projects. Includes project kickoff emails, status update formats, milestone completion notifications, and issue escalation procedures.',
    'Email templates and communication guidelines for client project management',
    'Communication',
    ARRAY['communication', 'templates', 'client', 'project-management'],
    'published',
    false,
    '11111111-1111-1111-1111-111111111111',
    '00000000-0000-0000-0000-000000000000'
  )
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  excerpt = EXCLUDED.excerpt,
  status = EXCLUDED.status;

-- Insert demo notifications
INSERT INTO notifications (user_id, title, message, type, category, entity_type, entity_id, is_read) VALUES
  (
    '11111111-1111-1111-1111-111111111111',
    'New Invoice Payment Received',
    'Payment of $15,000 received from TechCorp Solutions for Invoice INV-001',
    'success',
    'finance',
    'financial_records',
    'inv-techcorp-001',
    false
  ),
  (
    '22222222-2222-2222-2222-222222222222',
    'Task Completed',
    'Model Training & Validation task has been marked as completed',
    'success',
    'projects',
    'tasks',
    'task-nlp-model-training',
    false
  ),
  (
    '11111111-1111-1111-1111-111111111111',
    'Contract Expiring Soon',
    'TechCorp Solutions MSA expires in 30 days - renewal required',
    'warning',
    'legal',
    'legal_documents',
    'legal-techcorp-msa',
    false
  ),
  (
    '33333333-3333-3333-3333-333333333333',
    'New Task Assigned',
    'You have been assigned to work on Dashboard Development for TechCorp project',
    'info',
    'projects',
    'tasks',
    'task-nlp-dashboard',
    true
  )
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  message = EXCLUDED.message,
  is_read = EXCLUDED.is_read;

-- Insert demo client portals
INSERT INTO client_portals (id, project_id, client_id, portal_name, description, is_active, allowed_features, created_by) VALUES
  (
    'portal-techcorp',
    'proj-techcorp-nlp',
    '44444444-4444-4444-4444-444444444444',
    'TechCorp Project Portal',
    'Dedicated portal for TechCorp Solutions NLP project with real-time progress tracking',
    true,
    ARRAY['projects', 'tasks', 'files', 'invoices', 'communications'],
    '11111111-1111-1111-1111-111111111111'
  ),
  (
    'portal-dataflow',
    'proj-dataflow-pipeline',
    '55555555-5555-5555-5555-555555555555',
    'DataFlow Analytics Portal',
    'Client portal for DataFlow Inc analytics pipeline project',
    true,
    ARRAY['projects', 'tasks', 'files', 'invoices'],
    '11111111-1111-1111-1111-111111111111'
  )
ON CONFLICT (id) DO UPDATE SET
  portal_name = EXCLUDED.portal_name,
  description = EXCLUDED.description,
  is_active = EXCLUDED.is_active;