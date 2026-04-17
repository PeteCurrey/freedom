"use client";

import { cn } from "@/lib/utils";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  // A simple tactical parser for common MD patterns
  // In a production environment with more complexity, we'd use react-markdown
  // but for the Amplios tactical aesthetic, we control the styling here.
  
  const processLine = (line: string) => {
    // Headers
    if (line.startsWith('### ')) return <h3 className="font-display text-xl text-white mt-8 mb-4 uppercase tracking-tighter">{line.replace('### ', '')}</h3>;
    if (line.startsWith('## ')) return <h2 className="font-display text-2xl text-white mt-12 mb-6 uppercase tracking-tight">{line.replace('## ', '')}</h2>;
    if (line.startsWith('# ')) return <h1 className="font-display text-4xl text-brand-orange mt-16 mb-8 uppercase tracking-tighter">{line.replace('# ', '')}</h1>;
    
    // Lists
    if (line.startsWith('- ')) return (
      <li className="flex gap-3 mb-2">
        <span className="text-brand-orange mt-1.5 w-1.5 h-1.5 bg-brand-orange rounded-full shrink-0" />
        <span className="font-sans text-brand-grey text-sm leading-relaxed">{line.replace('- ', '')}</span>
      </li>
    );

    // Blockquotes (Tactical Alerts)
    if (line.startsWith('> ')) return (
      <div className="blueprint-border p-6 bg-brand-carbon my-8 border-l-brand-orange border-l-4">
         <p className="font-mono text-[10px] uppercase text-brand-orange tracking-widest mb-2 font-bold">Tactical Advisory</p>
         <p className="font-sans text-brand-grey text-sm italic">{line.replace('> ', '')}</p>
      </div>
    );

    // Images (Simple pattern)
    if (line.startsWith('![')) {
       const altMatch = line.match(/\[(.*?)\]/);
       const urlMatch = line.match(/\((.*?)\)/);
       if (urlMatch) {
          return (
             <div className="my-12">
                <div className="blueprint-border aspect-video bg-brand-carbon overflow-hidden mb-2">
                   <img src={urlMatch[1]} alt={altMatch ? altMatch[1] : ''} className="w-full h-full object-cover grayscale opacity-80" />
                </div>
                {altMatch && <p className="font-mono text-[8px] text-brand-grey uppercase text-center tracking-widest">{altMatch[1]}</p>}
             </div>
          );
       }
    }

    // Default Paragraph
    if (line.trim() === '') return <br />;
    
    // Handle inline bold **text**
    const parts = line.split(/(\*\*.*?\*\*)/g);
    return (
      <p className="font-sans text-brand-grey text-sm leading-relaxed mb-4">
        {parts.map((part, i) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={i} className="text-white font-bold">{part.replace(/\*\*/g, '')}</strong>;
          }
          return part;
        })}
      </p>
    );
  };

  const lines = content.split('\n');

  return (
    <div className={cn("prose-tactical", className)}>
      {lines.map((line, index) => (
        <div key={index}>{processLine(line)}</div>
      ))}
    </div>
  );
}
