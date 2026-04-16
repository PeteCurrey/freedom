"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Loader2, Bot, User, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  role: 'assistant' | 'user';
  content: string;
}

interface BuildAdvisorProps {
  context?: {
    vehicle?: string;
    layout?: string;
    systems?: any;
  };
}

export function BuildAdvisor({ context }: BuildAdvisorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hello. I'm your Technical Build Advisor. I have your current configuration data. How can I assist with your engineering choices today?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg],
          context
        })
      });
      const data = await response.json();
      setMessages(prev => [...prev, data]);
    } catch (err) {
       setMessages(prev => [...prev, { role: 'assistant', content: "Technical connection error. Please verify your API keys." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-8 right-8 z-[60] w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl",
          isOpen ? "bg-brand-carbon border border-brand-border rotate-90" : "bg-brand-orange border border-white/20 hover:scale-110"
        )}
      >
        {isOpen ? <X className="w-6 h-6 text-brand-white" /> : <MessageSquare className="w-6 h-6 text-white" />}
      </button>

      {/* Chat Window */}
      <div className={cn(
        "fixed bottom-28 right-8 z-[60] w-[400px] h-[600px] bg-brand-obsidian blueprint-border shadow-2xl flex flex-col transition-all duration-500 origin-bottom-right",
        isOpen ? "scale-100 opacity-100 translate-y-0" : "scale-90 opacity-0 translate-y-12 pointer-events-none"
      )}>
        {/* Header */}
        <div className="p-6 border-b border-brand-border bg-brand-carbon relative overflow-hidden">
           <div className="blueprint-grid absolute inset-0 opacity-20" />
           <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-brand-orange/10 border border-brand-orange/40 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-brand-orange" />
                 </div>
                 <div>
                    <h3 className="font-display text-sm uppercase tracking-widest text-brand-white">Build Advisor</h3>
                    <p className="font-mono text-[8px] text-brand-orange uppercase animate-pulse">● Engineering Brain Active</p>
                 </div>
              </div>
              <div className="px-3 py-1 bg-brand-border rounded-full font-mono text-[8px] text-brand-grey uppercase">v3.5 SONNET</div>
           </div>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar bg-brand-carbon/30">
           {messages.map((m, i) => (
             <div key={i} className={cn(
               "flex gap-4",
               m.role === 'user' ? "flex-row-reverse" : "flex-row"
             )}>
                <div className={cn(
                  "w-8 h-8 shrink-0 flex items-center justify-center border",
                  m.role === 'user' ? "border-brand-grey/30 bg-brand-carbon" : "border-brand-orange/30 bg-brand-orange/5"
                )}>
                   {m.role === 'user' ? <User className="w-4 h-4 text-brand-grey" /> : <Bot className="w-4 h-4 text-brand-orange" />}
                </div>
                <div className={cn(
                  "p-4 text-[11px] leading-relaxed font-sans",
                  m.role === 'user' ? "bg-brand-carbon text-brand-white border border-brand-border" : "text-brand-grey"
                )}>
                   {m.content}
                   {i === 0 && (
                      <div className="mt-4 p-3 bg-brand-orange/5 border border-brand-orange/20 flex gap-3 items-start">
                         <ShieldAlert className="w-3 h-3 text-brand-orange mt-0.5" />
                         <span className="text-[9px] text-brand-orange/80 italic">Engineering oversight required. All calculations should be verified in the field.</span>
                      </div>
                   )}
                </div>
             </div>
           ))}
           {isLoading && (
             <div className="flex gap-4">
                <div className="w-8 h-8 border border-brand-orange/30 bg-brand-orange/5 flex items-center justify-center">
                   <Loader2 className="w-4 h-4 text-brand-orange animate-spin" />
                </div>
             </div>
           )}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-brand-border bg-brand-carbon">
           <div className="flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask technical question..."
                className="flex-1 bg-brand-obsidian border border-brand-border p-4 text-xs font-mono text-brand-white focus:outline-none focus:border-brand-orange transition-colors"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="bg-brand-orange px-4 text-white hover:bg-white hover:text-brand-orange transition-all disabled:opacity-50"
              >
                 <Send className="w-4 h-4" />
              </button>
           </div>
        </div>
      </div>
    </>
  );
}
