-- Migration: Upgrade Leads to CRM
-- Description: Adds pipeline status and chronological activity logging for leads.

-- Add new columns to leads for CRM tracking
ALTER TABLE public.leads 
ADD COLUMN IF NOT EXISTS pipeline_status TEXT DEFAULT 'new' 
CHECK (pipeline_status IN ('new', 'review', 'qualified', 'closed', 'lost')),
ADD COLUMN IF NOT EXISTS internal_notes TEXT,
ADD COLUMN IF NOT EXISTS assigned_to UUID REFERENCES auth.users(id);

-- Create lead_activity table for chronological tracking
CREATE TABLE IF NOT EXISTS public.lead_activity (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_id UUID REFERENCES public.leads(id) ON DELETE CASCADE,
    admin_id UUID REFERENCES auth.users(id),
    activity_type TEXT NOT NULL, -- 'note', 'status_change', 'email_sent', 'call_made'
    content TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- RLS Policies
ALTER TABLE public.lead_activity ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage lead activity" 
ON public.lead_activity FOR ALL 
USING (auth.jwt() ->> 'email' IN (SELECT email FROM public.admin_users));

-- Create indexes
CREATE INDEX IF NOT EXISTS lead_activity_lead_id_idx ON public.lead_activity (lead_id);
