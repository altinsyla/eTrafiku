
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import TransitMap from '@/components/TransitMap';
import TripPlanner from '@/components/TripPlanner';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowRight, Bus, Train, Circle, Search, CircleDot } from 'lucide-react';
import { generateInitialData, KOSOVO_CENTER } from '@/lib/mock-data';
import { addNotification, setUserProfile, getUserProfile, getNotifications } from '@/lib/storage';
import { getPopularRoutes, getActiveRoutes, TransitRoute } from '@/lib/routes-data';
import AIAssistant from '@/components/AIAssistant';

const Index = () => {
  const [activeTab, setActiveTab] = useState('map');
  const [showWelcome, setShowWelcome] = useState(false);
  const [userName, setUserName] = useState('');
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [popularRoutes, setPopularRoutes] = useState<TransitRoute[]>([]);
  const [activeBuses, setActiveBuses] = useState(0);
  const [activeTrains, setActiveTrains] = useState(0);
  const [totalStops, setTotalStops] = useState(0);
  
  const navigate = useNavigate();

  // Initialize data if needed
  useEffect(() => {
    const userProfile = getUserProfile();
    
    // Check if first time visitor
    if (!userProfile.id) {
      setShowWelcome(true);
      
      // Initialize mock data
      const initialData = generateInitialData();
      
      // Add welcome notification
      if (getNotifications().length === 0) {
        const welcomeNotification = {
          id: `welcome-${Date.now()}`,
          type: 'info' as const,
          title: 'Welcome to eTrafiku',
          message: 'Thank you for using our AI-powered public transport platform! Explore real-time transit data and plan your trips easily.',
          timestamp: new Date().toISOString(),
          read: false
        };
        addNotification(welcomeNotification);
      }
    } else {
      setUserName(userProfile.name || '');
    }
    
    // Load route data
    setPopularRoutes(getPopularRoutes());
    
    // Set statistics
    const activeRoutes = getActiveRoutes();
    setActiveBuses(activeRoutes.filter(r => r.type === 'bus').length);
    setActiveTrains(activeRoutes.filter(r => r.type === 'train').length);
    
    // Count unique stops
    const allStops = new Set();
    activeRoutes.forEach(route => {
      allStops.add(route.from.name);
      allStops.add(route.to.name);
      route.intermediateStops.forEach(stop => allStops.add(stop.name));
    });
    setTotalStops(allStops.size);
  }, []);

  const handleWelcomeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (userName.trim()) {
      setUserProfile({
        id: `user-${Date.now()}`,
        name: userName,
        preferredLanguage: 'en'
      });
      
      setShowWelcome(false);
      
      // Add personalized welcome notification
      const personalizedWelcome = {
        id: `personal-welcome-${Date.now()}`,
        type: 'info' as const,
        title: `Welcome, ${userName}!`,
        message: 'Your personalized transport experience is ready. Tap on the map to see real-time bus positions.',
        timestamp: new Date().toISOString(),
        read: false
      };
      addNotification(personalizedWelcome);
    }
  };
  
  const handleRouteSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/planner?from=${encodeURIComponent(fromLocation)}&to=${encodeURIComponent(toLocation)}`);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        {/* Welcome Modal */}
        {showWelcome && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <Card className="w-[90%] max-w-md">
              <CardContent className="p-6">
                <div className="mb-6">
                  <div className="flex justify-center mb-4">
                    <div className="bg-primary rounded-full p-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                        <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-5h2.038A2.968 2.968 0 0113 9a3 3 0 013-3 2.72 2.72 0 01.535.06l1.9-1.9A1 1 0 1019.5 3a1 1 0 00-.192 1.493l-1.9 1.9A2.72 2.72 0 0117 7a3 3 0 01-3 3H8V5a1 1 0 00-1-1H3z" />
                      </svg>
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-center">Welcome to TransitKosovo</h2>
                  <p className="text-center text-gray-600 mt-2">The AI-powered public transport platform for Kosovo.</p>
                </div>
                
                <form onSubmit={handleWelcomeSubmit}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block mb-1 font-medium">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Enter your name"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full">
                    Get Started
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
        
        {/* Hero Section */}
        <section className="mb-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">Welcome to Kosovo Transit</h1>
            <p className="text-xl text-gray-600 mb-6">
              Plan your journey, track vehicles in real-time, and buy tickets for public transportation across Kosovo.
            </p>
            
            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-6">
                <form onSubmit={handleRouteSearch}>
                  <h2 className="text-xl font-semibold mb-4">Find Routes</h2>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="from">From</Label>
                      <Input 
                        id="from"
                        value={fromLocation}
                        onChange={(e) => setFromLocation(e.target.value)}
                        placeholder="Enter departure location"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="to">To</Label>
                      <Input 
                        id="to"
                        value={toLocation}
                        onChange={(e) => setToLocation(e.target.value)}
                        placeholder="Enter destination"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      <Search className="mr-2" size={18} />
                      Search
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* Main content tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="map">Live Map</TabsTrigger>
              <TabsTrigger value="planner">Trip Planner</TabsTrigger>
            </TabsList>
            
            <div className="hidden md:flex gap-2">
              <Button variant="outline" size="sm" onClick={() => navigate('/tickets')}>
                Buy Tickets
              </Button>
              <Button size="sm" onClick={() => navigate('/planner')}>
                Check Schedules
              </Button>
            </div>
          </div>
          
          <TabsContent value="map" className="mt-0">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-[50vh]">
                <TransitMap center={KOSOVO_CENTER} zoom={9} />
              </div>
              
              <div className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <Card className="flex-1">
                    <CardContent className="p-4">
                      <h3 className="font-medium mb-2">Live Traffic Status</h3>
                      <div className="flex justify-between text-sm">
                        <div>
                          <div className="font-medium text-green-600">Low Traffic</div>
                          <div className="text-gray-500">Most routes running normally</div>
                        </div>
                        <div className="flex items-center">
                          <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-1"></span>
                          <span className="inline-block w-3 h-3 bg-gray-300 rounded-full mr-1"></span>
                          <span className="inline-block w-3 h-3 bg-gray-300 rounded-full"></span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="flex-1">
                    <CardContent className="p-4">
                      <h3 className="font-medium mb-2">Active Routes</h3>
                      <div className="text-3xl font-bold text-primary">
                        {activeBuses + activeTrains}
                        <span className="text-sm font-normal text-gray-500 ml-2">routes operating</span>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">2 routes with delays</div>
                    </CardContent>
                  </Card>
                  
                  <Card className="flex-1">
                    <CardContent className="p-4">
                      <h3 className="font-medium mb-2">Vehicles in Service</h3>
                      <div className="text-3xl font-bold text-secondary">
                        {activeBuses + activeTrains}
                        <span className="text-sm font-normal text-gray-500 ml-2">active vehicles</span>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">96% of fleet operational</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
            
            {/* Popular Routes Section */}
            <section className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Popular Routes</h2>
                <Button variant="link" onClick={() => navigate('/planner')}>
                  View All Routes <ArrowRight className="ml-1" size={16} />
                </Button>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {popularRoutes.map((route) => (
                  <Card key={route.id} className="overflow-hidden">
                    <div className="p-4 border-b bg-gray-50">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold text-lg">{route.name}</h3>
                          <p className="text-sm text-gray-600">
                            {route.type === 'bus' ? 'Bus' : 'Train'} · Route #{route.lineNumber}
                          </p>
                        </div>
                        <div className="bg-gray-200 rounded-full p-2">
                          {route.type === 'bus' ? (
                            <Bus className="text-blue-600" size={20} />
                          ) : (
                            <Train className="text-purple-600" size={20} />
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <CardContent className="p-4">
                      <div className="flex items-start mb-4">
                        <div className="flex flex-col items-center mr-3">
                          <div className="bg-primary rounded-full p-1">
                            <Circle className="h-3 w-3 text-white" />
                          </div>
                          <div className="bg-gray-300 w-px h-12 my-1"></div>
                          <div className="bg-gray-800 rounded-full p-1">
                            <CircleDot className="h-3 w-3 text-white" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="mb-3">
                            <div className="flex justify-between">
                              <p className="font-medium">{route.departureTime}</p>
                              <p className="text-sm text-gray-600">{route.from.name}</p>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between">
                              <p className="font-medium">{route.arrivalTime}</p>
                              <p className="text-sm text-gray-600">{route.to.name}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center border-t border-b py-2 my-2">
                        <p className="text-sm">Occupancy</p>
                        <div className="flex items-center">
                          <div className="w-24 h-2 bg-gray-200 rounded-full mr-2">
                            <div 
                              className={`h-full rounded-full ${
                                route.occupancy > 80 ? 'bg-red-500' : 
                                route.occupancy > 50 ? 'bg-yellow-500' : 'bg-green-500'
                              }`}
                              style={{ width: `${route.occupancy}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{route.occupancy}%</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center mt-4">
                        <p className="text-lg font-bold">€{route.price.toFixed(2)}</p>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => navigate(`/planner?route=${route.id}`)}>
                            Details
                          </Button>
                          <Button size="sm" onClick={() => navigate(`/tickets?route=${route.id}`)}>
                            Buy Ticket
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
            
            {/* Real-time Info Section */}
            <section className="mt-8 mb-8">
              <h2 className="text-2xl font-bold mb-4">Real-time Transportation</h2>
              <Card>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Live Map</h3>
                      <div className="space-y-2 mb-6">
                        {[
                          'Pristina Central Station',
                          'Vushtrri Bus Station',
                          'Mitrovica Bus Terminal',
                          'Pristina Central Station',
                          'University of Pristina',
                          'Gjilan Bus Station',
                          'Pristina Railway Station',
                          'Fushe Kosove Station',
                          'Peja Railway Station'
                        ].map((stop, index) => (
                          <div key={index} className="flex items-center">
                            <CircleDot className="h-4 w-4 mr-2 text-primary" />
                            <span>{stop}</span>
                          </div>
                        ))}
                      </div>
                      
                      <h3 className="text-lg font-semibold mb-3">Legend</h3>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Bus className="h-5 w-5 mr-2 text-blue-500" />
                          <span>Bus</span>
                        </div>
                        <div className="flex items-center">
                          <Train className="h-5 w-5 mr-2 text-purple-500" />
                          <span>Train</span>
                        </div>
                        <div className="flex items-center">
                          <CircleDot className="h-5 w-5 mr-2 text-primary" />
                          <span>Stop</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Real-time Status</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg text-center">
                          <h4 className="text-sm text-gray-600">Active Buses</h4>
                          <p className="text-3xl font-bold text-blue-600">{activeBuses}</p>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg text-center">
                          <h4 className="text-sm text-gray-600">Active Trains</h4>
                          <p className="text-3xl font-bold text-purple-600">{activeTrains}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                          <h4 className="text-sm text-gray-600">Total Stops</h4>
                          <p className="text-3xl font-bold text-gray-800">{totalStops}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </TabsContent>
          
          <TabsContent value="planner" className="mt-0">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="max-h-[80vh] overflow-auto">
                <TripPlanner />
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* AI Assistant */}
        <AIAssistant />
      </div>
    </Layout>
  );
};

export default Index;
