import type { PlacedComponent, ProjectTotals, Chassis, PayloadStatus } from '../types';
import { CHASSIS_DATA } from '../data/chassisData';
import { COMPONENT_LIBRARY } from '../data/componentLibrary';
import { getSmartIdeasTotals } from '../data/smartBedIdeas';

/**
 * Compute total weight, cost, and payload status for the project.
 */
export function computeTotals(
  placedComponents: PlacedComponent[],
  selectedChassisId: string,
  selectedSmartIdeas: string[]
): ProjectTotals {
  const chassis = CHASSIS_DATA.find(c => c.id === selectedChassisId);
  
  let totalWeightKg = 0;
  let totalCost = 0;

  placedComponents.forEach(pc => {
    const def = COMPONENT_LIBRARY.find(d => d.id === pc.componentId);
    if (def) {
      totalWeightKg += def.weightKg;
      totalCost += def.estimatedCost;
    }
  });

  // Add smart ideas weight and cost
  const smartTotals = getSmartIdeasTotals(selectedSmartIdeas);
  totalWeightKg += smartTotals.totalWeight;
  totalCost += smartTotals.totalCostMid;

  const gvw = chassis?.grossVehicleWeightKg || 3500;
  const kerbWeight = chassis?.kerbWeightKg || 2000;
  const initialPayload = chassis?.payloadKg || (gvw - kerbWeight);
  
  const remainingPayloadKg = initialPayload - totalWeightKg;
  const payloadPercentageUsed = (totalWeightKg / initialPayload) * 100;

  let payloadStatus: PayloadStatus = 'healthy';
  if (remainingPayloadKg < 0) {
    payloadStatus = 'exceeded';
  } else if (remainingPayloadKg < 150) {
    payloadStatus = 'caution';
  }

  // Zone Weight Calculation (Simulated)
  // Assuming y-axis is the length of the van.
  const chassisLength = chassis?.internalLengthMm || 3000;
  const zoneWeights = { front: 0, middle: 0, rear: 0 };
  
  placedComponents.forEach(pc => {
    const def = COMPONENT_LIBRARY.find(d => d.id === pc.componentId);
    if (!def) return;
    
    if (pc.y < chassisLength / 3) {
      zoneWeights.front += def.weightKg;
    } else if (pc.y < (chassisLength / 3) * 2) {
      zoneWeights.middle += def.weightKg;
    } else {
      zoneWeights.rear += def.weightKg;
    }
  });

  return {
    totalWeightKg,
    totalCost,
    componentCount: placedComponents.length,
    payloadStatus,
    remainingPayloadKg,
    payloadPercentageUsed,
    averageCostPerComponent: placedComponents.length > 0 ? totalCost / placedComponents.length : 0,
    zoneWeights
  };
}
