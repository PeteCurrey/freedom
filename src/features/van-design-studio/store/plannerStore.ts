import { create } from 'zustand';
import type { 
  PlannerState, 
  PlannerMode, 
  PlacedComponent, 
  Chassis, 
  ComponentDefinition,
  BedConfig,
  MattressSize
} from '../types';
import { CHASSIS_DATA, DEFAULT_CHASSIS_ID } from '../data/chassisData';
import { COMPONENT_LIBRARY, FIXED_BED_ID } from '../data/componentLibrary';
import { MATTRESS_PRESETS, getChassisFitStatus } from '../data/mattressPresets';
import { computeTotals } from '../utils/buildCalculations';
import { computeWarnings } from './warningsEngine';
import { calculateFixedBedFit } from '../utils/canvasUtils';

interface PlannerActions {
  setProjectName: (name: string) => void;
  setMode: (mode: PlannerMode) => void;
  selectChassis: (chassisId: string) => void;
  addComponent: (componentId: string) => void;
  updateComponentPosition: (instanceId: string, x: number, y: number) => void;
  rotateComponent: (instanceId: string) => void;
  deleteComponent: (instanceId: string) => void;
  duplicateComponent: (instanceId: string) => void;
  selectComponent: (instanceId: string | null) => void;
  updateBedConfig: (instanceId: string, config: Partial<BedConfig>) => void;
  toggleSmartIdea: (ideaId: string) => void;
  pulseComponent: (instanceId: string) => void;
  resetProject: () => void;
  toggleBomDrawer: () => void;
  refreshDerivedState: () => void;
}

const STORAGE_KEY = 'amplios-van-planner-state';

