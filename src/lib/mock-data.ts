
import { FavoriteRoute, Notification, Ticket, Trip } from "./storage";

// Kosovo's approximate geographical center and bounds
export const KOSOVO_CENTER: [number, number] = [42.6026, 20.9030];
export const KOSOVO_BOUNDS = {
  northEast: [43.2696, 21.7760], // North-East corner
  southWest: [41.8577, 20.0141], // South-West corner
};

// Major cities in Kosovo with coordinates
export const KOSOVO_CITIES = [
  { name: "Pristina", coordinates: [42.6629, 21.1655], isCapital: true },
  { name: "Prizren", coordinates: [42.2139, 20.7397], isCapital: false },
  { name: "Peja", coordinates: [42.6598, 20.2888], isCapital: false },
  { name: "Mitrovica", coordinates: [42.8914, 20.8660], isCapital: false },
  { name: "Gjakova", coordinates: [42.3803, 20.4308], isCapital: false },
  { name: "Gjilan", coordinates: [42.4631, 21.4691], isCapital: false },
  { name: "Ferizaj", coordinates: [42.3706, 21.1553], isCapital: false },
  { name: "Podujeva", coordinates: [42.9098, 21.1932], isCapital: false },
  { name: "Vushtrri", coordinates: [42.8273, 20.9675], isCapital: false },
  { name: "Suhareka", coordinates: [42.3592, 20.8254], isCapital: false }
];

// Bus routes connecting major cities
export const BUS_ROUTES = [
  {
    id: "bus-1",
    name: "Pristina - Prizren",
    type: "intercity",
    stops: [
      { name: "Pristina Bus Station", coordinates: [42.6629, 21.1655], timeOffset: 0 },
      { name: "Lipjan", coordinates: [42.5241, 21.1259], timeOffset: 15 },
      { name: "Shtime", coordinates: [42.4331, 21.0394], timeOffset: 25 },
      { name: "Suhareka", coordinates: [42.3592, 20.8254], timeOffset: 40 },
      { name: "Prizren Bus Station", coordinates: [42.2139, 20.7397], timeOffset: 60 },
    ],
    schedule: [
      { departureTime: "06:00", frequency: "Every 30 mins until 22:00" },
      { departureTime: "06:30", frequency: "Every 30 mins until 22:30" },
    ],
    duration: 60, // in minutes
    price: 3.5, // in EUR
    busNumber: "101",
    capacity: 45,
  },
  {
    id: "bus-2",
    name: "Pristina - Peja",
    type: "intercity",
    stops: [
      { name: "Pristina Bus Station", coordinates: [42.6629, 21.1655], timeOffset: 0 },
      { name: "Drenas", coordinates: [42.6283, 20.8987], timeOffset: 20 },
      { name: "Klina", coordinates: [42.6217, 20.5730], timeOffset: 50 },
      { name: "Peja Bus Station", coordinates: [42.6598, 20.2888], timeOffset: 75 },
    ],
    schedule: [
      { departureTime: "07:00", frequency: "Every 60 mins until 21:00" },
      { departureTime: "08:00", frequency: "Every 60 mins until 22:00" },
    ],
    duration: 75, // in minutes
    price: 4.0, // in EUR
    busNumber: "102",
    capacity: 45,
  },
  {
    id: "bus-3",
    name: "Pristina - Mitrovica",
    type: "intercity",
    stops: [
      { name: "Pristina Bus Station", coordinates: [42.6629, 21.1655], timeOffset: 0 },
      { name: "Vushtrri", coordinates: [42.8273, 20.9675], timeOffset: 20 },
      { name: "Mitrovica Bus Station", coordinates: [42.8914, 20.8660], timeOffset: 40 },
    ],
    schedule: [
      { departureTime: "06:15", frequency: "Every 30 mins until 22:15" },
      { departureTime: "06:45", frequency: "Every 30 mins until 22:45" },
    ],
    duration: 40, // in minutes
    price: 2.5, // in EUR
    busNumber: "103",
    capacity: 45,
  },
  {
    id: "bus-4",
    name: "Pristina - Gjilan",
    type: "intercity",
    stops: [
      { name: "Pristina Bus Station", coordinates: [42.6629, 21.1655], timeOffset: 0 },
      { name: "Gjilan Bus Station", coordinates: [42.4631, 21.4691], timeOffset: 45 },
    ],
    schedule: [
      { departureTime: "06:30", frequency: "Every 30 mins until 22:30" },
      { departureTime: "07:00", frequency: "Every 30 mins until 23:00" },
    ],
    duration: 45, // in minutes
    price: 3.0, // in EUR
    busNumber: "104",
    capacity: 45,
  },
  {
    id: "bus-5",
    name: "Pristina - Ferizaj",
    type: "intercity",
    stops: [
      { name: "Pristina Bus Station", coordinates: [42.6629, 21.1655], timeOffset: 0 },
      { name: "Ferizaj Bus Station", coordinates: [42.3706, 21.1553], timeOffset: 30 },
    ],
    schedule: [
      { departureTime: "06:00", frequency: "Every 20 mins until 23:00" },
      { departureTime: "06:20", frequency: "Every 20 mins until 23:20" },
      { departureTime: "06:40", frequency: "Every 20 mins until 23:40" },
    ],
    duration: 30, // in minutes
    price: 2.0, // in EUR
    busNumber: "105",
    capacity: 45,
  },
];

