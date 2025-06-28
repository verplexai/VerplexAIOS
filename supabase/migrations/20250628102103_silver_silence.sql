/*
  # Demo Data Setup Migration

  1. Organizations
    - Creates demo organizations with unique slugs
    - Verplex Demo and TechCorp Demo to avoid conflicts

  2. User Profiles
    - Creates sample user profiles for different roles
    - Links users to organizations

  3. Sample Data
    - Projects with realistic data
    - Tasks with different statuses
    - File metadata records
    - Notifications for demo users
    - Financial records
    - Knowledge base articles

  Note: Auth user creation may fail due to permissions - this is expected.
  You can create auth users manually in Supabase dashboard if needed.
*/

-- Create demo organizations with unique slugs to avoid conflicts
INSERT INTO organizations (id, name, slug, description, industry, size_category, created_at, updated_at) VALUES
  ('aaaaaaaa-bbbb-cccc-dddd-111111111111', 'Verplex Demo', 'verplex-demo', 'Digital Operating System Company (Demo)', 'Technology', 'startup', now(), now()),
  ('bbbbbbbb-cccc-dddd-eeee-222222222222', 'TechCorp Demo', 'techcorp-demo', 'Technology Corporation (Demo)', 'Technology', 'medium', now(), now())
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  description = EXCLUDED.description,
  industry = EXCLUDED.industry,
  size_category = EXCLUDED.size_category,
  updated_at = now()
WHERE organizations.id = EXCLUDED.id;

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
  
  -- Check if pgcrypto extension is available
  IF NOT EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'pgcrypto') THEN
    RAISE NOTICE 'pgcrypto extension not available, skipping auth user creation for %', user_email;
    RETURN;
  END IF;
  
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
SELECT create_demo_auth_user('11111111-2222-3333-4444-555555555555', 'founder@verplex.ai', 'password');
SELECT create_demo_auth_user('22222222-3333-4444-5555-666666666666', 'team@verplex.ai', 'password');
SELECT create_demo_auth_user('33333333-4444-5555-6666-777777777777', 'contractor@verplex.ai', 'password');
SELECT create_demo_auth_user('44444444-5555-6666-7777-888888888888', 'john@techcorp.com', 'password');

-- Create demo profiles (these will work regardless of auth user creation)
INSERT INTO profiles (id, email, display_name, role, department, created_at, updated_at) VALUES
  ('11111111-2222-3333-4444-555555555555', 'founder@verplex.ai', 'Alex Founder', 'admin', 'Leadership', now(), now()),
  ('22222222-3333-4444-5555-666666666666', 'team@verplex.ai', 'Sarah Johnson', 'manager', 'Development', now(), now()),
  ('33333333-4444-5555-6666-777777777777', 'contractor@verplex.ai', 'Mike Chen', 'user', 'External', now(), now()),
  ('44444444-5555-6666-7777-888888888888', 'john@techcorp.com', 'John Smith', 'client', 'TechCorp', now(), now())
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  display_name = EXCLUDED.display_name,
  role = EXCLUDED.role,
  department = EXCLUDED.department,
  updated_at = now()
WHERE profiles.id = EXCLUDED.id;

-- Link users to organizations
INSERT INTO user_organizations (user_id, organization_id, role, joined_at) VALUES
  ('11111111-2222-3333-4444-555555555555', 'aaaaaaaa-bbbb-cccc-dddd-111111111111', 'owner', now()),
  ('22222222-3333-4444-5555-666666666666', 'aaaaaaaa-bbbb-cccc-dddd-111111111111', 'admin', now()),
  ('33333333-4444-5555-6666-777777777777', 'aaaaaaaa-bbbb-cccc-dddd-111111111111', 'member', now()),
  ('44444444-5555-6666-7777-888888888888', 'bbbbbbbb-cccc-dddd-eeee-222222222222', 'member', now())
ON CONFLICT (user_id, organization_id) DO UPDATE SET
  role = EXCLUDED.role,
  joined_at = EXCLUDED.joined_at
WHERE user_organizations.user_id = EXCLUDED.user_id AND user_organizations.organization_id = EXCLUDED.organization_id;

