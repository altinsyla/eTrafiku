
// Local storage service for TransitKosovo app

// Storage keys
const KEYS = {
  USER_PROFILE: 'transitkosovo_user',
  TICKETS: 'transitkosovo_tickets',
  FAVORITE_ROUTES: 'transitkosovo_favorites',
  RECENT_TRIPS: 'transitkosovo_recent_trips',
  NOTIFICATIONS: 'transitkosovo_notifications',
  SETTINGS: 'transitkosovo_settings',
};

// Helper functions
const getItem = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error getting ${key} from localStorage:`, error);
    return defaultValue;
  }
};

const setItem = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting ${key} in localStorage:`, error);
  }
};

// User profile
export interface UserProfile {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  userType?: 'regular' | 'student' | 'senior' | 'disabled';
  preferredLanguage?: 'en' | 'sq' | 'sr';
}

export const getUserProfile = (): UserProfile => {
  return getItem<UserProfile>(KEYS.USER_PROFILE, {});
};

export const setUserProfile = (profile: UserProfile): void => {
  setItem(KEYS.USER_PROFILE, profile);
};

// Tickets
export interface Ticket {
  id: string;
  type: 'single' | 'daily' | 'monthly';
  price: number;
  purchaseDate: string;
  expirationDate: string;
  validFrom?: string;
  validUntil?: string;
  qrCodeData?: string;
  isUsed?: boolean;
  routeInfo?: {
    from: string;
    to: string;
    routeId?: string;
  };
}

export const getTickets = (): Ticket[] => {
  return getItem<Ticket[]>(KEYS.TICKETS, []);
};

export const addTicket = (ticket: Ticket): void => {
  const tickets = getTickets();
  tickets.push(ticket);
  setItem(KEYS.TICKETS, tickets);
};

export const updateTicket = (updatedTicket: Ticket): void => {
  const tickets = getTickets();
  const index = tickets.findIndex(ticket => ticket.id === updatedTicket.id);
  if (index !== -1) {
    tickets[index] = updatedTicket;
    setItem(KEYS.TICKETS, tickets);
  }
};

// Favorite Routes
export interface FavoriteRoute {
  id: string;
  name: string;
  from: {
    name: string;
    coordinates: [number, number];
  };
  to: {
    name: string;
    coordinates: [number, number];
  };
  routeType: 'bus' | 'train' | 'multi';
  routeIds: string[];
}

export const getFavoriteRoutes = (): FavoriteRoute[] => {
  return getItem<FavoriteRoute[]>(KEYS.FAVORITE_ROUTES, []);
};

export const addFavoriteRoute = (route: FavoriteRoute): void => {
  const routes = getFavoriteRoutes();
  routes.push(route);
  setItem(KEYS.FAVORITE_ROUTES, routes);
};

export const removeFavoriteRoute = (routeId: string): void => {
  const routes = getFavoriteRoutes();
  const filteredRoutes = routes.filter(route => route.id !== routeId);
  setItem(KEYS.FAVORITE_ROUTES, filteredRoutes);
};

// Recent Trips
export interface Trip {
  id: string;
  date: string;
  from: {
    name: string;
    coordinates: [number, number];
  };
  to: {
    name: string;
    coordinates: [number, number];
  };
  duration: number; // in minutes
  distance: number; // in kilometers
  routes: {
    id: string;
    type: 'bus' | 'train';
    lineNumber: string;
    departureTime: string;
    arrivalTime: string;
  }[];
}

export const getRecentTrips = (): Trip[] => {
  return getItem<Trip[]>(KEYS.RECENT_TRIPS, []);
};

export const addRecentTrip = (trip: Trip): void => {
  const trips = getRecentTrips();
  const maxRecentTrips = 10;
  const filteredTrips = [trip, ...trips.filter(t => t.id !== trip.id)].slice(0, maxRecentTrips);
  setItem(KEYS.RECENT_TRIPS, filteredTrips);
};

// Notifications
export interface Notification {
  id: string;
  type: 'info' | 'delay' | 'disruption' | 'promotion' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  routeId?: string;
  actionUrl?: string;
}

export const getNotifications = (): Notification[] => {
  return getItem<Notification[]>(KEYS.NOTIFICATIONS, []);
};

export const addNotification = (notification: Notification): void => {
  const notifications = getNotifications();
  notifications.unshift(notification);
  setItem(KEYS.NOTIFICATIONS, notifications);
};

export const markNotificationAsRead = (notificationId: string): void => {
  const notifications = getNotifications();
  const index = notifications.findIndex(n => n.id === notificationId);
  if (index !== -1) {
    notifications[index].read = true;
    setItem(KEYS.NOTIFICATIONS, notifications);
  }
};

export const clearAllNotifications = (): void => {
  setItem(KEYS.NOTIFICATIONS, []);
};

// App settings
export interface AppSettings {
  theme: 'light' | 'dark' | 'system';
  language: 'en' | 'sq' | 'sr';
  notifications: {
    delays: boolean;
    disruptions: boolean;
    promotions: boolean;
  };
  accessibility: {
    largeText: boolean;
    highContrast: boolean;
    screenReader: boolean;
  };
}

export const getAppSettings = (): AppSettings => {
  return getItem<AppSettings>(KEYS.SETTINGS, {
    theme: 'system',
    language: 'en',
    notifications: {
      delays: true,
      disruptions: true,
      promotions: true,
    },
    accessibility: {
      largeText: false,
      highContrast: false,
      screenReader: false,
    }
  });
};

export const updateAppSettings = (settings: Partial<AppSettings>): void => {
  const currentSettings = getAppSettings();
  setItem(KEYS.SETTINGS, { ...currentSettings, ...settings });
};

// Clear all storage data (for logout or reset)
export const clearAllData = (): void => {
  Object.values(KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
};