// City bus routes for Pristina
export const PRISTINA_CITY_ROUTES = [
  {
    id: "city-bus-1",
    name: "Line 1: City Center - Sunny Hill",
    type: "city",
    stops: [
      { name: "Main Bus Station", coordinates: [42.6607, 21.1568], timeOffset: 0 },
      { name: "City Center", coordinates: [42.6629, 21.1655], timeOffset: 5 },
      { name: "Newborn Monument", coordinates: [42.6583, 21.1608], timeOffset: 8 },
      { name: "University of Pristina", coordinates: [42.6477, 21.1673], timeOffset: 12 },
      { name: "Sunny Hill", coordinates: [42.6547, 21.1845], timeOffset: 20 },
    ],
    schedule: [
      { departureTime: "05:30", frequency: "Every 10 mins until 23:30" },
    ],
    duration: 20, // in minutes
    price: 0.5, // in EUR
    busNumber: "1",
    capacity: 30,
  },
  {
    id: "city-bus-2",
    name: "Line 2: City Center - Veternik",
    type: "city",
    stops: [
      { name: "Main Bus Station", coordinates: [42.6607, 21.1568], timeOffset: 0 },
      { name: "City Center", coordinates: [42.6629, 21.1655], timeOffset: 5 },
      { name: "Grand Hotel", coordinates: [42.6600, 21.1597], timeOffset: 7 },
      { name: "Veternik", coordinates: [42.6433, 21.1367], timeOffset: 15 },
    ],
    schedule: [
      { departureTime: "05:35", frequency: "Every 10 mins until 23:35" },
    ],
    duration: 15, // in minutes
    price: 0.5, // in EUR
    busNumber: "2",
    capacity: 30,
  },
  {
    id: "city-bus-3",
    name: "Line 3: City Center - Dardania",
    type: "city",
    stops: [
      { name: "Main Bus Station", coordinates: [42.6607, 21.1568], timeOffset: 0 },
      { name: "City Center", coordinates: [42.6629, 21.1655], timeOffset: 5 },
      { name: "Cathedral of Saint Mother Teresa", coordinates: [42.6604, 21.1559], timeOffset: 7 },
      { name: "Dardania", coordinates: [42.6477, 21.1513], timeOffset: 15 },
    ],
    schedule: [
      { departureTime: "05:40", frequency: "Every 10 mins until 23:40" },
    ],
    duration: 15, // in minutes
    price: 0.5, // in EUR
    busNumber: "3",
    capacity: 30,
  },
];

