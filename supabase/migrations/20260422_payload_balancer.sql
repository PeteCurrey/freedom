-- Payload & Weight Balancer Registry
-- Enables users to save their vehicle weight distribution configurations

CREATE TABLE IF NOT EXISTS public.payload_configurations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    vehicle_name TEXT NOT NULL DEFAULT 'My Base Build',
    base_specs JSONB NOT NULL DEFAULT '{}', -- {wheelbase, gvm, front_limit, rear_limit, unladen_mass}
    items JSONB NOT NULL DEFAULT '[]', -- [{id, name, weight_kg, position_m}]
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Configuration
ALTER TABLE public.payload_configurations ENABLE ROW LEVEL SECURITY;

-- Policies: Users can manage their own configurations
CREATE POLICY "Users can manage their own payload configs" 
ON public.payload_configurations FOR ALL 
USING (auth.uid() = user_id);

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_payload_configurations_modtime
    BEFORE UPDATE ON public.payload_configurations
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();
