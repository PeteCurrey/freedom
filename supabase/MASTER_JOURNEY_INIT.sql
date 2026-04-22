-- Amplios Build Journey Tracker: Master Initialization
-- Target: Supabase SQL Editor

-- 1. Infrastructure Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Enums
DO $$ BEGIN
    CREATE TYPE build_stage AS ENUM (
      'DESIGN',
      'CHASSIS_PREP',
      'SYSTEM_INSTALL',
      'CABINETRY',
      'FINISHING',
      'QA',
      'DELIVERY'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 3. Tables
CREATE TABLE IF NOT EXISTS build_projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  display_id TEXT UNIQUE NOT NULL, -- e.g., 'AM-204'
  client_name TEXT NOT NULL,
  client_email TEXT, -- The Strict Auth Key
  vehicle_name TEXT NOT NULL,
  vehicle_slug TEXT, 
  current_stage build_stage DEFAULT 'DESIGN',
  start_date DATE DEFAULT CURRENT_DATE,
  estimated_completion DATE,
  technician_name TEXT DEFAULT 'Lead Engineer',
  workshop_temp NUMERIC(4,1) DEFAULT 19.5,
  workshop_humidity NUMERIC(4,1) DEFAULT 45.0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS project_installations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES build_projects(id) ON DELETE CASCADE,
  component_name TEXT NOT NULL,
  status TEXT DEFAULT 'PENDING', -- PENDING, ACTIVE, COMPLETED
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Security (RLS)
ALTER TABLE build_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_installations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own builds" ON build_projects;
CREATE POLICY "Users can view their own builds" 
ON build_projects FOR SELECT 
USING (auth.jwt() ->> 'email' = client_email);

DROP POLICY IF EXISTS "Users can view milestones of their own builds" ON project_installations;
CREATE POLICY "Users can view milestones of their own builds" 
ON project_installations FOR SELECT 
USING (
  project_id IN (
    SELECT id FROM build_projects WHERE client_email = auth.jwt() ->> 'email'
  )
);

-- 5. Seed Data
INSERT INTO build_projects (display_id, client_name, client_email, vehicle_name, vehicle_slug, current_stage, start_date, estimated_completion)
VALUES (
  'AM-204', 
  'Peter Currey', 
  'pete@avorria.com', 
  'Expedition Sprinter 4x4', 
  'mercedes-sprinter',
  'SYSTEM_INSTALL', 
  '2026-04-10', 
  '2026-06-25'
)
ON CONFLICT (display_id) DO UPDATE 
SET client_email = EXCLUDED.client_email, 
    current_stage = EXCLUDED.current_stage;

-- Add nodes for AM-204
DELETE FROM project_installations WHERE project_id IN (SELECT id FROM build_projects WHERE display_id = 'AM-204');

INSERT INTO project_installations (project_id, component_name, status)
SELECT id, 'Victron MultiPlus 3000VA', 'COMPLETED' FROM build_projects WHERE display_id = 'AM-204';

INSERT INTO project_installations (project_id, component_name, status)
SELECT id, 'MaxxAir Roof Ventilation', 'COMPLETED' FROM build_projects WHERE display_id = 'AM-204';

INSERT INTO project_installations (project_id, component_name, status)
SELECT id, 'Induction Cooktop Node', 'ACTIVE' FROM build_projects WHERE display_id = 'AM-204';

INSERT INTO project_installations (project_id, component_name, status)
SELECT id, 'Hydronic Heating Loop', 'PENDING' FROM build_projects WHERE display_id = 'AM-204';
