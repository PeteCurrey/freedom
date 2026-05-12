import type { Warning, PlannerState, PlacedComponent, Chassis } from '../types';
import { CHASSIS_DATA } from '../data/chassisData';
import { COMPONENT_LIBRARY, FIXED_BED_ID } from '../data/componentLibrary';

/**
 * Derives warnings from the current planner state.
 */
export function computeWarnings(state: PlannerState): Warning[] {
  const warnings: Warning[] = [];
  const chassis = CHASSIS_DATA.find(c => c.id === state.selectedChassisId);
  if (!chassis) return [];

  // 1. Payload Warnings
  if (state.projectTotals.payloadStatus === 'exceeded') {
    warnings.push({
      id: 'payload-exceeded',
      title: 'Payload Exceeded',
      message: `Your added build weight (${state.projectTotals.totalWeightKg}kg) exceeds the available payload for this chassis. Remove items or choose a higher GVW vehicle.`,
      severity: 'critical',
      relatedComponentIds: [],
      canLocateOnPlan: false
    });
  } else if (state.projectTotals.payloadStatus === 'caution') {
    warnings.push({
      id: 'payload-caution',
      title: 'Low Payload Remaining',
      message: 'You have less than 150kg of payload remaining. Remember to account for water, fuel, and passengers.',
      severity: 'caution',
      relatedComponentIds: [],
      canLocateOnPlan: false
    });
  }

  // 2. Boundary Warnings
  state.placedComponents.forEach(pc => {
    const isOutside = 
      pc.x < 0 || 
      pc.y < 0 || 
      (pc.x + pc.widthMm) > chassis.internalWidthMm || 
      (pc.y + pc.depthMm) > chassis.internalLengthMm;

    if (isOutside) {
      warnings.push({
        id: `outside-boundary-${pc.instanceId}`,
        title: 'Component Outside Boundary',
        message: 'One or more components are outside the internal cargo area of the van.',
        severity: 'critical',
        relatedComponentIds: [pc.instanceId],
        canLocateOnPlan: true
      });
    }
  });

  // 3. System Missing Warnings
  const hasElectrical = state.placedComponents.some(pc => {
    const def = COMPONENT_LIBRARY.find(d => d.id === pc.componentId);
    return def?.category === 'Electrical';
  });
  if (!hasElectrical && state.placedComponents.length > 5) {
    warnings.push({
      id: 'missing-electrical',
      title: 'No Electrical System',
      message: 'You have added several components but no electrical system. Consider adding a leisure battery and fuse board.',
      severity: 'info',
      relatedComponentIds: [],
      canLocateOnPlan: false
    });
  }

  // 4. Fixed Bed Warnings
  const fixedBed = state.placedComponents.find(pc => pc.componentId === FIXED_BED_ID);
  if (fixedBed && fixedBed.customConfig) {
    if (fixedBed.customConfig.chassisFitStatus === 'tight' || fixedBed.customConfig.chassisFitStatus === 'requires-custom') {
      warnings.push({
        id: 'bed-fit-issue',
        title: 'Bed Fit Warning',
        message: 'The selected mattress size may not fit comfortably across this chassis width. Consider custom trimming or lengthways layout.',
        severity: 'caution',
        relatedComponentIds: [fixedBed.instanceId],
        canLocateOnPlan: true
      });
    }
    if (fixedBed.customConfig.pullOutEnabled) {
      warnings.push({
        id: 'pullout-clearance',
        title: 'Pull-out Clearance',
        message: 'The pull-out mattress extension may reduce central walkway clearance when extended.',
        severity: 'info',
        relatedComponentIds: [fixedBed.instanceId],
        canLocateOnPlan: true
      });
    }
  }

  return warnings;
}
