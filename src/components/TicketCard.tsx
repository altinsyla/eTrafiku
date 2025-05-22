
import React, { useState } from 'react';
import { Ticket } from '@/lib/storage';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { QRCodeSVG } from 'qrcode.react';

interface TicketCardProps {
  ticket: Ticket;
  onUseTicket?: (ticket: Ticket) => void;
}

const TicketCard: React.FC<TicketCardProps> = ({ ticket, onUseTicket }) => {
  const [showQR, setShowQR] = useState(false);
  
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      day: '2-digit',
      month: 'short', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  const getTicketTypeColor = (type: string): string => {
    switch (type) {
      case 'single': return 'bg-blue-500';
      case 'daily': return 'bg-green-500';
      case 'monthly': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };
  
  const isExpired = new Date(ticket.expirationDate) < new Date();
  
  return (
    <Card className={`relative overflow-hidden ${ticket.isUsed || isExpired ? 'opacity-70' : ''}`}>
      <div className={`absolute top-0 right-0 ${getTicketTypeColor(ticket.type)} text-white px-3 py-1 text-xs uppercase rounded-bl-md`}>
        {ticket.type}
      </div>
      
      {(ticket.isUsed || isExpired) && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10">
          <div className="transform rotate-12 border-4 border-red-500 px-4 py-2 text-red-500 text-2xl font-bold uppercase">
            {isExpired ? 'Expired' : 'Used'}
          </div>
        </div>
      )}
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="text-lg font-bold">
            {ticket.routeInfo?.from} to {ticket.routeInfo?.to}
          </div>
          <div className="text-lg font-semibold">€{ticket.price.toFixed(2)}</div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="text-sm text-gray-600 mb-4">
          <div className="flex justify-between mb-1">
            <span>Purchase Date:</span>
            <span>{formatDate(ticket.purchaseDate)}</span>
          </div>
          <div className="flex justify-between">
            <span>Valid Until:</span>
            <span>{formatDate(ticket.expirationDate)}</span>
          </div>
        </div>
        
        {showQR ? (
          <div className="flex flex-col items-center">
            <QRCodeSVG 
              value={ticket.qrCodeData || 'Invalid QR Code'} 
              size={150} 
              level="H"
              includeMargin={true}
            />
            <Button 
              variant="outline"
              className="w-full mt-3"
              onClick={() => setShowQR(false)}
            >
              Hide QR Code
            </Button>
          </div>
        ) : (
          <div className="flex space-x-2">
            <Button 
              className="flex-1" 
              variant={!ticket.isUsed && !isExpired ? "default" : "outline"}
              onClick={() => setShowQR(true)}
              disabled={ticket.isUsed || isExpired}
            >
              Show QR Code
            </Button>
            {!ticket.isUsed && !isExpired && onUseTicket && (
              <Button 
                className="flex-1" 
                variant="secondary"
                onClick={() => onUseTicket(ticket)}
              >
                Use Ticket
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TicketCard;
