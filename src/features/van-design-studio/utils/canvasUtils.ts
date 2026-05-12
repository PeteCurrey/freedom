/**
 * Utilities for the 2D Canvas Planner
 * Handle conversions between mm and canvas pixels, boundary clamping, and auto-fitting logic.
 */

// We use a scale of 10mm = 1px for the canvas. 
// This means a 6000mm van is 600px long.
export const SCALE_MM_TO_PX = 0.1;

export function mmToPx(mm: number): number {
  return mm * SCALE_MM_TO_PX;
}

export function pxToMm(px: number): number {
  return px / SCALE_MM_TO_PX;
}

/**
 * Clamps a value within the van boundaries.
 * Assuming (0,0) is the top-left of the cargo area.
 */
export function clampToBoundary(
  pos: number, 
  sizePx: number, 
  boundaryPx: number
): number {
  return Math.max(0, Math.min(pos, boundaryPx - sizePx));
}

/**
 * Snap to grid logic.
 */
export function snapToGrid(value: number, gridSize: number = 10): number {
  return Math.round(value / gridSize) * gridSize;
}

/**
 * Logic for the "Smart" Fixed Bed component.
 * Automatically fits to chassis width and places it at the rear.
 */
export function calculateFixedBedFit(
  chassisWidthMm: number,
  chassisLengthMm: number,
  bedDepthMm: number // Depth in the van's length axis (y)
): { x: number; y: number; widthMm: number; depthMm: number } {
  // Bed fits across the width (internalWidthMm)
  // Position is at the rear (y = chassisLengthMm - bedDepthMm)
  return {
    x: 0,
    y: chassisLengthMm - bedDepthMm,
    widthMm: chassisWidthMm,
    depthMm: bedDepthMm
  };
}
