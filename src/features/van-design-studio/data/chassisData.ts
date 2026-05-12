import type { Chassis } from '../types';

// IMPORTANT: All dimensions and weights below are PROVISIONAL SAMPLE DATA.
// Replace with verified manufacturer specification data before commercial use.

export const CHASSIS_DATA: Chassis[] = [
  { id: 'ducato-l2h2', manufacturer: 'Fiat', model: 'Ducato', variant: 'L2H2', wheelbase: 'L2', roofHeight: 'H2', internalLengthMm: 2820, internalWidthMm: 1765, internalHeightMm: 1850, grossVehicleWeightKg: 3500, kerbWeightKg: 1780, payloadKg: 1000, notes: 'Medium wheelbase, high roof. Popular UK conversion base.' },
  { id: 'ducato-l3h2', manufacturer: 'Fiat', model: 'Ducato', variant: 'L3H2', wheelbase: 'L3', roofHeight: 'H2', internalLengthMm: 3450, internalWidthMm: 1765, internalHeightMm: 1850, grossVehicleWeightKg: 3500, kerbWeightKg: 1830, payloadKg: 950, notes: 'Long wheelbase, high roof. Excellent for full motorhome conversions.' },
  { id: 'ducato-l4h2', manufacturer: 'Fiat', model: 'Ducato', variant: 'L4H2', wheelbase: 'L4', roofHeight: 'H2', internalLengthMm: 4035, internalWidthMm: 1765, internalHeightMm: 1850, grossVehicleWeightKg: 3500, kerbWeightKg: 1880, payloadKg: 900, notes: 'Extra long wheelbase. Maximum load space for full builds.' },
  { id: 'boxer-l2h2', manufacturer: 'Peugeot', model: 'Boxer', variant: 'L2H2', wheelbase: 'L2', roofHeight: 'H2', internalLengthMm: 2820, internalWidthMm: 1765, internalHeightMm: 1850, grossVehicleWeightKg: 3500, kerbWeightKg: 1785, payloadKg: 995, notes: 'Shares X290 platform with Fiat Ducato and Citroën Relay.' },
  { id: 'boxer-l3h2', manufacturer: 'Peugeot', model: 'Boxer', variant: 'L3H2', wheelbase: 'L3', roofHeight: 'H2', internalLengthMm: 3450, internalWidthMm: 1765, internalHeightMm: 1850, grossVehicleWeightKg: 3500, kerbWeightKg: 1835, payloadKg: 945, notes: 'Long wheelbase high roof. Popular conversion choice.' },
  { id: 'boxer-l4h2', manufacturer: 'Peugeot', model: 'Boxer', variant: 'L4H2', wheelbase: 'L4', roofHeight: 'H2', internalLengthMm: 4035, internalWidthMm: 1765, internalHeightMm: 1850, grossVehicleWeightKg: 3500, kerbWeightKg: 1885, payloadKg: 895, notes: 'Extra long wheelbase for maximum build space.' },
  { id: 'relay-l2h2', manufacturer: 'Citroën', model: 'Relay', variant: 'L2H2', wheelbase: 'L2', roofHeight: 'H2', internalLengthMm: 2820, internalWidthMm: 1765, internalHeightMm: 1850, grossVehicleWeightKg: 3500, kerbWeightKg: 1785, payloadKg: 995, notes: 'Identical platform to Boxer and Ducato.' },
  { id: 'relay-l3h2', manufacturer: 'Citroën', model: 'Relay', variant: 'L3H2', wheelbase: 'L3', roofHeight: 'H2', internalLengthMm: 3450, internalWidthMm: 1765, internalHeightMm: 1850, grossVehicleWeightKg: 3500, kerbWeightKg: 1835, payloadKg: 945, notes: 'Long wheelbase high roof.' },
  { id: 'relay-l4h2', manufacturer: 'Citroën', model: 'Relay', variant: 'L4H2', wheelbase: 'L4', roofHeight: 'H2', internalLengthMm: 4035, internalWidthMm: 1765, internalHeightMm: 1850, grossVehicleWeightKg: 3500, kerbWeightKg: 1885, payloadKg: 895, notes: 'Extra long wheelbase.' },
  { id: 'transit-mwb', manufacturer: 'Ford', model: 'Transit', variant: 'MWB High Roof', wheelbase: 'MWB', roofHeight: 'high', internalLengthMm: 2970, internalWidthMm: 1752, internalHeightMm: 1906, grossVehicleWeightKg: 3500, kerbWeightKg: 1850, payloadKg: 1000, notes: 'Strong choice for practical UK conversions.' },
  { id: 'transit-lwb', manufacturer: 'Ford', model: 'Transit', variant: 'LWB High Roof', wheelbase: 'LWB', roofHeight: 'high', internalLengthMm: 3682, internalWidthMm: 1752, internalHeightMm: 1906, grossVehicleWeightKg: 3500, kerbWeightKg: 1920, payloadKg: 950, notes: 'Long load floor for full motorhome spec.' },
  { id: 'transit-jumbo', manufacturer: 'Ford', model: 'Transit', variant: 'Jumbo XLWB High Roof', wheelbase: 'XLWB', roofHeight: 'high', internalLengthMm: 4278, internalWidthMm: 1752, internalHeightMm: 1906, grossVehicleWeightKg: 3500, kerbWeightKg: 1980, payloadKg: 900, notes: 'Maximum internal cargo length.' },
  { id: 'sprinter-l2h2', manufacturer: 'Mercedes', model: 'Sprinter', variant: 'L2H2', wheelbase: 'L2', roofHeight: 'H2', internalLengthMm: 3200, internalWidthMm: 1765, internalHeightMm: 1860, grossVehicleWeightKg: 3500, kerbWeightKg: 1890, payloadKg: 980, notes: 'Industry benchmark for professional conversions.' },
  { id: 'sprinter-l3h2', manufacturer: 'Mercedes', model: 'Sprinter', variant: 'L3H2', wheelbase: 'L3', roofHeight: 'H2', internalLengthMm: 4020, internalWidthMm: 1765, internalHeightMm: 1860, grossVehicleWeightKg: 3500, kerbWeightKg: 1960, payloadKg: 930, notes: 'Most popular Sprinter conversion. Excellent build length.' },
  { id: 'sprinter-l4h2', manufacturer: 'Mercedes', model: 'Sprinter', variant: 'L4H2', wheelbase: 'L4', roofHeight: 'H2', internalLengthMm: 4720, internalWidthMm: 1765, internalHeightMm: 1860, grossVehicleWeightKg: 3500, kerbWeightKg: 2010, payloadKg: 880, notes: 'Maximum length for ambitious builds.' },
  { id: 'crafter-mwb', manufacturer: 'Volkswagen', model: 'Crafter', variant: 'MWB High Roof', wheelbase: 'MWB', roofHeight: 'high', internalLengthMm: 2985, internalWidthMm: 1780, internalHeightMm: 1924, grossVehicleWeightKg: 3500, kerbWeightKg: 1900, payloadKg: 960, notes: 'Slightly wider than Sprinter at bed height.' },
  { id: 'crafter-lwb', manufacturer: 'Volkswagen', model: 'Crafter', variant: 'LWB High Roof', wheelbase: 'LWB', roofHeight: 'high', internalLengthMm: 3700, internalWidthMm: 1780, internalHeightMm: 1924, grossVehicleWeightKg: 3500, kerbWeightKg: 1960, payloadKg: 910, notes: 'Premium engineering, excellent for bespoke conversions.' },
  { id: 'man-tge-mwb', manufacturer: 'MAN', model: 'TGE', variant: 'MWB High Roof', wheelbase: 'MWB', roofHeight: 'high', internalLengthMm: 2985, internalWidthMm: 1780, internalHeightMm: 1924, grossVehicleWeightKg: 3500, kerbWeightKg: 1905, payloadKg: 955, notes: 'Shares VW Crafter platform. Often overlooked, good value.' },
  { id: 'man-tge-lwb', manufacturer: 'MAN', model: 'TGE', variant: 'LWB High Roof', wheelbase: 'LWB', roofHeight: 'high', internalLengthMm: 3700, internalWidthMm: 1780, internalHeightMm: 1924, grossVehicleWeightKg: 3500, kerbWeightKg: 1965, payloadKg: 905, notes: 'Underrated platform. Strong payload credentials.' },
  { id: 'master-mwb', manufacturer: 'Renault', model: 'Master', variant: 'MWB High Roof', wheelbase: 'MWB', roofHeight: 'high', internalLengthMm: 2583, internalWidthMm: 1765, internalHeightMm: 1869, grossVehicleWeightKg: 3500, kerbWeightKg: 1840, payloadKg: 1010, notes: 'Reliable platform, good for smaller builds.' },
  { id: 'master-lwb', manufacturer: 'Renault', model: 'Master', variant: 'LWB High Roof', wheelbase: 'LWB', roofHeight: 'high', internalLengthMm: 3182, internalWidthMm: 1765, internalHeightMm: 1869, grossVehicleWeightKg: 3500, kerbWeightKg: 1890, payloadKg: 960, notes: 'Competitive payload, good value base vehicle.' },
  { id: 'iveco-daily-lwb', manufacturer: 'Iveco', model: 'Daily', variant: 'LWB High Roof', wheelbase: 'LWB', roofHeight: 'high', internalLengthMm: 4070, internalWidthMm: 1870, internalHeightMm: 1990, grossVehicleWeightKg: 3500, kerbWeightKg: 1980, payloadKg: 1270, notes: 'Widest internal cargo area in class. Exceptional payload. Ideal for heavy builds.' },
];

export function getChassisById(id: string): Chassis | undefined {
  return CHASSIS_DATA.find((c) => c.id === id);
}

export function getManufacturers(): string[] {
  return [...new Set(CHASSIS_DATA.map((c) => c.manufacturer))];
}

export function getChassisByManufacturer(manufacturer: string): Chassis[] {
  return CHASSIS_DATA.filter((c) => c.manufacturer === manufacturer);
}

export const DEFAULT_CHASSIS_ID = 'sprinter-l3h2';
