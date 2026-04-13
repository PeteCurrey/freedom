import { cn } from "@/lib/utils";

interface SpecItem {
  label: string;
  value: string;
  unit?: string;
}

interface SpecCardProps {
  title: string;
  specs: SpecItem[];
  className?: string;
  variant?: "default" | "blueprint";
}

export function SpecCard({ title, specs, className, variant = "blueprint" }: SpecCardProps) {
  return (
    <div
      className={cn(
        "p-6",
        variant === "blueprint" ? "blueprint-border bg-brand-graphite/40" : "glass-card",
        className
      )}
    >
      <div className="flex items-center justify-between mb-6">
        <h4 className="font-display text-xs tracking-[0.2em] text-brand-white uppercase">{title}</h4>
        <div className="w-12 h-px bg-brand-orange opacity-40" />
      </div>

      <div className="space-y-4">
        {specs.map((spec, i) => (
          <div key={i} className="flex justify-between items-baseline group">
            <span className="font-mono text-[10px] uppercase tracking-widest text-brand-grey group-hover:text-brand-orange transition-colors">
              {spec.label}
            </span>
            <div className="flex-1 mx-4 border-b border-brand-border border-dotted opacity-30" />
            <span className="font-mono text-sm text-brand-white">
              {spec.value}
              {spec.unit && (
                <span className="text-[10px] text-brand-grey ml-1 uppercase">{spec.unit}</span>
              )}
            </span>
          </div>
        ))}
      </div>

      {variant === "blueprint" && (
        <div className="mt-6 pt-4 border-t border-brand-border/50 flex justify-end">
          <span className="font-mono text-[8px] text-brand-grey uppercase tracking-widest">
            {/* // TECHNICAL REF: {Math.random().toString(36).substring(7).toUpperCase()} */}
          </span>
        </div>
      )}
    </div>
  );
}
