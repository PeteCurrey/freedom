"use client";

import { useState, useEffect } from "react";
import { 
  BUILD_MATCH_QUESTIONS, 
  QuizQuestion, 
  QuizOption 
} from "@/lib/data/advisor";
import { vehicleData } from "@/lib/data/vehicles";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronRight, 
  RotateCcw, 
  Search, 
  ShieldCheck, 
  AlertCircle,
  BarChart,
  Cpu,
  ArrowRight,
  ShoppingBag
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

export default function BuildMatchQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleSelect = (questionId: string, optionId: string) => {
    const updatedAnswers = { ...answers, [questionId]: optionId };
    setAnswers(updatedAnswers);

    if (step < BUILD_MATCH_QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      calculateResult(updatedAnswers);
    }
  };

  const calculateResult = (finalAnswers: Record<string, string>) => {
    setIsAnalyzing(true);
    
    // Artificial delay for "Scanning" effect
    setTimeout(() => {
      const scores: Record<string, number> = {};

      BUILD_MATCH_QUESTIONS.forEach(q => {
        const selectedId = finalAnswers[q.id];
        const option = q.options.find(o => o.id === selectedId);
        if (option) {
          Object.entries(option.scores).forEach(([vSlug, score]) => {
            scores[vSlug] = (scores[vSlug] || 0) + score;
          });
        }
      });

      // Find vehicle with highest score
      const winner = Object.entries(scores).reduce((prev, curr) => 
        (curr[1] > prev[1] ? curr : prev)
      )[0];

      setResult(winner);
      setIsAnalyzing(false);
    }, 2500);
  };

  const reset = () => {
    setStep(0);
    setAnswers({});
    setResult(null);
    setIsAnalyzing(false);
  };

  if (result) {
    const vehicle = vehicleData[result];
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="blueprint-border bg-brand-carbon p-12 relative overflow-hidden"
      >
        <div className="blueprint-grid absolute inset-0 opacity-10 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.3em] mb-4 block">
                // MATCHED ENGINE: 0x4F92
              </span>
              <h3 className="font-display text-4xl lg:text-6xl uppercase mb-6 leading-none tracking-tighter">
                YOUR FOUNDATION: <br/>
                <span className="text-brand-orange">{vehicle.name}</span>
              </h3>
              <p className="font-sans text-brand-grey text-lg leading-relaxed mb-8 italic">
                &quot;{vehicle.tagline}&quot;
              </p>
              <div className="space-y-4 mb-12">
                 <div className="flex items-center gap-4 text-xs font-mono text-brand-white uppercase">
                    <ShieldCheck className="w-4 h-4 text-brand-orange" /> Why it matched: {vehicle.bestFor.split(".")[0]}
                 </div>
                 <div className="flex items-center gap-4 text-xs font-mono text-brand-white uppercase">
                    <AlertCircle className="w-4 h-4 text-brand-orange" /> Engineering Alert: {vehicle.watchOutFor.split(".")[0]}
                 </div>
              </div>
              <div className="flex flex-wrap gap-4">
                 <Link 
                   href={`/vehicles/${result}`} 
                   className="bg-brand-orange text-white px-8 py-4 font-display text-[10px] uppercase tracking-widest hover:scale-105 transition-transform flex items-center gap-2"
                 >
                   View Full Schematic <ArrowRight className="w-4 h-4" />
                 </Link>
                 <Link 
                   href={`/vehicles/${result}/listings`} 
                   className="bg-brand-carbon border border-brand-orange text-brand-orange px-8 py-4 font-display text-[10px] uppercase tracking-widest hover:bg-brand-orange hover:text-white transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(255,107,0,0.1)]"
                 >
                   Browse Marketplace <ShoppingBag className="w-4 h-4" />
                 </Link>
                 <button 
                   onClick={reset}
                   className="border border-brand-border text-brand-grey px-8 py-4 font-display text-[10px] uppercase tracking-widest hover:border-brand-orange transition-colors flex items-center gap-2"
                 >
                   Recalibrate <RotateCcw className="w-4 h-4" />
                 </button>
              </div>
            </div>
            <div className="md:w-1/2 relative aspect-video blueprint-border overflow-hidden">
               <Image src={vehicle.heroImage} alt={vehicle.name} fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700" />
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="relative min-h-[500px] flex flex-col justify-center">
      <AnimatePresence mode="wait">
        {isAnalyzing ? (
          <motion.div 
            key="analyzing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-24"
          >
            <Cpu className="w-16 h-16 text-brand-orange mx-auto mb-8 animate-pulse" />
            <h3 className="font-display text-2xl uppercase tracking-[0.2em] mb-4">Analyzing DNA</h3>
            <div className="max-w-xs mx-auto h-1 bg-brand-border relative overflow-hidden">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: "100%" }}
                 transition={{ duration: 2.5, ease: "linear" }}
                 className="absolute inset-y-0 left-0 bg-brand-orange"
               />
            </div>
            <p className="font-mono text-[9px] text-brand-grey uppercase tracking-widest mt-6 animate-pulse">
              Cross-referencing chassis integrity and payload requirements...
            </p>
          </motion.div>
        ) : (
          <motion.div 
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-3xl mx-auto w-full"
          >
            <div className="flex justify-between items-center mb-12">
               <span className="font-mono text-[10px] text-brand-orange uppercase tracking-widest">Step {step + 1} of {BUILD_MATCH_QUESTIONS.length}</span>
               <div className="flex gap-1">
                  {BUILD_MATCH_QUESTIONS.map((_, i) => (
                    <div key={i} className={cn("h-1 w-8 transition-colors", i <= step ? "bg-brand-orange" : "bg-brand-border")} />
                  ))}
               </div>
            </div>

            <h2 className="font-display text-4xl lg:text-6xl mb-12 uppercase leading-none tracking-tighter">
              {BUILD_MATCH_QUESTIONS[step].text}
            </h2>

            <div className={cn(
              "grid grid-cols-1 gap-6",
              BUILD_MATCH_QUESTIONS[step].options.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"
            )}>
               {BUILD_MATCH_QUESTIONS[step].options.map((opt) => (
                 <button
                   key={opt.id}
                   onClick={() => handleSelect(BUILD_MATCH_QUESTIONS[step].id, opt.id)}
                   className="group text-left blueprint-border p-8 bg-brand-carbon hover:bg-brand-orange/10 transition-all border-brand-border hover:border-brand-orange"
                 >
                    <h4 className="font-display text-xl mb-2 text-brand-white group-hover:text-brand-white transition-colors uppercase italic">{opt.label}</h4>
                    <p className="font-sans text-brand-grey text-xs leading-relaxed">{opt.desc}</p>
                 </button>
               ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