-- Create sample projects
INSERT INTO projects (id, name, description, status, priority, organization_id, project_manager_id, client_id, start_date, end_date, budget, progress_percentage, created_by) VALUES
  (
    'cccccccc-dddd-eeee-ffff-111111111111',
    'Customer Sentiment Analysis System',
    'Advanced NLP system for analyzing customer feedback and sentiment across multiple channels',
    'active',
    'high',
    'aaaaaaaa-bbbb-cccc-dddd-111111111111',
    '22222222-3333-4444-5555-666666666666',
    '44444444-5555-6666-7777-888888888888',
    '2023-12-01',
    '2024-02-15',
    45000.00,
    75,
    '11111111-2222-3333-4444-555555555555'
  ),
  (
    'dddddddd-eeee-ffff-aaaa-222222222222',
    'Real-time Analytics Pipeline',
    'ML-powered analytics pipeline for real-time data processing and insights',
    'active',
    'medium',
    'aaaaaaaa-bbbb-cccc-dddd-111111111111',
    '22222222-3333-4444-5555-666666666666',
    '44444444-5555-6666-7777-888888888888',
    '2023-11-15',
    '2024-03-01',
    60000.00,
    60,
    '11111111-2222-3333-4444-555555555555'
  )
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  status = EXCLUDED.status,
  priority = EXCLUDED.priority,
  progress_percentage = EXCLUDED.progress_percentage,
  updated_at = now()
WHERE projects.id = EXCLUDED.id;

-- Create sample tasks
INSERT INTO tasks (id, title, description, status, priority, project_id, assigned_to, created_by, due_date, progress_percentage) VALUES
  (
    'eeeeeeee-ffff-aaaa-bbbb-111111111111',
    'Complete NLP model training for TechCorp',
    'Finalize training on customer sentiment analysis model',
    'in_progress',
    'high',
    'cccccccc-dddd-eeee-ffff-111111111111',
    '22222222-3333-4444-5555-666666666666',
    '11111111-2222-3333-4444-555555555555',
    '2024-01-20',
    75
  ),
  (
    'ffffffff-aaaa-bbbb-cccc-222222222222',
    'Design dashboard mockups for analytics',
    'Create wireframes and visual designs for analytics dashboard',
    'review',
    'medium',
    'dddddddd-eeee-ffff-aaaa-222222222222',
    '33333333-4444-5555-6666-777777777777',
    '22222222-3333-4444-5555-666666666666',
    '2024-01-18',
    90
  ),
  (
    'aaaaaaaa-bbbb-cccc-dddd-333333333333',
    'Setup automation for lead scoring',
    'Implement automation for CRM lead scoring system',
    'done',
    'medium',
    'cccccccc-dddd-eeee-ffff-111111111111',
    '33333333-4444-5555-6666-777777777777',
    '22222222-3333-4444-5555-666666666666',
    '2024-01-15',
    100
  )
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  status = EXCLUDED.status,
  priority = EXCLUDED.priority,
  progress_percentage = EXCLUDED.progress_percentage,
  updated_at = now()
WHERE tasks.id = EXCLUDED.id;

-- Create sample file records (metadata only, no actual files)
INSERT INTO files (
  id, filename, original_filename, file_path, file_size_bytes, file_type, file_extension,
  project_id, organization_id, uploaded_by, is_public, storage_bucket
) VALUES
  (
    'bbbbbbbb-cccc-dddd-eeee-111111111111',
    'project-proposal-techcorp.pdf',
    'Project Proposal - TechCorp Solutions.pdf',
    'projects/cccccccc-dddd-eeee-ffff-111111111111/project-proposal-techcorp.pdf',
    2457600,
    'application/pdf',
    'pdf',
    'cccccccc-dddd-eeee-ffff-111111111111',
    'aaaaaaaa-bbbb-cccc-dddd-111111111111',
    '11111111-2222-3333-4444-555555555555',
    false,
    'files'
  ),
  (
    'cccccccc-dddd-eeee-ffff-222222222222',
    'nlp-model-specs.docx',
    'NLP Model Technical Specifications.docx',
    'projects/cccccccc-dddd-eeee-ffff-111111111111/nlp-model-specs.docx',
    1843200,
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'docx',
    'cccccccc-dddd-eeee-ffff-111111111111',
    'aaaaaaaa-bbbb-cccc-dddd-111111111111',
    '22222222-3333-4444-5555-666666666666',
    false,
    'files'
  )
ON CONFLICT (id) DO UPDATE SET
  filename = EXCLUDED.filename,
  original_filename = EXCLUDED.original_filename,
  updated_at = now()
WHERE files.id = EXCLUDED.id;

