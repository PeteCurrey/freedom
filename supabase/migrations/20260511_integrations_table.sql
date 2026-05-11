-- Integrations Table
CREATE TABLE IF NOT EXISTS public.integrations (
  id text PRIMARY KEY, -- e.g. 'gmc', 'stripe', 'ebay'
  name text NOT NULL,
  config jsonb DEFAULT '{}'::jsonb,
  status text DEFAULT 'not_connected',
  last_sync timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.integrations ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Admin full access integrations" ON public.integrations FOR ALL USING (auth.role() = 'authenticated');
