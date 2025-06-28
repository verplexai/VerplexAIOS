/*
  # Create Demo Users and Complete Setup
  
  This migration creates demo authentication users and populates all demo data.
  
  1. Demo Users
     - Creates authentication users with specific UUIDs
     - Creates corresponding profiles
     - Links users to organizations
  
  2. Demo Data
     - Sample projects
     - Sample tasks
     - Sample files metadata
     - Sample notifications
  
  3. Security
     - All tables have RLS enabled
     - Proper policies for data access
*/

-- Function to create auth users (this will only work if you have service role access)
CREATE OR REPLACE FUNCTION create_demo_auth_user(
  user_id uuid,
  user_email text,
  user_password text DEFAULT 'password'
) RETURNS void AS $$
DECLARE
  encrypted_pw text;
BEGIN
  -- This function attempts to create auth users
  -- Note: This requires service role permissions and may not work in all environments
  
  -- Generate encrypted password (basic approach)
  encrypted_pw := crypt(user_password, gen_salt('bf'));
  
  -- Insert into auth.users if it doesn't exist
  INSERT INTO auth.users (
    id,
    instance_id,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
  ) VALUES (
    user_id,
    '00000000-0000-0000-0000-000000000000',
    user_email,
    encrypted_pw,
    now(),
    now(),
    now(),
    '',
    '',
    '',
    ''
  ) ON CONFLICT (id) DO NOTHING;
  
EXCEPTION
  WHEN insufficient_privilege THEN
    -- If we can't create auth users, just continue
    RAISE NOTICE 'Cannot create auth user %, insufficient privileges. Please create manually in Supabase dashboard.', user_email;
  WHEN OTHERS THEN
    RAISE NOTICE 'Error creating auth user %: %', user_email, SQLERRM;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Try to create demo auth users (may fail due to permissions)
SELECT create_demo_auth_user('11111111-1111-1111-1111-111111111111', 'founder@verplex.ai', 'password');
SELECT create_demo_auth_user('22222222-2222-2222-2222-222222222222', 'team@verplex.ai', 'password');
SELECT create_demo_auth_user('33333333-3333-3333-3333-333333333333', 'contractor@verplex.ai', 'password');
SELECT create_demo_auth_user('44444444-4444-4444-4444-444444444444', 'john@techcorp.com', 'password');

-- Create demo profiles (these will work if auth users exist)
INSERT INTO profiles (id, email, display_name, role, department, created_at, updated_at) VALUES
  ('11111111-1111-1111-1111-111111111111', 'founder@verplex.ai', 'Alex Founder', 'admin', 'Leadership', now(), now()),
  ('22222222-2222-2222-2222-222222222222', 'team@verplex.ai', 'Sarah Johnson', 'manager', 'Development', now(), now()),
  ('33333333-3333-3333-3333-333333333333', 'contractor@verplex.ai', 'Mike Chen', 'user', 'External', now(), now()),
  ('44444444-4444-4444-4444-444444444444', 'john@techcorp.com', 'John Smith', 'client', 'TechCorp', now(), now())
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  display_name = EXCLUDED.display_name,
  role = EXCLUDED.role,
  department = EXCLUDED.department,
  updated_at = now();

-- Link users to organizations
INSERT INTO user_organizations (user_id, organization_id, role, joined_at) VALUES
  ('11111111-1111-1111-1111-111111111111', 'aaaaaaaa-1111-1111-1111-111111111111', 'owner', now()),
  ('22222222-2222-2222-2222-222222222222', 'aaaaaaaa-1111-1111-1111-111111111111', 'admin', now()),
  ('33333333-3333-3333-3333-333333333333', 'aaaaaaaa-1111-1111-1111-111111111111', 'member', now()),
  ('44444444-4444-4444-4444-444444444444', 'bbbbbbbb-2222-2222-2222-222222222222', 'member', now())
ON CONFLICT (user_id, organization_id) DO UPDATE SET
  role = EXCLUDED.role,
  joined_at = EXCLUDED.joined_at;