export const usePlannerStore = create<PlannerState & PlannerActions>((set, get) => ({
  // Initial State
  projectName: 'My Dream Van',
  selectedChassisId: DEFAULT_CHASSIS_ID,
  activeMode: 'layout',
  placedComponents: [],
  selectedPlacedComponentId: null,
  pulsingComponentIds: [],
  isBomDrawerOpen: false,
  selectedSmartIdeas: [],
  projectTotals: computeTotals([], DEFAULT_CHASSIS_ID, []),
  warnings: [],

  // Actions
  setProjectName: (projectName) => set({ projectName }),
  
  setMode: (activeMode) => set({ activeMode }),

  toggleBomDrawer: () => set((state) => ({ isBomDrawerOpen: !state.isBomDrawerOpen })),

  selectChassis: (selectedChassisId) => {
    const chassis = CHASSIS_DATA.find(c => c.id === selectedChassisId);
    if (!chassis) return;

    // Update fixed bed if it exists
    const updatedComponents = get().placedComponents.map(pc => {
      if (pc.componentId === FIXED_BED_ID) {
        const fit = calculateFixedBedFit(chassis.internalWidthMm, chassis.internalLengthMm, pc.depthMm);
        const fitStatus = getChassisFitStatus(pc.widthMm, chassis.internalWidthMm);
        return {
          ...pc,
          x: fit.x,
          y: fit.y,
          customConfig: pc.customConfig ? {
            ...pc.customConfig,
            chassisFitStatus: fitStatus.status
          } : undefined
        };
      }
      return pc;
    });

    set({ selectedChassisId, placedComponents: updatedComponents });
    get().refreshDerivedState();
  },

  addComponent: (componentId) => {
    const def = COMPONENT_LIBRARY.find(d => d.id === componentId);
    if (!def) return;

    const chassis = CHASSIS_DATA.find(c => c.id === get().selectedChassisId);
    if (!chassis) return;

    const instanceId = crypto.randomUUID();
    let newComponent: PlacedComponent;

    if (componentId === FIXED_BED_ID) {
      const fit = calculateFixedBedFit(chassis.internalWidthMm, chassis.internalLengthMm, def.depthMm);
      const fitStatus = getChassisFitStatus(def.widthMm, chassis.internalWidthMm);
      newComponent = {
        instanceId,
        componentId,
        x: fit.x,
        y: fit.y,
        rotation: 0,
        widthMm: def.widthMm,
        depthMm: def.depthMm,
        heightMm: def.heightMm,
        notes: '',
        customConfig: {
          mattressSize: 'double',
          pullOutEnabled: false,
          pullOutExtensionMm: 350,
          selectedSpaceSavingIdeas: [],
          fittedToChassisWidth: true,
          chassisFitStatus: fitStatus.status
        }
      };
    } else {
      newComponent = {
        instanceId,
        componentId,
        x: 100, // Default start pos
        y: 100,
        rotation: 0,
        widthMm: def.widthMm,
        depthMm: def.depthMm,
        heightMm: def.heightMm,
        notes: ''
      };
    }

    set((state) => ({ 
      placedComponents: [...state.placedComponents, newComponent],
      selectedPlacedComponentId: instanceId
    }));
    get().refreshDerivedState();
  },

  updateComponentPosition: (instanceId, x, y) => {
    set((state) => ({
      placedComponents: state.placedComponents.map(pc => 
        pc.instanceId === instanceId ? { ...pc, x, y } : pc
      )
    }));
    get().refreshDerivedState();
  },

  rotateComponent: (instanceId) => {
    set((state) => ({
      placedComponents: state.placedComponents.map(pc => {
        if (pc.instanceId === instanceId) {
          // Swap width and depth for 90 deg rotation
          return { 
            ...pc, 
            rotation: (pc.rotation + 90) % 360,
            widthMm: pc.depthMm,
            depthMm: pc.widthMm
          };
        }
        return pc;
      })
    }));
    get().refreshDerivedState();
  },

  deleteComponent: (instanceId) => {
    set((state) => ({
      placedComponents: state.placedComponents.filter(pc => pc.instanceId !== instanceId),
      selectedPlacedComponentId: state.selectedPlacedComponentId === instanceId ? null : state.selectedPlacedComponentId
    }));
    get().refreshDerivedState();
  },

  duplicateComponent: (instanceId) => {
    const original = get().placedComponents.find(pc => pc.instanceId === instanceId);
    if (!original) return;

    const newComponent = {
      ...original,
      instanceId: crypto.randomUUID(),
      x: original.x + 20,
      y: original.y + 20
    };

    set((state) => ({ 
      placedComponents: [...state.placedComponents, newComponent],
      selectedPlacedComponentId: newComponent.instanceId
    }));
    get().refreshDerivedState();
  },

  selectComponent: (id) => set({ selectedPlacedComponentId: id }),

  updateBedConfig: (instanceId, config) => {
    const chassis = CHASSIS_DATA.find(c => c.id === get().selectedChassisId);
    
    set((state) => ({
      placedComponents: state.placedComponents.map(pc => {
        if (pc.instanceId === instanceId && pc.customConfig) {
          const newConfig = { ...pc.customConfig, ...config };
          
          // If mattress size changed, update width/fit
          let widthMm = pc.widthMm;
          if (config.mattressSize) {
            const preset = MATTRESS_PRESETS.find(m => m.id === config.mattressSize);
            if (preset) widthMm = preset.widthMm;
            if (chassis) {
              newConfig.chassisFitStatus = getChassisFitStatus(widthMm, chassis.internalWidthMm).status;
            }
          }

          return { ...pc, widthMm, customConfig: newConfig };
        }
        return pc;
      })
    }));
    get().refreshDerivedState();
  },

  toggleSmartIdea: (ideaId) => {
    set((state) => {
      const ideas = state.selectedSmartIdeas.includes(ideaId)
        ? state.selectedSmartIdeas.filter(id => id !== ideaId)
        : [...state.selectedSmartIdeas, ideaId];
      return { selectedSmartIdeas: ideas };
    });
    get().refreshDerivedState();
  },

  pulseComponent: (instanceId) => {
    set((state) => ({ pulsingComponentIds: [...state.pulsingComponentIds, instanceId] }));
    setTimeout(() => {
      set((state) => ({ 
        pulsingComponentIds: state.pulsingComponentIds.filter(id => id !== instanceId) 
      }));
    }, 1800);
  },

  resetProject: () => {
    set({
      projectName: 'My Dream Van',
      selectedChassisId: DEFAULT_CHASSIS_ID,
      activeMode: 'layout',
      placedComponents: [],
      selectedPlacedComponentId: null,
      pulsingComponentIds: [],
      isBomDrawerOpen: false,
      selectedSmartIdeas: [],
      projectTotals: computeTotals([], DEFAULT_CHASSIS_ID, []),
      warnings: []
    });
    localStorage.removeItem(STORAGE_KEY);
  },

  // Internal Helper to update totals and warnings
  refreshDerivedState: () => {
    const state = get();
    const totals = computeTotals(state.placedComponents, state.selectedChassisId, state.selectedSmartIdeas);
    set({ projectTotals: totals });
    const warnings = computeWarnings(get());
    set({ warnings });
    
    // Auto-save
    const saveState = {
      projectName: get().projectName,
      selectedChassisId: get().selectedChassisId,
      placedComponents: get().placedComponents,
      selectedSmartIdeas: get().selectedSmartIdeas
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saveState));
  }
}));

// Initialize from LocalStorage
if (typeof window !== 'undefined') {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      usePlannerStore.setState(parsed);
      // Force a refresh of totals/warnings after loading
      setTimeout(() => {
        const state = usePlannerStore.getState() as any;
        state.refreshDerivedState();
      }, 0);
    } catch (e) {
      console.error('Failed to load saved van project', e);
    }
  }
}
