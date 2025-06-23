/*
  # Seed Initial Data

  1. Insert sample services
  2. Insert sample clients
  3. Insert sample projects
  4. Insert sample invoices
  5. Insert sample tasks
*/

-- Insert sample services
INSERT INTO services (name, description, category, base_price, estimated_hours, tags) VALUES
('NLP Analysis & Implementation', 'Custom natural language processing solutions for text analysis, sentiment analysis, and content understanding', 'nlp', 15000, 120, ARRAY['nlp', 'ai', 'machine-learning', 'text-analysis']),
('Custom Dashboard Development', 'Interactive data visualization dashboards with real-time analytics and custom reporting', 'dashboards', 12000, 80, ARRAY['dashboard', 'visualization', 'analytics', 'reporting']),
('Business Process Automation', 'End-to-end automation solutions using Zapier, Make, and custom integrations', 'automation', 8000, 60, ARRAY['automation', 'zapier', 'integration', 'workflow']),
('AI Model Training & Deployment', 'Custom machine learning model development, training, and cloud deployment', 'custom', 25000, 200, ARRAY['ai', 'machine-learning', 'deployment', 'cloud']);

-- Insert sample clients
INSERT INTO clients (name, company, email, phone, stage, status, value) VALUES
('John Smith', 'TechCorp Solutions', 'john@techcorp.com', '+1 (555) 123-4567', 'active', 'active', 45000),
('Mike Chen', 'InnovateLabs', 'mike@innovatelabs.com', '+1 (555) 987-6543', 'qualified', 'active', 25000),
('Emma Wilson', 'DataFlow Inc', 'emma@dataflow.com', '+1 (555) 456-7890', 'active', 'active', 60000),
('Sarah Davis', 'StartupXYZ', 'sarah@startupxyz.com', '+1 (555) 321-0987', 'lead', 'active', 12000);

-- Insert sample projects (using client IDs from above)
INSERT INTO projects (client_id, name, description, status, progress, start_date, due_date, budget, spent, services) 
SELECT 
  c.id,
  CASE 
    WHEN c.company = 'TechCorp Solutions' THEN 'Customer Sentiment Analysis System'
    WHEN c.company = 'InnovateLabs' THEN 'Process Automation Suite'
    WHEN c.company = 'DataFlow Inc' THEN 'Real-time Analytics Pipeline'
    WHEN c.company = 'StartupXYZ' THEN 'Custom Dashboard Development'
  END,
  CASE 
    WHEN c.company = 'TechCorp Solutions' THEN 'Advanced NLP system for analyzing customer feedback and sentiment across multiple channels'
    WHEN c.company = 'InnovateLabs' THEN 'Comprehensive automation solution for business processes'
    WHEN c.company = 'DataFlow Inc' THEN 'ML-powered analytics pipeline for real-time data processing and insights'
    WHEN c.company = 'StartupXYZ' THEN 'Interactive dashboard for business metrics and KPIs'
  END,
  CASE 
    WHEN c.company = 'TechCorp Solutions' THEN 'in-progress'::project_status
    WHEN c.company = 'InnovateLabs' THEN 'planning'::project_status
    WHEN c.company = 'DataFlow Inc' THEN 'in-progress'::project_status
    WHEN c.company = 'StartupXYZ' THEN 'review'::project_status
  END,
  CASE 
    WHEN c.company = 'TechCorp Solutions' THEN 75
    WHEN c.company = 'InnovateLabs' THEN 25
    WHEN c.company = 'DataFlow Inc' THEN 60
    WHEN c.company = 'StartupXYZ' THEN 90
  END,
  CURRENT_DATE - INTERVAL '30 days',
  CURRENT_DATE + INTERVAL '45 days',
  c.value,
  CASE 
    WHEN c.company = 'TechCorp Solutions' THEN 33750
    WHEN c.company = 'InnovateLabs' THEN 6250
    WHEN c.company = 'DataFlow Inc' THEN 36000
    WHEN c.company = 'StartupXYZ' THEN 10800
  END,
  CASE 
    WHEN c.company = 'TechCorp Solutions' THEN ARRAY['NLP Analysis', 'Custom Dashboard']
    WHEN c.company = 'InnovateLabs' THEN ARRAY['Automation Suite']
    WHEN c.company = 'DataFlow Inc' THEN ARRAY['ML Pipeline', 'Analytics Dashboard']
    WHEN c.company = 'StartupXYZ' THEN ARRAY['Custom Dashboard']
  END
FROM clients c;

