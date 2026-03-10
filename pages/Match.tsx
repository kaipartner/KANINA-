
import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { CareRequest, CareApplication, UserRole } from '../types';
import { listCareRequests, createCareRequest, applyToCareRequest, listApplicationsForMyRequests, respondToCareApplication } from '../firebase/firestore';
import { Button } from '../components/Button';

export const Match: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'explorar' | 'mis-solicitudes' | 'postulaciones'>('explorar');
  const [careRequests, setCareRequests] = useState<CareRequest[]>([]);
  const [applications, setApplications] = useState<CareApplication[]>([]);
  const [isCreating, setIsCreating] = useState(false);

  const [newRequest, setNewRequest] = useState({
    startDate: '',
    endDate: '',
    location: '',
    notes: ''
  });

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    if (activeTab === 'explorar') {
      const all = await listCareRequests();
      setCareRequests(all.filter(r => r.ownerId !== user?.uid));
    } else if (activeTab === 'mis-solicitudes') {
      const all = await listCareRequests();
      setCareRequests(all.filter(r => r.ownerId === user?.uid));
    } else {
      const apps = await listApplicationsForMyRequests(user?.uid || '');
      setApplications(apps);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await createCareRequest({
      startDate: newRequest.startDate,
      endDate: newRequest.endDate,
      notes: newRequest.notes,
      location: { lat: 0, lng: 0, address: newRequest.location },
      ownerId: user?.uid || '',
      petId: 'mock-pet-id',
      petName: 'Buba',
      petSpecies: 'dog',
      status: 'active'
    });
    setIsCreating(false);
    setActiveTab('mis-solicitudes');
  };

  const handleApply = async (req: CareRequest) => {
    await applyToCareRequest(req, user?.uid || '', user?.displayName || '');
    alert('¡Postulación enviada!');
  };

  const handleResponse = async (id: string, status: 'accepted' | 'rejected') => {
    await respondToCareApplication(id, status as any);
    loadData();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tighter">Cuidado</h2>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Matching Owner ↔ Sitter</p>
        </div>
        {user?.activeRole === UserRole.OWNER && (
          <button 
            onClick={() => setIsCreating(!isCreating)}
            className="bg-teal-500 text-white w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg shadow-teal-100"
          >
            <i className={`fa-solid ${isCreating ? 'fa-xmark' : 'fa-plus'} text-xl`}></i>
          </button>
        )}
      </div>

      <div className="flex bg-gray-100 p-1.5 rounded-2xl mb-8">
        {(['explorar', 'mis-solicitudes', 'postulaciones'] as const).map(tab => {
          // Si el usuario es sitter, solo ve explorar. Si es owner, ve todo.
          if (user?.activeRole === UserRole.SITTER && tab !== 'explorar') return null;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${
                activeTab === tab ? 'bg-white text-teal-600 shadow-sm' : 'text-gray-400'
              }`}
            >
              {tab.replace('-', ' ')}
            </button>
          );
        })}
      </div>

      {isCreating && (
        <form onSubmit={handleCreate} className="bg-teal-50 p-6 rounded-[32px] mb-8 space-y-4 border-2 border-teal-100 animate-in slide-in-from-top-4">
          <h3 className="font-black text-teal-900 uppercase text-xs tracking-widest">Solicitar Cuidador</h3>
          <div className="grid grid-cols-2 gap-3">
            <input type="date" required className="bg-white rounded-xl px-4 py-3 text-sm outline-none border-2 border-transparent focus:border-teal-400" onChange={e => setNewRequest({...newRequest, startDate: e.target.value})} />
            <input type="date" required className="bg-white rounded-xl px-4 py-3 text-sm outline-none border-2 border-transparent focus:border-teal-400" onChange={e => setNewRequest({...newRequest, endDate: e.target.value})} />
          </div>
          <input type="text" placeholder="Ubicación" required className="w-full bg-white rounded-xl px-4 py-3 text-sm outline-none border-2 border-transparent focus:border-teal-400" onChange={e => setNewRequest({...newRequest, location: e.target.value})} />
          <textarea placeholder="Detalles del cuidado y personalidad de tu animal..." className="w-full bg-white rounded-xl px-4 py-3 text-sm h-24 outline-none border-2 border-transparent focus:border-teal-400" onChange={e => setNewRequest({...newRequest, notes: e.target.value})}></textarea>
          <Button variant="secondary" type="submit" className="w-full bg-teal-600">Publicar Solicitud</Button>
        </form>
      )}

      {activeTab === 'explorar' && (
        <div className="space-y-4">
          {careRequests.map(req => (
            <div key={req.id} className="bg-white p-6 rounded-[32px] border-2 border-gray-50 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-teal-50 text-teal-500 rounded-2xl flex items-center justify-center text-xl shadow-inner">
                  <i className={`fa-solid ${req.petSpecies === 'dog' ? 'fa-dog' : 'fa-cat'}`}></i>
                </div>
                <div>
                  <h4 className="font-black text-gray-900 text-lg">{req.petName}</h4>
                  <p className="text-[10px] font-bold text-teal-500 uppercase tracking-widest">{req.location.address || "Ubicación"}</p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Desde</p>
                  <p className="text-xs font-black text-gray-700">{req.startDate}</p>
                </div>
              </div>
              <p className="text-sm text-gray-500 font-medium mb-6 line-clamp-3">"{req.notes}"</p>
              <Button 
                variant="secondary" 
                className="w-full rounded-2xl" 
                onClick={() => handleApply(req)}
                disabled={user?.activeRole !== UserRole.SITTER}
              >
                {user?.activeRole === UserRole.SITTER ? 'Postularme como Cuidador' : 'Solo Cuidadores'}
              </Button>
            </div>
          ))}
          {careRequests.length === 0 && <p className="text-center text-gray-400 py-10 font-bold uppercase text-xs">No hay solicitudes de cuidado cerca</p>}
        </div>
      )}

      {activeTab === 'postulaciones' && (
        <div className="space-y-4">
          {applications.map(app => (
            <div key={app.id} className="bg-white p-5 rounded-[32px] border-2 border-teal-50 flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-teal-500 text-xl">
                <i className="fa-solid fa-user-shield"></i>
              </div>
              <div className="flex-1">
                <p className="text-sm font-black text-gray-900 leading-tight">{app.sitterName}</p>
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Quiere cuidar a tu mascota</p>
              </div>
              {app.status === 'pending' ? (
                <div className="flex gap-2">
                  <button onClick={() => handleResponse(app.id, 'accepted')} className="w-8 h-8 bg-teal-500 text-white rounded-xl shadow-sm"><i className="fa-solid fa-check"></i></button>
                  <button onClick={() => handleResponse(app.id, 'rejected')} className="w-8 h-8 bg-red-100 text-red-400 rounded-xl"><i className="fa-solid fa-xmark"></i></button>
                </div>
              ) : (
                <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${app.status === 'accepted' ? 'bg-teal-100 text-teal-700' : 'bg-red-50 text-red-400'}`}>
                  {app.status}
                </span>
              )}
            </div>
          ))}
          {applications.length === 0 && <p className="text-center text-gray-400 py-10 font-bold uppercase text-xs">Aún no tienes postulantes</p>}
        </div>
      )}
    </div>
  );
};
