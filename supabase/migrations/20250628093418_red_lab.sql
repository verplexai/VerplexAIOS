-- Create demo organizations first (no dependencies)
-- Using proper UUID format (no text prefixes allowed)
INSERT INTO organizations (id, name, slug, description, industry, size_category, created_at, updated_at) VALUES
  ('aaaaaaaa-1111-1111-1111-111111111111', 'Verplex', 'verplex', 'Digital Operating System Company', 'Technology', 'startup', now(), now()),
  ('bbbbbbbb-2222-2222-2222-222222222222', 'TechCorp', 'techcorp', 'Technology Corporation', 'Technology', 'medium', now(), now())
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  description = EXCLUDED.description,
  industry = EXCLUDED.industry,
  size_category = EXCLUDED.size_category,
  updated_at = now();

-- Create sample file categories if they don't exist
INSERT INTO file_categories (name, description, module, allowed_file_types, max_file_size_mb, icon, color) VALUES
('Client Documents', 'Client-specific documents and files', 'clients', ARRAY['pdf', 'doc', 'docx', 'txt'], 50, 'FileText', '#3B82F6'),
('Project Assets', 'Project deliverables and assets', 'projects', ARRAY['pdf', 'doc', 'docx', 'xlsx', 'ppt', 'pptx', 'zip'], 100, 'Package', '#8B5CF6'),
('Contracts', 'Legal contracts and agreements', 'legal', ARRAY['pdf', 'doc', 'docx'], 100, 'FileCheck', '#EF4444'),
('Invoices', 'Financial invoices and receipts', 'finance', ARRAY['pdf', 'xlsx', 'csv'], 50, 'Receipt', '#F59E0B')
ON CONFLICT (name) DO NOTHING;

-- Create a function to safely create demo profiles when auth users exist
CREATE OR REPLACE FUNCTION create_demo_profile_if_user_exists(
  user_id uuid,
  user_email text,
  user_display_name text,
  user_role text,
  user_department text
) RETURNS void AS $$
BEGIN
  -- Only insert if the auth user exists
  IF EXISTS (SELECT 1 FROM auth.users WHERE id = user_id) THEN
    INSERT INTO profiles (id, email, display_name, role, department, created_at, updated_at) 
    VALUES (user_id, user_email, user_display_name, user_role, user_department, now(), now())
    ON CONFLICT (id) DO UPDATE SET
      email = EXCLUDED.email,
      display_name = EXCLUDED.display_name,
      role = EXCLUDED.role,
      department = EXCLUDED.department,
      updated_at = now();
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to safely link users to organizations
CREATE OR REPLACE FUNCTION create_user_org_link_if_profile_exists(
  user_id uuid,
  org_id uuid,
  user_role text
) RETURNS void AS $$
BEGIN
  -- Only insert if the profile exists
  IF EXISTS (SELECT 1 FROM profiles WHERE id = user_id) THEN
    INSERT INTO user_organizations (user_id, organization_id, role, joined_at) 
    VALUES (user_id, org_id, user_role, now())
    ON CONFLICT (user_id, organization_id) DO UPDATE SET
      role = EXCLUDED.role,
      joined_at = EXCLUDED.joined_at;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Try to create demo profiles (will only work if auth users exist)
SELECT create_demo_profile_if_user_exists(
  '11111111-1111-1111-1111-111111111111'::uuid,
  'founder@verplex.ai',
  'Alex Founder',
  'admin',
  'Leadership'
);

SELECT create_demo_profile_if_user_exists(
  '22222222-2222-2222-2222-222222222222'::uuid,
  'team@verplex.ai',
  'Sarah Johnson',
  'user',
  'Development'
);

SELECT create_demo_profile_if_user_exists(
  '33333333-3333-3333-3333-333333333333'::uuid,
  'contractor@verplex.ai',
  'Mike Chen',
  'user',
  'External'
);

SELECT create_demo_profile_if_user_exists(
  '44444444-4444-4444-4444-444444444444'::uuid,
  'john@techcorp.com',
  'John Smith',
  'client',
  'TechCorp'
);

-- Try to link users to organizations (will only work if profiles exist)
SELECT create_user_org_link_if_profile_exists(
  '11111111-1111-1111-1111-111111111111'::uuid,
  'aaaaaaaa-1111-1111-1111-111111111111'::uuid,
  'owner'
);

SELECT create_user_org_link_if_profile_exists(
  '22222222-2222-2222-2222-222222222222'::uuid,
  'aaaaaaaa-1111-1111-1111-111111111111'::uuid,
  'member'
);

SELECT create_user_org_link_if_profile_exists(
  '33333333-3333-3333-3333-333333333333'::uuid,
  'aaaaaaaa-1111-1111-1111-111111111111'::uuid,
  'member'
);

SELECT create_user_org_link_if_profile_exists(
  '44444444-4444-4444-4444-444444444444'::uuid,
  'bbbbbbbb-2222-2222-2222-222222222222'::uuid,
  'member'
);

-- Create some sample services for the demo
INSERT INTO services (id, name, description, category, price_type, base_price, currency, estimated_duration_hours, requirements, deliverables, is_active, created_by) 
SELECT 
  gen_random_uuid(),
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
  '11111111-1111-1111-1111-111111111111'::uuid
WHERE EXISTS (SELECT 1 FROM profiles WHERE id = '11111111-1111-1111-1111-111111111111'::uuid);

INSERT INTO services (id, name, description, category, price_type, base_price, currency, estimated_duration_hours, requirements, deliverables, is_active, created_by) 
SELECT 
  gen_random_uuid(),
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
  '11111111-1111-1111-1111-111111111111'::uuid
WHERE EXISTS (SELECT 1 FROM profiles WHERE id = '11111111-1111-1111-1111-111111111111'::uuid);

-- Clean up the helper functions (optional, but keeps the schema clean)
DROP FUNCTION IF EXISTS create_demo_profile_if_user_exists(uuid, text, text, text, text);
DROP FUNCTION IF EXISTS create_user_org_link_if_profile_exists(uuid, uuid, text);

-- Add a comment explaining the demo setup
COMMENT ON TABLE organizations IS 'Organizations table - includes demo organizations Verplex and TechCorp';
COMMENT ON TABLE services IS 'Services table - includes sample NLP and Dashboard services for demo';