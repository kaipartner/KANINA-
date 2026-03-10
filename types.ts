
export enum UserRole {
  OWNER = 'owner',
  SITTER = 'sitter',
  BUSINESS = 'business',
  ADMIN = 'admin'
}

export type PetSpecies = 'dog' | 'cat' | 'other';
export type EnergyLevel = 'low' | 'medium' | 'high';
export type MatchStatus = 'pending' | 'accepted' | 'rejected' | 'cancelled';

export interface LocationData {
  lat: number;
  lng: number;
  address?: string;
  geohash?: string;
}

export interface Pet {
  id: string;
  ownerId: string;
  name: string;
  species: PetSpecies;
  otherSpeciesLabel?: string;
  breed?: string;
  age: number;
  weight?: number;
  personality?: string[];
  photoUrl?: string;
  notes?: string;
  energyLevel?: EnergyLevel;
  size?: 'small' | 'medium' | 'large';
  healthInfo?: {
    lastVaccine?: string;
    medicalHistory?: string;
  };
  healthWallet?: {
    vaccines: any[];
    history: any[];
  };
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  roles: UserRole[];
  activeRole: UserRole;
  marketingOptIn: boolean;
  subscriptionActive: boolean;
  createdAt: number;
}

export interface AuthState {
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
}

export interface WalkPlan {
  id: string;
  ownerId: string;
  petId: string;
  petName: string;
  petSpecies: PetSpecies;
  title: string;
  date: string;
  time: string;
  location: LocationData;
  description: string;
  energyLevel: EnergyLevel;
  status: 'active' | 'completed' | 'cancelled';
  createdAt: number;
}

export interface WalkRequest {
  id: string;
  planId: string;
  requesterId: string;
  requesterName: string;
  ownerId: string;
  status: MatchStatus;
  createdAt: number;
}

export interface CareRequest {
  id: string;
  ownerId: string;
  petId: string;
  petName: string;
  petSpecies: PetSpecies;
  startDate: string;
  endDate: string;
  location: LocationData;
  notes: string;
  status: 'active' | 'filled' | 'cancelled';
  createdAt: number;
}

export interface CareApplication {
  id: string;
  requestId: string;
  sitterId: string;
  sitterName: string;
  ownerId: string;
  status: MatchStatus;
  createdAt: number;
}

export interface Conversation {
  id: string;
  participants: string[];
  type: 'care' | 'walk' | 'direct';
  relatedId?: string; // requestId or planId
  lastMessage?: string;
  updatedAt: number;
}

export interface Report {
  id: string;
  reporterId: string;
  targetId: string;
  targetType: 'user' | 'plan' | 'care';
  reason: string;
  createdAt: number;
}
