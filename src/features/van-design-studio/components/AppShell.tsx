"use client";

import React, { useEffect, useState } from 'react';
import { TopToolbar } from './TopToolbar';
import { BuildSetupPanel } from './BuildSetupPanel';
import { PlannerCanvas } from './PlannerCanvas';
import { ProjectIntelligencePanel } from './ProjectIntelligencePanel';
import { BuildListDrawer } from './BuildListDrawer';
import { ThreeDPreview } from './ThreeDPreview';
import { usePlannerStore } from '../store/plannerStore';
import { cn } from '@/lib/utils';

/**
 * Main Application Shell for the Van Design Studio.
 * Manages the high-level layout grid and mode switching.
 */
export function AppShell() {
  const activeMode = usePlannerStore((state) => state.activeMode);
  const isBomOpen = usePlannerStore((state) => state.isBomDrawerOpen);
  const [isMounted, setIsMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#F9F8F6]">
      {/* Top Toolbar - Fixed Height */}
      <TopToolbar />

      <div className="flex flex-1 overflow-hidden relative">
        {/* Left Panel - Build Setup */}
        <div className="w-[320px] border-r border-[#E8E6E1] bg-white flex flex-col z-20">
          <BuildSetupPanel />
        </div>

        {/* Central Workspace */}
        <main className="flex-1 relative bg-[#F4F3F0] overflow-hidden">
          {activeMode === '3d' ? (
            <ThreeDPreview />
          ) : (
            <PlannerCanvas />
          )}

          {/* Bottom Drawer Overlay */}
          <BuildListDrawer />
        </main>

        {/* Right Panel - Project Intelligence */}
        <div className="w-[360px] border-l border-[#E8E6E1] bg-white flex flex-col z-20 overflow-y-auto">
          <ProjectIntelligencePanel />
        </div>
      </div>

      {/* Global CSS for the Studio context to ensure standard Tailwind classes work with our light tokens */}
      <style jsx global>{`
        :root {
          --studio-bg: #F9F8F6;
          --studio-panel: #FFFFFF;
          --studio-surface: #F4F3F0;
          --studio-border: #E8E6E1;
          --studio-text: #1A1917;
          --studio-text-secondary: #6B6860;
          --studio-accent: #2563EB;
        }
        
        .light .bg-white { background-color: #FFFFFF !important; }
        .light .text-slate-500 { color: #6B6860 !important; }
        
        /* Custom scrollbar for premium feel */
        ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: #E8E6E1;
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #D1CFCA;
        }
      `}</style>
    </div>
  );
}
