"use client";

import { useState } from "react";
import { 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  AlertCircle, 
  XCircle, 
  Loader2, 
  ExternalLink,
  ShieldCheck,
  Save
} from "lucide-react";
import { cn } from "@/lib/utils";

interface IntegrationField {
  id: string;
  label: string;
  type: "text" | "password" | "file";
  placeholder?: string;
  description?: string;
  required?: boolean;
}

interface IntegrationCardProps {
  id: string;
  name: string;
  description: string;
  status: "connected" | "not_connected" | "error";
  lastSync?: string;
  fields: IntegrationField[];
  setupGuideUrl?: string;
  onSave: (id: string, data: any) => Promise<void>;
  onTest: (id: string) => Promise<boolean>;
  logo?: React.ReactNode;
}

export function IntegrationCard({ 
  id, 
  name, 
  description, 
  status, 
  lastSync, 
  fields, 
  setupGuideUrl,
  onSave,
  onTest,
  logo
}: IntegrationCardProps) {
  const [formData, setFormData] = useState<any>({});
  const [showValues, setShowValues] = useState<Record<string, boolean>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<boolean | null>(null);

  const handleToggleVisibility = (fieldId: string) => {
    setShowValues(prev => ({ ...prev, [fieldId]: !prev[fieldId] }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(id, formData);
    } finally {
      setIsSaving(false);
    }
  };

  const handleTest = async () => {
    setIsTesting(true);
    setTestResult(null);
    try {
      const success = await onTest(id);
      setTestResult(success);
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="p-6 border-b border-slate-50 flex items-start justify-between bg-slate-50/30">
        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-lg bg-white border border-slate-100 flex items-center justify-center shadow-sm shrink-0">
             {logo || <div className="text-slate-300 font-bold">{name[0]}</div>}
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">{name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className={cn(
                "text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1",
                status === 'connected' ? "bg-emerald-100 text-emerald-700" :
                status === 'error' ? "bg-red-100 text-red-700" :
                "bg-slate-100 text-slate-500"
              )}>
                {status === 'connected' && <CheckCircle2 size={10} />}
                {status === 'error' && <AlertCircle size={10} />}
                {status.replace('_', ' ')}
              </span>
              {lastSync && (
                <span className="text-[9px] text-slate-400 font-mono">Last sync: {lastSync}</span>
              )}
            </div>
          </div>
        </div>
        {setupGuideUrl && (
          <a 
            href={setupGuideUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[10px] font-bold text-brand-orange hover:underline flex items-center gap-1"
          >
            Setup Guide <ExternalLink size={10} />
          </a>
        )}
      </div>

      <div className="p-6 space-y-4">
        <p className="text-xs text-slate-500 leading-relaxed">{description}</p>
        
        <div className="space-y-4 mt-6">
          {fields.map(field => (
            <div key={field.id} className="space-y-1.5">
              <label htmlFor={`${id}-${field.id}`} className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex justify-between">
                {field.label}
                {field.required && <span className="text-red-400">*</span>}
              </label>
              
              <div className="relative group">
                <input 
                  id={`${id}-${field.id}`}
                  type={field.type === 'password' && !showValues[field.id] ? 'password' : 'text'}
                  placeholder={field.placeholder}
                  className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all font-mono"
                  onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
                />
                {field.type === 'password' && (
                  <button 
                    onClick={() => handleToggleVisibility(field.id)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showValues[field.id] ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                )}
              </div>
              {field.description && (
                <p className="text-[10px] text-slate-400">{field.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button 
            onClick={handleTest}
            disabled={isTesting}
            className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-600 hover:text-slate-900 flex items-center gap-2 transition-all disabled:opacity-50"
          >
            {isTesting ? <Loader2 size={12} className="animate-spin" /> : <ShieldCheck size={12} />}
            Test Connection
          </button>
          
          {testResult !== null && (
            <span className={cn(
              "text-[10px] font-bold flex items-center gap-1 animate-in fade-in slide-in-from-left-2",
              testResult ? "text-emerald-600" : "text-red-500"
            )}>
              {testResult ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
              {testResult ? "Success" : "Failed"}
            </span>
          )}
        </div>

        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-2 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-brand-orange transition-all flex items-center gap-2 disabled:opacity-50"
        >
          {isSaving ? <Loader2 size={12} className="animate-spin" /> : <Save size={12} />}
          Save Changes
        </button>
      </div>
    </div>
  );
}
