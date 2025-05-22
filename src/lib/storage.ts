/* ============================================================================
   Local storage service – TransitKosovo
   ========================================================================== */

const KEYS = {
  USER_PROFILE:        'transitkosovo_user',
  TICKETS:             'transitkosovo_tickets',
  FAVORITE_ROUTES:     'transitkosovo_favorites',
  RECENT_TRIPS:        'transitkosovo_recent_trips',
  NOTIFICATIONS:       'transitkosovo_notifications',
  SETTINGS:            'transitkosovo_settings',
} as const;

/* ─────────────────────────── helpers ─────────────────────────── */
const getItem = <T>(key: string, defaultValue: T): T => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : defaultValue;
  } catch (err) {
    console.error(`[storage] get ${key}:`, err);
    return defaultValue;
  }
};

const setItem = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`[storage] set ${key}:`, err);
  }
};

/* ────────────────────────  User profile  ─────────────────────── */
export interface UserProfile {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  userType?: 'regular' | 'student' | 'senior' | 'disabled';
  preferredLanguage?: 'en' | 'sq' | 'sr';
}

export const getUserProfile = (): UserProfile =>
  getItem<UserProfile>(KEYS.USER_PROFILE, {});

export const setUserProfile = (p: UserProfile): void =>
  setItem(KEYS.USER_PROFILE, p);

/* ─────────────────────────── Tickets ─────────────────────────── */
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
  routeInfo?: { from: string; to: string; routeId?: string };
}

export const getTickets = (): Ticket[] => getItem<Ticket[]>(KEYS.TICKETS, []);

export const addTicket = (t: Ticket): void => {
  const list = getTickets();
  list.push(t);
  setItem(KEYS.TICKETS, list);
};

export const updateTicket = (t: Ticket): void => {
  const list = getTickets();
  const idx = list.findIndex((x) => x.id === t.id);
  if (idx !== -1) {
    list[idx] = t;
    setItem(KEYS.TICKETS, list);
  }
};

/* ─────────────────────── Favorite routes ─────────────────────── */
export interface FavoriteRoute {
  id: string;
  name: string;
  from: { name: string; coordinates: [number, number] };
  to:   { name: string; coordinates: [number, number] };
  routeType: 'bus' | 'train' | 'multi';
  routeIds: string[];
}

export const getFavoriteRoutes = (): FavoriteRoute[] =>
  getItem<FavoriteRoute[]>(KEYS.FAVORITE_ROUTES, []);

export const addFavoriteRoute = (r: FavoriteRoute): void => {
  const list = getFavoriteRoutes();
  list.push(r);
  setItem(KEYS.FAVORITE_ROUTES, list);
};

export const removeFavoriteRoute = (id: string): void => {
  const list = getFavoriteRoutes().filter((r) => r.id !== id);
  setItem(KEYS.FAVORITE_ROUTES, list);
};

/* ───────────────────────── Recent trips ──────────────────────── */
export interface Trip {
  id: string;
  date: string;
  from: { name: string; coordinates: [number, number] };
  to:   { name: string; coordinates: [number, number] };
  duration: number;   // minutes
  distance: number;   // km
  routes: {
    id: string;
    type: 'bus' | 'train';
    lineNumber: string;
    departureTime: string;
    arrivalTime: string;
  }[];
}

export const getRecentTrips = (): Trip[] =>
  getItem<Trip[]>(KEYS.RECENT_TRIPS, []);

export const addRecentTrip = (trip: Trip): void => {
  const list = getRecentTrips().filter((t) => t.id !== trip.id);
  list.unshift(trip);
  setItem(KEYS.RECENT_TRIPS, list.slice(0, 10)); // keep max-10
};

/* ───────────────────────── Notifications ─────────────────────── */
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

export const getNotifications = (): Notification[] =>
  getItem<Notification[]>(KEYS.NOTIFICATIONS, []);

export const addNotification = (n: Notification): void => {
  const list = getNotifications();
  list.unshift(n);
  setItem(KEYS.NOTIFICATIONS, list);
};

export const markNotificationAsRead = (id: string): void => {
  const list = getNotifications().map((n) =>
    n.id === id ? { ...n, read: true } : n
  );
  setItem(KEYS.NOTIFICATIONS, list);
};

export const clearAllNotifications = (): void =>
  setItem(KEYS.NOTIFICATIONS, []);

/* --- demo seeding so UI is never empty on first run --- */
export const seedDemoNotifications = (): void => {
  if (getNotifications().length) return;
  const now = Date.now();
  addNotification({
    id: 'n-delay',
    type: 'delay',
    title: '10-minute delay on Bus 4',
    message: 'Traffic congestion near City Center.',
    timestamp: new Date(now - 5 * 60 * 1000).toISOString(),
    read: false,
    routeId: 'bus-4',
  });
  addNotification({
    id: 'n-promo',
    type: 'promotion',
    title: 'Student 50% discount',
    message: 'Get half-price monthly passes until month-end.',
    timestamp: new Date(now - 2 * 60 * 60 * 1000).toISOString(),
    read: false,
  });
  addNotification({
    id: 'n-info',
    type: 'info',
    title: 'New train schedule',
    message: 'Intercity line Prishtina – Peja now every 2 h.',
    timestamp: new Date(now - 28 * 60 * 60 * 1000).toISOString(),
    read: true,
  });
};

/* ───────────────────────── App settings ──────────────────────── */
export interface AppSettings {
  theme: 'light' | 'dark' | 'system';
  language: 'en' | 'sq' | 'sr';
  notifications: { delays: boolean; disruptions: boolean; promotions: boolean };
  accessibility: { largeText: boolean; highContrast: boolean; screenReader: boolean };
}

export const getAppSettings = (): AppSettings =>
  getItem<AppSettings>(KEYS.SETTINGS, {
    theme: 'system',
    language: 'en',
    notifications: { delays: true, disruptions: true, promotions: true },
    accessibility: { largeText: false, highContrast: false, screenReader: false },
  });

export const updateAppSettings = (p: Partial<AppSettings>): void =>
  setItem(KEYS.SETTINGS, { ...getAppSettings(), ...p });

/* ─────────────────────────  utilities  ───────────────────────── */
export const clearAllData = (): void => {
  Object.values(KEYS).forEach((k) => localStorage.removeItem(k));
};