// Generate buses with their current positions based on routes
export const generateBusPositions = () => {
  const allRoutes = [...BUS_ROUTES, ...PRISTINA_CITY_ROUTES];
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  
  return allRoutes.map(route => {
    // Calculate bus position based on time of day
    const routeStops = route.stops;
    const routeLength = routeStops.length;
    
    // Simple algorithm to place buses along their routes
    const firstDepartureHour = parseInt(route.schedule[0].departureTime.split(':')[0]);
    const firstDepartureMinute = parseInt(route.schedule[0].departureTime.split(':')[1]);
    
    const minutesSinceFirstDeparture = 
      (currentHour - firstDepartureHour) * 60 + (currentMinute - firstDepartureMinute);
    
    // Get frequency in minutes from the schedule
    const frequencyString = route.schedule[0].frequency;
    const frequencyMinutes = parseInt(frequencyString.match(/Every (\d+) mins/)?.[1] || "30");
    
    // Calculate how many buses are currently on this route
    const busesOnRoute = Math.floor(route.duration / frequencyMinutes) + 1;
    
    // Create multiple buses for this route
    return Array.from({ length: busesOnRoute }, (_, index) => {
      // Calculate where this specific bus is on the route
      const minutesOffset = (minutesSinceFirstDeparture + index * frequencyMinutes) % route.duration;
      
      // Find which segment of the route the bus is on
      let currentStopIndex = 0;
      for (let i = 1; i < routeLength; i++) {
        if (routeStops[i].timeOffset > minutesOffset) {
          currentStopIndex = i - 1;
          break;
        }
        currentStopIndex = i;
      }
      
      const nextStopIndex = Math.min(currentStopIndex + 1, routeLength - 1);
      
      // Calculate progress between stops (0 to 1)
      const startTime = routeStops[currentStopIndex].timeOffset;
      const endTime = routeStops[nextStopIndex].timeOffset;
      const segmentDuration = endTime - startTime;
      const segmentProgress = segmentDuration > 0 
        ? (minutesOffset - startTime) / segmentDuration 
        : 0;
      
      // Interpolate between stops based on progress
      const start = routeStops[currentStopIndex].coordinates;
      const end = routeStops[nextStopIndex].coordinates;
      
      const currentPosition: [number, number] = [
        start[0] + segmentProgress * (end[0] - start[0]),
        start[1] + segmentProgress * (end[1] - start[1])
      ];
      
      // Generate random occupancy data
      const randomOccupancy = Math.floor(Math.random() * route.capacity);
      const occupancyStatus = 
        randomOccupancy < route.capacity * 0.3 ? "low" :
        randomOccupancy < route.capacity * 0.7 ? "medium" : "high";
      
      return {
        id: `${route.id}-bus-${index + 1}`,
        routeId: route.id,
        routeName: route.name,
        busNumber: route.busNumber,
        position: currentPosition,
        currentStop: routeStops[currentStopIndex].name,
        nextStop: routeStops[nextStopIndex].name,
        minutesToNextStop: Math.ceil((endTime - minutesOffset) % segmentDuration || 1),
        occupancy: randomOccupancy,
        occupancyStatus,
        capacity: route.capacity,
        delay: Math.random() > 0.8 ? Math.floor(Math.random() * 10) : 0, // 20% chance of delay
      };
    });
  }).flat();
};

// Generate sample tickets for testing
export const generateSampleTickets = (): Ticket[] => {
  const now = new Date();
  
  return [
    {
      id: "ticket-1",
      type: "single",
      price: 0.5,
      purchaseDate: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
      expirationDate: new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString(), // 1 day from now
      qrCodeData: "TK-12345-SINGLE-" + now.getTime(),
      isUsed: false,
      routeInfo: {
        from: "Pristina",
        to: "City Center",
        routeId: "city-bus-1"
      }
    },
    {
      id: "ticket-2",
      type: "daily",
      price: 1.5,
      purchaseDate: now.toISOString(),
      expirationDate: new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString(), // 1 day from now
      qrCodeData: "TK-12346-DAILY-" + now.getTime(),
      isUsed: false,
      routeInfo: {
        from: "Pristina",
        to: "All City Routes"
      }
    },
    {
      id: "ticket-3",
      type: "monthly",
      price: 20,
      purchaseDate: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
      expirationDate: new Date(now.getTime() + 25 * 24 * 60 * 60 * 1000).toISOString(), // 25 days from now
      qrCodeData: "TK-12347-MONTHLY-" + now.getTime(),
      isUsed: false,
      routeInfo: {
        from: "All",
        to: "All"
      }
    }
  ];
};

// Generate sample favorite routes
export const generateSampleFavorites = (): FavoriteRoute[] => {
  return [
    {
      id: "fav-1",
      name: "Home to Work",
      from: {
        name: "Sunny Hill",
        coordinates: [42.6547, 21.1845]
      },
      to: {
        name: "City Center",
        coordinates: [42.6629, 21.1655]
      },
      routeType: "bus",
      routeIds: ["city-bus-1"]
    },
    {
      id: "fav-2",
      name: "Weekend Trip",
      from: {
        name: "Pristina",
        coordinates: [42.6629, 21.1655]
      },
      to: {
        name: "Prizren",
        coordinates: [42.2139, 20.7397]
      },
      routeType: "bus",
      routeIds: ["bus-1"]
    }
  ];
};

// Generate sample recent trips
export const generateSampleTrips = (): Trip[] => {
  const now = new Date();
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);
  
  return [
    {
      id: "trip-1",
      date: yesterday.toISOString(),
      from: {
        name: "Pristina Bus Station",
        coordinates: [42.6629, 21.1655]
      },
      to: {
        name: "Prizren Bus Station",
        coordinates: [42.2139, 20.7397]
      },
      duration: 60,
      distance: 78,
      routes: [
        {
          id: "bus-1",
          type: "bus",
          lineNumber: "101",
          departureTime: "14:00",
          arrivalTime: "15:00"
        }
      ]
    },
    {
      id: "trip-2",
      date: twoDaysAgo.toISOString(),
      from: {
        name: "Main Bus Station",
        coordinates: [42.6607, 21.1568]
      },
      to: {
        name: "Sunny Hill",
        coordinates: [42.6547, 21.1845]
      },
      duration: 20,
      distance: 3.5,
      routes: [
        {
          id: "city-bus-1",
          type: "bus",
          lineNumber: "1",
          departureTime: "09:30",
          arrivalTime: "09:50"
        }
      ]
    }
  ];
};

