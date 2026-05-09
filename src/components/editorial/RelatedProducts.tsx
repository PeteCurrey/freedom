import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface RelatedProduct {
  id?: string;
  name: string;
  brand: string;
  price?: number;
  slug: string;
  image?: string;
}

interface RelatedProductsProps {
  products: RelatedProduct[];
  heading?: string;
}

export function RelatedProducts({ products, heading = "Products Mentioned in This Guide" }: RelatedProductsProps) {
  if (!products || products.length === 0) return null;

  return (
    <section className="mt-16 pt-12 border-t border-brand-border">
      <div className="mb-8">
        <span className="font-mono text-[9px] text-brand-orange uppercase tracking-[0.3em] mb-2 block">
          // FROM THE STORE
        </span>
        <h2 className="font-display text-2xl uppercase tracking-tight text-brand-white">
          {heading}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => {
          const formattedPrice = product.price
            ? (product.price / 100).toLocaleString("en-GB", { style: "currency", currency: "GBP" })
            : null;

          return (
            <Link
              key={product.slug}
              href={`/store/product/${product.slug}`}
              className="group flex items-center gap-4 p-4 bg-brand-carbon border border-brand-border hover:border-brand-orange transition-all rounded-sm"
            >
              {/* Image or placeholder */}
              <div className="w-16 h-16 flex-shrink-0 bg-brand-obsidian rounded-sm flex items-center justify-center overflow-hidden">
                {product.image ? (
                  <img src={product.image} alt={product.name} className="w-full h-full object-contain p-2" />
                ) : (
                  <span className="font-display text-xl text-brand-grey/40 uppercase">
                    {product.brand?.slice(0, 1) || "V"}
                  </span>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <span className="font-mono text-[8px] text-brand-orange uppercase tracking-widest block">{product.brand}</span>
                <h3 className="font-sans text-[12px] text-brand-white font-medium leading-tight truncate group-hover:text-brand-orange transition-colors">
                  {product.name}
                </h3>
                {formattedPrice && (
                  <span className="font-sans text-[12px] text-brand-grey mt-0.5 block">{formattedPrice}</span>
                )}
              </div>

              <ArrowRight className="w-4 h-4 text-brand-grey/40 group-hover:text-brand-orange group-hover:translate-x-0.5 transition-all flex-shrink-0" />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
