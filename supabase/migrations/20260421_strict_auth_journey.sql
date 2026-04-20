-- Add client_email to build_projects
ALTER TABLE build_projects ADD COLUMN IF NOT EXISTS client_email TEXT;

-- Update the demo project for testing
UPDATE build_projects SET client_email = 'pete@avorria.com' WHERE display_id = 'AM-204';

-- Drop existing generic policies
DROP POLICY IF EXISTS "Public Read via ID" ON build_projects;
DROP POLICY IF EXISTS "Public Read Milestones" ON project_installations;

-- Create Strict Auth Policies for build_projects
CREATE POLICY "Users can view their own builds" 
ON build_projects FOR SELECT 
USING (auth.jwt() ->> 'email' = client_email);

-- Create Strict Auth Policies for project_installations
CREATE POLICY "Users can view milestones of their own builds" 
ON project_installations FOR SELECT 
USING (
  project_id IN (
    SELECT id FROM build_projects WHERE client_email = auth.jwt() ->> 'email'
  )
);
