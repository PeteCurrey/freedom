-- Compliance Audits Registry
-- Enables users to save their technical conversion audits

CREATE TABLE IF NOT EXISTS public.compliance_audits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    project_name TEXT NOT NULL DEFAULT 'My Base Build',
    responses JSONB NOT NULL DEFAULT '[]', -- List of checked item IDs
    audit_score INT NOT NULL DEFAULT 0,
    is_compliant BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Configuration
ALTER TABLE public.compliance_audits ENABLE ROW LEVEL SECURITY;

-- Policies: Users can manage their own audits
CREATE POLICY "Users can manage their own audits" 
ON public.compliance_audits FOR ALL 
USING (auth.uid() = user_id);

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_compliance_audits_modtime
    BEFORE UPDATE ON public.compliance_audits
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();
