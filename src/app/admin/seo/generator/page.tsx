"use client";

import { useState } from "react";
import { 
  Plus, 
  FileText, 
  Instagram, 
  Twitter, 
  Mail, 
  Sparkles, 
  Save, 
  Send,
  Loader2,
  CheckCircle2,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";

export default function ContentGeneratorPage() {
  const [type, setType] = useState<"blog" | "social" | "newsletter">("blog");
  const [topic, setTopic] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [queued, setQueued] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setResult(null);
    setQueued(false);
    
    // In a real implementation, this would call /api/admin/generate-content
    // which use the Anthropic SDK. 
    // For now, we simulate the sophisticated response.
    setTimeout(() => {
      setResult(`## The Definitive Guide to ${topic || 'Mobile Off-Grid Power'}\n\nIn the world of expedition builds, power is the primary currency. Whether you're crossing the Atlas mountains or stealth camping in Bristol, your battery bank's health determines your comfort. In this technical deep-dive, we explore the nuances of high-output DC charging and why thermal management in your battery box is not optional...\n\n### Key Technical Takeaways:\n1. Cable sizing is dictates safety.\n2. Lithium requires dedicated charging profiles.\n3. Monitoring is mandatory.`);
      setIsGenerating(false);
    }, 2000);
  };

  const handleQueue = async () => {
    // Save to content_queue
    const { error } = await supabase.from('content_queue').insert({
      type,
      title: topic || "Automated Content Draft",
      content: result,
      status: 'review'
    });
    
    if (!error) {
      setQueued(true);
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-2 font-mono text-[10px] text-brand-orange uppercase tracking-[0.3em] mb-4">
          <Sparkles size={12} /> AI Content Node: generator.gamma
        </div>
        <h1 className="font-display text-5xl uppercase tracking-tighter text-brand-white">
          Content <span className="text-brand-orange">Engine</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
        {/* Input Form */}
        <div className="space-y-8">
          <div className="blueprint-border p-8 bg-brand-carbon">
             <h3 className="font-display text-xl uppercase mb-8">Generation Parameters</h3>
             
             <div className="space-y-6">
                <div>
                  <label className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-2">Content Format</label>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { id: "blog", icon: FileText, label: "Blog Post" },
                      { id: "social", icon: Instagram, label: "Social Pack" },
                      { id: "newsletter", icon: Mail, label: "Newsletter" },
                    ].map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setType(t.id as any)}
                        className={cn(
                          "flex flex-col items-center gap-3 p-4 border transition-all",
                          type === t.id ? "bg-brand-orange border-brand-orange text-brand-white" : "bg-brand-obsidian border-brand-border text-brand-grey hover:border-brand-grey"
                        )}
                      >
                        <t.icon size={20} />
                        <span className="font-mono text-[8px] uppercase tracking-widest">{t.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                   <label className="block font-mono text-[10px] text-brand-grey uppercase tracking-widest mb-2">Primary Topic / Keywords</label>
                   <input 
                     type="text" 
                     value={topic}
                     onChange={(e) => setTopic(e.target.value)}
                     placeholder="e.g. Mercedes Sprinter Solar Installation"
                     className="w-full bg-brand-obsidian border border-brand-border p-4 font-mono text-xs text-brand-white focus:border-brand-orange outline-none"
                   />
                </div>

                <div className="pt-4">
                  <button 
                    onClick={handleGenerate}
                    disabled={isGenerating || !topic}
                    className="w-full py-5 bg-brand-orange text-brand-white font-display text-sm uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Claude is Architecting...
                      </>
                    ) : (
                      <>
                        <Sparkles size={18} /> Generate Technical Copy
                      </>
                    )}
                  </button>
                </div>
             </div>
          </div>

          <div className="p-8 border border-brand-border border-dashed">
             <div className="flex items-center gap-3 mb-4">
               <CheckCircle2 className="text-brand-orange" size={16} />
               <h3 className="font-mono text-[10px] uppercase tracking-widest text-brand-orange">AI Strategy Note</h3>
             </div>
             <p className="font-mono text-[9px] text-brand-grey leading-relaxed uppercase">
               Generated content leverages the <b>Claude 3.5 Sonnet</b> model. It is trained on Amplios technical standards 
               to ensure engineering accuracy for van conversions.
             </p>
          </div>
        </div>

        {/* Output Area */}
        <div className="space-y-8">
           <div className={cn(
             "blueprint-border bg-brand-obsidian min-h-[500px] p-8 flex flex-col transition-all",
             !result && "items-center justify-center text-center border-dashed opacity-50"
           )}>
             {!result ? (
               <div className="max-w-xs">
                  <FileText size={48} className="text-brand-grey mx-auto mb-6 opacity-30" />
                  <p className="font-mono text-[10px] text-brand-grey uppercase tracking-widest">
                    Awaiting generation parameters. Output will appear here.
                  </p>
               </div>
             ) : (
               <>
                 <div className="flex justify-between items-center mb-8 border-b border-brand-border pb-6">
                    <h3 className="font-display text-xl uppercase tracking-tighter text-brand-orange">Technical Draft</h3>
                    <div className="flex gap-4">
                       <button className="text-brand-grey hover:text-brand-white transition-colors"><Save size={18} /></button>
                       <button 
                        onClick={handleQueue}
                        disabled={queued}
                        className={cn(
                          "px-4 py-1 font-mono text-[9px] uppercase tracking-widest border transition-all",
                          queued ? "bg-green-500 border-green-500 text-brand-white" : "border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-brand-white"
                        )}
                       >
                         {queued ? "Queued for Review" : "Queue for Publishing"}
                       </button>
                    </div>
                 </div>
                 <div className="flex-1 font-sans text-brand-grey text-sm leading-relaxed whitespace-pre-wrap prose prose-invert max-w-none">
                    {result}
                 </div>
               </>
             )}
           </div>

           {queued && (
             <div className="flex items-center gap-4 p-4 bg-green-500/10 border border-green-500/30">
                <CheckCircle2 size={16} className="text-green-500" />
                <span className="font-mono text-[9px] text-green-500 uppercase tracking-widest">Content successfully injected into <span className="underline">content_queue</span> table.</span>
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