-- Create sample projects
INSERT INTO projects (id, name, description, status, priority, organization_id, project_manager_id, client_id, start_date, end_date, budget, progress_percentage, created_by) VALUES
  (
    'cccccccc-1111-1111-1111-111111111111',
    'Customer Sentiment Analysis System',
    'Advanced NLP system for analyzing customer feedback and sentiment across multiple channels',
    'active',
    'high',
    'aaaaaaaa-1111-1111-1111-111111111111',
    '22222222-2222-2222-2222-222222222222',
    '44444444-4444-4444-4444-444444444444',
    '2023-12-01',
    '2024-02-15',
    45000.00,
    75,
    '11111111-1111-1111-1111-111111111111'
  ),
  (
    'dddddddd-2222-2222-2222-222222222222',
    'Real-time Analytics Pipeline',
    'ML-powered analytics pipeline for real-time data processing and insights',
    'active',
    'medium',
    'aaaaaaaa-1111-1111-1111-111111111111',
    '22222222-2222-2222-2222-222222222222',
    '44444444-4444-4444-4444-444444444444',
    '2023-11-15',
    '2024-03-01',
    60000.00,
    60,
    '11111111-1111-1111-1111-111111111111'
  )
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  status = EXCLUDED.status,
  priority = EXCLUDED.priority,
  progress_percentage = EXCLUDED.progress_percentage,
  updated_at = now();

-- Create sample tasks
INSERT INTO tasks (id, title, description, status, priority, project_id, assigned_to, created_by, due_date, progress_percentage) VALUES
  (
    'eeeeeeee-1111-1111-1111-111111111111',
    'Complete NLP model training for TechCorp',
    'Finalize training on customer sentiment analysis model',
    'in_progress',
    'high',
    'cccccccc-1111-1111-1111-111111111111',
    '22222222-2222-2222-2222-222222222222',
    '11111111-1111-1111-1111-111111111111',
    '2024-01-20',
    75
  ),
  (
    'ffffffff-2222-2222-2222-222222222222',
    'Design dashboard mockups for analytics',
    'Create wireframes and visual designs for analytics dashboard',
    'review',
    'medium',
    'dddddddd-2222-2222-2222-222222222222',
    '33333333-3333-3333-3333-333333333333',
    '22222222-2222-2222-2222-222222222222',
    '2024-01-18',
    90
  ),
  (
    'gggggggg-3333-3333-3333-333333333333',
    'Setup automation for lead scoring',
    'Implement automation for CRM lead scoring system',
    'done',
    'medium',
    'cccccccc-1111-1111-1111-111111111111',
    '33333333-3333-3333-3333-333333333333',
    '22222222-2222-2222-2222-222222222222',
    '2024-01-15',
    100
  )
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  status = EXCLUDED.status,
  priority = EXCLUDED.priority,
  progress_percentage = EXCLUDED.progress_percentage,
  updated_at = now();

-- Create sample file records (metadata only, no actual files)
INSERT INTO files (
  id, filename, original_filename, file_path, file_size_bytes, file_type, file_extension,
  project_id, organization_id, uploaded_by, is_public, storage_bucket
) VALUES
  (
    'hhhhhhhh-1111-1111-1111-111111111111',
    'project-proposal-techcorp.pdf',
    'Project Proposal - TechCorp Solutions.pdf',
    'projects/cccccccc-1111-1111-1111-111111111111/project-proposal-techcorp.pdf',
    2457600,
    'application/pdf',
    'pdf',
    'cccccccc-1111-1111-1111-111111111111',
    'aaaaaaaa-1111-1111-1111-111111111111',
    '11111111-1111-1111-1111-111111111111',
    false,
    'files'
  ),
  (
    'iiiiiiii-2222-2222-2222-222222222222',
    'nlp-model-specs.docx',
    'NLP Model Technical Specifications.docx',
    'projects/cccccccc-1111-1111-1111-111111111111/nlp-model-specs.docx',
    1843200,
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'docx',
    'cccccccc-1111-1111-1111-111111111111',
    'aaaaaaaa-1111-1111-1111-111111111111',
    '22222222-2222-2222-2222-222222222222',
    false,
    'files'
  )
