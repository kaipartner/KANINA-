
import React from 'react';
import { Pet } from '../types';

interface PetCardProps {
  pet: Pet;
  onClick?: () => void;
}

export const PetCard: React.FC<PetCardProps> = ({ pet, onClick }) => {
  const getIcon = () => {
    if (pet.species === 'dog') return 'fa-dog';
    if (pet.species === 'cat') return 'fa-cat';
    return 'fa-paw';
  };

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-3xl overflow-hidden border-2 border-gray-50 hover:border-orange-200 transition-all cursor-pointer shadow-sm group"
    >
      <div className="relative h-48">
        <img 
          src={pet.photoUrl || `https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=400`} 
          className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
          alt={pet.name}
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md w-10 h-10 rounded-2xl flex items-center justify-center text-orange-500 shadow-sm">
          <i className={`fa-solid ${getIcon()} text-lg`}></i>
        </div>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-end mb-2">
          <h4 className="text-xl font-black text-gray-900 tracking-tight">{pet.name}</h4>
          <span className="text-xs font-bold bg-orange-50 text-orange-600 px-3 py-1 rounded-full">{pet.age} años</span>
        </div>
        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-3">
          {pet.species === 'other' ? pet.otherSpeciesLabel : pet.species}
        </p>
        {pet.notes && (
          <p className="text-sm text-gray-500 line-clamp-1 italic">"{pet.notes}"</p>
        )}
      </div>
    </div>
  );
};
