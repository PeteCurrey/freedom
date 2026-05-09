"use client";

import Image from "next/image";

interface LifestyleBandProps {
  images: string[];
}

export function LifestyleBand({ images }: LifestyleBandProps) {
  if (!images || images.length === 0) return null;

  return (
    <section className="py-6 bg-brand-obsidian">
      <div className="container mx-auto px-6">
        <div className="flex gap-2 overflow-hidden">
          {images.map((img, i) => (
            <div key={i} className="relative h-[180px] flex-1 rounded-lg overflow-hidden group">
              <Image 
                src={img} 
                alt={`Lifestyle shot ${i + 1}`} 
                fill 
                className="object-cover transition-transform duration-1000 group-hover:scale-105" 
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
