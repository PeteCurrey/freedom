// =============================================================================
// Amplios Van Design Studio — Type Definitions
// =============================================================================

export type PlannerMode = 'layout' | 'electrical' | 'plumbing' | 'weight' | 'bom' | '3d';

export type WarningSeverity = 'info' | 'caution' | 'critical';

export type PayloadStatus = 'healthy' | 'caution' | 'exceeded';

export type ComponentCategory =
  | 'Sleeping'
  | 'Kitchen'
  | 'Storage'
  | 'Electrical'
  | 'Plumbing'
  | 'Heating'
  | 'Appliances'
  | 'Safety'
  | 'Seating';

export type SystemType = 'electrical' | 'plumbing' | 'structural' | 'safety' | 'general';

export type MattressSize = 'single' | 'small-double' | 'double' | 'king' | 'super-king';

// -----------------------------------------------------------------------------
// Chassis
// -----------------------------------------------------------------------------

export interface Chassis {
  id: string;
  manufacturer: string;
  model: string;
  variant: string;
  wheelbase: 'SWB' | 'MWB' | 'LWB' | 'XLWB' | 'L2' | 'L3' | 'L4';
  roofHeight: 'H1' | 'H2' | 'H3' | 'low' | 'medium' | 'high';
  /** PROVISIONAL — replace with verified manufacturer data */
  internalLengthMm: number;
  /** PROVISIONAL — replace with verified manufacturer data */
  internalWidthMm: number;
  /** PROVISIONAL — replace with verified manufacturer data */
  internalHeightMm: number;
  /** PROVISIONAL — replace with verified manufacturer data */
  grossVehicleWeightKg: number;
  /** PROVISIONAL — replace with verified manufacturer data */
  kerbWeightKg: number;
  /** PROVISIONAL — replace with verified manufacturer data */
  payloadKg: number;
  notes?: string;
}

// -----------------------------------------------------------------------------
// Component Library
// -----------------------------------------------------------------------------

export interface ComponentDefinition {
  id: string;
  name: string;
  category: ComponentCategory;
  widthMm: number;
  depthMm: number;
  heightMm: number;
  weightKg: number;
  estimatedCost: number;
  systemType: SystemType;
  storeCategory: string;
  description: string;
  defaultPlacement: 'rear' | 'front' | 'middle' | 'side' | 'any';
  defaultHeightMm: number;
}

// -----------------------------------------------------------------------------
// Placed Component (canvas instance)
// -----------------------------------------------------------------------------

export interface BedConfig {
  mattressSize: MattressSize;
  pullOutEnabled: boolean;
  pullOutExtensionMm: number;
  selectedSpaceSavingIdeas: string[];
  fittedToChassisWidth: boolean;
  chassisFitStatus: 'comfortable' | 'close' | 'tight' | 'requires-custom';
}

export interface PlacedComponent {
  instanceId: string;
  componentId: string;
  x: number;
  y: number;
  rotation: number; // degrees: 0, 90, 180, 270
  widthMm: number;
  depthMm: number;
  heightMm: number;
  notes: string;
  customConfig?: BedConfig;
}

// -----------------------------------------------------------------------------
// Warnings
// -----------------------------------------------------------------------------

export interface Warning {
  id: string;
  title: string;
  message: string;
  severity: WarningSeverity;
  relatedComponentIds: string[]; // instanceIds
  canLocateOnPlan: boolean;
}

// -----------------------------------------------------------------------------
// Totals
// -----------------------------------------------------------------------------

export interface ProjectTotals {
  totalWeightKg: number;
  totalCost: number;
  componentCount: number;
  payloadStatus: PayloadStatus;
  remainingPayloadKg: number;
  payloadPercentageUsed: number;
  averageCostPerComponent: number;
  zoneWeights: {
    front: number;
    middle: number;
    rear: number;
  };
}

// -----------------------------------------------------------------------------
// Smart Bed Ideas
// -----------------------------------------------------------------------------

export interface SmartBedIdea {
  id: string;
  name: string;
  description: string;
  estimatedCostMin: number;
  estimatedCostMax: number;
  weightKg: number;
  storeCategory: string;
}

// -----------------------------------------------------------------------------
// Mattress Presets
// -----------------------------------------------------------------------------

export interface MattressPreset {
  id: MattressSize;
  label: string;
  widthMm: number;
  lengthMm: number;
  description: string;
}

// -----------------------------------------------------------------------------
// Planner State Shape (for Zustand)
// -----------------------------------------------------------------------------

export interface PlannerState {
  selectedChassisId: string;
  activeMode: PlannerMode;
  projectName: string;
  placedComponents: PlacedComponent[];
  selectedPlacedComponentId: string | null;
  pulsingComponentIds: string[];
  projectTotals: ProjectTotals;
  warnings: Warning[];
  isBomDrawerOpen: boolean;
  selectedSmartIdeas: string[];
}
