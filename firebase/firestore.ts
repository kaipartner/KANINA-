
import { 
  WalkPlan, WalkRequest, CareRequest, CareApplication, 
  MatchStatus, Conversation 
} from '../types';
import { encodeGeohash, isWithinBounds } from '../lib/geo';

// Simulación de Firestore con Geohashing
const mockDB = {
  walkPlans: [
    {
      id: 'p1',
      ownerId: 'other',
      petId: 'pet-rocky-123',
      petName: 'Rocky',
      petSpecies: 'dog',
      title: 'Paseo Mañanero',
      description: 'Paseo tranquilo por el parque.',
      date: '2023-11-20',
      time: '10:00',
      energyLevel: 'low',
      location: { 
        lat: 40.4168, 
        lng: -3.7038, 
        geohash: encodeGeohash(40.4168, -3.7038) 
      },
      status: 'active',
      createdAt: Date.now()
    }
  ] as WalkPlan[],
  careRequests: [
    {
      id: 'c1',
      ownerId: 'other2',
      petId: 'pet-luna-456',
      petName: 'Luna',
      petSpecies: 'cat',
      startDate: '2023-11-25',
      endDate: '2023-11-28',
      notes: 'Necesito que alguien pase a darle de comer.',
      location: { 
        lat: 40.4233, 
        lng: -3.7121, 
        geohash: encodeGeohash(40.4233, -3.7121) 
      },
      status: 'active',
      createdAt: Date.now()
    }
  ] as CareRequest[],
  walkRequests: [] as WalkRequest[],
  careApplications: [] as CareApplication[],
  conversations: [] as Conversation[]
};

export const createWalkPlan = async (plan: Omit<WalkPlan, 'id' | 'createdAt'>): Promise<string> => {
  const id = Math.random().toString(36).substr(2, 9);
  const geohash = encodeGeohash(plan.location.lat, plan.location.lng);
  const newPlan = { 
    ...plan, 
    id, 
    location: { ...plan.location, geohash },
    createdAt: Date.now() 
  } as WalkPlan;
  mockDB.walkPlans.push(newPlan);
  return id;
};

export const queryWalkPlansInBounds = async (bounds: any): Promise<WalkPlan[]> => {
  return mockDB.walkPlans.filter(p => 
    p.status === 'active' && isWithinBounds(p.location.lat, p.location.lng, bounds)
  );
};

export const createCareRequest = async (request: Omit<CareRequest, 'id' | 'createdAt'>): Promise<string> => {
  const id = Math.random().toString(36).substr(2, 9);
  const geohash = encodeGeohash(request.location.lat, request.location.lng);
  const newReq = { 
    ...request, 
    id, 
    location: { ...request.location, geohash },
    createdAt: Date.now() 
  } as CareRequest;
  mockDB.careRequests.push(newReq);
  return id;
};

export const listCareRequests = async (): Promise<CareRequest[]> => {
  return mockDB.careRequests.filter(r => r.status === 'active');
};

export const queryCareRequestsInBounds = async (bounds: any): Promise<CareRequest[]> => {
  return mockDB.careRequests.filter(r => 
    r.status === 'active' && isWithinBounds(r.location.lat, r.location.lng, bounds)
  );
};

export const applyToCareRequest = async (request: CareRequest, sitterId: string, sitterName: string): Promise<string> => {
  const id = Math.random().toString(36).substr(2, 9);
  const application: CareApplication = {
    id,
    requestId: request.id,
    sitterId,
    sitterName,
    ownerId: request.ownerId,
    status: 'pending',
    createdAt: Date.now()
  };
  mockDB.careApplications.push(application);
  return id;
};

export const listApplicationsForMyRequests = async (ownerId: string): Promise<CareApplication[]> => {
  return mockDB.careApplications.filter(a => a.ownerId === ownerId);
};

export const respondToCareApplication = async (applicationId: string, status: MatchStatus): Promise<void> => {
  const app = mockDB.careApplications.find(a => a.id === applicationId);
  if (app) {
    app.status = status;
    if (status === 'accepted') {
      await createConversation([app.ownerId, app.sitterId], 'care', app.requestId);
    }
  }
};

export const createConversation = async (participants: string[], type: 'care' | 'walk' | 'direct', relatedId?: string): Promise<string> => {
  const id = Math.random().toString(36).substr(2, 9);
  mockDB.conversations.push({ id, participants, type, relatedId, updatedAt: Date.now() });
  return id;
};
