
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { MessageSquare } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    content: 'Hello! I\'m your TransitKosovo assistant. How can I help you with your travel needs today?',
    sender: 'ai',
    timestamp: new Date()
  }
];

// Mock responses based on keywords
const RESPONSES: Record<string, string[]> = {
  'ticket': [
    'You can buy tickets through our app or at any station kiosk. Would you like me to help you find the nearest location?',
    'Tickets can be purchased up to 30 days in advance. Do you need information about a specific route?',
    'We offer single, daily, and monthly tickets. Which one are you interested in?'
  ],
  'route': [
    'We have multiple routes connecting all major cities in Kosovo. Which cities are you traveling between?',
    'The most popular routes are Pristina-Mitrovica, Pristina-Gjilan, and Pristina-Peja. Do you need schedule information?',
    'Route information is updated in real-time on our map. You can also search for specific routes in the Trip Planner.'
  ],
  'schedule': [
    'Most buses run from 5:00 AM to 11:00 PM. Trains have more limited schedules. Can I help you find a specific departure time?',
    'Weekend schedules differ from weekday schedules, with reduced frequency. Would you like to see the schedule for a specific route?',
    'You can always check the latest schedule information on our website or app, as times might occasionally change due to maintenance or other reasons.'
  ],
  'discount': [
    'We offer discounts for students, seniors, and children under 12. Do you qualify for any of these categories?',
    'Monthly passes offer significant savings compared to single tickets if you commute regularly.',
    'Group discounts are available for parties of 10 or more people traveling together.'
  ],
  'pristina': [
    'Pristina is our main hub, with connections to all major cities in Kosovo.',
    'The Pristina Central Station offers amenities including waiting rooms, cafes, and ticket offices.',
    'From Pristina, you can reach Mitrovica in about 90 minutes by bus.'
  ],
  'mitrovica': [
    'The Pristina-Mitrovica route is one of our most frequent services, with buses departing hourly during peak times.',
    'The journey from Pristina to Mitrovica takes approximately 90 minutes, depending on traffic.',
    'The Mitrovica Bus Terminal is located in the city center, making it convenient for onward travel.'
  ],
  'help': [
    'I can help you with route information, schedules, ticket prices, and general travel advice. What do you need assistance with?',
    'If you need immediate assistance, you can also call our customer service at +383 44 123 456.',
    'For lost items, please contact the terminal where you believe you lost your belongings.'
  ]
};

// Function to generate a response based on the user's message
const generateResponse = (message: string): string => {
  const lowercaseMessage = message.toLowerCase();
  
  // Check for keywords in the user's message
  for (const [keyword, responses] of Object.entries(RESPONSES)) {
    if (lowercaseMessage.includes(keyword)) {
      // Return a random response for this keyword
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }
  
  // Default responses if no keyword matches
  const defaultResponses = [
    "I'm here to help with your transportation needs. Could you provide more details about what you're looking for?",
    "I can assist with routes, schedules, and ticket information. What would you like to know?",
    "Feel free to ask about any specific route, schedule, or service we offer in Kosovo."
  ];
  
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
};

export const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    // Simulate AI thinking...
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateResponse(input),
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg" size="icon">
          <MessageSquare className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-md flex flex-col p-0">
        <SheetHeader className="p-4 border-b">
          <SheetTitle>TransitKosovo Assistant</SheetTitle>
        </SheetHeader>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  msg.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                <p>{msg.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="p-4 border-t mt-auto">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1"
            />
            <Button onClick={handleSend}>Send</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AIAssistant;
