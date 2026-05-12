import type { SmartBedIdea } from '../types';

export const SMART_BED_IDEAS: SmartBedIdea[] = [
  { id: 'lift-up-frame', name: 'Lift-Up Bed Frame', description: 'Gas-strut assisted bed frame that lifts to reveal garage storage underneath. Clean, premium feel.', estimatedCostMin: 150, estimatedCostMax: 350, weightKg: 8, storeCategory: 'Interior & Furniture' },
  { id: 'slatted-garage', name: 'Slatted Garage Storage', description: 'Slatted wooden or aluminium base that doubles as garage storage access. Lightweight and strong.', estimatedCostMin: 80, estimatedCostMax: 200, weightKg: 5, storeCategory: 'Interior & Furniture' },
  { id: 'slide-out-extension', name: 'Slide-Out Mattress Extension', description: 'Telescopic frame that slides out to extend bed length by up to 400mm. Great for taller users.', estimatedCostMin: 200, estimatedCostMax: 500, weightKg: 12, storeCategory: 'Interior & Furniture' },
  { id: 'dinette-overlay', name: 'Dinette Overlay Bed', description: 'Boards that lay across the dinette seats and table base to create an additional sleeping area.', estimatedCostMin: 60, estimatedCostMax: 180, weightKg: 6, storeCategory: 'Interior & Furniture' },
  { id: 'drop-down-bunk', name: 'Drop-Down Bunk', description: 'Wall-mounted folding bunk that stows flat when not in use. Ideal for children or occasional guests.', estimatedCostMin: 300, estimatedCostMax: 700, weightKg: 15, storeCategory: 'Interior & Furniture' },
  { id: 'hammock-net', name: 'Hammock Storage Net', description: 'Lightweight fabric net suspended above the bed area for storing pillows, bedding and lightweight items.', estimatedCostMin: 20, estimatedCostMax: 60, weightKg: 1, storeCategory: 'Interior & Furniture' },
  { id: 'swivel-extension', name: 'Swivel-Seat Extension', description: 'Cab swivel seats that rotate to extend into the living area, creating additional lounge or bed surface.', estimatedCostMin: 200, estimatedCostMax: 600, weightKg: 10, storeCategory: 'Interior & Furniture' },
  { id: 'fold-out-bedside', name: 'Fold-Out Bedside Table', description: 'Wall-mounted fold-down bedside shelf. Folds flat when not in use. Adds practicality without taking floor space.', estimatedCostMin: 30, estimatedCostMax: 100, weightKg: 2, storeCategory: 'Interior & Furniture' },
];

export function getSmartIdeaById(id: string): SmartBedIdea | undefined {
  return SMART_BED_IDEAS.find((i) => i.id === id);
}

export function getSmartIdeasTotals(selectedIds: string[]): { totalCostMid: number; totalWeight: number } {
  const selected = SMART_BED_IDEAS.filter((i) => selectedIds.includes(i.id));
  return {
    totalCostMid: selected.reduce((acc, i) => acc + (i.estimatedCostMin + i.estimatedCostMax) / 2, 0),
    totalWeight: selected.reduce((acc, i) => acc + i.weightKg, 0),
  };
}
