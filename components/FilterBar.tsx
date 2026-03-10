
import React from 'react';
import { PetSpecies, EnergyLevel } from '../types';

interface FilterBarProps {
  onSpeciesChange: (s: PetSpecies | 'all') => void;
  onEnergyChange: (e: EnergyLevel | 'all') => void;
  selectedSpecies: string;
  selectedEnergy: string;
}

export const FilterBar: React.FC<FilterBarProps> = ({ 
  onSpeciesChange, onEnergyChange, selectedSpecies, selectedEnergy 
}) => {
  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {['all', 'dog', 'cat', 'other'].map(s => (
          <button
            key={s}
            onClick={() => onSpeciesChange(s as any)}
            className={`px-4 py-2 rounded-2xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
              selectedSpecies === s ? 'bg-orange-500 text-white shadow-lg' : 'bg-gray-100 text-gray-400'
            }`}
          >
            {s === 'all' ? 'Todos' : s === 'dog' ? 'Perros' : s === 'cat' ? 'Gatos' : 'Otros'}
          </button>
        ))}
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {['all', 'low', 'medium', 'high'].map(e => (
          <button
            key={e}
            onClick={() => onEnergyChange(e as any)}
            className={`px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border-2 ${
              selectedEnergy === e ? 'border-teal-500 bg-teal-50 text-teal-700' : 'border-transparent bg-gray-50 text-gray-400'
            }`}
          >
            Energía: {e === 'all' ? 'Cualquiera' : e === 'low' ? 'Baja' : e === 'medium' ? 'Media' : 'Alta'}
          </button>
        ))}
      </div>
    </div>
  );
};
