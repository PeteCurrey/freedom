"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { ChevronLeft, Loader2 } from "lucide-react";
import { ProductForm } from "@/components/admin/ProductForm";

export default function EditProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      if (!id) return;
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();
      
      if (data) setProduct(data);
      setLoading(false);
    }
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-12">
        <Loader2 className="w-12 h-12 text-brand-orange animate-spin mb-4" />
        <p className="font-mono text-[10px] uppercase text-gray-400 tracking-widest">Initialising Product Data...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-12 text-center">
        <h2 className="font-display text-4xl uppercase tracking-tighter text-gray-900 mb-4">Product Not Found</h2>
        <Link href="/admin/products" className="text-brand-orange font-mono text-[10px] uppercase tracking-widest hover:underline">
          Return to catalogue
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-[1400px] mx-auto px-8 py-12">
        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <Link href="/admin/products" className="flex items-center gap-2 font-mono text-[10px] text-gray-400 uppercase tracking-widest mb-4 hover:text-brand-orange transition-colors">
              <ChevronLeft size={12} /> Back to products
            </Link>
            <h1 className="font-display text-5xl uppercase tracking-tighter text-gray-900">
              Edit <span className="text-brand-orange">{product.name}</span>
            </h1>
          </div>
        </div>

        <ProductForm productId={id as string} initialData={product} />
      </div>
    </div>
  );
}
