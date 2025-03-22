export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c;
  return distance;
}

export function formatDistance(meters: number): string {
  if (meters < 1000) {
    return `${Math.round(meters)} meters away`;
  }
  const kilometers = meters / 1000;
  if (kilometers < 100) {
    return `${kilometers.toFixed(1)} km away`;
  }
  return `${Math.round(kilometers)} km away`;
}

export function getApproximateTime(meters: number, speedKmh: number = 30): string {
  const hours = (meters / 1000) / speedKmh;
  const minutes = Math.round(hours * 60);
  
  if (minutes < 1) {
    return 'Less than a minute away';
  }
  if (minutes === 1) {
    return '1 minute away';
  }
  if (minutes < 60) {
    return `${minutes} minutes away`;
  }
  return `${Math.round(hours)} hours away`;
}