
// Utilidad básica de Geohash para simular búsquedas por proximidad
// En producción se recomienda usar bibliotecas como 'geofire-common'

const BASE32 = '0123456789bcdefghjkmnpqrstuvwxyz';

export const encodeGeohash = (lat: number, lng: number, precision: number = 9): string => {
  let minLat = -90, maxLat = 90;
  let minLng = -180, maxLng = 180;
  let geohash = '';
  let bit = 0;
  let ch = 0;
  let isEven = true;

  while (geohash.length < precision) {
    let mid;
    if (isEven) {
      mid = (minLng + maxLng) / 2;
      if (lng > mid) {
        ch |= (1 << (4 - bit));
        minLng = mid;
      } else {
        maxLng = mid;
      }
    } else {
      mid = (minLat + maxLat) / 2;
      if (lat > mid) {
        ch |= (1 << (4 - bit));
        minLat = mid;
      } else {
        maxLat = mid;
      }
    }

    isEven = !isEven;
    if (bit < 4) {
      bit++;
    } else {
      geohash += BASE32[ch];
      bit = 0;
      ch = 0;
    }
  }
  return geohash;
};

// Helper para determinar si un punto está dentro de un rango de geohash (simplificado)
export const isWithinBounds = (lat: number, lng: number, bounds: any): boolean => {
  if (!bounds) return true;
  const ne = bounds.getNorthEast();
  const sw = bounds.getSouthWest();
  return lat <= ne.lat() && lat >= sw.lat() && lng <= ne.lng() && lng >= sw.lng();
};