-- Insert sample invoices
INSERT INTO invoices (client_id, invoice_number, status, amount, issue_date, due_date, paid_date, description)
SELECT 
  c.id,
  'INV-' || LPAD((ROW_NUMBER() OVER())::text, 3, '0'),
  CASE 
    WHEN c.company = 'TechCorp Solutions' THEN 'paid'::invoice_status
    WHEN c.company = 'DataFlow Inc' THEN 'paid'::invoice_status
    ELSE 'sent'::invoice_status
  END,
  CASE 
    WHEN c.company = 'TechCorp Solutions' THEN 15000
    WHEN c.company = 'InnovateLabs' THEN 8500
    WHEN c.company = 'DataFlow Inc' THEN 20000
    WHEN c.company = 'StartupXYZ' THEN 12000
  END,
  CURRENT_DATE - INTERVAL '15 days',
  CURRENT_DATE + INTERVAL '15 days',
  CASE 
    WHEN c.company IN ('TechCorp Solutions', 'DataFlow Inc') THEN CURRENT_DATE - INTERVAL '5 days'
    ELSE NULL
  END,
  CASE 
    WHEN c.company = 'TechCorp Solutions' THEN 'NLP Model Development - Milestone 1 & 2'
    WHEN c.company = 'InnovateLabs' THEN 'Automation Setup - Initial Phase'
    WHEN c.company = 'DataFlow Inc' THEN 'Pipeline Architecture & Initial Development'
    WHEN c.company = 'StartupXYZ' THEN 'Dashboard Development - Phase 1'
  END
FROM clients c;

-- Insert sample tasks
INSERT INTO tasks (title, description, status, priority, due_date, progress, tags)
VALUES
('Complete NLP model training for TechCorp', 'Finalize training on customer sentiment analysis model', 'in-progress', 'high', CURRENT_DATE + INTERVAL '5 days', 75, ARRAY['nlp', 'ml', 'client-work']),
('Design dashboard mockups for InnovateLabs', 'Create wireframes and visual designs for analytics dashboard', 'review', 'medium', CURRENT_DATE + INTERVAL '3 days', 90, ARRAY['design', 'dashboard', 'client-work']),
('Update legal templates', 'Review and update MSA and SOW templates with legal team', 'todo', 'low', CURRENT_DATE + INTERVAL '10 days', 0, ARRAY['legal', 'internal', 'templates']),
('Setup automation for lead scoring', 'Implement Zapier automation for CRM lead scoring system', 'completed', 'medium', CURRENT_DATE - INTERVAL '1 day', 100, ARRAY['automation', 'internal', 'crm']);

-- Insert sample expenses
INSERT INTO expenses (description, amount, category, vendor, expense_date, recurring)
VALUES
('OpenAI API Credits', 450, 'Software', 'OpenAI', CURRENT_DATE, true),
('AWS Services', 280, 'Infrastructure', 'Amazon Web Services', CURRENT_DATE, true),
('Figma Pro Subscription', 144, 'Software', 'Figma Inc.', CURRENT_DATE, true),
('Contract Review', 800, 'Legal', 'Wilson Sonsini', CURRENT_DATE - INTERVAL '5 days', false),
('Website Hosting', 25, 'Infrastructure', 'Vercel', CURRENT_DATE, true),
('Slack Pro Plan', 96, 'Software', 'Slack Technologies', CURRENT_DATE, true),
('GitHub Enterprise', 84, 'Software', 'GitHub Inc.', CURRENT_DATE, true),
('Google Ads Campaign', 500, 'Marketing', 'Google LLC', CURRENT_DATE - INTERVAL '3 days', false);

-- Insert sample knowledge base articles
INSERT INTO knowledge_base (title, content, category, type, tags, views, likes, read_time)
VALUES
('Getting Started with NLP Projects', 'Comprehensive guide to starting NLP projects...', 'AI/ML', 'guide', ARRAY['nlp', 'getting-started', 'ai'], 245, 18, '8 min'),
('Dashboard Design Best Practices', 'Learn how to create effective dashboards...', 'Design', 'tutorial', ARRAY['dashboard', 'design', 'ux'], 189, 24, '12 min'),
('Zapier Integration Workflows', 'Step-by-step automation setup guide...', 'Automation', 'tutorial', ARRAY['zapier', 'automation', 'integration'], 156, 15, '6 min'),
('Client Communication Templates', 'Email templates for client communication...', 'Communication', 'template', ARRAY['communication', 'templates', 'client'], 298, 32, '4 min');

-- Insert sample integrations
INSERT INTO integrations (name, description, status, last_sync)
VALUES
('Zapier', 'Automate workflows between Verplex and 5000+ apps', 'connected', CURRENT_TIMESTAMP - INTERVAL '2 hours'),
('Slack', 'Get notifications and updates in your Slack workspace', 'connected', CURRENT_TIMESTAMP - INTERVAL '4 hours'),
('Google Workspace', 'Sync calendars, contacts, and documents', 'disconnected', NULL),
('GitHub', 'Connect repositories for project tracking', 'connected', CURRENT_TIMESTAMP - INTERVAL '1 day'),
('Stripe', 'Process payments and sync invoice data', 'connected', CURRENT_TIMESTAMP - INTERVAL '6 hours');

-- Insert sample KPIs
INSERT INTO analytics_kpis (name, value, target, period, trend, change_percentage, date)
VALUES
('Monthly Recurring Revenue', 45000, 50000, 'monthly', 'up', 12, CURRENT_DATE),
('Client Acquisition Rate', 3, 4, 'monthly', 'up', 25, CURRENT_DATE),
('Project Completion Rate', 94, 95, 'monthly', 'down', -2, CURRENT_DATE),
('Client Satisfaction Score', 4.8, 4.5, 'monthly', 'up', 6, CURRENT_DATE),
('Team Utilization', 92, 90, 'monthly', 'up', 8, CURRENT_DATE),
('Average Project Value', 28000, 30000, 'monthly', 'up', 5, CURRENT_DATE);