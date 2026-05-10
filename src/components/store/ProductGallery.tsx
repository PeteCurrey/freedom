"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  name: string;
  brand: string;
  images: (string | null)[];
  badge?: string | null;
}

export function ProductGallery({ name, brand, images, badge }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="lg:col-span-12 xl:col-span-7 space-y-6">
      <div className="aspect-square max-w-[600px] mx-auto bg-[#F8F8F6] rounded-xl relative overflow-hidden group shadow-sm flex items-center justify-center">
        {selectedImage ? (
          <Image 
            src={selectedImage} 
            alt={name} 
            fill 
            className="object-contain p-8 transition-transform duration-700 hover:scale-125 cursor-zoom-in" 
            priority
          />
        ) : (
          <div className="flex flex-col items-center justify-center bg-[#F0F0F0] w-full h-full">
            <span className="font-display text-8xl text-[#999999] opacity-30">{brand?.slice(0, 1) || "?"}</span>
            <span className="font-mono text-xs text-[#999999] uppercase tracking-widest mt-4">Image coming soon</span>
          </div>
        )}

        {/* Product Meta Badge */}
        {badge && (
          <div className="absolute top-6 left-6 flex flex-col gap-2 z-10">
            <span className="px-3 py-1 bg-brand-orange text-white font-mono text-[9px] uppercase tracking-widest shadow-md rounded-sm">
              {badge}
            </span>
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-4 max-w-[600px] mx-auto overflow-x-auto hide-scrollbar pb-2">
          {images.map((img: string | null, i: number) => (
            <button 
              key={i} 
              onClick={() => img && setSelectedImage(img)}
              className={cn(
                "w-20 h-20 bg-[#F8F8F6] border rounded-md transition-all flex items-center justify-center p-2 flex-shrink-0",
                selectedImage === img ? "border-brand-orange ring-1 ring-brand-orange" : "border-[#E5E5E5] opacity-60 hover:opacity-100"
              )}
            >
              {img && <img src={img} className="w-full h-full object-contain" alt={`${name} thumbnail ${i + 1}`} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
