
import React, { useEffect, useRef, useState } from 'react';
import { KOSOVO_CENTER, BUS_ROUTES, PRISTINA_CITY_ROUTES, generateBusPositions } from '@/lib/mock-data';

// Add Window interface augmentation for Leaflet
declare global {
  interface Window {
    L: any; // Define L property on window
  }
}

interface MapProps {
  center?: [number, number];
  zoom?: number;
}

interface BusPosition {
  id: string;
  routeId: string;
  routeName: string;
  busNumber: string;
  position: [number, number];
  currentStop: string;
  nextStop: string;
  minutesToNextStop: number;
  occupancy: number;
  occupancyStatus: 'low' | 'medium' | 'high';
  capacity: number;
  delay: number;
}

const TransitMap: React.FC<MapProps> = ({ center = KOSOVO_CENTER, zoom = 9 }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [buses, setBuses] = useState<BusPosition[]>([]);
  const [selectedBus, setSelectedBus] = useState<BusPosition | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const markersRef = useRef<any[]>([]);
  const busIconsRef = useRef<Record<string, any>>({});

  useEffect(() => {
    // Load the Leaflet library and initialize map
    const leafletScript = document.createElement('script');
    leafletScript.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    leafletScript.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
    leafletScript.crossOrigin = '';
    document.body.appendChild(leafletScript);

    leafletScript.onload = () => {
      if (!mapRef.current || mapInstanceRef.current) return;

      const L = window.L;
      const map = L.map(mapRef.current).setView(center, zoom);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      // Create bus icons
      const busIcon = L.icon({
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/3448/3448339.png',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -16]
      });

      busIconsRef.current = {
        default: busIcon,
        selected: L.icon({
          iconUrl: 'https://cdn-icons-png.flaticon.com/512/3448/3448339.png',
          iconSize: [40, 40],
          iconAnchor: [20, 20],
          popupAnchor: [0, -20]
        })
      };

      // Add route polylines
      [...BUS_ROUTES, ...PRISTINA_CITY_ROUTES].forEach(route => {
        const routeCoordinates = route.stops.map(stop => stop.coordinates);
        const color = route.type === 'city' ? '#10B981' : '#1E3A8A';
        
        L.polyline(routeCoordinates, {
          color,
          weight: 3,
          opacity: 0.7,
          dashArray: route.type === 'city' ? '5, 5' : ''
        }).addTo(map);

        // Add stop markers
        route.stops.forEach(stop => {
          L.circle(stop.coordinates, {
            color,
            fillColor: '#fff',
            fillOpacity: 1,
            radius: 100,
            weight: 2
          }).addTo(map)
          .bindTooltip(stop.name, { permanent: false });
        });
      });

      mapInstanceRef.current = map;
      setIsLoading(false);
    };

    return () => {
      document.body.removeChild(leafletScript);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [center, zoom]);

  // Update bus positions every 5 seconds
  useEffect(() => {
    const updateBuses = () => {
      const newBusesRaw = generateBusPositions();
      // Ensure correct typing by mapping to the BusPosition type
      const newBuses: BusPosition[] = newBusesRaw.map(bus => ({
        ...bus,
        occupancyStatus: bus.occupancyStatus as 'low' | 'medium' | 'high'
      }));
      
      setBuses(newBuses);

      // Update markers
      if (mapInstanceRef.current) {
        const L = window.L;
        
        // Remove old markers
        markersRef.current.forEach(marker => marker.remove());
        markersRef.current = [];

        // Add new markers
        newBuses.forEach(bus => {
          const isSelected = selectedBus && selectedBus.id === bus.id;
          const marker = L.marker(bus.position, {
            icon: isSelected ? busIconsRef.current.selected : busIconsRef.current.default
          }).addTo(mapInstanceRef.current);

          // Create popup content
          const occupancyClass = 
            bus.occupancyStatus === 'low' ? 'bg-green-500' : 
            bus.occupancyStatus === 'medium' ? 'bg-yellow-500' : 
            'bg-red-500';
          
          const popupContent = document.createElement('div');
          popupContent.innerHTML = `
            <div class="text-sm">
              <div class="font-bold">${bus.routeName}</div>
              <div>Bus #${bus.busNumber}</div>
              <div class="flex items-center gap-1 mt-1">
                <span>Occupancy:</span>
                <span class="${occupancyClass} text-white px-2 py-0.5 rounded text-xs">
                  ${bus.occupancy}/${bus.capacity}
                </span>
              </div>
              <div class="mt-1">
                <div>Current stop: ${bus.currentStop}</div>
                <div>Next stop: ${bus.nextStop} (in ${bus.minutesToNextStop} min)</div>
              </div>
              ${bus.delay > 0 ? `<div class="text-red-500 mt-1">Delayed by ${bus.delay} min</div>` : ''}
            </div>
          `;

          marker.bindPopup(popupContent);
          
          marker.on('click', () => {
            // Cast bus to the correct type when setting as selected
            setSelectedBus(bus as BusPosition);
            marker.setIcon(busIconsRef.current.selected);
          });

          markersRef.current.push(marker);
        });
      }
    };

    // Initial update
    updateBuses();
    
    // Set interval for updates
    const interval = setInterval(updateBuses, 5000);
    
    return () => {
      clearInterval(interval);
    };
  }, [selectedBus]);

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-primary text-xl font-semibold">Loading map...</div>
        </div>
      )}
      <div ref={mapRef} className="h-full w-full z-10" />
      
      {selectedBus && (
        <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-72 bg-white p-4 rounded-lg shadow-lg">
          <div className="flex justify-between items-start">
            <div className="font-bold text-lg">{selectedBus.routeName}</div>
            <button 
              className="text-gray-400 hover:text-gray-600"
              onClick={() => setSelectedBus(null)}
            >
              ✕
            </button>
          </div>
          <div className="text-sm text-gray-600">Bus #{selectedBus.busNumber}</div>
          
          <div className="mt-2 flex items-center">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className={`h-2.5 rounded-full ${
                  selectedBus.occupancyStatus === 'low' ? 'bg-green-500' : 
                  selectedBus.occupancyStatus === 'medium' ? 'bg-yellow-500' : 
                  'bg-red-500'
                }`}
                style={{ width: `${(selectedBus.occupancy / selectedBus.capacity) * 100}%` }}
              ></div>
            </div>
            <span className="ml-2 text-sm">{selectedBus.occupancy}/{selectedBus.capacity}</span>
          </div>

          <div className="mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <div>{selectedBus.currentStop}</div>
            </div>
            <div className="ml-1.5 h-8 w-0.5 bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-300"></div>
              <div>{selectedBus.nextStop} <span className="text-sm text-gray-500">in {selectedBus.minutesToNextStop} min</span></div>
            </div>
          </div>

          {selectedBus.delay > 0 && (
            <div className="mt-2 py-1 px-2 bg-red-50 text-red-700 text-sm rounded">
              Vonese prej {selectedBus.delay} minuta
            </div>
          )}

          <div className="mt-4 flex justify-between">
            <button className="px-3 py-1 bg-primary text-white rounded-md text-sm">
              Blej tiketë
            </button>
            <button className="px-3 py-1 bg-secondary text-white rounded-md text-sm">
              Detajet e udhëtimit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransitMap;
