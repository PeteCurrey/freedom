import type { MattressPreset } from '../types';

export const MATTRESS_PRESETS: MattressPreset[] = [
  { id: 'single', label: 'Single', widthMm: 900, lengthMm: 1900, description: 'Standard single. Ideal for solo travellers. Suits all chassis widths comfortably.' },
  { id: 'small-double', label: 'Small Double', widthMm: 1200, lengthMm: 1900, description: 'Popular compromise for couples. Fits most chassis without modification.' },
  { id: 'double', label: 'Double', widthMm: 1350, lengthMm: 1900, description: 'True double width. Fits most LWB and L3/L4 chassis across the width.' },
  { id: 'king', label: 'King', widthMm: 1500, lengthMm: 2000, description: 'King size. May require custom trimming on narrower chassis. Check fit hint below.' },
  { id: 'super-king', label: 'Super King', widthMm: 1800, lengthMm: 2000, description: 'Super king — widest option. Typically laid lengthways only or requires custom build.' },
];

export function getMattressById(id: string): MattressPreset | undefined {
  return MATTRESS_PRESETS.find((m) => m.id === id);
}

export function getChassisFitStatus(mattressWidthMm: number, chassisInternalWidthMm: number): {
  status: 'comfortable' | 'close' | 'tight' | 'requires-custom';
  hint: string;
} {
  const margin = chassisInternalWidthMm - mattressWidthMm;
  if (margin >= 300) return { status: 'comfortable', hint: 'Fits comfortably across this chassis width with good walkway clearance.' };
  if (margin >= 150) return { status: 'close', hint: 'This mattress size is close to the available internal width. Consider trim finishing.' };
  if (margin >= 0) return { status: 'tight', hint: 'Tight fit. This option may require custom trimming or a lengthways layout.' };
  return { status: 'requires-custom', hint: 'This mattress width exceeds the chassis internal width. A custom or lengthways configuration is required.' };
}
