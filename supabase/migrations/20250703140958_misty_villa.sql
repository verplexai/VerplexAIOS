/*
  # Create Demo Users

  1. New Data
    - Demo user profiles for testing and demonstration
    - Includes founder, team member, contractor, and client accounts
    - All accounts use 'password' as the password for simplicity

  2. Security
    - Users will be created through Supabase Auth
    - Profiles will be linked to auth users
    - Passwords are hashed by Supabase Auth automatically

  Note: This migration creates the profile records. The actual auth users
  need to be created through the Supabase Auth API, but we'll insert
  the profiles with known UUIDs that match the auth users.
*/

-- Insert demo user profiles
-- Note: These UUIDs should match the auth.users table entries
INSERT INTO profiles (
  id,
  email,
  display_name,
  role,
  department,
  avatar_url,
  created_at,
  updated_at
) VALUES 
  (
    '11111111-1111-1111-1111-111111111111',
    'founder@verplex.ai',
    'Alex Chen',
    'admin',
    'Executive',
    'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    now(),
    now()
  ),
  (
    '22222222-2222-2222-2222-222222222222',
    'team@verplex.ai',
    'Sarah Johnson',
    'user',
    'Development',
    'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    now(),
    now()
  ),
  (
    '33333333-3333-3333-3333-333333333333',
    'contractor@verplex.ai',
    'Mike Rodriguez',
    'user',
    'Design',
    'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    now(),
    now()
  ),
  (
    '44444444-4444-4444-4444-444444444444',
    'john@techcorp.com',
    'John Smith',
    'client',
    'TechCorp Inc.',
    'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    now(),
    now()
  )
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  display_name = EXCLUDED.display_name,
  role = EXCLUDED.role,
  department = EXCLUDED.department,
  avatar_url = EXCLUDED.avatar_url,
  updated_at = now();

-- Create a default organization for demo purposes
INSERT INTO organizations (
  id,
  name,
  description,
  website,
  logo_url,
  created_at,
  updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  'Verplex',
  'Digital Operating System for Modern Businesses',
  'https://verplex.ai',
  'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
  now(),
  now()
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  website = EXCLUDED.website,
  logo_url = EXCLUDED.logo_url,
  updated_at = now();

-- Link users to the organization
INSERT INTO user_organizations (
  id,
  user_id,
  organization_id,
  role,
  joined_at
) VALUES 
  (
    gen_random_uuid(),
    '11111111-1111-1111-1111-111111111111',
    '00000000-0000-0000-0000-000000000000',
    'owner',
    now()
  ),
  (
    gen_random_uuid(),
    '22222222-2222-2222-2222-222222222222',
    '00000000-0000-0000-0000-000000000000',
    'member',
    now()
  ),
  (
    gen_random_uuid(),
    '33333333-3333-3333-3333-333333333333',
    '00000000-0000-0000-0000-000000000000',
    'member',
    now()
  )
ON CONFLICT (user_id, organization_id) DO UPDATE SET
  role = EXCLUDED.role,
  joined_at = EXCLUDED.joined_at;