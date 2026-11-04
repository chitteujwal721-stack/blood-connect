/**
 * BloodConnect Standard Clinical Types
 */

export type BloodGroup = 'A' | 'B' | 'AB' | 'O';
export type RhFactor = 'POSITIVE' | 'NEGATIVE';

export type BloodType = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export type BloodComponent =
  | 'WHOLE_BLOOD'
  | 'PACKED_RED_CELLS'
  | 'PLATELETS'
  | 'FRESH_FROZEN_PLASMA'
  | 'CRYOPRECIPITATE';

export type RequestUrgency = 'ROUTINE' | 'URGENT' | 'EMERGENCY_CRITICAL';

export type RequestStatus =
  | 'PENDING'
  | 'MATCHING'
  | 'FULFILLED'
  | 'PARTIALLY_FULFILLED'
  | 'CANCELLED';

export interface BloodCompatibilityMatrix {
  canDonateTo: BloodType[];
  canReceiveFrom: BloodType[];
}

export const BLOOD_TYPES: readonly BloodType[] = [
  'A+',
  'A-',
  'B+',
  'B-',
  'AB+',
  'AB-',
  'O+',
  'O-',
] as const;

export const BLOOD_COMPONENTS: readonly BloodComponent[] = [
  'WHOLE_BLOOD',
  'PACKED_RED_CELLS',
  'PLATELETS',
  'FRESH_FROZEN_PLASMA',
  'CRYOPRECIPITATE',
] as const;

