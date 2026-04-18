-- Add new columns for store refinement
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS subcategory text,
ADD COLUMN IF NOT EXISTS is_editor_pick boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS related_product_ids uuid[] DEFAULT '{}';

-- Create an index for faster subcategory filtering
CREATE INDEX IF NOT EXISTS idx_products_subcategory ON public.products(subcategory);
CREATE INDEX IF NOT EXISTS idx_products_is_editor_pick ON public.products(is_editor_pick);
