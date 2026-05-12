"use client";

import React from 'react';
import { usePlannerStore } from '../store/plannerStore';
import { AlertTriangle, X } from 'lucide-react';

interface ResetProjectDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResetProjectDialog({ isOpen, onClose }: ResetProjectDialogProps) {
  const resetProject = usePlannerStore((state) => state.resetProject);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-[#E8E6E1] animate-in zoom-in-95 duration-300">
        <div className="p-8 space-y-6">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-red-50 rounded-2xl">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <button onClick={onClose} className="p-2 hover:bg-[#F4F3F0] rounded-xl transition-colors">
              <X className="w-5 h-5 text-[#6B6860]" />
            </button>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold text-[#1A1917] tracking-tight">Reset Project?</h3>
            <p className="text-sm text-[#6B6860] leading-relaxed">
              This will permanently delete all placed components, chassis selection, and configuration. This action cannot be undone.
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <button 
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-[#F4F3F0] hover:bg-[#E8E6E1] text-[#1A1917] rounded-2xl transition-all text-xs font-bold uppercase tracking-widest"
            >
              Cancel
            </button>
            <button 
              onClick={() => {
                resetProject();
                onClose();
              }}
              className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-2xl transition-all text-xs font-bold uppercase tracking-widest shadow-lg shadow-red-100"
            >
              Reset Everything
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
