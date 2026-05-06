import { Navbar } from "@/components/layout/Navbar";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { ProductForm } from "@/components/admin/ProductForm";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function NewProductPage() {
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
              Add New <span className="text-brand-orange">Product</span>
            </h1>
          </div>
        </div>

        <ProductForm />
      </div>
    </div>
  );
}
