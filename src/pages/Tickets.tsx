import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import TicketCard from '@/components/TicketCard';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Ticket, getTickets, addTicket, updateTicket } from '@/lib/storage';
import { toast } from '@/components/ui/sonner';
import { v4 as uuidv4 } from 'uuid';

const Tickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [showPurchaseDialog, setShowPurchaseDialog] = useState(false);
  const [selectedTicketType, setSelectedTicketType] = useState<'single' | 'daily' | 'monthly'>('single');
  const [selectedRoute, setSelectedRoute] = useState('');
  
  useEffect(() => {
    // Load tickets from storage
    const storedTickets = getTickets();
    setTickets(storedTickets);
  }, []);
  
  const handleUseTicket = (ticket: Ticket) => {
    const updatedTicket: Ticket = {
      ...ticket,
      isUsed: true
    };
    
    updateTicket(updatedTicket);
    
    // Update local state
    setTickets(tickets.map(t => t.id === ticket.id ? updatedTicket : t));
    
    toast.success("Ticket used successfully", {
      description: `Your ${ticket.type} ticket has been marked as used.`
    });
  };
  
  const handlePurchaseTicket = () => {
    const now = new Date();
    let expirationDate: Date;
    
    switch(selectedTicketType) {
      case 'daily':
        expirationDate = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hours
        break;
      case 'monthly':
        expirationDate = new Date(now);
        expirationDate.setMonth(expirationDate.getMonth() + 1); // 1 month
        break;
      default:
        expirationDate = new Date(now.getTime() + 3 * 60 * 60 * 1000); // 3 hours for single
        break;
    }
    
    const price = selectedTicketType === 'single' ? 0.5 : selectedTicketType === 'daily' ? 1.5 : 20;
    
    const [from, to] = selectedRoute.split(' to ');
    
    const newTicket: Ticket = {
      id: uuidv4(),
      type: selectedTicketType,
      price,
      purchaseDate: now.toISOString(),
      expirationDate: expirationDate.toISOString(),
      qrCodeData: `TK-${Date.now()}-${selectedTicketType.toUpperCase()}-${Math.random().toString(36).substring(2, 8)}`,
      isUsed: false,
      routeInfo: {
        from: from || 'Any',
        to: to || 'Any'
      }
    };
    
    // Save to storage
    addTicket(newTicket);
    
    // Update local state
    setTickets([...tickets, newTicket]);
    
    // Close dialog and show success message
    setShowPurchaseDialog(false);
    
    toast.success("Ticket purchased successfully", {
      description: `Your ${selectedTicketType} ticket is ready to use.`
    });
  };
  
  const getActiveTickets = () => tickets.filter(ticket => !ticket.isUsed && new Date(ticket.expirationDate) > new Date());
  const getUsedOrExpiredTickets = () => tickets.filter(ticket => ticket.isUsed || new Date(ticket.expirationDate) <= new Date());
  
  // Sample routes for the purchase dialog
  const routes = [
    'Pristina to City Center',
    'Pristina to Prizren',
    'Pristina to Peja',
    'Pristina to Mitrovica',
    'City Center to Sunny Hill'
  ];
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Biletat e mija</h1>
          <Button onClick={() => setShowPurchaseDialog(true)}>
            Buy New Ticket
          </Button>
        </div>
        
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="active">Bileta aktive</TabsTrigger>
            <TabsTrigger value="history">Historia e biletave</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getActiveTickets().length > 0 ? (
                getActiveTickets().map(ticket => (
                  <TicketCard 
                    key={ticket.id} 
                    ticket={ticket} 
                    onUseTicket={handleUseTicket}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-12 bg-gray-50 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900">No Active Tickets</h3>
                  <p className="mt-1 text-gray-500">You don't have any active tickets. Purchase a new ticket to get started.</p>
                  <Button className="mt-4" onClick={() => setShowPurchaseDialog(true)}>
                    Buy New Ticket
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="history">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getUsedOrExpiredTickets().length > 0 ? (
                getUsedOrExpiredTickets().map(ticket => (
                  <TicketCard key={ticket.id} ticket={ticket} />
                ))
              ) : (
                <div className="col-span-full text-center py-12 bg-gray-50 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900">No Ticket History</h3>
                  <p className="mt-1 text-gray-500">Your used or expired tickets will appear here.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Purchase Dialog */}
        <Dialog open={showPurchaseDialog} onOpenChange={setShowPurchaseDialog}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Buy New Ticket</DialogTitle>
            </DialogHeader>
            
            <div className="py-4">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Ticket Type</label>
                <div className="grid grid-cols-3 gap-2">
                  {['single', 'daily', 'monthly'].map((type) => (
                    <Button 
                      key={type}
                      variant={selectedTicketType === type ? "default" : "outline"}
                      className="w-full"
                      onClick={() => setSelectedTicketType(type as 'single' | 'daily' | 'monthly')}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </Button>
                  ))}
                </div>
                <div className="mt-1 text-sm text-gray-500">
                  {selectedTicketType === 'single' && 'Valid for one trip. Expires in 3 hours.'}
                  {selectedTicketType === 'daily' && 'Valid for unlimited trips for 24 hours.'}
                  {selectedTicketType === 'monthly' && 'Valid for unlimited trips for 30 days.'}
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Route</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={selectedRoute}
                  onChange={(e) => setSelectedRoute(e.target.value)}
                >
                  <option value="">Select a route</option>
                  {routes.map((route) => (
                    <option key={route} value={route}>
                      {route}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="mb-6 p-3 bg-gray-50 rounded-md">
                <div className="flex justify-between">
                  <span>Price:</span>
                  <span className="font-bold">
                    €{selectedTicketType === 'single' ? '0.50' : selectedTicketType === 'daily' ? '1.50' : '20.00'}
                  </span>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  onClick={() => setShowPurchaseDialog(false)}
                  className="mr-2"
                >
                  Cancel
                </Button>
                <Button onClick={handlePurchaseTicket}>
                  Purchase
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Tickets;
