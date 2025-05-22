
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getUserProfile, setUserProfile, getTickets, getRecentTrips } from '@/lib/storage';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TicketCard from '@/components/TicketCard';

const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [userTickets, setUserTickets] = useState([]);
  const [recentTrips, setRecentTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const profile = getUserProfile();
    if (!profile.id) {
      // Redirect to login if not authenticated
      navigate('/login');
      return;
    }
    
    setName(profile.name || '');
    setEmail(profile.email || '');
    
    // Load user tickets and trips
    setUserTickets(getTickets());
    setRecentTrips(getRecentTrips());
  }, [navigate]);
  
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const currentProfile = getUserProfile();
      setUserProfile({
        ...currentProfile,
        name,
        email
      });
      
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleLogout = () => {
    // In a real app, we would clear authentication tokens
    // For now, just clear the user profile partially
    setUserProfile({});
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Profile</h1>
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="profile">Profile Details</TabsTrigger>
            <TabsTrigger value="tickets">My Tickets</TabsTrigger>
            <TabsTrigger value="trips">Recent Trips</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileUpdate} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-gray-600 mb-6">
                      Manage your account settings and preferences
                    </p>
                    <Button variant="outline" className="w-full mb-2">
                      Change Password
                    </Button>
                    <Button variant="outline" className="w-full mb-2">
                      Notification Preferences
                    </Button>
                    <Button 
                      variant="destructive" 
                      className="w-full"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="tickets">
            <h2 className="text-xl font-bold mb-4">Your Tickets</h2>
            {userTickets.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {userTickets.map((ticket) => (
                  <TicketCard key={ticket.id} ticket={ticket} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-10 text-center">
                  <p className="text-gray-500 mb-4">You don't have any tickets yet.</p>
                  <Button onClick={() => navigate('/tickets')}>Buy Tickets</Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="trips">
            <h2 className="text-xl font-bold mb-4">Recent Trips</h2>
            {recentTrips.length > 0 ? (
              <div className="space-y-4">
                {recentTrips.map((trip) => (
                  <Card key={trip.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">{trip.from.name} to {trip.to.name}</h3>
                          <p className="text-sm text-gray-600">
                            {new Date(trip.date).toLocaleDateString()} • {trip.duration} min • {trip.distance} km
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-10 text-center">
                  <p className="text-gray-500 mb-4">No recent trips found.</p>
                  <Button onClick={() => navigate('/planner')}>Plan a Trip</Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Profile;