// Generate sample notifications
export const generateSampleNotifications = (): Notification[] => {
  const now = new Date();
  
  return [
    {
      id: "notif-1",
      type: "delay",
      title: "Bus Line 101 Delayed",
      message: "The 14:30 bus from Pristina to Prizren is delayed by 15 minutes due to traffic.",
      timestamp: now.toISOString(),
      read: false,
      routeId: "bus-1"
    },
    {
      id: "notif-2",
      type: "disruption",
      title: "Route Change for Line 3",
      message: "Due to road works, Line 3 will skip the Cathedral stop until further notice.",
      timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      read: true,
      routeId: "city-bus-3"
    },
    {
      id: "notif-3",
      type: "promotion",
      title: "50% Off Monthly Passes",
      message: "Get 50% off all monthly passes this weekend. Special promotion for students!",
      timestamp: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
      read: false
    }
  ];
};

// Generate all initial data
export const generateInitialData = () => {
  return {
    buses: generateBusPositions(),
    tickets: generateSampleTickets(),
    favorites: generateSampleFavorites(),
    trips: generateSampleTrips(),
    notifications: generateSampleNotifications()
  };
};

// Simulate trip planning results
export interface PlanningOption {
  id: string;
  duration: number; // in minutes
  distance: number; // in km
  departure: string;
  arrival: string;
  price: number;
  routes: {
    id: string;
    type: 'bus' | 'train' | 'walk';
    name: string;
    lineNumber?: string;
    from: string;
    to: string;
    departureTime: string;
    arrivalTime: string;
    duration: number;
    color?: string;
  }[];
  transfers: number;
  co2Saved: number; // in kg
}

export const planTrip = (
  from: { name: string; coordinates: [number, number] },
  to: { name: string; coordinates: [number, number] }
): PlanningOption[] => {
  // This is a mock function that simulates trip planning
  
  // Get current time
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  
  // Format time as HH:MM
  const currentTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  
  // Calculate arrival times
  const addMinutes = (time: string, minsToAdd: number) => {
    const [h, m] = time.split(':').map(Number);
    const totalMins = h * 60 + m + minsToAdd;
    const newHours = Math.floor(totalMins / 60) % 24;
    const newMinutes = totalMins % 60;
    return `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`;
  };

  // Generate 3 different route options
  return [
    {
      id: "option-1",
      duration: 45,
      distance: 12,
      departure: currentTime,
      arrival: addMinutes(currentTime, 45),
      price: 2.0,
      routes: [
        {
          id: "route-1-1",
          type: 'bus',
          name: "City Bus Line 1",
          lineNumber: "1",
          from: from.name,
          to: "City Center",
          departureTime: currentTime,
          arrivalTime: addMinutes(currentTime, 15),
          duration: 15,
          color: "#10B981"
        },
        {
          id: "route-1-2",
          type: 'bus',
          name: "City Bus Line 3",
          lineNumber: "3",
          from: "City Center",
          to: to.name,
          departureTime: addMinutes(currentTime, 20),
          arrivalTime: addMinutes(currentTime, 45),
          duration: 25,
          color: "#3B82F6"
        }
      ],
      transfers: 1,
      co2Saved: 2.4
    },
    {
      id: "option-2",
      duration: 55,
      distance: 10,
      departure: currentTime,
      arrival: addMinutes(currentTime, 55),
      price: 1.5,
      routes: [
        {
          id: "route-2-1",
          type: 'bus',
          name: "City Bus Line 2",
          lineNumber: "2",
          from: from.name,
          to: to.name,
          departureTime: currentTime,
          arrivalTime: addMinutes(currentTime, 55),
          duration: 55,
          color: "#EC4899"
        }
      ],
      transfers: 0,
      co2Saved: 2.0
    },
    {
      id: "option-3",
      duration: 40,
      distance: 15,
      departure: addMinutes(currentTime, 10),
      arrival: addMinutes(currentTime, 50),
      price: 3.0,
      routes: [
        {
          id: "route-3-1",
          type: 'walk',
          name: "Walk",
          from: from.name,
          to: "Main Station",
          departureTime: addMinutes(currentTime, 10),
          arrivalTime: addMinutes(currentTime, 15),
          duration: 5
        },
        {
          id: "route-3-2",
          type: 'bus',
          name: "Express Bus",
          lineNumber: "E1",
          from: "Main Station",
          to: to.name,
          departureTime: addMinutes(currentTime, 20),
          arrivalTime: addMinutes(currentTime, 50),
          duration: 30,
          color: "#F59E0B"
        }
      ],
      transfers: 1,
      co2Saved: 3.0
    }
  ];
};
