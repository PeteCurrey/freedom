"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Helper to filter object keys based on DB schema
const filterDbFields = (data: any) => {
  const allowedFields = [
    'slug', 'name', 'brand', 'sku', 'description', 'short_description', 
    'price_gbp', 'compare_at_price', 'cost_price', 'images', 'category_id', 
    'system_ids', 'vehicle_compatibility', 'specs', 'weight_grams', 
    'stock_quantity', 'is_featured', 'is_active', 'seo_title', 'seo_description', 
    'supplier_id', 'affiliate_url', 'subcategory', 'system_tier', 'badge', 
    'is_editor_pick', 'sort_priority', 'spec_line', 'related_product_ids', 
    'datasheet_url', 'type', 'component_list'
  ];

  const filtered: any = {};
  
  // Handle field name mapping
  const inputData = { ...data };
  if (inputData.full_description) {
    inputData.description = inputData.full_description;
    delete inputData.full_description;
  }
  if (inputData.weight_kg) {
    inputData.weight_grams = Math.floor(Number(inputData.weight_kg) * 1000);
    delete inputData.weight_kg;
  }

  allowedFields.forEach(field => {
    if (field in inputData) {
      filtered[field] = inputData[field];
    }
  });
  
  return filtered;
};

export async function updateProductAction(id: string, slug: string, data: any) {
  try {
    const dbData = filterDbFields(data);

    const { error } = await supabase
      .from("products")
      .update(dbData)
      .eq("id", id);

    if (error) throw error;

    // Revalidate relevant paths
    revalidatePath("/store");
    revalidatePath(`/store/product/${slug}`);
    revalidatePath("/store/all");
    revalidatePath("/admin/store");
    
    // Also revalidate category page
    const { data: product } = await supabase.from('products').select('category_id').eq('id', id).single();
    if (product?.category_id) {
       const { data: category } = await supabase.from('product_categories').select('slug').eq('id', product.category_id).single();
       if (category?.slug) {
         revalidatePath(`/store/${category.slug}`);
       }
    }

    return { success: true };
  } catch (error: any) {
    console.error("Server Action Error (Update):", error);
    return { success: false, error: error.message };
  }
}

export async function createProductAction(data: any) {
  try {
    const dbData = filterDbFields(data);

    const { error } = await supabase
      .from("products")
      .insert([dbData]);

    if (error) throw error;

    revalidatePath("/store");
    revalidatePath("/store/all");
    revalidatePath("/admin/store");

    return { success: true };
  } catch (error: any) {
    console.error("Server Action Error (Create):", error);
    return { success: false, error: error.message };
  }
}