ON CONFLICT (id) DO UPDATE SET
  filename = EXCLUDED.filename,
  original_filename = EXCLUDED.original_filename,
  updated_at = now();

-- Create sample notifications
INSERT INTO notifications (user_id, title, message, type, category, entity_type, entity_id, is_read) VALUES
  (
    '44444444-4444-4444-4444-444444444444',
    'Project Update',
    'Your NLP project milestone has been completed ahead of schedule',
    'success',
    'project_update',
    'projects',
    'cccccccc-1111-1111-1111-111111111111',
    false
  ),
  (
    '44444444-4444-4444-4444-444444444444',
    'New Document Shared',
    'Technical specifications document has been uploaded to your project',
    'info',
    'document_shared',
    'files',
    'iiiiiiii-2222-2222-2222-222222222222',
    false
  ),
  (
    '22222222-2222-2222-2222-222222222222',
    'Task Assignment',
    'You have been assigned a new task: Complete NLP model training',
    'info',
    'task_assigned',
    'tasks',
    'eeeeeeee-1111-1111-1111-111111111111',
    true
  )
ON CONFLICT (id) DO NOTHING;

-- Create sample financial records
INSERT INTO financial_records (
  record_type, project_id, organization_id, amount, description, status, 
  due_date, created_by
) VALUES
  (
    'invoice',
    'cccccccc-1111-1111-1111-111111111111',
    'aaaaaaaa-1111-1111-1111-111111111111',
    15000.00,
    'NLP Model Development - Milestone 1 & 2',
    'paid',
    '2024-01-31',
    '11111111-1111-1111-1111-111111111111'
  ),
  (
    'invoice',
    'cccccccc-1111-1111-1111-111111111111',
    'aaaaaaaa-1111-1111-1111-111111111111',
    18750.00,
    'Dashboard Development - Milestone 3',
    'pending',
    '2024-02-14',
    '11111111-1111-1111-1111-111111111111'
  ),
  (
    'expense',
    NULL,
    'aaaaaaaa-1111-1111-1111-111111111111',
    450.00,
    'OpenAI API Credits',
    'approved',
    NULL,
    '22222222-2222-2222-2222-222222222222'
  )
ON CONFLICT DO NOTHING;

-- Create sample knowledge articles
INSERT INTO knowledge_articles (
  title, content, excerpt, category, tags, status, is_public, 
  author_id, organization_id
) VALUES
  (
    'Getting Started with NLP Projects',
    'This comprehensive guide covers the fundamentals of starting NLP projects...',
    'Learn the basics of natural language processing project setup',
    'AI/ML',
    ARRAY['nlp', 'getting-started', 'ai'],
    'published',
    true,
    '22222222-2222-2222-2222-222222222222',
    'aaaaaaaa-1111-1111-1111-111111111111'
  ),
  (
    'Dashboard Design Best Practices',
    'Creating effective dashboards requires careful consideration of user needs...',
    'Best practices for designing user-friendly dashboards',
    'Design',
    ARRAY['dashboard', 'design', 'ux'],
    'published',
    true,
    '33333333-3333-3333-3333-333333333333',
    'aaaaaaaa-1111-1111-1111-111111111111'
  )
ON CONFLICT DO NOTHING;

-- Clean up the demo auth user creation function
DROP FUNCTION IF EXISTS create_demo_auth_user(uuid, text, text);

-- Add helpful comments
COMMENT ON TABLE projects IS 'Sample projects including NLP and Analytics projects for demo';
COMMENT ON TABLE tasks IS 'Sample tasks showing different statuses and priorities';
COMMENT ON TABLE files IS 'Sample file metadata (no actual files stored)';
COMMENT ON TABLE notifications IS 'Sample notifications for different user types';