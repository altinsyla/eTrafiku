
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { planTrip, PlanningOption } from '@/lib/mock-data';

interface TripPlannerProps {
  onClose?: () => void;
}

const TripPlanner: React.FC<TripPlannerProps> = ({ onClose }) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState(
    new Date().toTimeString().split(' ')[0].slice(0, 5)
  );
  const [results, setResults] = useState<PlanningOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const planningResults = planTrip(
        { name: from, coordinates: [42.6629, 21.1655] }, // Mock coordinates
        { name: to, coordinates: [42.6598, 20.2888] }    // Mock coordinates
      );
      setResults(planningResults);
      setIsLoading(false);
    }, 1500);
  };

  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins} min`;
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Planifikuesi i udhëtimit</h2>
        {onClose && (
          <Button variant="ghost" size="sm" onClick={onClose}>×</Button>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="from">Nga</Label>
            <Input
              id="from"
              placeholder="Pika fillestare"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="to">Në</Label>
            <Input
              id="to"
              placeholder="Destinacioni"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              required
            />
          </div>
          
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="date">Data</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="time">Koha</Label>
              <Input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div>
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Duke gjetur rrugët...' : 'Gjej rrugët'}
          </Button>
        </div>
      </form>
      
      {results.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Udhetimet e mundshme</h3>
          
          {results.map((option) => (
            <Card 
              key={option.id}
              className={`cursor-pointer transition-all ${selectedOption === option.id ? 'ring-2 ring-primary' : 'hover:bg-gray-50'}`}
              onClick={() => setSelectedOption(option.id)}
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-lg font-medium">
                    {option.departure} - {option.arrival}
                  </div>
                  <div className="text-lg font-semibold">€{option.price.toFixed(2)}</div>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>{formatDuration(option.duration)}</span>
                  <span>•</span>
                  <span>{option.transfers === 0 ? 'Direct' : `${option.transfers} transfer${option.transfers > 1 ? 's' : ''}`}</span>
                  <span>•</span>
                  <span>{option.distance} km</span>
                </div>
                
                <div className="mt-3 space-y-2">
                  {option.routes.map((route, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div 
                        className={`h-6 w-6 flex items-center justify-center rounded-full ${
                          route.type === 'walk' ? 'bg-gray-200' : route.color || 'bg-blue-500'
                        } text-white text-xs`}
                      >
                        {route.type === 'walk' ? '👣' : route.lineNumber}
                      </div>
                      <div className="text-sm">
                        {route.from} → {route.to} <span className="text-gray-500">({formatDuration(route.duration)})</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                {selectedOption === option.id && (
                  <div className="mt-4 flex justify-end">
                    <Button size="sm" variant="outline" className="mr-2">
                      Shiko detajet
                    </Button>
                    <Button size="sm">
                      Blej biletë
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default TripPlanner;
