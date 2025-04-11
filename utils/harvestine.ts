/**
 * Calculate the distance between two points on Earth using the Haversine formula
 * @param lat1 Latitude of the first point in degrees
 * @param lon1 Longitude of the first point in degrees
 * @param lat2 Latitude of the second point in degrees
 * @param lon2 Longitude of the second point in degrees
 * @returns Distance in kilometers
 */
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    // Earth's radius in kilometers
    const R = 6371
  
    // Convert degrees to radians
    const dLat = toRadians(lat2 - lat1)
    const dLon = toRadians(lon2 - lon1)
  
    // Haversine formula
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distance = R * c
  
    return distance
  }
  
  /**
   * Convert degrees to radians
   * @param degrees Angle in degrees
   * @returns Angle in radians
   */
  function toRadians(degrees: number): number {
    return degrees * (Math.PI / 180)
  }
  