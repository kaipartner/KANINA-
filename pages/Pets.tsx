
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { PetCard } from '../components/PetCard';
import { Button } from '../components/Button';
import { Pet, PetSpecies } from '../types';

export const Pets: React.FC = () => {
  const { user } = useAuth();
  const [pets, setPets] = useState<Pet[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newPet, setNewPet] = useState<Partial<Pet>>({
    name: '',
    species: 'dog',
    age: 0,
    notes: ''
  });

  const handleAddPet = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPet.name) return;
    
    const pet: Pet = {
      id: Math.random().toString(36).substr(2, 9),
      ownerId: user?.uid || '',
      name: newPet.name,
      species: newPet.species as PetSpecies,
      age: Number(newPet.age),
      notes: newPet.notes,
      healthWallet: { vaccines: [], history: [] }
    };
    
    setPets([pet, ...pets]);
    setIsAdding(false);
    setNewPet({ name: '', species: 'dog', age: 0, notes: '' });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tighter">Mis Animales</h2>
          <p className="text-sm text-gray-400 font-bold uppercase tracking-widest mt-1">Tu familia KANINA</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-lg ${
            isAdding ? 'bg-gray-100 text-gray-400' : 'bg-orange-500 text-white shadow-orange-200'
          }`}
        >
          <i className={`fa-solid ${isAdding ? 'fa-xmark' : 'fa-plus'} text-xl`}></i>
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAddPet} className="bg-orange-50 p-6 rounded-[32px] mb-8 space-y-4 animate-in slide-in-from-top-4 duration-300 border-2 border-orange-100">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="text-xs font-black text-orange-400 uppercase tracking-widest ml-1">Nombre del animal</label>
              <input 
                autoFocus
                type="text" 
                className="w-full bg-white rounded-2xl px-5 py-4 border-2 border-transparent focus:border-orange-500 outline-none font-bold"
                placeholder="Ej: Buba, Misu..."
                required
                onChange={e => setNewPet({...newPet, name: e.target.value})}
              />
            </div>
            <div>
              <label className="text-xs font-black text-orange-400 uppercase tracking-widest ml-1">Especie</label>
              <select 
                className="w-full bg-white rounded-2xl px-4 py-4 border-2 border-transparent focus:border-orange-500 outline-none font-bold appearance-none"
                onChange={e => setNewPet({...newPet, species: e.target.value as PetSpecies})}
              >
                <option value="dog">Perro</option>
                <option value="cat">Gato</option>
                <option value="other">Otro</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-black text-orange-400 uppercase tracking-widest ml-1">Edad</label>
              <input 
                type="number" 
                className="w-full bg-white rounded-2xl px-5 py-4 border-2 border-transparent focus:border-orange-500 outline-none font-bold"
                placeholder="Años"
                onChange={e => setNewPet({...newPet, age: parseInt(e.target.value)})}
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-black text-orange-400 uppercase tracking-widest ml-1">Personalidad / Notas</label>
            <textarea 
              className="w-full bg-white rounded-2xl px-5 py-4 border-2 border-transparent focus:border-orange-500 outline-none font-medium text-sm h-24"
              placeholder="¿Cómo es tu mascota? (Ej: Muy juguetón, tímido con otros gatos...)"
              onChange={e => setNewPet({...newPet, notes: e.target.value})}
            ></textarea>
          </div>
          <Button type="submit" className="w-full py-4 rounded-2xl shadow-xl shadow-orange-100">
            ¡Registrar Mascota!
          </Button>
        </form>
      )}

      {pets.length === 0 && !isAdding ? (
        <div className="bg-white border-4 border-dashed border-gray-50 rounded-[40px] p-12 text-center mt-10">
          <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fa-solid fa-dog text-4xl text-gray-200"></i>
          </div>
          <h3 className="text-xl font-black text-gray-300 uppercase tracking-tighter">No hay nadie aquí aún</h3>
          <p className="text-sm text-gray-300 font-bold uppercase tracking-widest mt-2">Pulsa el botón + para empezar</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-20">
          {pets.map(pet => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>
      )}
    </div>
  );
};
