
import React, { useEffect, useRef, useState } from 'react';

declare var google: any;

interface MapViewProps {
  center?: { lat: number; lng: number };
  markers?: Array<{
    id: string;
    lat: number;
    lng: number;
    title: string;
    type: 'dog' | 'cat' | 'other' | 'user';
    onClick?: () => void;
  }>;
  onBoundsChange?: (bounds: any) => void;
  onMapClick?: (lat: number, lng: number) => void;
  zoom?: number;
}

export const MapView: React.FC<MapViewProps> = ({ 
  center, 
  markers = [], 
  onBoundsChange, 
  onMapClick,
  zoom = 14 
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Intentar obtener la clave de process.env.GOOGLE_MAPS_API_KEY
    const apiKey = (process.env as any).GOOGLE_MAPS_API_KEY || 'REPLACE_WITH_YOUR_GMAPS_KEY';
    
    if (!(window as any).google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => setIsLoaded(true);
      document.head.appendChild(script);
    } else {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded && mapRef.current && !googleMapRef.current) {
      googleMapRef.current = new google.maps.Map(mapRef.current, {
        center: center || { lat: 40.4168, lng: -3.7038 },
        zoom: zoom,
        disableDefaultUI: true,
        styles: [
          { "featureType": "landscape", "stylers": [{ "color": "#f8fafc" }] },
          { "featureType": "poi", "stylers": [{ "visibility": "off" }] },
          { "featureType": "road", "stylers": [{ "color": "#ffffff" }] },
          { "featureType": "water", "stylers": [{ "color": "#e2e8f0" }] }
        ]
      });

      googleMapRef.current.addListener('idle', () => {
        if (onBoundsChange && googleMapRef.current) {
          onBoundsChange(googleMapRef.current.getBounds() || null);
        }
      });

      googleMapRef.current.addListener('click', (e: any) => {
        if (onMapClick && e.latLng) {
          onMapClick(e.latLng.lat(), e.latLng.lng());
        }
      });
    }
  }, [isLoaded, center]);

  // Sincronizar marcadores
  useEffect(() => {
    if (googleMapRef.current && isLoaded) {
      // Limpiar marcadores anteriores
      markersRef.current.forEach(m => m.setMap(null));
      markersRef.current = [];

      markers.forEach(m => {
        const marker = new google.maps.Marker({
          position: { lat: m.lat, lng: m.lng },
          map: googleMapRef.current,
          title: m.title,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: m.type === 'dog' ? '#f97316' : m.type === 'cat' ? '#14b8a6' : '#6366f1',
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 2,
            scale: 12
          }
        });
        if (m.onClick) marker.addListener('click', m.onClick);
        markersRef.current.push(marker);
      });
    }
  }, [markers, isLoaded]);

  return (
    <div className="relative w-full h-full bg-slate-50 overflow-hidden">
      <div ref={mapRef} className="w-full h-full" />
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm z-10">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-[10px] font-black uppercase text-orange-500 tracking-[0.2em]">Cargando Mapa KANINA</p>
          </div>
        </div>
      )}
    </div>
  );
};
