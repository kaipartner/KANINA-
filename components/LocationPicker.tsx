
import React, { useState } from 'react';
import { MapView } from './MapView';
import { Button } from './Button';

interface LocationPickerProps {
  onSelect: (lat: number, lng: number) => void;
  onClose: () => void;
}

export const LocationPicker: React.FC<LocationPickerProps> = ({ onSelect, onClose }) => {
  const [selected, setSelected] = useState<{ lat: number, lng: number } | null>(null);

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-t-[40px] sm:rounded-[40px] overflow-hidden flex flex-col h-[80vh] sm:h-[600px] animate-in slide-in-from-bottom duration-500">
        <div className="p-6 border-b flex justify-between items-center">
          <div>
            <h3 className="text-xl font-black tracking-tight">Selecciona el punto</h3>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Toca el mapa para marcar el lugar</p>
          </div>
          <button onClick={onClose} className="w-10 h-10 bg-gray-100 rounded-2xl flex items-center justify-center"><i className="fa-solid fa-xmark"></i></button>
        </div>
        
        <div className="flex-1 relative">
          <MapView 
            onMapClick={(lat, lng) => setSelected({ lat, lng })}
            markers={selected ? [{ id: 'temp', lat: selected.lat, lng: selected.lng, title: 'Aquí', type: 'dog' }] : []}
          />
          {selected && (
            <div className="absolute bottom-6 left-6 right-6">
              <Button className="w-full py-4 shadow-2xl" onClick={() => onSelect(selected.lat, selected.lng)}>
                Confirmar esta ubicación
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
