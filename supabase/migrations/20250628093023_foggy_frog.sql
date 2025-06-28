/*
  # Create Demo User Profiles

  1. New Demo Users
    - Creates profiles for the demo users shown in the login form
    - Sets up proper roles and departments for each demo user
    - Ensures the profiles match the demo credentials displayed

  2. Demo User Details
    - founder@verplex.ai (Admin role)
    - team@verplex.ai (User role) 
    - contractor@verplex.ai (User role)
    - john@techcorp.com (Client role)

  3. Security
    - All demo users will have RLS policies applied
    - Profiles are created with proper role assignments
*/

-- Insert demo user profiles
-- Note: These UUIDs should match the auth.users table entries
-- In a real scenario, these would be created through Supabase Auth signup

INSERT INTO profiles (id, email, display_name, role, department, created_at, updated_at) VALUES
  ('11111111-1111-1111-1111-111111111111', 'founder@verplex.ai', 'Founder', 'admin', 'Leadership', now(), now()),
  ('22222222-2222-2222-2222-222222222222', 'team@verplex.ai', 'Team Member', 'user', 'Development', now(), now()),
  ('33333333-3333-3333-3333-333333333333', 'contractor@verplex.ai', 'Contractor', 'user', 'External', now(), now()),
  ('44444444-4444-4444-4444-444444444444', 'john@techcorp.com', 'John Smith', 'client', 'TechCorp', now(), now())
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  display_name = EXCLUDED.display_name,
  role = EXCLUDED.role,
  department = EXCLUDED.department,
  updated_at = now();

-- Create a sample organization for demo purposes
INSERT INTO organizations (id, name, slug, description, industry, size_category, created_at, updated_at) VALUES
  ('org-11111111-1111-1111-1111-111111111111', 'Verplex', 'verplex', 'Digital Operating System Company', 'Technology', 'startup', now(), now()),
  ('org-22222222-2222-2222-2222-222222222222', 'TechCorp', 'techcorp', 'Technology Corporation', 'Technology', 'medium', now(), now())
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  description = EXCLUDED.description,
  industry = EXCLUDED.industry,
  size_category = EXCLUDED.size_category,
  updated_at = now();

-- Link users to organizations
INSERT INTO user_organizations (user_id, organization_id, role, joined_at) VALUES
  ('11111111-1111-1111-1111-111111111111', 'org-11111111-1111-1111-1111-111111111111', 'owner', now()),
  ('22222222-2222-2222-2222-222222222222', 'org-11111111-1111-1111-1111-111111111111', 'member', now()),
  ('33333333-3333-3333-3333-333333333333', 'org-11111111-1111-1111-1111-111111111111', 'member', now()),
  ('44444444-4444-4444-4444-444444444444', 'org-22222222-2222-2222-2222-222222222222', 'member', now())
ON CONFLICT (user_id, organization_id) DO UPDATE SET
  role = EXCLUDED.role,
  joined_at = EXCLUDED.joined_at;