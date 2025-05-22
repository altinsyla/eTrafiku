
export interface RouteStop {
  name: string;
  coordinates: [number, number];
  arrivalTime?: string;
  departureTime?: string;
}

export interface TransitRoute {
  id: string;
  name: string;
  type: 'bus' | 'train';
  lineNumber: string;
  color: string;
  from: RouteStop;
  to: RouteStop;
  intermediateStops: RouteStop[];
  departureTime: string;
  arrivalTime: string;
  price: number;
  distance: number; // in kilometers
  duration: number; // in minutes
  frequency: string;
  occupancy: number; // percentage 0-100
  status: 'on-time' | 'delayed' | 'cancelled';
  delayMinutes?: number;
  amenities: string[];
  popular: boolean;
  active: boolean;
}

export const POPULAR_ROUTES: TransitRoute[] = [
  {
    id: 'route-1',
    name: 'Prishtinë - Mitrovica',
    type: 'bus',
    lineNumber: '1',
    color: '#3b82f6',
    from: {
      name: 'Prishtinë, Stacioni i autobusëve',
      coordinates: [42.6629, 21.1655],
      departureTime: '18:00'
    },
    to: {
      name: 'Mitrovicë, Stacioni i autobusëve',
      coordinates: [42.8911, 20.8665],
      arrivalTime: '19:30'
    },
    intermediateStops: [
      {
        name: 'Vushtrri, Stacioni i autobusëve',
        coordinates: [42.8269, 20.9703],
        arrivalTime: '18:45',
        departureTime: '18:50'
      }
    ],
    departureTime: '18:00',
    arrivalTime: '19:30',
    price: 3.5,
    distance: 40,
    duration: 90,
    frequency: 'Hourly',
    occupancy: 68,
    status: 'on-time',
    amenities: ['WiFi', 'Air Conditioning', 'USB Charging'],
    popular: true,
    active: true
  },
  {
    id: 'route-2',
    name: 'Prishtinë - Gjilan',
    type: 'bus',
    lineNumber: '2',
    color: '#10b981',
    from: {
      name: 'Prishtinë, Stacioni i autobusëve',
      coordinates: [42.6629, 21.1655],
      departureTime: '16:00'
    },
    to: {
      name: 'Gjilan, Stacioni i autobusëve',
      coordinates: [42.4639, 21.4700],
      arrivalTime: '17:15'
    },
    intermediateStops: [
      {
        name: 'Universiteti i Prishtinës',
        coordinates: [42.6477, 21.1670],
        arrivalTime: '16:10',
        departureTime: '16:15'
      }
    ],
    departureTime: '16:00',
    arrivalTime: '17:15',
    price: 4.0,
    distance: 35,
    duration: 75,
    frequency: 'Every 30 minutes',
    occupancy: 73,
    status: 'delayed',
    delayMinutes: 5,
    amenities: ['WiFi', 'Air Conditioning'],
    popular: true,
    active: true
  },
  {
    id: 'route-3',
    name: 'Pristina - Peja',
    type: 'train',
    lineNumber: '3',
    color: '#8b5cf6',
    from: {
      name: 'Prishtinë, Stacioni hekurudhor',
      coordinates: [42.6561, 21.1465],
      departureTime: '17:00'
    },
    to: {
      name: 'Pejë, Stacioni hekurudhor',
      coordinates: [42.6583, 20.2883],
      arrivalTime: '19:45'
    },
    intermediateStops: [
      {
        name: 'Fushe Kosove, Stacion',
        coordinates: [42.6347, 21.0961],
        arrivalTime: '17:20',
        departureTime: '17:25'
      }
    ],
    departureTime: '17:00',
    arrivalTime: '19:45',
    price: 5.0,
    distance: 86,
    duration: 165,
    frequency: 'Every 2 hours',
    occupancy: 90,
    status: 'on-time',
    amenities: ['WiFi', 'Dining Car', 'Power Outlets', 'Restroom'],
    popular: true,
    active: true
  },
  {
    id: 'route-4',
    name: 'Prishtinë - Ferizaj',
    type: 'bus',
    lineNumber: '4',
    color: '#f59e0b',
    from: {
      name: 'Prishtinë, Stacioni i autobusëve',
      coordinates: [42.6629, 21.1655],
      departureTime: '07:30'
    },
    to: {
      name: 'Ferizaj, Stacioni i autobusëve',
      coordinates: [42.3703, 21.1553],
      arrivalTime: '08:15'
    },
    intermediateStops: [],
    departureTime: '07:30',
    arrivalTime: '08:15',
    price: 2.5,
    distance: 25,
    duration: 45,
    frequency: 'Every 20 minutes',
    occupancy: 85,
    status: 'on-time',
    amenities: ['Air Conditioning'],
    popular: false,
    active: true
  },
  {
    id: 'route-5',
    name: 'Prishtinë - Gjakovë',
    type: 'bus',
    lineNumber: '5',
    color: '#ec4899',
    from: {
      name: 'Prishtinë, Stacioni i autobusëve',
      coordinates: [42.6629, 21.1655],
      departureTime: '09:00'
    },
    to: {
      name: 'Gjakova, Stacioni i autobusëve',
      coordinates: [42.3856, 20.4300],
      arrivalTime: '10:45'
    },
    intermediateStops: [],
    departureTime: '09:00',
    arrivalTime: '10:45',
    price: 4.5,
    distance: 70,
    duration: 105,
    frequency: 'Every 60 minutes',
    occupancy: 50,
    status: 'delayed',
    delayMinutes: 10,
    amenities: ['WiFi', 'Air Conditioning'],
    popular: false,
    active: true
  },
  {
    id: 'route-6',
    name: 'Prizren - Prishtinë',
    type: 'bus',
    lineNumber: '6',
    color: '#6366f1',
    from: {
      name: 'Prizren Bus Terminal',
      coordinates: [42.2139, 20.7397],
      departureTime: '06:30'
    },
    to: {
      name: 'Prishtinë, Stacioni i autobusëve',
      coordinates: [42.6629, 21.1655],
      arrivalTime: '08:00'
    },
    intermediateStops: [],
    departureTime: '06:30',
    arrivalTime: '08:00',
    price: 5.0,
    distance: 78,
    duration: 90,
    frequency: 'Every 30 minutes',
    occupancy: 75,
    status: 'on-time',
    amenities: ['WiFi', 'Air Conditioning', 'USB Charging'],
    popular: true,
    active: true
  }
];

export const getAllRoutes = (): TransitRoute[] => {
  return POPULAR_ROUTES;
};

export const getPopularRoutes = (): TransitRoute[] => {
  return POPULAR_ROUTES.filter(route => route.popular);
};

export const getRouteById = (id: string): TransitRoute | undefined => {
  return POPULAR_ROUTES.find(route => route.id === id);
};

export const getRoutesByType = (type: 'bus' | 'train'): TransitRoute[] => {
  return POPULAR_ROUTES.filter(route => route.type === type);
};

export const getActiveRoutes = (): TransitRoute[] => {
  return POPULAR_ROUTES.filter(route => route.active);
};
