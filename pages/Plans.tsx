
import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { WalkPlan, WalkRequest } from '../types';
import { queryWalkPlansInBounds, createWalkPlan } from '../firebase/firestore';
import { MapView } from '../components/MapView';
import { LocationPicker } from '../components/LocationPicker';
import { Button } from '../components/Button';

// Declare google namespace
declare var google: any;

export const Plans: React.FC = () => {
  const { user } = useAuth();
  const [activeView, setActiveView] = useState<'map' | 'list'>('map');
  const [plans, setPlans] = useState<WalkPlan[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [mapBounds, setMapBounds] = useState<any>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number, lng: number } | undefined>();

  const [newPlan, setNewPlan] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    energyLevel: 'medium' as any,
    location: { lat: 0, lng: 0 }
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
    }, (err) => {
      console.warn("Geolocation denied, using default center.");
    });
  }, []);

  const fetchPlans = async () => {
    const results = await queryWalkPlansInBounds(mapBounds);
    setPlans(results);
  };

  const handleLocationSelect = (lat: number, lng: number) => {
    setNewPlan(prev => ({ ...prev, location: { lat, lng } }));
    setShowPicker(false);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await createWalkPlan({
      title: newPlan.title,
      description: newPlan.description,
      date: newPlan.date,
      time: newPlan.time,
      energyLevel: newPlan.energyLevel,
      location: { lat: newPlan.location.lat, lng: newPlan.location.lng },
      ownerId: user?.uid || '',
      petId: 'mock-pet',
      petName: 'Buba',
      petSpecies: 'dog',
      status: 'active'
    });
    setIsCreating(false);
    fetchPlans();
  };

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Search Header */}
      <div className="absolute top-4 left-6 right-6 z-20 flex flex-col gap-2">
        <div className="flex gap-2">
          <div className="flex-1 bg-white/90 backdrop-blur-md px-5 py-4 rounded-[24px] shadow-xl flex items-center gap-3 border border-white">
            <i className="fa-solid fa-magnifying-glass text-gray-400"></i>
            <input type="text" placeholder="Buscar paseos cerca..." className="bg-transparent outline-none w-full text-sm font-bold" />
          </div>
          <button 
            onClick={() => setIsCreating(true)}
            className="w-14 h-14 bg-orange-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-orange-200 active:scale-95 transition-all"
          >
            <i className="fa-solid fa-plus text-xl"></i>
          </button>
        </div>
        <button 
          onClick={fetchPlans}
          className="mx-auto bg-gray-900 text-white text-[9px] font-black uppercase tracking-[0.2em] px-6 py-2 rounded-full shadow-lg flex items-center gap-2 hover:bg-orange-500 transition-colors"
        >
          <i className="fa-solid fa-arrows-rotate"></i>
          Buscar en esta zona
        </button>
      </div>

      {/* Main Map Content */}
      <div className="flex-1">
        <MapView 
          center={userLocation}
          onBoundsChange={setMapBounds}
          markers={plans.map(p => ({
            id: p.id,
            lat: p.location.lat,
            lng: p.location.lng,
            title: p.title,
            type: p.petSpecies as any
          }))}
        />
      </div>

      {/* Quick Access List Drawer */}
      <div className="bg-white rounded-t-[40px] shadow-2xl p-6 min-h-[120px] max-h-[40vh] overflow-y-auto border-t">
        <div className="w-12 h-1.5 bg-gray-100 rounded-full mx-auto mb-6"></div>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-black text-gray-900 tracking-tight">Cerca de ti</h3>
          <span className="text-[10px] font-black bg-orange-50 text-orange-500 px-3 py-1 rounded-full uppercase">{plans.length} Planes</span>
        </div>
        <div className="space-y-4">
          {plans.map(plan => (
            <div key={plan.id} className="bg-gray-50/50 p-4 rounded-3xl flex items-center gap-4 group">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-orange-500 text-xl shadow-sm group-hover:bg-orange-500 group-hover:text-white transition-all">
                <i className={`fa-solid ${plan.petSpecies === 'dog' ? 'fa-dog' : 'fa-paw'}`}></i>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-black text-gray-800 tracking-tight">{plan.title}</h4>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{plan.date} • {plan.time}</p>
              </div>
              <button className="bg-gray-900 text-white text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-xl active:scale-95 transition-all">Ver</button>
            </div>
          ))}
          {plans.length === 0 && (
            <div className="text-center py-4">
              <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Mueve el mapa para encontrar amigos</p>
            </div>
          )}
        </div>
      </div>

      {/* Create Modal */}
      {isCreating && (
        <div className="fixed inset-0 z-[60] bg-white flex flex-col p-8 animate-in slide-in-from-right duration-500 overflow-y-auto">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-black tracking-tighter">Nuevo Paseo</h2>
            <button onClick={() => setIsCreating(false)} className="text-2xl text-gray-300"><i className="fa-solid fa-xmark"></i></button>
          </div>
          
          <form onSubmit={handleCreate} className="space-y-6 flex-1">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Título del plan</label>
              <input type="text" placeholder="Ej: Paseo por el Retiro" required className="w-full bg-gray-50 rounded-2xl px-6 py-4 font-bold border-2 border-transparent focus:border-orange-500 outline-none" onChange={e => setNewPlan({...newPlan, title: e.target.value})} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Fecha</label>
                <input type="date" required className="w-full bg-gray-50 rounded-2xl px-6 py-4 font-bold outline-none" onChange={e => setNewPlan({...newPlan, date: e.target.value})} />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Hora</label>
                <input type="time" required className="w-full bg-gray-50 rounded-2xl px-6 py-4 font-bold outline-none" onChange={e => setNewPlan({...newPlan, time: e.target.value})} />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Ubicación en el Mapa</label>
              <button 
                type="button"
                onClick={() => setShowPicker(true)}
                className={`w-full py-4 rounded-2xl border-2 border-dashed flex items-center justify-center gap-2 transition-all ${
                  newPlan.location.lat !== 0 ? 'bg-orange-50 border-orange-200 text-orange-600' : 'bg-gray-50 border-gray-200 text-gray-400'
                }`}
              >
                <i className={`fa-solid ${newPlan.location.lat !== 0 ? 'fa-location-dot' : 'fa-map-location-dot'}`}></i>
                <span className="font-bold text-xs uppercase tracking-widest">{newPlan.location.lat !== 0 ? 'Ubicación seleccionada' : 'Seleccionar en el mapa'}</span>
              </button>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Descripción</label>
              <textarea placeholder="¿Qué haremos?" className="w-full bg-gray-50 rounded-2xl px-6 py-4 font-medium outline-none h-32" onChange={e => setNewPlan({...newPlan, description: e.target.value})}></textarea>
            </div>

            <Button type="submit" className="w-full py-5 rounded-[24px] shadow-xl shadow-orange-100">Publicar Paseo</Button>
          </form>
        </div>
      )}

      {showPicker && <LocationPicker onClose={() => setShowPicker(false)} onSelect={handleLocationSelect} />}
    </div>
  );
};
