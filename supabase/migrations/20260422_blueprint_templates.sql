-- Blueprint PDF Template Management
-- Enables dynamic customization of the generated technical portfolios

CREATE TABLE IF NOT EXISTS public.blueprint_templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    layout_config JSONB NOT NULL DEFAULT '{
        "settings": {
            "primaryColor": "#ff6b00",
            "secondaryColor": "#111111",
            "fontFamily": "Inter",
            "pageSize": "A4"
        },
        "blocks": [
            {"id": "header", "type": "header", "y": 0, "content": "Master Engineering Manifest"},
            {"id": "schematic", "type": "schematic", "y": 120, "height": 300},
            {"id": "specs", "type": "technical_specs", "y": 450},
            {"id": "bom", "type": "bill_of_materials", "y": 600},
            {"id": "footer", "type": "footer", "y": 800}
        ]
    }'::jsonb,
    is_active BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS
ALTER TABLE public.blueprint_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage blueprint templates" 
ON public.blueprint_templates FOR ALL 
USING (auth.jwt() ->> 'email' = 'pete@avorria.com'); -- Restrict to Pete for now

-- Trigger for updated_at
CREATE TRIGGER update_blueprint_templates_modtime
    BEFORE UPDATE ON public.blueprint_templates
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();