-- Create sample notifications
INSERT INTO notifications (user_id, title, message, type, category, entity_type, entity_id, is_read) VALUES
  (
    '44444444-5555-6666-7777-888888888888',
    'Project Update',
    'Your NLP project milestone has been completed ahead of schedule',
    'success',
    'project_update',
    'projects',
    'cccccccc-dddd-eeee-ffff-111111111111',
    false
  ),
  (
    '44444444-5555-6666-7777-888888888888',
    'New Document Shared',
    'Technical specifications document has been uploaded to your project',
    'info',
    'document_shared',
    'files',
    'cccccccc-dddd-eeee-ffff-222222222222',
    false
  ),
  (
    '22222222-3333-4444-5555-666666666666',
    'Task Assignment',
    'You have been assigned a new task: Complete NLP model training',
    'info',
    'task_assigned',
    'tasks',
    'eeeeeeee-ffff-aaaa-bbbb-111111111111',
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
    'cccccccc-dddd-eeee-ffff-111111111111',
    'aaaaaaaa-bbbb-cccc-dddd-111111111111',
    15000.00,
    'NLP Model Development - Milestone 1 & 2',
    'paid',
    '2024-01-31',
    '11111111-2222-3333-4444-555555555555'
  ),
  (
    'invoice',
    'cccccccc-dddd-eeee-ffff-111111111111',
    'aaaaaaaa-bbbb-cccc-dddd-111111111111',
    18750.00,
    'Dashboard Development - Milestone 3',
    'pending',
    '2024-02-14',
    '11111111-2222-3333-4444-555555555555'
  ),
  (
    'expense',
    NULL,
    'aaaaaaaa-bbbb-cccc-dddd-111111111111',
    450.00,
    'OpenAI API Credits',
    'approved',
    NULL,
    '22222222-3333-4444-5555-666666666666'
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
    '22222222-3333-4444-5555-666666666666',
    'aaaaaaaa-bbbb-cccc-dddd-111111111111'
  ),
  (
    'Dashboard Design Best Practices',
    'Creating effective dashboards requires careful consideration of user needs...',
    'Best practices for designing user-friendly dashboards',
    'Design',
    ARRAY['dashboard', 'design', 'ux'],
    'published',
    true,
    '33333333-4444-5555-6666-777777777777',
    'aaaaaaaa-bbbb-cccc-dddd-111111111111'
  )
ON CONFLICT DO NOTHING;

-- Create sample services for the demo
INSERT INTO services (id, name, description, category, price_type, base_price, currency, estimated_duration_hours, requirements, deliverables, is_active, created_by) 
VALUES
  (
    'eeeeeeee-ffff-aaaa-bbbb-444444444444',
    'NLP Analysis & Implementation',
    'Custom natural language processing solutions for text analysis, sentiment analysis, and content understanding',
    'AI/ML',
    'fixed',
    15000.00,
    'USD',
    120,
    '["Data access", "Technical requirements", "Performance criteria"]'::jsonb,
    '["Trained models", "API endpoints", "Documentation", "Training data"]'::jsonb,
    true,
    '11111111-2222-3333-4444-555555555555'
  ),
  (
    'ffffffff-aaaa-bbbb-cccc-555555555555',
    'Custom Dashboard Development',
    'Interactive data visualization dashboards with real-time analytics and custom reporting',
    'Dashboards',
    'fixed',
    12000.00,
    'USD',
    80,
    '["Data sources", "Design preferences", "User requirements"]'::jsonb,
    '["Interactive dashboard", "User documentation", "Training session"]'::jsonb,
    true,
    '11111111-2222-3333-4444-555555555555'
  )
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  base_price = EXCLUDED.base_price,
  updated_at = now()
WHERE services.id = EXCLUDED.id;

-- Clean up the demo auth user creation function
DROP FUNCTION IF EXISTS create_demo_auth_user(uuid, text, text);

-- Add helpful comments
COMMENT ON TABLE organizations IS 'Organizations table - includes demo organizations Verplex Demo and TechCorp Demo';
COMMENT ON TABLE projects IS 'Sample projects including NLP and Analytics projects for demo';
COMMENT ON TABLE tasks IS 'Sample tasks showing different statuses and priorities';
COMMENT ON TABLE files IS 'Sample file metadata (no actual files stored)';
COMMENT ON TABLE notifications IS 'Sample notifications for different user types';
COMMENT ON TABLE services IS 'Services table - includes sample NLP and Dashboard services for demo';