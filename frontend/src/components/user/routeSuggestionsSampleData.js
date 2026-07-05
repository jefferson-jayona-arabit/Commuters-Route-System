/**
 * Placeholder data for UI design only.
 * Once the backend route-search endpoint exists, this file can be deleted
 * and RouteSuggestionsList can receive real results as a prop instead.
 */
export const SAMPLE_ROUTE_SUGGESTIONS = [
  {
    id: 1,
    tag: 'Fastest',
    vehicleType: 'Jeepney',
    routeName: 'Route 10 — Molo to Jaro',
    pickupPoint: 'Molo Plaza Terminal',
    dropoffPoint: 'Jaro Plaza Drop-off',
    walkToPickupMin: 4,
    walkFromDropoffMin: 6,
    fare: '₱13.00',
    durationMin: 28,
    distanceKm: 6.4,
  },
  {
    id: 2,
    tag: 'Cheapest',
    vehicleType: 'Tricycle',
    routeName: 'Barangay Loop — Zone 3',
    pickupPoint: 'Corner Rizal St.',
    dropoffPoint: 'Near City Hall',
    walkToPickupMin: 2,
    walkFromDropoffMin: 3,
    fare: '₱15.00',
    durationMin: 10,
    distanceKm: 2.1,
  },
  {
    id: 3,
    tag: null,
    vehicleType: 'Bus',
    routeName: 'City Bus Line 2',
    pickupPoint: 'SM Terminal',
    dropoffPoint: 'Iloilo Business Park',
    walkToPickupMin: 5,
    walkFromDropoffMin: 4,
    fare: '₱15.00',
    durationMin: 35,
    distanceKm: 9.8,
  },
  {
    id: 4,
    tag: null,
    vehicleType: 'Motorcycle Taxi',
    routeName: 'Habal-habal — Direct trip',
    pickupPoint: 'Your current location',
    dropoffPoint: 'Destination doorstep',
    walkToPickupMin: 0,
    walkFromDropoffMin: 0,
    fare: '₱40.00',
    durationMin: 15,
    distanceKm: 6.4,
  },
]